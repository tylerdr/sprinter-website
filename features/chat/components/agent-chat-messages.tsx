"use client";

import type { RefObject } from "react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { User, AlertTriangle } from "lucide-react";
import { AgentAvatar } from "@/features/agents/components/agent-avatar";
import { ToolResultRenderer } from "./tool-result-renderer";
import dynamic from "next/dynamic";
import AgentMessageFeedback from "./agent-message-feedback";
const MessageWithCitations = dynamic(
  () => import("./message-with-citations").then(m => m.MessageWithCitations),
  { ssr: false }
);

import { ReasoningStreamer } from "@/features/chat/components/reasoning/reasoning-streamer";
import { WebPreview } from "@/components/ai-elements/web-preview";
import { logger } from "@/lib/logger";
import { InlineMessageAttachment } from "./attachments/inline-message-attachments";
import { ChatReasoningAnimation } from "@/features/chat/components/reasoning/reasoning-animation";
import { normalizeSourceParts } from "@/features/chat/lib/source-normalizer";

function computeReasoningDurationSeconds(
  message: any,
  messages: any[],
  messageIndex: number
): number | undefined {
  const ms = (message as any)?.metadata?.reasoning_duration_ms as
    | number
    | undefined;
  if (typeof ms === "number" && Number.isFinite(ms)) {
    return Math.max(0, Math.round(ms / 1000));
  }

  // Fallback: derive from prior user timestamp → assistant timestamp
  try {
    let lastUserCreated: number | null = null;
    for (let i = messageIndex - 1; i >= 0; i--) {
      const m = messages[i];
      if (m?.role === "user") {
        const ts = (m as any).created_at || (m as any).timestamp;
        if (ts) lastUserCreated = new Date(ts).getTime();
        break;
      }
    }
    const assistantTs =
      (message as any).created_at || (message as any).timestamp;
    if (lastUserCreated && assistantTs) {
      return Math.max(
        0,
        Math.round((new Date(assistantTs).getTime() - lastUserCreated) / 1000)
      );
    }
  } catch {
    /* noop */
  }

  return undefined;
}

export interface AgentChatMessagesProps {
  messages: any[];
  isLoading: boolean;
  error?: Error | null;
  lastAssistantId?: string;
  bottomRef?: RefObject<HTMLDivElement>;
  currentAgent?: {
    id: string;
    name: string;
    icon?: string;
    imageUrl?: string;
  };
  userId?: string;
  onMessageFeedback?: (
    messageId: string,
    feedback: {
      byUser: Record<
        string,
        { value: 1 | -1; comment?: string; updatedAt: string }
      >;
      summary: { positives: number; negatives: number };
    }
  ) => void;
  onRetry?: (messageId: string) => void;
}

