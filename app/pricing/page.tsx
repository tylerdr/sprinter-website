import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { PRICING } from "@/lib/constants"
import { 
  CheckCircle2, ArrowRight, Sparkles, Zap, Building2, 
  Trophy, Clock, DollarSign, Shield, HeadphonesIcon,
  BarChart3, Users, Rocket, Target
} from 'lucide-react'
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Pricing | Sprinter AI - Transparent, Guaranteed Results",
  description: "Production AI in 10 days. 250% average ROI. Guaranteed results or we work free. Start with a free assessment and see transparent pricing for every engagement model.",
}

// Advisory Services
const advisoryTiers = [
  {
    id: "aiAdvisor",
    ...PRICING.aiAdvisor,
    icon: Shield,
    popular: false,
    cta: "Get Started",
    href: "/ai-advisor-retainer",
    color: "blue",
    badge: "From $8K/mo"
  },
  {
    id: "fractionalCAIO",
    ...PRICING.fractionalCAIO,
    icon: Users,
    popular: true,
    cta: "Learn More",
    href: "/fractional-caio",
    color: "purple",
    badge: "For $1B+ AUM"
  }
]

// Implementation Services
const implementationTiers = [
  {
    id: "workshop",
    ...PRICING.workshop,
    icon: Sparkles,
    popular: false,
    cta: "Book Workshop",
    href: "/contact?type=workshop",
    color: "blue",
    badge: "Low Commitment"
  },
  {
    id: "wedgeSprint",
    ...PRICING.wedgeSprint,
    icon: Zap,
    popular: true,
    cta: "Start 2-Week Sprint",
    href: "/contact?type=sprint",
    color: "purple"
  },
  {
    id: "retainer",
    ...PRICING.retainer,
    icon: Building2,
    popular: false,
    cta: "Become Operating Partner",
    href: "/contact?type=retainer",
    color: "green"
  },
  {
    id: "transformation",
    ...PRICING.transformation,
    icon: Trophy,
    popular: false,
    cta: "Start Transformation",
    href: "/contact?type=transformation",
    color: "orange"
  }
]

const guarantees = [
  {
    icon: Shield,
    title: "Results Guaranteed",
    description: "If we don't identify $500K+ in AI opportunities during your assessment, it's free. If we don't ship in 10 days, we work free until we do."
  },
  {
    icon: Clock,
    title: "10 Days to Production",
    description: "Working AI in production, not pilots that stall. Our Sprinter Method™ delivers measurable ROI while others are still planning."
  },
  {
    icon: Users,
    title: "Portfolio Multiplier Effect™",
    description: "Every implementation creates playbooks your entire portfolio can use. Knowledge compounds across your holdings."
  },
  {
    icon: HeadphonesIcon,
    title: "90-Day ROI or Free",
    description: "If you don't see measurable ROI within 90 days on any retainer, we work free until you do. Zero risk."
  }
]

