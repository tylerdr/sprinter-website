import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { 
  Building2, Users, Zap, BarChart3, Shield, Rocket, 
  CheckCircle2, ArrowRight, Sparkles, TrendingUp, 
  DollarSign, Clock, Target, Award, HeadphonesIcon,
  BookOpen, Lightbulb, GraduationCap, LineChart
} from 'lucide-react'

export const metadata: Metadata = {
  title: "PE Partnership Program | Sprinter AI",
  description: "Virtual AI Operating Partner for your entire portfolio. Get dedicated AI expertise, implementation support, and portfolio-wide transformation.",
}

const tiers = [
  {
    name: "Foundation",
    price: "$25K",
    period: "/month",
    description: "AI enablement for emerging funds",
    features: [
      "Quarterly portfolio AI assessments",
      "Monthly AI strategy sessions",
      "Access to AI playbook library",
      "Email support (48hr response)",
      "1 portfolio company pilot/quarter"
    ],
    recommended: false,
    cta: "Start Foundation"
  },
  {
    name: "Growth",
    price: "$50K",
    period: "/month",
    description: "Comprehensive AI operations for scaling funds",
    features: [
      "Everything in Foundation",
      "Dedicated AI strategist",
      "Weekly office hours",
      "Unlimited portfolio assessments",
      "3 AI implementations/quarter",
      "Custom playbook development",
      "Slack integration (24hr response)"
    ],
    recommended: true,
    cta: "Start Growth"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "White-glove AI partnership for large funds",
    features: [
      "Everything in Growth",
      "Dedicated AI team (3+ experts)",
      "Daily standup availability",
      "Unlimited AI implementations",
      "Board presentation support",
      "LP reporting automation",
      "Custom AI tool development",
      "On-site workshops & training"
    ],
    recommended: false,
    cta: "Contact Sales"
  }
]

const benefits = [
  {
    icon: TrendingUp,
    title: "10-20% Portfolio EBITDA Growth",
    description: "Average improvement across portfolio companies within 12 months"
  },
  {
    icon: Clock,
    title: "90% Faster Implementation",
    description: "Deploy AI 10x faster than building internal capabilities"
  },
  {
    icon: DollarSign,
    title: "20x ROI Guaranteed",
    description: "We guarantee measurable returns or your money back"
  },
  {
    icon: Shield,
    title: "Zero Risk Trial",
    description: "30-day pilot with any portfolio company before committing"
  }
]

const services = {
  strategy: [
    "Portfolio-wide AI maturity assessment",
    "Opportunity identification & prioritization",
    "Build vs buy vs partner analysis",
    "Competitive AI benchmarking",
    "Board-ready AI strategy development"
  ],
  implementation: [
    "Rapid prototyping & POCs",
    "Vendor selection & negotiation",
    "Integration & deployment support",
    "Change management & training",
    "Performance monitoring & optimization"
  ],
  operations: [
    "AI Center of Excellence setup",
    "Playbook & best practice development",
    "Cross-portfolio knowledge sharing",
    "Quarterly business reviews",
    "Continuous improvement programs"
  ]
}

const testimonials = [
  {
    quote: "Sprinter transformed our entire portfolio's approach to AI. We're seeing 15-30% efficiency gains across the board.",
    author: "Managing Partner",
    company: "$5B PE Fund",
    metric: "23% EBITDA improvement"
  },
  {
    quote: "Having Sprinter as our AI operating partner is like adding a world-class tech team to every portfolio company.",
    author: "Operating Partner",
    company: "$2B Growth Fund",
    metric: "18 successful AI deployments"
  },
  {
    quote: "The ROI was evident within 60 days. They delivered more value in one quarter than consultants did in two years.",
    author: "Partner",
    company: "$8B Buyout Fund",
    metric: "$45M in value created"
  }
]

export default function PartnershipPage() {
  return (
    <div className="spr-theme spr-page min-h-screen py-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center space-y-6">
          <Badge className="mb-4" variant="outline">
            <Building2 className="w-3 h-3 mr-1" />
            PE Partnership Program
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold">
            Your Virtual <span className="gradient-text">AI Operating Partner</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your entire portfolio with dedicated AI expertise. 
            We become an extension of your team, driving systematic value creation across every company.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                <Rocket className="w-5 h-5" />
                Schedule Partnership Call
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="gap-2">
                <DollarSign className="w-5 h-5" />
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <Card key={i} className="border-neutral-800 bg-neutral-900/50">
              <CardContent className="pt-6">
                <benefit.icon className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How We Partner With PE Firms</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We integrate seamlessly with your investment team and portfolio companies
          </p>
        </div>

        <Tabs defaultValue="strategy" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="strategy">AI Strategy</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="strategy" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                  Strategic AI Planning
                </CardTitle>
                <CardDescription>
                  Develop portfolio-wide AI strategies aligned with value creation plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {services.strategy.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="implementation" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  Rapid AI Deployment
                </CardTitle>
                <CardDescription>
                  Execute high-impact AI initiatives across your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {services.implementation.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="operations" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  AI Operations Excellence
                </CardTitle>
                <CardDescription>
                  Build lasting AI capabilities and governance across portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {services.operations.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Partnership Tiers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the level of AI support that matches your fund's ambitions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <Card 
              key={i} 
              className={cn(
                "relative",
                tier.recommended && "border-blue-500 shadow-xl shadow-blue-500/20"
              )}
            >
              {tier.recommended && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
                <CardDescription className="mt-2">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block">
                  <Button 
                    className="w-full" 
                    variant={tier.recommended ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Partner Success Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leading PE firms trust us to drive AI transformation across their portfolios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="bg-neutral-900/50 border-neutral-800">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <Badge variant="outline" className="mb-4">
                    <Award className="w-3 h-3 mr-1" />
                    {testimonial.metric}
                  </Badge>
                </div>
                <blockquote className="text-lg mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-neutral-800 pt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/30">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Portfolio?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join leading PE firms using AI to drive unprecedented value creation. 
              Start with a risk-free pilot in any portfolio company.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  <HeadphonesIcon className="w-5 h-5" />
                  Schedule Partnership Call
                </Button>
              </Link>
              <Link href="/labs/ai-playbook">
                <Button size="lg" variant="outline" className="gap-2">
                  <BookOpen className="w-5 h-5" />
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