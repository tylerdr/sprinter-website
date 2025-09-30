import { z } from "zod";

export const PECaseStudySchema = z.object({
  slug: z.string(),
  title: z.string(),
  firmType: z.string(), // e.g., "Mid-Market PE", "Growth Equity"
  fundSize: z.string(),
  description: z.string(),
  challenge: z.string(),
  solution: z.string(),
  implementation: z.object({
    timeline: z.string(),
    investment: z.string(),
    team: z.string(),
  }),
  results: z.array(z.object({
    metric: z.string(),
    label: z.string(),
    impact: z.string().optional()
  })),
  testimonial: z.string(),
  testimonialAuthor: z.object({
    name: z.string(),
    role: z.string(),
    firm: z.string()
  }),
  keyFeatures: z.array(z.string()),
  gradient: z.string(),
  featured: z.boolean().optional(),
});

export type PECaseStudy = z.infer<typeof PECaseStudySchema>;

// PE case studies removed - we use anonymized examples in blog articles instead
// Real client success stories are in case-studies-data.ts
export const peCaseStudies: PECaseStudy[] = [];