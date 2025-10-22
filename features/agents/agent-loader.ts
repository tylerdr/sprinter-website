/**
 * Agent Loader - Loads AI agents from database
 * Part of AI Sprinter Stage 6 implementation
 */

import { createClient } from "@/lib/supabase/server";
import { cache } from "react";
import { logger } from "@/lib/logger";
// import { getStatusSlugById } from "@/lib/statuses";
import type { AgentAIConfig, Agent, AgentUIConfig, AgentWithTools, Tool } from "./types";

// Re-export types for consumers
export type { AgentAIConfig, Agent, AgentWithTools, Tool } from "./types";

/** 
 * Get all active agents from the database
 * Cached per request for performance
 */
export const getAgents = cache(async (): Promise<Agent[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ai_agents")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) {
    logger.error("Error fetching agents:", { error });
    return [];
  }

  const agentsWithStatus = await Promise.all(
    data?.map(async agent => {
      const aiConfig = agent.ai_config as AgentAIConfig | null;
      const uiConfig = agent.ui_config as AgentUIConfig | null;
      const statusSlug = null; // agent.status_id ? await getStatusSlugById(agent.status_id) : null;
      
      return {
        id: agent.id,
        slug: agent.slug,
        name: agent.name,
        description: agent.description,
        model: agent.model,
        provider: agent.provider,
        systemPrompt: agent.system_prompt,
        temperature: aiConfig?.temperature ?? 0.7,
        maxTokens: aiConfig?.max_tokens ?? null,
        maxToolCalls: aiConfig?.max_tool_calls ?? 5,
        tools: agent.tags || [],
        icon: uiConfig?.icon ?? null,
        badge: uiConfig?.badge ?? null,
        status: statusSlug ?? "active",
        isActive: agent.is_active ?? true,
        isSystemAgent: false, // ai_agents table doesn't have this field, default to false
        metadata: agent.metadata,
        createdAt: agent.created_at ?? new Date().toISOString(),
        updatedAt: agent.updated_at ?? new Date().toISOString()
      };
    }) || []
  );
  
  return agentsWithStatus;
});

/**
 * Get a single agent by slug
 */
export const getAgentBySlug = cache(
  async (slug: string): Promise<Agent | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("ai_agents")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      logger.error("Error fetching agent:", { error });
      return null;
    }

    const aiConfig = data.ai_config as AgentAIConfig | null;
    const uiConfig = data.ui_config as AgentUIConfig | null;
    const statusSlug = null; // data.status_id ? await getStatusSlugById(data.status_id) : null;
    
    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
      description: data.description,
      model: data.model,
      provider: data.provider,
      systemPrompt: data.system_prompt,
      temperature: aiConfig?.temperature ?? 0.7,
      maxTokens: aiConfig?.max_tokens ?? null,
      maxToolCalls: aiConfig?.max_tool_calls ?? 5,
      tools: data.tags || [],
      icon: uiConfig?.icon ?? null,
      badge: uiConfig?.badge ?? null,
      status: statusSlug ?? "active",
      isActive: data.is_active ?? true,
      isSystemAgent: false, // ai_agents table doesn't have this field, default to false
      metadata: data.metadata,
      createdAt: data.created_at ?? new Date().toISOString(),
      updatedAt: data.updated_at ?? new Date().toISOString()
    };
  }
);

/**
 * Get an agent with its available tools
 */
