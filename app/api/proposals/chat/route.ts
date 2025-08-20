import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export async function POST(request: Request) {
  try {
    const { proposalId, message, proposalContent, sessionId } = await request.json()
    
    if (!proposalId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create context from proposal content
    const context = createProposalContext(proposalContent)
    
    // Generate AI response
    const { text: response } = await generateText({
      model: openai('gpt-4o-mini'),
      system: `You are a helpful assistant for Sprinter AI proposals. You have access to the following proposal details:
          
${context}

Answer questions about this proposal accurately and concisely. If asked about something not in the proposal, politely indicate that the information isn't available in the current proposal. Be professional and helpful.`,
      prompt: message,
      temperature: 0.7,
      maxTokens: 500
    })
    
    // Store in database
    const supabase = await createClient()
    await supabase.from('proposal_chats').insert([
      {
        proposal_id: proposalId,
        session_id: sessionId,
        role: 'user',
        content: message
      },
      {
        proposal_id: proposalId,
        session_id: sessionId,
        role: 'assistant',
        content: response,
        metadata: { model: 'gpt-4o-mini' }
      }
    ])
    
    return NextResponse.json({
      response,
      metadata: { model: 'gpt-4o-mini' }
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
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