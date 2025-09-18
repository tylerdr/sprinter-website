"use client";

import useSWR, { mutate as swrMutate, SWRResponse } from "swr";
import type { RecentToolEvent } from "@/features/chat/lib/history/actions";
import { logger } from "@/lib/logger";

export function useToolHistory(
  limit: number = 50
): SWRResponse<RecentToolEvent[], Error> {
  return useSWR(
    ["history:tools", limit],
    async () => {
      const { fetchRecentToolEventsAll } = await import(
        "@/features/chat/lib/history/actions"
      );
      return fetchRecentToolEventsAll(limit);
    },
    {
      revalidateOnFocus: false,
      onError: (error: unknown) => {
        logger.error("Error fetching tool history", { error, limit });
      }
    }
  );
}

export function refreshToolHistory(limit: number = 50) {
  swrMutate(["history:tools", limit]);
}
