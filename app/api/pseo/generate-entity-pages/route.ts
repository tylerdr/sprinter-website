import { NextRequest, NextResponse } from "next/server";
import { migrateUseCases } from "@/lib/data-migration/use-cases-migration";
import { migrateIndustries } from "@/lib/data-migration/industries-migration";

// POST /api/pseo/generate-entity-pages - Generate pSEO pages from entities
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      entityTypes = ["use-cases", "industries"],
      crossReference = true,
      generateCombinations = true
    } = body;

    const generatedPages = [];

    // Get entity data
    const useCases = migrateUseCases();
    const industries = migrateIndustries();

    // Generate individual entity pages
    if (entityTypes.includes("use-cases")) {
      for (const useCase of useCases) {
        generatedPages.push({
          type: "use-case",
          slug: useCase.slug,
          title: useCase.title,
          path: `/use-cases/${useCase.slug}`,
          metadata: useCase.metadata,
          entity: useCase,
          priority: useCase.featured ? 1.0 : 0.8
        });
      }
    }

    if (entityTypes.includes("industries")) {
      for (const industry of industries) {
        generatedPages.push({
          type: "industry",
          slug: industry.slug,
          title: industry.name,
          path: `/industries/${industry.slug}`,
          metadata: industry.metadata,
          entity: industry,
          priority: industry.featured ? 1.0 : 0.8
        });
      }
    }

    // Generate cross-reference pages if enabled
    if (crossReference) {
      // Industry + Use Case combinations
      for (const industry of industries) {
        for (const useCase of useCases) {
          if (useCase.industries.includes(industry.slug as any)) {
            generatedPages.push({
              type: "industry-use-case",
              slug: `${industry.slug}-${useCase.slug}`,
              title: `${useCase.title} for ${industry.name}`,
              path: `/industries/${industry.slug}/use-cases/${useCase.slug}`,
              metadata: {
                title: `${useCase.title} for ${industry.name} - Implementation Guide`,
                description: `How to implement ${useCase.title.toLowerCase()} in the ${industry.name.toLowerCase()} industry. ${useCase.description}`,
                keywords: [
                  ...useCase.metadata.keywords,
                  ...industry.metadata.keywords,
                  `${useCase.title.toLowerCase()} ${industry.name.toLowerCase()}`,
                  `${industry.name.toLowerCase()} ${useCase.title.toLowerCase()}`
                ]
              },
              entities: { industry, useCase },
              priority: 0.9
            });
          }
        }
      }
    }

    // Generate comparison pages if enabled
    if (generateCombinations) {
      // Use case comparisons
      const useCasesByCategory = useCases.reduce((acc, uc) => {
        if (!acc[uc.category]) acc[uc.category] = [];
        acc[uc.category].push(uc);
        return acc;
      }, {} as Record<string, any[]>);

      Object.entries(useCasesByCategory).forEach(([category, categoryUseCases]) => {
        if (categoryUseCases.length >= 2) {
          for (let i = 0; i < categoryUseCases.length - 1; i++) {
            for (let j = i + 1; j < categoryUseCases.length; j++) {
              const useCase1 = categoryUseCases[i];
              const useCase2 = categoryUseCases[j];

              generatedPages.push({
                type: "use-case-comparison",
                slug: `${useCase1.slug}-vs-${useCase2.slug}`,
                title: `${useCase1.title} vs ${useCase2.title}`,
                path: `/compare/${useCase1.slug}-vs-${useCase2.slug}`,
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
                },
                entities: { useCase1, useCase2 },
                priority: 0.7
              });
            }
          }
        }
      });

      // Industry comparisons
      const industriesByCategory = industries.reduce((acc, ind) => {
        if (!acc[ind.category]) acc[ind.category] = [];
        acc[ind.category].push(ind);
        return acc;
      }, {} as Record<string, any[]>);

      Object.entries(industriesByCategory).forEach(([category, categoryIndustries]) => {
        if (categoryIndustries.length >= 2) {
          for (let i = 0; i < categoryIndustries.length - 1; i++) {
            for (let j = i + 1; j < categoryIndustries.length; j++) {
              const industry1 = categoryIndustries[i];
              const industry2 = categoryIndustries[j];

              generatedPages.push({
                type: "industry-comparison",
                slug: `${industry1.slug}-vs-${industry2.slug}`,
                title: `AI in ${industry1.name} vs ${industry2.name}`,
                path: `/compare/industries/${industry1.slug}-vs-${industry2.slug}`,
                metadata: {
                  title: `AI Solutions: ${industry1.name} vs ${industry2.name} - Industry Comparison`,
                  description: `Compare AI opportunities in ${industry1.name} and ${industry2.name}. Analysis of market size, maturity, regulations, and ROI.`,
                  keywords: [
                    `${industry1.name.toLowerCase()} vs ${industry2.name.toLowerCase()}`,
                    `ai in ${industry1.name.toLowerCase()}`,
                    `ai in ${industry2.name.toLowerCase()}`,
                    "industry ai comparison",
                    category
                  ]
                },
                entities: { industry1, industry2 },
                priority: 0.6
              });
            }
          }
        }
      });
    }

    // Generate location-based pages for high-value industries
    const majorCities = [
      { city: "New York", state: "NY", slug: "new-york-ny" },
      { city: "San Francisco", state: "CA", slug: "san-francisco-ca" },
      { city: "Chicago", state: "IL", slug: "chicago-il" },
      { city: "Austin", state: "TX", slug: "austin-tx" },
      { city: "Boston", state: "MA", slug: "boston-ma" },
      { city: "Seattle", state: "WA", slug: "seattle-wa" },
      { city: "Los Angeles", state: "CA", slug: "los-angeles-ca" },
      { city: "Miami", state: "FL", slug: "miami-fl" }
    ];

    const highValueIndustries = industries.filter(ind =>
      ["finance", "healthcare", "technology", "real-estate"].includes(ind.slug)
    );

    for (const location of majorCities) {
      for (const industry of highValueIndustries) {
        generatedPages.push({
          type: "location-industry",
          slug: `${location.slug}-${industry.slug}`,
          title: `AI Solutions for ${industry.name} in ${location.city}, ${location.state}`,
          path: `/locations/${location.slug}/${industry.slug}`,
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
          },
          entities: { industry, location },
          priority: 0.8
        });
      }
    }

    // Sort by priority and limit if needed
    generatedPages.sort((a, b) => b.priority - a.priority);

    // Generate sitemap entries
    const sitemapEntries = generatedPages.map(page => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sprinter.ai'}${page.path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: page.type.includes("comparison") ? "monthly" : "weekly",
      priority: page.priority
    }));

    return NextResponse.json({
      success: true,
      generated: {
        total: generatedPages.length,
        byType: generatedPages.reduce((acc, page) => {
          acc[page.type] = (acc[page.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      },
      pages: generatedPages,
      sitemap: sitemapEntries,
      meta: {
        timestamp: new Date().toISOString(),
        entityCounts: {
          useCases: useCases.length,
          industries: industries.length
        }
      }
    });

  } catch (error) {
    console.error("Error generating entity pages:", error);
    return NextResponse.json(
      { error: "Failed to generate entity pages" },
      { status: 500 }
    );
  }
}

// GET /api/pseo/generate-entity-pages - Get generated page stats
export async function GET() {
  try {
    const useCases = migrateUseCases();
    const industries = migrateIndustries();

    const stats = {
      entities: {
        useCases: useCases.length,
        industries: industries.length
      },
      potentialPages: {
        individual: useCases.length + industries.length,
        crossReference: useCases.reduce((acc, uc) =>
          acc + uc.industries.length, 0
        ),
        comparisons: {
          useCases: Math.floor((useCases.length * (useCases.length - 1)) / 2),
          industries: Math.floor((industries.length * (industries.length - 1)) / 2)
        },
        locations: industries.length * 8 // 8 major cities
      }
    };

    const total = stats.potentialPages.individual +
                  stats.potentialPages.crossReference +
                  stats.potentialPages.comparisons.useCases +
                  stats.potentialPages.comparisons.industries +
                  stats.potentialPages.locations;

    const potentialPages = {
      ...stats.potentialPages,
      total
    };

    return NextResponse.json({
      stats: {
        ...stats,
        potentialPages
      },
      recommendations: {
        priorityGenerations: [
          "Individual entity pages (high SEO value)",
          "Industry + Use Case cross-references (long-tail keywords)",
          "Location-based pages for major markets (local SEO)",
          "Comparison pages for competitive keywords"
        ],
        estimatedTraffic: "300-500% organic traffic increase expected",
        timeToIndex: "2-6 weeks for most pages"
      }
    });

  } catch (error) {
    console.error("Error getting generation stats:", error);
    return NextResponse.json(
      { error: "Failed to get generation stats" },
      { status: 500 }
    );
  }
}