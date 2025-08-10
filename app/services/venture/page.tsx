import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Target, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Handshake,
  Code,
  TrendingUp,
  Calendar,
  Shield,
  Brain,
  Layers,
  DollarSign
} from "lucide-react";

export const metadata: Metadata = {
  title: "Venture Partnership | Sprinter AI",
  description: "We become your technical co-founder. Build breakthrough AI products together. Equity-based partnership for ambitious ventures.",
};

const partnership = [
  {
    icon: Brain,
    title: "Technical Co-Founder",
    description: "We bring the technical expertise, you bring the vision and domain knowledge"
  },
  {
    icon: Code,
    title: "Full Stack Development",
    description: "From architecture to deployment, we build the entire technical foundation"
  },
  {
    icon: Users,
    title: "Team Building",
    description: "Help recruit and mentor your technical team as you scale"
  },
  {
    icon: Rocket,
    title: "Go-to-Market Support",
    description: "Technical sales support, demos, and customer success engineering"
  }
];

const idealPartners = [
  "Domain experts with deep industry knowledge",
  "Existing businesses looking to spin out AI products",
  "Founders with strong customer relationships",
  "PE/VC firms with portfolio companies needing AI",
  "Serial entrepreneurs ready for their AI venture"
];

const ventureTypes = [
  {
    type: "Industry SaaS",
    description: "Vertical AI solutions for specific industries",
    examples: ["LegalTech AI", "HealthTech platforms", "FinTech automation"],
    equity: "15-30%"
  },
  {
    type: "AI-First Products",
    description: "Consumer or B2B products powered by AI",
    examples: ["AI assistants", "Content platforms", "Workflow automation"],
    equity: "20-40%"
  },
  {
    type: "Data Products",
    description: "Transform data into intelligence products",
    examples: ["Market intelligence", "Risk assessment", "Predictive analytics"],
    equity: "25-35%"
  }
];

const process = [
  { phase: "Discovery", duration: "2 weeks", description: "Validate the opportunity and align on vision" },
  { phase: "MVP Sprint", duration: "4 weeks", description: "Build and launch initial product" },
  { phase: "Market Testing", duration: "8 weeks", description: "Get customer feedback and iterate" },
  { phase: "Scale", duration: "Ongoing", description: "Grow revenue, team, and product together" }
];

export default function VenturePage() {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Equity Partnership
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            AI Venture <span className="gradient-text">Partnership</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We become your technical co-founder. Together, we build breakthrough AI products 
            that create lasting value. No hourly rates, just shared success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                <Handshake className="w-4 h-4" />
                Explore Partnership
              </Button>
            </Link>
            <Link href="#portfolio">
              <Button size="lg" variant="outline">
                See Our Ventures
              </Button>
            </Link>
          </div>
        </div>

        {/* What We Bring */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We <span className="gradient-text">Bring</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnership.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership Models */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Partnership <span className="gradient-text">Models</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ventureTypes.map((venture, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <CardTitle className="text-xl">{venture.type}</CardTitle>
                  <CardDescription>{venture.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Examples:</p>
                    <ul className="space-y-1">
                      {venture.examples.map((example, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <span className="text-xs text-muted-foreground">Typical equity:</span>
                    <div className="text-lg font-semibold gradient-text">{venture.equity}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ideal Partners */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ideal <span className="gradient-text">Partners</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-500">We're Looking For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {idealPartners.map((partner, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{partner}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What You Get</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="p-1 rounded bg-primary/10">
                      <Code className="w-3 h-3 text-primary" />
                    </div>
                    <span>Complete technical leadership and execution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="p-1 rounded bg-primary/10">
                      <DollarSign className="w-3 h-3 text-primary" />
                    </div>
                    <span>No upfront costs - we invest alongside you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="p-1 rounded bg-primary/10">
                      <Users className="w-3 h-3 text-primary" />
                    </div>
                    <span>Access to our network and resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="p-1 rounded bg-primary/10">
                      <Shield className="w-3 h-3 text-primary" />
                    </div>
                    <span>De-risked technical execution</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            How We <span className="gradient-text">Partner</span>
          </h2>
          <div className="space-y-4">
            {process.map((step, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Badge variant="outline">{step.duration}</Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{step.phase}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div id="portfolio" className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our <span className="gradient-text">Ventures</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="text-2xl font-bold gradient-text mb-2">MortgageQ.ai</div>
                <CardDescription>AI-powered mortgage guideline intelligence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="default">Live</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Traction:</span>
                    <span>1,000+ users</span>
                  </div>
                  <Link href="https://mortgageq.ai" target="_blank" className="text-primary hover:underline text-xs">
                    Visit site →
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="text-2xl font-bold gradient-text mb-2">Cabomatic</div>
                <CardDescription>AI SKU mapping for cabinet manufacturers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="default">Live</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Traction:</span>
                    <span>$2M+ processed</span>
                  </div>
                  <Link href="https://cabomatic.com" target="_blank" className="text-primary hover:underline text-xs">
                    Visit site →
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="text-2xl font-bold gradient-text mb-2">Amble Ideation</div>
                <CardDescription>AI-powered workshop facilitation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="default">Live</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Traction:</span>
                    <span>500+ workshops</span>
                  </div>
                  <Link href="https://ambleideation.com" target="_blank" className="text-primary hover:underline text-xs">
                    Visit site →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 px-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Something <span className="gradient-text">Extraordinary</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We partner with 2-3 ventures per year. If you have the vision and domain expertise, 
            we have the technical firepower to make it real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Discuss Partnership
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">
                See Other Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}