/**
 * User Profile Types and Functions
 */

import { createClient } from "@/utils/supabase/server";

export interface UserProfileWithCurrentTenant {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  current_tenant_id?: number;
  current_tenant?: {
    id: number;
    name: string;
    slug: string;
  };
  user_tenants?: Array<{
    tenant_id: number;
    role: string;
    tenant?: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
}

/**
 * Get user profile with current tenant information
 */
export async function getUserProfileWithCurrentTenant(): Promise<UserProfileWithCurrentTenant | null> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  // Get user profile with tenant relationships
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select(`
      id,
      email,
      full_name,
      avatar_url,
      current_tenant_id,
      current_tenant:tenants!current_tenant_id(
        id,
        name,
        slug
      ),
      user_tenants(
        tenant_id,
        role,
        tenant:tenants(
          id,
          name,
          slug
        )
      )
    `)
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    // Return minimal profile if database query fails
    return {
      id: user.id,
      email: user.email || '',
    };
  }

  return {
    ...profile,
    current_tenant: Array.isArray(profile.current_tenant) ? profile.current_tenant[0] : profile.current_tenant,
    user_tenants: profile.user_tenants?.map((ut: any) => ({
      ...ut,
      tenant: Array.isArray(ut.tenant) ? ut.tenant[0] : ut.tenant
    })) || []
  } as UserProfileWithCurrentTenant;
}

export type { UserProfileWithCurrentTenant as UserProfile };