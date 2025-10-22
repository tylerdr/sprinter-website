import { z } from "zod";
import type { ToolSpec } from "@/features/tools/types";
import { getModel } from "@/lib/ai-utils";
import { generateText } from "ai";

// Input schema for lead scoring
export const inputSchema = z.object({
  companyName: z.string().describe("Company name"),
  industry: z.string().describe("Industry or sector"),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5000+"]).describe("Number of employees"),
  annualRevenue: z.enum(["<$1M", "$1M-$10M", "$10M-$50M", "$50M-$100M", "$100M-$500M", "$500M-$1B", ">$1B"]).optional().describe("Annual revenue range"),
  contactRole: z.enum(["C-Level", "VP", "Director", "Manager", "Individual Contributor", "Other"]).describe("Contact's role level"),
  contactDepartment: z.enum(["Executive", "Sales", "Marketing", "Engineering", "Product", "Operations", "Finance", "HR", "IT", "Other"]).describe("Contact's department"),
  engagementHistory: z.object({
    websiteVisits: z.number().min(0).describe("Number of website visits"),
    emailsOpened: z.number().min(0).describe("Number of emails opened"),
    contentDownloads: z.number().min(0).describe("Number of content pieces downloaded"),
    demoRequested: z.boolean().describe("Has requested a demo"),
    pricingViewed: z.boolean().describe("Has viewed pricing page")
  }).describe("Engagement metrics"),
  currentTools: z.array(z.string()).optional().describe("Current tools/solutions they use"),
  painPoints: z.string().optional().describe("Known pain points or challenges"),
  budget: z.enum(["Not Disclosed", "<$10K", "$10K-$50K", "$50K-$100K", "$100K-$500K", ">$500K"]).optional().describe("Budget range"),
  timeline: z.enum(["Immediate", "This Quarter", "Next Quarter", "This Year", "Next Year", "No Timeline"]).optional().describe("Purchase timeline"),
  competitorInterest: z.array(z.string()).optional().describe("Competitors they're evaluating")
});

// Output schema
export const outputSchema = z.object({
  score: z.number().min(0).max(100).describe("Lead score from 0-100"),
  grade: z.enum(["A", "B", "C", "D", "F"]).describe("Lead grade"),
  tier: z.enum(["Hot", "Warm", "Cool", "Cold"]).describe("Lead temperature tier"),
  reasons: z.array(z.string()).describe("Key scoring factors"),
  recommendations: z.array(z.string()).describe("Recommended next actions"),
  insights: z.object({
    strengths: z.array(z.string()).describe("Positive indicators"),
    concerns: z.array(z.string()).describe("Areas of concern"),
    opportunities: z.array(z.string()).describe("Potential opportunities")
  }).describe("Detailed insights"),
  predictedDealSize: z.string().optional().describe("Predicted deal size range"),
  conversionProbability: z.number().min(0).max(100).describe("Probability of conversion"),
  priorityLevel: z.enum(["Immediate Action", "High Priority", "Medium Priority", "Low Priority", "Nurture"]).describe("Recommended priority level")
});

type Input = z.infer<typeof inputSchema>;
type Output = z.infer<typeof outputSchema>;

const tool: ToolSpec<typeof inputSchema, typeof outputSchema> = {
  slug: "lead-scorer",
  name: "AI Lead Scorer",
  description: "Score and qualify leads using AI-powered analysis",
  category: "marketing",
  inputSchema,
  outputSchema,
  executionMode: "server",

  async execute(input: Input): Promise<Output> {
    // Calculate base score components
    const companyScore = calculateCompanyScore(input);
    const contactScore = calculateContactScore(input);
    const engagementScore = calculateEngagementScore(input.engagementHistory);
    const intentScore = calculateIntentScore(input);

    // Weighted average for final score
    const finalScore = Math.round(
      companyScore * 0.25 +
      contactScore * 0.20 +
      engagementScore * 0.35 +
      intentScore * 0.20
    );

    // Determine grade and tier
    const grade = getGrade(finalScore);
    const tier = getTier(finalScore);

    // Use AI for insights and recommendations
    const aiAnalysis = await analyzeWithAI(input, finalScore);

    return {
      score: finalScore,
      grade,
      tier,
      reasons: generateReasons(input, companyScore, contactScore, engagementScore, intentScore),
      recommendations: aiAnalysis.recommendations,
      insights: aiAnalysis.insights,
      predictedDealSize: predictDealSize(input),
      conversionProbability: calculateConversionProbability(finalScore, input),
      priorityLevel: getPriorityLevel(finalScore, input)
    };
  }
};

