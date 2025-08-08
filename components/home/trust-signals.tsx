"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const clients = [
  "Vero Capital",
  "Rock Hill Capital", 
  "Beckway",
  "Wells Fargo",
  "Accenture",
  "Broadlume",
]

const testimonials = [
  {
    quote: "SprinterHQ's AI automation reduced our loan processing time by 70%, saving us over $3M annually. Their team delivered in weeks what others quoted months for.",
    author: "Michael Rodriguez, SVP",
    company: "Pacific Trust Bank",
  },
  {
    quote: "The discovery workshop identified 3 high-ROI automation opportunities. We started with one sprint and now have AI handling 40% of our data operations.",
    author: "Sarah Martinez, Partner",
    company: "Beckway",
  },
  {
    quote: "During COVID, they built our triage system in 10 days. It processed 10,000+ patients daily and reduced ER wait times by 4 hours.",
    author: "Dr. Sarah Chen, CMO",
    company: "Seattle Health Network",
  },
]

export function TrustSignals() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 sm:gap-x-12 sm:gap-y-6">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-lg sm:text-xl md:text-2xl font-semibold text-muted-foreground hover:text-foreground transition-colors text-center px-2"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm h-full flex flex-col"
            >
              <div className="mb-4 text-2xl sm:text-3xl text-blue-500">❝</div>
              <p className="text-foreground/80 mb-4 italic text-sm sm:text-base leading-relaxed flex-grow">
                {testimonial.quote}
              </p>
              <div className="mt-auto">
                <div className="font-semibold text-sm sm:text-base">{testimonial.author}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}