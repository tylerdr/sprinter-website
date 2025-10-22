"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserProfileWithCurrentTenant } from "@/lib/profiles";
import { entityRegistry } from "@/features/entities/registry";
import { logger } from "@/lib/logger";

export type EntityPatch = Record<string, any>;

export async function createOrAttachEntityAction({
  typeSlug,
  chatId,
  title,
  initialState,
  namespace,
  workspaceId,
}: {
  typeSlug: string;
  chatId?: string | null;
  title?: string;
  initialState?: Record<string, any>;
  namespace?: string;
  workspaceId?: string | null;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const userProfile = await getUserProfileWithCurrentTenant();

  // Initialize entity registry
  await entityRegistry.initialize();

  // Reuse existing entity bound to chat if present
  if (chatId) {
    const { data: existing } = await supabase
      .from("ai_chats")
      .select("workspace_id")
      .eq("id", chatId)
      .maybeSingle();
    if (existing?.workspace_id) return { entityId: existing.workspace_id as string };
  }

  // Resolve full slug with namespace
  const entityType = entityRegistry.getEntityType(typeSlug);
  const fullSlug = entityType ? `${entityType.namespace || ''}.${typeSlug}`.replace(/^\.|\.$/, '') : typeSlug;

  // Validate initial state if entity type has schema
  if (entityType && initialState) {
    const validation = entityRegistry.validateEntityState(fullSlug, initialState);
    if (!validation.valid) {
      logger.warn("Entity state validation failed", { typeSlug, errors: validation.errors });
    }
  }

  // Create new entity
  const { data: ent, error } = await supabase
    .from("entities")
    .insert({
      type_slug: typeSlug,
      user_id: user.id,
      tenant_id: userProfile?.current_tenant?.id || null,
      title: title ?? `${typeSlug.replace(/_/g, " ")} ${new Date().toLocaleString()}`,
      state_json: initialState ?? {},
      namespace: namespace || entityType?.namespace || null,
      full_slug: fullSlug,
      workspace_id: workspaceId || null,
      is_root_workspace: entityType?.isWorkspace || false,
    })
    .select("id")
    .single();

  if (error) throw error;

  // Attach to chat if provided
  if (chatId) {
    await supabase.from("ai_chats").update({ workspace_id: ent.id }).eq("id", chatId);
  }

  return { entityId: ent.id as string };
}

export async function getEntityAction(entityId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("entities")
    .select("id, type_slug, title, state_json, state_version, tenant_id, full_slug, namespace, created_at, updated_at")
    .eq("id", entityId)
    .single();
  if (error) throw error;
  return data;
}

export async function applyEntityPatchAction({
  entityId,
  expectedVersion,
  patch,
  upsertTitle,
  validateSchema = true,
}: {
  entityId: string;
  expectedVersion?: number;
  patch: EntityPatch;
  upsertTitle?: string;
  validateSchema?: boolean;
}) {
  const supabase = await createClient();

  // Server-side merge (deep merge for nested objects)
  const { data: ent } = await supabase
    .from("entities")
    .select("state_json, state_version, type_slug, namespace, full_slug")
    .eq("id", entityId)
    .single();

  if (!ent) throw new Error("Entity not found");

  // Optional optimistic locking - only check if expectedVersion is provided
  if (expectedVersion !== undefined && ent.state_version !== expectedVersion) {
    const err: any = new Error(`Version mismatch: expected ${expectedVersion}, got ${ent.state_version}`);
    err.status = 409;
    throw err;
  }

  // Validate patch against entity schema if requested
  if (validateSchema) {
    await entityRegistry.initialize();
    const entitySlug = ent.full_slug || ent.type_slug;
    const merged = deepMerge(ent.state_json ?? {}, patch ?? {});
    const validation = entityRegistry.validateEntityState(entitySlug, merged);

    if (!validation.valid) {
      logger.warn("Entity patch validation failed", {
        entityId,
        entitySlug,
        errors: validation.errors
      });
      // Don't throw - just log warning for now
    }
  }

  const merged = deepMerge(ent.state_json ?? {}, patch ?? {});
  const nextVersion = (ent.state_version ?? 1) + 1;

  const updateData: any = {
    state_json: merged,
    state_version: nextVersion,
    updated_at: new Date().toISOString(),
  };

  if (upsertTitle) {
    updateData.title = upsertTitle;
  }

  // Build update query with optional optimistic lock
  let updateQuery = supabase
    .from("entities")
    .update(updateData)
    .eq("id", entityId);

  // Only add version check if expectedVersion was provided
  if (expectedVersion !== undefined) {
    updateQuery = updateQuery.eq("state_version", expectedVersion);
  }

  const { error } = await updateQuery;

  if (error) throw error;
  return { ok: true as const, newVersion: nextVersion, state: merged };
}

export async function createArtifactAction({
  entityId,
  kind,
  title,
  data,
  meta,
}: {
  entityId: string;
  kind: string;
  title: string;
  data: Record<string, any>;
  meta?: Record<string, any>;
}) {
  const supabase = await createClient();
  const { data: row, error } = await supabase
    .from("ai_artifacts")
    .insert({
      entity_id: entityId,
      kind,
      title,
      data_json: data ?? {},
      meta_json: meta ?? {},
    })
    .select("id")
    .single();
  if (error) throw error;
  return { artifactId: row.id as string };
}

export async function getArtifactsAction(entityId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ai_artifacts")
    .select("id, kind, title, data_json, meta_json, created_at")
    .eq("entity_id", entityId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getArtifactAction(artifactId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ai_artifacts")
    .select("id, entity_id, kind, title, data_json, meta_json, created_at")
    .eq("id", artifactId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateArtifactAction({
  artifactId,
  title,
  data,
  meta,
}: {
  artifactId: string;
  title?: string;
  data?: Record<string, any>;
  meta?: Record<string, any>;
}) {
  const supabase = await createClient();

  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (title !== undefined) updateData.title = title;
  if (data !== undefined) updateData.data_json = data;
  if (meta !== undefined) updateData.meta_json = meta;

  const { error } = await supabase
    .from("ai_artifacts")
    .update(updateData)
    .eq("id", artifactId);

  if (error) throw error;
  return { ok: true as const };
}

export async function deleteArtifactAction(artifactId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("ai_artifacts")
    .delete()
    .eq("id", artifactId);

  if (error) throw error;
  return { ok: true as const };
}

// Helper function for deep merging objects
function deepMerge(target: any, source: any): any {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}

function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

// ============================================
// WORKSPACE MANAGEMENT ACTIONS
// ============================================

export async function createWorkspaceAction({
  workspaceType = 'workspace',
  title,
  description,
}: {
  workspaceType?: string;
  title?: string;
  description?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const userProfile = await getUserProfileWithCurrentTenant();
  await entityRegistry.initialize();

  // Create workspace entity
  const { data: workspace, error } = await supabase
    .rpc('create_workspace_entity', {
      p_user_id: user.id,
      p_tenant_id: userProfile?.current_tenant?.id || undefined,
      p_title: title || 'New Workspace',
      p_workspace_type: workspaceType
    });

  if (error) throw error;

  // Update with description if provided
  if (description) {
    await applyEntityPatchAction({
      entityId: workspace,
      patch: { description },
    });
  }

  return { workspaceId: workspace };
}

export async function attachEntityToWorkspaceAction({
  entityId,
  workspaceId,
}: {
  entityId: string;
  workspaceId: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .rpc('attach_entity_to_workspace', {
      p_entity_id: entityId,
      p_workspace_id: workspaceId
    });

  if (error) throw error;
  return { ok: true as const };
}

export async function getWorkspaceEntitiesAction(workspaceId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("entities")
    .select("id, type_slug, title, state_json, namespace, full_slug, created_at, updated_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// ============================================
// ENTITY TYPE MANAGEMENT ACTIONS
// ============================================

export async function getEntityTypesAction(namespace?: string) {
  await entityRegistry.initialize();

  if (namespace) {
    return entityRegistry.getEntityTypesByNamespace(namespace);
  }

  return entityRegistry.getAllTypes();
}

export async function validateEntityStateAction({
  entitySlug,
  state,
}: {
  entitySlug: string;
  state: any;
}) {
  await entityRegistry.initialize();

  return entityRegistry.validateEntityState(entitySlug, state);
}

export async function getToolEntityMappingsAction(toolSlug: string) {
  await entityRegistry.initialize();

  return entityRegistry.getEntitiesForTool(toolSlug);
}

export async function canToolAccessEntityAction({
  toolSlug,
  entitySlug,
  accessType,
  field,
}: {
  toolSlug: string;
  entitySlug: string;
  accessType: 'read' | 'write';
  field?: string;
}) {
  await entityRegistry.initialize();

  if (accessType === 'read') {
    return {
      canAccess: entityRegistry.canToolReadFromEntity(toolSlug, entitySlug, field),
      requiredFields: entityRegistry.getRequiredFieldsForTool(toolSlug, entitySlug)
    };
  } else {
    return {
      canAccess: entityRegistry.canToolWriteToEntity(toolSlug, entitySlug, field)
    };
  }
}

// ============================================
// ENTITY QUERYING ACTIONS
// ============================================

export async function findEntitiesByTypeAction({
  typeSlug,
  namespace,
  workspaceId,
}: {
  typeSlug: string;
  namespace?: string;
  workspaceId?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  let query = supabase
    .from("entities")
    .select("id, type_slug, title, state_json, namespace, full_slug, workspace_id, created_at, updated_at")
    .eq("user_id", user.id)
    .eq("type_slug", typeSlug);

  if (namespace) {
    query = query.eq("namespace", namespace);
  }

  if (workspaceId) {
    query = query.eq("workspace_id", workspaceId);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getUserWorkspacesAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("entities")
    .select("id, title, state_json, namespace, full_slug, created_at, updated_at")
    .eq("user_id", user.id)
    .eq("is_root_workspace", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}