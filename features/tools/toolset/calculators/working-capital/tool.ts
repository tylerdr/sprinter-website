import { z } from "zod";
import { ToolSpec } from "@/features/tools/types";

// Input schema
export const workingCapitalInputSchema = z.object({
  annualRevenue: z.number().min(0).describe("Annual revenue in dollars"),
  averageReceivableDays: z.number().min(0).describe("Average days to collect receivables"),
  averagePayableDays: z.number().min(0).describe("Average days to pay suppliers"),
  inventoryTurnoverDays: z.number().min(0).describe("Average days inventory is held"),
  currentCashReserve: z.number().min(0).describe("Current cash reserve in dollars"),
  targetReceivableDays: z.number().min(0).describe("Target receivable collection days"),
  targetPayableDays: z.number().min(0).describe("Target payment to suppliers days"),
  targetInventoryDays: z.number().min(0).describe("Target inventory turnover days")
});

// Output schema
export const workingCapitalOutputSchema = z.object({
  currentWorkingCapital: z.number().describe("Current working capital amount"),
  optimizedWorkingCapital: z.number().describe("Optimized working capital amount"),
  workingCapitalImprovement: z.number().describe("Cash flow improvement amount"),
  improvementPercentage: z.number().describe("Percentage improvement"),
  cashFlowImpact: z.number().describe("Total cash flow impact"),
  roiFromOptimization: z.number().describe("ROI percentage from optimization"),
  currentCCC: z.number().describe("Current cash conversion cycle"),
  optimizedCCC: z.number().describe("Optimized cash conversion cycle"),
  cccImprovement: z.number().describe("Cash conversion cycle improvement in days"),
  recommendations: z.array(z.string()).describe("AI-powered optimization recommendations"),
  quickWins: z.array(z.string()).describe("Quick wins to implement"),
  riskFactors: z.array(z.string()).describe("Risk factors to consider")
});

export type WorkingCapitalInput = z.infer<typeof workingCapitalInputSchema>;
export type WorkingCapitalOutput = z.infer<typeof workingCapitalOutputSchema>;

const workingCapitalTool: ToolSpec<
  typeof workingCapitalInputSchema,
  typeof workingCapitalOutputSchema
> = {
  slug: "working-capital-optimizer",
  name: "Working Capital Optimizer",
  description: "Optimize cash flow and unlock trapped capital with AI-powered recommendations",
  version: "1.0.0",
  inputSchema: workingCapitalInputSchema,
  outputSchema: workingCapitalOutputSchema,

  execute: async (input) => {
    // Calculate daily revenue
    const dailyRevenue = input.annualRevenue / 365;

    // Calculate current working capital components
    const currentReceivables = dailyRevenue * input.averageReceivableDays;
    const currentPayables = dailyRevenue * input.averagePayableDays * 0.6; // Assume COGS is 60% of revenue
    const currentInventory = dailyRevenue * input.inventoryTurnoverDays * 0.6;
    const currentWorkingCapital = currentReceivables + currentInventory - currentPayables;

    // Calculate optimized working capital
    const optimizedReceivables = dailyRevenue * input.targetReceivableDays;
    const optimizedPayables = dailyRevenue * input.targetPayableDays * 0.6;
    const optimizedInventory = dailyRevenue * input.targetInventoryDays * 0.6;
    const optimizedWorkingCapital = optimizedReceivables + optimizedInventory - optimizedPayables;

    // Calculate improvements
    const workingCapitalImprovement = currentWorkingCapital - optimizedWorkingCapital;
    const improvementPercentage = (workingCapitalImprovement / currentWorkingCapital) * 100;
    const cashFlowImpact = workingCapitalImprovement;
    const roiFromOptimization = (cashFlowImpact / currentWorkingCapital) * 100;

    // Calculate cash conversion cycle
    const currentCCC = input.averageReceivableDays + input.inventoryTurnoverDays - input.averagePayableDays;
    const optimizedCCC = input.targetReceivableDays + input.targetInventoryDays - input.targetPayableDays;
    const cccImprovement = currentCCC - optimizedCCC;

    // Generate AI recommendations
    const recommendations: string[] = [];
    const quickWins: string[] = [];
    const riskFactors: string[] = [];

    if (input.averageReceivableDays > input.targetReceivableDays) {
      recommendations.push(`Implement automated invoice reminders to reduce receivables by ${input.averageReceivableDays - input.targetReceivableDays} days`);
      quickWins.push("Set up automated dunning sequences");
      quickWins.push("Offer early payment discounts (2/10 net 30)");
    }

    if (input.targetPayableDays > input.averagePayableDays) {
      recommendations.push(`Negotiate extended payment terms with suppliers to extend payables by ${input.targetPayableDays - input.averagePayableDays} days`);
      quickWins.push("Consolidate vendor payments");
      quickWins.push("Implement strategic payment scheduling");
    }

    if (input.inventoryTurnoverDays > input.targetInventoryDays) {
      recommendations.push(`Deploy demand forecasting AI to reduce inventory days by ${input.inventoryTurnoverDays - input.targetInventoryDays}`);
      quickWins.push("Implement just-in-time ordering");
      quickWins.push("Use ABC analysis for inventory management");
    }

    // Add risk factors
    if (improvementPercentage > 30) {
      riskFactors.push("Large working capital changes may require gradual implementation");
    }

    if (input.targetReceivableDays < 15) {
      riskFactors.push("Very aggressive receivables targets may impact customer relationships");
    }

    if (input.targetPayableDays > 60) {
      riskFactors.push("Extended payables may strain supplier relationships");
    }

    // Always include these general recommendations
    recommendations.push("Use AI-powered cash flow forecasting for better planning");
    recommendations.push("Implement automated AP processing to accelerate cycle times");
    quickWins.push("Start with automated invoice processing (saves 5-7 days)");
    quickWins.push("Implement dynamic discounting (improves DSO by 15%)");

    return {
      currentWorkingCapital: Math.round(currentWorkingCapital),
      optimizedWorkingCapital: Math.round(optimizedWorkingCapital),
      workingCapitalImprovement: Math.round(workingCapitalImprovement),
      improvementPercentage: Math.round(improvementPercentage * 100) / 100,
      cashFlowImpact: Math.round(cashFlowImpact),
      roiFromOptimization: Math.round(roiFromOptimization * 100) / 100,
      currentCCC: Math.round(currentCCC),
      optimizedCCC: Math.round(optimizedCCC),
      cccImprovement: Math.round(cccImprovement),
      recommendations,
      quickWins,
      riskFactors
    };
  }
};

export default workingCapitalTool;