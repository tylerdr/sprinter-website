import { z } from "zod";

// Fee types
export const FeeType = z.enum([
  "appraisal",
  "credit_report",
  "tax_service",
  "flood_cert",
  "title_insurance",
  "title_search",
  "escrow",
  "attorney",
  "recording",
  "survey",
  "pest_inspection",
  "home_inspection",
  "origination",
  "underwriting",
  "processing",
  "document_prep",
  "courier",
  "notary",
  "transfer_tax",
  "mortgage_insurance",
  "prepaid_interest",
  "prepaid_taxes",
  "prepaid_insurance",
  "hoa_transfer",
  "other"
]);

// Fee calculation methods
export const CalculationMethod = z.enum([
  "flat",
  "percentage_of_loan",
  "percentage_of_purchase",
  "per_unit",
  "tiered"
]);

// Closing cost fees by location
export const CreateClosingCostFeeSchema = z.object({
  stateCode: z.string().length(2).describe("Two-letter state code"),
  stateName: z.string().describe("Full state name"),
  countyName: z.string().optional().describe("County name for county-specific fees"),
  cityName: z.string().optional().describe("City name for city-specific fees"),

  // Fee details
  feeType: FeeType.describe("Type of closing cost fee"),
  feeName: z.string().describe("Display name for the fee"),
  feeDescription: z.string().optional().describe("Detailed description of the fee"),

  // Calculation
  calculationMethod: CalculationMethod.describe("How the fee is calculated"),
  flatAmount: z.number().optional().describe("Flat fee amount (if applicable)"),
  percentageRate: z.number().min(0).max(0.1).optional().describe("Percentage rate as decimal"),
  perUnitAmount: z.number().optional().describe("Amount per unit (e.g., per $1000 of loan)"),

  // Tiered rates (if applicable)
  tiers: z.array(z.object({
    minAmount: z.number().describe("Minimum amount for this tier"),
    maxAmount: z.number().optional().describe("Maximum amount for this tier"),
    rate: z.number().describe("Rate or amount for this tier"),
    flatFee: z.number().optional().describe("Additional flat fee for this tier")
  })).optional().describe("Tiered fee structure"),

  // Ranges
  minimumFee: z.number().optional().describe("Minimum fee regardless of calculation"),
  maximumFee: z.number().optional().describe("Maximum fee cap"),
  typicalAmount: z.number().optional().describe("Typical/average fee amount"),

  // Who pays
  paidBy: z.enum(["buyer", "seller", "split", "negotiable"]).default("buyer"),
  isNegotiable: z.boolean().default(false).describe("Whether the fee is negotiable"),
  isRequired: z.boolean().default(true).describe("Whether the fee is required"),
  isGovernmentFee: z.boolean().default(false).describe("Whether this is a government fee"),

  // Property type variations
  singleFamilyAdjustment: z.number().default(1).describe("Multiplier for single family"),
  condoAdjustment: z.number().default(1).describe("Multiplier for condos"),
  multiFamilyAdjustment: z.number().default(1).describe("Multiplier for multi-family"),

  // Metadata
  effectiveDate: z.string().datetime().describe("Date when this fee became effective"),
  expirationDate: z.string().datetime().optional().describe("Date when this fee expires"),
  source: z.string().optional().describe("Data source"),
  notes: z.string().optional().describe("Additional notes"),

  // Flags
  isActive: z.boolean().default(true).describe("Whether this fee is currently active"),
  isHighCostArea: z.boolean().default(false).describe("Whether this is for a high-cost area")
});

// Update schema (partial for updates)
export const UpdateClosingCostFeeSchema = CreateClosingCostFeeSchema.partial();

// Full schema (includes system fields)
export const ClosingCostFeeSchema = CreateClosingCostFeeSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional()
});

// Database row schema
export const ClosingCostFeeDatabaseSchema = z.object({
  id: z.string().uuid(),
  state_code: z.string(),
  state_name: z.string(),
  county_name: z.string().nullable(),
  city_name: z.string().nullable(),
  fee_type: z.string(),
  fee_name: z.string(),
  fee_description: z.string().nullable(),
  calculation_method: z.string(),
  flat_amount: z.number().nullable(),
  percentage_rate: z.number().nullable(),
  per_unit_amount: z.number().nullable(),
  tiers: z.any().nullable(), // JSON
  minimum_fee: z.number().nullable(),
  maximum_fee: z.number().nullable(),
  typical_amount: z.number().nullable(),
  paid_by: z.string(),
  is_negotiable: z.boolean(),
  is_required: z.boolean(),
  is_government_fee: z.boolean(),
  single_family_adjustment: z.number(),
  condo_adjustment: z.number(),
  multi_family_adjustment: z.number(),
  effective_date: z.string().datetime(),
  expiration_date: z.string().datetime().nullable(),
  source: z.string().nullable(),
  notes: z.string().nullable(),
  is_active: z.boolean(),
  is_high_cost_area: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable()
});

// Type exports
export type ClosingCostFee = z.infer<typeof ClosingCostFeeSchema>;
export type CreateClosingCostFee = z.infer<typeof CreateClosingCostFeeSchema>;
export type UpdateClosingCostFee = z.infer<typeof UpdateClosingCostFeeSchema>;
export type ClosingCostFeeDatabase = z.infer<typeof ClosingCostFeeDatabaseSchema>;
export type FeeType = z.infer<typeof FeeType>;
export type CalculationMethod = z.infer<typeof CalculationMethod>;