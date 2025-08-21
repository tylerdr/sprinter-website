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
  follow_ups_sent INTEGER DEFAULT 0,
  next_follow_up_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stripe customers and subscriptions
CREATE TABLE IF NOT EXISTS stripe_customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_customer_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  status TEXT NOT NULL,
  amount INTEGER, -- in cents
  currency TEXT DEFAULT 'usd',
  interval TEXT, -- 'month' or 'year'
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (stripe_customer_id) REFERENCES stripe_customers(stripe_customer_id)
);

-- Growth metrics tracking
CREATE TABLE IF NOT EXISTS growth_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  metric_type TEXT NOT NULL,
  metric_value NUMERIC,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead nurture sequences
CREATE TABLE IF NOT EXISTS lead_nurture_sequences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_email TEXT NOT NULL,
  sequence_name TEXT NOT NULL,
  current_step INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'unsubscribed')),
  next_action_date TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_contact_leads_email ON contact_leads(email);
CREATE INDEX idx_contact_leads_status ON contact_leads(status);
CREATE INDEX idx_ai_assessment_leads_email ON ai_assessment_leads(email);
CREATE INDEX idx_ai_assessment_leads_status ON ai_assessment_leads(status);
CREATE INDEX idx_email_campaigns_target_email ON email_campaigns(target_email);
CREATE INDEX idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX idx_stripe_customers_email ON stripe_customers(email);
CREATE INDEX idx_growth_metrics_date ON growth_metrics(date);
CREATE INDEX idx_growth_metrics_type ON growth_metrics(metric_type);

-- RLS Policies (keeping data secure)
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_assessment_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_nurture_sequences ENABLE ROW LEVEL SECURITY;

-- Service role can access everything
CREATE POLICY "Service role has full access to contact_leads" ON contact_leads
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role has full access to ai_assessment_leads" ON ai_assessment_leads
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role has full access to email_campaigns" ON email_campaigns
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role has full access to stripe_customers" ON stripe_customers
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role has full access to stripe_subscriptions" ON stripe_subscriptions
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role has full access to growth_metrics" ON growth_metrics
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role has full access to lead_nurture_sequences" ON lead_nurture_sequences
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');