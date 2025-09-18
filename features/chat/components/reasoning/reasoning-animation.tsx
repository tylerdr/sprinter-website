"use client";

import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatReasoningAnimationProps {
  isStreaming?: boolean;
  duration?: number;
  className?: string;
}

export function ChatReasoningAnimation({
  isStreaming = false,
  duration,
  className
}: ChatReasoningAnimationProps) {
  const label = isStreaming
    ? null
    : typeof duration === "number" && duration > 0
      ? `Thought for ${duration} seconds`
      : "Reasoning";

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between gap-2 rounded-md text-muted-foreground",
        "bg-transparent",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <Brain
          className={cn(
            "size-4 text-muted-foreground",
            isStreaming && "animate-pulse"
          )}
        />
        {isStreaming ? (
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-muted-foreground">Thinking</span>
            <span
              className="inline-flex items-center gap-1 mt-0.5"
              aria-hidden="true"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/10 animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/10 animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/10 animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">{label}</span>
        )}
      </div>
    </div>
  );
}
