"use client";

import { motion } from "framer-motion";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign, TrendingUp, Shield, CheckCircle2, ArrowRight, Clock,
  FileText, Calculator, CreditCard, PiggyBank, Receipt, AlertCircle,
  BarChart3, Zap, Target, Users, Brain, Play
} from "lucide-react";

const metadata: Metadata = {
  title: "Financial Process Automation | Sprinter AI",
  description: "Transform AP, AR, expense management, and reconciliation. Cut processing costs by 70% while improving accuracy to 99%. The foundation of modern financial operations.",
};

const processes = [
  {
    name: "Accounts Payable",
    icon: Receipt,
    description: "End-to-end invoice processing",
    features: [
      "3-way matching automation",
      "Duplicate detection",
      "Approval routing",
      "Early payment optimization"
    ],
    metrics: {
      reduction: "75% cost reduction",
      accuracy: "99.5% accuracy",
      time: "2-day to 2-hour"
    }
  },
  {
    name: "Accounts Receivable",
    icon: CreditCard,
    description: "Accelerate cash collection",
    features: [
      "Smart dunning sequences",
      "Payment prediction",
      "Dispute resolution",
      "Cash application"
    ],
    metrics: {
      reduction: "DSO -15 days",
      accuracy: "95% match rate",
      time: "4x faster"
    }
  },
  {
    name: "Expense Management",
    icon: Calculator,
    description: "Streamline expense processing",
    features: [
      "Receipt extraction",
      "Policy enforcement",
      "Mileage tracking",
      "Corporate card reconciliation"
    ],
    metrics: {
      reduction: "80% faster processing",
      accuracy: "100% policy compliance",
      time: "Same-day approval"
    }
  },
  {
    name: "Bank Reconciliation",
    icon: PiggyBank,
    description: "Automated matching & exceptions",
    features: [
      "Multi-bank aggregation",
      "Auto-categorization",
      "Exception handling",
      "Variance analysis"
    ],
    metrics: {
      reduction: "90% manual reduction",
      accuracy: "99.9% accuracy",
      time: "Daily close"
    }
  }
];

const valueDrivers = [
  {
    title: "Working Capital Optimization",
    description: "Free up millions in trapped cash through faster processing and early payment discounts",
    impact: "$2.5M average annual savings",
    icon: TrendingUp
  },
  {
    title: "Scale Without Headcount",
    description: "Handle 10x transaction volume without adding finance team members",
    impact: "Zero incremental FTEs",
    icon: Users
  },
  {
    title: "Audit-Ready Compliance",
    description: "Every transaction tracked, every decision logged, every approval documented",
    impact: "100% audit trail",
    icon: Shield
  },
  {
    title: "Strategic Finance Focus",
    description: "Redirect 60% of team time from data entry to analysis and strategy",
    impact: "3x productivity gain",
    icon: Brain
  }
];

const roi = {
  sixMonths: [
    { metric: "Processing Cost", before: "$125 per invoice", after: "$31 per invoice" },
    { metric: "Processing Time", before: "4.5 days average", after: "6 hours average" },
    { metric: "Error Rate", before: "8% of invoices", after: "0.5% of invoices" },
    { metric: "Early Payment Capture", before: "12% captured", after: "89% captured" }
  ],
  annual: {
    costSavings: "$1.8M",
    timeRecovered: "8,400 hours",
    discountsCaptured: "$650K",
    totalImpact: "$2.45M"
  }
};

const implementation = [
  {
    phase: "Week 1-2",
    title: "Discovery & Design",
    activities: [
      "Current state mapping",
      "System integration planning",
      "Workflow design",
      "Success metrics definition"
    ]
  },
  {
    phase: "Week 3-4",
    title: "Build & Configure",
    activities: [
      "AI model training",
      "Integration setup",
      "Approval routing",
      "Testing & validation"
    ]
  },
  {
    phase: "Week 5-6",
    title: "Deploy & Optimize",
    activities: [
      "Pilot launch",
      "Team training",
      "Performance tuning",
      "Full rollout"
    ]
  }
];

const customers = [
  {
    quote: "We went from a 5-day close to same-day. The CFO called it transformational.",
    author: "VP Finance",
    company: "PE-backed SaaS",
    metric: "5-day → Same-day close"
  },
  {
    quote: "Captured $2M in early payment discounts we were leaving on the table.",
    author: "Controller",
    company: "$500M Manufacturing",
    metric: "$2M recovered annually"
  },
  {
    quote: "Our finance team now focuses on strategy, not spreadsheets.",
    author: "CFO",
    company: "Healthcare Roll-up",
    metric: "60% time recovered"
  }
];

