// Proposal templates for different project types

import type { ProposalTemplate } from '@/lib/types/proposal'

export const pocSprintTemplate: ProposalTemplate = {
  id: 'poc-sprint',
  name: 'POC Sprint Template',
  description: 'Template for 2-4 week proof-of-concept sprints',
  type: 'poc_sprint',
  contentSchema: {
    sections: [
      {
        id: 'greeting',
        title: 'Introduction',
        type: 'greeting',
        template: `Dear {{clientName}},

Thank you for the opportunity to work with {{clientCompany}}. We appreciate the background materials you shared – they were exactly what we needed to understand your {{problemArea}} challenge. We're excited to propose a short Proof-of-Concept sprint to build and validate an AI-powered solution that could {{valueProposition}}. This proposal outlines a focused {{duration}}-week engagement to deliver a functional prototype for your review.`,
        required: true,
        order: 1
      },
      {
        id: 'overview',
        title: 'Project Overview',
        type: 'overview',
        template: `{{clientCompany}} {{currentSituation}}. We understand your goal is to {{desiredOutcome}}.

Our proposed {{solutionName}} POC will target exactly this: using state-of-the-art AI to {{solutionApproach}}. By starting with a limited-scope prototype, we can demonstrate feasibility within weeks, giving you confidence to potentially integrate AI into your workflow with minimal risk or upfront cost.`,
        required: true,
        order: 2
      },
      {
        id: 'goals',
        title: 'Goals & Success Criteria',
        type: 'goals',
        template: `Goals:
{{#goals}}
• {{title}}: {{description}}
{{/goals}}

Success Criteria:
{{#successCriteria}}
• {{criterion}}: {{measurement}}
{{/successCriteria}}`,
        required: true,
        order: 3
      },
      {
        id: 'scope',
        title: 'Scope of Work',
        type: 'scope',
        template: `In this {{duration}}-week engineering sprint, Sprinter AI will design and deliver a {{deliverableName}} prototype with the following scope:

**Approach:** {{approach}}

**In-Scope Tasks:**
{{#tasks}}
• {{.}}
{{/tasks}}

**Deliverables:**
{{#deliverables}}
• **{{name}}** – {{description}}
{{/deliverables}}

**Out of Scope:** {{outOfScope}}`,
        required: true,
        order: 4
      },
      {
        id: 'timeline',
        title: 'Timeline & Schedule',
        type: 'timeline',
        template: `**Project Duration:** {{duration}} weeks total ({{effort}} of dedicated effort).

{{#milestones}}
**{{timing}}:** {{title}}
{{description}}
{{/milestones}}

**Meeting Cadence:** {{meetingCadence}}`,
        required: true,
        order: 5
      },
      {
        id: 'investment',
        title: 'Investment & Terms',
        type: 'pricing',
        template: `We propose a fixed price of **{{totalPrice}}** for this POC Sprint. This includes all design, development, and testing work described, delivered over the {{duration}}-week timeline.

**Payment Terms:** {{paymentTerms}}

{{#creditOption}}
If you choose to continue to a full implementation with us, note that {{creditAmount}} of this POC cost will be credited toward the next phase of the project – effectively giving you a discount on the follow-on work as a thank-you for continuing our partnership.
{{/creditOption}}

This pricing is a small fraction of the cost of a full product build, yet is designed to yield outsized insights. By the end of the POC, you'll know with high confidence whether an AI solution can {{expectedOutcome}}, before investing further.`,
        required: true,
        order: 6
      },
      {
        id: 'guarantee',
        title: 'Our Commitment & Guarantee',
        type: 'guarantee',
        template: `We are confident in our ability to deliver value. Our guarantees for this POC:

**On-Time & On-Target:** We commit to delivering the functional {{deliverableName}} prototype and results by the agreed timeline. If unforeseen delays occur on our side, we will communicate early and not charge for any extension needed to meet the goals.

**Satisfaction Guarantee:** If the POC does not meet the success criteria defined above, we will extend our work by up to 2 additional weeks at no extra cost to address the gaps. Our goal is that you end this POC feeling it was a worthwhile investment.

**Value Regardless:** Even if you decide not to move beyond the POC, you will still have:
• A working prototype you can use internally or show stakeholders,
• {{additionalValue1}}
• {{additionalValue2}}

We ensure the deliverables are in a form that you keep and benefit from independently.`,
        required: false,
        order: 7
      },
      {
        id: 'requirements',
        title: 'What We Need from You',
        type: 'requirements',
        template: `To hit the ground running on {{startDate}}, we ask for the following from your side:

{{#requirements}}
• **{{title}}:** {{description}}
{{/requirements}}

Other than that, leave the rest to us! We'll handle everything else needed to develop the prototype. We aim to make this process as easy as possible for you and your team.`,
        required: true,
        order: 8
      },
      {
        id: 'nextSteps',
        title: 'Next Steps',
        type: 'nextSteps',
        template: `To proceed, simply reply confirming your acceptance of this proposal, or sign below. Once we receive your approval, we will countersign and send the invoice for the initial payment to kick off.

**Target Start Date:** {{startDate}}
**Target Completion:** {{endDate}}

We look forward to working with you on this exciting initiative. By this time next month, you could be {{futureState}}.

Thank you for entrusting Sprinter AI with this opportunity. We're confident this POC will demonstrate a clear path to {{businessImpact}}.`,
        required: true,
        order: 9
      }
    ],
    variables: [
      { key: 'clientName', label: 'Client Name', type: 'text', required: true },
      { key: 'clientCompany', label: 'Client Company', type: 'text', required: true },
      { key: 'problemArea', label: 'Problem Area', type: 'text', required: true },
      { key: 'valueProposition', label: 'Value Proposition', type: 'textarea', required: true },
      { key: 'duration', label: 'Duration (weeks)', type: 'number', required: true, defaultValue: 4 },
      { key: 'effort', label: 'Effort Description', type: 'text', required: true, defaultValue: '2 weeks of dedicated effort' },
      { key: 'currentSituation', label: 'Current Situation', type: 'textarea', required: true },
      { key: 'desiredOutcome', label: 'Desired Outcome', type: 'textarea', required: true },
      { key: 'solutionName', label: 'Solution Name', type: 'text', required: true },
      { key: 'solutionApproach', label: 'Solution Approach', type: 'textarea', required: true },
      { key: 'deliverableName', label: 'Main Deliverable Name', type: 'text', required: true },
      { key: 'approach', label: 'Technical Approach', type: 'textarea', required: true },
      { key: 'outOfScope', label: 'Out of Scope', type: 'textarea', required: false },
      { key: 'totalPrice', label: 'Total Price', type: 'text', required: true, defaultValue: '$20,000' },
      { key: 'paymentTerms', label: 'Payment Terms', type: 'textarea', required: true },
      { key: 'creditOption', label: 'Include Credit Option?', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]},
      { key: 'creditAmount', label: 'Credit Amount', type: 'text', required: false, defaultValue: '$5,000' },
      { key: 'meetingCadence', label: 'Meeting Cadence', type: 'text', required: true, defaultValue: 'Weekly 30-minute check-ins' },
      { key: 'startDate', label: 'Start Date', type: 'date', required: true },
      { key: 'endDate', label: 'End Date', type: 'date', required: true },
      { key: 'expectedOutcome', label: 'Expected Outcome', type: 'textarea', required: true },
      { key: 'additionalValue1', label: 'Additional Value 1', type: 'text', required: false },
      { key: 'additionalValue2', label: 'Additional Value 2', type: 'text', required: false },
      { key: 'futureState', label: 'Future State Vision', type: 'textarea', required: true },
      { key: 'businessImpact', label: 'Business Impact', type: 'textarea', required: true }
    ]
  },
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const workshopTemplate: ProposalTemplate = {
  id: 'workshop',
  name: 'AI Workshop Template',
  description: 'Template for 1-day AI strategy workshops',
  type: 'workshop',
  contentSchema: {
    sections: [
      {
        id: 'greeting',
        title: 'Introduction',
        type: 'greeting',
        template: `Dear {{clientName}},

Thank you for your interest in our AI Strategy Workshop. We're excited to help {{clientCompany}} explore how AI can transform your {{focusArea}}.`,
        required: true,
        order: 1
      },
      {
        id: 'overview',
        title: 'Workshop Overview',
        type: 'overview',
        template: `This intensive one-day workshop will bring together your key stakeholders to:
• Identify high-impact AI opportunities specific to {{clientCompany}}
• Develop a prioritized AI roadmap
• Create actionable next steps for implementation

Our experienced facilitators will guide your team through proven frameworks and real-world examples relevant to {{industry}}.`,
        required: true,
        order: 2
      },
      {
        id: 'agenda',
        title: 'Workshop Agenda',
        type: 'agenda',
        template: `**Morning Session (9:00 AM - 12:00 PM)**
• AI Fundamentals & Current State Assessment
• Opportunity Identification Exercise
• Use Case Prioritization Framework

**Afternoon Session (1:00 PM - 5:00 PM)**
• Deep Dive on Top 3 Opportunities
• Implementation Roadmap Development
• Resource Planning & Next Steps`,
        required: true,
        order: 3
      },
      {
        id: 'deliverables',
        title: 'Deliverables',
        type: 'list',
        template: `You will receive:
• AI Opportunity Matrix with 10+ identified use cases
• Prioritized Implementation Roadmap
• Cost-Benefit Analysis for top 3 opportunities
• Workshop Recording & All Materials
• 30-day follow-up consultation call`,
        required: true,
        order: 4
      },
      {
        id: 'investment',
        title: 'Investment',
        type: 'pricing',
        template: `**Workshop Fee:** {{price}} for up to {{maxParticipants}} participants
**Location:** {{location}}
**Date Options:** {{dateOptions}}

This includes all facilitation, materials, and post-workshop deliverables.`,
        required: true,
        order: 5
      }
    ],
    variables: [
      { key: 'clientName', label: 'Client Name', type: 'text', required: true },
      { key: 'clientCompany', label: 'Client Company', type: 'text', required: true },
      { key: 'focusArea', label: 'Focus Area', type: 'text', required: true },
      { key: 'industry', label: 'Industry', type: 'text', required: true },
      { key: 'price', label: 'Workshop Price', type: 'text', required: true, defaultValue: '$5,000' },
      { key: 'maxParticipants', label: 'Max Participants', type: 'number', required: true, defaultValue: 12 },
      { key: 'location', label: 'Location', type: 'text', required: true },
      { key: 'dateOptions', label: 'Date Options', type: 'text', required: true }
    ]
  },
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const transformationTemplate: ProposalTemplate = {
  id: 'transformation',
  name: 'AI Transformation Template',
  description: 'Template for 3-6 month enterprise AI transformation projects',
  type: 'transformation',
  contentSchema: {
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        type: 'summary',
        template: `{{clientCompany}} has the opportunity to {{transformationVision}}. This proposal outlines a {{duration}}-month engagement to {{primaryObjective}}.

Expected outcomes include:
• {{outcome1}}
• {{outcome2}}
• {{outcome3}}

Total investment: {{totalInvestment}}
Expected ROI: {{expectedROI}} within {{roiTimeframe}}`,
        required: true,
        order: 1
      },
      {
        id: 'current-state',
        title: 'Current State Analysis',
        type: 'analysis',
        template: `Based on our assessment, {{clientCompany}} currently:
{{#currentChallenges}}
• {{.}}
{{/currentChallenges}}

These challenges result in:
• {{impact1}}
• {{impact2}}
• Annual cost of {{annualCost}}`,
        required: true,
        order: 2
      },
      {
        id: 'transformation-approach',
        title: 'Transformation Approach',
        type: 'approach',
        template: `Our phased approach ensures sustainable change:

**Phase 1: Foundation (Months 1-2)**
{{phase1Description}}

**Phase 2: Implementation (Months 3-4)**
{{phase2Description}}

**Phase 3: Scale & Optimize (Months 5-6)**
{{phase3Description}}`,
        required: true,
        order: 3
      },
      {
        id: 'investment-structure',
        title: 'Investment Structure',
        type: 'investment',
        template: `**Total Investment:** {{totalInvestment}}

**Monthly Breakdown:**
• Months 1-2: {{month12Cost}} per month
• Months 3-4: {{month34Cost}} per month
• Months 5-6: {{month56Cost}} per month

**Included Services:**
• Dedicated AI team ({{teamSize}} experts)
• All development and implementation
• Training and change management
• Ongoing support and optimization`,
        required: true,
        order: 4
      }
    ],
    variables: [
      { key: 'clientCompany', label: 'Client Company', type: 'text', required: true },
      { key: 'transformationVision', label: 'Transformation Vision', type: 'textarea', required: true },
      { key: 'duration', label: 'Duration (months)', type: 'number', required: true, defaultValue: 6 },
      { key: 'primaryObjective', label: 'Primary Objective', type: 'textarea', required: true },
      { key: 'outcome1', label: 'Expected Outcome 1', type: 'text', required: true },
      { key: 'outcome2', label: 'Expected Outcome 2', type: 'text', required: true },
      { key: 'outcome3', label: 'Expected Outcome 3', type: 'text', required: true },
      { key: 'totalInvestment', label: 'Total Investment', type: 'text', required: true, defaultValue: '$250,000' },
      { key: 'expectedROI', label: 'Expected ROI', type: 'text', required: true },
      { key: 'roiTimeframe', label: 'ROI Timeframe', type: 'text', required: true },
      { key: 'impact1', label: 'Current Impact 1', type: 'text', required: true },
      { key: 'impact2', label: 'Current Impact 2', type: 'text', required: true },
      { key: 'annualCost', label: 'Annual Cost of Status Quo', type: 'text', required: true },
      { key: 'phase1Description', label: 'Phase 1 Description', type: 'textarea', required: true },
      { key: 'phase2Description', label: 'Phase 2 Description', type: 'textarea', required: true },
      { key: 'phase3Description', label: 'Phase 3 Description', type: 'textarea', required: true },
      { key: 'month12Cost', label: 'Months 1-2 Cost', type: 'text', required: true },
      { key: 'month34Cost', label: 'Months 3-4 Cost', type: 'text', required: true },
      { key: 'month56Cost', label: 'Months 5-6 Cost', type: 'text', required: true },
      { key: 'teamSize', label: 'Team Size', type: 'text', required: true, defaultValue: '3-5' }
    ]
  },
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const proposalTemplates = [
  pocSprintTemplate,
  workshopTemplate,
  transformationTemplate
]

