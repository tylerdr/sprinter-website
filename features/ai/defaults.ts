/**
 * Default AI configuration values
 */

// Default model to use when none is specified
export const DEFAULT_MODEL = "openai:gpt-5";

// Default temperature for model responses
export const DEFAULT_TEMPERATURE = 0.7;

// Default max tokens for model responses
export const DEFAULT_MAX_TOKENS = 4000;

// Default max tool calls/steps for agents
export const DEFAULT_MAX_STEPS = 10;

// Default MortgageQ agent ID (all zeros UUID)
export const DEFAULT_AGENT_ID = "00000000-0000-0000-0000-000000000000";

/**
 * Get the default model, with optional fallback
 */
export function getDefaultModel(): string {
  // Could add environment variable override here
  return process.env.DEFAULT_AI_MODEL || DEFAULT_MODEL;
}
