"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Share2, Maximize2, Code } from "lucide-react";

type DeviceFrameProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onShare?: () => void;
  onEmbed?: () => void;
  onFullscreen?: () => void;
};

export function DeviceFrame({
  title = "Sprinter Labs",
  children,
  className,
  onShare,
  onEmbed,
  onFullscreen,
}: DeviceFrameProps) {
  return (
    <div className={cn("rounded-2xl border bg-background shadow-lg", className)}>
      {/* Browser chrome */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-3 rounded-full bg-red-500/80" />
          <span className="inline-flex size-3 rounded-full bg-yellow-500/80" />
          <span className="inline-flex size-3 rounded-full bg-green-500/80" />
          <div className="ml-3 text-sm text-muted-foreground truncate max-w-[40ch]">{title}</div>
        </div>
        <div className="flex items-center gap-2">
          {onShare && (
            <Button size="sm" variant="ghost" onClick={onShare} aria-label="Share">
              <Share2 className="size-4" />
            </Button>
          )}
          {onEmbed && (
            <Button size="sm" variant="ghost" onClick={onEmbed} aria-label="Embed">
              <Code className="size-4" />
            </Button>
          )}
          {onFullscreen && (
            <Button size="sm" variant="ghost" onClick={onFullscreen} aria-label="Fullscreen">
              <Maximize2 className="size-4" />
            </Button>
          )}
        </div>
      </div>

      {/* App viewport */}
      <div className="aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-muted/30">
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
}