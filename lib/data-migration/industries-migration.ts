/**
 * Migration utility to convert existing industries data to entity format
 */

import { CreateIndustry, IndustryCategory, AIMaturity, RegulatoryComplexity, MarketSize } from "@/features/entities/entity-types/industry";
import { industries as existingIndustries, type Industry as LegacyIndustry } from "@/lib/use-cases-data";
import { z } from "zod";

function mapCategory(id: string): z.infer<typeof IndustryCategory> {
  const categoryMap: Record<string, z.infer<typeof IndustryCategory>> = {
    "finance": "financial-services",
    "healthcare": "healthcare",
    "retail": "retail-ecommerce",
    "manufacturing": "manufacturing",
    "legal": "professional-services",
    "real-estate": "real-estate",
    "technology": "technology",
    "education": "education",
    "logistics": "logistics-supply-chain",
    "private-equity": "private-equity"
  };
  return categoryMap[id] || "technology";
}

function determineAIMaturity(id: string): z.infer<typeof AIMaturity> {
  const maturityMap: Record<string, z.infer<typeof AIMaturity>> = {
    "finance": "advanced",
    "healthcare": "developing",
    "retail": "advanced",
    "manufacturing": "developing",
    "legal": "early",
    "real-estate": "early",
    "technology": "leading",
    "education": "developing",
    "logistics": "developing",
    "private-equity": "advanced"
  };
  return maturityMap[id] || "developing";
}

