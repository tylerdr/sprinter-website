import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu, Brain, Code2, Layers, Sparkles, ArrowRight, TrendingUp, Zap, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Software 3.0: The AI-Native Future | Sprinter AI",
  description: "Understanding the paradigm shift from traditional software to AI-native applications. How Software 3.0 is reshaping enterprise technology.",
};

const eras = [
  {
    version: "1.0",
    name: "Classical Programming",
    period: "1950s-2000s",
    icon: Code2,
    characteristics: [
      "Explicit rules and logic",
      "Deterministic outputs",
      "Manual feature engineering",
      "Limited adaptability"
    ],
    examples: ["ERP systems", "Databases", "Operating systems"],
    color: "text-gray-500"
  },
  {
    version: "2.0",
    name: "Statistical Learning",
    period: "2000s-2020s",
    icon: Cpu,
    characteristics: [
      "Machine learning models",
      "Data-driven decisions",
      "Pattern recognition",
      "Requires training data"
    ],
    examples: ["Recommendation engines", "Fraud detection", "Search algorithms"],
    color: "text-blue-500"
  },
  {
    version: "3.0",
    name: "AI-Native",
    period: "2020s-Present",
    icon: Brain,
    characteristics: [
      "Natural language interfaces",
      "Self-improving systems",
      "Contextual understanding",
      "Emergent capabilities"
    ],
    examples: ["Autonomous agents", "Generative AI", "Adaptive workflows"],
    color: "text-brand-start"
  }
];

const principles = [
  {
    title: "AI-First Architecture",
    description: "Every component designed around AI capabilities from day one",
    impact: "10x productivity gains",
    examples: [
      "Natural language as primary interface",
      "Semantic search by default",
      "Automatic data extraction",
      "Self-documenting code"
    ]
  },
  {
    title: "Probabilistic Computing",
    description: "Embracing uncertainty and working with probabilities",
    impact: "Handles real-world complexity",
    examples: [
      "Confidence scores on outputs",
      "Multiple solution generation",
      "Fuzzy matching capabilities",
      "Graceful degradation"
    ]
  },
  {
    title: "Continuous Learning",
    description: "Systems that improve with every interaction",
    impact: "Compounds value over time",
    examples: [
      "User feedback loops",
      "Automatic model updates",
      "Personalization at scale",
      "Domain adaptation"
    ]
  },
  {
    title: "Composable Intelligence",
    description: "Modular AI components that combine dynamically",
    impact: "Infinite customization",
    examples: [
      "Agent orchestration",
      "Tool-using AI",
      "Multi-model pipelines",
      "Skill composition"
    ]
  }
];

const transformations = [
  {
    category: "User Interfaces",
    before: "Forms, buttons, menus",
    after: "Natural conversation",
    icon: Users,
    example: "Instead of navigating complex ERP menus, users simply ask 'Show me last month's revenue by region'"
  },
  {
    category: "Data Processing",
    before: "ETL pipelines, schemas",
    after: "Semantic understanding",
    icon: Layers,
    example: "AI automatically understands and integrates data from any source without predefined mappings"
  },
  {
    category: "Business Logic",
    before: "Hard-coded rules",
    after: "Learned behaviors",
    icon: Brain,
    example: "Approval workflows that adapt based on outcomes rather than fixed if-then rules"
  },
  {
    category: "Integration",
    before: "APIs and connectors",
    after: "Universal translators",
    icon: Globe,
    example: "AI agents that can interact with any system through natural interfaces"
  },
  {
    category: "Development",
    before: "Writing code",
    after: "Describing intent",
    icon: Sparkles,
    example: "Developers describe what they want, AI generates and maintains the implementation"
  }
];

const opportunities = [
  {
    sector: "Enterprise Software",
    potential: "$500B",
    disruption: "High",
    timeline: "2-3 years",
    opportunities: [
      "AI-native ERP",
      "Autonomous CRM",
      "Self-managing databases",
      "Intelligent middleware"
    ]
  },
  {
    sector: "Developer Tools",
    potential: "$100B",
    disruption: "Extreme",
    timeline: "Now",
    opportunities: [
      "AI pair programmers",
      "Automatic testing",
      "Code generation",
      "Bug prediction"
    ]
  },
  {
    sector: "Business Intelligence",
    potential: "$200B",
    disruption: "High",
    timeline: "1-2 years",
    opportunities: [
      "Natural language analytics",
      "Predictive insights",
      "Automated reporting",
      "Anomaly detection"
    ]
  },
  {
    sector: "Cybersecurity",
    potential: "$300B",
    disruption: "Medium",
    timeline: "2-3 years",
    opportunities: [
      "Adaptive defense",
      "Threat prediction",
      "Automated response",
      "Behavioral analysis"
    ]
  }
];

