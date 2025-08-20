import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers, cookies } from 'next/headers'
import ProposalViewer from '@/components/proposals/ProposalViewer'
import ProposalAccessGate from '@/components/proposals/ProposalAccessGate'
import { getProposalServer } from '@/lib/services/proposal-server'
import { createClient } from '@/lib/supabase/server'
import type { Proposal } from '@/lib/types/proposal'
import type { User } from '@supabase/supabase-js'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ token?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  
  try {
    const proposal = await getProposalServer(id)
    
    return {
      title: `${proposal.title} | Sprinter AI Proposal`,
      description: `Proposal for ${proposal.clientName}`,
      robots: 'noindex, nofollow'
    }
  } catch {
    return {
      title: 'Proposal | Sprinter AI',
      robots: 'noindex, nofollow'
    }
  }
}

export default async function ProposalPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const { token } = await searchParams
  const headersList = await headers()
  
  // Check if user is authenticated
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  try {
    const proposal = await getProposalServer(id)
    
    // Check access permissions
    const hasAccess = await checkProposalAccess(proposal, user, token)
    
    if (!hasAccess) {
      return <ProposalAccessGate proposalId={id} accessType={proposal.accessType} />
    }
    
    // Track initial view (server-side)
    if (!user || user.id !== proposal.createdBy) {
      await trackInitialView(proposal.id, headersList)
    }
    
    return <ProposalViewer proposal={proposal} isAuthenticated={!!user} />
  } catch (error) {
    console.error('Error loading proposal:', error)
    notFound()
  }
}

async function checkProposalAccess(
  proposal: Proposal,
  user: User | null,
  token?: string
): Promise<boolean> {
  // Public proposals are always accessible
  if (proposal.accessType === 'public') {
    return true
  }
  
  // Check if user is the creator or owner
  if (user && (user.id === proposal.createdBy || user.id === proposal.ownerId)) {
    return true
  }
  
  // Check magic link token
  if (proposal.accessType === 'magic_link' && token === proposal.accessToken) {
    return true
  }
  
  // Check password-protected access via cookie
  if (proposal.accessType === 'password') {
    const cookieStore = await cookies()
    const accessCookie = cookieStore.get(`proposal_access_${proposal.id}`)
    if (accessCookie?.value) {
      return true
    }
  }
  
  // Check if authenticated access and user is logged in
  if (proposal.accessType === 'authenticated' && user) {
    // Could add additional checks here for specific user permissions
    return true
  }
  
  return false
}

async function trackInitialView(proposalId: string, headers: Headers) {
  const supabase = await createClient()
  
  // Generate session ID from headers
  const userAgent = headers.get('user-agent') || ''
  const ip = headers.get('x-forwarded-for') || headers.get('x-real-ip') || ''
  const sessionId = Buffer.from(`${proposalId}-${ip}-${userAgent}`).toString('base64')
  
  // Track the view
  await supabase.from('proposal_views').insert({
    proposal_id: proposalId,
    session_id: sessionId,
    ip_address: ip,
    user_agent: userAgent,
    referrer: headers.get('referer') || null
  })
  
  // Update proposal first viewed timestamp if needed
  await supabase
    .from('proposals')
    .update({
      first_viewed_at: new Date().toISOString(),
      last_viewed_at: new Date().toISOString()
    })
    .eq('id', proposalId)
    .is('first_viewed_at', null)
}