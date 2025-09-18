/**
 * Message Types
 * Types for AI messages and metadata following AI SDK v5 patterns
 */

import { z } from "zod";
import type { InferUITools, ToolSet, UIMessage } from "ai";

/**
 * Custom message metadata schema for Sprinter
 * This extends the default UIMessage with application-specific metadata
 */
export const SprinterMessageMetadataZ = z.object({
  tenantId: z.union([z.string(), z.number()]).optional(),
  workspaceId: z.string().optional(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  messageId: z.string().optional(),
  agentId: z.string().optional(),
  // free-form passthrough for experimental data
  extra: z.record(z.string(), z.unknown()).optional()
});

/**
 * Inferred type from the metadata schema
 */
export type SprinterMessageMetadata = z.infer<typeof SprinterMessageMetadataZ>;

/**
 * Custom data parts schema for Sprinter
 * Following the AI SDK v5 pattern of defining data parts as a schema object
 *
 * Note: Sources use native AI SDK source parts (source-url, source-document),
 * not custom data parts. See sources.ts for source handling.
 */
export const SprinterDataPartsZ = z.object({
  /**
   * Notification data part for displaying alerts/messages to users
   */
  "data-notification": z
    .object({
      level: z.enum(["info", "success", "warning", "error"]),
      title: z.string().optional(),
      message: z.string(),
      action: z
        .object({
          label: z.string(),
          url: z.string().url().optional(),
          tool: z
            .object({ slug: z.string(), input: z.unknown().optional() })
            .optional()
        })
        .optional()
    })
    .optional(),

  /**
   * Progress data part for showing operation progress
   */
  "data-progress": z
    .object({
      operation: z.string(),
      percentage: z.number().min(0).max(100),
      status: z.enum(["pending", "running", "completed", "error"]),
      message: z.string().optional()
    })
    .optional(),

  /**
   * Metadata data part for additional context
   */
  "data-metadata": z
    .object({
      key: z.string(),
      value: z.unknown(),
      displayName: z.string().optional()
    })
    .optional()
});

/**
 * Inferred type from the data parts schema
 * This creates the proper mapped type structure for AI SDK v5
 */
export type SprinterDataParts = z.infer<typeof SprinterDataPartsZ>;

/**
 * Individual data part schemas for validation (with type field)
 */
export const SprinterNotificationZ = z.object({
  type: z.literal("data-notification"),
  level: z.enum(["info", "success", "warning", "error"]),
  title: z.string().optional(),
  message: z.string(),
  action: z
    .object({
      label: z.string(),
      url: z.string().url().optional(),
      tool: z
        .object({ slug: z.string(), input: z.unknown().optional() })
        .optional()
    })
    .optional()
});

export const SprinterProgressZ = z.object({
  type: z.literal("data-progress"),
  operation: z.string(),
  percentage: z.number().min(0).max(100),
  status: z.enum(["pending", "running", "completed", "error"]),
  message: z.string().optional()
});

export const SprinterMetadataZ = z.object({
  type: z.literal("data-metadata"),
  key: z.string(),
  value: z.unknown(),
  displayName: z.string().optional()
});

/**
 * Union of all custom data part schemas for validation
 */
export const SprinterDataPartZ = z.union([
  SprinterNotificationZ,
  SprinterProgressZ,
  SprinterMetadataZ
]);

/**
 * Type for any Sprinter data part (for runtime validation)
 */
export type SprinterDataPart = z.infer<typeof SprinterDataPartZ>;

/**
 * Sprinter UIMessage type following AI SDK v5 patterns
 *
 * This extends the default UIMessage with:
 * - Custom metadata (SprinterMessageMetadata)
 * - Custom data parts (SprinterDataParts)
 * - Type-safe tool definitions (InferUITools<TTools>)
 *
 * @template TTools - The tool set for type-safe tool interactions
 *
 * @example
 * ```typescript
 * import { SprinterUIMessage } from '@/features/tools/types';
 * import { tool } from 'ai';
 *
 * // Define your tools
 * const tools = {
 *   weather: tool({
 *     description: 'Get weather information',
 *     parameters: z.object({
 *       city: z.string()
 *     }),
 *     execute: async ({ city }) => {
 *       // Implementation
 *       return { temperature: 72, condition: 'sunny' };
 *     }
 *   })
 * } satisfies ToolSet;
 *
 * // Create typed messages
 * type MyMessage = SprinterUIMessage<typeof tools>;
 *
 * // Use the typed message
 * const message: MyMessage = {
 *   id: '1',
 *   role: 'assistant',
 *   metadata: {
 *     tenantId: 'tenant-123',
 *     userId: 'user-456'
 *   },
 *   parts: [
 *     { type: 'text', text: 'Checking the weather...' },
 *     {
 *       type: 'tool-weather',
 *       toolCallId: 'call-789',
 *       state: 'output-available',
 *       input: { city: 'San Francisco' },
 *       output: { temperature: 72, condition: 'sunny' }
 *     }
 *   ]
 * };
 * ```
 */
export type SprinterUIMessage<TTools extends ToolSet = ToolSet> = UIMessage<
  SprinterMessageMetadata,
  SprinterDataParts,
  InferUITools<TTools>
>;

/**
 * Back-compat alias; prefer SprinterUIMessage going forward.
 */
export type SprinterMessage<TTools extends ToolSet = ToolSet> =
  SprinterUIMessage<TTools>;

/**
 * Aliases for tool type inference
 */
export type SprinterTools<TTools extends ToolSet = ToolSet> =
  InferUITools<TTools>;

/**
 * Type guards for checking data part types
 */
export function isNotificationPart(
  part: unknown
): part is SprinterDataParts["data-notification"] {
  return SprinterNotificationZ.safeParse(part).success;
}

export function isProgressPart(
  part: unknown
): part is SprinterDataParts["data-progress"] {
  return SprinterProgressZ.safeParse(part).success;
}

export function isMetadataPart(
  part: unknown
): part is SprinterDataParts["data-metadata"] {
  return SprinterMetadataZ.safeParse(part).success;
}
