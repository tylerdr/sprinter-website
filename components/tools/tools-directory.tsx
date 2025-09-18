"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Calculator, DollarSign, FileText, Brain, Workflow, Search,
  ChartBar, TrendingUp, Users, Building, Shield, Clock,
  ArrowRight, Sparkles, Zap, Target, BarChart3
} from "lucide-react";

const tools = [
  {
    category: "Financial Calculators",
    icon: Calculator,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    tools: [
      {
        name: "AP Automation ROI",
        description: "Calculate savings from accounts payable automation",
        icon: DollarSign,
        href: "/tools/ap-calculator",
        metrics: "60% touchless rate",
        status: "live"
      },
      {
        name: "Quote Estimator",
        description: "Estimate project costs with AI assistance",
        icon: FileText,
        href: "/tools/quote-estimator",
        metrics: "42% faster quotes",
        status: "live"
      },
      {
        name: "DSCR Calculator",
        description: "Debt service coverage ratio analysis",
        icon: TrendingUp,
        href: "/tools/dscr-calculator",
        metrics: "Instant analysis",
        status: "coming-soon"
      },
      {
        name: "Working Capital Optimizer",
        description: "Optimize cash flow and working capital",
        icon: BarChart3,
        href: "/tools/working-capital",
        metrics: "31% improvement",
        status: "coming-soon"
      }
    ]
  },
  {
    category: "Workflow Automation",
    icon: Workflow,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    tools: [
      {
        name: "Process Builder",
        description: "Build automated workflows without code",
        icon: Workflow,
        href: "/tools/process-builder",
        metrics: "No-code automation",
        status: "coming-soon"
      },
      {
        name: "Document Processor",
        description: "Extract and process document data",
        icon: FileText,
        href: "/tools/document-processor",
        metrics: "95% accuracy",
        status: "coming-soon"
      },
      {
        name: "Email Automation",
        description: "Automate email responses and routing",
        icon: Users,
        href: "/tools/email-automation",
        metrics: "24/7 response",
        status: "coming-soon"
      }
    ]
  },
  {
    category: "AI Analysis",
    icon: Brain,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    tools: [
      {
        name: "Data Analyzer",
        description: "AI-powered data analysis and insights",
        icon: ChartBar,
        href: "/tools/data-analyzer",
        metrics: "Real-time insights",
        status: "coming-soon"
      },
      {
        name: "Sentiment Analyzer",
        description: "Analyze customer sentiment from text",
        icon: Target,
        href: "/tools/sentiment",
        metrics: "Multi-language",
        status: "coming-soon"
      },
      {
        name: "Competitive Intelligence",
        description: "Track competitor activities and trends",
        icon: Search,
        href: "/tools/competitive",
        metrics: "Daily updates",
        status: "coming-soon"
      }
    ]
  },
  {
    category: "Document Generation",
    icon: FileText,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    tools: [
      {
        name: "Proposal Generator",
        description: "Create professional proposals instantly",
        icon: FileText,
        href: "/tools/proposal-gen",
        metrics: "10x faster",
        status: "coming-soon"
      },
      {
        name: "Contract Builder",
        description: "Generate contracts with AI assistance",
        icon: Shield,
        href: "/tools/contract-builder",
        metrics: "Legal-ready",
        status: "coming-soon"
      },
      {
        name: "Report Builder",
        description: "Create executive reports automatically",
        icon: BarChart3,
        href: "/tools/report-builder",
        metrics: "Auto-generated",
        status: "coming-soon"
      }
    ]
  }
];

export function ToolsDirectory() {
  return (
    <section id="tools" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            AI Tools for Every Business Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Production-ready tools built on the AI Sprinter Platform.
            Start with templates, customize as needed.
          </p>
        </motion.div>

        <div className="space-y-12">
          {tools.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                    <CategoryIcon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <h3 className="text-2xl font-semibold">{category.category}</h3>
                  <Badge variant="secondary" className="ml-auto">
                    {category.tools.length} tools
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool, toolIndex) => {
                    const ToolIcon = tool.icon;
                    return (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 + toolIndex * 0.05 }}
                      >
                        <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-all group relative">
                          {tool.status === "coming-soon" && (
                            <Badge className="absolute -top-2 -right-2 bg-purple-500">
                              Coming Soon
                            </Badge>
                          )}

                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <ToolIcon className="w-6 h-6 text-blue-500" />
                            </div>
                            {tool.status === "live" && (
                              <Sparkles className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>

                          <h4 className="text-lg font-semibold mb-2">{tool.name}</h4>
                          <p className="text-muted-foreground text-sm mb-4 flex-1">
                            {tool.description}
                          </p>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t">
                            <span className="text-sm font-medium text-green-600">
                              {tool.metrics}
                            </span>

                            {tool.status === "live" ? (
                              <Button asChild size="sm" variant="ghost" className="group/btn">
                                <Link href={tool.href}>
                                  Try Now
                                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                              </Button>
                            ) : (
                              <Button size="sm" variant="ghost" disabled>
                                <Clock className="mr-2 w-4 h-4" />
                                Soon
                              </Button>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <Zap className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3">
              Need a Custom Tool?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We can build custom AI tools for your specific needs.
              From ideation to production in 10 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Build Custom Tool
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/ai-sprint">
                  Learn About AI Sprints
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}