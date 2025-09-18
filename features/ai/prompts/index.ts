// New simplified prompt system
import {
  composeCorePrompt,
  buildCoreContext,
  buildSafetyRules,
  buildToolGuidelines,
  type CorePromptOptions
} from "./core";

import {
  composeAgentSystemPrompt as composePrompt,
  type ComposePromptOptions
} from "./compose";

// Export new system
export {
  // Core components
  composeCorePrompt,
  buildCoreContext,
  buildSafetyRules,
  buildToolGuidelines,
  type CorePromptOptions,

  // Composition
  composePrompt,
  type ComposePromptOptions
};

// Legacy exports for backward compatibility
import {
  buildSystemInformationPrompt,
  type SystemInformationPromptOptions
} from "./system-information";
import {
  buildInteractionGuidelinesPrompt,
  type InteractionGuidelinesOptions
} from "./interaction-guidelines";
import {
  buildFormattingPrompt,
  type FormattingPromptOptions,
  type CitationMode
} from "./formatting-guidelines";

export {
  buildSystemInformationPrompt,
  type SystemInformationPromptOptions,
  buildInteractionGuidelinesPrompt,
  type InteractionGuidelinesOptions,
  buildFormattingPrompt,
  type FormattingPromptOptions,
  type CitationMode
};

export type SectionConfig<T> = T & { enabled?: boolean };

export interface ComposeAgentSystemPromptOptions {
  /**
   * Toggle all core prompts on or off. Defaults to true.
   */
  includeCorePrompts?: boolean;
  /**
   * Configuration for the system information section.
   */
  systemInformation?: SectionConfig<SystemInformationPromptOptions>;
  /**
   * Configuration for the interaction guideline section.
   */
  interaction?: SectionConfig<InteractionGuidelinesOptions>;
  /**
   * Configuration for formatting rules.
   */
  formatting?: SectionConfig<FormattingPromptOptions>;
  /**
   * Extra sections to insert before the agent-specific prompt.
   */
  extraSections?: Array<string | null | undefined | false>;
  /** Optional ISO timestamp/timezone applied to system context. */
  nowIso?: string;
  timezone?: string;
}

/**
 * Legacy prompt composition - maintained for backward compatibility.
 * New code should use the simplified composePrompt() instead.
 */
export function composeAgentSystemPrompt(
  agentPrompt?: string | null,
  options: ComposeAgentSystemPromptOptions = {}
): string {
  const {
    includeCorePrompts = true,
    systemInformation,
    interaction,
    formatting,
    extraSections = [],
    nowIso,
    timezone
  } = options;

  // Use new system if possible
  if (!systemInformation && !interaction && !formatting) {
    return composePrompt(agentPrompt || undefined, {
      skipCore: !includeCorePrompts,
      nowIso,
      timezone,
      specialization: extraSections
        ?.filter(s => typeof s === "string")
        .join("\n\n")
    });
  }

  // Fall back to legacy system for complex configurations
  const sections: string[] = [];

  if (includeCorePrompts) {
    const { enabled: systemEnabled, ...systemOpts } = systemInformation || {};
    if (systemEnabled !== false) {
      sections.push(
        buildSystemInformationPrompt({ ...systemOpts, nowIso, timezone })
      );
    }

    const { enabled: interactionEnabled, ...interactionOpts } =
      interaction || {};
    if (interactionEnabled !== false) {
      sections.push(buildInteractionGuidelinesPrompt(interactionOpts));
    }

    const { enabled: formattingEnabled, ...formattingOpts } = formatting || {};
    if (formattingEnabled !== false) {
      sections.push(buildFormattingPrompt(formattingOpts));
    }
  }

  extraSections.forEach(section => {
    if (typeof section === "string" && section.trim().length > 0) {
      sections.push(section.trim());
    }
  });

  if (agentPrompt && agentPrompt.trim().length > 0) {
    sections.push(
      `<AgentDirectives>\n${agentPrompt.trim()}\n</AgentDirectives>`
    );
  }

  const composed = sections
    .filter(section => section && section.trim().length > 0)
    .join("\n\n");

  return `<SystemInstructions>\n${composed}\n</SystemInstructions>`;
}
