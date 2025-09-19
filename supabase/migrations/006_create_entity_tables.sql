-- Create tables for all core entity types
-- This migration creates the actual storage tables for entities

-- ============================================
-- CUSTOMERS TABLE (Workspace Entity)
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT DEFAULT 'customer',
  tenant_id INTEGER,

  -- Core fields
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('enterprise', 'mid-market', 'smb', 'startup')),
  status TEXT NOT NULL DEFAULT 'prospect' CHECK (status IN ('active', 'inactive', 'prospect', 'churned')),

  -- Business fields
  industry TEXT,
  website TEXT,
  logo TEXT,

  -- JSON fields
  contacts JSONB DEFAULT '[]',
  billing JSONB DEFAULT '{}',
  subscription JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),

  -- Search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(industry, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(slug, '')), 'C')
  ) STORED
);

CREATE INDEX idx_customers_slug ON customers(slug);
CREATE INDEX idx_customers_type ON customers(type);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_tenant ON customers(tenant_id);
CREATE INDEX idx_customers_search ON customers USING GIN(search_vector);

-- ============================================
-- PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT DEFAULT 'project',
  tenant_id INTEGER,

  -- Relationships
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,

  -- Core fields
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('implementation', 'consulting', 'support', 'custom')),
  status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'on-hold', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),

  -- Content
  description TEXT,
  objectives TEXT[],

  -- JSON fields
  deliverables JSONB DEFAULT '[]',
  timeline JSONB DEFAULT '{}',
  budget JSONB DEFAULT '{}',
  team UUID[] DEFAULT '{}',
  documents UUID[] DEFAULT '{}',
  risks JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),

  CONSTRAINT projects_unique_slug UNIQUE (customer_id, slug)
);

CREATE INDEX idx_projects_customer ON projects(customer_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_priority ON projects(priority);
CREATE INDEX idx_projects_type ON projects(type);

-- ============================================
-- DOCUMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT DEFAULT 'document',
  tenant_id INTEGER,

  -- Core fields
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('pdf', 'invoice', 'contract', 'report', 'presentation', 'spreadsheet', 'other')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'processed', 'failed', 'archived')),
  source TEXT NOT NULL CHECK (source IN ('upload', 'email', 'api', 'scan', 'generated')),

  -- File info
  mime_type TEXT,
  size BIGINT,
  url TEXT,
  thumbnail_url TEXT,

  -- JSON fields
  extracted_data JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  classification JSONB DEFAULT '{}',
  validation JSONB DEFAULT '{}',
  processing JSONB DEFAULT '{}',
  related_entities JSONB DEFAULT '[]',
  permissions JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),

  -- Search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(extracted_data->>'text', '')), 'D')
  ) STORED
);

CREATE INDEX idx_documents_type ON documents(type);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_source ON documents(source);
CREATE INDEX idx_documents_tenant ON documents(tenant_id);
CREATE INDEX idx_documents_created ON documents(created_at);
CREATE INDEX idx_documents_search ON documents USING GIN(search_vector);
CREATE INDEX idx_documents_extracted ON documents USING GIN(extracted_data);

-- ============================================
-- WORKFLOWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT DEFAULT 'workflow',
  tenant_id INTEGER,

  -- Core fields
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('automation', 'approval', 'integration', 'notification', 'custom')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'archived')),

  -- JSON fields
  trigger JSONB NOT NULL DEFAULT '{}',
  steps JSONB NOT NULL DEFAULT '[]',
  variables JSONB DEFAULT '{}',
  schedule JSONB DEFAULT '{}',
  execution JSONB DEFAULT '{}',
  permissions JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_workflows_slug ON workflows(slug);
CREATE INDEX idx_workflows_type ON workflows(type);
CREATE INDEX idx_workflows_status ON workflows(status);
CREATE INDEX idx_workflows_tenant ON workflows(tenant_id);

