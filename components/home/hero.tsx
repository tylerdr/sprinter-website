"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Cpu, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero section">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 noise-bg" aria-hidden="true" />
      
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
      </div>

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
            <Zap className="w-4 h-4 text-yellow-500" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium">Human-Centered AI Since 2018</span>
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
            We build AI that handles repetitive tasks so people can focus on meaningful work. 
            Your team deserves to do what they love, not what machines can do better.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all hover:scale-105 text-sm sm:text-base touch-manipulation min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background"
            >
              Work With Us
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <Link
              href="/labs"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-card/10 backdrop-blur-sm text-foreground font-semibold rounded-lg border border-border/20 hover:bg-card/20 transition-all hover:scale-105 text-sm sm:text-base touch-manipulation min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background"
            >
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              Explore AI Labs
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto px-2 sm:px-0"
            role="group"
            aria-label="Company statistics"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text" aria-label="100K plus">100K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 leading-tight">Hours Reclaimed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text" aria-label="50 plus">50+</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 leading-tight">Jobs Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text" aria-label="250 percent">250%</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 leading-tight">Average ROI</div>
            </div>
          </motion.div>
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
  )
}