-- Create service entities table for dynamic service pages
CREATE TABLE IF NOT EXISTS service_entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'beta', 'coming_soon')),

  -- JSON fields for complex structured data
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

  -- View configuration
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

  -- Tracking fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),

  -- Search and filtering
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(slug, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(category, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(metadata->>'description', '')), 'D')
  ) STORED
);

-- Create indexes for performance
CREATE INDEX idx_service_entities_slug ON service_entities(slug);
CREATE INDEX idx_service_entities_category ON service_entities(category);
CREATE INDEX idx_service_entities_status ON service_entities(status);
CREATE INDEX idx_service_entities_search ON service_entities USING GIN(search_vector);
CREATE INDEX idx_service_entities_metadata ON service_entities USING GIN(metadata);

-- Create view registry for managing service views
CREATE TABLE IF NOT EXISTS service_view_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  view_name TEXT UNIQUE NOT NULL,
  view_type TEXT NOT NULL, -- 'component' | 'template' | 'custom'
  component_path TEXT, -- Path to React component
  template_id UUID, -- Reference to template if using template system
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default view types
INSERT INTO service_view_registry (view_name, view_type, component_path, config) VALUES
  ('standard', 'component', '@/components/services/dynamic-service-view', '{"layout": "standard"}'),
  ('technical', 'component', '@/components/services/technical-service-view', '{"layout": "technical"}'),
  ('sales', 'component', '@/components/services/sales-service-view', '{"layout": "sales"}'),
  ('education', 'component', '@/components/services/education-service-view', '{"layout": "education"}')
ON CONFLICT (view_name) DO NOTHING;

-- RLS Policies
ALTER TABLE service_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_view_registry ENABLE ROW LEVEL SECURITY;

-- Public read access for active services
CREATE POLICY "Public can read active services" ON service_entities
  FOR SELECT USING (status = 'active');

-- Authenticated users can read all services
CREATE POLICY "Authenticated can read all services" ON service_entities
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Admin write access
CREATE POLICY "Admins can manage services" ON service_entities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- View registry read for all
CREATE POLICY "Public can read view registry" ON service_view_registry
  FOR SELECT USING (true);

-- View registry write for admins
CREATE POLICY "Admins can manage view registry" ON service_view_registry
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_service_entities_updated_at BEFORE UPDATE
  ON service_entities FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_view_registry_updated_at BEFORE UPDATE
  ON service_view_registry FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert example service entities (can be removed in production)
INSERT INTO service_entities (
  slug, name, category, status,
  metadata,
  hero,
  challenges,
  capabilities,
  cta
) VALUES
(
  'customer-intelligence',
  'Customer Intelligence Platform',
  'analytics',
  'active',
  '{
    "title": "Customer Intelligence Platform | Sprinter AI",
    "description": "Transform every customer interaction into strategic insight. Predict churn, identify expansion, and maximize LTV.",
    "keywords": ["customer analytics", "churn prediction", "LTV optimization", "customer 360"]
  }',
  '{
    "badge": {"text": "Customer Intelligence", "icon": "Users"},
    "headline": {
      "text": "Every Customer Signal ",
      "highlighted": "Becomes Strategy"
    },
    "subheadline": "Stop flying blind on customer health. AI monitors every interaction, predicts every risk, and identifies every opportunity—before your competition even knows they exist.",
    "stats": [
      {"value": "45%", "label": "Churn Reduction", "color": "text-green-500"},
      {"value": "3.2x", "label": "LTV Increase", "color": "text-blue-500"},
      {"value": "67%", "label": "Upsell Success", "color": "text-purple-500"},
      {"value": "Real-time", "label": "Insights", "color": "text-orange-500"}
    ],
    "cta": {
      "primary": {"text": "See Platform Demo", "action": "demo"},
      "secondary": {"text": "Calculate Customer Value", "href": "/calculators/ltv"}
    }
  }',
  '[
    {
      "title": "Blind Spots",
      "problem": "No unified view of customer health",
      "solution": "360° AI-powered customer intelligence",
      "outcome": "Complete visibility across all touchpoints"
    }
  ]',
  '[
    {
      "title": "Predictive Analytics",
      "description": "Know what customers will do before they do it",
      "icon": "TrendingUp",
      "features": [
        "Churn prediction models",
        "Expansion opportunity scoring",
        "Usage pattern analysis",
        "Sentiment tracking",
        "Competitive risk alerts"
      ]
    }
  ]',
  '{
    "headline": "Turn Customer Data Into Revenue",
    "description": "Leading companies use customer intelligence to drive growth. Join them.",
    "buttons": [
      {"text": "Get Intelligence Audit", "href": "/contact?service=customer-intelligence", "variant": "default"},
      {"text": "See ROI Calculator", "href": "/calculators/customer-ltv", "variant": "outline"}
    ]
  }'
),
(
  'supply-chain-intelligence',
  'Supply Chain Intelligence',
  'operations',
  'active',
  '{
    "title": "Supply Chain Intelligence | Sprinter AI",
    "description": "End-to-end supply chain visibility and optimization. Predict disruptions, optimize inventory, and slash costs.",
    "keywords": ["supply chain", "inventory optimization", "demand planning", "logistics AI"]
  }',
  '{
    "badge": {"text": "Supply Chain AI", "icon": "Package"},
    "headline": {
      "text": "Supply Chain ",
      "highlighted": "Omniscience"
    },
    "subheadline": "In a world of disruptions, the companies that see everything win everything. AI transforms your supply chain from reactive firefighting to predictive excellence.",
    "stats": [
      {"value": "35%", "label": "Inventory Reduction", "color": "text-green-500"},
      {"value": "99.7%", "label": "OTIF Rate", "color": "text-blue-500"},
      {"value": "$4.5M", "label": "Annual Savings", "color": "text-purple-500"},
      {"value": "14 days", "label": "Lead Time Cut", "color": "text-orange-500"}
    ],
    "cta": {
      "primary": {"text": "Assess Your Supply Chain", "action": "assessment"},
      "secondary": {"text": "See Platform Demo", "href": "/demo/supply-chain"}
    }
  }',
  '[
    {
      "title": "Demand Volatility",
      "problem": "Can''t predict demand accurately",
      "solution": "ML-powered demand sensing",
      "outcome": "95% forecast accuracy"
    }
  ]',
  '[
    {
      "title": "End-to-End Visibility",
      "description": "See everything, everywhere, all at once",
      "icon": "Eye",
      "features": [
        "Real-time inventory tracking",
        "Multi-tier supplier visibility",
        "Shipment tracking & ETA",
        "Quality monitoring",
        "Risk assessment dashboard"
      ]
    }
  ]',
  '{
    "headline": "The Future of Supply Chain Is Intelligent",
    "description": "Don''t wait for the next disruption to expose your blind spots.",
    "buttons": [
      {"text": "Get Vulnerability Assessment", "href": "/contact?service=supply-chain", "variant": "default"},
      {"text": "Calculate Savings", "href": "/calculators/supply-chain", "variant": "outline"}
    ]
  }'
);