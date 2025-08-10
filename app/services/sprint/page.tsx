import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Target, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Rocket,
  Code,
  TrendingUp,
  Calendar,
  Shield
} from "lucide-react";

export const metadata: Metadata = {
  title: "10-Day AI Sprint | Sprinter AI",
  description: "From idea to production AI in 10 days. We build, deploy, and train your team. Ship working AI that delivers immediate value.",
};

const timeline = [
  { day: "Day 1-2", phase: "Discovery & Design", description: "Map requirements, design architecture, set success metrics" },
  { day: "Day 3-5", phase: "Rapid Development", description: "Build core AI functionality with daily demos" },
  { day: "Day 6-7", phase: "Integration", description: "Connect to your systems, implement security, add monitoring" },
  { day: "Day 8-9", phase: "Testing & Refinement", description: "User testing, performance optimization, edge case handling" },
  { day: "Day 10", phase: "Launch & Training", description: "Deploy to production, train your team, handoff documentation" }
];

const deliverables = [
  { icon: Code, title: "Production AI System", description: "Fully functional, deployed, and monitored" },
  { icon: Shield, title: "Security & Compliance", description: "Enterprise-grade security with your requirements" },
  { icon: Users, title: "Team Training", description: "Your team knows how to use and maintain it" },
  { icon: Target, title: "30-Day Support", description: "We're there to ensure smooth operations" }
];

const sprintTypes = [
  {
    title: "Customer Service AI",
    examples: ["Intelligent ticket routing", "Auto-response generation", "Sentiment analysis"],
    price: "$25,000"
  },
  {
    title: "Data Processing Agent",
    examples: ["Document extraction", "Report generation", "Data validation"],
    price: "$35,000"
  },
  {
    title: "Sales Automation",
    examples: ["Lead qualification", "Proposal generation", "CRM automation"],
    price: "$40,000"
  },
  {
    title: "Custom Solution",
    examples: ["Unique to your needs", "Multiple integrations", "Complex workflows"],
    price: "$50,000"
  }
];

export default function SprintPage() {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Fast Track to Production
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            10-Day AI <span className="gradient-text">Sprint</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Skip the months of planning. We build and deploy production AI in 10 days.
            Your team gets trained. You get results. No slides, just working software.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                <Rocket className="w-4 h-4" />
                Start Your Sprint
              </Button>
            </Link>
            <Link href="#timeline">
              <Button size="lg" variant="outline">
                See the Process
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold gradient-text mb-2">10 Days</div>
              <p className="text-sm text-muted-foreground">To Production</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold gradient-text mb-2">$25-50K</div>
              <p className="text-sm text-muted-foreground">Fixed Price</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold gradient-text mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold gradient-text mb-2">30 Days</div>
              <p className="text-sm text-muted-foreground">Post Support</p>
            </CardContent>
          </Card>
        </div>

        {/* What Makes It Different */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Teams Choose <span className="gradient-text">Our Sprint</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <CardTitle>We Ship, Not Slide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No PowerPoints. No endless meetings. Just heads-down building and daily progress you can see and test.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <CardTitle>Production-Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Security, monitoring, error handling, and documentation included. This isn't a prototype—it's ready for real users.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <CardTitle>Your Team Owns It</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We train your team throughout. By day 10, they can operate, maintain, and extend what we built together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Timeline */}
        <div id="timeline" className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            The 10-Day <span className="gradient-text">Timeline</span>
          </h2>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/50" />
                <CardContent className="pt-6 pl-8">
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="mt-0.5">
                      {item.day}
                    </Badge>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.phase}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sprint Types & Pricing */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Sprint <span className="gradient-text">Options</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sprintTypes.map((type, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <div className="text-2xl font-bold gradient-text">{type.price}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">Examples:</p>
                  <ul className="space-y-1">
                    {type.examples.map((example, idx) => (
                      <li key={idx} className="text-xs flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What You Get */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            What's <span className="gradient-text">Included</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {deliverables.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Case Study Teaser */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Recent Sprint Success</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    "We built an AI customer service agent for a SaaS company in 10 days. 
                    It now handles 70% of support tickets automatically, saving 30 hours per week 
                    and improving response time from hours to seconds."
                  </p>
                  <Link href="/case-studies" className="text-sm text-primary hover:underline">
                    Read more success stories →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center py-12 px-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Ship AI in <span className="gradient-text">10 Days</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop planning. Start shipping. Join the 50+ companies who've launched 
            production AI with our sprint process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Book Your Sprint
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/services/discovery">
              <Button size="lg" variant="outline">
                Start with Discovery
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}