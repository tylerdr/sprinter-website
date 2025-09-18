"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavWithLoading } from "@/features/chat/hooks/use-nav-with-loading";
import { cn } from "@/lib/utils";
import { Search, Loader2 } from "lucide-react";
import { format } from "date-fns";
import {
  fetchRecentChatsPage,
  searchRecentChats
} from "@/features/chat/lib/history/actions";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { usePathname, useSearchParams } from "next/navigation";
const PAGE_SIZE = 30;

interface AgentChatHistorySearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AgentChatHistorySearch({
  isOpen,
  onClose
}: AgentChatHistorySearchProps) {
  const { build, push } = useNavWithLoading();
  const pathname = usePathname();
  const query = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<
    Array<{ id: string; title?: string | null; updated_at?: string | null }>
  >([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const debouncedTerm = useDebounce(searchTerm, 300);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setPage(0);
      setHasMore(true);
      setResults([]);
    }
  }, [isOpen]);

  // Initial load and when clearing search
  useEffect(() => {
    const run = async () => {
      if (!isOpen) return;
      if (debouncedTerm && debouncedTerm.length >= 2) return; // handled by search effect
      setIsLoading(true);
      try {
        const data = await fetchRecentChatsPage(PAGE_SIZE, 0);
        setResults(data || []);
        setHasMore(Boolean(data && data.length === PAGE_SIZE));
        setPage(0);
      } catch (e) {
        setResults([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [isOpen, debouncedTerm]);

  // Search
  useEffect(() => {
    const run = async () => {
      if (!isOpen) return;
      if (!debouncedTerm || debouncedTerm.length < 2) return;
      setIsSearching(true);
      setPage(0);
      try {
        const data = await searchRecentChats(debouncedTerm, PAGE_SIZE, 0);
        setResults(data || []);
        setHasMore(Boolean(data && data.length === PAGE_SIZE));
      } catch (e) {
        setResults([]);
        setHasMore(false);
      } finally {
        setIsSearching(false);
      }
    };
    run();
  }, [debouncedTerm, isOpen]);

  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const offset = nextPage * PAGE_SIZE;
      let data: typeof results = [];
      if (debouncedTerm && debouncedTerm.length >= 2) {
        data = await searchRecentChats(debouncedTerm, PAGE_SIZE, offset);
      } else {
        data = await fetchRecentChatsPage(PAGE_SIZE, offset);
      }
      const newItems = data || [];
      setResults(prev => {
        const existing = new Set(prev.map(x => x.id));
        const uniques = newItems.filter(x => !existing.has(x.id));
        return [...prev, ...uniques];
      });
      setHasMore(Boolean(newItems && newItems.length === PAGE_SIZE));
      setPage(nextPage);
    } catch (e) {
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const SkeletonList = () => (
    <div className="space-y-2">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="p-3 rounded-md border border-border/40 bg-card/30"
        >
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-base">Recent Chats</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Browse and search your conversations
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search titles..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 h-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>

        <div className="overflow-y-auto flex-1 px-6 pb-4">
          {isLoading ? (
            <SkeletonList />
          ) : results.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 border border-dashed rounded-md border-border/50 text-sm">
              {searchTerm
                ? "No matching conversations"
                : "No conversations yet"}
            </div>
          ) : (
            <div className="space-y-2">
              {results.map(item => {
                const path = `/chat/${item.id}`;
                const href = build(path);
                return (
                  <Link
                    key={item.id}
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
                      const current = `${pathname}${query.toString() ? `?${query.toString()}` : ""}`;
                      if (current === href) return;
                      e.preventDefault();
                      onClose();
                      push({ path });
                    }}
                    className={cn(
                      "block p-3 rounded-md hover:bg-accent/60 group transition-colors border border-border/40 bg-card/30"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium truncate text-sm group-hover:text-blue-600 transition-colors">
                        {item.title || `Chat ${item.id.slice(0, 8)}`}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {item.updated_at
                          ? format(new Date(item.updated_at), "MMM d, yyyy")
                          : ""}
                      </span>
                    </div>
                  </Link>
                );
              })}

              {hasMore && (
                <div className="flex justify-center py-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadMore}
                    disabled={isLoadingMore}
                    className="text-sm h-9 min-w-[140px]"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end p-4 bg-muted/30 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-sm h-9"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
