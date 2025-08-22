"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChartBarIcon,
  DocumentMagnifyingGlassIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  DocumentTextIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export function SampleReportPreview() {
  const [isOpen, setIsOpen] = useState(false);

  const reportHighlights = [
    {
      metric: "AI Readiness Score",
      value: "72/100",
      status: "Above Average",
      color: "text-green-400",
    },
    {
      metric: "Quick Win Potential",
      value: "$2.3M",
      status: "Annual Savings",
      color: "text-blue-400",
    },
    {
      metric: "Time to Value",
      value: "< 90 days",
      status: "First ROI",
      color: "text-purple-400",
    },
  ];

  const topOpportunities = [
    {
      title: "Deal Sourcing Automation",
      impact: "$800K annual savings",
      timeframe: "30 days",
      description: "AI-powered market scanning can identify 3x more qualified targets",
    },
    {
      title: "Due Diligence Acceleration",
      impact: "80% time reduction",
      timeframe: "45 days",
      description: "Automated document analysis and risk assessment",
    },
    {
      title: "Portfolio Reporting",
      impact: "5 days → 2 hours",
      timeframe: "60 days",
      description: "Real-time portfolio performance dashboards with predictive insights",
    },
  ];

  return (
    <>
      {/* Preview Button */}
      <div className="mt-8 text-center">
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="group border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10"
        >
          <EyeIcon className="mr-2 h-4 w-4" />
          See Sample Report
          <SparklesIcon className="ml-2 h-4 w-4 text-blue-400" />
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          Example of what you'll receive in 24 hours
        </p>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[5%] bottom-[5%] z-50 mx-auto max-w-4xl overflow-hidden rounded-lg border border-border bg-background shadow-2xl md:inset-x-auto md:inset-y-[10%]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <DocumentTextIcon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Sample AI Readiness Report</h3>
                    <p className="text-sm text-muted-foreground">
                      Typical report for a mid-market PE firm ($1-5B AUM)
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-destructive/10"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-6" style={{ maxHeight: "calc(90vh - 120px)" }}>
                {/* Executive Summary */}
                <Card className="mb-6 border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <h4 className="mb-4 text-lg font-semibold">Executive Summary</h4>
                    <p className="text-muted-foreground">
                      Your firm shows strong potential for AI adoption with immediate opportunities
                      to save <span className="font-semibold text-primary">$2.3M annually</span> and
                      reduce deal cycle times by <span className="font-semibold text-primary">65%</span>.
                      We've identified 3 quick-win implementations that can deliver ROI within 90 days.
                    </p>
                  </CardContent>
                </Card>

                {/* Key Metrics */}
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                  {reportHighlights.map((metric) => (
                    <Card key={metric.metric} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{metric.metric}</p>
                            <p className={`text-2xl font-bold ${metric.color}`}>
                              {metric.value}
                            </p>
                            <p className="text-xs text-muted-foreground">{metric.status}</p>
                          </div>
                          <ChartBarIcon className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Top Opportunities */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <LightBulbIcon className="h-5 w-5 text-yellow-500" />
                      Top 3 AI Opportunities
                    </h4>
                    <div className="space-y-4">
                      {topOpportunities.map((opp, idx) => (
                        <div key={idx} className="rounded-lg border border-border/50 p-4">
                          <div className="mb-2 flex items-start justify-between">
                            <h5 className="font-semibold">{opp.title}</h5>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {opp.impact}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {opp.timeframe}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{opp.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Competitive Analysis */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <ArrowTrendingUpIcon className="h-5 w-5 text-blue-500" />
                      Competitive Positioning
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Your Firm</span>
                        <div className="flex-1 mx-4 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full w-[72%] bg-primary rounded-full" />
                        </div>
                        <span className="text-sm font-semibold">72/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Industry Average</span>
                        <div className="flex-1 mx-4 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full w-[45%] bg-muted-foreground/50 rounded-full" />
                        </div>
                        <span className="text-sm text-muted-foreground">45/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Top Quartile</span>
                        <div className="flex-1 mx-4 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full w-[85%] bg-green-500/50 rounded-full" />
                        </div>
                        <span className="text-sm text-muted-foreground">85/100</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardContent className="p-6">
                    <h4 className="mb-4 text-lg font-semibold">Recommended Next Steps</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Week 1: AI Discovery Sprint</p>
                          <p className="text-sm text-muted-foreground">
                            Validate deal sourcing automation with your team
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Week 2-3: Prototype Development</p>
                          <p className="text-sm text-muted-foreground">
                            Build working prototype integrated with your workflow
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Week 4: Rollout & Training</p>
                          <p className="text-sm text-muted-foreground">
                            Deploy to team with full training and support
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sample Disclaimer */}
                <p className="mt-6 text-center text-xs text-muted-foreground">
                  This is a sample report. Your actual report will be customized based on your specific responses.
                </p>
              </div>

              {/* Footer */}
              <div className="border-t border-border bg-muted/50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Ready to get your custom report?
                  </p>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Start Free Assessment
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}