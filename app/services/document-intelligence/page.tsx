"use client";

import { motion } from "framer-motion";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText, Zap, Shield, CheckCircle2, ArrowRight, TrendingUp,
  Clock, DollarSign, FileSearch, Database, Brain, Sparkles,
  BarChart3, Lock, Users, Layers, Download, Play, Truck
} from "lucide-react";

const metadata: Metadata = {
  title: "Document Intelligence & PDF Data Extraction | Sprinter AI",
  description: "Transform unstructured documents into structured data. 60% touchless processing rate. Handles invoices, contracts, forms, and complex PDFs with 99% accuracy.",
};

const documentTypes = [
  {
    category: "Financial Documents",
    icon: DollarSign,
    documents: [
      "Invoices & purchase orders",
      "Bank statements & reconciliations",
      "Tax documents & W9s",
      "Financial statements",
      "Expense reports & receipts",
      "Credit memos & debit notes"
    ]
  },
  {
    category: "Legal & Contracts",
    icon: FileText,
    documents: [
      "Master service agreements",
      "Non-disclosure agreements",
      "Lease agreements",
      "Employment contracts",
      "Vendor agreements",
      "Terms & conditions"
    ]
  },
  {
    category: "Operations Documents",
    icon: Layers,
    documents: [
      "Bills of lading",
      "Packing lists & manifests",
      "Quality certificates",
      "Work orders",
      "Inspection reports",
      "Equipment logs"
    ]
  },
  {
    category: "Healthcare Records",
    icon: Shield,
    documents: [
      "Medical records & charts",
      "Insurance claims & EOBs",
      "Prior authorizations",
      "Lab results",
      "Prescriptions",
      "Patient intake forms"
    ]
  }
];

const capabilities = [
  {
    title: "Intelligent Extraction",
    description: "Extract key data points from any document format",
    icon: Brain,
    features: [
      "Table extraction with structure preservation",
      "Handwriting recognition",
      "Multi-language support (50+ languages)",
      "Checkbox & form field detection"
    ]
  },
  {
    title: "Data Validation",
    description: "Ensure accuracy with multi-layer validation",
    icon: Shield,
    features: [
      "Cross-reference validation",
      "Business rule enforcement",
      "Anomaly detection",
      "Human-in-the-loop review"
    ]
  },
  {
    title: "Smart Classification",
    description: "Automatically categorize and route documents",
    icon: Layers,
    features: [
      "Document type detection",
      "Auto-routing workflows",
      "Priority flagging",
      "Duplicate detection"
    ]
  },
  {
    title: "Integration & Export",
    description: "Seamless connection to your systems",
    icon: Database,
    features: [
      "API-first architecture",
      "Direct ERP integration",
      "Custom export formats",
      "Real-time webhooks"
    ]
  }
];

const metrics = [
  { label: "Accuracy Rate", value: "99.2%", icon: CheckCircle2, color: "text-green-500" },
  { label: "Processing Time", value: "<2 min", icon: Clock, color: "text-blue-500" },
  { label: "Touchless Rate", value: "≥60%", icon: Zap, color: "text-yellow-500" },
  { label: "ROI", value: "250%", icon: TrendingUp, color: "text-purple-500" }
];

const processSteps = [
  {
    step: 1,
    title: "Document Ingestion",
    description: "Upload via API, email, or direct integration",
    time: "Instant"
  },
  {
    step: 2,
    title: "AI Processing",
    description: "Classification, extraction, and validation",
    time: "30-60 seconds"
  },
  {
    step: 3,
    title: "Human Review",
    description: "Exception handling for low-confidence items",
    time: "As needed"
  },
  {
    step: 4,
    title: "System Integration",
    description: "Direct posting to ERP/downstream systems",
    time: "Real-time"
  }
];

