import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield, CheckCircle2, ArrowRight, TrendingUp, DollarSign,
  GitCompare, Zap, Target, Calendar, Building2, AlertCircle,
  ChevronRight, Award, Clock
} from "lucide-react";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getPageMetadata("strategicBuyerDiligence"),
  robots: { index: false, follow: false },
};

const buildVsBuyFramework = [
  {
    option: "Build In-House",
    icon: Building2,
    pros: [
      "Full control over roadmap and IP",
      "Tailored to exact business needs",
      "No vendor lock-in or dependencies",
      "Competitive moat if successful"
    ],
    cons: [
      "12-24 month timeline to production",
      "$500K-$2M upfront investment",
      "Requires hiring specialized AI talent",
      "Ongoing R&D and maintenance costs",
      "Execution risk if team lacks experience"
    ],
    bestFor: "Core differentiator, unique requirements, long-term strategic asset"
  },
  {
    option: "Buy/Acquire",
    icon: DollarSign,
    pros: [
      "Immediate capability acquisition",
      "Proven technology and team",
      "Existing customer validation",
      "Revenue stream (if product company)"
    ],
    cons: [
      "High upfront capital requirement",
      "Integration complexity and risk",
      "Cultural fit challenges",
      "May acquire technical debt",
      "Retention risk for key talent"
    ],
    bestFor: "Time-sensitive market opportunity, proven product-market fit, acqui-hire scenario"
  },
  {
    option: "Partner/License",
    icon: Zap,
    pros: [
      "Fast time-to-market (30-90 days)",
      "Predictable monthly costs",
      "Vendor handles R&D and updates",
      "Lower upfront capital"
    ],
    cons: [
      "Vendor dependency and lock-in",
      "Limited customization options",
      "Ongoing licensing fees",
      "No IP ownership",
      "Vendor viability risk"
    ],
    bestFor: "Non-core capability, commodity feature, fast MVP validation"
  }
];

const assessmentAreas = [
  {
    icon: GitCompare,
    title: "Build vs. Buy Analysis",
    description: "Financial modeling across all three scenarios with 3-year TCO, implementation timelines, and risk factors"
  },
  {
    icon: Target,
    title: "Technical Moat Assessment",
    description: "Evaluate defensibility of AI capability. Can competitors replicate easily? What's the sustainable advantage?"
  },
  {
    icon: TrendingUp,
    title: "Synergy Validation",
    description: "Quantify integration opportunities with existing systems, data, and capabilities. Real synergies vs. deal thesis."
  },
  {
    icon: Shield,
    title: "Integration Risk Analysis",
    description: "Technical debt, architecture compatibility, data migration complexity, and team capability gaps"
  },
  {
    icon: DollarSign,
    title: "TCO & ROI Projections",
    description: "5-year total cost of ownership with conservative, base, and optimistic scenarios. NPV and payback period."
  },
  {
    icon: Clock,
    title: "Timeline & Resource Planning",
    description: "Realistic implementation roadmap with critical path, resource requirements, and key milestones"
  }
];

const deliverables = [
  "Build vs. Buy recommendation matrix with scoring methodology",
  "3-year TCO model (build, buy, partner scenarios)",
  "Technical moat assessment (defensibility 0-100 score)",
  "Synergy quantification (revenue + cost opportunities)",
  "Integration risk heatmap with mitigation strategies",
  "100-day implementation plan (if proceeding)",
  "Vendor landscape analysis (if partnering)",
  "Executive summary for investment committee",
  "Live presentation to stakeholders"
];

const idealClients = [
  {
    profile: "Strategic Buyers",
    description: "Corp dev teams evaluating whether to build AI capabilities in-house, acquire a company, or partner with vendors",
    dealSize: "$10M-$100M+"
  },
  {
    profile: "Growth Equity Firms",
    description: "Assessing AI capabilities of targets and validating synergies with existing portfolio",
    dealSize: "$25M-$250M"
  },
  {
    profile: "Family Offices",
    description: "Evaluating strategic AI investments across holdings or considering direct AI investments",
    dealSize: "Varies"
  },
  {
    profile: "Operating Companies",
    description: "CTO/CFO teams building business case for AI investment and deciding optimal path forward",
    dealSize: "Internal capex"
  }
];

