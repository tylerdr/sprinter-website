// features/chat/components/message-with-citations.tsx
"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Response } from "@/components/ai-elements/response";
import type { SprinterSource } from "@/features/tools/types";
import { remarkInlineCitations } from "@/components/ai-elements/remark-inline-citations";
import { AgentChatInlineCitation } from "./agent-chat-inline-citations";

type Props = {
  content: string;
  sources?: SprinterSource[];
  className?: string;
};

export function MessageWithCitations({
  content,
  sources = [],
  className
}: Props) {
  // Fast lookup: [n] -> source
  const byNumber = useMemo(() => {
    const map = new Map<number, SprinterSource>();
    for (const s of sources) {
      if (Number.isFinite(s.order)) map.set(Number(s.order), s);
      else if (Number.isFinite(Number(s.id))) map.set(Number(s.id), s);
    }
    return map;
  }, [sources]);

  // Build component overrides: render AgentChatInlineCitation for citation markers
  const components = useMemo(
    () => ({
      code: (props: React.ComponentProps<"code">) => {
        const value = props.children as string;

        // Check if this is a citation marker
        if (typeof value === "string" && value.startsWith("citation:")) {
          const n = Number(value.substring(9));
          const src = byNumber.get(n);

          if (!src) {
            // graceful fallback
            return (
              <sup className="text-blue-600 dark:text-blue-400 text-[10px] ml-0.5 align-baseline">
                [{Number.isFinite(n) ? n : "?"}]
              </sup>
            );
          }

          // Determine the label to show - prefer page number for PDFs
          let label: string | undefined;
          const pageNum = src.pageNumber || src.metadata?.pageNumber;
          if (pageNum && typeof pageNum === "number") {
            label = `p.${pageNum}`;
          } else if (src.label) {
            label = src.label;
          } else if (typeof src.url === "string") {
            try {
              const url = new URL(src.url);
              const hostname = url.hostname;
              label = hostname
                .replace(/^www\./, "")
                .replace(/\.(com|org|net|gov|edu|io|co|uk|ca|au|de|fr|jp)$/, "")
                .split(".")
                .pop();
              if (label) label = label.charAt(0).toUpperCase() + label.slice(1);
            } catch {}
          }

          return (
            <AgentChatInlineCitation
              source={src}
              index={n}
              label={label || `[${n}]`}
              className="inline align-baseline"
            />
          );
        }

        // normal code element
        return <code {...props} />;
      }
    }),
    [byNumber]
  );

  return (
    <Response
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none",
        // Add BotMessage styles for better formatting
        "prose-slate",
        // Tables
        "prose-table:border-collapse",
        "prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700",
        "prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-2",
        "prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:p-2",
        // Blockquotes
        "prose-blockquote:font-normal prose-blockquote:not-italic",
        "prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700",
        "prose-blockquote:pl-4 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300",
        "[&_blockquote_p:first-of-type]:before:content-none [&_blockquote_p:last-of-type]:after:content-none",
        // Lists - proper indentation and spacing for nested lists
        "prose-ol:list-decimal prose-ul:list-disc",
        "[&_ol>li>ul]:mt-1 [&_ol>li>ul]:mb-1 [&_ol>li>ul]:ml-4",
        "[&_ul>li>ul]:mt-1 [&_ul>li>ul]:mb-1 [&_ul>li>ul]:ml-4",
        "[&_ol>li>ol]:mt-1 [&_ol>li>ol]:mb-1 [&_ol>li>ol]:ml-4",
        "[&_ul>li>ol]:mt-1 [&_ul>li>ol]:mb-1 [&_ul>li>ol]:ml-4",
        "[&_ol>li>ul:first-child]:mt-0.5",
        "[&_ol>li>ol:first-child]:mt-0.5",
        "[&_ol>li>ul>li]:my-0.5 [&_ol>li>ol>li]:my-0.5",
        "[&_ul>li>ul>li]:my-0.5 [&_ul>li>ol>li]:my-0.5",
        "[&_ol>li>ul]:list-disc",
        "[&_ol_ol]:ml-6 [&_ul_ul]:ml-6 [&_ol_ul]:ml-6 [&_ul_ol]:ml-6",
        className
      )}
      defaultOrigin={
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000"
      }
      // Convert [n] in text nodes to citation code elements
      options={{
        remarkPlugins: [remarkInlineCitations],
        components: components as any
      }}
    >
      {content}
    </Response>
  );
}
