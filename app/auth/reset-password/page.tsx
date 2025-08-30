'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Mail, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) {
        toast.error(error.message)
      } else {
        setIsSuccess(true)
        toast.success('Password reset link sent!')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-neutral-900/50 border-neutral-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Reset Password
          </CardTitle>
          <CardDescription className="text-neutral-400">
            {isSuccess 
              ? "Check your email for the reset link"
              : "Enter your email to receive a password reset link"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isSuccess ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-neutral-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                  className="bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Reset Link
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                <p className="text-green-400">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-neutral-400 mt-2">
                  Please check your email and follow the instructions to reset your password.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSuccess(false)
                  setEmail('')
                }}
                className="w-full bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800"
              >
                Send Another Link
              </Button>
            </div>
          )}

          <div className="text-center text-sm">
            <Link
              href="/auth/signin"
              className="text-neutral-400 hover:text-white inline-flex items-center"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}