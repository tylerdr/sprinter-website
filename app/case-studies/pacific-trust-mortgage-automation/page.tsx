import { notFound } from "next/navigation"
import { getCaseStudyBySlug } from "@/lib/case-studies-data"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Building2, Calendar, Users, TrendingUp, Shield, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Pacific Trust Bank – AI Mortgage Underwriting Case Study – Sprinter AI",
  description: "How Sprinter AI built an AI-powered mortgage underwriting system that reduced processing time by 70% and saved $3.2M annually for Pacific Trust Bank.",
}

export default function PacificTrustCaseStudyPage() {
  const study = getCaseStudyBySlug("pacific-trust-mortgage-automation")
  if (!study) return notFound()

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Financial Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Pacific Trust Bank
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            AI Mortgage Underwriting System
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-emerald-400">70%</div>
              <div className="text-sm text-gray-400">Faster Processing</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-blue-400">6.3</div>
              <div className="text-sm text-gray-400">Days Average</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-purple-400">$3.2M</div>
              <div className="text-sm text-gray-400">Annual Savings</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-yellow-400">98.7%</div>
              <div className="text-sm text-gray-400">Accuracy Rate</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Client Background */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Client Background</h2>
              <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-blue-400 mb-2">Institution</h3>
                    <p className="text-gray-300">Pacific Trust Bank</p>
                    <p className="text-sm text-gray-400">Regional bank serving Washington State</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-400 mb-2">Assets</h3>
                    <p className="text-gray-300">$2.8 Billion</p>
                    <p className="text-sm text-gray-400">32 branches, 450 employees</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-400 mb-2">Market Position</h3>
                    <p className="text-gray-300">Top 5 Regional Lender</p>
                    <p className="text-sm text-gray-400">Strong community presence since 1987</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-400 mb-2">Annual Volume</h3>
                    <p className="text-gray-300">$850M Originations</p>
                    <p className="text-sm text-gray-400">~2,400 loans annually</p>
                  </div>
                </div>
              </div>
            </section>

            {/* The Challenge */}
            <section>
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-red-400">The Challenge</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                {study.challenge}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h4 className="font-semibold text-red-400 mb-2">Processing Bottlenecks</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 21-day average turnaround</li>
                    <li>• 15+ documents per application</li>
                    <li>• Manual data validation</li>
                    <li>• Paper-based workflows</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h4 className="font-semibold text-red-400 mb-2">Market Pressures</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Online lenders averaging 8 days</li>
                    <li>• 23% market share loss in 18 months</li>
                    <li>• Rising rate environment pressure</li>
                    <li>• Regulatory compliance costs</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Our Solution */}
            <section>
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-blue-400">Our Solution</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                {study.solution}
              </p>

              {/* Technical Architecture */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Technical Architecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-semibold mb-3 text-blue-300">Frontend Components</h4>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li><strong>Loan Officer Dashboard:</strong> React-based interface with real-time status tracking</li>
                      <li><strong>Document Upload Portal:</strong> Drag-and-drop with OCR preview</li>
                      <li><strong>Risk Assessment Views:</strong> Interactive scoring visualizations</li>
                      <li><strong>Compliance Reporting:</strong> Automated regulatory documentation</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-semibold mb-3 text-blue-300">Backend Systems</h4>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li><strong>ML Pipeline:</strong> Python-based ensemble models (XGBoost, Random Forest)</li>
                      <li><strong>Data Integration:</strong> APIs to Experian, LexisNexis, CoreLogic</li>
                      <li><strong>Document Processing:</strong> Tesseract OCR with custom financial parsers</li>
                      <li><strong>Core Banking Integration:</strong> Seamless connection to FIS systems</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Implementation Timeline */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Implementation Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold">Weeks 1-2: Discovery & Architecture</div>
                      <div className="text-sm text-gray-400">System assessment, data mapping, ML model design</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold">Weeks 3-6: Core Development</div>
                      <div className="text-sm text-gray-400">OCR pipeline, ML training, API integrations</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold">Weeks 7-8: Testing & Validation</div>
                      <div className="text-sm text-gray-400">Model validation, UAT with loan officers</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold">Weeks 9-10: Deployment</div>
                      <div className="text-sm text-gray-400">Staged rollout, training, go-live support</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {study.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="text-gray-300">{feature}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Results Deep Dive */}
            <section>
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-green-400">Detailed Results</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <h3 className="font-semibold text-green-400 mb-4">Operational Improvements</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Processing Time</span>
                      <span className="font-bold text-green-400">21 → 6.3 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Manual Reviews</span>
                      <span className="font-bold text-green-400">85% reduction</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Daily Capacity</span>
                      <span className="font-bold text-green-400">3x increase</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Accuracy Rate</span>
                      <span className="font-bold text-green-400">98.7%</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                  <h3 className="font-semibold text-blue-400 mb-4">Financial Impact</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Annual Cost Savings</span>
                      <span className="font-bold text-blue-400">$3.2M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Loan Volume Increase</span>
                      <span className="font-bold text-blue-400">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Market Share Recovery</span>
                      <span className="font-bold text-blue-400">12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">ROI Timeline</span>
                      <span className="font-bold text-blue-400">4.2 months</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Client Testimonial */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Client Testimonial</h2>
              <div className="p-8 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10">
                <blockquote className="text-xl italic text-gray-300 mb-6">
                  &quot;{study.testimonial}&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">MR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Michael Rodriguez</div>
                    <div className="text-sm text-gray-400">SVP of Lending Operations, Pacific Trust Bank</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Results Summary */}
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold text-green-400 mb-4 uppercase tracking-wide">Key Metrics</h3>
              <div className="space-y-4 mb-8">
                {study.results.map((result, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                    <div className="text-3xl font-bold gradient-text mb-1">{result.metric}</div>
                    <div className="text-sm text-gray-400">{result.label}</div>
                  </div>
                ))}
              </div>

              {/* Project Details */}
              <div className="p-6 rounded-lg bg-white/5 border border-white/10 mb-6">
                <h4 className="font-semibold mb-4 text-gray-300">Project Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Duration: 10 weeks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Team: 6 specialists</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">ROI: 680% in Year 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Compliance: SOX, GDPR</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link href="/contact" className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                Get Similar Results
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}