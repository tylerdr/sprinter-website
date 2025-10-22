"use client";

import { motion } from "framer-motion";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain, Users, Zap, CheckCircle2, ArrowRight, Clock,
  MessageSquare, Target, Shield, TrendingUp, Sparkles,
  BarChart3, Code, Lightbulb, Play, Bot, Cpu, Layers
} from "lucide-react";

const metadata: Metadata = {
  title: "Custom AI CoPilots & Agents | Sprinter AI",
  description: "Build AI teammates that multiply your team's capabilities. From customer service to technical analysis—deploy intelligent agents that work 24/7 at superhuman scale.",
};

const agentTypes = [
  {
    name: "Customer Success CoPilot",
    icon: Users,
    capabilities: [
      "24/7 customer query resolution",
      "Proactive account health monitoring",
      "Churn prediction & prevention",
      "Upsell opportunity identification",
      "Multi-language support"
    ],
    impact: "70% ticket deflection, 45% upsell increase",
    useCase: "A SaaS company reduced support costs by $2.1M while improving CSAT by 32 points"
  },
  {
    name: "Sales Intelligence Agent",
    icon: Target,
    capabilities: [
      "Lead scoring & prioritization",
      "Automated research & enrichment",
      "Personalized outreach drafting",
      "Competitive intelligence gathering",
      "Deal risk assessment"
    ],
    impact: "3x qualified pipeline, 28% higher close rate",
    useCase: "PE-backed software firm increased ARR by $12M in 6 months"
  },
  {
    name: "Technical Documentation CoPilot",
    icon: Code,
    capabilities: [
      "Auto-generate API documentation",
      "Code review assistance",
      "Bug report triage & routing",
      "Knowledge base Q&A",
      "Release notes generation"
    ],
    impact: "80% faster documentation, 90% accuracy",
    useCase: "Engineering team reclaimed 20 hours/week for feature development"
  },
  {
    name: "Financial Analysis Agent",
    icon: BarChart3,
    capabilities: [
      "Real-time variance analysis",
      "Automated report generation",
      "Anomaly detection & alerting",
      "Forecast modeling",
      "Board deck preparation"
    ],
    impact: "5-day close to same-day, 95% error reduction",
    useCase: "CFO team automated 60% of monthly reporting tasks"
  }
];

const platformFeatures = [
  {
    title: "Knowledge Integration",
    description: "Connect all your data sources for comprehensive intelligence",
    features: [
      "CRM & ERP integration",
      "Document repository access",
      "Real-time data streaming",
      "API connectivity",
      "Custom data sources"
    ],
    icon: Layers
  },
  {
    title: "Human-AI Collaboration",
    description: "Designed for seamless handoffs and oversight",
    features: [
      "Confidence scoring",
      "Escalation workflows",
      "Approval chains",
      "Audit trails",
      "Performance analytics"
    ],
    icon: Users
  },
  {
    title: "Continuous Learning",
    description: "Gets smarter with every interaction",
    features: [
      "Feedback loops",
      "A/B testing framework",
      "Model retraining",
      "Performance optimization",
      "Knowledge updates"
    ],
    icon: Brain
  },
  {
    title: "Enterprise Security",
    description: "Built for the most demanding environments",
    features: [
      "Role-based access",
      "Data isolation",
      "Encryption at rest/transit",
      "Compliance controls",
      "Private deployment options"
    ],
    icon: Shield
  }
];

const buildProcess = [
  {
    phase: "Discovery",
    duration: "Week 1",
    activities: [
      "Workflow mapping",
      "Data audit",
      "Success metrics definition",
      "User journey design"
    ]
  },
  {
    phase: "Development",
    duration: "Week 2-3",
    activities: [
      "Model training",
      "Integration setup",
      "UI/UX design",
      "Testing & validation"
    ]
  },
  {
    phase: "Deployment",
    duration: "Week 4",
    activities: [
      "Pilot launch",
      "User training",
      "Performance tuning",
      "Feedback integration"
    ]
  }
];

