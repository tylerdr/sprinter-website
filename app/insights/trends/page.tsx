import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Sparkles, Brain, Zap, ArrowRight, Target, Shield, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Trends 2025: What PE Firms Need to Know | Sprinter AI",
  description: "Critical AI trends shaping private equity portfolios in 2025. From agentic AI to vertical solutions, understand what's driving value creation.",
};

const trends = [
  {
    id: "agentic-ai",
    title: "Agentic AI Takes Over Operations",
    category: "Breakthrough",
    impact: "Critical",
    timeline: "Now",
    icon: Brain,
    description: "AI agents are moving from demos to production, handling complete workflows autonomously.",
    keyPoints: [
      "60% of repetitive tasks automated by Q2 2025",
      "Multi-agent systems coordinating complex processes",
      "Human-in-the-loop becoming human-on-the-loop",
      "ROI measured in weeks, not quarters"
    ],
    portfolioAction: "Deploy agent pilots in finance and operations immediately",
    examples: ["AP processing agents", "Customer service automation", "Supply chain coordination"],
    metrics: { "Adoption Rate": "73%", "Cost Reduction": "45%", "Time to Value": "30 days" }
  },
  {
    id: "vertical-solutions",
    title: "Vertical AI Solutions Dominate",
    category: "Market Shift",
    impact: "High",
    timeline: "6 months",
    icon: Target,
    description: "Industry-specific AI solutions outperform generic tools by 3x on key metrics.",
    keyPoints: [
      "Pre-trained on industry data and workflows",
      "Compliance and regulations built-in",
      "10x faster deployment than custom builds",
      "Lower total cost of ownership"
    ],
    portfolioAction: "Prioritize vertical solutions over horizontal platforms",
    examples: ["Manufacturing MES AI", "Healthcare diagnostic AI", "Legal contract analysis"],
    metrics: { "Performance Gain": "3x", "Implementation": "75% faster", "Accuracy": "95%" }
  },
  {
    id: "small-models",
    title: "Small Models, Big Impact",
    category: "Technology",
    impact: "High",
    timeline: "Now",
    icon: Zap,
    description: "Sub-10B parameter models delivering GPT-4 performance at 1/100th the cost.",
    keyPoints: [
      "Edge deployment enabling real-time processing",
      "99% cost reduction for inference",
      "Privacy-preserving on-device AI",
      "Specialized models beating general purpose"
    ],
    portfolioAction: "Migrate high-volume tasks to small models",
    examples: ["Phi-3 for edge", "Mixtral for efficiency", "Custom fine-tuned models"],
    metrics: { "Cost Savings": "99%", "Latency": "<20ms", "Deployment": "Any device" }
  },
  {
    id: "ai-governance",
    title: "Governance Becomes Non-Negotiable",
    category: "Compliance",
    impact: "Critical",
    timeline: "Q1 2025",
    icon: Shield,
    description: "LPs demanding comprehensive AI governance frameworks and audit trails.",
    keyPoints: [
      "EU AI Act enforcement begins March 2025",
      "SOC 2 eligible providers becoming baseline requirement",
      "Explainability requirements increasing",
      "Board-level AI committees forming"
    ],
    portfolioAction: "Implement governance framework before Q2 2025",
    examples: ["AI ethics boards", "Model cards", "Bias audits", "Decision logs"],
    metrics: { "LP Requirements": "87%", "Regulatory Risk": "High", "Compliance Cost": "+15%" }
  },
  {
    id: "multimodal-native",
    title: "Multimodal Becomes Default",
    category: "Technology",
    impact: "Medium",
    timeline: "6-12 months",
    icon: Globe,
    description: "Text-only AI is dead. Every model now handles text, images, video, and audio natively.",
    keyPoints: [
      "Single API for all modalities",
      "Context switching eliminated",
      "Richer understanding of business data",
      "New use cases previously impossible"
    ],
    portfolioAction: "Upgrade to multimodal models for customer-facing applications",
    examples: ["Product inspection AI", "Meeting summarization", "Visual search"],
    metrics: { "Capability Increase": "5x", "User Satisfaction": "+40%", "Use Cases": "+200%" }
  },
  {
    id: "rag-mainstream",
    title: "RAG Becomes Table Stakes",
    category: "Architecture",
    impact: "High",
    timeline: "Now",
    icon: Sparkles,
    description: "Retrieval-Augmented Generation is now the default architecture for enterprise AI.",
    keyPoints: [
      "Eliminates hallucinations in production",
      "Enables real-time knowledge updates",
      "Reduces model size requirements",
      "Improves accuracy by 40%"
    ],
    portfolioAction: "Implement RAG for all knowledge-intensive applications",
    examples: ["Customer support", "Technical documentation", "Compliance Q&A"],
    metrics: { "Accuracy": "+40%", "Hallucination": "-95%", "Update Speed": "Real-time" }
  },
  {
    id: "ai-employees",
    title: "AI Employees Join the Workforce",
    category: "Workforce",
    impact: "Transformative",
    timeline: "12-18 months",
    icon: Users,
    description: "AI agents with employee-like persistence, memory, and accountability.",
    keyPoints: [
      "Assigned to teams like human employees",
      "Performance reviews and KPIs",
      "Cross-functional collaboration",
      "24/7 availability with no burnout"
    ],
    portfolioAction: "Start with AI employees in back-office functions",
    examples: ["AI analyst", "AI project manager", "AI QA tester"],
    metrics: { "Productivity": "+250%", "Cost per FTE": "-90%", "Availability": "24/7" }
  },
  {
    id: "real-time-ai",
    title: "Real-Time AI Everything",
    category: "Performance",
    impact: "Medium",
    timeline: "Now",
    icon: Zap,
    description: "Sub-100ms inference enabling entirely new categories of applications.",
    keyPoints: [
      "Voice AI indistinguishable from humans",
      "Real-time translation and transcription",
      "Instant visual analysis",
      "Live process optimization"
    ],
    portfolioAction: "Identify time-sensitive processes for real-time AI upgrade",
    examples: ["Customer calls", "Quality inspection", "Trading decisions"],
    metrics: { "Latency": "<100ms", "Throughput": "10x", "User Experience": "+60%" }
  },
  {
    id: "data-quality",
    title: "Data Quality Crisis",
    category: "Challenge",
    impact: "High",
    timeline: "Ongoing",
    icon: Target,
    description: "80% of AI failures traced to poor data quality, not model limitations.",
    keyPoints: [
      "Garbage in, garbage out at scale",
      "Data governance becoming critical",
      "Synthetic data filling gaps",
      "Data contracts between systems"
    ],
    portfolioAction: "Invest in data quality before AI implementation",
    examples: ["Master data management", "Data observability", "Quality monitoring"],
    metrics: { "Failure Rate": "80%", "Quality Investment": "+50%", "ROI Impact": "3x" }
  },
  {
    id: "cost-collapse",
    title: "AI Costs Collapse 90%",
    category: "Economics",
    impact: "High",
    timeline: "Now",
    icon: TrendingUp,
    description: "Dramatic cost reductions making AI accessible for every business process.",
    keyPoints: [
      "GPT-4 level performance at GPT-3 prices",
      "Open source matching commercial quality",
      "Inference optimization techniques",
      "Commoditization of foundation models"
    ],
    portfolioAction: "Revisit previously uneconomical AI use cases",
    examples: ["Document processing", "Code review", "Content generation"],
    metrics: { "Cost Reduction": "90%", "Performance": "Same", "Accessibility": "Universal" }
  }
];

