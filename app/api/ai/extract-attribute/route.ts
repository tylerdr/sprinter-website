import { NextResponse, NextRequest } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { rateLimit, rateLimitResponse } from '@/lib/middleware/rate-limit';

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const { success, reset } = await rateLimit(request, 'ai');
  if (!success) {
    return rateLimitResponse(reset);
  }

  try {
    const { fileBase64, attribute } = await request.json();

    // Define schema based on attribute type
    let schema;
    switch (attribute.type) {
      case 'number':
        schema = z.object({ value: z.number().nullable() });
        break;
      case 'boolean':
        schema = z.object({ value: z.boolean().nullable() });
        break;
      case 'date':
        schema = z.object({ value: z.string().nullable().describe('Date in ISO format') });
        break;
      case 'list':
        schema = z.object({ value: z.array(z.string()) });
        break;
      case 'text':
      default:
        schema = z.object({ value: z.string().nullable() });
    }

    const { object } = await generateObject({
      model: openai('gpt-5'),
      schema,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Extract the following information from this document:
                
                Attribute: ${attribute.name}
                Instruction: ${attribute.prompt}
                
                Return null if the information is not found in the document.
                Be precise and extract only the specific information requested.`
            },
            {
              type: 'image',
              image: fileBase64
            }
          ]
        }
      ]
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error('Error extracting attribute:', error);
    return NextResponse.json(
      { error: 'Failed to extract attribute' },
      { status: 500 }
    );
  }
}