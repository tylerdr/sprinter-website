/**
 * Shared database utilities for loading lenders dynamically
 */

import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export interface LenderOption {
  id: number;
  name: string;
  description: string | null;
  tenantId: string | null;
}

/**
 * Get all lenders from database with caching
 */
export const getLenders = cache(async (tenantId?: string) => {
  const supabase = await createClient();

  let query = supabase
    .from("lenders")
    .select("id, name, description")
    .order("name");

  // Filter by tenant if provided
  // Tenant filtering removed for now
  // if (tenantId) {
  //   query = query.eq("tenant_id", tenantId);
  // }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to load lenders:", error);
    return [];
  }

  return data?.map(lender => ({
    id: lender.id,
    name: lender.name,
    description: lender.description,
    tenantId: null
  })) || [];
});

/**
 * Get a single lender by ID
 */
export const getLenderById = cache(async (lenderId: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lenders")
    .select("*")
    .eq("id", lenderId)
    .single();

  if (error) {
    console.error("Failed to load lender:", error);
    return null;
  }

  return data;
});

/**
 * Get lenders with program counts
 */
export const getLendersWithProgramCounts = cache(async (tenantId?: string) => {
  const supabase = await createClient();

  let query = supabase
    .from("lenders")
    .select(`
      id,
      name,
      description,
      programs(count)
    `)
    .order("name");

  // Tenant filtering removed for now
  // if (tenantId) {
  //   query = query.eq("tenant_id", tenantId);
  // }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to load lenders with program counts:", error);
    return [];
  }

  return data?.map(lender => ({
    id: lender.id,
    name: lender.name,
    description: lender.description,
    tenantId: null,
    programCount: lender.programs?.[0]?.count || 0
  })) || [];
});

/**
 * Search lenders by name or description
 */
export const searchLenders = cache(async (searchTerm: string, tenantId?: string) => {
  const supabase = await createClient();

  let query = supabase
    .from("lenders")
    .select("id, name, description")
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .limit(10);

  // Tenant filtering removed for now
  // if (tenantId) {
  //   query = query.eq("tenant_id", tenantId);
  // }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to search lenders:", error);
    return [];
  }

  return data?.map(lender => ({
    id: lender.id,
    name: lender.name,
    description: lender.description,
    tenantId: null
  })) || [];
});

/**
 * Get default/fallback lender options
 */
export const getDefaultLenderOptions = () => [
  { id: 1, name: "Wells Fargo", description: "Major national bank" },
  { id: 2, name: "Bank of America", description: "Full-service banking" },
  { id: 3, name: "Chase", description: "National bank and mortgage lender" },
  { id: 4, name: "Quicken Loans", description: "Online mortgage specialist" },
  { id: 5, name: "Rocket Mortgage", description: "Digital mortgage platform" }
];