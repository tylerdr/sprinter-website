/**
 * Tool Building System
 * Compiles agent toolsets from database definitions
 * Supports local typed tools, HTTP tools, and MCP tools
 */

import { dynamicTool, tool } from "ai";
import { z } from "zod";

// Type definitions
export interface ToolRow {
  id: string;
  slug: string;
  name: string;
  description: string;
  kind: "local" | "http" | "mcp";
  executionMode: "client" | "server" | "interactive";
  inputSchema: any; // JSON Schema
  outputSchema?: any; // JSON Schema
  httpEndpoint?: string;
  implKey?: string;
}

/**
 * Sanitize slug to create valid tool key for AI SDK
 * Tool keys should be A-Z, 0-9, underscore
 */
export function toolKeyFor(slug: string): string {
  return slug.replace(/[^A-Za-z0-9_]/g, "_");
}

/**
 * Convert JSON Schema to Zod schema
 * This is a simplified version - expand as needed
 */
export function fromJsonSchema(schema: any): z.ZodTypeAny {
  if (!schema || typeof schema !== "object") {
    return z.any();
  }

  const { type, properties, required = [], items } = schema;

  switch (type) {
    case "string":
      return z.string();
    
    case "number":
      return z.number();
    
    case "boolean":
      return z.boolean();
    
    case "array":
      return z.array(items ? fromJsonSchema(items) : z.any());
    
    case "object":
      if (!properties) return z.object({});
      
      const shape: Record<string, z.ZodTypeAny> = {};
      
      for (const [key, prop] of Object.entries(properties)) {
        const zodType = fromJsonSchema(prop);
        shape[key] = required.includes(key) ? zodType : zodType.optional();
      }
      
      return z.object(shape);
    
    default:
      return z.any();
  }
}

/**
 * Local tool implementations
 * Import your typed tools here
 */
const localTools: Record<string, any> = {
  // Example local tools - replace with real implementations
  search: tool({
    description: "Search internal knowledge base",
    inputSchema: z.object({
      query: z.string().describe("Search query"),
      limit: z.number().int().min(1).max(20).default(5),
    }),
    async execute({ query, limit }) {
      // Mock implementation
      return {
        results: [
          { id: "1", title: "AP Automation Guide", url: "/guides/ap-automation" },
          { id: "2", title: "Quote Intelligence", url: "/guides/quote-intelligence" },
        ].slice(0, limit),
      };
    },
  }),
  
  calculate: tool({
    description: "Perform calculations",
    inputSchema: z.object({
      expression: z.string().describe("Math expression to evaluate"),
    }),
    async execute({ expression }) {
      try {
        // Simple eval for demo - use mathjs in production
        const result = Function('"use strict"; return (' + expression + ')')();
        return { result };
      } catch (error) {
        return { error: "Invalid expression" };
      }
    },
  }),
};

/**
 * Build complete toolset for an agent
 * Loads tools from database and compiles them
 */
export async function buildToolsetForAgent(agentId: string): Promise<Record<string, any>> {
  // For demo, return mock tools
  // In production, query from database:
  // const rows = await db.query.agentToolsForAgent(agentId);
  
  const mockTools: ToolRow[] = [
    {
      id: "1",
      slug: "kb-search",
      name: "Knowledge Base Search",
      description: "Search internal documentation",
      kind: "local",
      executionMode: "server",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string" },
          limit: { type: "number", minimum: 1, maximum: 20 },
        },
        required: ["query"],
      },
      implKey: "search",
    },
    {
      id: "2",
      slug: "ap-calculator",
      name: "AP Savings Calculator",
      description: "Calculate AP automation savings",
      kind: "http",
      executionMode: "server",
      inputSchema: {
        type: "object",
        properties: {
          invoiceVolume: { type: "number" },
          avgProcessingTime: { type: "number" },
        },
        required: ["invoiceVolume", "avgProcessingTime"],
      },
      httpEndpoint: "https://api.sprinter.ai/tools/ap-calculator",
    },
  ];

  const tools: Record<string, any> = {};

  for (const row of mockTools) {
    const key = toolKeyFor(row.slug);

    // Local tools - use pre-built typed implementations
    if (row.kind === "local" && row.implKey) {
      const localTool = localTools[row.implKey];
      if (localTool) {
        tools[key] = localTool;
      }
      continue;
    }

    // Dynamic tools (HTTP or MCP)
    const inputZod = fromJsonSchema(row.inputSchema);
    const outputZod = row.outputSchema ? fromJsonSchema(row.outputSchema) : undefined;

    if (row.kind === "http" && row.httpEndpoint) {
      tools[key] = dynamicTool({
        description: row.description,
        inputSchema: inputZod,
        async execute(input) {
          const parsed = inputZod.parse(input);
          
          // For demo, return mock data
          // In production, actually call the endpoint
          if (row.slug === "ap-calculator") {
            const { invoiceVolume, avgProcessingTime } = parsed as any;
            return {
              annualSavings: invoiceVolume * avgProcessingTime * 0.5 * 12,
              touchlessRate: 0.64,
              roiMonths: 3,
            };
          }
          
          // Real implementation:
          // const res = await fetch(row.httpEndpoint!, {
          //   method: "POST",
          //   headers: { "content-type": "application/json" },
          //   body: JSON.stringify(parsed),
          // });
          // return outputZod ? outputZod.parse(await res.json()) : res.json();
          
          return {};
        },
      });
      continue;
    }

    // MCP tools would be adapted here
    // if (row.kind === "mcp") {
    //   const { adaptMCPTool } = await import("./mcp-adapter");
    //   tools[key] = await adaptMCPTool(row, inputZod, outputZod);
    // }
  }

  return tools;
}