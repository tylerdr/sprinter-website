import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-5'),
      messages,
      system: `You are a helpful AI assistant for Sprinter AI, a company specializing in AI consulting and development. 
      Focus on practical AI solutions that can be implemented quickly. 
      Emphasize the 10-day sprint approach and real-world case studies.
      Be concise and action-oriented.`,
      temperature: 0.7,
      maxRetries: 2,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback to mock responses if API fails
    const { messages } = await req.json();
    const mockResponses = [
      "That's a great question! Based on your industry, AI can help automate repetitive tasks and improve decision-making. Would you like to explore specific use cases?",
      "We typically see 30-50% efficiency improvements in the first 90 days. The key is starting with high-impact, low-complexity automations.",
      "Our 10-day sprint would be perfect for that. We'd build a working prototype that your team can test immediately.",
    ];
    
    const responseIndex = Math.min(messages.length - 1, mockResponses.length - 1);
    const response = mockResponses[Math.max(0, responseIndex)];
    
    // Return a mock stream response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`0:"${response}"\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }
}