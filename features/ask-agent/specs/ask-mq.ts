/**
 * Ask mQ Agent Specification
 * Intelligent form-filling assistant for MortgageQ tools
 */

import { z } from 'zod';

// ============================================
// AGENT SPECIFICATION
// ============================================

export const ASK_MQ_AGENT_SPEC = {
  slug: 'ask-agent',
  name: 'Ask mQ',
  description: 'Intelligent form-filling assistant that helps users populate tool forms using natural language',

  systemInstructions: `You are Ask mQ, an intelligent form-filling assistant for MortgageQ.

Your PRIMARY responsibility is to help users fill out tool forms based on their natural language input.

CRITICAL RULES:
1. You can ONLY populate form fields - never execute tools directly
2. Always extract structured data from user's natural language
3. Ask clarifying questions when values are ambiguous or missing
4. Provide helpful context about what each field means
5. Be conversational but concise - users want quick help
6. Once the form is complete, tell the user to click "Run Tool"

INTERACTION PATTERN:
1. User provides information in natural language
2. You extract relevant values for the current tool's form
3. You update form fields incrementally as you gather information
4. You ask for missing required fields
5. You confirm values if they seem unusual
6. You indicate when the form is ready to run

DATA EXTRACTION:
- Convert natural language to structured data matching the tool's schema
- Handle various formats (e.g., "120k" → 120000, "excellent credit" → 750)
- Infer related values when possible (e.g., loan amount from purchase price and down payment)
- Validate values against the tool's input schema

FIELD MAPPING EXAMPLES:
- "I make 120k a year" → income.gross_monthly: 10000
- "My credit is excellent" → borrower.fico: 750-800
- "Looking at a 500k house" → property.value: 500000
- "I have 20% down" → loan.downPaymentPercent: 20
- "VA loan" → loan.loanType: "va"

RESPONSE FORMAT:
- Use the updateForm tool to populate fields
- Stream updates as data-entity_update parts
- Provide clear feedback about what was updated
- Ask for specific missing information`,

  model: 'gpt-4o-mini',

  settings: {
    temperature: 0.3,
    maxTokens: 500,
    streaming: true,
  },

  // Dynamic tool allowlist (set based on current tool)
  toolAllowList: ['updateForm'],

  // Context policy
  contextPolicy: {
    includeWorkspace: true,
    includeFormSchema: true,
    includeCurrentValues: true,
    includeTenantContext: false,
  },

  // Loop policy
  loopPolicy: {
    maxSteps: 10,
    maxDuration: 30000,
    autoExecute: false,
    requireUserConfirmation: false,
  },

  // Capabilities
  capabilities: {
    formFilling: true,
    dataExtraction: true,
    validation: true,
    clarification: true,
    inference: true,
  },
};

// ============================================
// FORM UPDATE SCHEMA
// ============================================

export const FormUpdateSchema = z.object({
  updates: z.record(z.string(), z.any()).describe('Field updates to apply to the form'),
  message: z.string().optional().describe('Optional message to user about the updates'),
  questions: z.array(z.string()).optional().describe('Questions to ask for missing information'),
  confidence: z.number().min(0).max(1).optional().describe('Confidence in the extracted values'),
});

// ============================================
// VALUE EXTRACTION PATTERNS
// ============================================

export const VALUE_PATTERNS = {
  // Income patterns
  income: {
    yearly: /(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:k|K|thousand|mil|M|million)?\s*(?:per\s+)?(?:year|yearly|annual)/,
    monthly: /(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:per\s+)?(?:month|monthly)/,
    biweekly: /(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:per\s+)?(?:bi-?weekly|every\s+two\s+weeks)/,
  },

  // Credit score patterns
  credit: {
    exact: /(?:credit|fico|score).*?(\d{3})/i,
    range: /(?:credit|fico).*?(\d{3})\s*-\s*(\d{3})/i,
    description: {
      excellent: [750, 850],
      good: [700, 749],
      fair: [650, 699],
      poor: [300, 649],
    },
  },

  // Property value patterns
  property: {
    value: /(?:house|home|property|purchase).*?(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:k|K|thousand|mil|M|million)?/,
    downPayment: /(\d+(?:\.\d+)?)\s*%?\s*down/,
  },

  // Loan type patterns
  loanType: {
    conventional: /conventional|conforming/i,
    fha: /fha/i,
    va: /va|veteran/i,
    usda: /usda|rural/i,
    jumbo: /jumbo|non-conforming/i,
    nonQm: /non-qm|non\s+qm|bank\s+statement/i,
  },
};

