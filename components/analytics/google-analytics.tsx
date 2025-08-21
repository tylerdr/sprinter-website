"use client"

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Event types for conversion tracking
export const GA_EVENTS = {
  // Funnel events
  VIEW_ASSESSMENT: "view_ai_assessment",
  START_ASSESSMENT: "start_ai_assessment", 
  COMPLETE_ASSESSMENT: "complete_ai_assessment",
  VIEW_SPRINT: "view_ai_sprint",
  CLICK_SPRINT_CTA: "click_sprint_cta",
  PURCHASE_SPRINT: "purchase_sprint",
  VIEW_PARTNERSHIP: "view_partnership",
  CLICK_PARTNERSHIP_CTA: "click_partnership_cta",
  
  // Engagement events
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  CHAT_INITIATED: "chat_initiated",
  CHAT_MESSAGE_SENT: "chat_message_sent",
  PROPOSAL_VIEWED: "proposal_viewed",
  PROPOSAL_SIGNED: "proposal_signed",
  
  // Content events
  CASE_STUDY_VIEWED: "case_study_viewed",
  BLOG_POST_READ: "blog_post_read",
  LAB_TOOL_USED: "lab_tool_used",
  
  // Navigation
  NAVBAR_CLICK: "navbar_click",
  FOOTER_CLICK: "footer_click",
}

// Track page views
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return
  
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return
  
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Track conversions with monetary value
export const trackConversion = (
  conversionType: string,
  value?: number,
  currency: string = "USD"
) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return
  
  window.gtag("event", "conversion", {
    send_to: `${GA_MEASUREMENT_ID}/${conversionType}`,
    value: value,
    currency: currency,
  })
}

// Enhanced ecommerce tracking for Sprint purchase
export const trackPurchase = (
  transactionId: string,
  value: number,
  items: Array<{
    id: string
    name: string
    category: string
    price: number
    quantity: number
  }>
) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return
  
  window.gtag("event", "purchase", {
    transaction_id: transactionId,
    value: value,
    currency: "USD",
    items: items,
  })
}

// Component to initialize GA
export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    pageview(url)
    
    // Track specific page views as events
    if (pathname === "/ai-assessment") {
      event({
        action: GA_EVENTS.VIEW_ASSESSMENT,
        category: "Funnel",
        label: "Top of Funnel View",
      })
    } else if (pathname === "/ai-sprint") {
      event({
        action: GA_EVENTS.VIEW_SPRINT,
        category: "Funnel",
        label: "Middle of Funnel View",
      })
    } else if (pathname === "/ai-partnership") {
      event({
        action: GA_EVENTS.VIEW_PARTNERSHIP,
        category: "Funnel",
        label: "Bottom of Funnel View",
      })
    }
  }, [pathname, searchParams])

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: false
          });
        `}
      </Script>
    </>
  )
}

// Custom hook for easy event tracking in components
import { useCallback } from "react"

export function useAnalytics() {
  const track = useCallback((
    eventName: string,
    properties?: Record<string, any>
  ) => {
    event({
      action: eventName,
      category: properties?.category || "General",
      label: properties?.label,
      value: properties?.value,
    })
  }, [])

  const trackClick = useCallback((
    elementName: string,
    elementType: string = "button"
  ) => {
    event({
      action: "click",
      category: "UI Interaction",
      label: `${elementType}_${elementName}`,
    })
  }, [])

  const trackFormSubmit = useCallback((
    formName: string,
    formData?: Record<string, any>
  ) => {
    event({
      action: "form_submit",
      category: "Form",
      label: formName,
      value: formData?.value,
    })
  }, [])

  return {
    track,
    trackClick,
    trackFormSubmit,
  }
}

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}