"use client";

import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls
} from "ai";
import { useState, useEffect, useRef, useCallback, useMemo, type RefObject } from "react";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton
} from "@/components/ai-elements/conversation";
import { DefaultChatPlaceholder } from "./default-chat-placeholder";
import { AgentSelectorPlaceholder } from "./agent-selector-placeholder";
import type { AgentConfig } from "@/features/agents/registry";
import { toast } from "sonner";
import { logger } from "@/lib/logger";
import { DEFAULT_AGENT_ID } from "@/features/ai/defaults";
import { AgentChatHeader } from "@/features/chat/components/agent-chat-header";
import AgentChatInput from "@/features/chat/components/agent-chat-input";
import AgentChatMessages from "@/features/chat/components/agent-chat-messages";
import AgentChatSuggestions from "@/features/chat/components/agent-chat-suggestions";
import AgentChatAttachments from "@/features/chat/components/attachments/agent-chat-attachments";
import { AgentChatAttachmentItem } from "@/features/chat/components/attachments/utils";
import { cn } from "@/lib/utils";
import { uploadChatAttachmentsAction } from "@/lib/file-upload/actions";
import { refreshChatHistory } from "@/features/chat/hooks/use-chat-history";
import { useNavWithLoading } from "@/features/chat/hooks/use-nav-with-loading";
import {
  DEFAULT_CHAT_HISTORY_LIMIT,
  MAX_FILES_PER_SELECTION,
  MAX_TOTAL_ATTACHMENTS,
  MAX_FILE_SIZE_BYTES
} from "@/features/chat/constants";
// Define the type locally since it's not exported from the module
type PromptInputMessage = string;

export interface AgentChatProps {
  authData: {
    userId: string;
    inputLocked?: boolean;
    inputLockMessage?: string;
    workspaceId?: string;
  };
  agentId?: string;
  apiEndpoint?: string;
  initialMessages?: any[];
  placeholder?: string;
  className?: string;
  sessionId?: string;
  context?: Record<string, any>;
  onMessagesChange?: (messages: any[]) => void;
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
  // Optional: allow agent switching and list of available agents
  availableAgents?: AgentConfig[];
  enableAgentSwitching?: boolean;
  // Optional: custom placeholder component for empty state
  placeholderComponent?: React.ReactNode;
}

/**
 * Unified Agent Chat Component
 * Replaces all duplicate chat implementations with a single reusable component
 */
