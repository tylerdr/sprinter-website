'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, LogOut, LogIn, ChevronDown } from 'lucide-react'
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
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 px-2 hover:bg-accent/50 transition-all duration-200 h-9"
        >
          <div className="flex items-center gap-1.5">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-primary" />
            </div>
            <ChevronDown className="h-3.5 w-3.5 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 mt-1">
        <div className="px-3 py-2.5 border-b border-border/40 bg-muted/30">
          <p className="text-sm font-semibold">{user.email?.split('@')[0]}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
        </div>
        <div className="p-1">
          <DropdownMenuItem asChild className="cursor-pointer py-2 px-2 rounded-lg transition-colors focus:bg-accent">
            <Link href="/dashboard/portfolio-health" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 flex items-center justify-center">
                <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Portfolio Dashboard</p>
                <p className="text-xs text-muted-foreground mt-0.5">Track AI metrics & ROI</p>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer py-2 px-2 rounded-lg transition-colors focus:bg-accent">
            <Link href="/admin/proposals" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/5 flex items-center justify-center">
                <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Sprint Proposals</p>
                <p className="text-xs text-muted-foreground mt-0.5">Review active sprints</p>
              </div>
            </Link>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="my-1" />
        <div className="p-1">
          <DropdownMenuItem
            onClick={handleSignOut}
            className="cursor-pointer py-2 px-2 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="font-medium">Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href="/auth/signin">
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 font-medium hover:bg-accent/50 hover:border-primary/30 transition-all duration-200 h-9 px-3 border-border/60"
      >
        <LogIn className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Sign In</span>
      </Button>
    </Link>
  )
}