const comparison = [
  { feature: "Document Intelligence Focus", workshop: true, assessment: true, wedgeSprint: true, retainer: true, transformation: true },
  { feature: "Working Solution", workshop: false, assessment: false, wedgeSprint: true, retainer: true, transformation: true },
  { feature: "Production Deployment", workshop: false, assessment: false, wedgeSprint: true, retainer: true, transformation: true },
  { feature: "Team Training & Enablement", workshop: true, assessment: true, wedgeSprint: true, retainer: true, transformation: true },
  { feature: "Ongoing Support", workshop: "Credit", assessment: "Roadmap", wedgeSprint: "30 days", retainer: "Continuous", transformation: "Continuous" },
  { feature: "Implementations/Month", workshop: "-", assessment: "-", wedgeSprint: "1", retainer: "Portfolio-wide", transformation: "2-4" },
  { feature: "Dedicated Team", workshop: false, assessment: false, wedgeSprint: false, retainer: "AI PMO", transformation: "Full Squad" },
  { feature: "Cross-Portfolio Sharing", workshop: false, assessment: true, wedgeSprint: false, retainer: true, transformation: true },
  { feature: "Governance Framework", workshop: false, assessment: true, wedgeSprint: false, retainer: true, transformation: true },
  { feature: "Board/LP Reporting", workshop: false, assessment: true, wedgeSprint: false, retainer: true, transformation: true },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen py-24">
      {/* Header */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center space-y-6">
          <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
            <Shield className="w-3 h-3 mr-1" />
            Results Guaranteed or We Work Free
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold">
            Production AI. <span className="gradient-text">Guaranteed Results.</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free. Scale when you&apos;re ready. Every engagement comes with our iron-clad guarantee:
            if we don&apos;t deliver measurable ROI, we work free until you see it.
          </p>

          <div className="flex items-center justify-center gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold text-green-500">250%</p>
              <p className="text-sm text-muted-foreground">Average ROI in 60 days</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-500">10 Days</p>
              <p className="text-sm text-muted-foreground">To production</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-500">$18M+</p>
              <p className="text-sm text-muted-foreground">Value created</p>
            </div>
          </div>

          {/* Start Here CTA */}
          <div className="pt-6">
            <Link href="/ai-assessment">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8">
                Start With Free Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-3">
              We&apos;ll identify $500K+ in AI opportunities—or it&apos;s free
            </p>
          </div>
        </div>
      </section>

      {/* Advisory Services */}
      <section className="container mx-auto px-4 max-w-7xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Advisory Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Strategic counsel without implementation commitments. For principals who need independent perspective.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
          {advisoryTiers.map((tier) => (
            <Card
              key={tier.id}
              className={cn(
                "relative flex flex-col",
                tier.popular && "border-purple-500 shadow-xl shadow-purple-500/20"
              )}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Recommended
                </Badge>
              )}
              {'badge' in tier && tier.badge && !tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="secondary">
                  {tier.badge}
                </Badge>
              )}

              <CardHeader>
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  tier.color === "blue" && "bg-blue-500/10",
                  tier.color === "purple" && "bg-purple-500/10"
                )}>
                  <tier.icon className={cn(
                    "w-6 h-6",
                    tier.color === "blue" && "text-blue-500",
                    tier.color === "purple" && "text-purple-500"
                  )} />
                </div>

                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{tier.price}</p>
                  <p className="text-sm text-muted-foreground">{tier.duration}</p>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">
                  {tier.description}
                </p>

                <ul className="space-y-2">
                  {tier.includes.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link href={tier.href} className="w-full">
                  <Button
                    className="w-full"
                    variant={tier.popular ? "default" : "outline"}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Link href="/family-office" className="text-primary hover:underline">
            View all advisory services →
          </Link>
        </div>
      </section>

      {/* Implementation Services */}
      <section className="container mx-auto px-4 max-w-7xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Implementation Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hands-on AI development and deployment. From quick wins to full transformation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {implementationTiers.map((tier) => (
            <Card 
              key={tier.id}
              className={cn(
                "relative flex flex-col",
                tier.popular && "border-purple-500 shadow-xl shadow-purple-500/20"
              )}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              {'badge' in tier && tier.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="secondary">
                  {tier.badge}
                </Badge>
              )}
              
              <CardHeader>
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  tier.color === "blue" && "bg-blue-500/10",
                  tier.color === "teal" && "bg-teal-500/10",
                  tier.color === "purple" && "bg-purple-500/10",
                  tier.color === "green" && "bg-green-500/10",
                  tier.color === "orange" && "bg-orange-500/10"
                )}>
                  <tier.icon className={cn(
                    "w-6 h-6",
                    tier.color === "blue" && "text-blue-500",
                    tier.color === "teal" && "text-teal-500",
                    tier.color === "purple" && "text-purple-500",
                    tier.color === "green" && "text-green-500",
                    tier.color === "orange" && "text-orange-500"
                  )} />
                </div>
                
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{tier.price}</p>
                  <p className="text-sm text-muted-foreground">{tier.duration}</p>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">
                  {tier.description}
                </p>
                
                <ul className="space-y-2">
                  {tier.includes.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Link href={tier.href} className="w-full">
                  <Button 
                    className="w-full" 
                    variant={tier.popular ? "default" : "outline"}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Compare Engagement Models
        </h2>
        
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Features</th>
                    <th className="text-center p-4">Workshop</th>
                    <th className="text-center p-4">Assessment</th>
                    <th className="text-center p-4">Wedge Sprint</th>
                    <th className="text-center p-4">Retainer</th>
                    <th className="text-center p-4">Transformation</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="text-center p-4">
                        {typeof row.workshop === 'boolean' ? (
                          row.workshop ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )
                        ) : (
                          <span className="text-sm">{row.workshop}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof row.assessment === 'boolean' ? (
                          row.assessment ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )
                        ) : (
                          <span className="text-sm">{row.assessment}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof row.wedgeSprint === 'boolean' ? (
                          row.wedgeSprint ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )
                        ) : (
                          <span className="text-sm">{row.wedgeSprint}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof row.retainer === 'boolean' ? (
                          row.retainer ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )
                        ) : (
                          <span className="text-sm">{row.retainer}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof row.transformation === 'boolean' ? (
                          row.transformation ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )
                        ) : (
                          <span className="text-sm">{row.transformation}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Guarantees */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Guarantees
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((guarantee, i) => (
            <Card key={i} className="bg-neutral-900/50 border-neutral-800">
              <CardContent className="pt-6">
                <guarantee.icon className="w-10 h-10 text-green-500 mb-4" />
                <h3 className="font-semibold mb-2">{guarantee.title}</h3>
                <p className="text-sm text-muted-foreground">{guarantee.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 max-w-4xl mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Common Questions
        </h2>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How quickly can we see results?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You'll have a working AI prototype in 5 days with our Sprint model. 
                Full production deployment happens within the same sprint. Most clients 
                see measurable ROI within 30-60 days of deployment.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What if it doesn't work for our portfolio?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We offer a 10x ROI guarantee. If we don't deliver at least 10x return 
                on your investment within 12 months, we'll refund your money. Our track 
                record: 100% of clients exceed this threshold, with an average of 18x ROI.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Can we start small and scale up?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Absolutely. Most PE firms start with an Assessment or Sprint for one 
                portfolio company, then expand to Surf or Sail partnerships after seeing 
                results. There's no lock-in, and you can upgrade or downgrade anytime.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How do you work with our existing teams?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We integrate seamlessly with your investment teams and portfolio company 
                operators. We provide training, documentation, and ongoing support to ensure 
                your teams can maintain and extend what we build. Knowledge transfer is 
                included in every engagement.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border-green-500/30">
          <CardContent className="pt-12 pb-12 text-center">
            <Badge className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/20">
              <Clock className="w-3 h-3 mr-1" />
              Only 3 Retainer Slots Left This Quarter
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Stop Leaving Money on the Table
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every month you wait, your competitors gain ground. Start with a free assessment—
              we&apos;ll identify at least $500K in AI opportunities or it costs you nothing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/ai-assessment">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Your Free Assessment
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button size="lg" variant="outline" className="gap-2">
                  <Trophy className="w-5 h-5" />
                  See $18M+ in Results
                </Button>
              </Link>
            </div>
            <p className="text-sm text-green-400 mt-6 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Results guaranteed or we work free until you see ROI
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}