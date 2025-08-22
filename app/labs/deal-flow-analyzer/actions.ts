"use server";

import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

interface DealInput {
  companyName: string;
  industry: string;
  revenue: number;
  ebitda: number;
  growth: number;
  askingPrice?: number;
  description?: string;
}

export async function analyzeDeal(input: DealInput) {
  const { companyName, industry, revenue, ebitda, growth, askingPrice, description } = input;
  
  const ebitdaMargin = (ebitda / revenue) * 100;
  const currentMultiple = askingPrice ? askingPrice / ebitda : 0;

  const prompt = `
    Analyze this potential PE acquisition:
    
    Company: ${companyName}
    Industry: ${industry}
    Revenue: $${revenue}M
    EBITDA: $${ebitda}M (${ebitdaMargin.toFixed(1)}% margin)
    YoY Growth: ${growth}%
    ${askingPrice ? `Asking Price: $${askingPrice}M (${currentMultiple.toFixed(1)}x EBITDA)` : ''}
    ${description ? `Description: ${description}` : ''}
    
    Provide a comprehensive investment analysis including:
    1. Investment score (0-100) based on PE criteria
    2. Buy/Hold/Pass recommendation
    3. 5 key investment strengths
    4. 5 key risks to consider
    5. Suggested valuation and multiple with rationale
    6. 5 specific AI/automation opportunities for value creation
    7. 3 exit scenarios with timeline, multiple, and IRR
    8. 4-6 comparable transactions
    
    Consider typical PE factors: scalability, market position, management team, 
    operational improvements, multiple arbitrage, and exit potential.
    
    Format as JSON with clear structure.
  `;

  try {
    const { text } = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      prompt,
      temperature: 0.7,
    });

    // Parse response - in production add error handling
    const analysis = JSON.parse(text);
    
    return formatAnalysis(analysis, input);
  } catch (error) {
    console.error("Error analyzing deal:", error);
    
    // Return mock analysis for demonstration
    return generateMockAnalysis(input);
  }
}

function formatAnalysis(aiData: any, input: DealInput) {
  return {
    score: aiData.score || calculateScore(input),
    recommendation: aiData.recommendation || getRecommendation(input),
    strengths: aiData.strengths || generateStrengths(input),
    risks: aiData.risks || generateRisks(input),
    valuation: aiData.valuation || generateValuation(input),
    aiOpportunities: aiData.aiOpportunities || generateAIOpportunities(input.industry),
    exitScenarios: aiData.exitScenarios || generateExitScenarios(input),
    comparables: aiData.comparables || generateComparables(input)
  };
}

function calculateScore(input: DealInput): number {
  let score = 50; // Base score
  
  // EBITDA margin scoring
  const margin = (input.ebitda / input.revenue) * 100;
  if (margin > 25) score += 15;
  else if (margin > 20) score += 10;
  else if (margin > 15) score += 5;
  else if (margin < 10) score -= 10;
  
  // Growth scoring
  if (input.growth > 30) score += 15;
  else if (input.growth > 20) score += 10;
  else if (input.growth > 10) score += 5;
  else if (input.growth < 5) score -= 10;
  
  // Size scoring
  if (input.revenue > 100) score += 10;
  else if (input.revenue > 50) score += 5;
  else if (input.revenue < 20) score -= 5;
  
  // Multiple scoring (if asking price provided)
  if (input.askingPrice) {
    const multiple = input.askingPrice / input.ebitda;
    if (multiple < 8) score += 10;
    else if (multiple < 10) score += 5;
    else if (multiple > 15) score -= 10;
    else if (multiple > 12) score -= 5;
  }
  
  return Math.min(Math.max(score, 0), 100);
}

function getRecommendation(input: DealInput): "strong-buy" | "buy" | "hold" | "pass" {
  const score = calculateScore(input);
  if (score >= 80) return "strong-buy";
  if (score >= 60) return "buy";
  if (score >= 40) return "hold";
  return "pass";
}

