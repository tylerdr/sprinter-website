import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Demo credentials are stored server-side only
const DEMO_EMAIL = process.env.DEMO_EMAIL || 'demo@sprinter.ai'
const DEMO_PASSWORD = process.env.DEMO_PASSWORD || 'demo123456'

export async function POST() {
  try {
    // Only allow demo login in development or if explicitly enabled
    const isDemoEnabled = process.env.ENABLE_DEMO_LOGIN === 'true' || process.env.NODE_ENV === 'development'
    
    if (!isDemoEnabled) {
      return NextResponse.json(
        { error: 'Demo login is not available' },
        { status: 403 }
      )
    }

    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }

    return NextResponse.json({ 
      success: true,
      user: data.user,
      session: data.session 
    })
  } catch (error) {
    console.error('Demo login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}