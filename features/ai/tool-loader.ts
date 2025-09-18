/**
 * Tool Loader - Loads AI tools from database
 * Part of AI Sprinter Stage 6 implementation
 */

import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  inputSchema: any;
  outputSchema: any;
  executionMode: 'server' | 'client' | 'interactive';
  isActive: boolean;
  isSystemTool: boolean;
  metadata: any;
  status: string;
  category?: string;
  tenantId?: number | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all active tools from the database
 * Cached per request for performance
 */
export const getTools = cache(async (): Promise<Tool[]> => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching tools:', error);
    return [];
  }

  return data?.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    inputSchema: tool.input_schema,
    outputSchema: tool.output_schema,
    executionMode: tool.execution_mode as 'server' | 'client' | 'interactive',
    isActive: tool.is_active ?? true,
    isSystemTool: false, // is_system_tool doesn't exist in schema
    metadata: tool.metadata,
    status: 'active', // status doesn't exist in schema
    category: tool.category ?? undefined, // convert null to undefined
    tenantId: null, // tenant_id doesn't exist in schema
    createdAt: tool.created_at ?? new Date().toISOString(),
    updatedAt: tool.updated_at ?? new Date().toISOString(),
  })) || [];
});

/**
 * Get tools by category
 */
export const getToolsByCategory = cache(async (category: string): Promise<Tool[]> => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .eq('is_active', true)
    .contains('metadata', { category })
    .order('name');

  if (error) {
    console.error('Error fetching tools by category:', error);
    return [];
  }

  return data?.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    inputSchema: tool.input_schema,
    outputSchema: tool.output_schema,
    executionMode: tool.execution_mode as 'server' | 'client' | 'interactive',
    isActive: tool.is_active ?? true,
    isSystemTool: false, // is_system_tool doesn't exist in schema
    metadata: tool.metadata,
    status: 'active', // status doesn't exist in schema
    category: tool.category ?? undefined, // convert null to undefined
    tenantId: null, // tenant_id doesn't exist in schema
    createdAt: tool.created_at ?? new Date().toISOString(),
    updatedAt: tool.updated_at ?? new Date().toISOString(),
  })) || [];
});

/**
 * Get a single tool by slug
 */
export const getToolBySlug = cache(async (slug: string): Promise<Tool | null> => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    console.error('Error fetching tool:', error);
    return null;
  }

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    description: data.description,
    inputSchema: data.input_schema,
    outputSchema: data.output_schema,
    executionMode: data.execution_mode as 'server' | 'client' | 'interactive',
    isActive: data.is_active ?? true,
    isSystemTool: false, // is_system_tool doesn't exist in schema
    metadata: data.metadata,
    status: 'active', // status doesn't exist in schema
    category: data.category ?? undefined, // convert null to undefined
    tenantId: null, // tenant_id doesn't exist in schema
    createdAt: data.created_at ?? new Date().toISOString(),
    updatedAt: data.updated_at ?? new Date().toISOString(),
  };
});

/**
 * Get tools for specific agent
 */
export const getToolsForAgent = cache(async (agentId: string): Promise<Tool[]> => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('ai_agent_tools')
    .select(`
      tool:ai_tools(*)
    `)
    .eq('agent_id', agentId) as any;

  if (error) {
    console.error('Error fetching tools for agent:', error);
    return [];
  }

  return data?.filter((at: any) => at.tool).map((at: any) => ({
    id: at.tool!.id,
    slug: at.tool!.slug,
    name: at.tool!.name,
    description: at.tool!.description,
    inputSchema: at.tool!.input_schema,
    outputSchema: at.tool!.output_schema,
    executionMode: at.tool!.execution_mode as 'server' | 'client' | 'interactive',
    isActive: at.tool!.is_active ?? true,
    isSystemTool: false, // is_system_tool doesn't exist in schema
    metadata: at.tool!.metadata,
    status: 'active', // status doesn't exist in schema
    category: at.tool!.category ?? undefined, // convert null to undefined
    tenantId: null, // tenant_id doesn't exist in schema
    createdAt: at.tool!.created_at ?? new Date().toISOString(),
    updatedAt: at.tool!.updated_at ?? new Date().toISOString(),
  })).filter((t: any) => t.isActive) || [];
});

/**
 * Get tools for a specific tenant
 */
