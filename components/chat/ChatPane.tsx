/**
 * ChatPane - Full-featured chat interface with AI SDK v5
 * Supports typed tools, resumable streams, and custom tool UI
 */

"use client";

import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from "ai";
import { cn } from "@/lib/utils";
import { ToolPartRenderer } from "./ToolPartRenderer";
import { Button } from "@/components/ui/button";
import { Send, RotateCw, StopCircle } from "lucide-react";

/**
 * Props provided by the page: current agent/thread/workspace context
 */
export interface ChatPaneProps {
  threadId: string;
  agentId: string;
  workspaceId?: string;
  tenantId: string;
  className?: string;
}

export default function ChatPane(props: ChatPaneProps) {
  const { threadId, agentId, workspaceId, tenantId, className } = props;

  // Transport uses dynamic config to avoid stale body issues
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        // Always send current context
        body: () => ({ id: threadId, agentId, workspaceId, tenantId }),
      }),
    [threadId, agentId, workspaceId, tenantId]
  );

  const [input, setInput] = useState("");
  
  const {
    messages,
    sendMessage,
    addToolResult,
    regenerate,
    stop,
    resumeStream,
    status,
    error,
  } = useChat({
    transport,
    id: threadId,
    // Auto-submit once all tool parts have results
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    // Handle client-side tool execution
    async onToolCall({ toolCall }) {
      if (toolCall.dynamic) return; // Only handle typed tools on client
      
      // Example of a client-run tool
      if (toolCall.toolName === "getLocation") {
        const cities = ["New York", "Los Angeles", "Chicago", "San Francisco"];
        addToolResult({
          tool: "getLocation",
          toolCallId: toolCall.toolCallId,
          output: cities[Math.floor(Math.random() * cities.length)],
        });
      }
    },
    onError(e) {
      console.error("Chat error:", e);
      // Try to resume if we were streaming
      if (status === "streaming") {
        resumeStream();
      }
    },
  });

  // Store resume state in case of disconnection
  useEffect(() => {
    if (status === "streaming") {
      // Could store in localStorage for page reload recovery
      sessionStorage.setItem(`chat-${threadId}-streaming`, "true");
    } else {
      sessionStorage.removeItem(`chat-${threadId}-streaming`);
    }
  }, [status, threadId]);

  // Check for interrupted streams on mount
  useEffect(() => {
    const wasStreaming = sessionStorage.getItem(`chat-${threadId}-streaming`);
    if (wasStreaming) {
      resumeStream();
      sessionStorage.removeItem(`chat-${threadId}-streaming`);
    }
  }, [threadId, resumeStream]);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {/* Message Content & Tool Parts */}
              <div className="space-y-2">
                {message.parts.map((part, index) => (
                  <ToolPartRenderer
                    key={index}
                    part={part}
                    addToolResult={addToolResult}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Error Display */}
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive">
            Error: {error.message}
          </div>
        )}

        {/* Status Indicator */}
        {status === "streaming" && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="animate-pulse">●</div>
            AI is thinking...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              sendMessage({ text: input });
              setInput("");
            }
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={status === "streaming"}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          
          <div className="flex gap-2">
            {status === "streaming" ? (
              <Button
                type="button"
                onClick={stop}
                variant="outline"
                size="icon"
                title="Stop generation"
              >
                <StopCircle className="w-4 h-4" />
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  disabled={!input.trim()}
                  size="icon"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </Button>
                {messages.length > 0 && (
                  <Button
                    type="button"
                    onClick={() => regenerate()}
                    variant="outline"
                    size="icon"
                    title="Regenerate last response"
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}