/**
 * Model Provider Resolution
 * Maps provider names to AI SDK model instances
 */

import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";

export type ProviderId = "openai" | "anthropic" | "google";

/**
 * Provider map for model resolution
 */
const providerMap = { 
  openai, 
  anthropic, 
  google 
} satisfies Record<string, any>;

/**
 * Resolve a model instance from provider and model ID
 * @param provider - Provider name (openai, anthropic, google)
 * @param modelId - Model identifier (e.g., gpt-4o, claude-3-sonnet)
 * @returns Model instance for use with AI SDK
 */
export function resolveModel(provider: ProviderId, modelId: string) {
  const providerFn = providerMap[provider];
  
  if (!providerFn) {
    throw new Error(`Unknown provider: ${provider}`);
  }
  
  return providerFn(modelId);
}