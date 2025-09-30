"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText, TrendingUp, Shield, CheckCircle2, ArrowRight, Clock,
  Zap, Calculator, CreditCard, Package, Send, AlertCircle,
  BarChart3, Target, Users, Brain, Play, DollarSign, RefreshCw
} from "lucide-react";

const stages = [
  {
    name: "RFQ Processing",
    icon: FileText,
    problems: [
      "Manual RFQ data extraction",
      "Slow response times",
      "Inconsistent pricing",
      "Missed deadlines"
    ],
    solutions: [
      "Auto-extract requirements from any format",
      "Instant capability matching",
      "AI-powered pricing recommendations",
      "Automated follow-ups"
    ],
    impact: "90% faster response"
  },
  {
    name: "Quote Generation",
    icon: Calculator,
    problems: [
      "Hours to create complex quotes",
      "Pricing inconsistencies",
      "Version control chaos",
      "Manual approval chains"
    ],
    solutions: [
      "Template-based auto-generation",
      "Dynamic pricing rules",
      "Real-time margin analysis",
      "Smart approval routing"
    ],
    impact: "From 4 hours to 10 minutes"
  },
  {
    name: "Order Processing",
    icon: Package,
    problems: [
      "Manual order entry errors",
      "Slow fulfillment starts",
      "Lost paperwork",
      "Customer change orders"
    ],
    solutions: [
      "Direct quote-to-order conversion",
      "Auto-validation against inventory",
      "Change order tracking",
      "Customer portal integration"
    ],
    impact: "Zero-touch order entry"
  },
  {
    name: "Revenue Recognition",
    icon: DollarSign,
    problems: [
      "Delayed invoicing",
      "Revenue leakage",
      "Complex billing rules",
      "Compliance issues"
    ],
    solutions: [
      "Automated milestone tracking",
      "Smart billing triggers",
      "Revenue forecasting",
      "ASC 606 compliance"
    ],
    impact: "15-day DSO reduction"
  }
];

const capabilities = [
  {
    title: "Intelligent Quote Builder",
    description: "Transform product catalogs and pricing matrices into instant quotes",
    features: [
      "Configure-price-quote (CPQ) logic",
      "Bundle recommendations",
      "Competitor price intelligence",
      "Margin optimization"
    ],
    icon: Brain
  },
  {
    title: "Win Rate Optimizer",
    description: "AI learns from won and lost deals to improve pricing strategy",
    features: [
      "Win probability scoring",
      "Optimal discount recommendations",
      "Competitive positioning",
      "Deal velocity tracking"
    ],
    icon: Target
  },
  {
    title: "Customer Intelligence",
    description: "Enrich quotes with customer history and preferences",
    features: [
      "Purchase pattern analysis",
      "Upsell recommendations",
      "Payment term optimization",
      "Renewal predictions"
    ],
    icon: Users
  },
  {
    title: "Revenue Acceleration",
    description: "Compress cycles from first touch to cash collection",
    features: [
      "Automated reminders",
      "Contract acceleration",
      "Collection optimization",
      "Cash flow forecasting"
    ],
    icon: TrendingUp
  }
];

const metrics = {
  beforeAfter: [
    {
      metric: "Quote Turnaround",
      before: "3-5 days",
      after: "2 hours",
      improvement: "95%"
    },
    {
      metric: "Win Rate",
      before: "22%",
      after: "31%",
      improvement: "41%"
    },
    {
      metric: "Revenue Velocity",
      before: "67 days",
      after: "28 days",
      improvement: "58%"
    },
    {
      metric: "Quote Accuracy",
      before: "87%",
      after: "99.5%",
      improvement: "14%"
    }
  ],
  financial: {
    revenueIncrease: "12-18%",
    marginImprovement: "3-5 points",
    costReduction: "60%",
    cashAcceleration: "21 days"
  }
};

const industryResults = [
  {
    industry: "Manufacturing",
    challenge: "Complex configured products with thousands of SKUs",
    result: "Reduced 6-hour quotes to 15 minutes",
    revenue: "+$8.2M annual revenue"
  },
  {
    industry: "Distribution",
    challenge: "High-volume, low-margin quotes with thin error tolerance",
    result: "Achieved 99.8% pricing accuracy",
    revenue: "2.5% margin improvement"
  },
  {
    industry: "Professional Services",
    challenge: "Custom project scoping and resource planning",
    result: "Won 35% more deals with faster response",
    revenue: "+$4.5M in new contracts"
  },
  {
    industry: "Healthcare",
    challenge: "Regulatory compliance and payer-specific pricing",
    result: "100% compliant automated quotes",
    revenue: "45-day revenue cycle reduction"
  }
];

const implementation = {
  week1_2: {
    title: "Map Your Revenue Process",
    activities: [
      "Document current quote-to-cash flow",
      "Identify bottlenecks and leakage points",
      "Define success metrics",
      "Design optimized workflows"
    ]
  },
  week3_4: {
    title: "Build & Integrate",
    activities: [
      "Connect CRM and ERP systems",
      "Configure pricing rules",
      "Train AI on historical quotes",
      "Set up approval workflows"
    ]
  },
  week5_6: {
    title: "Launch & Scale",
    activities: [
      "Pilot with select sales team",
      "Refine based on feedback",
      "Roll out to full organization",
      "Monitor and optimize"
    ]
  }
};

