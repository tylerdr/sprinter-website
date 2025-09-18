import { z } from "zod";

// Lead contact preferences
export const PreferredContactMethod = z.enum(["email", "phone", "text"]);

// Loan purposes
export const LoanPurpose = z.enum(["purchase", "refinance", "cash-out", "heloc"]);

// Property types
export const PropertyType = z.enum([
  "single-family",
  "condo",
  "townhouse",
  "multi-family"
]);

// Occupancy types
export const Occupancy = z.enum(["primary", "secondary", "investment"]);

// Timeline options
export const Timeframe = z.enum([
  "immediate",
  "1-3-months",
  "3-6-months",
  "6-12-months",
  "exploring"
]);

// Credit score ranges
export const EstimatedCreditScore = z.enum([
  "excellent",
  "good",
  "fair",
  "poor",
  "unknown"
]);

// Lead qualification levels
export const LeadQualification = z.enum(["hot", "warm", "cold"]);

// Lead source tracking
export const LeadSource = z.enum([
  "ai-chat",
  "website",
  "referral",
  "social-media",
  "email-campaign",
  "phone",
  "partner",
  "event",
  "other"
]);

// Base lead schema for creation
export const CreateLeadSchema = z.object({
  // Basic contact info
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  preferredContact: PreferredContactMethod.default("email"),

  // Loan details
  loanPurpose: LoanPurpose,
  propertyType: PropertyType,
  occupancy: Occupancy,
  timeframe: Timeframe,

  // Financial info
  estimatedCreditScore: EstimatedCreditScore.optional(),
  estimatedIncome: z.number().positive().optional(),
  estimatedDownPayment: z.number().nonnegative().optional(),
  currentlyRenting: z.boolean().optional(),
  preApproved: z.boolean().default(false),

  // Lead management
  source: LeadSource.default("ai-chat"),
  notes: z.string().optional(),
  consentToContact: z.boolean().default(true),
  assignedTo: z.string().uuid().optional(),
  tenantId: z.number().optional()
});

// Update lead schema (partial for updates)
export const UpdateLeadSchema = CreateLeadSchema.partial();

// Full lead schema (includes computed/system fields)
export const LeadSchema = CreateLeadSchema.extend({
  id: z.string().uuid(),
  leadScore: z.number().min(0).max(100),
  qualification: LeadQualification,
  nextSteps: z.array(z.string()),
  estimatedLoanAmount: z.number().positive().optional(),
  followUpDate: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// Database row schema (matches database table structure)
export const LeadDatabaseSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.number().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  preferred_contact: z.string().nullable(),
  loan_purpose: z.string().nullable(),
  property_type: z.string().nullable(),
  occupancy: z.string().nullable(),
  timeframe: z.string().nullable(),
  estimated_credit_score: z.string().nullable(),
  estimated_income: z.number().nullable(),
  estimated_down_payment: z.number().nullable(),
  currently_renting: z.boolean().nullable(),
  pre_approved: z.boolean(),
  lead_score: z.number().nullable(),
  qualification: z.string().nullable(),
  next_steps: z.array(z.string()).nullable(),
  estimated_loan_amount: z.number().nullable(),
  follow_up_date: z.string().datetime().nullable(),
  source: z.string().nullable(),
  notes: z.string().nullable(),
  consent_to_contact: z.boolean(),
  assigned_to: z.string().uuid().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
});

// Type exports
export type Lead = z.infer<typeof LeadSchema>;
export type CreateLead = z.infer<typeof CreateLeadSchema>;
export type UpdateLead = z.infer<typeof UpdateLeadSchema>;
export type LeadDatabase = z.infer<typeof LeadDatabaseSchema>;
export type PreferredContactMethod = z.infer<typeof PreferredContactMethod>;
export type LoanPurpose = z.infer<typeof LoanPurpose>;
export type PropertyType = z.infer<typeof PropertyType>;
export type Occupancy = z.infer<typeof Occupancy>;
export type Timeframe = z.infer<typeof Timeframe>;
export type EstimatedCreditScore = z.infer<typeof EstimatedCreditScore>;
export type LeadQualification = z.infer<typeof LeadQualification>;
export type LeadSource = z.infer<typeof LeadSource>;