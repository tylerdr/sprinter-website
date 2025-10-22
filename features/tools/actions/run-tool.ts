"use server";
import { loadTool } from "@/features/tools/registry";
import { randomUUID } from "crypto";
import { trackToolEventInBackground } from "@/features/tools/actions/track-tool-event";
import { logger } from "@/lib/logger";

// Server action bound to slug
export async function runTool(slug: string, values: unknown) {
  const startTime = Date.now();

  const tool = await loadTool(slug);
  if (!tool) return { ok: false as const, error: "Tool not found" };

  // Validate input
  let input: unknown;
  try {
    input = tool.inputSchema.parse(values);
  } catch (err: any) {
    return { ok: false as const, error: err?.message ?? "Invalid input" };
  }

  // Execute tool
  let result: unknown;
  let executionError: string | null = null;

  try {
    result = await tool.execute(input);

    // Validate output
    result = tool.outputSchema.parse(result);
  } catch (error) {
    logger.error("Tool execution failed", {
      tool: slug,
      error: error instanceof Error ? error.message : String(error)
    });
    executionError = error instanceof Error ? error.message : "Execution failed";
    return {
      ok: false as const,
      error: executionError,
      eventId: null
    };
  }

  const durationMs = Date.now() - startTime;
  const eventId = randomUUID();

  // Track the tool event and get the event ID
  trackToolEventInBackground({
    id: eventId,
    toolSlug: slug,
    toolId: undefined, // ToolSpec doesn't have id, only ToolDefinition does
    input: input,
    output: result,
    error: executionError,
    durationMs,
    metadata: {
      toolName: tool.name,
      executionMode: tool.executionMode || "server",
      source: "tool_page",
      pathname: `/tools/${slug}`,
      success: !executionError
    }
  });

  if (executionError) {
    return {
      ok: false as const,
      error: executionError,
      eventId
    };
  }

  return {
    ok: true as const,
    data: result,
    eventId
  };
}