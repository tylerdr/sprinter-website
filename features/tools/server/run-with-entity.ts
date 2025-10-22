"use server";

import { createClient } from "@/lib/supabase/server";
import { sprinterToolRegistry as toolRegistry } from "@/features/tools/registry";
import { entityRegistry } from "@/features/entities/registry";
import type { ToolContext } from "@/features/tools/types";
import {
  applyEntityPatchAction,
  createArtifactAction,
  getEntityAction,
  canToolAccessEntityAction
} from "@/features/entities/server/actions";
import { getUserProfileWithCurrentTenant } from "@/lib/profiles";
import { preloadToolData } from "@/features/tools/server/preload-service";
import { getOrCreateChatWorkspaceAction, getChatEntityByTypeAction } from "@/features/entities/server/workspace-service";
import { logger } from "@/lib/logger";

export async function runToolWithEntityAction({
  slug,
  values,
  entityId,
  persist = true,
  validateAccess = true,
}: {
  slug: string;
  values: any;
  entityId?: string | null;
  persist?: boolean;
  validateAccess?: boolean;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userProfile = await getUserProfileWithCurrentTenant();

  await toolRegistry.initialize({ loadFromDatabase: true });
  await entityRegistry.initialize();

  const toolCheck = await toolRegistry.getTool(slug);
  if (!toolCheck) return { ok: false as const, error: "Tool not found" };

  let entityState: Record<string, any> = {};
  let entityVersion: number = 1;
  let entitySlug: string | undefined;

  if (entityId) {
    const ent = await getEntityAction(entityId);
    entityState = (ent.state_json && typeof ent.state_json === 'object' && !Array.isArray(ent.state_json))
      ? ent.state_json as Record<string, any>
      : {};
    entityVersion = ent.state_version ?? 1;
    entitySlug = ent.full_slug || ent.type_slug;

    // Validate tool can access this entity if validation is enabled
    if (validateAccess && entitySlug) {
      const readAccess = await canToolAccessEntityAction({
        toolSlug: slug,
        entitySlug,
        accessType: 'read'
      });

      if (!readAccess.canAccess) {
        logger.warn(`Tool ${slug} denied read access to entity ${entitySlug}`, {
          toolSlug: slug,
          entitySlug,
          entityId
        });
        return {
          ok: false as const,
          error: `Tool ${slug} is not authorized to read from entity ${entitySlug}`
        };
      }

      // Check required fields are present
      const missingFields = readAccess.requiredFields?.filter(field =>
        !entityState[field] && entityState[field] !== 0 && entityState[field] !== false
      ) || [];

      if (missingFields.length > 0) {
        logger.warn(`Entity ${entitySlug} missing required fields for tool ${slug}`, {
          toolSlug: slug,
          entitySlug,
          missingFields
        });
        return {
          ok: false as const,
          error: `Entity is missing required fields: ${missingFields.join(', ')}`
        };
      }
    }
  }

  // Preload data for context
  const preloadedData = await preloadToolData();

  const ctx: ToolContext = {
    userId: user?.id ?? undefined,
    tenantId: userProfile?.current_tenant?.id,
    entityId: entityId || undefined,
    entitySlug,
    entityState,
    preloaded: {
      fieldOptions: {
        "/lenderId": preloadedData.lenders.map(l => ({ value: String(l.id), label: l.name })),
        "/programId": preloadedData.programs.map(p => ({ value: String(p.id), label: p.name })),
        "/qualifiers": preloadedData.qualifiers.map(q => ({ value: q.key, label: q.name })),
        "/loanTerms": preloadedData.loanTerms.map(t => ({ value: t.value, label: t.label })),
        "/states": preloadedData.states.map(s => ({ value: s.value, label: s.label }))
      },
      datasets: {
        lenders: preloadedData.lenders,
        programs: preloadedData.programs,
        qualifiers: preloadedData.qualifiers,
        entity: entityState
      } as Record<string, any>
    },
    getOptions: (path: string) => {
      const options = ctx.preloaded.fieldOptions[path];
      return options || [];
    },
    getDataset: <T = unknown>(key: string): T[] => {
      const dataset = ctx.preloaded.datasets[key] as T[] | undefined;
      return dataset || [];
    },
    getEntityValue: (path: string) => {
      const keys = path.split('.');
      let value = entityState;
      for (const key of keys) {
        value = value?.[key];
        if (value === undefined) break;
      }
      return value;
    }
  };

  // Get and execute the tool
  const tool = await toolRegistry.getTool(slug);
  if (!tool) {
    return { ok: false as const, error: `Tool not found: ${slug}` };
  }

  let execResult: any;
  try {
    execResult = await tool.execute(values, ctx);
  } catch (error) {
    return { ok: false as const, error: error instanceof Error ? error.message : "Execution failed" };
  }

  // Check if tool returned artifacts or patches
  const toolResult = execResult;

  if (persist && entityId && entitySlug && toolResult) {
    // Validate write access before persisting
    if (validateAccess) {
      const writeAccess = await canToolAccessEntityAction({
        toolSlug: slug,
        entitySlug,
        accessType: 'write'
      });

      if (!writeAccess.canAccess) {
        logger.warn(`Tool ${slug} denied write access to entity ${entitySlug}`, {
          toolSlug: slug,
          entitySlug,
          entityId
        });
        return {
          ok: false as const,
          error: `Tool ${slug} is not authorized to write to entity ${entitySlug}`
        };
      }
    }

    // If tool returns patch data
    if (toolResult.patch) {
      await applyEntityPatchAction({
        entityId,
        expectedVersion: entityVersion,
        patch: toolResult.patch,
        validateSchema: true,
      });
    }

    // If tool returns artifacts
    if (toolResult.artifacts && Array.isArray(toolResult.artifacts)) {
      for (const artifact of toolResult.artifacts) {
        await createArtifactAction({
          entityId,
          kind: artifact.kind || 'document',
          title: artifact.title || 'Untitled',
          data: artifact.data || {},
          meta: artifact.meta,
        });
      }
    }

    // Special handling for lender search results
    if (toolResult.eligible_lenders || toolResult.missed_lenders) {
      const patch = {
        eligible_lenders: toolResult.eligible_lenders,
        missed_lenders: toolResult.missed_lenders,
        last_search: {
          timestamp: new Date().toISOString(),
          criteria: values,
          tool_used: slug
        }
      };

      await applyEntityPatchAction({
        entityId,
        expectedVersion: entityVersion,
        patch,
        validateSchema: false, // Skip validation for search results
      });

      // Create eligibility report artifact
      if (toolResult.eligible_lenders || toolResult.missed_lenders) {
        await createArtifactAction({
          entityId,
          kind: "eligibility_report",
          title: `Eligibility Report - ${new Date().toLocaleDateString()}`,
          data: {
            eligible: toolResult.eligible_lenders || [],
            missed: toolResult.missed_lenders || []
          },
          meta: {
            summary: `Eligible: ${toolResult.eligible_lenders?.length || 0} • Missed: ${toolResult.missed_lenders?.length || 0}`,
            run_at: new Date().toISOString()
          }
        });
      }
    }
  }

  // Log tool execution for lineage
  await supabase.from("ai_tool_events").insert({
    user_id: user?.id ?? null,
    tool_slug: slug,
    input: values,
    output: execResult ?? null,
    entity_id: entityId ?? null,
    tenant_id: userProfile?.current_tenant?.id ?? null,
    metadata: {
      entity_slug: entitySlug,
      validation_enabled: validateAccess,
      execution_context: 'entity-aware'
    }
  });

  logger.info(`Tool ${slug} executed successfully`, {
    toolSlug: slug,
    entityId,
    entitySlug,
    success: true
  });

  return { ok: true as const, data: execResult ?? null };
}

/**
 * Run tool with automatic workspace management
 * This function implements the workspace pattern by automatically creating/managing entities
 */
export async function runToolWithWorkspaceAction({
  slug,
  values,
  chatId,
  expectedEntityType,
  createEntityIfMissing = true,
  persist = true,
  validateAccess = true,
}: {
  slug: string;
  values: any;
  chatId: string;
  expectedEntityType?: string;
  createEntityIfMissing?: boolean;
  persist?: boolean;
  validateAccess?: boolean;
}) {
  await entityRegistry.initialize();

  // Determine entity type from tool mappings if not provided
  let entityType = expectedEntityType;

  if (!entityType) {
    const toolMappings = entityRegistry.getEntitiesForTool(slug);
    if (toolMappings.length > 0) {
      // Use the first mapped entity type
      entityType = toolMappings[0].entitySlug;
    } else {
      // Default to loan scenario for mortgage tools
      entityType = 'loan.scenario';
    }
  }

  // Get or create entity in chat workspace
  const { entityId } = await getChatEntityByTypeAction({
    chatId,
    entityType,
    createIfMissing: createEntityIfMissing,
  });

  if (!entityId) {
    return {
      ok: false as const,
      error: `No entity of type ${entityType} found for chat and creation disabled`
    };
  }

  // Run tool with entity
  const result = await runToolWithEntityAction({
    slug,
    values,
    entityId,
    persist,
    validateAccess,
  });

  logger.info(`Tool ${slug} executed with workspace pattern`, {
    chatId,
    entityId,
    entityType,
    success: result.ok
  });

  return result;
}