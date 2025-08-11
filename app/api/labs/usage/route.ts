import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lab = searchParams.get('lab');

    if (!lab) {
      return NextResponse.json({ error: 'Lab parameter required' }, { status: 400 });
    }

    const supabase = await createClient();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ runs: 0, hasEmail: false });
    }

    // For now, return mock data
    // In production, this would query the lab_runs table
    const hasEmail = !!user.email;
    const runs = 0; // Would query: SELECT COUNT(*) FROM lab_runs WHERE user_id = user.id AND lab_slug = lab

    return NextResponse.json({ 
      runs, 
      hasEmail,
      userId: user.id 
    });
  } catch (error) {
    console.error('Lab usage API error:', error);
    return NextResponse.json(
      { error: 'Failed to get lab usage' },
      { status: 500 }
    );
  }
}