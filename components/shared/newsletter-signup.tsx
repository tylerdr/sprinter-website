"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Mail, Download, TrendingUp, FileText, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsletterSignupProps {
  variant?: "inline" | "card" | "minimal"
  className?: string
  showBenefits?: boolean
}

const LEAD_MAGNET = {
  title: "The PE Portfolio AI Readiness Scorecard",
  subtitle: "Score Your Portfolio's AI Maturity in 5 Minutes",
  description: "Instant assessment tool used by 50+ PE firms to identify quick AI wins",
  benefits: [
    "Score each portco on 12 AI readiness factors",
    "Identify your top 3 AI wedge opportunities",
    "Get benchmarks from 200+ portfolio implementations",
    "Receive custom 30-day action plan",
  ],
  fileName: "PE-Portfolio-AI-Readiness-Scorecard.pdf"
}

export function NewsletterSignup({
  variant = "card",
  className,
  showBenefits = true
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          leadMagnet: LEAD_MAGNET.fileName,
          source: variant
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubscribed(true)
        toast.success("Check your email for the AI Readiness Scorecard!", {
          description: "You're now subscribed to our weekly PE AI insights."
        })

        // Track conversion
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "newsletter_signup", {
            lead_magnet: LEAD_MAGNET.fileName,
            source: variant
          })
        }
      } else {
        toast.error(data.error || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed && variant === "card") {
    return (
      <Card className={cn("bg-green-500/5 border-green-500/20", className)}>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg mb-1">You're all set!</h3>
              <p className="text-sm text-muted-foreground">
                Check your email for the AI Readiness Scorecard and weekly insights.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="max-w-sm"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Get Scorecard"}
          <Mail className="ml-2 h-4 w-4" />
        </Button>
      </form>
    )
  }

  if (variant === "inline") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-blue-500" />
          <div className="flex-1">
            <h3 className="font-semibold">{LEAD_MAGNET.title}</h3>
            <p className="text-sm text-muted-foreground">{LEAD_MAGNET.subtitle}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email for instant access"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Get Free Scorecard"}
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    )
  }

  // Card variant (default)
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            <TrendingUp className="mr-1 h-3 w-3" />
            Free Resource
          </Badge>
          <Badge variant="outline" className="text-xs">
            Used by 50+ PE Firms
          </Badge>
        </div>

        <CardTitle className="text-2xl">{LEAD_MAGNET.title}</CardTitle>
        <CardDescription className="text-base">
          {LEAD_MAGNET.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {showBenefits && (
          <div className="mb-6 space-y-2">
            <p className="text-sm font-medium text-muted-foreground mb-3">
              What you'll get instantly:
            </p>
            <ul className="space-y-2">
              {LEAD_MAGNET.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full"
              required
            />
            <p className="text-xs text-muted-foreground">
              Join 1,200+ PE professionals getting weekly AI insights
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                Get Your Free Scorecard
                <Download className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>✓ No spam</span>
          <span>✓ Unsubscribe anytime</span>
          <span>✓ 5-min read weekly</span>
        </div>
      </CardContent>
    </Card>
  )
}