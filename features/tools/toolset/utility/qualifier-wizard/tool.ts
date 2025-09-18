import { z } from "zod";
import type { ToolSpec } from "../../../types";
import { logger } from "@/lib/logger";

const WizardStep = z.enum([
  "loan_type",
  "loan_amount",
  "property_details",
  "borrower_credit",
  "income_assets",
  "additional_details",
  "review"
]);

export const Input = z.object({
  currentStep: WizardStep.describe("Current wizard step"),
  completedSteps: z.array(WizardStep).describe("Steps already completed"),
  qualifierData: z.record(z.string(), z.any()).describe("Collected qualifier data"),
  action: z.enum(["next", "previous", "skip", "save", "complete"]).describe("Action to perform")
});

export const Output = z.object({
  success: z.boolean(),
  nextStep: WizardStep.optional(),
  previousStep: WizardStep.optional(),
  currentStepData: z.object({
    step: WizardStep,
    title: z.string(),
    description: z.string(),
    fields: z.array(z.object({
      name: z.string(),
      label: z.string(),
      type: z.enum(["text", "number", "select", "radio", "checkbox", "date"]),
      required: z.boolean(),
      options: z.array(z.object({
        value: z.string(),
        label: z.string()
      })).optional(),
      validation: z.object({
        min: z.number().optional(),
        max: z.number().optional(),
        pattern: z.string().optional(),
        message: z.string().optional()
      }).optional(),
      helpText: z.string().optional(),
      defaultValue: z.any().optional(),
      conditional: z.object({
        dependsOn: z.string(),
        showWhen: z.any()
      }).optional()
    })),
    progress: z.number()
  }),
  completedQualifiers: z.record(z.string(), z.any()).optional(),
  validation: z.object({
    isValid: z.boolean(),
    errors: z.array(z.string()).optional(),
    warnings: z.array(z.string()).optional()
  }).optional(),
  suggestions: z.array(z.object({
    field: z.string(),
    suggestion: z.string(),
    reason: z.string()
  })).optional(),
  savedId: z.string().optional(),
  message: z.string().optional()
});

export type InputType = z.infer<typeof Input>;
export type OutputType = z.infer<typeof Output>;

