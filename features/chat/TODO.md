# Chat Module TODO

Based on the 7-stage release plan for the AI Sprinter architecture.

## Stage 2: Basic Chat Implementation ✅ Priority
- [ ] Create core types
  - [ ] Create types.ts with Message, Thread interfaces
  - [ ] UIMessage compatibility with AI SDK v5
  - [ ] Role definitions (user, assistant, system)
- [ ] Chat API endpoint
  - [ ] Create app/api/chat/route.ts
  - [ ] Streaming with createUIMessageStream
  - [ ] Basic message handling (no tools yet)
  - [ ] Integration with agents/run-agent.ts
- [ ] UI Components
  - [ ] Create components/chat/agent-chat.tsx
  - [ ] Create components/chat/message-list.tsx
  - [ ] Create components/chat/chat-input.tsx
  - [ ] Basic message rendering (text only)
- [ ] Chat page
  - [ ] Create app/(app)/chat/page.tsx
  - [ ] Feature flag gate (MQ_AI_V1_ENABLED)
  - [ ] Single agent interface
- [ ] React hooks
  - [ ] Create hooks/use-chat.ts wrapper
  - [ ] DefaultChatTransport setup
  - [ ] Message state management

## Stage 3: Tool Integration & Citations
- [ ] Enhanced message types
  - [ ] Support UIMessagePart[]
  - [ ] Tool call parts
  - [ ] Citation parts
- [ ] Tool UI components
  - [ ] Create components/tool-result.tsx
  - [ ] Create components/citation-card.tsx
  - [ ] Create ToolPartRenderer.tsx
  - [ ] Tool state handling (loading, input, output, error)
- [ ] Update chat API
  - [ ] Tool execution support
  - [ ] Tool result streaming
  - [ ] Citation formatting
- [ ] UI Registry integration
  - [ ] Tool result renderers
  - [ ] Fallback renderer
  - [ ] Custom tool UIs

## Stage 4: Multi-Agent Support
- [ ] Agent selector component
  - [ ] Create components/agent-selector.tsx
  - [ ] Agent switching logic
  - [ ] Provider icons/badges
- [ ] Update chat context
  - [ ] Selected agent state
  - [ ] Agent switching in UI
  - [ ] Clear chat on switch option
- [ ] Update API endpoint
  - [ ] Handle agentId parameter
  - [ ] Load correct agent config
  - [ ] Provider-specific handling

## Stage 5: Enhanced Tools
- [ ] Tool result improvements
  - [ ] Web search result rendering
  - [ ] DSCR calculator UI
  - [ ] Enhanced tool cards
- [ ] Tool confirmation UI
  - [ ] Confirmation dialogs
  - [ ] Tool parameter preview
  - [ ] Manual tool invocation

## Stage 6: Persistence & Admin
- [ ] Message persistence
  - [ ] Save to chat_messages table
  - [ ] Load chat history
  - [ ] Resume conversations
- [ ] Thread management
  - [ ] Create chat_threads entries
  - [ ] Thread listing UI
  - [ ] Thread deletion
- [ ] Tool event logging
  - [ ] Save to chat_tool_events
  - [ ] Tool execution metrics
  - [ ] Error tracking
- [ ] Admin features
  - [ ] Chat history viewer
  - [ ] Tool usage analytics
  - [ ] Message export

## Stage 7: Production Features
- [ ] Advanced UI features
  - [ ] Message editing
  - [ ] Message regeneration
  - [ ] Copy code blocks
  - [ ] Export chat
- [ ] Performance optimization
  - [ ] Message virtualization
  - [ ] Lazy loading history
  - [ ] Optimistic updates
- [ ] Error handling
  - [ ] Retry failed messages
  - [ ] Error boundaries
  - [ ] Fallback UI

## Database Schema Required
```sql
-- Stage 6
CREATE TABLE chat_threads (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  agent_id UUID NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY,
  thread_id UUID REFERENCES chat_threads(id),
  role TEXT NOT NULL,
  ui_message JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE chat_tool_events (
  id UUID PRIMARY KEY,
  thread_id UUID REFERENCES chat_threads(id),
  tool_slug TEXT NOT NULL,
  part JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## Testing Requirements
- [ ] Component tests
  - [ ] Message rendering
  - [ ] Input handling
  - [ ] Tool results
- [ ] Hook tests
  - [ ] useChat behavior
  - [ ] State management
- [ ] API tests
  - [ ] Streaming responses
  - [ ] Error handling
  - [ ] Tool execution
- [ ] E2E tests
  - [ ] Full chat flow
  - [ ] Tool interaction
  - [ ] Agent switching

## Verification Commands
```bash
# Stage 2
test -f app/api/chat/route.ts && grep "streamText" app/api/chat/route.ts
test -f "app/(app)/chat/page.tsx"

# Stage 3
grep "toolChoice\|tools" app/api/chat/route.ts
test -f components/chat/tool-result.tsx

# Stage 4
test -f components/chat/agent-selector.tsx

# Stage 6
echo "SELECT COUNT(*) FROM chat_messages;" | npx supabase db query
```

## Current Status
- Stage 1: N/A (chat not in stage 1)
- Stage 2: 🚧 Core implementation needed
- Stage 3-7: ⏳ Pending

## Dependencies
- Requires agents module (Stage 2)
- Requires tools module for tool integration (Stage 3)
- Requires database migration (Stage 6)