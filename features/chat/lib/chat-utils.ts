/**
 * Standardized Chat Utilities
 * Provides consistent patterns for all chat routes following AI SDK best practices
 */

import {
  streamText,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  UIMessage,
  stepCountIs
} from "ai";
import type { SourceDocumentUIPart, SourceUrlUIPart } from "ai";
import { z } from "zod";
import { agentRegistry } from "@/features/agents/registry";
import { sprinterToolRegistry as toolRegistry } from "@/features/tools/registry";
import { getModelById } from "@/features/ai/models";
import { createClient } from "@/utils/supabase/server";
import { chatService } from "@/features/chat/services/chat-service";
import crypto from "crypto";
// Removed custom citation pipeline – rely on native UI parts from AI SDK v5
import { logger } from "@/lib/logger";
import { getTenantAgentEntitlements } from "@/features/chat/lib/access/access";
import { SprinterToolResult, toAISdkSources } from "@/features/tools/types";
import { waitUntil } from "@vercel/functions";
import { buildFormattingPrompt } from "@/features/ai/prompts/formatting-guidelines";
import {
  buildSafetyRules,
  buildToolGuidelines
} from "@/features/ai/prompts/core";

/**
 * Configuration for chat streaming
 */
export interface ChatStreamConfig {
  /** Chat/thread ID for persistence */
  chatId?: string;
  /** Agent ID to use */
  agentId: string;
  /** Messages from the client */
  messages: UIMessage[];
  /** Tenant ID for context */
  tenantId?: number;
  /** User ID for authentication */
  userId?: string;
  /** Additional context data */
  context?: Record<string, any>;
  /** Whether to persist messages */
  persist?: boolean;
  /** Maximum number of tool calling steps */
  maxSteps?: number;
  /** Temperature for model */
  temperature?: number;
  /** Model override */
  modelId?: string;
  /** Enable performance logging */
  perfLog?: boolean;
  /** Session ID for standalone chats */
  sessionId?: string;
}

/**
 * Result from chat streaming
 */
export interface ChatStreamResult {
  stream: ReadableStream;
  response: Response;
}

/**
 * Performance metrics tracking
 */
interface PerformanceMetrics {
  startTime: number;
  initTime?: number;
  modelLoadTime?: number;
  streamStartTime?: number;
  totalTokens?: number;
  steps?: number;
}

/**
 * Common request validation schemas
 */
export const chatRequestSchemas = {
  /** Standard chat request with UI messages */
  uiChat: z.object({
    id: z.string().optional(), // chatId/threadId
    title: z.string().optional(),
    messages: z.array(z.custom<UIMessage>()).min(1),
    agentId: z.string(),
    workspaceId: z.string().optional(),
    tenantId: z.string().optional(),
    sessionId: z.string().optional(),
    modelId: z.string().optional(),
    temperature: z.number().optional(),
    context: z.record(z.string(), z.any()).optional()
  }),

  /** Standalone chat request */
  standalone: z.object({
    messages: z.array(z.any()).min(1),
    agentId: z.string().optional().default("marketplace"),
    model: z.string().optional(),
    sessionId: z.string().optional(),
    tenantSlug: z.string().optional(),
    context: z.record(z.string(), z.any()).optional()
  }),

  /** Company/profile chat request */
  contextual: z.object({
    messages: z.array(z.any()).min(1),
    sessionId: z.string().optional(),
    agentPrompt: z.string().optional(),
    enabledTools: z.array(z.string()).optional(),
    context: z.record(z.string(), z.any()).optional()
  })
};

/**
 * Registry initialization singleton
 */
let registriesInitialized = false;
let registryInitPromise: Promise<void> | null = null;

export async function ensureRegistriesInitialized(
  options: { loadFromDatabase?: boolean; perfLog?: boolean } = {}
): Promise<void> {
  if (registriesInitialized) return;

  if (!registryInitPromise) {
    const startTime = Date.now();
    registryInitPromise = Promise.all([
      agentRegistry.initialize({
        loadFromDatabase: options.loadFromDatabase ?? true
      }),
      toolRegistry.initialize({
        loadFromDatabase: options.loadFromDatabase ?? true
      })
    ])
      .then(() => {
        registriesInitialized = true;
        if (options.perfLog) {
          logger.info("[PERF] Registries initialized", {
            durationMs: Date.now() - startTime
          });
        }
      })
      .catch(error => {
        logger.error("Failed to initialize registries", { error });
        registryInitPromise = null;
        registriesInitialized = false;
        throw error;
      });
  }

  return registryInitPromise;
}

