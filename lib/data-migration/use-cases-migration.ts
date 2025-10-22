/**
 * Migration utility to convert existing use cases data to entity format
 */

import { CreateUseCase, UseCaseDifficulty, UseCaseCategory, IndustryType, RoleType, ImplementationComplexity, ROITimeframe } from "@/features/entities/entity-types/use-case";
import { useCases as existingUseCases, type UseCase as LegacyUseCase } from "@/lib/use-cases-data";
import { z } from "zod";

// Mapping functions to convert legacy data to new schema
function mapDifficulty(difficulty: string): z.infer<typeof UseCaseDifficulty> {
  switch (difficulty) {
    case "Easy": return "Easy";
    case "Medium": return "Medium";
    case "Advanced": return "Advanced";
    default: return "Medium";
  }
}

function mapCategory(category: string): z.infer<typeof UseCaseCategory> {
  // Map legacy categories to new enum values
  const categoryMap: Record<string, z.infer<typeof UseCaseCategory>> = {
    "automation": "automation",
    "analytics": "analytics",
    "customer-service": "customer-service",
    "operations": "operations",
    "finance": "finance",
    "marketing": "marketing",
    "sales": "sales",
    "hr": "hr",
    "legal": "legal",
    "compliance": "compliance",
    "security": "security",
    "custom": "custom"
  };
  return categoryMap[category] || "custom";
}

function mapIndustries(industries: string[]): z.infer<typeof IndustryType>[] {
  const industryMap: Record<string, z.infer<typeof IndustryType>> = {
    "finance": "finance",
    "healthcare": "healthcare",
    "retail": "retail",
    "manufacturing": "manufacturing",
    "legal": "legal",
    "real-estate": "real-estate",
    "technology": "technology",
    "education": "education",
    "logistics": "logistics",
    "private-equity": "private-equity"
  };

  return industries.map(industry => industryMap[industry] || "technology");
}

function mapRoles(roles: string[]): z.infer<typeof RoleType>[] {
  const roleMap: Record<string, z.infer<typeof RoleType>> = {
    "ceo": "ceo",
    "cto": "cto",
    "cfo": "cfo",
    "coo": "coo",
    "sales-manager": "sales-manager",
    "marketing-director": "marketing-director",
    "operations-manager": "operations-manager",
    "hr-director": "hr-director",
    "legal-counsel": "legal-counsel",
    "data-analyst": "data-analyst"
  };

  return roles.map(role => roleMap[role] || "ceo");
}

function mapComplexity(difficulty: string): z.infer<typeof ImplementationComplexity> {
  switch (difficulty) {
    case "Easy": return "simple";
    case "Medium": return "moderate";
    case "Advanced": return "complex";
    default: return "moderate";
  }
}

