-- AI Sprinter Platform Chat Tables
-- Based on the AI Sprinter Platform architecture with entity-aware execution

-- ============================================
-- Core AI Tables (Agents, Tools, Relationships)
-- ============================================

-- Agents table for agent configurations
CREATE TABLE IF NOT EXISTS ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  provider TEXT NOT NULL DEFAULT 'openai',
  model TEXT NOT NULL DEFAULT 'gpt-4-turbo-preview',
  system_prompt TEXT,
  is_active BOOLEAN DEFAULT true,
  tags TEXT[] DEFAULT '{}',
  ai_config JSONB DEFAULT '{}',
  ui_config JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_agents_slug ON ai_agents(slug);
CREATE INDEX IF NOT EXISTS idx_ai_agents_active ON ai_agents(is_active) WHERE is_active = true;

-- Tools table for tool definitions
CREATE TABLE IF NOT EXISTS ai_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  input_schema JSONB NOT NULL DEFAULT '{}',
  output_schema JSONB DEFAULT '{}',
  execution_mode TEXT DEFAULT 'server', -- server, client, interactive
  is_active BOOLEAN DEFAULT true,
  ui_config JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_tools_slug ON ai_tools(slug);
CREATE INDEX IF NOT EXISTS idx_ai_tools_category ON ai_tools(category);
CREATE INDEX IF NOT EXISTS idx_ai_tools_active ON ai_tools(is_active) WHERE is_active = true;

-- Agent-Tool junction table
CREATE TABLE IF NOT EXISTS ai_agent_tools (
  agent_id UUID REFERENCES ai_agents(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES ai_tools(id) ON DELETE CASCADE,
  is_enabled BOOLEAN DEFAULT true,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (agent_id, tool_id)
);

-- ============================================
-- Entity System (Workspaces and Artifacts)
-- ============================================

-- Entity types define schemas for different entity kinds
CREATE TABLE IF NOT EXISTS entity_types (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  schema_json JSONB NOT NULL,
  ui_config_json JSONB DEFAULT '{}',
  version INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Entities are the core workspace/artifact containers
CREATE TABLE IF NOT EXISTS entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type_slug TEXT NOT NULL REFERENCES entity_types(slug),
  user_id UUID REFERENCES auth.users(id),
  workspace_id UUID REFERENCES entities(id) ON DELETE CASCADE, -- Parent workspace for hierarchy
  title TEXT,
  state_json JSONB DEFAULT '{}',
  state_version INT DEFAULT 1, -- Optimistic concurrency control
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entities_user ON entities(user_id);
CREATE INDEX IF NOT EXISTS idx_entities_workspace ON entities(workspace_id);
CREATE INDEX IF NOT EXISTS idx_entities_type ON entities(type_slug);

-- ============================================
-- Chat System (AI Sprinter Platform aligned)
-- ============================================

-- Chat sessions with workspace awareness
CREATE TABLE IF NOT EXISTS ai_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  agent_id UUID REFERENCES ai_agents(id),
  workspace_id UUID REFERENCES entities(id), -- Links to workspace entity
  title TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_chats_user ON ai_chats(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chats_agent ON ai_chats(agent_id);
CREATE INDEX IF NOT EXISTS idx_ai_chats_workspace ON ai_chats(workspace_id);

ALTER TABLE ai_chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create chats" ON ai_chats
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Users can view own chats" ON ai_chats
  FOR SELECT USING (
    ai_chats.user_id IS NULL OR ai_chats.user_id = auth.uid()
  );

CREATE POLICY "Users can update own chats" ON ai_chats
  FOR UPDATE USING (
    ai_chats.user_id IS NULL OR ai_chats.user_id = auth.uid()
  );

CREATE TRIGGER update_ai_chats_updated_at
  BEFORE UPDATE ON ai_chats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Messages with parts-based structure (AI SDK v5 compatible)
CREATE TABLE IF NOT EXISTS ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES ai_chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  parts JSONB NOT NULL DEFAULT '[]', -- Array of typed message parts
  token_count INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_messages_chat ON ai_messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_ai_messages_role ON ai_messages(role);
CREATE INDEX IF NOT EXISTS idx_ai_messages_created ON ai_messages(created_at DESC);

ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can add messages" ON ai_messages
  FOR INSERT TO anon, authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM ai_chats
      WHERE ai_chats.id = ai_messages.chat_id
        AND (ai_chats.user_id IS NULL OR ai_chats.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can view chat messages" ON ai_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ai_chats
      WHERE ai_chats.id = ai_messages.chat_id
        AND (ai_chats.user_id IS NULL OR ai_chats.user_id = auth.uid())
    )
  );

-- ============================================
-- Tool Execution Events (Entity-aware)
-- ============================================

-- Tool execution events with entity tracking
CREATE TABLE IF NOT EXISTS ai_tool_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Tool reference
  tool_id UUID REFERENCES ai_tools(id),
  tool_slug TEXT NOT NULL,
  tool_call_id TEXT,

  -- Chat/Message context
  chat_id UUID REFERENCES ai_chats(id) ON DELETE CASCADE,
  message_id UUID REFERENCES ai_messages(id),

  -- Entity context (workspace-aware)
  workspace_id UUID REFERENCES entities(id),
  entity_id UUID REFERENCES entities(id),
  entity_type_slug TEXT,

  -- Execution details
  input JSONB,
  output JSONB,
  error TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),

  -- Entity tracking (for audit)
  entity_snapshot_before JSONB,
  entity_patch JSONB,
  entity_snapshot_after JSONB,
  artifacts_created UUID[],

  -- Metadata
  duration_ms INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_ai_tool_events_tool_slug ON ai_tool_events(tool_slug);
CREATE INDEX IF NOT EXISTS idx_ai_tool_events_chat ON ai_tool_events(chat_id);
CREATE INDEX IF NOT EXISTS idx_ai_tool_events_workspace ON ai_tool_events(workspace_id);
CREATE INDEX IF NOT EXISTS idx_ai_tool_events_entity ON ai_tool_events(entity_id);
CREATE INDEX IF NOT EXISTS idx_ai_tool_events_status ON ai_tool_events(status);
CREATE INDEX IF NOT EXISTS idx_ai_tool_events_created ON ai_tool_events(created_at DESC);

ALTER TABLE ai_tool_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can log tool events" ON ai_tool_events
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Users can view related tool events" ON ai_tool_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ai_chats
      WHERE ai_chats.id = ai_tool_events.chat_id
        AND (ai_chats.user_id IS NULL OR ai_chats.user_id = auth.uid())
    )
    OR
    EXISTS (
      SELECT 1 FROM entities
      WHERE entities.id IN (ai_tool_events.workspace_id, ai_tool_events.entity_id)
        AND (entities.user_id IS NULL OR entities.user_id = auth.uid())
    )
  );

