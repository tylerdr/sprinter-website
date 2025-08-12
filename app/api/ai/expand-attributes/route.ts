import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

const attributeSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string().describe('Short, clear name for the attribute'),
    definition: z.string().describe('Clear definition of what this attribute represents'),
    prompt: z.string().describe('Specific instruction for AI to extract this information'),
    type: z.enum(['text', 'number', 'date', 'boolean', 'list']).describe('Data type of the attribute')
  })
);

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    const { object } = await generateObject({
      model: google('gemini-2.0-flash-exp'),
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
      `
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error('Error expanding attributes:', error);
    return NextResponse.json(
      { error: 'Failed to expand attributes' },
      { status: 500 }
    );
  }
}