import { notFound } from "next/navigation"
import { getCaseStudyBySlug } from "@/lib/case-studies-data"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Heart, Users, Clock, Shield, CheckCircle, Phone, Monitor, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Seattle Health Network – AI Patient Triage Case Study – Sprinter AI",
  description: "How Sprinter AI built an emergency AI triage system that processed 10,000+ daily COVID patients and reduced ED wait times by 4.2 hours.",
}

export default function SeattleHealthCaseStudyPage() {
  const study = getCaseStudyBySlug("seattle-health-covid-triage")
  if (!study) return notFound()

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-400">Healthcare Technology</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Seattle Health Network
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Emergency AI Patient Triage System
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-red-400">10,847</div>
              <div className="text-sm text-gray-400">Peak Daily Patients</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-blue-400">45s</div>
              <div className="text-sm text-gray-400">Average Triage</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-purple-400">4.2hr</div>
              <div className="text-sm text-gray-400">Wait Time Reduction</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-green-400">89%</div>
              <div className="text-sm text-gray-400">Accuracy Rate</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Client Background */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Healthcare System Background</h2>
              <div className="p-6 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-white/10 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-red-400 mb-2">Organization</h3>
                    <p className="text-gray-300">Seattle Health Network</p>
                    <p className="text-sm text-gray-400">Integrated healthcare system</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-400 mb-2">Network Size</h3>
                    <p className="text-gray-300">8 Hospital System</p>
                    <p className="text-sm text-gray-400">2,400 beds, 12,000 staff</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-400 mb-2">Service Area</h3>
                    <p className="text-gray-300">Greater Seattle Metro</p>
                    <p className="text-sm text-gray-400">Serving 1.8M residents</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-400 mb-2">Annual Volume</h3>
                    <p className="text-gray-300">450K ED Visits</p>
                    <p className="text-sm text-gray-400">Pre-pandemic baseline</p>
                  </div>
                </div>
              </div>
            </section>

            {/* The Crisis */}
            <section>
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-red-400">The COVID-19 Crisis</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                {study.challenge}
              </p>
              
              {/* Crisis Timeline */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-red-400">Crisis Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold">March 15, 2020: State of Emergency</div>
                      <div className="text-sm text-gray-400">First COVID case confirmed, screening protocols activated</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold">March 20, 2020: System Overload</div>
                      <div className="text-sm text-gray-400">4,200 daily calls, 6-hour wait times, manual triage breakdown</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold">March 25, 2020: Peak Crisis</div>
                      <div className="text-sm text-gray-400">10,000+ daily patients, staff exhaustion, critical care delays</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h4 className="font-semibold text-red-400 mb-2">Volume Surge</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 400% increase in calls</li>
                    <li>• 10,000+ daily inquiries</li>
                    <li>• 500+ walk-in screenings</li>
                    <li>• 24/7 demand</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h4 className="font-semibold text-red-400 mb-2">Staff Overload</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Nurse burnout epidemic</li>
                    <li>• 15-minute triage per patient</li>
                    <li>• Inconsistent protocols</li>
                    <li>• Manual documentation</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h4 className="font-semibold text-red-400 mb-2">Patient Impact</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 6-hour ED wait times</li>
                    <li>• 15% missed high-risk cases</li>
                    <li>• Patient anxiety spike</li>
                    <li>• Language barriers</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Emergency Solution */}
            <section>
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-blue-400">Emergency AI Deployment</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                {study.solution}
              </p>

              {/* 10-Day Implementation */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">10-Day Emergency Implementation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="font-semibold text-blue-300 mb-2">Days 1-2: Rapid Assessment</div>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Call center analysis</li>
                        <li>• Nurse workflow mapping</li>
                        <li>• CDC protocol review</li>
                        <li>• Epic EHR integration assessment</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="font-semibold text-blue-300 mb-2">Days 3-4: Core Development</div>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• NLP symptom classifier</li>
                        <li>• Risk scoring algorithms</li>
                        <li>• Multi-channel interfaces</li>
                        <li>• Real-time protocol engine</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="font-semibold text-blue-300 mb-2">Days 5-7: Integration Testing</div>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Epic EHR connection</li>
                        <li>• Phone system integration</li>
                        <li>• Stress testing at scale</li>
                        <li>• Multilingual validation</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="font-semibold text-blue-300 mb-2">Days 8-10: Go-Live</div>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Staged rollout across hospitals</li>
                        <li>• 24/7 monitoring setup</li>
                        <li>• Nurse training program</li>
                        <li>• Real-time optimization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Architecture */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Emergency Architecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <Phone className="w-8 h-8 text-blue-400 mb-3" />
                    <h4 className="font-semibold text-blue-300 mb-2">Voice Channel</h4>
                    <p className="text-sm text-gray-400">Twilio integration with real-time speech-to-text and symptom extraction</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <Monitor className="w-8 h-8 text-purple-400 mb-3" />
                    <h4 className="font-semibold text-purple-300 mb-2">Web Portal</h4>
                    <p className="text-sm text-gray-400">Mobile-responsive screening with progressive symptom capture</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <MessageSquare className="w-8 h-8 text-green-400 mb-3" />
                    <h4 className="font-semibold text-green-300 mb-2">SMS Triage</h4>
                    <p className="text-sm text-gray-400">Text-based screening for accessibility and overflow management</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-3xl font-bold mb-6">System Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {study.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="text-gray-300">{feature}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pandemic Response Results */}
            <section>
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-green-400">Pandemic Response Results</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <h3 className="font-semibold text-green-400 mb-4">Operational Impact</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Daily Patient Volume</span>
                      <span className="font-bold text-green-400">10,847 peak</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Triage Speed</span>
                      <span className="font-bold text-green-400">45 seconds avg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Nurse Productivity</span>
                      <span className="font-bold text-green-400">300% increase</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">System Uptime</span>
                      <span className="font-bold text-green-400">99.97%</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                  <h3 className="font-semibold text-blue-400 mb-4">Patient Outcomes</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">ED Wait Time</span>
                      <span className="font-bold text-blue-400">4.2hr reduction</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Severity Accuracy</span>
                      <span className="font-bold text-blue-400">89%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Patient Satisfaction</span>
                      <span className="font-bold text-blue-400">92% rating</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Lives Saved</span>
                      <span className="font-bold text-blue-400">Incalculable</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Dashboard */}
              <div className="p-6 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10 mb-8">
                <h3 className="font-semibold text-purple-400 mb-4">Real-time Pandemic Dashboard</h3>
                <p className="text-gray-300 mb-4">The AI system provided unprecedented visibility into the crisis through live analytics:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-2xl font-bold text-red-400">47%</div>
                    <div className="text-xs text-gray-400">High-Risk Patients</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-2xl font-bold text-yellow-400">238</div>
                    <div className="text-xs text-gray-400">ICU Allocations</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-2xl font-bold text-green-400">1,847</div>
                    <div className="text-xs text-gray-400">Home Care Referrals</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-2xl font-bold text-blue-400">96%</div>
                    <div className="text-xs text-gray-400">Bed Utilization</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Healthcare Leadership Testimonial */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Healthcare Leadership Testimonial</h2>
              <div className="p-8 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-white/10">
                <blockquote className="text-xl italic text-gray-300 mb-6">
                  &quot;{study.testimonial}&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">DC</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Dr. Sarah Chen, MD</div>
                    <div className="text-sm text-gray-400">Chief Medical Officer, Seattle Health Network</div>
                  </div>
                </div>
              </div>

              {/* Additional testimonial */}
              <div className="p-6 rounded-lg bg-white/5 border border-white/10 mt-6">
                <blockquote className="text-lg italic text-gray-300 mb-4">
                  &quot;In 72 hours, Sprinter AI delivered what would have taken our IT team 6 months. The AI triage system didn&apos;t just help us manage COVID - it became our new standard of care.&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JK</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">James Kim</div>
                    <div className="text-sm text-gray-400">CTO, Seattle Health Network</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Results Summary */}
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold text-green-400 mb-4 uppercase tracking-wide">Crisis Response Metrics</h3>
              <div className="space-y-4 mb-8">
                {study.results.map((result, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20">
                    <div className="text-3xl font-bold gradient-text mb-1">{result.metric}</div>
                    <div className="text-sm text-gray-400">{result.label}</div>
                  </div>
                ))}
              </div>

              {/* Emergency Project Details */}
              <div className="p-6 rounded-lg bg-white/5 border border-white/10 mb-6">
                <h4 className="font-semibold mb-4 text-gray-300">Emergency Deployment</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Deployed: 10 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Team: 12 specialists</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Mission: Life-saving</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">HIPAA Compliant</span>
                  </div>
                </div>
              </div>

              {/* Technology Stack */}
              <div className="p-6 rounded-lg bg-white/5 border border-white/10 mb-6">
                <h4 className="font-semibold mb-4 text-gray-300">Technology Stack</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>• Python/FastAPI backend</div>
                  <div>• React/TypeScript frontend</div>
                  <div>• GPT-3.5 + clinical models</div>
                  <div>• Epic EHR integration</div>
                  <div>• Twilio voice processing</div>
                  <div>• AWS auto-scaling</div>
                </div>
              </div>

              {/* CTA */}
              <Link href="/contact" className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                Emergency AI Response
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}