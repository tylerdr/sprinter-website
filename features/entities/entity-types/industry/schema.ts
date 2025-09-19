import { z } from "zod";

// Industry status
export const IndustryStatus = z.enum(["active", "beta", "coming_soon", "deprecated"]);

// Industry categories based on market segments
export const IndustryCategory = z.enum([
  "financial-services",
  "healthcare",
  "technology",
  "manufacturing",
  "retail-ecommerce",
  "real-estate",
  "professional-services",
  "education",
  "logistics-supply-chain",
  "energy-utilities",
  "government",
  "non-profit",
  "media-entertainment",
  "private-equity"
]);

// Market size categories
export const MarketSize = z.enum(["startup", "small", "medium", "enterprise", "global"]);

// AI maturity levels for industries
export const AIMaturity = z.enum(["early", "developing", "advanced", "leading"]);

// Regulatory environment
export const RegulatoryComplexity = z.enum(["low", "medium", "high", "critical"]);

// Challenge category schema
export const ChallengeCategorySchema = z.object({
  category: z.string(),
  challenges: z.array(z.string()),
  priority: z.enum(["low", "medium", "high", "critical"]),
  aiReadiness: z.enum(["ready", "moderate", "complex", "not-ready"])
});

// Market metrics schema
export const MarketMetricsSchema = z.object({
  size: z.string(), // e.g., "$2.5T global market"
  growth: z.string(), // e.g., "12% CAGR"
  digitalAdoption: z.string(), // e.g., "65% digitally mature"
  aiSpending: z.string().optional(), // e.g., "$50B in AI investments"
  employeeCount: z.string().optional() // e.g., "Average 500-5000 employees"
});

// Use case opportunity schema
export const UseCaseOpportunitySchema = z.object({
  useCaseId: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.enum(["low", "medium", "high", "critical"]),
  roiPotential: z.string(),
  timeToValue: z.string(),
  complexity: z.enum(["simple", "moderate", "complex", "enterprise"]),
  adoptionRate: z.string().optional() // e.g., "35% of firms implementing"
});

// Technology adoption schema
export const TechnologyAdoptionSchema = z.object({
  category: z.string(), // e.g., "Document Processing"
  tools: z.array(z.object({
    name: z.string(),
    adoptionRate: z.string(),
    useCases: z.array(z.string()),
    roiRange: z.string()
  })),
  trends: z.array(z.string()),
  barriers: z.array(z.string())
});

// Regulatory requirement schema
export const RegulatoryRequirementSchema = z.object({
  regulation: z.string(),
  description: z.string(),
  impact: z.enum(["low", "medium", "high", "blocking"]),
  aiImplications: z.string(),
  compliance: z.array(z.string())
});

// Success story schema
export const SuccessStorySchema = z.object({
  company: z.string(),
  size: MarketSize,
  challenge: z.string(),
  solution: z.string(),
  results: z.array(z.object({
    metric: z.string(),
    value: z.string(),
    timeframe: z.string()
  })),
  testimonial: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string()
  }).optional()
});

// Competitive landscape schema
export const CompetitiveLandscapeSchema = z.object({
  leaders: z.array(z.string()),
  emergingPlayers: z.array(z.string()),
  trends: z.array(z.string()),
  opportunities: z.array(z.string()),
  threats: z.array(z.string())
});

// Partnership opportunity schema
export const PartnershipOpportunitySchema = z.object({
  type: z.enum(["technology", "channel", "strategic", "implementation"]),
  description: z.string(),
  benefits: z.array(z.string()),
  requirements: z.array(z.string()),
  timeline: z.string()
});

