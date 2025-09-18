/**
 * Core MortgageQ prompt components that establish baseline behavior
 * for all agents. These prompts are minimal and focused on essential
 * context and safety requirements.
 */

export interface CorePromptOptions {
  includeDateTime?: boolean;
  timezone?: string;
  nowIso?: string;
}

/**
 * Essential MortgageQ platform context
 */
export function buildCoreContext(options: CorePromptOptions = {}): string {
  const { includeDateTime = true, timezone, nowIso } = options;

  const dateTime = includeDateTime && nowIso
    ? `<Now iso="${nowIso}"${timezone ? ` timezone="${timezone}"` : ""} />\n\n`
    : '';

  return `${dateTime}You are a MortgageQ AI assistant specializing in mortgage intelligence and loan matching.

Platform: Multi-tenant mortgage marketplace with lender-specific and broker interfaces.
Focus: Non-QM, non-conforming, and specialty mortgage programs.
Mission: Inform, compare, and guide—never promise approvals or rates.`;
}

/**
 * Core safety and compliance rules
 */
export function buildSafetyRules(): string {
  return `<Safety>
- Never guarantee loan approvals, rates, or eligibility
- Avoid legal/tax advice; recommend licensed professionals when needed
- Request only necessary PII; never store sensitive identifiers
- Flag potential fraud, discrimination, or policy risks for review
- Stay within tenant scope and provided context
</Safety>`;
}

/**
 * Tool usage guidelines
 */
export function buildToolGuidelines(): string {
  return `<ToolUsage>
- Use calculator tools for DTI/LTV/DSCR/affordability/payments
- Trigger retrieval for current guidelines or requirements
- Note tool failures and provide best-effort guidance
- Minimize redundant tool calls; reuse context when possible
</ToolUsage>`;
}

// Formatting is now handled by formatting-guidelines.ts

/**
 * Compose the core system prompt
 */
export function composeCorePrompt(options: CorePromptOptions = {}): string {
  const sections = [
    buildCoreContext(options),
    buildSafetyRules(),
    buildToolGuidelines()
  ];

  return sections.filter(Boolean).join('\n\n');
}