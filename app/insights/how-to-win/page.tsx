import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Rocket, Shield, Users, TrendingUp, ArrowRight, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Win with AI: The PE Playbook | Sprinter AI",
  description: "Proven strategies for private equity firms to create lasting value with AI. Learn from 100+ portfolio implementations.",
};

const strategies = [
  {
    id: "start-boring",
    title: "Start with Boring, Win Big",
    phase: "Foundation",
    timeframe: "Days 1-30",
    icon: Target,
    description: "The highest ROI comes from automating mundane tasks, not moonshots.",
    tactics: [
      "Target 3-person processes first",
      "Focus on data entry and reconciliation",
      "Automate report generation",
      "Standardize before you optimize"
    ],
    metrics: {
      "ROI": "250%",
      "Time to Value": "2 sprints",
      "Success Rate": "95%"
    },
    example: "Portfolio company reduced AP processing from 15 minutes to 3 minutes per invoice, saving $1.2M annually.",
    mistakes: [
      "Starting with customer-facing AI",
      "Attempting enterprise-wide transformation",
      "Ignoring change management"
    ]
  },
  {
    id: "wedge-strategy",
    title: "The Wedge Strategy",
    phase: "Expansion",
    timeframe: "Days 31-90",
    icon: Rocket,
    description: "Use quick wins to fund larger initiatives. Let success sell itself.",
    tactics: [
      "Pick one department as champion",
      "Document everything obsessively",
      "Share wins at board meetings",
      "Reinvest savings into next project"
    ],
    metrics: {
      "Adoption": "3x faster",
      "Budget Approval": "85%",
      "Scope Creep": "-60%"
    },
    example: "Started with AP automation, expanded to full finance suite, then operations—all self-funded.",
    mistakes: [
      "Trying to convince skeptics first",
      "Hiding failures",
      "Moving too fast without documentation"
    ]
  },
  {
    id: "data-first",
    title: "Data Quality Before AI Quality",
    phase: "Foundation",
    timeframe: "Ongoing",
    icon: Shield,
    description: "80% of AI failures are data problems, not model problems.",
    tactics: [
      "Audit data quality before starting",
      "Build data pipelines first",
      "Implement data governance",
      "Create single sources of truth"
    ],
    metrics: {
      "Failure Rate": "-70%",
      "Model Accuracy": "+35%",
      "Maintenance Cost": "-50%"
    },
    example: "6-week data cleanup project enabled 5 successful AI implementations in following quarter.",
    mistakes: [
      "Assuming data is ready",
      "Skipping data governance",
      "Not budgeting for data work"
    ]
  },
  {
    id: "human-loop",
    title: "Human-in-the-Loop Excellence",
    phase: "Implementation",
    timeframe: "Ongoing",
    icon: Users,
    description: "The best AI amplifies human judgment, doesn't replace it.",
    tactics: [
      "Design for human oversight",
      "Build confidence with transparency",
      "Implement graduated autonomy",
      "Celebrate human + AI wins"
    ],
    metrics: {
      "User Satisfaction": "+65%",
      "Error Rate": "-90%",
      "Adoption Speed": "2x"
    },
    example: "Quote review process: AI drafts, human approves, AI learns—98% accuracy in 60 days.",
    mistakes: [
      "Full automation too early",
      "Ignoring user feedback",
      "Not training the humans"
    ]
  },
  {
    id: "measure-everything",
    title: "Measure Like an LP is Watching",
    phase: "Operations",
    timeframe: "Ongoing",
    icon: TrendingUp,
    description: "What gets measured gets funded. Track ROI religiously.",
    tactics: [
      "Baseline before implementation",
      "Track time AND cost savings",
      "Monitor quality metrics",
      "Report monthly to leadership"
    ],
    metrics: {
      "Continued Funding": "100%",
      "LP Confidence": "High",
      "Project Success": "87%"
    },
    example: "Dashboard showing $3.2M saved, 10,000 hours freed, 95% accuracy = instant board approval for phase 2.",
    mistakes: [
      "Vague success metrics",
      "Not tracking baseline",
      "Focusing only on cost"
    ]
  },
  {
    id: "vertical-focus",
    title: "Go Deep, Not Wide",
    phase: "Strategy",
    timeframe: "Quarters 2-4",
    icon: Trophy,
    description: "Master one use case completely before moving to the next.",
    tactics: [
      "Pick highest-impact area",
      "Achieve 90%+ automation",
      "Document playbook",
      "Then replicate model"
    ],
    metrics: {
      "Expertise Depth": "10x",
      "Replication Speed": "5x",
      "Total Impact": "3x"
    },
    example: "Perfected invoice processing (95% accuracy), then applied same pattern to contracts, POs, and receipts.",
    mistakes: [
      "Spreading too thin",
      "Abandoning at 70% complete",
      "Not documenting learnings"
    ]
  }
];

