import { z } from "zod";
import type { ToolSpec } from "../../../types";
import { logger } from "@/lib/logger";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const RecipientType = z.enum([
  "borrower",
  "real_estate_agent",
  "underwriter",
  "account_executive",
  "lender_admin",
  "broker_owner",
  "loan_officer",
  "other"
]);

export const EmailPurpose = z.enum([
  "initial_inquiry",
  "follow_up",
  "document_request",
  "approval_notification",
  "rejection_explanation",
  "rate_quote",
  "appointment_scheduling",
  "status_update",
  "marketing",
  "introduction",
  "thank_you",
  "other"
]);

export const EmailTone = z.enum([
  "professional",
  "friendly",
  "urgent",
  "apologetic",
  "informative",
  "persuasive"
]);

export const Input = z.object({
  recipientType: RecipientType.default("borrower").describe("Type of recipient"),
  recipientName: z.string().optional().describe("Name of the recipient"),
  purpose: EmailPurpose.default("follow_up").describe("Purpose of the email"),
  tone: EmailTone.default("professional").describe("Tone of the email"),
  keyPoints: z.array(z.string()).optional().describe("Key points to include"),
  context: z.string().optional().describe("Additional context or details"),
  includeSignature: z.boolean().default(true).describe("Include professional signature"),
  senderName: z.string().optional().describe("Name of the sender"),
  senderTitle: z.string().optional().describe("Title/role of the sender"),
  companyName: z.string().optional().describe("Company name")
});

export const Output = z.object({
  subject: z.string(),
  body: z.string(),
  preview: z.string(),
  metadata: z.object({
    wordCount: z.number(),
    estimatedReadTime: z.string(),
    tone: z.string(),
    formality: z.string()
  }),
  alternatives: z.array(z.object({
    subject: z.string(),
    preview: z.string()
  })).optional()
});

export type InputType = z.infer<typeof Input>;
export type OutputType = z.infer<typeof Output>;

// Email templates for common scenarios
const EMAIL_TEMPLATES = {
  borrower_follow_up: `
I hope this email finds you well. I wanted to follow up on our recent conversation about your mortgage needs.

[KEY_POINTS]

I'm here to help guide you through the process and answer any questions you may have. 
Would you be available for a brief call this week to discuss the next steps?`,

  document_request: `
Thank you for your mortgage application. To move forward with processing your loan, 
we need the following documents:

[KEY_POINTS]

Please upload these documents to our secure portal or reply to this email with attachments. 
If you have any questions about these requirements, please don't hesitate to reach out.`,

  rate_quote: `
Thank you for your interest in our mortgage products. Based on the information you provided, 
I'm pleased to share the following rate options:

[KEY_POINTS]

These rates are subject to final underwriting approval and may vary based on market conditions. 
I'd be happy to discuss these options in more detail at your convenience.`
};

