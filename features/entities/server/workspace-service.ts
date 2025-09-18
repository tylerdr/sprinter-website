"use server";

/**
 * Workspace Service - Implements workspace pattern (one root entity per chat)
 * Manages chat-entity relationships and workspace lifecycle
 */

import { createClient } from "@/lib/supabase/server";
import { getUserProfileWithCurrentTenant } from "@/lib/profiles";
import { entityRegistry } from "@/features/entities/registry";
import {
  createOrAttachEntityAction,
  createWorkspaceAction,
  attachEntityToWorkspaceAction,
  getWorkspaceEntitiesAction,
  getEntityAction
} from "./actions";
import { logger } from "@/lib/logger";

// ============================================
// WORKSPACE TYPES
// ============================================

export interface ChatWorkspace {
  chatId: string;
  workspaceId: string;
  workspaceType: string;
  title: string;
  entities: WorkspaceEntity[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceEntity {
  id: string;
  typeSlug: string;
  fullSlug: string;
  title: string;
  namespace?: string;
  state: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// WORKSPACE SERVICE
// ============================================

/**
 * Get or create a workspace for a chat
 * Implements the "one root entity per chat" pattern
 */
export async function getOrCreateChatWorkspaceAction({
  chatId,
  workspaceType = 'loan.scenario',
  title,
}: {
  chatId: string;
  workspaceType?: string;
  title?: string;
}): Promise<{ workspaceId: string; isNew: boolean }> {
  const supabase = await createClient();

  // Check if chat already has a workspace
  const { data: chat } = await supabase
    .from("ai_chats")
    .select("workspace_id")
    .eq("id", chatId)
    .single();

  if (chat?.workspace_id) {
    return { workspaceId: chat.workspace_id, isNew: false };
  }

  // Create new workspace entity for this chat
  const { entityId } = await createOrAttachEntityAction({
    typeSlug: workspaceType,
    chatId,
    title: title || `Chat Workspace - ${new Date().toLocaleDateString()}`,
    initialState: {
      chat_id: chatId,
      entities: [],
      created_from: 'chat_initialization',
      workspace_type: workspaceType
    },
    namespace: workspaceType.includes('.') ? workspaceType.split('.')[0] : undefined,
  });

  // Update chat with workspace_id
  await supabase
    .from("ai_chats")
    .update({ workspace_id: entityId })
    .eq("id", chatId);

  logger.info(`Created workspace ${entityId} for chat ${chatId}`, {
    chatId,
    workspaceId: entityId,
    workspaceType
  });

  return { workspaceId: entityId, isNew: true };
}

/**
 * Get chat workspace with all entities
 */
export async function getChatWorkspaceAction(chatId: string): Promise<ChatWorkspace | null> {
  const supabase = await createClient();

  // Get chat with workspace info
  const { data: chat } = await supabase
    .from("ai_chats")
    .select("workspace_id, title, created_at, updated_at")
    .eq("id", chatId)
    .single();

  if (!chat?.workspace_id) {
    return null;
  }

  // Get workspace entity
  const workspace = await getEntityAction(chat.workspace_id);

  // Get all entities in workspace
  const entities = await getWorkspaceEntitiesAction(chat.workspace_id);

  return {
    chatId,
    workspaceId: chat.workspace_id,
    workspaceType: workspace.full_slug || workspace.type_slug,
    title: workspace.title,
    entities: entities.map(entity => ({
      id: entity.id,
      typeSlug: entity.type_slug,
      fullSlug: entity.full_slug || entity.type_slug,
      title: entity.title,
      namespace: entity.namespace || undefined,
      state: (entity.state_json as Record<string, any>) || {},
      createdAt: entity.created_at,
      updatedAt: entity.updated_at
    })),
    createdAt: workspace.created_at,
    updatedAt: workspace.updated_at
  };
}

/**
 * Add an entity to a chat's workspace
 */
export async function addEntityToChatWorkspaceAction({
  chatId,
  entityTypeSlug,
  title,
  initialState,
}: {
  chatId: string;
  entityTypeSlug: string;
  title?: string;
  initialState?: Record<string, any>;
}): Promise<{ entityId: string }> {
  // Ensure chat has a workspace
  const { workspaceId } = await getOrCreateChatWorkspaceAction({ chatId });

  // Create the entity
  const { entityId } = await createOrAttachEntityAction({
    typeSlug: entityTypeSlug,
    title,
    initialState,
    workspaceId,
    namespace: entityTypeSlug.includes('.') ? entityTypeSlug.split('.')[0] : undefined,
  });

  // Attach to workspace
  await attachEntityToWorkspaceAction({
    entityId,
    workspaceId,
  });

  logger.info(`Added entity ${entityId} to chat workspace ${workspaceId}`, {
    chatId,
    workspaceId,
    entityId,
    entityType: entityTypeSlug
  });

  return { entityId };
}

/**
 * Initialize a chat with appropriate entities based on context
 */
export async function initializeChatEntitiesAction({
  chatId,
  context,
  agentId,
}: {
  chatId: string;
  context?: {
    tenantType?: string;
    expectedEntityTypes?: string[];
    initialData?: Record<string, any>;
  };
  agentId?: string;
}): Promise<{ workspaceId: string; entityIds: string[] }> {
  await entityRegistry.initialize();

  // Determine workspace type based on context
  let workspaceType = 'workspace'; // default

  if (context?.tenantType === 'lender') {
    workspaceType = 'loan.scenario';
  } else if (context?.tenantType === 'broker') {
    workspaceType = 'loan.scenario';
  }

  // Create or get workspace
  const { workspaceId } = await getOrCreateChatWorkspaceAction({
    chatId,
    workspaceType,
    title: `Chat Session - ${new Date().toLocaleDateString()}`,
  });

  const entityIds: string[] = [workspaceId];

  // Create initial entities based on expected types
  if (context?.expectedEntityTypes) {
    for (const entityType of context.expectedEntityTypes) {
      if (entityType !== workspaceType) { // Don't duplicate workspace
        const { entityId } = await addEntityToChatWorkspaceAction({
          chatId,
          entityTypeSlug: entityType,
          title: `${entityType.replace(/[._]/g, ' ')} - ${new Date().toLocaleDateString()}`,
          initialState: context.initialData?.[entityType] || {},
        });
        entityIds.push(entityId);
      }
    }
  }

  logger.info(`Initialized chat ${chatId} with workspace ${workspaceId} and ${entityIds.length - 1} entities`, {
    chatId,
    workspaceId,
    workspaceType,
    entityIds,
    agentId
  });

  return { workspaceId, entityIds };
}

/**
 * Get entity from chat context
 * Looks for entity in chat's workspace by type
 */
export async function getChatEntityByTypeAction({
  chatId,
  entityType,
  createIfMissing = false,
}: {
  chatId: string;
  entityType: string;
  createIfMissing?: boolean;
}): Promise<{ entityId: string | null; entity?: WorkspaceEntity }> {
  const workspace = await getChatWorkspaceAction(chatId);

  if (!workspace) {
    if (createIfMissing) {
      const { workspaceId } = await getOrCreateChatWorkspaceAction({ chatId });
      const { entityId } = await addEntityToChatWorkspaceAction({
        chatId,
        entityTypeSlug: entityType,
      });

      return { entityId };
    }
    return { entityId: null };
  }

  // Look for entity of the requested type
  const entity = workspace.entities.find(e =>
    e.typeSlug === entityType ||
    e.fullSlug === entityType ||
    e.fullSlug.endsWith('.' + entityType)
  );

  if (entity) {
    return { entityId: entity.id, entity };
  }

  if (createIfMissing) {
    const { entityId } = await addEntityToChatWorkspaceAction({
      chatId,
      entityTypeSlug: entityType,
    });

    return { entityId };
  }

  return { entityId: null };
}

/**
 * Clean up workspace for completed/archived chats
 */
export async function archiveChatWorkspaceAction(chatId: string): Promise<{ archived: boolean }> {
  const supabase = await createClient();

  // Get chat workspace
  const workspace = await getChatWorkspaceAction(chatId);

  if (!workspace) {
    return { archived: false };
  }

  // Mark entities as archived by adding metadata
  for (const entity of workspace.entities) {
    await supabase
      .from("entities")
      .update({
        state_json: {
          ...entity.state,
          archived: true,
          archived_at: new Date().toISOString(),
          archived_from_chat: chatId
        }
      })
      .eq("id", entity.id);
  }

  // Clear workspace_id from chat
  await supabase
    .from("ai_chats")
    .update({ workspace_id: null })
    .eq("id", chatId);

  logger.info(`Archived workspace ${workspace.workspaceId} for chat ${chatId}`, {
    chatId,
    workspaceId: workspace.workspaceId,
    entitiesArchived: workspace.entities.length
  });

  return { archived: true };
}

/**
 * Get workspace statistics and health
 */
export async function getWorkspaceStatsAction(workspaceId: string) {
  const entities = await getWorkspaceEntitiesAction(workspaceId);
  const workspace = await getEntityAction(workspaceId);

  const entityTypeCount = entities.reduce((acc, entity) => {
    const type = entity.full_slug || entity.type_slug;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const lastActivity = entities.length > 0
    ? Math.max(...entities.map(e => new Date(e.updated_at).getTime()))
    : new Date(workspace.updated_at).getTime();

  return {
    workspaceId,
    totalEntities: entities.length,
    entityTypes: Object.keys(entityTypeCount),
    entityTypeCount,
    lastActivity: new Date(lastActivity).toISOString(),
    createdAt: workspace.created_at,
    workspaceType: workspace.full_slug || workspace.type_slug,
    isActive: !(workspace.state_json as Record<string, any>)?.archived
  };
}