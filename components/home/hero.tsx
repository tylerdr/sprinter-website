"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Zap } from "lucide-react";
import { ImpactMetrics } from "@/components/shared/impact-metrics";
import { HeroBackground } from "./hero-background";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      aria-label="Hero section"
    >
      <HeroBackground />
      
      <div className="absolute inset-0 noise-bg opacity-30" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-card/5 border border-border/10 backdrop-blur-sm mb-6 sm:mb-8"
          >
            <Zap className="w-4 h-4 text-warning" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium">
              Applied AI Since 2018
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            Move at the{" "}
            <span className="gradient-text block sm:inline">Pace of AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            There has never been this much leverage available. AI turns
            workflows into systems and unstructured data into decisions. Early
            movers will be very hard to catch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0"
          >
            <Button asChild variant="gradient" className="px-8 py-4 text-base">
              <Link href="/contact" className="group">
                Work With Us
                <ArrowRight
                  className="ml-1 inline-block w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button asChild variant="glass" className="px-8 py-4 text-base">
              <Link href="/labs" className="group">
                <Cpu
                  className="mr-2 inline-block w-4 h-4 sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
                Explore AI Labs
              </Link>
            </Button>
          </motion.div>

          <ImpactMetrics 
            variant="hero" 
            showAnimation={true}
            className="mt-12 sm:mt-16 md:mt-20 px-2 sm:px-0"
          />
        </motion.div>
      </div>

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        aria-label="Scroll down indicator"
        role="img"
      >
        <div className="w-6 h-10 border-2 border-border/30 rounded-full p-1">
          <div className="w-1 h-2 bg-foreground/50 rounded-full mx-auto animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
