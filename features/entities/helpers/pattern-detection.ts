/**
 * Pattern Detection for Tool Results
 * Automatically detects and extracts entity updates and artifacts from tool execution results
 */

import { normalizeTypeSlug, getNestedValue } from "../compat";
import type { EntityPatch } from "../server/actions";

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface DetectedUpdate {
  patch: EntityPatch;
  confidence: number;
  source: string;
}

export interface DetectedArtifact {
  typeSlug: string;
  title: string;
  data: Record<string, any>;
  confidence: number;
}

export interface DetectionResult {
  updates: DetectedUpdate | null;
  artifacts: DetectedArtifact[];
}

// ============================================
// PATTERN DEFINITIONS
// ============================================

/**
 * Pattern matchers for common tool result structures
 */
const UPDATE_PATTERNS = {
  // Lender search patterns
  lenderSearchResults: {
    matches: (result: any) =>
      'eligible_lenders' in result || 'missed_lenders' in result,
    extract: (result: any) => ({
      eligibleLenders: result.eligible_lenders || [],
      missedLenders: result.missed_lenders || [],
      lastSearch: {
        timestamp: new Date().toISOString(),
        resultCount: {
          eligible: result.eligible_lenders?.length || 0,
          missed: result.missed_lenders?.length || 0,
          total: (result.eligible_lenders?.length || 0) + (result.missed_lenders?.length || 0),
        },
      },
    }),
  },

  // Calculator patterns
  dtiCalculation: {
    matches: (result: any) =>
      'dti' in result || 'dtiRatio' in result || 'debt_to_income' in result,
    extract: (result: any) => ({
      borrower: {
        dti: result.dti || result.dtiRatio || result.debt_to_income,
      },
      calculations: {
        dti: result.dti || result.dtiRatio || result.debt_to_income,
        frontEndRatio: result.frontEndRatio || result.front_end_ratio,
        backEndRatio: result.backEndRatio || result.back_end_ratio,
      },
    }),
  },

  ltvCalculation: {
    matches: (result: any) =>
      'ltv' in result || 'ltvRatio' in result || 'loan_to_value' in result,
    extract: (result: any) => ({
      loan: {
        ltv: result.ltv || result.ltvRatio || result.loan_to_value,
      },
      calculations: {
        ltv: result.ltv || result.ltvRatio || result.loan_to_value,
        cltv: result.cltv || result.combined_ltv,
      },
    }),
  },

  paymentCalculation: {
    matches: (result: any) =>
      'monthlyPayment' in result || 'monthly_payment' in result || 'payment' in result,
    extract: (result: any) => ({
      calculations: {
        monthlyPayment: result.monthlyPayment || result.monthly_payment || result.payment,
        principalAndInterest: result.principalAndInterest || result.principal_and_interest || result.pi,
        propertyTax: result.propertyTax || result.property_tax || result.tax,
        homeInsurance: result.homeInsurance || result.home_insurance || result.insurance,
        pmi: result.pmi || result.mortgage_insurance,
        hoaFees: result.hoaFees || result.hoa_fees || result.hoa,
        totalMonthlyPayment: result.totalMonthlyPayment || result.total_monthly_payment || result.total,
      },
    }),
  },

  closingCosts: {
    matches: (result: any) =>
      'closingCosts' in result || 'closing_costs' in result,
    extract: (result: any) => ({
      loan: {
        closingCosts: result.closingCosts || result.closing_costs,
      },
      calculations: {
        closingCosts: result.closingCosts || result.closing_costs,
        cashToClose: result.cashToClose || result.cash_to_close,
        totalFees: result.totalFees || result.total_fees,
      },
    }),
  },

  affordability: {
    matches: (result: any) =>
      'maxLoanAmount' in result || 'max_loan_amount' in result || 'affordability' in result,
    extract: (result: any) => ({
      calculations: {
        maxLoanAmount: result.maxLoanAmount || result.max_loan_amount,
        maxPurchasePrice: result.maxPurchasePrice || result.max_purchase_price,
        requiredIncome: result.requiredIncome || result.required_income,
        affordabilityRatio: result.affordabilityRatio || result.affordability_ratio,
      },
    }),
  },

  prequalification: {
    matches: (result: any) =>
      'preQualified' in result || 'pre_qualified' in result || 'qualification' in result,
    extract: (result: any) => ({
      borrower: {
        preQualified: result.preQualified || result.pre_qualified || result.qualified,
        qualificationDate: new Date().toISOString(),
      },
      status: result.qualified ? 'pre_qualified' : 'analyzing',
      calculations: {
        maxLoanAmount: result.maxLoanAmount || result.max_loan_amount,
        estimatedRate: result.estimatedRate || result.estimated_rate,
      },
    }),
  },

  creditAnalysis: {
    matches: (result: any) =>
      'creditProfile' in result || 'credit_profile' in result || 'creditScore' in result,
    extract: (result: any) => ({
      borrower: {
        fico: result.creditScore || result.credit_score || result.fico,
        creditProfile: result.creditProfile || result.credit_profile,
        creditRecommendations: result.recommendations || result.credit_recommendations,
      },
      calculations: {
        creditImpact: result.creditImpact || result.credit_impact,
        scoreImprovement: result.scoreImprovement || result.score_improvement,
      },
    }),
  },

  incomeAnalysis: {
    matches: (result: any) =>
      'qualifiedIncome' in result || 'qualified_income' in result || 'usableIncome' in result,
    extract: (result: any) => ({
      borrower: {
        income: {
          qualified: result.qualifiedIncome || result.qualified_income,
          usable: result.usableIncome || result.usable_income,
          stability: result.incomeStability || result.income_stability,
        },
      },
      calculations: {
        usableIncome: result.usableIncome || result.usable_income,
        incomeMultiplier: result.incomeMultiplier || result.income_multiplier,
      },
    }),
  },
};

