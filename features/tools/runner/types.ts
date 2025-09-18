export type ToolContext = {
  userId: string | undefined;
  tenantId: string | undefined;
  entity?: {
    id: string;
    state: Record<string, any>;
    version: number;
  };
  // Additional per-request info (datasets, options, etc.)
  options?: Record<string, any>;
};

export type ToolArtifact = {
  kind: string;
  title: string;
  data: Record<string, any>;
  meta?: Record<string, any>;
};

export type ToolResult = {
  success: boolean;
  output?: any;
  patch?: Record<string, any>; // Entity state patch (deep partial)
  artifacts?: ToolArtifact[];
  error?: string;
  // For streaming responses
  stream?: ReadableStream;
};

export type ToolDefinition = {
  slug: string;
  name: string;
  description?: string;
  category?: string;
  executionMode?: 'server' | 'client' | 'edge';
  inputSchema?: any; // Zod schema or JSON schema
  outputSchema?: any;
  requiresEntity?: boolean;
  supportsPatch?: boolean;
  supportsArtifacts?: boolean;
  execute: (input: any, context: ToolContext) => Promise<ToolResult>;
};