import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"
import { personalizeEmail, peOutreachTemplates } from "./email-templates"

const resend = new Resend(process.env.RESEND_API_KEY)

interface Lead {
  email: string
  firstName?: string
  lastName?: string
  company?: string
  source: string
  metadata?: Record<string, any>
}

// Nurture sequence definitions
const NURTURE_SEQUENCES = {
  ai_assessment_completed: [
    {
      delayDays: 2,
      subject: "{{firstName}}, have you reviewed your AI assessment?",
      template: `Hi {{firstName}},

I wanted to follow up on the AI Readiness Assessment you received for {{company}}.

The report identified some significant opportunities - particularly around {{primary_opportunity}}.

Many PE firms start with our 5-Day AI Sprint to implement their first quick win. 
At $2,500, it's a low-risk way to see real ROI from AI.

Would you like to discuss implementing one of the opportunities from your report?

Best,
The Sprinter Team

P.S. We only run 5 sprints per month and December is filling up quickly.`,
    },
    {
      delayDays: 7,
      subject: "Quick win: {{primary_opportunity}}",
      template: `{{firstName}},

I've been thinking about your assessment results, specifically the opportunity around {{primary_opportunity}}.

Here's a quick implementation path:
1. Week 1: Set up the AI infrastructure
2. Week 2: Train on your specific use case
3. Week 3: Deploy and start seeing results

This is exactly what we do in our AI Sprint. Fixed price, guaranteed ROI.

Ready to move forward? Book your sprint here: https://sprinter.ai/ai-sprint

Or reply with any questions.

Best,
The Sprinter Team`,
    },
    {
      delayDays: 14,
      subject: "Last check - AI implementation for {{company}}",
      template: `Hi {{firstName}},

I'll keep this brief. 

Your competitors are moving on AI. We can help {{company}} catch up and surpass them.

Three options:
1. Free consultation call - 15 minutes to discuss your specific situation
2. AI Sprint - $2,500 to implement your first AI solution  
3. Partnership Program - Ongoing AI innovation for your entire portfolio

Which makes sense for you?

Best,
The Sprinter Team

P.S. If now isn't the right time, just let me know and I'll check back in Q2.`,
    },
  ],

  contact_form_submitted: [
    {
      delayDays: 1,
      subject: "Following up on your inquiry",
      template: `Hi {{firstName}},

Thanks for reaching out to Sprinter AI. I wanted to make sure you got the information you needed.

Based on your interest in {{project_type}}, I think you'd find value in:

• Our free AI Readiness Assessment - understand your AI opportunities
• A quick 15-minute call to discuss your specific needs

Would either of these be helpful?

Best,
The Sprinter Team

Book a call: https://sprinter.ai/contact
Free assessment: https://sprinter.ai/ai-assessment`,
    },
    {
      delayDays: 3,
      subject: "Don't miss out on AI advantages",
      template: `{{firstName}},

40% of PE firms already have AI strategies in place. 

If {{company}} isn't exploring AI yet, you're already behind.

We can change that in 5 days with our AI Sprint:
• Fixed $2,500 investment
• Working AI prototype delivered
• 100% money-back guarantee

Worth a conversation?

Best,
The Sprinter Team`,
    },
  ],

  high_intent_chat: [
    {
      delayDays: 0, // Same day
      subject: "Following up on our chat",
      template: `Hi {{firstName}},

I noticed you were asking about {{chat_topic}} on our website earlier.

I wanted to make sure you got your questions answered. Based on what you were looking for, 
I think a quick call would be valuable.

I have some time tomorrow at 2pm ET or Thursday at 10am ET. 
Would either work for you?

You can also book directly here: https://sprinter.ai/contact

Best,
The Sprinter Team

P.S. If you prefer, just reply with your phone number and I'll call you right now.`,
    },
  ],
}

export class LeadNurtureService {
  async startNurtureSequence(
    lead: Lead,
    sequenceType: keyof typeof NURTURE_SEQUENCES
  ) {
    const supabase = await createClient()
    
    // Check if already in a sequence
    const { data: existing } = await supabase
      .from("lead_nurture_sequences")
      .select("*")
      .eq("lead_email", lead.email)
      .eq("sequence_name", sequenceType)
      .eq("status", "active")
      .single()

    if (existing) {
      console.log(`Lead ${lead.email} already in ${sequenceType} sequence`)
      return
    }

    // Start new sequence
    const { error } = await supabase
      .from("lead_nurture_sequences")
      .insert({
        lead_email: lead.email,
        sequence_name: sequenceType,
        current_step: 0,
        status: "active",
        metadata: {
          ...lead.metadata,
          firstName: lead.firstName,
          lastName: lead.lastName,
          company: lead.company,
        },
        next_action_date: this.calculateNextActionDate(0, sequenceType),
      })

    if (error) {
      console.error("Error starting nurture sequence:", error)
    }
  }

