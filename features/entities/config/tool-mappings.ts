/**
 * Tool-Entity Mapping Configuration
 * Defines how each tool interacts with entities following AI Sprinter pattern
 */

import type { ToolEntityMapping } from "../registry";

// ============================================
// TOOL CONFIGURATION TYPES
// ============================================

export interface ToolEntityConfig {
  requiresWorkspace: boolean;
  workspaceType: string;
  entityTypes: string[];
  reads: string[];
  writes: string[];
  required: string[];
  artifacts?: string[];
  autoCreate?: boolean;
  validateSchema?: boolean;
}

// ============================================
// TOOL-ENTITY MAPPINGS
// ============================================

export const TOOL_ENTITY_MAPPINGS: Record<string, ToolEntityConfig> = {
  // ============================================
  // SEARCH TOOLS
  // ============================================

  'marketplace-search': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['borrower', 'property', 'loan'],
    writes: ['eligibleLenders', 'missedLenders', 'lastSearch', 'calculations'],
    required: ['borrower.fico', 'property.value', 'loan.amount'],
    artifacts: ['analysis.eligibility_report'],
    autoCreate: true,
    validateSchema: true,
  },

  'unified-search': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['borrower', 'property', 'loan'],
    writes: ['eligibleLenders', 'missedLenders', 'lastSearch'],
    required: ['borrower.fico', 'property.state', 'loan.amount'],
    artifacts: ['analysis.eligibility_report'],
    autoCreate: true,
    validateSchema: true,
  },

  'single-lender-search': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['borrower', 'property', 'loan'],
    writes: ['eligiblePrograms', 'lastSearch'],
    required: ['borrower.fico', 'loan.loanType'],
    artifacts: ['analysis.lender_result'],
    autoCreate: true,
    validateSchema: true,
  },

  // ============================================
  // CALCULATOR TOOLS
  // ============================================

  'dti-calculator': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['borrower.income', 'borrower.monthlyDebts', 'loan.amount'],
    writes: ['borrower.dti', 'calculations.dti', 'calculations.frontEndRatio', 'calculations.backEndRatio'],
    required: ['borrower.income.gross_monthly'],
    autoCreate: true,
    validateSchema: true,
  },

  'ltv-calculator': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['property.value', 'loan.amount'],
    writes: ['loan.ltv', 'calculations.ltv', 'calculations.cltv'],
    required: ['property.value', 'loan.amount'],
    autoCreate: true,
    validateSchema: true,
  },

  'payment-calculator': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['loan.amount', 'loan.term', 'loan.requestedRate', 'property.value'],
    writes: [
      'calculations.monthlyPayment',
      'calculations.principalAndInterest',
      'calculations.propertyTax',
      'calculations.homeInsurance',
      'calculations.pmi',
      'calculations.totalMonthlyPayment'
    ],
    required: ['loan.amount'],
    autoCreate: true,
    validateSchema: true,
  },

  'closing-cost-estimator': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['loan.amount', 'property.value', 'property.state', 'loan.loanType'],
    writes: ['loan.closingCosts', 'calculations.closingCosts', 'calculations.cashToClose'],
    required: ['loan.amount', 'property.value'],
    autoCreate: true,
    validateSchema: true,
  },

  'affordability-calculator': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['borrower.income', 'borrower.monthlyDebts', 'borrower.assets', 'property.state'],
    writes: [
      'calculations.maxLoanAmount',
      'calculations.maxPurchasePrice',
      'calculations.requiredIncome'
    ],
    required: ['borrower.income.gross_monthly'],
    autoCreate: true,
    validateSchema: true,
  },

  'refinance-calculator': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['loan.existingLoan', 'property.value', 'loan.amount', 'loan.requestedRate'],
    writes: [
      'calculations.monthlyPayment',
      'calculations.monthlySavings',
      'calculations.breakEvenMonths',
      'calculations.lifetimeSavings'
    ],
    required: ['loan.existingLoan.balance', 'loan.existingLoan.rate'],
    artifacts: ['analysis.refinance_analysis'],
    autoCreate: true,
    validateSchema: true,
  },

  'points-calculator': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['loan.amount', 'loan.requestedRate', 'loan.term'],
    writes: ['calculations.pointsCost', 'calculations.breakEvenMonths'],
    required: ['loan.amount'],
    autoCreate: true,
    validateSchema: true,
  },

  // ============================================
  // QUALIFICATION TOOLS
  // ============================================

  'pre-qualification': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['borrower', 'property.state', 'loan.loanType'],
    writes: [
      'borrower.preQualified',
      'calculations.maxLoanAmount',
      'calculations.estimatedRate',
      'status'
    ],
    required: ['borrower.income.gross_monthly', 'borrower.fico'],
    artifacts: ['analysis.prequalification_letter'],
    autoCreate: true,
    validateSchema: true,
  },

  'credit-analyzer': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['borrower.fico', 'borrower.creditHistory'],
    writes: [
      'borrower.creditProfile',
      'borrower.creditRecommendations',
      'calculations.creditImpact'
    ],
    required: ['borrower.fico'],
    artifacts: ['analysis.credit_report'],
    autoCreate: true,
    validateSchema: true,
  },

  'income-analyzer': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['borrower.income', 'borrower.employmentStatus', 'borrower.employmentYears'],
    writes: [
      'borrower.qualifiedIncome',
      'borrower.incomeStability',
      'calculations.usableIncome'
    ],
    required: ['borrower.income.gross_monthly'],
    artifacts: ['analysis.income_verification'],
    autoCreate: true,
    validateSchema: true,
  },

  // ============================================
  // ANALYSIS TOOLS
  // ============================================

  'scenario-comparison': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['*'], // Reads all fields
    writes: ['comparison', 'recommendations'],
    required: [],
    artifacts: ['analysis.scenario_comparison'],
    autoCreate: false,
    validateSchema: true,
  },

  'rate-monitor': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: ['loan', 'property', 'borrower.fico'],
    writes: ['rateHistory', 'rateAlerts'],
    required: ['loan.amount'],
    artifacts: ['analysis.rate_tracking'],
    autoCreate: false,
    validateSchema: true,
  },

  // ============================================
  // DOCUMENT TOOLS
  // ============================================

  'document-analyzer': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario', 'analysis.document'],
    reads: [],
    writes: ['documents', 'extractedData'],
    required: [],
    artifacts: ['analysis.document'],
    autoCreate: true,
    validateSchema: false,
  },

  'bank-statement-analyzer': {
    requiresWorkspace: true,
    workspaceType: 'loan.scenario',
    entityTypes: ['loan.scenario'],
    reads: [],
    writes: [
      'borrower.assets.liquid',
      'borrower.income.verified',
      'borrower.cashFlow'
    ],
    required: [],
    artifacts: ['analysis.bank_statement'],
    autoCreate: true,
    validateSchema: true,
  },

  // ============================================
  // GENERAL TOOLS (No Workspace Required)
  // ============================================

  'web-search': {
    requiresWorkspace: false,
    workspaceType: '',
    entityTypes: [],
    reads: [],
    writes: [],
    required: [],
    autoCreate: false,
    validateSchema: false,
  },

  'delegate-agent': {
    requiresWorkspace: false,
    workspaceType: '',
    entityTypes: [],
    reads: [],
    writes: [],
    required: [],
    autoCreate: false,
    validateSchema: false,
  },

  'retrieve-documents': {
    requiresWorkspace: false,
    workspaceType: '',
    entityTypes: [],
    reads: [],
    writes: [],
    required: [],
    autoCreate: false,
    validateSchema: false,
  },

  // ============================================
  // CRM/LEAD TOOLS
  // ============================================

  'lead-capture': {
    requiresWorkspace: true,
    workspaceType: 'lead.contact',
    entityTypes: ['lead.contact'],
    reads: [],
    writes: ['firstName', 'lastName', 'email', 'phone', 'source', 'capturedAt'],
    required: [],
    autoCreate: true,
    validateSchema: true,
  },

  'lead-qualifier': {
    requiresWorkspace: true,
    workspaceType: 'lead.contact',
    entityTypes: ['lead.contact'],
    reads: ['*'],
    writes: ['qualification', 'score', 'notes', 'nextAction'],
    required: ['email'],
    autoCreate: false,
    validateSchema: true,
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if a tool requires a workspace
 */
export function toolNeedsWorkspace(toolSlug: string): boolean {
  const config = TOOL_ENTITY_MAPPINGS[toolSlug];
  return config?.requiresWorkspace ?? false;
}

/**
 * Get workspace type for a tool
 */
export function getToolWorkspaceType(toolSlug: string): string | null {
  const config = TOOL_ENTITY_MAPPINGS[toolSlug];
  return config?.workspaceType || null;
}

/**
 * Get entity types a tool can work with
 */
export function getToolEntityTypes(toolSlug: string): string[] {
  const config = TOOL_ENTITY_MAPPINGS[toolSlug];
  return config?.entityTypes || [];
}

/**
 * Check if tool should auto-create entities
 */
export function toolAutoCreatesEntity(toolSlug: string): boolean {
  const config = TOOL_ENTITY_MAPPINGS[toolSlug];
  return config?.autoCreate ?? false;
}

/**
 * Get required fields for a tool
 */
export function getToolRequiredFields(toolSlug: string): string[] {
  const config = TOOL_ENTITY_MAPPINGS[toolSlug];
  return config?.required || [];
}

/**
 * Get artifacts a tool produces
 */
export function getToolArtifacts(toolSlug: string): string[] {
  const config = TOOL_ENTITY_MAPPINGS[toolSlug];
  return config?.artifacts || [];
}

/**
 * Convert tool config to entity registry format
 */
export function toolConfigToEntityMapping(toolSlug: string): ToolEntityMapping[] {
  const config = TOOL_ENTITY_MAPPINGS[toolSlug];
  if (!config) return [];

  return config.entityTypes.map(entitySlug => ({
    toolSlug,
    entitySlug,
    reads: config.reads,
    writes: config.writes,
    required: config.required,
  }));
}

// ============================================
// DEFAULT EXPORT
// ============================================

export default TOOL_ENTITY_MAPPINGS;