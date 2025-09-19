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
export * from "./use-case";
export * from "./industry";

// Import all entity definitions
import { ServiceEntity } from "./service";
import { CustomerEntity } from "./customer";
import { ProjectEntity } from "./project";
import { DocumentEntity } from "./document";
import { WorkflowEntity } from "./workflow";
import { InvoiceEntity } from "./invoice";
import { TeamMemberEntity } from "./team-member";
import { UseCaseEntity } from "./use-case";
import { IndustryEntity } from "./industry";

// Import all UI components
export { ServiceUI } from "./service/ui";
export { CustomerUI } from "./customer/ui";
export { ProjectUI } from "./project/ui";
export { DocumentUI } from "./document/ui";
export { WorkflowUI } from "./workflow/ui";
export { InvoiceUI } from "./invoice/ui";
export { TeamMemberUI } from "./team-member/ui";
export { UseCaseUI } from "./use-case/ui";
export { IndustryUI } from "./industry/ui";

// Export as collection
export const entityTypes = {
  service: ServiceEntity,
  customer: CustomerEntity,
  project: ProjectEntity,
  document: DocumentEntity,
  workflow: WorkflowEntity,
  invoice: InvoiceEntity,
  "team-member": TeamMemberEntity,
  "use-case": UseCaseEntity,
  industry: IndustryEntity,
} as const;

// Export UI collection
export const entityUIs = {
  service: () => import("./service/ui").then(m => m.ServiceUI),
  customer: () => import("./customer/ui").then(m => m.CustomerUI),
  project: () => import("./project/ui").then(m => m.ProjectUI),
  document: () => import("./document/ui").then(m => m.DocumentUI),
  workflow: () => import("./workflow/ui").then(m => m.WorkflowUI),
  invoice: () => import("./invoice/ui").then(m => m.InvoiceUI),
  "team-member": () => import("./team-member/ui").then(m => m.TeamMemberUI),
  "use-case": () => import("./use-case/ui").then(m => m.UseCaseUI),
  industry: () => import("./industry/ui").then(m => m.IndustryUI),
} as const;

// Export type for all entity slugs
export type EntitySlug = keyof typeof entityTypes;