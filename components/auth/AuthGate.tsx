'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lock, Sparkles, ArrowRight, Mail, User } from 'lucide-react'
import { motion } from 'framer-motion'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface AuthGateProps {
  children: React.ReactNode
  feature?: string
  requireAuth?: boolean
}

export function AuthGate({ children, feature = 'this feature', requireAuth = false }: AuthGateProps) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient()
        setIsSupabaseConfigured(true)
        
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null)
        })

        setLoading(false)
        return () => subscription.unsubscribe()
      } catch {
        setIsSupabaseConfigured(false)
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // If Supabase is not configured or not required, show children
  if (!isSupabaseConfigured || !requireAuth) {
    return <>{children}</>
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse">
          <Sparkles className="w-8 h-8 text-blue-500" />
        </div>
      </div>
    )
  }

  // If user is authenticated, show children
  if (user) {
    return <>{children}</>
  }

  // Show auth gate
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[600px] flex items-center justify-center p-4"
    >
      <Card className="max-w-md w-full bg-neutral-900/50 backdrop-blur-xl border-neutral-800">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <CardTitle className="text-2xl">Premium Feature</CardTitle>
            <CardDescription className="mt-2">
              Sign in to access {feature} and unlock powerful AI tools for your portfolio
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-500 text-xs">✓</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Access all premium AI tools and playbooks
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-500 text-xs">✓</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Save and export your AI-generated strategies
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-500 text-xs">✓</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Get personalized recommendations for your portfolio
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => router.push('/auth/signin')}
              className="w-full"
              size="lg"
            >
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            
            <Button 
              onClick={() => router.push('/auth/signin')}
              variant="outline"
              className="w-full bg-blue-600/10 border-blue-600/30 hover:bg-blue-600/20"
              size="lg"
            >
              <Mail className="w-4 h-4 mr-2" />
              Try Demo Access
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/auth/signup')}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Sign up for free
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}