'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, FileSignature } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { addProposalSignature } from '@/lib/services/proposal'
import { cn } from '@/lib/utils'

interface ProposalSignatureProps {
  proposalId: string
}

export default function ProposalSignature({ proposalId }: ProposalSignatureProps) {
  const [open, setOpen] = useState(false)
  const [signing, setSigning] = useState(false)
  const [signed, setSigned] = useState(false)
  const [formData, setFormData] = useState({
    signerName: '',
    signerEmail: '',
    signerTitle: '',
    signatureData: ''
  })
  const router = useRouter()
  
  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault()
    setSigning(true)
    
    try {
      await addProposalSignature(proposalId, {
        signerName: formData.signerName,
        signerEmail: formData.signerEmail,
        signerTitle: formData.signerTitle,
        signatureData: formData.signatureData || formData.signerName // Use typed name as signature
      })
      
      setSigned(true)
      setTimeout(() => {
        setOpen(false)
        router.refresh()
      }, 2000)
    } catch (error) {
      console.error('Failed to sign proposal:', error)
    } finally {
      setSigning(false)
    }
  }
  
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={cn(
          "gap-2",
          signed && "bg-green-600 hover:bg-green-700"
        )}
      >
        {signed ? (
          <>
            <Check className="h-4 w-4" />
            Signed
          </>
        ) : (
          <>
            <FileSignature className="h-4 w-4" />
            Accept & Sign
          </>
        )}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign Proposal</DialogTitle>
            <DialogDescription>
              By signing below, you accept the terms outlined in this proposal.
            </DialogDescription>
          </DialogHeader>
          
          {!signed ? (
            <form onSubmit={handleSign} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.signerName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    signerName: e.target.value
                  }))}
                  required
                  disabled={signing}
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.signerEmail}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    signerEmail: e.target.value
                  }))}
                  required
                  disabled={signing}
                />
              </div>
              
              <div>
                <Label htmlFor="title">Title/Position</Label>
                <Input
                  id="title"
                  value={formData.signerTitle}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    signerTitle: e.target.value
                  }))}
                  disabled={signing}
                />
              </div>
              
              <div>
                <Label htmlFor="signature">Type your name as signature *</Label>
                <Input
                  id="signature"
                  value={formData.signatureData}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    signatureData: e.target.value
                  }))}
                  placeholder="Type your full name"
                  required
                  disabled={signing}
                  className="font-serif text-lg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This will serve as your electronic signature
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={signing}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={signing || !formData.signerName || !formData.signerEmail || !formData.signatureData}
                  className="flex-1"
                >
                  {signing ? 'Signing...' : 'Sign Proposal'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Proposal Signed Successfully!</h3>
              <p className="text-muted-foreground">
                Thank you for accepting this proposal. We&apos;ll be in touch soon.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}