"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useChatHistory } from "@/features/chat/hooks/use-chat-history";
import { useNavWithLoading } from "@/features/chat/hooks/use-nav-with-loading";
import { usePathname, useSearchParams } from "next/navigation";
import { DEFAULT_CHAT_HISTORY_LIMIT } from "@/features/chat/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface Props {
  onOpenSearch?: () => void;
}

export default function AgentChatHistory({ onOpenSearch }: Props) {
  const { data: chats, isLoading } = useChatHistory(DEFAULT_CHAT_HISTORY_LIMIT);
  const { build, push } = useNavWithLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeChatId = pathname?.startsWith("/chat/")
    ? pathname.slice("/chat/".length).split("/")[0]
    : null;

  return (
    <div>
      {isLoading ? (
        <div className="space-y-1.5 p-2">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="rounded-md border p-2">
              <Skeleton className="h-3 w-40" />
            </div>
          ))}
        </div>
      ) : !chats || chats.length === 0 ? (
        <div className="text-xs text-muted-foreground text-center p-2">
          No chats yet
        </div>
      ) : (
        <div className="space-y-0.5">
          {chats.map(c => {
            const isActive = activeChatId === c.id;
            const path = `/chat/${c.id}`;
            const extras = c.agent_slug ? { agent: c.agent_slug } : undefined;
            const href = build(path, extras);

            const updated = c.updated_at ? new Date(c.updated_at) : null;
            const updatedLabel = updated
              ? `${updated.toLocaleDateString()} ${updated.toLocaleTimeString()}`
              : "Unknown date";
            const agentLabel = c.agent_name || "Agent Unknown";

            const link = (
              <Link
                key={c.id}
                href={href}
                onClick={e => {
                  if (
                    e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey ||
                    (e as any).button !== 0
                  )
                    return;
                  const current = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
                  if (current === href) return;
                  e.preventDefault();
                  push({ path, extra: extras });
                }}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "block rounded-md px-4 py-2 text-xs transition-colors truncate",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title={c.title ?? c.id}
              >
                <span className="truncate">
                  {c.title ?? `Chat ${c.id.slice(0, 8)}`}
                </span>
              </Link>
            );

            return (
              <Tooltip key={c.id}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right" align="start">
                  <div className="space-y-0.5">
                    <div className="text-[11px] text-muted-foreground">
                      Last updated
                    </div>
                    <div className="text-xs font-medium">{updatedLabel}</div>
                    <div className="text-[11px] text-muted-foreground mt-1">
                      Agent
                    </div>
                    <div className="text-xs font-medium">{agentLabel}</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}

          {chats.length >= DEFAULT_CHAT_HISTORY_LIMIT && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1 w-full justify-center text-muted-foreground hover:text-foreground text-xs"
              onClick={() => onOpenSearch?.()}
            >
              View All History
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
