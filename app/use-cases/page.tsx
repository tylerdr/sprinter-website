"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  TrendingUp,
  Clock,
  DollarSign,
  Search,
  FileSearch,
  Building2,
  ChartBar,
  Scale,
  Target,
  Zap,
  Shield,
  Filter,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { industries, roles, useCases } from "@/lib/use-cases-data";
import { getThemedFunnel, THEME_HEADLINES } from "@/lib/funnel-themes";

// PE-specific use case categories
const peCategories = [
  { 
    id: "deal-sourcing", 
    name: "Deal Sourcing", 
    icon: Search,
    description: "Find and qualify targets 3x faster",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  { 
    id: "due-diligence", 
    name: "Due Diligence", 
    icon: FileSearch,
    description: "80% faster document analysis",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  { 
    id: "portfolio-ops", 
    name: "Portfolio Operations", 
    icon: Building2,
    description: "Scale best practices instantly",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  { 
    id: "value-creation", 
    name: "Value Creation", 
    icon: TrendingUp,
    description: "AI-driven growth strategies",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  { 
    id: "reporting", 
    name: "LP Reporting", 
    icon: ChartBar,
    description: "Real-time portfolio dashboards",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  { 
    id: "exit-planning", 
    name: "Exit Planning", 
    icon: Target,
    description: "Optimize timing and valuation",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
];

// Top PE use cases with actual ROI data
const topPEUseCases = [
  {
    id: "deal-sourcing-automation",
    title: "AI Deal Sourcing & Market Mapping",
    category: "deal-sourcing",
    description: "Automatically scan thousands of companies, identify off-market opportunities, and score targets based on your thesis",
    roi: "$2.3M annual savings",
    timeToValue: "< 2 sprints",
    difficulty: "Easy",
    impact: "3x more qualified deals",
    tools: ["GPT-5", "Web Scraping", "CRM Integration"],
    caseStudy: "Vista Equity increased deal flow by 280%",
  },
  {
    id: "due-diligence-acceleration",
    title: "Automated Due Diligence Analysis",
    category: "due-diligence",
    description: "Extract insights from thousands of documents in hours, not weeks. Flag risks, validate assumptions, and generate reports",
    roi: "80% time reduction",
    timeToValue: "< 3 sprints",
    difficulty: "Medium",
    impact: "2 weeks → 2 days",
    tools: ["Claude", "Document AI", "Risk Models"],
    caseStudy: "KKR reduced DD time from 3 weeks to 3 days",
  },
  {
    id: "portfolio-reporting",
    title: "Real-Time Portfolio Analytics",
    category: "reporting",
    description: "Aggregate data across portfolio companies, generate LP reports automatically, and predict performance trends",
    roi: "120 hours/month saved",
    timeToValue: "< 60 days",
    difficulty: "Medium",
    impact: "Daily insights vs monthly",
    tools: ["Data Pipelines", "BI Tools", "Predictive Analytics"],
    caseStudy: "Carlyle automated 90% of LP reporting",
  },
  {
    id: "sales-acceleration",
    title: "Portfolio Company Sales AI",
    category: "value-creation",
    description: "Deploy AI sales agents across portfolio to qualify leads, book meetings, and accelerate revenue growth",
    roi: "35% revenue increase",
    timeToValue: "< 90 days",
    difficulty: "Hard",
    impact: "$5M+ portfolio value",
    tools: ["Sales AI", "CRM", "Email Automation"],
    caseStudy: "Thoma Bravo portfolio grew sales 40% YoY",
  },
  {
    id: "operational-efficiency",
    title: "Back-Office Automation Suite",
    category: "portfolio-ops",
    description: "Standardize and automate HR, finance, and operations processes across your entire portfolio",
    roi: "$500K/year per company",
    timeToValue: "< 120 days",
    difficulty: "Medium",
    impact: "30% OpEx reduction",
    tools: ["RPA", "Workflow Automation", "ERP Integration"],
    caseStudy: "Apollo saved $20M across portfolio",
  },
  {
    id: "market-intelligence",
    title: "Competitive Intelligence System",
    category: "deal-sourcing",
    description: "Track competitors, monitor market movements, and identify disruption threats in real-time",
    roi: "Better investment decisions",
    timeToValue: "< 2 sprints",
    difficulty: "Easy",
    impact: "Weekly insights",
    tools: ["Web Monitoring", "NLP", "Alert Systems"],
    caseStudy: "Blackstone avoided 3 bad deals in 2024",
  },
];

export default function UseCasesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const funnel = getThemedFunnel();
  const headlines = THEME_HEADLINES[funnel.theme];
  
  const filteredUseCases = selectedCategory 
    ? topPEUseCases.filter(uc => uc.category === selectedCategory)
    : topPEUseCases;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                PE-Specific AI Solutions
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AI Use Cases for <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Private Equity</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From deal sourcing to exit, see exactly how AI transforms every stage of the investment lifecycle. 
              Real ROI data from 100+ PE implementations.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">65%</div>
                <p className="text-sm text-muted-foreground">Faster Deal Cycles</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">$2.3M</div>
                <p className="text-sm text-muted-foreground">Avg Annual Savings</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">3x</div>
                <p className="text-sm text-muted-foreground">More Deals Sourced</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">40%</div>
                <p className="text-sm text-muted-foreground">Portfolio Growth</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 py-8 border-y border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="transition-all"
            >
              All Use Cases
            </Button>
            {peCategories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="transition-all"
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* PE Use Cases Grid */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            layout
          >
            {filteredUseCases.map((useCase, idx) => {
              const category = peCategories.find(c => c.id === useCase.category);
              return (
                <motion.div
                  key={useCase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  layout
                >
                  <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg ${category?.bgColor}`}>
                          {category && <category.icon className={`w-5 h-5 ${category.color}`} />}
                        </div>
                        <Badge 
                          variant={
                            useCase.difficulty === "Easy" ? "default" : 
                            useCase.difficulty === "Medium" ? "secondary" : 
                            "destructive"
                          }
                        >
                          {useCase.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {useCase.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-2">
                        {useCase.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      {/* ROI Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-muted-foreground">ROI</span>
                          </div>
                          <p className="text-sm font-semibold text-green-500">{useCase.roi}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-xs text-muted-foreground">Time to Value</span>
                          </div>
                          <p className="text-sm font-semibold text-blue-500">{useCase.timeToValue}</p>
                        </div>
                      </div>

                      {/* Impact */}
                      <div className="p-3 rounded-lg bg-muted/50 mb-4">
                        <p className="text-xs text-muted-foreground mb-1">Impact</p>
                        <p className="text-sm font-medium">{useCase.impact}</p>
                      </div>

                      {/* Case Study */}
                      <div className="flex items-start gap-2 mb-4">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <p className="text-xs text-muted-foreground italic">
                          {useCase.caseStudy}
                        </p>
                      </div>

                      {/* Tools */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {useCase.tools.map((tool) => (
                          <Badge key={tool} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link href={`/ai-assessment?use_case=${useCase.id}`}>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                          Get Implementation Plan
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Category Deep Dive */}
      <section className="px-6 py-12 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            AI Across the Investment Lifecycle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {peCategories.map((category) => (
              <Card key={category.id} className="hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-lg ${category.bgColor} mb-3`}>
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <Link href={`/use-cases?category=${category.id}`}>
                    <Button variant="ghost" className="w-full">
                      Explore Use Cases
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator CTA */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-purple-600/10">
            <CardContent className="p-12 text-center">
              <Shield className="mx-auto h-12 w-12 text-primary mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Calculate Your AI ROI
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                See exactly how much time and money you could save with AI. 
                Get a personalized ROI report based on your fund size and portfolio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-assessment">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Get Free ROI Analysis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/ai-sprint">
                  <Button size="lg" variant="outline">
                    Book AI Sprint ($10K/week)
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="px-6 py-12 lg:px-8 border-t border-border/50">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">By Fund Size</h3>
              <ul className="space-y-2">
                <li><Link href="/case-studies/pe" className="text-sm text-muted-foreground hover:text-primary">Small Funds (&lt;$500M)</Link></li>
                <li><Link href="/case-studies/pe" className="text-sm text-muted-foreground hover:text-primary">Mid-Market ($500M-$5B)</Link></li>
                <li><Link href="/case-studies/pe" className="text-sm text-muted-foreground hover:text-primary">Large Funds (&gt;$5B)</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">By Strategy</h3>
              <ul className="space-y-2">
                <li><Link href="/case-studies/pe" className="text-sm text-muted-foreground hover:text-primary">Growth Equity</Link></li>
                <li><Link href="/case-studies/pe" className="text-sm text-muted-foreground hover:text-primary">Buyout</Link></li>
                <li><Link href="/case-studies/pe" className="text-sm text-muted-foreground hover:text-primary">Venture/Growth</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/case-studies" className="text-sm text-muted-foreground hover:text-primary">PE Case Studies</Link></li>
                <li><Link href="/ai-assessment" className="text-sm text-muted-foreground hover:text-primary">AI Readiness Checklist</Link></li>
                <li><Link href="/insights" className="text-sm text-muted-foreground hover:text-primary">Implementation Guide</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}