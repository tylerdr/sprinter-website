// Barrel exports for insurance-rate entity-type

export * from './schema';
export { default as InsuranceRateUI } from './ui';

// Re-export commonly used items for convenience
export {
  InsuranceRateSchema,
  CreateInsuranceRateSchema,
  UpdateInsuranceRateSchema,
  InsuranceRateDatabaseSchema,
  PropertyType,
  RiskCategory
} from './schema';

export type {
  InsuranceRate,
  CreateInsuranceRate,
  UpdateInsuranceRate,
  InsuranceRateDatabase
} from './schema';