/**
 * AI Sprinter Tools Types
 * Core type definitions for the tool system
 */

// Export all core types
export type {
  ToolRunStatus,
  PreloadedContext,
  ToolContext,
  ToolSpec,
  ToolDefinition,
  InputOf,
  OutputOf,
  ToolUI,
  ToolExecutionResult,
  SprinterToolSpec,
  SprinterToolResult
} from "./core";

// Export all database types
export type { ToolEventRow, ToolEventData, ToolRow } from "./database";

// Export all source types
export {
  SprinterSourceBaseZ,
  SprinterSourceZ,
  type SprinterSource,
  type SprinterProviderMetadataEntry,
  type SprinterProviderMetadata,
  toAISdkSources,
  sourcesFromToolResult,
  buildSourceUIParts,
  withSources
} from "./sources";

// Export all message types
export {
  SprinterMessageMetadataZ,
  type SprinterMessageMetadata,
  SprinterDataPartsZ,
  type SprinterDataParts,
  SprinterNotificationZ,
  SprinterProgressZ,
  SprinterMetadataZ,
  SprinterDataPartZ,
  type SprinterDataPart,
  type SprinterUIMessage,
  type SprinterMessage,
  type SprinterTools,
  isNotificationPart,
  isProgressPart,
  isMetadataPart
} from "./messages";

// Export all tool part types
export {
  type SprinterToolUIPart,
  type ToolNames,
  type ToolInput,
  type ToolOutput,
  isToolInputStreaming,
  isToolInputAvailable,
  isToolOutputAvailable,
  isToolOutputError
} from "./tools";
