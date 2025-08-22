-- Enhanced tables for PE-focused growth engine

-- Generic leads table for all lead sources (consolidates different lead types)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  firm_name TEXT,
  contact_name TEXT,
  role TEXT,
  aum_range TEXT,
  portfolio_size INTEGER,
  source TEXT NOT NULL, -- 'chat_widget', 'assessment', 'contact_form', 'api', 'import'
  source_page TEXT, -- Which page they converted on
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  lead_score INTEGER DEFAULT 0,
  lifecycle_stage TEXT DEFAULT 'subscriber' CHECK (lifecycle_stage IN ('subscriber', 'lead', 'mql', 'sql', 'opportunity', 'customer', 'evangelist')),
  tags TEXT[],
  metadata JSONB, -- Flexible field for additional data
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email)
);

-- High-intent leads tracking
CREATE TABLE IF NOT EXISTS high_intent_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  email TEXT,
  firm_name TEXT,
  trigger_message TEXT,
  trigger_keyword TEXT,
  page TEXT,
  intent_score INTEGER DEFAULT 0,
  alert_sent BOOLEAN DEFAULT FALSE,
  alert_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat conversations for context
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  session_id TEXT NOT NULL,
  messages JSONB[], -- Array of {role, content, timestamp}
  page_started TEXT,
  high_intent_detected BOOLEAN DEFAULT FALSE,
  email_captured BOOLEAN DEFAULT FALSE,
  firm_captured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PE-specific scoring model
CREATE TABLE IF NOT EXISTS lead_scoring_rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_name TEXT NOT NULL,
  condition_type TEXT CHECK (condition_type IN ('page_visit', 'form_submit', 'chat_keyword', 'email_open', 'link_click', 'time_on_site')),
  condition_value TEXT, -- e.g., '/ai-sprint' for page_visit, 'pricing' for chat_keyword
  score_adjustment INTEGER NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default scoring rules for PE leads
INSERT INTO lead_scoring_rules (rule_name, condition_type, condition_value, score_adjustment) VALUES
  ('Visit AI Sprint Page', 'page_visit', '/ai-sprint', 20),
  ('Visit Partnership Page', 'page_visit', '/ai-partnership', 30),
  ('Submit Contact Form', 'form_submit', 'contact', 50),
  ('Chat Mentions Pricing', 'chat_keyword', 'pricing', 25),
  ('Chat Mentions Portfolio', 'chat_keyword', 'portfolio', 20),
  ('Chat Mentions Implementation', 'chat_keyword', 'implementation', 15),
  ('Visit Case Studies', 'page_visit', '/case-studies', 10),
  ('High Time on Site', 'time_on_site', '300', 15) -- 5+ minutes
ON CONFLICT DO NOTHING;

-- Analytics events table (simplified version)
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'link_click', 'form_submit', 'button_click', 'conversion', 'custom')),
  event_name TEXT NOT NULL,
  page_url TEXT,
  referrer_url TEXT,
  target_url TEXT,
  element_id TEXT,
  element_class TEXT,
  element_text TEXT,
  user_id UUID,
  session_id TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT
);

-- Engagement tracking for nurture campaigns
CREATE TABLE IF NOT EXISTS engagement_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  event_type TEXT CHECK (event_type IN ('email_sent', 'email_opened', 'email_clicked', 'chat_started', 'demo_requested', 'content_downloaded')),
  event_details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_lifecycle_stage ON leads(lifecycle_stage);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON leads(lead_score DESC);

CREATE INDEX IF NOT EXISTS idx_high_intent_leads_created_at ON high_intent_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_high_intent_leads_alert_sent ON high_intent_leads(alert_sent);

CREATE INDEX IF NOT EXISTS idx_chat_conversations_session_id ON chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_lead_id ON chat_conversations(lead_id);

CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_engagement_events_lead_id ON engagement_events(lead_id);
CREATE INDEX IF NOT EXISTS idx_engagement_events_created_at ON engagement_events(created_at DESC);

-- Update triggers
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_conversations_updated_at BEFORE UPDATE ON chat_conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE high_intent_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_scoring_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement_events ENABLE ROW LEVEL SECURITY;

-- Policies for leads table
CREATE POLICY "Public can insert leads" ON leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read leads" ON leads
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can update leads" ON leads
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Policies for high_intent_leads
CREATE POLICY "System can insert high intent leads" ON high_intent_leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read high intent leads" ON high_intent_leads
  FOR SELECT TO authenticated USING (true);

-- Policies for chat_conversations
CREATE POLICY "Public can insert chat conversations" ON chat_conversations
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read chat conversations" ON chat_conversations
  FOR SELECT TO authenticated USING (true);

-- Policies for analytics_events
CREATE POLICY "Anyone can insert analytics events" ON analytics_events
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read analytics events" ON analytics_events
  FOR SELECT TO authenticated USING (true);

-- Policies for engagement_events
CREATE POLICY "System can insert engagement events" ON engagement_events
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read engagement events" ON engagement_events
  FOR SELECT TO authenticated USING (true);

-- Policies for lead_scoring_rules (read-only for most users)
CREATE POLICY "Authenticated users can read scoring rules" ON lead_scoring_rules
  FOR SELECT TO authenticated USING (true);