import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield, CheckCircle2, ArrowRight, FileText, Users,
  Download, Calendar, Award, BookOpen, Briefcase,
  Lock, AlertTriangle, ChevronRight, Target
} from "lucide-react";
import { getPageMetadata } from "@/lib/seo";
import { PRICING } from "@/lib/constants";

export const metadata: Metadata = getPageMetadata("governanceFamilyOffice");

const educationPrograms = [
  {
    ...PRICING.education.boardEducation,
    icon: Shield,
    audience: "Board Members & Family Principals",
    topics: [
      "AI opportunities and risks for family wealth",
      "How to evaluate AI investments and vendors",
      "Governance best practices from leading families",
      "Case studies: AI wins and failures",
      "Q&A tailored to your holdings"
    ],
    format: "2-hour interactive session (virtual or in-person)"
  },
  {
    ...PRICING.education.icTraining,
    icon: Target,
    audience: "Investment Committee Members",
    topics: [
      "AI diligence framework for evaluating deals",
      "Technical risk assessment criteria",
      "Build vs. buy decision framework",
      "AI capability defensibility analysis",
      "Red flags in AI vendor pitches"
    ],
    format: "90-minute workshop with case study exercises"
  },
  {
    ...PRICING.education.executiveBootcamp,
    icon: Users,
    audience: "Portfolio Company Executives",
    topics: [
      "AI strategic planning for operators",
      "Quick wins vs. strategic bets",
      "Change management for AI adoption",
      "Building AI-literate organizations",
      "ROI measurement frameworks"
    ],
    format: "Half-day bootcamp (up to 12 participants)"
  }
];

const governanceServices = [
  {
    ...PRICING.addOns.governanceFramework,
    deliverables: [
      "AI usage policies (approved tools, prohibited uses)",
      "Vendor selection criteria and evaluation rubric",
      "Data privacy and security framework",
      "Risk management protocols",
      "Board reporting templates and KPIs",
      "Incident response procedures",
      "Annual review process"
    ]
  }
];

const downloadableResources = [
  {
    icon: FileText,
    title: "AI Governance Checklist",
    description: "10-point checklist for family office boards. Essential policies and procedures.",
    href: "/downloads/ai-governance-checklist.pdf",
    badge: "PDF"
  },
  {
    icon: Shield,
    title: "Vendor Evaluation Rubric",
    description: "Score AI vendors across 15 criteria. Avoid bad deals before they happen.",
    href: "/downloads/vendor-evaluation-rubric.xlsx",
    badge: "Excel"
  },
  {
    icon: AlertTriangle,
    title: "AI Risk Assessment Template",
    description: "Identify and quantify AI risks across your portfolio holdings.",
    href: "/downloads/ai-risk-assessment.xlsx",
    badge: "Excel"
  },
  {
    icon: BookOpen,
    title: "Board AI Update Template",
    description: "Quarterly board presentation template. Track AI initiatives and ROI.",
    href: "/downloads/board-ai-update-template.pptx",
    badge: "PowerPoint"
  },
  {
    icon: Lock,
    title: "Data Privacy Policy Template",
    description: "GDPR/CCPA-compliant AI data usage policies for family offices.",
    href: "/downloads/data-privacy-policy.docx",
    badge: "Word"
  },
  {
    icon: Briefcase,
    title: "Family Office AI Playbook",
    description: "Complete guide to AI governance for multi-generational wealth (60 pages).",
    href: "/downloads/family-office-ai-playbook.pdf",
    badge: "PDF"
  }
];

const bestPractices = [
  {
    title: "Annual AI Strategy Review",
    description: "Review AI initiatives quarterly with board, annually with full strategy refresh. Track portfolio-wide AI maturity."
  },
  {
    title: "Vendor Diversification",
    description: "Avoid single-vendor dependency. Maintain optionality with 2-3 approved vendors per capability area."
  },
  {
    title: "Independent Technical Counsel",
    description: "Maintain relationship with independent AI advisor (not tied to implementation). Get second opinions on major decisions."
  },
  {
    title: "Portfolio Best Practice Sharing",
    description: "Quarterly roundtables where portfolio CEOs share AI learnings. Avoid repeating mistakes across holdings."
  },
  {
    title: "Data Sovereignty Requirements",
    description: "Establish clear data residency and privacy requirements. Especially critical for international holdings."
  },
  {
    title: "Sunset Clauses in Vendor Contracts",
    description: "Negotiate data extraction and transition rights upfront. Don't get trapped in bad vendor relationships."
  }
];

