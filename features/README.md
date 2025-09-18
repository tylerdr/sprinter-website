# Features Module - AI Sprinter Architecture

This folder implements the **AI Sprinter** modular AI system architecture following the AI Sprinter 7-stage release plan. It runs in parallel to the existing implementation to enable safe, incremental migration to the AI Sprinter methodology.

## 🎯 Purpose

Enable the transition from 63+ hardcoded tools to the **AI Sprinter** dynamic, database-driven AI system with:
- **Modular architecture** - Self-contained feature modules
- **Incremental migration** - Side-by-side validation
- **Feature flagging** - Safe rollout with `MQ_AI_V1_ENABLED`
- **Zero production impact** - Parallel implementation

## 📁 Module Structure

```
features/
├── agents/       # Agent configurations and orchestration
├── tools/        # Self-contained tool implementations  
├── chat/         # Chat UI and streaming infrastructure
├── workflows/    # Multi-step workflow engine
└── entities/     # Unified entity management
```

## 🚀 AI Sprinter Release Plan Overview

The AI Sprinter methodology introduces a systematic approach to building AI-native applications through 7 incremental stages:

### Stage 1: Foundation + Tools Page (Current)
- ✅ Features folder structure created
- 🚧 Fannie tool migration to features/tools
- 🚧 Tool execution API endpoint
- 🚧 Feature-flagged tools page

### Stage 2: Agent Chat Baseline
- Single hardcoded agent (mortgage-assistant)
- Basic chat with AI SDK v5 streaming
- No tools initially

### Stage 3: Tool Integration + Citations
- Agent uses Fannie tool
- Citation system integration
- Tool result rendering in chat

### Stage 4: Multi-Agent Support
- 4 agents (OpenAI, Anthropic, Google, Groq)
- Agent selector UI
- Multi-provider configuration

### Stage 5: Additional Tools
- Web search tool
- DSCR calculator
- Enhanced tool UI components

### Stage 6: Database Integration
- Agents/tools in database
- Admin management pages
- Chat persistence

### Stage 7: Complete Migration
- All 63+ tools migrated
- Old system deprecated
- Production cutover

## 🛠️ Implementation Status

### Tools Module (`/features/tools`)
- **Registry**: Class-based `SprinterToolRegistry` 
- **UI Registry**: Dynamic imports for code splitting
- **Current Tools**: 
  - ✅ fannie-mae-web-search (guidelines)
  - ✅ web-search (search)
  - ✅ dscr-calculator (calculators)
- **Pending**: 60+ tools from `/lib/agents/tools`

### Agents Module (`/features/agents`)
- **Status**: Structure only, implementation pending
- **Next**: Create registry with mortgage-assistant agent
- **Stage 2 Priority**

### Chat Module (`/features/chat`)
- **Status**: Structure only
- **Next**: Implement streaming chat UI
- **Stage 2 Priority**

### Workflows Module (`/features/workflows`)
- **Status**: Structure only
- **Note**: Existing workflow system 95% complete
- **Stage 6-7 Priority** (lower)

### Entities Module (`/features/entities`)
- **Status**: Structure only
- **Database**: Tables already exist
- **Stage 6 Priority**

## 🔧 Development Guide

### Adding a New Tool

1. Create tool directory:
```bash
mkdir -p features/tools/toolset/[category]/[tool-name]
```

2. Implement required files:
```
[tool-name]/
├── tool.ts    # Tool definition with schemas
├── ui.tsx     # UI components (Result, Loading, Error, InputForm)
└── index.ts   # Barrel exports
```

3. Register in registries:
```typescript
// features/tools/registry.ts
sprinterToolRegistry.register('tool-name', async () => {
  const mod = await import('./toolset/category/tool-name');
  return mod.default || mod.tool;
});

// features/tools/ui-registry.ts
SPRINTER_TOOL_UI_IMPORTS['tool-name'] = () => 
  import('./toolset/category/tool-name/ui');
```