  async processNurtureSequences() {
    const supabase = await createClient()
    
    // Get sequences due for action
    const now = new Date().toISOString()
    const { data: dueSequences, error } = await supabase
      .from("lead_nurture_sequences")
      .select("*")
      .eq("status", "active")
      .lte("next_action_date", now)

    if (error || !dueSequences) {
      console.error("Error fetching due sequences:", error)
      return
    }

    for (const sequence of dueSequences) {
      await this.sendNurtureEmail(sequence)
    }
  }

  private async sendNurtureEmail(sequence: any) {
    const sequenceDefinition = NURTURE_SEQUENCES[sequence.sequence_name as keyof typeof NURTURE_SEQUENCES]
    if (!sequenceDefinition) return

    const currentStep = sequence.current_step
    if (currentStep >= sequenceDefinition.length) {
      // Sequence completed
      await this.completeSequence(sequence.id)
      return
    }

    const emailConfig = sequenceDefinition[currentStep]
    const personalizationData = {
      firstName: sequence.metadata?.firstName || "there",
      lastName: sequence.metadata?.lastName || "",
      company: sequence.metadata?.company || "your firm",
      primary_opportunity: sequence.metadata?.primary_opportunity || "AI implementation",
      project_type: sequence.metadata?.project_type || "AI transformation",
      chat_topic: sequence.metadata?.chat_topic || "AI solutions",
      ...sequence.metadata,
    }

    // Personalize and send email
    const personalizedSubject = this.personalizeText(emailConfig.subject, personalizationData)
    const personalizedBody = this.personalizeText(emailConfig.template, personalizationData)

    try {
      await resend.emails.send({
        from: "Sprinter AI <hello@sprinter.ai>",
        to: sequence.lead_email,
        subject: personalizedSubject,
        html: this.formatEmailHtml(personalizedBody),
      })

      // Update sequence
      const supabase = await createClient()
      await supabase
        .from("lead_nurture_sequences")
        .update({
          current_step: currentStep + 1,
          next_action_date: this.calculateNextActionDate(currentStep + 1, sequence.sequence_name),
          updated_at: new Date().toISOString(),
        })
        .eq("id", sequence.id)

    } catch (error) {
      console.error("Error sending nurture email:", error)
    }
  }

  private personalizeText(template: string, data: Record<string, any>): string {
    let personalized = template
    Object.entries(data).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`
      personalized = personalized.replace(new RegExp(placeholder, "g"), String(value))
    })
    return personalized
  }

  private formatEmailHtml(body: string): string {
    // Convert line breaks to HTML
    const htmlBody = body.replace(/\n/g, "<br>")
    
    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="color: #374151; line-height: 1.6;">
          ${htmlBody}
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
        <p style="color: #6b7280; font-size: 12px;">
          Sprinter AI | AI Solutions for Private Equity<br>
          <a href="https://sprinter.ai" style="color: #2563eb;">sprinter.ai</a> | 
          <a href="tel:+16156010782" style="color: #2563eb;">+1 (615) 601-0782</a><br>
          <a href="https://sprinter.ai/unsubscribe" style="color: #6b7280;">Unsubscribe</a>
        </p>
      </div>
    `
  }

  private calculateNextActionDate(step: number, sequenceType: string): string {
    const sequence = NURTURE_SEQUENCES[sequenceType as keyof typeof NURTURE_SEQUENCES]
    if (!sequence || step >= sequence.length) {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    }

    const delayDays = sequence[step].delayDays
    return new Date(Date.now() + delayDays * 24 * 60 * 60 * 1000).toISOString()
  }

  private async completeSequence(sequenceId: string) {
    const supabase = await createClient()
    await supabase
      .from("lead_nurture_sequences")
      .update({
        status: "completed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", sequenceId)
  }

  // Lead scoring based on engagement
  async calculateLeadScore(email: string): Promise<number> {
    const supabase = await createClient()
    let score = 0

    // Check various engagement signals
    const { data: assessments } = await supabase
      .from("ai_assessment_leads")
      .select("*")
      .eq("email", email)
    if (assessments?.length) score += 30

    const { data: chats } = await supabase
      .from("chat_conversations")
      .select("*")
      .eq("email", email)
    if (chats?.length) score += 10 * Math.min(chats.length, 5)

    const { data: activities } = await supabase
      .from("lead_activities")
      .select("*")
      .eq("email", email)
    
    activities?.forEach(activity => {
      if (activity.activity_type === "chat_high_intent") score += 15
      if (activity.activity_type === "proposal_viewed") score += 20
      if (activity.activity_type === "sprint_page_viewed") score += 10
    })

    return Math.min(score, 100) // Cap at 100
  }
}