export default function StrategicBuyerDiligencePage() {
  return (
    <div className="spr-theme spr-page min-h-screen py-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center space-y-6">
          <Badge className="mb-4" variant="outline">
            <GitCompare className="w-3 h-3 mr-1" />
            Build vs. Buy AI Analysis
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold">
            Make Confident <span className="gradient-text">AI Investment Decisions</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Technical AI assessment for strategic buyers. Should you build in-house, acquire a company,
            or partner with vendors? We've been on both sides of 100+ AI deals—we know what works.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact?type=strategic-diligence">
              <Button size="lg" className="gap-2">
                <Calendar className="w-5 h-5" />
                Schedule Consultation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2">
                <GitCompare className="w-5 h-5" />
                Download Framework
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div>
              <p className="text-3xl font-bold text-primary">3-5 Days</p>
              <p className="text-sm text-muted-foreground">Rapid assessment</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">100+</p>
              <p className="text-sm text-muted-foreground">AI deals analyzed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">$4M+</p>
              <p className="text-sm text-muted-foreground">Bad deals avoided</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground">Scenarios modeled</p>
            </div>
          </div>
        </div>
      </section>

      {/* Build vs Buy Framework */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              The Build vs. Buy Decision Framework
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each path has distinct trade-offs. We help you choose the right one based on
              your timeline, budget, strategic priorities, and risk tolerance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {buildVsBuyFramework.map((option, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur flex flex-col">
                <CardHeader>
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{option.option}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-green-500 mb-2">PROS:</p>
                    <ul className="space-y-1">
                      {option.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-destructive mb-2">CONS:</p>
                    <ul className="space-y-1">
                      {option.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-primary mb-1">BEST FOR:</p>
                    <p className="text-sm text-muted-foreground">{option.bestFor}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Assess */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            6 Critical Assessment Areas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practitioner-led analysis that goes beyond surface-level due diligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessmentAreas.map((area, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
                  <area.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{area.description}</p>
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
              Comprehensive analysis delivered in 3-5 business days
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

      {/* Ideal Clients */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Who This Is For
          </h2>
          <p className="text-lg text-muted-foreground">
            Strategic buyers, growth equity, and operating companies evaluating AI investments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {idealClients.map((client, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">{client.profile}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{client.description}</p>
                <Badge variant="outline" className="text-xs">
                  {client.dealSize}
                </Badge>
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
              Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Fixed fees based on scope and urgency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rapid */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">Rapid Assessment</CardTitle>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">$25K</p>
                  <p className="text-sm text-muted-foreground">3-day turnaround</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Build vs. buy recommendation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>High-level TCO model</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Key risks identified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Executive summary only</span>
                  </li>
                </ul>
                <Link href="/contact?type=rapid-diligence">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Comprehensive */}
            <Card className="border-primary shadow-xl shadow-primary/20 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                Recommended
              </Badge>
              <CardHeader>
                <CardTitle className="text-lg">Comprehensive</CardTitle>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">$50K</p>
                  <p className="text-sm text-muted-foreground">5-day deep dive</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Full build vs. buy analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Detailed 3-year TCO model</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Technical moat assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Synergy quantification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>100-day implementation plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Stakeholder presentation</span>
                  </li>
                </ul>
                <Link href="/contact?type=comprehensive-diligence">
                  <Button className="w-full">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Custom */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">Custom Scope</CardTitle>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">Custom</p>
                  <p className="text-sm text-muted-foreground">Tailored timeline</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Multi-deal portfolios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Competitive benchmarking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Vendor RFP support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Post-close integration</span>
                  </li>
                </ul>
                <Link href="/contact?type=custom-diligence">
                  <Button className="w-full" variant="outline">
                    Discuss Scope
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-primary/30">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Make Confident AI Investment Decisions
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We've been on both sides of 100+ AI deals. We know what works, what's hype,
              and how to structure deals that create real value.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact?type=strategic-diligence">
                <Button size="lg" className="gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2">
                  <GitCompare className="w-5 h-5" />
                  Download Framework
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              First consultation is complimentary. No vendor pitches, just strategic perspective.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