-- ============================================
-- Entity Audit Log
-- ============================================

CREATE TABLE IF NOT EXISTS ai_entity_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  version INT NOT NULL,
  state_json JSONB NOT NULL,
  patch_json JSONB,
  actor_id UUID REFERENCES auth.users(id),
  actor_type TEXT DEFAULT 'user', -- user, tool, system
  tool_event_id UUID REFERENCES ai_tool_events(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_entity_audit_entity ON ai_entity_audit(entity_id);
CREATE INDEX IF NOT EXISTS idx_ai_entity_audit_created ON ai_entity_audit(created_at DESC);

-- Trigger to automatically create audit records
CREATE OR REPLACE FUNCTION audit_entity_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND OLD.state_json IS DISTINCT FROM NEW.state_json) THEN
    INSERT INTO ai_entity_audit (
      entity_id,
      version,
      state_json,
      patch_json,
      actor_type
    ) VALUES (
      NEW.id,
      NEW.state_version,
      NEW.state_json,
      jsonb_diff(OLD.state_json, NEW.state_json),
      'system'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_entities_changes
AFTER UPDATE ON entities
FOR EACH ROW
EXECUTE FUNCTION audit_entity_changes();

-- ============================================
-- Seed Data
-- ============================================

-- Insert default agents
INSERT INTO ai_agents (slug, name, description, provider, model, system_prompt)
VALUES
  ('general-assistant', 'General Assistant', 'A helpful AI assistant for general inquiries', 'openai', 'gpt-4-turbo-preview',
   'You are a helpful AI assistant. Be concise and accurate in your responses.'),
  ('sprint-planner', 'Sprint Planner', 'AI agent specialized in sprint planning and agile methodology', 'openai', 'gpt-4-turbo-preview',
   'You are an expert in agile methodology and sprint planning. Help users plan and organize their development sprints effectively.')
ON CONFLICT (slug) DO NOTHING;

-- Insert basic entity types
INSERT INTO entity_types (slug, name, schema_json)
VALUES
  ('workspace.general', 'General Workspace', '{"type": "object", "properties": {"name": {"type": "string"}, "description": {"type": "string"}}}'::jsonb),
  ('analysis.result', 'Analysis Result', '{"type": "object", "properties": {"summary": {"type": "string"}, "data": {"type": "object"}}}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- Note: jsonb_diff function for audit
CREATE OR REPLACE FUNCTION jsonb_diff(old_val JSONB, new_val JSONB)
RETURNS JSONB AS $$
DECLARE
  result JSONB := '{}'::JSONB;
  key TEXT;
BEGIN
  -- Add changed and new keys
  FOR key IN SELECT jsonb_object_keys(new_val)
  LOOP
    IF NOT old_val ? key OR old_val->key IS DISTINCT FROM new_val->key THEN
      result := result || jsonb_build_object(key, new_val->key);
    END IF;
  END LOOP;

  -- Add deleted keys as null
  FOR key IN SELECT jsonb_object_keys(old_val)
  LOOP
    IF NOT new_val ? key THEN
      result := result || jsonb_build_object(key, NULL);
    END IF;
  END LOOP;

  RETURN result;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Allow service role to manage lead activities if table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'lead_activities') THEN
    CREATE POLICY "Service role can manage lead activities" ON lead_activities
      FOR ALL USING (auth.role() = 'service_role')
      WITH CHECK (auth.role() = 'service_role');
  END IF;
END $$;
