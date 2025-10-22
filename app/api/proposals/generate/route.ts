import { NextResponse, NextRequest } from 'next/server'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import type { ProposalGenerationInput, ProposalTemplate } from '@/lib/types/proposal'
import { populateTemplate } from '@/lib/data/proposal-templates'
import { withRateLimit } from '@/lib/rate-limit'

// Configuration
const MODEL_CONFIG = {
  primary: process.env.AI_MODEL || 'gpt-5',
  fallback: 'gpt-5',
  maxOutputTokens: 2000,
  temperature: 0.4
}

async function handlePOST(request: NextRequest) {

  try {
    const { input, template, useAI = true } = await request.json() as {
      input: ProposalGenerationInput & { customSections?: Array<{ title: string; content: string }> }
      template: ProposalTemplate
      useAI: boolean
    }
    
    if (!input || !template) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Generate proposal sections
    const sections = []
    
    for (const sectionSchema of template.contentSchema.sections) {
      let sectionContent = ''
      
      if (useAI) {
        // Use AI to enhance or generate content
        const sectionPrompt = createSectionPrompt(sectionSchema, input)
        
        let text = ''
        try {
          // Try primary model first (GPT-5 or configured model)
          const result = await generateText({
            model: openai(MODEL_CONFIG.primary),
            system: `You are an expert business proposal writer for Sprinter AI, an AI consulting firm. 
            Generate professional, persuasive proposal content that:
            - Speaks directly to the client's needs and pain points
            - Highlights value and ROI clearly
            - Uses clear, concise business language
            - Maintains a confident yet approachable tone
            - Focuses on outcomes and benefits
            
            Client Context:
            Company: ${input.clientInfo.company || input.clientInfo.name}
            Project Type: ${input.projectDetails.type}
            Problem: ${input.projectDetails.problem}
            Opportunity: ${input.projectDetails.opportunity}`,
            prompt: sectionPrompt,
            temperature: MODEL_CONFIG.temperature,
            maxOutputTokens: MODEL_CONFIG.maxOutputTokens
          })
          text = result.text
        } catch (error) {
          console.warn(`Primary model (${MODEL_CONFIG.primary}) failed, falling back to ${MODEL_CONFIG.fallback}:`, error)
          // Fallback to GPT-5 if primary model fails
          const result = await generateText({
            model: openai(MODEL_CONFIG.fallback),
            system: `You are an expert business proposal writer for Sprinter AI, an AI consulting firm. 
            Generate professional, persuasive proposal content that:
            - Speaks directly to the client's needs and pain points
            - Highlights value and ROI clearly
            - Uses clear, concise business language
            - Maintains a confident yet approachable tone
            - Focuses on outcomes and benefits
            
            Client Context:
            Company: ${input.clientInfo.company || input.clientInfo.name}
            Project Type: ${input.projectDetails.type}
            Problem: ${input.projectDetails.problem}
            Opportunity: ${input.projectDetails.opportunity}`,
            prompt: sectionPrompt,
            temperature: MODEL_CONFIG.temperature,
            maxOutputTokens: MODEL_CONFIG.maxOutputTokens
          })
          text = result.text
        }
        
        sectionContent = text
      } else {
        // Use template with variable substitution only
        const variables = extractVariablesFromInput(input)
        sectionContent = populateTemplate(sectionSchema.template, variables)
      }
      
      sections.push({
        id: sectionSchema.id,
        title: sectionSchema.title,
        type: sectionSchema.type,
        content: sectionContent,
        order: sectionSchema.order
      })
    }
    
    // Process custom sections if provided
    if (input.customSections && input.customSections.length > 0) {
      let orderIndex = sections.length
      
      for (const customSection of input.customSections) {
        if (!customSection.title || !customSection.content) continue
        
        let sectionContent = customSection.content
        
        if (useAI) {
          // Use AI to enhance the custom section content
          let text = ''
          try {
            // Try primary model first
            const result = await generateText({
              model: openai(MODEL_CONFIG.primary),
              system: `You are an expert business proposal writer for Sprinter AI, an AI consulting firm. 
              Take the provided custom section content and enhance it to be professional and persuasive while maintaining the original intent.
              Client Context:
              Company: ${input.clientInfo.company || input.clientInfo.name}
              Project Type: ${input.projectDetails.type}`,
              prompt: `Enhance this custom section for a proposal. Section title: "${customSection.title}". 
              Original content/instructions: ${customSection.content}
              
              Create professional content that fits seamlessly with the rest of the proposal.`,
              temperature: MODEL_CONFIG.temperature,
              maxOutputTokens: MODEL_CONFIG.maxOutputTokens
            })
            text = result.text
          } catch (error) {
            console.warn(`Primary model failed for custom section, using fallback:`, error)
            // Fallback to GPT-5
            const result = await generateText({
              model: openai(MODEL_CONFIG.fallback),
              system: `You are an expert business proposal writer for Sprinter AI, an AI consulting firm. 
              Take the provided custom section content and enhance it to be professional and persuasive while maintaining the original intent.
              Client Context:
              Company: ${input.clientInfo.company || input.clientInfo.name}
              Project Type: ${input.projectDetails.type}`,
              prompt: `Enhance this custom section for a proposal. Section title: "${customSection.title}". 
              Original content/instructions: ${customSection.content}
              
              Create professional content that fits seamlessly with the rest of the proposal.`,
              temperature: MODEL_CONFIG.temperature,
              maxOutputTokens: MODEL_CONFIG.maxOutputTokens
            })
            text = result.text
          }
          
          sectionContent = text
        }
        
        sections.push({
          id: `custom-${orderIndex}`,
          title: customSection.title,
          type: 'custom',
          content: sectionContent,
          order: orderIndex++
        })
      }
    }
    
    // Construct final proposal content
    const proposalContent = {
      coverPage: {
        title: input.projectDetails.title,
        subtitle: `${formatProjectType(input.projectDetails.type)} Proposal`,
        clientName: input.clientInfo.name,
        clientCompany: input.clientInfo.company,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        confidential: true
      },
      sections,
      metadata: {
        generatedWithAI: useAI,
        templateId: template.id,
        generatedAt: new Date().toISOString()
      }
    }
    
    return NextResponse.json({
      success: true,
      content: proposalContent
    })
    
  } catch (error) {
    console.error('Proposal generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate proposal content' },
      { status: 500 }
    )
  }
}

