"use server";

import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

interface BlueprintInput {
  industry: string;
  companySize: string;
  focusArea: string;
}

export async function generateIndustryBlueprint(input: BlueprintInput) {
  const { industry, companySize, focusArea } = input;

  const prompt = `
    Generate a comprehensive AI transformation blueprint for the ${industry} industry.
    
    Context:
    - Company Size: ${companySize}
    - Primary Focus: ${focusArea}
    
    Create a detailed blueprint with:
    1. Brief overview (2-3 sentences)
    2. Top 5 AI opportunities specific to ${industry}
    3. 5 concrete use cases with business impact
    4. 6-step implementation roadmap
    5. 5 recommended vendors/tools
    6. ROI projections (efficiency, revenue, timeline)
    
    Focus on practical, immediately actionable insights that are specific to ${industry}.
    Consider ${companySize} constraints and optimize for ${focusArea}.
    
    Format as JSON with clear structure.
  `;

  try {
    const { text } = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      prompt,
      temperature: 0.7,
    });

    // Parse the response - in production, add proper error handling
    const blueprint = JSON.parse(text);
    
    return {
      industry,
      overview: blueprint.overview || generateDefaultOverview(industry),
      opportunities: {
        title: "Key AI Opportunities",
        items: blueprint.opportunities || generateDefaultOpportunities(industry)
      },
      useCases: {
        title: "High-Impact Use Cases",
        items: blueprint.useCases || generateDefaultUseCases(industry, focusArea)
      },
      implementation: {
        title: "Implementation Roadmap",
        items: blueprint.implementation || generateDefaultImplementation()
      },
      vendors: {
        title: "Recommended Solutions",
        items: blueprint.vendors || generateDefaultVendors(industry)
      },
      roi: blueprint.roi || generateDefaultROI(companySize, focusArea)
    };
  } catch (error) {
    console.error("Error generating blueprint:", error);
    
    // Return mock data for demonstration
    return generateMockBlueprint(industry, companySize, focusArea);
  }
}

function generateDefaultOverview(industry: string): string {
  return `The ${industry} industry stands at a critical inflection point where AI adoption will separate market leaders from laggards. Companies that move now can capture 20-40% efficiency gains while creating entirely new revenue streams through AI-powered services and insights.`;
}

function generateDefaultOpportunities(industry: string): string[] {
  const baseOpportunities = [
    `Automate 80% of repetitive ${industry.toLowerCase()} workflows with intelligent process automation`,
    "Deploy predictive analytics to forecast demand, risks, and opportunities 3-6 months ahead",
    "Implement AI-powered customer intelligence for hyper-personalization at scale",
    "Create self-healing operations that detect and resolve issues before they impact business",
    "Build AI co-pilots that augment human expertise and accelerate decision-making by 10x"
  ];
  
  return baseOpportunities;
}

function generateDefaultUseCases(industry: string, focusArea: string): string[] {
  const useCaseMap: Record<string, string[]> = {
    efficiency: [
      "Document processing automation reducing manual work by 85%",
      "Intelligent routing and optimization cutting operational costs by 30%",
      "Automated quality control detecting issues 50x faster than humans",
      "Smart resource allocation improving utilization by 40%",
      "Predictive maintenance reducing downtime by 60%"
    ],
    growth: [
      "AI-powered lead scoring increasing conversion rates by 45%",
      "Dynamic pricing optimization boosting revenue by 15-25%",
      "Personalized recommendations driving 30% higher transaction values",
      "Automated cross-sell/upsell generating 20% additional revenue",
      "Market intelligence identifying new opportunities worth $10M+"
    ],
    innovation: [
      "AI-assisted R&D accelerating product development by 3x",
      "Generative design creating novel solutions impossible for humans",
      "Synthetic data generation enabling rapid experimentation",
      "AI simulation reducing prototyping costs by 70%",
      "Automated patent analysis uncovering white space opportunities"
    ],
    experience: [
      "24/7 AI assistants resolving 70% of inquiries instantly",
      "Sentiment analysis preventing 40% of customer churn",
      "Hyper-personalized experiences increasing NPS by 25 points",
      "Proactive service predicting and solving issues before complaints",
      "Omnichannel AI creating seamless experiences across touchpoints"
    ]
  };
  
  return useCaseMap[focusArea] || useCaseMap.efficiency;
}

