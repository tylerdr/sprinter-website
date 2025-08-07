"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Brain, Rocket, Users, Lightbulb, Code, Presentation } from "lucide-react"

const services = [
  {
    icon: Lightbulb,
    title: "AI Discovery & Workshops",
    description: "Identify AI opportunities with structured workshops and strategic roadmaps",
    href: "/services#workshops",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    icon: Presentation,
    title: "Speaking & Training",
    description: "Energize your team with keynotes and hands-on AI training sessions",
    href: "/services#training",
    gradient: "from-green-500 to-teal-600",
  },
  {
    icon: Code,
    title: "Custom AI Development",
    description: "Build production-ready AI agents and intelligent automation systems",
    href: "/services#development",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    icon: Rocket,
    title: "Venture Studio",
    description: "Co-build AI products as your technical co-founder with equity partnerships",
    href: "/services#ventures",
    gradient: "from-purple-500 to-pink-600",
  },
]

export function ServicesPreview() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From discovery to deployment, we partner with you at every stage of your AI journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={service.href}
                className="group block p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${service.gradient} mb-4`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 group-hover:gradient-text transition-all">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {service.description}
                </p>
                <span className="text-sm font-medium text-blue-400 group-hover:text-blue-300">
                  Learn more →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}