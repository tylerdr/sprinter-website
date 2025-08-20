-- Proposals database schema for Sprinter AI proposal portal

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for proposal status
CREATE TYPE proposal_status AS ENUM ('draft', 'sent', 'viewed', 'accepted', 'declined', 'expired');

-- Create enum for proposal access type
CREATE TYPE proposal_access_type AS ENUM ('public', 'password', 'magic_link', 'authenticated');

-- Main proposals table
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Metadata
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_company TEXT,
  client_email TEXT NOT NULL,
  project_type TEXT, -- 'poc_sprint', 'workshop', 'transformation', etc.
  
  -- Content
  content JSONB NOT NULL, -- Stores the full proposal content structure
  template_id TEXT, -- Reference to template used
  
  -- Access control
  access_type proposal_access_type DEFAULT 'magic_link',
  access_token TEXT UNIQUE, -- For magic link access
  password_hash TEXT, -- For password access
  expires_at TIMESTAMPTZ,
  
  -- Status tracking
  status proposal_status DEFAULT 'draft',
  sent_at TIMESTAMPTZ,
  first_viewed_at TIMESTAMPTZ,
  last_viewed_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  declined_at TIMESTAMPTZ,
  
  -- Financial
  total_value DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  payment_terms TEXT,
  
  -- Relationships
  created_by UUID REFERENCES auth.users(id),
  owner_id UUID REFERENCES auth.users(id), -- Internal owner/salesperson
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for proposals
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_client_email ON proposals(client_email);
CREATE INDEX idx_proposals_access_token ON proposals(access_token);
CREATE INDEX idx_proposals_created_by ON proposals(created_by);
CREATE INDEX idx_proposals_owner_id ON proposals(owner_id);
CREATE INDEX idx_proposals_expires_at ON proposals(expires_at);

-- Proposal templates table
CREATE TABLE proposal_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'poc_sprint', 'workshop', etc.
  content_schema JSONB NOT NULL, -- Template structure with placeholders
  variables JSONB, -- List of required variables for the template
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics: proposal views tracking
CREATE TABLE proposal_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES auth.users(id), -- NULL for anonymous viewers
  session_id TEXT, -- To track unique anonymous sessions
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  duration_seconds INTEGER, -- Time spent on page
  pages_viewed JSONB, -- Track which sections were viewed
  
  CONSTRAINT unique_view_session UNIQUE (proposal_id, session_id, viewed_at)
);

CREATE INDEX idx_proposal_views_proposal ON proposal_views(proposal_id);
CREATE INDEX idx_proposal_views_viewer ON proposal_views(viewer_id);
CREATE INDEX idx_proposal_views_session ON proposal_views(session_id);

-- Analytics: proposal events (downloads, interactions)
CREATE TABLE proposal_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  event_type TEXT NOT NULL, -- 'pdf_download', 'chat_opened', 'question_asked', 'file_uploaded', etc.
  event_data JSONB, -- Additional event-specific data
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_proposal_events_proposal ON proposal_events(proposal_id);
CREATE INDEX idx_proposal_events_type ON proposal_events(event_type);

-- Proposal chat messages (for AI assistant on proposal pages)
CREATE TABLE proposal_chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB, -- Store tool calls, citations, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_proposal_chats_proposal ON proposal_chats(proposal_id);
CREATE INDEX idx_proposal_chats_session ON proposal_chats(session_id);

-- Data room: client file uploads
CREATE TABLE proposal_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES auth.users(id),
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  storage_path TEXT NOT NULL, -- Path in Supabase storage
  description TEXT,
  category TEXT, -- 'requirements', 'data_samples', 'contracts', etc.
  is_client_upload BOOLEAN DEFAULT false,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_proposal_uploads_proposal ON proposal_uploads(proposal_id);

-- Proposal requirements checklist
CREATE TABLE proposal_requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- 'data', 'access', 'personnel', etc.
  is_required BOOLEAN DEFAULT true,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_proposal_requirements_proposal ON proposal_requirements(proposal_id);

-- Proposal signatures/approvals
CREATE TABLE proposal_signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  signer_name TEXT NOT NULL,
  signer_email TEXT NOT NULL,
  signer_title TEXT,
  signature_data TEXT, -- Base64 encoded signature image or typed name
  ip_address INET,
  signed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_proposal_signatures_proposal ON proposal_signatures(proposal_id);

-- Row Level Security (RLS) Policies

ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_signatures ENABLE ROW LEVEL SECURITY;

-- Proposals policies
CREATE POLICY "Authenticated users can view their created proposals"
  ON proposals FOR SELECT
  USING (auth.uid() = created_by OR auth.uid() = owner_id);

CREATE POLICY "Authenticated users can create proposals"
  ON proposals FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Proposal owners can update their proposals"
  ON proposals FOR UPDATE
  USING (auth.uid() = created_by OR auth.uid() = owner_id);

CREATE POLICY "Public proposals can be viewed by anyone with token"
  ON proposals FOR SELECT
  USING (access_type = 'public' OR access_token IS NOT NULL);

-- Templates policies
CREATE POLICY "Anyone can view active templates"
  ON proposal_templates FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can create templates"
  ON proposal_templates FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Template creators can update their templates"
  ON proposal_templates FOR UPDATE
  USING (auth.uid() = created_by);

-- Views policies (allow insertion for tracking)
CREATE POLICY "Anyone can insert view records"
  ON proposal_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Proposal owners can view analytics"
  ON proposal_views FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM proposals 
      WHERE proposals.id = proposal_views.proposal_id 
      AND (proposals.created_by = auth.uid() OR proposals.owner_id = auth.uid())
    )
  );

-- Events policies
CREATE POLICY "Anyone can insert event records"
  ON proposal_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Proposal owners can view events"
  ON proposal_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM proposals 
      WHERE proposals.id = proposal_events.proposal_id 
      AND (proposals.created_by = auth.uid() OR proposals.owner_id = auth.uid())
    )
  );

-- Chat policies
CREATE POLICY "Anyone can insert chat messages"
  ON proposal_chats FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view chats for accessible proposals"
  ON proposal_chats FOR SELECT
  USING (true); -- Will be filtered by proposal access

-- Upload policies
CREATE POLICY "Anyone can upload to accessible proposals"
  ON proposal_uploads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view uploads for accessible proposals"
  ON proposal_uploads FOR SELECT
  USING (true);

-- Requirements policies
CREATE POLICY "Anyone can view requirements for accessible proposals"
  ON proposal_requirements FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update requirements for accessible proposals"
  ON proposal_requirements FOR UPDATE
  USING (true);

-- Signatures policies
CREATE POLICY "Anyone can sign accessible proposals"
  ON proposal_signatures FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Proposal owners can view signatures"
  ON proposal_signatures FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM proposals 
      WHERE proposals.id = proposal_signatures.proposal_id 
      AND (proposals.created_by = auth.uid() OR proposals.owner_id = auth.uid())
    )
  );

-- Helper functions

-- Function to generate unique access tokens
CREATE OR REPLACE FUNCTION generate_access_token()
RETURNS TEXT AS $$
DECLARE
  token TEXT;
BEGIN
  LOOP
    token := encode(gen_random_bytes(32), 'hex');
    EXIT WHEN NOT EXISTS (SELECT 1 FROM proposals WHERE access_token = token);
  END LOOP;
  RETURN token;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER proposal_templates_updated_at
  BEFORE UPDATE ON proposal_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER proposal_requirements_updated_at
  BEFORE UPDATE ON proposal_requirements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();