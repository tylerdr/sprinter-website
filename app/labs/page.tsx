"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Bot, Workflow, Palette, Gamepad2, ArrowRight } from "lucide-react"

const labs = [
  {
    icon: Bot,
    title: "Agent Simulator",
    description: "Watch multiple AI agents collaborate in parallel to solve complex tasks. See how agentic workflows handle real-world scenarios.",
    href: "/labs/agent-simulator",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Workflow,
    title: "Workflow Designer",
    description: "Map your business processes and discover where AI can augment or automate steps. Get a personalized AI transformation roadmap.",
    href: "/labs/workflow-tool",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Gamepad2,
    title: "Ideation Lab",
    description: "Play creative AI games: brainstorm ideas, race concepts, and compete in startup Scattergories. Fun meets innovation.",
    href: "/labs/ideation",
    gradient: "from-green-500 to-teal-600",
  },
  {
    icon: Palette,
    title: "AI Sketch Studio",
    description: "Draw rough sketches and watch AI transform them into polished artwork. Experience the magic of AI-enhanced creativity.",
    href: "/labs/sketch-studio",
    gradient: "from-orange-500 to-red-600",
  },
]

export default function LabsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AI <span className="gradient-text">Labs</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interactive demonstrations of our AI capabilities. Experience the future of intelligent automation through hands-on tools and games.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {labs.map((lab, index) => (
            <motion.div
              key={lab.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={lab.href}
                className="group block h-full p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${lab.gradient} mb-6`}>
                  <lab.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all">
                  {lab.title}
                </h2>
                <p className="text-gray-400 mb-4">
                  {lab.description}
                </p>
                <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:text-blue-300">
                  Try it now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to build something amazing?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            These demos showcase just a fraction of what we can build together. Let&apos;s discuss your AI vision.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}