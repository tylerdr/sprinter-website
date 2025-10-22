import { z } from "zod";
import type { ToolSpec } from "../../../types";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { createClient } from "@/lib/supabase/server";

export const Input = z.object({
  agentSlug: z.string().describe("The agent to delegate to"),
  task: z.string().min(4).describe("The task for the sub-agent to perform"),
  style: z
    .enum(["brief", "detailed"])
    .default("brief")
    .describe("Response style")
});

export const Output = z.object({
  delegatedTo: z.string(),
  answer: z.string()
});

export type InputType = z.infer<typeof Input>;
export type OutputType = z.infer<typeof Output>;

const providers = { openai, anthropic, google } as const;

const tool: ToolSpec<typeof Input, typeof Output> = {
  slug: "delegate-agent",
  name: "Delegate to Agent",
  description: "Calls another agent for a one-turn response.",
  category: "utility",
  executionMode: "server",
  version: "1.0.0",
  permissions: ["agent:delegate"],
  inputSchema: Input,
  outputSchema: Output,
  async execute({ agentSlug, task, style }) {
    const supabase = await createClient();
    
    // Load target agent from database
    const { data: agent } = await supabase
      .from("ai_agents")
      .select("name, provider, model, metadata, system_prompt")
      .eq("slug", agentSlug)
      .single();

    if (!agent) {
      throw new Error(`Target agent not found: ${agentSlug}`);
    }

    // Resolve model based on provider
    const provider = providers[agent.provider as keyof typeof providers];
    if (!provider) {
      throw new Error(`Unsupported provider: ${agent.provider}`);
    }

    const model = provider(agent.model);

    const system = [
      `You are ${agent.name}.`,
      agent.system_prompt,
      `Style: ${style}. Respond in one ${style === "brief" ? "concise" : "detailed"} answer.`
    ].join("\n\n");

    const { text } = await generateText({
      model,
      system,
      prompt: task
    });

    return {
      delegatedTo: agentSlug,
      answer: text
    };
  }
};

export default tool;
