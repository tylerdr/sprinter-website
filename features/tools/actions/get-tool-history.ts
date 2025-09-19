"use server";

import { createClient } from "@/lib/supabase/server";
import { logger } from "@/lib/logger";

export async function getToolHistory(toolSlug: string, limit = 10) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: "Not authenticated", runs: [] };
    }

    const { data: runs, error } = await supabase
      .from("ai_tool_events")
      .select("id, input, output, error, created_at, metadata")
      .eq("tool_slug", toolSlug)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      logger.error("Failed to fetch tool history", { error: error.message });
      return { success: false, error: error.message, runs: [] };
    }

    return { success: true, runs: runs || [] };
  } catch (error) {
    logger.error("Error fetching tool history", { error });
    return { success: false, error: "Failed to fetch history", runs: [] };
  }
}