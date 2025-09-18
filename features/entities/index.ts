/**
 * Entity System - Centralized exports
 * Dot-slug architecture with workspace standardization
 */

// Registry exports
export {
  entityRegistry,
  getEntityType,
  validateEntityState,
  canToolReadFromEntity,
  canToolWriteToEntity,
  type EntityType,
  type EntityMapping,
  type ToolEntityMapping
} from './registry';

// Core entity actions
export {
  createOrAttachEntityAction,
  getEntityAction,
  applyEntityPatchAction,
  createArtifactAction,
  getArtifactsAction,
  getArtifactAction,
  updateArtifactAction,
  deleteArtifactAction,
  type EntityPatch
} from './server/actions';

// Enhanced entity actions
export {
  createWorkspaceAction,
  attachEntityToWorkspaceAction,
  getWorkspaceEntitiesAction,
  getEntityTypesAction,
  validateEntityStateAction,
  getToolEntityMappingsAction,
  canToolAccessEntityAction,
  findEntitiesByTypeAction,
  getUserWorkspacesAction
} from './server/actions';

// Workspace service
export {
  getOrCreateChatWorkspaceAction,
  getChatWorkspaceAction,
  addEntityToChatWorkspaceAction,
  initializeChatEntitiesAction,
  getChatEntityByTypeAction,
  archiveChatWorkspaceAction,
  getWorkspaceStatsAction,
  type ChatWorkspace,
  type WorkspaceEntity
} from './server/workspace-service';

// Tool execution with entity awareness
export {
  runToolWithEntityAction,
  runToolWithWorkspaceAction
} from '../tools/server/run-with-entity';

// Entity types (for convenience)
export * from './entity-types/lead';
export { default as LeadUI } from './entity-types/lead/ui';

// Re-export commonly used types
export type {
  Lead,
  CreateLead,
  UpdateLead,
  LeadDatabase,
  PreferredContactMethod,
  LoanPurpose,
  PropertyType,
  Occupancy,
  Timeframe,
  EstimatedCreditScore,
  LeadQualification,
  LeadSource
} from './entity-types/lead/schema';