export default function GovernanceFamilyOfficePage() {
  return (
    <div className="min-h-screen py-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center space-y-6">
          <Badge className="mb-4" variant="outline">
            <Shield className="w-3 h-3 mr-1" />
            AI Governance for Family Offices
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold">
            Protect Legacy. <span className="gradient-text">Enable Innovation.</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Board education, investment committee training, and governance frameworks for
            family offices. Develop responsible AI policies that protect multi-generational
            wealth while capturing competitive opportunity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact?type=governance">
              <Button size="lg" className="gap-2">
                <Calendar className="w-5 h-5" />
                Schedule Governance Workshop
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#resources">
              <Button size="lg" variant="outline" className="gap-2">
                <Download className="w-5 h-5" />
                Download Templates
              </Button>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>8 Family Offices ($12B+ AUM)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Board-Tested Frameworks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>GDPR/CCPA Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Governance Matters */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why AI Governance Matters for Family Offices
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Multi-generational wealth requires different governance than traditional PE firms.
              You're protecting legacy while enabling innovation across diverse holdings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Risks Without Governance
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Portfolio companies make conflicting AI bets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Vendor lock-in traps you in bad relationships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Data privacy violations create legal exposure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Board lacks framework to evaluate AI investments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>No shared learnings across portfolio (repeat mistakes)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Benefits of Strong Governance
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Consistent AI strategy across all holdings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Board confident in AI oversight capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Vendor negotiating leverage through standardization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Shared best practices accelerate portfolio-wide adoption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Risk mitigation protects multi-generational wealth</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Programs */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Board & Executive Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive sessions tailored for family office boards, investment committees, and portfolio executives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationPrograms.map((program, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
                  <program.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{program.name}</CardTitle>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{program.price}</p>
                  <p className="text-sm text-muted-foreground">{program.duration}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold mb-2">FOR: {program.audience}</p>
                <p className="text-xs font-semibold text-primary mb-2">TOPICS:</p>
                <ul className="space-y-1 mb-4">
                  {program.topics.map((topic, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <Badge variant="outline" className="text-xs w-full justify-center">
                  {program.format}
                </Badge>
                <Link href="/contact?type=education" className="block mt-4">
                  <Button className="w-full" size="sm">
                    Schedule Session
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Governance Framework Development */}
      <section className="bg-gradient-to-b from-transparent via-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Custom Governance Framework Development
            </h2>
            <p className="text-lg text-muted-foreground">
              Board-ready AI policies tailored to your family office structure
            </p>
          </div>

          {governanceServices.map((service, index) => (
            <Card key={index} className="border-primary/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">PRICING</p>
                    <p className="text-3xl font-bold">{service.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">TIMELINE</p>
                    <p className="text-xl font-semibold">{service.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">DESCRIPTION</p>
                    <p className="text-sm">{service.description}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="font-semibold mb-4">DELIVERABLES:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.deliverables.map((deliverable, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Link href="/contact?type=governance-framework">
                    <Button size="lg" className="gap-2">
                      <Calendar className="w-5 h-5" />
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Downloadable Resources */}
      <section id="resources" className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Free Governance Resources
          </h2>
          <p className="text-lg text-muted-foreground">
            Download templates, checklists, and frameworks used by leading family offices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloadableResources.map((resource, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{resource.title}</h3>
                      <Badge variant="outline" className="shrink-0 ml-2 text-xs">
                        {resource.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                    <Link href={resource.href} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                      <Download className="w-4 h-4" />
                      Download
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              AI Governance Best Practices
            </h2>
            <p className="text-lg text-muted-foreground">
              Lessons from family offices successfully navigating AI complexity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bestPractices.map((practice, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{practice.title}</h3>
                  <p className="text-sm text-muted-foreground">{practice.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-primary/30">
          <CardContent className="pt-12 pb-12 text-center">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Build Board-Level AI Governance
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start with a complimentary governance assessment. We'll review your current
              policies and recommend practical next steps.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact?type=governance">
                <Button size="lg" className="gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule Assessment
                </Button>
              </Link>
              <Link href="/fractional-caio">
                <Button size="lg" variant="outline" className="gap-2">
                  <Shield className="w-5 h-5" />
                  Explore Fractional CAIO
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Governance frameworks included with Fractional CAIO and annual AI Advisor packages
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