/**
 * Sanitize tool slugs to valid AI SDK keys
 * NOTE: AI SDK v3+ supports hyphens, so we no longer need to sanitize
 * @deprecated Use the slug as-is instead
 */
export function sanitizeToolKey(slug: string): string {
  return slug; // Just return the slug as-is, no sanitization needed
}

/**
 * Convert various message formats to UIMessage format with parts structure
 * Aligns with Vercel's AI chatbot pattern for message handling
 */
export function convertToUIMessages(messages: any[]): UIMessage[] {
  return messages.map((message: any) => {
    // Generate ID if not present
    const id = message.id || crypto.randomUUID();

    // Ensure role is properly typed - default to 'user' if undefined
    const role = (message.role || "user") as "user" | "assistant" | "system";

    // Handle parts structure - standardize on parts array
    let parts: any[];

    if (message.parts && Array.isArray(message.parts)) {
      // Already has parts structure, preserve it
      parts = message.parts;
    } else if (message.content !== undefined) {
      // Convert content string to parts array
      parts = [
        {
          type: "text",
          text: String(message.content || "")
        }
      ];
    } else {
      // Default to empty text part
      parts = [
        {
          type: "text",
          text: ""
        }
      ];
    }

    // Build UIMessage with optional metadata
    const uiMessage: UIMessage = {
      id,
      role,
      parts
    };

    // Add metadata if present
    if (message.metadata) {
      (uiMessage as any).metadata = message.metadata;
    }

    return uiMessage;
  });
}

/**
 * Build context-aware system prompt following patterns from ai-with-rsc
 * Incorporates loan scenario, tenant, and workspace context
 */
export async function buildSystemPrompt(
  agent: any,
  context?: Record<string, any>
): Promise<string> {
  const promptSections: string[] = [];

  // Add base system prompt
  const basePrompt = agent.systemPrompt || agent.systemPromptTemplate || "";
  if (basePrompt) {
    promptSections.push(basePrompt);
  }

  // Add loan scenario context section similar to researcher-system-prompt.ts
  if (context?.loanScenario) {
    const scenario = context.loanScenario;
    const scenarioLines = ["<LoanScenarioAndBorrowerDetails>"];

    if (scenario.loanAmount)
      scenarioLines.push(
        `Loan Amount: $${scenario.loanAmount.toLocaleString()}`
      );
    if (scenario.propertyValue)
      scenarioLines.push(
        `Property Value: $${scenario.propertyValue.toLocaleString()}`
      );
    if (scenario.downPayment)
      scenarioLines.push(
        `Down Payment: $${scenario.downPayment.toLocaleString()}`
      );
    if (scenario.creditScore)
      scenarioLines.push(`Credit Score: ${scenario.creditScore}`);
    if (scenario.incomeType)
      scenarioLines.push(`Income Type: ${scenario.incomeType}`);
    if (scenario.loanType)
      scenarioLines.push(`Loan Type: ${scenario.loanType}`);
    if (scenario.propertyType)
      scenarioLines.push(`Property Type: ${scenario.propertyType}`);

    // Add any additional qualifiers from context
    if (context.appliedQualifiers) {
      scenarioLines.push("\nApplied Qualifiers:");
      context.appliedQualifiers.forEach((q: any) => {
        scenarioLines.push(`- ${q.name}: ${q.value}`);
      });
    }

    scenarioLines.push("</LoanScenarioAndBorrowerDetails>");
    promptSections.push(scenarioLines.join("\n"));
  }

  // Add tenant/organization context
  if (context?.tenantId) {
    const supabase = await createClient();
    const { data: tenant } = await supabase
      .from("tenants")
      .select("name, tenant_type")
      .eq("id", context.tenantId)
      .single();

    if (tenant) {
      const tenantContext = [
        "<OrganizationContext>",
        `Organization: ${tenant.name}`,
        `Type: ${tenant.tenant_type === "lender" ? "Mortgage Lender" : "Mortgage Brokerage"}`,
        "</OrganizationContext>"
      ].join("\n");

      promptSections.push(tenantContext);
    }
  }

  // Add any custom/additional prompts
  if (context?.customPrompt) {
    promptSections.push(context.customPrompt);
  }

  // Add agent-specific prompt if provided
  if (context?.agentPrompt) {
    promptSections.push(
      `<AdditionalInstructions>\n${context.agentPrompt}\n</AdditionalInstructions>`
    );
  }

  // Add core safety and tool guidelines
  // promptSections.push(buildSafetyRules());
  // promptSections.push(buildToolGuidelines());

  // Add comprehensive formatting guidelines
  const formattingPrompt = buildFormattingPrompt({
    leadWithAnswer: true,
    includeTables: true,
    citationMode: "available",
    includeLinks: true,
    includeListFormatting: true,
    lengthGuidance: "concise and focused",
    showDateStamp: false
  });

  promptSections.push(formattingPrompt);

  return promptSections.filter(Boolean).join("\n\n");
}

