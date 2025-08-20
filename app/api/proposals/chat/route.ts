import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export async function POST(request: Request) {
  try {
    const { messages, proposalId, proposalContent } = await request.json()
    
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
    
    // Generate AI response with streaming using GPT-5
    const result = await streamText({
      model: openai('gpt-5'),
      messages: allMessages,
      temperature: 0.3
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