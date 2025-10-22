"use server";

import { createClient } from "@/lib/supabase/server";
import { logger } from "@/lib/logger";
import { Database } from "@/lib/supabase/generated.types";
import { DEFAULT_CHAT_HISTORY_LIMIT } from "@/features/chat/constants";

export type RecentChat = Pick<
  Database["public"]["Tables"]["ai_chats"]["Row"],
  "id" | "title" | "updated_at"
> & { agent_slug?: string | null; agent_name?: string | null };

export type RecentToolEvent = Pick<
  Database["public"]["Tables"]["ai_tool_events"]["Row"],
  "id" | "created_at" | "input" | "output"
> & { tool_slug?: string };

async function getCurrentUserId(): Promise<string | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  } catch (error) {
    logger.error("[history] failed to get current user", { error });
    return null;
  }
}

export async function fetchRecentChats(
  limit: number = DEFAULT_CHAT_HISTORY_LIMIT
): Promise<RecentChat[]> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return [];

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ai_chats")
      .select("id, title, updated_at, agent:ai_agents(slug, name)")
      .eq("created_by", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);
    if (error) throw error;

    const rows = data || [];
    return rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      updated_at: row.updated_at,
      agent_slug: row.agent?.slug ?? null,
      agent_name: row.agent?.name ?? null
    }));
  } catch (error) {
    logger.error("[history] failed to fetch recent chats", { error });
    return [];
  }
}

export async function fetchRecentChatsPage(
  limit: number = DEFAULT_CHAT_HISTORY_LIMIT,
  offset: number = 0
): Promise<RecentChat[]> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return [];

    const supabase = await createClient();
    const from = offset;
    const to = Math.max(offset + limit - 1, offset);
    const { data, error } = await supabase
      .from("ai_chats")
      .select("id, title, updated_at, agent:ai_agents(slug, name)")
      .eq("created_by", userId)
      .order("updated_at", { ascending: false })
      .range(from, to);
    if (error) throw error;

    const rows = data || [];
    return rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      updated_at: row.updated_at,
      agent_slug: row.agent?.slug ?? null,
      agent_name: row.agent?.name ?? null
    }));
  } catch (error) {
    logger.error("[history] failed to fetch recent chats page", {
      error,
      limit,
      offset
    });
    return [];
  }
}

export async function searchRecentChats(
  query: string,
  limit: number = DEFAULT_CHAT_HISTORY_LIMIT,
  offset: number = 0
): Promise<RecentChat[]> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return [];

    const supabase = await createClient();
    const from = offset;
    const to = Math.max(offset + limit - 1, offset);

    // Simple title search; extend to full-text when available
    const { data, error } = await supabase
      .from("ai_chats")
      .select("id, title, updated_at, agent:ai_agents(slug, name)")
      .eq("created_by", userId)
      .ilike("title", `%${query}%`)
      .order("updated_at", { ascending: false })
      .range(from, to);
    if (error) throw error;

    const rows = data || [];
    return rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      updated_at: row.updated_at,
      agent_slug: row.agent?.slug ?? null,
      agent_name: row.agent?.name ?? null
    }));
  } catch (error) {
    logger.error("[history] failed to search chats", {
      error,
      query,
      limit,
      offset
    });
    return [];
  }
}

export async function fetchRecentToolEvents(
  toolSlug: string,
  limit: number = DEFAULT_CHAT_HISTORY_LIMIT
): Promise<RecentToolEvent[]> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return [];

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ai_tool_events")
      .select("id, created_at, input, output")
      .eq("tool_slug", toolSlug)
      .eq("created_by", userId)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  } catch (error) {
    logger.error("[history] failed to fetch tool events", { error });
    return [];
  }
}

export async function fetchRecentToolEventsAll(
  limit: number = DEFAULT_CHAT_HISTORY_LIMIT
): Promise<RecentToolEvent[]> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return [];

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ai_tool_events")
      .select("id, created_at, input, output, tool_slug")
      .eq("created_by", userId)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  } catch (error) {
    logger.error("[history] failed to fetch all tool events", { error });
    return [];
  }
}