export const getAgentWithTools = cache(
  async (agentId: string): Promise<AgentWithTools | null> => {
    const supabase = await createClient();

    // Get agent with its tool relationships
    const { data: agentData, error: agentError } = await supabase
      .from("ai_agents")
      .select(
        `
      *,
      ai_agent_tools!inner(
        tool:ai_tools(*)
      )
    `
      )
      .eq("id", agentId)
      .eq("is_active", true)
      .single();

    if (agentError || !agentData) {
      logger.error("Error fetching agent with tools:", { error: agentError });
      return null;
    }

    const aiConfig = agentData.ai_config as AgentAIConfig | null;
    const uiConfig = agentData.ui_config as AgentUIConfig | null;
    const statusSlug = null; // const statusSlug = agentData.status_id ? await getStatusSlugById(agentData.status_id) : null;
    
    const agent: Agent = {
      id: agentData.id,
      slug: agentData.slug,
      name: agentData.name,
      description: agentData.description,
      model: agentData.model,
      provider: agentData.provider,
      systemPrompt: agentData.system_prompt,
      temperature: aiConfig?.temperature ?? 0.7,
      maxTokens: aiConfig?.max_tokens ?? null,
      maxToolCalls: aiConfig?.max_tool_calls ?? 5,
      tools: agentData.tags || [],
      icon: uiConfig?.icon ?? null,
      badge: uiConfig?.badge ?? null,
      status: statusSlug ?? "active",
      isActive: agentData.is_active ?? true,
      isSystemAgent: false, // ai_agents table doesn't have this field, default to false
      metadata: agentData.metadata,
      createdAt: agentData.created_at ?? new Date().toISOString(),
      updatedAt: agentData.updated_at ?? new Date().toISOString()
    };

    const tools: Tool[] = await Promise.all(
      agentData.ai_agent_tools?.map(async (at: any) => {
        const toolStatusSlug = null; // at.tool.status_id ? await getStatusSlugById(at.tool.status_id) : null;
        return {
          id: at.tool.id,
          slug: at.tool.slug,
          name: at.tool.name,
          description: at.tool.description,
          inputSchema: at.tool.input_schema,
          outputSchema: at.tool.output_schema,
          executionMode: at.tool.execution_mode ?? "server",
          isActive: at.tool.is_active ?? true,
          isSystemTool: false, // ai_tools table doesn't have this field, default to false
          metadata: at.tool.metadata,
          status: toolStatusSlug ?? "active",
          createdAt: at.tool.created_at ?? new Date().toISOString(),
          updatedAt: at.tool.updated_at ?? new Date().toISOString()
        };
      }) || []
    );

    return {
      ...agent,
      availableTools: tools.filter(t => t.isActive && t.status === "active")
    };
  }
);

/**
 * Get agents for a specific tenant
 */
export const getAgentsByTenant = cache(
  async (tenantId: number): Promise<Agent[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("ai_agents")
      .select("*")
      .eq("tenant_id", tenantId)
      .eq("is_active", true)
      .order("name");

    if (error) {
      logger.error("Error fetching tenant agents:", { error: error });
      return [];
    }

    const agentsWithStatus = await Promise.all(
      data?.map(async agent => {
        const aiConfig = agent.ai_config as AgentAIConfig | null;
        const uiConfig = agent.ui_config as AgentUIConfig | null;
        const statusSlug = null; // agent.status_id ? await getStatusSlugById(agent.status_id) : null;
        
        return {
          id: agent.id,
          slug: agent.slug,
          name: agent.name,
          description: agent.description,
          model: agent.model,
          provider: agent.provider,
          systemPrompt: agent.system_prompt,
          temperature: aiConfig?.temperature ?? 0.7,
          maxTokens: aiConfig?.max_tokens ?? null,
          maxToolCalls: aiConfig?.max_tool_calls ?? 5,
          tools: agent.tags || [],
          icon: uiConfig?.icon ?? null,
          badge: uiConfig?.badge ?? null,
          status: statusSlug ?? "active",
          isActive: agent.is_active ?? true,
          isSystemAgent: false, // ai_agents table doesn't have this field, default to false
          metadata: agent.metadata,
          createdAt: agent.created_at ?? new Date().toISOString(),
          updatedAt: agent.updated_at ?? new Date().toISOString()
        };
      }) || []
    );
    
    return agentsWithStatus;
  }
);

/**
 * Update an agent's configuration
 * Admin only - requires proper RLS policies
 */
