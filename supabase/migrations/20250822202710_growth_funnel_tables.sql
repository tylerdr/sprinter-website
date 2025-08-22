-- Create tables for the growth funnel and lead management

-- Contact leads table
CREATE TABLE IF NOT EXISTS contact_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  project_type TEXT,
  source TEXT DEFAULT 'contact_form',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Assessment leads table
CREATE TABLE IF NOT EXISTS ai_assessment_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT,
  aum TEXT,
  portfolio_size TEXT,
  ai_adoption TEXT,
  biggest_challenge TEXT,
  primary_interest TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'report_sent', 'opened', 'engaged', 'converted')),
  report_url TEXT,
  report_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email campaigns table for outreach tracking
CREATE TABLE IF NOT EXISTS email_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  target_email TEXT NOT NULL,
  target_name TEXT,
  target_company TEXT,
  template_key TEXT NOT NULL,
  personalization_data JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'opened', 'clicked', 'replied', 'unsubscribed', 'bounced')),
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deal flow tracking table
CREATE TABLE IF NOT EXISTS deal_flow (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_email TEXT,
  contact_name TEXT,
  fund_size TEXT,
  investment_thesis TEXT,
  ai_opportunity_score INTEGER,
  estimated_value TEXT,
  stage TEXT DEFAULT 'discovery' CHECK (stage IN ('discovery', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost')),
  next_steps TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_leads_email ON contact_leads(email);
CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON contact_leads(status);
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_assessment_leads_email ON ai_assessment_leads(email);
CREATE INDEX IF NOT EXISTS idx_assessment_leads_status ON ai_assessment_leads(status);
CREATE INDEX IF NOT EXISTS idx_assessment_leads_created_at ON ai_assessment_leads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_email_campaigns_target_email ON email_campaigns(target_email);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON email_campaigns(status);

CREATE INDEX IF NOT EXISTS idx_deal_flow_stage ON deal_flow(stage);
CREATE INDEX IF NOT EXISTS idx_deal_flow_created_at ON deal_flow(created_at DESC);

-- Add trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contact_leads_updated_at BEFORE UPDATE ON contact_leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_assessment_leads_updated_at BEFORE UPDATE ON ai_assessment_leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_campaigns_updated_at BEFORE UPDATE ON email_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deal_flow_updated_at BEFORE UPDATE ON deal_flow
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_assessment_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_flow ENABLE ROW LEVEL SECURITY;

-- Create policies (allowing public insert for lead capture, authenticated users can read)
CREATE POLICY "Public can insert contact leads" ON contact_leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read contact leads" ON contact_leads
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public can insert assessment leads" ON ai_assessment_leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read assessment leads" ON ai_assessment_leads
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can manage email campaigns" ON email_campaigns
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can manage deal flow" ON deal_flow
  FOR ALL TO authenticated USING (true) WITH CHECK (true);