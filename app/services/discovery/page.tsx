import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Target, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Zap,
  Brain,
  TrendingUp,
  Calendar
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Discovery Workshop | Sprinter AI",
  description: "Identify high-ROI AI opportunities in your business. One-day intensive workshop to transform your AI strategy and launch breakthrough initiatives.",
};

const benefits = [
  "Identify 3-5 high-impact AI opportunities specific to your business",
  "Get a clear roadmap with prioritized initiatives and ROI estimates",
  "Hands-on experience with AI tools relevant to your industry",
  "Executive alignment on AI strategy and next steps",
  "Technical feasibility assessment from experienced practitioners"
];

const agenda = [
  { time: "9:00 AM", activity: "Current State Analysis", description: "Map existing processes and pain points" },
  { time: "10:30 AM", activity: "AI Opportunity Mapping", description: "Identify automation and augmentation opportunities" },
  { time: "12:00 PM", activity: "Working Lunch & Demos", description: "See relevant AI solutions in action" },
  { time: "1:30 PM", activity: "Prioritization Workshop", description: "Score opportunities by impact and feasibility" },
  { time: "3:00 PM", activity: "Roadmap Creation", description: "Build your 90-day AI implementation plan" },
  { time: "4:30 PM", activity: "Next Steps & Resources", description: "Clear action items and support structure" }
];

const outcomes = [
  { icon: Target, title: "Opportunity Report", description: "Detailed analysis of 3-5 AI opportunities with ROI projections" },
  { icon: Brain, title: "Implementation Roadmap", description: "90-day plan with milestones, resources, and success metrics" },
  { icon: Users, title: "Team Alignment", description: "Executive buy-in and clear ownership of initiatives" },
  { icon: Zap, title: "Quick Wins", description: "1-2 initiatives you can implement immediately" }
];

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Most Popular Service
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            AI Discovery <span className="gradient-text">Workshop</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            One day to identify game-changing AI opportunities in your business.
            Walk away with a clear roadmap and the confidence to execute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                <Calendar className="w-4 h-4" />
                Book Your Workshop
              </Button>
            </Link>
            <Link href="#agenda">
              <Button size="lg" variant="outline">
                See the Agenda
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold gradient-text mb-2">1 Day</div>
              <p className="text-sm text-muted-foreground">Time Investment</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold gradient-text mb-2">$5,000</div>
              <p className="text-sm text-muted-foreground">Fixed Price</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold gradient-text mb-2">3-5</div>
              <p className="text-sm text-muted-foreground">AI Opportunities</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold gradient-text mb-2">250%</div>
              <p className="text-sm text-muted-foreground">Average ROI</p>
            </CardContent>
          </Card>
        </div>

        {/* What You Get */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            What You'll <span className="gradient-text">Achieve</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>During the Workshop</CardTitle>
                <CardDescription>A full day of intensive AI strategy work</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>After the Workshop</CardTitle>
                <CardDescription>Tangible deliverables to drive action</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <outcome.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{outcome.title}</h4>
                        <p className="text-xs text-muted-foreground">{outcome.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Agenda */}
        <div id="agenda" className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Workshop <span className="gradient-text">Agenda</span>
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {agenda.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-6 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 w-24">
                      <Badge variant="secondary" className="text-xs">
                        {item.time}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.activity}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Who This Is For */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Who Should <span className="gradient-text">Attend</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-500">Perfect For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Companies ready to invest in AI but unsure where to start</li>
                  <li>• Teams looking to validate AI opportunities before committing</li>
                  <li>• Organizations wanting to build internal AI consensus</li>
                  <li>• Leaders who prefer action over endless strategy sessions</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-orange-500">Not Ideal For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Companies already deep in AI implementation</li>
                  <li>• Teams looking for hands-on technical training only</li>
                  <li>• Organizations wanting a vendor to just "do it all"</li>
                  <li>• Groups smaller than 3 or larger than 12 participants</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 px-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your <span className="gradient-text">AI Strategy</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the 100+ companies who've discovered their AI opportunities with us.
            Limited workshop dates available each month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Book Your Workshop
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