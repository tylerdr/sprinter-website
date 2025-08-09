-- Extensions already enabled in initial schema

-- Add generated columns for full-text search
ALTER TABLE entities ADD COLUMN IF NOT EXISTS fts tsvector GENERATED ALWAYS AS (to_tsvector('english'::regconfig, content)) STORED;
CREATE INDEX IF NOT EXISTS entities_fts_idx ON entities USING gin(fts);

ALTER TABLE chunks ADD COLUMN IF NOT EXISTS fts tsvector GENERATED ALWAYS AS (to_tsvector('english'::regconfig, content)) STORED;
CREATE INDEX IF NOT EXISTS chunks_fts_idx ON chunks USING gin(fts);

-- RLS Functions for dual auth support (Clerk and Supabase)
-- Function to get the current user ID (supports both Clerk and Supabase)
CREATE OR REPLACE FUNCTION public.requesting_user_id()
RETURNS TEXT AS $$
  -- First try Clerk ID from JWT
  SELECT COALESCE(
    nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::text,
    -- Fall back to Supabase auth.uid()
    auth.uid()::text
  );
$$ LANGUAGE sql STABLE;

-- Function to get the user's profile ID
CREATE OR REPLACE FUNCTION public.requesting_profile_id()
RETURNS UUID AS $$
  SELECT id FROM profiles WHERE user_id = requesting_user_id() LIMIT 1;
$$ LANGUAGE sql STABLE;

-- Function to get the active tenant ID
CREATE OR REPLACE FUNCTION public.get_active_tenant_id()
RETURNS UUID AS $$
  SELECT COALESCE(
    -- Try to get from profile
    (SELECT active_tenant_id FROM profiles WHERE user_id = requesting_user_id() LIMIT 1),
    -- Default to zero UUID if no tenant
    '00000000-0000-0000-0000-000000000000'::uuid
  );
$$ LANGUAGE sql STABLE;

-- Function to check if the current user is a tenant member
CREATE OR REPLACE FUNCTION public.is_tenant_member(check_tenant_id UUID DEFAULT NULL)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM user_tenants 
    WHERE user_id = requesting_profile_id() 
    AND tenant_id = COALESCE(check_tenant_id, get_active_tenant_id())
  );
$$ LANGUAGE sql STABLE;

-- Create the user_permissions view first since it's needed by check_permission function
CREATE VIEW user_permissions AS
SELECT DISTINCT
  ut.user_id,
  ut.tenant_id,
  ut.role_id,
  r.slug as role_slug,
  r.name as role_name,
  r.is_global_role,
  rp.permission,
  ut.created_at
FROM user_tenants ut
JOIN roles r ON ut.role_id = r.id
JOIN role_permissions rp ON r.id = rp.role_id;

-- Function to check permissions
CREATE OR REPLACE FUNCTION public.check_permission(required_permission app_permission, check_tenant_id UUID DEFAULT NULL)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM user_permissions 
    WHERE user_id = requesting_profile_id()
    AND tenant_id = COALESCE(check_tenant_id, get_active_tenant_id())
    AND permission = required_permission
  );
$$ LANGUAGE sql STABLE;

-- Function to check entity access (for visibility levels)
CREATE OR REPLACE FUNCTION public.check_entity_access(entity_id UUID, access_type TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  entity_record RECORD;
  profile_id UUID;
BEGIN
  profile_id := requesting_profile_id();
  
  -- Get entity details
  SELECT e.*, et.visibility as type_visibility 
  INTO entity_record
  FROM entities e
  JOIN entity_types et ON e.entity_type_id = et.id
  WHERE e.id = entity_id;
  
  -- If entity doesn't exist, deny access
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Check visibility levels
  CASE entity_record.visibility
    WHEN 'public' THEN
      RETURN TRUE;
    WHEN 'private' THEN
      RETURN entity_record.owner_id = profile_id;
    WHEN 'team' THEN
      RETURN is_tenant_member(entity_record.tenant_id);
    WHEN 'shared' THEN
      RETURN entity_record.owner_id = profile_id 
        OR is_tenant_member(entity_record.tenant_id)
        OR profile_id = ANY(entity_record.shared_with);
    ELSE
      RETURN FALSE;
  END CASE;
END;
$$ LANGUAGE plpgsql STABLE;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.requesting_user_id() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.requesting_profile_id() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.get_active_tenant_id() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.is_tenant_member(UUID) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_permission(app_permission, UUID) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_entity_access(UUID, TEXT) TO authenticated, anon;

-- Enable RLS on key tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_invocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_datasets ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies
-- Users can see their own record
CREATE POLICY "Users can view own record" ON users
  FOR SELECT USING (id = requesting_user_id());

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (user_id = requesting_user_id());

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (user_id = requesting_user_id());

-- Tenants policies
CREATE POLICY "Users can view their tenants" ON tenants
  FOR SELECT USING (is_tenant_member(id));

-- Chats policies
CREATE POLICY "Users can view team chats" ON chats
  FOR SELECT USING (
    tenant_id = get_active_tenant_id() 
    AND check_permission('chats.team.read'::app_permission)
  );

CREATE POLICY "Users can create team chats" ON chats
  FOR INSERT WITH CHECK (
    tenant_id = get_active_tenant_id() 
    AND check_permission('chats.team.create'::app_permission)
  );

-- Messages policies
CREATE POLICY "Users can view messages in accessible chats" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chats
      WHERE chats.id = messages.chat_id
      AND chats.tenant_id = get_active_tenant_id()
      AND check_permission('messages.team.read'::app_permission)
    )
  );

CREATE POLICY "Users can create messages in accessible chats" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM chats
      WHERE chats.id = messages.chat_id
      AND chats.tenant_id = get_active_tenant_id()
      AND check_permission('messages.team.create'::app_permission)
    )
  );

-- Chunks policies
CREATE POLICY "Allow read access for all users" ON "chunks" AS PERMISSIVE FOR SELECT TO public USING (true);

-- Entities policies
CREATE POLICY "entities_select" ON "entities" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (check_entity_access(id, 'read'::text));
CREATE POLICY "entities_insert" ON "entities" AS PERMISSIVE FOR INSERT TO "authenticated";
CREATE POLICY "entities_update" ON "entities" AS PERMISSIVE FOR UPDATE TO "authenticated";
CREATE POLICY "entities_delete" ON "entities" AS PERMISSIVE FOR DELETE TO "authenticated";

CREATE POLICY "Users can create team entities" ON entities
  FOR INSERT WITH CHECK (
    tenant_id = get_active_tenant_id()
    AND check_permission('entities.team.create'::app_permission)
  );

-- Documents policies  
CREATE POLICY "Users can view team documents" ON documents
  FOR SELECT USING (
    tenant_id = get_active_tenant_id()
    AND check_permission('documents.team.read'::app_permission)
  );

-- User tenants policies
CREATE POLICY "Users can view own memberships" ON user_tenants
  FOR SELECT USING (user_id = requesting_profile_id());

-- Roles policies
CREATE POLICY "Users can view roles" ON roles
  FOR SELECT USING (
    tenant_id IS NULL -- Global roles
    OR is_tenant_member(tenant_id)
  );

-- Role permissions policies
CREATE POLICY "Users can view role permissions" ON role_permissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM roles r
      WHERE r.id = role_permissions.role_id
      AND (r.tenant_id IS NULL OR is_tenant_member(r.tenant_id))
    )
  );

-- Allow anon/public access to waitlist
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT TO anon, public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view waitlist" ON waitlist
  FOR SELECT TO authenticated
  USING (true);