// ============================================
// EXTRACTION HELPERS
// ============================================

/**
 * Extract income from text
 */
export function extractIncome(text: string): number | null {
  // Try yearly income
  const yearlyMatch = text.match(VALUE_PATTERNS.income.yearly);
  if (yearlyMatch) {
    let value = parseFloat(yearlyMatch[1].replace(/,/g, ''));
    if (text.includes('k') || text.includes('K')) value *= 1000;
    if (text.includes('mil') || text.includes('M')) value *= 1000000;
    return Math.round(value / 12); // Convert to monthly
  }

  // Try monthly income
  const monthlyMatch = text.match(VALUE_PATTERNS.income.monthly);
  if (monthlyMatch) {
    return parseFloat(monthlyMatch[1].replace(/,/g, ''));
  }

  // Try biweekly income
  const biweeklyMatch = text.match(VALUE_PATTERNS.income.biweekly);
  if (biweeklyMatch) {
    const biweekly = parseFloat(biweeklyMatch[1].replace(/,/g, ''));
    return Math.round(biweekly * 26 / 12); // Convert to monthly
  }

  return null;
}

/**
 * Extract credit score from text
 */
export function extractCreditScore(text: string): number | null {
  // Try exact score
  const exactMatch = text.match(VALUE_PATTERNS.credit.exact);
  if (exactMatch) {
    return parseInt(exactMatch[1]);
  }

  // Try range
  const rangeMatch = text.match(VALUE_PATTERNS.credit.range);
  if (rangeMatch) {
    const low = parseInt(rangeMatch[1]);
    const high = parseInt(rangeMatch[2]);
    return Math.round((low + high) / 2);
  }

  // Try description
  const lowerText = text.toLowerCase();
  for (const [desc, [min, max]] of Object.entries(VALUE_PATTERNS.credit.description)) {
    if (lowerText.includes(desc)) {
      return Math.round((min + max) / 2);
    }
  }

  return null;
}

/**
 * Extract property value from text
 */
export function extractPropertyValue(text: string): number | null {
  const match = text.match(VALUE_PATTERNS.property.value);
  if (match) {
    let value = parseFloat(match[1].replace(/,/g, ''));
    if (text.includes('k') || text.includes('K')) value *= 1000;
    if (text.includes('mil') || text.includes('M')) value *= 1000000;
    return value;
  }
  return null;
}

/**
 * Extract down payment percentage from text
 */
export function extractDownPayment(text: string): number | null {
  const match = text.match(VALUE_PATTERNS.property.downPayment);
  if (match) {
    return parseFloat(match[1]);
  }
  return null;
}

/**
 * Extract loan type from text
 */
export function extractLoanType(text: string): string | null {
  for (const [type, pattern] of Object.entries(VALUE_PATTERNS.loanType)) {
    if (pattern.test(text)) {
      return type;
    }
  }
  return null;
}

// ============================================
// PROMPT TEMPLATES
// ============================================

export const PROMPTS = {
  greeting: (toolName: string) =>
    `I'm Ask mQ! Tell me about your mortgage scenario, and I'll help fill out the ${toolName} form for you.

    For example, you could say:
    • "I make $120k a year with $2500 in monthly debts"
    • "Looking at a $500k house with 20% down"
    • "My credit score is 750"

    What information would you like to provide?`,

  clarification: (field: string) =>
    `I need a bit more information about ${field}. Could you provide that?`,

  confirmation: (field: string, value: any) =>
    `Just to confirm, I'm setting ${field} to ${value}. Is that correct?`,

  complete: () =>
    `Great! I've filled out all the available fields based on your information.

    Click "Run Tool" when you're ready to execute, or tell me if you'd like to adjust anything.`,

  missing: (fields: string[]) =>
    `I still need the following information to complete the form:
    ${fields.map(f => `• ${f}`).join('\n')}

    Could you provide these details?`,
};

// ============================================
// EXPORTS
// ============================================

export default ASK_MQ_AGENT_SPEC;