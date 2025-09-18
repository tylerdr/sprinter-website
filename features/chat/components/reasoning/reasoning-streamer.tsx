"use client";

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger
} from "@/components/ai-elements/reasoning";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ChatReasoningAnimation } from "@/features/chat/components/reasoning/reasoning-animation";
import { logger } from "@/lib/logger";
import { Skeleton } from "@/components/ui/skeleton";

export interface ReasoningStreamerProps {
  /**
   * Parts from a chat message; only parts with type === "reasoning" are used.
   */
  parts?: Array<{ type?: string; text?: string | null }>;
  /**
   * Whether the reasoning content is currently streaming. This should be true
   * only while there are no assistant text parts yet.
   */
  isStreaming?: boolean;
  /**
   * Optional className to merge into the container.
   */
  className?: string;
  /**
   * DEPRECATED: no longer slices content; kept for API stability.
   */

  heightClass?: string;
  /**
   * DEPRECATED: Tailwind class to control the maximum height of the window.
   * Use heightClass instead.
   */
  maxHeightClass?: string;

  /**
   * Optional total reasoning duration in seconds; when provided, the Reasoning
   * component will display "Thought for X seconds" after streaming ends.
   */
  duration?: number;
}

/**
 * Renders a single consolidated reasoning block from message parts.
 * While streaming: use a fixed-height, auto-scrolling container (scrollbar hidden) and snap to bottom.
 * After streaming: collapsible expands to reveal full content at natural height.
 */
export function ReasoningStreamer({
  parts = [],
  isStreaming = false,
  className = "",
  heightClass = "",
  maxHeightClass = "",
  duration
}: ReasoningStreamerProps) {
  const reasoningText = parts
    .filter(p => p?.type === "reasoning")
    .map(p => p?.text ?? "")
    .filter(Boolean)
    .join("\n\n");

  const resolvedHeightClass = heightClass || maxHeightClass || "h-40";

  const contentTextClasses = cn(
    "whitespace-pre-wrap text-xs sm:text-sm leading-relaxed break-words italic text-muted-foreground/80 max-w-full p-1 pb-2 bg-muted/20 rounded-sm"
  );

  const contentText: string = reasoningText || "";
  const hasContent = contentText.trim().length > 0;
  const showSkeleton = isStreaming && contentText.length === 0;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Local open state so the parent can still toggle via the ReasoningTrigger,
  // while we auto-open during reasoning-only streaming and auto-close once
  // when text arrives.
  const [isOpen, setIsOpen] = useState<boolean>(isStreaming);
  const prevStreamingRef = useRef<boolean>(isStreaming);
  const hasAutoClosedRef = useRef<boolean>(false);

  // Auto-open when reasoning streaming starts; auto-close once when it stops.
  useEffect(() => {
    const wasStreaming = prevStreamingRef.current;
    if (!wasStreaming && isStreaming) {
      setIsOpen(true);
      hasAutoClosedRef.current = false;
    } else if (wasStreaming && !isStreaming) {
      if (!hasAutoClosedRef.current && isOpen) {
        setIsOpen(false);
        hasAutoClosedRef.current = true;
      }
    }
    prevStreamingRef.current = isStreaming;
  }, [isStreaming, isOpen]);

  // If there's no reasoning content and we're not streaming, ensure it's closed and not toggleable
  useEffect(() => {
    if (!isStreaming && !hasContent && isOpen) setIsOpen(false);
  }, [isStreaming, hasContent, isOpen]);

  // Auto-scroll the internal scroller (not the window) on content updates during streaming
  useEffect(() => {
    if (!isStreaming) return;
    try {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      requestAnimationFrame(() => {
        scroller.scrollTop = scroller.scrollHeight;
      });
    } catch (error) {
      logger.error("Error scrolling to bottom", { error });
    }
  }, [contentText, isStreaming]);

  return (
    <Reasoning
      className={cn("w-full", className)}
      isStreaming={isStreaming}
      duration={duration}
      // We control open/close explicitly and let users toggle via Trigger
      open={isOpen}
      onOpenChange={setIsOpen}
      // Disable internal default-open/auto-close since we control it here
      defaultOpen={false}
    >
      <ReasoningTrigger
        className="w-full"
        disabled={isStreaming || !hasContent}
        aria-disabled={isStreaming || !hasContent || undefined}
      >
        <div
          className={cn(
            "w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md transition-colors",
            isStreaming || !hasContent
              ? "cursor-default pointer-events-none"
              : "hover:bg-muted/60 cursor-pointer"
          )}
        >
          <ChatReasoningAnimation
            isStreaming={isStreaming}
            duration={duration}
            className="w-full"
          />
          {!isStreaming && hasContent && (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </div>
      </ReasoningTrigger>
      <div
        className={cn(
          "relative w-full",
          isStreaming ? resolvedHeightClass : ""
        )}
      >
        <div
          ref={scrollerRef}
          className={cn(
            "mt-2 px-2",
            isStreaming
              ? [
                  "h-full overflow-y-auto overflow-x-hidden pr-1",
                  "[scrollbar-width:none]",
                  "[-ms-overflow-style:none]",
                  "[&::-webkit-scrollbar]:hidden"
                ]
              : ""
          )}
        >
          {showSkeleton ? (
            <div className="space-y-2 py-1">
              <Skeleton className="h-3 w-[92%]" />
              <Skeleton className="h-3 w-[85%]" />
              <div className="h-2" />
              <Skeleton className="h-3 w-[70%]" />
              <div className="h-2" />
              <Skeleton className="h-3 w-[88%]" />
              <Skeleton className="h-3 w-[62%]" />
              <Skeleton className="h-3 w-[52%]" />
            </div>
          ) : (
            <ReasoningContent className={contentTextClasses}>
              {contentText}
            </ReasoningContent>
          )}

          <div ref={bottomRef} aria-hidden className="h-0" />
        </div>
      </div>
    </Reasoning>
  );
}
