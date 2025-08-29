/**
 * AI Sprinter Foundation - Database Schema
 * Core tables for agents, tools, entities, and views
 */

import {
  pgTable,
  uuid,
  text,
  jsonb,
  timestamp,
  boolean,
  primaryKey,
  integer,
  numeric,
} from "drizzle-orm/pg-core";

// ============================================================================
// AGENT SYSTEM
// ============================================================================

/**
 * Agents - AI personas with configuration and policies
 */
export const agents = pgTable("agents", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  
  // Persona & instructions
  persona: jsonb("persona").notNull().default({}),
  systemInstructions: text("system_instructions").notNull(),
  
  // Model configuration
  provider: text("provider").notNull(), // 'openai' | 'anthropic' | 'google'
  modelId: text("model_id").notNull(),
  modelParams: jsonb("model_params").notNull().default({}), // temperature, maxTokens, etc
  
  // Loop control
  loopPolicy: jsonb("loop_policy").notNull().default({
    maxSteps: 4,
    activeTools: [], // tools to keep active after first step
  }),
  
  // Context assembly
  contextPolicy: jsonb("context_policy").notNull().default({
    scope: ['workspace', 'tenant', 'user'],
    entityTypes: [],
    retrieval: { enabled: false },
  }),
  
  // Visibility & access
  visibility: text("visibility").notNull().default("tenant"), // 'public' | 'tenant' | 'private'
  tenantId: uuid("tenant_id"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Tools - Executable capabilities (local, HTTP, MCP)
 */
export const tools = pgTable("tools", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  
  // Tool type & execution
  kind: text("kind").notNull(), // 'local' | 'http' | 'mcp'
  executionMode: text("execution_mode").notNull().default("server"), // 'client' | 'server' | 'interactive'
  
  // Schemas (JSON Schema format)
  inputSchema: jsonb("input_schema").notNull(),
  outputSchema: jsonb("output_schema"),
  uiSchema: jsonb("ui_schema").default({}), // hints for UI rendering
  
  // Implementation details
  httpEndpoint: text("http_endpoint"), // for HTTP tools
  mcpServerId: uuid("mcp_server_id"), // for MCP tools
  implKey: text("impl_key"), // for local tools (module export name)
  
  // Configuration
  config: jsonb("config").default({}), // tool-specific config
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Agent-Tool mappings with configuration
 */
export const agentTools = pgTable(
  "agent_tools",
  {
    agentId: uuid("agent_id")
      .references(() => agents.id, { onDelete: "cascade" })
      .notNull(),
    toolId: uuid("tool_id")
      .references(() => tools.id, { onDelete: "cascade" })
      .notNull(),
    
    // Tool-specific settings for this agent
    requireConfirmation: boolean("require_confirmation").default(false),
    activeByDefault: boolean("active_by_default").default(true),
    config: jsonb("config").default({}), // agent-specific tool config overrides
    
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.agentId, t.toolId] }),
  })
);

// ============================================================================
// ENTITY SYSTEM
// ============================================================================

/**
 * Entity Types - Define polymorphic content schemas
 */