export default function AgentChatMessages({
  messages,
  isLoading,
  error,
  lastAssistantId,
  bottomRef,
  currentAgent,
  userId,
  onMessageFeedback,
  onRetry
}: AgentChatMessagesProps) {
  // Memoize normalized sources per message, with fallback to most recent previous message that has sources
  const normalizedSourcesByMessageId = useMemo(() => {
    const map = new Map<string, any[]>();
    let lastSourceParts: any[] = [];
    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];
      const currentParts =
        (m.parts?.filter(
          (p: any) => p?.type === "source-url" || p?.type === "source-document"
        ) as any[]) || [];
      if (currentParts.length > 0) lastSourceParts = currentParts;
      const chosen = currentParts.length > 0 ? currentParts : lastSourceParts;
      map.set(m.id, normalizeSourceParts(chosen));
    }
    return map;
  }, [messages]);

  return (
    <>
      {messages.map((message, messageIndex) => {
        const messageRole =
          message.role ||
          ((message as any).type?.startsWith("tool-") ? "assistant" : "user");
        const isAssistantMessage = messageRole === "assistant";
        return (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 mb-4",
              !isAssistantMessage ? "justify-end" : "justify-start"
            )}
          >
            {isAssistantMessage && (
              <AgentAvatar
                imageUrl={
                  message.metadata?.agentImageUrl ||
                  (message.id === lastAssistantId
                    ? currentAgent?.imageUrl
                    : undefined)
                }
                icon={
                  message.metadata?.agentIcon ||
                  (message.id === lastAssistantId
                    ? currentAgent?.icon
                    : undefined)
                }
                name={
                  message.metadata?.agentName ||
                  (message.id === lastAssistantId
                    ? currentAgent?.name
                    : undefined)
                }
              />
            )}

            <div
              className={cn(
                "flex flex-col",
                !isAssistantMessage ? "max-w-[80%] min-w-0" : "w-[80%]"
              )}
            >
              <div
                className={cn(
                  "rounded-2xl px-4 pt-2 shadow-sm",
                  !isAssistantMessage
                    ? "bg-primary/5 w-full border border-primary/20 dark:bg-primary/10 dark:border-primary/30 pb-2"
                    : "bg-card/80 w-full dark:bg-card/60 backdrop-blur border border-border/40 dark:border-border/60 pb-4"
                )}
              >
                {/* If message is a tool result with no parts */}
                {!message.parts && (message as any).type?.startsWith("tool-")
                  ? (() => {
                      const msg = message as any;
                      let slug = msg.type.substring(5);
                      const displayName =
                        msg.toolName || msg.name || slug || "Tool";

                      let parsedOutput = msg.output;
                      if (typeof parsedOutput === "string") {
                        try {
                          parsedOutput = JSON.parse(parsedOutput);
                        } catch (e) {
                          logger.warn(
                            `Failed to parse tool output for ${slug}:`,
                            { error: e }
                          );
                        }
                      }

                      let toolState:
                        | "input-streaming"
                        | "input-available"
                        | "output-available"
                        | "output-error";

                      if (msg.state) {
                        if (
                          msg.state === "complete" ||
                          msg.state === "output-available"
                        )
                          toolState = "output-available";
                        else if (
                          msg.state === "output-error" ||
                          msg.state === "error"
                        )
                          toolState = "output-error";
                        else if (
                          msg.state === "input-available" ||
                          msg.state === "pending"
                        )
                          toolState = "input-available";
                        else if (
                          msg.state === "input-streaming" ||
                          msg.state === "streaming"
                        )
                          toolState = "input-streaming";
                        else
                          toolState = parsedOutput
                            ? "output-available"
                            : "input-available";
                      } else {
                        toolState = parsedOutput
                          ? "output-available"
                          : "input-available";
                      }

                      return (
                        <ToolResultRenderer
                          toolName={displayName}
                          toolSlug={slug}
                          result={parsedOutput}
                          input={msg.args || msg.input}
                          errorText={msg.errorText || msg.error}
                          toolCallId={msg.toolCallId || msg.id}
                          state={toolState}
                        />
                      );
                    })()
                  : (() => {
                      // Use memoized normalized sources for this message (fallback to previous message with sources)
                      const normalizedSources =
                        normalizedSourcesByMessageId.get(message.id) || [];

                      const reasoningParts =
                        message.parts?.filter(
                          (p: any) => p.type === "reasoning"
                        ) || [];
                      let reasoningRendered = false;

                      const renderedToolIds = new Set<string>();

                      // Determine if assistant message is currently streaming
                      const isAssistantStreaming =
                        isLoading &&
                        isAssistantMessage &&
                        message.id === lastAssistantId;
                      // Whether any text part has arrived for this message
                      const hasTextPart = (message.parts || []).some(
                        (p: any) =>
                          p?.type === "text" &&
                          typeof p?.text === "string" &&
                          p.text.trim().length > 0
                      );

                      const messageParts = message.parts
                        ?.filter((part: any) => part !== null)
                        ?.map((part: any, partIndex: number) => {
                          if (part?.type === "text") {
                            //Pass the native source parts to MessageWithCitations
                            return (
                              <MessageWithCitations
                                key={partIndex}
                                content={part.text}
                                sources={normalizedSources}
                              />
                            );
                          }

                          if (part.type === "reasoning") {
                            if (reasoningRendered) return null;
                            reasoningRendered = true;

                            const durationSec = computeReasoningDurationSeconds(
                              message,
                              messages,
                              messageIndex
                            );

                            return (
                              <ReasoningStreamer
                                key="reasoning-consolidated"
                                parts={reasoningParts}
                                isStreaming={
                                  isAssistantStreaming && !hasTextPart
                                }
                                duration={durationSec}
                                className="w-full mt-2"
                              />
                            );
                          }

                          if (part.type === "file") {
                            return (
                              <InlineMessageAttachment
                                key={partIndex}
                                part={part}
                                index={partIndex}
                              />
                            );
                          }

                          if (
                            part.type === "tool-call" ||
                            part.type === "tool-result" ||
                            part.type?.startsWith("tool-")
                          ) {
                            let slug = "";
                            if (part.type?.startsWith("tool-"))
                              slug = part.type.substring(5);
                            if (!slug) {
                              slug =
                                part.args?.toolSlug ||
                                part.toolName ||
                                part.name ||
                                "unknown";
                              slug = slug.toLowerCase().replace(/\s+/g, "-");
                            }

                            const toolId = `${slug}-${part.toolCallId || part.id || partIndex}`;
                            if (renderedToolIds.has(toolId)) return null;
                            renderedToolIds.add(toolId);

                            let parsedOutput = part.result || part.output;
                            if (typeof parsedOutput === "string") {
                              try {
                                parsedOutput = JSON.parse(parsedOutput);
                              } catch (e) {
                                logger.warn(
                                  `Failed to parse tool output for ${slug}:`,
                                  { e }
                                );
                                parsedOutput = part.result || part.output;
                              }
                            }

                            let toolState:
                              | "input-streaming"
                              | "input-available"
                              | "output-available"
                              | "output-error";

                            if (part.state) {
                              if (
                                part.state === "complete" ||
                                part.state === "output-available"
                              )
                                toolState = "output-available";
                              else if (
                                part.state === "output-error" ||
                                part.state === "error"
                              )
                                toolState = "output-error";
                              else if (
                                part.state === "input-available" ||
                                part.state === "pending"
                              )
                                toolState = "input-available";
                              else if (
                                part.state === "input-streaming" ||
                                part.state === "streaming"
                              )
                                toolState = "input-streaming";
                              else
                                toolState = parsedOutput
                                  ? "output-available"
                                  : "input-available";
                            } else {
                              if (part.type === "tool-result" && parsedOutput)
                                toolState = "output-available";
                              else if (part.type === "tool-call")
                                toolState = part.args
                                  ? "input-available"
                                  : "input-streaming";
                              else
                                toolState = parsedOutput
                                  ? "output-available"
                                  : "input-available";
                            }

                            return (
                              <ToolResultRenderer
                                key={toolId}
                                toolName={
                                  part.toolName || part.name || slug || "Tool"
                                }
                                toolSlug={slug}
                                result={parsedOutput}
                                input={part.args || part.input}
                                errorText={part.errorText || part.error}
                                toolCallId={part.toolCallId || part.id}
                                state={toolState}
                              />
                            );
                          }

                          if (part.type === "web-preview") {
                            return (
                              <div key={partIndex} className="my-2">
                                <WebPreview
                                  defaultUrl={part.url}
                                  title={part.title}
                                />
                              </div>
                            );
                          }
                          if (
                            part.type === "source-url" ||
                            part.type === "source-document"
                          ) {
                            return null;
                          }

                          return null;
                        })
                        .filter(Boolean);

                      const hasReasoning = reasoningParts.length > 0;
                      return (
                        <>
                          {messageParts}
                          {!hasReasoning &&
                            isLoading &&
                            isAssistantMessage &&
                            message.id === lastAssistantId && (
                              <div className="w-full px-2 py-1.5 rounded-md hover:bg-muted/60 transition-colors cursor-pointer">
                                <ChatReasoningAnimation
                                  isStreaming={true}
                                  className="w-full my-2"
                                />
                              </div>
                            )}
                        </>
                      );
                    })()}
              </div>
              {/* Add feedback component for completed assistant messages */}
              {isAssistantMessage && userId && !isLoading && (
                <div className="px-4">
                  <AgentMessageFeedback
                    userId={userId}
                    message={message}
                    onRetry={onRetry ? () => onRetry(message.id) : undefined}
                    onFeedbackUpdate={onMessageFeedback}
                    agentInfo={{
                      name: message.metadata?.agentName || currentAgent?.name,
                      imageUrl:
                        message.metadata?.agentImageUrl ||
                        currentAgent?.imageUrl
                    }}
                  />
                </div>
              )}
            </div>

            {!isAssistantMessage && (
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary flex items-center justify-center flex-shrink-0 ring-1 ring-primary/20 dark:ring-primary/30">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        );
      })}

      {error && (
        <div className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-destructive">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-medium">Something went wrong</div>
              <div className="mt-1 text-xs whitespace-pre-wrap break-all">
                {String(error.message)}
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </>
  );
}
