"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import { ImpactMetrics } from "@/components/shared/impact-metrics";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";

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
      {/* Mouse-following gradient */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, color-mix(in oklch, var(--brand-start) 15%, transparent), transparent 40%)`,
        }}
        aria-hidden="true"
      />

      {/* Click ripples */}
      {clickRipples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 400, height: 400, opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            left: ripple.x - 200,
            top: ripple.y - 200,
            background: `radial-gradient(circle, color-mix(in oklch, var(--brand-start) 30%, transparent), transparent)`,
            borderRadius: "50%",
          }}
        />
      ))}

      {/* Floating particles */}
      <div className="absolute inset-0" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand/20 rounded-full"
            initial={{ 
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%` 
            }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 bg-brand-10"
        />
        <motion.div 
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-20 right-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 bg-brand-10"
        />
      </div>
      
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