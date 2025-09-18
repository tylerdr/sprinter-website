import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

export function getModel(modelName?: string) {
  // Default to GPT-4 or Claude based on env variable
  const defaultModel = process.env.DEFAULT_AI_MODEL || "gpt-4o-mini";
  const model = modelName || defaultModel;

  if (model.includes("claude")) {
    return anthropic(model);
  }

  return openai(model);
}