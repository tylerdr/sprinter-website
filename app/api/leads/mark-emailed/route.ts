import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update lead record with email
    const { data, error } = await supabase
      .from('leads')
      .update({
        email,
        status: 'emailed',
        last_seen_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Lead update error:', error);
      // Continue even if database write fails
    }

    // In production, you would also:
    // 1. Send welcome email with AI Opportunity Audit
    // 2. Add to email marketing list
    // 3. Trigger CRM workflow

    return NextResponse.json({ success: true, lead: data });
  } catch (error) {
    console.error('Lead email API error:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}