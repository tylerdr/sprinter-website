"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Check, ArrowRight, Sparkles, Zap, Rocket, Building2 } from "lucide-react"

const services = [
  {
    title: "AI Discovery Workshop",
    icon: Sparkles,
    duration: "1 Day",
    price: "$5,000",
    description: "Identify and prioritize AI opportunities in your business",
    deliverables: [
      "Custom AI opportunity assessment",
      "Prioritized use case roadmap",
      "ROI projections for top 5 use cases",
      "Implementation timeline",
      "Recording & transcript",
      "30-day follow-up support",
    ],
    idealFor: "Companies exploring AI adoption",
    cta: "Book Workshop",
    popular: false,
  },
  {
    title: "AI Sprint Package",
    icon: Zap,
    duration: "2-4 Weeks",
    price: "$25,000 - $50,000",
    description: "Rapid prototype to production-ready AI solution",
    deliverables: [
      "Custom AI agent or automation",
      "Integration with existing systems",
      "User training & documentation",
      "30-day warranty & support",
      "Performance metrics dashboard",
      "Source code ownership",
    ],
    idealFor: "Quick wins and proof of concepts",
    cta: "Start Sprint",
    popular: true,
  },
  {
    title: "AI Transformation",
    icon: Rocket,
    duration: "3-6 Months",
    price: "$150,000+",
    description: "End-to-end AI product development and deployment",
    deliverables: [
      "Full AI platform development",
      "Multiple integrated AI agents",
      "Custom ML models if needed",
      "Comprehensive testing & QA",
      "Team training program",
      "6-month support & maintenance",
      "Continuous optimization",
    ],
    idealFor: "Enterprise transformations",
    cta: "Transform Now",
    popular: false,
  },
  {
    title: "Venture Partnership",
    icon: Building2,
    duration: "Ongoing",
    price: "Equity-based",
    description: "We become your technical co-founder",
    deliverables: [
      "Full product development",
      "Technical architecture & strategy",
      "AI/ML expertise",
      "Ongoing development team",
      "Fundraising support",
      "Go-to-market assistance",
      "Shared risk & reward",
    ],
    idealFor: "Startups & new ventures",
    cta: "Partner With Us",
    popular: false,
  },
]

const additionalServices = [
  {
    title: "Speaking & Keynotes",
    description: "Energize your event with AI insights",
    price: "$10,000+",
  },
  {
    title: "Team Training",
    description: "Custom AI training for your team",
    price: "$15,000/day",
  },
  {
    title: "AI Strategy Consulting",
    description: "Ongoing strategic AI guidance",
    price: "$20,000/month",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Flexible Engagement Models</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From workshops to full transformation, we meet you where you are on your AI journey. 
            Most clients see ROI within 60 days.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className={`h-full p-6 rounded-2xl backdrop-blur-sm transition-all hover:scale-105 ${
                service.popular 
                  ? "bg-gradient-to-b from-blue-500/20 to-purple-600/20 border-2 border-blue-500/50" 
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    service.popular ? "bg-blue-500/30" : "bg-white/10"
                  }`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="text-sm text-gray-400">{service.duration}</div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <div className="text-2xl font-bold gradient-text mb-3">{service.price}</div>
                <p className="text-sm text-gray-400 mb-4">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  {service.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-gray-500 mb-4">
                  Ideal for: {service.idealFor}
                </div>
                
                <Link
                  href="/contact"
                  className={`flex items-center justify-center gap-2 w-full px-4 py-2 font-medium rounded-lg transition-all ${
                    service.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service) => (
              <div
                key={service.title}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{service.description}</p>
                <div className="text-lg font-bold gradient-text">{service.price}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold mb-4">
            🎯 <span className="gradient-text">Success Guarantee</span>
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We're so confident in our approach that we offer a <strong>100% satisfaction guarantee</strong> on 
            our workshops and a <strong>clear ROI commitment</strong> on all development projects. 
            If we don't deliver the promised value, we'll work for free until we do.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">60 days</div>
              <div className="text-sm text-gray-400">Average time to ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">3-10x</div>
              <div className="text-sm text-gray-400">Typical efficiency gain</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-sm text-gray-400">Client satisfaction</div>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started Risk-Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}