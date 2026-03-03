import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircleIcon, ClockIcon, DocumentChartBarIcon, RocketLaunchIcon } from "@heroicons/react/24/outline"

export const metadata: Metadata = {
  title: "Thank You - AI Assessment Submitted | Sprinter AI",
  description: "Your AI Readiness Assessment has been received. Your personalized report will arrive within 24 hours.",
  robots: "noindex, nofollow",
}

export default function AIAssessmentThankYouPage() {
  return (
    <div className="spr-theme spr-page min-h-screen">
      {/* Success Hero */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-green-600/20 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <CheckCircleIcon className="h-20 w-20 text-green-400" />
          </div>
          
          <h1 className="mb-6 text-center text-4xl font-bold sm:text-5xl">
            Assessment Received!
          </h1>
          
          <p className="text-center text-xl text-gray-300">
            Our AI experts are analyzing your responses to identify high-impact opportunities for your firm.
          </p>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Your Custom Report Will Include</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardContent className="p-6">
                <DocumentChartBarIcon className="mb-4 h-10 w-10 text-blue-400" />
                <h3 className="mb-2 text-xl font-semibold">AI Readiness Score</h3>
                <p className="text-gray-400">
                  See exactly where your firm stands on the AI maturity curve compared to industry peers
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardContent className="p-6">
                <RocketLaunchIcon className="mb-4 h-10 w-10 text-purple-400" />
                <h3 className="mb-2 text-xl font-semibold">3 Quick Win Opportunities</h3>
                <p className="text-gray-400">
                  Specific AI implementations that could deliver immediate value for your portfolio
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardContent className="p-6">
                <ClockIcon className="mb-4 h-10 w-10 text-green-400" />
                <h3 className="mb-2 text-xl font-semibold">Implementation Timeline</h3>
                <p className="text-gray-400">
                  Realistic roadmap showing how quickly you could deploy each AI solution
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 text-4xl">💰</div>
                <h3 className="mb-2 text-xl font-semibold">ROI Estimates</h3>
                <p className="text-gray-400">
                  Potential cost savings and value creation for each recommended AI initiative
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-6 py-3">
            <ClockIcon className="h-5 w-5 text-blue-400" />
            <span className="text-lg font-semibold text-blue-400">Report arrives within 24 hours</span>
          </div>
          
          <p className="mb-8 text-gray-400">
            Check your email inbox. We'll send your personalized AI Opportunity Report 
            directly to the email address you provided.
          </p>
          
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardContent className="p-6">
              <p className="mb-4 text-sm text-gray-400">Can't wait? Here's a quick insight:</p>
              <p className="text-lg font-semibold text-white">
                PE firms using AI for deal sourcing are finding 3x more opportunities 
                and evaluating them 80% faster than traditional methods.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Next Steps */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">While You Wait...</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <h3 className="mb-3 font-semibold">Learn More</h3>
              <p className="mb-4 text-sm text-gray-400">
                See how other PE firms are winning with AI
              </p>
              <Link href="/case-studies">
                <Button variant="outline" size="sm" className="w-full">
                  View Case Studies
                </Button>
              </Link>
            </div>
            
            <div className="text-center">
              <h3 className="mb-3 font-semibold">Go Deeper</h3>
              <p className="mb-4 text-sm text-gray-400">
                Transform strategy into action in 5 days
              </p>
              <Link href="/ai-sprint">
                <Button variant="outline" size="sm" className="w-full">
                  Explore AI Sprint
                </Button>
              </Link>
            </div>
            
            <div className="text-center">
              <h3 className="mb-3 font-semibold">Scale AI</h3>
              <p className="mb-4 text-sm text-gray-400">
                Get continuous AI innovation for your firm
              </p>
              <Link href="/ai-partnership">
                <Button variant="outline" size="sm" className="w-full">
                  AI Partnership Program
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardContent className="p-8 text-center">
              <p className="mb-6 text-lg italic text-gray-300">
                "The AI assessment opened our eyes to opportunities we hadn't even considered. 
                Within a week of receiving the report, we had already implemented one of the 
                quick wins and saved 20 hours of analyst time."
              </p>
              <div>
                <p className="font-semibold">Operating Partner</p>
                <p className="text-sm text-gray-500">$1.5B PE Fund</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="mb-4 text-xl font-bold">Questions?</h3>
          <p className="mb-6 text-gray-400">
            We're here to help you understand and act on your AI opportunities
          </p>
          
          <div className="space-y-2">
            <p>
              Email: <a href="mailto:hello@sprinter.ai" className="text-blue-400 hover:text-blue-300">
                hello@sprinter.ai
              </a>
            </p>
            <p>
              Phone: <a href="tel:+16156010782" className="text-blue-400 hover:text-blue-300">
                +1 (615) 601-0782
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}