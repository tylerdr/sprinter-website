-- Migration: Create leads and subscriptions tables for Stripe integration
-- Created: 2025-01-17

-- Leads table for tracking potential customers and workshop signups
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  company VARCHAR(255),
  role VARCHAR(255),
  phone VARCHAR(50),
  source VARCHAR(100), -- 'workshop', 'contact_form', 'newsletter', 'demo_request', etc.
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_term VARCHAR(255),
  utm_content VARCHAR(255),
  referrer_url TEXT,
  landing_page TEXT,
  ip_address INET,
  user_agent TEXT,
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'archived'
  score INTEGER DEFAULT 0, -- Lead scoring
  notes TEXT,
  metadata JSONB,
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  contacted_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ
);

-- Subscriptions table for tracking Stripe subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_customer_id VARCHAR(255) NOT NULL,
  stripe_price_id VARCHAR(255),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL, -- 'trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid', 'paused'
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  plan_name VARCHAR(255),
  plan_amount INTEGER, -- Amount in cents
  plan_currency VARCHAR(10),
  plan_interval VARCHAR(20), -- 'month', 'year', etc.
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workshop registrations table
CREATE TABLE IF NOT EXISTS workshop_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  workshop_date DATE NOT NULL,
  workshop_time TIME,
  workshop_type VARCHAR(100), -- '90-minute', 'half-day', 'full-day'
  topics TEXT[], -- Array of topics they're interested in
  company_size VARCHAR(50),
  current_challenges TEXT,
  stripe_session_id VARCHAR(255),
  payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  payment_amount INTEGER, -- Amount in cents
  attendance_status VARCHAR(50) DEFAULT 'registered', -- 'registered', 'attended', 'no-show', 'cancelled'
  zoom_link TEXT,
  calendar_invite_sent BOOLEAN DEFAULT false,
  reminder_sent BOOLEAN DEFAULT false,
  followup_sent BOOLEAN DEFAULT false,
  feedback_score INTEGER, -- 1-10 rating
  feedback_text TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email communications log
CREATE TABLE IF NOT EXISTS email_communications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  email_type VARCHAR(100) NOT NULL, -- 'welcome', 'workshop_confirmation', 'workshop_reminder', 'followup', 'newsletter', etc.
  subject VARCHAR(500),
  template_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'
  resend_id VARCHAR(255), -- Resend API email ID
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  bounced_at TIMESTAMPTZ,
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead activities/timeline
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  activity_type VARCHAR(100) NOT NULL, -- 'page_view', 'form_submit', 'email_open', 'workshop_register', etc.
  description TEXT,
  url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_stripe_customer ON leads(stripe_customer_id);

CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_customer ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_lead ON subscriptions(lead_id);

CREATE INDEX idx_workshop_lead ON workshop_registrations(lead_id);
CREATE INDEX idx_workshop_date ON workshop_registrations(workshop_date);
CREATE INDEX idx_workshop_payment ON workshop_registrations(payment_status);

CREATE INDEX idx_email_comm_lead ON email_communications(lead_id);
CREATE INDEX idx_email_comm_type ON email_communications(email_type);
CREATE INDEX idx_email_comm_status ON email_communications(status);

CREATE INDEX idx_lead_activities_lead ON lead_activities(lead_id);
CREATE INDEX idx_lead_activities_type ON lead_activities(activity_type);
CREATE INDEX idx_lead_activities_created ON lead_activities(created_at DESC);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow authenticated admins to manage leads
CREATE POLICY "Admins can manage leads" ON leads
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role IN ('super_admin', 'admin', 'editor')
      AND admin_profiles.is_active = true
    )
  );

-- Allow authenticated admins to view subscriptions
CREATE POLICY "Admins can view subscriptions" ON subscriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role IN ('super_admin', 'admin')
      AND admin_profiles.is_active = true
    )
  );

-- Allow system to manage subscriptions (for webhooks)
CREATE POLICY "System can manage subscriptions" ON subscriptions
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Similar policies for other tables
CREATE POLICY "Admins can manage workshops" ON workshop_registrations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role IN ('super_admin', 'admin')
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Admins can view emails" ON email_communications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role IN ('super_admin', 'admin')
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "System can manage emails" ON email_communications
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can view activities" ON lead_activities
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role IN ('super_admin', 'admin')
      AND admin_profiles.is_active = true
    )
  );

-- Triggers for updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workshop_updated_at BEFORE UPDATE ON workshop_registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Audit triggers
CREATE TRIGGER audit_leads AFTER INSERT OR UPDATE OR DELETE ON leads
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_subscriptions AFTER INSERT OR UPDATE OR DELETE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_workshops AFTER INSERT OR UPDATE OR DELETE ON workshop_registrations
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();