import { z } from "zod";

// Property tax rate by location
export const CreatePropertyTaxRateSchema = z.object({
  stateCode: z.string().length(2).describe("Two-letter state code (e.g., CA, TX)"),
  stateName: z.string().describe("Full state name"),
  countyName: z.string().optional().describe("County name for county-specific rates"),
  zipCode: z.string().optional().describe("ZIP code for more specific rates"),

  // Tax rates
  effectiveRate: z.number().min(0).max(0.1).describe("Effective property tax rate as decimal (e.g., 0.011 for 1.1%)"),
  medianRate: z.number().min(0).max(0.1).optional().describe("Median property tax rate for the area"),

  // Additional context
  annualTaxPerMedianHome: z.number().optional().describe("Average annual tax on median-priced home"),
  medianHomeValue: z.number().optional().describe("Median home value in the area"),

  // Metadata
  effectiveDate: z.string().datetime().describe("Date when this rate became effective"),
  expirationDate: z.string().datetime().optional().describe("Date when this rate expires"),
  source: z.string().optional().describe("Data source (e.g., 'State Department of Revenue')"),
  notes: z.string().optional().describe("Additional notes about the rate"),

  // Flags
  isActive: z.boolean().default(true).describe("Whether this rate is currently active"),
  isHighCostArea: z.boolean().default(false).describe("Whether this is a high-cost area"),
  hasLocalSurtax: z.boolean().default(false).describe("Whether additional local taxes apply")
});

// Update schema (partial for updates)
export const UpdatePropertyTaxRateSchema = CreatePropertyTaxRateSchema.partial();

// Full schema (includes system fields)
export const PropertyTaxRateSchema = CreatePropertyTaxRateSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional()
});

// Database row schema
export const PropertyTaxRateDatabaseSchema = z.object({
  id: z.string().uuid(),
  state_code: z.string(),
  state_name: z.string(),
  county_name: z.string().nullable(),
  zip_code: z.string().nullable(),
  effective_rate: z.number(),
  median_rate: z.number().nullable(),
  annual_tax_per_median_home: z.number().nullable(),
  median_home_value: z.number().nullable(),
  effective_date: z.string().datetime(),
  expiration_date: z.string().datetime().nullable(),
  source: z.string().nullable(),
  notes: z.string().nullable(),
  is_active: z.boolean(),
  is_high_cost_area: z.boolean(),
  has_local_surtax: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable()
});

// Type exports
export type PropertyTaxRate = z.infer<typeof PropertyTaxRateSchema>;
export type CreatePropertyTaxRate = z.infer<typeof CreatePropertyTaxRateSchema>;
export type UpdatePropertyTaxRate = z.infer<typeof UpdatePropertyTaxRateSchema>;
export type PropertyTaxRateDatabase = z.infer<typeof PropertyTaxRateDatabaseSchema>;