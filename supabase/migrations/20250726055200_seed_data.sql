-- Create default roles
INSERT INTO roles (id, tenant_id, slug, name, is_global_role) VALUES
  ('00000000-0000-0000-0000-000000000001', NULL, 'system_admin', 'System Administrator', true),
  ('00000000-0000-0000-0000-000000000002', NULL, 'tenant_admin', 'Tenant Administrator', true),
  ('00000000-0000-0000-0000-000000000003', NULL, 'user', 'User', true),
  ('00000000-0000-0000-0000-000000000004', NULL, 'guest', 'Guest', true)
ON CONFLICT (id) DO NOTHING;

-- Create default permissions for roles
-- System Admin - full access
INSERT INTO role_permissions (role_id, permission)
SELECT '00000000-0000-0000-0000-000000000001', unnest(enum_range(NULL::app_permission))
ON CONFLICT DO NOTHING;

-- Tenant Admin - full tenant access
INSERT INTO role_permissions (role_id, permission)
SELECT '00000000-0000-0000-0000-000000000002', permission
FROM unnest(enum_range(NULL::app_permission)) AS permission
WHERE permission::text LIKE '%.team.%' OR permission::text LIKE '%.own.%'
ON CONFLICT DO NOTHING;

-- User - standard permissions
INSERT INTO role_permissions (role_id, permission) VALUES
  ('00000000-0000-0000-0000-000000000003', 'chats.own.create'),
  ('00000000-0000-0000-0000-000000000003', 'chats.own.read'),
  ('00000000-0000-0000-0000-000000000003', 'chats.own.update'),
  ('00000000-0000-0000-0000-000000000003', 'chats.team.read'),
  ('00000000-0000-0000-0000-000000000003', 'messages.own.create'),
  ('00000000-0000-0000-0000-000000000003', 'messages.team.read'),
  ('00000000-0000-0000-0000-000000000003', 'entities.team.read'),
  ('00000000-0000-0000-0000-000000000003', 'documents.team.read'),
  ('00000000-0000-0000-0000-000000000003', 'users.own.read'),
  ('00000000-0000-0000-0000-000000000003', 'users.own.update')
ON CONFLICT DO NOTHING;

-- Guest - minimal permissions
INSERT INTO role_permissions (role_id, permission) VALUES
  ('00000000-0000-0000-0000-000000000004', 'chats.own.read'),
  ('00000000-0000-0000-0000-000000000004', 'entities.team.read'),
  ('00000000-0000-0000-0000-000000000004', 'users.own.read')
ON CONFLICT DO NOTHING;

-- Create default tenant
INSERT INTO tenants (id, slug, tenant_type, name) VALUES
  ('00000000-0000-0000-0000-000000000000', 'default', 'public', 'Default Tenant')
ON CONFLICT (id) DO NOTHING;

-- Create default verticals for the platform
INSERT INTO verticals (id, slug, name, description, deployment_type, config) VALUES
  ('00000000-0000-0000-0001-000000000001', 'cabinet-manufacturing', 'Cabinet Manufacturing', 'AI-powered cabinet manufacturing platform', 'platform', '{"primaryColor": "#00A878", "logo": "/verticals/cabby/logo.svg"}'),
  ('00000000-0000-0000-0001-000000000002', 'mortgage', 'Mortgage', 'AI-powered mortgage industry platform', 'platform', '{"primaryColor": "#2563EB", "logo": "/verticals/mortgage/logo.svg"}')
ON CONFLICT (id) DO NOTHING;