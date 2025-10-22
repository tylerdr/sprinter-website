-- Seed core entity types for AI Sprinter Platform
-- This migration adds all essential entity types needed for a functioning platform

-- ============================================
-- CUSTOMER ENTITY TYPE
-- ============================================
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
  'customer',
  'Customer',
  'sprinter',
  true, -- Customers are workspace entities
  '{
    "type": "object",
    "properties": {
      "id": {"type": "string", "format": "uuid"},
      "name": {"type": "string"},
      "slug": {"type": "string", "pattern": "^[a-z0-9-]+$"},
      "type": {"type": "string", "enum": ["enterprise", "mid-market", "smb", "startup"]},
      "status": {"type": "string", "enum": ["active", "inactive", "prospect", "churned"]},
      "industry": {"type": "string"},
      "website": {"type": "string", "format": "uri"},
      "logo": {"type": "string", "format": "uri"},
      "contacts": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {"type": "string"},
            "email": {"type": "string", "format": "email"},
            "phone": {"type": "string"},
            "role": {"type": "string"},
            "isPrimary": {"type": "boolean"}
          }
        }
      },
      "billing": {
        "type": "object",
        "properties": {
          "address": {"type": "object"},
          "taxId": {"type": "string"},
          "currency": {"type": "string", "default": "USD"},
          "paymentTerms": {"type": "string", "default": "net-30"}
        }
      },
      "subscription": {
        "type": "object",
        "properties": {
          "plan": {"type": "string"},
          "startDate": {"type": "string", "format": "date"},
          "mrr": {"type": "number"},
          "features": {"type": "array", "items": {"type": "string"}}
        }
      },
      "metadata": {"type": "object"},
      "tags": {"type": "array", "items": {"type": "string"}},
      "createdAt": {"type": "string", "format": "date-time"},
      "updatedAt": {"type": "string", "format": "date-time"}
    },
    "required": ["name", "type", "status"]
  }',
  '{
    "icon": "Building2",
    "displayName": "Customer",
    "pluralName": "Customers",
    "listView": {
      "columns": ["name", "type", "status", "industry", "subscription.mrr"],
      "defaultSort": {"field": "name", "direction": "asc"}
    }
  }',
  '{
    "toolMappings": {
      "crm": {"reads": ["*"], "writes": ["*"], "required": ["name"]},
      "billing": {"reads": ["billing", "subscription"], "writes": ["subscription"], "required": []}
    }
  }',
  1
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- PROJECT ENTITY TYPE
-- ============================================
INSERT INTO entity_types (
  slug,
  name,
  namespace,
  parent_slug,
  is_workspace,
  schema_json,
  ui_config_json,
  entity_mapping,
  version
) VALUES (
  'project',
  'Project',
  'sprinter',
  'customer',
  false,
  '{
    "type": "object",
    "properties": {
      "id": {"type": "string", "format": "uuid"},
      "customerId": {"type": "string", "format": "uuid"},
      "name": {"type": "string"},
      "slug": {"type": "string", "pattern": "^[a-z0-9-]+$"},
      "type": {"type": "string", "enum": ["implementation", "consulting", "support", "custom"]},
      "status": {"type": "string", "enum": ["planning", "active", "on-hold", "completed", "cancelled"]},
      "priority": {"type": "string", "enum": ["low", "medium", "high", "critical"]},
      "description": {"type": "string"},
      "objectives": {"type": "array", "items": {"type": "string"}},
      "deliverables": {"type": "array", "items": {
        "type": "object",
        "properties": {
          "name": {"type": "string"},
          "status": {"type": "string"},
          "dueDate": {"type": "string", "format": "date"}
        }
      }},
      "timeline": {
        "type": "object",
        "properties": {
          "startDate": {"type": "string", "format": "date"},
          "endDate": {"type": "string", "format": "date"},
          "milestones": {"type": "array", "items": {"type": "object"}}
        }
      },
      "budget": {
        "type": "object",
        "properties": {
          "total": {"type": "number"},
          "spent": {"type": "number"},
          "currency": {"type": "string"}
        }
      },
      "team": {"type": "array", "items": {"type": "string"}},
      "documents": {"type": "array", "items": {"type": "string"}},
      "risks": {"type": "array", "items": {"type": "object"}},
      "metadata": {"type": "object"},
      "createdAt": {"type": "string", "format": "date-time"},
      "updatedAt": {"type": "string", "format": "date-time"}
    },
    "required": ["customerId", "name", "type", "status"]
  }',
  '{
    "icon": "Briefcase",
    "displayName": "Project",
    "pluralName": "Projects",
    "listView": {
      "columns": ["name", "type", "status", "priority", "timeline.endDate"],
      "defaultSort": {"field": "updatedAt", "direction": "desc"},
      "filters": ["status", "type", "priority"]
    }
  }',
  '{
    "toolMappings": {
      "project-manager": {"reads": ["*"], "writes": ["*"], "required": ["name", "customerId"]},
      "gantt": {"reads": ["timeline", "deliverables"], "writes": ["timeline.milestones"], "required": []}
    }
  }',
  1
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- DOCUMENT ENTITY TYPE
-- ============================================
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
  'document',
  'Document',
  'sprinter',
  false,
  '{
    "type": "object",
    "properties": {
      "id": {"type": "string", "format": "uuid"},
      "name": {"type": "string"},
      "type": {"type": "string", "enum": ["pdf", "invoice", "contract", "report", "presentation", "spreadsheet", "other"]},
      "status": {"type": "string", "enum": ["pending", "processing", "processed", "failed", "archived"]},
      "source": {"type": "string", "enum": ["upload", "email", "api", "scan", "generated"]},
      "mimeType": {"type": "string"},
      "size": {"type": "number"},
      "url": {"type": "string", "format": "uri"},
      "thumbnailUrl": {"type": "string", "format": "uri"},
      "extractedData": {"type": "object"},
      "metadata": {
        "type": "object",
        "properties": {
          "pages": {"type": "number"},
          "author": {"type": "string"},
          "createdDate": {"type": "string", "format": "date"},
          "language": {"type": "string"},
          "confidence": {"type": "number"}
        }
      },
      "classification": {
        "type": "object",
        "properties": {
          "category": {"type": "string"},
          "confidence": {"type": "number"},
          "tags": {"type": "array", "items": {"type": "string"}}
        }
      },
      "validation": {
        "type": "object",
        "properties": {
          "isValid": {"type": "boolean"},
          "errors": {"type": "array", "items": {"type": "string"}},
          "warnings": {"type": "array", "items": {"type": "string"}}
        }
      },
      "processing": {
        "type": "object",
        "properties": {
          "startedAt": {"type": "string", "format": "date-time"},
          "completedAt": {"type": "string", "format": "date-time"},
          "duration": {"type": "number"},
          "attempts": {"type": "number"}
        }
      },
      "relatedEntities": {"type": "array", "items": {"type": "object"}},
      "permissions": {"type": "object"},
      "createdAt": {"type": "string", "format": "date-time"},
      "updatedAt": {"type": "string", "format": "date-time"}
    },
    "required": ["name", "type", "status", "source"]
  }',
  '{
    "icon": "FileText",
    "displayName": "Document",
    "pluralName": "Documents",
    "listView": {
      "columns": ["name", "type", "status", "source", "metadata.pages", "createdAt"],
      "defaultSort": {"field": "createdAt", "direction": "desc"},
      "filters": ["type", "status", "source"]
    }
  }',
  '{
    "toolMappings": {
      "document-processor": {"reads": ["*"], "writes": ["extractedData", "classification", "validation"], "required": ["url"]},
      "ocr": {"reads": ["url", "type"], "writes": ["extractedData.text"], "required": ["url"]}
    }
  }',
  1
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- WORKFLOW ENTITY TYPE
-- ============================================
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
  'workflow',
  'Workflow',
  'sprinter',
  false,
  '{
    "type": "object",
    "properties": {
      "id": {"type": "string", "format": "uuid"},
      "name": {"type": "string"},
      "slug": {"type": "string", "pattern": "^[a-z0-9-]+$"},
      "description": {"type": "string"},
      "type": {"type": "string", "enum": ["automation", "approval", "integration", "notification", "custom"]},
      "status": {"type": "string", "enum": ["draft", "active", "paused", "archived"]},
      "trigger": {
        "type": "object",
        "properties": {
          "type": {"type": "string", "enum": ["manual", "schedule", "event", "webhook"]},
          "config": {"type": "object"}
        }
      },
      "steps": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": {"type": "string"},
            "name": {"type": "string"},
            "type": {"type": "string"},
            "config": {"type": "object"},
            "conditions": {"type": "array"},
            "outputs": {"type": "object"}
          }
        }
      },
      "variables": {"type": "object"},
      "schedule": {
        "type": "object",
        "properties": {
          "frequency": {"type": "string"},
          "timezone": {"type": "string"},
          "nextRun": {"type": "string", "format": "date-time"}
        }
      },
      "execution": {
        "type": "object",
        "properties": {
          "totalRuns": {"type": "number"},
          "successfulRuns": {"type": "number"},
          "failedRuns": {"type": "number"},
          "lastRun": {"type": "string", "format": "date-time"},
          "averageDuration": {"type": "number"}
        }
      },
      "permissions": {"type": "object"},
      "metadata": {"type": "object"},
      "createdAt": {"type": "string", "format": "date-time"},
      "updatedAt": {"type": "string", "format": "date-time"}
    },
    "required": ["name", "type", "status", "trigger", "steps"]
  }',
  '{
    "icon": "Workflow",
    "displayName": "Workflow",
    "pluralName": "Workflows",
    "listView": {
      "columns": ["name", "type", "status", "trigger.type", "execution.totalRuns"],
      "defaultSort": {"field": "updatedAt", "direction": "desc"},
      "filters": ["type", "status", "trigger.type"]
    }
  }',
  '{
    "toolMappings": {
      "workflow-engine": {"reads": ["*"], "writes": ["execution", "status"], "required": ["steps"]},
      "scheduler": {"reads": ["schedule", "trigger"], "writes": ["schedule.nextRun"], "required": ["schedule"]}
    }
  }',
  1
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- INVOICE ENTITY TYPE
-- ============================================
INSERT INTO entity_types (
  slug,
  name,
  namespace,
  parent_slug,
  is_workspace,
  schema_json,
  ui_config_json,
  entity_mapping,
  version
) VALUES (
  'invoice',
  'Invoice',
  'sprinter',
  'customer',
  false,
  '{
    "type": "object",
    "properties": {
      "id": {"type": "string", "format": "uuid"},
      "customerId": {"type": "string", "format": "uuid"},
      "invoiceNumber": {"type": "string"},
      "status": {"type": "string", "enum": ["draft", "sent", "viewed", "paid", "overdue", "cancelled", "refunded"]},
      "type": {"type": "string", "enum": ["standard", "recurring", "credit", "proforma"]},
      "currency": {"type": "string", "default": "USD"},
      "dates": {
        "type": "object",
        "properties": {
          "issued": {"type": "string", "format": "date"},
          "due": {"type": "string", "format": "date"},
          "paid": {"type": "string", "format": "date"},
          "period": {"type": "object"}
        }
      },
      "lineItems": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "description": {"type": "string"},
            "quantity": {"type": "number"},
            "unitPrice": {"type": "number"},
            "amount": {"type": "number"},
            "tax": {"type": "number"},
            "discount": {"type": "number"}
          }
        }
      },
      "totals": {
        "type": "object",
        "properties": {
          "subtotal": {"type": "number"},
          "tax": {"type": "number"},
          "discount": {"type": "number"},
          "total": {"type": "number"},
          "paid": {"type": "number"},
          "balance": {"type": "number"}
        }
      },
      "payment": {
        "type": "object",
        "properties": {
          "method": {"type": "string"},
          "reference": {"type": "string"},
          "details": {"type": "object"}
        }
      },
      "notes": {"type": "string"},
      "attachments": {"type": "array", "items": {"type": "string"}},
      "metadata": {"type": "object"},
      "createdAt": {"type": "string", "format": "date-time"},
      "updatedAt": {"type": "string", "format": "date-time"}
    },
    "required": ["customerId", "invoiceNumber", "status", "type", "currency", "dates", "lineItems", "totals"]
  }',
  '{
    "icon": "Receipt",
    "displayName": "Invoice",
    "pluralName": "Invoices",
    "listView": {
      "columns": ["invoiceNumber", "customerId", "status", "totals.total", "dates.due"],
      "defaultSort": {"field": "dates.issued", "direction": "desc"},
      "filters": ["status", "type"]
    }
  }',
  '{
    "toolMappings": {
      "billing": {"reads": ["*"], "writes": ["*"], "required": ["customerId", "lineItems"]},
      "accounting": {"reads": ["*"], "writes": ["payment", "status"], "required": []}
    }
  }',
  1
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- TEAM MEMBER ENTITY TYPE
-- ============================================
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
  'team-member',
  'Team Member',
  'sprinter',
  false,
  '{
    "type": "object",
    "properties": {
      "id": {"type": "string", "format": "uuid"},
      "userId": {"type": "string", "format": "uuid"},
      "email": {"type": "string", "format": "email"},
      "firstName": {"type": "string"},
      "lastName": {"type": "string"},
      "displayName": {"type": "string"},
      "avatar": {"type": "string", "format": "uri"},
      "role": {"type": "string", "enum": ["admin", "manager", "member", "viewer"]},
      "department": {"type": "string"},
      "title": {"type": "string"},
      "status": {"type": "string", "enum": ["active", "inactive", "invited", "suspended"]},
      "permissions": {
        "type": "array",
        "items": {"type": "string"}
      },
      "skills": {"type": "array", "items": {"type": "string"}},
      "availability": {
        "type": "object",
        "properties": {
          "status": {"type": "string", "enum": ["available", "busy", "away", "offline"]},
          "workingHours": {"type": "object"},
          "timezone": {"type": "string"}
        }
      },
      "contact": {
        "type": "object",
        "properties": {
          "phone": {"type": "string"},
          "slack": {"type": "string"},
          "teams": {"type": "string"}
        }
      },
      "metadata": {"type": "object"},
      "lastActive": {"type": "string", "format": "date-time"},
      "createdAt": {"type": "string", "format": "date-time"},
      "updatedAt": {"type": "string", "format": "date-time"}
    },
    "required": ["email", "firstName", "lastName", "role", "status"]
  }',
  '{
    "icon": "Users",
    "displayName": "Team Member",
    "pluralName": "Team Members",
    "listView": {
      "columns": ["displayName", "email", "role", "department", "status"],
      "defaultSort": {"field": "displayName", "direction": "asc"},
      "filters": ["role", "department", "status"]
    }
  }',
  '{
    "toolMappings": {
      "hr": {"reads": ["*"], "writes": ["*"], "required": ["email"]},
      "access-control": {"reads": ["permissions", "role"], "writes": ["permissions"], "required": []}
    }
  }',
  1
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- TASK ENTITY TYPE
-- ============================================
INSERT INTO entity_types (
  slug,
  name,
  namespace,
  parent_slug,
  is_workspace,
  schema_json,
  ui_config_json,
  entity_mapping,
  version
) VALUES (
  'task',
  'Task',
  'sprinter',
  'project',
  false,
  '{
    "type": "object",
    "properties": {
      "id": {"type": "string", "format": "uuid"},
      "projectId": {"type": "string", "format": "uuid"},
      "title": {"type": "string"},
      "description": {"type": "string"},
      "type": {"type": "string", "enum": ["feature", "bug", "improvement", "task", "subtask"]},
      "status": {"type": "string", "enum": ["todo", "in-progress", "review", "done", "cancelled"]},
      "priority": {"type": "string", "enum": ["low", "medium", "high", "critical"]},
      "assignee": {"type": "string", "format": "uuid"},
      "reporter": {"type": "string", "format": "uuid"},
      "dueDate": {"type": "string", "format": "date"},
      "estimatedHours": {"type": "number"},
      "actualHours": {"type": "number"},
      "tags": {"type": "array", "items": {"type": "string"}},
      "dependencies": {"type": "array", "items": {"type": "string"}},
      "attachments": {"type": "array", "items": {"type": "string"}},
      "comments": {"type": "array", "items": {"type": "object"}},
      "metadata": {"type": "object"},
      "createdAt": {"type": "string", "format": "date-time"},
      "updatedAt": {"type": "string", "format": "date-time"}
    },
    "required": ["projectId", "title", "type", "status", "priority"]
  }',
  '{
    "icon": "CheckSquare",
    "displayName": "Task",
    "pluralName": "Tasks",
    "listView": {
      "columns": ["title", "type", "status", "priority", "assignee", "dueDate"],
      "defaultSort": {"field": "priority", "direction": "desc"},
      "filters": ["status", "type", "priority", "assignee"]
    }
  }',
  '{
    "toolMappings": {
      "task-manager": {"reads": ["*"], "writes": ["*"], "required": ["title", "projectId"]},
      "kanban": {"reads": ["*"], "writes": ["status"], "required": []}
    }
  }',
  1
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- INTEGRATION ENTITY TYPE
-- ============================================
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
  'integration',
  'Integration',
  'sprinter',
  false,
  '{
    "type": "object",
    "properties": {
      "id": {"type": "string", "format": "uuid"},
      "name": {"type": "string"},
      "provider": {"type": "string"},
      "type": {"type": "string", "enum": ["oauth", "api-key", "webhook", "database", "file-system"]},
      "status": {"type": "string", "enum": ["connected", "disconnected", "error", "pending"]},
      "config": {
        "type": "object",
        "properties": {
          "authType": {"type": "string"},
          "endpoint": {"type": "string", "format": "uri"},
          "credentials": {"type": "object"},
          "headers": {"type": "object"},
          "parameters": {"type": "object"}
        }
      },
      "sync": {
        "type": "object",
        "properties": {
          "frequency": {"type": "string"},
          "lastSync": {"type": "string", "format": "date-time"},
          "nextSync": {"type": "string", "format": "date-time"},
          "recordsSynced": {"type": "number"}
        }
      },
      "mappings": {"type": "array", "items": {"type": "object"}},
      "logs": {"type": "array", "items": {"type": "object"}},
      "health": {
        "type": "object",
        "properties": {
          "status": {"type": "string"},
          "lastCheck": {"type": "string", "format": "date-time"},
          "uptime": {"type": "number"},
          "errors": {"type": "array", "items": {"type": "object"}}
        }
      },
      "metadata": {"type": "object"},
      "createdAt": {"type": "string", "format": "date-time"},
      "updatedAt": {"type": "string", "format": "date-time"}
    },
    "required": ["name", "provider", "type", "status"]
  }',
  '{
    "icon": "Cable",
    "displayName": "Integration",
    "pluralName": "Integrations",
    "listView": {
      "columns": ["name", "provider", "type", "status", "sync.lastSync"],
      "defaultSort": {"field": "name", "direction": "asc"},
      "filters": ["type", "status", "provider"]
    }
  }',
  '{
    "toolMappings": {
      "integration-manager": {"reads": ["*"], "writes": ["*"], "required": ["name", "provider"]},
      "sync-engine": {"reads": ["config", "mappings"], "writes": ["sync", "logs"], "required": ["config"]}
    }
  }',
  1
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- REPORT ENTITY TYPE
-- ============================================
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
  'report',
  'Report',
  'sprinter',
  false,
  '{
    "type": "object",
    "properties": {
      "id": {"type": "string", "format": "uuid"},
      "name": {"type": "string"},
      "type": {"type": "string", "enum": ["dashboard", "analytics", "financial", "operational", "custom"]},
      "format": {"type": "string", "enum": ["pdf", "excel", "csv", "json", "html"]},
      "status": {"type": "string", "enum": ["draft", "generating", "ready", "failed", "archived"]},
      "schedule": {
        "type": "object",
        "properties": {
          "frequency": {"type": "string", "enum": ["once", "daily", "weekly", "monthly", "quarterly", "yearly"]},
          "recipients": {"type": "array", "items": {"type": "string", "format": "email"}},
          "nextRun": {"type": "string", "format": "date-time"}
        }
      },
      "data": {
        "type": "object",
        "properties": {
          "source": {"type": "string"},
          "filters": {"type": "object"},
          "metrics": {"type": "array", "items": {"type": "string"}},
          "dimensions": {"type": "array", "items": {"type": "string"}},
          "timeRange": {"type": "object"}
        }
      },
      "visualization": {
        "type": "object",
        "properties": {
          "charts": {"type": "array", "items": {"type": "object"}},
          "tables": {"type": "array", "items": {"type": "object"}},
          "layout": {"type": "object"}
        }
      },
      "output": {
        "type": "object",
        "properties": {
          "url": {"type": "string", "format": "uri"},
          "size": {"type": "number"},
          "generatedAt": {"type": "string", "format": "date-time"}
        }
      },
      "permissions": {"type": "object"},
      "metadata": {"type": "object"},
      "createdAt": {"type": "string", "format": "date-time"},
      "updatedAt": {"type": "string", "format": "date-time"}
    },
    "required": ["name", "type", "format", "status"]
  }',
  '{
    "icon": "BarChart3",
    "displayName": "Report",
    "pluralName": "Reports",
    "listView": {
      "columns": ["name", "type", "format", "status", "schedule.frequency"],
      "defaultSort": {"field": "updatedAt", "direction": "desc"},
      "filters": ["type", "format", "status"]
    }
  }',
  '{
    "toolMappings": {
      "report-generator": {"reads": ["*"], "writes": ["output", "status"], "required": ["data", "format"]},
      "scheduler": {"reads": ["schedule"], "writes": ["schedule.nextRun"], "required": ["schedule"]}
    }
  }',
  1
) ON CONFLICT (slug) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_entity_types_namespace ON entity_types(namespace);
CREATE INDEX IF NOT EXISTS idx_entity_types_parent ON entity_types(parent_slug);
CREATE INDEX IF NOT EXISTS idx_entity_types_workspace ON entity_types(is_workspace) WHERE is_workspace = true;

-- Add a comment to document the entity hierarchy
COMMENT ON TABLE entity_types IS 'Core entity type registry for AI Sprinter Platform. Defines all business entities and their schemas.';
COMMENT ON COLUMN entity_types.is_workspace IS 'Indicates if this entity type serves as a workspace container for other entities';
COMMENT ON COLUMN entity_types.parent_slug IS 'References the parent entity type in hierarchical relationships';