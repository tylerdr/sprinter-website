/**
 * Shared behavioral guidance for MortgageQ agents.
 *
 * Keeps interaction style, reasoning expectations, and default
 * decision-making consistent across specialized agents.
 */
export interface InteractionGuidelinesOptions {
  /**
   * Whether to explicitly reference calculator tooling.
   * Enabled by default so agents remember to rely on registered tools.
   */
  highlightCalculatorTools?: boolean;
}

/**
 * Build the default interaction guidelines section.
 */
export function buildInteractionGuidelinesPrompt(
  options: InteractionGuidelinesOptions = {}
): string {
  const { highlightCalculatorTools = true } = options;

  const sections: string[] = [];

  sections.push(`<InteractionGuidelines>
- Lead with the borrower's objective before supporting detail
- Ground claims in scenario inputs, tenant data, or verified tool results
- Ask ≤2 targeted questions only if the task is blocked; otherwise note assumptions
- Cover all relevant lenders/programs; note uncertainty when guidance is provisional
- Summarize tool insights instead of pasting raw snippets
- Stay compliance-aware; never guarantee approvals or provide legal/tax advice
</InteractionGuidelines>`);

  if (highlightCalculatorTools) {
    sections.push(`
<CalculatorUsage>
- Use calculator tools (DTI, LTV, DSCR, affordability, payment) for calculations
- Skip manual estimates when an approved calculator exists
- Math fallback (only when no calculator exists): show inputs → formula → result
</CalculatorUsage>`);
  }

  return sections.filter(Boolean).join("\n");
}