// Helper functions
function calculateCompanyScore(input: Input): number {
  let score = 50; // Base score

  // Company size scoring
  const sizeScores: Record<string, number> = {
    "1-10": 30,
    "11-50": 40,
    "51-200": 60,
    "201-500": 70,
    "501-1000": 80,
    "1001-5000": 85,
    "5000+": 90
  };
  score = sizeScores[input.companySize] || 50;

  // Revenue adjustment
  if (input.annualRevenue) {
    const revenueBonus: Record<string, number> = {
      "<$1M": -10,
      "$1M-$10M": 0,
      "$10M-$50M": 5,
      "$50M-$100M": 10,
      "$100M-$500M": 15,
      "$500M-$1B": 20,
      ">$1B": 25
    };
    score += revenueBonus[input.annualRevenue] || 0;
  }

  return Math.max(0, Math.min(100, score));
}

function calculateContactScore(input: Input): number {
  const roleScores: Record<string, number> = {
    "C-Level": 95,
    "VP": 85,
    "Director": 75,
    "Manager": 60,
    "Individual Contributor": 40,
    "Other": 30
  };

  const departmentMultipliers: Record<string, number> = {
    "Executive": 1.2,
    "Sales": 1.0,
    "Marketing": 1.0,
    "Product": 0.9,
    "Engineering": 0.8,
    "Operations": 0.8,
    "Finance": 0.9,
    "IT": 0.8,
    "HR": 0.6,
    "Other": 0.7
  };

  const baseScore = roleScores[input.contactRole] || 50;
  const multiplier = departmentMultipliers[input.contactDepartment] || 1.0;

  return Math.round(baseScore * multiplier);
}

function calculateEngagementScore(engagement: Input["engagementHistory"]): number {
  let score = 0;

  // Website visits (max 20 points)
  score += Math.min(engagement.websiteVisits * 2, 20);

  // Emails opened (max 15 points)
  score += Math.min(engagement.emailsOpened * 3, 15);

  // Content downloads (max 20 points)
  score += Math.min(engagement.contentDownloads * 5, 20);

  // Demo requested (25 points)
  if (engagement.demoRequested) score += 25;

  // Pricing viewed (20 points)
  if (engagement.pricingViewed) score += 20;

  return Math.min(100, score);
}

function calculateIntentScore(input: Input): number {
  let score = 50;

  // Timeline scoring
  if (input.timeline) {
    const timelineScores: Record<string, number> = {
      "Immediate": 100,
      "This Quarter": 85,
      "Next Quarter": 70,
      "This Year": 55,
      "Next Year": 40,
      "No Timeline": 20
    };
    score = timelineScores[input.timeline] || 50;
  }

  // Budget influence
  if (input.budget && input.budget !== "Not Disclosed") {
    score += 10; // Bonus for having budget information
  }

  // Pain points mentioned
  if (input.painPoints && input.painPoints.length > 10) {
    score += 10; // Bonus for articulated pain points
  }

  // Competitor evaluation
  if (input.competitorInterest && input.competitorInterest.length > 0) {
    score += 5 * Math.min(input.competitorInterest.length, 3); // Up to 15 points
  }

  return Math.min(100, score);
}

