# AI Sprinter Foundation — Single Source of Truth

## Overview
The AI Sprinter Foundation is a modular, schema-first architecture for building AI-native applications with agents, tools, entities, and views. Everything is data-driven, stored in the database, and compiled at runtime for maximum flexibility.

## Core Principles

1. **DB is the single source of truth** for Agents, Tools, Entity Types, and Views
2. **Schema-first, type-safe**: JSON Schema in DB → Zod at runtime
3. **Agents live in the DB** as opinionated personas with tool mappings
4. **Tools are typed and dynamic**: Local tools use `tool()`, remote use `dynamicTool()`
5. **Automatic System Context**: Agents declare context_policy for deterministic memory
6. **UI is registry-driven**: Views map data sources to components
7. **Workspaces by default**: Graph-like abstraction for knowledge/memory
8. **Streaming & caching**: TanStack Query + Redis/Upstash for resilience
9. **MCP-compliant by design**: External tools adapt seamlessly
10. **Growth baked-in**: Tools can expose public/SEO pages

## Package Structure

```
packages/
  core/         # Types, errors, JSON↔Zod codecs
  db/           # Drizzle schema + migrations + repos
  entities/     # Entity-type compiler + CRUD/search
  tools/        # Tool runtime (local, HTTP, MCP)
  agent/        # AI SDK v5 orchestration
  context/      # Deterministic system-context
  ui-registry/  # View component registry
  views/        # View runtime (data → components)
  query/        # TanStack Query hooks
  streaming/    # Upstash Redis pub/sub
```

## Database Schema (Drizzle)

### Core Tables

- `agents`: AI personas with provider, model, instructions, policies
- `tools`: Tool definitions with schemas and execution modes
- `agent_tools`: Many-to-many agent↔tool mappings
- `entity_types`: Polymorphic entity schemas
- `entities`: Instances with JSONB content
- `views`: UI layouts mapping data → components

### Chat Tables

- `chat_threads`: Conversations scoped to agent/workspace
- `chat_messages`: Persisted UI messages
- `chat_tool_events`: Tool call/result audit
- `chat_generations`: In-flight streaming state

## Agent System

Agents are DB rows with:
- Provider & model configuration
- System instructions
- Loop policy (max steps, active tools)
- Context policy (workspace/tenant/user scopes)

Runtime:
```typescript
export async function runAgent({ agent, messages }) {
  const model = resolveModel(agent.provider, agent.modelId);
  const tools = await buildToolsetForAgent(agent.id);
  const system = [
    agent.systemInstructions,
    await assembleContext(agent)
  ].join("\n\n");
  
  return streamText({
    model, tools, system, messages,
    stopWhen: stepCountIs(agent.loopPolicy?.maxSteps ?? 4)
  });
}
```

## Tool System

### Local Typed Tools
```typescript
export default tool({
  description: "Search KB",
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({ results: z.array(...) }),
  async execute({ query }) { /* ... */ }
});
```

### Dynamic Tools (DB/HTTP/MCP)
```typescript
export async function buildToolsetForAgent(agentId: string) {
  const rows = await db.selectToolsForAgent(agentId);
  const tools = {};
  
  for (const row of rows) {
    if (row.kind === "http") {
      tools[row.slug] = dynamicTool({
        description: row.description,
        inputSchema: fromJsonSchema(row.inputSchema),
        async execute(input) {
          const res = await fetch(row.httpEndpoint, {
            method: "POST",
            body: JSON.stringify(input)
          });
          return res.json();
        }
      });
    }
  }
  return tools;
}
```

## Context Assembly

Agents declare context_policy:
```typescript
interface ContextPolicy {
  scope: ['workspace', 'tenant', 'user'];
  entityTypes: [{
    slug: string;
    limit?: number;
    timeWindowDays?: number;
  }];
  retrieval?: { enabled: boolean; topK?: number };
  pinnedEntityIds?: string[];
}
```

## View System

Views are JSON layouts:
```typescript
type ViewBlock = {
  id: string;
  componentKey: string;  // 'core.table', 'core.card'
  dataSource: {
    type: 'entity.query' | 'tool.invoke';
    // query params or tool input
  };
  propsBinding: Record<string, string>; // JSONPath
};
```

## Chat Implementation

### Client
```tsx
export function ChatPane({ threadId, agentId }) {
  const transport = new DefaultChatTransport({
    api: "/api/chat",
    body: () => ({ id: threadId, agentId })
  });
  
  const { messages, sendMessage, addToolResult } = useChat({
    transport, id: threadId,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls
  });
  
  return (
    <Conversation>
      {messages.map(m => (
        <Message key={m.id} role={m.role}>
          {m.parts.map(part => (
            <ToolPartRenderer part={part} />
          ))}
        </Message>
      ))}
      <Composer onSubmit={sendMessage} />
    </Conversation>
  );
}
```

### Server
```typescript
export async function POST(req: Request) {
  const { id, messages, agentId } = await req.json();
  const agent = await loadAgent(agentId);
  const tools = await buildToolsetForAgent(agent.id);
  const model = resolveModel(agent.provider, agent.modelId);
  
  const result = streamText({
    model, tools,
    system: agent.systemInstructions,
    messages: convertToModelMessages(messages)
  });
  
  return result.toUIMessageStreamResponse();
}
```

## Conventions

- **Slugs**: kebab-case for tools/entities/views
- **Schemas**: Always include descriptions; use ISO dates
- **UI**: Prefer RSC; lazy-load heavy components
- **Security**: `require_confirmation` on destructive tools
- **Observability**: Log all tool IO with cost/tokens

## Adding Features Without Code

1. **Add a Tool**: Insert row with schema + endpoint
2. **Add Entity Type**: Insert row with content schema
3. **Add View**: Insert row with layout blocks
4. **Link Tool→Agent**: Insert agent_tools row

Everything appears automatically via the registry and runtime compilation.