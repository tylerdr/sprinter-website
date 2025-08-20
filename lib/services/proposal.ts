// Proposal service for CRUD operations and business logic

import { createClient } from '@/lib/supabase/client'
import type { 
  Proposal, 
  ProposalTemplate, 
  ProposalGenerationInput,
  ProposalChat,
  ProposalUpload,
  ProposalSignature,
  ProposalAnalytics,
  ProposalRequirement,
  ProposalContent
} from '@/lib/types/proposal'
import { v4 as uuidv4 } from 'uuid'

// Client-side functions
export async function createProposal(input: Partial<Proposal>) {
  const supabase = createClient()
  
  // Generate access token if using magic link
  const accessToken = input.accessType === 'magic_link' 
    ? generateAccessToken() 
    : undefined
  
  const { data, error } = await supabase
    .from('proposals')
    .insert({
      ...input,
      access_token: accessToken,
      status: 'draft'
    })
    .select()
    .single()
  
  if (error) throw error
  return data as Proposal
}

export async function getProposal(id: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Proposal
}

export async function getProposalByToken(token: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('access_token', token)
    .single()
  
  if (error) throw error
  return data as Proposal
}

export async function updateProposal(id: string, updates: Partial<Proposal>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('proposals')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Proposal
}

export async function listProposals(filters?: {
  status?: string
  clientEmail?: string
  ownerId?: string
}) {
  const supabase = createClient()
  
  let query = supabase.from('proposals').select('*')
  
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  if (filters?.clientEmail) {
    query = query.eq('client_email', filters.clientEmail)
  }
  if (filters?.ownerId) {
    query = query.eq('owner_id', filters.ownerId)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Proposal[]
}

// Template functions
export async function getTemplate(id: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('proposal_templates')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as ProposalTemplate
}

export async function listTemplates(type?: string) {
  const supabase = createClient()
  
  let query = supabase
    .from('proposal_templates')
    .select('*')
    .eq('is_active', true)
  
  if (type) {
    query = query.eq('type', type)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  // If error or no data, return hardcoded templates
  if (error || !data || data.length === 0) {
    // Import the hardcoded templates
    const { proposalTemplates } = await import('@/lib/data/proposal-templates')
    
    // Filter by type if specified
    if (type) {
      return proposalTemplates.filter(t => t.type === type)
    }
    
    return proposalTemplates
  }
  
  return data as ProposalTemplate[]
}

export async function createTemplate(template: Partial<ProposalTemplate>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('proposal_templates')
    .insert(template)
    .select()
    .single()
  
  if (error) throw error
  return data as ProposalTemplate
}

// Analytics functions
export async function trackProposalView(
  proposalId: string,
  sessionId: string,
  duration?: number,
  pagesViewed?: string[]
) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('proposal_views')
    .insert({
      proposal_id: proposalId,
      session_id: sessionId,
      duration_seconds: duration,
      pages_viewed: pagesViewed,
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
      referrer: typeof document !== 'undefined' ? document.referrer : null
    })
  
  if (error) console.error('Failed to track view:', error)
  
  // Update proposal last viewed timestamp
  await updateProposal(proposalId, {
    lastViewedAt: new Date().toISOString(),
    firstViewedAt: undefined // Will be set by database if null
  })
}

export async function trackProposalEvent(
  proposalId: string,
  eventType: string,
  sessionId?: string,
  eventData?: Record<string, unknown>
) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('proposal_events')
    .insert({
      proposal_id: proposalId,
      event_type: eventType,
      session_id: sessionId,
      event_data: eventData
    })
  
  if (error) console.error('Failed to track event:', error)
}

export async function getProposalAnalytics(proposalId: string): Promise<ProposalAnalytics> {
  const supabase = createClient()
  
  // Get view statistics
  const { data: views, error: viewsError } = await supabase
    .from('proposal_views')
    .select('*')
    .eq('proposal_id', proposalId)
  
  if (viewsError) throw viewsError
  
  // Get event statistics
  const { data: events, error: eventsError } = await supabase
    .from('proposal_events')
    .select('*')
    .eq('proposal_id', proposalId)
  
  if (eventsError) throw eventsError
  
  // Calculate analytics
  const uniqueViewers = new Set(views?.map(v => v.session_id)).size
  const totalViews = views?.length || 0
  const averageViewDuration = views?.length 
    ? views.reduce((acc, v) => acc + (v.duration_seconds || 0), 0) / views.length
    : 0
  const lastViewedAt = views?.length
    ? views.sort((a, b) => new Date(b.viewed_at).getTime() - new Date(a.viewed_at).getTime())[0].viewed_at
    : undefined
  
  const downloadCount = events?.filter(e => e.event_type === 'pdf_download').length || 0
  const chatInteractions = events?.filter(e => e.event_type === 'question_asked').length || 0
  const fileUploads = events?.filter(e => e.event_type === 'file_uploaded').length || 0
  
  // Calculate engagement score (0-100)
  const engagementScore = calculateEngagementScore({
    totalViews,
    uniqueViewers,
    averageViewDuration,
    downloadCount,
    chatInteractions,
    fileUploads
  })
  
  return {
    proposalId,
    totalViews,
    uniqueViewers,
    averageViewDuration,
    lastViewedAt,
    downloadCount,
    chatInteractions,
    fileUploads,
    engagementScore
  }
}

