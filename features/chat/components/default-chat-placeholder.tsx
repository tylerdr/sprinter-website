"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

interface DefaultChatPlaceholderProps {
  className?: string;
  title?: string;
  description?: string;
  imagePath?: string; // path under /public
}

export function DefaultChatPlaceholder({
  className,
  title = "MortgageQ AI Assistant",
  description = "Ask me anything about mortgages, rates, or calculations",
  imagePath
}: DefaultChatPlaceholderProps) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto px-4 py-8", className)}>
      <div className="flex flex-col items-center text-center">
        {imagePath ? (
          <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-muted/30 border border-border/50 px-5 py-3">
            <Image
              src={imagePath}
              alt={title}
              width={320}
              height={64}
              sizes="(min-width: 768px) 320px, 280px"
              className="w-auto h-auto max-h-16 md:max-h-20 object-contain"
              priority
            />
          </div>
        ) : (
          <div className="inline-flex p-3 rounded-full bg-muted/40 mb-4">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </div>
        )}

        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-1">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
