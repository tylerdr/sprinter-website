# MortgageQ AI Prompts

Simplified, modular prompt system for MortgageQ agents.

## Structure

```
prompts/
├── core.ts           # Essential platform context & safety rules
├── agent-base.ts     # Base templates for agent categories
├── compose.ts        # Unified composition system
├── agents/           # Agent-specific prompts
│   ├── marketplace.ts
│   ├── fannie-mae.ts
│   ├── calculator.ts
│   ├── guidelines.ts
│   ├── admin.ts
│   └── marketing.ts
└── index.ts          # Public exports
```

## Usage

### Simple Agent Prompt
```typescript
import { getAgentPrompt } from '@/features/ai/prompts';

const prompt = getAgentPrompt('marketplace', {
  nowIso: new Date().toISOString(),
  timezone: 'America/New_York',
  lenderCount: 25,
  programCount: 150
});
```

### Custom Composition
```typescript
import { composeAgentSystemPrompt } from '@/features/ai/prompts';

const prompt = composeAgentSystemPrompt(
  'Your custom agent instructions here',
  {
    agentType: 'specialist',
    agentName: 'Custom Specialist',
    tools: ['tool1', 'tool2'],
    includeDateTime: true,
    nowIso: new Date().toISOString()
  }
);
```

### Core Only
```typescript
import { composeCorePrompt } from '@/features/ai/prompts';

const minimalPrompt = composeCorePrompt({
  includeDateTime: true,
  nowIso: new Date().toISOString()
});
```

## Design Principles

1. **Minimal Core**: Only essential safety and platform context
2. **Composable**: Build prompts from reusable components
3. **Clear Hierarchy**: Core → Category Base → Agent Specific
4. **No Redundancy**: Each layer adds unique value
5. **Easy to Read**: Clean, scannable prompt structure

## Key Components

### Core (`core.ts`)
- Platform context
- Safety & compliance rules
- Tool usage guidelines
- Basic formatting

### Agent Base (`agent-base.ts`)
- Search agents: Comprehensive coverage, fair comparison
- Specialist agents: Precision, education, actionable guidance
- Guidelines agents: Authoritative citations, comparisons
- Admin agents: Security-first, clear reporting

### Agent Specific (`agents/`)
- Unique expertise and focus areas
- Specific tool configurations
- Custom response patterns
- Domain-specific protocols

## Migration from Old System

The old system used:
- `system-information.ts`
- `interaction-guidelines.ts`
- `formatting-guidelines.ts`

This new system consolidates these into simpler, more focused components that are easier to maintain and understand.