export default function AITrendsPage() {
  const criticalTrends = trends.filter(t => t.impact === "Critical");
  const highImpactTrends = trends.filter(t => t.impact === "High");
  const otherTrends = trends.filter(t => t.impact === "Medium" || t.impact === "Transformative");

  return (
    <div className="spr-theme spr-page min-h-screen">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-start/5 via-transparent to-brand-end/5" />
        
        <div className="relative container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4">2025 Trend Report</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
              AI Trends Reshaping Private Equity
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The AI landscape is evolving at breakneck speed. These are the trends that will separate 
              winners from losers in your portfolio.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-brand-start">87%</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Of PE firms actively deploying AI
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-500">3.2x</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Average ROI from AI initiatives
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-yellow-500">45 days</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Average time to first value
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-red-500">$2.3T</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Market opportunity by 2030
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Critical Trends */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-500" />
              Critical: Act Now
            </h2>
            <div className="grid gap-6">
              {criticalTrends.map((trend) => {
                const Icon = trend.icon;
                return (
                  <Card key={trend.id} className="glass-card border-red-500/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-red-500/10">
                            <Icon className="w-6 h-6 text-red-500" />
                          </div>
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {trend.title}
                              <Badge variant="destructive">Critical</Badge>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">Timeline: {trend.timeline}</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{trend.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">Key Points:</p>
                        <ul className="space-y-1">
                          {trend.keyPoints.map((point) => (
                            <li key={point} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-green-500 mt-0.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                        <p className="text-sm font-semibold mb-1">Portfolio Action Required:</p>
                        <p className="text-sm">{trend.portfolioAction}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* High Impact Trends */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-yellow-500" />
              High Impact Trends
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {highImpactTrends.map((trend) => {
                const Icon = trend.icon;
                return (
                  <Card key={trend.id} className="glass-card">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-yellow-500/10">
                          <Icon className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{trend.title}</CardTitle>
                          <p className="text-xs text-muted-foreground">Timeline: {trend.timeline}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">{trend.description}</p>
                      
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {Object.entries(trend.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-2 bg-card/50 rounded">
                            <p className="text-xs text-muted-foreground">{key}</p>
                            <p className="text-sm font-semibold">{value}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-yellow-500/5 rounded-lg">
                        <p className="text-xs font-semibold mb-1">Action:</p>
                        <p className="text-xs">{trend.portfolioAction}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Emerging Trends */}
          <Card className="glass-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Emerging Trends to Watch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {otherTrends.map((trend) => (
                  <div key={trend.id} className="flex items-start gap-3">
                    <div className="p-2 rounded bg-card">
                      <trend.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{trend.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{trend.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {trend.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {trend.timeline}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trend Radar */}
          <Card className="glass-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">2025 AI Trend Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-green-500">Adopt Now</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Agentic AI for operations</li>
                    <li>• RAG architectures</li>
                    <li>• Small specialized models</li>
                    <li>• Real-time inference</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-yellow-500">Trial in Q2</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• AI employees</li>
                    <li>• Multimodal applications</li>
                    <li>• Vertical AI solutions</li>
                    <li>• Voice AI interfaces</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-blue-500">Assess for 2026</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Quantum-AI hybrid</li>
                    <li>• Neuromorphic computing</li>
                    <li>• AGI capabilities</li>
                    <li>• Brain-computer interfaces</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Ahead of the AI Curve</h2>
            <p className="text-muted-foreground mb-6">
              Get our monthly AI trends report delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Subscribe to Trends Report
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/insights/how-to-win">
                <Button size="lg" variant="outline" className="gap-2">
                  Learn How to Win with AI
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