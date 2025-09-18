/**
 * Registry Loader - Unified loading mechanism for agents and tools
 *
 * This module handles the proper loading sequence:
 * 1. Load code-defined agents/tools first (source of truth for structure)
 * 2. Load database overrides (runtime configuration)
 * 3. Merge appropriately (DB values override specific fields)
 * 4. Support database-only dynamic agents/tools
 */

import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@/utils/supabase/server";
import { logger } from "@/lib/logger";
import type { AgentConfig } from "@/features/agents/registry";
import type { ToolDefinition } from "@/features/tools/types";

// ============================================
// TYPES
// ============================================

export interface LoaderOptions {
  tenantId?: number;
  includeInactive?: boolean;
  forceRefresh?: boolean;
}

export interface MergedAgent extends AgentConfig {
  dbOverrides?: Partial<AgentConfig>;
  source: "code" | "database" | "merged";
}

export interface MergedTool extends ToolDefinition {
  dbOverrides?: Partial<ToolDefinition>;
  source: "code" | "database" | "merged";
}

// ============================================
// LOADER FUNCTIONS
// ============================================

/**
 * Load and merge agents from code and database
 * Database values override: temperature, maxOutputTokens, systemPrompt, tools, isActive
 */
export async function loadMergedAgents(
  codeAgents: Map<string, AgentConfig>,
  options: LoaderOptions = {}
): Promise<Map<string, MergedAgent>> {
  const merged = new Map<string, MergedAgent>();
  const supabase = await createClient();

  // First, add all code-defined agents
  for (const [id, agent] of Array.from(codeAgents.entries())) {
    merged.set(id, {
      ...agent,
      source: "code"
    });
  }

  // Load database agents
  let query = supabase.from("ai_agents").select(`
      *,
      ai_agent_tools(
        tool_id,
        ai_tools(slug)
      )
    `);

  if (!options.includeInactive) {
    query = query.eq("is_active", true);
  }

  if (options.tenantId) {
    query = query.or(
      `tenant_id.eq.${options.tenantId},tenant_id.is.null,is_system_agent.eq.true`
    );
  }

  const { data: dbAgents, error } = await query;

  if (error) {
    logger.error("Failed to load agents from database", { error });
    return merged;
  }

  if (!dbAgents) {
    return merged;
  }

  // Process each database agent
  for (const dbAgent of dbAgents as any[]) {
    const existingAgent = Array.from(merged.values()).find(
      a => a.slug === dbAgent.slug
    );

    // Extract tool slugs from joined data
    const toolSlugs =
      dbAgent.ai_agent_tools
        ?.map((at: any) => at.ai_tools?.slug)
        .filter(Boolean) || [];

    const dbConfig: Partial<AgentConfig> = {
      id: dbAgent.id,
      name: dbAgent.name,
      description: dbAgent.description || undefined,
      temperature: dbAgent.ai_config?.temperature ?? undefined,
      maxOutputTokens: dbAgent.ai_config?.max_tokens || undefined,
      systemPrompt: dbAgent.system_prompt || undefined,
      tools: toolSlugs,
      maxSteps: dbAgent.ai_config?.max_tool_calls || undefined,
      isActive: dbAgent.is_active ?? undefined,
      icon: dbAgent.ui_config?.icon || undefined,
      metadata: (dbAgent.metadata as Record<string, any>) || undefined
    };

    if (existingAgent) {
      // Merge database overrides with code-defined agent
      const mergedAgent: MergedAgent = {
        ...existingAgent,
        // Override specific fields with database values
        temperature: dbConfig.temperature ?? existingAgent.temperature,
        maxOutputTokens:
          dbConfig.maxOutputTokens ?? existingAgent.maxOutputTokens,
        systemPrompt: dbConfig.systemPrompt ?? existingAgent.systemPrompt,
        tools: toolSlugs.length > 0 ? toolSlugs : existingAgent.tools,
        isActive: dbConfig.isActive ?? existingAgent.isActive,
        metadata: { ...existingAgent.metadata, ...dbConfig.metadata },
        dbOverrides: dbConfig,
        source: "merged"
      };
      merged.set(mergedAgent.id, mergedAgent);
    } else {
      // Database-only agent
      const dbOnlyAgent: MergedAgent = {
        id: dbAgent.id,
        slug: dbAgent.slug,
        name: dbAgent.name,
        description: dbAgent.description || undefined,
        category: (dbAgent.badge as any) || "custom",
        model: dbAgent.model,
        temperature: dbAgent.temperature ?? undefined,
        maxOutputTokens: dbAgent.max_tokens || undefined,
        tools: toolSlugs,
        systemPrompt: dbAgent.system_prompt || undefined,
        maxSteps: dbAgent.max_tool_calls || undefined,
        isActive: dbAgent.is_active ?? undefined,
        tenantId: dbAgent.tenant_id || undefined,
        icon: dbAgent.icon || undefined,
        metadata: (dbAgent.metadata as Record<string, any>) || undefined,
        source: "database"
      };
      merged.set(dbOnlyAgent.id, dbOnlyAgent);
    }
  }

  return merged;
}

