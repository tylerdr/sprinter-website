/**
 * Tool Registry with Lazy Loading
 * Maps tool slugs to dynamic imports
 */

import type { ToolSpec } from "./types";
import { z, ZodSchema } from "zod";
import { tool as createAITool } from "ai";
import { logger } from "@/lib/logger";

/**
 * Server-side Tool Registry - For use in server components and API routes only
 * For client components, use tools-client.ts and ToolsContext
 */

/**
 * Lazy import map for all tools
 * Each tool is imported only when needed
 */
export const TOOL_IMPORTS: Record<
  string,
  () => Promise<{ tool: ToolSpec<any, any> }>
> = {
  // Content Generation Tools
  "blog-generator": () =>
    import("./toolset/content/blog-generator/tool").then(m => ({
      tool: m.default
    })),
  "social-post-generator": () =>
    import("./toolset/content/social-post-generator/tool").then(m => ({
      tool: m.default
    })),

  // Utility Tools
  "ai-image-generator": () =>
    import("./toolset/utility/ai-image-generator/tool").then(m => ({
      tool: m.default
    })),
  "contact-capture": () =>
    import("./toolset/utility/contact-capture/tool").then(m => ({
      tool: m.default
    })),
  "delegate-agent": () =>
    import("./toolset/utility/delegate-agent/tool").then(m => ({
      tool: m.default
    })),

  // Calculator Tools
  "roi-calculator": () =>
    import("./toolset/calculators/roi-calculator/tool").then(m => ({
      tool: m.default
    })),

  // Communications Tools
  "email-drafter": () =>
    import("./toolset/communications/email-drafter/tool").then(m => ({
      tool: m.default
    })),

  // Analysis Tools
  "bank-statement-analyzer": () =>
    import("./toolset/analysis/bank-statement-analyzer/tool").then(m => ({
      tool: m.default
    })),

  // Qualifier Tools
  "qualifier-wizard": () =>
    import("./toolset/utility/qualifier-wizard/tool").then(m => ({
      tool: m.default
    })),
};

/**
 * Load a tool by its slug
 */
export async function loadTool(slug: string): Promise<ToolSpec<any, any> | null> {
  try {
    const importer = TOOL_IMPORTS[slug];
    if (!importer) {
      logger.warn(`Tool not found: ${slug}`, { toolSlug: slug });
      return null;
    }

    const module = await importer();
    return module.tool;
  } catch (error) {
    logger.error("Failed to load tool", {
      toolSlug: slug,
      error: error instanceof Error ? error.message : String(error)
    });
    return null;
  }
}

/**
 * Get all available tool slugs
 */
export function getAvailableTools(): string[] {
  return Object.keys(TOOL_IMPORTS);
}

/**
 * Check if a tool exists
 */
export function toolExists(slug: string): boolean {
  return slug in TOOL_IMPORTS;
}

/**
 * Create AI SDK tool from ToolSpec
 */
export function createToolFromSpec<I extends ZodSchema, O extends ZodSchema>(
  spec: ToolSpec<I, O>
) {
  const toolConfig: any = {
    description: spec.description,
    execute: async (args: any) => {
      try {
        // Validate input
        const validatedInput = spec.inputSchema.parse(args);

        // Execute tool
        const result = await spec.execute(validatedInput);

        // Validate output
        const validatedOutput = spec.outputSchema.parse(result);

        return validatedOutput;
      } catch (error) {
        logger.error("Tool execution failed", {
          tool: spec.slug,
          error: error instanceof Error ? error.message : String(error)
        });
        throw error;
      }
    }
  };

  // Set the input schema
  toolConfig.inputSchema = spec.inputSchema;

  return createAITool(toolConfig);
}

/**
 * Load multiple tools at once
 */
export async function loadTools(slugs: string[]): Promise<Record<string, ToolSpec<any, any>>> {
  const tools: Record<string, ToolSpec<any, any>> = {};

  await Promise.all(
    slugs.map(async (slug) => {
      const tool = await loadTool(slug);
      if (tool) {
        tools[slug] = tool;
      }
    })
  );

  return tools;
}

// Class-based registry for compatibility
class SprinterToolRegistry {
  private loadedTools: Map<string, ToolSpec<any, any>> = new Map();

  async loadTool(slug: string): Promise<ToolSpec<any, any> | null> {
    return loadTool(slug);
  }

  getAvailableTools(): string[] {
    return getAvailableTools();
  }

  toolExists(slug: string): boolean {
    return toolExists(slug);
  }

  async loadTools(slugs: string[]): Promise<Record<string, ToolSpec<any, any>>> {
    return loadTools(slugs);
  }

  register(slug: string, importer: () => Promise<{ tool: ToolSpec<any, any> }>) {
    TOOL_IMPORTS[slug] = importer;
  }

  /**
   * Initialize the registry (compatibility method)
   */
  async initialize(options?: { loadFromDatabase?: boolean; tenantId?: string }): Promise<void> {
    // This is a no-op for now since tools are loaded lazily
    // Could be used in the future for database-based tools
    logger.info("Tool registry initialized", { options });
  }

  /**
   * Get AI SDK tools for an agent
   */
  getAIToolsForAgent(toolSlugs: string[]): Record<string, any> {
    const aiTools: Record<string, any> = {};

    for (const slug of toolSlugs) {
      // Try to get cached tool first
      const cachedTool = this.loadedTools.get(slug);
      if (cachedTool) {
        aiTools[slug] = createToolFromSpec(cachedTool);
      } else {
        logger.warn(`Tool ${slug} not loaded. Call loadTools() first.`, { slug });
      }
    }

    return aiTools;
  }

  /**
   * Preload tools for use with getAIToolsForAgent
   */
  async preloadTools(slugs: string[]): Promise<void> {
    const tools = await loadTools(slugs);
    for (const [slug, tool] of Object.entries(tools)) {
      this.loadedTools.set(slug, tool);
    }
  }

  /**
   * Get all tools (loads them if not already loaded)
   */
  async getAllTools(): Promise<ToolSpec<any, any>[]> {
    const slugs = getAvailableTools();
    const tools = await loadTools(slugs);
    return Object.values(tools);
  }

  /**
   * Get a single tool by slug
   */
  async getTool(slug: string): Promise<ToolSpec<any, any> | null> {
    return loadTool(slug);
  }
}

export const sprinterToolRegistry = new SprinterToolRegistry();