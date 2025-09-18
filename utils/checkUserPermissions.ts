/**
 * User Permission Utilities
 */

import type { UserProfileWithCurrentTenant } from "@/lib/profiles";

/**
 * Check if a user is a system admin
 */
export function checkSystemAdmin(userProfile: UserProfileWithCurrentTenant | null): boolean {
  if (!userProfile) return false;

  // Check if user has admin role in any tenant
  const hasAdminRole = userProfile.user_tenants?.some(
    (ut) => ut.role === 'admin' || ut.role === 'owner'
  ) ?? false;

  return hasAdminRole;
}

/**
 * Check if a user has a specific role in their current tenant
 */
export function checkUserRole(
  userProfile: UserProfileWithCurrentTenant | null,
  role: string
): boolean {
  if (!userProfile || !userProfile.current_tenant_id) return false;

  const current_tenantRole = userProfile.user_tenants?.find(
    (ut) => ut.tenant_id === userProfile.current_tenant_id
  );

  return current_tenantRole?.role === role;
}

/**
 * Check if a user has access to a specific tenant
 */
export function checkTenantAccess(
  userProfile: UserProfileWithCurrentTenant | null,
  tenantId: number
): boolean {
  if (!userProfile) return false;

  return userProfile.user_tenants?.some(
    (ut) => ut.tenant_id === tenantId
  ) ?? false;
}