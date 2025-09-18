import { z } from "zod";

// Property types for insurance rate variations
export const PropertyType = z.enum([
  "single_family",
  "condo",
  "townhouse",
  "multi_family",
  "manufactured"
]);

// Risk categories
export const RiskCategory = z.enum([
  "low",
  "moderate",
  "high",
  "very_high"
]);

// Home insurance rate by location and property type
export const CreateInsuranceRateSchema = z.object({
  stateCode: z.string().length(2).describe("Two-letter state code (e.g., FL, CA)"),
  stateName: z.string().describe("Full state name"),
  countyName: z.string().optional().describe("County name for county-specific rates"),
  zipCode: z.string().optional().describe("ZIP code for more specific rates"),

  // Insurance rates by property type
  baseRate: z.number().min(0).max(0.05).describe("Base insurance rate as decimal (e.g., 0.0035 for 0.35%)"),
  singleFamilyRate: z.number().min(0).max(0.05).optional().describe("Rate for single family homes"),
  condoRate: z.number().min(0).max(0.05).optional().describe("Rate for condos (usually lower)"),
  townhouseRate: z.number().min(0).max(0.05).optional().describe("Rate for townhouses"),
  multiFamilyRate: z.number().min(0).max(0.05).optional().describe("Rate for multi-family properties"),

  // Risk factors
  riskCategory: RiskCategory.describe("Overall risk category for the area"),
  hurricaneZone: z.boolean().default(false).describe("Area prone to hurricanes"),
  floodZone: z.boolean().default(false).describe("Area prone to flooding"),
  earthquakeZone: z.boolean().default(false).describe("Area prone to earthquakes"),
  wildfireZone: z.boolean().default(false).describe("Area prone to wildfires"),
  tornadoZone: z.boolean().default(false).describe("Area prone to tornadoes"),

  // Additional costs
  averageDeductible: z.number().optional().describe("Average deductible amount"),
  averagePremium: z.number().optional().describe("Average annual premium"),
  medianHomeValue: z.number().optional().describe("Median home value in the area"),

  // Metadata
  effectiveDate: z.string().datetime().describe("Date when this rate became effective"),
  expirationDate: z.string().datetime().optional().describe("Date when this rate expires"),
  source: z.string().optional().describe("Data source (e.g., 'State Insurance Department')"),
  notes: z.string().optional().describe("Additional notes about the rate"),

  // Flags
  isActive: z.boolean().default(true).describe("Whether this rate is currently active"),
  requiresFloodInsurance: z.boolean().default(false).describe("Whether flood insurance is required"),
  requiresEarthquakeInsurance: z.boolean().default(false).describe("Whether earthquake insurance is required")
});

// Update schema (partial for updates)
export const UpdateInsuranceRateSchema = CreateInsuranceRateSchema.partial();

// Full schema (includes system fields)
export const InsuranceRateSchema = CreateInsuranceRateSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional()
});

// Database row schema
export const InsuranceRateDatabaseSchema = z.object({
  id: z.string().uuid(),
  state_code: z.string(),
  state_name: z.string(),
  county_name: z.string().nullable(),
  zip_code: z.string().nullable(),
  base_rate: z.number(),
  single_family_rate: z.number().nullable(),
  condo_rate: z.number().nullable(),
  townhouse_rate: z.number().nullable(),
  multi_family_rate: z.number().nullable(),
  risk_category: z.string(),
  hurricane_zone: z.boolean(),
  flood_zone: z.boolean(),
  earthquake_zone: z.boolean(),
  wildfire_zone: z.boolean(),
  tornado_zone: z.boolean(),
  average_deductible: z.number().nullable(),
  average_premium: z.number().nullable(),
  median_home_value: z.number().nullable(),
  effective_date: z.string().datetime(),
  expiration_date: z.string().datetime().nullable(),
  source: z.string().nullable(),
  notes: z.string().nullable(),
  is_active: z.boolean(),
  requires_flood_insurance: z.boolean(),
  requires_earthquake_insurance: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable()
});

// Type exports
export type InsuranceRate = z.infer<typeof InsuranceRateSchema>;
export type CreateInsuranceRate = z.infer<typeof CreateInsuranceRateSchema>;
export type UpdateInsuranceRate = z.infer<typeof UpdateInsuranceRateSchema>;
export type InsuranceRateDatabase = z.infer<typeof InsuranceRateDatabaseSchema>;
export type PropertyType = z.infer<typeof PropertyType>;
export type RiskCategory = z.infer<typeof RiskCategory>;