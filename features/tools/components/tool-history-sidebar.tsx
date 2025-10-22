"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, ChevronRight, History, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { getToolHistory } from "@/features/tools/actions/get-tool-history";

interface ToolRun {
  id: string;
  created_at: string;
  input?: any;
  output?: any;
  error?: string | null;
  duration_ms?: number | null;
}

interface ToolHistorySidebarProps {
  toolSlug: string;
  toolName?: string;
  currentRunId?: string | null;
  onLoadRun?: (run: ToolRun) => void;
}

export function ToolHistorySidebar({
  toolSlug,
  toolName,
  currentRunId,
  onLoadRun,
}: ToolHistorySidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [runs, setRuns] = useState<ToolRun[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tool runs when sidebar opens
  useEffect(() => {
    if (isOpen) {
      fetchToolRuns();
    }
  }, [isOpen, toolSlug]);

  const fetchToolRuns = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getToolHistory(toolSlug, 20);
      if (result.success) {
        setRuns(result.runs as ToolRun[]);
      } else {
        setError(result.error || "Failed to load history");
      }
    } catch (err) {
      setError("Failed to load history");
      console.error("Error fetching tool runs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInputPreview = (input: any) => {
    if (!input) return "No input";

    if (typeof input === "object") {
      const entries = Object.entries(input);
      if (entries.length === 0) return "Empty input";

      // Show first 2 key-value pairs
      return entries
        .slice(0, 2)
        .map(([key, value]) => {
          const val = typeof value === "object" ? "..." : String(value).slice(0, 20);
          return `${key}: ${val}`;
        })
        .join(", ");
    }

    return String(input).slice(0, 50);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="h-4 w-4" />
          History
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            {toolName || toolSlug} History
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          {isLoading ? (
            <div className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border p-3">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-48 mt-2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-sm text-muted-foreground text-center py-8">
              {error}
            </div>
          ) : runs.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-8">
              No previous runs found
            </div>
          ) : (
            <div className="space-y-2">
              {runs.map((run) => {
                const isCurrentRun = run.id === currentRunId;
                const isSuccess = !run.error && run.output;

                return (
                  <div
                    key={run.id}
                    className={cn(
                      "rounded-lg border p-3 transition-colors",
                      isCurrentRun
                        ? "bg-primary/5 border-primary"
                        : "hover:bg-muted/50 cursor-pointer"
                    )}
                    onClick={() => !isCurrentRun && onLoadRun?.(run)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {formatDate(run.created_at)}
                          </span>
                          {isCurrentRun && (
                            <Badge variant="secondary" className="text-xs">
                              Current
                            </Badge>
                          )}
                          {isSuccess ? (
                            <Badge
                              variant="outline"
                              className="text-xs bg-green-500/10 text-green-700 border-green-500/20"
                            >
                              Success
                            </Badge>
                          ) : run.error ? (
                            <Badge
                              variant="outline"
                              className="text-xs bg-red-500/10 text-red-700 border-red-500/20"
                            >
                              Error
                            </Badge>
                          ) : null}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {getInputPreview(run.input)}
                        </div>

                        {run.duration_ms && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Duration: {run.duration_ms}ms
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/tools/${toolSlug}/runs/${run.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}