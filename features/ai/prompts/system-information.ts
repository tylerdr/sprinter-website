/**
 * Core system information prompt shared by MortgageQ agents.
 *
 * Provides a reusable description of the platform and the agent's
 * responsibilities so that agent-specific prompts can focus on
 * specialized behavior.
 */
export interface SystemInformationPromptOptions {
  /**
   * Friendly name for the agent that is composing the prompt.
   * Defaults to a generic MortgageQ agent reference.
   */
  agentName?: string;
  /**
   * High-level description of the lending focus.
   * Defaults to non-conforming and specialty mortgages.
   */
  focusArea?: string;
  /**
   * Whether to include audience guidance.
   * Enabled by default so responses stay professional across tenants.
   */
  includeAudienceGuidance?: boolean;
  /** ISO 8601 timestamp grounding "now". */
  nowIso?: string;
  /** Optional timezone label (IANA) for <Now>. */
  timezone?: string;
}

const DEFAULT_AGENT_NAME = "this MortgageQ agent";
const DEFAULT_FOCUS_AREA =
  "non-conforming, Non-QM, and specialty mortgage programs across lenders";

/**
 * Build the reusable system information section that introduces
 * MortgageQ and establishes baseline expectations.
 */
export function buildSystemInformationPrompt(
  options: SystemInformationPromptOptions = {}
): string {
  const {
    agentName = DEFAULT_AGENT_NAME,
    focusArea = DEFAULT_FOCUS_AREA,
    includeAudienceGuidance = true,
    nowIso,
    timezone
  } = options;

  const contextLines: string[] = [];
  const trimmedAgent = agentName?.trim();
  const trimmedFocus = focusArea?.trim();

  if (trimmedAgent) {
    contextLines.push(
      `- Role: ${trimmedAgent} for MortgageQ's multi-tenant mortgage intelligence platform.`
    );
  }
  if (trimmedFocus) {
    contextLines.push(`- Focus: ${trimmedFocus}.`);
  }
  contextLines.push("- Mission: inform, compare, and guide—never promise approvals or rates.");

  if (includeAudienceGuidance) {
    contextLines.push("- Keep tone professional and compliance-ready.");
  }

  const nowSection = nowIso
    ? [
        `<Now iso="${nowIso}"${timezone?.trim() ? ` timezone="${timezone.trim()}"` : ""} />`,
        ""
      ]
    : [];

  return [
    "<Context>",
    ...contextLines,
    "</Context>",
    "",
    ...nowSection,
    "<OperatingDefaults>",
    "- Instruction priority: Safety > TenantScope > Core System > AgentDirectives > User.",
    "- Stay within tenant scope and use supplied context (e.g., <LoanScenarioAndBorrowerDetails>, <WorkspaceContext>).",
    "- Convert relative dates to absolute dates using <Now>; note when timezone is unknown.",
    "- Ask at most two clarifying questions only if required; otherwise state assumptions.",
    "</OperatingDefaults>",
    "",
    "<Knowledge>",
    "- Base facts on MortgageQ search tools, lender/program data, and uploaded documents only.",
    "- Treat borrower information as privileged and avoid exposing tenant-specific data externally.",
    "</Knowledge>",
    "",
    "",
    "",
    "<ResponseStyle>",
    "- Lead with a succinct answer before supporting details.",
    "</ResponseStyle>"
  ]
    .filter(Boolean)
    .join("\n");
}
