"use client";

import useSWR, { mutate as swrMutate, SWRResponse } from "swr";
import type { RecentChat } from "@/features/chat/lib/history/actions";
import { logger } from "@/lib/logger";
import { DEFAULT_CHAT_HISTORY_LIMIT } from "@/features/chat/constants";

export function useChatHistory(
  limit: number = DEFAULT_CHAT_HISTORY_LIMIT
): SWRResponse<RecentChat[], Error> {
  return useSWR(
    [`history:chats:${limit}`],
    async () => {
      const { fetchRecentChats } = await import(
        "@/features/chat/lib/history/actions"
      );
      return fetchRecentChats(limit);
    },
    {
      revalidateOnFocus: false,
      onError: (error: unknown) => {
        logger.error("Error fetching chat history", { error, limit });
      }
    }
  );
}

export function refreshChatHistory(limit: number = DEFAULT_CHAT_HISTORY_LIMIT) {
  swrMutate([`history:chats:${limit}`]);
}
