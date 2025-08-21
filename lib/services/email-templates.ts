// Cold email templates for PE outreach campaigns
// To be used with JustHireAI or similar email automation tools

export interface EmailTemplate {
  subject: string
  body: string
  followUps?: {
    days: number
    subject: string
    body: string
  }[]
}

export const peOutreachTemplates = {
  // Initial outreach - AI Assessment offer
  aiAssessment: {
    subject: "{{firstName}}, quick AI insight for {{company}}",
    body: `Hi {{firstName}},

I saw {{company}}'s recent {{recentActivity}} – congratulations! As you plan value creation, have you considered how AI might boost {{portfolioFocus}}'s growth?

AI can uncover operational improvements or hidden deal opportunities that drive ROI fast. In fact, tasks that took weeks in due diligence can now take minutes with the right tools.

We developed an AI Readiness Assessment specifically for PE firms – it identifies where AI could increase your portfolio's value in a 10-minute questionnaire. We'll even send you a custom report. No cost.

Our team at Sprinter has worked with firms like Vero Capital and Rock Hill Capital to kickstart AI initiatives – the feedback has been fantastic.

Would you be open to see what AI can do for {{company}}? You can get your free AI Opportunities Report here: https://sprinter.ai/ai-assessment

Thanks,
{{senderName}}
CMO @ Sprinter AI

P.S. Only ~40% of PE firms have an AI strategy yet – those who move first are gaining an edge. This report shows where you stand.`,
    followUps: [
      {
        days: 3,
        subject: "Re: {{firstName}}, quick AI insight for {{company}}",
        body: `Following up – we just helped another PE firm save 100+ analyst hours in deal sourcing with an AI tool. 

Happy to share that story or see what it could do for {{company}}.

The free assessment is still available: https://sprinter.ai/ai-assessment`
      },
      {
        days: 7,
        subject: "Last check - AI opportunities for {{company}}",
        body: `AI in PE is moving fast – 40% of GPs already have a strategy!

Even a quick assessment might spark an idea for your team. Last call to grab that free report if interested: https://sprinter.ai/ai-assessment

Won't bug you further – but if AI comes up in your next partner meeting, feel free to use the free tool I mentioned.

Cheers,
{{senderName}}`
      }
    ]
  },

  // Direct to AI Sprint offer (for warmer leads)
  aiSprint: {
    subject: "{{company}}: From AI strategy to prototype in 5 days?",
    body: `Hi {{firstName}},

Quick question: What if you could implement your first AI solution before your next partners meeting?

We run 5-day AI Sprints for PE firms where we:
• Identify your highest-ROI AI opportunity
• Build a working prototype or proof-of-concept
• Deliver a complete implementation roadmap

Recent example: Helped a $2B PE firm find 47 off-market targets they'd missed – all in one week.

Fixed price: $2,500. If we don't identify 10x that value in potential ROI, full refund.

We only run 5 sprints per month. Currently have 2 spots left for {{currentMonth}}.

Interested? Details here: https://sprinter.ai/ai-sprint

Or just reply "yes" and I'll send more info.

Best,
{{senderName}}
Sprinter AI`,
    followUps: [
      {
        days: 2,
        subject: "Re: From AI strategy to prototype in 5 days",
        body: `Hi {{firstName}},

Just wanted to make sure you saw this – we're down to the last spot for {{currentMonth}}.

The AI Sprint has been a game-changer for firms looking to move fast on AI without the usual consulting overhead.

Let me know if you'd like to grab that spot: https://sprinter.ai/ai-sprint`
      }
    ]
  },

  // Partnership program for qualified leads
  aiPartnership: {
    subject: "{{company}}'s AI Center of Excellence (without building one)",
    body: `{{firstName}},

What if you had an entire AI team working on {{company}}'s opportunities 24/7 – for less than the cost of one data scientist?

That's our AI Partnership Program. We become your dedicated AI innovation team:
• Continuous AI implementations across your portfolio
• From deal sourcing to portfolio optimization
• Month-to-month, no long-term commitment
• 5x ROI guarantee

One client (PE firm, $5B AUM) told us: "In 6 months, we've automated 70% of our due diligence and identified 3 successful acquisitions through AI-powered sourcing."

We're selecting 3 founding partners this quarter at special rates.

Worth a conversation? 15-minute exec briefing available here: https://sprinter.ai/ai-partnership

Best,
{{senderName}}
Sprinter AI`,
    followUps: [
      {
        days: 4,
        subject: "Founding partner opportunity closing soon",
        body: `{{firstName}},

Quick update – we're down to 1 founding partner spot for the AI Partnership Program.

The economics are compelling: Get enterprise AI capabilities for ~5% of the cost of building internally.

If {{company}} is exploring AI seriously, this could accelerate everything.

Details: https://sprinter.ai/ai-partnership`
      }
    ]
  },

  // Content-based nurture
  aiInsights: {
    subject: "{{firstName}}: How {{competitorOrPeer}} is using AI for deal sourcing",
    body: `Hi {{firstName}},

Thought you might find this interesting – {{competitorOrPeer}} recently shared how they're using AI to evaluate acquisition targets in hours instead of weeks.

The approach is surprisingly straightforward (and replicable).

We put together a quick analysis of what they're doing and 3 ways {{company}} could implement something similar: https://sprinter.ai/blog/ai-deal-sourcing-pe

No sales pitch – just thought it might spark some ideas for your team.

Best,
{{senderName}}

P.S. If you want to discuss how to implement this at {{company}}, happy to share what we've learned working with similar firms.`
  },

  // Re-engagement for cold leads
  reEngagement: {
    subject: "{{firstName}} - AI update from Sprinter",
    body: `Hi {{firstName}},

Been a while! Wanted to share what's new in AI for PE since we last connected:

1. GPT-4 can now analyze entire data rooms in minutes
2. New tools can find off-market deals at 10x the speed
3. Several PE firms report 80% reduction in DD time

If {{company}} is revisiting AI strategy for {{currentYear}}, we have some resources that might help:

• Free AI Readiness Assessment: https://sprinter.ai/ai-assessment
• 5-Day AI Sprint (build your first solution): https://sprinter.ai/ai-sprint

No pressure – just wanted to keep you in the loop on what's possible now.

Best,
{{senderName}}
Sprinter AI`
  }
}