export default function FinancialAutomationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-blue-600/10" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4" variant="outline">
                <DollarSign className="w-3 h-3 mr-1" />
                Financial Automation
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Finance Teams Weren't Built for <span className="gradient-text">Manual Data Entry</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Your best finance minds are copying invoice numbers into spreadsheets while
                strategic decisions wait. AI-powered automation eliminates 75% of manual work,
                letting your team focus on what actually drives enterprise value.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
                  <p className="text-3xl font-bold text-green-500">70%</p>
                  <p className="text-xs text-muted-foreground">Cost Reduction</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
                  <p className="text-3xl font-bold text-blue-500">2 hrs</p>
                  <p className="text-xs text-muted-foreground">Invoice to Payment</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
                  <p className="text-3xl font-bold text-purple-500">$2.5M</p>
                  <p className="text-xs text-muted-foreground">Avg Annual Savings</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Play className="w-4 h-4" />
                  See ROI Calculator
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact?service=financial-automation">
                    Start 30-Day Pilot
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Areas */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Financial Operations Coverage</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From invoice to insight—automate every repetitive financial process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {processes.map((process) => (
              <Card key={process.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <process.icon className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{process.name}</CardTitle>
                        <CardDescription>{process.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ul className="space-y-2">
                      {process.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 border-t">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Savings</p>
                          <p className="text-sm font-semibold">{process.metrics.reduction}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Accuracy</p>
                          <p className="text-sm font-semibold">{process.metrics.accuracy}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Speed</p>
                          <p className="text-sm font-semibold">{process.metrics.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Drivers */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why This Creates Portfolio Alpha</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Financial automation isn't just about efficiency—it's about unlocking
              strategic capabilities that compound across your hold period
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {valueDrivers.map((driver) => (
              <div key={driver.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <driver.icon className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{driver.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{driver.description}</p>
                  <Badge variant="secondary">{driver.impact}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Real Results from Real Deployments</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Based on actual implementations across 50+ portfolio companies
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Before/After Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>6-Month Performance Gains</CardTitle>
                  <CardDescription>Average improvements across implementations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roi.sixMonths.map((metric, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{metric.metric}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-16">Before:</span>
                            <div className="flex-1 bg-red-500/20 rounded-full h-2">
                              <div className="bg-red-500 rounded-full h-2 w-full" />
                            </div>
                            <span className="text-xs font-medium w-24 text-right">{metric.before}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-16">After:</span>
                            <div className="flex-1 bg-green-500/20 rounded-full h-2">
                              <div className="bg-green-500 rounded-full h-2 w-1/4" />
                            </div>
                            <span className="text-xs font-medium w-24 text-right">{metric.after}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Annual Impact */}
              <Card className="bg-gradient-to-br from-green-600/10 to-blue-600/10 border-green-500/30">
                <CardHeader>
                  <CardTitle>Annual Financial Impact</CardTitle>
                  <CardDescription>Typical mid-market portfolio company</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Direct Cost Savings</span>
                        <span className="font-semibold">{roi.annual.costSavings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Time Recovered</span>
                        <span className="font-semibold">{roi.annual.timeRecovered}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Discounts Captured</span>
                        <span className="font-semibold">{roi.annual.discountsCaptured}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-medium">Total Annual Impact</span>
                        <span className="text-2xl font-bold text-green-500">{roi.annual.totalImpact}</span>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button className="w-full">
                        Calculate Your ROI
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">6 Weeks to Transformation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our battle-tested playbook gets you from kickoff to production in weeks, not quarters
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {implementation.map((phase, index) => (
                <div key={phase.phase} className="relative">
                  {index < implementation.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 z-0" />
                  )}
                  <Card className="relative z-10">
                    <CardHeader>
                      <Badge className="w-fit mb-2">{phase.phase}</Badge>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-1" />
                            <span className="text-sm">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Portfolio Companies Speak</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {customers.map((customer, i) => (
              <Card key={i} className="bg-gradient-to-br from-neutral-900 to-neutral-800">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Badge variant="secondary">{customer.metric}</Badge>
                  </div>
                  <p className="text-sm italic mb-4">"{customer.quote}"</p>
                  <div>
                    <p className="font-semibold text-sm">{customer.author}</p>
                    <p className="text-xs text-muted-foreground">{customer.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border-green-500/30">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Your Competition Is Already Moving
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Leading PE firms are deploying financial automation across their portfolios right now.
                Every day you wait is margin left on the table. Start with a risk-free pilot.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Calculator className="w-5 h-5" />
                  Calculate Your Savings
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Target className="w-5 h-5" />
                  Book Strategy Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}