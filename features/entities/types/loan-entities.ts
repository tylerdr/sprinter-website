/**
 * Loan Entity Schemas - Comprehensive mortgage entity type definitions
 * Following AI Sprinter dot-slug architecture
 */

import { z } from "zod";

// ============================================
// BORROWER SCHEMAS
// ============================================

export const BorrowerSchema = z.object({
  // Credit Profile
  fico: z.number().min(300).max(850).optional().describe("FICO credit score"),
  creditHistory: z.object({
    bankruptcies: z.number().min(0).optional(),
    foreclosures: z.number().min(0).optional(),
    latePayments: z.number().min(0).optional(),
    monthsSinceLastDerogatory: z.number().min(0).optional(),
  }).optional(),

  // Income & Employment
  income: z.object({
    gross_monthly: z.number().min(0).optional(),
    net_monthly: z.number().min(0).optional(),
    type: z.enum(["w2", "self_employed", "contract", "retired", "other"]).optional(),
    documented: z.boolean().optional(),
  }).optional(),

  employmentStatus: z.enum(["employed", "self_employed", "retired", "unemployed"]).optional(),
  employmentYears: z.number().min(0).optional(),

  // Debt & Ratios
  monthlyDebts: z.number().min(0).optional(),
  dti: z.number().min(0).max(100).optional().describe("Debt-to-income ratio"),
  housingExpense: z.number().min(0).optional(),

  // Assets
  assets: z.object({
    liquid: z.number().min(0).optional(),
    retirement: z.number().min(0).optional(),
    other: z.number().min(0).optional(),
    total: z.number().min(0).optional(),
  }).optional(),

  // Personal Info
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),

  // Citizenship & Residency
  citizenshipStatus: z.enum(["us_citizen", "permanent_resident", "visa_holder", "non_resident"]).optional(),
  firstTimeHomeBuyer: z.boolean().optional(),

  // Co-borrower
  hasCoBorrower: z.boolean().optional(),
});

// ============================================
// PROPERTY SCHEMAS
// ============================================

export const PropertySchema = z.object({
  // Property Type
  type: z.enum([
    "single_family",
    "condo",
    "townhouse",
    "multi_family",
    "manufactured",
    "modular",
    "cooperative"
  ]).optional(),

  // Location
  state: z.string().length(2).optional().describe("Two-letter state code"),
  county: z.string().optional(),
  zip: z.string().optional(),

  // Values
  value: z.number().min(0).optional().describe("Property value or purchase price"),
  purchasePrice: z.number().min(0).optional(),
  appraisedValue: z.number().min(0).optional(),

  // Occupancy
  occupancy: z.enum(["primary", "secondary", "investment"]).optional(),

  // Property Details
  yearBuilt: z.number().min(1800).max(2050).optional(),
  squareFootage: z.number().min(0).optional(),
  units: z.number().min(1).max(4).default(1).optional(),

  // HOA
  hasHOA: z.boolean().optional(),
  hoaFees: z.number().min(0).optional(),

  // Special Characteristics
  isRural: z.boolean().optional(),
  isManufactured: z.boolean().optional(),
  isCondo: z.boolean().optional(),
  isInvestment: z.boolean().optional(),
});

// ============================================
// LOAN SCHEMAS
// ============================================

