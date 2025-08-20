// Server-side proposal functions
import { createClient } from '@/lib/supabase/server'
import { proposalTemplates } from '@/lib/data/proposal-templates'
import type { Proposal, ProposalTemplate } from '@/lib/types/proposal'

export async function createProposalServer(input: Partial<Proposal>) {
  const supabase = await createClient()
  
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

export async function getProposalServer(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Proposal
}

export async function listTemplatesServer(type?: string) {
  const supabase = await createClient()
  
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
    // Filter by type if specified
    if (type) {
      return proposalTemplates.filter(t => t.type === type)
    }
    
    return proposalTemplates
  }
  
  return data as ProposalTemplate[]
}

function generateAccessToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}