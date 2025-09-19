import { z } from "zod";

// Team member role enum
export const TeamMemberRole = z.enum([
  "owner",
  "admin",
  "manager",
  "member",
  "viewer"
]);

// Team member status enum
export const TeamMemberStatus = z.enum([
  "active",
  "inactive",
  "pending",
  "suspended"
]);

// Department enum
export const Department = z.enum([
  "engineering",
  "product",
  "design",
  "marketing",
  "sales",
  "support",
  "hr",
  "finance",
  "operations",
  "other"
]);

// Skill schema
export const SkillSchema = z.object({
  name: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  years: z.number().optional()
});

// Team member schema
export const TeamMemberSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  role: TeamMemberRole,
  status: TeamMemberStatus,
  
  // Profile information
  profile: z.object({
    title: z.string().optional(),
    department: Department.optional(),
    manager_id: z.string().uuid().optional(),
    location: z.string().optional(),
    timezone: z.string().optional(),
    bio: z.string().optional(),
    avatar_url: z.string().url().optional()
  }).default({}),
  
  // Contact information
  contact: z.object({
    phone: z.string().optional(),
    slack: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional()
  }).default({}),
  
  // Skills and expertise
  skills: z.array(SkillSchema).default([]),
  certifications: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  
  // Permissions
  permissions: z.object({
    can_create_projects: z.boolean().default(false),
    can_manage_team: z.boolean().default(false),
    can_view_financials: z.boolean().default(false),
    can_approve_invoices: z.boolean().default(false),
    custom: z.record(z.string(), z.boolean()).default({})
  }).default({
    can_create_projects: false,
    can_manage_team: false,
    can_view_financials: false,
    can_approve_invoices: false,
    custom: {}
  }),
  
  // Activity tracking
  activity: z.object({
    last_login: z.string().datetime().optional(),
    last_activity: z.string().datetime().optional(),
    total_hours: z.number().default(0),
    projects_completed: z.number().default(0)
  }).default({
    total_hours: 0,
    projects_completed: 0
  }),
  
  // Custom fields
  metadata: z.record(z.string(), z.any()).default({}),
  
  // Timestamps
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  invited_at: z.string().datetime().optional(),
  joined_at: z.string().datetime().optional(),
  tenant_id: z.number().optional()
});

// Create and Update schemas
export const CreateTeamMemberSchema = TeamMemberSchema.omit({ id: true, created_at: true, updated_at: true });
export const UpdateTeamMemberSchema = CreateTeamMemberSchema.partial();

// Export types
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type CreateTeamMember = z.infer<typeof CreateTeamMemberSchema>;
export type UpdateTeamMember = z.infer<typeof UpdateTeamMemberSchema>;
export type TeamMemberRole = z.infer<typeof TeamMemberRole>;
export type TeamMemberStatus = z.infer<typeof TeamMemberStatus>;
export type Department = z.infer<typeof Department>;