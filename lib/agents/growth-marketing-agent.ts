import { openai } from "@ai-sdk/openai"
import { generateText, generateObject } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { EmailCampaignManager, personalizeEmail, peOutreachTemplates } from "@/lib/services/email-templates"
import { LeadNurtureService } from "@/lib/services/lead-nurture"

interface AgentAction {
  type: "email" | "nurture" | "score" | "analyze" | "schedule"
  target?: string
  data?: Record<string, any>
  priority: number
  reasoning: string
}

export class GrowthMarketingAgent {
  private campaignManager: EmailCampaignManager
  private nurtureService: LeadNurtureService
  
  constructor() {
    this.campaignManager = new EmailCampaignManager()
    this.nurtureService = new LeadNurtureService()
  }

  // Main agent loop - run daily or on trigger
  async performDailyTasks() {
    console.log("🤖 Growth Marketing Agent starting daily tasks...")
    
    try {
      // 1. Analyze current state
      const metrics = await this.gatherMetrics()
      const actions = await this.planActions(metrics)
      
      // 2. Execute planned actions
      for (const action of actions) {
        await this.executeAction(action)
      }
      
      // 3. Process nurture sequences
      await this.nurtureService.processNurtureSequences()
      
      // 4. Generate insights report
      const insights = await this.generateInsights(metrics, actions)
      await this.sendInsightsReport(insights)
      
      console.log("✅ Growth Marketing Agent completed daily tasks")
      
    } catch (error) {
      console.error("❌ Growth Marketing Agent error:", error)
      await this.notifyError(error)
    }
  }

  private async gatherMetrics(): Promise<Record<string, any>> {
    const supabase = await createClient()
    const now = new Date()
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    
    // Gather key metrics
    const [leads, assessments, proposals, campaigns] = await Promise.all([
      // New leads
      supabase
        .from("contact_leads")
        .select("*")
        .gte("created_at", yesterday.toISOString()),
      
      // Assessment completions
      supabase
        .from("ai_assessment_leads")
        .select("*")
        .gte("created_at", yesterday.toISOString()),
      
      // Proposal activity
      supabase
        .from("proposals")
        .select("*, proposal_events(*)")
        .gte("updated_at", yesterday.toISOString()),
      
      // Email campaign performance
      supabase
        .from("email_campaigns")
        .select("*")
        .in("status", ["sent", "opened", "clicked", "replied"])
    ])
    
    return {
      newLeads: leads.data?.length || 0,
      assessments: assessments.data || [],
      proposalActivity: proposals.data || [],
      campaignMetrics: this.analyzeCampaignPerformance(campaigns.data || []),
      timestamp: now.toISOString()
    }
  }

  private async planActions(metrics: Record<string, any>): Promise<AgentAction[]> {
    // Use AI to plan optimal actions based on current metrics
    const prompt = `
    As a Growth Marketing Agent for Sprinter AI (PE-focused AI consulting), analyze these metrics and plan actions:
    
    Metrics:
    - New leads: ${metrics.newLeads}
    - Assessments completed: ${metrics.assessments.length}
    - Proposal activity: ${JSON.stringify(metrics.proposalActivity.map((p: any) => ({
      id: p.id,
      status: p.status,
      events: p.proposal_events?.length || 0
    })))}
    - Campaign performance: ${JSON.stringify(metrics.campaignMetrics)}
    
    Available actions:
    1. Send personalized follow-up emails to high-intent leads
    2. Start nurture sequences for new assessment completions
    3. Re-engage cold leads with new content
    4. Schedule meetings for hot leads
    5. Update lead scores based on engagement
    
    Prioritize actions that will maximize conversions to AI Sprint ($2,500) or Partnership ($5-10K/mo).
    Return a JSON object with an 'actions' array containing objects with type, target, priority (1-10), and reasoning.
    `
    
    const { object } = await generateObject({
      model: openai("gpt-5"),
      schema: z.object({
        actions: z.array(z.object({
          type: z.enum(["email", "nurture", "score", "analyze", "schedule"]),
          target: z.string().optional(),
          priority: z.number(),
          reasoning: z.string(),
          data: z.record(z.string(), z.any()).optional()
        }))
      }),
      system: "You are a growth marketing AI agent analyzing metrics and planning actions.",
      prompt
    })
    
    return object.actions as AgentAction[] || []
  }

