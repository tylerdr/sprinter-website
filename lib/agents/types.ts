import { z } from 'zod';
import { Tool } from 'ai';

export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  systemPrompt: string;
  model: string;
  temperature?: number;
  maxSteps?: number;
  capabilities: string[];
  tools?: AgentTool[];
  metadata?: Record<string, any>;
}

export interface AgentTool {
  name: string;
  description: string;
  parameters: z.ZodSchema;
  execute: (params: any, context?: AgentContext) => Promise<any>;
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

export interface AgentContext {
  userId?: string;
  threadId: string;
  agentId: string;
  isAdmin?: boolean;
  pageContext?: {
    url: string;
    title: string;
    section?: string;
  };
  userProfile?: {
    email?: string;
    role?: string;
    permissions?: string[];
  };
  memory?: ConversationMemory;
}

export interface ConversationMemory {
  shortTerm: Message[];
  longTerm?: {
    summary: string;
    keyPoints: string[];
    userPreferences: Record<string, any>;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  toolCalls?: ToolCall[];
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: any;
  result?: any;
  error?: string;
  duration?: number;
}

export interface AgentResponse {
  message: string;
  toolCalls?: ToolCall[];
  suggestedActions?: string[];
  metadata?: Record<string, any>;
}

export interface Thread {
  id: string;
  userId?: string;
  agentId: string;
  messages: Message[];
  context: AgentContext;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'archived' | 'suspended';
}

export enum AgentCapability {
  CONTENT_GENERATION = 'content_generation',
  IMAGE_GENERATION = 'image_generation',
  DATA_ANALYSIS = 'data_analysis',
  CODE_EXECUTION = 'code_execution',
  WEB_SEARCH = 'web_search',
  DATABASE_ACCESS = 'database_access',
  EMAIL_COMPOSITION = 'email_composition',
  FILE_MANAGEMENT = 'file_management',
  WORKFLOW_AUTOMATION = 'workflow_automation',
  REPORT_GENERATION = 'report_generation',
}

export interface AgentRegistry {
  agents: Map<string, AgentConfig>;
  tools: Map<string, AgentTool>;
  
  registerAgent(agent: AgentConfig): void;
  registerTool(tool: AgentTool): void;
  getAgent(id: string): AgentConfig | undefined;
  getTool(name: string): AgentTool | undefined;
  listAgents(filter?: Partial<AgentConfig>): AgentConfig[];
  listTools(adminOnly?: boolean): AgentTool[];
}