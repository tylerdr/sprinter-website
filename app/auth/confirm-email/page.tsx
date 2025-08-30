'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function ConfirmEmailPage() {
  const [isResending, setIsResending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleResendEmail = async () => {
    setIsResending(true)
    
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user?.email) {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: user.email,
        })
        
        if (error) {
          toast.error('Failed to resend email')
        } else {
          setEmailSent(true)
          toast.success('Confirmation email sent!')
        }
      } else {
        toast.error('No email found. Please sign up again.')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-neutral-900/50 border-neutral-800">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-blue-600/10 flex items-center justify-center">
            {emailSent ? (
              <CheckCircle className="h-10 w-10 text-blue-400" />
            ) : (
              <Mail className="h-10 w-10 text-blue-400" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Check Your Email
          </CardTitle>
          <CardDescription className="text-neutral-400 text-base">
            We've sent you a confirmation email. Please check your inbox and click the link to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800/30">
            <h3 className="font-medium text-blue-400 mb-2">Next Steps:</h3>
            <ol className="text-sm text-neutral-300 space-y-1 list-decimal list-inside">
              <li>Check your email inbox</li>
              <li>Click the confirmation link</li>
              <li>Sign in to your account</li>
            </ol>
          </div>

          <div className="space-y-3">
            {!emailSent ? (
              <Button
                variant="outline"
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800"
              >
                {isResending ? 'Sending...' : 'Resend Confirmation Email'}
              </Button>
            ) : (
              <div className="text-center text-sm text-green-400">
                Email sent successfully! Check your inbox.
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-neutral-900 px-2 text-neutral-500">or</span>
              </div>
            </div>

            <Link href="/auth/signin" className="block">
              <Button
                variant="outline"
                className="w-full bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </div>

          <p className="text-xs text-center text-neutral-500">
            Didn't receive the email? Check your spam folder or try resending.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}