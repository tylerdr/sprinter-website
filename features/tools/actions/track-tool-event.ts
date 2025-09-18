"use server";

import { createClient } from "@/utils/supabase/server";
import { waitUntil } from "@vercel/functions";
import type { TablesInsert, Json } from "@/utils/supabase/generated.types";
import type { ToolEventData } from "@/features/tools/types";

export async function trackToolEvent(data: ToolEventData) {
  try {
    const supabase = await createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      console.warn("Cannot track tool event - user not authenticated");
      return { success: false, error: "Not authenticated", eventId: null };
    }

    const eventData: TablesInsert<"ai_tool_events"> = {
      tool_slug: data.toolSlug,
      tool_id: data.toolId ?? null,
      user_id: user.id, // Add user_id as a direct column
      input: (data.input ?? null) as Json,
      output: (data.output ?? null) as Json,
      error: data.error ?? null,
      duration_ms: data.durationMs ?? null,
      metadata: {
        ...data.metadata,
        user_id: user.id, // Keep in metadata for backward compatibility
        source: data.metadata?.source ?? "tool_form"
      } as Json,
      chat_id: data.chatId ?? null,
      message_id: data.messageId ?? null,
      tool_call_id: data.toolCallId ?? null
    };
    // Only set eventData.id if data.id is a valid UUID (v4 or v1)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (typeof data.id === "string" && uuidRegex.test(data.id)) {
      eventData.id = data.id;
    }

    const { data: insertedEvent, error } = await supabase
      .from("ai_tool_events")
      .insert(eventData)
      .select("id")
      .single();

    if (error) {
      console.error("Failed to track tool event:", error);
      return { success: false, error: error.message, eventId: null };
    }

    return { success: true, eventId: insertedEvent?.id ?? null };
  } catch (error) {
    console.error("Error tracking tool event:", error);
    return { success: false, error: "Failed to track event", eventId: null };
  }
}

export async function trackToolEventInBackground(
  data: ToolEventData
): Promise<void> {
  // Use waitUntil to ensure the event is tracked without blocking the response
  waitUntil(
    trackToolEvent(data).catch(err => {
      console.error("Background tool event tracking failed:", err);
    })
  );
}