export async function updateAgent(
  agentId: string,
  updates: Partial<{
    name: string;
    description: string;
    model: string;
    provider: string;
    system_prompt: string;
    temperature: number;
    max_tokens: number;
    max_tool_calls: number;
    tags: string[];
    icon: string;
    badge: string;
    status_id: number;
    is_active: boolean;
    metadata: any;
  }>
): Promise<Agent | null> {
  const supabase = await createClient();

  // Prepare database updates
  const dbUpdates: any = {};
  
  // Direct fields
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.description !== undefined) dbUpdates.description = updates.description;
  if (updates.model !== undefined) dbUpdates.model = updates.model;
  if (updates.provider !== undefined) dbUpdates.provider = updates.provider;
  if (updates.system_prompt !== undefined) dbUpdates.system_prompt = updates.system_prompt;
  if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
  if (updates.status_id !== undefined) dbUpdates.status_id = updates.status_id;
  if (updates.is_active !== undefined) dbUpdates.is_active = updates.is_active;
  if (updates.metadata !== undefined) dbUpdates.metadata = updates.metadata;
  
  // AI config fields
  if (updates.temperature !== undefined || updates.max_tokens !== undefined || updates.max_tool_calls !== undefined) {
    dbUpdates.ai_config = {
      temperature: updates.temperature,
      max_tokens: updates.max_tokens,
      max_tool_calls: updates.max_tool_calls
    };
  }
  
  // UI config fields
  if (updates.icon !== undefined || updates.badge !== undefined) {
    dbUpdates.ui_config = {
      icon: updates.icon,
      badge: updates.badge
    };
  }

  const { data, error } = await supabase
    .from("ai_agents")
    .update(dbUpdates)
    .eq("id", agentId)
    .select()
    .single();

  if (error) {
    logger.error("Error updating agent:", { error: error });
    return null;
  }

  const aiConfig = data.ai_config as AgentAIConfig | null;
  const uiConfig = data.ui_config as AgentUIConfig | null;
  const statusSlug = null; // const statusSlug = data.status_id ? await getStatusSlugById(data.status_id) : null;

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    description: data.description,
    model: data.model,
    provider: data.provider,
    systemPrompt: data.system_prompt,
    temperature: aiConfig?.temperature ?? 0.7,
    maxTokens: aiConfig?.max_tokens ?? null,
    maxToolCalls: aiConfig?.max_tool_calls ?? 5,
    tools: data.tags || [],
    icon: uiConfig?.icon ?? null,
    badge: uiConfig?.badge ?? null,
    status: statusSlug ?? "active",
    isActive: data.is_active ?? true,
    isSystemAgent: false, // ai_agents table doesn't have this field, default to false
    metadata: data.metadata,
    createdAt: data.created_at ?? new Date().toISOString(),
    updatedAt: data.updated_at ?? new Date().toISOString()
  };
}

/**
 * Create a new agent
 * Admin only - requires proper RLS policies
 */
export async function createAgent(agent: {
  slug: string;
  name: string;
  description?: string;
  model: string;
  provider: string;
  system_prompt?: string;
  temperature?: number;
  max_tokens?: number;
  max_tool_calls?: number;
  tags?: string[];
  icon?: string;
  badge?: string;
  metadata?: any;
  tenant_id?: number;
  status_id?: number;
}): Promise<Agent | null> {
  const supabase = await createClient();

  // Map agent fields to database columns
  const dbAgent: any = {
    slug: agent.slug,
    name: agent.name,
    description: agent.description,
    model: agent.model,
    provider: agent.provider,
    system_prompt: agent.system_prompt,
    tags: agent.tags,
    metadata: agent.metadata,
    tenant_id: agent.tenant_id,
    status_id: agent.status_id,
    is_active: true
  };
  
  // Build ai_config object
  if (agent.temperature !== undefined || agent.max_tokens !== undefined || agent.max_tool_calls !== undefined) {
    dbAgent.ai_config = {
      temperature: agent.temperature ?? 0.7,
      max_tokens: agent.max_tokens ?? null,
      max_tool_calls: agent.max_tool_calls ?? 5
    };
  }
  
  // Build ui_config object
  if (agent.icon !== undefined || agent.badge !== undefined) {
    dbAgent.ui_config = {
      icon: agent.icon ?? null,
      badge: agent.badge ?? null
    };
  }

  const { data, error } = await supabase
    .from("ai_agents")
    .insert(dbAgent)
    .select()
    .single();

  if (error) {
    logger.error("Error creating agent:", { error: error });
    return null;
  }

  const aiConfig = data.ai_config as AgentAIConfig | null;
  const uiConfig = data.ui_config as AgentUIConfig | null;
  const statusSlug = null; // const statusSlug = data.status_id ? await getStatusSlugById(data.status_id) : null;

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    description: data.description,
    model: data.model,
    provider: data.provider,
    systemPrompt: data.system_prompt,
    temperature: aiConfig?.temperature ?? 0.7,
    maxTokens: aiConfig?.max_tokens ?? null,
    maxToolCalls: aiConfig?.max_tool_calls ?? 5,
    tools: data.tags || [],
    icon: uiConfig?.icon ?? null,
    badge: uiConfig?.badge ?? null,
    status: statusSlug ?? "active",
    isActive: data.is_active ?? true,
    isSystemAgent: false, // ai_agents table doesn't have this field, default to false
    metadata: data.metadata,
    createdAt: data.created_at ?? new Date().toISOString(),
    updatedAt: data.updated_at ?? new Date().toISOString()
  };
}