const useCases = [
  {
    title: "Accounts Payable Automation",
    description: "Process invoices 10x faster with 3-way matching",
    results: "75% reduction in processing time",
    icon: DollarSign
  },
  {
    title: "Contract Data Extraction",
    description: "Extract key terms, dates, and obligations",
    results: "90% faster contract review",
    icon: FileText
  },
  {
    title: "Medical Records Processing",
    description: "HIPAA-compliant extraction and routing",
    results: "60% reduction in manual entry",
    icon: Shield
  },
  {
    title: "Logistics Documentation",
    description: "BOL and shipping document automation",
    results: "80% touchless processing",
    icon: Truck
  }
];

const pricing = [
  {
    name: "Pilot",
    price: "$5,000",
    duration: "One-time",
    description: "Proof of concept for one document type",
    features: [
      "Up to 1,000 documents",
      "Single document type",
      "Basic integration",
      "Performance report"
    ]
  },
  {
    name: "Growth",
    price: "$2,500/mo",
    duration: "Monthly",
    description: "For growing document volumes",
    features: [
      "Up to 10,000 documents/month",
      "3 document types",
      "API access",
      "Email support"
    ]
  },
  {
    name: "Scale",
    price: "$7,500/mo",
    duration: "Monthly",
    description: "For high-volume processing",
    features: [
      "Up to 50,000 documents/month",
      "Unlimited document types",
      "Direct ERP integration",
      "Priority support"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    duration: "Annual",
    description: "Portfolio-wide deployment",
    features: [
      "Unlimited documents",
      "Custom ML models",
      "White-label options",
      "Dedicated success team"
    ]
  }
];

export default function DocumentIntelligencePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4" variant="outline">
                <FileText className="w-3 h-3 mr-1" />
                Document Intelligence
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Your Documents Are <span className="gradient-text">Dormant Assets</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Years of contracts, invoices, and operational data sit untapped in filing cabinets and PDFs.
                Our AI transforms this forgotten goldmine into actionable intelligence—surfacing patterns,
                trends, and opportunities that drive immediate operational improvements.
              </p>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {metrics.map((metric) => (
                  <div key={metric.label} className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
                    <metric.icon className={`w-5 h-5 ${metric.color} mb-2 mx-auto`} />
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Play className="w-4 h-4" />
                  See Live Demo
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact?service=document-intelligence">
                    Start 2-Week Sprint
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Document Types */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Documents We Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From simple invoices to complex multi-page contracts, our AI handles any document format
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentTypes.map((type) => (
              <Card key={type.category} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <type.icon className="w-8 h-8 text-blue-500 mb-2" />
                  <CardTitle className="text-lg">{type.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.documents.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-sm">{doc}</span>
                      </li>
                    ))}
                  </ul>
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
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for scale, security, and accuracy at portfolio company volumes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {capabilities.map((capability) => (
              <div key={capability.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <capability.icon className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{capability.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{capability.description}</p>
                  <ul className="space-y-1">
                    {capability.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-1" />
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

      {/* Process Flow */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From document upload to system integration in under 2 minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 hidden md:block" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {processSteps.map((step) => (
                  <div key={step.step} className="relative">
                    <div className="bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold mb-4">
                        {step.step}
                      </div>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <Badge variant="outline">{step.time}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Where Portfolio Companies Find Alpha</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The AI transformation isn't coming—it's here. Portfolio companies leveraging
              document intelligence are already capturing competitive advantages their peers can't match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <useCase.icon className="w-8 h-8 text-purple-500 mb-2" />
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{useCase.description}</p>
                  <Badge variant="secondary">{useCase.results}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start with a pilot, scale across your portfolio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pricing.map((tier) => (
              <Card key={tier.name} className={tier.name === "Scale" ? "border-blue-500 shadow-xl" : ""}>
                {tier.name === "Scale" && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <div>
                    <p className="text-2xl font-bold">{tier.price}</p>
                    <p className="text-sm text-muted-foreground">{tier.duration}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                  <ul className="space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
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

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/30">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Automate Your Documents?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join PE firms processing millions of documents with 60% touchless rates.
                Start with a 2-week sprint and see results in production.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Zap className="w-5 h-5" />
                  Start 2-Week Sprint
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Download className="w-5 h-5" />
                  Download Solution Brief
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}