const playbooks = [
  {
    title: "The 100-Day AI Sprint",
    description: "From zero to production in 100 days",
    steps: [
      "Days 1-10: Assessment and opportunity mapping",
      "Days 11-30: Pilot selection and data preparation",
      "Days 31-60: Build and test with core team",
      "Days 61-90: Scale to department",
      "Days 91-100: Document and plan expansion"
    ]
  },
  {
    title: "The Portfolio Multiplier",
    description: "Leverage wins across portfolio companies",
    steps: [
      "Implement at flagship company",
      "Extract reusable components",
      "Create implementation playbook",
      "Deploy to similar companies",
      "Share learnings at OP council"
    ]
  },
  {
    title: "The Governance Shield",
    description: "Protect value while moving fast",
    steps: [
      "Establish AI ethics committee",
      "Implement audit logging",
      "Create model cards",
      "Regular bias testing",
      "Quarterly LP reporting"
    ]
  }
];

export default function HowToWinPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-start/5 via-transparent to-brand-end/5" />
        
        <div className="relative container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4">The PE Playbook</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
              How to Win with AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Battle-tested strategies from 100+ portfolio implementations. 
              Learn what works, what doesn't, and how to create lasting value.
            </p>
          </div>

          {/* Success Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="glass-card">
              <CardContent className="pt-6 text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">87%</div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="pt-6 text-center">
                <Target className="w-8 h-8 text-brand-start mx-auto mb-2" />
                <div className="text-2xl font-bold">3 sprints</div>
                <p className="text-sm text-muted-foreground">To First Value</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="pt-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">3.2x</div>
                <p className="text-sm text-muted-foreground">Average ROI</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="pt-6 text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">100+</div>
                <p className="text-sm text-muted-foreground">Implementations</p>
              </CardContent>
            </Card>
          </div>

          {/* Winning Strategies */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Six Strategies That Actually Work</h2>
            <div className="grid gap-6">
              {strategies.map((strategy) => {
                const Icon = strategy.icon;
                return (
                  <Card key={strategy.id} className="glass-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-brand-start/10">
                            <Icon className="w-6 h-6 text-brand-start" />
                          </div>
                          <div>
                            <CardTitle>{strategy.title}</CardTitle>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline">{strategy.phase}</Badge>
                              <Badge variant="outline">{strategy.timeframe}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 font-medium">{strategy.description}</p>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Tactics
                          </h4>
                          <ul className="space-y-1">
                            {strategy.tactics.map((tactic) => (
                              <li key={tactic} className="text-sm text-muted-foreground">
                                • {tactic}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Key Metrics</h4>
                          <div className="space-y-2">
                            {Object.entries(strategy.metrics).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{key}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                            <XCircle className="w-4 h-4 text-red-500" />
                            Common Mistakes
                          </h4>
                          <ul className="space-y-1">
                            {strategy.mistakes.map((mistake) => (
                              <li key={mistake} className="text-sm text-muted-foreground">
                                • {mistake}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-brand-start/5 rounded-lg">
                        <p className="text-sm">
                          <span className="font-semibold">Real Example:</span> {strategy.example}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Implementation Playbooks */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Proven Playbooks</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {playbooks.map((playbook) => (
                <Card key={playbook.title} className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{playbook.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{playbook.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {playbook.steps.map((step, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <span className="font-semibold text-brand-start">{idx + 1}.</span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* The Anti-Patterns */}
          <Card className="glass-card mb-12 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-500" />
                The Anti-Patterns: What NOT to Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-red-500">Strategy Mistakes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">Starting with the hardest problem first</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">Buying technology before defining use cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">Ignoring the middle managers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">Chasing shiny new models</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-red-500">Implementation Mistakes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">No baseline metrics before starting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">Skipping the pilot phase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">Not planning for maintenance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">Forgetting about compliance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Formula */}
          <Card className="glass-card mb-12 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-2xl">The Success Formula</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-3xl font-bold mb-4">
                  <span className="text-muted-foreground">(</span>
                  <span className="text-green-500">Right Problem</span>
                  <span className="text-muted-foreground"> + </span>
                  <span className="text-blue-500">Clean Data</span>
                  <span className="text-muted-foreground"> + </span>
                  <span className="text-yellow-500">User Buy-in</span>
                  <span className="text-muted-foreground">) × </span>
                  <span className="text-brand-start">Iterative Approach</span>
                  <span className="text-muted-foreground"> = </span>
                  <span className="bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">AI Success</span>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Missing any component reduces success probability by 70%. 
                  Get all four right, and success is nearly guaranteed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Win with AI?</h2>
            <p className="text-muted-foreground mb-6">
              Let's build your custom playbook based on your portfolio's specific needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Get Your Custom Playbook
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button size="lg" variant="outline" className="gap-2">
                  See Success Stories
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}