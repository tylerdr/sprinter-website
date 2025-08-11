import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { lab } = await request.json();

    if (!lab) {
      return NextResponse.json({ error: 'Lab parameter required' }, { status: 400 });
    }

    const supabase = await createClient();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In production, this would insert into lab_runs table
    // For now, just return success
    const runData = {
      user_id: user.id,
      lab_slug: lab,
      tokens_used: 0,
      cost_cents: 0,
      created_at: new Date().toISOString()
    };

    // Would execute: INSERT INTO lab_runs ...
    
    return NextResponse.json({ 
      success: true,
      run: runData
    });
  } catch (error) {
    console.error('Lab run API error:', error);
    return NextResponse.json(
      { error: 'Failed to record lab run' },
      { status: 500 }
    );
  }
}