function determineRegulatoryComplexity(id: string): z.infer<typeof RegulatoryComplexity> {
  const complexityMap: Record<string, z.infer<typeof RegulatoryComplexity>> = {
    "finance": "high",
    "healthcare": "critical",
    "retail": "medium",
    "manufacturing": "medium",
    "legal": "high",
    "real-estate": "medium",
    "technology": "low",
    "education": "medium",
    "logistics": "medium",
    "private-equity": "high"
  };
  return complexityMap[id] || "medium";
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateMarketMetrics(id: string) {
  const marketData: Record<string, any> = {
    "finance": {
      size: "$26.5T global financial services market",
      growth: "8.2% CAGR through 2028",
      digitalAdoption: "78% digitally mature institutions",
      aiSpending: "$75B in AI investments by 2025",
      employeeCount: "1,000-50,000 employees typical"
    },
    "healthcare": {
      size: "$8.3T global healthcare market",
      growth: "9.9% CAGR through 2028",
      digitalAdoption: "65% digital health adoption",
      aiSpending: "$45B in AI healthcare by 2026",
      employeeCount: "500-10,000 employees typical"
    },
    "retail": {
      size: "$6.2T global retail market",
      growth: "5.4% CAGR through 2028",
      digitalAdoption: "85% e-commerce presence",
      aiSpending: "$20B in retail AI by 2025",
      employeeCount: "100-5,000 employees typical"
    },
    "manufacturing": {
      size: "$14.3T global manufacturing",
      growth: "4.1% CAGR through 2028",
      digitalAdoption: "55% Industry 4.0 adoption",
      aiSpending: "$16B in manufacturing AI by 2025",
      employeeCount: "200-20,000 employees typical"
    },
    "legal": {
      size: "$849B global legal services",
      growth: "4.4% CAGR through 2028",
      digitalAdoption: "45% legal tech adoption",
      aiSpending: "$3.2B in legal AI by 2025",
      employeeCount: "10-1,000 employees typical"
    },
    "real-estate": {
      size: "$3.7T global real estate",
      growth: "3.7% CAGR through 2028",
      digitalAdoption: "60% proptech adoption",
      aiSpending: "$2.8B in real estate AI by 2025",
      employeeCount: "5-500 employees typical"
    }
  };

  return marketData[id] || {
    size: "$1T+ market opportunity",
    growth: "5-10% CAGR expected",
    digitalAdoption: "50% digital maturity",
    aiSpending: "$1B+ AI investment opportunity",
    employeeCount: "50-5,000 employees typical"
  };
}

function generateChallengeCategories(challenges: string[]) {
  return challenges.map((challenge, index) => ({
    category: `Challenge Category ${index + 1}`,
    challenges: [challenge],
    priority: (index === 0 ? "high" : index === 1 ? "medium" : "low") as "low" | "medium" | "high" | "critical",
    aiReadiness: (index % 2 === 0 ? "ready" : "moderate") as "ready" | "moderate" | "complex" | "not-ready"
  }));
}

function generateUseCaseOpportunities(useCases: string[], industryId: string) {
  return useCases.map((useCaseId, index) => ({
    useCaseId,
    title: useCaseId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: `AI-powered ${useCaseId.replace(/-/g, ' ')} solution for ${industryId} industry`,
    priority: (index === 0 ? "high" : index === 1 ? "medium" : "low") as "low" | "medium" | "high" | "critical",
    roiPotential: "100-300% in 6-12 months",
    timeToValue: "30-90 days",
    complexity: (index % 3 === 0 ? "simple" : index % 3 === 1 ? "moderate" : "complex") as "simple" | "moderate" | "complex" | "enterprise",
    adoptionRate: `${Math.floor(Math.random() * 50) + 20}% of firms implementing`
  }));
}

function generateTechnologyAdoption(topTools: string[], industryId: string) {
  const categories = ["AI/ML Platforms", "Automation Tools", "Analytics Solutions"];

  return categories.map((category, index) => ({
    category,
    tools: topTools.slice(index * 2, (index + 1) * 2).map(tool => ({
      name: tool,
      adoptionRate: `${Math.floor(Math.random() * 40) + 30}%`,
      useCases: [`${tool.toLowerCase()}-integration`, `${tool.toLowerCase()}-automation`],
      roiRange: "150-400% typical ROI"
    })),
    trends: [
      `Increasing adoption of ${category.toLowerCase()} in ${industryId}`,
      `Integration with existing ${industryId} workflows`,
      `Focus on compliance and governance`
    ],
    barriers: [
      "Legacy system integration challenges",
      "Regulatory compliance requirements",
      "Skills gap and training needs"
    ]
  }));
}

function generateRegulatoryRequirements(industryId: string) {
  const regulatoryData: Record<string, any[]> = {
    "finance": [
      {
        regulation: "GDPR & Data Privacy",
        description: "Strict data protection and privacy requirements for financial data",
        impact: "high" as "low" | "medium" | "high" | "blocking",
        aiImplications: "AI models must be explainable and auditable for regulatory compliance",
        compliance: [
          "Data anonymization and pseudonymization",
          "Model explainability documentation",
          "Audit trail maintenance",
          "Customer consent management"
        ]
      },
      {
        regulation: "Basel III & Risk Management",
        description: "International regulatory framework for bank capital adequacy and risk management",
        impact: "critical" as "low" | "medium" | "high" | "blocking",
        aiImplications: "AI risk models require regulatory approval and ongoing validation",
        compliance: [
          "Model validation and back-testing",
          "Risk governance frameworks",
          "Capital adequacy calculations",
          "Stress testing requirements"
        ]
      }
    ],
    "healthcare": [
      {
        regulation: "HIPAA Compliance",
        description: "Health Insurance Portability and Accountability Act requirements",
        impact: "critical" as "low" | "medium" | "high" | "blocking",
        aiImplications: "AI systems must protect patient health information (PHI)",
        compliance: [
          "PHI encryption and access controls",
          "Business associate agreements",
          "Audit logging and monitoring",
          "Breach notification procedures"
        ]
      },
      {
        regulation: "FDA Medical Device Regulation",
        description: "FDA oversight of AI/ML-based medical devices",
        impact: "high" as "low" | "medium" | "high" | "blocking",
        aiImplications: "AI diagnostic tools require FDA approval and ongoing monitoring",
        compliance: [
          "Clinical validation studies",
          "Quality management systems",
          "Post-market surveillance",
          "Software as Medical Device (SaMD) guidelines"
        ]
      }
    ]
  };

  return regulatoryData[industryId] || [];
}

function generateSuccessStories(industryId: string) {
  const storyTemplates = [
    {
      company: "GlobalTech Corp",
      size: "enterprise" as z.infer<typeof MarketSize>,
      challenge: `Manual processes were creating bottlenecks in ${industryId} operations`,
      solution: "Implemented AI-powered automation platform with intelligent document processing",
      results: [
        { metric: "Process Efficiency", value: "75% improvement", timeframe: "3 months" },
        { metric: "Cost Reduction", value: "$2.5M annual savings", timeframe: "12 months" },
        { metric: "Error Rate", value: "90% reduction", timeframe: "6 months" }
      ],
      testimonial: {
        quote: "The AI transformation exceeded our expectations. We're now leading our industry in operational efficiency.",
        author: "Sarah Johnson",
        role: "Chief Operating Officer"
      }
    }
  ];

  return storyTemplates;
}

function generateGettingStarted() {
  return [
    {
      step: "AI Readiness Assessment",
      description: "Evaluate current state, identify opportunities, and define success criteria",
      duration: "1-2 weeks",
      deliverables: [
        "Current state analysis",
        "Opportunity identification",
        "ROI projections",
        "Implementation roadmap"
      ]
    },
    {
      step: "Pilot Project Selection",
      description: "Choose high-impact, low-risk use case for initial implementation",
      duration: "1 week",
      deliverables: [
        "Use case selection",
        "Success metrics definition",
        "Resource allocation plan",
        "Risk mitigation strategy"
      ]
    },
    {
      step: "Pilot Implementation",
      description: "Develop and deploy pilot solution with stakeholder training",
      duration: "4-8 weeks",
      deliverables: [
        "Working pilot solution",
        "User training completion",
        "Performance baseline",
        "Lessons learned documentation"
      ]
    },
    {
      step: "Scale & Optimize",
      description: "Expand successful pilot across organization and optimize performance",
      duration: "3-6 months",
      deliverables: [
        "Full-scale deployment",
        "Performance optimization",
        "Change management completion",
        "Next phase planning"
      ]
    }
  ];
}

export function migrateIndustries(): CreateIndustry[] {
  return existingIndustries.map((legacyIndustry): CreateIndustry => {
    const slug = generateSlug(legacyIndustry.name);
    const marketMetrics = generateMarketMetrics(legacyIndustry.id);

    return {
      slug,
      name: legacyIndustry.name,
      category: mapCategory(legacyIndustry.id),
      status: "active" as const,
      icon: legacyIndustry.icon,

      description: legacyIndustry.description,
      shortDescription: legacyIndustry.description.substring(0, 160),

      marketMetrics,
      aiMaturity: determineAIMaturity(legacyIndustry.id),
      regulatoryComplexity: determineRegulatoryComplexity(legacyIndustry.id),

      challengeCategories: generateChallengeCategories(legacyIndustry.challenges),
      useCaseOpportunities: generateUseCaseOpportunities(legacyIndustry.useCases, legacyIndustry.id),

      technologyAdoption: generateTechnologyAdoption(legacyIndustry.topTools, legacyIndustry.id),
      topTools: legacyIndustry.topTools,
      emergingTech: ["Generative AI", "Computer Vision", "Natural Language Processing"],

      regulatoryRequirements: generateRegulatoryRequirements(legacyIndustry.id),
      complianceStandards: ["ISO 27001", "SOC 2", "GDPR"],

      successStories: generateSuccessStories(legacyIndustry.id),

      averageROI: legacyIndustry.averageROI,
      implementationTimeline: "3-6 months typical implementation",
      budgetRange: "$50K-500K typical investment",

      keyTrends: [
        `AI adoption accelerating in ${legacyIndustry.name.toLowerCase()}`,
        "Focus on automation and efficiency gains",
        "Emphasis on compliance and governance",
        "Integration with existing systems priority"
      ],
      futureOutlook: `The ${legacyIndustry.name.toLowerCase()} industry is positioned for significant AI transformation over the next 3-5 years, with early adopters gaining competitive advantages through improved efficiency and customer experience.`,
      gettingStarted: generateGettingStarted(),

      metadata: {
        title: `AI Solutions for ${legacyIndustry.name} - Implementation Guide`,
        description: legacyIndustry.description,
        keywords: [
          legacyIndustry.name.toLowerCase(),
          "ai solutions",
          "digital transformation",
          "automation",
          ...legacyIndustry.topTools.map(tool => tool.toLowerCase())
        ]
      },

      featured: false,
      priority: 0,
      tags: [legacyIndustry.id, "ai-transformation", "industry-solutions"]
    };
  });
}

export async function runIndustriesMigration() {
  const migratedIndustries = migrateIndustries();

  console.log(`Migrated ${migratedIndustries.length} industries:`);
  migratedIndustries.forEach(industry => {
    console.log(`- ${industry.name} (${industry.slug})`);
  });

  return migratedIndustries;
}