/**
 * Artifact detection patterns
 */
const ARTIFACT_PATTERNS = {
  eligibilityReport: {
    matches: (result: any) =>
      (result.eligible_lenders && result.eligible_lenders.length > 0) ||
      (result.missed_lenders && result.missed_lenders.length > 0),
    extract: (result: any) => ({
      typeSlug: 'analysis.eligibility_report',
      title: `Eligibility Report - ${new Date().toLocaleDateString()}`,
      data: {
        reportId: `ER-${Date.now()}`,
        generatedAt: new Date().toISOString(),
        summary: {
          totalLenders: (result.eligible_lenders?.length || 0) + (result.missed_lenders?.length || 0),
          eligibleCount: result.eligible_lenders?.length || 0,
          missedCount: result.missed_lenders?.length || 0,
        },
        eligible: result.eligible_lenders || [],
        missed: result.missed_lenders || [],
        criteria: result.search_criteria || result.criteria || {},
      },
    }),
  },

  lenderResult: {
    matches: (result: any) =>
      result.lender_details && Array.isArray(result.lender_details),
    extract: (result: any) =>
      result.lender_details.map((lender: any) => ({
        typeSlug: 'analysis.lender_result',
        title: lender.name || lender.lenderName,
        data: {
          lenderId: lender.id || lender.lenderId,
          lenderName: lender.name || lender.lenderName,
          eligible: lender.eligible !== false,
          programs: lender.programs || [],
          reasons: lender.reasons || [],
          contactInfo: lender.contact || lender.contactInfo || {},
        },
      })),
  },

  pricingSheet: {
    matches: (result: any) =>
      result.rates && Array.isArray(result.rates) && result.rates.length > 0,
    extract: (result: any) => ({
      typeSlug: 'analysis.pricing_sheet',
      title: `Rate Sheet - ${new Date().toLocaleDateString()}`,
      data: {
        sheetId: `PS-${Date.now()}`,
        generatedAt: new Date().toISOString(),
        lender: result.lender || 'Various',
        rates: result.rates,
        bestRate: result.bestRate || result.best_rate,
        lowestCost: result.lowestCost || result.lowest_cost,
        comparison: result.comparison || [],
      },
    }),
  },

  prequalificationLetter: {
    matches: (result: any) =>
      result.preQualified === true || result.pre_qualified === true,
    extract: (result: any) => ({
      typeSlug: 'analysis.prequalification_letter',
      title: `Pre-Qualification Letter - ${new Date().toLocaleDateString()}`,
      data: {
        letterId: `PQ-${Date.now()}`,
        generatedAt: new Date().toISOString(),
        qualified: true,
        maxLoanAmount: result.maxLoanAmount || result.max_loan_amount,
        estimatedRate: result.estimatedRate || result.estimated_rate,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        conditions: result.conditions || [],
      },
    }),
  },

  refinanceAnalysis: {
    matches: (result: any) =>
      result.monthlySavings !== undefined || result.monthly_savings !== undefined,
    extract: (result: any) => ({
      typeSlug: 'analysis.refinance_analysis',
      title: `Refinance Analysis - ${new Date().toLocaleDateString()}`,
      data: {
        analysisId: `RA-${Date.now()}`,
        generatedAt: new Date().toISOString(),
        monthlySavings: result.monthlySavings || result.monthly_savings,
        breakEvenMonths: result.breakEvenMonths || result.break_even_months,
        lifetimeSavings: result.lifetimeSavings || result.lifetime_savings,
        newPayment: result.newPayment || result.new_payment,
        oldPayment: result.oldPayment || result.old_payment,
        recommendation: result.recommendation || 'Review with loan officer',
      },
    }),
  },

  creditReport: {
    matches: (result: any) =>
      result.creditProfile || result.credit_profile || result.creditReport,
    extract: (result: any) => ({
      typeSlug: 'analysis.credit_report',
      title: `Credit Analysis - ${new Date().toLocaleDateString()}`,
      data: {
        reportId: `CR-${Date.now()}`,
        generatedAt: new Date().toISOString(),
        score: result.creditScore || result.credit_score || result.fico,
        profile: result.creditProfile || result.credit_profile,
        tradelines: result.tradelines || [],
        inquiries: result.inquiries || [],
        recommendations: result.recommendations || [],
      },
    }),
  },
};

// ============================================
// DETECTION FUNCTIONS
// ============================================

/**
 * Detect entity updates from tool result
 */
