import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    
    // Get proposal details
    const { data: proposal, error } = await supabase
      .from('proposals')
      .select('title, client_email, access_type, access_token, client_name, client_company')
      .eq('id', id)
      .single()
    
    if (error || !proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      )
    }
    
    // Check if the proposal is magic link type
    if (proposal.access_type !== 'magic_link') {
      return NextResponse.json(
        { error: 'This proposal does not support magic link access' },
        { status: 400 }
      )
    }
    
    // Verify the email matches the client email (security check)
    if (proposal.client_email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json(
        { error: 'Email does not match the proposal recipient' },
        { status: 403 }
      )
    }
    
    // Generate the proposal URL with token
    const proposalUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sprinter.ai'}/proposals/${id}?token=${proposal.access_token}`
    
    // Send the email
    try {
      if (!resend) {
        console.warn('Resend API key not configured, skipping email send')
        return NextResponse.json({ 
          success: true,
          message: 'Access link generated (email disabled in development)' 
        })
      }
      
      await resend.emails.send({
        from: 'proposals@sprinter.ai',
        to: email,
        subject: `Access Link: ${proposal.title}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
                .content { background: #f7f7f7; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Your Proposal Access Link</h1>
                </div>
                <div class="content">
                  <p>Hello ${proposal.client_name || 'there'},</p>
                  
                  <p>You requested access to the following proposal:</p>
                  
                  <h3>${proposal.title}</h3>
                  
                  <p>Click the button below to view your proposal:</p>
                  
                  <a href="${proposalUrl}" class="button">View Proposal</a>
                  
                  <p>Or copy and paste this link in your browser:</p>
                  <p style="background: white; padding: 10px; border-radius: 5px; word-break: break-all;">
                    ${proposalUrl}
                  </p>
                  
                  <div class="footer">
                    <p>This link is unique to your proposal and should not be shared.</p>
                    <p>If you didn't request this link, please ignore this email.</p>
                    <p>© ${new Date().getFullYear()} Sprinter AI. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `
      })
      
      return NextResponse.json({ 
        success: true,
        message: 'Access link sent to your email' 
      })
    } catch (emailError) {
      console.error('Email send error:', emailError)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('Request access error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}