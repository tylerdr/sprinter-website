import { Metadata } from 'next'
import ProposalCreator from '@/components/proposals/ProposalCreator'
import { listTemplatesServer } from '@/lib/services/proposal-server'
import { requireAuth } from '@/lib/supabase/utils'

export const metadata: Metadata = {
  title: 'Create Proposal | Sprinter AI Admin',
  description: 'Create a new proposal for a client',
  robots: 'noindex, nofollow'
}

export default async function CreateProposalPage() {
  // Check authentication with getClaims
  const { user } = await requireAuth()
  
  // Load available templates
  const templates = await listTemplatesServer()
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Proposal</h1>
          <ProposalCreator templates={templates} userId={user.id} />
        </div>
      </div>
    </div>
  )
}