export function detectEntityUpdates(
  result: any,
  toolSlug: string
): DetectedUpdate | null {
  if (!result || typeof result !== 'object') {
    return null;
  }

  // Check if tool explicitly returned a patch
  if (result.patch && typeof result.patch === 'object') {
    return {
      patch: result.patch,
      confidence: 1.0,
      source: 'explicit',
    };
  }

  // Check if tool returned entity_update
  if (result.entity_update && typeof result.entity_update === 'object') {
    return {
      patch: result.entity_update,
      confidence: 1.0,
      source: 'explicit',
    };
  }

  // Try pattern matching
  for (const [patternName, pattern] of Object.entries(UPDATE_PATTERNS)) {
    if (pattern.matches(result)) {
      return {
        patch: pattern.extract(result),
        confidence: 0.8,
        source: patternName,
      };
    }
  }

  // Tool-specific patterns
  const toolPatterns = getToolSpecificPatterns(toolSlug);
  if (toolPatterns && toolPatterns.matches(result)) {
    return {
      patch: toolPatterns.extract(result),
      confidence: 0.9,
      source: `tool:${toolSlug}`,
    };
  }

  return null;
}

/**
 * Detect artifacts from tool result
 */
export function detectArtifacts(
  result: any,
  toolSlug: string
): DetectedArtifact[] {
  if (!result || typeof result !== 'object') {
    return [];
  }

  const artifacts: DetectedArtifact[] = [];

  // Check if tool explicitly returned artifacts
  if (result.artifacts && Array.isArray(result.artifacts)) {
    for (const artifact of result.artifacts) {
      artifacts.push({
        typeSlug: normalizeTypeSlug(artifact.type || artifact.kind || 'artifact.document'),
        title: artifact.title || 'Untitled',
        data: artifact.data || artifact,
        confidence: 1.0,
      });
    }
    return artifacts;
  }

  // Try pattern matching
  for (const [patternName, pattern] of Object.entries(ARTIFACT_PATTERNS)) {
    if (pattern.matches(result)) {
      const extracted = pattern.extract(result);
      if (Array.isArray(extracted)) {
        artifacts.push(...extracted.map((a: any) => ({ ...a, confidence: 0.8 })));
      } else {
        artifacts.push({ ...extracted, confidence: 0.8 });
      }
    }
  }

  return artifacts;
}

/**
 * Get tool-specific patterns
 */
function getToolSpecificPatterns(toolSlug: string): any {
  const patterns: Record<string, any> = {
    'marketplace-search': {
      matches: (r: any) => r.lenders || r.programs,
      extract: (r: any) => ({
        eligibleLenders: r.lenders?.filter((l: any) => l.eligible) || [],
        missedLenders: r.lenders?.filter((l: any) => !l.eligible) || [],
      }),
    },
    'dti-calculator': {
      matches: (r: any) => r.ratio !== undefined,
      extract: (r: any) => ({
        borrower: { dti: r.ratio },
        calculations: { dti: r.ratio },
      }),
    },
    'ltv-calculator': {
      matches: (r: any) => r.ratio !== undefined,
      extract: (r: any) => ({
        loan: { ltv: r.ratio },
        calculations: { ltv: r.ratio },
      }),
    },
  };

  return patterns[toolSlug];
}

/**
 * Deep merge patches
 */
export function deepMergePatch(
  target: any,
  patch: any
): any {
  const result = { ...target };

  for (const key in patch) {
    if (patch[key] && typeof patch[key] === 'object' && !Array.isArray(patch[key])) {
      result[key] = deepMergePatch(result[key] || {}, patch[key]);
    } else {
      result[key] = patch[key];
    }
  }

  return result;
}

/**
 * Extract specific fields from result
 */
export function extractFields(
  result: any,
  fields: string[]
): Record<string, any> {
  const extracted: Record<string, any> = {};

  for (const field of fields) {
    const value = getNestedValue(result, field);
    if (value !== undefined) {
      setNestedValue(extracted, field, value);
    }
  }

  return extracted;
}

/**
 * Set nested value in object
 */
function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

/**
 * Detect all patterns in result
 */
export function detectAllPatterns(
  result: any,
  toolSlug: string
): DetectionResult {
  return {
    updates: detectEntityUpdates(result, toolSlug),
    artifacts: detectArtifacts(result, toolSlug),
  };
}

// ============================================
// VALIDATION
// ============================================

/**
 * Validate detected updates against schema
 */
export function validateDetectedUpdates(
  updates: DetectedUpdate,
  entityType: string
): boolean {
  // TODO: Integrate with entity registry schema validation
  return updates.confidence >= 0.5;
}

/**
 * Validate detected artifacts
 */
export function validateDetectedArtifacts(
  artifacts: DetectedArtifact[]
): DetectedArtifact[] {
  return artifacts.filter(a => a.confidence >= 0.5);
}

// ============================================
// EXPORTS
// ============================================

export default {
  detectEntityUpdates,
  detectArtifacts,
  detectAllPatterns,
  deepMergePatch,
  extractFields,
  validateDetectedUpdates,
  validateDetectedArtifacts,
};