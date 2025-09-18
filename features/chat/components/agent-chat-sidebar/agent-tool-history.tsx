"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useToolHistory } from "@/features/chat/hooks/use-tool-history";
import { useMergedQueryNav } from "@/features/chat/hooks/use-merged-query-nav";

export default function AgentToolHistory() {
  const { data: events, isLoading } = useToolHistory(50);
  const { build } = useMergedQueryNav();

  return (
    <div>
      {isLoading ? (
        <div className="space-y-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="rounded-md border p-2">
              <Skeleton className="h-3 w-56" />
              <Skeleton className="h-3 w-28 mt-2" />
            </div>
          ))}
        </div>
      ) : !events || events.length === 0 ? (
        <div className="text-sm text-muted-foreground">No runs yet</div>
      ) : (
        <div className="space-y-1">
          {events.map(e => (
            <Link
              key={e.id}
              href={build(`/tools/${e.tool_slug || ""}`, { load: e.id })}
              className={cn(
                "block rounded-md px-3 py-2 text-sm",
                "hover:bg-muted transition-colors",
                "truncate"
              )}
              title={e.id}
            >
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                <span className="truncate">
                  {e.created_at
                    ? new Date(e.created_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })
                    : "Unknown"}
                </span>
              </div>
              {e.input && (
                <div className="text-xs text-muted-foreground mt-1 truncate">
                  {typeof e.input === "object"
                    ? Object.entries(e.input as Record<string, any>)
                        .slice(0, 2)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(", ")
                    : String(e.input).slice(0, 50)}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
