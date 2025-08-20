-- Seed data for proposal templates

-- POC Sprint Template
INSERT INTO proposal_templates (
  id,
  name,
  description,
  type,
  content_schema,
  variables,
  is_active,
  created_at,
  updated_at
) VALUES (
  'poc-sprint',
  'POC Sprint Template',
  'Template for 2-4 week proof-of-concept sprints',
  'poc_sprint',
  '{
    "sections": [
      {
        "id": "greeting",
        "title": "Introduction",
        "type": "greeting",
        "template": "Dear {{clientName}},\n\nThank you for the opportunity to work with {{clientCompany}}. We appreciate the background materials you shared – they were exactly what we needed to understand your {{problemArea}} challenge. We''re excited to propose a short Proof-of-Concept sprint to build and validate an AI-powered solution that could {{valueProposition}}. This proposal outlines a focused {{duration}}-week engagement to deliver a functional prototype for your review.",
        "required": true,
        "order": 1
      }
    ],
    "variables": [
      {"key": "clientName", "label": "Client Name", "type": "text", "required": true},
      {"key": "clientCompany", "label": "Client Company", "type": "text", "required": true},
      {"key": "problemArea", "label": "Problem Area", "type": "text", "required": true},
      {"key": "valueProposition", "label": "Value Proposition", "type": "textarea", "required": true},
      {"key": "duration", "label": "Duration (weeks)", "type": "number", "required": true, "defaultValue": 4}
    ]
  }'::jsonb,
  '[]'::jsonb,
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  content_schema = EXCLUDED.content_schema,
  updated_at = NOW();

-- Workshop Template
INSERT INTO proposal_templates (
  id,
  name,
  description,
  type,
  content_schema,
  variables,
  is_active,
  created_at,
  updated_at
) VALUES (
  'workshop',
  'AI Workshop Template',
  'Template for 1-day AI strategy workshops',
  'workshop',
  '{
    "sections": [
      {
        "id": "greeting",
        "title": "Introduction",
        "type": "greeting",
        "template": "Dear {{clientName}},\n\nThank you for your interest in our AI Strategy Workshop. We''re excited to help {{clientCompany}} explore how AI can transform your {{focusArea}}.",
        "required": true,
        "order": 1
      },
      {
        "id": "overview",
        "title": "Workshop Overview",
        "type": "overview",
        "template": "This intensive one-day workshop will bring together your key stakeholders to:\n• Identify high-impact AI opportunities specific to {{clientCompany}}\n• Develop a prioritized AI roadmap\n• Create actionable next steps for implementation\n\nOur experienced facilitators will guide your team through proven frameworks and real-world examples relevant to {{industry}}.",
        "required": true,
        "order": 2
      }
    ],
    "variables": [
      {"key": "clientName", "label": "Client Name", "type": "text", "required": true},
      {"key": "clientCompany", "label": "Client Company", "type": "text", "required": true},
      {"key": "focusArea", "label": "Focus Area", "type": "text", "required": true},
      {"key": "industry", "label": "Industry", "type": "text", "required": true},
      {"key": "price", "label": "Workshop Price", "type": "text", "required": true, "defaultValue": "$5,000"}
    ]
  }'::jsonb,
  '[]'::jsonb,
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  content_schema = EXCLUDED.content_schema,
  updated_at = NOW();

-- AI Transformation Template
INSERT INTO proposal_templates (
  id,
  name,
  description,
  type,
  content_schema,
  variables,
  is_active,
  created_at,
  updated_at
) VALUES (
  'transformation',
  'AI Transformation Template',
  'Template for 3-6 month enterprise AI transformation projects',
  'transformation',
  '{
    "sections": [
      {
        "id": "executive-summary",
        "title": "Executive Summary",
        "type": "summary",
        "template": "{{clientCompany}} has the opportunity to {{transformationVision}}. This proposal outlines a {{duration}}-month engagement to {{primaryObjective}}.\n\nExpected outcomes include:\n• {{outcome1}}\n• {{outcome2}}\n• {{outcome3}}\n\nTotal investment: {{totalInvestment}}\nExpected ROI: {{expectedROI}} within {{roiTimeframe}}",
        "required": true,
        "order": 1
      }
    ],
    "variables": [
      {"key": "clientCompany", "label": "Client Company", "type": "text", "required": true},
      {"key": "transformationVision", "label": "Transformation Vision", "type": "textarea", "required": true},
      {"key": "duration", "label": "Duration (months)", "type": "number", "required": true, "defaultValue": 6},
      {"key": "primaryObjective", "label": "Primary Objective", "type": "textarea", "required": true},
      {"key": "totalInvestment", "label": "Total Investment", "type": "text", "required": true, "defaultValue": "$250,000"}
    ]
  }'::jsonb,
  '[]'::jsonb,
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  content_schema = EXCLUDED.content_schema,
  updated_at = NOW();