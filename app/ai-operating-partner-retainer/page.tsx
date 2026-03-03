import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Zap,
  BookOpen,
  Target,
  Rocket,
  Calendar
} from "lucide-react";
import { BookDemoButton } from "@/components/shared/book-demo-button";
import TrustedBy from "@/components/sprinter-ai/TrustedBy";
import StickyCTA from "@/components/sprinter-ai/StickyCTA";
import { generateServiceStructuredData, getStructuredDataScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Operating Partner Retainer | Sprinter AI",
  description: "Continuous AI capability for PE firms. Monthly education, advisory hours, and priority sprint capacity. Keep pace with AI's rapid evolution while building portfolio-wide capabilities.",
  keywords: "AI operating partner, retainer model, PE AI advisory, sprint capacity, portfolio AI, continuous AI capability",
};

const serviceData = generateServiceStructuredData(
  "AI Operating Partner Retainer",
  "A continuous AI operating partner model for PE firms that combines monthly advisory, education, and execution capacity to compound portfolio value.",
  "15000"
);

export default function AIOperatingPartnerRetainerPage() {
  return (
    <div className="spr-theme spr-page min-h-screen overflow-x-hidden bg-background pb-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={getStructuredDataScript(serviceData)}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

        <div className="relative container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Clock className="w-3 h-3 mr-1" />
              Retainer Model
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Operating Partner
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Keep Pace with AI Evolution
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              AI agents can now run procurement, reporting, and customer operations 24/7.
              This retainer gives your firm ongoing advisory plus execution capacity so every quarter compounds EBITDA, not backlog.
            </p>

            <div className="flex justify-center">
              <BookDemoButton
                size="lg"
                text="Discuss Retainer Options"
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Prefer to start smaller? Begin with the <Link href="/ai-sprint" className="text-primary hover:underline">AI Readiness Sprint</Link>.
            </p>
          </div>
        </div>
      </section>

      <TrustedBy />

      {/* Why AI Moves Fast */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Why AI Is Different from Other Technology</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-yellow-500 mb-2" />
                <CardTitle>New Models Every 3-6 Months</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  GPT-4 (March 2023), Claude 3 Opus (March 2024), GPT-4o (May 2024),
                  Claude 3.5 Sonnet (June 2024), Gemini 2.0 (December 2024).
                </p>
                <p className="text-sm text-muted-foreground">
                  Each unlocks use cases that weren't possible before. Your competitive
                  advantage comes from speed of adaptation, not any single system.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>Use Cases Evolve Rapidly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  What wasn't feasible 6 months ago might be an easy win today.
                  What you deploy today might be outdated by next quarter.
                </p>
                <p className="text-sm text-muted-foreground">
                  Traditional project-based engagements can't match this pace. By the time
                  a 6-month project completes, the technology has evolved.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <p className="text-lg text-center">
                <strong>You need continuous partnership</strong> that keeps pace with AI's evolution—not
                one-off projects that become obsolete before they ship.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Pilot-first guarantee</h2>
              <p className="text-muted-foreground">
                If your first retainer-backed sprint does not deliver a production workflow with documented operator handoff, we fund the remediation sprint.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">What an AI Operating Partner Provides</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle>Strategic Advisory</CardTitle>
                <CardDescription>Ongoing</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Monthly portfolio reviews to identify AI opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Evaluation of new AI capabilities as they emerge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Vendor and technology landscape monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Business case development for AI initiatives</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-purple-500 mb-2" />
                <CardTitle>Education & Enablement</CardTitle>
                <CardDescription>Continuous</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Regular sessions on AI developments and implications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Training for portfolio company leaders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Case studies and playbooks from your portfolio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Building internal AI fluency across your team</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Rocket className="w-8 h-8 text-orange-500 mb-2" />
                <CardTitle>Execution Capacity</CardTitle>
                <CardDescription>As Needed</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Sprint-based deployment when you identify opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Technical oversight of AI initiatives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Performance monitoring of production systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Troubleshooting and optimization support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Retainer Structure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">How the Retainer Works</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <Calendar className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle>Base Retainer</CardTitle>
                <div className="text-3xl font-bold text-primary mt-2">$15-25K/month</div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Includes:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>10 advisory hours per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Monthly or quarterly education sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Priority access to sprint capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Continuous monitoring of deployed systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Access to anonymized learnings from other portfolios</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="w-8 h-8 text-orange-500 mb-2" />
                <CardTitle>Sprint Purchases</CardTitle>
                <div className="text-3xl font-bold text-primary mt-2">$50K per sprint</div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Buy as needed:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span><strong>1 sprint:</strong> Validate focused use case (10 days)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span><strong>3 sprints:</strong> Pilot to production ($135K)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span><strong>4-6 sprints:</strong> Portfolio-wide POC ($200-300K)</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Priority scheduling, flexible capacity allocation, and no long-term
                  commitment before seeing results.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle>Typical Investment for $2-5B AUM Fund</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Base retainer ($20K/month) + 4-6 sprints per year = <strong>$300-500K annually</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                That's a fraction of one full-time senior AI hire, with more flexibility,
                broader expertise, and cross-portfolio learning included.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Real Examples */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Operating Partner Model in Action</h2>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Mid-Market PE Firm</CardTitle>
                <CardDescription>$3B AUM, 12 portfolio companies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="font-semibold mb-2">Structure:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• $20K/month base retainer</li>
                      <li>• Monthly portfolio reviews</li>
                      <li>• Quarterly education sessions</li>
                      <li>• Ad-hoc advisory as needed</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Year 1 Execution:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 2-sprint lead scoring (SaaS company)</li>
                      <li>• 1-sprint churn prediction pilot</li>
                      <li>• 2-sprint document automation (services)</li>
                      <li>• 1-sprint demand forecasting (manufacturing)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm">
                    <strong>Total Investment:</strong> $240K retainer + $300K sprints = $540K
                    <br />
                    <strong>Measured Impact:</strong> $8M in incremental EBITDA across portfolio
                    <br />
                    <strong>ROI:</strong> 15x
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lower-Middle-Market Firm</CardTitle>
                <CardDescription>$800M AUM, 8 companies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="font-semibold mb-2">Structure:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Started with 3-sprint POC</li>
                      <li>• Shifted to $15K/month retainer</li>
                      <li>• 1 sprint per quarter minimum</li>
                      <li>• Focus on B2B services playbooks</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Progress:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Built playbooks for proposal automation</li>
                      <li>• Customer success AI standardized</li>
                      <li>• Operational analytics templatized</li>
                      <li>• By year 2: 1 sprint vs 3 per deployment</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm">
                    <strong>Key Win:</strong> Accumulated knowledge means proven solutions deploy
                    in 1 sprint instead of 3, compounding value across portfolio.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Is This Right for You */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Is the AI Operating Partner Model Right for You?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-green-500/30">
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>Good Fit When:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>You have 5+ portfolio companies where AI could create value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>You don't have internal AI expertise (or it's expensive/difficult to hire)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>You want to move fast without big up-front commitments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>You value ongoing education and strategic guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>You're open to sprint-based iteration vs traditional projects</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30">
              <CardHeader>
                <Shield className="w-8 h-8 text-yellow-500 mb-2" />
                <CardTitle>Not the Right Fit If:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5 shrink-0">⚠️</span>
                    <span>You have one specific AI project and don't need ongoing support (just buy sprints)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5 shrink-0">⚠️</span>
                    <span>You've already built strong internal AI capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5 shrink-0">⚠️</span>
                    <span>You prefer annual planning cycles and can't accommodate rapid iteration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5 shrink-0">⚠️</span>
                    <span>You're not ready to provide real data and real users for pilots</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-primary/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Keep Pace with AI?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Schedule a call to discuss retainer options and how continuous AI partnership
                can accelerate value creation across your portfolio.
              </p>
              <div className="flex justify-center">
                <BookDemoButton
                  size="lg"
                  text="Discuss Retainer Options"
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                />
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Or start with a <Link href="/ai-sprint" className="text-primary hover:underline">single sprint</Link> ($2,500)
                to validate the approach before committing to a retainer.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <StickyCTA href="https://cal.com/tyler-dreher" label="Discuss Retainer Options" />
    </div>
  );
}