// Chat functions
export async function addProposalChat(
  proposalId: string,
  role: 'user' | 'assistant' | 'system',
  content: string,
  sessionId?: string,
  metadata?: Record<string, unknown>
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('proposal_chats')
    .insert({
      proposal_id: proposalId,
      role,
      content,
      session_id: sessionId,
      metadata
    })
    .select()
    .single()
  
  if (error) throw error
  return data as ProposalChat
}

export async function getProposalChats(proposalId: string, sessionId?: string) {
  const supabase = createClient()
  
  let query = supabase
    .from('proposal_chats')
    .select('*')
    .eq('proposal_id', proposalId)
  
  if (sessionId) {
    query = query.eq('session_id', sessionId)
  }
  
  const { data, error } = await query.order('created_at', { ascending: true })
  
  if (error) throw error
  return data as ProposalChat[]
}

// File upload functions
export async function uploadProposalFile(
  proposalId: string,
  file: File,
  category?: string,
  description?: string
) {
  const supabase = createClient()
  
  // Enforce 50MB file size limit
  const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB in bytes
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 50MB limit')
  }
  
  // Generate unique file path
  const fileExt = file.name.split('.').pop()
  const fileName = `${proposalId}/${uuidv4()}.${fileExt}`
  
  // Upload to Supabase storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('proposal-uploads')
    .upload(fileName, file)
  
  if (uploadError) throw uploadError
  
  // Save upload record
  const { data, error } = await supabase
    .from('proposal_uploads')
    .insert({
      proposal_id: proposalId,
      file_name: file.name,
      file_size: file.size,
      file_type: file.type,
      storage_path: uploadData.path,
      category,
      description,
      is_client_upload: true
    })
    .select()
    .single()
  
  if (error) throw error
  return data as ProposalUpload
}

export async function getProposalUploads(proposalId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('proposal_uploads')
    .select('*')
    .eq('proposal_id', proposalId)
    .order('uploaded_at', { ascending: false })
  
  if (error) throw error
  return data as ProposalUpload[]
}

export async function getUploadUrl(storagePath: string) {
  const supabase = createClient()
  
  // Use signed URL with 1 hour expiration for better security
  const { data, error } = await supabase.storage
    .from('proposal-uploads')
    .createSignedUrl(storagePath, 3600) // 1 hour expiration
  
  if (error) throw error
  return data.signedUrl
}

// Requirements functions
export async function getProposalRequirements(proposalId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('proposal_requirements')
    .select('*')
    .eq('proposal_id', proposalId)
    .order('sort_order', { ascending: true })
  
  if (error) throw error
  return data as ProposalRequirement[]
}

export async function updateRequirement(
  requirementId: string,
  updates: Partial<ProposalRequirement>
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('proposal_requirements')
    .update(updates)
    .eq('id', requirementId)
    .select()
    .single()
  
  if (error) throw error
  return data as ProposalRequirement
}

export async function addProposalRequirements(
  proposalId: string,
  requirements: Partial<ProposalRequirement>[]
) {
  const supabase = createClient()
  
  const requirementsWithProposal = requirements.map((req, index) => ({
    ...req,
    proposal_id: proposalId,
    sort_order: index
  }))
  
  const { data, error } = await supabase
    .from('proposal_requirements')
    .insert(requirementsWithProposal)
    .select()
  
  if (error) throw error
  return data as ProposalRequirement[]
}

// Signature functions
export async function addProposalSignature(
  proposalId: string,
  signature: Omit<ProposalSignature, 'id' | 'proposalId' | 'signedAt'>
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('proposal_signatures')
    .insert({
      proposal_id: proposalId,
      ...signature,
      ip_address: typeof window !== 'undefined' ? await getClientIP() : null
    })
    .select()
    .single()
  
  if (error) throw error
  
  // Update proposal status to accepted
  await updateProposal(proposalId, {
    status: 'accepted',
    acceptedAt: new Date().toISOString()
  })
  
  return data as ProposalSignature
}

