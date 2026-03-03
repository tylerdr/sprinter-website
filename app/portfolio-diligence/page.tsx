import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield, CheckCircle2, ArrowRight, TrendingUp, AlertTriangle,
  FileSearch, BarChart3, Target, Calendar, Building2, Zap,
  ChevronRight, Award
} from "lucide-react";
import { getPageMetadata } from "@/lib/seo";
import { PRICING } from "@/lib/constants";

export const metadata: Metadata = getPageMetadata("portfolioDiligence");

const auditComponents = [
  {
    icon: BarChart3,
    title: "AI Capability Assessment",
    description: "Current state of AI adoption, tools in use, and maturity level across the organization"
  },
  {
    icon: TrendingUp,
    title: "Competitive Positioning Analysis",
    description: "How the company's AI capabilities compare to industry peers and direct competitors"
  },
  {
    icon: AlertTriangle,
    title: "Technology Debt Quantification",
    description: "Technical debt, integration complexity, scalability issues, and remediation costs"
  },
  {
    icon: Target,
    title: "Opportunity Identification",
    description: "Top 3-5 AI opportunities with ROI projections, implementation complexity, and priority ranking"
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "AI vendor dependencies, data governance gaps, security vulnerabilities, and compliance issues"
  },
  {
    icon: FileSearch,
    title: "Executive Summary for Board",
    description: "Board-ready report with key findings, recommendations, and decision points"
  }
];

const deliverables = [
  "AI Maturity Scorecard (0-100 scale across 6 dimensions)",
  "Competitive positioning map vs. industry benchmarks",
  "Technology debt assessment with remediation roadmap",
  "Top 5 AI opportunities ranked by ROI and feasibility",
  "Vendor risk matrix (critical dependencies + switching costs)",
  "Data governance gap analysis",
  "3-page executive summary for board presentation",
  "30-minute debrief call with management team"
];

const useCases = [
  {
    scenario: "Annual Portfolio Review",
    description: "Track AI maturity across all holdings. Identify which companies are falling behind or racing ahead.",
    frequency: "Quarterly or Annually"
  },
  {
    scenario: "Post-Acquisition Health Check",
    description: "90 days after close, assess AI capabilities and integration opportunities with other portfolio companies.",
    frequency: "One-time (then quarterly)"
  },
  {
    scenario: "Value Creation Planning",
    description: "Identify where AI can drive EBITDA improvement. Build AI into your 100-day plan.",
    frequency: "Annually"
  },
  {
    scenario: "Pre-Exit Preparation",
    description: "De-risk AI for potential buyers. Document AI capabilities to improve valuation multiples.",
    frequency: "6-12 months before exit"
  }
];

const pricing = PRICING.addOns.portfolioAudit;

export default function PortfolioDiligencePage() {
  return (
    <div className="spr-theme spr-page min-h-screen py-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center space-y-6">
          <Badge className="mb-4" variant="outline">
            <Building2 className="w-3 h-3 mr-1" />
            Portfolio Company AI Audits
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold">
            Track AI Maturity Across <span className="gradient-text">Your Holdings</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Quarterly AI readiness and risk assessment for existing portfolio companies.
            Identify opportunities, quantify technical debt, and track competitive positioning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact?type=portfolio-audit">
              <Button size="lg" className="gap-2">
                <Calendar className="w-5 h-5" />
                Schedule First Audit
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2">
                <FileSearch className="w-5 h-5" />
                Download Sample Report
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div>
              <p className="text-3xl font-bold text-primary">{pricing.price}</p>
              <p className="text-sm text-muted-foreground">Per company</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">5-7 Days</p>
              <p className="text-sm text-muted-foreground">To complete</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">Quarterly</p>
              <p className="text-sm text-muted-foreground">Recommended cadence</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">6</p>
              <p className="text-sm text-muted-foreground">Maturity dimensions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Quarterly Audits */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Portfolio Companies Need Regular AI Audits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI capabilities and competitive landscape change rapidly. What was leading-edge
              6 months ago may now be table stakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  For Family Offices & PE Firms
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Track AI maturity across entire portfolio in one dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Identify outliers (both leaders and laggards)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Share best practices from high-performers to underperformers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Board-ready reporting with consistent methodology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>De-risk AI before exit (document capabilities for buyers)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  For Portfolio Companies
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Independent assessment of AI capabilities vs. competitors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Catch technical debt before it becomes critical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Quantify ROI from AI investments (prove value to board)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Identify quick wins that improve EBITDA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Access to best practices from sister companies</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Audit */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            6 Dimensions of AI Maturity
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive assessment across strategy, capabilities, governance, and execution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auditComponents.map((component, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
                  <component.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{component.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{component.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-gradient-to-b from-transparent via-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              What You Get
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive audit delivered in 5-7 business days
            </p>
          </div>

          <Card className="border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deliverables.map((deliverable, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{deliverable}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Common Use Cases
          </h2>
          <p className="text-lg text-muted-foreground">
            When portfolio companies benefit from independent AI audits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg">{useCase.scenario}</h3>
                  <Badge variant="outline" className="shrink-0 ml-2">
                    {useCase.frequency}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
          </div>

          <Card className="border-primary shadow-xl shadow-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <p className="text-4xl font-bold mb-2">{pricing.price}</p>
                <p className="text-muted-foreground">Per portfolio company, per audit</p>
                <Badge className="mt-4" variant="outline">
                  {pricing.duration}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="font-semibold mb-3">VOLUME DISCOUNTS:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>3-5 companies: 10% discount</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>6-10 companies: 20% discount</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>10+ companies: Custom pricing</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-3">ADD-ONS:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>Board presentation: +$2K</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>Competitive deep-dive: +$3K</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>Implementation roadmap: +$5K</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Link href="/contact?type=portfolio-audit">
                  <Button size="lg" className="gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule First Audit
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bundle with Advisory */}
      <section className="container mx-auto px-4 max-w-4xl mb-20">
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-primary/30">
          <CardContent className="pt-12 pb-12">
            <div className="text-center mb-8">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                Bundle with Advisory Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quarterly audits are included with our Fractional CAIO and annual AI Advisor packages.
                Get both strategic counsel and ongoing portfolio monitoring.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/fractional-caio">
                <Button size="lg" variant="outline">
                  Explore Fractional CAIO
                </Button>
              </Link>
              <Link href="/ai-advisor-retainer">
                <Button size="lg" variant="outline">
                  Explore AI Advisor
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border-green-500/30">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Tracking AI Maturity Across Your Portfolio
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              First audit includes complimentary 30-minute strategy session to discuss findings
              and recommended next steps.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact?type=portfolio-audit">
                <Button size="lg" className="gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule First Audit
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2">
                  <FileSearch className="w-5 h-5" />
                  Download Sample Report
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
