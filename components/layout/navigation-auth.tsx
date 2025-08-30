'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, LogOut, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from '@/lib/supabase/auth'
import { toast } from 'sonner'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function NavigationAuth() {
  const router = useRouter()
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
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
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

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast.error('Failed to sign out')
    } else {
      toast.success('Signed out successfully')
      router.push('/')
      router.refresh()
    }
  }

  if (!isSupabaseConfigured || isLoading) {
    return null
  }

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline-block">
            {user.email?.split('@')[0] || 'Account'}
          </span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/dashboard/portfolio-health" className="cursor-pointer">
            Portfolio Health
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/admin/proposals" className="cursor-pointer">
            Proposals
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href="/auth/signin">
      <Button variant="outline" size="sm">
        Sign In
      </Button>
    </Link>
  )
}