function generateStrengths(input: DealInput): string[] {
  const strengths = [];
  const margin = (input.ebitda / input.revenue) * 100;
  
  if (margin > 20) {
    strengths.push(`Strong EBITDA margin of ${margin.toFixed(1)}% indicates operational efficiency`);
  }
  
  if (input.growth > 20) {
    strengths.push(`Impressive ${input.growth}% YoY growth demonstrates market traction`);
  }
  
  if (input.revenue > 50) {
    strengths.push(`Significant scale at $${input.revenue}M revenue provides platform for add-ons`);
  }
  
  // Industry-specific strengths
  if (input.industry.toLowerCase().includes("software") || input.industry.toLowerCase().includes("saas")) {
    strengths.push("Recurring revenue model provides predictable cash flows");
    strengths.push("High gross margins typical of software businesses enable scaling");
  }
  
  // Add generic strengths to fill
  const genericStrengths = [
    "Fragmented market presents roll-up opportunities",
    "Strong management team with deep industry expertise",
    "Diversified customer base reduces concentration risk",
    "Clear operational improvement opportunities to drive margin expansion",
    "Defensive market position with high barriers to entry"
  ];
  
  while (strengths.length < 5) {
    strengths.push(genericStrengths[strengths.length]);
  }
  
  return strengths.slice(0, 5);
}

function generateRisks(input: DealInput): string[] {
  const risks = [];
  const margin = (input.ebitda / input.revenue) * 100;
  
  if (margin < 15) {
    risks.push(`Below-average EBITDA margin of ${margin.toFixed(1)}% may limit value creation`);
  }
  
  if (input.growth < 10) {
    risks.push(`Modest ${input.growth}% growth rate suggests mature market or competitive pressures`);
  }
  
  if (input.askingPrice) {
    const multiple = input.askingPrice / input.ebitda;
    if (multiple > 12) {
      risks.push(`High asking multiple of ${multiple.toFixed(1)}x EBITDA limits return potential`);
    }
  }
  
  // Industry risks
  const industryRisks: Record<string, string> = {
    software: "Technology disruption risk from emerging AI competitors",
    healthcare: "Regulatory changes could impact reimbursement rates",
    retail: "E-commerce disruption and changing consumer preferences",
    manufacturing: "Supply chain vulnerabilities and input cost inflation",
    default: "Macroeconomic sensitivity could impact performance in downturn"
  };
  
  const industryKey = Object.keys(industryRisks).find(k => 
    input.industry.toLowerCase().includes(k)
  ) || "default";
  
  risks.push(industryRisks[industryKey]);
  
  // Generic risks to fill
  const genericRisks = [
    "Customer concentration with top 10 clients representing significant revenue",
    "Key person dependency on founder/CEO for relationships",
    "Limited financial reporting sophistication may hide issues",
    "Working capital requirements could strain cash flow during growth",
    "Integration complexity if pursuing add-on acquisition strategy"
  ];
  
  while (risks.length < 5) {
    risks.push(genericRisks[risks.length - 1]);
  }
  
  return risks.slice(0, 5);
}

function generateValuation(input: DealInput) {
  const baseMultiple = getIndustryMultiple(input.industry);
  const margin = (input.ebitda / input.revenue) * 100;
  
  // Adjust multiple based on metrics
  let adjustedMultiple = baseMultiple;
  
  if (margin > 25) adjustedMultiple += 1;
  else if (margin < 15) adjustedMultiple -= 1;
  
  if (input.growth > 25) adjustedMultiple += 1.5;
  else if (input.growth > 15) adjustedMultiple += 0.5;
  else if (input.growth < 5) adjustedMultiple -= 1;
  
  const suggestedValue = input.ebitda * adjustedMultiple;
  
  return {
    suggested: `$${suggestedValue.toFixed(0)}M`,
    multiple: `${adjustedMultiple.toFixed(1)}x`,
    rationale: `Based on ${input.industry} comparables at ${baseMultiple}x, adjusted for ${margin.toFixed(0)}% margins and ${input.growth}% growth`
  };
}

