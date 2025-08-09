"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Share2, 
  TrendingUp, 
  Clock, 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Target,
  AlertCircle,
  Calendar,
  FileText
} from "lucide-react";
import Link from "next/link";

function SampleReportContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const opportunities = [
    {
      rank: 1,
      name: "Intelligent Document Processing",
      description: "Auto-extract, validate, and route data from unstructured documents",
      mechanism: "OCR → NLP extraction → validation → routing with human-in-loop",
      pattern: ["Read", "Parse", "Validate", "Route", "Notify", "Learn"],
      roi: {
        conservative: "40% cost reduction",
        optimistic: "65% cost reduction",
        timeToValue: "60 days"
      },
      evidence: [
        "Competitors using similar: +23% efficiency gain reported",
        "Your document volume: 1000+/week ideal for automation",
        "Existing PDF handling indicates technical readiness"
      ]
    },
    {
      rank: 2,
      name: "Customer Intelligence Agent",
      description: "Real-time insights from all touchpoints with predictive actions",
      mechanism: "Multi-source aggregation → sentiment → pattern detection → action",
      pattern: ["Monitor", "Aggregate", "Analyze", "Predict", "Act", "Report"],
      roi: {
        conservative: "25% revenue lift",
        optimistic: "45% revenue lift",
        timeToValue: "90 days"
      },
      evidence: [
        "Industry benchmark: 10% churn reduction typical",
        "Your CRM + support data creates strong signal",
        "Slack integration enables real-time response"
      ]
    },
    {
      rank: 3,
      name: "Operational Excellence Autopilot",
      description: "Self-optimizing workflows that adapt to patterns",
      mechanism: "Process mining → bottleneck detection → optimization → learning",
      pattern: ["Observe", "Measure", "Identify", "Optimize", "Execute", "Adapt"],
      roi: {
        conservative: "35% efficiency gain",
        optimistic: "55% efficiency gain",
        timeToValue: "120 days"
      },
      evidence: [
        "Manual processes identified: high automation potential",
        "Existing data infrastructure supports monitoring",
        "Team size indicates strong ROI on time savings"
      ]
    }
  ];

  const actionPlan = {
    week1: {
      title: "Discovery & Design",
      tasks: [
        "Stakeholder alignment workshop",
        "Data audit and access setup",
        "Success metrics definition",
        "Technical architecture review"
      ]
    },
    week2_3: {
      title: "Build & Test",
      tasks: [
        "Core agent development",
        "Integration with existing systems",
        "Edge case handling",
        "Security & compliance review"
      ]
    },
    week4: {
      title: "Deploy & Optimize",
      tasks: [
        "Staged rollout to pilot group",
        "Performance monitoring setup",
        "Team training and documentation",
        "Feedback loops and iteration plan"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-2">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Opportunity Audit
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Your Personalized AI Roadmap
              </h1>
              {email && (
                <p className="text-muted-foreground">
                  Report generated for: {email}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Executive Summary */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                Based on your industry profile and current systems, we&apos;ve identified <strong>3 high-impact AI opportunities</strong> that 
                can deliver measurable ROI within 60-120 days. Your existing infrastructure positions you well for rapid deployment, 
                with conservative estimates showing <strong>25-40% operational improvements</strong> across identified areas.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$2.4M</div>
                  <div className="text-sm text-muted-foreground">Projected Annual Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">60 days</div>
                  <div className="text-sm text-muted-foreground">To First Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3.2x</div>
                  <div className="text-sm text-muted-foreground">ROI in Year 1</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Opportunities */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Top 3 AI Opportunities</h2>
            <div className="grid gap-4">
              {opportunities.map((opp) => (
                <Card key={opp.rank} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge>#{opp.rank} Priority</Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {opp.roi.timeToValue}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{opp.name}</CardTitle>
                        <CardDescription>{opp.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">ROI Range</div>
                        <div className="font-semibold">{opp.roi.conservative}</div>
                        <div className="text-sm text-muted-foreground">to {opp.roi.optimistic}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">How it works:</h4>
                      <p className="text-sm text-muted-foreground">{opp.mechanism}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Agent Pattern:</h4>
                      <div className="flex flex-wrap gap-2">
                        {opp.pattern.map((step, idx) => (
                          <div key={idx} className="flex items-center">
                            <Badge variant="secondary" className="rounded-full">
                              {step}
                            </Badge>
                            {idx < opp.pattern.length - 1 && (
                              <ArrowRight className="w-4 h-4 mx-1 text-muted-foreground" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Why this will work for you:</h4>
                      <ul className="space-y-1">
                        {opp.evidence.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 30-Day Action Plan */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Your 30-Day Action Plan
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2">Week 1</Badge>
                  <CardTitle className="text-lg">{actionPlan.week1.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {actionPlan.week1.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2">Week 2-3</Badge>
                  <CardTitle className="text-lg">{actionPlan.week2_3.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {actionPlan.week2_3.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2">Week 4</Badge>
                  <CardTitle className="text-lg">{actionPlan.week4.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {actionPlan.week4.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Risk & Governance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Risk Management & Governance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Data & Privacy</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• All data remains within your infrastructure</li>
                    <li>• HIPAA/SOC2 compliant architectures available</li>
                    <li>• Audit trails for all AI decisions</li>
                    <li>• PII/PHI handling protocols included</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Mitigation Strategies</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Human-in-the-loop for critical decisions</li>
                    <li>• Gradual rollout with monitoring</li>
                    <li>• Fallback systems for all automations</li>
                    <li>• Regular performance reviews & tuning</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Key Success Factor</p>
                    <p className="text-muted-foreground">
                      Executive sponsorship and clear change management are critical. 
                      We recommend identifying a champion and pilot team before starting implementation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Ready to Start Your AI Transformation?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our team can begin implementing your #1 opportunity within 48 hours. 
                  Get a working prototype in 10 days, production deployment in 30.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/contact?source=audit">
                      Start a 10-Day Sprint
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/services">
                      Explore Service Options
                    </Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 inline mr-1" />
                  This report is valid for 30 days • Reference ID: AUDIT-{Date.now()}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function SampleReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading report...</div>}>
      <SampleReportContent />
    </Suspense>
  );
}