function getGrade(score: number): Output["grade"] {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function getTier(score: number): Output["tier"] {
  if (score >= 80) return "Hot";
  if (score >= 60) return "Warm";
  if (score >= 40) return "Cool";
  return "Cold";
}

function generateReasons(
  input: Input,
  companyScore: number,
  contactScore: number,
  engagementScore: number,
  intentScore: number
): string[] {
  const reasons = [];

  if (companyScore >= 70) {
    reasons.push(`Strong company fit (${input.companySize} employees)`);
  }

  if (contactScore >= 80) {
    reasons.push(`Decision maker contact (${input.contactRole})`);
  }

  if (engagementScore >= 60) {
    reasons.push("High engagement level");
  }

  if (input.engagementHistory.demoRequested) {
    reasons.push("Demo requested - strong buying signal");
  }

  if (input.timeline === "Immediate" || input.timeline === "This Quarter") {
    reasons.push(`Urgent timeline: ${input.timeline}`);
  }

  if (input.budget && input.budget !== "Not Disclosed") {
    reasons.push("Budget allocated");
  }

  return reasons.slice(0, 5); // Top 5 reasons
}

async function analyzeWithAI(input: Input, score: number): Promise<{
  recommendations: string[];
  insights: Output["insights"];
}> {
  try {
    const prompt = `
    Analyze this lead and provide recommendations:
    Company: ${input.companyName} (${input.industry}, ${input.companySize} employees)
    Contact: ${input.contactRole} in ${input.contactDepartment}
    Lead Score: ${score}/100
    Engagement: ${JSON.stringify(input.engagementHistory)}
    Timeline: ${input.timeline || "Not specified"}
    Budget: ${input.budget || "Not specified"}

    Provide:
    1. 3-5 specific action recommendations
    2. Key strengths (2-3 points)
    3. Concerns to address (2-3 points)
    4. Opportunities to explore (2-3 points)

    Return as valid JSON with this exact structure:
    {
      "recommendations": ["recommendation1", "recommendation2", ...],
      "strengths": ["strength1", "strength2", ...],
      "concerns": ["concern1", "concern2", ...],
      "opportunities": ["opportunity1", "opportunity2", ...]
    }
    `;

    const model = getModel("gpt-4o-mini");
    const { text } = await generateText({
      model,
      prompt,
      temperature: 0.7
    });

    const result = JSON.parse(text);

    return {
      recommendations: result.recommendations || ["Schedule discovery call", "Send case study", "Connect on LinkedIn"],
      insights: {
        strengths: result.strengths || ["Strong engagement metrics", "Decision maker involvement"],
        concerns: result.concerns || ["Timeline not urgent", "Budget not confirmed"],
        opportunities: result.opportunities || ["Expand to other departments", "Upsell potential"]
      }
    };
  } catch (error) {
    // Fallback recommendations if AI fails
    return {
      recommendations: [
        score >= 80 ? "Schedule immediate demo" : "Send nurture content",
        "Share relevant case study",
        score >= 60 ? "Connect with decision maker" : "Add to email campaign"
      ],
      insights: {
        strengths: ["Active engagement", "Appropriate company size"],
        concerns: ["Timeline unclear", "Budget not confirmed"],
        opportunities: ["Build stronger relationship", "Identify additional stakeholders"]
      }
    };
  }
}

function predictDealSize(input: Input): string {
  const sizeFactors = {
    "1-10": 10000,
    "11-50": 25000,
    "51-200": 50000,
    "201-500": 100000,
    "501-1000": 250000,
    "1001-5000": 500000,
    "5000+": 1000000
  };

  const baseDeal = sizeFactors[input.companySize] || 50000;
  const minDeal = baseDeal * 0.5;
  const maxDeal = baseDeal * 2;

  return `$${(minDeal/1000).toFixed(0)}K - $${(maxDeal/1000).toFixed(0)}K`;
}

function calculateConversionProbability(score: number, input: Input): number {
  let probability = score * 0.8; // Base from score

  // Boost for strong signals
  if (input.engagementHistory.demoRequested) probability += 10;
  if (input.timeline === "Immediate") probability += 10;
  if (input.budget && input.budget !== "Not Disclosed") probability += 5;

  return Math.min(95, Math.round(probability));
}

function getPriorityLevel(score: number, input: Input): Output["priorityLevel"] {
  if (score >= 85 || input.timeline === "Immediate") return "Immediate Action";
  if (score >= 70 || input.engagementHistory.demoRequested) return "High Priority";
  if (score >= 50) return "Medium Priority";
  if (score >= 30) return "Low Priority";
  return "Nurture";
}

export default tool;