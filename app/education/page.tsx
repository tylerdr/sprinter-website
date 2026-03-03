import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap, Users, Presentation, BookOpen, Award, Clock,
  Target, Sparkles, ArrowRight, CheckCircle2, Calendar, Trophy,
  Zap, Building2, HeadphonesIcon, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Education & Training for Private Equity | Sprinter AI",
  description: "Upskill your portfolio companies with hands-on AI training. From executive bootcamps to technical enablement, build AI capabilities across your entire fund.",
};

const programs = [
  {
    id: "executive",
    name: "Executive AI Bootcamp",
    duration: "Half-day",
    price: "$9,500",
    audience: "Leadership teams (up to 12)",
    icon: Trophy,
    color: "purple",
    description: "Strategic AI literacy for C-suite and board members",
    outcomes: [
      "Understand AI opportunities and risks",
      "Build AI strategy framework",
      "Identify high-impact use cases",
      "Create governance structure",
      "Develop implementation roadmap"
    ],
    agenda: [
      "AI Fundamentals & Market Landscape (1hr)",
      "Document Intelligence Deep Dive (1hr)",
      "Portfolio Case Studies & ROI Analysis (1hr)",
      "Hands-on AI Tools Workshop (1hr)",
      "Q&A and Strategic Planning (30min)"
    ],
    deliverables: [
      "AI Opportunity Assessment",
      "Implementation Playbook",
      "Governance Framework Template",
      "60-day Action Plan"
    ]
  },
  {
    id: "manager",
    name: "Manager Enablement Lab",
    duration: "Full day",
    price: "$2,500/person",
    audience: "Operations leaders & managers",
    icon: Users,
    color: "blue",
    description: "Hands-on training for operators driving AI initiatives",
    outcomes: [
      "Master AI project management",
      "Learn change management tactics",
      "Understand technical requirements",
      "Build team adoption strategies",
      "Measure and report ROI"
    ],
    agenda: [
      "AI Project Lifecycle Management (2hr)",
      "Document Automation Workshop (2hr)",
      "Change Management & Adoption (1.5hr)",
      "ROI Measurement & Reporting (1.5hr)",
      "Implementation Planning Session (1hr)"
    ],
    deliverables: [
      "Project Management Templates",
      "Change Management Toolkit",
      "ROI Calculator Access",
      "30-day Support Access"
    ]
  },
  {
    id: "portfolio",
    name: "Portfolio AI Day",
    duration: "1 day onsite",
    price: "$15,000",
    audience: "Entire portfolio (up to 3 sessions)",
    icon: Building2,
    color: "green",
    description: "Fund-wide AI transformation kickoff event",
    outcomes: [
      "Align portfolio on AI vision",
      "Share best practices across companies",
      "Build peer learning network",
      "Identify collaboration opportunities",
      "Create portfolio-wide momentum"
    ],
    agenda: [
      "Opening Keynote: AI Transformation (1hr)",
      "Portfolio Success Stories Panel (1hr)",
      "Breakout Sessions by Function (2hr)",
      "Hands-on Labs & Demos (2hr)",
      "Networking & Collaboration Planning (1hr)",
      "Closing: 90-Day Challenge Launch (1hr)"
    ],
    deliverables: [
      "Recording of all sessions",
      "Portfolio AI Maturity Report",
      "Collaboration Opportunities Map",
      "90-Day Challenge Framework"
    ]
  },
  {
    id: "governance",
    name: "AI Governance Workshop",
    duration: "Half-day",
    price: "$7,500",
    audience: "Risk, compliance & legal teams",
    icon: Shield,
    color: "red",
    description: "Build responsible AI policies and frameworks",
    outcomes: [
      "Develop AI governance policies",
      "Create risk assessment framework",
      "Build compliance procedures",
      "Design audit protocols",
      "Establish vendor management"
    ],
    agenda: [
      "AI Risk Landscape & Regulations (1hr)",
      "Governance Framework Design (1.5hr)",
      "Policy Development Workshop (1.5hr)",
      "Audit & Monitoring Procedures (30min)",
      "Implementation Planning (30min)"
    ],
    deliverables: [
      "AI Governance Policy Template",
      "Risk Assessment Framework",
      "Vendor Evaluation Checklist",
      "Audit Protocol Documentation"
    ]
  },
  {
    id: "technical",
    name: "Technical Deep Dive",
    duration: "2 days",
    price: "$18,000",
    audience: "IT teams & developers",
    icon: Zap,
    color: "yellow",
    description: "Hands-on technical training for implementation teams",
    outcomes: [
      "Understand AI architecture patterns",
      "Learn integration best practices",
      "Master data preparation techniques",
      "Build custom AI solutions",
      "Deploy and monitor AI systems"
    ],
    agenda: [
      "Day 1: Foundations & Architecture (8hr)",
      "- AI/ML fundamentals",
      "- System architecture patterns",
      "- Data pipeline design",
      "- Security & compliance",
      "Day 2: Hands-on Implementation (8hr)",
      "- Document processing workshop",
      "- API integration lab",
      "- Model deployment",
      "- Monitoring & maintenance"
    ],
    deliverables: [
      "Technical Architecture Guides",
      "Code Samples & Templates",
      "Integration Playbooks",
      "6-month Technical Support"
    ]
  },
  {
    id: "custom",
    name: "Custom Program Design",
    duration: "Flexible",
    price: "Contact us",
    audience: "Tailored to your needs",
    icon: Sparkles,
    color: "purple",
    description: "Bespoke training program for specific requirements",
    outcomes: [
      "Address unique challenges",
      "Focus on specific use cases",
      "Align with company culture",
      "Integrate with existing programs",
      "Maximize relevance and impact"
    ],
    agenda: [
      "Customized based on:",
      "- Industry vertical",
      "- Company size & maturity",
      "- Specific use cases",
      "- Technical stack",
      "- Timeline & objectives"
    ],
    deliverables: [
      "Tailored Curriculum",
      "Custom Materials",
      "Ongoing Support",
      "Success Metrics Dashboard"
    ]
  }
];

