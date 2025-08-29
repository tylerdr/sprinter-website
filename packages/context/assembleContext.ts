/**
 * Context Assembly System
 * Deterministically builds system context from agent policies
 * Includes workspace, tenant, user entities and optional retrieval
 */

export type ContextScope = "workspace" | "tenant" | "user" | "global";

export interface ContextPolicy {
  scope: ContextScope[]; // Priority order
  entityTypes: Array<{
    slug: string;
    limit?: number;
    timeWindowDays?: number;
    where?: Record<string, unknown>;
    includeRelations?: string[];
    fields?: string[];
  }>;
  retrieval?: { 
    enabled: boolean; 
    topK?: number; 
    minScore?: number;
  };
  pinnedEntityIds?: string[];
}

export interface AgentRow {
  id: string;
  name: string;
  systemInstructions: string;
  contextPolicy?: ContextPolicy;
  // Other agent fields...
}

export interface ContextOptions {
  threadId?: string;
  workspaceId?: string;
  tenantId?: string;
  userId?: string;
}

/**
 * Mock entity data for demonstration
 */
const mockEntities = {
  workspace: [
    {
      id: "ws-1",
      type: "project",
      title: "AP Automation Implementation",
      content: {
        status: "active",
        touchlessRate: 0.64,
        invoicesProcessed: 1250,
      },
    },
    {
      id: "ws-2", 
      type: "document",
      title: "AP Best Practices Guide",
      content: {
        summary: "Key practices for AP automation success",
        lastUpdated: "2024-01-15",
      },
    },
  ],
  tenant: [
    {
      id: "t-1",
      type: "company",
      title: "TechCo Solutions",
      content: {
        industry: "Software",
        size: "Mid-market",
        revenue: "$45M",
      },
    },
  ],
};

/**
 * Assemble deterministic context blocks for an agent
 * @param agent - Agent with context policy
 * @param options - Runtime context (workspace, tenant, user)
 * @returns Formatted context string for system prompt
 */
export async function assembleContext(
  agent: AgentRow,
  options: ContextOptions = {}
): Promise<string> {
  const { workspaceId, tenantId, userId } = options;
  const policy = agent.contextPolicy;
  
  // No policy means no context
  if (!policy) {
    return "";
  }

  const contextBlocks: string[] = [];

  // Add workspace context if available
  if (workspaceId && policy.scope.includes("workspace")) {
    contextBlocks.push(
      "## Current Workspace",
      `ID: ${workspaceId}`,
      "",
      "### Active Projects:",
      ...mockEntities.workspace.map(e => 
        `- ${e.title}: ${JSON.stringify(e.content)}`
      ),
      ""
    );
  }

  // Add tenant context
  if (tenantId && policy.scope.includes("tenant")) {
    contextBlocks.push(
      "## Tenant Information",
      `ID: ${tenantId}`,
      "",
      "### Company Details:",
      ...mockEntities.tenant.map(e =>
        `- ${e.title}: ${JSON.stringify(e.content)}`
      ),
      ""
    );
  }

  // Add specific entity types from policy
  for (const entityType of policy.entityTypes) {
    // In production, query database for entities of this type
    // filtered by scope, time window, and other criteria
    
    contextBlocks.push(
      `## ${entityType.slug} (Recent)`,
      `- Mock data for ${entityType.slug}`,
      `- Limited to ${entityType.limit ?? 10} items`,
      ""
    );
  }

  // Add pinned entities if specified
  if (policy.pinnedEntityIds?.length) {
    contextBlocks.push(
      "## Pinned Context",
      ...policy.pinnedEntityIds.map(id => `- Entity ${id}`),
      ""
    );
  }

  // Retrieval-augmented context (RAG)
  if (policy.retrieval?.enabled) {
    // In production, perform vector similarity search
    contextBlocks.push(
      "## Retrieved Knowledge",
      "- Most relevant documents based on conversation",
      `- Top ${policy.retrieval.topK ?? 5} results`,
      ""
    );
  }

  // Compile into formatted string
  const contextString = contextBlocks.join("\n").trim();
  
  // Wrap in a clear section if not empty
  if (contextString) {
    return `
# System Context

${contextString}

---
`;
  }

  return "";
}

/**
 * Format entity for context inclusion
 * Keeps it concise while preserving key information
 */
function formatEntity(entity: any): string {
  const { id, type, title, content } = entity;
  
  // Extract most important fields
  const summary = {
    title,
    type,
    ...(typeof content === "object" ? content : { content }),
  };
  
  return `[${type}] ${title}: ${JSON.stringify(summary, null, 2)}`;
}

/**
 * Rank and deduplicate entities for context
 * Priority: pinned > workspace > retrieval > tenant > user
 */
function rankEntities(
  entities: any[],
  pinnedIds: string[] = []
): any[] {
  // Sort by priority
  return entities.sort((a, b) => {
    const aPinned = pinnedIds.includes(a.id);
    const bPinned = pinnedIds.includes(b.id);
    
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    
    // Further ranking logic based on recency, relevance, etc.
    return 0;
  });
}