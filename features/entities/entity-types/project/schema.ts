import { z } from "zod";

// Project status enum
export const ProjectStatus = z.enum([
  "planning",
  "active",
  "on_hold",
  "completed",
  "cancelled"
]);

// Project priority enum
export const ProjectPriority = z.enum([
  "low",
  "medium",
  "high",
  "critical"
]);

// Milestone schema
export const MilestoneSchema = z.object({
  name: z.string(),
  due_date: z.string().datetime(),
  status: z.enum(["pending", "in_progress", "completed"]),
  description: z.string().optional()
});

// Project schema
export const ProjectSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  customer_id: z.string().uuid(),
  status: ProjectStatus,
  priority: ProjectPriority,
  
  // Project details
  description: z.string(),
  objectives: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),
  
  // Timeline
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  milestones: z.array(MilestoneSchema).default([]),
  
  // Budget
  budget: z.object({
    estimated: z.number(),
    approved: z.number(),
    spent: z.number().default(0),
    currency: z.string().default("USD")
  }).optional(),
  
  // Team
  team: z.object({
    project_manager: z.string().uuid().optional(),
    members: z.array(z.string().uuid()).default([]),
    stakeholders: z.array(z.object({
      user_id: z.string().uuid(),
      role: z.string()
    })).default([])
  }).default({
    members: [],
    stakeholders: []
  }),
  
  // Settings
  settings: z.object({
    notifications: z.boolean().default(true),
    auto_archive: z.boolean().default(false),
    visibility: z.enum(["public", "private", "team"]).default("team")
  }).default({
    notifications: true,
    auto_archive: false,
    visibility: "team"
  }),
  
  // Custom fields
  metadata: z.record(z.string(), z.any()).default({}),
  
  // Timestamps
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  tenant_id: z.number().optional()
});

// Export types
export type Project = z.infer<typeof ProjectSchema>;
export type CreateProject = z.infer<typeof ProjectSchema>;
export type UpdateProject = Partial<CreateProject>;
export type ProjectStatus = z.infer<typeof ProjectStatus>;
export type ProjectPriority = z.infer<typeof ProjectPriority>;