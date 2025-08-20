import { createClient } from '@/lib/supabase/server'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

type Message = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { messages, proposalId, proposalContent, sessionId } = body
    
    // Support both single message and messages array for compatibility
    const userMessages: Message[] = messages || (body.message ? [
      { role: 'user' as const, content: body.message }
    ] : [])
    
    if (!proposalId || (!messages && !body.message)) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    // Get chat history for context
    const supabase = await createClient()
    const { data: chatHistory } = await supabase
      .from('proposal_chats')
      .select('role, content')
      .eq('proposal_id', proposalId)
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(10)
    
    // Create context from proposal content
    const context = createProposalContext(proposalContent)
    
    // Build full messages array with system prompt and history
    const fullMessages: Message[] = [
      {
        role: 'system' as const,
        content: `You are an AI assistant for Sprinter AI proposals powered by GPT-5. You have access to the following proposal details:
          
${context}

Answer questions about this proposal accurately and concisely. If asked about something not in the proposal, politely indicate that the information isn't available in the current proposal. Be professional and helpful. Remember previous questions in this conversation for context.`
      },
      ...(chatHistory || []).map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      ...userMessages
    ]
    
    // Generate AI response with streaming using GPT-5
    const result = await streamText({
      model: openai('gpt-5'),
      messages: fullMessages,
      temperature: 0.3,
      maxTokens: 1500,
      system: undefined // System message already in messages array
    })
    
    // Store user message immediately if single message format
    if (body.message) {
      await supabase.from('proposal_chats').insert({
        proposal_id: proposalId,
        session_id: sessionId,
        role: 'user',
        content: body.message
      })
    }
    
    // Store assistant response after generation completes
    result.onFinish(async ({ text }) => {
      await supabase.from('proposal_chats').insert({
        proposal_id: proposalId,
        session_id: sessionId,
        role: 'assistant',
        content: text,
        metadata: { model: 'gpt-5' }
      })
    })
    
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