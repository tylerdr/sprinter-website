import { NextResponse, NextRequest } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { withRateLimit } from '@/lib/rate-limit';

const attributeSchema = z.object({
  attributes: z.array(
    z.object({
      id: z.string(),
      name: z.string().describe('Short, clear name for the attribute'),
      definition: z.string().describe('Clear definition of what this attribute represents'),
      prompt: z.string().describe('Specific instruction for AI to extract this information'),
      type: z.enum(['text', 'number', 'date', 'boolean', 'list']).describe('Data type of the attribute')
    })
  )
});

async function handlePOST(request: NextRequest) {

  try {
    const { input } = await request.json();

    const { object } = await generateObject({
      model: openai('gpt-5'),
      schema: attributeSchema,
      prompt: `
        Expand the following natural language attribute descriptions into structured extraction attributes.
        Each attribute should have:
        - A clear, concise name
        - A definition explaining what information it captures
        - A specific prompt for AI to extract this information from documents
        - An appropriate data type (text, number, date, boolean, or list)
        
        Input attributes:
        ${input}
        
        Generate unique IDs for each attribute.
        Return the attributes in an object with an 'attributes' array.
      `
    });

    // Return just the attributes array for backward compatibility
    return NextResponse.json(object.attributes);
  } catch (error) {
    console.error('Error expanding attributes:', error);
    return NextResponse.json(
      { error: 'Failed to expand attributes' },
      { status: 500 }
    );
  }
}

// Apply rate limiting with stricter limits for AI endpoints (5 requests per minute)
export const POST = withRateLimit(handlePOST, {
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 5 // 5 requests per minute
})