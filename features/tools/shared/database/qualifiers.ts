/**
 * Shared database utilities for loading qualifiers dynamically
 */

import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export interface QualifierOption {
  id: number;
  name: string;
  key: string | null;
  category: string | null;
  description: string | null;
}

export interface QualifierConfig {
  minValue?: number;
  maxValue?: number;
  options?: string[];
  step?: number;
  unit?: string;
}

/**
 * Get all qualifiers from database with caching
 */
export const getQualifiers = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("qualifiers")
    .select("*")
    .order("name");

  if (error) {
    console.error("Failed to load qualifiers:", error);
    return [];
  }

  return data as QualifierOption[];
});

/**
 * Get qualifiers by category
 */
export const getQualifiersByCategory = cache(async (category: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("qualifiers")
    .select("*")
    .eq("category", category)
    .order("name");

  if (error) {
    console.error("Failed to load qualifiers by category:", error);
    return [];
  }

  return data as QualifierOption[];
});

/**
 * Get common loan qualifiers for forms
 */
export const getCommonLoanQualifiers = cache(async () => {
  const qualifiers = await getQualifiers();

  // Common qualifier keys used in loan searches
  const commonKeys = [
    "credit_score",
    "ltv",
    "dti",
    "loan_amount",
    "property_value",
    "down_payment",
    "property_type",
    "occupancy",
    "loan_purpose",
    "income_type"
  ];

  return qualifiers.filter(q => q.key && commonKeys.includes(q.key));
});

/**
 * Get property types from qualifiers
 */
export const getPropertyTypes = cache(async () => {
  const qualifiers = await getQualifiersByCategory("property_type");
  return qualifiers.map(q => ({
    value: q.key || q.name.toLowerCase().replace(/\s+/g, "_"),
    label: q.name,
    description: q.description || undefined
  }));
});

/**
 * Get occupancy types from qualifiers
 */
export const getOccupancyTypes = cache(async () => {
  const qualifiers = await getQualifiersByCategory("occupancy");
  return qualifiers.map(q => ({
    value: q.key || q.name.toLowerCase().replace(/\s+/g, "_"),
    label: q.name,
    description: q.description || undefined
  }));
});

/**
 * Get loan purposes from qualifiers
 */
export const getLoanPurposes = cache(async () => {
  const qualifiers = await getQualifiersByCategory("loan_purpose");
  return qualifiers.map(q => ({
    value: q.key || q.name.toLowerCase().replace(/\s+/g, "_"),
    label: q.name,
    description: q.description || undefined
  }));
});

/**
 * Get income types from qualifiers
 */
export const getIncomeTypes = cache(async () => {
  const qualifiers = await getQualifiersByCategory("income_type");
  return qualifiers.map(q => ({
    value: q.key || q.name.toLowerCase().replace(/\s+/g, "_"),
    label: q.name,
    description: q.description || undefined
  }));
});

/**
 * Parse qualifier config for form field generation
 */
export function parseQualifierConfig(config: any): QualifierConfig {
  if (!config) return {};

  // Handle JSON config from database
  if (typeof config === "string") {
    try {
      config = JSON.parse(config);
    } catch {
      return {};
    }
  }

  return {
    minValue: config.min_value || config.minValue,
    maxValue: config.max_value || config.maxValue,
    options: config.options || config.enum,
    step: config.step,
    unit: config.unit
  };
}

/**
 * Get default values for common qualifiers
 */
export const getDefaultQualifierValues = () => ({
  credit_score: 720,
  ltv: 80,
  dti: 43,
  loan_amount: 400000,
  property_value: 500000,
  down_payment: 100000,
  property_type: "single_family",
  occupancy: "primary_residence",
  loan_purpose: "purchase",
  income_type: "w2"
});