# Tools Module

Self-contained, typed tool implementations for AI agents.

## Structure

```
tools/
├── registry.ts              # Lazy-loading tool map
├── loader.ts               # AI SDK v5 integration
├── types.ts                # Core type definitions
├── integration.ts          # Tool builder for agents
├── [category]/            # Tool categories
│   └── [tool-slug]/       # Individual tool
│       ├── tool.ts        # Server-side logic + schemas
│       ├── ui.tsx         # Client components
│       ├── index.ts       # Barrel exports
│       └── __tests__/     # Unit tests
└── guidelines/            # Guideline search tools
    └── fannie-mae-web-search/
```

## Tool Interface

```typescript
interface ToolSpec {
  slug: string;
  name: string;
  description: string;
  inputSchema: z.ZodType;
  outputSchema: z.ZodType;
  execute: (input: any, context: ToolContext) => Promise<any>;
}

interface ToolUI {
  Result: React.FC<{ data: any }>;
  InputForm: React.FC<{ onSubmit: (data: any) => void }>;
  Loading?: React.FC;
  Error?: React.FC<{ error: any }>;
}
```

## Tool Categories

- **calculators/**: DTI, LTV, DSCR, payment, refinance, affordability
- **guidelines/**: Fannie Mae, FHA, VA, USDA search
- **search/**: Lender, program, marketplace search
- **content/**: Blog and social post generation
- **analysis/**: Bank statement analyzer
- **utility/**: Scenario share, contact capture, delegate-agent

## Adding a Tool

1. Create directory: `tools/[category]/[tool-slug]/`
2. Implement `tool.ts` with Zod schemas and execute function
3. Create `ui.tsx` with Result and InputForm components
4. Export via `index.ts` (avoid attaching UI to the tool object)
5. Add to `registry.ts` lazy-loading map for tool logic and `ui-registry.ts` for UI lazy-loading
6. Write tests in `__tests__/`

Note: Never attach UI components onto the tool definition/spec. UI must be loaded lazily via `features/tools/ui-registry.ts` to keep server bundles small and respect RSC boundaries.

## Usage

```typescript
// Server-side execution
import { buildToolsetForAgent } from '@/features/tools/integration';
const tools = await buildToolsetForAgent(agentId);

// Client-side UI loading
const { Result, InputForm } = await import(
  '@/features/tools/calculators/dti-calculator/ui'
);
```

## Database Integration

Stage 6+ tools mirror to database:
- `tools` table: Metadata and schemas
- `agent_tools` junction: Agent assignments
- `tool_calls` table: Execution logs

## Migration Path

Tools move from `/lib/agents/tools/` → `/features/tools/` preserving:
- File structure (tool.ts, ui.tsx, index.ts)
- Schema definitions
- UI components
- Test coverage

## Testing

```bash
# All tool tests
npm test -- features/tools/**/*.test.ts

# Specific tool
npm test -- features/tools/calculators/dti-calculator/__tests__/
```
