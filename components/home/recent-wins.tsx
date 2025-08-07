"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { TrendingUp, Clock, Users, DollarSign, ArrowRight } from "lucide-react"

const recentWins = [
  {
    icon: DollarSign,
    client: "FinTech Startup",
    result: "$2.4M additional revenue",
    timeframe: "in 6 months",
    description: "AI loan assistant processing 300% more applications",
  },
  {
    icon: Clock,
    client: "Healthcare Provider",
    result: "5x patient capacity",
    timeframe: "in 90 days",
    description: "AI care coach managing routine check-ins",
  },
  {
    icon: Users,
    client: "E-commerce Platform",
    result: "10,000 pages created",
    timeframe: "in 3 months",
    description: "AI content engine driving 400% traffic growth",
  },
]

export function RecentWins() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">Recent Client Wins</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            This Month's <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real results from real clients. Updated monthly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {recentWins.map((win, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <win.icon className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">{win.client}</div>
                  <div className="text-2xl font-bold text-green-400">{win.result}</div>
                  <div className="text-sm text-gray-500">{win.timeframe}</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">{win.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center p-6 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-orange-400" />
            <h3 className="text-xl font-bold text-orange-400">Limited Availability</h3>
          </div>
          <p className="text-gray-300 mb-4">
            We only take on <strong>3 new AI transformation projects per month</strong> to ensure quality delivery. 
            <span className="text-orange-400 font-semibold"> 2 spots remaining for this quarter.</span>
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Reserve Your Spot
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}