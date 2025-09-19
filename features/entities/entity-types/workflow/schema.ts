import { z } from "zod";

// Workflow status enum
export const WorkflowStatus = z.enum([
  "draft",
  "active",
  "paused",
  "completed",
  "archived"
]);

// Trigger type enum
export const TriggerType = z.enum([
  "manual",
  "schedule",
  "event",
  "webhook",
  "api"
]);

// Step schema
export const StepSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  config: z.record(z.string(), z.any()),
  inputs: z.array(z.string()).default([]),
  outputs: z.array(z.string()).default([]),
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.string(),
    value: z.any()
  })).default([]),
  error_handling: z.object({
    retry_count: z.number().default(0),
    retry_delay: z.number().default(0),
    fallback_step: z.string().optional()
  }).optional()
});

// Workflow schema
export const WorkflowSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  status: WorkflowStatus,
  description: z.string(),
  
  // Trigger configuration
  trigger: z.object({
    type: TriggerType,
    config: z.record(z.string(), z.any()).default({}),
    schedule: z.string().optional(),
    events: z.array(z.string()).default([])
  }),
  
  // Workflow steps
  steps: z.array(StepSchema).default([]),
  
  // Variables and parameters
  variables: z.record(z.string(), z.object({
    type: z.string(),
    default: z.any().optional(),
    required: z.boolean().default(false)
  })).default({}),
  
  // Execution settings
  settings: z.object({
    timeout: z.number().default(3600),
    max_retries: z.number().default(3),
    parallel_execution: z.boolean().default(false),
    notifications: z.object({
      on_success: z.boolean().default(false),
      on_failure: z.boolean().default(true),
      recipients: z.array(z.string().email()).default([])
    }).default({
      on_success: false,
      on_failure: true,
      recipients: []
    })
  }).default({
    timeout: 3600,
    max_retries: 3,
    parallel_execution: false,
    notifications: {
      on_success: false,
      on_failure: true,
      recipients: []
    }
  }),
  
  // Execution history
  last_run: z.object({
    started_at: z.string().datetime(),
    completed_at: z.string().datetime().optional(),
    status: z.enum(["running", "completed", "failed"]),
    error: z.string().optional()
  }).optional(),
  
  // Statistics
  stats: z.object({
    total_runs: z.number().default(0),
    successful_runs: z.number().default(0),
    failed_runs: z.number().default(0),
    average_duration_ms: z.number().default(0)
  }).default({
    total_runs: 0,
    successful_runs: 0,
    failed_runs: 0,
    average_duration_ms: 0
  }),
  
  // Custom fields
  metadata: z.record(z.string(), z.any()).default({}),
  
  // Timestamps
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  tenant_id: z.number().optional()
});

// Export types
export type Workflow = z.infer<typeof WorkflowSchema>;
export type CreateWorkflow = z.infer<typeof WorkflowSchema>;
export type UpdateWorkflow = Partial<CreateWorkflow>;
export type WorkflowStatus = z.infer<typeof WorkflowStatus>;
export type TriggerType = z.infer<typeof TriggerType>;