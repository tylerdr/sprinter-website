// Barrel exports for lead entity-type

export * from './schema';
export { default as LeadUI } from './ui';

// Re-export commonly used items for convenience
export {
  LeadSchema,
  CreateLeadSchema,
  UpdateLeadSchema,
  LeadDatabaseSchema,
  PreferredContactMethod,
  LoanPurpose,
  PropertyType,
  Occupancy,
  Timeframe,
  EstimatedCreditScore,
  LeadQualification,
  LeadSource
} from './schema';

export type {
  Lead,
  CreateLead,
  UpdateLead,
  LeadDatabase
} from './schema';