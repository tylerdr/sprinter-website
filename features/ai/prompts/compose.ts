/**
 * Simplified prompt composition system for MortgageQ agents.
 */

import { composeCorePrompt, CorePromptOptions } from "./core";

export interface ComposePromptOptions extends CorePromptOptions {
  agentName?: string;
  specialization?: string;
  skipCore?: boolean;
}

/**
 * Compose a complete agent system prompt
 */
export function composeAgentSystemPrompt(
  agentSpecificPrompt?: string,
  options: ComposePromptOptions = {}
): string {
  const { skipCore = false, specialization, ...coreOptions } = options;

  let basePrompt = "";

  if (!skipCore) {
    basePrompt = composeCorePrompt(coreOptions);
  }

  // Combine base + specialization + agent-specific
  const sections = [basePrompt, specialization, agentSpecificPrompt].filter(
    Boolean
  );

  return sections.join("\n\n");
}