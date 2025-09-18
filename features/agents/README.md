# Agents Module

Agent configurations and orchestration for the MortgageQ AI system.

## Structure

```
agents/
├── registry.ts        # Agent definitions and configurations
├── providers.ts       # Model provider resolution (OpenAI, Anthropic, Google)
├── run-agent.ts       # Agent execution with streaming support
├── types.ts          # TypeScript interfaces for agents
└── __tests__/        # Unit and integration tests
```

## Agent Interface

```typescript
interface Agent {
  id: string;
  slug: string;
  name: string;
  systemInstructions: string;
  provider: 'openai' | 'anthropic' | 'google' | 'xai' | 'groq';
  modelId: string;
  modelParams: {
    temperature?: number;
    maxOutputTokens?: number;
  };
  contextPolicy: ContextPolicy;
  loopPolicy?: {
    maxSteps: number;
    activeTools?: string[];
  };
}
```

## Context Policy

Agents declare data requirements via `contextPolicy`:
- **scope**: Data access levels (tenant, user)
- **entityTypes**: Specific entities to preload with filters
- **retrieval**: RAG configuration for knowledge base
- **pinnedEntityIds**: Always-included entities

## Usage

```typescript
// Server-side execution
import { runAgent } from '@/features/agents/run-agent';

const result = await runAgent({
  agent,
  messages,
  threadId
});

// Stream to client
return streamText({
  model: agent.model,
  tools: await buildToolsetForAgent(agent.id),
  system: agent.systemInstructions,
  messages
});
```

## Database Integration

Stage 6+ agents live in database:
- `agents` table: Core configuration
- `agent_tools` junction: Tool assignments
- `context_policy` JSONB: Data requirements
- `loop_policy` JSONB: Define stopWhen

## Testing

```bash
npm test -- features/agents/__tests__/registry.test.ts
npm test -- features/agents/__tests__/providers.test.ts
```