// Helper function to personalize templates
export function personalizeEmail(
  template: EmailTemplate,
  data: Record<string, string>
): EmailTemplate {
  let personalizedSubject = template.subject
  let personalizedBody = template.body
  
  // Replace all placeholders with actual data
  Object.entries(data).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`
    personalizedSubject = personalizedSubject.replace(new RegExp(placeholder, 'g'), value)
    personalizedBody = personalizedBody.replace(new RegExp(placeholder, 'g'), value)
  })
  
  // Personalize follow-ups if they exist
  const personalizedFollowUps = template.followUps?.map(followUp => ({
    ...followUp,
    subject: Object.entries(data).reduce(
      (subject, [key, value]) => subject.replace(new RegExp(`{{${key}}}`, 'g'), value),
      followUp.subject
    ),
    body: Object.entries(data).reduce(
      (body, [key, value]) => body.replace(new RegExp(`{{${key}}}`, 'g'), value),
      followUp.body
    )
  }))
  
  return {
    subject: personalizedSubject,
    body: personalizedBody,
    followUps: personalizedFollowUps
  }
}

// Sample PE firm data for outreach
export const samplePETargets = [
  {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@examplepe.com",
    company: "Example Capital Partners",
    role: "Managing Partner",
    recentActivity: "acquisition of TechCo",
    portfolioFocus: "enterprise software",
    competitorOrPeer: "Silver Lake",
    currentMonth: "December",
    currentYear: "2024",
    senderName: "Your Name"
  },
  // Add more targets as needed
]

// Email sequence automation logic
export interface EmailCampaign {
  targetEmail: string
  templateKey: keyof typeof peOutreachTemplates
  personalizationData: Record<string, string>
  status: 'pending' | 'sent' | 'opened' | 'clicked' | 'replied' | 'unsubscribed'
  sentAt?: Date
  followUpsSent: number
  nextFollowUpDate?: Date
}

export class EmailCampaignManager {
  campaigns: EmailCampaign[] = []
  
  addCampaign(
    email: string, 
    templateKey: keyof typeof peOutreachTemplates,
    data: Record<string, string>
  ) {
    this.campaigns.push({
      targetEmail: email,
      templateKey,
      personalizationData: data,
      status: 'pending',
      followUpsSent: 0
    })
  }
  
  getNextEmailsToSend(): Array<{
    campaign: EmailCampaign
    email: EmailTemplate
    isFollowUp: boolean
  }> {
    const now = new Date()
    const emailsToSend = []
    
    for (const campaign of this.campaigns) {
      const template = peOutreachTemplates[campaign.templateKey]
      
      // Send initial email if pending
      if (campaign.status === 'pending') {
        emailsToSend.push({
          campaign,
          email: personalizeEmail(template, campaign.personalizationData),
          isFollowUp: false
        })
      }
      // Send follow-up if due
      else if (
        campaign.status === 'sent' && 
        campaign.nextFollowUpDate && 
        campaign.nextFollowUpDate <= now &&
        template.followUps &&
        campaign.followUpsSent < template.followUps.length
      ) {
        const followUp = template.followUps[campaign.followUpsSent]
        emailsToSend.push({
          campaign,
          email: {
            subject: followUp.subject,
            body: followUp.body
          },
          isFollowUp: true
        })
      }
    }
    
    return emailsToSend
  }
  
  markAsSent(campaign: EmailCampaign, isFollowUp: boolean = false) {
    campaign.status = 'sent'
    campaign.sentAt = new Date()
    
    if (isFollowUp) {
      campaign.followUpsSent++
    }
    
    // Schedule next follow-up if available
    const template = peOutreachTemplates[campaign.templateKey]
    if (template.followUps && campaign.followUpsSent < template.followUps.length) {
      const nextFollowUp = template.followUps[campaign.followUpsSent]
      const nextDate = new Date()
      nextDate.setDate(nextDate.getDate() + nextFollowUp.days)
      campaign.nextFollowUpDate = nextDate
    }
  }
  
  updateStatus(email: string, status: EmailCampaign['status']) {
    const campaign = this.campaigns.find(c => c.targetEmail === email)
    if (campaign) {
      campaign.status = status
      // Stop follow-ups if replied or unsubscribed
      if (status === 'replied' || status === 'unsubscribed') {
        campaign.nextFollowUpDate = undefined
      }
    }
  }
}