const benefits = [
  {
    icon: Target,
    title: "Portfolio-Wide Impact",
    description: "Every training session benefits your entire fund through shared learnings and standardized approaches."
  },
  {
    icon: Clock,
    title: "Immediate Application",
    description: "Practical, hands-on training that teams can apply to real projects the next day."
  },
  {
    icon: Award,
    title: "Certification Available",
    description: "Participants receive certificates of completion to showcase their AI expertise."
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing Support",
    description: "Post-training support ensures successful implementation and sustained adoption."
  }
];

const testimonials = [
  {
    quote: "The Executive Bootcamp transformed how our leadership team thinks about AI. We identified 5 high-impact projects in the session.",
    author: "Managing Partner",
    company: "$2B PE Fund"
  },
  {
    quote: "Portfolio AI Day created incredible momentum. Companies that were skeptical are now racing to implement.",
    author: "Operating Partner",
    company: "Mid-Market PE"
  },
  {
    quote: "The hands-on labs were game-changing. Our team went from AI-curious to AI-capable in one day.",
    author: "VP Operations",
    company: "Portfolio Company"
  }
];

export default function EducationPage() {
  return (
    <div className="spr-theme spr-page min-h-screen py-24">
      {/* Hero */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center space-y-6">
          <Badge className="mb-4" variant="outline">
            <GraduationCap className="w-3 h-3 mr-1" />
            AI Education & Training
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold">
            Build AI Capabilities <span className="gradient-text">Across Your Fund</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From executive strategy sessions to hands-on technical training.
            Upskill your entire portfolio with practical AI education that drives immediate value.
          </p>

          <div className="flex items-center justify-center gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold text-blue-500">500+</p>
              <p className="text-sm text-muted-foreground">Executives trained</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-500">95%</p>
              <p className="text-sm text-muted-foreground">Satisfaction rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-500">3.2x</p>
              <p className="text-sm text-muted-foreground">ROI on training</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="container mx-auto px-4 max-w-7xl mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Training Programs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card key={program.id} className="flex flex-col">
              <CardHeader>
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  program.color === "blue" && "bg-blue-500/10",
                  program.color === "green" && "bg-green-500/10",
                  program.color === "purple" && "bg-purple-500/10",
                  program.color === "red" && "bg-red-500/10",
                  program.color === "yellow" && "bg-yellow-500/10"
                )}>
                  <program.icon className={cn(
                    "w-6 h-6",
                    program.color === "blue" && "text-blue-500",
                    program.color === "green" && "text-green-500",
                    program.color === "purple" && "text-purple-500",
                    program.color === "red" && "text-red-500",
                    program.color === "yellow" && "text-yellow-500"
                  )} />
                </div>

                <CardTitle className="text-xl">{program.name}</CardTitle>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{program.price}</p>
                  <p className="text-sm text-muted-foreground">{program.duration} • {program.audience}</p>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground">
                  {program.description}
                </p>

                <div>
                  <h4 className="font-semibold mb-2 text-sm">Key Outcomes:</h4>
                  <ul className="space-y-1">
                    {program.outcomes.slice(0, 3).map((outcome, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full" variant="outline" asChild>
                  <Link href={`/contact?type=training&program=${program.id}`}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Train with Sprinter</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <Card key={i} className="bg-neutral-900/50 border-neutral-800">
              <CardContent className="pt-6">
                <benefit.icon className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">What Leaders Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/50">
              <CardContent className="pt-6">
                <p className="text-sm italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sample Agenda */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-2xl">Sample: Executive AI Bootcamp Agenda</CardTitle>
            <CardDescription>Half-day intensive for leadership teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Morning Session (9am - 12:30pm)</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-muted-foreground">9:00</span>
                    <div>
                      <p className="font-medium">AI Fundamentals & Market Landscape</p>
                      <p className="text-sm text-muted-foreground">Understanding the AI opportunity</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-muted-foreground">10:00</span>
                    <div>
                      <p className="font-medium">Document Intelligence Deep Dive</p>
                      <p className="text-sm text-muted-foreground">Your fastest path to ROI</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-muted-foreground">11:00</span>
                    <div>
                      <p className="font-medium">Portfolio Case Studies</p>
                      <p className="text-sm text-muted-foreground">Real wins from your peers</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-muted-foreground">12:00</span>
                    <div>
                      <p className="font-medium">Strategic Planning</p>
                      <p className="text-sm text-muted-foreground">Your 60-day action plan</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Deliverables</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">AI Opportunity Assessment for your company</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Implementation Playbook with templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Governance Framework documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">60-day implementation roadmap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Access to AI tools and calculators</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/30">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Build AI Excellence?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 100+ PE firms that have transformed their portfolios through our training programs.
              Start with a free consultation to design your custom curriculum.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact?type=training">
                <Button size="lg" className="gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule Training Consultation
                </Button>
              </Link>
              <Link href="/downloads/training-catalog">
                <Button size="lg" variant="outline" className="gap-2">
                  <BookOpen className="w-5 h-5" />
                  Download Training Catalog
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}