export const LoanDetailsSchema = z.object({
  // Loan Purpose
  purpose: z.enum(["purchase", "refinance", "cash_out"]).optional(),

  // Amounts
  amount: z.number().min(0).optional().describe("Requested loan amount"),
  downPayment: z.number().min(0).optional(),
  downPaymentPercent: z.number().min(0).max(100).optional(),
  ltv: z.number().min(0).max(100).optional().describe("Loan-to-value ratio"),
  cltv: z.number().min(0).max(100).optional().describe("Combined LTV"),

  // Loan Terms
  term: z.number().optional().describe("Loan term in months"),
  termYears: z.number().optional().describe("Loan term in years"),

  // Product Type
  loanType: z.enum([
    "conventional",
    "fha",
    "va",
    "usda",
    "jumbo",
    "non_qm",
    "heloc",
    "bank_statement",
    "asset_depletion",
    "dscr"
  ]).optional(),

  productType: z.enum([
    "fixed",
    "arm_5_1",
    "arm_7_1",
    "arm_10_1",
    "variable"
  ]).optional(),

  // Rate & Costs
  requestedRate: z.number().min(0).max(20).optional(),
  closingCosts: z.number().min(0).optional(),

  // Special Programs
  specialPrograms: z.array(z.string()).optional(),

  // Cash Out
  cashOutAmount: z.number().min(0).optional(),

  // Existing Loan (for refinance)
  existingLoan: z.object({
    balance: z.number().min(0).optional(),
    rate: z.number().min(0).max(20).optional(),
    monthlyPayment: z.number().min(0).optional(),
    lender: z.string().optional(),
  }).optional(),
});

// ============================================
// CALCULATION SCHEMAS
// ============================================

export const CalculationsSchema = z.object({
  // Ratios
  dti: z.number().min(0).max(100).optional(),
  frontEndRatio: z.number().min(0).max(100).optional(),
  backEndRatio: z.number().min(0).max(100).optional(),
  ltv: z.number().min(0).max(100).optional(),
  cltv: z.number().min(0).max(100).optional(),

  // Payments
  monthlyPayment: z.number().min(0).optional(),
  principalAndInterest: z.number().min(0).optional(),
  propertyTax: z.number().min(0).optional(),
  homeInsurance: z.number().min(0).optional(),
  pmi: z.number().min(0).optional(),
  hoaFees: z.number().min(0).optional(),
  totalMonthlyPayment: z.number().min(0).optional(),

  // Costs
  closingCosts: z.number().min(0).optional(),
  cashToClose: z.number().min(0).optional(),

  // Affordability
  maxLoanAmount: z.number().min(0).optional(),
  maxPurchasePrice: z.number().min(0).optional(),
  requiredIncome: z.number().min(0).optional(),

  // Reserves
  monthsReserves: z.number().min(0).optional(),
  requiredReserves: z.number().min(0).optional(),
});

// ============================================
// LENDER RESULT SCHEMAS
// ============================================

export const LenderResultSchema = z.object({
  lenderId: z.number().optional(),
  lenderName: z.string(),
  eligible: z.boolean(),

  // Eligibility Details
  programs: z.array(z.object({
    id: z.number(),
    name: z.string(),
    eligible: z.boolean(),
    rate: z.number().optional(),
    apr: z.number().optional(),
    points: z.number().optional(),
    fees: z.number().optional(),
  })).optional(),

  // Reasons
  reasons: z.array(z.string()).optional(),
  missedBy: z.array(z.object({
    criteria: z.string(),
    required: z.any(),
    actual: z.any(),
  })).optional(),

  // Contact Info
  contactInfo: z.object({
    phone: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    accountExecutive: z.string().optional(),
  }).optional(),
});

// ============================================
// SEARCH METADATA SCHEMAS
// ============================================

export const SearchMetadataSchema = z.object({
  timestamp: z.string().datetime(),
  toolUsed: z.string().optional(),
  criteria: z.record(z.string(), z.any()).optional(),
  duration: z.number().optional(),
  resultCount: z.object({
    eligible: z.number(),
    missed: z.number(),
    total: z.number(),
  }).optional(),
});

// ============================================
// MAIN LOAN SCENARIO SCHEMA
// ============================================

