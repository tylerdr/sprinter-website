import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { password } = await request.json()
    
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    
    // Get proposal
    const { data: proposal, error } = await supabase
      .from('proposals')
      .select('password_hash')
      .eq('id', id)
      .single()
    
    if (error || !proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      )
    }
    
    // Verify password
    const isValid = await bcrypt.compare(password, proposal.password_hash)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
    
    // Create a session token for this proposal access
    const sessionToken = crypto.randomBytes(32).toString('hex')
    const cookieStore = await cookies()
    
    // Set HTTP-only cookie that expires in 24 hours
    cookieStore.set(`proposal_access_${id}`, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400 // 24 hours in seconds
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Access check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}