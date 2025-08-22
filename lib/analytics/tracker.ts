'use client'

import { createClient } from '@/lib/supabase/client'
import posthog from 'posthog-js'

// Initialize PostHog if configured
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

if (typeof window !== 'undefined' && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
    }
  })
}

export type EventType = 'page_view' | 'link_click' | 'form_submit' | 'button_click' | 'conversion' | 'custom'

export interface AnalyticsEvent {
  event_type: EventType
  event_name: string
  page_url?: string
  referrer_url?: string
  target_url?: string
  element_id?: string
  element_class?: string
  element_text?: string
  session_id?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  metadata?: Record<string, any>
  user_agent?: string
  device_type?: string
  browser?: string
  os?: string
}

class Analytics {
  private supabase = typeof window !== 'undefined' ? createClient() : null
  private sessionId: string
  private userId: string | null = null

  constructor() {
    // Generate or retrieve session ID
    if (typeof window !== 'undefined') {
      this.sessionId = this.getOrCreateSessionId()
      this.detectUser()
    } else {
      this.sessionId = ''
    }
  }

  private getOrCreateSessionId(): string {
    const key = 'analytics_session_id'
    let sessionId = sessionStorage.getItem(key)
    
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem(key, sessionId)
    }
    
    return sessionId
  }

  private async detectUser() {
    if (!this.supabase) return
    
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      this.userId = user?.id || null
    } catch (error) {
      console.error('Error detecting user:', error)
    }
  }

  private getDeviceInfo() {
    if (typeof window === 'undefined') return {}
    
    const userAgent = navigator.userAgent
    const platform = navigator.platform
    
    // Simple device detection
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent)
    const isTablet = /iPad|Android/i.test(userAgent) && !/Mobile/i.test(userAgent)
    
    let deviceType = 'desktop'
    if (isTablet) deviceType = 'tablet'
    else if (isMobile) deviceType = 'mobile'
    
    // Simple browser detection
    let browser = 'unknown'
    if (userAgent.includes('Chrome')) browser = 'Chrome'
    else if (userAgent.includes('Safari')) browser = 'Safari'
    else if (userAgent.includes('Firefox')) browser = 'Firefox'
    else if (userAgent.includes('Edge')) browser = 'Edge'
    
    // Simple OS detection
    let os = 'unknown'
    if (platform.includes('Win')) os = 'Windows'
    else if (platform.includes('Mac')) os = 'macOS'
    else if (platform.includes('Linux')) os = 'Linux'
    else if (/Android/i.test(userAgent)) os = 'Android'
    else if (/iOS|iPhone|iPad/i.test(userAgent)) os = 'iOS'
    
    return {
      user_agent: userAgent,
      device_type: deviceType,
      browser,
      os
    }
  }

  private getUTMParams(): Record<string, string> {
    if (typeof window === 'undefined') return {}
    
    const params = new URLSearchParams(window.location.search)
    const utm: Record<string, string> = {}
    
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    utmKeys.forEach(key => {
      const value = params.get(key)
      if (value) utm[key] = value
    })
    
    return utm
  }

  async track(event: Omit<AnalyticsEvent, 'session_id' | 'user_agent' | 'device_type' | 'browser' | 'os'>) {
    if (typeof window === 'undefined') return

    const deviceInfo = this.getDeviceInfo()
    const utmParams = this.getUTMParams()
    
    const fullEvent: AnalyticsEvent = {
      ...event,
      session_id: this.sessionId,
      page_url: event.page_url || window.location.href,
      referrer_url: event.referrer_url || document.referrer,
      ...deviceInfo,
      ...utmParams,
      metadata: {
        ...event.metadata,
        timestamp: new Date().toISOString()
      }
    }

    // Track in PostHog if available
    if (POSTHOG_KEY && typeof posthog !== 'undefined') {
      posthog.capture(event.event_name, {
        ...fullEvent,
        distinct_id: this.userId || this.sessionId
      })
    }

    // Track in Supabase
    if (this.supabase) {
      try {
        const { error } = await this.supabase
          .from('analytics_events')
          .insert({
            ...fullEvent,
            user_id: this.userId,
            created_at: new Date().toISOString()
          })
        
        if (error) {
          console.error('Analytics tracking error:', error)
        }
      } catch (error) {
        console.error('Analytics tracking error:', error)
      }
    }
  }

  // Convenience methods
  async pageView(metadata?: Record<string, any>) {
    await this.track({
      event_type: 'page_view',
      event_name: 'page_viewed',
      metadata
    })
  }

  async linkClick(href: string, text?: string, metadata?: Record<string, any>) {
    await this.track({
      event_type: 'link_click',
      event_name: 'link_clicked',
      target_url: href,
      element_text: text,
      metadata
    })
  }

  async buttonClick(buttonId: string, text?: string, metadata?: Record<string, any>) {
    await this.track({
      event_type: 'button_click',
      event_name: 'button_clicked',
      element_id: buttonId,
      element_text: text,
      metadata
    })
  }

  async formSubmit(formId: string, formName?: string, metadata?: Record<string, any>) {
    await this.track({
      event_type: 'form_submit',
      event_name: 'form_submitted',
      element_id: formId,
      metadata: {
        form_name: formName,
        ...metadata
      }
    })
  }

  async conversion(conversionName: string, value?: number, metadata?: Record<string, any>) {
    await this.track({
      event_type: 'conversion',
      event_name: conversionName,
      metadata: {
        conversion_value: value,
        ...metadata
      }
    })
  }

  async custom(eventName: string, metadata?: Record<string, any>) {
    await this.track({
      event_type: 'custom',
      event_name: eventName,
      metadata
    })
  }

  // Identify user for PostHog
  identify(userId: string, traits?: Record<string, any>) {
    this.userId = userId
    
    if (POSTHOG_KEY && typeof posthog !== 'undefined') {
      posthog.identify(userId, traits)
    }
  }

  // Reset user identification
  reset() {
    this.userId = null
    
    if (POSTHOG_KEY && typeof posthog !== 'undefined') {
      posthog.reset()
    }
  }
}

// Export singleton instance
export const analytics = new Analytics()