/**
 * Log tool invocation for analytics and debugging
 */
async function logToolInvocation(
  chatId: string,
  toolCall: any, // Use any since ToolInvocation type isn't exported
  status: "running" | "completed" | "failed" = "completed",
  metadata?: Record<string, any>
): Promise<void> {
  try {
    // Map status strings to status IDs
    // Using generic status IDs: 20 = In Progress, 33 = Complete, 3 = Fixed (for failed)
    const statusMap: Record<string, number> = {
      running: 20, // In Progress
      completed: 33, // Complete
      failed: 3 // Fixed (used as a failure state)
    };

    await chatService.logToolEvent({
      chatId,
      toolSlug: toolCall.toolName || toolCall.type,
      toolCallId: toolCall.toolCallId || crypto.randomUUID(),
      input: toolCall.args || toolCall.input || {},
      state: status,
      statusId: statusMap[status],
      metadata
    });
  } catch (error) {
    logger.error("Failed to log tool invocation", {
      error,
      chatId,
      tool: toolCall?.toolName || toolCall?.type,
      status
    });
  }
}

/**
 * Create a streaming chat response with UI message support
 * This is the main utility for routes that need rich UI streaming
 */
export async function createStreamingChatResponse(
  config: ChatStreamConfig
): Promise<Response> {
  const metrics: PerformanceMetrics = {
    startTime: Date.now()
  };

  if (config.perfLog) {
    logger.info("[CHAT] Starting streaming response", {
      agentId: config.agentId,
      chatId: config.chatId,
      messageCount: config.messages?.length || 0,
      tenantId: config.tenantId
    });
  }

  try {
    // Initialize registries
    await ensureRegistriesInitialized({
      loadFromDatabase: true,
      perfLog: config.perfLog
    });
    metrics.initTime = Date.now() - metrics.startTime;

    // Load agent using findAgent which handles both UUID and slug lookups
    const agent = agentRegistry.findAgent(config.agentId);
    if (!agent) {
      throw new Error(`Agent not found: ${config.agentId}`);
    }

    if (!agent.isActive) {
      throw new Error(`Agent is not active: ${config.agentId}`);
    }

    const { entitlements } = await getTenantAgentEntitlements();
    if (!entitlements.allowedAgentSlugs.includes(agent.slug)) {
      throw new Error(`NOT_ALLOWED_AGENT:${agent.slug}`);
    }

    // Get model
    const modelId = config.modelId || agent.model || "openai:gpt-4o";
    const model = getModelById(modelId);
    metrics.modelLoadTime = Date.now() - metrics.startTime - metrics.initTime!;

    // Build tools with sanitized keys
    // Use enabledTools from context if provided, otherwise use agent's default tools
    const toolsToLoad = config.context?.enabledTools || agent.tools || [];
    await toolRegistry.preloadTools(toolsToLoad);
    const agentTools = toolRegistry.getAIToolsForAgent(toolsToLoad);
    const tools: Record<string, any> = {};
    Object.entries(agentTools).forEach(([slug, tool]) => {
      tools[slug] = tool;
    });

    // Debug logging
    if (config.perfLog) {
      logger.debug("[CHAT] Tools loaded for agent", {
        agentId: agent.id,
        requestedTools: toolsToLoad,
        loadedTools: Object.keys(tools),
        toolCount: Object.keys(tools).length
      });
    }

    // Build system prompt with context
    const systemPrompt = await buildSystemPrompt(agent, config.context);

    // Convert messages to standardized UIMessage format with parts
    const uiMessages = convertToUIMessages(config.messages);
    const coreMessages = convertToModelMessages(uiMessages);

    // Save the user message if persistence is enabled
    if (config.persist && config.chatId && uiMessages.length > 0) {
      const lastMessage = uiMessages[uiMessages.length - 1];
      if (lastMessage.role === "user") {
        try {
          await chatService.saveMessage({
            chatId: config.chatId,
            role: "user",
            message: { ...lastMessage, role: "user" }
          });
        } catch (error) {
          logger.error("Failed to save user message", {
            error,
            chatId: config.chatId,
            lastMessageId: lastMessage.id
          });
        }
      }
    }

    // No custom citation collection; AI SDK will stream native source parts with logging
    logger.info(
      "[SOURCE-STREAMING] Starting chat with native source streaming enabled"
    );

    // Create UI message stream with persistence
    const stream = createUIMessageStream({
      async onFinish({ responseMessage }) {
        // Ensure responseMessage has a role (fix for "Unsupported role: undefined" error)
        const messageRole = responseMessage.role || "assistant";

        // Log native source parts for validation
        const sourceParts = (responseMessage.parts || []).filter(
          (p: any) => p.type === "source-url" || p.type === "source-document"
        );
        if (sourceParts.length > 0) {
          logger.info("[SOURCE-STREAMING] Native source parts emitted", {
            count: sourceParts.length,
            types: sourceParts.map((p: any) => p.type)
          });
        }

        const messageWithRole = {
          ...responseMessage,
          role: messageRole,
          metadata: {
            ...(responseMessage.metadata || {}),
            reasoning_duration_ms: metrics.streamStartTime
              ? Math.max(0, Date.now() - metrics.streamStartTime)
              : undefined,
            completed_at: new Date().toISOString(),
            agentId: agent.id,
            agentName: agent.name,
            agentIcon: agent.icon,
            agentImageUrl: agent.secondaryImagePath
          }
        };

        // Log message structure for debugging
        logger.info("[CHAT] Response message structure", {
          agentId: config.agentId,
          messageId: responseMessage.id,
          role: messageRole,
          hasParts: !!responseMessage.parts,
          partsCount: responseMessage.parts?.length || 0,
          partTypes: responseMessage.parts?.map((p: any) => p.type) || [],
          sourceParts: sourceParts.length
        });

        if (!config.persist || !config.chatId) return;

        try {
          // Save the assistant response with guaranteed role and citations
          await chatService.saveMessage({
            chatId: config.chatId,
            role: messageRole,
            message: messageWithRole
          });

          // Log tool invocations from the response
          if (responseMessage.parts) {
            for (const part of responseMessage.parts) {
              if (
                part.type.startsWith("tool-") ||
                part.type === "dynamic-tool"
              ) {
                await logToolInvocation(config.chatId, part, "completed", {
                  part
                });
              }
            }
          }

          // Update chat title if first message
          const existingMessages = await chatService.getMessages(
            config.chatId,
            2
          );
          if (existingMessages.length <= 2 && uiMessages.length > 0) {
            const firstUserMessage = uiMessages.find(m => m.role === "user");
            if (firstUserMessage?.parts?.[0]?.type === "text") {
              const text = (firstUserMessage.parts[0] as any).text;
              await chatService.updateChat(config.chatId, {
                title: text.slice(0, 50) + (text.length > 50 ? "..." : "")
              });
            }
          }
        } catch (error) {
          logger.error("Failed to persist chat data", {
            error,
            chatId: config.chatId
          });
        }
      },

      async execute({ writer }) {
        metrics.streamStartTime = Date.now();
        let didRetry = false;

        // Track sources for deduplication and sequential ID assignment
        const collectedSources: any[] = [];
        let sourceCounter = 0;
        const seenSourceKeys = new Set<string>();

        // Check if using GPT-5 model for reasoning
        const isGPT5 =
          config.modelId?.includes("gpt-5") || agent.model?.includes("gpt-5");

        // Stream the model response with multi-step support
        const result = streamText({
          model,
          system: systemPrompt,
          messages: coreMessages,
          providerOptions: {
            ...agent.providerOptions,
            // Enable reasoning for GPT-5 models
            ...(isGPT5 && {
              openai: {
                ...agent.providerOptions?.openai,
                reasoningSummary: "auto", // Can be 'auto' or 'detailed'
                reasoningEffort: "low" // Can be 'minimal', 'low', 'medium', 'high'
              }
            })
          },
          tools: Object.keys(tools).length > 0 ? tools : undefined,
          toolChoice: Object.keys(tools).length > 0 ? "auto" : "none",
          // Temperature is not supported for reasoning models (GPT-5)
          ...(isGPT5
            ? {}
            : { temperature: config.temperature ?? agent.temperature ?? 0.7 }),
          stopWhen: stepCountIs(config.maxSteps ?? agent.maxSteps ?? 10),
          experimental_telemetry: {
            isEnabled: true,
            functionId: "agent.chat." + agent.slug,
            metadata: {
              surface: "chat",
              agent: agent.slug || agent.id,
              ...(config.tenantId && { tenantId: config.tenantId }),
              ...(config.chatId && { chatId: config.chatId })
            }
          },
          onStepFinish: async step => {
            // Collect sources from tool results
            if (step.toolResults) {
              for (const toolResult of step.toolResults) {
                const payload = toolResult.output as SprinterToolResult;
                if (!payload) continue;

                let parsed = payload;
                if (typeof parsed === "string") {
                  try {
                    parsed = JSON.parse(parsed);
                  } catch {
                    continue;
                  }
                }

                const sources = parsed?.sources;
                if (Array.isArray(sources) && sources.length > 0) {
                  logger.info("[SOURCE-STREAMING] Tool produced sources", {
                    tool: toolResult.toolName,
                    sourceCount: sources.length
                  });

                  // Convert sources to AI SDK format
                  const aiSdkSources = toAISdkSources(sources);

                  // Write each unique source; preserve existing sourceId if present
                  for (const sourcePart of aiSdkSources) {
                    // Build a stable dedupe key
                    const isDocument = sourcePart.type === "source-document";
                    const providerMeta: any = (sourcePart as any)
                      .providerMetadata;
                    const sprinterMeta: any = providerMeta?.sprinter || {};
                    const pageNum: number | undefined =
                      typeof sprinterMeta.pageNumber === "number"
                        ? sprinterMeta.pageNumber
                        : typeof providerMeta?.pageNumber === "number"
                          ? providerMeta.pageNumber
                          : undefined;

                    const url: string | undefined = (sourcePart as any).url;
                    const filename: string | undefined = (sourcePart as any)
                      .filename;

                    const docLabel =
                      url || filename || (sourcePart as any).title || "doc";
                    const key = isDocument
                      ? `doc|${docLabel}#p${pageNum ?? 0}`
                      : `url|${url || (sourcePart as any).title || "unknown"}`;

                    if (seenSourceKeys.has(key)) {
                      // Already streamed this page/doc; skip duplicate emission
                      continue;
                    }
                    seenSourceKeys.add(key);

                    // Assign a stable per-message sequential sourceId if missing
                    let sourceId = sourcePart.sourceId;
                    if (!sourceId || String(sourceId).trim().length === 0) {
                      sourceCounter++;
                      sourceId = String(sourceCounter);
                    }

                    const sourceWithId = {
                      ...sourcePart,
                      sourceId
                    };

                    writer.write(sourceWithId);
                    collectedSources.push(sourceWithId);

                    logger.debug("[SOURCE-STREAMING] Wrote source", {
                      id: sourceId,
                      type: sourcePart.type,
                      title: sourcePart.title,
                      pageNumber: pageNum
                    });
                  }
                }
              }
            }

            // Log each tool invocation as it completes
            if (config.persist && config.chatId && step.toolCalls) {
              for (const toolCall of step.toolCalls) {
                waitUntil(
                  logToolInvocation(config.chatId, toolCall, "completed", {
                    stepIndex: (step as any).stepIndex || 0
                  })
                );
              }
            }
            metrics.steps = (metrics.steps || 0) + 1;
          },
          onFinish: async ({ usage, text, finishReason }) => {
            metrics.totalTokens = usage?.totalTokens;
            if (config.perfLog) {
              logger.info("[PERF] Chat streaming metrics", {
                initTime: metrics.initTime,
                modelLoadTime: metrics.modelLoadTime,
                streamTime: Date.now() - metrics.streamStartTime!,
                totalTime: Date.now() - metrics.startTime,
                tokens: Math.max(0, Number(metrics.totalTokens || 0)),
                steps: metrics.steps,
                finishReason,
                responseLength: text?.length || 0
              });
            }

            // One-shot retry on content filter with stricter constraints
            if (!didRetry && finishReason === "content-filter") {
              didRetry = true;
              logger.warn(
                "[CHAT] Content filtered. Retrying once with stricter paraphrase-only mode"
              );

              const retryResult = streamText({
                model,
                system: `${systemPrompt}\n\nSAFETY OVERRIDE (one-time retry):\n- Paraphrase-only. Do not quote.\n- Do not include any PII.\n- Provide neutral summary only with inline citations if applicable.\n- If unsure, ask one clarifying question.`,
                messages: coreMessages,
                providerOptions: {
                  ...agent.providerOptions,
                  openai: {
                    ...(agent.providerOptions?.openai || {}),
                    textVerbosity: "low"
                  }
                },
                tools: Object.keys(tools).length > 0 ? tools : undefined,
                toolChoice: Object.keys(tools).length > 0 ? "auto" : "none",
                temperature: 0.2,
                stopWhen: stepCountIs(
                  (config.maxSteps ?? agent.maxSteps ?? 10) -
                    (metrics.steps || 0)
                ),
                onFinish: async ({
                  text: retryText,
                  finishReason: retryFinishReason
                }) => {
                  if (config.perfLog) {
                    logger.info("[PERF] Retry streaming metrics", {
                      finishReason: retryFinishReason,
                      responseLength: retryText?.length || 0
                    });
                  }

                  if (retryFinishReason === "content-filter") {
                    writer.write({
                      id: crypto.randomUUID(),
                      role: "assistant",
                      type: "text",
                      content: `I couldn't share the result due to provider safety filters. Could you rephrase or narrow the question? For example, specify the exact Selling Guide section or scenario (purchase vs refi, occupancy, and LTV).`
                    } as any);
                  }
                }
              });

              writer.merge(
                retryResult.toUIMessageStream({
                  sendReasoning: true,
                  sendStart: false,
                  sendFinish: true,
                  sendSources: false // We'll stream sources manually for inline citations
                })
              );
            }
          }
        });

        // Merge the model stream with native source streaming
        writer.merge(
          result.toUIMessageStream({
            sendReasoning: true,
            sendStart: true,
            sendFinish: true,
            sendSources: false // We'll stream sources manually for inline citations
          })
        );
      }
    });

    // Return SSE response in AI SDK UI format
    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    logger.error("Chat streaming error", {
      error,
      chatId: config.chatId,
      agentId: config.agentId
    });

    // Friendly error when model cannot download attachment URLs
    const message = (error instanceof Error && error.message) || "";
    if (message.includes("Error while downloading")) {
      return new Response(
        JSON.stringify({
          error: "Attachment download failed",
          message:
            "The AI provider couldn't download the attachment from the provided URL. Please try again or remove the file."
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: "Invalid request format",
          details: error?.message
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error?.message : "Internal server error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * Create a simple text streaming response (no UI components)
 * This is for routes that just need text streaming
 */
export async function createTextStreamingResponse(
  config: ChatStreamConfig
): Promise<Response> {
  const metrics: PerformanceMetrics = {
    startTime: Date.now()
  };

  try {
    // Initialize registries
    await ensureRegistriesInitialized({
      loadFromDatabase: true,
      perfLog: config.perfLog
    });

    // Load agent using findAgent which handles both UUID and slug lookups
    const agent = agentRegistry.findAgent(config.agentId);
    if (!agent) {
      throw new Error(`Agent not found: ${config.agentId}`);
    }

    // Get model
    const modelId = config.modelId || agent.model || "openai:gpt-4o";
    const model = getModelById(modelId);

    // Build tools
    await toolRegistry.preloadTools(agent.tools || []);
    const tools = toolRegistry.getAIToolsForAgent(agent.tools || []);

    // Build system prompt
    const systemPrompt = await buildSystemPrompt(agent, config.context);

    // Convert messages to standardized format
    const uiMessages = convertToUIMessages(config.messages);
    const coreMessages = convertToModelMessages(uiMessages);

    // Stream the response
    const result = streamText({
      model,
      system: systemPrompt,
      messages: coreMessages,
      tools: Object.keys(tools).length > 0 ? tools : undefined,
      toolChoice: Object.keys(tools).length > 0 ? "auto" : "none",
      temperature: config.temperature ?? agent.temperature ?? 0.7,
      stopWhen: stepCountIs(config.maxSteps ?? agent.maxSteps ?? 10),
      onFinish: async ({ usage, steps }) => {
        if (config.perfLog) {
          logger.info("[PERF] Text streaming metrics", {
            totalTime: Date.now() - metrics.startTime,
            tokens: usage?.totalTokens,
            steps: steps?.length
          });
        }
      }
    });

    // Return text stream response
    const response = result.toTextStreamResponse();

    // Add performance headers
    response.headers.set(
      "X-Response-Time",
      `${Date.now() - metrics.startTime}ms`
    );
    response.headers.set("Cache-Control", "no-cache, no-transform");
    response.headers.set("X-Content-Type-Options", "nosniff");

    return response;
  } catch (error) {
    logger.error("Text streaming error", {
      error,
      chatId: config.chatId,
      agentId: config.agentId
    });

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error?.message : "Internal server error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Note: The functions below are placeholders for AI SDK RSC features
// They require the ai/rsc package which is for React Server Components
// Uncomment and import from 'ai/rsc' when needed:

// import { createStreamableUI, createStreamableValue } from 'ai/rsc';

// /**
//  * Create a streamable UI for dynamic component rendering
//  * This follows the pattern from AI SDK docs for generative UI
//  */
// export function createDynamicUIStream() {
//   const stream = createStreamableUI();
//
//   return {
//     stream,
//     update: (component: ReactNode) => stream.update(component),
//     append: (component: ReactNode) => stream.append(component),
//     done: (component?: ReactNode) => stream.done(component),
//     value: stream.value
//   };
// }

// /**
//  * Create a streamable value for progressive data updates
//  * This follows the pattern from AI SDK docs for streaming data
//  */
// export function createDataStream<T = any>(initialValue?: T) {
//   const stream = createStreamableValue<T>(initialValue);
//
//   return {
//     stream,
//     update: (value: T) => stream.update(value),
//     append: (value: T extends Array<infer U> ? U : never) => stream.append(value),
//     done: (value?: T) => stream.done(value),
//     value: stream.value
//   };
// }

/**
 * Helper to handle errors consistently across all chat routes
 */
export function handleChatError(
  error: unknown,
  context?: { route?: string; agentId?: string }
): Response {
  const normalizedError = (() => {
    if (!error) return { message: "Unknown error" };
    if (error instanceof Error)
      return { message: error?.message, name: error.name, stack: error.stack };
    if (typeof error === "object") {
      const anyErr = error as any;
      return {
        code: anyErr.code,
        details: anyErr.details,
        hint: anyErr.hint,
        message: anyErr.message ?? "Unknown error"
      };
    }
    return { message: String(error) };
  })();

  logger.error(`Chat error in ${context?.route || "unknown"}`, {
    error: normalizedError,
    agentId: context?.agentId
  });

  if (error instanceof z.ZodError) {
    return new Response(
      JSON.stringify({
        error: "Invalid request format",
        details: error.issues
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (error instanceof Error && error?.message.includes("not found")) {
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (error instanceof Error && error?.message.includes("not active")) {
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(
    JSON.stringify({
      error: "Internal server error",
      message: error instanceof Error ? error?.message : "Unknown error"
    }),
    { status: 500, headers: { "Content-Type": "application/json" } }
  );
}

/**
 * Rate limiting utilities
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  clientId: string,
  limit: number = 10,
  windowMs: number = 60000
): { allowed: boolean; resetIn?: number } {
  const now = Date.now();
  const rateLimit = rateLimitMap.get(clientId);

  if (rateLimit) {
    if (now < rateLimit.resetTime) {
      if (rateLimit.count >= limit) {
        return {
          allowed: false,
          resetIn: Math.ceil((rateLimit.resetTime - now) / 1000)
        };
      }
      rateLimit.count++;
    } else {
      rateLimitMap.set(clientId, { count: 1, resetTime: now + windowMs });
    }
  } else {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + windowMs });
  }

  return { allowed: true };
}
