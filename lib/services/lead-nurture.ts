import { createAdminClient } from "@/lib/supabase/server";
import { SYSTEM_USER_ID } from "@/lib/constants";
import { leadNurtureWorkflows } from "@/features/workflows/templates/lead-nurture";

interface Lead {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  source: string;
  metadata?: Record<string, any>;
}

interface NurtureEventMetadata {
  leadEmail: string;
  leadId?: string | null;
  sequenceType: string;
  workflowSlug: string;
  stepIndex: number;
  stepId: string;
  subject: string;
  template: string;
  delayDays: number;
  triggerAt: string;
  status: "scheduled" | "sent" | "skipped" | "failed";
  context?: Record<string, any>;
}

const NURTURE_WORKFLOW_PREFIX = "lead-nurture";

const SCHEDULED_STATUSES = new Set(["scheduled", "in_progress"]);

function computeTriggerDate(delayDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + delayDays);
  return date.toISOString();
}

function buildMetadata(
  base: Omit<NurtureEventMetadata, "status">,
  status: NurtureEventMetadata["status"]
): NurtureEventMetadata {
  return { ...base, status };
}

function isNurtureWorkflow(slug: string): boolean {
  return slug.startsWith(NURTURE_WORKFLOW_PREFIX);
}

export class LeadNurtureService {
  async startNurtureSequence(
    lead: Lead,
    sequenceType: keyof typeof leadNurtureWorkflows
  ) {
    const workflow = leadNurtureWorkflows[sequenceType];
    if (!workflow) {
      console.warn(`No nurture workflow found for sequence ${sequenceType}`);
      return;
    }

    const supabase = await createAdminClient();

    // Fetch the canonical lead record if we have one
    const { data: leadRecord } = await supabase
      .from("leads")
      .select("id, lead_score, metadata")
      .eq("email", lead.email)
      .maybeSingle();

    const leadId = leadRecord?.id ?? null;

    // Skip if there is already an active workflow for this lead & sequence
    const { data: existingEvents, error: existingError } = await supabase
      .from("ai_tool_events")
      .select("metadata")
      .eq("tool_slug", workflow.slug)
      .eq("user_id", SYSTEM_USER_ID)
      .filter("metadata->>leadEmail", "eq", lead.email);

    if (existingError) {
      console.error("Failed to check existing nurture workflow events", existingError);
    }

    const isAlreadyScheduled = existingEvents?.some(event => {
      const status = (event.metadata as NurtureEventMetadata | null)?.status;
      return status && SCHEDULED_STATUSES.has(status);
    });

    if (isAlreadyScheduled) {
      console.log(`Lead ${lead.email} already has an active ${sequenceType} workflow.`);
      return;
    }

    // Record a lead activity for auditability
    if (leadId) {
      const { error: activityError } = await supabase
        .from("lead_activities")
        .insert({
          lead_id: leadId,
          activity_type: "note_added",
          description: `Enqueued nurture workflow ${workflow.name}`,
          metadata: {
            sequenceType,
            source: lead.source,
            triggeredAt: new Date().toISOString(),
          },
        });

      if (activityError) {
        console.error("Failed to log nurture activity", activityError);
      }
    }

    const context = {
      ...lead.metadata,
      firstName: lead.firstName,
      lastName: lead.lastName,
      company: lead.company,
      source: lead.source,
    };

    // Schedule each workflow step as an ai_tool_events record
    for (const [index, step] of workflow.steps.entries()) {
      const triggerAt = computeTriggerDate(step.delayDays);
      const metadata = buildMetadata(
        {
          leadEmail: lead.email,
          leadId,
          sequenceType,
          workflowSlug: workflow.slug,
          stepIndex: index,
          stepId: step.id,
          subject: step.subject,
          template: step.template,
          delayDays: step.delayDays,
          triggerAt,
          context,
        },
        "scheduled"
      );

      const { error: enqueueError } = await supabase
        .from("ai_tool_events")
        .insert({
          tool_slug: workflow.slug,
          user_id: SYSTEM_USER_ID,
          input: {
            lead,
            stepIndex: index,
            stepId: step.id,
          },
          metadata,
        });

      if (enqueueError) {
        console.error("Failed to queue nurture workflow event", enqueueError);
      }
    }
  }

  async processNurtureSequences() {
    const supabase = await createAdminClient();
    const nowIso = new Date().toISOString();

    const { data: dueEvents, error } = await supabase
      .from("ai_tool_events")
      .select("id, tool_slug, input, metadata")
      .like("tool_slug", `${NURTURE_WORKFLOW_PREFIX}.%`)
      .filter("metadata->>status", "eq", "scheduled")
      .lte("metadata->>triggerAt", nowIso);

    if (error) {
      console.error("Failed to fetch due nurture events", error);
      return;
    }

    if (!dueEvents?.length) {
      return;
    }

    for (const event of dueEvents) {
      await this.executeNurtureEvent(event.id, event.tool_slug, event.input, event.metadata);
    }
  }

