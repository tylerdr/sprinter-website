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
    quote: "Sprinter's AI reduced our research time by 95% and helped us close $2.4M in additional loans in just 6 months.",
    author: "Michael Chen, CEO",
    company: "MortgageQ",
  },
  {
    quote: "The AI workshop identified $3M in automation opportunities. We implemented 5 AI agents that now handle 60% of our operations.",
    author: "Sarah Martinez, Partner",
    company: "Beckway",
  },
  {
    quote: "Our nurses can now manage 5x more patients with the AI care coach. Readmissions dropped 40% in the first quarter.",
    author: "Dr. James Wilson",
    company: "RPM Healthcare",
  },
]

export function TrustSignals() {
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
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-2xl font-semibold text-gray-500 hover:text-white transition-colors"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="mb-4 text-3xl text-blue-500">❝</div>
              <p className="text-gray-300 mb-4 italic">
                {testimonial.quote}
              </p>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-gray-400">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}