  private async executeAction(action: AgentAction) {
    console.log(`📧 Executing action: ${action.type} for ${action.target || "batch"}`)
    
    switch (action.type) {
      case "email":
        await this.sendPersonalizedEmail(action)
        break
      
      case "nurture":
        await this.startNurtureSequence(action)
        break
      
      case "score":
        await this.updateLeadScores(action)
        break
      
      case "analyze":
        await this.deepAnalyzeProspect(action)
        break
      
      case "schedule":
        await this.suggestMeetingTime(action)
        break
    }
  }

  private async sendPersonalizedEmail(action: AgentAction) {
    if (!action.target || !action.data) return
    
    // Get lead data
    const supabase = await createClient()
    const { data: lead } = await supabase
      .from("contact_leads")
      .select("*")
      .eq("email", action.target)
      .single()
    
    if (!lead) return
    
    // Generate personalized email using AI
    const emailContent = await this.generatePersonalizedEmail(lead, action.data.context)
    
    // Send email
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const { Resend } = await import("resend")
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: "Sprinter AI <hello@sprinter.ai>",
        to: lead.email,
        subject: emailContent.subject,
        html: emailContent.html
      })
    } else {
      console.log("Resend not configured - skipping email send")
    }
    
    // Track in campaigns table
    await supabase.from("email_campaigns").insert({
      target_email: lead.email,
      target_name: lead.name,
      target_company: lead.company,
      template_key: "ai_generated",
      personalization_data: action.data,
      status: "sent",
      sent_at: new Date().toISOString()
    })
  }

  private async generatePersonalizedEmail(
    lead: any,
    context: string
  ): Promise<{ subject: string; html: string }> {
    const prompt = `
    Write a personalized follow-up email for:
    Name: ${lead.name}
    Company: ${lead.company}
    Context: ${context}
    
    Goal: Move them toward booking an AI Sprint ($2,500) or free assessment.
    Tone: Professional but conversational, focused on value and ROI.
    Length: 3-4 short paragraphs max.
    
    Include:
    - Reference to their specific situation/company
    - One compelling PE + AI stat
    - Clear call to action
    
    Return a JSON object with 'subject' and 'body' string fields.
    `
    
    const { object: email } = await generateObject({
      model: openai("gpt-5"),
      schema: z.object({
        subject: z.string(),
        body: z.string()
      }),
      system: "You are an expert B2B email copywriter for PE firms.",
      prompt,
      temperature: 0.8
    })
    
    return {
      subject: email.subject || "Quick question about AI at " + lead.company,
      html: this.formatEmailHtml(email.body || "")
    }
  }

  private formatEmailHtml(body: string): string {
    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="color: #374151; line-height: 1.6;">
          ${body.replace(/\n/g, "<br>")}
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
        <p style="color: #6b7280; font-size: 14px;">
          Best regards,<br>
          The Sprinter AI Team<br>
          <a href="https://sprinter.ai" style="color: #2563eb;">sprinter.ai</a> | 
          <a href="tel:+16156010782" style="color: #2563eb;">+1 (615) 601-0782</a>
        </p>
      </div>
    `
  }

  private async startNurtureSequence(action: AgentAction) {
    if (!action.target) return
    
    const supabase = await createClient()
    const { data: lead } = await supabase
      .from("ai_assessment_leads")
      .select("*")
      .eq("email", action.target)
      .single()
    
    if (lead) {
      await this.nurtureService.startNurtureSequence(
        {
          email: lead.email,
          firstName: lead.firstName,
          lastName: lead.lastName,
          company: lead.company,
          source: "ai_assessment",
          metadata: {
            primary_opportunity: this.identifyPrimaryOpportunity(lead)
          }
        },
        "ai_assessment_completed"
      )
    }
  }

  private identifyPrimaryOpportunity(lead: any): string {
    const interestMap: Record<string, string> = {
      deal_sourcing: "AI-powered deal sourcing",
      due_diligence: "automated due diligence",
      portfolio_ops: "portfolio operations optimization",
      value_creation: "AI-driven value creation"
    }
    
    return interestMap[lead.primary_interest] || "AI implementation"
  }

  private async updateLeadScores(action: AgentAction) {
    const supabase = await createClient()
    
    // Get all active leads
    const { data: leads } = await supabase
      .from("contact_leads")
      .select("email")
      .eq("status", "new")
    
    for (const lead of leads || []) {
      const score = await this.nurtureService.calculateLeadScore(lead.email)
      
      // Update lead with score
      await supabase
        .from("contact_leads")
        .update({ 
          tags: supabase.rpc('array_append', { arr: 'tags', elem: `score:${score}` }),
          updated_at: new Date().toISOString()
        })
        .eq("email", lead.email)
      
      // Trigger action for hot leads
      if (score > 70) {
        console.log(`🔥 Hot lead detected: ${lead.email} (score: ${score})`)
        await this.notifyHotLead(lead.email, score)
      }
    }
  }

  private async deepAnalyzeProspect(action: AgentAction) {
    // Research prospect company using web search or enrichment APIs
    // Store insights for personalization
    console.log(`🔍 Deep analyzing prospect: ${action.target}`)
    // Implementation would use external APIs for company research
  }

  private async suggestMeetingTime(action: AgentAction) {
    // Integration with calendar API to suggest optimal meeting times
    console.log(`📅 Suggesting meeting time for: ${action.target}`)
    // Would integrate with Calendly API or similar
  }

  private analyzeCampaignPerformance(campaigns: any[]): Record<string, number> {
    const metrics = {
      sent: 0,
      opened: 0,
      clicked: 0,
      replied: 0,
      openRate: 0,
      clickRate: 0,
      replyRate: 0
    }
    
    campaigns.forEach(campaign => {
      if (campaign.status === "sent") metrics.sent++
      if (campaign.status === "opened") metrics.opened++
      if (campaign.status === "clicked") metrics.clicked++
      if (campaign.status === "replied") metrics.replied++
    })
    
    if (metrics.sent > 0) {
      metrics.openRate = (metrics.opened / metrics.sent) * 100
      metrics.clickRate = (metrics.clicked / metrics.sent) * 100
      metrics.replyRate = (metrics.replied / metrics.sent) * 100
    }
    
    return metrics
  }

  private async generateInsights(
    metrics: Record<string, any>,
    actions: AgentAction[]
  ): Promise<string> {
    const prompt = `
    Generate a brief insights report based on:
    
    Metrics: ${JSON.stringify(metrics)}
    Actions taken: ${actions.length} actions executed
    
    Provide:
    1. Key performance indicators
    2. Trends observed
    3. Recommendations for tomorrow
    
    Keep it concise (5-6 bullet points).
    `
    
    const { text } = await generateText({
      model: openai("gpt-5"),
      system: "You are a growth marketing analyst.",
      prompt,
      temperature: 0.7,
      maxRetries: 2
    })
    
    return text || "No insights generated"
  }

  private async sendInsightsReport(insights: string) {
    // Send daily insights to team
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const { Resend } = await import("resend")
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: "Growth Agent <hello@sprinter.ai>",
        to: "hello@sprinter.ai", // Or specific team members
        subject: `Growth Agent Daily Report - ${new Date().toLocaleDateString()}`,
        html: `
          <h2>🤖 Growth Marketing Agent Report</h2>
          <pre style="font-family: monospace; background: #f3f4f6; padding: 16px; border-radius: 8px;">
${insights}
          </pre>
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
            This report was generated automatically by the Growth Marketing Agent.
          </p>
        `
      })
    } else {
      console.log("Insights report:", insights)
    }
  }

  private async notifyHotLead(email: string, score: number) {
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const { Resend } = await import("resend")
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: "Growth Agent <hello@sprinter.ai>",
        to: "hello@sprinter.ai",
        subject: `🔥 Hot Lead Alert: ${email} (Score: ${score})`,
        html: `
          <h3>High-Intent Lead Detected!</h3>
          <p>Email: ${email}</p>
          <p>Lead Score: ${score}/100</p>
          <p>Recommended Action: Immediate personal outreach</p>
          <a href="mailto:${email}" style="display: inline-block; padding: 8px 16px; background: #2563eb; color: white; text-decoration: none; border-radius: 4px;">
            Contact Now
          </a>
        `
      })
    } else {
      console.log(`🔥 Hot Lead Alert: ${email} (Score: ${score})`)
    }
  }

  private async notifyError(error: any) {
    console.error("Growth Agent Error:", error)
    // Could send error notification to team
  }
}

// Cron job handler (to be called by Next.js API route or external scheduler)
export async function runGrowthAgent() {
  const agent = new GrowthMarketingAgent()
  await agent.performDailyTasks()
}