export const getToolsByTenant = cache(async (tenantId: number): Promise<Tool[]> => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    // tenant_id doesn't exist in ai_tools schema, returning all active tools
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching tenant tools:', error);
    return [];
  }

  return data?.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    inputSchema: tool.input_schema,
    outputSchema: tool.output_schema,
    executionMode: tool.execution_mode as 'server' | 'client' | 'interactive',
    isActive: tool.is_active ?? true,
    isSystemTool: false, // is_system_tool doesn't exist in schema
    metadata: tool.metadata,
    status: 'active', // status doesn't exist in schema
    category: tool.category ?? undefined, // convert null to undefined
    tenantId: null, // tenant_id doesn't exist in schema
    createdAt: tool.created_at ?? new Date().toISOString(),
    updatedAt: tool.updated_at ?? new Date().toISOString(),
  })) || [];
});

/**
 * Update a tool's configuration
 * Admin only - requires proper RLS policies
 */
export async function updateTool(
  toolId: string,
  updates: Partial<{
    name: string;
    description: string;
    input_schema: any;
    output_schema: any;
    execution_mode: string;
    metadata: any;
    is_active: boolean;
    status: string;
  }>
): Promise<Tool | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('ai_tools')
    .update(updates)
    .eq('id', toolId)
    .select()
    .single();

  if (error) {
    console.error('Error updating tool:', error);
    return null;
  }

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    description: data.description,
    inputSchema: data.input_schema,
    outputSchema: data.output_schema,
    executionMode: data.execution_mode as 'server' | 'client' | 'interactive',
    isActive: data.is_active ?? true,
    isSystemTool: false, // is_system_tool doesn't exist in schema
    metadata: data.metadata,
    status: 'active', // status doesn't exist in schema
    category: data.category ?? undefined, // convert null to undefined
    tenantId: null, // tenant_id doesn't exist in schema
    createdAt: data.created_at ?? new Date().toISOString(),
    updatedAt: data.updated_at ?? new Date().toISOString(),
  };
}

/**
 * Create a new tool
 * Admin only - requires proper RLS policies
 */
export async function createTool(
  tool: {
    slug: string;
    name: string;
    description?: string;
    input_schema?: any;
    output_schema?: any;
    execution_mode?: 'server' | 'client' | 'interactive';
    metadata?: any;
    tenant_id?: number;
  }
): Promise<Tool | null> {
  const supabase = await createClient();
  
  // Map to database columns (remove fields that don't exist)
  const dbTool = {
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    input_schema: tool.input_schema || {},
    output_schema: tool.output_schema || {},
    execution_mode: tool.execution_mode,
    metadata: tool.metadata,
    is_active: true,
    // tenant_id, status, and is_system_tool don't exist in schema
  };
  
  const { data, error } = await supabase
    .from('ai_tools')
    .insert(dbTool)
    .select()
    .single();

  if (error) {
    console.error('Error creating tool:', error);
    return null;
  }

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    description: data.description,
    inputSchema: data.input_schema,
    outputSchema: data.output_schema,
    executionMode: data.execution_mode as 'server' | 'client' | 'interactive',
    isActive: data.is_active ?? true,
    isSystemTool: false, // is_system_tool doesn't exist in schema
    metadata: data.metadata,
    status: 'active', // status doesn't exist in schema
    category: data.category ?? undefined, // convert null to undefined
    tenantId: null, // tenant_id doesn't exist in schema
    createdAt: data.created_at ?? new Date().toISOString(),
    updatedAt: data.updated_at ?? new Date().toISOString(),
  };
}

/**
 * Assign tools to an agent
 * Admin only - requires proper RLS policies
 */
export async function assignToolsToAgent(
  agentId: string,
  toolIds: string[]
): Promise<boolean> {
  const supabase = await createClient();
  
  // First, remove existing tool assignments
  const { error: deleteError } = await supabase
    .from('ai_agent_tools')
    .delete()
    .eq('agent_id', agentId);

  if (deleteError) {
    console.error('Error removing existing tool assignments:', deleteError);
    return false;
  }

  // Then add new assignments
  if (toolIds.length > 0) {
    const assignments = toolIds.map(toolId => ({
      agent_id: agentId,
      tool_id: toolId,
    }));

    const { error: insertError } = await supabase
      .from('ai_agent_tools')
      .insert(assignments);

    if (insertError) {
      console.error('Error assigning tools to agent:', insertError);
      return false;
    }
  }

  return true;
}