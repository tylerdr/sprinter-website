/**
 * Use Case entity type for AI Sprinter Platform
 * Manages use case definitions, implementations, and business value
 */

export * from "./schema";
export { UseCaseUI } from "./ui";

// Import entity definition
import {
  CreateUseCaseSchema,
  UpdateUseCaseSchema,
  UseCaseSchema,
  type UseCase,
  type CreateUseCase,
  type UpdateUseCase,
  type UseCaseFilters
} from "./schema";

// Entity definition
export const UseCaseEntity = {
  name: "use-case",
  displayName: "Use Case",
  pluralName: "use-cases",
  pluralDisplayName: "Use Cases",
  description: "AI implementation use cases with business value and technical requirements",

  // Schemas
  createSchema: CreateUseCaseSchema,
  updateSchema: UpdateUseCaseSchema,
  schema: UseCaseSchema,

  // Database configuration
  tableName: "use_cases",

  // UI configuration
  ui: {
    icon: "Target",
    color: "blue",
    category: "Content"
  },

  // Feature flags
  features: {
    versioning: true,
    analytics: true,
    search: true,
    filtering: true,
    sorting: true
  }
} as const;

// Export types
export type { UseCase, CreateUseCase, UpdateUseCase, UseCaseFilters };