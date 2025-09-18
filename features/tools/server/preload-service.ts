/**
 * Server-side Tool Data Preload Service
 * Handles fetching and caching of dropdown data for tools
 */

import { cache } from "react";
import { createClient } from "@/utils/supabase/server";
import type {
  LenderOption,
  ProgramOption,
  QualifierOption,
  LoanTermOption,
  StateOption
} from "../types/preload";

// Cache duration in milliseconds (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

// Memory cache for cross-request caching
const memoryCache = new Map<string, { data: any; expiry: number }>();

/**
 * Generic cache wrapper for any data fetcher
 */
function withCache<T>(key: string, fetcher: () => Promise<T>): () => Promise<T> {
  return async () => {
    // Check memory cache first
    const cached = memoryCache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data as T;
    }

    // Fetch fresh data
    const data = await fetcher();

    // Store in memory cache
    memoryCache.set(key, {
      data,
      expiry: Date.now() + CACHE_TTL
    });

    return data;
  };
}

/**
 * Fetch all lenders from database
 * Uses React cache() for request-level deduplication
 */
export const fetchLenders = cache(
  withCache<LenderOption[]>("lenders", async () => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("lenders")
        .select("id, name, description, logo")
        .order("name");

      if (error) throw error;

      return data?.map(lender => ({
        id: lender.id,
        name: lender.name,
        description: lender.description,
        logo: lender.logo
      })) || [];
    } catch (error) {
      console.error("Failed to fetch lenders:", error);
      return [];
    }
  })
);

/**
 * Fetch all programs from database
 */
export const fetchPrograms = cache(
  withCache<ProgramOption[]>("programs", async () => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("programs")
        .select(`
          id,
          name,
          lender_id,
          description,
          lenders(id, name)
        `)
        .order("name");

      if (error) throw error;

      return data?.map(program => ({
        id: program.id,
        name: program.name,
        lenderId: program.lender_id,
        lenderName: program.lenders?.name,
        description: program.description
      })) || [];
    } catch (error) {
      console.error("Failed to fetch programs:", error);
      return [];
    }
  })
);

/**
 * Fetch all qualifiers from database
 */
export const fetchQualifiers = cache(
  withCache<QualifierOption[]>("qualifiers", async () => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("qualifiers")
        .select("id, key, name, category, description")
        .order("category", { ascending: true })
        .order("name", { ascending: true });

      if (error) throw error;

      return data?.filter(q => q.key !== null).map(qualifier => ({
        id: qualifier.id,
        key: qualifier.key as string, // Safe after filtering
        name: qualifier.name,
        category: qualifier.category,
        description: qualifier.description
      })) || [];
    } catch (error) {
      console.error("Failed to fetch qualifiers:", error);
      return [];
    }
  })
);

/**
 * Fetch loan terms (with fallback defaults)
 */
export const fetchLoanTerms = cache(
  withCache<LoanTermOption[]>("loanTerms", async () => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("qualifiers")
        .select("*")
        .eq("key", "loan_term_years")
        .single();

      if (!error && data?.config) {
        const config = typeof data.config === "string"
          ? JSON.parse(data.config)
          : data.config;

        if (config.options) {
          return config.options.map((term: any) => ({
            value: String(term),
            label: `${term} Years`,
            years: parseInt(term)
          }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch loan terms:", error);
    }

    // Return default loan terms
    return [
      { value: "360", label: "30 Years", years: 30 },
      { value: "180", label: "15 Years", years: 15 },
      { value: "240", label: "20 Years", years: 20 },
      { value: "120", label: "10 Years", years: 10 }
    ];
  })
);

/**
 * Fetch US states
 */
export const fetchStates = cache(
  withCache<StateOption[]>("states", async () => {
    // States are static, no need for database fetch
    return [
      { value: "AL", label: "Alabama", code: "AL" },
      { value: "AK", label: "Alaska", code: "AK" },
      { value: "AZ", label: "Arizona", code: "AZ" },
      { value: "AR", label: "Arkansas", code: "AR" },
      { value: "CA", label: "California", code: "CA" },
      { value: "CO", label: "Colorado", code: "CO" },
      { value: "CT", label: "Connecticut", code: "CT" },
      { value: "DE", label: "Delaware", code: "DE" },
      { value: "FL", label: "Florida", code: "FL" },
      { value: "GA", label: "Georgia", code: "GA" },
      { value: "HI", label: "Hawaii", code: "HI" },
      { value: "ID", label: "Idaho", code: "ID" },
      { value: "IL", label: "Illinois", code: "IL" },
      { value: "IN", label: "Indiana", code: "IN" },
      { value: "IA", label: "Iowa", code: "IA" },
      { value: "KS", label: "Kansas", code: "KS" },
      { value: "KY", label: "Kentucky", code: "KY" },
      { value: "LA", label: "Louisiana", code: "LA" },
      { value: "ME", label: "Maine", code: "ME" },
      { value: "MD", label: "Maryland", code: "MD" },
      { value: "MA", label: "Massachusetts", code: "MA" },
      { value: "MI", label: "Michigan", code: "MI" },
      { value: "MN", label: "Minnesota", code: "MN" },
      { value: "MS", label: "Mississippi", code: "MS" },
      { value: "MO", label: "Missouri", code: "MO" },
      { value: "MT", label: "Montana", code: "MT" },
      { value: "NE", label: "Nebraska", code: "NE" },
      { value: "NV", label: "Nevada", code: "NV" },
      { value: "NH", label: "New Hampshire", code: "NH" },
      { value: "NJ", label: "New Jersey", code: "NJ" },
      { value: "NM", label: "New Mexico", code: "NM" },
      { value: "NY", label: "New York", code: "NY" },
      { value: "NC", label: "North Carolina", code: "NC" },
      { value: "ND", label: "North Dakota", code: "ND" },
      { value: "OH", label: "Ohio", code: "OH" },
      { value: "OK", label: "Oklahoma", code: "OK" },
      { value: "OR", label: "Oregon", code: "OR" },
      { value: "PA", label: "Pennsylvania", code: "PA" },
      { value: "RI", label: "Rhode Island", code: "RI" },
      { value: "SC", label: "South Carolina", code: "SC" },
      { value: "SD", label: "South Dakota", code: "SD" },
      { value: "TN", label: "Tennessee", code: "TN" },
      { value: "TX", label: "Texas", code: "TX" },
      { value: "UT", label: "Utah", code: "UT" },
      { value: "VT", label: "Vermont", code: "VT" },
      { value: "VA", label: "Virginia", code: "VA" },
      { value: "WA", label: "Washington", code: "WA" },
      { value: "WV", label: "West Virginia", code: "WV" },
      { value: "WI", label: "Wisconsin", code: "WI" },
      { value: "WY", label: "Wyoming", code: "WY" }
    ];
  })
);

/**
 * Preload all tool data
 * Returns a complete dataset for tool context
 */
export async function preloadToolData() {
  const [lenders, programs, qualifiers, loanTerms, states] = await Promise.all([
    fetchLenders(),
    fetchPrograms(),
    fetchQualifiers(),
    fetchLoanTerms(),
    fetchStates()
  ]);

  return {
    lenders,
    programs,
    qualifiers,
    loanTerms,
    states
  };
}

/**
 * Clear the memory cache (useful for testing or manual refresh)
 */
export function clearCache() {
  memoryCache.clear();
}