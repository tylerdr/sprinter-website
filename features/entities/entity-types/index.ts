/**
 * Central registry of all entity types in the AI Sprinter Platform
 */

export * from "./service";
export * from "./customer";
export * from "./project";
export * from "./document";
export * from "./workflow";
export * from "./invoice";
export * from "./team-member";

// Import all entity definitions
import { ServiceEntity } from "./service";
import { CustomerEntity } from "./customer";
import { ProjectEntity } from "./project";
import { DocumentEntity } from "./document";
import { WorkflowEntity } from "./workflow";
import { InvoiceEntity } from "./invoice";
import { TeamMemberEntity } from "./team-member";

// Export as collection
export const entityTypes = {
  service: ServiceEntity,
  customer: CustomerEntity,
  project: ProjectEntity,
  document: DocumentEntity,
  workflow: WorkflowEntity,
  invoice: InvoiceEntity,
  "team-member": TeamMemberEntity,
} as const;

// Export type for all entity slugs
export type EntitySlug = keyof typeof entityTypes;