/**
 * Load and merge tools from code and database
 * Database values override: metadata, isActive
 */
export async function loadMergedTools(
  codeTools: Map<string, ToolDefinition>,
  options: LoaderOptions = {}
): Promise<Map<string, MergedTool>> {
  const merged = new Map<string, MergedTool>();
  const supabase = await createClient();

  // First, add all code-defined tools
  for (const [slug, tool] of Array.from(codeTools.entries())) {
    merged.set(slug, {
      ...tool,
      source: "code"
    } as MergedTool);
  }

  // Load database tools
  let query = supabase.from("ai_tools").select("*");

  if (!options.includeInactive) {
    query = query.eq("is_active", true);
  }

  const { data: dbTools, error } = await query;

  if (error) {
    logger.error("Failed to load tools from database", { error });
    return merged;
  }

  if (!dbTools) {
    return merged;
  }

  // Process each database tool
  for (const dbTool of dbTools) {
    const existingTool = merged.get(dbTool.slug);

    if (existingTool) {
      // Merge database overrides with code-defined tool
      const mergedTool: MergedTool = {
        ...existingTool,
        id: dbTool.id,
        metadata: {
          ...(existingTool.metadata || {}),
          ...((dbTool.metadata as Record<string, any>) || {})
        },
        dbOverrides: {
          metadata: (dbTool.metadata as Record<string, any>) || undefined
        },
        source: "merged"
      };
      merged.set(dbTool.slug, mergedTool);
    } else {
      // Database-only tool (dynamic tool)
      const dbOnlyTool: MergedTool = {
        id: dbTool.id,
        slug: dbTool.slug,
        name: dbTool.name,
        description: dbTool.description || "",
        category: (dbTool.metadata as any)?.category || "utility",
        inputSchema: (dbTool.input_schema as Record<string, any>) || {},
        outputSchema: (dbTool.output_schema as Record<string, any>) || {},
        executionMode:
          (dbTool.execution_mode as "server" | "client" | "interactive") ||
          "server",
        metadata: (dbTool.metadata as Record<string, any>) || undefined,
        // Dynamic executor placeholder
        execute: async (input: any, context?: any) => {
          // This would need custom implementation based on tool type
          // Could potentially execute serverless functions, APIs, etc.
          logger.info(`Executing dynamic tool: ${dbTool.slug}`, { input });
          return {
            success: true,
            message: `Dynamic tool ${dbTool.slug} executed`,
            input
          };
        },
        source: "database"
      };
      merged.set(dbTool.slug, dbOnlyTool);
    }
  }

  return merged;
}

/**
 * Initialize both registries with proper merging
 */
