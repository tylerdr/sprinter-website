/**
 * Structured data schemas for use cases (JSON-LD)
 */

import { UseCase } from "@/features/entities/entity-types/use-case";

export interface UseCaseStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  image?: string;
  provider: {
    "@type": string;
    name: string;
    url: string;
  };
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
    availability: string;
    validFrom: string;
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    ratingCount: string;
    bestRating: string;
    worstRating: string;
  };
  review?: {
    "@type": string;
    reviewRating: {
      "@type": string;
      ratingValue: string;
      bestRating: string;
    };
    author: {
      "@type": string;
      name: string;
    };
    reviewBody: string;
  }[];
  applicationSubCategory: string[];
  featureList: string[];
  requirements: string[];
  softwareVersion: string;
  datePublished: string;
  dateModified: string;
  isAccessibleForFree: boolean;
}

export function generateUseCaseStructuredData(
  useCase: UseCase,
  baseUrl: string
): UseCaseStructuredData {
  const url = `${baseUrl}/use-cases/${useCase.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: useCase.title,
    description: useCase.description,
    url,
    image: `${baseUrl}/images/use-cases/${useCase.slug}-hero.jpg`,
    provider: {
      "@type": "Organization",
      name: "Sprinter AI",
      url: baseUrl
    },
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "Contact for pricing",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString()
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1"
    },
    review: useCase.caseStudies?.map((caseStudy) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5"
      },
      author: {
        "@type": "Person",
        name: caseStudy.testimonial?.author || "Anonymous"
      },
      reviewBody: caseStudy.testimonial?.quote || `Excellent results with ${useCase.title}`
    })) || [],
    applicationSubCategory: [
      useCase.category,
      ...useCase.industries,
      useCase.difficulty
    ],
    featureList: useCase.benefits.map(benefit => `${benefit.metric}: ${benefit.value}`),
    requirements: useCase.technicalRequirements.map(req => req.name),
    softwareVersion: "1.0",
    datePublished: useCase.createdAt,
    dateModified: useCase.updatedAt,
    isAccessibleForFree: false
  };
}

// HowTo schema for implementation guides
export interface HowToStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string;
  totalTime: string;
  estimatedCost: {
    "@type": string;
    currency: string;
    value: string;
  };
  supply: {
    "@type": string;
    name: string;
  }[];
  tool: {
    "@type": string;
    name: string;
  }[];
  step: {
    "@type": string;
    name: string;
    text: string;
    image?: string;
    url?: string;
  }[];
}

export function generateUseCaseHowToData(
  useCase: UseCase,
  baseUrl: string
): HowToStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Implement ${useCase.title}`,
    description: `Step-by-step guide to implementing ${useCase.title} for your organization`,
    image: `${baseUrl}/images/use-cases/${useCase.slug}-guide.jpg`,
    totalTime: useCase.estimatedDuration,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "50000" // Default estimate
    },
    supply: useCase.technicalRequirements.map(req => ({
      "@type": "HowToSupply",
      name: req.name
    })),
    tool: useCase.toolIntegrations.map(tool => ({
      "@type": "HowToTool",
      name: tool.tool
    })),
    step: useCase.implementationPhases.map((phase, index) => ({
      "@type": "HowToStep",
      name: `Step ${index + 1}: ${phase.phase}`,
      text: `${phase.activities.join('. ')}. Expected duration: ${phase.duration}`,
      image: `${baseUrl}/images/implementation/step-${index + 1}.jpg`,
      url: `${baseUrl}/use-cases/${useCase.slug}#step-${index + 1}`
    }))
  };
}

// FAQ schema
export interface FAQStructuredData {
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

export function generateUseCaseFAQData(useCase: UseCase): FAQStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${useCase.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: useCase.description
        }
      },
      {
        "@type": "Question",
        name: `How long does it take to implement ${useCase.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Implementation typically takes ${useCase.estimatedDuration}, with time to value of ${useCase.timeToValue.replace(/-/g, ' ')}.`
        }
      },
      {
        "@type": "Question",
        name: `What is the ROI for ${useCase.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: useCase.roiDescription
        }
      },
      {
        "@type": "Question",
        name: `What industries benefit most from ${useCase.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${useCase.title} is particularly effective in ${useCase.industries.map(ind => ind.replace(/-/g, ' ')).join(', ')} industries.`
        }
      },
      {
        "@type": "Question",
        name: `What are the main benefits of ${useCase.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: useCase.benefits.map(benefit => `${benefit.metric}: ${benefit.value}`).join('; ')
        }
      }
    ]
  };
}

// Organization schema for company info
export function generateOrganizationSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sprinter AI",
    alternateName: "Sprinter",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-SPRINTER",
      contactType: "customer service",
      availableLanguage: "English"
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 AI Innovation Drive",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94105",
      addressCountry: "US"
    },
    sameAs: [
      "https://twitter.com/sprinter_ai",
      "https://linkedin.com/company/sprinter-ai",
      "https://github.com/sprinter-ai"
    ],
    foundingDate: "2023",
    description: "AI consulting and venture studio specializing in enterprise AI transformation and automation solutions.",
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Business Process Automation",
      "Digital Transformation",
      "Enterprise Software"
    ],
    areaServed: "Worldwide",
    serviceType: [
      "AI Consulting",
      "AI Implementation",
      "Digital Transformation",
      "Process Automation"
    ]
  };
}

// BreadcrumbList schema
export function generateBreadcrumbSchema(
  breadcrumbs: { name: string; url: string }[],
  baseUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: `${baseUrl}${breadcrumb.url}`
    }))
  };
}

// Complete page schema combining multiple schemas
export function generateCompleteUseCaseSchema(
  useCase: UseCase,
  baseUrl: string
) {
  return {
    "@graph": [
      generateOrganizationSchema(baseUrl),
      generateUseCaseStructuredData(useCase, baseUrl),
      generateUseCaseHowToData(useCase, baseUrl),
      generateUseCaseFAQData(useCase),
      generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Use Cases", url: "/use-cases" },
        { name: useCase.title, url: `/use-cases/${useCase.slug}` }
      ], baseUrl)
    ]
  };
}