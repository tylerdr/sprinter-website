import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(request: Request) {
  const { messages, documents } = await request.json();

  // Prepare the context with uploaded documents
  const systemPrompt = documents && documents.length > 0
    ? `You are a helpful AI assistant that can answer questions about the uploaded documents. 
       You have access to ${documents.length} document(s) that the user has uploaded.
       Base your answers on the content of these documents when relevant.
       If a question cannot be answered from the documents, let the user know.`
    : 'You are a helpful AI assistant.';

  // If there are documents, include them in the first user message
  const enhancedMessages = [...messages];
  if (documents && documents.length > 0 && messages.length > 0) {
    // Add document content to the context
    const lastUserMessageIndex = messages.length - 1;
    enhancedMessages[lastUserMessageIndex] = {
      ...messages[lastUserMessageIndex],
      content: [
        {
          type: 'text',
          text: messages[lastUserMessageIndex].content
        },
        ...documents.map((doc: { base64: string }) => ({
          type: 'image',
          image: doc.base64
        }))
      ]
    };
  }

  const result = streamText({
    model: google('gemini-2.0-flash-exp'),
    system: systemPrompt,
    messages: enhancedMessages,
  });

  return result.toTextStreamResponse();
}