function AgentChatInner({
  authData,
  agentId: initialAgentId = DEFAULT_AGENT_ID,
  apiEndpoint = "/api/chat",
  initialMessages = [],
  placeholder = "Type your message...",
  className,
  sessionId: providedSessionId,
  context = {},
  onMessagesChange,
  showHeader = true,
  headerTitle = "AI Assistant",
  headerDescription,
  availableAgents = [],
  enableAgentSwitching = false,
  placeholderComponent
}: AgentChatProps) {
  const { push: pushWithMerged, replace: replaceWithMerged } =
    useNavWithLoading();
  // Generate a proper chatId when sessionId is "new"
  const [sessionId, setSessionId] = useState(() => {
    if (providedSessionId === "new") {
      return uuidv4(); // Generate new UUID for new chats
    }
    return providedSessionId || uuidv4();
  });
  const [chatCreated, setChatCreated] = useState(providedSessionId !== "new");
  const [input, setInput] = useState("");
  const [uploadedAttachments, setUploadedAttachments] = useState<
    AgentChatAttachmentItem[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [currentAgentId, setCurrentAgentId] = useState<string>(initialAgentId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [enabledTools, setEnabledTools] = useState<Set<string>>(new Set());
  // Citations now handled via native source parts

  // Runtime guard: ensure we have at least one agent
  const fallbackAgents: AgentConfig[] = useMemo(
    () => [
      {
        id: DEFAULT_AGENT_ID,
        slug: "marketplace",
        name: "Marketplace Agent",
        model: "openai:gpt-5",
        isActive: true,
        tools: []
      }
    ],
    []
  );

  const effectiveAgents = useMemo(
    () =>
      availableAgents && availableAgents.length > 0
        ? availableAgents
        : fallbackAgents,
    [availableAgents, fallbackAgents]
  );

  // Resolve the currently selected agent (fallback to first active/default)
  const selectedAgent =
    effectiveAgents.find(
      a => a.id === currentAgentId || a.slug === currentAgentId
    ) ||
    effectiveAgents.find(a => a.isActive !== false) ||
    effectiveAgents[0];

  // Generate suggestions based on enabled tools and agent/tool metadata
  const suggestions = useMemo(() => {
    // Default fallback suggestions for tools without metadata
    const toolSuggestions: Record<string, string[]> = {
      "marketplace-search": [
        "What are today's mortgage rates?",
        "Find VA loan programs near me",
        "Show me jumbo loan options"
      ],
      "lender-search": [
        "Which lenders offer FHA loans?",
        "Find lenders with the best rates",
        "Show me local mortgage lenders"
      ],
      "program-search": [
        "Compare refinance programs",
        "Find programs for first-time buyers",
        "Show me no-PMI loan programs"
      ],
      "dti-calculator": [
        "Help me calculate my DTI ratio",
        "What's my debt-to-income ratio?",
        "Check if my DTI qualifies"
      ],
      "ltv-calculator": [
        "Calculate my loan-to-value ratio",
        "What's my LTV percentage?",
        "Check my equity position"
      ],
      "dscr-calculator": [
        "Calculate DSCR for investment property",
        "What's my debt service coverage?",
        "Check rental property cash flow"
      ],
      "payment-calculator": [
        "Calculate my monthly payment",
        "What will my mortgage payment be?",
        "Estimate total housing costs"
      ],
      "refinance-calculator": [
        "Should I refinance my mortgage?",
        "Calculate refinance savings",
        "Compare current vs new loan"
      ],
      "blog-post-generator": [
        "Write a blog about mortgage trends",
        "Create content about home buying",
        "Generate article on refinancing"
      ],
      "social-post-generator": [
        "Create a LinkedIn post about rates",
        "Generate Twitter thread on lending",
        "Write Instagram caption for realtors"
      ]
    };

    const suggestions: string[] = [];
    const selectedAgent = effectiveAgents.find(
      a => a.id === currentAgentId || a.slug === currentAgentId
    );

    // First, add agent-specific suggested prompts from metadata
    if (selectedAgent?.suggestedPrompts) {
      suggestions.push(...selectedAgent.suggestedPrompts);
    }

    const agentTools = selectedAgent?.tools || [];

    // Add suggestions for each enabled tool
    // Note: In future, we'll fetch tool metadata from DB to get tool-specific suggestedPrompts
    // For now, use the fallback suggestions
    enabledTools.forEach(tool => {
      if (agentTools.includes(tool) && toolSuggestions[tool]) {
        suggestions.push(...toolSuggestions[tool].slice(0, 2));
      }
    });

    // If no tool-specific suggestions, add defaults
    if (suggestions.length === 0) {
      suggestions.push(
        "What are today's mortgage rates?",
        "Help me calculate DTI",
        "Find VA loan programs",
        "Compare refinance options",
        "Calculate monthly payment",
        "Find the best lenders"
      );
    }

    // Ensure we have at least 8 suggestions for good scrolling UX
    const defaults = [
      "Explain FHA vs conventional loans",
      "What credit score do I need?",
      "How much can I afford to borrow?",
      "Explain closing costs",
      "What documents do I need?",
      "How do points work?"
    ];

    // Remove duplicates first
    const uniqueSuggestions = Array.from(new Set(suggestions));

    while (uniqueSuggestions.length < 8 && defaults.length > 0) {
      const suggestion = defaults.shift();
      if (suggestion && !uniqueSuggestions.includes(suggestion)) {
        uniqueSuggestions.push(suggestion);
      }
    }

    return uniqueSuggestions.slice(0, 6);
  }, [enabledTools, currentAgentId, effectiveAgents]);

  // Initialize enabled tools based on selected agent
  useEffect(() => {
    if (selectedAgent?.tools) {
      setEnabledTools(new Set(selectedAgent.tools));
    } else {
      setEnabledTools(new Set());
    }
  }, [selectedAgent?.id]); // Only re-run when the selected agent ID changes

  const {
    messages,
    sendMessage,
    status,
    error,
    setMessages,
    stop,
    regenerate
  } = useChat({
    id: `chat-${sessionId}-${currentAgentId}`,
    transport: new DefaultChatTransport({
      api: apiEndpoint,
      prepareSendMessagesRequest: ({ messages, ...rest }) => ({
        ...rest,
        body: {
          messages: messages.slice(-12),
          agentId: currentAgentId,
          chatId: sessionId,
          sessionId,
          workspaceId: authData.workspaceId,
          enabledTools: Array.from(enabledTools),
          ...context,
          context: {
            ...(context || {}),
            enabledTools: Array.from(enabledTools),
            agentId: currentAgentId
          }
        }
      })
    }),
    experimental_throttle: 50,
    // Disable auto-send to prevent message splitting - let multi-step complete in single message
    // sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    onFinish: async ({ message }) => {
      // Debug logging to understand message structure
      if (message) {
        logger.info("[CHAT] Message finished", {
          id: message.id,
          role: message.role,
          hasParts: !!message.parts,
          partsCount: message.parts?.length || 0,
          partTypes: message.parts?.map((p: any) => p.type) || []
        });
      }

      if (onMessagesChange) {
        onMessagesChange(messages);
      }

      // Handle redirect from /chat/new to /chat/[id] after first ASSISTANT message completes
      if (
        providedSessionId === "new" &&
        !chatCreated &&
        sessionId &&
        message &&
        message.role === "assistant"
      ) {
        setChatCreated(true);

        // Refresh chat history first
        try {
          refreshChatHistory(DEFAULT_CHAT_HISTORY_LIMIT);
        } catch (e) {
          /* noop */
        }
        replaceWithMerged({ path: `/chat/${sessionId}`, disableLoading: true });
      }
    },
    onError: error => {
      logger.error("Chat error:", { error });
    }
  });

  const handleReset = useCallback(() => {
    setSessionId(uuidv4());
    setMessages([]);
    setUploadedAttachments([]);
    setChatCreated(false);
  }, []);

  const handleMessageFeedback = useCallback(
    (messageId: string, feedback: any) => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? { ...msg, metadata: { ...(msg.metadata || {}), feedback } }
            : msg
        )
      );
    },
    [setMessages]
  );

  const handleRetry = useCallback(
    (messageId: string) => {
      setMessages(prev => {
        const idx = prev.findIndex(msg => msg.id === messageId);
        return idx > 0 ? prev.slice(0, idx) : prev;
      });
      regenerate();
    },
    [setMessages, regenerate]
  );

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (
      initialMessages &&
      initialMessages.length > 0 &&
      messages.length === 0
    ) {
      // Enrich assistant messages with current agent metadata
      const enrichedMessages = initialMessages.map((msg: any) => {
        if (msg.role === "assistant" && selectedAgent) {
          return {
            ...msg,
            metadata: {
              ...(msg.metadata || {}),
              agentId: selectedAgent.id,
              agentName: selectedAgent.name,
              agentIcon: selectedAgent.icon,
              agentImageUrl: selectedAgent.secondaryImagePath
            }
          };
        }
        return msg;
      });
      setMessages(enrichedMessages);
    }
  }, [initialMessages, selectedAgent]);

  const handleFileSelect = async (files: FileList) => {
    if (authData.inputLocked) {
      toast.error(
        authData.inputLockMessage ||
          "You no longer have access to this agent. Switch agents to continue."
      );
      return;
    }

    const selected = Array.from(files);

    const remainingSlots = Math.max(
      0,
      MAX_TOTAL_ATTACHMENTS - uploadedAttachments.length
    );
    if (remainingSlots <= 0) {
      toast.error(
        `You can attach up to ${MAX_TOTAL_ATTACHMENTS} files per chat.`
      );
      return;
    }

    let candidate = selected.slice(
      0,
      Math.min(MAX_FILES_PER_SELECTION, remainingSlots)
    );
    if (selected.length > candidate.length) {
      toast.error(
        `You can upload at most ${Math.min(MAX_FILES_PER_SELECTION, remainingSlots)} file(s) right now. Extra file(s) were skipped.`
      );
    }

    const oversized = candidate.filter(f => f.size > MAX_FILE_SIZE_BYTES);
    if (oversized.length > 0) {
      toast.error(
        `Some files exceed the ${Math.round(MAX_FILE_SIZE_BYTES / (1024 * 1024))} MB limit and were skipped.`
      );
      candidate = candidate.filter(f => f.size <= MAX_FILE_SIZE_BYTES);
    }

    if (candidate.length === 0) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("chatId", sessionId);
      candidate.forEach(file => formData.append("files", file));

      const { attachments, error } =
        await uploadChatAttachmentsAction(formData);
      if (error) throw new Error(error);

      const uploaded = Array.isArray(attachments) ? attachments : [];

      setUploadedAttachments(prev => [...prev, ...uploaded]);
      toast.success(`${uploaded.length} file(s) uploaded successfully`);
    } catch (err) {
      logger.error("Failed to upload files:", { error: err });
      toast.error("Failed to upload some files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAgentSelect = (agentId: string) => {
    setCurrentAgentId(agentId);
    setTimeout(() => {
      const inputElement = document.querySelector(
        "textarea[placeholder]"
      ) as HTMLTextAreaElement;
      inputElement?.focus();
    }, 100);
  };

  const onSubmit = async (message: PromptInputMessage, e: React.FormEvent) => {
    e.preventDefault();

    if (authData.inputLocked) {
      toast.error(
        authData.inputLockMessage ||
          "You no longer have access to this agent. Switch agents to continue."
      );
      return;
    }

    if (
      isLoading ||
      isUploading ||
      (!input.trim() && uploadedAttachments.length === 0)
    )
      return;

    const parts: any[] = [];
    if (input.trim()) {
      parts.push({ type: "text", text: input.trim() });
    }

    if (uploadedAttachments.length > 0) {
      const uploadedFileParts = await Promise.all(
        uploadedAttachments.map(async att => {
          const url = att.url;

          if (!url) {
            logger.error("No URL available for attachment", {
              filename: att.filename
            });
            return null;
          }

          return {
            type: "file",
            mediaType: att.content_type || "application/octet-stream",
            filename: att.filename,
            url: url,
            metadata: {
              storagePath: att.storage_path,
              bucket: att.bucket || "chat-attachments",
              size: att.size,
              contentType: att.content_type
            }
          };
        })
      );
      uploadedFileParts.filter(Boolean).forEach(p => parts.push(p));
    }

    setInput("");
    setUploadedAttachments([]);

    await sendMessage({ role: "user", parts });
  };

  return (
    <Card
      className={cn(
        "flex flex-col h-full overflow-hidden border-0 rounded-none bg-muted/50",
        className
      )}
    >
      {showHeader && (
        <AgentChatHeader title={headerTitle} description={headerDescription} />
      )}

      <Conversation className="flex-1 overflow-hidden">
        <ConversationContent className="p-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              {enableAgentSwitching && effectiveAgents.length > 1 ? (
                <AgentSelectorPlaceholder
                  agents={effectiveAgents}
                  currentAgentId={currentAgentId}
                  onAgentSelect={handleAgentSelect}
                />
              ) : placeholderComponent ? (
                placeholderComponent
              ) : (
                <DefaultChatPlaceholder
                  title={selectedAgent?.name || "MortgageQ AI Assistant"}
                  description={selectedAgent?.description}
                  imagePath={selectedAgent?.primaryImagePath}
                />
              )}
            </div>
          ) : (
            <AgentChatMessages
              messages={messages}
              isLoading={isLoading}
              error={error}
              lastAssistantId={messages.at(-1)?.id}
              bottomRef={scrollRef as RefObject<HTMLDivElement>}
              currentAgent={{
                id: selectedAgent?.id || "",
                name: selectedAgent?.name || "",
                icon: selectedAgent?.icon,
                imageUrl: selectedAgent?.secondaryImagePath
              }}
              userId={authData.userId}
              onMessageFeedback={handleMessageFeedback}
              onRetry={handleRetry}
            />
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {messages.length === 0 && suggestions.length > 0 && (
        <div className="relative px-4 pb-2 hidden md:block">
          <AgentChatSuggestions suggestions={suggestions} onPick={setInput} />
        </div>
      )}
      {(uploadedAttachments.length > 0 || isUploading) && (
        <div className="px-4 pb-2">
          <AgentChatAttachments
            attachments={uploadedAttachments}
            isUploading={isUploading}
            isDisabled={isUploading || isLoading || authData.inputLocked}
            onRemove={index =>
              setUploadedAttachments(prev => prev.filter((_, i) => i !== index))
            }
          />
        </div>
      )}

      <div className="px-4 pb-4">
        <AgentChatInput
          value={input}
          onChange={setInput}
          onSubmit={onSubmit}
          placeholder={placeholder}
          isLoading={isLoading}
          isUploading={isUploading}
          onStop={stop}
          onRetry={regenerate}
          onNewChat={() => {
            handleReset();
            pushWithMerged({
              path: `/chat/new`,
              extra: {
                agent:
                  availableAgents.length === 1
                    ? selectedAgent?.slug || null
                    : null
              }
            });
          }}
          onFileSelect={handleFileSelect}
          enableAgentSwitching={enableAgentSwitching}
          agents={effectiveAgents}
          currentAgentId={currentAgentId}
          onAgentChange={setCurrentAgentId}
          isLocked={authData.inputLocked}
          lockMessage={authData.inputLockMessage}
        />
      </div>
    </Card>
  );
}

export function AgentChat(props: AgentChatProps) {
  return <AgentChatInner {...props} />;
}
