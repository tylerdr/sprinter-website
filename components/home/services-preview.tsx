"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Rocket, Lightbulb, Code, Presentation } from "lucide-react"

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
    <section className="py-12 sm:py-16 md:py-24 relative" aria-labelledby="services-heading">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 id="services-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            From discovery to deployment, we partner with you at every stage of your AI journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-full"
            >
              <Link
                href={service.href}
                className="group block p-6 sm:p-8 rounded-2xl bg-card/5 border border-border/10 backdrop-blur-sm hover:bg-card/10 transition-all hover:scale-105 touch-manipulation h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${service.gradient} mb-4 sm:mb-6`} aria-hidden="true">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:gradient-text transition-all">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
                <span className="text-sm font-medium text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                  Learn more
                  <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
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
          className="text-center mt-8 sm:mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-card/10 backdrop-blur-sm text-foreground font-medium rounded-lg border border-border/20 hover:bg-card/20 transition-all touch-manipulation min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}