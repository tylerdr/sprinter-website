/**
 * Contact Capture Tool
 * Capture and qualify lead information with database persistence
 */

import { z } from "zod";
import { ToolSpec } from "@/features/tools/types";
import { logger } from "@/lib/logger";
import { createClient } from "@/utils/supabase/server";

// Input schema
export const contactCaptureInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string(),
  preferredContact: z.enum(["email", "phone", "text"]).default("email"),
  loanPurpose: z.enum(["purchase", "refinance", "cash-out", "heloc"]),
  propertyType: z.enum(["single-family", "condo", "townhouse", "multi-family"]),
  occupancy: z.enum(["primary", "secondary", "investment"]),
  timeframe: z.enum([
    "immediate",
    "1-3-months",
    "3-6-months",
    "6-12-months",
    "exploring"
  ]),
  estimatedCreditScore: z
    .enum(["excellent", "good", "fair", "poor", "unknown"])
    .optional(),
  estimatedIncome: z.number().optional(),
  estimatedDownPayment: z.number().optional(),
  currentlyRenting: z.boolean().optional(),
  preApproved: z.boolean().default(false),
  source: z.string().optional(),
  notes: z.string().optional(),
  consentToContact: z.boolean().default(true),
  assignToUserId: z.string().optional()
});

// Output schema
export const contactCaptureOutputSchema = z.object({
  leadId: z.string(),
  leadScore: z.number(),
  qualification: z.enum(["hot", "warm", "cold"]),
  assignedTo: z.string().optional(),
  nextSteps: z.array(z.string()),
  estimatedLoanAmount: z.number().optional(),
  followUpDate: z.string(),
  saved: z.boolean(),
  message: z.string().optional()
});

// Type definitions
export type ContactCaptureInput = z.infer<typeof contactCaptureInputSchema>;
export type ContactCaptureOutput = z.infer<typeof contactCaptureOutputSchema>;

// Export schemas for UI
export const Input = contactCaptureInputSchema;
export const Output = contactCaptureOutputSchema;

/**
 * Calculate lead score based on inputs
 */
function calculateLeadScore(input: ContactCaptureInput): number {
  let score = 50; // Base score

  // Timeframe scoring
  if (input.timeframe === "immediate") score += 30;
  else if (input.timeframe === "1-3-months") score += 20;
  else if (input.timeframe === "3-6-months") score += 10;

  // Credit score impact
  if (input.estimatedCreditScore === "excellent") score += 15;
  else if (input.estimatedCreditScore === "good") score += 10;
  else if (input.estimatedCreditScore === "fair") score += 5;

  // Pre-approval bonus
  if (input.preApproved) score += 15;

  // Down payment readiness
  if (input.estimatedDownPayment && input.estimatedDownPayment > 50000)
    score += 10;

  return Math.min(100, score);
}

/**
 * Main tool implementation with database persistence
 */
