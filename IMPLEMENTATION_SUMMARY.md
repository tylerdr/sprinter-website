# Agent-Based System Status — September 2025

## What Exists Today
- `lib/agents/registry.ts` defines ten personas with reasonable prompts and metadata split between admin/public use cases.
- `lib/agents/manager.ts` wraps the AI SDK and adds streaming, handoff, and consultation helpers.
- API routes (`app/api/chat/route.ts`, `app/api/chat/visitor/route.ts`) call the manager, apply rate limiting, and expose PE-focused system prompts.
- UI components for agent chat live in both `/components/ai/agent-chat.tsx` and `/features/chat/**`, providing a foundation for richer workflows.
- Chat persistence tables (`threads`, `messages`, `tool_executions`, `ai_tool_events`) now exist via `supabase/migrations/20250918093000_chat_tables.sql`, matching the plan's database schema.

## Gaps Blocking the Plan
- Tool execution is effectively disabled: `lib/tools/index.ts` returns an empty array and the admin/general tool collections are commented out, so agents cannot call any tools.
- `AgentManager` imports `createClient` from the browser helper (`lib/supabase/client.ts`), which throws on the server when env vars are missing and should be swapped for the server client.
- No registry or loader moves tools/agents/entities into the database as described in FOUNDATION.md; everything is still file-backed.
- Tests only cover a Playwright "current-state" smoke (`tests/current-state-check.spec.ts`) and do not exercise agent routing or tool calls.

## Immediate Focus Items
1. Recover the tool registry: re-enable tool exports, finish `getTools`, and add unit tests so agents can call calculators, database helpers, etc.
2. Ship migrations for chat persistence tables with indexes and policy coverage; update `AgentManager` to use the server client and guard against missing env vars.
3. Implement the DB-backed registry/loader the plan calls for (entities, tools, agents) so the architecture matches FOUNDATION.md.
4. Add integration tests that hit `/api/chat` with a mocked Supabase client to confirm threads, tool calls, and streaming all work.
5. Update this status as milestones land—right now the "✅ Completed Implementation" framing no longer reflects reality.
