import { z } from "zod";

// Loan limit types
export const LimitType = z.enum([
  "baseline",
  "high_cost",
  "super_high_cost",
  "alaska_hawaii_guam_virgin_islands"
]);

// Unit types
export const UnitType = z.enum([
  "single_family",
  "duplex",
  "triplex",
  "fourplex"
]);

// Conforming loan limits by location
export const CreateConformingLoanLimitSchema = z.object({
  year: z.number().min(2000).max(2100).describe("Year for which these limits apply"),
  stateCode: z.string().length(2).optional().describe("Two-letter state code (null for baseline)"),
  stateName: z.string().optional().describe("Full state name"),
  countyName: z.string().optional().describe("County name for county-specific limits"),
  cbsaCode: z.string().optional().describe("Core Based Statistical Area code"),
  cbsaName: z.string().optional().describe("CBSA name (metropolitan area)"),

  // Limit type
  limitType: LimitType.describe("Type of conforming loan limit"),

  // Loan limits by unit type
  singleFamilyLimit: z.number().positive().describe("Limit for single-family homes"),
  duplexLimit: z.number().positive().optional().describe("Limit for duplex properties"),
  triplexLimit: z.number().positive().optional().describe("Limit for triplex properties"),
  fourplexLimit: z.number().positive().optional().describe("Limit for fourplex properties"),

  // FHA limits (often different from conforming)
  fhaSingleFamilyLimit: z.number().positive().optional().describe("FHA limit for single-family"),
  fhaDuplexLimit: z.number().positive().optional().describe("FHA limit for duplex"),
  fhaTriplexLimit: z.number().positive().optional().describe("FHA limit for triplex"),
  fhaFourplexLimit: z.number().positive().optional().describe("FHA limit for fourplex"),

  // VA limits (for loans with down payment)
  vaLimit: z.number().positive().optional().describe("VA loan limit (when down payment required)"),

  // Metadata
  medianHomePrice: z.number().optional().describe("Median home price in the area"),
  percentOfBaseline: z.number().optional().describe("Percentage of baseline limit (e.g., 150 for high-cost)"),
  effectiveDate: z.string().datetime().describe("Date when these limits became effective"),
  expirationDate: z.string().datetime().optional().describe("Date when these limits expire"),
  source: z.string().optional().describe("Data source (e.g., 'FHFA', 'HUD')"),
  notes: z.string().optional().describe("Additional notes about the limits"),

  // Flags
  isActive: z.boolean().default(true).describe("Whether these limits are currently active"),
  isHighCostArea: z.boolean().default(false).describe("Whether this is a high-cost area"),
  isSpecialArea: z.boolean().default(false).describe("Special area (AK, HI, GU, VI)")
});

// Update schema (partial for updates)
export const UpdateConformingLoanLimitSchema = CreateConformingLoanLimitSchema.partial();

// Full schema (includes system fields)
export const ConformingLoanLimitSchema = CreateConformingLoanLimitSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional()
});

// Database row schema
export const ConformingLoanLimitDatabaseSchema = z.object({
  id: z.string().uuid(),
  year: z.number(),
  state_code: z.string().nullable(),
  state_name: z.string().nullable(),
  county_name: z.string().nullable(),
  cbsa_code: z.string().nullable(),
  cbsa_name: z.string().nullable(),
  limit_type: z.string(),
  single_family_limit: z.number(),
  duplex_limit: z.number().nullable(),
  triplex_limit: z.number().nullable(),
  fourplex_limit: z.number().nullable(),
  fha_single_family_limit: z.number().nullable(),
  fha_duplex_limit: z.number().nullable(),
  fha_triplex_limit: z.number().nullable(),
  fha_fourplex_limit: z.number().nullable(),
  va_limit: z.number().nullable(),
  median_home_price: z.number().nullable(),
  percent_of_baseline: z.number().nullable(),
  effective_date: z.string().datetime(),
  expiration_date: z.string().datetime().nullable(),
  source: z.string().nullable(),
  notes: z.string().nullable(),
  is_active: z.boolean(),
  is_high_cost_area: z.boolean(),
  is_special_area: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable()
});

// Type exports
export type ConformingLoanLimit = z.infer<typeof ConformingLoanLimitSchema>;
export type CreateConformingLoanLimit = z.infer<typeof CreateConformingLoanLimitSchema>;
export type UpdateConformingLoanLimit = z.infer<typeof UpdateConformingLoanLimitSchema>;
export type ConformingLoanLimitDatabase = z.infer<typeof ConformingLoanLimitDatabaseSchema>;
export type LimitType = z.infer<typeof LimitType>;
export type UnitType = z.infer<typeof UnitType>;