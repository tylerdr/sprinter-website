"use client";

import { motion } from "framer-motion";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Truck, Package, FileText, CheckCircle2, ArrowRight, Clock,
  Zap, BarChart3, Target, MapPin, Warehouse, AlertTriangle,
  Shield, DollarSign, TrendingUp, Users, Play, RefreshCw
} from "lucide-react";

const metadata: Metadata = {
  title: "3PL Operations Automation | Sprinter AI",
  description: "Transform logistics operations with AI. From rate quote to final delivery—automate BOL processing, freight audit, and carrier management. Built for the complexity of modern supply chains.",
};

const painPoints = [
  {
    area: "Rate Management",
    icon: DollarSign,
    current: "Manual rate lookups across 50+ carrier contracts",
    solution: "AI-powered rate engine with real-time optimization",
    impact: "35% reduction in freight spend"
  },
  {
    area: "Document Processing",
    icon: FileText,
    current: "12 FTEs processing BOLs, PODs, and invoices",
    solution: "99% automated document extraction and validation",
    impact: "80% headcount reallocation"
  },
  {
    area: "Freight Audit",
    icon: Shield,
    current: "Catching only 15% of billing errors",
    solution: "100% automated audit with ML anomaly detection",
    impact: "$2.1M annual recovery"
  },
  {
    area: "Track & Trace",
    icon: MapPin,
    current: "Manual status updates and customer inquiries",
    solution: "Real-time visibility across all carriers",
    impact: "90% reduction in WISMO calls"
  }
];

const capabilities = [
  {
    title: "Multi-Carrier Orchestration",
    description: "Unified operations across your entire carrier network",
    features: [
      "Rate shopping across all carriers",
      "Automated carrier selection",
      "Performance scorecarding",
      "Capacity management",
      "Contract compliance tracking"
    ]
  },
  {
    title: "Document Intelligence Hub",
    description: "Process any logistics document in any format",
    features: [
      "BOL data extraction (99.5% accuracy)",
      "POD verification & matching",
      "Invoice reconciliation",
      "Customs documentation",
      "Exception handling workflows"
    ]
  },
  {
    title: "Freight Audit & Payment",
    description: "Never overpay for shipping again",
    features: [
      "3-way matching automation",
      "Accessorial charge validation",
      "Duplicate invoice detection",
      "Service failure identification",
      "Automated GL coding"
    ]
  },
  {
    title: "Customer Experience Platform",
    description: "Proactive communication at every step",
    features: [
      "Self-service tracking portals",
      "Automated status notifications",
      "Delivery appointment scheduling",
      "Exception alerts",
      "Performance dashboards"
    ]
  }
];

const workflow = {
  quote: {
    title: "Quote & Book",
    tasks: [
      "Multi-mode rate comparison",
      "Service level optimization",
      "Automated booking confirmation",
      "Document generation"
    ],
    time: "2 minutes",
    savings: "vs. 30 minutes manual"
  },
  execute: {
    title: "Execute & Track",
    tasks: [
      "Carrier dispatch",
      "Real-time milestone updates",
      "Exception management",
      "Customer notifications"
    ],
    time: "Automated",
    savings: "Zero manual touches"
  },
  settle: {
    title: "Audit & Pay",
    tasks: [
      "Invoice capture & extraction",
      "Rate & service validation",
      "Discrepancy resolution",
      "Payment processing"
    ],
    time: "Same day",
    savings: "vs. 7-day cycle"
  },
  analyze: {
    title: "Optimize & Improve",
    tasks: [
      "Performance analytics",
      "Cost optimization",
      "Carrier scorecarding",
      "Network planning"
    ],
    time: "Real-time",
    savings: "Continuous improvement"
  }
};

const results = {
  operational: [
    { metric: "On-time delivery", before: "87%", after: "96%", change: "+9%" },
    { metric: "Cost per shipment", before: "$127", after: "$89", change: "-30%" },
    { metric: "Processing time", before: "4.5 hours", after: "12 minutes", change: "-95%" },
    { metric: "Billing accuracy", before: "78%", after: "99.8%", change: "+28%" }
  ],
  financial: {
    freightSavings: "$3.2M",
    laborReduction: "$1.8M",
    auditRecovery: "$2.1M",
    totalImpact: "$7.1M"
  }
};

const caseStudies = [
  {
    company: "National 3PL Provider",
    volume: "1.2M shipments/year",
    challenge: "Manual processes couldn't scale with growth",
    solution: "End-to-end automation platform",
    results: [
      "Handled 3x volume without adding staff",
      "$4.5M in annual savings",
      "Customer NPS increased 32 points"
    ]
  },
  {
    company: "E-commerce Fulfillment",
    volume: "500K packages/month",
    challenge: "Last-mile delivery costs eating margins",
    solution: "AI-powered carrier optimization",
    results: [
      "22% reduction in shipping costs",
      "Same-day processing for all orders",
      "99.7% delivery success rate"
    ]
  },
  {
    company: "Manufacturing Logistics",
    volume: "50K freight shipments/year",
    challenge: "Complex multi-modal shipping requirements",
    solution: "Intelligent routing and mode selection",
    results: [
      "35% reduction in freight spend",
      "Eliminated $2M in detention charges",
      "15-day reduction in cash cycle"
    ]
  }
];

const implementation = [
  {
    phase: "Week 1-2",
    title: "Current State Assessment",
    description: "Map your logistics ecosystem and identify quick wins"
  },
  {
    phase: "Week 3-4",
    title: "Integration & Configuration",
    description: "Connect carriers, configure rules, train AI models"
  },
  {
    phase: "Week 5-6",
    title: "Pilot & Validation",
    description: "Run parallel testing and validate results"
  },
  {
    phase: "Week 7-8",
    title: "Scale & Optimize",
    description: "Full deployment with continuous improvement"
  }
];

