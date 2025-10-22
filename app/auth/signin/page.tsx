'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, signInWithOAuth } from '@/lib/supabase/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Mail, Loader2 } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { toast } from 'sonner'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOAuthLoading, setIsOAuthLoading] = useState<string | null>(null)
  const [isDemoLoading, setIsDemoLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await signIn({ email, password })
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Signed in successfully')
        router.push('/admin/proposals')
        router.refresh()
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: 'github' | 'google') => {
    setIsOAuthLoading(provider)
    try {
      const { error } = await signInWithOAuth(provider)
      if (error) {
        toast.error(error.message)
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsOAuthLoading(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-border">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="bg-muted/50 border-border"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Sign in with Email
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid gap-2">
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn('github')}
              disabled={isOAuthLoading !== null}
              className="w-full bg-muted/50 border-border hover:bg-muted"
            >
              {isOAuthLoading === 'github' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FaGithub className="mr-2 h-4 w-4" />
              )}
              GitHub
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn('google')}
              disabled={isOAuthLoading !== null}
              className="w-full bg-muted/50 border-border hover:bg-muted"
            >
              {isOAuthLoading === 'google' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={async () => {
              setIsDemoLoading(true)
              try {
                // Call secure demo login endpoint
                const response = await fetch('/api/auth/demo', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' }
                })
                
                const data = await response.json()
                
                if (!response.ok) {
                  toast.error(data.error || 'Demo access unavailable. Please contact support.')
                } else {
                  toast.success('Welcome to the demo!')
                  router.push('/dashboard/portfolio-health')
                  router.refresh()
                }
              } catch (error) {
                toast.error('Demo access unavailable')
              } finally {
                setIsDemoLoading(false)
              }
            }}
            disabled={isDemoLoading || isLoading || isOAuthLoading !== null}
            className="w-full bg-primary/10 border-primary/30 hover:bg-primary/20 text-primary"
          >
            {isDemoLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Try Demo Access
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-primary hover:text-primary/80 underline">
              Sign up
            </Link>
          </div>
          <Link
            href="/auth/reset-password"
            className="text-sm text-muted-foreground hover:text-foreground underline text-center"
          >
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}