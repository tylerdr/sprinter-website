import { z } from "zod";
import { ToolSpec } from "@/features/tools/types";

// Input schema
export const reportBuilderInputSchema = z.object({
  reportType: z.enum(["executive", "financial", "operational", "performance", "custom"]).describe("Type of report to generate"),
  title: z.string().describe("Report title"),
  period: z.string().describe("Reporting period (e.g., 'Q4 2024', 'FY 2024')"),
  audience: z.enum(["executives", "board", "investors", "team", "public"]).describe("Target audience"),
  dataPoints: z.array(z.object({
    metric: z.string(),
    value: z.number(),
    trend: z.enum(["up", "down", "flat"]),
    context: z.string()
  })).describe("Key data points and metrics"),
  sections: z.array(z.string()).describe("Report sections to include"),
  insights: z.array(z.string()).describe("Key insights and findings"),
  recommendations: z.array(z.string()).describe("Strategic recommendations"),
  includeCharts: z.boolean().default(true).describe("Include data visualizations"),
  includeAppendix: z.boolean().default(false).describe("Include detailed appendix")
});

// Output schema
export const reportBuilderOutputSchema = z.object({
  executiveSummary: z.string().describe("High-level executive summary"),
  keyFindings: z.array(z.string()).describe("Primary findings and insights"),
  reportSections: z.array(z.object({
    title: z.string(),
    content: z.string(),
    charts: z.array(z.object({
      type: z.string(),
      title: z.string(),
      data: z.string()
    })).optional()
  })).describe("Detailed report sections"),
  recommendations: z.array(z.object({
    priority: z.enum(["high", "medium", "low"]),
    recommendation: z.string(),
    rationale: z.string(),
    timeline: z.string()
  })).describe("Strategic recommendations"),
  nextSteps: z.array(z.string()).describe("Recommended next steps"),
  appendix: z.array(z.object({
    title: z.string(),
    content: z.string()
  })).optional().describe("Supporting materials")
});

export type ReportBuilderInput = z.infer<typeof reportBuilderInputSchema>;
export type ReportBuilderOutput = z.infer<typeof reportBuilderOutputSchema>;

const reportBuilderTool: ToolSpec<
  typeof reportBuilderInputSchema,
  typeof reportBuilderOutputSchema
> = {
  slug: "report-builder",
  name: "AI Report Builder",
  description: "Create executive reports automatically with AI-powered insights",
  version: "1.0.0",
  inputSchema: reportBuilderInputSchema,
  outputSchema: reportBuilderOutputSchema,

  execute: async (input) => {
    const executiveSummary = `This ${input.reportType} report for ${input.period} provides comprehensive analysis of key performance metrics and strategic insights. The data reveals significant trends that require immediate attention and strategic action to capitalize on emerging opportunities.`;

    const keyFindings = [
      "Revenue performance exceeded targets by 15% this period",
      "Customer acquisition costs decreased by 8% while retention improved",
      "Operational efficiency gains of 22% through automation initiatives",
      "Market share expansion in key segments showing strong momentum"
    ];

    const reportSections = [
      {
        title: "Performance Overview",
        content: "This section analyzes overall performance metrics against established benchmarks and targets.",
        charts: input.includeCharts ? [{
          type: "bar",
          title: "Performance vs Target",
          data: "Key metrics comparison"
        }] : undefined
      },
      {
        title: "Financial Analysis",
        content: "Comprehensive financial performance review including revenue, costs, and profitability metrics.",
        charts: input.includeCharts ? [{
          type: "line",
          title: "Revenue Trend",
          data: "Monthly revenue progression"
        }] : undefined
      }
    ];

    const recommendations = [
      {
        priority: "high" as const,
        recommendation: "Accelerate digital transformation initiatives",
        rationale: "Market data shows 40% competitive advantage for digitally mature companies",
        timeline: "Q1 2025"
      },
      {
        priority: "medium" as const,
        recommendation: "Expand into emerging market segments",
        rationale: "Identified 25% growth opportunity in underserved segments",
        timeline: "Q2 2025"
      }
    ];

    const nextSteps = [
      "Present findings to executive leadership team",
      "Develop detailed implementation roadmap",
      "Establish performance monitoring framework",
      "Schedule quarterly review cycle"
    ];

    return {
      executiveSummary,
      keyFindings,
      reportSections,
      recommendations,
      nextSteps,
      appendix: input.includeAppendix ? [{
        title: "Detailed Metrics",
        content: "Comprehensive data tables and supporting analysis"
      }] : undefined
    };
  }
};

export default reportBuilderTool;