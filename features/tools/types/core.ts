/**
 * Core Tool Types
 * Base type definitions for the tool system
 */

import { z } from "zod";
import type React from "react";
import type { ToolCategory } from "../constants/categories";
import type { SprinterSource } from "./sources";

export type ToolRunStatus =
  | "queued"
  | "running"
  | "partial"
  | "success"
  | "error"
  | "canceled";

export type PreloadedContext = {
  /** JSON Pointer -> allowed options for that input field */
  fieldOptions: Record<string, Array<{ value: string; label?: string }>>;
  /** Named lists for UI composition */
  datasets: Record<string, unknown[]>;
};

export type ToolContext = {
  tenantId?: string | number;
  tenantSlug?: string;
  tenantName?: string;
  tenantLogoUrl?: string;
  workspaceId?: string;
  userId?: string;
  sessionId?: string;
  messageId?: string;
  // Entity-aware properties
  entityId?: string;
  entitySlug?: string;
  entityState?: Record<string, any>;
  preloaded: PreloadedContext;
  abortSignal?: AbortSignal;
  secrets?: Record<string, string>;
  agentNotes?: any;
  getOptions: (jsonPointer: string) => Array<{ value: string; label?: string }>;
  getDataset: <T = unknown>(key: string) => T[];
  // Entity value accessor for dot-notation paths
  getEntityValue?: (path: string) => any;
};

export type ToolSpec<I extends z.ZodTypeAny, O extends z.ZodTypeAny> = {
  slug: string;
  name: string;
  description: string;
  category?: ToolCategory;
  executionMode?: "server" | "client" | "interactive" | "hybrid";
  version?: string;
  permissions?: string[];
  inputSchema: I;
  outputSchema: O;
  execute(args: z.infer<I>, ctx?: ToolContext): Promise<z.infer<O>>;
  metadata?: {
    suggestedPrompts?: string[];
    tags?: string[];
    owner?: string;
    active?: boolean;
    [key: string]: any;
  };
};

export type ToolDefinition = ToolSpec<any, any> & {
  id?: string;
  tenantId?: string | number;
  workspaceId?: string;
  isDeprecated?: boolean;
  isActive?: boolean;
  isPublic?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type InputOf<T extends ToolSpec<any, any>> = z.infer<T["inputSchema"]>;
export type OutputOf<T extends ToolSpec<any, any>> = z.infer<T["outputSchema"]>;

export type ToolUI<I extends z.ZodTypeAny, O extends z.ZodTypeAny> = {
  Result: React.FC<{ data: z.infer<O> }>;
  Loading?: React.FC<{ progressPct?: number; note?: string }>;
  Error?: React.FC<{ message: string }>;
  /** Receives server-preloaded context and the validated schema; must not fetch. */
  InputForm?: React.FC<{
    onSubmit: (args: z.infer<I>) => void;
    ctx?: ToolContext;
    schema?: I;
    isLoading?: boolean; // Added for compatibility
  }>;
};

/** Tool execution result with optional rendering component */
export interface ToolExecutionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  duration?: number;
  toolSlug: string;
  renderComponent?: string;
}

// Compatibility interfaces for existing code
export interface SprinterToolSpec {
  slug: string;
  name: string;
  description: string;
  category?: string;
  inputSchema: z.ZodSchema;
  outputSchema: z.ZodSchema;
  execute: (input: any, context?: any) => Promise<any>;
  executionMode?: "server" | "client" | "hybrid" | "interactive";
  version?: string;
  permissions?: string[];
}

/** All Sprinter tools SHOULD include a sources[] array if they cite anything. */
export interface SprinterToolResult<T = any> {
  data: T; // validated tool output (schema)
  sources?: SprinterSource[]; // standardized sources list
}