export const entityTypes = pgTable("entity_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  
  // Schema definition
  contentSchema: jsonb("content_schema").notNull(), // JSON Schema
  uiSchema: jsonb("ui_schema").default({}), // UI hints
  
  // Features & capabilities
  features: jsonb("features").default({
    embeddings: false,
    versioning: false,
    search: true,
  }),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Entities - Polymorphic content instances
 */
export const entities = pgTable("entities", {
  id: uuid("id").defaultRandom().primaryKey(),
  entityTypeId: uuid("entity_type_id")
    .references(() => entityTypes.id)
    .notNull(),
  
  // Scoping & hierarchy
  tenantId: uuid("tenant_id").notNull(),
  parentId: uuid("parent_id"), // workspace/container
  
  // Content
  slug: text("slug"),
  title: text("title"),
  content: jsonb("content").notNull().default({}), // validated against entityType.contentSchema
  
  // Visibility & access
  visibility: text("visibility").notNull().default("private"), // 'public' | 'tenant' | 'private'
  
  // Metadata
  createdBy: uuid("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Entity Relations - Graph-like connections
 */
export const entityRelations = pgTable("entity_relations", {
  id: uuid("id").defaultRandom().primaryKey(),
  sourceId: uuid("source_id")
    .references(() => entities.id, { onDelete: "cascade" })
    .notNull(),
  targetId: uuid("target_id")
    .references(() => entities.id, { onDelete: "cascade" })
    .notNull(),
  relation: text("relation").notNull(), // 'contains' | 'tags' | 'depends_on' | custom
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================================
// VIEW SYSTEM
// ============================================================================

/**
 * Views - Dynamic UI layouts mapping data to components
 */
export const views = pgTable("views", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  
  // Layout definition
  layout: jsonb("layout").notNull(), // Array of ViewBlock objects
  
  // Access control
  visibility: text("visibility").notNull().default("tenant"),
  tenantId: uuid("tenant_id"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================================
// CHAT SYSTEM
// ============================================================================

/**
 * Chat Threads - Conversations with agents
 */
export const chatThreads = pgTable("chat_threads", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: uuid("tenant_id").notNull(),
  workspaceId: uuid("workspace_id"), // optional workspace scope
  agentId: uuid("agent_id")
    .references(() => agents.id)
    .notNull(),
  
  title: text("title"),
  metadata: jsonb("metadata").default({}),
  
  createdBy: uuid("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Chat Messages - Persisted UI messages
 */
export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  threadId: uuid("thread_id")
    .references(() => chatThreads.id, { onDelete: "cascade" })
    .notNull(),
  
  role: text("role").notNull(), // 'system' | 'user' | 'assistant'
  uiMessage: jsonb("ui_message").notNull(), // Full AI SDK UIMessage
  
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * Chat Tool Events - Audit trail for tool calls
 */
export const chatToolEvents = pgTable("chat_tool_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  threadId: uuid("thread_id")
    .references(() => chatThreads.id, { onDelete: "cascade" })
    .notNull(),
  messageId: uuid("message_id"),
  
  toolSlug: text("tool_slug").notNull(),
  part: jsonb("part").notNull(), // Tool part (input/result/error)
  
  // Metrics
  latencyMs: integer("latency_ms"),
  tokenUsage: jsonb("token_usage"),
  cost: numeric("cost", { precision: 10, scale: 4 }),
  
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * Chat Generations - Track streaming state for resume
 */
export const chatGenerations = pgTable("chat_generations", {
  id: uuid("id").defaultRandom().primaryKey(), // generationId
  threadId: uuid("thread_id")
    .references(() => chatThreads.id, { onDelete: "cascade" })
    .notNull(),
  
  status: text("status").notNull().default("running"), // 'running' | 'done' | 'error'
  streamKey: text("stream_key").notNull(), // Redis stream key
  
  metadata: jsonb("metadata").default({}),
  
  createdAt: timestamp("created_at").defaultNow(),
  finishedAt: timestamp("finished_at"),
});

// ============================================================================
// TENANT SYSTEM
// ============================================================================

/**
 * Tenants - Multi-tenancy support
 */
export const tenants = pgTable("tenants", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  
  settings: jsonb("settings").notNull().default({
    branding: {},
    features: {},
    limits: {},
  }),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================================
// WORKFLOW SYSTEM (Optional)
// ============================================================================

/**
 * Workflows - Declarative automation sequences
 */
export const workflows = pgTable("workflows", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: uuid("tenant_id")
    .references(() => tenants.id)
    .notNull(),
  
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  
  // Workflow definition
  spec: jsonb("spec").notNull(), // triggers + steps array
  
  // Status
  enabled: boolean("enabled").default(true),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Workflow Runs - Execution history
 */
export const workflowRuns = pgTable("workflow_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  workflowId: uuid("workflow_id")
    .references(() => workflows.id)
    .notNull(),
  
  context: jsonb("context").notNull(), // triggering context
  status: text("status").default("queued"), // 'queued' | 'running' | 'success' | 'failed'
  
  startedAt: timestamp("started_at"),
  finishedAt: timestamp("finished_at"),
  
  output: jsonb("output"),
  error: text("error"),
});

// ============================================================================
// DOCUMENT & RAG SYSTEM (Optional)
// ============================================================================

/**
 * Document Sources
 */
export const docSources = pgTable("doc_sources", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: uuid("tenant_id").notNull(),
  ownerEntityId: uuid("owner_entity_id"), // optional workspace owner
  
  kind: text("kind").notNull(), // 'upload' | 'url' | 'integration'
  uri: text("uri").notNull(),
  
  status: text("status").default("pending"), // 'pending' | 'processing' | 'ready' | 'error'
  metadata: jsonb("metadata").default({}),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Document Chunks with embeddings
 */
export const docChunks = pgTable("doc_chunks", {
  id: uuid("id").defaultRandom().primaryKey(),
  sourceId: uuid("source_id")
    .references(() => docSources.id, { onDelete: "cascade" })
    .notNull(),
  
  idx: integer("idx").notNull(), // chunk index
  text: text("text").notNull(),
  
  // Metadata for retrieval
  meta: jsonb("meta").default({}), // page, section, etc
  
  // Vector embedding (requires pgvector extension)
  // embedding: vector("embedding", { dimensions: 1536 }),
  
  createdAt: timestamp("created_at").defaultNow(),
});