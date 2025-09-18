// Barrel exports for closing-cost-fee entity-type

export * from './schema';
export { default as ClosingCostFeeUI } from './ui';

// Re-export commonly used items for convenience
export {
  ClosingCostFeeSchema,
  CreateClosingCostFeeSchema,
  UpdateClosingCostFeeSchema,
  ClosingCostFeeDatabaseSchema,
  FeeType,
  CalculationMethod
} from './schema';

export type {
  ClosingCostFee,
  CreateClosingCostFee,
  UpdateClosingCostFee,
  ClosingCostFeeDatabase
} from './schema';