const tool: ToolSpec<typeof Input, typeof Output> = {
  slug: "email-drafter",
  name: "Email Drafter",
  description: "Generate professional emails for mortgage industry communications",
  category: "content",
  executionMode: "server",
  version: "1.0.0",
  permissions: [],
  inputSchema: Input,
  outputSchema: Output,
  async execute(input, context) {
    try {
      logger.info("Drafting email", {
        recipientType: input.recipientType,
        purpose: input.purpose,
        tone: input.tone
      });
      
      // Build the AI prompt
      const recipientContext = input.recipientName 
        ? `${input.recipientName} (${input.recipientType})`
        : `a ${input.recipientType}`;
        
      const keyPointsList = input.keyPoints?.length 
        ? `\nKey points to include:\n${input.keyPoints.map(p => `- ${p}`).join("\n")}`
        : "";
      
      const prompt = `Write a professional email for the mortgage industry.

Recipient: ${recipientContext}
Purpose: ${input.purpose.replace(/_/g, " ")}
Tone: ${input.tone}
${keyPointsList}
${input.context ? `\nAdditional context: ${input.context}` : ""}

Requirements:
1. Subject line should be clear and concise
2. Email should be ${input.tone} in tone
3. Include all key points naturally
4. Keep it professional but personable
5. ${input.includeSignature ? "Include a professional signature" : "No signature needed"}
6. Avoid mortgage jargon unless necessary
7. Be compliant with industry regulations (no guarantees, proper disclosures)

Return a JSON object with:
- subject: The email subject line
- body: The complete email body with proper formatting
- preview: A 50-100 character preview of the email content`;

      // Generate the email using AI
      const model = openai("gpt-4o-mini");
      const response = await streamText({
        model,
        prompt,
        maxRetries: 3,
        temperature: 0.7
      });
      
      const fullText = await response.text;
      
      // Try to parse as JSON, fallback to text extraction
      let emailData;
      try {
        emailData = JSON.parse(fullText);
      } catch {
        // Fallback: extract from text
        const subjectMatch = fullText.match(/Subject:?\s*(.+)/i);
        const bodyStart = fullText.indexOf("\n\n");
        
        emailData = {
          subject: subjectMatch ? subjectMatch[1] : `${input.purpose.replace(/_/g, " ")} - Follow Up`,
          body: bodyStart > -1 ? fullText.substring(bodyStart + 2) : fullText,
          preview: fullText.substring(0, 100).replace(/\n/g, " ")
        };
      }
      
      // Add signature if requested
      if (input.includeSignature) {
        const signature = `

Best regards,
${input.senderName || "Your Mortgage Professional"}
${input.senderTitle ? `${input.senderTitle}\n` : ""}${input.companyName || ""}
${input.senderTitle || input.companyName ? "\n" : ""}
This email is confidential and may contain privileged information.`;
        
        emailData.body = emailData.body.replace(/\n*$/, "") + signature;
      }
      
      // Calculate metadata
      const wordCount = emailData.body.split(/\s+/).length;
      const estimatedReadTime = Math.ceil(wordCount / 200) + " min";
      const formality = input.tone === "professional" || input.tone === "urgent" 
        ? "Formal" 
        : "Semi-formal";
      
      // Generate alternative subject lines
      const alternatives = [
        {
          subject: `Re: ${input.purpose.replace(/_/g, " ")} - ${input.recipientName || "Your Mortgage"}`,
          preview: emailData.preview
        },
        {
          subject: `Important: ${emailData.subject}`,
          preview: emailData.preview
        },
        {
          subject: `${input.recipientName ? `${input.recipientName} - ` : ""}${input.purpose.replace(/_/g, " ")}`,
          preview: emailData.preview
        }
      ];
      
      // Track usage
      if (context?.agentNotes) {
        context.agentNotes.emailsDrafted = (context.agentNotes.emailsDrafted || 0) + 1;
        context.agentNotes.lastEmailPurpose = input.purpose;
      }
      
      return {
        subject: emailData.subject,
        body: emailData.body,
        preview: emailData.preview || emailData.body.substring(0, 100).replace(/\n/g, " "),
        metadata: {
          wordCount,
          estimatedReadTime,
          tone: input.tone,
          formality
        },
        alternatives
      };
      
    } catch (error) {
      logger.error("Email drafting failed", { error, input });
      
      // Fallback to template if available
      const templateKey = `${input.recipientType}_${input.purpose}`;
      const template = EMAIL_TEMPLATES[templateKey as keyof typeof EMAIL_TEMPLATES];
      
      if (template) {
        const body = template.replace(
          "[KEY_POINTS]",
          input.keyPoints?.map(p => `• ${p}`).join("\n") || ""
        );
        
        return {
          subject: `${input.purpose.replace(/_/g, " ")} - ${input.recipientName || "Your Mortgage"}`,
          body,
          preview: body.substring(0, 100).replace(/\n/g, " "),
          metadata: {
            wordCount: body.split(/\s+/).length,
            estimatedReadTime: "1 min",
            tone: input.tone,
            formality: "Semi-formal"
          }
        };
      }
      
      throw error instanceof Error ? error : new Error("Email drafting failed");
    }
  }
};

export default tool;