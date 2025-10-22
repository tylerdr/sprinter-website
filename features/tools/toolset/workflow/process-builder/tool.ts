import { z } from "zod";
import { ToolSpec } from "@/features/tools/types";

export const processBuilderInputSchema = z.object({
  processName: z.string().describe("Name of the process to build"),
  department: z.string().describe("Department or team"),
  complexity: z.enum(["simple", "medium", "complex"]).describe("Process complexity level"),
  triggerType: z.enum(["manual", "scheduled", "event", "api"]).describe("Process trigger"),
  steps: z.array(z.string()).describe("Process steps to automate"),
  integrations: z.array(z.string()).describe("Required system integrations"),
  approvals: z.boolean().default(false).describe("Requires approval workflow"),
  notifications: z.boolean().default(true).describe("Include notifications")
});

export const processBuilderOutputSchema = z.object({
  processMap: z.string().describe("Visual process map description"),
  automationSteps: z.array(z.object({
    step: z.string(),
    automation: z.string(),
    tools: z.array(z.string())
  })).describe("Automated process steps"),
  integrationPlan: z.array(z.string()).describe("System integration requirements"),
  timeline: z.string().describe("Implementation timeline"),
  resources: z.array(z.string()).describe("Required resources"),
  roi: z.string().describe("Expected ROI")
});

export type ProcessBuilderInput = z.infer<typeof processBuilderInputSchema>;
export type ProcessBuilderOutput = z.infer<typeof processBuilderOutputSchema>;

const processBuilderTool: ToolSpec<typeof processBuilderInputSchema, typeof processBuilderOutputSchema> = {
  slug: "process-builder",
  name: "Process Builder",
  description: "Build automated workflows without code",
  version: "1.0.0",
  inputSchema: processBuilderInputSchema,
  outputSchema: processBuilderOutputSchema,
  execute: async (input) => ({
    processMap: `${input.processName} workflow with ${input.steps.length} automated steps`,
    automationSteps: input.steps.map((step, i) => ({
      step,
      automation: `Automated using AI workflow engine`,
      tools: ["Zapier", "Microsoft Power Automate", "Custom API"]
    })),
    integrationPlan: input.integrations.map(int => `Connect to ${int} via API`),
    timeline: input.complexity === "simple" ? "2-4 weeks" : input.complexity === "medium" ? "4-8 weeks" : "8-12 weeks",
    resources: ["Process analyst", "Automation developer", "QA tester"],
    roi: "Expected 60% efficiency improvement and $50K annual savings"
  })
};

export default processBuilderTool;