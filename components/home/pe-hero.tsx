"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Building2, ChartBar, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";

const stats = [
  { value: "40%", label: "of PE firms have AI strategies" },
  { value: "80%", label: "faster due diligence with AI" },
  { value: "3x", label: "more deals found via AI sourcing" },
  { value: "$2.3M", label: "avg. savings per portfolio company" },
];

export function PEHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-20"
      aria-label="Private Equity AI Hero"
    >
      {/* Dynamic gradient following mouse */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, color-mix(in oklch, var(--brand-start) 20%, transparent), transparent 40%)`,
        }}
        aria-hidden="true"
      />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div 
          animate={{
            x: [0, 150, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-15 bg-blue-600"
        />
        <motion.div 
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-15 bg-purple-600"
        />
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

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
              AI Solutions for Private Equity
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
          >
            <Balancer>
              Your Portfolio Companies Need AI.{" "}
              <span className="gradient-text block mt-2">We Make It Happen.</span>
            </Balancer>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            <Balancer>
              From deal sourcing to portfolio optimization. Get enterprise AI capabilities 
              without the overhead. See ROI in weeks, not years.
            </Balancer>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button asChild size="lg" variant="gradient" className="text-base">
              <Link href="/ai-assessment" className="group">
                <ChartBar className="mr-2 w-5 h-5" aria-hidden="true" />
                Get Free AI Readiness Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/ai-sprint" className="group">
                <Sparkles className="mr-2 w-5 h-5" aria-hidden="true" />
                5-Day AI Sprint
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by leading PE firms including
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
              <span className="font-semibold">Vero Capital</span>
              <span className="font-semibold">Rock Hill Capital</span>
              <span className="font-semibold">Mid-Market Leaders</span>
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
              Don't Get Left Behind
            </p>
            <p className="text-muted-foreground">
              While competitors use AI to find deals in minutes, are you still doing it the old way?
              <br />
              <span className="text-blue-400 font-medium">
                Start with a free assessment. Know your opportunities in 24 hours.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}