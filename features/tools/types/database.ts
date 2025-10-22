/**
 * Database Tool Types
 * Types for tool-related database operations
 */

import type { Tables } from "@/lib/supabase/generated.types";

export type ToolRow = Tables<"ai_tools">;

/** Database row type for ai_tool_events table */
export type ToolEventRow = Tables<"ai_tool_events">;

/** Data structure for tracking tool events in the database - input for creating events */
export interface ToolEventData {
  toolSlug: string;
  toolId?: string | null;
  input?: unknown;
  output?: unknown;
  error?: string | null;
  durationMs?: number;
  metadata?: Record<string, any>;
  chatId?: string | null;
  messageId?: string | null;
  toolCallId?: string | null;
  id?: string | null;
}
