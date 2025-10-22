export type NurtureWorkflowSlug =
  | "lead-nurture.ai_assessment_completed"
  | "lead-nurture.contact_form_submitted"
  | "lead-nurture.high_intent_chat";

export interface NurtureWorkflowStep {
  id: string;
  delayDays: number;
  subject: string;
  template: string;
}

export interface NurtureWorkflowDefinition {
  slug: NurtureWorkflowSlug;
  name: string;
  description: string;
  steps: NurtureWorkflowStep[];
}

export const leadNurtureWorkflows: Record<string, NurtureWorkflowDefinition> = {
  ai_assessment_completed: {
    slug: "lead-nurture.ai_assessment_completed",
    name: "Assessment Follow-up",
    description: "Three-touch follow up after an AI readiness assessment is delivered.",
    steps: [
      {
        id: "assessment-step-1",
        delayDays: 2,
        subject: "{{firstName}}, have you reviewed your AI assessment?",
        template: `Hi {{firstName}},\n\nI wanted to follow up on the AI Readiness Assessment you received for {{company}}.\n\nThe report identified some significant opportunities - particularly around {{primary_opportunity}}.\n\nMany PE firms start with our 5-Day AI Sprint to implement their first quick win. \nAt $2,500, it's a low-risk way to see real ROI from AI.\n\nWould you like to discuss implementing one of the opportunities from your report?\n\nBest,\nThe Sprinter Team\n\nP.S. We only run 5 sprints per month and December is filling up quickly.`
      },
      {
        id: "assessment-step-2",
        delayDays: 7,
        subject: "Quick win: {{primary_opportunity}}",
        template: `{{firstName}},\n\nI've been thinking about your assessment results, specifically the opportunity around {{primary_opportunity}}.\n\nHere's a quick implementation path:\n1. Week 1: Set up the AI infrastructure\n2. Week 2: Train on your specific use case\n3. Week 3: Deploy and start seeing results\n\nThis is exactly what we do in our AI Sprint. Fixed price, guaranteed ROI.\n\nReady to move forward? Book your sprint here: https://sprinter.ai/ai-sprint\n\nOr reply with any questions.\n\nBest,\nThe Sprinter Team`
      },
      {
        id: "assessment-step-3",
        delayDays: 14,
        subject: "Last check - AI implementation for {{company}}",
        template: `Hi {{firstName}},\n\nI'll keep this brief. \n\nYour competitors are moving on AI. We can help {{company}} catch up and surpass them.\n\nThree options:\n1. Free consultation call - 15 minutes to discuss your specific situation\n2. AI Sprint - $2,500 to implement your first AI solution  \n3. Partnership Program - Ongoing AI innovation for your entire portfolio\n\nWhich makes sense for you?\n\nBest,\nThe Sprinter Team\n\nP.S. If now isn't the right time, just let me know and I'll check back in Q2.`
      }
    ]
  },
  contact_form_submitted: {
    slug: "lead-nurture.contact_form_submitted",
    name: "Contact Form Follow-up",
    description: "Two-touch follow-up for general contact form submissions.",
    steps: [
      {
        id: "contact-form-step-1",
        delayDays: 1,
        subject: "Following up on your inquiry",
        template: `Hi {{firstName}},\n\nThanks for reaching out to Sprinter AI. I wanted to make sure you got the information you needed.\n\nBased on your interest in {{project_type}}, I think you'd find value in:\n\n• Our free AI Readiness Assessment - understand your AI opportunities\n• A quick 15-minute call to discuss your specific needs\n\nWould either of these be helpful?\n\nBest,\nThe Sprinter Team\n\nBook a call: https://sprinter.ai/contact\nFree assessment: https://sprinter.ai/ai-assessment`
      },
      {
        id: "contact-form-step-2",
        delayDays: 3,
        subject: "Don't miss out on AI advantages",
        template: `{{firstName}},\n\n40% of PE firms already have AI strategies in place. \n\nIf {{company}} isn't exploring AI yet, you're already behind.\n\nWe can change that in 5 days with our AI Sprint:\n• Fixed $2,500 investment\n• Working AI prototype delivered\n• 100% money-back guarantee\n\nWorth a conversation?\n\nBest,\nThe Sprinter Team`
      }
    ]
  },
  high_intent_chat: {
    slug: "lead-nurture.high_intent_chat",
    name: "High Intent Chat Follow-up",
    description: "Immediate follow-up when chat intent score crosses the high-intent threshold.",
    steps: [
      {
        id: "high-intent-chat-step-1",
        delayDays: 0,
        subject: "Following up on our chat",
        template: `Hi {{firstName}},\n\nI noticed you were asking about {{chat_topic}} on our website earlier.\n\nI wanted to make sure you got your questions answered. Based on what you were looking for, \nI think a quick call would be valuable.\n\nI have some time tomorrow at 2pm ET or Thursday at 10am ET. \nWould either work for you?\n\nYou can also book directly here: https://sprinter.ai/contact\n\nBest,\nThe Sprinter Team\n\nP.S. If you prefer, just reply with your phone number and I'll call you right now.`
      }
    ]
  }
};

export function getNurtureWorkflow(sequence: keyof typeof leadNurtureWorkflows) {
  return leadNurtureWorkflows[sequence];
}
