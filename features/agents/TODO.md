# Agents Module TODO

Based on the 7-stage release plan for the AI Sprinter architecture.

## Stage 2: Agent Chat Baseline ✅ Priority
- [ ] Create `registry.ts` with single hardcoded agent
  - [ ] Define mortgage-assistant agent (OpenAI GPT-4)
  - [ ] System instructions for mortgage guidance
  - [ ] No tools initially (empty tools array)
- [ ] Create `providers.ts` for model resolution
  - [ ] OpenAI provider setup
  - [ ] Model configuration (temperature, max tokens)
- [ ] Create `run-agent.ts` for execution
  - [ ] streamText integration
  - [ ] System prompt assembly
  - [ ] Message conversion utilities
- [ ] Create `types.ts` with interfaces
  - [ ] Agent interface
  - [ ] ContextPolicy interface
  - [ ] LoopPolicy interface

## Stage 3: Tool Integration
- [ ] Update registry agent to include tools
  - [ ] Add fannie-guide-search to tools array
  - [ ] Configure tool confirmation settings
- [ ] Implement context assembly
  - [ ] Create context/assembler.ts
  - [ ] Entity collection by scope
  - [ ] Format context blocks

## Stage 4: Multi-Agent Support
- [ ] Expand registry with 3 more agents
  - [ ] Anthropic Claude agent (lender guidelines)
  - [ ] Google Gemini agent (calculations)
  - [ ] Groq agent (fast responses)
- [ ] Update providers.ts
  - [ ] Add anthropic provider
  - [ ] Add google provider
  - [ ] Add groq provider
- [ ] Environment variables
  - [ ] ANTHROPIC_API_KEY
  - [ ] GOOGLE_GENERATIVE_AI_API_KEY
  - [ ] GROQ_API_KEY

## Stage 5: Enhanced Tools
- [ ] Update agents with new tools
  - [ ] Add web-search tool
  - [ ] Add dscr-calculator tool
- [ ] Tool selection strategies
  - [ ] Tool activation policies
  - [ ] Max steps configuration

## Stage 6: Database Integration
- [ ] Migrate from registry to database
  - [ ] Create database loader
  - [ ] Query agents from DB
  - [ ] Cache agent configs
- [ ] Admin management support
  - [ ] CRUD operations for agents
  - [ ] Agent-tool relationship management
- [ ] Migration script
  - [ ] Export registry agents to DB
  - [ ] Validate migrated data

## Stage 7: Production Ready
- [ ] Performance optimization
  - [ ] Agent config caching
  - [ ] Lazy loading strategies
- [ ] Error handling
  - [ ] Provider fallbacks
  - [ ] Retry logic
- [ ] Monitoring
  - [ ] Execution metrics
  - [ ] Error tracking

## Testing Requirements
- [ ] Unit tests for each stage
  - [ ] Registry tests
  - [ ] Provider tests
  - [ ] Context assembly tests
- [ ] Integration tests
  - [ ] Agent execution flow
  - [ ] Tool integration
  - [ ] Multi-provider switching
- [ ] E2E tests
  - [ ] Chat flow with agents
  - [ ] Agent switching
  - [ ] Tool execution

## Verification Commands
```bash
# Stage 2
test -f features/agents/registry.ts && grep "mortgage-assistant" features/agents/registry.ts

# Stage 3
grep "fannie-guide-search" features/agents/registry.ts

# Stage 4
grep -c "id:.*agent" features/agents/registry.ts | grep -E "^[4-9]"

# Stage 6
echo "SELECT COUNT(*) FROM agents;" | npx supabase db query
```

## Current Status
- Stage 1: ✅ Module structure created
- Stage 2: 🚧 Registry needs implementation
- Stage 3-7: ⏳ Pending