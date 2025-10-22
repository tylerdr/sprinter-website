/**
 * Structured data schemas for industries (JSON-LD)
 */

import { Industry } from "@/features/entities/entity-types/industry";

export interface IndustryStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  image?: string;
  identifier: string;
  sameAs?: string[];
  subjectOf: {
    "@type": string;
    name: string;
    description: string;
    url: string;
  }[];
  knowsAbout: string[];
  areaServed: string;
  serviceArea: {
    "@type": string;
    name: string;
  };
}

export function generateIndustryStructuredData(
  industry: Industry,
  baseUrl: string
): IndustryStructuredData {
  const url = `${baseUrl}/industries/${industry.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Corporation",
    name: `${industry.name} AI Solutions`,
    description: industry.description,
    url,
    image: `${baseUrl}/images/industries/${industry.slug}-hero.jpg`,
    identifier: industry.slug,
    sameAs: [
      `${baseUrl}/industries/${industry.slug}`,
      `${baseUrl}/opportunity-atlas?industry=${industry.slug}`
    ],
    subjectOf: industry.useCaseOpportunities.map(opportunity => ({
      "@type": "Article",
      name: opportunity.title,
      description: opportunity.description,
      url: `${baseUrl}/use-cases/${opportunity.useCaseId}`
    })),
    knowsAbout: [
      ...industry.topTools,
      ...industry.emergingTech,
      `${industry.name} Digital Transformation`,
      "AI Implementation",
      "Process Automation"
    ],
    areaServed: "Global",
    serviceArea: {
      "@type": "Place",
      name: "Worldwide"
    }
  };
}

// Market analysis schema
export interface MarketAnalysisStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  mainEntity: {
    "@type": string;
    name: string;
    identifier: string;
    marketSize: {
      "@type": string;
      value: string;
      currency?: string;
    };
    growthRate: string;
    marketTrends: string[];
    competitiveAnalysis: string[];
  };
  about: {
    "@type": string;
    name: string;
  }[];
  datePublished: string;
  dateModified: string;
  author: {
    "@type": string;
    name: string;
    url: string;
  };
}

export function generateMarketAnalysisSchema(
  industry: Industry,
  baseUrl: string
): MarketAnalysisStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Report",
    name: `${industry.name} AI Market Analysis`,
    description: `Comprehensive market analysis for AI opportunities in the ${industry.name.toLowerCase()} industry`,
    mainEntity: {
      "@type": "Market",
      name: `${industry.name} Market`,
      identifier: industry.slug,
      marketSize: {
        "@type": "MonetaryAmount",
        value: industry.marketMetrics.size,
        currency: "USD"
      },
      growthRate: industry.marketMetrics.growth,
      marketTrends: industry.keyTrends,
      competitiveAnalysis: industry.competitiveLandscape?.opportunities || []
    },
    about: industry.useCaseOpportunities.map(opportunity => ({
      "@type": "Thing",
      name: opportunity.title
    })),
    datePublished: industry.createdAt,
    dateModified: industry.updatedAt,
    author: {
      "@type": "Organization",
      name: "Sprinter AI",
      url: baseUrl
    }
  };
}

// Service schema for industry solutions
export interface ServiceStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
    url: string;
  };
  serviceType: string;
  areaServed: string;
  audience: {
    "@type": string;
    audienceType: string;
  };
  offers: {
    "@type": string;
    itemOffered: {
      "@type": string;
      name: string;
      description: string;
    };
    price: string;
    priceCurrency: string;
    availability: string;
  }[];
  hasOfferCatalog: {
    "@type": string;
    name: string;
    itemListElement: {
      "@type": string;
      name: string;
      description: string;
      url: string;
    }[];
  };
}

export function generateIndustryServiceSchema(
  industry: Industry,
  baseUrl: string
): ServiceStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `AI Solutions for ${industry.name}`,
    description: `Comprehensive AI transformation services tailored for the ${industry.name.toLowerCase()} industry`,
    provider: {
      "@type": "Organization",
      name: "Sprinter AI",
      url: baseUrl
    },
    serviceType: "AI Consulting and Implementation",
    areaServed: "Global",
    audience: {
      "@type": "Audience",
      audienceType: `${industry.name} Companies`
    },
    offers: industry.useCaseOpportunities.map(opportunity => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: opportunity.title,
        description: opportunity.description
      },
      price: "Contact for pricing",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${industry.name} AI Solutions Catalog`,
      itemListElement: industry.useCaseOpportunities.map(opportunity => ({
        "@type": "OfferCatalogItem",
        name: opportunity.title,
        description: opportunity.description,
        url: `${baseUrl}/use-cases/${opportunity.useCaseId}`
      }))
    }
  };
}