const WIZARD_STEPS = {
  loan_type: {
    title: "Loan Type & Purpose",
    description: "Let's start with the basics of your loan",
    fields: [
      {
        name: "loanPurpose",
        label: "Loan Purpose",
        type: "select" as const,
        required: true,
        options: [
          { value: "purchase", label: "Purchase" },
          { value: "refinance", label: "Rate/Term Refinance" },
          { value: "cashout", label: "Cash-Out Refinance" }
        ],
        helpText: "What is the purpose of this loan?"
      },
      {
        name: "propertyType",
        label: "Property Type",
        type: "select" as const,
        required: true,
        options: [
          { value: "single_family", label: "Single Family" },
          { value: "condo", label: "Condominium" },
          { value: "townhouse", label: "Townhouse" },
          { value: "multi_family", label: "2-4 Unit" }
        ]
      }
    ]
  },
  loan_amount: {
    title: "Loan Amount & Value",
    description: "Tell us about the loan amount and property value",
    fields: [
      {
        name: "purchasePrice",
        label: "Purchase Price / Property Value",
        type: "number" as const,
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
        type: "number" as const,
        required: true,
        validation: {
          min: 25000,
          max: 10000000,
          message: "Please enter a valid loan amount"
        }
      },
      {
        name: "downPaymentPercent",
        label: "Down Payment %",
        type: "number" as const,
        required: false,
        validation: {
          min: 0,
          max: 100
        },
        conditional: {
          dependsOn: "loanPurpose",
          showWhen: "purchase"
        }
      }
    ]
  },
  property_details: {
    title: "Property Details",
    description: "Provide more information about the property",
    fields: [
      {
        name: "propertyZip",
        label: "Property ZIP Code",
        type: "text" as const,
        required: true,
        validation: {
          pattern: "^\\d{5}$",
          message: "Please enter a valid 5-digit ZIP code"
        }
      },
      {
        name: "propertyCounty",
        label: "County",
        type: "text" as const,
        required: false
      },
      {
        name: "occupancy",
        label: "Occupancy Type",
        type: "select" as const,
        required: true,
        options: [
          { value: "primary", label: "Primary Residence" },
          { value: "second", label: "Second Home" },
          { value: "investment", label: "Investment Property" }
        ]
      }
    ]
  },
  borrower_credit: {
    title: "Borrower Information",
    description: "Tell us about the borrower's creditworthiness",
    fields: [
      {
        name: "creditScore",
        label: "Credit Score",
        type: "number" as const,
        required: true,
        validation: {
          min: 300,
          max: 850,
          message: "Credit score must be between 300 and 850"
        },
        helpText: "Middle credit score if multiple borrowers"
      },
      {
        name: "firstTimeHomeBuyer",
        label: "First-Time Home Buyer",
        type: "radio" as const,
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ]
      },
      {
        name: "citizenship",
        label: "Citizenship Status",
        type: "select" as const,
        required: true,
        options: [
          { value: "us_citizen", label: "U.S. Citizen" },
          { value: "permanent_resident", label: "Permanent Resident" },
          { value: "non_permanent_resident", label: "Non-Permanent Resident" }
        ]
      }
    ]
  },
  income_assets: {
    title: "Income & Assets",
    description: "Provide income and asset information",
    fields: [
      {
        name: "monthlyIncome",
        label: "Total Monthly Income",
        type: "number" as const,
        required: true,
        validation: {
          min: 0,
          max: 1000000
        },
        helpText: "Gross monthly income before taxes"
      },
      {
        name: "monthlyDebts",
        label: "Total Monthly Debts",
        type: "number" as const,
        required: true,
        validation: {
          min: 0,
          max: 100000
        },
        helpText: "All monthly debt payments (auto, credit cards, etc.)"
      },
      {
        name: "liquidAssets",
        label: "Liquid Assets",
        type: "number" as const,
        required: false,
        validation: {
          min: 0
        },
        helpText: "Cash, savings, checking accounts"
      }
    ]
  },
  additional_details: {
    title: "Additional Details",
    description: "Any additional information that might be relevant",
    fields: [
      {
        name: "bankruptcyHistory",
        label: "Bankruptcy in Last 7 Years",
        type: "radio" as const,
        required: false,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ]
      },
      {
        name: "foreclosureHistory",
        label: "Foreclosure in Last 7 Years",
        type: "radio" as const,
        required: false,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ]
      },
      {
        name: "vaEligible",
        label: "VA Eligible",
        type: "radio" as const,
        required: false,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unknown", label: "Not Sure" }
        ]
      }
    ]
  },
  review: {
    title: "Review Your Information",
    description: "Review all the information you've provided",
    fields: []
  }
};

