import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { proposalId, recipientEmail, accessToken } = await request.json()
    
    if (!proposalId || !recipientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Get proposal details
    const supabase = await createClient()
    const { data: proposal, error: proposalError } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', proposalId)
      .single()
    
    if (proposalError || !proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      )
    }
    
    // Check if Resend is configured
    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      )
    }
    
    // Construct proposal URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sprinter.ai'
    const proposalUrl = accessToken 
      ? `${baseUrl}/proposals/${proposalId}?token=${accessToken}`
      : `${baseUrl}/proposals/${proposalId}`
    
    // Send email
    const { Resend } = await import('resend')
    const resend = new Resend(resendKey)
    const { data, error } = await resend.emails.send({
      from: 'Sprinter AI <proposals@sprinter.ai>',
      to: recipientEmail,
      subject: `${proposal.title} - Proposal from Sprinter AI`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Proposal from Sprinter AI</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
              }
              .container {
                background-color: white;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 40px;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                color: #2563eb;
                text-decoration: none;
              }
              h1 {
                color: #1f2937;
                margin-top: 30px;
                font-size: 28px;
              }
              .proposal-info {
                background-color: #f9fafb;
                border-radius: 6px;
                padding: 20px;
                margin: 30px 0;
              }
              .info-row {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
              }
              .info-row:last-child {
                border-bottom: none;
              }
              .info-label {
                font-weight: 600;
                color: #6b7280;
              }
              .info-value {
                color: #1f2937;
              }
              .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 14px 32px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                margin: 30px 0;
              }
              .features {
                margin: 30px 0;
              }
              .feature {
                display: flex;
                align-items: center;
                margin: 15px 0;
              }
              .feature-icon {
                width: 24px;
                height: 24px;
                margin-right: 12px;
                color: #10b981;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 30px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
              .footer a {
                color: #2563eb;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <a href="${baseUrl}" class="logo">Sprinter AI</a>
                <h1>Your Proposal is Ready</h1>
              </div>
              
              <p>Hi ${proposal.clientName || 'there'},</p>
              
              <p>Thank you for your interest in working with Sprinter AI. We've prepared a comprehensive proposal for your review.</p>
              
              <div class="proposal-info">
                <div class="info-row">
                  <span class="info-label">Project:</span>
                  <span class="info-value">${proposal.title}</span>
                </div>
                ${proposal.clientCompany ? `
                <div class="info-row">
                  <span class="info-label">Company:</span>
                  <span class="info-value">${proposal.clientCompany}</span>
                </div>
                ` : ''}
                <div class="info-row">
                  <span class="info-label">Type:</span>
                  <span class="info-value">${formatProjectType(proposal.projectType)}</span>
                </div>
                ${proposal.totalValue ? `
                <div class="info-row">
                  <span class="info-label">Investment:</span>
                  <span class="info-value">$${proposal.totalValue.toLocaleString()}</span>
                </div>
                ` : ''}
              </div>
              
              <div class="features">
                <h3>What You Can Do:</h3>
                <div class="feature">
                  <span class="feature-icon">✓</span>
                  <span>Review the full proposal details online</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">✓</span>
                  <span>Ask questions directly in the proposal chat</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">✓</span>
                  <span>Download as PDF for offline review</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">✓</span>
                  <span>Share with your team members</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">✓</span>
                  <span>Accept and sign electronically</span>
                </div>
              </div>
              
              <div style="text-align: center;">
                <a href="${proposalUrl}" class="cta-button">View Proposal</a>
              </div>
              
              <p>If you have any questions or need clarification on any aspect of the proposal, please don't hesitate to reach out. You can also use the built-in chat feature within the proposal to ask questions.</p>
              
              <p>We look forward to the opportunity to work with you!</p>
              
              <p>Best regards,<br>
              The Sprinter AI Team</p>
              
              <div class="footer">
                <p>This proposal link is secure and unique to you.</p>
                <p>Need help? <a href="mailto:support@sprinter.ai">Contact Support</a></p>
                <p>© ${new Date().getFullYear()} Sprinter AI. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `
    })
    
    if (error) {
      console.error('Email send error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }
    
    // Update proposal status to sent
    await supabase
      .from('proposals')
      .update({ 
        status: 'sent',
        sentAt: new Date().toISOString()
      })
      .eq('id', proposalId)
    
    return NextResponse.json({
      success: true,
      messageId: data?.id
    })
    
  } catch (error) {
    console.error('Send proposal error:', error)
    return NextResponse.json(
      { error: 'Failed to send proposal' },
      { status: 500 }
    )
  }
}

function formatProjectType(type: string): string {
  const typeMap: Record<string, string> = {
    'poc_sprint': 'POC Sprint',
    'workshop': 'AI Workshop',
    'transformation': 'AI Transformation',
    'custom': 'Custom Project'
  }
  return typeMap[type] || type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}