export const LoanScenarioSchema = z.object({
  // Core Data
  borrower: BorrowerSchema.optional(),
  property: PropertySchema.optional(),
  loan: LoanDetailsSchema.optional(),

  // Calculations
  calculations: CalculationsSchema.optional(),

  // Search Results
  eligibleLenders: z.array(LenderResultSchema).optional(),
  missedLenders: z.array(LenderResultSchema).optional(),

  // Metadata
  lastSearch: SearchMetadataSchema.optional(),

  // Workspace Management
  entities: z.array(z.string()).optional(),
  artifacts: z.array(z.string()).optional(),

  // Status
  status: z.enum(["draft", "analyzing", "complete", "archived"]).optional(),
  completeness: z.number().min(0).max(100).optional(),

  // Notes & History
  notes: z.string().optional(),
  history: z.array(z.object({
    timestamp: z.string().datetime(),
    action: z.string(),
    changes: z.record(z.string(), z.any()).optional(),
    userId: z.string().optional(),
  })).optional(),
});

// ============================================
// ARTIFACT SCHEMAS
// ============================================

export const EligibilityReportSchema = z.object({
  reportId: z.string(),
  generatedAt: z.string().datetime(),

  // Summary
  summary: z.object({
    totalLenders: z.number(),
    eligibleCount: z.number(),
    missedCount: z.number(),
    bestRate: z.number().optional(),
    lowestFees: z.number().optional(),
  }),

  // Detailed Results
  eligible: z.array(LenderResultSchema),
  missed: z.array(LenderResultSchema),

  // Search Criteria Used
  criteria: z.object({
    borrower: BorrowerSchema.optional(),
    property: PropertySchema.optional(),
    loan: LoanDetailsSchema.optional(),
  }),

  // Recommendations
  recommendations: z.array(z.object({
    type: z.string(),
    message: z.string(),
    impact: z.enum(["high", "medium", "low"]),
    action: z.string().optional(),
  })).optional(),
});

export const PricingSheetSchema = z.object({
  sheetId: z.string(),
  generatedAt: z.string().datetime(),
  lender: z.string(),

  // Rate Options
  rates: z.array(z.object({
    rate: z.number(),
    apr: z.number(),
    points: z.number(),
    fees: z.number(),
    monthlyPayment: z.number(),
    lockPeriod: z.number(),
    expiresAt: z.string().datetime().optional(),
  })),

  // Best Options
  bestRate: z.object({
    rate: z.number(),
    totalCost: z.number(),
  }).optional(),

  lowestCost: z.object({
    rate: z.number(),
    totalCost: z.number(),
  }).optional(),

  // Comparison
  comparison: z.array(z.object({
    scenario: z.string(),
    rate: z.number(),
    totalCost: z.number(),
    savings: z.number(),
  })).optional(),
});

// ============================================
// ENTITY TYPE DEFINITIONS
// ============================================

export const LOAN_ENTITY_TYPES = {
  'loan.scenario': {
    schema: LoanScenarioSchema,
    namespace: 'loan',
    isWorkspace: true,
    displayName: 'Loan Scenario',
    description: 'Primary workspace for mortgage loan analysis',
  },
  'analysis.eligibility_report': {
    schema: EligibilityReportSchema,
    namespace: 'analysis',
    isWorkspace: false,
    displayName: 'Eligibility Report',
    description: 'Lender eligibility analysis results',
  },
  'analysis.pricing_sheet': {
    schema: PricingSheetSchema,
    namespace: 'analysis',
    isWorkspace: false,
    displayName: 'Pricing Sheet',
    description: 'Rate and pricing comparison',
  },
} as const;

// ============================================
// TYPE EXPORTS
// ============================================

export type Borrower = z.infer<typeof BorrowerSchema>;
export type Property = z.infer<typeof PropertySchema>;
export type LoanDetails = z.infer<typeof LoanDetailsSchema>;
export type Calculations = z.infer<typeof CalculationsSchema>;
export type LenderResult = z.infer<typeof LenderResultSchema>;
export type SearchMetadata = z.infer<typeof SearchMetadataSchema>;
export type LoanScenario = z.infer<typeof LoanScenarioSchema>;
export type EligibilityReport = z.infer<typeof EligibilityReportSchema>;
export type PricingSheet = z.infer<typeof PricingSheetSchema>;