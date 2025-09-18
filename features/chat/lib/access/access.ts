import { getTenantConfig } from "@/lib/tenants";
import {
  getUserProfileWithCurrentTenant,
  UserProfileWithCurrentTenant
} from "@/lib/profiles";
import {
  AGENTS_ROLLING_OUT,
  PUBLICALLY_AVAILABLE_AGENTS
} from "../../constants";
import { checkSystemAdmin } from "@/utils/checkUserPermissions";

export interface TenantAgentEntitlements {
  allowedAgentSlugs: string[];
}

/**
 * Compute which agents are available for the current user's active tenant.
 * Optionally pass a tenant config override to avoid extra lookups.
 */
export async function getTenantAgentEntitlements(
  providedUser?: UserProfileWithCurrentTenant | null
): Promise<{
  entitlements: TenantAgentEntitlements;
  userProfile: UserProfileWithCurrentTenant | null;
}> {
  const baseAgents = PUBLICALLY_AVAILABLE_AGENTS;

  try {
    const currentUser =
      providedUser ?? (await getUserProfileWithCurrentTenant());
    const isSystemAdmin = checkSystemAdmin(currentUser);
    const cfg = await getTenantConfig(currentUser?.current_tenant?.id);

    const tenantAgentEntitledSlugs =
      cfg?.ai_entitlements?.enabled_agent_slugs ?? [];

    return {
      entitlements: {
        allowedAgentSlugs: [
          ...baseAgents,
          ...tenantAgentEntitledSlugs,
          ...(isSystemAdmin ? AGENTS_ROLLING_OUT : [])
        ]
      },
      userProfile: currentUser
    };
  } catch {
    return {
      entitlements: { allowedAgentSlugs: baseAgents },
      userProfile: null
    };
  }
}
