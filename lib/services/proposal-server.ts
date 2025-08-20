// Server-side proposal functions
import { createClient } from '@/lib/supabase/server'
import type { Proposal } from '@/lib/types/proposal'

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

function generateAccessToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}