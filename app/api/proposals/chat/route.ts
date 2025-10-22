import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { createClient } from '@/lib/supabase/server'
import { withRateLimit } from '@/lib/rate-limit'
import { NextRequest } from 'next/server'

// Configuration - same as generate route
const MODEL_CONFIG = {
  primary: process.env.AI_MODEL || 'gpt-5',
  fallback: 'gpt-5',
  maxOutputTokens: 1500,
  temperature: 0.3
}

async function handlePOST(request: NextRequest) {
  try {
    const { messages, proposalId, proposalContent, sessionId } = await request.json()
    
    if (!messages || !proposalId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    // Create context from proposal content
    const context = createProposalContext(proposalContent)
    
    // Add system message with proposal context to the beginning if not present
    const systemMessage = {
      role: 'system' as const,
      content: `You are an AI assistant for Sprinter AI proposals powered by GPT-5. You have access to the following proposal details:
          
${context}

Answer questions about this proposal accurately and concisely. If asked about something not in the proposal, politely indicate that the information isn't available in the current proposal. Be professional and helpful.`
    }
    
    // Ensure system message is first
    const allMessages = messages[0]?.role === 'system' 
      ? messages 
      : [systemMessage, ...messages]
    
    // Save the user's latest message to the database
    const supabase = await createClient()
    const latestUserMessage = messages[messages.length - 1]
    
    if (latestUserMessage && latestUserMessage.role === 'user') {
      await supabase.from('proposal_chats').insert({
        proposal_id: proposalId,
        session_id: sessionId || null,
        role: 'user',
        content: latestUserMessage.content
      })
    }
    
    // Try primary model first, fallback to GPT-5 if it fails
    let result
    try {
      result = await streamText({
        model: openai(MODEL_CONFIG.primary),
        messages: allMessages,
        temperature: MODEL_CONFIG.temperature,
        maxOutputTokens: MODEL_CONFIG.maxOutputTokens,
        onFinish: async ({ text }) => {
          // Save the assistant's response to the database
          await supabase.from('proposal_chats').insert({
            proposal_id: proposalId,
            session_id: sessionId || null,
            role: 'assistant',
            content: text
          })
        }
      })
    } catch (error) {
      console.warn(`Primary model (${MODEL_CONFIG.primary}) failed, falling back to ${MODEL_CONFIG.fallback}:`, error)
      // Fallback to GPT-5
      result = await streamText({
        model: openai(MODEL_CONFIG.fallback),
        messages: allMessages,
        temperature: MODEL_CONFIG.temperature,
        maxOutputTokens: MODEL_CONFIG.maxOutputTokens,
        onFinish: async ({ text }) => {
          // Save the assistant's response to the database
          await supabase.from('proposal_chats').insert({
            proposal_id: proposalId,
            session_id: sessionId || null,
            role: 'assistant',
            content: text
          })
        }
      })
    }
    
    // Return streaming response
    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Chat error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// Apply rate limiting with stricter limits for AI endpoints (5 requests per minute)
export const POST = withRateLimit(handlePOST, {
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 5 // 5 requests per minute
})

function createProposalContext(proposalContent: Record<string, unknown>): string {
  const sections = []
  
  // Add cover page info
  if (proposalContent.coverPage && typeof proposalContent.coverPage === 'object') {
    const coverPage = proposalContent.coverPage as Record<string, unknown>
    if (coverPage.title) sections.push(`Title: ${coverPage.title}`)
    if (coverPage.clientName) sections.push(`Client: ${coverPage.clientName}`)
    if (coverPage.clientCompany) {
      sections.push(`Company: ${coverPage.clientCompany}`)
    }
  }
  
  // Add sections content
  if (proposalContent.sections && Array.isArray(proposalContent.sections)) {
    (proposalContent.sections as Array<Record<string, unknown>>).forEach((section) => {
      sections.push(`\n${section.title}:`)
      if (typeof section.content === 'string') {
        sections.push(section.content)
      } else if (Array.isArray(section.content)) {
        sections.push(section.content.join('\n'))
      } else if (typeof section.content === 'object') {
        sections.push(JSON.stringify(section.content, null, 2))
      }
    })
  }
  
  return sections.join('\n')
}