"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Bot, 
  Brain, 
  Workflow, 
  FileSearch, 
  ArrowRight,
  Zap,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredLabs = [
  {
    title: "AI Opportunity Audit",
    description: "Get a personalized report on AI opportunities in your business",
    icon: FileSearch,
    href: "/labs/opportunity-audit",
    badge: "Most Popular",
    color: "text-blue-500",
    bgGradient: "from-blue-500/10 to-blue-600/5"
  },
  {
    title: "Agent Simulator",
    description: "Watch autonomous AI agents collaborate to solve complex problems",
    icon: Bot,
    href: "/labs/agent-simulator",
    badge: "Live Demo",
    color: "text-purple-500",
    bgGradient: "from-purple-500/10 to-purple-600/5"
  },
  {
    title: "Workflow Designer",
    description: "Build and visualize multi-agent AI workflows in real-time",
    icon: Workflow,
    href: "/labs/workflow-tool",
    badge: "Interactive",
    color: "text-green-500",
    bgGradient: "from-green-500/10 to-green-600/5"
  },
  {
    title: "Ideation Engine",
    description: "Generate and evaluate business ideas with AI brainstorming",
    icon: Brain,
    href: "/labs/ideation",
    badge: "Creative",
    color: "text-orange-500",
    bgGradient: "from-orange-500/10 to-orange-600/5"
  }
];

export function LabsPreview() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI Labs
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Experience <span className="gradient-text">Agentic AI</span> in Action
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Interactive demos showcasing autonomous AI agents, workflow automation, and intelligent collaboration. 
            See what&apos;s possible when AI works for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/labs">
              <Button size="lg" className="gap-2">
                <Play className="w-4 h-4" />
                Explore All Labs
              </Button>
            </Link>
            <Link href="/labs/opportunity-audit">
              <Button size="lg" variant="outline" className="gap-2">
                <Zap className="w-4 h-4" />
                Get Your AI Audit
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredLabs.map((lab, index) => (
            <motion.div
              key={lab.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={lab.href}>
                <Card className="h-full hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${lab.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-2">
                      <div className={`p-2 rounded-lg bg-card border ${lab.color}`}>
                        <lab.icon className={`w-5 h-5 ${lab.color}`} />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {lab.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {lab.title}
                    </CardTitle>
                    <CardDescription>
                      {lab.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Try it now</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">20+ interactive demos</span> • No sign-up required • 
            Experience the future of AI automation
          </p>
        </motion.div>
      </div>
    </section>
  );
}