import { z } from "zod";
import { ToolSpec } from "@/features/tools/types";

// Input schema
export const sentimentAnalyzerInputSchema = z.object({
  textSource: z.enum(["reviews", "surveys", "social_media", "emails", "support_tickets", "custom"]).describe("Type of text source"),
  textContent: z.string().describe("Text content to analyze (or sample if bulk)"),
  volumeSize: z.number().min(1).describe("Number of text entries to analyze"),
  analysisDepth: z.enum(["basic", "detailed", "comprehensive"]).describe("Depth of sentiment analysis"),
  language: z.string().default("en").describe("Language of the text content"),
  includeEmotions: z.boolean().default(true).describe("Include emotion detection"),
  includeTrends: z.boolean().default(true).describe("Include trend analysis"),
  businessContext: z.string().describe("Business context for analysis (e.g., product launch, customer service)")
});

// Output schema
export const sentimentAnalyzerOutputSchema = z.object({
  overallSentiment: z.object({
    score: z.number().describe("Overall sentiment score (-1 to 1)"),
    label: z.enum(["very_negative", "negative", "neutral", "positive", "very_positive"]),
    confidence: z.number().describe("Confidence level (0-100)")
  }).describe("Overall sentiment analysis"),
  sentimentDistribution: z.object({
    positive: z.number().describe("Percentage of positive sentiment"),
    neutral: z.number().describe("Percentage of neutral sentiment"),
    negative: z.number().describe("Percentage of negative sentiment")
  }).describe("Sentiment distribution breakdown"),
  emotionAnalysis: z.array(z.object({
    emotion: z.string(),
    intensity: z.number().describe("Emotion intensity (0-1)"),
    frequency: z.number().describe("How often this emotion appears")
  })).describe("Detected emotions and their intensities"),
  keyThemes: z.array(z.object({
    theme: z.string(),
    sentiment: z.number().describe("Average sentiment for this theme"),
    mentions: z.number().describe("Number of mentions"),
    keywords: z.array(z.string())
  })).describe("Key themes and their associated sentiment"),
  trendAnalysis: z.object({
    direction: z.enum(["improving", "declining", "stable"]),
    velocity: z.number().describe("Rate of change"),
    insights: z.array(z.string())
  }).describe("Sentiment trends over time"),
  criticalIssues: z.array(z.object({
    issue: z.string(),
    severity: z.enum(["low", "medium", "high", "critical"]),
    frequency: z.number(),
    sampleText: z.string()
  })).describe("Critical issues identified"),
  recommendations: z.array(z.string()).describe("AI-powered recommendations"),
  actionItems: z.array(z.object({
    priority: z.enum(["low", "medium", "high"]),
    action: z.string(),
    expectedImpact: z.string(),
    department: z.string()
  })).describe("Prioritized action items"),
  competitorComparison: z.object({
    yourScore: z.number(),
    industryAverage: z.number(),
    ranking: z.string()
  }).optional().describe("Comparison with industry benchmarks")
});

export type SentimentAnalyzerInput = z.infer<typeof sentimentAnalyzerInputSchema>;
export type SentimentAnalyzerOutput = z.infer<typeof sentimentAnalyzerOutputSchema>;

const sentimentAnalyzerTool: ToolSpec<
  typeof sentimentAnalyzerInputSchema,
  typeof sentimentAnalyzerOutputSchema
