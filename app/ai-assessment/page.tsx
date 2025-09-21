import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { SampleReportPreview } from "@/components/assessment/sample-report-preview"
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  ClockIcon, 
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
  BoltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline"
import { getThemedFunnel, THEME_HEADLINES } from "@/lib/funnel-themes"

export const metadata: Metadata = {
  title: "Free AI Readiness Assessment for Private Equity | Sprinter AI",
  description: "Discover where AI can add millions to your portfolio value. Get a personalized AI opportunity report in 24 hours. No cost, no risk.",
  openGraph: {
    title: "Free AI Readiness Assessment for Private Equity",
    description: "Discover where AI can add millions to your portfolio value. Get a personalized AI opportunity report in 24 hours.",
    type: "website",
  },
}

const benefits = [
  {
    icon: ChartBarIcon,
    title: "AI Readiness Score",
    description: "Benchmark against 500+ PE firms already using AI",
  },
  {
    icon: DocumentTextIcon,
    title: "3 Quick Wins",
    description: "Specific opportunities worth $1M+ in portfolio value",
  },
  {
    icon: ClockIcon,
    title: "24-Hour Delivery",
    description: "Get your custom report the next business day",
  },
]

const stats = [
  { value: "40%", label: "of PE firms have AI strategies" },
  { value: "65%", label: "faster deal cycles with AI" },
  { value: "$2.3M", label: "average annual savings" },
  { value: "3x", label: "more deals sourced" },
]

const testimonials = [
  {
    quote: "The assessment showed us $3M in immediate savings opportunities we hadn't considered.",
    author: "Managing Partner",
    company: "Mid-Market PE Fund ($2B AUM)",
  },
  {
    quote: "We went from zero AI to three implementations in 90 days after the assessment.",
    author: "Operating Partner",
    company: "Growth Equity Fund",
  },
]

export default function AIAssessmentPage() {
  const funnel = getThemedFunnel()
  const headlines = THEME_HEADLINES[funnel.theme]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Simplified */}
      <section className="relative overflow-hidden px-6 py-16 sm:py-24 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-3xl dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20" />
        </div>
        
        <div className="mx-auto max-w-4xl">
          {/* Trust Badge */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm border border-primary/20 backdrop-blur-sm">
              <SparklesIcon className="h-4 w-4 text-primary" />
              <span className="text-foreground font-medium">Free AI Opportunity Analysis</span>
            </div>
          </div>

          <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            Find $1M+ in AI Opportunities
          </h1>
          
          <p className="mt-6 text-center text-xl leading-8 text-muted-foreground">
            Get Your Custom PE AI Roadmap in 24 Hours
          </p>

          <p className="mt-4 text-center text-lg text-muted-foreground/80">
            See exactly where AI can transform your deal flow, due diligence, and portfolio operations.
            Takes 2 minutes. 100% free. No sales call required.
          </p>

          {/* Stats Bar */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Streamlined */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-border bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <benefit.icon className="mx-auto h-8 w-8 text-primary mb-3" />
                  <h3 className="mb-2 font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Form - Only Essential Fields */}
      <section id="assessment-form" className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-xl">
          <Card className="border-primary/20 bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold mb-2">Start Your Free Assessment</h2>
                <p className="text-sm text-muted-foreground">
                  2 minutes to complete • Report in 24 hours
                </p>
              </div>
              
              <form className="space-y-4" action="/api/ai-assessment" method="POST">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    required 
                    className="mt-1"
                    placeholder="John Smith"
                  />
                </div>
                
                {/* Email Field */}
                <div>
                  <Label htmlFor="email">Business Email *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    className="mt-1"
                    placeholder="john@pefirm.com"
                  />
                </div>
                
                {/* Firm Field */}
                <div>
                  <Label htmlFor="company">PE Firm *</Label>
                  <Input 
                    id="company" 
                    name="company" 
                    required 
                    className="mt-1"
                    placeholder="Acme Capital Partners"
                  />
                </div>

                {/* Optional: Biggest Challenge */}
                <div>
                  <Label htmlFor="biggest_challenge">
                    Biggest Challenge <span className="text-muted-foreground">(Optional)</span>
                  </Label>
                  <Input 
                    id="biggest_challenge" 
                    name="biggest_challenge"
                    className="mt-1"
                    placeholder="e.g., Deal sourcing, due diligence, reporting..."
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg hover:from-blue-700 hover:to-purple-700 h-12"
                >
                  Get My Free AI Report
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
                
                <div className="text-center space-y-1">
                  <p className="text-xs text-muted-foreground">
                    ✓ No credit card required
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ✓ No sales call unless you want one
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ✓ Unsubscribe anytime
                  </p>
                </div>
              </form>

              {/* Sample Report Preview */}
              <SampleReportPreview />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold">What PE Leaders Say</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="border-border bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-start gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 dark:text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="mb-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="bg-gradient-to-b from-transparent via-primary/5 to-transparent px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <BoltIcon className="h-4 w-4 text-orange-500 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-500 dark:text-orange-400">Limited Time Offer</span>
          </div>
          
          <h2 className="mb-4 text-2xl font-bold">Why PE Firms Choose Our Assessment</h2>
          
          <div className="grid gap-4 text-left max-w-xl mx-auto">
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5" />
              <div>
                <p className="font-medium">No Generic Advice</p>
                <p className="text-sm text-muted-foreground">
                  PE-specific recommendations based on 100+ fund implementations
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5" />
              <div>
                <p className="font-medium">Actionable Roadmap</p>
                <p className="text-sm text-muted-foreground">
                  Step-by-step plan you can implement immediately
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5" />
              <div>
                <p className="font-medium">ROI Projections</p>
                <p className="text-sm text-muted-foreground">
                  See potential returns before investing a dollar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-purple-600/5 dark:from-primary/10 dark:to-purple-600/10">
            <CardContent className="p-8">
              <ShieldCheckIcon className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="mb-4 text-2xl font-bold">
                {funnel.theme === "adventure" && "Begin Your AI Journey"}
                {funnel.theme === "asap" && "Get Started ASAP"}
                {funnel.theme === "motion" && "Start Building Momentum"}
              </h2>
              <p className="mb-6 text-gray-400">
                Join 500+ PE firms using AI to outperform their competition
              </p>
              <a href="#assessment-form">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {headlines.cta}
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <p className="mt-4 text-sm text-muted-foreground">
                Average time to complete: 1 minute 47 seconds
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
