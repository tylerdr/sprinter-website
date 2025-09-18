/**
 * AI Module - Centralized AI functionality for MortgageQ
 *
 * This module consolidates all AI-related features including:
 * - Citation extraction and management
 * - Agent orchestration
 * - Tool execution
 * - Streaming utilities
 */

// Agent System (AI Sprinter Stage 6)
export {
  getAgents,
  getAgentBySlug,
  getAgentWithTools,
  getAgentsByTenant,
  updateAgent,
  createAgent,
  type Agent,
  type AgentWithTools
} from "../agents/agent-loader";

// Tool System (AI Sprinter Stage 6)
export {
  getTools,
  getToolsByCategory,
  getToolBySlug,
  getToolsForAgent,
  getToolsByTenant,
  updateTool,
  createTool,
  assignToolsToAgent,
  type Tool
} from "./tool-loader";

// AI Models
export * from "./models";
export * from "./defaults";
