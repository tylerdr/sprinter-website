/**
 * Tool Loader for AI SDK Integration
 * Provides utilities for loading and preparing tools for AI agents
 */

import { tool as createAITool } from "ai";
import { z, ZodSchema } from "zod";
import { logger } from "@/lib/logger";
import { sprinterToolRegistry as toolRegistry } from "./registry";
import type { ToolDefinition, ToolContext } from "./types";
import type { ToolCategory } from "./constants/categories";

/**
 * Sanitize tool key for AI SDK compatibility
 * Ensures keys are valid JavaScript identifiers
 */
export function sanitizeToolKey(key: string): string {
  // Replace hyphens and other non-alphanumeric chars with underscores
  // Ensure it starts with a letter or underscore
  let sanitized = key.replace(/[^a-zA-Z0-9_]/g, "_");

  // If it starts with a number, prepend an underscore
  if (/^\d/.test(sanitized)) {
    sanitized = `_${sanitized}`;
  }

  return sanitized;
}

/**
 * Build a toolset for an AI agent
 * Loads and prepares tools based on agent configuration
 */
export async function buildToolsetForAgent(options: {
  toolSlugs?: string[];
  includeAll?: boolean;
  category?: ToolCategory;
  tenantId?: number;
}): Promise<Record<string, any>> {
  const { toolSlugs, includeAll, category, tenantId } = options;

  // Initialize registry if needed
  await toolRegistry.initialize({
    loadFromDatabase: true,
    tenantId
  });

  const toolset: Record<string, any> = {};

  // Get tools based on options
  let tools: ToolDefinition[] = [];

  if (includeAll) {
    tools = toolRegistry.getActiveTools();
  } else if (category) {
    tools = toolRegistry.getActiveToolsByCategory(category);
  } else if (toolSlugs) {
    tools = toolSlugs
      .map(slug => toolRegistry.getTool(slug))
      .filter((tool): tool is ToolDefinition =>
        tool !== undefined && tool.isActive !== false
      );
  }

  // Convert tools to AI SDK format
  for (const tool of tools) {
    const sanitizedKey = sanitizeToolKey(tool.slug);
    const aiTool = await createAIToolFromDefinition(tool);
    if (aiTool) {
      toolset[sanitizedKey] = aiTool;
    }
  }

  logger.info(`Built toolset with ${Object.keys(toolset).length} tools for agent`);
  return toolset;
}

/**
 * Create an AI SDK tool from our tool definition
 */
export async function createAIToolFromDefinition(
  definition: ToolDefinition
): Promise<any> {
  try {
    // Skip client-only and interactive tools
    if (definition.executionMode === "client" ||
        definition.executionMode === "interactive") {
      logger.debug(`Skipping ${definition.executionMode} tool: ${definition.slug}`);
      return null;
    }

    // Skip disabled tools
    if (definition.isActive === false) {
      logger.debug(`Skipping disabled tool: ${definition.slug}`);
      return null;
    }

    const toolConfig: any = {
      description: definition.description || `Tool: ${definition.slug}`,
      execute: async (input: any) => {
        try {
          // Execute through the registry
          const result = await toolRegistry.execute(definition.slug, input);

          // Return data on success, error object on failure
          if (result.success) {
            return result.data;
          } else {
            return {
              error: result.error || "Tool execution failed",
              success: false
            };
          }
        } catch (error) {
          logger.error(`Tool execution error for ${definition.slug}:`, {
            error: error instanceof Error ? error.message : String(error)
          });
          return {
            error: error instanceof Error ? error.message : "Unknown error",
            success: false
          };
        }
      }
    };

    // Handle input schema
    toolConfig.inputSchema = resolveInputSchema(definition.inputSchema);

    return createAITool(toolConfig);
  } catch (error) {
    logger.error(`Failed to create AI tool for ${definition.slug}:`, {
      error: error instanceof Error ? error.message : String(error)
    });
    return null;
  }
}

/**
 * Resolve input schema to Zod format
 */
function resolveInputSchema(
  schema?: ZodSchema | Record<string, any>
): ZodSchema {
  if (!schema) {
    // No schema provided, use empty object
    return z.object({});
  }

  if (typeof schema === "object" && "parse" in schema) {
    // Already a Zod schema
    return schema as ZodSchema;
  }

  if (typeof schema === "object") {
    // JSON Schema from database - convert to permissive schema
    // TODO: Implement proper JSON Schema to Zod conversion
    logger.debug("Using permissive schema for JSON Schema input");
    return z.any();
  }

  // Fallback to empty object
  return z.object({});
}

/**
 * Load a specific tool by slug
 */
export async function loadTool(
  slug: string,
  tenantId?: number
): Promise<ToolDefinition | null> {
  await toolRegistry.initialize({
    loadFromDatabase: true,
    tenantId
  });

  const tool = toolRegistry.getTool(slug);
  if (!tool) {
    logger.warn(`Tool not found: ${slug}`);
    return null;
  }

  if (tool.isActive === false) {
    logger.warn(`Tool is disabled: ${slug}`);
    return null;
  }

  return tool;
}

/**
 * Execute a tool with context
 */
export async function executeTool(
  slug: string,
  input: any,
  context?: ToolContext
) {
  return toolRegistry.execute(slug, input, context);
}

/**
 * Get all available tool slugs
 */
export async function getAvailableToolSlugs(
  options?: {
    category?: ToolCategory;
    tenantId?: number;
  }
): Promise<string[]> {
  await toolRegistry.initialize({
    loadFromDatabase: true,
    tenantId: options?.tenantId
  });

  let tools: ToolDefinition[];

  if (options?.category) {
    tools = toolRegistry.getActiveToolsByCategory(options.category);
  } else {
    tools = toolRegistry.getActiveTools();
  }

  return tools.map(t => t.slug);
}

/**
 * Batch load multiple tools
 */
export async function loadTools(
  slugs: string[],
  tenantId?: number
): Promise<Map<string, ToolDefinition>> {
  await toolRegistry.initialize({
    loadFromDatabase: true,
    tenantId
  });

  const tools = new Map<string, ToolDefinition>();

  for (const slug of slugs) {
    const tool = toolRegistry.getTool(slug);
    if (tool && tool.isActive !== false) {
      tools.set(slug, tool);
    }
  }

  return tools;
}

/**
 * Get tools grouped by category
 */
export async function getToolsByCategory(
  tenantId?: number
): Promise<Map<string, ToolDefinition[]>> {
  await toolRegistry.initialize({
    loadFromDatabase: true,
    tenantId
  });

  const toolsByCategory = new Map<string, ToolDefinition[]>();
  const categories: ToolCategory[] = [
    "calculator",
    "search",
    "guidelines",
    "eligibility",
    "analysis",
    "document",
    "content",
    "comparison",
    "optimization",
    "property",
    "data",
    "communications",
    "relationships",
    "accounts",
    "marketing",
    "growth",
    "programs",
    "workflow",
    "utility",
    "other"
  ];

  for (const category of categories) {
    const tools = toolRegistry.getActiveToolsByCategory(category);
    if (tools.length > 0) {
      toolsByCategory.set(category, tools);
    }
  }

  return toolsByCategory;
}