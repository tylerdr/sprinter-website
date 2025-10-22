/**
 * Shared database utilities for loading dynamic wizard configurations
 */

import { createClient } from "@/lib/supabase/server";
import { cache } from "react";
import {
  getPropertyTypes,
  getOccupancyTypes,
  getLoanPurposes,
  getIncomeTypes
} from "./qualifiers";

export interface WizardField {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "radio" | "checkbox" | "date";
  required: boolean;
  options?: Array<{
    value: string;
    label: string;
  }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  helpText?: string;
  defaultValue?: any;
  conditional?: {
    dependsOn: string;
    showWhen: any;
  };
}

export interface WizardStep {
  key: string;
  title: string;
  description: string;
  fields: WizardField[];
  order: number;
}

/**
 * Get wizard configuration from database with fallback to defaults
 */
export const getWizardConfig = cache(async (wizardType = "loan_qualifier") => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("qualifiers")
    .select("*")
    .eq("category", "wizard_config")
    .eq("key", wizardType)
    .single();

  if (error || !data?.config) {
    console.log("Using default wizard configuration");
    return await getDefaultWizardConfig();
  }

  try {
    const config = typeof data.config === "string" ? JSON.parse(data.config) : data.config;

    // Load dynamic options for select fields
    for (const step of config.steps) {
      for (const field of step.fields) {
        if (field.type === "select" && field.dynamicOptions) {
          field.options = await loadDynamicOptions(field.dynamicOptions);
        }
      }
    }

    return config.steps as WizardStep[];
  } catch (e) {
    console.error("Failed to parse wizard config:", e);
    return await getDefaultWizardConfig();
  }
});

/**
 * Load dynamic options based on qualifier type
 */
async function loadDynamicOptions(optionType: string): Promise<Array<{ value: string; label: string }>> {
  switch (optionType) {
    case "property_types":
      return await getPropertyTypes();
    case "occupancy_types":
      return await getOccupancyTypes();
    case "loan_purposes":
      return await getLoanPurposes();
    case "income_types":
      return await getIncomeTypes();
    default:
      return [];
  }
}

/**
 * Default wizard configuration with dynamic options loaded from database
 */
export const getDefaultWizardConfig = cache(async (): Promise<WizardStep[]> => {
  const [propertyTypes, occupancyTypes, loanPurposes, incomeTypes] = await Promise.all([
    getPropertyTypes(),
    getOccupancyTypes(),
    getLoanPurposes(),
    getIncomeTypes()
  ]);

  return [
    {
      key: "loan_type",
      title: "Loan Type & Purpose",
      description: "Let's start with the basics of your loan",
      order: 1,
      fields: [
        {
          name: "loanPurpose",
          label: "Loan Purpose",
          type: "select",
          required: true,
          options: loanPurposes.length > 0 ? loanPurposes : [
            { value: "purchase", label: "Purchase" },
            { value: "refinance", label: "Rate/Term Refinance" },
            { value: "cashout", label: "Cash-Out Refinance" }
          ],
          helpText: "What is the purpose of this loan?"
        },
        {
          name: "propertyType",
          label: "Property Type",
          type: "select",
          required: true,
          options: propertyTypes.length > 0 ? propertyTypes : [
            { value: "single_family", label: "Single Family" },
            { value: "condo", label: "Condominium" },
            { value: "townhouse", label: "Townhouse" },
            { value: "multi_family", label: "2-4 Unit" }
          ]
        }
      ]
    },
    {
      key: "loan_amount",
      title: "Loan Amount & Value",
      description: "Tell us about the loan amount and property value",
      order: 2,
      fields: [
        {
          name: "purchasePrice",
          label: "Purchase Price / Property Value",
          type: "number",
          required: true,
          validation: {
            min: 50000,
            max: 10000000,
            message: "Please enter a valid property value"
          },
          helpText: "Enter the purchase price or current property value"
        },
        {
          name: "loanAmount",
          label: "Loan Amount",
          type: "number",
          required: true,
          validation: {
            min: 10000,
            max: 10000000,
            message: "Please enter a valid loan amount"
          },
          helpText: "How much do you want to borrow?"
        },
        {
          name: "downPayment",
          label: "Down Payment",
          type: "number",
          required: false,
          validation: {
            min: 0,
            max: 1000000,
            message: "Please enter a valid down payment amount"
          },
          helpText: "How much are you putting down? (Leave blank if calculated from LTV)"
        }
      ]
    },
    {
      key: "borrower_info",
      title: "Borrower Information",
      description: "Tell us about your financial situation",
      order: 3,
      fields: [
        {
          name: "creditScore",
          label: "Credit Score",
          type: "number",
          required: true,
          validation: {
            min: 300,
            max: 850,
            message: "Credit score must be between 300 and 850"
          },
          helpText: "Your approximate FICO credit score"
        },
        {
          name: "annualIncome",
          label: "Annual Gross Income",
          type: "number",
          required: true,
          validation: {
            min: 1000,
            max: 10000000,
            message: "Please enter a valid annual income"
          },
          helpText: "Your total annual gross income"
        },
        {
          name: "incomeType",
          label: "Income Type",
          type: "select",
          required: true,
          options: incomeTypes.length > 0 ? incomeTypes : [
            { value: "w2", label: "W-2 Employee" },
            { value: "self_employed", label: "Self-Employed" },
            { value: "1099", label: "1099 Contractor" },
            { value: "other", label: "Other" }
          ],
          helpText: "What type of income do you have?"
        },
        {
          name: "monthlyDebts",
          label: "Monthly Debt Payments",
          type: "number",
          required: false,
          validation: {
            min: 0,
            max: 100000,
            message: "Please enter a valid monthly debt amount"
          },
          helpText: "Total monthly payments for credit cards, car loans, etc."
        }
      ]
    },
    {
      key: "property_info",
      title: "Property Information",
      description: "Details about the property",
      order: 4,
      fields: [
        {
          name: "occupancy",
          label: "Occupancy Type",
          type: "select",
          required: true,
          options: occupancyTypes.length > 0 ? occupancyTypes : [
            { value: "primary_residence", label: "Primary Residence" },
            { value: "second_home", label: "Second Home" },
            { value: "investment", label: "Investment Property" }
          ],
          helpText: "How will this property be used?"
        },
        {
          name: "state",
          label: "Property State",
          type: "select",
          required: true,
          options: [
            { value: "CA", label: "California" },
            { value: "TX", label: "Texas" },
            { value: "FL", label: "Florida" },
            { value: "NY", label: "New York" },
            { value: "other", label: "Other" }
          ],
          helpText: "Which state is the property located in?"
        }
      ]
    }
  ];
});

/**
 * Get a specific wizard step by key
 */
export const getWizardStep = cache(async (stepKey: string, wizardType = "loan_qualifier") => {
  const config = await getWizardConfig(wizardType);
  return config.find(step => step.key === stepKey);
});

/**
 * Get all wizard steps ordered
 */
export const getOrderedWizardSteps = cache(async (wizardType = "loan_qualifier") => {
  const config = await getWizardConfig(wizardType);
  return config.sort((a, b) => a.order - b.order);
});