// Base industry schema for creation
export const CreateIndustrySchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  name: z.string().min(1, "Name is required"),
  category: IndustryCategory,
  status: IndustryStatus.default("active"),

  // Basic information
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().max(160, "Short description must be under 160 characters"),
  icon: z.string().optional(), // Emoji or icon identifier

  // Market context
  marketMetrics: MarketMetricsSchema,
  aiMaturity: AIMaturity,
  regulatoryComplexity: RegulatoryComplexity,

  // Challenges and opportunities
  challengeCategories: z.array(ChallengeCategorySchema),
  useCaseOpportunities: z.array(UseCaseOpportunitySchema),

  // Technology landscape
  technologyAdoption: z.array(TechnologyAdoptionSchema),
  topTools: z.array(z.string()),
  emergingTech: z.array(z.string()),

  // Regulatory and compliance
  regulatoryRequirements: z.array(RegulatoryRequirementSchema).optional(),
  complianceStandards: z.array(z.string()).optional(),

  // Success stories and case studies
  successStories: z.array(SuccessStorySchema).optional(),

  // Business insights
  averageROI: z.string(), // e.g., "120-250% typical ROI in 3-6 months"
  implementationTimeline: z.string(), // e.g., "3-6 months typical implementation"
  budgetRange: z.string().optional(), // e.g., "$50K-500K typical investment"

  // Competitive landscape
  competitiveLandscape: CompetitiveLandscapeSchema.optional(),

  // Partnership opportunities
  partnershipOpportunities: z.array(PartnershipOpportunitySchema).optional(),

  // Content sections
  keyTrends: z.array(z.string()),
  futureOutlook: z.string(),
  gettingStarted: z.array(z.object({
    step: z.string(),
    description: z.string(),
    duration: z.string(),
    deliverables: z.array(z.string())
  })),

  // SEO and metadata
  metadata: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    ogImage: z.string().optional(),
    canonical: z.string().optional()
  }),

  // Related content
  relatedIndustries: z.array(z.string()).optional(), // Array of industry IDs
  relatedUseCases: z.array(z.string()).optional(), // Array of use case IDs

  // Tracking and organization
  tenantId: z.number().optional(),
  featured: z.boolean().default(false),
  priority: z.number().default(0), // For ordering
  tags: z.array(z.string()).optional()
});

// Update schema (partial for updates)
export const UpdateIndustrySchema = CreateIndustrySchema.partial();

// Full industry schema (includes system fields)
export const IndustrySchema = CreateIndustrySchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdBy: z.string().uuid().optional(),
  updatedBy: z.string().uuid().optional(),
  publishedAt: z.string().datetime().optional(),
  version: z.number().default(1),
  viewCount: z.number().default(0),
  leadConversion: z.number().default(0),
  marketShare: z.number().optional() // % of target market reached
});

// Database schema
export const IndustryDatabaseSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  status: z.string(),
  description: z.string(),
  short_description: z.string(),
  icon: z.string().optional(),
  market_metrics: z.any(), // JSONB
  ai_maturity: z.string(),
  regulatory_complexity: z.string(),
  challenge_categories: z.any(), // JSONB
  use_case_opportunities: z.any(), // JSONB
  technology_adoption: z.any(), // JSONB
  top_tools: z.any(), // JSONB array
  emerging_tech: z.any(), // JSONB array
  regulatory_requirements: z.any().optional(), // JSONB
  compliance_standards: z.any().optional(), // JSONB array
  success_stories: z.any().optional(), // JSONB
  average_roi: z.string(),
  implementation_timeline: z.string(),
  budget_range: z.string().optional(),
  competitive_landscape: z.any().optional(), // JSONB
  partnership_opportunities: z.any().optional(), // JSONB
  key_trends: z.any(), // JSONB array
  future_outlook: z.string(),
  getting_started: z.any(), // JSONB
  metadata: z.any(), // JSONB
  related_industries: z.any().optional(), // JSONB array
  related_use_cases: z.any().optional(), // JSONB array
  featured: z.boolean(),
  priority: z.number(),
  tags: z.any().optional(), // JSONB array
  created_at: z.string(),
  updated_at: z.string(),
  created_by: z.string().uuid().optional(),
  updated_by: z.string().uuid().optional(),
  published_at: z.string().optional(),
  version: z.number(),
  view_count: z.number(),
  lead_conversion: z.number(),
  market_share: z.number().optional(),
  tenant_id: z.number().optional()
});

// Type exports
export type Industry = z.infer<typeof IndustrySchema>;
export type CreateIndustry = z.infer<typeof CreateIndustrySchema>;
export type UpdateIndustry = z.infer<typeof UpdateIndustrySchema>;
export type IndustryDatabase = z.infer<typeof IndustryDatabaseSchema>;

// Helper type for industry filtering
export type IndustryFilters = {
  category?: z.infer<typeof IndustryCategory>;
  aiMaturity?: z.infer<typeof AIMaturity>;
  regulatoryComplexity?: z.infer<typeof RegulatoryComplexity>;
  marketSize?: z.infer<typeof MarketSize>;
  featured?: boolean;
  status?: z.infer<typeof IndustryStatus>;
  tags?: string[];
};