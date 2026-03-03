import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircleIcon, CalendarIcon, DocumentTextIcon, UserGroupIcon } from "@heroicons/react/24/outline"

export const metadata: Metadata = {
  title: "Welcome to Your AI Sprint! | Sprinter AI",
  description: "Your AI Opportunity Sprint has been confirmed. Get ready to transform your firm with AI in just 5 days.",
  robots: "noindex, nofollow", // Don't index success pages
}

export default function AISprintSuccessPage() {
  return (
    <div className="spr-theme spr-page min-h-screen">
      {/* Success Hero */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-blue-600/20 to-purple-600/20 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <CheckCircleIcon className="h-20 w-20 text-green-400" />
          </div>
          
          <h1 className="mb-6 text-center text-4xl font-bold sm:text-5xl">
            Welcome to Your AI Sprint!
          </h1>
          
          <p className="text-center text-xl text-gray-300">
            Your payment has been processed successfully. Get ready to accelerate your AI journey.
          </p>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">What Happens Next</h2>
          
          <div className="space-y-6">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/20">
                  <span className="font-bold text-blue-400">1</span>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Confirmation Email (Within 1 Hour)</h3>
                  <p className="text-gray-400">
                    You'll receive a detailed confirmation email with your sprint schedule, 
                    preparation checklist, and calendar invites for all sessions.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-600/20">
                  <span className="font-bold text-purple-400">2</span>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Pre-Sprint Call (Within 24 Hours)</h3>
                  <p className="text-gray-400">
                    Our AI strategist will reach out to schedule a brief call to understand 
                    your specific goals and gather any necessary context for your sprint.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-600/20">
                  <span className="font-bold text-green-400">3</span>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Sprint Kickoff (Day 1)</h3>
                  <p className="text-gray-400">
                    We'll begin with a deep-dive discovery session to identify your highest-impact 
                    AI opportunity and start building your custom solution.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preparation Checklist */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-bold">To Maximize Your Sprint Value</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DocumentTextIcon className="h-6 w-6 flex-shrink-0 text-blue-400" />
                  <div>
                    <p className="font-semibold text-white">Gather Relevant Documents</p>
                    <p className="text-sm text-gray-400">
                      Any materials related to your chosen focus area (deal criteria, portfolio data, process docs)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <UserGroupIcon className="h-6 w-6 flex-shrink-0 text-purple-400" />
                  <div>
                    <p className="font-semibold text-white">Identify Key Stakeholders</p>
                    <p className="text-sm text-gray-400">
                      Let us know who should be involved in the sessions from your team
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CalendarIcon className="h-6 w-6 flex-shrink-0 text-green-400" />
                  <div>
                    <p className="font-semibold text-white">Block Your Calendar</p>
                    <p className="text-sm text-gray-400">
                      Ensure you have time set aside for the scheduled sessions (about 3-4 hours total over 5 days)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resources */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-2xl font-bold">While You Wait</h2>
          <p className="mb-8 text-gray-400">
            Explore these resources to get inspired about AI possibilities
          </p>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <Link href="/case-studies">
              <Button variant="outline" className="w-full">
                View Case Studies
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" className="w-full">
                Read AI Insights
              </Button>
            </Link>
            <Link href="/ai-partnership">
              <Button variant="outline" className="w-full">
                Learn About Partnership
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-gradient-to-t from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="mb-4 text-xl font-bold">Questions Before We Start?</h3>
          <p className="mb-6 text-gray-400">
            Our team is here to help ensure you get maximum value from your sprint
          </p>
          
          <div className="space-y-2">
            <p>
              <a href="mailto:hello@sprinter.ai" className="text-blue-400 hover:text-blue-300">
                hello@sprinter.ai
              </a>
            </p>
            <p>
              <a href="tel:+16156010782" className="text-blue-400 hover:text-blue-300">
                +1 (615) 601-0782
              </a>
            </p>
          </div>
          
          <div className="mt-8 rounded-lg bg-green-500/10 p-6">
            <p className="text-green-400">
              Your sprint is protected by our 100% money-back guarantee. 
              If we don't deliver 10x value, you pay nothing.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}