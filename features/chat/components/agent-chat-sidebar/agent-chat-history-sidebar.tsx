"use client";

import { cn } from "@/lib/utils";
import AgentChatHistory from "./agent-chat-history";
import { Button } from "@/components/ui/button";
import { History, Search, PanelLeftClose } from "lucide-react";
import { useBooleanQueryParam } from "@/features/chat/hooks/use-query-params";
import { useState } from "react";
import AgentChatHistorySearch from "./agent-chat-history-search";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function AgentChatHistorySidebar() {
  const [open, setOpen] = useBooleanQueryParam("history", true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Mobile behavior: when collapsed, render nothing; when open, overlay the content
  if (isMobile) {
    if (!open) return null;
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-x-0 bottom-0 z-30 bg-background/60 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
          style={{ top: "57px" }}
        />
        {/* Sidebar panel */}
        <div
          className="fixed bottom-0 left-0 z-40 w-64 max-w-[85vw] bg-card border-r shadow-xl flex flex-col"
          style={{ top: "57px" }}
        >
          <div className="flex items-center justify-between px-3 py-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <History className="h-3.5 w-3.5" />
              History
            </div>
            <div className="inline-flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 p-0"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="sr-only">Search history</span>
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <AgentChatHistory onOpenSearch={() => setIsSearchOpen(true)} />
          </div>
          <div className="p-2 sticky bottom-0 bg-card/90 backdrop-blur border-t">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setOpen(false)}
              aria-label="Collapse history"
            >
              <PanelLeftClose className="h-4 w-4" />
              <span>Collapse</span>
            </Button>
          </div>
          <AgentChatHistorySearch
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </div>
      </>
    );
  }

  const containerClass = cn(
    "h-full flex flex-col transition-all duration-300 overflow-hidden bg-background border-r",
    open ? "w-64" : "w-12"
  );

  return (
    <div className={containerClass} aria-hidden={!open}>
      {open ? (
        <div className="h-full flex flex-col overflow-hidden relative">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <History className="h-3.5 w-3.5" />
              History
            </div>
            <div className="inline-flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 p-0"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="sr-only">Search history</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 p-0"
                onClick={() => setOpen(false)}
              >
                <PanelLeftClose className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <AgentChatHistory onOpenSearch={() => setIsSearchOpen(true)} />
          </div>
          <AgentChatHistorySearch
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="w-full h-full flex items-start justify-center p-4"
          onClick={() => setOpen(true)}
        >
          <History className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Open history</span>
        </Button>
      )}
    </div>
  );
}
