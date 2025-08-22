'use server'

import { anthropic } from '@ai-sdk/anthropic'
import { generateObject } from 'ai'
import { z } from 'zod'

const PlaybookSchema = z.object({
  title: z.string(),
  executive_summary: z.string(),
  business_case: z.object({
    current_state: z.array(z.string()),
    future_state: z.array(z.string()),
    value_drivers: z.array(z.string()),
    roi_projection: z.string()
  }),
  implementation_roadmap: z.array(z.object({
    phase: z.string(),
    duration: z.string(),
    objectives: z.array(z.string()),
    deliverables: z.array(z.string()),
    success_metrics: z.array(z.string())
  })),
  technology_stack: z.array(z.object({
    category: z.string(),
    tools: z.array(z.string()),
    purpose: z.string()
  })),
  team_structure: z.array(z.object({
    role: z.string(),
    count: z.number(),
    responsibilities: z.array(z.string())
  })),
  risk_mitigation: z.array(z.object({
    risk: z.string(),
    impact: z.string(),
    mitigation: z.string()
  })),
  success_metrics: z.array(z.object({
    metric: z.string(),
    baseline: z.string(),
    target: z.string(),
    timeline: z.string()
  })),
  budget_estimate: z.array(z.object({
    category: z.string(),
    year1: z.string(),
    year2: z.string(),
    year3: z.string()
  }))
})

export async function generatePlaybook(formData: {
  company: string
  industry: string
  size: string
  challenge: string
  timeline: string
  budget: string
  priorities: string
}) {
  const prompt = `Generate a comprehensive AI transformation playbook for:
Company: ${formData.company}
Industry: ${formData.industry}
Size: ${formData.size}
Timeline: ${formData.timeline}
Budget: ${formData.budget}
Challenge: ${formData.challenge}
Priorities: ${formData.priorities}

Create a detailed, actionable playbook that includes:
1. Executive summary with clear value proposition
2. Business case with current vs future state analysis
3. Phased implementation roadmap (3-4 phases)
4. Technology stack recommendations
5. Team structure and roles needed
6. Risk mitigation strategies
7. Success metrics with baselines and targets
8. Budget breakdown by category and year

Make it specific to their industry and challenge. Include concrete metrics, realistic timelines, and actionable recommendations.
Focus on high-ROI AI applications that can show quick wins while building toward transformational change.
Consider their budget constraints and company size when making recommendations.`

  const { object } = await generateObject({
    model: anthropic('claude-3-5-sonnet-20241022'),
    schema: PlaybookSchema,
    prompt,
  })

  return object
}