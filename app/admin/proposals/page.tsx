import { Metadata } from 'next'
import Link from 'next/link'
import { Plus, FileText, Eye, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { listProposals, getProposalAnalytics } from '@/lib/services/proposal'
import { requireAuth } from '@/lib/supabase/utils'

export const metadata: Metadata = {
  title: 'Proposals Dashboard | Sprinter AI Admin',
  description: 'Manage and track all proposals',
  robots: 'noindex, nofollow'
}

export default async function ProposalsPage() {
  // Check authentication with getClaims
  const { user } = await requireAuth()
  
  // Load proposals
  const proposals = await listProposals({ ownerId: user.id })
  
  // Load analytics for each proposal
  const proposalsWithAnalytics = await Promise.all(
    proposals.map(async (proposal) => {
      try {
        const analytics = await getProposalAnalytics(proposal.id)
        return { ...proposal, analytics }
      } catch {
        return { ...proposal, analytics: undefined }
      }
    })
  )
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="h-4 w-4" />
      case 'sent':
        return <Clock className="h-4 w-4" />
      case 'viewed':
        return <Eye className="h-4 w-4" />
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'secondary'
      case 'sent':
        return 'default'
      case 'viewed':
        return 'default'
      case 'accepted':
        return 'default'
      case 'declined':
        return 'destructive'
      default:
        return 'secondary'
    }
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Proposals</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your proposals
            </p>
          </div>
          
          <Link href="/admin/proposals/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Proposal
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="text-2xl font-bold">
              {proposals.length}
            </div>
            <p className="text-sm text-muted-foreground">Total Proposals</p>
          </Card>
          
          <Card className="p-4">
            <div className="text-2xl font-bold">
              {proposals.filter(p => p.status === 'sent').length}
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </Card>
          
          <Card className="p-4">
            <div className="text-2xl font-bold">
              {proposals.filter(p => p.status === 'accepted').length}
            </div>
            <p className="text-sm text-muted-foreground">Accepted</p>
          </Card>
          
          <Card className="p-4">
            <div className="text-2xl font-bold">
              ${proposals
                .filter(p => p.status === 'accepted')
                .reduce((sum, p) => sum + (p.totalValue || 0), 0)
                .toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Total Value</p>
          </Card>
        </div>
        
        {/* Proposals List */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Proposals</h2>
            
            {proposalsWithAnalytics.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No proposals yet</p>
                <Link href="/admin/proposals/create">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Proposal
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {proposalsWithAnalytics.map((proposal) => (
                  <Link
                    key={proposal.id}
                    href={`/admin/proposals/${proposal.id}`}
                    className="block"
                  >
                    <div className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{proposal.title}</h3>
                            <Badge variant={getStatusColor(proposal.status)} className="gap-1">
                              {getStatusIcon(proposal.status)}
                              {proposal.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{proposal.clientName}</span>
                            {proposal.clientCompany && (
                              <>
                                <span>•</span>
                                <span>{proposal.clientCompany}</span>
                              </>
                            )}
                            {proposal.totalValue && (
                              <>
                                <span>•</span>
                                <span className="font-medium">
                                  ${proposal.totalValue.toLocaleString()}
                                </span>
                              </>
                            )}
                          </div>
                          
                          {'analytics' in proposal && proposal.analytics && (
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {proposal.analytics.totalViews} views
                              </span>
                              <span>
                                {proposal.analytics.uniqueViewers} unique viewers
                              </span>
                              {proposal.analytics.engagementScore && (
                                <span>
                                  Engagement: {proposal.analytics.engagementScore}%
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right text-sm text-muted-foreground">
                          <p>{new Date(proposal.createdAt).toLocaleDateString()}</p>
                          {proposal.lastViewedAt && (
                            <p className="text-xs mt-1">
                              Last viewed {new Date(proposal.lastViewedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}