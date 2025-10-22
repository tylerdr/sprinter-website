import { z } from "zod";

// Use case status
export const UseCaseStatus = z.enum(["active", "beta", "coming_soon", "deprecated"]);

// Use case difficulty levels
export const UseCaseDifficulty = z.enum(["Easy", "Medium", "Advanced"]);

// Use case categories based on business function
export const UseCaseCategory = z.enum([
  "automation",
  "analytics",
  "customer-service",
  "operations",
  "finance",
  "marketing",
  "sales",
  "hr",
  "legal",
  "compliance",
  "security",
  "custom"
]);

// Industry alignment
export const IndustryType = z.enum([
  "finance",
  "healthcare",
  "retail",
  "manufacturing",
  "legal",
  "real-estate",
  "technology",
  "education",
  "logistics",
  "private-equity"
]);

// Role types that benefit from use case
export const RoleType = z.enum([
  "ceo",
  "cto",
  "cfo",
  "coo",
  "sales-manager",
  "marketing-director",
  "operations-manager",
  "hr-director",
  "legal-counsel",
  "data-analyst"
]);

// Implementation complexity
export const ImplementationComplexity = z.enum(["simple", "moderate", "complex", "enterprise"]);

// ROI timeframe
export const ROITimeframe = z.enum(["immediate", "30-days", "60-days", "90-days", "6-months", "12-months"]);

// Benefit metric schema
export const BenefitMetricSchema = z.object({
  metric: z.string(),
  value: z.string(),
  unit: z.string().optional(),
  context: z.string().optional()
});

// Technical requirement schema
export const TechnicalRequirementSchema = z.object({
  name: z.string(),
  description: z.string(),
  required: z.boolean().default(true),
  alternatives: z.array(z.string()).optional()
});

// Implementation phase schema
export const ImplementationPhaseSchema = z.object({
  phase: z.string(),
  duration: z.string(),
  activities: z.array(z.string()),
  deliverables: z.array(z.string()),
  milestone: z.string().optional()
});

// Success criteria schema
export const SuccessCriteriaSchema = z.object({
  criterion: z.string(),
  target: z.string(),
  measurement: z.string(),
  timeframe: z.string()
});

// Risk assessment schema
export const RiskAssessmentSchema = z.object({
  risk: z.string(),
  probability: z.enum(["low", "medium", "high"]),
  impact: z.enum(["low", "medium", "high", "critical"]),
  mitigation: z.string()
});

// Tool integration schema
export const ToolIntegrationSchema = z.object({
  tool: z.string(),
  category: z.string(),
  required: z.boolean(),
  purpose: z.string(),
  alternatives: z.array(z.string()).optional()
});

// MCP server requirement schema
export const MCPServerSchema = z.object({
  serverId: z.string(),
  name: z.string(),
  purpose: z.string(),
  required: z.boolean().default(true)
});

// Base use case schema for creation
export const CreateUseCaseSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  title: z.string().min(1, "Title is required"),
  category: UseCaseCategory,
  status: UseCaseStatus.default("active"),
  difficulty: UseCaseDifficulty,

  // Basic information
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().max(160, "Short description must be under 160 characters"),

  // Business context
  industries: z.array(IndustryType),
  roles: z.array(RoleType),
  businessValue: z.string(),

  // Implementation details
  complexity: ImplementationComplexity,
  timeToValue: ROITimeframe,
  estimatedDuration: z.string(),

  // Benefits and ROI
  benefits: z.array(BenefitMetricSchema),
  roiDescription: z.string(),
  roiRange: z.string(), // e.g., "100-200% in 3-6 months"

  // Technical requirements
  technicalRequirements: z.array(TechnicalRequirementSchema),
  toolIntegrations: z.array(ToolIntegrationSchema),
  mcpServers: z.array(MCPServerSchema).optional(),

  // Implementation
  implementationPhases: z.array(ImplementationPhaseSchema),
  successCriteria: z.array(SuccessCriteriaSchema),
  riskAssessment: z.array(RiskAssessmentSchema).optional(),

  // Content
  challenges: z.array(z.string()),
  solutions: z.array(z.string()),
  outcomes: z.array(z.string()),

  // Case studies and examples
  caseStudies: z.array(z.object({
    title: z.string(),
    industry: z.string(),
    challenge: z.string(),
    solution: z.string(),
    results: z.array(z.string()),
    testimonial: z.object({
      quote: z.string(),
      author: z.string(),
      role: z.string(),
      company: z.string()
    }).optional()
  })).optional(),

  // SEO and metadata
  metadata: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    ogImage: z.string().optional(),
    canonical: z.string().optional()
  }),

  // Related content
  relatedUseCases: z.array(z.string()).optional(), // Array of use case IDs
  relatedIndustries: z.array(z.string()).optional(), // Array of industry IDs

  // Tracking
  tenantId: z.number().optional(),
  featured: z.boolean().default(false),
  priority: z.number().default(0) // For ordering
});

// Update schema (partial for updates)
export const UpdateUseCaseSchema = CreateUseCaseSchema.partial();

// Full use case schema (includes system fields)
export const UseCaseSchema = CreateUseCaseSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdBy: z.string().uuid().optional(),
  updatedBy: z.string().uuid().optional(),
  publishedAt: z.string().datetime().optional(),
  version: z.number().default(1),
  viewCount: z.number().default(0),
  conversionRate: z.number().optional()
});

// Database schema
export const UseCaseDatabaseSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  status: z.string(),
  difficulty: z.string(),
  description: z.string(),
  short_description: z.string(),
  industries: z.any(), // JSONB array
  roles: z.any(), // JSONB array
  business_value: z.string(),
  complexity: z.string(),
  time_to_value: z.string(),
  estimated_duration: z.string(),
  benefits: z.any(), // JSONB
  roi_description: z.string(),
  roi_range: z.string(),
  technical_requirements: z.any(), // JSONB
  tool_integrations: z.any(), // JSONB
  mcp_servers: z.any().optional(), // JSONB
  implementation_phases: z.any(), // JSONB
  success_criteria: z.any(), // JSONB
  risk_assessment: z.any().optional(), // JSONB
  challenges: z.any(), // JSONB array
  solutions: z.any(), // JSONB array
  outcomes: z.any(), // JSONB array
  case_studies: z.any().optional(), // JSONB
  metadata: z.any(), // JSONB
  related_use_cases: z.any().optional(), // JSONB array
  related_industries: z.any().optional(), // JSONB array
  featured: z.boolean(),
  priority: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by: z.string().uuid().optional(),
  updated_by: z.string().uuid().optional(),
  published_at: z.string().optional(),
  version: z.number(),
  view_count: z.number(),
  conversion_rate: z.number().optional(),
  tenant_id: z.number().optional()
});

// Type exports
export type UseCase = z.infer<typeof UseCaseSchema>;
export type CreateUseCase = z.infer<typeof CreateUseCaseSchema>;
export type UpdateUseCase = z.infer<typeof UpdateUseCaseSchema>;
export type UseCaseDatabase = z.infer<typeof UseCaseDatabaseSchema>;

// Helper type for use case filtering
export type UseCaseFilters = {
  category?: z.infer<typeof UseCaseCategory>;
  industry?: z.infer<typeof IndustryType>;
  role?: z.infer<typeof RoleType>;
  difficulty?: z.infer<typeof UseCaseDifficulty>;
  complexity?: z.infer<typeof ImplementationComplexity>;
  timeToValue?: z.infer<typeof ROITimeframe>;
  featured?: boolean;
  status?: z.infer<typeof UseCaseStatus>;
};