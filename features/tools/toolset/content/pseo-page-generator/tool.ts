/**
 * pSEO Page Generator Tool
 * Generates programmatic SEO pages from entity data
 */

import { z } from "zod";
import { ToolSpec } from "@/features/tools/types";
import { migrateUseCases } from "@/lib/data-migration/use-cases-migration";
import { migrateIndustries } from "@/lib/data-migration/industries-migration";
import { generateCompleteUseCaseSchema } from "@/lib/structured-data/use-case-schema";
import { generateCompleteIndustrySchema } from "@/lib/structured-data/industry-schema";
import type { ToolCategory } from "@/features/tools/constants/categories";

// Input schema for the tool
const pSEOGeneratorInputSchema = z.object({
  entityTypes: z.array(z.enum(["use-cases", "industries", "combinations", "comparisons", "locations"])).default(["use-cases", "industries"]),
  generateStructuredData: z.boolean().default(true),
  generateSitemap: z.boolean().default(true),
  maxPages: z.number().min(1).max(10000).default(1000),
  priorityOnly: z.boolean().default(false),
  includeAnalytics: z.boolean().default(true)
});

// Output schema for the tool
const pSEOGeneratorOutputSchema = z.object({
  success: z.boolean(),
  generated: z.object({
    total: z.number(),
    byType: z.record(z.string(), z.number()),
    pages: z.array(z.object({
      type: z.string(),
      slug: z.string(),
      title: z.string(),
      path: z.string(),
      priority: z.number(),
      metadata: z.object({
        title: z.string(),
        description: z.string(),
        keywords: z.array(z.string())
      }).optional(),
      structuredData: z.any().optional()
    })),
    sitemap: z.array(z.object({
      url: z.string(),
      lastModified: z.string(),
      changeFrequency: z.string(),
      priority: z.number()
    })).optional()
  }),
  analytics: z.object({
    estimatedTraffic: z.string(),
    keywordOpportunities: z.number(),
    competitiveAdvantage: z.string(),
    timeToIndex: z.string()
  }).optional(),
  errors: z.array(z.string()).optional()
});

