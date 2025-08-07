"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, TrendingUp, Clock, DollarSign, Users, Bot, Zap, Brain } from "lucide-react"

const caseStudies = [
  {
    id: "mortgageq",
    title: "MortgageQ",
    category: "FinTech AI Platform",
    description: "AI-powered loan assistant for Non-QM mortgage professionals",
    challenge: "Mortgage officers spending 4+ hours daily searching through 50+ lender guidelines, losing deals to faster competitors",
    solution: "Built an AI knowledge engine that instantly answers complex loan questions, matches scenarios to lenders in seconds",
    results: [
      { metric: "95%", label: "Reduction in research time" },
      { metric: "300%", label: "Increase in closing speed" },
      { metric: "50+", label: "Lenders integrated" },
      { metric: "$2.4M", label: "Additional revenue enabled" },
    ],
    testimonial: "We've seen our closing time increase by 300%. The AI assistant is like having a senior underwriter available 24/7.",
    icon: DollarSign,
    gradient: "from-green-500 to-emerald-600",
    features: [
      "Instant answers to complex Non-QM questions",
      "Automated lender matching",
      "Document requirement generation",
      "Real-time guideline updates",
    ],
  },
  {
    id: "cabomatic",
    title: "Cab-O-Matic",
    category: "B2B SaaS",
    description: "AI SKU translator for cabinet dealers",
    challenge: "Cabinet dealers wasting 3+ hours per quote managing spreadsheets across multiple manufacturers",
    solution: "Developed AI that translates one cabinet plan into every manufacturer's SKUs instantly",
    results: [
      { metric: "3x", label: "Productivity increase" },
      { metric: "90%", label: "Error reduction" },
      { metric: "15min", label: "Quote time (was 3 hours)" },
      { metric: "$450K", label: "Annual savings per dealer" },
    ],
    testimonial: "Cab-O-Matic transformed our quoting process. What took hours now takes minutes, and accuracy is perfect.",
    icon: Zap,
    gradient: "from-blue-500 to-purple-600",
    features: [
      "One-click multi-manufacturer quotes",
      "Automatic tax & freight calculation",
      "Real-time pricing updates",
      "Cloud-based collaboration",
    ],
  },
  {
    id: "rpm-healthcare",
    title: "RPM Healthcare AI Coach",
    category: "Healthcare Tech",
    description: "Autonomous care coach for remote patient monitoring",
    challenge: "Nurses overwhelmed managing 200+ patients, missing critical health events",
    solution: "Created AI care coach that automates check-ins, triages data, and escalates issues",
    results: [
      { metric: "60%", label: "Nurse workload reduction" },
      { metric: "85%", label: "Patient engagement rate" },
      { metric: "40%", label: "Reduction in readmissions" },
      { metric: "5x", label: "Patient coverage increase" },
    ],
    testimonial: "The AI coach handles routine tasks so our nurses can focus on critical care. It's transformative.",
    icon: Users,
    gradient: "from-red-500 to-pink-600",
    features: [
      "Automated patient check-ins",
      "Intelligent triage system",
      "Personalized health education",
      "Predictive risk alerts",
    ],
  },
  {
    id: "amble-ideation",
    title: "Amble Innovation Platform",
    category: "Enterprise Software",
    description: "Digital innovation toolkit for Fortune 500 consultants",
    challenge: "Accenture needed to digitize and scale their innovation workshops globally",
    solution: "Built AI-powered platform for remote workshops with intelligent insight extraction",
    results: [
      { metric: "10x", label: "Workshop efficiency" },
      { metric: "500+", label: "Workshops delivered" },
      { metric: "30%", label: "Better idea quality" },
      { metric: "$1.2M", label: "Consulting revenue enabled" },
    ],
    testimonial: "Amble revolutionized how we run innovation sessions. The AI insights are game-changing.",
    icon: Brain,
    gradient: "from-purple-500 to-indigo-600",
    features: [
      "AI-powered insight extraction",
      "Digital war room collaboration",
      "Automated connection mapping",
      "Knowledge base integration",
    ],
  },
  {
    id: "ai-content-engine",
    title: "TrueLetter Content AI",
    category: "Content Automation",
    description: "Scaled content generation for e-commerce",
    challenge: "E-commerce site needed 10,000+ unique product pages for SEO",
    solution: "Built AI pipeline that scrapes, analyzes, and generates SEO-optimized content at scale",
    results: [
      { metric: "10,000+", label: "Pages generated" },
      { metric: "400%", label: "Organic traffic increase" },
      { metric: "98%", label: "Content uniqueness score" },
      { metric: "$3M", label: "Revenue attributed" },
    ],
    testimonial: "The content engine delivered more in 3 months than our team could in 3 years.",
    icon: Bot,
    gradient: "from-orange-500 to-yellow-600",
    features: [
      "Automated data scraping",
      "Sentiment analysis",
      "SEO optimization",
      "Comparison table generation",
    ],
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">Proven Results</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Case <span className="gradient-text">Studies</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real AI transformations delivering measurable ROI. See how we've helped businesses 
            10x their efficiency and unlock millions in value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${study.gradient}`}>
                        <study.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-1">{study.title}</h2>
                        <p className="text-sm text-gray-400">{study.category}</p>
                      </div>
                    </div>

                    <p className="text-lg text-gray-300 mb-6">{study.description}</p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="text-sm font-semibold text-red-400 mb-2">THE CHALLENGE</h3>
                        <p className="text-gray-400">{study.challenge}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">OUR SOLUTION</h3>
                        <p className="text-gray-400">{study.solution}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-500 mb-3">KEY FEATURES</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {study.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            <span className="text-sm text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <blockquote className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500 italic text-gray-300">
                      "{study.testimonial}"
                    </blockquote>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="sticky top-24">
                      <h3 className="text-sm font-semibold text-green-400 mb-4">RESULTS</h3>
                      <div className="space-y-4 mb-6">
                        {study.results.map((result) => (
                          <div key={result.label} className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                            <div className="text-3xl font-bold gradient-text mb-1">
                              {result.metric}
                            </div>
                            <div className="text-sm text-gray-400">{result.label}</div>
                          </div>
                        ))}
                      </div>
                      
                      <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Get Similar Results
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-white/10"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to become our next <span className="gradient-text">success story</span>?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join companies that have transformed their operations with AI. 
            Most clients see ROI within 60 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Your AI Transformation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/labs"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              Try Our AI Demos
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}