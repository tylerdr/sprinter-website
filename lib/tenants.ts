/**
 * Tenant configuration and utilities
 */

import { createClient } from "@/lib/supabase/server";

export interface TenantConfig {
  id: number;
  name: string;
  slug: string;
  settings?: any;
  features?: {
    [key: string]: boolean;
  };
  ai_entitlements?: {
    enabled_agent_slugs?: string[];
    [key: string]: any;
  };
}

/**
 * Get tenant configuration
 */
export async function getTenantConfig(
  tenantId: number | undefined
): Promise<TenantConfig | null> {
  if (!tenantId) return null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', tenantId)
    .single();

  if (error || !data) {
    console.error('Error fetching tenant config:', error);
    return null;
  }

  return data as TenantConfig;
}