"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Calculator, Brain, Workflow, ChartBar, FileText, Search } from "lucide-react";
import Link from "next/link";

export function ToolsPlatformHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/20 via-background to-background" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">
              AI Sprinter Platform
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            AI Tools That <span className="gradient-text">Actually Work</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Production-ready AI tools for business automation.
            No setup required. Just instant value.
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-card/50 backdrop-blur border rounded-lg p-3 text-left"
            >
              <Calculator className="w-5 h-5 text-blue-500 mb-2" />
              <div className="text-sm font-medium">Financial Tools</div>
              <div className="text-xs text-muted-foreground">ROI & cost calculators</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-card/50 backdrop-blur border rounded-lg p-3 text-left"
            >
              <Workflow className="w-5 h-5 text-purple-500 mb-2" />
              <div className="text-sm font-medium">Workflow Builders</div>
              <div className="text-xs text-muted-foreground">Process automation</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-card/50 backdrop-blur border rounded-lg p-3 text-left"
            >
              <Brain className="w-5 h-5 text-green-500 mb-2" />
              <div className="text-sm font-medium">AI Analyzers</div>
              <div className="text-xs text-muted-foreground">Smart insights</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-card/50 backdrop-blur border rounded-lg p-3 text-left"
            >
              <FileText className="w-5 h-5 text-orange-500 mb-2" />
              <div className="text-sm font-medium">Doc Generators</div>
              <div className="text-xs text-muted-foreground">Instant documents</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-card/50 backdrop-blur border rounded-lg p-3 text-left"
            >
              <ChartBar className="w-5 h-5 text-red-500 mb-2" />
              <div className="text-sm font-medium">Data Tools</div>
              <div className="text-xs text-muted-foreground">Analysis & reports</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-card/50 backdrop-blur border rounded-lg p-3 text-left"
            >
              <Search className="w-5 h-5 text-indigo-500 mb-2" />
              <div className="text-sm font-medium">Search Tools</div>
              <div className="text-xs text-muted-foreground">AI-powered search</div>
            </motion.div>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Link href="#tools">
                Explore Tools
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                Build Custom Tool
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}