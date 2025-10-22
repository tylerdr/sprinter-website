import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { withRateLimit } from '@/lib/rate-limit'

// Demo credentials must be provided via environment variables
const DEMO_EMAIL = process.env.DEMO_EMAIL
const DEMO_PASSWORD = process.env.DEMO_PASSWORD

async function handleDemoLogin(_request: NextRequest) {
  try {
    // Only allow demo login in development or if explicitly enabled
    const isDemoEnabled = process.env.ENABLE_DEMO_LOGIN === 'true' || process.env.NODE_ENV === 'development'
    
    if (!isDemoEnabled) {
      return NextResponse.json(
        { error: 'Demo login is not available' },
        { status: 403 }
      )
    }

    if (!DEMO_EMAIL || !DEMO_PASSWORD) {
      console.error('Demo login requested but DEMO_EMAIL/DEMO_PASSWORD are not configured')
      return NextResponse.json(
        { error: 'Demo login is not configured' },
        { status: 503 }
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

export const POST = withRateLimit(handleDemoLogin, {
  interval: 60 * 1000,
  uniqueTokenPerInterval: 5,
})
