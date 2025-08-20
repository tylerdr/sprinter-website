'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function NavigationAuth() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Dynamically import to avoid build-time errors
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        setIsSupabaseConfigured(true)
        
        // Get initial user
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null)
        })

        setIsLoading(false)
        return () => subscription.unsubscribe()
      } catch {
        // Supabase not configured
        setIsSupabaseConfigured(false)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (!isSupabaseConfigured || isLoading) {
    return null
  }

  return user ? (
    <Link href="/admin/proposals">
      <Button variant="outline" size="sm" className="gap-2">
        <User className="h-4 w-4" />
        Dashboard
      </Button>
    </Link>
  ) : (
    <Link href="/auth/signin">
      <Button variant="outline" size="sm">
        Sign In
      </Button>
    </Link>
  )
}