export async function initializeRegistries(options: LoaderOptions = {}) {
  const { agentRegistry } = await import("@/features/agents/registry");
  const { sprinterToolRegistry: toolRegistry } = await import("@/features/tools/registry");

  // Step 1: Initialize with code-defined items only
  await agentRegistry.initialize({ loadFromDatabase: false });
  await toolRegistry.initialize({ loadFromDatabase: false });

  // Step 2: Get code-defined items
  const codeAgents = new Map(
    agentRegistry.getAllAgents().map((a: any) => [a.id, a])
  );
  const codeTools = new Map(
    toolRegistry.getAvailableTools().map((slug: string) => [slug, { slug }])
  );

  // Step 3: Load and merge with database
  const mergedAgents = await loadMergedAgents(codeAgents, options);
  const mergedTools = await loadMergedTools(codeTools as any, options);

  // Step 4: Update registries with merged data
  // Clear and re-register to ensure clean state
  // agentRegistry.clear(); // Method not implemented
  // toolRegistry.clear(); // Method not implemented

  for (const agent of Array.from(mergedAgents.values())) {
    agentRegistry.register(agent);
  }

  // Tool registration needs to be adapted for the new registry API
  // for (const tool of Array.from(mergedTools.values())) {
  //   toolRegistry.register(tool);
  // }

  logger.info("Registries initialized", {
    agents: mergedAgents.size,
    tools: mergedTools.size,
    tenantId: options.tenantId
  });

  return {
    agents: mergedAgents,
    tools: mergedTools
  };
}

/**
 * Sync tools from code to database
 */
export async function syncToolsToDatabase(): Promise<void> {
  // Tool sync not implemented for new registry
  logger.info("Tool sync to database not yet implemented");
  return;

  // const { sprinterToolRegistry: toolRegistry } = await import("@/features/tools/registry");
  // await toolRegistry.initialize();

  // const tools = toolRegistry.getAvailableTools();
  // const supabase = await createAdminClient();

  // logger.info(`Syncing ${tools.length} tools to database`);

  /* for (const tool of tools) {
    try {
      // Serialize schemas to JSON (basic representation)
      const inputSchema = tool.inputSchema
        ? { type: "object", properties: {} }
        : null;
      const outputSchema = tool.outputSchema
        ? { type: "object", properties: {} }
        : null;

      const { error } = await supabase.from("ai_tools").upsert(
        {
          slug: tool.slug,
          name: tool.name,
          description: tool.description,
          category: tool.category,
          execution_mode: tool.executionMode,
          ai_enabled: tool.isActive ?? true,
          input_schema: inputSchema,
          output_schema: outputSchema,
          metadata: {
            active: tool.metadata?.active ?? tool.isActive ?? true,
            version: tool.version,
            owner: tool.metadata?.owner,
            permissions: tool.permissions,
            tags: tool.metadata?.tags,
            suggestedPrompts: tool.metadata?.suggestedPrompts
          }
        },
        {
          onConflict: "slug"
        }
      );

      if (error) {
        logger.error(`Failed to sync tool ${tool.slug}:`, error);
      }
    } catch (error) {
      logger.error(`Error syncing tool ${tool.slug}:`, { error });
    }
  }

  logger.info("Tool sync complete"); */
}

/**
 * Delete deprecated tools from database
 */
export async function deleteDeprecatedTools(): Promise<void> {
  const deprecatedSlugs = [
    "fannie-guide-search",
    "freddie-guide-search",
    "agency-guidelines",
    "fannie-mae-search",
    "fannie-mae-web-search",
    "freddie-mac-web-search",
    "marketplace-search",
    "single-lender-search",
    "single-program-search",
    "scenario-search",
    "compare-programs",
    "lender-search",
    "guidelines-search",
    "document-search",
    "retrieveProgramDocumentsTool"
  ];

  const supabase = await createAdminClient();

  const { error } = await supabase
    .from("ai_tools")
    .delete()
    .in("slug", deprecatedSlugs);

  if (error) {
    logger.error("Failed to delete deprecated tools:", { error });
  } else {
    logger.info(`Deleted ${deprecatedSlugs.length} deprecated tools`);
  }
}