  private async executeNurtureEvent(
    eventId: string,
    toolSlug: string,
    input: any,
    rawMetadata: any
  ) {
    if (!isNurtureWorkflow(toolSlug)) {
      return;
    }

    const metadata = rawMetadata as NurtureEventMetadata;
    const workflow = leadNurtureWorkflows[metadata.sequenceType as keyof typeof leadNurtureWorkflows];
    if (!workflow) {
      console.warn(`No workflow definition for slug ${toolSlug}`);
      return;
    }

    const step = workflow.steps[metadata.stepIndex];
    if (!step) {
      console.warn(`No workflow step index ${metadata.stepIndex} for sequence ${metadata.sequenceType}`);
      return;
    }

    const supabase = await createAdminClient();
    const leadEmail = metadata.leadEmail;
    const personalization = {
      firstName: metadata.context?.firstName ?? input?.lead?.firstName ?? "there",
      lastName: metadata.context?.lastName ?? input?.lead?.lastName ?? "",
      company: metadata.context?.company ?? input?.lead?.company ?? "your firm",
      primary_opportunity: metadata.context?.primary_opportunity ?? "AI implementation",
      project_type: metadata.context?.project_type ?? "AI transformation",
      chat_topic: metadata.context?.chat_topic ?? "AI solutions",
      ...metadata.context,
    };

    const subject = this.personalizeText(step.subject, personalization);
    const body = this.personalizeText(step.template, personalization);

    let sendStatus: NurtureEventMetadata["status"] = "sent";
    let sendError: string | null = null;

    try {
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "Sprinter AI <hello@sprinter.ai>",
          to: leadEmail,
          subject,
          html: this.formatEmailHtml(body),
        });
      } else {
        sendStatus = "skipped";
        sendError = "RESEND_API_KEY not configured";
      }
    } catch (err) {
      sendStatus = "failed";
      sendError = err instanceof Error ? err.message : "Failed to send nurture email";
      console.error("Error sending nurture email", err);
    }

    const output = {
      status: sendStatus,
      sentAt: new Date().toISOString(),
      error: sendError,
    };

    const { status: _previousStatus, ...metadataWithoutStatus } = metadata;

    const { error: eventUpdateError } = await supabase
      .from("ai_tool_events")
      .update({
        metadata: buildMetadata(metadataWithoutStatus, sendStatus),
        output,
        error: sendError,
      })
      .eq("id", eventId);

    if (eventUpdateError) {
      console.error("Failed to update nurture event status", eventUpdateError);
    }

    if (metadata.leadId) {
      const { error: activityError } = await supabase
        .from("lead_activities")
        .insert({
          lead_id: metadata.leadId,
          activity_type: sendStatus === "sent" ? "email_sent" : "note_added",
          description:
            sendStatus === "sent"
              ? `Sent nurture workflow email: ${subject}`
              : `Nurture workflow email skipped: ${subject}`,
          metadata: {
            workflowSlug: toolSlug,
            stepId: metadata.stepId,
            status: sendStatus,
            error: sendError,
            sentAt: output.sentAt,
          },
        });

      if (activityError) {
        console.error("Failed to log nurture email activity", activityError);
      }
    }
  }

  private personalizeText(template: string, data: Record<string, any>): string {
    let personalized = template;
    Object.entries(data).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, "g");
      personalized = personalized.replace(placeholder, String(value ?? ""));
    });
    return personalized;
  }

  private formatEmailHtml(body: string): string {
    const htmlBody = body.replace(/\n/g, "<br>");
    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style=\"color: #374151; line-height: 1.6;\">
          ${htmlBody}
        </div>
        <hr style=\"border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;\">
        <p style=\"color: #6b7280; font-size: 12px;\">
          Sprinter AI | AI Solutions for Private Equity<br>
          <a href=\"https://sprinter.ai\" style=\"color: #2563eb;\">sprinter.ai</a> |
          <a href=\"tel:+16156010782\" style=\"color: #2563eb;\">+1 (615) 601-0782</a><br>
          <a href=\"https://sprinter.ai/unsubscribe\" style=\"color: #6b7280;\">Unsubscribe</a>
        </p>
      </div>
    `;
  }

  // Lead scoring based on engagement signals
  async calculateLeadScore(email: string): Promise<number> {
    const supabase = await createAdminClient();

    const { data: lead } = await supabase
      .from("leads")
      .select("id, lead_score")
      .eq("email", email)
      .maybeSingle();

    if (!lead) {
      return 0;
    }

    const leadId = lead.id;
    let score = lead.lead_score ?? 0;

    const [{ data: assessments }, { data: chats }, { data: activities }] = await Promise.all([
      supabase.from("ai_assessment_leads").select("id").eq("email", email),
      supabase
        .from("chat_conversations")
        .select("id, high_intent_detected")
        .eq("lead_id", leadId),
      supabase
        .from("lead_activities")
        .select("activity_type, metadata")
        .eq("lead_id", leadId),
    ]);

    if (assessments?.length) {
      score += 30;
    }

    if (chats?.length) {
      const chatScore = chats.reduce((acc, convo) => acc + 10, 0);
      const highIntentBonus = chats.some(convo => convo.high_intent_detected) ? 20 : 0;
      score += Math.min(chatScore, 50) + highIntentBonus;
    }

    activities?.forEach(activity => {
      switch (activity.activity_type) {
        case "email_sent":
          score += 5;
          break;
        case "meeting_scheduled":
          score += 20;
          break;
        case "meeting_completed":
          score += 30;
          break;
        case "note_added": {
          const eventType = activity.metadata?.eventType;
          if (eventType === "proposal_viewed") score += 20;
          if (eventType === "sprint_page_viewed") score += 10;
          break;
        }
        default:
          break;
      }
    });

    return Math.min(score, 100);
  }
}