// Apply rate limiting with stricter limits for AI endpoints (5 requests per minute)
export const POST = withRateLimit(handlePOST, {
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 5 // 5 requests per minute
})

interface SectionSchema {
  id: string
  title: string
  type: string
  template: string
  required?: boolean
  order: number
}

function createSectionPrompt(
  section: SectionSchema,
  input: ProposalGenerationInput
): string {
  const basePrompts: Record<string, string> = {
    greeting: `Write a warm, professional greeting for a proposal. Address ${input.clientInfo.contactName || input.clientInfo.name} at ${input.clientInfo.company}. 
    Express appreciation for the opportunity and briefly mention the ${input.projectDetails.type} project to help with ${input.projectDetails.opportunity}.
    Keep it concise (2-3 sentences) and engaging.`,
    
    overview: `Write a compelling project overview section that:
    - Acknowledges the client's current challenge: ${input.projectDetails.problem}
    - Positions the opportunity: ${input.projectDetails.opportunity}
    - Briefly introduces how our ${input.projectDetails.type} solution will address this
    - Shows understanding of their business context
    Keep it to 2-3 paragraphs.`,
    
    goals: `Create a clear goals and success criteria section with:
    - Main goals: ${input.projectDetails.goals?.join(', ') || 'To be defined'}
    - Success metrics: ${input.projectDetails.successMetrics?.join(', ') || 'To be defined'}
    Format as bullet points, be specific and measurable where possible.`,
    
    scope: `Detail the scope of work for this ${input.projectDetails.type} project:
    - Approach: ${input.scope.approach}
    - Key tasks: ${input.scope.tasks?.join(', ') || 'To be defined'}
    - Deliverables: ${input.scope.deliverables?.map((d) => typeof d === 'string' ? d : (d as { name: string }).name).join(', ') || 'To be defined'}
    - Out of scope: ${input.scope.outOfScope?.join(', ') || 'Not specified'}
    Structure clearly with subsections.`,
    
    timeline: `Outline the project timeline:
    - Duration: ${input.timeline.duration}
    - Start date: ${input.timeline.startDate || 'To be confirmed'}
    - Key milestones: ${input.timeline.milestones?.map((m) => typeof m === 'string' ? m : (m as { title: string }).title).join(', ') || 'To be defined'}
    Present as a clear schedule with phases if applicable.`,
    
    pricing: `Present the investment details:
    - Total: $${input.pricing.total.toLocaleString()}
    - Structure: ${input.pricing.structure}
    - Payment terms: ${input.pricing.paymentTerms}
    ${input.pricing.creditOption ? '- Include a note about credit toward future phases' : ''}
    Frame as an investment with clear value proposition.`,
    
    requirements: `List what we need from the client to succeed:
    ${input.requirements?.map((r) => `- ${typeof r === 'string' ? r : (r as { title: string }).title}`).join('\n') || '- To be discussed'}
    Keep requests reasonable and explain why each is important.`,
    
    nextSteps: `Write a clear call-to-action section that:
    - Outlines the immediate next steps to begin
    - Mentions the target start date
    - Includes a positive, forward-looking statement
    - Encourages acceptance of the proposal
    Keep it action-oriented and optimistic.`
  }
  
  return basePrompts[section.type] || basePrompts[section.id] || 
    `Generate content for the "${section.title}" section of the proposal. Use the template as guidance: ${section.template}`
}

function extractVariablesFromInput(
  input: ProposalGenerationInput
): Record<string, unknown> {
  return {
    clientName: input.clientInfo.name,
    clientCompany: input.clientInfo.company,
    clientEmail: input.clientInfo.email,
    contactName: input.clientInfo.contactName,
    title: input.projectDetails.title,
    problem: input.projectDetails.problem,
    opportunity: input.projectDetails.opportunity,
    goals: input.projectDetails.goals,
    successMetrics: input.projectDetails.successMetrics,
    approach: input.scope.approach,
    tasks: input.scope.tasks,
    deliverables: input.scope.deliverables,
    outOfScope: input.scope.outOfScope,
    duration: input.timeline.duration,
    startDate: input.timeline.startDate,
    milestones: input.timeline.milestones,
    totalPrice: `$${input.pricing.total.toLocaleString()}`,
    paymentTerms: input.pricing.paymentTerms,
    creditOption: input.pricing.creditOption,
    requirements: input.requirements
  }
}

function formatProjectType(type: string): string {
  const typeMap: Record<string, string> = {
    'poc_sprint': 'POC Sprint',
    'workshop': 'AI Workshop',
    'transformation': 'AI Transformation',
    'custom': 'Custom Project'
  }
  return typeMap[type] || type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}