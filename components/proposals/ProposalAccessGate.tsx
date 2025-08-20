'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Key } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import type { ProposalAccessType } from '@/lib/types/proposal'

interface ProposalAccessGateProps {
  proposalId: string
  accessType: ProposalAccessType
}

export default function ProposalAccessGate({ proposalId, accessType }: ProposalAccessGateProps) {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/proposals/${proposalId}/access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      
      if (response.ok) {
        router.refresh()
      } else {
        setError('Invalid password')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const handleMagicLinkRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/proposals/${proposalId}/request-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (response.ok) {
        setError('Access link sent to your email!')
      } else {
        setError('Unable to send access link')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">This Proposal is Protected</h1>
          <p className="text-muted-foreground mt-2">
            Please verify your access to view this proposal
          </p>
        </div>
        
        {accessType === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter proposal password"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            {error && (
              <p className={`text-sm ${error.includes('sent') ? 'text-green-600' : 'text-destructive'}`}>
                {error}
              </p>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verifying...' : 'Access Proposal'}
            </Button>
          </form>
        )}
        
        {accessType === 'magic_link' && (
          <form onSubmit={handleMagicLinkRequest} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                We&apos;ll send you a secure link to access this proposal
              </p>
            </div>
            
            {error && (
              <p className={`text-sm ${error.includes('sent') ? 'text-green-600' : 'text-destructive'}`}>
                {error}
              </p>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Request Access'}
            </Button>
          </form>
        )}
        
        {accessType === 'authenticated' && (
          <div className="text-center">
            <p className="mb-4">Please sign in to view this proposal</p>
            <Button 
              onClick={() => router.push(`/auth/signin?redirect=/proposals/${proposalId}`)}
              className="w-full"
            >
              Sign In
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}