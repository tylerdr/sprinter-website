-- Fix RLS policies for better security
-- This migration removes overly permissive RLS policies and replaces them with more secure ones

-- Drop the problematic proposals policy that allows access to any proposal with a token
DROP POLICY IF EXISTS "Public proposals can be viewed by anyone with token" ON proposals;

-- Replace with a more restrictive policy for public proposals only
CREATE POLICY "Public proposals can be viewed by anyone"
  ON proposals FOR SELECT
  USING (access_type = 'public');

-- Note: Magic link and password access will be handled in the application layer
-- This prevents enumeration attacks via the Supabase API

-- Fix chat policies - restrict to proposal owners and creators
DROP POLICY IF EXISTS "Anyone can view chats for accessible proposals" ON proposal_chats;

CREATE POLICY "Proposal owners can view chats"
  ON proposal_chats FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM proposals 
      WHERE proposals.id = proposal_chats.proposal_id 
      AND (proposals.created_by = auth.uid() OR proposals.owner_id = auth.uid())
    )
  );

-- Fix requirements update policy - only proposal owners can update
DROP POLICY IF EXISTS "Anyone can update requirements for accessible proposals" ON proposal_requirements;

CREATE POLICY "Proposal owners can update requirements"
  ON proposal_requirements FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM proposals 
      WHERE proposals.id = proposal_requirements.proposal_id 
      AND (proposals.created_by = auth.uid() OR proposals.owner_id = auth.uid())
    )
  );

-- Fix requirements view policy
DROP POLICY IF EXISTS "Anyone can view requirements for accessible proposals" ON proposal_requirements;

CREATE POLICY "Proposal owners can view requirements"
  ON proposal_requirements FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM proposals 
      WHERE proposals.id = proposal_requirements.proposal_id 
      AND (proposals.created_by = auth.uid() OR proposals.owner_id = auth.uid())
    )
  );

-- Fix uploads view policy
DROP POLICY IF EXISTS "Anyone can view uploads for accessible proposals" ON proposal_uploads;

CREATE POLICY "Proposal owners can view uploads"
  ON proposal_uploads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM proposals 
      WHERE proposals.id = proposal_uploads.proposal_id 
      AND (proposals.created_by = auth.uid() OR proposals.owner_id = auth.uid())
    )
  );

-- Fix uploads insert policy
DROP POLICY IF EXISTS "Anyone can upload to accessible proposals" ON proposal_uploads;

CREATE POLICY "Proposal owners can upload files"
  ON proposal_uploads FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM proposals 
      WHERE proposals.id = proposal_uploads.proposal_id 
      AND (proposals.created_by = auth.uid() OR proposals.owner_id = auth.uid())
    )
  );

-- Add index on created_by field if not exists
CREATE INDEX IF NOT EXISTS idx_proposals_created_by ON proposals(created_by);

-- Add database triggers for view tracking as discussed in the review
-- This handles the first_viewed_at and last_viewed_at updates
CREATE OR REPLACE FUNCTION mark_first_viewed()
RETURNS trigger AS $$
BEGIN
  UPDATE proposals 
  SET first_viewed_at = NEW.viewed_at, last_viewed_at = NEW.viewed_at
  WHERE id = NEW.proposal_id
    AND first_viewed_at IS NULL;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_last_viewed()
RETURNS trigger AS $$
BEGIN
  UPDATE proposals SET last_viewed_at = NEW.viewed_at WHERE id = NEW.proposal_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers if they don't exist
DROP TRIGGER IF EXISTS trg_mark_first_viewed ON proposal_views;
CREATE TRIGGER trg_mark_first_viewed
  AFTER INSERT ON proposal_views
  FOR EACH ROW EXECUTE FUNCTION mark_first_viewed();

DROP TRIGGER IF EXISTS trg_update_last_viewed ON proposal_views;
CREATE TRIGGER trg_update_last_viewed
  AFTER INSERT ON proposal_views
  FOR EACH ROW EXECUTE FUNCTION update_last_viewed();