// Helper function to populate template with variables
export function populateTemplate(
  template: string,
  variables: Record<string, unknown>
): string {
  let result = template
  
  // First, handle arrays and conditionals {{#key}}...{{/key}}
  const blockPattern = /{{#(\w+)}}([\s\S]*?){{\/\1}}/g
  const processedBlocks = new Set<string>()
  
  result = result.replace(blockPattern, (match, key, content) => {
    const value = variables[key]
    processedBlocks.add(key)
    
    // If it's an array, process it
    if (Array.isArray(value)) {
      return value.map(item => {
        let itemContent = content
        if (typeof item === 'object' && item !== null) {
          Object.entries(item).forEach(([itemKey, itemValue]) => {
            const itemRegex = new RegExp(`{{${itemKey}}}`, 'g')
            itemContent = itemContent.replace(itemRegex, String(itemValue || ''))
          })
        } else {
          itemContent = itemContent.replace(/{{\.}}/g, String(item))
        }
        return itemContent.trim()
      }).join('\n')
    }
    
    // Handle boolean conditionals (creditOption, etc.)
    if (typeof value === 'boolean' || value === 'yes' || value === 'no') {
      const isTrue = value === true || value === 'yes'
      if (isTrue) {
        // Process nested variables within the conditional block
        let processedContent = content
        Object.entries(variables).forEach(([nestedKey, nestedValue]) => {
          if (nestedKey !== key) {
            const nestedRegex = new RegExp(`{{${nestedKey}}}`, 'g')
            processedContent = processedContent.replace(nestedRegex, String(nestedValue || ''))
          }
        })
        return processedContent.trim()
      }
      return ''
    }
    
    // For other truthy/falsy values
    return value ? content.trim() : ''
  })
  
  // Then replace simple variables {{variable}}
  Object.entries(variables).forEach(([key, value]) => {
    // Skip if we already processed this as a block
    if (processedBlocks.has(key)) return
    
    const regex = new RegExp(`{{${key}}}`, 'g')
    result = result.replace(regex, String(value || ''))
  })
  
  return result
}