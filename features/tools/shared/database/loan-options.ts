/**
 * Shared database utilities for loading loan options dynamically
 */

import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export interface LoanTermOption {
  value: string;
  label: string;
  years: number;
}

export interface StateOption {
  value: string;
  label: string;
  code: string;
}

/**
 * Get loan terms from database with fallback to defaults
 */
export const getLoanTerms = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("qualifiers")
    .select("*")
    .eq("key", "loan_term_years")
    .single();

  if (error || !data?.config) {
    console.log("Using default loan terms");
    return getDefaultLoanTerms();
  }

  try {
    const config = typeof data.config === "string" ? JSON.parse(data.config) : data.config;
    if (config.options) {
      return config.options.map((term: any) => ({
        value: term.toString(),
        label: `${term} Years`,
        years: parseInt(term)
      }));
    }
  } catch (e) {
    console.error("Failed to parse loan terms config:", e);
  }

  return getDefaultLoanTerms();
});

/**
 * Get US states list from database with fallback to defaults
 */
export const getStates = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("qualifiers")
    .select("*")
    .eq("key", "state")
    .single();

  if (error || !data?.config) {
    console.log("Using default states list");
    return getDefaultStates();
  }

  try {
    const config = typeof data.config === "string" ? JSON.parse(data.config) : data.config;
    if (config.options) {
      return config.options.map((state: any) => ({
        value: typeof state === 'string' ? state : state.code,
        label: typeof state === 'string' ? state : state.name,
        code: typeof state === 'string' ? state : state.code
      }));
    }
  } catch (e) {
    console.error("Failed to parse states config:", e);
  }

  return getDefaultStates();
});

/**
 * Get recipient types for emails from database
 */
export const getEmailRecipientTypes = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("qualifiers")
    .select("*")
    .eq("category", "email_recipient_type")
    .order("name");

  if (error || !data || data.length === 0) {
    console.log("Using default email recipient types");
    return getDefaultEmailRecipientTypes();
  }

  return data.map(item => ({
    value: item.key || item.name.toLowerCase().replace(/\s+/g, "_"),
    label: item.name,
    description: item.description
  }));
});

/**
 * Get email purposes from database
 */
export const getEmailPurposes = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("qualifiers")
    .select("*")
    .eq("category", "email_purpose")
    .order("name");

  if (error || !data || data.length === 0) {
    console.log("Using default email purposes");
    return getDefaultEmailPurposes();
  }

  return data.map(item => ({
    value: item.key || item.name.toLowerCase().replace(/\s+/g, "_"),
    label: item.name,
    description: item.description
  }));
});

/**
 * Get email tones from database
 */
export const getEmailTones = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("qualifiers")
    .select("*")
    .eq("category", "email_tone")
    .order("name");

  if (error || !data || data.length === 0) {
    console.log("Using default email tones");
    return getDefaultEmailTones();
  }

  return data.map(item => ({
    value: item.key || item.name.toLowerCase().replace(/\s+/g, "_"),
    label: item.name,
    description: item.description
  }));
});

/**
 * Default loan terms fallback
 */
export const getDefaultLoanTerms = (): LoanTermOption[] => [
  { value: "15", label: "15 Years", years: 15 },
  { value: "20", label: "20 Years", years: 20 },
  { value: "30", label: "30 Years", years: 30 },
  { value: "40", label: "40 Years", years: 40 }
];

/**
 * Default US states fallback
 */
export const getDefaultStates = (): StateOption[] => [
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

/**
 * Default email recipient types fallback
 */
export const getDefaultEmailRecipientTypes = () => [
  { value: "borrower", label: "Borrower", description: "Individual applying for a loan" },
  { value: "real_estate_agent", label: "Real Estate Agent", description: "Agent representing buyer/seller" },
  { value: "underwriter", label: "Underwriter", description: "Loan underwriter" },
  { value: "processor", label: "Processor", description: "Loan processor" },
  { value: "appraiser", label: "Appraiser", description: "Property appraiser" },
  { value: "title_company", label: "Title Company", description: "Title insurance company" },
  { value: "insurance_agent", label: "Insurance Agent", description: "Property insurance agent" },
  { value: "vendor", label: "Vendor", description: "Third-party service provider" },
  { value: "other", label: "Other", description: "Other recipient type" }
];

/**
 * Default email purposes fallback
 */
export const getDefaultEmailPurposes = () => [
  { value: "initial_inquiry", label: "Initial Inquiry", description: "First contact or inquiry" },
  { value: "follow_up", label: "Follow Up", description: "Following up on previous communication" },
  { value: "document_request", label: "Document Request", description: "Requesting documentation" },
  { value: "status_update", label: "Status Update", description: "Providing status update" },
  { value: "approval_notification", label: "Approval Notification", description: "Loan approval notification" },
  { value: "denial_notification", label: "Denial Notification", description: "Loan denial notification" },
  { value: "closing_coordination", label: "Closing Coordination", description: "Coordinating closing details" },
  { value: "pre_approval", label: "Pre-approval", description: "Pre-approval related communication" },
  { value: "rate_quote", label: "Rate Quote", description: "Providing rate quotes" },
  { value: "marketing", label: "Marketing", description: "Marketing communication" },
  { value: "other", label: "Other", description: "Other purpose" }
];

/**
 * Default email tones fallback
 */
export const getDefaultEmailTones = () => [
  { value: "professional", label: "Professional", description: "Formal business communication" },
  { value: "friendly", label: "Friendly", description: "Warm and approachable tone" },
  { value: "urgent", label: "Urgent", description: "Time-sensitive communication" },
  { value: "formal", label: "Formal", description: "Very formal and structured" },
  { value: "casual", label: "Casual", description: "Relaxed and informal" },
  { value: "empathetic", label: "Empathetic", description: "Understanding and supportive" }
];