function mapTimeToValue(timeToValue: string): z.infer<typeof ROITimeframe> {
  const timeMap: Record<string, z.infer<typeof ROITimeframe>> = {
    "7 days": "immediate",
    "14 days": "30-days",
    "30 days": "30-days",
    "21 days": "30-days",
    "90 days": "90-days",
    "60 days": "60-days",
    "6 months": "6-months",
    "12 months": "12-months"
  };

  return timeMap[timeToValue] || "30-days";
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function parseROI(roiString: string): { description: string; range: string } {
  const parts = roiString.split(' typical ROI in ');
  return {
    description: roiString,
    range: parts[0] || roiString
  };
}

function generateBenefitMetrics(benefits: string[]) {
  return benefits.map(benefit => ({
    metric: benefit.split(':')[0] || benefit,
    value: benefit.split(':')[1]?.trim() || benefit,
    unit: "", // Will need to be manually set
    context: ""
  }));
}

function generateTechnicalRequirements(tools: string[]) {
  return tools.map(tool => ({
    name: tool,
    description: `Integration with ${tool} required for optimal functionality`,
    required: true,
    alternatives: [] as string[]
  }));
}

function generateToolIntegrations(tools: string[]) {
  return tools.map(tool => ({
    tool,
    category: "AI/ML Platform", // Default category
    required: true,
    purpose: `Core functionality powered by ${tool}`,
    alternatives: [] as string[]
  }));
}

function generateMCPServers(mcpServers: string[]) {
  return mcpServers.map(serverId => ({
    serverId,
    name: serverId.charAt(0).toUpperCase() + serverId.slice(1) + " MCP",
    purpose: `${serverId} integration and automation`,
    required: true
  }));
}

function generateImplementationPhases(timeToValue: string) {
  const phases = [
    {
      phase: "Discovery & Planning",
      duration: "3-5 days",
      activities: [
        "Requirements gathering",
        "Technical assessment",
        "Solution design",
        "Timeline planning"
      ],
      deliverables: [
        "Requirements document",
        "Technical specification",
        "Implementation plan",
        "Success criteria"
      ],
      milestone: "Project kickoff approved"
    },
    {
      phase: "Development & Integration",
      duration: "2-3 weeks",
      activities: [
        "Solution development",
        "System integration",
        "Testing and validation",
        "Documentation creation"
      ],
      deliverables: [
        "Working solution",
        "Integration documentation",
        "Test results",
        "User documentation"
      ],
      milestone: "Solution ready for deployment"
    },
    {
      phase: "Deployment & Training",
      duration: "1 week",
      activities: [
        "Production deployment",
        "User training",
        "Performance monitoring",
        "Issue resolution"
      ],
      deliverables: [
        "Live system",
        "Trained users",
        "Monitoring setup",
        "Support documentation"
      ],
      milestone: "Solution fully operational"
    }
  ];

  return phases;
}

function generateSuccessCriteria() {
  return [
    {
      criterion: "User adoption rate",
      target: ">80% within 30 days",
      measurement: "Active users / Total eligible users",
      timeframe: "30 days post-deployment"
    },
    {
      criterion: "Process efficiency improvement",
      target: ">50% time reduction",
      measurement: "Before/after process timing",
      timeframe: "60 days post-deployment"
    },
    {
      criterion: "Return on investment",
      target: ">100% ROI",
      measurement: "Benefits achieved / Investment cost",
      timeframe: "90 days post-deployment"
    }
  ];
}

export function migrateUseCases(): CreateUseCase[] {
  return existingUseCases.map((legacyUseCase): CreateUseCase => {
    const slug = generateSlug(legacyUseCase.title);
    const roiData = parseROI(legacyUseCase.roi);

    return {
      slug,
      title: legacyUseCase.title,
      category: mapCategory(legacyUseCase.id.split('-')[0] || 'custom'),
      status: "active" as const,
      difficulty: mapDifficulty(legacyUseCase.difficulty),

      description: legacyUseCase.description,
      shortDescription: legacyUseCase.description.substring(0, 160),

      industries: mapIndustries(legacyUseCase.industry),
      roles: mapRoles(legacyUseCase.roles),
      businessValue: `This use case delivers significant value through ${legacyUseCase.implementation}`,

      complexity: mapComplexity(legacyUseCase.difficulty),
      timeToValue: mapTimeToValue(legacyUseCase.timeToValue),
      estimatedDuration: legacyUseCase.implementation,

      benefits: generateBenefitMetrics(legacyUseCase.benefits),
      roiDescription: roiData.description,
      roiRange: roiData.range,

      technicalRequirements: generateTechnicalRequirements(legacyUseCase.tools),
      toolIntegrations: generateToolIntegrations(legacyUseCase.tools),
      mcpServers: generateMCPServers(legacyUseCase.mcpServers),

      implementationPhases: generateImplementationPhases(legacyUseCase.timeToValue),
      successCriteria: generateSuccessCriteria(),

      challenges: [`Traditional approach limitations in ${legacyUseCase.title.toLowerCase()}`],
      solutions: [`AI-powered automation using ${legacyUseCase.tools.join(', ')}`],
      outcomes: legacyUseCase.benefits,

      metadata: {
        title: `${legacyUseCase.title} - AI Implementation Guide`,
        description: legacyUseCase.description,
        keywords: [
          ...legacyUseCase.industry,
          ...legacyUseCase.tools.map(tool => tool.toLowerCase()),
          "ai implementation",
          "automation",
          "digital transformation"
        ]
      },

      featured: false,
      priority: 0
    };
  });
}

// Helper function to create sample case studies
export function generateCaseStudies(useCase: CreateUseCase) {
  return [
    {
      title: `${useCase.title} Success Story`,
      industry: useCase.industries[0] || "technology",
      challenge: `Company struggled with manual processes in ${useCase.title.toLowerCase()}`,
      solution: `Implemented AI-powered solution using ${useCase.toolIntegrations.map(t => t.tool).join(', ')}`,
      results: useCase.benefits.map(b => `${b.metric}: ${b.value}`),
      testimonial: {
        quote: `The ${useCase.title.toLowerCase()} solution transformed our operations completely. We saw immediate results and couldn't be happier with the ROI.`,
        author: "John Smith",
        role: "Operations Director",
        company: "TechCorp Inc."
      }
    }
  ];
}

// Export migration function
export async function runUseCaseMigration() {
  const migratedUseCases = migrateUseCases();

  console.log(`Migrated ${migratedUseCases.length} use cases:`);
  migratedUseCases.forEach(useCase => {
    console.log(`- ${useCase.title} (${useCase.slug})`);
  });

  return migratedUseCases;
}