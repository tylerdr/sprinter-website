"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Building2, ChartBar } from "lucide-react";
import Balancer from "react-wrap-balancer";
import { getCurrentVariants } from "@/lib/ab-test-variants";
import { BookDemoButton } from "@/components/shared/book-demo-button";

const stats = [
  { value: "20+", label: "AI Systems Built" },
  { value: "2-4 Weeks", label: "Sprint Duration" },
  { value: "Multi-Agent", label: "Architectures" },
  { value: "Your Stack", label: "We Integrate" },
];

export function PEHero() {
  const variants = getCurrentVariants();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-20"
      aria-label="Private Equity AI Hero"
    >


      {/* Clean gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 dark:from-blue-600/10 dark:via-transparent dark:to-purple-600/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
      </div>
      

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Industry Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
          >
            <Building2 className="w-4 h-4 text-blue-400" aria-hidden="true" />
            <span className="text-sm font-medium text-blue-400">
              Sprint-Based AI Implementation
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
          >
            <span className="block">
              {variants.hero.headline.line1}
            </span>
            <span className="relative block">
              <span className="gradient-text font-bold">
                {variants.hero.headline.line2}
              </span>
              {/* Add subtle shadow for better visibility in dark mode */}
              <span
                className="absolute inset-0 text-foreground/5 font-bold blur-xl -z-10"
                aria-hidden="true"
              >
                {variants.hero.headline.line2}
              </span>
            </span>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            <Balancer>
              {variants.hero.subheadline}
            </Balancer>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6">
              <Link href="/contact" className="group">
                Schedule a Strategy Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/case-studies" className="group">
                <ChartBar className="mr-2 w-5 h-5" aria-hidden="true" />
                See Our Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>

          {/* Method Badge */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="text-sm text-blue-400 mb-16 flex items-center justify-center gap-2"
          >
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            The Sprinter Method™ — Fixed-scope sprints with clear deliverables
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by Family Offices, PE Firms & Strategic Buyers
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
              <span className="font-semibold">Independent Counsel</span>
              <span className="font-semibold">No Vendor Lock-in</span>
              <span className="font-semibold">Practitioners, Not Consultants</span>
            </div>
          </motion.div>

          {/* Live Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl group-hover:blur-2xl transition-all opacity-50" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Value Prop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl border border-border/50"
          >
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">
              {variants.valueProp.headline}
            </p>
            <p className="text-muted-foreground">
              {variants.valueProp.description}
              <br />
              <span className="text-blue-400 font-medium">
                {variants.valueProp.cta}
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}