function getIndustryMultiple(industry: string): number {
  const multiples: Record<string, number> = {
    software: 12,
    saas: 14,
    healthcare: 10,
    manufacturing: 8,
    retail: 7,
    services: 9,
    technology: 11,
    default: 9
  };
  
  const key = Object.keys(multiples).find(k => 
    industry.toLowerCase().includes(k)
  ) || "default";
  
  return multiples[key];
}

function generateAIOpportunities(industry: string): string[] {
  const opportunities = [
    "Implement AI-powered demand forecasting to optimize inventory and reduce working capital by 20%",
    "Deploy intelligent document processing to automate 80% of back-office workflows",
    "Build predictive analytics for customer churn reduction and lifetime value optimization",
    "Create AI sales assistant to increase rep productivity by 40% and accelerate pipeline velocity",
    "Automate financial reporting and FP&A with AI to provide real-time insights and reduce close time by 50%"
  ];
  
  // Add industry-specific opportunities
  if (industry.toLowerCase().includes("software")) {
    opportunities[0] = "Integrate AI copilot features to increase product stickiness and enable premium pricing";
  } else if (industry.toLowerCase().includes("healthcare")) {
    opportunities[0] = "Deploy clinical AI for improved diagnostics and treatment recommendations";
  } else if (industry.toLowerCase().includes("retail")) {
    opportunities[0] = "Implement AI-driven personalization to increase conversion rates by 30%";
  }
  
  return opportunities;
}

function generateExitScenarios(input: DealInput) {
  const entryMultiple = input.askingPrice ? input.askingPrice / input.ebitda : getIndustryMultiple(input.industry);
  
  return [
    {
      timeline: "3 years",
      multiple: `${(entryMultiple + 2).toFixed(1)}x`,
      irr: "25-30%"
    },
    {
      timeline: "5 years",
      multiple: `${(entryMultiple + 3).toFixed(1)}x`,
      irr: "20-25%"
    },
    {
      timeline: "5+ years",
      multiple: `${(entryMultiple + 4).toFixed(1)}x`,
      irr: "22-28%"
    }
  ];
}

function generateComparables(input: DealInput): string[] {
  const year = new Date().getFullYear();
  const previousYear = year - 1;
  
  const templates = [
    `Vista Equity acquisition of ${input.industry} leader (${previousYear}, ${getIndustryMultiple(input.industry)}x EBITDA)`,
    `Thoma Bravo take-private of mid-market ${input.industry} firm ($${(input.revenue * 1.5).toFixed(0)}M revenue, ${(getIndustryMultiple(input.industry) + 1).toFixed(1)}x)`,
    `KKR platform investment in ${input.industry} services ($${(input.revenue * 0.8).toFixed(0)}M revenue, ${(getIndustryMultiple(input.industry) - 0.5).toFixed(1)}x)`,
    `Carlyle growth investment in ${input.industry} disruptor (${input.growth + 10}% growth, ${(getIndustryMultiple(input.industry) + 2).toFixed(1)}x)`,
    `Apollo strategic roll-up in fragmented ${input.industry} market (platform at ${getIndustryMultiple(input.industry).toFixed(1)}x)`,
    `Blackstone transformation play in ${input.industry} (margin expansion from ${((input.ebitda / input.revenue) * 100 - 5).toFixed(0)}% to ${((input.ebitda / input.revenue) * 100 + 10).toFixed(0)}%)`
  ];
  
  return templates.slice(0, 4 + Math.floor(Math.random() * 2));
}

function generateMockAnalysis(input: DealInput) {
  return {
    score: calculateScore(input),
    recommendation: getRecommendation(input),
    strengths: generateStrengths(input),
    risks: generateRisks(input),
    valuation: generateValuation(input),
    aiOpportunities: generateAIOpportunities(input.industry),
    exitScenarios: generateExitScenarios(input),
    comparables: generateComparables(input)
  };
}