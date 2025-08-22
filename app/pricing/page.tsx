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
  title: "Pricing | Sprinter AI",
  description: "Transparent pricing for PE firms. From assessment to full partnership, choose the AI engagement model that fits your portfolio's needs.",
}

const tiers = [
  {
    id: "assessment",
    ...PRICING.assessment,
    icon: Sparkles,
    popular: false,
    cta: "Start Assessment",
    href: "/contact?type=assessment",
    color: "blue"
  },
  {
    id: "sprint",
    ...PRICING.sprint,
    icon: Zap,
    popular: true,
    cta: "Book Sprint",
    href: "/contact?type=sprint",
    color: "purple"
  },
  {
    id: "surf",
    ...PRICING.surf,
    icon: Building2,
    popular: false,
    cta: "Start Partnership",
    href: "/contact?type=partnership",
    color: "green"
  },
  {
    id: "sail",
    ...PRICING.sail,
    icon: Trophy,
    popular: false,
    cta: "Contact Sales",
    href: "/contact?type=enterprise",
    color: "orange"
  }
]

const guarantees = [
  {
    icon: Shield,
    title: "10x ROI Guarantee",
    description: "We guarantee 10x return on your investment or your money back. Our average client sees 18x ROI."
  },
  {
    icon: Clock,
    title: "Speed to Value",
    description: "See working AI in 5 days, not months. Full production deployment while others are still planning."
  },
  {
    icon: Users,
    title: "Portfolio-Wide Impact",
    description: "Every implementation benefits your entire portfolio through shared learnings and reusable components."
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing Support",
    description: "We don't disappear after delivery. Every engagement includes post-implementation support."
  }
]

const comparison = [
  { feature: "AI Strategy Development", assessment: true, sprint: true, surf: true, sail: true },
  { feature: "Working Prototype", assessment: false, sprint: true, surf: true, sail: true },
  { feature: "Production Deployment", assessment: false, sprint: true, surf: true, sail: true },
  { feature: "Team Training", assessment: false, sprint: true, surf: true, sail: true },
  { feature: "Ongoing Support", assessment: "30 days", sprint: "90 days", surf: "Continuous", sail: "Continuous" },
  { feature: "Implementations/Quarter", assessment: "-", sprint: "1", surf: "3", sail: "Unlimited" },
  { feature: "Dedicated Team", assessment: false, sprint: false, surf: "Strategist", sail: "3+ Experts" },
  { feature: "Cross-Portfolio Sharing", assessment: false, sprint: false, surf: true, sail: true },
  { feature: "Custom Platform Development", assessment: false, sprint: false, surf: false, sail: true },
  { feature: "Board/LP Reporting", assessment: true, sprint: false, surf: true, sail: true },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen py-24">
      {/* Header */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center space-y-6">
          <Badge className="mb-4" variant="outline">
            <DollarSign className="w-3 h-3 mr-1" />
            Transparent Pricing
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold">
            AI That Pays for <span className="gradient-text">Itself</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Clear, value-based pricing for PE firms. Every engagement includes ROI guarantee, 
            production deployment, and ongoing support. No hidden fees, no surprises.
          </p>

          <div className="flex items-center justify-center gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold text-green-500">18x</p>
              <p className="text-sm text-muted-foreground">Average ROI</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-500">5 days</p>
              <p className="text-sm text-muted-foreground">To production</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-500">$1.8B</p>
              <p className="text-sm text-muted-foreground">Value created</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="container mx-auto px-4 max-w-7xl mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
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
              
              <CardHeader>
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  tier.color === "blue" && "bg-blue-500/10",
                  tier.color === "purple" && "bg-purple-500/10",
                  tier.color === "green" && "bg-green-500/10",
                  tier.color === "orange" && "bg-orange-500/10"
                )}>
                  <tier.icon className={cn(
                    "w-6 h-6",
                    tier.color === "blue" && "text-blue-500",
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
                    <th className="text-center p-4">Assessment</th>
                    <th className="text-center p-4">Sprint</th>
                    <th className="text-center p-4">Surf</th>
                    <th className="text-center p-4">Sail</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4 font-medium">{row.feature}</td>
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
                        {typeof row.sprint === 'boolean' ? (
                          row.sprint ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )
                        ) : (
                          <span className="text-sm">{row.sprint}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof row.surf === 'boolean' ? (
                          row.surf ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )
                        ) : (
                          <span className="text-sm">{row.surf}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof row.sail === 'boolean' ? (
                          row.sail ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )
                        ) : (
                          <span className="text-sm">{row.sail}</span>
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
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/30">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Portfolio?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join leading PE firms using AI to drive unprecedented value creation. 
              Start with a free consultation to discuss your portfolio's specific needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  <HeadphonesIcon className="w-5 h-5" />
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link href="/labs/ai-playbook">
                <Button size="lg" variant="outline" className="gap-2">
                  <Sparkles className="w-5 h-5" />
                  Try AI Playbook Builder
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}