export default function Software3Page() {
  return (
    <div className="spr-theme spr-page min-h-screen">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-start/5 via-transparent to-brand-end/5" />
        
        <div className="relative container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4">The Next Paradigm</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
              Software 3.0: The AI-Native Era
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're witnessing the biggest shift in software since the internet. 
              Traditional applications are being rebuilt from the ground up with AI at their core.
            </p>
          </div>

          {/* Evolution Timeline */}
          <Card className="glass-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">The Evolution of Software</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {eras.map((era) => {
                  const Icon = era.icon;
                  return (
                    <div key={era.version} className="relative">
                      <div className="text-center mb-4">
                        <div className={`inline-flex p-4 rounded-full bg-gradient-to-br from-${era.color}/10 to-${era.color}/5 mb-3`}>
                          <Icon className={`w-8 h-8 ${era.color}`} />
                        </div>
                        <h3 className="text-xl font-bold mb-1">Software {era.version}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{era.name}</p>
                        <Badge variant="outline" className="text-xs">{era.period}</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-semibold mb-2">Characteristics:</p>
                          <ul className="space-y-1">
                            {era.characteristics.map((char) => (
                              <li key={char} className="text-xs text-muted-foreground">
                                • {char}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-xs font-semibold mb-2">Examples:</p>
                          <div className="flex flex-wrap gap-1">
                            {era.examples.map((ex) => (
                              <Badge key={ex} variant="secondary" className="text-xs">
                                {ex}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {era.version !== "3.0" && (
                        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden md:block">
                          <ArrowRight className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Core Principles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Core Principles of Software 3.0</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((principle) => (
                <Card key={principle.title} className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      {principle.title}
                      <Badge className="bg-green-500/10 text-green-500">
                        {principle.impact}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {principle.description}
                    </p>
                    <div className="space-y-1">
                      {principle.examples.map((example) => (
                        <div key={example} className="flex items-start gap-2">
                          <Sparkles className="w-3 h-3 text-brand-start mt-0.5" />
                          <span className="text-xs">{example}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Transformation Matrix */}
          <Card className="glass-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">The Great Transformation</CardTitle>
              <p className="text-muted-foreground">How every aspect of software is being reimagined</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {transformations.map((transform) => {
                  const Icon = transform.icon;
                  return (
                    <div key={transform.category} className="grid md:grid-cols-4 gap-4 items-center p-4 bg-card/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-brand-start" />
                        <span className="font-semibold">{transform.category}</span>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Before</p>
                        <p className="text-sm">{transform.before}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">After</p>
                        <p className="text-sm font-semibold text-brand-start">{transform.after}</p>
                      </div>
                      
                      <div className="md:col-span-4 mt-2 p-3 bg-brand-start/5 rounded">
                        <p className="text-xs">
                          <span className="font-semibold">Example:</span> {transform.example}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Market Opportunities */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Market Opportunities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {opportunities.map((opp) => (
                <Card key={opp.sector} className="glass-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{opp.sector}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{opp.timeline}</Badge>
                          <Badge 
                            variant="outline"
                            className={
                              opp.disruption === "Extreme" ? "text-red-500" :
                              opp.disruption === "High" ? "text-yellow-500" :
                              "text-blue-500"
                            }
                          >
                            {opp.disruption} Disruption
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-500">{opp.potential}</p>
                        <p className="text-xs text-muted-foreground">Market Size</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold mb-2">Key Opportunities:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {opp.opportunities.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <Zap className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Implementation Roadmap */}
          <Card className="glass-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Your Software 3.0 Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-start/20 flex items-center justify-center">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Identify AI-Native Opportunities (Months 1-2)</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Audit existing software stack for replacement candidates
                    </p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• High-friction user interfaces</li>
                      <li>• Manual data processing workflows</li>
                      <li>• Rule-based decision systems</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-start/20 flex items-center justify-center">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Pilot AI-Native Solutions (Months 3-4)</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Start with low-risk, high-impact applications
                    </p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Natural language interfaces for existing tools</li>
                      <li>• AI-powered data extraction and processing</li>
                      <li>• Intelligent automation pilots</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-start/20 flex items-center justify-center">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Scale and Integrate (Months 5-8)</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Expand successful pilots across the organization
                    </p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Deploy AI agents for routine tasks</li>
                      <li>• Implement semantic search across all data</li>
                      <li>• Build AI-first workflows</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-start/20 flex items-center justify-center">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Transform Core Systems (Months 9-12)</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Replace legacy systems with AI-native alternatives
                    </p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Migrate to AI-native platforms</li>
                      <li>• Implement continuous learning loops</li>
                      <li>• Achieve full workflow automation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implications */}
          <Card className="glass-card mb-12 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-2xl">What This Means for PE Portfolios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-green-500">Opportunities</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm">10x productivity gains possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm">First-mover advantage in each vertical</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm">Dramatic cost structure improvements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm">New revenue streams from AI products</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-yellow-500">Risks</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm">Legacy software becoming obsolete</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm">Competitive disruption from AI-native startups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm">Technical debt from halfway measures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm">Skills gap in AI-native development</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-brand-start/5 rounded-lg">
                <p className="font-semibold mb-2">The Bottom Line:</p>
                <p className="text-sm">
                  Every software company in your portfolio needs a Software 3.0 strategy by 2026, 
                  or they risk becoming the Blockbuster to someone else's Netflix.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready for the Software 3.0 Revolution?</h2>
            <p className="text-muted-foreground mb-6">
              Let's assess your portfolio's readiness and build your transformation strategy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Get Software 3.0 Assessment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/insights/ai-models">
                <Button size="lg" variant="outline" className="gap-2">
                  Explore AI Models
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