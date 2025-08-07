"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Rocket, Brain, Users, Target, ArrowRight, Zap } from "lucide-react"
import { COMPANY_INFO, METRICS } from "@/lib/constants"

const values = [
  {
    icon: Rocket,
    title: "Speed & Efficiency",
    description: "We move fast. While others plan, we ship. Our sprints deliver working AI in weeks, not months.",
  },
  {
    icon: Brain,
    title: "Deep Technical Expertise",
    description: "We're not consultants who learned AI yesterday. We've been building autonomous systems since 2018.",
  },
  {
    icon: Users,
    title: "True Partnership",
    description: "We don't just deliver and disappear. We ensure your team can maintain and evolve what we build.",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description: "We measure success in ROI, not PowerPoints. Every project has clear, measurable outcomes.",
  },
]

const timeline = [
  { year: "2018", event: "Founded SprinterHQ to democratize AI for businesses" },
  { year: "2019", event: "Built first autonomous AI agents for financial services" },
  { year: "2020", event: "Expanded to healthcare AI during pandemic" },
  { year: "2021", event: "Launched venture studio model with equity partnerships" },
  { year: "2022", event: "Crossed $5M in client revenue generated" },
  { year: "2023", event: "Pioneered agentic workflows for Fortune 500" },
  { year: "2024", event: "Hit $12M+ in total client value created" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Our Story</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Building the Future, <span className="gradient-text">One Sprint at a Time</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're not just another AI consultancy. We're builders, innovators, and your technical co-founders 
            in the AI revolution.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 mb-4">
              We believe every business can be transformed by AI—but most don't know where to start or how to execute. 
              That's where we come in.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              Since {COMPANY_INFO.founded}, we've been on a mission to bridge the gap between AI's potential and practical business value. 
              We don't just talk about AI; we build it, deploy it, and ensure it delivers measurable ROI.
            </p>
            <p className="text-lg text-gray-300">
              Our approach is simple: <strong className="text-white">Move fast. Build real things. Measure everything.</strong> 
              {" "}While others are still making slides, we're shipping production AI that transforms operations.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 w-fit mb-4">
                  <value.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600" />
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex gap-6 mb-8 relative"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-sm font-bold">{item.year}</span>
                </div>
                <div className="flex-1 p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-gray-300">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
        >
          <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">{METRICS.revenueGenerated}</div>
            <p className="text-sm text-gray-400">Client Revenue Generated</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">50+</div>
            <p className="text-sm text-gray-400">AI Products Deployed</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">{METRICS.clientSatisfaction}</div>
            <p className="text-sm text-gray-400">Client Satisfaction</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-white/10"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Write the Next Chapter <span className="gradient-text">Together</span>?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join the companies that have transformed their operations with AI. 
            Let's build something extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              See Our Work
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}