// FAQ schema for industry-specific questions
export interface IndustryFAQStructuredData {
  "@context": string;
  "@type": string;
  mainEntity: {
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }[];
}

export function generateIndustryFAQData(industry: Industry): IndustryFAQStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What AI opportunities exist in ${industry.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${industry.name.toLowerCase()} industry has significant AI opportunities including ${industry.useCaseOpportunities.slice(0, 3).map(opp => opp.title.toLowerCase()).join(', ')}, with potential ROI of ${industry.averageROI}.`
        }
      },
      {
        "@type": "Question",
        name: `How mature is AI adoption in ${industry.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${industry.name.toLowerCase()} industry is at the ${industry.aiMaturity} stage of AI maturity, with ${industry.marketMetrics.digitalAdoption} digital adoption rate.`
        }
      },
      {
        "@type": "Question",
        name: `What are the main challenges for AI in ${industry.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Key challenges include ${industry.challengeCategories.map(cat => cat.challenges[0]).slice(0, 3).join(', ')}, along with ${industry.regulatoryComplexity} regulatory complexity.`
        }
      },
      {
        "@type": "Question",
        name: `What is the typical implementation timeline for ${industry.name} AI projects?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${industry.name} AI implementations typically take ${industry.implementationTimeline}, with ${industry.budgetRange || 'variable'} investment requirements.`
        }
      },
      {
        "@type": "Question",
        name: `What tools are commonly used for AI in ${industry.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Popular AI tools in ${industry.name.toLowerCase()} include ${industry.topTools.slice(0, 5).join(', ')}, with emerging technologies like ${industry.emergingTech.slice(0, 3).join(', ')}.`
        }
      },
      {
        "@type": "Question",
        name: `How do I get started with AI in ${industry.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Start with ${industry.gettingStarted[0]?.step}: ${industry.gettingStarted[0]?.description}. This typically takes ${industry.gettingStarted[0]?.duration} and delivers ${industry.gettingStarted[0]?.deliverables.join(', ')}.`
        }
      }
    ]
  };
}

// Collection schema for industry listing pages
export function generateIndustryCollectionSchema(
  industries: Industry[],
  baseUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Solutions by Industry",
    description: "Comprehensive guide to AI transformation opportunities across industries",
    url: `${baseUrl}/industries`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: industries.length,
      itemListElement: industries.map((industry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Corporation",
          name: industry.name,
          description: industry.shortDescription,
          url: `${baseUrl}/industries/${industry.slug}`,
          image: `${baseUrl}/images/industries/${industry.slug}-card.jpg`
        }
      }))
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Industries",
          item: `${baseUrl}/industries`
        }
      ]
    }
  };
}

// Complete industry page schema
export function generateCompleteIndustrySchema(
  industry: Industry,
  baseUrl: string
) {
  return {
    "@graph": [
      generateIndustryStructuredData(industry, baseUrl),
      generateMarketAnalysisSchema(industry, baseUrl),
      generateIndustryServiceSchema(industry, baseUrl),
      generateIndustryFAQData(industry),
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Industries",
            item: `${baseUrl}/industries`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: industry.name,
            item: `${baseUrl}/industries/${industry.slug}`
          }
        ]
      }
    ]
  };
}