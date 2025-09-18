/**
 * Tool Part Types
 * Type-safe tool invocation and result parts for AI SDK v5
 *
 * These types work with the native UIMessage tool parts structure
 * and provide utilities for working with tool invocations.
 */

import type { UITools, ToolUIPart } from "ai";

/**
 * Tool UI Part type definition based on AI SDK v5 structure
 *
 * This type represents tool invocations and their states within UIMessage parts.
 * Each tool generates parts with type `tool-${toolName}` and tracks the tool's
 * execution state from input streaming to output availability.
 *
 * This type is automatically handled by the AI SDK when using InferUITools<TTools>
 * in your UIMessage type definition. You typically don't need to use this directly
 * unless you're building custom tool handling logic.
 *
 * @template TOOLS - The UITools type containing tool definitions
 *
 * States:
 * - `input-streaming`: Tool input is being streamed (partial input)
 * - `input-available`: Complete tool input is available
 * - `output-available`: Tool has completed successfully with output
 * - `output-error`: Tool execution failed with an error
 *
 * @example
 * ```typescript
 * import { tool } from 'ai';
 *
 * // Define tools using the AI SDK tool function
 * const tools = {
 *   weather: tool({
 *     description: 'Get weather information',
 *     parameters: z.object({
 *       city: z.string()
 *     }),
 *     execute: async ({ city }) => {
 *       return { temperature: 72, condition: 'sunny' };
 *     }
 *   })
 * } satisfies ToolSet;
 *
 * // Tool parts are automatically typed in UIMessage
 * type MyMessage = UIMessage<MyMetadata, MyDataParts, InferUITools<typeof tools>>;
 * ```
 */
export type SprinterToolUIPart<TOOLS extends UITools = UITools> =
  ToolUIPart<TOOLS>;

/**
 * Helper type to extract tool names from a UITools type
 */
export type ToolNames<TOOLS extends UITools> = keyof TOOLS & string;

/**
 * Helper type to get a specific tool's input type
 */
export type ToolInput<
  TOOLS extends UITools,
  NAME extends ToolNames<TOOLS>
> = TOOLS[NAME]["input"];

/**
 * Helper type to get a specific tool's output type
 */
export type ToolOutput<
  TOOLS extends UITools,
  NAME extends ToolNames<TOOLS>
> = TOOLS[NAME]["output"];

/**
 * Type guard to check if a part is a tool part
 */
export function isToolPart<TOOLS extends UITools = UITools>(
  part: unknown
): part is ToolUIPart<TOOLS> {
  if (typeof part !== "object" || part === null) return false;
  const p = part as any;
  return (
    typeof p.type === "string" &&
    p.type.startsWith("tool-") &&
    typeof p.toolCallId === "string" &&
    typeof p.state === "string" &&
    [
      "input-streaming",
      "input-available",
      "output-available",
      "output-error"
    ].includes(p.state)
  );
}

/**
 * Check if a tool part is in the input-streaming state
 */
export function isToolInputStreaming<TOOLS extends UITools = UITools>(
  part: ToolUIPart<TOOLS>
): boolean {
  return "state" in part && part.state === "input-streaming";
}

/**
 * Check if a tool part is in the input-available state
 */
export function isToolInputAvailable<TOOLS extends UITools = UITools>(
  part: ToolUIPart<TOOLS>
): boolean {
  return "state" in part && part.state === "input-available";
}

/**
 * Check if a tool part is in the output-available state
 */
export function isToolOutputAvailable<TOOLS extends UITools = UITools>(
  part: ToolUIPart<TOOLS>
): boolean {
  return "state" in part && part.state === "output-available";
}

/**
 * Check if a tool part is in the output-error state
 */
export function isToolOutputError<TOOLS extends UITools = UITools>(
  part: ToolUIPart<TOOLS>
): boolean {
  return "state" in part && part.state === "output-error";
}

/**
 * Extract tool name from a tool part type string
 * @example extractToolName('tool-weather') // returns 'weather'
 */
export function extractToolName(type: string): string | undefined {
  if (!type.startsWith("tool-")) return undefined;
  return type.slice(5); // Remove 'tool-' prefix
}
