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
  duration_seconds INTEGER,
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ
);

-- Lead scoring events
CREATE TABLE IF NOT EXISTS lead_scoring_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  event_type TEXT NOT NULL, -- 'page_view', 'form_submit', 'email_open', 'link_click', 'chat_message', 'download'
  event_value INTEGER NOT NULL, -- Points to add to lead score
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PE firm enrichment data
CREATE TABLE IF NOT EXISTS pe_firms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_name TEXT NOT NULL UNIQUE,
  aum_millions NUMERIC,
  fund_size_millions NUMERIC,
  portfolio_companies INTEGER,
  investment_focus TEXT[],
  geographic_focus TEXT[],
  website TEXT,
  linkedin_url TEXT,
  key_contacts JSONB[], -- Array of {name, role, email, linkedin}
  last_enriched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automated outreach tracking
CREATE TABLE IF NOT EXISTS outreach_sequences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  sequence_type TEXT NOT NULL, -- 'assessment_nurture', 'sprint_followup', 'partnership_upsell', 'cold_outreach'
  current_step INTEGER DEFAULT 0,
  total_steps INTEGER NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'stopped', 'converted')),
  next_action_date TIMESTAMPTZ,
  conversion_event TEXT, -- What caused conversion
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email activity tracking
CREATE TABLE IF NOT EXISTS email_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  email_campaign_id UUID REFERENCES email_campaigns(id),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('sent', 'delivered', 'opened', 'clicked', 'replied', 'bounced', 'unsubscribed')),
  email_subject TEXT,
  link_clicked TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sprint and partnership tracking
CREATE TABLE IF NOT EXISTS engagements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  type TEXT NOT NULL CHECK (type IN ('assessment', 'sprint', 'partnership')),
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  value_usd INTEGER,
  start_date DATE,
  end_date DATE,
  deliverables JSONB,
  roi_achieved NUMERIC,
  testimonial TEXT,
  case_study_published BOOLEAN DEFAULT FALSE,
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics events for funnel tracking
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  lead_id UUID REFERENCES leads(id),
  event_name TEXT NOT NULL,
  event_category TEXT,
  page_path TEXT,
  page_title TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Growth experiments for A/B testing
CREATE TABLE IF NOT EXISTS growth_experiments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  experiment_name TEXT NOT NULL,
  variant TEXT NOT NULL,
  session_id TEXT NOT NULL,
  lead_id UUID REFERENCES leads(id),
  converted BOOLEAN DEFAULT FALSE,
  conversion_value NUMERIC,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_lifecycle_stage ON leads(lifecycle_stage);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_lead_score ON leads(lead_score DESC);
CREATE INDEX idx_high_intent_leads_email ON high_intent_leads(email);
CREATE INDEX idx_high_intent_leads_alert_sent ON high_intent_leads(alert_sent);
CREATE INDEX idx_chat_conversations_session ON chat_conversations(session_id);
CREATE INDEX idx_chat_conversations_lead ON chat_conversations(lead_id);
CREATE INDEX idx_lead_scoring_events_lead ON lead_scoring_events(lead_id);
CREATE INDEX idx_pe_firms_name ON pe_firms(firm_name);
CREATE INDEX idx_outreach_sequences_lead ON outreach_sequences(lead_id);
CREATE INDEX idx_outreach_sequences_status ON outreach_sequences(status);
CREATE INDEX idx_email_activity_lead ON email_activity(lead_id);
CREATE INDEX idx_engagements_lead ON engagements(lead_id);
CREATE INDEX idx_engagements_type_status ON engagements(type, status);
CREATE INDEX idx_analytics_events_session ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_lead ON analytics_events(lead_id);
CREATE INDEX idx_growth_experiments_session ON growth_experiments(session_id);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE high_intent_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_scoring_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE pe_firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagements ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_experiments ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Service role and authenticated users can insert (for lead capture)
-- Public can insert leads (for forms and chat)
CREATE POLICY "Public can insert leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert high intent leads" ON high_intent_leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert chat conversations" ON chat_conversations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert analytics events" ON analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert growth experiments" ON growth_experiments
  FOR INSERT WITH CHECK (true);

-- Service role has full access
CREATE POLICY "Service role full access to leads" ON leads
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role full access to high_intent_leads" ON high_intent_leads
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role full access to chat_conversations" ON chat_conversations
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role full access to lead_scoring_events" ON lead_scoring_events
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role full access to pe_firms" ON pe_firms
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role full access to outreach_sequences" ON outreach_sequences
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role full access to email_activity" ON email_activity
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role full access to engagements" ON engagements
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role full access to analytics_events" ON analytics_events
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role full access to growth_experiments" ON growth_experiments
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- Functions for lead scoring
CREATE OR REPLACE FUNCTION update_lead_score()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the lead's total score
  UPDATE leads 
  SET lead_score = (
    SELECT COALESCE(SUM(event_value), 0)
    FROM lead_scoring_events
    WHERE lead_id = NEW.lead_id
  ),
  updated_at = NOW()
  WHERE id = NEW.lead_id;
  
  -- Update lifecycle stage based on score
  UPDATE leads
  SET lifecycle_stage = CASE
    WHEN lead_score >= 100 THEN 'sql'
    WHEN lead_score >= 50 THEN 'mql'
    WHEN lead_score >= 20 THEN 'lead'
    ELSE 'subscriber'
  END
  WHERE id = NEW.lead_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update lead scores
CREATE TRIGGER update_lead_score_trigger
AFTER INSERT ON lead_scoring_events
FOR EACH ROW
EXECUTE FUNCTION update_lead_score();

-- Function to track high-intent leads
CREATE OR REPLACE FUNCTION track_high_intent()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this lead should be marked as high intent based on score
  IF NEW.lead_score >= 75 AND OLD.lead_score < 75 THEN
    INSERT INTO high_intent_leads (lead_id, email, firm_name, intent_score)
    VALUES (NEW.id, NEW.email, NEW.firm_name, NEW.lead_score)
    ON CONFLICT DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for high-intent detection
CREATE TRIGGER detect_high_intent_trigger
AFTER UPDATE OF lead_score ON leads
FOR EACH ROW
EXECUTE FUNCTION track_high_intent();