export async function getProposalSignatures(proposalId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('proposal_signatures')
    .select('*')
    .eq('proposal_id', proposalId)
    .order('signed_at', { ascending: false })
  
  if (error) throw error
  return data as ProposalSignature[]
}

// Helper functions
function generateAccessToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function calculateEngagementScore(metrics: {
  totalViews: number
  uniqueViewers: number
  averageViewDuration: number
  downloadCount: number
  chatInteractions: number
  fileUploads: number
}): number {
  // Weighted scoring algorithm
  const weights = {
    views: 0.2,
    uniqueViewers: 0.2,
    duration: 0.2,
    downloads: 0.15,
    chats: 0.15,
    uploads: 0.1
  }
  
  // Normalize metrics (0-1 scale)
  const normalized = {
    views: Math.min(metrics.totalViews / 10, 1),
    uniqueViewers: Math.min(metrics.uniqueViewers / 5, 1),
    duration: Math.min(metrics.averageViewDuration / 600, 1), // 10 minutes max
    downloads: Math.min(metrics.downloadCount / 3, 1),
    chats: Math.min(metrics.chatInteractions / 10, 1),
    uploads: Math.min(metrics.fileUploads / 5, 1)
  }
  
  // Calculate weighted score
  const score = 
    normalized.views * weights.views +
    normalized.uniqueViewers * weights.uniqueViewers +
    normalized.duration * weights.duration +
    normalized.downloads * weights.downloads +
    normalized.chats * weights.chats +
    normalized.uploads * weights.uploads
  
  return Math.round(score * 100)
}

async function getClientIP(): Promise<string | null> {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch {
    return null
  }
}


// Proposal generation with AI
export async function generateProposalContent(
  input: ProposalGenerationInput,
  template: ProposalTemplate
): Promise<Partial<Proposal>> {
  // This would integrate with AI to generate content
  // For now, returning a structured proposal based on input
  
  const content: ProposalContent = {
    coverPage: {
      title: input.projectDetails.title,
      subtitle: `${input.projectDetails.type.replace('_', ' ').toUpperCase()} Proposal`,
      clientName: input.clientInfo.name,
      clientCompany: input.clientInfo.company,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      confidential: true
    },
    greeting: {
      salutation: `Dear ${input.clientInfo.contactName || input.clientInfo.name}`,
      body: `Thank you for the opportunity to work with ${input.clientInfo.company || input.clientInfo.name}. We're excited to propose this ${input.projectDetails.type.replace('_', ' ')} to help you ${input.projectDetails.opportunity}.`
    },
    sections: [
      {
        id: 'overview',
        title: 'Project Overview',
        type: 'text' as const,
        content: {
          problem: input.projectDetails.problem,
          opportunity: input.projectDetails.opportunity
        },
        order: 1
      },
      {
        id: 'goals',
        title: 'Goals & Success Criteria',
        type: 'list' as const,
        content: {
          goals: input.projectDetails.goals,
          metrics: input.projectDetails.successMetrics
        },
        order: 2
      },
      {
        id: 'scope',
        title: 'Scope of Work',
        type: 'text' as const,
        content: input.scope,
        order: 3
      },
      {
        id: 'timeline',
        title: 'Timeline & Schedule',
        type: 'timeline' as const,
        content: input.timeline,
        order: 4
      },
      {
        id: 'pricing',
        title: 'Investment',
        type: 'pricing' as const,
        content: input.pricing,
        order: 5
      }
    ]
  }
  
  if (input.requirements && input.requirements.length > 0) {
    content.sections.push({
      id: 'requirements',
      title: 'What We Need From You',
      type: 'list' as const,
      content: input.requirements as unknown,
      order: 6
    })
  }
  
  if (input.customSections) {
    input.customSections.forEach((section, index) => {
      content.sections.push({
        id: `custom-${index}`,
        title: section.title,
        type: 'custom' as const,
        content: section.content,
        order: 7 + index
      })
    })
  }
  
  return {
    title: input.projectDetails.title,
    clientName: input.clientInfo.name,
    clientCompany: input.clientInfo.company,
    clientEmail: input.clientInfo.email,
    projectType: input.projectDetails.type,
    content,
    templateId: template.id,
    totalValue: input.pricing.total,
    currency: 'USD',
    paymentTerms: input.pricing.paymentTerms,
    accessType: 'magic_link',
    status: 'draft'
  }
}