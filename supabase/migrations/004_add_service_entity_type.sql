-- Add service entity type to the AI Sprinter Platform
-- This migration properly registers services as an entity type

-- First, ensure the entity_types table exists
CREATE TABLE IF NOT EXISTS entity_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  namespace TEXT,
  parent_slug TEXT,
  is_workspace BOOLEAN DEFAULT FALSE,
  schema_json JSONB NOT NULL DEFAULT '{}',
  ui_config_json JSONB DEFAULT '{}',
  entity_mapping JSONB DEFAULT '{}',
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_namespace_slug UNIQUE (namespace, slug)
);

-- Insert the service entity type
INSERT INTO entity_types (
  slug,
  name,
  namespace,
  is_workspace,
  schema_json,
  ui_config_json,
  entity_mapping,
  version
) VALUES (
  'service',
  'Service',
  'sprinter',
  false,
  '{
    "type": "object",
    "properties": {
      "id": {"type": "string", "format": "uuid"},
      "slug": {"type": "string", "pattern": "^[a-z0-9-]+$"},
      "name": {"type": "string"},
      "category": {"type": "string"},
      "status": {"type": "string", "enum": ["active", "beta", "coming_soon", "deprecated"]},
      "metadata": {"type": "object"},
      "hero": {"type": "object"},
      "challenges": {"type": "array"},
      "capabilities": {"type": "array"},
      "implementation": {"type": "object"},
      "metrics": {"type": "object"},
      "useCases": {"type": "array"},
      "pricing": {"type": "object"},
      "testimonials": {"type": "array"},
      "cta": {"type": "object"},
      "customBlocks": {"type": "array"},
      "viewConfig": {"type": "object"},
      "createdAt": {"type": "string", "format": "date-time"},
      "updatedAt": {"type": "string", "format": "date-time"},
      "publishedAt": {"type": "string", "format": "date-time"},
      "version": {"type": "number"},
      "tenantId": {"type": "number"}
    },
    "required": ["slug", "name", "category", "status", "metadata", "hero", "cta"]
  }',
  '{
    "icon": "Package",
    "displayName": "Service",
    "pluralName": "Services",
    "listView": {
      "columns": ["name", "slug", "category", "status"],
      "defaultSort": {"field": "updatedAt", "direction": "desc"},
      "filters": ["status", "category"],
      "searchFields": ["name", "slug", "metadata.description"]
    },
    "formView": {
      "tabs": ["basic", "hero", "content", "metrics", "pricing", "settings"]
    }
  }',
  '{
    "toolMappings": {
      "service-manager": {
        "reads": ["*"],
        "writes": ["*"],
        "required": ["slug", "name"]
      }
    },
    "allowedTypes": ["service"],
    "constraints": {
      "uniqueFields": ["slug"],
      "requiredFields": ["slug", "name", "category", "status"]
    }
  }',
  1
) ON CONFLICT (slug) DO UPDATE SET
  schema_json = EXCLUDED.schema_json,
  ui_config_json = EXCLUDED.ui_config_json,
  entity_mapping = EXCLUDED.entity_mapping,
  updated_at = NOW();

-- Create the services table following the entity pattern
CREATE TABLE IF NOT EXISTS services (
  -- Standard entity fields
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT DEFAULT 'service',
  tenant_id INTEGER,

  -- Service-specific fields
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'beta', 'coming_soon', 'deprecated')),

  -- JSON content fields
  metadata JSONB NOT NULL DEFAULT '{}',
  hero JSONB NOT NULL DEFAULT '{}',
  challenges JSONB DEFAULT '[]',
  capabilities JSONB DEFAULT '[]',
  implementation JSONB DEFAULT '{}',
  metrics JSONB DEFAULT '{}',
  use_cases JSONB DEFAULT '[]',
  pricing JSONB DEFAULT '{}',
  testimonials JSONB DEFAULT '[]',
  cta JSONB NOT NULL DEFAULT '{}',
  custom_blocks JSONB DEFAULT '[]',
  view_config JSONB DEFAULT '{
    "layout": "standard",
    "theme": {
      "primaryColor": "blue",
      "secondaryColor": "purple",
      "accentColor": "green"
    },
    "animations": {
      "enabled": true,
      "type": "fade"
    },
    "components": {
      "showPricing": true,
      "showTestimonials": true,
      "showCalculator": false,
      "showDemo": false,
      "showComparison": false
    }
  }',

  -- Versioning & tracking
  version INTEGER DEFAULT 1,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),

  -- Search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(slug, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(category, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(metadata->>'description', '')), 'D')
  ) STORED,

  CONSTRAINT services_slug_unique UNIQUE (slug),
  CONSTRAINT services_tenant_slug_unique UNIQUE (tenant_id, slug)
);

-- Create indexes
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_tenant ON services(tenant_id);
CREATE INDEX idx_services_search ON services USING GIN(search_vector);
CREATE INDEX idx_services_metadata ON services USING GIN(metadata);
CREATE INDEX idx_services_published ON services(published_at) WHERE published_at IS NOT NULL;

-- RLS Policies
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public read for published services
CREATE POLICY "Public can read published services" ON services
  FOR SELECT USING (status = 'active' AND published_at IS NOT NULL);

-- Authenticated read for all services
CREATE POLICY "Authenticated can read all services" ON services
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Tenant isolation for writes
CREATE POLICY "Users can manage their tenant services" ON services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND (
        raw_user_meta_data->>'tenant_id' = services.tenant_id::text
        OR raw_user_meta_data->>'role' = 'admin'
      )
    )
  );

-- Update trigger
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create entity_instances view that includes services
CREATE OR REPLACE VIEW entity_instances AS
  SELECT
    id,
    'service' as entity_type,
    slug as entity_slug,
    name as display_name,
    metadata as data,
    tenant_id,
    created_at,
    updated_at
  FROM services
  UNION ALL
  SELECT
    id,
    'lead' as entity_type,
    CONCAT(first_name, '-', last_name, '-', id::text) as entity_slug,
    CONCAT(first_name, ' ', last_name) as display_name,
    jsonb_build_object(
      'email', email,
      'phone', phone,
      'source', source
    ) as data,
    tenant_id,
    created_at,
    updated_at
  FROM leads
  -- Add other entity types as needed
;

-- Grant permissions
GRANT SELECT ON entity_instances TO authenticated;
GRANT ALL ON services TO authenticated;