### Feature Flag Usage

All new surfaces must be gated:
```typescript
import { isAIV1Enabled } from '@/utils/flags';

if (!isAIV1Enabled()) {
  return <OldImplementation />;
}
return <NewFeatureImplementation />;
```

## 🧪 Testing

### Verification Commands

```bash
# Stage 1: Check Fannie tool
test -f features/tools/toolset/guidelines/fannie-mae-web-search/tool.ts

# Stage 2: Check agent registry  
test -f features/agents/registry.ts && grep "mortgage-assistant" features/agents/registry.ts

# Stage 3: Check citation integration
grep "fannie-guide-search" features/agents/registry.ts

# Stage 4: Count agents
grep -c "id:.*agent" features/agents/registry.ts

# Stage 7: Count migrated tools
find features/tools/toolset -type d -maxdepth 2 | wc -l
```

## 📊 Migration Progress

| Component | Current Location | New Location | Status |
|-----------|-----------------|--------------|--------|
| Tools (63+) | `/lib/agents/tools/` | `/features/tools/toolset/` | 3/63 migrated |
| Agents | `/lib/registries/agents.ts` | `/features/agents/` | 0% |
| Chat | `/app/api/chat/` | `/features/chat/` | 0% |
| Workflows | `/lib/workflow/` | `/features/workflows/` | Existing 95% complete |
| Entities | `/lib/entities/` | `/features/entities/` | DB exists, service pending |

## ⚠️ Important Notes

1. **DO NOT** modify existing implementations during initial stages
2. **DO NOT** remove old code until Stage 7 validation
3. **ALWAYS** use feature flags for new surfaces
4. **MAINTAIN** backward compatibility
5. **TEST** both old and new paths in parallel

## 📚 Documentation

- **AI Sprinter Architecture**: `/docs/AI-SPRINTER-ARCHITECTURE.md`
- **AI Sprinter Release Plan**: `/TODO/AI_SPRINTER_RELEASE_PLAN/FINAL_STAGE_CHECKLIST.md`

## 🔄 Current Focus (Stage 1)

Priority tasks for Stage 1 completion:
- [ ] Complete Fannie tool migration
- [ ] Implement `/api/tool/execute` endpoint
- [ ] Create feature-flagged `/tool/[slug]` page
- [ ] Add unit tests for migrated tool
- [ ] Verify no production impact with flag off

## 🚦 Next Steps

After Stage 1 validation:
1. Implement agent registry (Stage 2)
2. Create chat UI components (Stage 2)
3. Add streaming chat endpoint (Stage 2)
4. Integrate tool with agent (Stage 3)

## 💡 AI Sprinter Key Principles

The AI Sprinter approach emphasizes:

- **Parallel Implementation**: Features run alongside existing code
- **Incremental Migration**: One stage at a time with validation
- **Feature Flags**: Safe rollout and rollback capability
- **Database Last**: Code-first approach, DB in Stage 6
- **Tool Structure**: Keep existing file structure (tool.ts, ui.tsx, index.ts)
- **AI-Native Development**: Tools and UI designed for both human and AI developers
- **Self-Contained Modules**: Each feature is independently deployable

## 🤝 Contributing

When working in this module:
1. Follow the stage plan strictly
2. Update TODO.md files in each module
3. Run verification commands after changes
4. Keep implementations isolated from production
5. Document any deviations or blockers

---

## About AI Sprinter

AI Sprinter is a methodology for building AI-native applications where:
- **Features are data**, not code
- **Tools are typed** and validated
- **UI is registry-driven** with fallbacks
- **Context is automatic** and deterministic
- **Everything streams** for optimal UX

The architecture is designed to be **simple to understand**, **easy to extend**, and **AI-friendly** - allowing both human and AI developers to add capabilities through configuration and minimal code.

---

*This is a living document for the AI Sprinter implementation. Update as stages progress.*