const tool: ToolSpec<typeof Input, typeof Output> = {
  slug: "contact-capture",
  name: "Contact Capture",
  description: "Capture and qualify lead information with CRM integration",
  category: "utility",
  executionMode: "server",
  version: "2.0.0",
  inputSchema: Input,
  outputSchema: Output,

  async execute(input, context) {
    try {
      logger.info("Capturing contact information", {
        name: `${input.firstName} ${input.lastName}`,
        loanPurpose: input.loanPurpose
      });

      // Calculate lead score
      const leadScore = calculateLeadScore(input);

      // Determine qualification level
      let qualification: "hot" | "warm" | "cold";
      if (leadScore >= 80) qualification = "hot";
      else if (leadScore >= 60) qualification = "warm";
      else qualification = "cold";

      // Generate next steps
      const nextSteps: string[] = [];
      if (input.timeframe === "immediate") {
        nextSteps.push("Call within 24 hours");
        nextSteps.push("Send pre-qualification link");
      }
      if (!input.preApproved) {
        nextSteps.push("Schedule consultation");
        nextSteps.push("Gather financial documents");
      }
      if (
        input.estimatedCreditScore === "fair" ||
        input.estimatedCreditScore === "poor"
      ) {
        nextSteps.push("Provide credit improvement resources");
      }
      nextSteps.push("Add to email nurture campaign");

      // Calculate follow-up date
      const followUpDate = new Date();
      if (qualification === "hot") {
        followUpDate.setDate(followUpDate.getDate() + 1);
      } else if (qualification === "warm") {
        followUpDate.setDate(followUpDate.getDate() + 3);
      } else {
        followUpDate.setDate(followUpDate.getDate() + 7);
      }

      // Estimate loan amount if possible
      let estimatedLoanAmount: number | undefined;
      if (input.estimatedIncome && input.loanPurpose === "purchase") {
        // Simple DTI calculation (assuming 43% DTI ratio)
        const maxMonthlyPayment = (input.estimatedIncome / 12) * 0.43;
        // Rough estimate: $500k loan ≈ $3,200/month at 7%
        estimatedLoanAmount = Math.round((maxMonthlyPayment / 3200) * 500000);
      }

      // Initialize Supabase client
      const supabase = await createClient();
      let leadId = "";
      let saved = false;

      try {
        // First, check if a lead with this email already exists
        // NOTE: This requires the leads table to be created via migration
        const { data: existingLead } = await (supabase as any)
          .from("leads")
          .select("id, updated_at")
          .eq("email", input.email)
          .maybeSingle();

        if (existingLead) {
          // Update existing lead
          const { data: updatedLead, error: updateError } = await (supabase as any)
            .from("leads")
            .update({
              first_name: input.firstName,
              last_name: input.lastName,
              phone: input.phone,
              preferred_contact: input.preferredContact,
              loan_purpose: input.loanPurpose,
              property_type: input.propertyType,
              occupancy: input.occupancy,
              timeframe: input.timeframe,
              estimated_credit_score: input.estimatedCreditScore,
              estimated_income: input.estimatedIncome,
              estimated_down_payment: input.estimatedDownPayment,
              currently_renting: input.currentlyRenting,
              pre_approved: input.preApproved,
              lead_score: leadScore,
              qualification,
              next_steps: nextSteps,
              estimated_loan_amount: estimatedLoanAmount,
              follow_up_date: followUpDate.toISOString(),
              notes: input.notes,
              consent_to_contact: input.consentToContact,
              assigned_to: input.assignToUserId,
              updated_at: new Date().toISOString()
            })
            .eq("id", existingLead.id)
            .select("id")
            .single();

          if (updateError) {
            logger.error("Failed to update lead in database", {
              error: updateError
            });
          } else if (updatedLead) {
            leadId = updatedLead.id;
            saved = true;
          }
        } else {
          // Create new lead
          const { data: newLead, error: insertError } = await (supabase as any)
            .from("leads")
            .insert({
              first_name: input.firstName,
              last_name: input.lastName,
              email: input.email,
              phone: input.phone,
              preferred_contact: input.preferredContact,
              loan_purpose: input.loanPurpose,
              property_type: input.propertyType,
              occupancy: input.occupancy,
              timeframe: input.timeframe,
              estimated_credit_score: input.estimatedCreditScore,
              estimated_income: input.estimatedIncome,
              estimated_down_payment: input.estimatedDownPayment,
              currently_renting: input.currentlyRenting,
              pre_approved: input.preApproved,
              lead_score: leadScore,
              qualification,
              next_steps: nextSteps,
              estimated_loan_amount: estimatedLoanAmount,
              follow_up_date: followUpDate.toISOString(),
              source: input.source || 'ai-chat',
              notes: input.notes,
              consent_to_contact: input.consentToContact,
              assigned_to: input.assignToUserId,
              tenant_id: context?.tenantId,
              created_at: new Date().toISOString()
            })
            .select("id")
            .single();

          if (insertError) {
            logger.error("Failed to save lead to database", {
              error: insertError
            });
          } else if (newLead) {
            leadId = newLead.id;
            saved = true;
          }
        }

        // Create activity record
        if (saved && leadId) {
          await (supabase as any)
            .from("lead_activities")
            .insert({
              lead_id: leadId,
              activity_type: existingLead ? 'updated' : 'created',
              description: existingLead
                ? `Lead information updated via contact capture tool`
                : `New lead captured via contact capture tool`,
              metadata: {
                lead_score: leadScore,
                qualification,
                source: input.source || 'ai-chat',
                tool: 'contact-capture'
              }
            });
        }

      } catch (dbError) {
        // Log error but don't fail the tool - we can still return useful data
        logger.error("Database operation failed", {
          error: dbError
        });

        // Generate fallback lead ID if database save failed
        if (!leadId) {
          leadId = `LEAD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        }
      }

      const output: ContactCaptureOutput = {
        leadId: leadId || `TEMP-${Date.now()}`,
        leadScore,
        qualification,
        assignedTo: input.assignToUserId,
        nextSteps,
        estimatedLoanAmount,
        followUpDate: followUpDate.toISOString(),
        saved,
        message: saved
          ? "Contact captured and saved successfully"
          : "Contact captured but not saved to database"
      };

      logger.info("Contact captured", {
        leadId,
        leadScore,
        qualification,
        saved
      });

      return output;
    } catch (error) {
      logger.error("Error capturing contact", { error });
      throw new Error(
        `Failed to capture contact: ${error instanceof Error ? error?.message : "Unknown error"}`
      );
    }
  }
};

export default tool;