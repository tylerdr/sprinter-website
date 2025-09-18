"use server";

import { createClient as createAdminClient } from "@/utils/supabase/server";
import { logger } from "@/lib/logger";
import type { Database } from "@/utils/supabase/generated.types";
import {
  getCurrentUserId,
  ensureUserOwnsMessage,
  MessageFeedbackMetadata,
  PerUserFeedbackEntry
} from "./feedback-utils";

function computeSummary(
  byUser: Record<string, PerUserFeedbackEntry> | undefined
) {
  let positives = 0;
  let negatives = 0;
  if (byUser) {
    for (const entry of Object.values(byUser)) {
      if (entry.value === 1) positives++;
      else negatives++;
    }
  }
  return { positives, negatives };
}

interface UpsertFeedbackParams {
  messageId: string;
  value: 1 | -1; // 1 = positive, -1 = negative
  comment?: string;
}

interface RemoveFeedbackParams {
  messageId: string;
}

type Ok<T> = { ok: true; data: T };

type Err = { ok: false; error: string };

type Result<T> = Ok<T> | Err;

export async function upsertMessageFeedback(
  params: UpsertFeedbackParams
): Promise<
  Result<{
    messageId: string;
    userId: string;
    summary: { positives: number; negatives: number };
  }>
> {
  try {
    const userId = await getCurrentUserId();

    if (!userId) return { ok: false, error: "UNAUTHORIZED" };

    const auth = await ensureUserOwnsMessage(params.messageId, userId);
    if (!auth.ok) return auth;

    // Temporary until chat_feedback is merged
    const supabaseAdmin = await createAdminClient();

    // Fetch current metadata to merge feedback
    // First try by database ID, then by AI SDK ID
    let msgResult = await supabaseAdmin
      .from("ai_messages")
      .select("id, metadata")
      .eq("id", params.messageId)
      .single();

    if (msgResult.error || !msgResult.data) {
      logger.error("[feedback] failed to fetch message", {
        error: msgResult.error,
        messageId: params.messageId
      });
      return { ok: false, error: "NOT_FOUND" };
    }

    const msg = msgResult.data;

    const metadata: MessageFeedbackMetadata = (msg.metadata as any) || {};

    const byUser = { ...(metadata.feedback?.byUser || {}) } as Record<
      string,
      PerUserFeedbackEntry
    >;

    byUser[userId] = {
      value: params.value,
      comment: params.comment || undefined,
      updatedAt: new Date().toISOString()
    };

    const summary = computeSummary(byUser);

    const nextMetadata: MessageFeedbackMetadata = {
      ...metadata,
      feedback: {
        ...(metadata.feedback || {}),
        byUser,
        summary
      }
    };
    logger.info("[feedback] upserting feedback", {
      messageId: params.messageId,
      userId,
      summary,
      nextMetadata
    });

    const { error: updateErr, data: updatedMsg } = await supabaseAdmin
      .from("ai_messages")
      .update({
        metadata:
          nextMetadata as Database["public"]["Tables"]["ai_messages"]["Row"]["metadata"]
      })
      .eq("id", msg.id) // Use the actual database ID, not the AI SDK ID
      .select("id, metadata")
      .single();

    if (updateErr) {
      logger.error("[feedback] failed to upsert feedback", {
        error: updateErr
      });
      return { ok: false, error: "UPDATE_FAILED" };
    }
    logger.info("[feedback] updated feedback", {
      messageId: updatedMsg.id
    });

    return {
      ok: true,
      data: {
        messageId: updatedMsg.id,
        userId,
        summary
      }
    };
  } catch (error) {
    logger.error("[feedback] upsertMessageFeedback error", { error, params });
    return { ok: false, error: "INTERNAL_ERROR" };
  }
}

export async function removeMyMessageFeedback(
  params: RemoveFeedbackParams
): Promise<
  Result<{
    messageId: string;
    userId: string;
    summary: { positives: number; negatives: number };
  }>
> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return { ok: false, error: "UNAUTHORIZED" };

    const auth = await ensureUserOwnsMessage(params.messageId, userId);
    if (!auth.ok) return auth;
    // Temporary until chat_feedback is merged
    const supabaseAdmin = await createAdminClient();

    const msgResult = await supabaseAdmin
      .from("ai_messages")
      .select("id, metadata")
      .eq("id", params.messageId)
      .single();

    if (msgResult.error || !msgResult.data)
      return { ok: false, error: "NOT_FOUND" };

    const msg = msgResult.data;

    const metadata: MessageFeedbackMetadata = (msg.metadata as any) || {};
    const byUser = { ...(metadata.feedback?.byUser || {}) } as Record<
      string,
      PerUserFeedbackEntry
    >;

    if (byUser[userId]) delete byUser[userId];

    const summary = computeSummary(byUser);

    const nextMetadata: MessageFeedbackMetadata = {
      ...metadata,
      feedback: {
        ...(metadata.feedback || {}),
        byUser,
        summary
      }
    };

    const { error: updateErr } = await supabaseAdmin
      .from("ai_messages")
      .update({
        metadata:
          nextMetadata as Database["public"]["Tables"]["ai_messages"]["Row"]["metadata"]
      })
      .eq("id", msg.id); // Use the actual database ID, not the AI SDK ID

    if (updateErr) {
      logger.error("[feedback] failed to remove feedback", {
        error: updateErr
      });
      return { ok: false, error: "UPDATE_FAILED" };
    }

    return { ok: true, data: { messageId: params.messageId, userId, summary } };
  } catch (error) {
    logger.error("[feedback] removeMyMessageFeedback error", { error, params });
    return { ok: false, error: "INTERNAL_ERROR" };
  }
}
