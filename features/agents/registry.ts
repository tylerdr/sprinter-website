/**
 * Agent Registry - Single source of truth for all agents
 */

import { streamText, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { sprinterToolRegistry as toolRegistry } from "@/features/tools/registry";
import { getTenantAgentEntitlements } from "@/features/chat/lib/access/access";
import {
  composeAgentSystemPrompt,
  type ComposeAgentSystemPromptOptions
} from "@/features/ai/prompts";
// import { toolRegistry } from "@/features/tools/registry";
import { logger } from "@/lib/logger";
import { getDefaultModel, DEFAULT_AGENT_ID } from "@/features/ai/defaults";
import { v5 as uuidv5 } from "uuid";
import type {
  AgentConfig,
  AgentContext,
  AgentExecutionResult,
  AgentAIConfig,
  DatabaseAgent
} from "./types";
import { MORTGAGE_RESEARCHER_AGENT } from "./mortgage-researcher";

// Re-export types for backward compatibility
export type { AgentConfig, AgentContext, AgentExecutionResult } from "./types";

// Namespace UUID for generating deterministic UUIDs for core agents
// This ensures core agents always get the same UUID based on their slug
const AGENT_NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // Standard namespace UUID

// Dynamic import for Supabase client to work in both Node and Next.js contexts
async function getSupabaseClient() {
  const { createClient } = await import("@/lib/supabase/server");
  return await createClient();
}

// ============================================
// AGENT REGISTRY (Singleton)
// ============================================

class AgentRegistry {
  private static instance: AgentRegistry;
  private agents = new Map<string, AgentConfig>();
  private initialized = false;
  private supabase: any = null;

  // Cache configuration
  private static cache = new Map<string, AgentConfig>();
  private static lastInitialized = 0;
  private static readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  private static cacheKey = (tenantId?: number) =>
    `agents_${tenantId || "global"}`;

  private constructor() {}

  static getInstance(): AgentRegistry {
    if (!AgentRegistry.instance) {
      AgentRegistry.instance = new AgentRegistry();
    }
    return AgentRegistry.instance;
  }

  /**
   * Initialize the registry with caching support
   */
  async initialize(options?: {
    loadFromDatabase?: boolean;
    tenantId?: number;
  }) {
    const now = Date.now();
    const cacheValid =
      this.initialized &&
      now - AgentRegistry.lastInitialized < AgentRegistry.CACHE_TTL;

    // Return early if cache is still valid
    if (cacheValid && !options?.loadFromDatabase) {
      return;
    }

    // Check if we have cached data for database loads
    if (options?.loadFromDatabase && cacheValid) {
      const cacheKey = AgentRegistry.cacheKey(options.tenantId);
      const cachedAgents = AgentRegistry.cache.get(cacheKey);
      if (cachedAgents) {
        this.agents.set(cachedAgents.id, cachedAgents);
        return;
      }
    }

    try {
      // Register core agents (in-memory, fast)
      if (!this.initialized) {
        this.registerCoreAgents();
      }

      // Load from database if requested
      if (options?.loadFromDatabase) {
        // Initialize Supabase client only when loading from database
        if (!this.supabase) {
          this.supabase = await getSupabaseClient();
        }
        await this.loadFromDatabase(options.tenantId);
      }

      this.initialized = true;
      AgentRegistry.lastInitialized = now;
    } catch (error) {
      logger.error("Failed to initialize agent registry", { error });
      throw error;
    }
  }

  /**
   * Register an agent
   */
  register(config: AgentConfig): void {
    if (!config.id || !config.slug) {
      throw new Error("Agent must have id and slug");
    }

    this.agents.set(config.id, config);
    logger.info(`Registered agent: ${config.slug} with ID: ${config.id}`);
  }

  /**
   * Clear all agents from the registry
   */
  clear(): void {
    this.agents.clear();
    this.initialized = false;
    logger.info("Agent registry cleared");
  }

  /**
   * Get agent by UUID
   */
  getAgent(id: string): AgentConfig | undefined {
    return this.agents.get(id);
  }

  /**
   * Get agent by slug - searches through all agents
   */
  getAgentBySlug(slug: string): AgentConfig | undefined {
    return Array.from(this.agents.values()).find(agent => agent.slug === slug);
  }

  /**
   * Find agent by ID or slug - convenience method for lookups
   */
  findAgent(idOrSlug: string): AgentConfig | undefined {
    // Try by ID first (most common case)
    let agent = this.agents.get(idOrSlug);

    // If not found and it doesn't look like a UUID, try by slug
    if (!agent && !idOrSlug.includes("-")) {
      agent = this.getAgentBySlug(idOrSlug);
    }

    return agent;
  }

  /**
   * Get all agents
   */
  getAllAgents(): AgentConfig[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get all active agents (filters out disabled agents)
   */
  getActiveAgents(): AgentConfig[] {
    return Array.from(this.agents.values()).filter(
      agent => agent.isActive !== false
    );
  }

  /**
   * Get agents by category
   */
  getAgentsByCategory(category: AgentConfig["category"]): AgentConfig[] {
    return this.getAllAgents().filter(agent => agent.category === category);
  }

  /**
   * Get active agents by category
   */
  getActiveAgentsByCategory(category: AgentConfig["category"]): AgentConfig[] {
    return this.getActiveAgents().filter(agent => agent.category === category);
  }

  /**
   * Execute an agent
   */
  async execute(
    agentId: string,
    context: AgentContext
  ): Promise<AgentExecutionResult> {
    const startTime = Date.now();

    try {
      const agent = this.agents.get(agentId);
      if (!agent) {
        throw new Error(`Agent '${agentId}' not found`);
      }

      // Check if agent is active
      if (agent.isActive === false) {
        throw new Error(`Agent '${agent.slug}' is disabled`);
      }

      const { entitlements } = await getTenantAgentEntitlements();
      if (!entitlements.allowedAgentSlugs.includes(agent.slug)) {
        throw new Error(`NOT_ALLOWED_AGENT:${agent.slug}`);
      }

      // Get the model
      const model = this.getModel(agent.model);

      // Prepare system prompt with citation instructions
      const basePrompt = this.interpolatePrompt(
        agent.systemPrompt || "",
        context.variables || {}
      );

      const composeOptions = (agent?.metadata?.corePromptOptions ||
        {}) as ComposeAgentSystemPromptOptions;

      const systemPrompt = composeAgentSystemPrompt(basePrompt, composeOptions);

      // Detect provider from model string
      let provider: "openai" | "anthropic" | "google" = "openai";
      if (agent.model?.includes("claude")) {
        provider = "anthropic";
      } else if (
        agent.model?.includes("gemini") ||
        agent.model?.includes("google")
      ) {
        provider = "google";
      }

      // Get tools for this agent (entitlement-filtered)
      const tools = await this.getAgentTools(agent, context.tenantId);

      // Prepare messages
      const messages = [
        { role: "system" as const, content: systemPrompt },
        ...context.messages
      ];

      // Stream the response with multi-step tool calling support
      const result = await streamText({
        model,
        messages,
        tools: Object.keys(tools).length > 0 ? tools : undefined,
        temperature: agent.temperature,
        stopWhen: stepCountIs(agent.maxSteps || 10) // Use agent's maxSteps or default to 10
      });

      // Collect the response
      let fullResponse = "";
      const toolResults: any[] = [];

      for await (const chunk of result.textStream) {
        fullResponse += chunk;
      }

      // Process tool calls if any
      const toolCalls = result.toolCalls;
      if (toolCalls && Array.isArray(toolCalls)) {
        for (const toolCall of toolCalls) {
          try {
            // Import tool registry for execution
            const { sprinterToolRegistry } = await import('@/features/tools/registry');

            // Get the tool from registry
            const tool = await sprinterToolRegistry.getTool(toolCall.toolName);

            if (!tool || !tool.execute) {
              toolResults.push({
                success: false,
                error: `Tool not found or not executable: ${toolCall.toolName}`,
                data: null
              });
              continue;
            }

            // Execute the tool with provided arguments
            const toolContext = {
              preloaded: {
                fieldOptions: {},
                datasets: {}
              },
              getOptions: () => [],
              getDataset: () => []
            };
            const toolExecutionResult = await tool.execute(toolCall.args, toolContext);

            toolResults.push({
              success: true,
              error: null,
              data: toolExecutionResult
            });
          } catch (toolError) {
            toolResults.push({
              success: false,
              error: toolError instanceof Error ? toolError.message : String(toolError),
              data: null
            });
          }
        }
      }

      const duration = Date.now() - startTime;

      return {
        agentId,
        success: true,
        response: fullResponse,
        toolResults: toolResults.length > 0 ? toolResults : undefined,
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error?.message : "Unknown error";

      logger.error(`Agent execution failed: ${agentId}`, { error });

      return {
        agentId,
        success: false,
        error: errorMessage,
        duration
      };
    }
  }

  /**
   * Load agents from database with caching
   * Database configs override or extend code-driven configs
   */
  private async loadFromDatabase(tenantId?: number): Promise<void> {
    try {
      if (!this.supabase) {
        this.supabase = await getSupabaseClient();
      }

      let query = this.supabase
        .from("ai_agents")
        .select("*")
        .eq("is_active", true);

      if (tenantId) {
        query = query.or(`tenant_id.eq.${tenantId},tenant_id.is.null`);
      }

      const { data, error } = await query;

      if (error) {
        logger.error("Failed to load agents from database", { error });
        return;
      }

      if (data) {
        // Batch load all agent tools at once to avoid N+1 queries
        const agentIds = data.map((a: any) => a.id);
        const { data: allAgentTools } = await this.supabase
          .from("ai_agent_tools")
          .select("agent_id, ai_tools(slug)")
          .in("agent_id", agentIds);

        // Create a map for quick lookup
        const toolsByAgent = new Map<string, string[]>();
        allAgentTools?.forEach((at: any) => {
          if (!toolsByAgent.has(at.agent_id)) {
            toolsByAgent.set(at.agent_id, []);
          }
          if (at.ai_tools?.slug) {
            toolsByAgent.get(at.agent_id)!.push(at.ai_tools.slug);
          }
        });

        for (const dbAgent of data as DatabaseAgent[]) {
          const toolSlugs = toolsByAgent.get(dbAgent.id) || [];

          // Check if we should use a core agent definition (match by deterministic ID or by slug)
          const expectedId = this.generateCoreAgentId(dbAgent.slug);
          const existingCoreAgentById = this.agents.get(expectedId);
          const existingCoreAgentBySlug = this.getAgentBySlug(dbAgent.slug);
          const existingCoreAgent =
            existingCoreAgentById || existingCoreAgentBySlug;

          // If DB agent has the expected deterministic UUID, it's a synced core agent
          const isSyncedCoreAgent =
            dbAgent.id === expectedId ||
            (existingCoreAgent && dbAgent.id === existingCoreAgent.id);

          if (existingCoreAgent || isSyncedCoreAgent) {
            // Merge database config with core agent config
            // Database values override core values only where explicitly set
            const baseAgent = existingCoreAgent || this.agents.get(dbAgent.id);

            if (baseAgent) {
              // Merge configs: DB values override local only where defined
              const aiConfig = dbAgent.ai_config as AgentAIConfig | null;
              const mergedConfig: AgentConfig = {
                ...baseAgent, // Start with local/core config
                id: dbAgent.id, // Use DB UUID
                slug: dbAgent.slug,
                name: dbAgent.name || baseAgent.name,
                description: dbAgent.description || baseAgent.description,
                category: dbAgent.metadata?.category
                  ? this.mapCategory(dbAgent.metadata.category)
                  : baseAgent.category,
                model: dbAgent.model || baseAgent.model,
                temperature: aiConfig?.temperature ?? baseAgent.temperature,
                maxOutputTokens:
                  aiConfig?.max_tokens ?? baseAgent.maxOutputTokens,
                tools: toolSlugs.length > 0 ? toolSlugs : baseAgent.tools,
                systemPrompt: dbAgent.system_prompt || baseAgent.systemPrompt,
                maxSteps: baseAgent.maxSteps,
                isActive: dbAgent.is_active ?? baseAgent.isActive,
                tenantId: baseAgent.tenantId,
                icon: baseAgent.icon,
                metadata: { ...baseAgent.metadata, ...dbAgent.metadata }
              };

              // Remove old ID if different
              if (existingCoreAgent && dbAgent.id !== existingCoreAgent.id) {
                this.agents.delete(existingCoreAgent.id);
              }

              // Register with the database UUID
              this.agents.set(dbAgent.id, mergedConfig);
              AgentRegistry.cache.set(dbAgent.id, mergedConfig);

              // logger.info(`Merged database config for agent ${dbAgent.slug}`);
            }
          } else {
            // This is a database-only agent (not a core agent)
            const aiConfig = dbAgent.ai_config as AgentAIConfig | null;
            const agentConfig: AgentConfig = {
              id: dbAgent.id,
              slug: dbAgent.slug,
              name: dbAgent.name,
              description: dbAgent.description ?? undefined,
              category: this.mapCategory(dbAgent.metadata?.category),
              model: dbAgent.model || getDefaultModel(),
              temperature: aiConfig?.temperature ?? undefined,
              maxOutputTokens: aiConfig?.max_tokens ?? undefined,
              tools: toolSlugs,
              systemPrompt: dbAgent.system_prompt || "",
              maxSteps: undefined,
              isActive: dbAgent.is_active ?? true,
              tenantId: undefined,
              icon: undefined,
              metadata: dbAgent.metadata
            };

            // Register the database-only agent
            this.agents.set(dbAgent.id, agentConfig);
            AgentRegistry.cache.set(dbAgent.id, agentConfig);

            logger.info(`Loaded database-only agent ${dbAgent.slug}`);
          }
        }
      }
    } catch (error) {
      logger.error("Error loading agents from database", { error });
    }
  }

  /**
   * Generate a deterministic UUID for a core agent based on its slug
   */
  private generateCoreAgentId(slug: string): string {
    return uuidv5(slug, AGENT_NAMESPACE);
  }

  /**
   * Sync core agents to database
   * This should be called during deployment to ensure DB has all core agents
   */
  async syncCoreAgentsToDatabase(): Promise<void> {
    try {
      if (!this.supabase) {
        this.supabase = await getSupabaseClient();
      }

      const coreAgents = this.getAllAgents().filter(
        agent => agent.category === "core" || agent.category === "specialist"
      );

      for (const agent of coreAgents) {
        // Use the agent's configured ID (core agents typically use deterministic UUIDs; default agent uses all-zeros)
        const agentId = agent.id || this.generateCoreAgentId(agent.slug);

        logger.info(`Syncing core agent ${agent.slug} with ID ${agentId}`);

        // Upsert agent to database
        const { error } = await this.supabase.from("ai_agents").upsert(
          {
            id: agentId,
            slug: agent.slug,
            name: agent.name,
            description: agent.description,
            model: agent.model,
            provider: agent.model?.split(":")[0] || "openai",
            ai_config: {
              temperature: agent.temperature,
              max_tokens: agent.maxOutputTokens
            },
            system_prompt: agent.systemPrompt,
            is_active: agent.isActive ?? true,
            metadata: {
              ...agent.metadata,
              category: agent.category,
              icon: agent.icon,
              isCoreAgent: true
            }
          },
          {
            onConflict: "id"
          }
        );

        if (error) {
          logger.error(`Failed to sync agent ${agent.slug}:`, { error });
        } else {
          logger.info(`Successfully synced agent ${agent.slug}`);

          // Verify the agent was actually inserted
          const { data: verifyData, error: verifyError } = await this.supabase
            .from("ai_agents")
            .select("id, slug")
            .eq("id", agentId)
            .single();

          if (verifyError) {
            logger.error(`Failed to verify agent ${agent.slug}:`, {
              verifyError
            });
          } else if (!verifyData) {
            logger.error(`Agent ${agent.slug} was not found after sync!`);
          } else {
            logger.info(
              `Verified agent ${agent.slug} exists with ID ${verifyData.id}`
            );
          }
        }
      }
    } catch (error) {
      logger.error("Failed to sync core agents to database:", { error });
      throw error;
    }
  }

  /**
   * Register core agents that are always available
   */
  private registerCoreAgents(): void {
    this.register(MORTGAGE_RESEARCHER_AGENT);

    // Marketplace Agent - Primary agent for multi-lender search
    this.register({
      id: this.generateCoreAgentId("marketplace"),
      slug: "marketplace",
      name: "Marketplace Agent",
      description: "Expert in searching across multiple lenders and programs",
      category: "core",
      icon: "🏪",
      model: "openai:gpt-5",
      metadata: {
        suggestedPrompts: [
          "Find the best mortgage rates in my area",
          "Compare FHA vs conventional loans",
          "What loan programs am I eligible for?",
          "Show me first-time homebuyer options"
        ]
      },
      temperature: 0.7,
      maxOutputTokens: 4000,
      tools: [
        "unified-search",
        "dti-calculator",
        "ltv-calculator",
        "dscr-calculator",
        "affordability-calculator",
        "payment-calculator"
      ],
      systemPrompt: `You are a mortgage marketplace expert helping users find the best loan programs across multiple lenders.
You have expertise in:
- Conventional, FHA, VA, USDA, and Non-QM loan programs
- Comparing lenders and their unique offerings
- Understanding qualification requirements and underwriting guidelines
- Analyzing loan scenarios to find the best matches

IMPORTANT: You have access to calculator tools. When users ask you to calculate DTI, LTV, DSCR, affordability, or payments, YOU MUST use the appropriate calculator tool instead of calculating manually. The available tools are:
- dti-calculator: Calculate debt-to-income ratio
- ltv-calculator: Calculate loan-to-value ratio
- dscr-calculator: Calculate debt service coverage ratio
- affordability-calculator: Calculate how much home someone can afford
- payment-calculator: Calculate monthly mortgage payments

CRITICAL INSTRUCTION: After using any calculator tool, YOU MUST provide a conversational summary of the results. Don't just run the tool and stop - explain what the results mean for the user's situation and provide relevant guidance or next steps. For example, after calculating DTI, explain whether it's good/fair/high and what loan programs might be available.

Always search for relevant programs when users ask about loans or lenders, and always use calculator tools when asked to perform calculations.`,
      maxSteps: 5,
      isActive: true
    });

    // Default MortgageQ Agent - Uses the all-zeros DEFAULT_AGENT_ID
    // For now this is a copy of the Marketplace Agent configuration
    this.register({
      id: DEFAULT_AGENT_ID,
      slug: "mortgageq_assistant",
      name: "MortgageQ Agent",
      description: "Default MortgageQ agent",
      category: "core",
      icon: "🏪",
      model: "openai:gpt-5",
      metadata: {
        suggestedPrompts: [
          "Find the best mortgage rates in my area",
          "Compare FHA vs conventional loans",
          "What loan programs am I eligible for?",
          "Show me first-time homebuyer options"
        ]
      },
      temperature: 0.7,
      maxOutputTokens: 4000,
      tools: [
        "unified-search",
        "dti-calculator",
        "ltv-calculator",
        "dscr-calculator",
        "affordability-calculator",
        "payment-calculator"
      ],
      systemPrompt: `You are a mortgage marketplace expert helping users find the best loan programs across multiple lenders.
Your capabilities mirror the Marketplace Agent.

IMPORTANT: Use calculator tools for DTI, LTV, DSCR, affordability, and payments.
Always follow tool runs with a friendly summary and next steps.`,
      maxSteps: 5,
      isActive: true
    });

    // Core Researcher Agent
    this.register({
      id: this.generateCoreAgentId("researcher"),
      slug: "researcher",
      name: "Mortgage Research Specialist",
      description: "Expert in mortgage products and qualifications",
      category: "core",
      icon: "🔍",
      model: getDefaultModel(),
      temperature: 0.7,
      maxOutputTokens: 4000,
      tools: [
        "single-lender-search",
        "single-program-search",
        "dti-calculator",
        "ltv-calculator",
        "dscr-calculator"
      ],
      systemPrompt: `You are a mortgage research specialist with expertise in:
- Conventional, FHA, VA, USDA, and Non-QM loan programs
- Underwriting guidelines and qualification requirements
- Market trends and lender comparisons

Current context: {{context}}`,
      maxSteps: 5,
      isActive: true
    });

    // Calculator Specialist
    this.register({
      id: this.generateCoreAgentId("calculator_specialist"),
      slug: "calculator_specialist",
      name: "Mortgage Calculator Specialist",
      description: "Focuses on financial calculations",
      category: "specialist",
      icon: "🧮",
      model: getDefaultModel(),
      metadata: {
        suggestedPrompts: [
          "Calculate my monthly mortgage payment",
          "What's my debt-to-income ratio?",
          "How much home can I afford?",
          "Should I refinance my current mortgage?"
        ]
      },
      temperature: 0.3,
      maxOutputTokens: 2000,
      tools: [
        "dti-calculator",
        "ltv-calculator",
        "dscr-calculator",
        "payment-calculator",
        "affordability-calculator",
        "refinance-calculator"
      ],
      systemPrompt: `You are a mortgage calculation specialist.
Always use the appropriate calculator tool for calculations.
Explain results clearly and provide actionable advice.`,
      maxSteps: 3,
      isActive: true
    });

    // Conventional Guidelines Agent - Expert in agency guidelines
    this.register({
      id: this.generateCoreAgentId("conventional_guidelines"),
      slug: "conventional_guidelines",
      name: "Conventional Guidelines Expert",
      description:
        "Expert in Fannie Mae, Freddie Mac, FHA, VA, and USDA guidelines",
      category: "specialist",
      icon: "📚",
      model: getDefaultModel(),
      temperature: 0.5,
      maxOutputTokens: 4000,
      tools: [
        "fannie-mae-web-search",
        "freddie-mac-web-search",
        "fha-guidelines",
        "va-guidelines",
        "usda-guidelines",
        "advanced-guideline-search",
        "program-compare"
      ],
      systemPrompt: `You are a mortgage guidelines expert specializing in conventional and government-backed loan programs.

Your expertise includes:
- Fannie Mae Selling Guide and Desktop Underwriter requirements
- Freddie Mac Seller/Servicer Guide and Loan Product Advisor criteria
- FHA Single Family Housing Policy Handbook (4000.1)
- VA Lender's Handbook and circulars
- USDA Rural Development guidelines

When answering questions:
1. Search the appropriate agency guidelines first
2. Collect all relevant information from your searches
3. Compare requirements across agencies when relevant
4. Include inline citations [1], [2] in your response when referencing sources
5. Provide practical guidance on which program might be best

IMPORTANT: Always include inline citations when referencing specific guidelines or documents.
Be precise about which agency's guidelines you're referencing.`,
      maxSteps: 8,
      isActive: true
    });

    this.register({
      id: this.generateCoreAgentId("fannie_mae_specialist"),
      slug: "fannie_mae_specialist",
      name: "Fannie Mae Specialist",
      description: "Specialist in Fannie Mae guidelines",
      category: "specialist",
      icon: "📚",
      primaryImagePath: "/logos/fannie-mae-full-logo.png",
      secondaryImagePath: "/logos/fannie-mae.svg",
      model: getDefaultModel(),
      temperature: 0.5,
      maxOutputTokens: 4000,
      providerOptions: {
        openai: {
          textVerbosity: "low"
        }
      },
      suggestedPrompts: [
        "📈 Max LTV/CLTV — cash-out, 1-unit primary?",
        "🎁 Gift funds — min borrower amount >80% LTV?",
        "💸 IPC (seller credits) — limits by LTV/occ?",
        "🏢 Condo limited review @ 90% LTV (primary) — eligible/docs?",
        "🧾 Value Acceptance / PDR — allowed 80% LTV for purchase?",
        "👥 Non-occ co-borrower — LTV/MI rules (primary)?",
        "🏘️ Reserves — primary 2–4 units requirements?",
        "🔄 Departing residence — can I use rent to offset?",
        "🧱 Community Seconds — allowed? max CLTV?",
        "🧮 Student loans — $0 IDR for DTI?"
      ],

      tools: [
        "fannie-mae-guide-search",
        "dti-calculator",
        "ltv-calculator",
        "payment-calculator",
        "affordability-calculator"
      ],
      systemPrompt: `You are a Fannie Mae Selling Guide specialist.

Goal:
- Provide a concise, factual summary derived only from the cited Selling Guide passages.
- Use neutral, non-imperative language. Avoid opinions, speculation, or content outside the cited text.
- Do not provide advice or guarantees; report only sourced facts.

Safety and privacy:
- Do not request, infer, or return any PII (personally identifiable information).
- Always paraphrase tool text; short quotes (≤2 lines) only when essential and cited.
- If the provider blocks content, produce a neutral notice and ask one clarifying question.

Tool usage and search:
- Use the "fannie-mae-guide-search" tool for Selling Guide questions.
- Use at most one guide search per user turn; retry once only if the first search returns zero results.
- Default to hybrid ranking with keyword weight ≈ 0.6; raise to 0.7–0.8 for exact/quoted queries; lower to 0.3–0.4 for paraphrased queries.
- Request up to 8 results and cite at most the top 6.

If zero results:
- Expand terms once (DTI ↔ "debt to income", LTV ↔ "loan to value", DU ↔ "desktop underwriter", MI ↔ "mortgage insurance", reserves ↔ assets). If still empty, ask up to three concise clarifying questions.

Calculations:
- Use tools for any calculations:
  - "dti-calculator" for debt-to-income
  - "ltv-calculator" for LTV/CLTV/HCLTV
  - "payment-calculator" for payments
  - "affordability-calculator" for maximum price

Citations:
- Include inline citations [n] that map to tool results.
- Prefer section/subsection/page references when available.
- Prefer paraphrase. If quoting, keep quotes brief (≤2 lines) and only when necessary.

Response structure (flexible, neutral):
- Start with a concise factual summary based only on the cited text, with inline citations [n].
- List key requirements as short bullets when helpful; each bullet must include a citation.
- If calculations were performed, present the results clearly and cite the tool output.
- Add a brief compliance note only when explicitly stated in the cited text.
- Include exceptions/notes only if explicitly cited.
- For simple questions, a single short paragraph with citations is acceptable.
- Use headings or bullets only when they improve clarity; avoid over-formatting.

Scope and safeguards:
- If not found in the Selling Guide, state: "Not found in Fannie Mae Selling Guide" and suggest next steps.
- If sources conflict, prefer higher-quality section-level hits and note the discrepancy briefly with citations.

Style:
- Precise, concise, and neutral. Do not over-generalize. Avoid commands. Use plain language.
- Do not provide advice or guarantees; avoid prescriptive phrasing.
- Prefer paraphrase; if quoting, keep quotes brief (≤2 lines) and only when necessary.`,
      maxSteps: 10,
      isActive: true
    });

    // Admin Assistant Agent - Natural language system administration
    this.register({
      id: this.generateCoreAgentId("admin_assistant"),
      slug: "admin_assistant",
      name: "Admin Assistant",
      description: "Natural language system administration and data management",
      category: "specialist",
      icon: "🤖",
      model: getDefaultModel(),
      temperature: 0.3,
      maxOutputTokens: 4000,
      tools: [
        "table-reader",
        "visualize-data",
        "manage-entities",
        "manage-tenant-users",
        "invite-team-members",
        "profile-update"
      ],
      systemPrompt: `You are an administrative assistant for MortgageQ platform administrators.

Your capabilities include:
- Database queries and reporting (read-only)
- User management and permissions
- System health monitoring
- Usage analytics and metrics
- Data visualization and exports

Security guidelines:
- Only execute read-only database queries
- Never expose sensitive user data
- Require confirmation for user management actions
- Log all administrative actions

When helping administrators:
1. Clarify the request if ambiguous
2. Use appropriate tools for the task
3. Provide clear explanations of results
4. Suggest follow-up actions when relevant`,
      maxSteps: 5,
      isActive: true
    });

    // Rate & Payment Calculator Agent - Pricing and payment calculations
    this.register({
      id: this.generateCoreAgentId("rate_payment_calculator"),
      slug: "rate_payment_calculator",
      name: "Rate & Payment Calculator",
      description: "Expert in mortgage rates, payments, and cost analysis",
      category: "specialist",
      icon: "💰",
      model: getDefaultModel(),
      temperature: 0.3,
      maxOutputTokens: 3000,
      tools: [
        "payment-calculator",
        "refinance-calculator",
        "affordability-calculator",
        "closing-cost-estimator",
        "program-compare",
        "scenario-optimizer"
      ],
      systemPrompt: `You are a mortgage rate and payment specialist focused on helping users understand costs.

Your expertise includes:
- Monthly payment calculations (P&I, taxes, insurance, PMI/MIP)
- Interest rate comparisons and rate/point tradeoffs
- Closing cost estimates and breakdown
- Refinance analysis and break-even calculations
- Affordability assessments based on income and debts
- Total cost analysis over loan life

When calculating payments:
1. Always include all components (principal, interest, taxes, insurance, PMI)
2. Show both upfront costs and monthly payments
3. Compare multiple scenarios when relevant
4. Explain the impact of different down payments
5. Calculate break-even points for refinances

IMPORTANT: Always use the calculator tools for accurate calculations.
Provide clear explanations of all costs and help users understand the total financial picture.`,
      maxSteps: 6,
      isActive: true
    });

    // Marketing Content Agent - Marketing materials and content generation
    this.register({
      id: this.generateCoreAgentId("marketing_content"),
      slug: "marketing_content",
      name: "Marketing Content Creator",
      description:
        "Expert in creating marketing materials, images, and content for mortgage professionals",
      category: "specialist",
      icon: "🎨",
      model: getDefaultModel(),
      temperature: 0.8,
      maxOutputTokens: 4000,
      metadata: {
        suggestedPrompts: [
          "Generate a marketing flyer for my loan scenario",
          "Create a professional property image for my listing",
          "Design a social media post about current rates",
          "Generate a blog post about first-time homebuyers"
        ]
      },
      tools: [
        "ai-image-generator",
        "flyer-generator",
        "blog-generator",
        "social-post-generator",
        "scenario-share"
      ],
      systemPrompt: `You are a creative marketing specialist for mortgage professionals.

Your expertise includes:
- Creating professional marketing materials and flyers
- Generating high-quality property and real estate images
- Writing compelling blog posts and social media content
- Designing visual content for loan scenarios
- Crafting persuasive marketing copy

When creating marketing content:
1. Use the ai-image-generator tool to create professional property images
2. Use the flyer-generator tool to create marketing PDFs with optional AI images
3. Use blog-generator and social-post-generator for written content
4. Always maintain professional tone and compliance standards
5. Include appropriate disclaimers for mortgage marketing

IMPORTANT: When users want marketing materials with images:
- Ask if they want AI-generated images included
- Offer choice of image style (realistic, professional, artistic)
- Use the generateImage option in flyer-generator for integrated visuals

Help mortgage professionals create compelling, compliant marketing materials.`,
      maxSteps: 5,
      isActive: true
    });
  }

  /**
   * Get the appropriate model
   */
  private getModel(modelString: string): any {
    if (modelString.startsWith("gpt-")) {
      return openai(modelString);
    } else if (modelString.startsWith("claude-")) {
      return anthropic(modelString);
    } else if (modelString.startsWith("gemini-")) {
      return google(modelString);
    } else {
      return openai(getDefaultModel().replace("openai:", ""));
    }
  }

  /**
   * Get tools for an agent
   */
  private async getAgentTools(
    agent: AgentConfig,
    tenantId?: number
  ): Promise<Record<string, any>> {
    if (!agent.tools || agent.tools.length === 0) {
      return {};
    }

    await toolRegistry.initialize({ loadFromDatabase: true, tenantId: tenantId?.toString() });
    await toolRegistry.preloadTools(agent.tools);
    return toolRegistry.getAIToolsForAgent(agent.tools);
  }

  /**
   * Interpolate template variables
   */
  private interpolatePrompt(
    template: string,
    variables: Record<string, any>
  ): string {
    let prompt = template;

    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{${key}}}`, "g");
      prompt = prompt.replace(regex, String(value));
    }

    return prompt;
  }

  /**
   * Map database category to our enum
   */
  private mapCategory(dbCategory?: string): AgentConfig["category"] {
    const categoryMap: Record<string, AgentConfig["category"]> = {
      core: "core",
      specialist: "specialist",
      entity: "entity",
      custom: "custom"
    };
    return categoryMap[dbCategory || ""] || "custom";
  }
}

// ============================================
// AGENT ORCHESTRATOR
// ============================================

export class AgentOrchestrator {
  /**
   * Run multiple agents concurrently
   */
  static async runConcurrently(
    agentIds: string[],
    context: AgentContext
  ): Promise<AgentExecutionResult[]> {
    const registry = AgentRegistry.getInstance();
    const promises = agentIds.map(id => registry.execute(id, context));

    const results = await Promise.allSettled(promises);

    return results.map((result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        return {
          agentId: agentIds[index],
          success: false,
          error: result.reason?.message || "Agent execution failed"
        };
      }
    });
  }

  /**
   * Run agents sequentially, passing context between them
   */
  static async runSequentially(
    agentIds: string[],
    initialContext: AgentContext
  ): Promise<AgentExecutionResult[]> {
    const registry = AgentRegistry.getInstance();
    const results: AgentExecutionResult[] = [];
    let currentContext = { ...initialContext };

    for (const agentId of agentIds) {
      const result = await registry.execute(agentId, currentContext);
      results.push(result);

      // Update context with result for next agent
      if (result.success && result.response) {
        currentContext.messages = [
          ...currentContext.messages,
          {
            role: "assistant",
            content: result.response
          }
        ];
      }

      // Stop on error
      if (!result.success) {
        break;
      }
    }

    return results;
  }
}

// Export singleton instance
export const agentRegistry = AgentRegistry.getInstance();