-- ============================================
-- INVOICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT DEFAULT 'invoice',
  tenant_id INTEGER,

  -- Relationships
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,

  -- Core fields
  invoice_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled', 'refunded')),
  type TEXT NOT NULL DEFAULT 'standard' CHECK (type IN ('standard', 'recurring', 'credit', 'proforma')),
  currency TEXT DEFAULT 'USD',

  -- JSON fields
  dates JSONB NOT NULL DEFAULT '{}',
  line_items JSONB NOT NULL DEFAULT '[]',
  totals JSONB NOT NULL DEFAULT '{}',
  payment JSONB DEFAULT '{}',
  notes TEXT,
  attachments TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_invoices_number ON invoices(invoice_number);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_type ON invoices(type);
CREATE INDEX idx_invoices_dates ON invoices USING GIN(dates);

-- ============================================
-- TEAM MEMBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT DEFAULT 'team-member',
  tenant_id INTEGER,

  -- Auth relationship
  user_id UUID REFERENCES auth.users(id),

  -- Core fields
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  display_name TEXT,
  avatar TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'manager', 'member', 'viewer')),
  department TEXT,
  title TEXT,
  status TEXT NOT NULL DEFAULT 'invited' CHECK (status IN ('active', 'inactive', 'invited', 'suspended')),

  -- JSON fields
  permissions TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  availability JSONB DEFAULT '{}',
  contact JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',

  -- Activity
  last_active TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_team_members_user ON team_members(user_id);
CREATE INDEX idx_team_members_email ON team_members(email);
CREATE INDEX idx_team_members_role ON team_members(role);
CREATE INDEX idx_team_members_status ON team_members(status);
CREATE INDEX idx_team_members_department ON team_members(department);
CREATE INDEX idx_team_members_tenant ON team_members(tenant_id);

-- ============================================
-- TASKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT DEFAULT 'task',
  tenant_id INTEGER,

  -- Relationships
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  assignee UUID REFERENCES team_members(id),
  reporter UUID REFERENCES team_members(id),

  -- Core fields
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'task' CHECK (type IN ('feature', 'bug', 'improvement', 'task', 'subtask')),
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'review', 'done', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),

  -- Planning
  due_date DATE,
  estimated_hours DECIMAL(10,2),
  actual_hours DECIMAL(10,2),

  -- JSON fields
  tags TEXT[] DEFAULT '{}',
  dependencies UUID[] DEFAULT '{}',
  attachments TEXT[] DEFAULT '{}',
  comments JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assignee ON tasks(assignee);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_type ON tasks(type);
CREATE INDEX idx_tasks_due ON tasks(due_date);

-- ============================================
-- INTEGRATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT DEFAULT 'integration',
  tenant_id INTEGER,

  -- Core fields
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('oauth', 'api-key', 'webhook', 'database', 'file-system')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('connected', 'disconnected', 'error', 'pending')),

  -- JSON fields (encrypted config)
  config JSONB DEFAULT '{}',
  sync JSONB DEFAULT '{}',
  mappings JSONB DEFAULT '[]',
  logs JSONB DEFAULT '[]',
  health JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),

  CONSTRAINT integrations_unique_provider UNIQUE (tenant_id, provider, name)
);

CREATE INDEX idx_integrations_provider ON integrations(provider);
CREATE INDEX idx_integrations_type ON integrations(type);
CREATE INDEX idx_integrations_status ON integrations(status);
CREATE INDEX idx_integrations_tenant ON integrations(tenant_id);

-- ============================================
-- REPORTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT DEFAULT 'report',
  tenant_id INTEGER,

  -- Core fields
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('dashboard', 'analytics', 'financial', 'operational', 'custom')),
  format TEXT NOT NULL DEFAULT 'pdf' CHECK (format IN ('pdf', 'excel', 'csv', 'json', 'html')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'ready', 'failed', 'archived')),

  -- JSON fields
  schedule JSONB DEFAULT '{}',
  data JSONB DEFAULT '{}',
  visualization JSONB DEFAULT '{}',
  output JSONB DEFAULT '{}',
  permissions JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_reports_type ON reports(type);