const roi = {
  productivity: [
    { task: "Customer response time", before: "4 hours", after: "30 seconds" },
    { task: "Report generation", before: "2 days", after: "5 minutes" },
    { task: "Lead research", before: "45 minutes", after: "Instant" },
    { task: "Document creation", before: "3 hours", after: "10 minutes" }
  ],
  financial: {
    laborSavings: "$3.2M",
    revenueIncrease: "$5.8M",
    efficiencyGain: "4.2x",
    paybackPeriod: "3 months"
  }
};

export default function CustomCoPilotsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4" variant="outline">
                <Bot className="w-3 h-3 mr-1" />
                AI CoPilots & Agents
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Every Employee Gets an <span className="gradient-text">AI Multiplier</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Imagine every team member with a tireless AI assistant that knows your business,
                never forgets, and operates at superhuman speed. This isn't the future—it's what
                portfolio leaders are deploying today to create insurmountable advantages.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-purple-500">10x</p>
                  <p className="text-xs text-muted-foreground">Productivity</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-blue-500">24/7</p>
                  <p className="text-xs text-muted-foreground">Availability</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-green-500">$100K</p>
                  <p className="text-xs text-muted-foreground">Saved/Month</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-orange-500">4 weeks</p>
                  <p className="text-xs text-muted-foreground">To Deploy</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Design Your CoPilot
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/labs/agent-simulator">
                    Try Live Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agent Types */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">CoPilots for Every Function</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pre-trained on industry best practices, customized for your specific workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {agentTypes.map((agent) => (
              <Card key={agent.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <agent.icon className="w-5 h-5 text-purple-500" />
                      </div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ul className="space-y-2">
                      {agent.capabilities.map((capability, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{capability}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 border-t">
                      <Badge variant="secondary" className="mb-2">{agent.impact}</Badge>
                      <p className="text-xs text-muted-foreground italic">
                        {agent.useCase}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Enterprise-Ready from Day One</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built on the same platform powering Fortune 500 deployments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {platformFeatures.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                  <ul className="space-y-1">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Zap className="w-3 h-3 text-yellow-500 flex-shrink-0 mt-1" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Mathematics of AI Leverage</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every CoPilot creates compound returns through time savings, quality improvements, and scale
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Productivity Gains */}
              <Card>
                <CardHeader>
                  <CardTitle>Task Acceleration</CardTitle>
                  <CardDescription>Time to complete common tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roi.productivity.map((item) => (
                      <div key={item.task}>
                        <p className="text-sm font-medium mb-2">{item.task}</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-red-500/10 rounded p-2 text-center">
                            <p className="text-xs text-muted-foreground">Manual</p>
                            <p className="font-semibold">{item.before}</p>
                          </div>
                          <div className="bg-green-500/10 rounded p-2 text-center">
                            <p className="text-xs text-muted-foreground">With CoPilot</p>
                            <p className="font-semibold">{item.after}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Financial Returns */}
              <Card className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border-purple-500/30">
                <CardHeader>
                  <CardTitle>Financial Returns</CardTitle>
                  <CardDescription>For 100-person organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-card rounded-lg">
                        <p className="text-2xl font-bold text-green-500">{roi.financial.laborSavings}</p>
                        <p className="text-xs text-muted-foreground">Annual Labor Savings</p>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg">
                        <p className="text-2xl font-bold text-blue-500">{roi.financial.revenueIncrease}</p>
                        <p className="text-xs text-muted-foreground">Revenue Increase</p>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg">
                        <p className="text-2xl font-bold text-purple-500">{roi.financial.efficiencyGain}</p>
                        <p className="text-xs text-muted-foreground">Efficiency Multiplier</p>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg">
                        <p className="text-2xl font-bold text-orange-500">{roi.financial.paybackPeriod}</p>
                        <p className="text-xs text-muted-foreground">Payback Period</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Build Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">From Concept to Production in 4 Weeks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our rapid deployment methodology gets your first CoPilot live while others are still planning
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {buildProcess.map((phase, index) => (
                <Card key={phase.phase} className="relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <CardHeader>
                    <Badge className="w-fit mb-2">{phase.duration}</Badge>
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-500/30">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                The AI Workforce Revolution Is Here
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Companies with AI CoPilots are operating at a different speed than their competition.
                Every day without them is competitive ground lost. Start with your first CoPilot today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Brain className="w-5 h-5" />
                  Design Your First CoPilot
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Talk to Solutions Architect
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}