/**
 * Industry entity type for AI Sprinter Platform
 * Manages industry-specific AI opportunities, challenges, and market insights
 */

export * from "./schema";
export { IndustryUI } from "./ui";

// Import entity definition
import {
  CreateIndustrySchema,
  UpdateIndustrySchema,
  IndustrySchema,
  type Industry,
  type CreateIndustry,
  type UpdateIndustry,
  type IndustryFilters
} from "./schema";

// Entity definition
export const IndustryEntity = {
  name: "industry",
  displayName: "Industry",
  pluralName: "industries",
  pluralDisplayName: "Industries",
  description: "Industry-specific AI transformation opportunities and market insights",

  // Schemas
  createSchema: CreateIndustrySchema,
  updateSchema: UpdateIndustrySchema,
  schema: IndustrySchema,

  // Database configuration
  tableName: "industries",

  // UI configuration
  ui: {
    icon: "Building",
    color: "green",
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
export type { Industry, CreateIndustry, UpdateIndustry, IndustryFilters };