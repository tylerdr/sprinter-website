import { z } from "zod";

// Activity types for lead interactions
export const ActivityType = z.enum([
  "created",
  "updated",
  "contacted",
  "email_sent",
  "email_opened",
  "email_clicked",
  "phone_call",
  "text_sent",
  "meeting_scheduled",
  "meeting_completed",
  "qualification_changed",
  "assigned",
  "reassigned",
  "note_added",
  "document_requested",
  "document_received",
  "application_started",
  "application_completed",
  "pre_approval_started",
  "pre_approval_completed",
  "offer_sent",
  "offer_accepted",
  "offer_rejected",
  "closed_won",
  "closed_lost",
  "reopened",
  "archived"
]);

// Activity priority levels
export const ActivityPriority = z.enum(["low", "medium", "high", "urgent"]);

// Activity status
export const ActivityStatus = z.enum(["pending", "in_progress", "completed", "cancelled"]);

// Base activity schema for creation
export const CreateLeadActivitySchema = z.object({
  leadId: z.string().uuid().describe("ID of the lead this activity is associated with"),
  activityType: ActivityType.describe("Type of activity"),
  description: z.string().describe("Description of the activity"),

  // Optional fields
  priority: ActivityPriority.optional().describe("Priority level of the activity"),
  status: ActivityStatus.default("completed").describe("Status of the activity"),
  dueDate: z.string().datetime().optional().describe("Due date for pending activities"),
  completedAt: z.string().datetime().optional().describe("When the activity was completed"),

  // Metadata for additional context
  metadata: z.record(z.string(), z.any()).optional().describe("Additional activity metadata"),

  // Related entities
  createdBy: z.string().uuid().optional().describe("User who created the activity"),
  assignedTo: z.string().uuid().optional().describe("User assigned to handle this activity"),

  // Communication details (if applicable)
  communicationType: z.enum(["email", "phone", "text", "in_person", "video_call"]).optional(),
  communicationDirection: z.enum(["inbound", "outbound"]).optional(),
  communicationDuration: z.number().optional().describe("Duration in minutes for calls/meetings"),

  // Outcome tracking
  outcome: z.string().optional().describe("Outcome or result of the activity"),
  nextAction: z.string().optional().describe("Recommended next action"),

  // System tracking
  isAutomated: z.boolean().default(false).describe("Whether this activity was automated"),
  source: z.string().optional().describe("Source system or tool that created this activity")
});

// Update activity schema (partial for updates)
export const UpdateLeadActivitySchema = CreateLeadActivitySchema.partial().omit({
  leadId: true // Can't change the lead association
});

// Full activity schema (includes computed/system fields)
export const LeadActivitySchema = CreateLeadActivitySchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional()
});

// Database row schema (matches database table structure)
export const LeadActivityDatabaseSchema = z.object({
  id: z.string().uuid(),
  lead_id: z.string().uuid(),
  activity_type: z.string(),
  description: z.string(),
  priority: z.string().nullable(),
  status: z.string().nullable(),
  due_date: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
  metadata: z.record(z.string(), z.any()).nullable(),
  created_by: z.string().uuid().nullable(),
  assigned_to: z.string().uuid().nullable(),
  communication_type: z.string().nullable(),
  communication_direction: z.string().nullable(),
  communication_duration: z.number().nullable(),
  outcome: z.string().nullable(),
  next_action: z.string().nullable(),
  is_automated: z.boolean(),
  source: z.string().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable()
});

// Activity summary for reporting
export const ActivitySummarySchema = z.object({
  leadId: z.string().uuid(),
  totalActivities: z.number(),
  lastActivityDate: z.string().datetime(),
  lastActivityType: ActivityType,
  pendingActivities: z.number(),
  completedActivities: z.number(),
  nextDueActivity: z.object({
    id: z.string().uuid(),
    type: ActivityType,
    dueDate: z.string().datetime(),
    description: z.string()
  }).optional()
});

// Activity timeline item for display
export const ActivityTimelineItemSchema = z.object({
  id: z.string().uuid(),
  activityType: ActivityType,
  description: z.string(),
  createdAt: z.string().datetime(),
  createdBy: z.object({
    id: z.string().uuid(),
    name: z.string(),
    avatar: z.string().optional()
  }).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  isAutomated: z.boolean()
});

// Type exports
export type LeadActivity = z.infer<typeof LeadActivitySchema>;
export type CreateLeadActivity = z.infer<typeof CreateLeadActivitySchema>;
export type UpdateLeadActivity = z.infer<typeof UpdateLeadActivitySchema>;
export type LeadActivityDatabase = z.infer<typeof LeadActivityDatabaseSchema>;
export type ActivityType = z.infer<typeof ActivityType>;
export type ActivityPriority = z.infer<typeof ActivityPriority>;
export type ActivityStatus = z.infer<typeof ActivityStatus>;
export type ActivitySummary = z.infer<typeof ActivitySummarySchema>;
export type ActivityTimelineItem = z.infer<typeof ActivityTimelineItemSchema>;