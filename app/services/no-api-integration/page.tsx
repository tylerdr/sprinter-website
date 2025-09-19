"use client";

import { motion } from "framer-motion";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Layers, Lock, Zap, CheckCircle2, ArrowRight, Clock,
  Database, Cloud, Server, Shield, AlertTriangle, Play,
  Cable, Cpu, Terminal, FileText, TrendingUp, Users
} from "lucide-react";

const metadata: Metadata = {
  title: "No-API Integration Layer | Sprinter AI",
  description: "Enable AI on legacy systems without APIs. Our safe middle layer works with desktop ERPs, upload-only systems, and locked databases. Transform digital laggards into AI leaders.",
};

const challenges = [
  {
    system: "Desktop QuickBooks",
    problem: "No API, local installation only",
    solution: "Secure desktop automation layer",
    outcome: "Full AI capabilities without migration"
  },
  {
    system: "Upload-only Sage",
    problem: "Can only import CSV files",
    solution: "AI generates perfect CSV specs",
    outcome: "Automated data flow both ways"
  },
  {
    system: "Legacy Oracle",
    problem: "10-year-old version, no upgrades",
    solution: "Database-level integration",
    outcome: "Modern AI on ancient infrastructure"
  },
  {
    system: "Custom Access Database",
    problem: "Business-critical but unmaintained",
    solution: "Read-only mirror with AI layer",
    outcome: "Zero risk, full intelligence"
  }
];

const capabilities = [
  {
    title: "Desktop Automation",
    description: "Control any Windows application programmatically",
    features: [
      "Screen reading & OCR",
      "Keyboard/mouse automation",
      "Error detection & recovery",
      "Background operation",
      "Multi-app orchestration"
    ],
    icon: Terminal
  },
  {
    title: "File System Bridge",
    description: "Transform file-based workflows into APIs",
    features: [
      "Watch folder monitoring",
      "Format conversion",
      "Validation & enrichment",
      "Two-way sync",
      "Version control"
    ],
    icon: FileText
  },
  {
    title: "Database Gateway",
    description: "Safe, read-only access to legacy databases",
    features: [
      "ODBC/JDBC connectivity",
      "Change data capture",
      "Query optimization",
      "Caching layer",
      "Real-time streaming"
    ],
    icon: Database
  },
  {
    title: "Protocol Translation",
    description: "Connect modern AI to ancient protocols",
    features: [
      "EDI to API conversion",
      "FTP/SFTP automation",
      "Email-based workflows",
      "Printer output capture",
      "Serial port communication"
    ],
    icon: Cable
  }
];

const architectureOptions = [
  {
    name: "The Safe Sidecar",
    description: "Read-only integration that never touches production",
    diagram: "Legacy System → Mirror → AI Layer → Modern Interface",
    bestFor: "Risk-averse environments",
    security: "Zero production impact"
  },
  {
    name: "The Smart Proxy",
    description: "Intercepts and enhances existing data flows",
    diagram: "User → AI Proxy → Legacy System → Enhanced Response",
    bestFor: "Real-time enhancement needs",
    security: "Full audit trail"
  },
  {
    name: "The Batch Bridge",
    description: "Scheduled sync between old and new worlds",
    diagram: "Legacy → Scheduled Extract → AI Processing → Import",
    bestFor: "High-volume batch processing",
    security: "Time-isolated operations"
  }
];

const results = {
  metrics: [
    { label: "Implementation Time", value: "4-6 weeks", icon: Clock },
    { label: "System Downtime", value: "Zero", icon: Shield },
    { label: "Data Accuracy", value: "99.9%", icon: CheckCircle2 },
    { label: "Cost vs. Migration", value: "90% less", icon: TrendingUp }
  ],
  caseStudies: [
    {
      company: "Manufacturing Co",
      system: "AS/400 from 1995",
      result: "Enabled modern AI without $5M migration",
      savings: "$4.2M saved"
    },
    {
      company: "Distribution Firm",
      system: "Desktop QuickBooks",
      result: "Full automation without cloud migration",
      savings: "18 months faster"
    },
    {
      company: "Healthcare Provider",
      system: "Custom FoxPro database",
      result: "AI-powered operations on 20-year-old system",
      savings: "$800K/year"
    }
  ]
};

export default function NoAPIIntegrationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-red-600/10" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4" variant="outline">
                <Layers className="w-3 h-3 mr-1" />
                No-API Integration
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Legacy Systems Aren't <span className="gradient-text">Dead Weight Anymore</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                That 20-year-old ERP your portfolio company can't replace? We make it AI-powered
                in weeks. While competitors spend millions on migrations, you're already capturing value.
                No API? No problem. We've automated systems that predate the internet.
              </p>

              {/* Key Points */}
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
                  <Lock className="w-5 h-5 text-orange-500 mb-2 mx-auto" />
                  <p className="text-sm font-semibold">Zero Risk</p>
                  <p className="text-xs text-muted-foreground">Read-only safe</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
                  <Zap className="w-5 h-5 text-red-500 mb-2 mx-auto" />
                  <p className="text-sm font-semibold">4-6 Weeks</p>
                  <p className="text-xs text-muted-foreground">To production</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
                  <Shield className="w-5 h-5 text-green-500 mb-2 mx-auto" />
                  <p className="text-sm font-semibold">No Downtime</p>
                  <p className="text-xs text-muted-foreground">Ever</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Play className="w-4 h-4" />
                  See How It Works
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact?service=no-api">
                    Assess Your Systems
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">We've Seen It All</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From mainframes to desktop apps—if it stores data, we can AI-enable it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {challenges.map((challenge) => (
              <Card key={challenge.system} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {challenge.system}
                    <Badge variant="outline">{challenge.outcome}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Problem</p>
                        <p className="text-sm">{challenge.problem}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Solution</p>
                        <p className="text-sm">{challenge.solution}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Integration Toolkit</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Battle-tested techniques for connecting the unconnectable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {capabilities.map((capability) => (
              <div key={capability.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                    <capability.icon className="w-6 h-6 text-orange-500" />
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

      {/* Architecture Options */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Zero-Risk Architecture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the integration pattern that matches your risk tolerance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {architectureOptions.map((option) => (
              <Card key={option.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{option.name}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs font-mono">{option.diagram}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Best For</p>
                      <p className="text-sm">{option.bestFor}</p>
                    </div>
                    <div>
                      <Badge variant="outline" className="w-full justify-center">
                        <Shield className="w-3 h-3 mr-1" />
                        {option.security}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Proven in the Trenches</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We've integrated systems that vendors said were impossible
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Key Metrics */}
              <div>
                <h3 className="font-semibold mb-6">Integration Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {results.metrics.map((metric) => (
                    <Card key={metric.label}>
                      <CardContent className="pt-6">
                        <metric.icon className="w-8 h-8 text-orange-500 mb-3" />
                        <p className="text-2xl font-bold mb-1">{metric.value}</p>
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Case Studies */}
              <div>
                <h3 className="font-semibold mb-6">Success Stories</h3>
                <div className="space-y-4">
                  {results.caseStudies.map((study) => (
                    <Card key={study.company}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{study.company}</h4>
                          <Badge variant="secondary">{study.savings}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">System: {study.system}</p>
                        <p className="text-sm">{study.result}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="bg-gradient-to-r from-orange-600/10 to-red-600/10 border-orange-500/30">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Stop Waiting for the "Perfect" System
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your competitors are spending millions on migrations while you could be
                generating value today. Legacy systems are only anchors if you let them be.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Database className="w-5 h-5" />
                  Get System Assessment
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="w-5 h-5" />
                  See Integration Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}