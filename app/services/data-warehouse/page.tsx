"use client";

import { motion } from "framer-motion";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Database, BarChart3, Zap, CheckCircle2, ArrowRight, Clock,
  Layers, TrendingUp, Shield, AlertCircle, Play, GitBranch,
  Activity, Target, Cpu, Cloud, Lock, RefreshCw
} from "lucide-react";

const metadata: Metadata = {
  title: "Data Warehouse Automation | Sprinter AI",
  description: "Build a modern data platform without the modern headcount. Automated pipelines, real-time analytics, and AI-powered insights that turn data into decisions.",
};

const challenges = [
  {
    title: "Data Silos",
    current: "50+ disconnected systems across portfolio",
    solution: "Unified data fabric with automated ingestion",
    impact: "Single source of truth in 30 days"
  },
  {
    title: "Manual Reporting",
    current: "2 weeks to compile board decks",
    solution: "Real-time dashboards with AI narratives",
    impact: "Board-ready insights in minutes"
  },
  {
    title: "Data Quality",
    current: "40% of decisions based on stale data",
    solution: "Automated validation and enrichment",
    impact: "99.9% data accuracy guaranteed"
  },
  {
    title: "Analytics Bottleneck",
    current: "3-month backlog for new reports",
    solution: "Self-service analytics platform",
    impact: "New insights in hours, not months"
  }
];

const platform = [
  {
    layer: "Ingestion Layer",
    description: "Connect everything, transform automatically",
    capabilities: [
      "500+ pre-built connectors",
      "Real-time CDC streaming",
      "Batch & micro-batch processing",
      "Schema evolution handling",
      "Error recovery & replay"
    ],
    icon: GitBranch
  },
  {
    layer: "Processing Engine",
    description: "Clean, enrich, and model at scale",
    capabilities: [
      "Automated data quality checks",
      "ML-powered deduplication",
      "Entity resolution",
      "Anomaly detection",
      "Predictive enrichment"
    ],
    icon: Cpu
  },
  {
    layer: "Analytics Layer",
    description: "From raw data to boardroom insights",
    capabilities: [
      "Semantic business layer",
      "Natural language queries",
      "Automated insight generation",
      "Predictive analytics",
      "What-if scenarios"
    ],
    icon: BarChart3
  },
  {
    layer: "Governance Hub",
    description: "Enterprise-grade control and compliance",
    capabilities: [
      "Data lineage tracking",
      "Access control & masking",
      "Audit logging",
      "Regulatory compliance",
      "Cost optimization"
    ],
    icon: Shield
  }
];

const results = {
  operational: [
    { metric: "Time to insight", before: "2-3 weeks", after: "Real-time" },
    { metric: "Data accuracy", before: "75%", after: "99.9%" },
    { metric: "Report generation", before: "8 hours", after: "Automated" },
    { metric: "Data freshness", before: "Daily batches", after: "< 5 minutes" }
  ],
  strategic: [
    { benefit: "Portfolio Visibility", description: "Real-time KPIs across all companies" },
    { benefit: "Predictive Intelligence", description: "AI-powered forecasting and alerts" },
    { benefit: "Decision Velocity", description: "From question to answer in minutes" },
    { benefit: "Competitive Edge", description: "Data advantages competitors can't match" }
  ]
};

export default function DataWarehousePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-transparent to-blue-600/10" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4" variant="outline">
                <Database className="w-3 h-3 mr-1" />
                Data Warehouse Automation
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Your Data Is a <span className="gradient-text">Strategic Weapon</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Portfolio companies drowning in spreadsheets while sitting on goldmines of data.
                We build self-running data platforms that transform chaos into clarity, turning
                every byte into competitive advantage—without the army of data engineers.
              </p>

              <div className="grid grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-cyan-500">10x</p>
                  <p className="text-xs text-muted-foreground">Faster Insights</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-blue-500">99.9%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-green-500">Zero</p>
                  <p className="text-xs text-muted-foreground">Manual ETL</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-2xl font-bold text-purple-500">24/7</p>
                  <p className="text-xs text-muted-foreground">Monitoring</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Activity className="w-4 h-4" />
                  See Live Platform
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact?service=data-warehouse">
                    Audit Your Data Estate
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Architecture */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Self-Running Data Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four layers of automation that transform raw data into strategic advantage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {platform.map((layer) => (
              <Card key={layer.layer} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                      <layer.icon className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{layer.layer}</CardTitle>
                      <CardDescription>{layer.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {layer.capabilities.map((capability, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Transformation Metrics</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Operational Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.operational.map((metric) => (
                      <div key={metric.metric} className="grid grid-cols-3 gap-2 items-center">
                        <span className="text-sm font-medium">{metric.metric}</span>
                        <div className="text-center">
                          <Badge variant="outline" className="text-red-500">{metric.before}</Badge>
                        </div>
                        <div className="text-center">
                          <Badge variant="outline" className="text-green-500">{metric.after}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-600/10 to-blue-600/10">
                <CardHeader>
                  <CardTitle>Strategic Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.strategic.map((item) => (
                      <div key={item.benefit}>
                        <h4 className="font-semibold mb-1">{item.benefit}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}