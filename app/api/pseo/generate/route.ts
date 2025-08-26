import { NextRequest, NextResponse } from 'next/server';
import { IndustryPageGenerator } from '@/lib/pseo/generators/industry-generator';
import { INDUSTRIES } from '@/lib/pseo/config/industries';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

// Protect this endpoint
async function validateRequest(request: NextRequest): Promise<boolean> {
  // Check for API key in production
  if (process.env.NODE_ENV === 'production') {
    const authHeader = request.headers.get('authorization');
    const apiKey = authHeader?.replace('Bearer ', '');
    
    if (apiKey !== process.env.PSEO_API_KEY) {
      return false;
    }
  }
  
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Validate request
    const isValid = await validateRequest(request);
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, slug, batchSize = 5 } = body;

    const generator = new IndustryPageGenerator();
    const results = [];

    switch (type) {
      case 'industry':
        if (slug) {
          // Generate single industry page
          const industry = INDUSTRIES.find(i => i.slug === slug);
          if (!industry) {
            return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
          }
          const page = await generator.generateIndustryPage(industry);
          results.push(page);
        } else {
          // Generate all industry pages
          const pages = await generator.generateAllIndustryPages();
          results.push(...pages);
        }
        break;

      case 'location':
        // TODO: Implement location page generator
        return NextResponse.json({ error: 'Location generator not yet implemented' }, { status: 501 });

      case 'use-case':
        // TODO: Implement use case page generator
        return NextResponse.json({ error: 'Use case generator not yet implemented' }, { status: 501 });

      case 'comparison':
        // TODO: Implement comparison page generator
        return NextResponse.json({ error: 'Comparison generator not yet implemented' }, { status: 501 });

      default:
        return NextResponse.json({ error: 'Invalid type specified' }, { status: 400 });
    }

    // Store generated pages in database if Supabase is configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = await createClient();
      
      for (const page of results) {
        const { error } = await supabase
          .from('generated_pages')
          .upsert({
            slug: page.slug,
            title: page.title,
            meta_description: page.metaDescription,
            content_type: type,
            content: page,
            updated_at: new Date().toISOString(),
          });
        
        if (error) {
          console.error('Error storing page:', error);
        }
      }
    }

    return NextResponse.json({
      success: true,
      generated: results.length,
      pages: results.map(p => ({
        slug: p.slug,
        title: p.title,
        keywords: p.keywords.length,
      })),
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // List generated pages
  const isValid = await validateRequest(request);
  if (!isValid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const limit = parseInt(searchParams.get('limit') || '100');

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient();
    
    let query = supabase
      .from('generated_pages')
      .select('slug, title, content_type, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (type) {
      query = query.eq('content_type', type);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching pages:', error);
      return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
    }
    
    return NextResponse.json({ pages: data });
  }

  return NextResponse.json({ pages: [], message: 'Database not configured' });
}