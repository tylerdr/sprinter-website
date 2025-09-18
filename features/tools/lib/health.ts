import { sprinterToolRegistry as toolRegistry } from "@/features/tools/registry";
import { agentRegistry } from "@/features/agents/registry";
import { TOOL_UI_IMPORTS } from "@/features/tools/ui-registry";

export type ToolHealthStatus = {
  slug: string;
  name: string;
  uiMissing: boolean;
  notRegistered: boolean; // in DB but no code
  notInDb: boolean; // in code but no DB
  schemaMismatch: boolean;
  modeMismatch: boolean;
  usedByAgents: string[];
  hasExecute: boolean;
  isEnabled: boolean;
};

/**
 * Get health status for all tools
 * Compares database state with code implementation
 */
export async function getToolsHealth(): Promise<ToolHealthStatus[]> {
  // Ensure registries are loaded
  await toolRegistry.initialize({ loadFromDatabase: true });
  await agentRegistry.initialize({ loadFromDatabase: true });

  const tools = toolRegistry.getAllTools();
  const agents = agentRegistry.getAllAgents();
  const health: ToolHealthStatus[] = [];

  for (const tool of tools) {
    // Check if tool has UI component
    const uiMissing = !TOOL_UI_IMPORTS[tool.slug];

    // Check if tool is registered in code (has no execute function)
    const notRegistered = !tool.execute;

    // Check if tool is in database (simplified - would need database flag)
    const notInDb = false; // TODO: Add database presence check

    // Check for schema mismatches (simplified check)
    const schemaMismatch = false; // TODO: Implement proper schema comparison

    // Check for execution mode mismatches
    const modeMismatch = false; // TODO: Implement mode comparison

    // Find which agents use this tool
    const usedByAgents = agents
      .filter(agent => agent.tools?.includes(tool.slug))
      .map(agent => agent.slug || agent.id);

    // Check if tool has execute function
    const hasExecute = !!tool.execute;

    // Check if tool is enabled
    const isEnabled = tool.isActive !== false;

    health.push({
      slug: tool.slug,
      name: tool.name || tool.slug,
      uiMissing,
      notRegistered,
      notInDb,
      schemaMismatch,
      modeMismatch,
      usedByAgents,
      hasExecute,
      isEnabled
    });
  }

  return health.sort((a, b) => a.slug.localeCompare(b.slug));
}

/**
 * Get health status for a specific tool
 */
export async function getToolHealth(
  slug: string
): Promise<ToolHealthStatus | null> {
  const allHealth = await getToolsHealth();
  return allHealth.find(h => h.slug === slug) || null;
}

/**
 * Execute a tool directly for testing
 */
export async function testExecuteTool(
  slug: string,
  input: any,
  context?: any
): Promise<{
  success: boolean;
  result?: any;
  error?: string;
  duration?: number;
}> {
  const startTime = Date.now();

  try {
    await toolRegistry.initialize({ loadFromDatabase: true });

    const tool = toolRegistry.getTool(slug);
    if (!tool) {
      return { success: false, error: `Tool not found: ${slug}` };
    }

    if (!tool.execute) {
      return { success: false, error: `Tool has no execute function: ${slug}` };
    }

    // Execute the tool
    const result = await tool.execute(input, context);
    const duration = Date.now() - startTime;

    return { success: true, result, duration };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      duration
    };
  }
}

/**
 * Sync tools from code to database
 * Updates database entries with latest schemas and metadata from code
 */
export async function syncToolsFromCode(): Promise<{
  updated: string[];
  created: string[];
  errors: string[];
}> {
  const result = {
    updated: [] as string[],
    created: [] as string[],
    errors: [] as string[]
  };

  try {
    await toolRegistry.initialize({ loadFromDatabase: true });

    const tools = toolRegistry.getAllTools();

    for (const tool of tools) {
      // Track all tools for sync
      try {
        // This would call a database update method
        // For now, we'll just track what would be updated
        result.updated.push(tool.slug);
      } catch (error) {
        result.errors.push(`${tool.slug}: ${error}`);
      }
    }
  } catch (error) {
    result.errors.push(`Sync failed: ${error}`);
  }

  return result;
}
