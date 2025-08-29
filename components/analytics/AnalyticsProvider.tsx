'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { analytics } from '@/lib/analytics/tracker'

function AnalyticsTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page view on route change
    analytics.pageView({
      path: pathname,
      search: searchParams?.toString() || ''
    })
  }, [pathname, searchParams])

  useEffect(() => {
    // Track link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.href) {
        const isExternal = link.hostname !== window.location.hostname
        const text = link.textContent || link.getAttribute('aria-label') || ''
        
        analytics.linkClick(link.href, text, {
          is_external: isExternal,
          link_id: link.id || undefined,
          link_class: link.className || undefined
        })
      }
    }

    // Track button clicks
    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const button = target.closest('button')
      
      if (button) {
        const text = button.textContent || button.getAttribute('aria-label') || ''
        const id = button.id || button.getAttribute('data-track-id') || ''
        
        analytics.buttonClick(id, text, {
          button_class: button.className || undefined,
          button_type: button.type || undefined
        })
      }
    }

    // Track form submissions
    const handleFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement
      const formId = form.id || form.getAttribute('data-track-id') || ''
      const formName = form.getAttribute('name') || form.getAttribute('data-track-name') || ''
      
      analytics.formSubmit(formId, formName, {
        form_action: form.action || undefined,
        form_method: form.method || undefined
      })
    }

    // Add event listeners
    document.addEventListener('click', handleLinkClick)
    document.addEventListener('click', handleButtonClick)
    document.addEventListener('submit', handleFormSubmit)

    // Cleanup
    return () => {
      document.removeEventListener('click', handleLinkClick)
      document.removeEventListener('click', handleButtonClick)
      document.removeEventListener('submit', handleFormSubmit)
    }
  }, [])

  // Track user authentication state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          analytics.identify(user.id, {
            email: user.email,
            created_at: user.created_at
          })
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event: any, session) => {
          if (session?.user) {
            analytics.identify(session.user.id, {
              email: session.user.email
            })
            analytics.custom('auth_state_changed', { event })
          } else {
            analytics.reset()
            analytics.custom('auth_state_changed', { event: 'signed_out' })
          }
        })

        return () => subscription.unsubscribe()
      } catch (error) {
        console.error('Error setting up auth tracking:', error)
      }
    }

    checkAuth()
  }, [])

  return null
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracking />
      </Suspense>
      {children}
    </>
  )
}