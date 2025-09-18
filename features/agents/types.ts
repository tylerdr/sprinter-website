/**
 * Agent Types - Centralized type definitions for the agent system
 */

import { OpenAIResponsesProviderOptions } from "@ai-sdk/openai";

/**
 * Agent AI configuration stored in the database
 */
export interface AgentAIConfig {
  temperature?: number;
  max_tokens?: number;
  max_tool_calls?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  [key: string]: any;
}

/**
 * Agent UI configuration stored in the database
 */
export interface AgentUIConfig {
  icon?: string;
  badge?: string;
  theme?: string;
  suggestedPrompts?: string[];
  color?: string;
  primaryImagePath?: string;
  secondaryImagePath?: string;
  [key: string]: any;
}

/**
 * Core agent configuration
 */
export interface AgentConfig {
  id: string;
  slug: string;
  name: string;
  description?: string;
  category?: "core" | "specialist" | "entity" | "custom";
  model: string;
  temperature?: number;
  maxOutputTokens?: number;
  providerOptions?: {
    openai?: OpenAIResponsesProviderOptions;
  };
  tools?: string[]; // Tool slugs this agent can use
  systemPrompt?: string; // Can be used instead of systemPromptTemplate
  maxSteps?: number;
  isActive?: boolean;
  tenantId?: number;
  icon?: string; // Emoji or icon string
  primaryImagePath?: string;
  secondaryImagePath?: string;
  suggestedPrompts?: string[];
  metadata?: {
    [key: string]: any;
  };
}

/**
 * Agent execution context
 */
export interface AgentContext {
  messages: any[];
  variables?: Record<string, any>;
  tenantId?: number;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

/**
 * Result of agent execution
 */
export interface AgentExecutionResult {
  agentId: string;
  success: boolean;
  response?: string;
  toolResults?: any[];
  error?: string;
  duration?: number;
}

/**
 * Database agent record (from ai_agents table)
 */
export interface DatabaseAgent {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  provider: string;
  model: string;
  system_prompt: string | null;
  status_id: number | null;
  is_active: boolean | null;
  tags: string[] | null;
  ai_config: any; // JSONB field
  ui_config: any; // JSONB field
  metadata: any; // JSONB field
  created_at: string | null;
  updated_at: string | null;
}

/**
 * Agent-Tool relationship (from ai_agent_tools table)
 */
export interface AgentToolRelation {
  agent_id: string;
  tool_id: string;
  is_enabled: boolean | null;
  config: any; // JSONB field
  metadata: any; // JSONB field
  created_at: string | null;
}

/**
 * Simplified agent for UI display
 */
export interface Agent {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  model: string;
  provider: string;
  systemPrompt: string | null;
  temperature: number;
  maxTokens: number | null;
  maxToolCalls: number;
  tools: string[];
  icon: string | null;
  badge: string | null;
  status: string;
  isActive: boolean;
  isSystemAgent: boolean;
  metadata: any;
  createdAt: string;
  updatedAt: string;
}

/**
 * Agent with its available tools
 */
export interface AgentWithTools extends Agent {
  availableTools: Tool[];
}

/**
 * Tool definition (basic, full Tool type will be in tools/types.ts)
 */
export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  inputSchema: any;
  outputSchema: any;
  executionMode: string;
  isActive: boolean;
  isSystemTool: boolean;
  metadata: any;
  status: string;
  createdAt: string;
  updatedAt: string;
}