// Tool implementation
const tool: ToolSpec<typeof pSEOGeneratorInputSchema, typeof pSEOGeneratorOutputSchema> = {
  slug: "pseo-page-generator",
  name: "pSEO Page Generator",
  description: "Generate programmatic SEO pages from entity data including use cases, industries, and combinations",
  category: "content" as ToolCategory,
  inputSchema: pSEOGeneratorInputSchema,
  outputSchema: pSEOGeneratorOutputSchema,
  executionMode: "server" as const,
  metadata: {
    tags: ["seo", "content", "automation", "entities"],
    owner: "Sprinter AI",
    active: true
  },
  execute: async (input: z.infer<typeof pSEOGeneratorInputSchema>) => {
    const {
      entityTypes,
      generateStructuredData,
      generateSitemap,
      maxPages,
      priorityOnly,
      includeAnalytics
    } = input;
    try {
      const generatedPages: any[] = [];
      const errors: string[] = [];
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sprinter.ai";

      // Get entity data
      const useCases = migrateUseCases();
      const industries = migrateIndustries();

      // Generate individual entity pages
      if (entityTypes.includes("use-cases")) {
        for (const useCase of useCases) {
          if (priorityOnly && !useCase.featured) continue;

          const structuredData = generateStructuredData
            ? generateCompleteUseCaseSchema(useCase as any, baseUrl)
            : undefined;

          generatedPages.push({
            type: "use-case",
            slug: useCase.slug,
            title: useCase.title,
            path: `/use-cases/${useCase.slug}`,
            priority: useCase.featured ? 1.0 : 0.8,
            metadata: useCase.metadata,
            structuredData
          });
        }
      }

      if (entityTypes.includes("industries")) {
        for (const industry of industries) {
          if (priorityOnly && !industry.featured) continue;

          const structuredData = generateStructuredData
            ? generateCompleteIndustrySchema(industry as any, baseUrl)
            : undefined;

          generatedPages.push({
            type: "industry",
            slug: industry.slug,
            title: industry.name,
            path: `/industries/${industry.slug}`,
            priority: industry.featured ? 1.0 : 0.8,
            metadata: industry.metadata,
            structuredData
          });
        }
      }

      // Generate combination pages
      if (entityTypes.includes("combinations")) {
        for (const industry of industries) {
          for (const useCase of useCases) {
            if (useCase.industries.includes(industry.slug as any)) {
              if (generatedPages.length >= maxPages) break;

              generatedPages.push({
                type: "industry-use-case",
                slug: `${industry.slug}-${useCase.slug}`,
                title: `${useCase.title} for ${industry.name}`,
                path: `/industries/${industry.slug}/use-cases/${useCase.slug}`,
                priority: 0.9,
                metadata: {
                  title: `${useCase.title} for ${industry.name} - Implementation Guide`,
                  description: `How to implement ${useCase.title.toLowerCase()} in the ${industry.name.toLowerCase()} industry. ${useCase.description}`,
                  keywords: [
                    ...useCase.metadata.keywords,
                    ...industry.metadata.keywords,
                    `${useCase.title.toLowerCase()} ${industry.name.toLowerCase()}`,
                    `${industry.name.toLowerCase()} ${useCase.title.toLowerCase()}`
                  ]
                }
              });
            }
          }
          if (generatedPages.length >= maxPages) break;
        }
      }

      // Generate comparison pages
      if (entityTypes.includes("comparisons")) {
        // Use case comparisons by category
        const useCasesByCategory = useCases.reduce((acc, uc) => {
          if (!acc[uc.category]) acc[uc.category] = [];
          acc[uc.category].push(uc);
          return acc;
        }, {} as Record<string, any[]>);

        Object.entries(useCasesByCategory).forEach(([category, categoryUseCases]) => {
          if (categoryUseCases.length >= 2) {
            for (let i = 0; i < categoryUseCases.length - 1 && generatedPages.length < maxPages; i++) {
              for (let j = i + 1; j < categoryUseCases.length && generatedPages.length < maxPages; j++) {
                const useCase1 = categoryUseCases[i];
                const useCase2 = categoryUseCases[j];

                generatedPages.push({
                  type: "use-case-comparison",
                  slug: `${useCase1.slug}-vs-${useCase2.slug}`,
                  title: `${useCase1.title} vs ${useCase2.title}`,
                  path: `/compare/${useCase1.slug}-vs-${useCase2.slug}`,
                  priority: 0.7,
                  metadata: {
                    title: `${useCase1.title} vs ${useCase2.title} - Which AI Solution is Right for You?`,
                    description: `Compare ${useCase1.title} and ${useCase2.title}. See differences in implementation, ROI, complexity, and use cases.`,
                    keywords: [
                      `${useCase1.title.toLowerCase()} vs ${useCase2.title.toLowerCase()}`,
                      `compare ${useCase1.title.toLowerCase()}`,
                      `${useCase1.title.toLowerCase()} comparison`,
                      category,
                      "ai solution comparison"
                    ]
                  }
                });
              }
            }
          }
        });
      }

      // Generate location-based pages
      if (entityTypes.includes("locations")) {
        const majorCities = [
          { city: "New York", state: "NY", slug: "new-york-ny" },
          { city: "San Francisco", state: "CA", slug: "san-francisco-ca" },
          { city: "Chicago", state: "IL", slug: "chicago-il" },
          { city: "Austin", state: "TX", slug: "austin-tx" },
          { city: "Boston", state: "MA", slug: "boston-ma" },
          { city: "Seattle", state: "WA", slug: "seattle-wa" }
        ];

        const highValueIndustries = industries.filter(ind =>
          ["finance", "healthcare", "technology", "real-estate"].includes(ind.slug)
        );

        for (const location of majorCities) {
          for (const industry of highValueIndustries) {
            if (generatedPages.length >= maxPages) break;

            generatedPages.push({
              type: "location-industry",
              slug: `${location.slug}-${industry.slug}`,
              title: `AI Solutions for ${industry.name} in ${location.city}, ${location.state}`,
              path: `/locations/${location.slug}/${industry.slug}`,
              priority: 0.8,
              metadata: {
                title: `AI Solutions for ${industry.name} in ${location.city}, ${location.state} - Local Implementation`,
                description: `Discover AI transformation opportunities for ${industry.name.toLowerCase()} companies in ${location.city}. Local insights, case studies, and implementation partners.`,
                keywords: [
                  `ai ${industry.name.toLowerCase()} ${location.city.toLowerCase()}`,
                  `${industry.name.toLowerCase()} ai solutions ${location.city.toLowerCase()}`,
                  `${location.city.toLowerCase()} ${industry.name.toLowerCase()} automation`,
                  `ai consulting ${location.city.toLowerCase()}`,
                  `${location.state.toLowerCase()} ${industry.name.toLowerCase()} ai`
                ]
              }
            });
          }
          if (generatedPages.length >= maxPages) break;
        }
      }

      // Limit to maxPages
      const limitedPages = generatedPages.slice(0, maxPages);

      // Sort by priority
      limitedPages.sort((a, b) => b.priority - a.priority);

      // Generate sitemap if requested
      const sitemap = generateSitemap ? limitedPages.map(page => ({
        url: `${baseUrl}${page.path}`,
        lastModified: new Date().toISOString(),
        changeFrequency: page.type.includes("comparison") ? "monthly" : "weekly",
        priority: page.priority
      })) : undefined;

      // Generate analytics insights if requested
      const analytics = includeAnalytics ? {
        estimatedTraffic: "300-500% organic traffic increase expected",
        keywordOpportunities: limitedPages.reduce((acc, page) =>
          acc + (page.metadata?.keywords?.length || 0), 0
        ),
        competitiveAdvantage: "First-mover advantage in AI consulting pSEO",
        timeToIndex: "2-6 weeks for most pages"
      } : undefined;

      // Count by type
      const byType = limitedPages.reduce((acc, page) => {
        acc[page.type] = (acc[page.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        success: true,
        generated: {
          total: limitedPages.length,
          byType,
          pages: limitedPages,
          sitemap
        },
        analytics,
        errors: errors.length > 0 ? errors : undefined
      };

    } catch (error) {
      console.error("Error in pSEO generator tool:", error);
      return {
        success: false,
        generated: {
          total: 0,
          byType: {},
          pages: []
        },
        errors: [error instanceof Error ? error.message : "Unknown error occurred"]
      };
    }
  }
};

export default tool;