function generateDefaultImplementation(): string[] {
  return [
    "Week 1-2: AI readiness assessment and opportunity mapping",
    "Week 3-4: Pilot project selection and success metrics definition",
    "Month 2: Quick win implementation (document automation or chatbot)",
    "Month 3: Data infrastructure and governance foundation",
    "Month 4-6: Scale successful pilots across departments",
    "Month 6+: Continuous optimization and advanced AI capabilities"
  ];
}

function generateDefaultVendors(industry: string): string[] {
  const industryVendors: Record<string, string[]> = {
    "Private Equity": [
      "Datasite - AI-powered due diligence and deal management",
      "AlphaSense - Market intelligence and research automation",
      "Eigen - Document intelligence for complex contracts",
      "Workday Adaptive - AI-driven financial planning",
      "Affinity - Relationship intelligence and deal flow CRM"
    ],
    "Healthcare": [
      "Nuance Dragon - Clinical documentation AI",
      "Babylon Health - AI diagnostics and triage",
      "Viz.ai - Medical imaging analysis",
      "Notable - Intelligent automation for healthcare",
      "Olive - Healthcare operations AI platform"
    ],
    "Manufacturing": [
      "C3 AI - Industrial IoT and predictive maintenance",
      "Sight Machine - Manufacturing analytics platform",
      "Tulip - No-code manufacturing apps with AI",
      "Instrumental - AI-powered quality inspection",
      "ClearMetal - Supply chain visibility AI"
    ],
    "default": [
      "OpenAI/Anthropic - Foundation models for custom solutions",
      "DataRobot - AutoML platform for predictive analytics",
      "UiPath - Intelligent process automation",
      "Salesforce Einstein - CRM with built-in AI",
      "Microsoft Azure AI - Comprehensive AI services suite"
    ]
  };
  
  return industryVendors[industry] || industryVendors.default;
}

function generateDefaultROI(companySize: string, focusArea: string): any {
  const sizeMultiplier = {
    startup: 1,
    "mid-market": 1.5,
    enterprise: 2
  }[companySize] || 1;
  
  const focusROI = {
    efficiency: {
      efficiency: `${20 * sizeMultiplier}-${30 * sizeMultiplier}% reduction`,
      revenue: `${5 * sizeMultiplier}-${10 * sizeMultiplier}% growth`,
      timeline: "3-6 months"
    },
    growth: {
      efficiency: `${10 * sizeMultiplier}-${15 * sizeMultiplier}% reduction`,
      revenue: `${15 * sizeMultiplier}-${30 * sizeMultiplier}% growth`,
      timeline: "6-9 months"
    },
    innovation: {
      efficiency: `${15 * sizeMultiplier}-${20 * sizeMultiplier}% reduction`,
      revenue: `${10 * sizeMultiplier}-${25 * sizeMultiplier}% growth`,
      timeline: "9-12 months"
    },
    experience: {
      efficiency: `${10 * sizeMultiplier}-${20 * sizeMultiplier}% reduction`,
      revenue: `${8 * sizeMultiplier}-${15 * sizeMultiplier}% growth`,
      timeline: "4-8 months"
    }
  };
  
  return focusROI[focusArea as keyof typeof focusROI] || focusROI.efficiency;
}

function generateMockBlueprint(industry: string, companySize: string, focusArea: string) {
  return {
    industry,
    overview: generateDefaultOverview(industry),
    opportunities: {
      title: "Key AI Opportunities",
      items: generateDefaultOpportunities(industry)
    },
    useCases: {
      title: "High-Impact Use Cases",
      items: generateDefaultUseCases(industry, focusArea)
    },
    implementation: {
      title: "Implementation Roadmap",
      items: generateDefaultImplementation()
    },
    vendors: {
      title: "Recommended Solutions",
      items: generateDefaultVendors(industry)
    },
    roi: generateDefaultROI(companySize, focusArea)
  };
}