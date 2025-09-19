import { z } from "zod";

// Service status
export const ServiceStatus = z.enum(["active", "beta", "coming_soon", "deprecated"]);

// Service categories
export const ServiceCategory = z.enum([
  "document-intelligence",
  "financial-automation",
  "operations",
  "logistics",
  "ai-agents",
  "integration",
  "analytics",
  "growth",
  "enablement",
  "compliance",
  "custom"
]);

// Service layout types
export const ServiceLayout = z.enum(["standard", "technical", "sales", "education", "custom"]);

// Animation types
export const AnimationType = z.enum(["fade", "slide", "scale", "none"]);

// Button variants
export const ButtonVariant = z.enum(["default", "outline", "ghost", "secondary", "destructive"]);

// CTA action types
export const CTAAction = z.enum(["demo", "contact", "calculator", "assessment", "download", "custom"]);

// Stat schema
export const StatSchema = z.object({
  value: z.string(),
  label: z.string(),
  color: z.string().optional()
});

// Badge schema
export const BadgeSchema = z.object({
  text: z.string(),
  icon: z.string() // lucide icon name
});

// Hero CTA schema
export const HeroCTASchema = z.object({
  primary: z.object({
    text: z.string(),
    action: CTAAction
  }),
  secondary: z.object({
    text: z.string(),
    href: z.string()
  })
});

// Hero section schema
export const HeroSchema = z.object({
  badge: BadgeSchema,
  headline: z.object({
    text: z.string(),
    highlighted: z.string()
  }),
  subheadline: z.string(),
  stats: z.array(StatSchema).optional(),
  cta: HeroCTASchema
});

// Challenge schema
export const ChallengeSchema = z.object({
  title: z.string(),
  problem: z.string(),
  solution: z.string(),
  outcome: z.string(),
  icon: z.string().optional()
});

// Capability schema
export const CapabilitySchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  features: z.array(z.string()),
  badge: z.string().optional()
});

// Implementation timeline schema
export const TimelinePhaseSchema = z.object({
  phase: z.string(),
  duration: z.string(),
  title: z.string(),
  activities: z.array(z.string()),
  milestone: z.string().optional()
});

export const ImplementationSchema = z.object({
  title: z.string(),
  description: z.string(),
  timeline: z.array(TimelinePhaseSchema)
});

// Metrics schema
export const BeforeAfterMetricSchema = z.object({
  metric: z.string(),
  before: z.string(),
  after: z.string(),
  improvement: z.string()
});

export const FinancialMetricsSchema = z.object({
  headline: z.string(),
  stats: z.array(z.object({
    label: z.string(),
    value: z.string(),
    description: z.string().optional()
  })),
  totalImpact: z.string(),
  impactPeriod: z.string()
});

export const MetricsSchema = z.object({
  beforeAfter: z.array(BeforeAfterMetricSchema).optional(),
  financial: FinancialMetricsSchema.optional()
});

// Use case schema
export const UseCaseSchema = z.object({
  title: z.string(),
  industry: z.string().optional(),
  challenge: z.string(),
  solution: z.string(),
  results: z.array(z.string()),
  metric: z.object({
    value: z.string(),
    label: z.string()
  }).optional()
});

// Pricing tier schema
export const PricingTierSchema = z.object({
  name: z.string(),
  price: z.string(),
  duration: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  highlighted: z.boolean().optional(),
  badge: z.string().optional()
});

// Testimonial schema
export const TestimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  company: z.string(),
  metric: z.string().optional()
});

// CTA section schema
export const CTASectionSchema = z.object({
  headline: z.string(),
  description: z.string(),
  buttons: z.array(z.object({
    text: z.string(),
    href: z.string(),
    variant: ButtonVariant,
    icon: z.string().optional()
  }))
});

// Custom block types
export const CustomBlockType = z.enum([
  "comparison",
  "workflow",
  "architecture",
  "faq",
  "calculator",
  "demo",
  "video",
  "case-study",
  "roi-calculator"
]);

export const CustomBlockPosition = z.enum([
  "after_hero",
  "after_challenges",
  "after_capabilities",
  "before_metrics",
  "after_metrics",
  "before_cta"
]);

export const CustomBlockSchema = z.object({
  type: CustomBlockType,
  position: CustomBlockPosition,
  data: z.any() // Block-specific data
});

// View configuration schema
export const ViewConfigSchema = z.object({
  layout: ServiceLayout,
  theme: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    accentColor: z.string()
  }),
  animations: z.object({
    enabled: z.boolean(),
    type: AnimationType
  }),
  components: z.object({
    showPricing: z.boolean(),
    showTestimonials: z.boolean(),
    showCalculator: z.boolean(),
    showDemo: z.boolean(),
    showComparison: z.boolean()
  })
});

// SEO metadata schema
export const MetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  ogImage: z.string().optional(),
  canonical: z.string().optional()
});

// Base service schema for creation
export const CreateServiceSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  name: z.string().min(1, "Name is required"),
  category: ServiceCategory,
  status: ServiceStatus.default("active"),

  // Content sections
  metadata: MetadataSchema,
  hero: HeroSchema,
  challenges: z.array(ChallengeSchema).optional(),
  capabilities: z.array(CapabilitySchema).optional(),
  implementation: ImplementationSchema.optional(),
  metrics: MetricsSchema.optional(),
  useCases: z.array(UseCaseSchema).optional(),
  pricing: z.object({
    tiers: z.array(PricingTierSchema)
  }).optional(),
  testimonials: z.array(TestimonialSchema).optional(),
  cta: CTASectionSchema,
  customBlocks: z.array(CustomBlockSchema).optional(),

  // View configuration
  viewConfig: ViewConfigSchema.default({
    layout: "standard",
    theme: {
      primaryColor: "blue",
      secondaryColor: "purple",
      accentColor: "green"
    },
    animations: {
      enabled: true,
      type: "fade"
    },
    components: {
      showPricing: true,
      showTestimonials: true,
      showCalculator: false,
      showDemo: false,
      showComparison: false
    }
  }),

  // Tracking
  tenantId: z.number().optional()
});

// Update schema (partial for updates)
export const UpdateServiceSchema = CreateServiceSchema.partial();

// Full service schema (includes system fields)
export const ServiceSchema = CreateServiceSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdBy: z.string().uuid().optional(),
  updatedBy: z.string().uuid().optional(),
  publishedAt: z.string().datetime().optional(),
  version: z.number().default(1)
});

// Database schema
export const ServiceDatabaseSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  status: z.string(),
  metadata: z.any(), // JSONB
  hero: z.any(), // JSONB
  challenges: z.any().optional(), // JSONB
  capabilities: z.any().optional(), // JSONB
  implementation: z.any().optional(), // JSONB
  metrics: z.any().optional(), // JSONB
  use_cases: z.any().optional(), // JSONB
  pricing: z.any().optional(), // JSONB
  testimonials: z.any().optional(), // JSONB
  cta: z.any(), // JSONB
  custom_blocks: z.any().optional(), // JSONB
  view_config: z.any(), // JSONB
  created_at: z.string(),
  updated_at: z.string(),
  created_by: z.string().uuid().optional(),
  updated_by: z.string().uuid().optional(),
  published_at: z.string().optional(),
  version: z.number(),
  tenant_id: z.number().optional()
});

// Type exports
export type Service = z.infer<typeof ServiceSchema>;
export type CreateService = z.infer<typeof CreateServiceSchema>;
export type UpdateService = z.infer<typeof UpdateServiceSchema>;
export type ServiceDatabase = z.infer<typeof ServiceDatabaseSchema>;