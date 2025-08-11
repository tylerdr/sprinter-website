"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Share2, Maximize2, Code, Minimize2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";

type DeviceFrameProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onShare?: () => void;
  onEmbed?: () => void;
};

export function DeviceFrame({
  title = "Sprinter Labs",
  children,
  className,
  onShare,
  onEmbed,
}: DeviceFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = async () => {
    if (!frameRef.current) return;

    try {
      if (!document.fullscreenElement) {
        // Request fullscreen on the frame element, not the document
        await frameRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      ref={frameRef}
      className={cn(
        "rounded-2xl border bg-background shadow-lg",
        isFullscreen && "rounded-none border-0 h-screen w-screen",
        className
      )}
    >
      {/* Browser chrome */}
      <div className={cn(
        "flex items-center justify-between px-4 py-2 border-b",
        isFullscreen && "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm"
      )}>
        <div className="flex items-center gap-2">
          <span className="inline-flex size-3 rounded-full bg-destructive/80" />
          <span className="inline-flex size-3 rounded-full bg-warning/80" />
          <span className="inline-flex size-3 rounded-full bg-success/80" />
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
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleFullscreen} 
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="size-4" />
            ) : (
              <Maximize2 className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* App viewport with proper scrolling */}
      <div className={cn(
        "bg-muted/30",
        !isFullscreen && "aspect-[16/10] md:aspect-[16/9]",
        isFullscreen && "h-[calc(100vh-3rem)] pt-12" // Account for chrome bar
      )}>
        <div className={cn(
          "h-full w-full",
          "overflow-auto", // Enable scrolling within the viewport
          "scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
        )}>
          {children}
        </div>
      </div>
    </div>
  );
}