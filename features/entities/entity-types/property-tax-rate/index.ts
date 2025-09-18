// Barrel exports for property-tax-rate entity-type

export * from './schema';
export { default as PropertyTaxRateUI } from './ui';

// Re-export commonly used items for convenience
export {
  PropertyTaxRateSchema,
  CreatePropertyTaxRateSchema,
  UpdatePropertyTaxRateSchema,
  PropertyTaxRateDatabaseSchema
} from './schema';

export type {
  PropertyTaxRate,
  CreatePropertyTaxRate,
  UpdatePropertyTaxRate,
  PropertyTaxRateDatabase
} from './schema';