export default function ThreePLOperationsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-green-600/10" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4" variant="outline">
                <Truck className="w-3 h-3 mr-1" />
                3PL Operations Automation
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Logistics Excellence at <span className="gradient-text">Network Speed</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Modern supply chains move at the speed of customer expectations, not manual processes.
                Our AI transforms every shipment into a competitive advantage—from first mile to final
                delivery—while your competition drowns in spreadsheets and phone calls.
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-blue-500">30%</p>
                  <p className="text-xs text-muted-foreground">Cost Reduction</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-green-500">99.8%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-purple-500">95%</p>
                  <p className="text-xs text-muted-foreground">Touchless</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-orange-500">3x</p>
                  <p className="text-xs text-muted-foreground">Volume Scale</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Play className="w-4 h-4" />
                  See Platform Demo
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact?service=3pl-operations">
                    Get Operations Audit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Where 3PLs Lose Margin</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every manual process is margin erosion. Every error is customer trust lost.
              AI transforms these weaknesses into competitive moats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {painPoints.map((point) => (
              <Card key={point.area} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
                      <point.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <CardTitle className="text-lg">{point.area}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                      <p className="text-sm">
                        <span className="font-medium text-red-500">Current State:</span> {point.current}
                      </p>
                    </div>
                    <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                      <p className="text-sm">
                        <span className="font-medium text-green-500">AI Solution:</span> {point.solution}
                      </p>
                    </div>
                    <Badge variant="secondary" className="w-full justify-center">
                      {point.impact}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Operating System for Modern Logistics</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              One platform. Every carrier. Every document. Every shipment.
              This is how market leaders create unlimited operational leverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {capabilities.map((capability, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{capability.title}</CardTitle>
                  <CardDescription>{capability.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {capability.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Automation */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">End-to-End Automation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From quote request to final payment—every step optimized, automated, and intelligent
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(workflow).map(([key, stage], index) => (
                <div key={key} className="relative">
                  {index < Object.keys(workflow).length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-500 z-0" />
                  )}
                  <Card className="relative z-10 h-full">
                    <CardHeader>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-green-500 text-white flex items-center justify-center font-bold mb-3">
                        {index + 1}
                      </div>
                      <CardTitle className="text-base">{stage.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 mb-4">
                        {stage.tasks.map((task, i) => (
                          <li key={i} className="text-xs text-muted-foreground">• {task}</li>
                        ))}
                      </ul>
                      <div className="pt-3 border-t">
                        <p className="text-sm font-semibold">{stage.time}</p>
                        <p className="text-xs text-muted-foreground">{stage.savings}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results & ROI */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Results That Transform Valuations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Based on deployments across 100+ logistics operations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Operational Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Operational Excellence</CardTitle>
                  <CardDescription>Average improvements at 12 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.operational.map((metric) => (
                      <div key={metric.metric}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{metric.metric}</span>
                          <Badge variant={metric.change.startsWith("+") ? "default" : "secondary"}>
                            {metric.change}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 bg-muted rounded p-2">
                            <p className="text-xs text-muted-foreground">Before</p>
                            <p className="font-semibold">{metric.before}</p>
                          </div>
                          <div className="flex-1 bg-primary/10 rounded p-2">
                            <p className="text-xs text-muted-foreground">After</p>
                            <p className="font-semibold">{metric.after}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Financial Impact */}
              <Card className="bg-gradient-to-br from-blue-600/10 to-green-600/10 border-blue-500/30">
                <CardHeader>
                  <CardTitle>Financial Impact</CardTitle>
                  <CardDescription>Annual savings for $100M revenue 3PL</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-card rounded">
                        <span className="text-sm">Freight Cost Savings</span>
                        <span className="font-bold text-green-500">{results.financial.freightSavings}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-card rounded">
                        <span className="text-sm">Labor Reduction</span>
                        <span className="font-bold text-blue-500">{results.financial.laborReduction}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-card rounded">
                        <span className="text-sm">Audit Recovery</span>
                        <span className="font-bold text-purple-500">{results.financial.auditRecovery}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Total Annual Impact</p>
                        <p className="text-4xl font-bold gradient-text">{results.financial.totalImpact}</p>
                        <p className="text-sm text-muted-foreground mt-2">7-9% EBITDA improvement</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Leaders Who've Made the Shift</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The platform shift to AI-powered logistics is creating category winners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {caseStudies.map((study, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <CardTitle className="text-lg">{study.company}</CardTitle>
                      <Badge variant="outline" className="mt-1">{study.volume}</Badge>
                    </div>
                  </div>
                  <CardDescription>{study.challenge}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium mb-3">Solution: {study.solution}</p>
                  <ul className="space-y-2">
                    {study.results.map((result, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{result}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">8 Weeks to Operational Excellence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our proven deployment methodology minimizes risk while maximizing speed to value
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-green-500" />

              {implementation.map((phase, index) => (
                <div key={phase.phase} className="relative flex gap-6 mb-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-500 text-white flex items-center justify-center font-bold z-10">
                    {index + 1}
                  </div>
                  <Card className="flex-1">
                    <CardHeader>
                      <Badge className="w-fit mb-2">{phase.phase}</Badge>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="bg-gradient-to-r from-blue-600/10 to-green-600/10 border-blue-500/30">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                The Future of Logistics Is Already Here
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                While competitors struggle with yesterday's processes, market leaders are building
                tomorrow's operational advantages. Which side of the platform shift will you be on?
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Get Free Operations Assessment
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="w-5 h-5" />
                  See Platform in Action
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}