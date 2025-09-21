"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import { ImpactMetrics } from "@/components/shared/impact-metrics";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import { COPY } from "@/lib/copy-config";
import Hyperspeed from "@/components/Hyperspeed";
import BlurText from "@/components/BlurText";
import ShinyText from "@/components/ShinyText";
import StarBorder from "@/components/StarBorder";

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
      {/* Hyperspeed Background */}
      <div className="absolute inset-0">
        <Hyperspeed
          className="absolute inset-0"
          effectOptions={{
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 15,
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0x131313,
              brokenLines: 0x131313,
              leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
              rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
              sticks: 0x03b3c3
            }
          }}
        />
      </div>

      {/* Dark gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90 z-10" />

      {/* Subtle spotlight effect that follows the mouse */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-500 pointer-events-none z-15"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05), transparent 40%)`,
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

      <div className="container mx-auto px-4 sm:px-6 relative z-20">
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
              {COPY.hero.badge}
            </span>
          </motion.div>

          <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
            <BlurText
              text={COPY.hero.headline.line1}
              animateBy="words"
              direction="top"
              delay={0.3}
              className="inline"
            />
            {" "}
            <BlurText
              text={COPY.hero.headline.line2}
              animateBy="words"
              direction="bottom"
              delay={0.5}
              className="gradient-text block sm:inline"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0 font-normal"
          >
            <Balancer>
              {COPY.hero.subheadline}
            </Balancer>
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0 mb-12 sm:mb-16"
          >
            <StarBorder
              as={Link}
              href="/labs/opportunity-audit"
              className="group"
              color="hsl(var(--primary))"
              speed="3s"
            >
              <div className="flex items-center">
                <Sparkles
                  className="mr-2 inline-block w-4 h-4 sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
                <ShinyText text={COPY.hero.cta.primary} />
                <ArrowRight
                  className="ml-1 inline-block w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </div>
            </StarBorder>
            <Button asChild variant="glass" className="px-8 py-4 text-base">
              <Link href="/contact" className="group">
                {COPY.hero.cta.secondary}
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