export default function QuoteToCashPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-orange-600/10" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4" variant="outline">
                <RefreshCw className="w-3 h-3 mr-1" />
                Quote-to-Cash Intelligence
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Speed Kills Deals. <span className="gradient-text">Win Faster.</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Your sales team loses 40% of deals to faster competitors—not better ones.
                AI-powered quote-to-cash automation turns days into minutes, capturing
                revenue that's walking out the door while you're still building spreadsheets.
              </p>

              {/* Quick Impact Metrics */}
              <div className="grid grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-purple-500">80%</p>
                  <p className="text-xs text-muted-foreground">Faster Quotes</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-orange-500">41%</p>
                  <p className="text-xs text-muted-foreground">Higher Win Rate</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-green-500">21 days</p>
                  <p className="text-xs text-muted-foreground">Faster Cash</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-blue-500">18%</p>
                  <p className="text-xs text-muted-foreground">Revenue Lift</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Play className="w-4 h-4" />
                  See 5-Min Demo
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact?service=quote-to-cash">
                    Audit Your Process
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Revenue Cycle Stages */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Every Stage. Accelerated.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From RFQ to cash collection—eliminate friction at every handoff
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {stages.map((stage) => (
              <Card key={stage.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center">
                      <stage.icon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{stage.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{stage.impact}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Current Pain</p>
                      <ul className="space-y-1">
                        {stage.problems.map((problem, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs">{problem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">AI Solution</p>
                      <ul className="space-y-1">
                        {stage.solutions.map((solution, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Intelligence That Compounds</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every quote makes the next one smarter. Every deal teaches the system.
              This is the platform shift that creates lasting competitive advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {capabilities.map((capability) => (
              <div key={capability.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center">
                    <capability.icon className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{capability.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{capability.description}</p>
                  <ul className="space-y-1">
                    {capability.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Zap className="w-3 h-3 text-yellow-500 flex-shrink-0 mt-1" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Metrics */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Revenue Velocity Equation</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Small improvements in cycle time create massive impacts on cash flow and valuation
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Before/After Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Transformation</CardTitle>
                  <CardDescription>Average across 50+ implementations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {metrics.beforeAfter.map((item) => (
                      <div key={item.metric}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{item.metric}</span>
                          <Badge variant="secondary">+{item.improvement}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-red-500/10 rounded p-2">
                            <p className="text-xs text-muted-foreground">Before</p>
                            <p className="font-semibold">{item.before}</p>
                          </div>
                          <div className="bg-green-500/10 rounded p-2">
                            <p className="text-xs text-muted-foreground">After</p>
                            <p className="font-semibold">{item.after}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Financial Impact */}
              <Card className="bg-gradient-to-br from-purple-600/10 to-orange-600/10 border-purple-500/30">
                <CardHeader>
                  <CardTitle>Financial Impact</CardTitle>
                  <CardDescription>For $50M revenue portfolio company</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-card rounded-lg">
                        <p className="text-3xl font-bold text-purple-500">{metrics.financial.revenueIncrease}</p>
                        <p className="text-xs text-muted-foreground">Revenue Growth</p>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg">
                        <p className="text-3xl font-bold text-orange-500">{metrics.financial.marginImprovement}</p>
                        <p className="text-xs text-muted-foreground">Margin Gain</p>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg">
                        <p className="text-3xl font-bold text-green-500">{metrics.financial.costReduction}</p>
                        <p className="text-xs text-muted-foreground">Cost Reduction</p>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg">
                        <p className="text-3xl font-bold text-blue-500">{metrics.financial.cashAcceleration}</p>
                        <p className="text-xs text-muted-foreground">Faster Cash</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-center text-sm text-muted-foreground mb-4">
                        Total Annual Impact
                      </p>
                      <p className="text-center text-4xl font-bold gradient-text">
                        $6-9M
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Results */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proven Across Industries</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From complex manufacturing to high-volume distribution—the results speak
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {industryResults.map((result) => (
              <Card key={result.industry}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{result.industry}</CardTitle>
                    <Badge variant="outline" className="text-green-500">
                      {result.revenue}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium">Challenge:</span> {result.challenge}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Result:</span> {result.result}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">6 Weeks to Revenue Acceleration</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our proven playbook has been refined across hundreds of implementations
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-white">
                    <span className="text-sm font-bold">Week 1-2</span>
                  </div>
                </div>
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>{implementation.week1_2.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {implementation.week1_2.activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-white">
                    <span className="text-sm font-bold">Week 3-4</span>
                  </div>
                </div>
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>{implementation.week3_4.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {implementation.week3_4.activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-white">
                    <span className="text-sm font-bold">Week 5-6</span>
                  </div>
                </div>
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>{implementation.week5_6.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {implementation.week5_6.activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="bg-gradient-to-r from-purple-600/10 to-orange-600/10 border-purple-500/30">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Every Day of Delay Costs You Deals
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                While you're reading this, your competition is winning deals with faster quotes.
                Join the portfolio companies that have already transformed their revenue velocity.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Target className="w-5 h-5" />
                  Get Revenue Velocity Audit
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="w-5 h-5" />
                  Watch 5-Min Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}