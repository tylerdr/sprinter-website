"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import { ImpactMetrics } from "@/components/shared/impact-metrics";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import { AnimatedGradientBackground } from "./animated-gradient-background";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickRipples, setClickRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleClick = (e: MouseEvent) => {
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setClickRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setClickRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      aria-label="Hero section"
    >
      {/* New Animated Gradient Background */}
      <AnimatedGradientBackground />

      {/* Mouse-following spotlight effect */}
      <div
        className="absolute inset-0 opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb), 0.1), transparent 40%)`,
        }}
        aria-hidden="true"
      />

      {/* Click ripples */}
      {clickRipples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0.3 }}
          animate={{ width: 600, height: 600, opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            left: ripple.x - 300,
            top: ripple.y - 300,
            background: `radial-gradient(circle, rgba(var(--primary-rgb), 0.2), transparent 60%)`,
            borderRadius: "50%",
          }}
        />
      ))}
      
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
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-card/20 border border-border/30 backdrop-blur-sm mb-6 sm:mb-8"
          >
            <Zap className="w-4 h-4 text-warning" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium">
              Real AI in Production • Not Just Another Deck
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight"
          >
            <Balancer>
              Build at the{" "}
              <span className="gradient-text block sm:inline">pace of AI</span>
            </Balancer>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0 font-normal"
          >
            <Balancer>
              Ship a working prototype in 10 days. Go live in 4 weeks. Your team stays in control while AI handles the repetitive.
            </Balancer>
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0 mb-12 sm:mb-16"
          >
            <Button asChild variant="gradient" className="px-8 py-4 text-base">
              <Link href="/labs/opportunity-audit" className="group">
                <Sparkles
                  className="mr-2 inline-block w-4 h-4 sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
                Get an AI Opportunity Audit
                <ArrowRight
                  className="ml-1 inline-block w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button asChild variant="glass" className="px-8 py-4 text-base">
              <Link href="/contact" className="group">
                Start a 10-Day Sprint
              </Link>
            </Button>
          </motion.div>

          <ImpactMetrics 
            variant="hero" 
            showAnimation={true}
            className="px-2 sm:px-0"
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