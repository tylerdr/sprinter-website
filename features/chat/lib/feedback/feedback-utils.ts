"use server";

import { createClient } from "@/lib/supabase/server";
import { logger } from "@/lib/logger";

export interface PerUserFeedbackEntry {
  value: 1 | -1;
  comment?: string;
  updatedAt: string;
}

export interface MessageFeedbackMetadata {
  feedback?: {
    byUser?: Record<string, PerUserFeedbackEntry>;
    summary?: {
      positives: number;
      negatives: number;
    };
  };
}

export async function getCurrentUserId(): Promise<string | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  } catch (error) {
    logger.error("[feedback] failed to get current user", { error });
    return null;
  }
}

export async function ensureUserOwnsMessage(messageId: string, userId: string) {
  const supabase = await createClient();

  const msgRow = await supabase
    .from("ai_messages")
    .select("chat_id")
    .eq("id", messageId)
    .single();

  if (msgRow.error || !msgRow.data?.chat_id)
    return { ok: false as const, error: "NOT_FOUND" };

  const { data: chatRow, error: chatErr } = await supabase
    .from("ai_chats")
    .select("created_by")
    .eq("id", msgRow.data.chat_id)
    .single();
  if (chatErr || !chatRow?.created_by)
    return { ok: false as const, error: "NOT_FOUND" };
  if (chatRow.created_by !== userId)
    return { ok: false as const, error: "FORBIDDEN" };
  return { ok: true as const };
}