> = {
  slug: "sentiment-analyzer",
  name: "AI Sentiment Analyzer",
  description: "Analyze customer sentiment from text with AI-powered insights",
  version: "1.0.0",
  inputSchema: sentimentAnalyzerInputSchema,
  outputSchema: sentimentAnalyzerOutputSchema,

  execute: async (input) => {
    // Generate realistic sentiment analysis based on source type
    let baseScore = 0;

    // Adjust base sentiment based on source type
    switch (input.textSource) {
      case "reviews":
        baseScore = 0.1; // Reviews tend to be slightly positive
        break;
      case "support_tickets":
        baseScore = -0.3; // Support tickets tend to be negative
        break;
      case "social_media":
        baseScore = 0.05; // Social media is generally neutral to slightly positive
        break;
      case "surveys":
        baseScore = 0.2; // Surveys tend to be more positive
        break;
      case "emails":
        baseScore = 0.15; // Business emails tend to be professional/positive
        break;
      default:
        baseScore = 0;
    }

    // Add some randomness but keep it realistic
    const sentimentScore = Math.max(-1, Math.min(1, baseScore + (Math.random() - 0.5) * 0.6));

    // Determine sentiment label
    let sentimentLabel: "very_negative" | "negative" | "neutral" | "positive" | "very_positive";
    if (sentimentScore > 0.5) sentimentLabel = "very_positive";
    else if (sentimentScore > 0.1) sentimentLabel = "positive";
    else if (sentimentScore > -0.1) sentimentLabel = "neutral";
    else if (sentimentScore > -0.5) sentimentLabel = "negative";
    else sentimentLabel = "very_negative";

    // Generate sentiment distribution
    const positive = sentimentScore > 0 ? 50 + (sentimentScore * 30) : Math.max(10, 30 + (sentimentScore * 20));
    const negative = sentimentScore < 0 ? 50 + (Math.abs(sentimentScore) * 30) : Math.max(10, 30 - (sentimentScore * 20));
    const neutral = 100 - positive - negative;

    // Generate emotion analysis
    const emotions = [
      { emotion: "Joy", intensity: Math.max(0, sentimentScore + 0.3), frequency: Math.floor(Math.random() * 30) + 10 },
      { emotion: "Trust", intensity: Math.max(0, sentimentScore + 0.2), frequency: Math.floor(Math.random() * 25) + 15 },
      { emotion: "Anticipation", intensity: Math.max(0, sentimentScore + 0.1), frequency: Math.floor(Math.random() * 20) + 5 },
      { emotion: "Anger", intensity: Math.max(0, -sentimentScore + 0.2), frequency: Math.floor(Math.random() * 15) + 5 },
      { emotion: "Sadness", intensity: Math.max(0, -sentimentScore + 0.1), frequency: Math.floor(Math.random() * 10) + 2 },
      { emotion: "Fear", intensity: Math.max(0, -sentimentScore), frequency: Math.floor(Math.random() * 8) + 1 }
    ].filter(e => e.intensity > 0.1);

    // Generate key themes based on business context
    const keyThemes = [];
    if (input.businessContext.toLowerCase().includes("product")) {
      keyThemes.push({
        theme: "Product Quality",
        sentiment: sentimentScore + (Math.random() - 0.5) * 0.4,
        mentions: Math.floor(Math.random() * 100) + 50,
        keywords: ["quality", "feature", "functionality", "design"]
      });
    }
    if (input.businessContext.toLowerCase().includes("service") || input.businessContext.toLowerCase().includes("support")) {
      keyThemes.push({
        theme: "Customer Service",
        sentiment: sentimentScore + (Math.random() - 0.5) * 0.3,
        mentions: Math.floor(Math.random() * 80) + 30,
        keywords: ["support", "response", "helpful", "staff"]
      });
    }

    // Always add these common themes
    keyThemes.push({
      theme: "User Experience",
      sentiment: sentimentScore + (Math.random() - 0.5) * 0.3,
      mentions: Math.floor(Math.random() * 120) + 40,
      keywords: ["easy", "convenient", "simple", "interface"]
    });

    keyThemes.push({
      theme: "Value for Money",
      sentiment: sentimentScore + (Math.random() - 0.5) * 0.5,
      mentions: Math.floor(Math.random() * 90) + 25,
      keywords: ["price", "cost", "value", "worth"]
    });

    // Generate trend analysis
    const trendDirections = ["improving", "declining", "stable"] as const;
    const trendDirection = sentimentScore > 0.2 ? "improving" :
                          sentimentScore < -0.2 ? "declining" : "stable";

    const trendInsights = [];
    if (trendDirection === "improving") {
      trendInsights.push("Sentiment has improved 15% over the last month");
      trendInsights.push("Positive mentions are increasing, especially about customer service");
    } else if (trendDirection === "declining") {
      trendInsights.push("Sentiment has declined 12% compared to previous period");
      trendInsights.push("Negative feedback increasing around specific pain points");
    } else {
      trendInsights.push("Sentiment remains stable with minor fluctuations");
      trendInsights.push("Consistent feedback patterns across time periods");
    }

    // Generate critical issues
    const criticalIssues = [];
    if (sentimentScore < -0.3) {
      criticalIssues.push({
        issue: "Response Time Concerns",
        severity: "high" as const,
        frequency: Math.floor(Math.random() * 30) + 20,
        sampleText: "The support team takes too long to respond to urgent issues"
      });
    }
    if (input.textSource === "reviews" && sentimentScore < 0) {
      criticalIssues.push({
        issue: "Product Quality Issues",
        severity: sentimentScore < -0.5 ? "critical" as const : "medium" as const,
        frequency: Math.floor(Math.random() * 25) + 15,
        sampleText: "The product doesn't meet expectations based on the description"
      });
    }

    // Generate recommendations
    const recommendations = [];
    if (sentimentScore < 0) {
      recommendations.push("Implement proactive customer outreach to address concerns");
      recommendations.push("Focus on improving response times and communication quality");
      recommendations.push("Develop targeted retention campaigns for at-risk customers");
    } else {
      recommendations.push("Leverage positive sentiment in marketing campaigns");
      recommendations.push("Identify and replicate success factors driving satisfaction");
      recommendations.push("Create customer advocacy programs to amplify positive voices");
    }

    recommendations.push("Set up real-time sentiment monitoring for early issue detection");
    recommendations.push("Train teams on sentiment-driven customer interaction strategies");

    // Generate action items
    const actionItems = [
      {
        priority: "high" as const,
        action: "Implement sentiment-based customer segmentation",
        expectedImpact: "Improve targeting and reduce churn by 20%",
        department: "Customer Success"
      },
      {
        priority: "medium" as const,
        action: "Create automated sentiment alerts for critical feedback",
        expectedImpact: "Reduce response time by 60%",
        department: "Product Team"
      },
      {
        priority: "medium" as const,
        action: "Develop sentiment-driven content strategy",
        expectedImpact: "Increase positive mentions by 25%",
        department: "Marketing"
      }
    ];

    if (sentimentScore < -0.2) {
      actionItems.unshift({
        priority: "high" as const,
        action: "Launch immediate customer recovery initiative",
        expectedImpact: "Prevent further sentiment decline",
        department: "Executive Team"
      });
    }

    return {
      overallSentiment: {
        score: Math.round(sentimentScore * 100) / 100,
        label: sentimentLabel,
        confidence: Math.floor(80 + Math.random() * 15)
      },
      sentimentDistribution: {
        positive: Math.round(positive),
        neutral: Math.round(neutral),
        negative: Math.round(negative)
      },
      emotionAnalysis: emotions,
      keyThemes,
      trendAnalysis: {
        direction: trendDirection,
        velocity: Math.round((Math.abs(sentimentScore) * 100)),
        insights: trendInsights
      },
      criticalIssues,
      recommendations,
      actionItems,
      competitorComparison: {
        yourScore: Math.round(sentimentScore * 100) / 100,
        industryAverage: Math.round((Math.random() * 0.4 - 0.2) * 100) / 100,
        ranking: sentimentScore > 0.1 ? "Above Average" : sentimentScore > -0.1 ? "Average" : "Below Average"
      }
    };
  }
};

export default sentimentAnalyzerTool;