const tool: ToolSpec<typeof Input, typeof Output> = {
  slug: "qualifier-wizard",
  name: "Interactive Qualifier Wizard",
  description: "Progressive disclosure wizard for collecting loan qualifier information",
  category: "utility",
  executionMode: "client",
  version: "1.0.0",
  permissions: [],
  inputSchema: Input,
  outputSchema: Output,
  async execute(input, context) {
    try {
      const currentStepConfig = WIZARD_STEPS[input.currentStep];
      const stepKeys = Object.keys(WIZARD_STEPS) as (z.infer<typeof WizardStep>)[];
      const currentIndex = stepKeys.indexOf(input.currentStep);
      
      // Calculate progress
      const progress = ((currentIndex + 1) / stepKeys.length) * 100;
      
      // Handle different actions
      let nextStep: z.infer<typeof WizardStep> | undefined;
      let previousStep: z.infer<typeof WizardStep> | undefined;
      let message: string | undefined;
      
      switch (input.action) {
        case "next":
          if (currentIndex < stepKeys.length - 1) {
            nextStep = stepKeys[currentIndex + 1];
            message = "Proceeding to next step";
          }
          break;
          
        case "previous":
          if (currentIndex > 0) {
            previousStep = stepKeys[currentIndex - 1];
            message = "Going back to previous step";
          }
          break;
          
        case "skip":
          if (currentIndex < stepKeys.length - 1) {
            nextStep = stepKeys[currentIndex + 1];
            message = "Skipping current step";
          }
          break;
          
        case "save":
          // Generate a unique ID for saved progress
          const savedId = `wizard-${Date.now()}`;
          message = `Progress saved. Resume ID: ${savedId}`;
          break;
          
        case "complete":
          // Validate all required fields
          const validation = validateQualifiers(input.qualifierData);
          if (validation.isValid) {
            message = "Wizard completed successfully!";
          } else {
            message = "Please complete all required fields";
          }
          break;
      }
      
      // Generate suggestions based on current data
      const suggestions = generateSuggestions(input.qualifierData, input.currentStep);
      
      // Populate default values from existing data
      const fieldsWithDefaults = currentStepConfig.fields.map(field => ({
        ...field,
        defaultValue: input.qualifierData[field.name]
      }));
      
      logger.info("Qualifier wizard step processed", {
        currentStep: input.currentStep,
        action: input.action,
        progress
      });
      
      return {
        success: true,
        nextStep,
        previousStep,
        currentStepData: {
          step: input.currentStep,
          title: currentStepConfig.title,
          description: currentStepConfig.description,
          fields: fieldsWithDefaults,
          progress
        },
        completedQualifiers: input.action === "complete" ? input.qualifierData : undefined,
        validation: input.action === "complete" ? validateQualifiers(input.qualifierData) : undefined,
        suggestions,
        savedId: input.action === "save" ? `wizard-${Date.now()}` : undefined,
        message
      };
      
    } catch (error) {
      logger.error("Qualifier wizard error", { error, input });
      
      return {
        success: false,
        currentStepData: {
          step: input.currentStep,
          title: "Error",
          description: "An error occurred",
          fields: [],
          progress: 0
        }
      };
    }
  }
};

function validateQualifiers(data: Record<string, any>) {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check required fields
  const requiredFields = [
    "loanPurpose",
    "propertyType", 
    "purchasePrice",
    "loanAmount",
    "propertyZip",
    "occupancy",
    "creditScore",
    "firstTimeHomeBuyer",
    "citizenship",
    "monthlyIncome",
    "monthlyDebts"
  ];
  
  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push(`${field} is required`);
    }
  });
  
  // Validate DTI
  if (data.monthlyIncome && data.monthlyDebts) {
    const dti = (data.monthlyDebts / data.monthlyIncome) * 100;
    if (dti > 50) {
      warnings.push("DTI ratio is high (>50%), may limit program options");
    }
  }
  
  // Validate LTV
  if (data.loanAmount && data.purchasePrice) {
    const ltv = (data.loanAmount / data.purchasePrice) * 100;
    if (ltv > 97) {
      warnings.push("High LTV (>97%) may require special programs");
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

function generateSuggestions(data: Record<string, any>, currentStep: z.infer<typeof WizardStep>) {
  const suggestions = [];
  
  if (currentStep === "borrower_credit" && !data.creditScore) {
    suggestions.push({
      field: "creditScore",
      suggestion: "Check your credit score for free",
      reason: "Knowing your exact score helps find the best programs"
    });
  }
  
  if (currentStep === "income_assets" && data.monthlyIncome && data.monthlyDebts) {
    const dti = (data.monthlyDebts / data.monthlyIncome) * 100;
    if (dti > 43) {
      suggestions.push({
        field: "monthlyDebts",
        suggestion: "Consider paying down debts before applying",
        reason: `Your DTI is ${dti.toFixed(1)}%, which may limit options`
      });
    }
  }
  
  if (data.creditScore && data.creditScore < 620) {
    suggestions.push({
      field: "creditScore",
      suggestion: "Work on improving credit score",
      reason: "Scores above 620 open up more loan options"
    });
  }
  
  return suggestions.slice(0, 3);
}

export default tool;