CREATE INDEX idx_reports_format ON reports(format);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_tenant ON reports(tenant_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tenant isolation
DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN
    SELECT unnest(ARRAY[
      'customers', 'projects', 'documents', 'workflows',
      'invoices', 'team_members', 'tasks', 'integrations', 'reports'
    ])
  LOOP
    -- Read policy: Users can read their tenant's data
    EXECUTE format('
      CREATE POLICY "Users can read their tenant %s" ON %I
      FOR SELECT USING (
        tenant_id = (auth.jwt() ->> ''tenant_id'')::INTEGER
        OR EXISTS (
          SELECT 1 FROM team_members tm
          WHERE tm.user_id = auth.uid()
          AND tm.tenant_id = %I.tenant_id
          AND tm.status = ''active''
        )
      )', table_name, table_name, table_name);

    -- Write policy: Users can write to their tenant's data based on role
    EXECUTE format('
      CREATE POLICY "Users can write their tenant %s" ON %I
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM team_members tm
          WHERE tm.user_id = auth.uid()
          AND tm.tenant_id = %I.tenant_id
          AND tm.status = ''active''
          AND tm.role IN (''admin'', ''manager'', ''member'')
        )
      )', table_name, table_name, table_name);
  END LOOP;
END $$;

-- ============================================
-- TRIGGERS
-- ============================================

-- Update timestamp trigger for all tables
DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN
    SELECT unnest(ARRAY[
      'customers', 'projects', 'documents', 'workflows',
      'invoices', 'team_members', 'tasks', 'integrations', 'reports'
    ])
  LOOP
    EXECUTE format('
      CREATE TRIGGER update_%I_updated_at
      BEFORE UPDATE ON %I
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column()', table_name, table_name);
  END LOOP;
END $$;

-- ============================================
-- VIEWS
-- ============================================

-- Extend entity_instances view to include all new entity types
CREATE OR REPLACE VIEW entity_instances AS
  -- Services
  SELECT id, 'service' as entity_type, slug as entity_slug, name as display_name,
         metadata as data, tenant_id, created_at, updated_at FROM services
  UNION ALL
  -- Customers
  SELECT id, 'customer' as entity_type, slug as entity_slug, name as display_name,
         jsonb_build_object('type', type, 'status', status, 'industry', industry) as data,
         tenant_id, created_at, updated_at FROM customers
  UNION ALL
  -- Projects
  SELECT id, 'project' as entity_type, slug as entity_slug, name as display_name,
         jsonb_build_object('type', type, 'status', status, 'priority', priority) as data,
         tenant_id, created_at, updated_at FROM projects
  UNION ALL
  -- Documents
  SELECT id, 'document' as entity_type, name as entity_slug, name as display_name,
         jsonb_build_object('type', type, 'status', status, 'source', source) as data,
         tenant_id, created_at, updated_at FROM documents
  UNION ALL
  -- Workflows
  SELECT id, 'workflow' as entity_type, slug as entity_slug, name as display_name,
         jsonb_build_object('type', type, 'status', status) as data,
         tenant_id, created_at, updated_at FROM workflows
  UNION ALL
  -- Invoices
  SELECT id, 'invoice' as entity_type, invoice_number as entity_slug, invoice_number as display_name,
         jsonb_build_object('status', status, 'total', totals->>'total') as data,
         tenant_id, created_at, updated_at FROM invoices
  UNION ALL
  -- Team Members
  SELECT id, 'team-member' as entity_type, email as entity_slug, display_name,
         jsonb_build_object('role', role, 'status', status, 'department', department) as data,
         tenant_id, created_at, updated_at FROM team_members
  UNION ALL
  -- Tasks
  SELECT id, 'task' as entity_type, id::text as entity_slug, title as display_name,
         jsonb_build_object('type', type, 'status', status, 'priority', priority) as data,
         tenant_id, created_at, updated_at FROM tasks
  UNION ALL
  -- Integrations
  SELECT id, 'integration' as entity_type, provider || '-' || name as entity_slug, name as display_name,
         jsonb_build_object('provider', provider, 'type', type, 'status', status) as data,
         tenant_id, created_at, updated_at FROM integrations
  UNION ALL
  -- Reports
  SELECT id, 'report' as entity_type, id::text as entity_slug, name as display_name,
         jsonb_build_object('type', type, 'format', format, 'status', status) as data,
         tenant_id, created_at, updated_at FROM reports;

-- Grant access to authenticated users
GRANT SELECT ON entity_instances TO authenticated;