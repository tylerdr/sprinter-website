/**
 * Formatting guidance shared across MortgageQ agents.
 */
export type CitationMode = "required" | "available" | "none";

export interface FormattingPromptOptions {
  /**
   * Whether to instruct agents to lead with a bold blockquote summary.
   * Defaults to true because most UX flows expect an immediate answer.
   */
  leadWithAnswer?: boolean;
  /**
   * Whether to call out table usage as preferred for comparisons.
   */
  includeTables?: boolean;
  /**
   * How strictly the agent should apply citations.
   */
  citationMode?: CitationMode;
  /**
   * Whether to include internal link formatting instructions.
   */
  includeLinks?: boolean;
  /**
   * Suggested response length.
   */
  lengthGuidance?: string;
  showDateStamp?: boolean;
  /**
   * Whether to include detailed list formatting rules.
   */
  includeListFormatting?: boolean;
}

const DEFAULT_LENGTH = "120-180 tokens";

/**
 * Build formatting instructions that keep responses consistent.
 */
export function buildFormattingPrompt(
  options: FormattingPromptOptions = {}
): string {
  const {
    leadWithAnswer = true,
    includeTables = true,
    citationMode = "available",
    includeLinks = true,
    lengthGuidance = DEFAULT_LENGTH,
    showDateStamp = true,
    includeListFormatting = true
  } = options;

  const sections: string[] = [];

  // Base markdown rules
  sections.push(`<MarkdownRules>
- Use GitHub Flavored Markdown (GFM) for all formatting
- Use proper heading hierarchy (##, ###, ####) for sections and subsections
- Bold important terms using **text** syntax
- Use inline code backticks for specific values, thresholds, or technical terms: \`680\`, \`DTI\`, \`LTV\`
- Use code blocks with language hints for calculations or code snippets
</MarkdownRules>`);

  // List formatting
  if (includeListFormatting) {
    sections.push(`
<ListFormatting>
- Use numbered lists (1., 2., 3.) for sequential steps or ranked items
- Use bullet points (-, *, •) for unordered items
- For nested lists, indent sub-items properly:
  - Use 2 spaces or a tab for each level of nesting
  - Maintain consistent spacing between list items
  - Nested bullet points under numbered items should be indented
</ListFormatting>`);
  }

  // Lead with answer
  if (leadWithAnswer) {
    sections.push(`
<LeadWithAnswer>
Start with a bold blockquote (> **text**) summarizing the primary answer
</LeadWithAnswer>`);
  }

  // Date stamp
  if (showDateStamp) {
    sections.push(`
<DateStamp>
When <Now> is provided, add 'As of YYYY-MM-DD' after the summary
</DateStamp>`);
  }

  // Content organization
  sections.push(`
<ContentOrganization>
- Use clear section headings with appropriate hierarchy
- Group related information under appropriate headings
- Use horizontal rules (---) to separate major sections when needed
</ContentOrganization>`);

  // Tables
  if (includeTables) {
    sections.push(`
<TableFormatting>
- Use tables for comparing multiple items (lenders, programs, rates)
- Include proper headers with alignment indicators
- Example table format:
  \`\`\`markdown
  | Lender | Rate | LTV | Min FICO |
  |--------|------|-----|----------|
  | ABC    | 6.5% | 80% | 680      |
  \`\`\`
</TableFormatting>`);
  }

  // Blockquotes
  sections.push(`
<BlockquoteRules>
- Use > for important notes or summaries
- Use >> for nested quotes if needed
- Don't use italic formatting in blockquotes
</BlockquoteRules>`);

  // Links
  if (includeLinks) {
    sections.push(`
<LinkFormatting>
- Format: [descriptive text](url)
- Use relative links for internal navigation: [View Lender](/lenders/123)
- Never expose raw URLs in the text
</LinkFormatting>`);
  }

  // Citations
  if (citationMode !== "none") {
    sections.push(`
<CitationInstructions>
When citing information from tool results that include sources:
- Use inline citations in the format [1], [2], [3], etc.
- Number citations sequentially based on the order sources appear in the tool results
- Place citations immediately after the relevant information
- If at end of statement, add the citation after the period
- Each unique source should have its own number
- If referencing the same source multiple times, reuse the same number
Example: "The interest rate is 5.5% [1] and requires a minimum credit score of 680.[2]"
</CitationInstructions>`);
  }

  // Response length
  sections.push(`
<ResponseLength>
Target ${lengthGuidance} unless more detail is requested
</ResponseLength>`);

  // Best practices
  sections.push(`
<BestPractices>
- Keep paragraphs concise (2-3 sentences max)
- Use line breaks between sections for readability
- Avoid excessive nesting (max 2-3 levels)
- End with actionable next steps or follow-up questions, keep the user engaged
- Avoid LaTeX unless specifically for mathematical formulas
</BestPractices>`);

  return [
    "<FormattingGuidelines>",
    "Follow these markdown formatting guidelines for clear, well-structured responses:",
    ...sections,
    "</FormattingGuidelines>"
  ]
    .filter(Boolean)
    .join("\n");
}
