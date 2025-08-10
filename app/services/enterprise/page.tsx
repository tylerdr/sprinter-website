import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  CheckCircle,
  ArrowRight,
  Code,
  TrendingUp,
  Shield,
  Brain,
  Layers
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise AI Transformation | Sprinter AI",
  description: "Full-scale AI integration across your organization. Strategic, systematic, scalable. Transform operations with enterprise-grade AI solutions.",
};

const phases = [
  {
    phase: "Month 1",
    title: "Foundation & Quick Wins",
    activities: [
      "Executive alignment and governance setup",
      "Technology assessment and architecture design",
      "Launch 2-3 pilot projects for immediate impact",
      "Begin team training and capability building"
    ]
  },
  {
    phase: "Month 2-3",
    title: "Scale & Integrate",
    activities: [
      "Deploy AI across priority departments",
      "Integrate with existing enterprise systems",
      "Establish AI operations and monitoring",
      "Expand training to all stakeholders"
    ]
  },
  {
    phase: "Month 4-6",
    title: "Optimize & Innovate",
    activities: [
      "Performance optimization and cost reduction",
      "Advanced use case development",
      "Center of Excellence establishment",
      "Continuous improvement framework"
    ]
  }
];

const capabilities = [
  { icon: Brain, title: "AI Strategy & Governance", description: "Enterprise-wide AI strategy aligned with business objectives" },
  { icon: Layers, title: "Platform Architecture", description: "Scalable, secure AI infrastructure designed for growth" },
  { icon: Users, title: "Change Management", description: "Comprehensive training and adoption programs" },
  { icon: Shield, title: "Risk & Compliance", description: "Enterprise security, privacy, and regulatory compliance" },
  { icon: Code, title: "Custom Solutions", description: "Bespoke AI applications for your unique needs" },
  { icon: TrendingUp, title: "ROI Optimization", description: "Continuous measurement and value realization" }
];

const industries = [
  { name: "Financial Services", focus: "Risk assessment, fraud detection, customer intelligence" },
  { name: "Healthcare", focus: "Clinical decision support, operational efficiency, patient engagement" },
  { name: "Manufacturing", focus: "Predictive maintenance, quality control, supply chain optimization" },
  { name: "Retail", focus: "Personalization, inventory optimization, demand forecasting" }
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Enterprise Scale
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Enterprise AI <span className="gradient-text">Transformation</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Systematic AI integration across your entire organization.
            We don&apos;t just implement AI—we transform how you operate, compete, and grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                <Building2 className="w-4 h-4" />
                Schedule Executive Briefing
              </Button>
            </Link>
            <Link href="#approach">
              <Button size="lg" variant="outline">
                See Our Approach
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold gradient-text mb-2">3-6</div>
              <p className="text-sm text-muted-foreground">Months</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold gradient-text mb-2">$150K+</div>
              <p className="text-sm text-muted-foreground">Investment</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold gradient-text mb-2">10-20x</div>
              <p className="text-sm text-muted-foreground">ROI Target</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold gradient-text mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Team Coverage</p>
            </CardContent>
          </Card>
        </div>

        {/* Capabilities */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Full-Stack <span className="gradient-text">Capabilities</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <capability.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{capability.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Transformation Journey */}
        <div id="approach" className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Your Transformation <span className="gradient-text">Journey</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {phases.map((phase, index) => (
              <Card key={index} className="relative">
                <div className="absolute -top-3 left-4">
                  <Badge className="text-xs">{phase.phase}</Badge>
                </div>
                <CardHeader className="pt-8">
                  <CardTitle>{phase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Industry Expertise */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Industry <span className="gradient-text">Expertise</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {industries.map((industry, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground">{industry.focus}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Why Fortune 500s Choose <span className="gradient-text">Sprinter AI</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">We Ship, Not Consult</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    We&apos;re builders, not advisors. Every engagement delivers working AI systems, 
                    not just recommendations.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Proven at Scale</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    50+ enterprise deployments. We&apos;ve seen what works and what doesn&apos;t 
                    at Fortune 500 scale.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Your Team Leads</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    We build capability, not dependency. Your team owns and operates 
                    everything we build together.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Risk Mitigation</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enterprise-grade security, compliance, and governance from day one. 
                    We&apos;ve navigated the regulations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Recent Enterprise Success</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    &quot;Transformed a Fortune 500 financial services firm with AI-powered risk assessment 
                    and customer intelligence. Reduced processing time by 85%, increased accuracy to 99.2%, 
                    and generated $47M in new revenue opportunities in the first year.&quot;
                  </p>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="font-semibold gradient-text">85%</span>
                      <span className="text-muted-foreground ml-1">faster processing</span>
                    </div>
                    <div>
                      <span className="font-semibold gradient-text">$47M</span>
                      <span className="text-muted-foreground ml-1">new revenue</span>
                    </div>
                    <div>
                      <span className="font-semibold gradient-text">2,000+</span>
                      <span className="text-muted-foreground ml-1">employees trained</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center py-12 px-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Lead with <span className="gradient-text">AI</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the enterprises transforming their operations with AI. 
            Let&apos;s discuss your vision and build a roadmap to get there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Schedule Executive Briefing
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">
                Compare All Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}