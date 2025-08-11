import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { source = 'chat_widget' } = await request.json();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Upsert lead record
    const { data, error } = await supabase
      .from('leads')
      .upsert({
        user_id: user.id,
        source,
        status: 'anon',
        last_seen_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single();

    if (error) {
      console.error('Lead upsert error:', error);
      // Continue even if database write fails
    }

    return NextResponse.json({ success: true, lead: data });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json(
      { error: 'Failed to upsert lead' },
      { status: 500 }
    );
  }
}