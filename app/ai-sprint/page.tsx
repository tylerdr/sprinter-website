import { Metadata } from "next"
import Link from "next/link"
import Guarantee from "@/components/sprinter-ai/Guarantee"
import TrustedBy from "@/components/sprinter-ai/TrustedBy"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  RocketLaunchIcon,
  SparklesIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline"

export const metadata: Metadata = {
  title: "The AI Readiness Sprint | Sprinter AI",
  description:
    "Get your full operations map in 48 hours for $2,500. We identify $200K+ in automation value during the AI Readiness Sprint, or it is free.",
  openGraph: {
    title: "The AI Readiness Sprint - Full Operations Map in 48 Hours",
    description:
      "A focused AI Readiness Sprint for operators: process audit, opportunity scoring, implementation roadmap, and a working prototype.",
    type: "website",
  },
}

const sprintTimeline = [
  {
    day: "Hour 0-8",
    task: "Kickoff + Process Capture",
    description: "We map your current workflows, systems, owners, and operational bottlenecks.",
  },
  {
    day: "Hour 9-24",
    task: "Opportunity Scoring",
    description: "Each automation opportunity is scored for value, complexity, and implementation speed.",
  },
  {
    day: "Hour 25-48",
    task: "Roadmap + Prototype",
    description: "You get an implementation plan and a working prototype for your highest-value use case.",
  },
]

const deliverables = [
  "Full operations process audit across your core workflows",
  "AI opportunity scorecard with value, effort, and confidence ratings",
  "Prioritized implementation roadmap with quick wins and sequencing",
  "Working prototype for your #1 use case",
  "ROI estimate model with assumptions documented",
  "Recommended tool stack and architecture",
  "60-minute implementation planning session",
  "Handoff package your team can execute immediately",
]

const useCases = [
  {
    title: "Quote-to-Cash Automation",
    description: "Automate quoting, follow-up, and status handoffs across your revenue workflow.",
    outcome: "Reduce turnaround times while increasing close-rate consistency.",
  },
  {
    title: "Pipeline Prospecting Engine",
    description: "Use AI to prioritize leads, personalize outreach, and keep reps focused on high-fit accounts.",
    outcome: "Build a repeatable outbound motion without adding headcount.",
  },
  {
    title: "Scheduling + Reporting Ops",
    description: "Coordinate calendars, field schedules, and weekly reporting from one automated system.",
    outcome: "Give operators visibility without manual spreadsheet churn.",
  },
]

const whatYouGetParagraphs = [
  "The AI Readiness Sprint starts with a full process audit so you can see your operation as a single system instead of disconnected tasks. We document how work flows today, where handoffs break, and where your team is burning time on repetitive steps.",
  "From there, we score AI opportunities across value, technical complexity, and time-to-impact. You get a prioritized view of what to automate first, what to defer, and where human oversight should stay in place.",
  "You also receive an implementation roadmap that turns strategy into execution. It includes sequencing, ownership, tooling recommendations, and measurable milestones so your team can move from planning to delivery without ambiguity.",
  "To remove guesswork, we ship a working prototype for your highest-leverage use case. You leave the sprint with a live example your team can test, improve, and use as the foundation for broader rollout.",
]

export default function AISprintPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden px-6 py-20 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm">
              <SparklesIcon className="h-4 w-4 text-red-400" />
              <span className="text-red-400">Only 5 Spots Available This Month</span>
            </div>
          </div>

          <h1 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            The AI Readiness Sprint
          </h1>

          <p className="mt-6 text-center text-xl leading-8 text-gray-300">
            Your Full Operations Map in 48 Hours for $2,500
          </p>

          <p className="mt-4 text-center text-xl font-semibold text-white">
            We find $200K+ in automation value — or it is free.
          </p>

          <div className="mt-10 flex justify-center">
            <Link href="#book-sprint">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-lg hover:from-purple-700 hover:to-blue-700"
              >
                Book Your AI Readiness Sprint
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <TrustedBy />

      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">Why Operators Choose the AI Readiness Sprint</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 text-4xl font-bold text-purple-400">48 Hours</div>
              <p className="text-gray-400">Fast clarity on where automation will create measurable operational leverage.</p>
            </div>
            <div>
              <div className="mb-4 text-4xl font-bold text-blue-400">$2,500</div>
              <p className="text-gray-400">Fixed investment for a scoped, execution-ready AI Readiness Sprint.</p>
            </div>
            <div>
              <div className="mb-4 text-4xl font-bold text-green-400">$200K+ Floor</div>
              <p className="text-gray-400">If we do not identify at least $200K in value, your AI Readiness Sprint is free.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Your 48-Hour Journey</h2>

          <div className="relative">
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 md:left-1/2" />

            {sprintTimeline.map((item, idx) => (
              <div key={idx} className={`relative mb-12 flex items-center ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="flex-1" />
                <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg">
                  <span className="text-xs font-bold uppercase tracking-wide">{item.day}</span>
                </div>
                <div className="ml-8 flex-1 md:ml-0 md:px-8">
                  <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-semibold">{item.task}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold">What You Get in the AI Readiness Sprint</h2>
          <div className="space-y-5 text-lg leading-relaxed text-gray-300">
            {whatYouGetParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Everything You Get</h2>

          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardContent className="p-8">
              <div className="grid gap-4 md:grid-cols-2">
                {deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckIcon className="h-6 w-6 flex-shrink-0 text-green-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-lg bg-blue-500/10 p-6">
                <p className="text-center text-xl font-bold text-white">Execution-Ready in 48 Hours</p>
                <p className="mt-2 text-center text-gray-400">
                  Your team leaves with priorities, a prototype, and an implementation path.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">Pick the Highest-Leverage Use Case</h2>
          <p className="mb-12 text-center text-gray-400">We tailor the AI Readiness Sprint to your most urgent operational bottleneck.</p>

          <div className="grid gap-8 md:grid-cols-3">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="border-gray-800 bg-gray-900/50 backdrop-blur">
                <CardContent className="p-6">
                  <RocketLaunchIcon className="mb-4 h-10 w-10 text-purple-400" />
                  <h3 className="mb-2 text-xl font-semibold">{useCase.title}</h3>
                  <p className="mb-4 text-gray-400">{useCase.description}</p>
                  <div className="rounded bg-green-500/10 p-3">
                    <p className="text-sm font-semibold text-green-400">Outcome:</p>
                    <p className="text-sm text-gray-300">{useCase.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden border-gray-800 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur">
            <CardContent className="p-8">
              <h3 className="mb-6 text-2xl font-bold">Recent AI Readiness Sprint Result</h3>
              <p className="mb-6 text-lg italic text-gray-300">
                "In under 48 hours, Sprinter mapped our workflow, prioritized automation opportunities, and delivered a prototype we could test immediately. We aligned leadership in one week and moved straight into implementation with clear ROI targets."
              </p>
              <div>
                <p className="font-semibold">COO</p>
                <p className="text-gray-500">Mid-Market Operator</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Guarantee />

      <section id="book-sprint" className="bg-gradient-to-t from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardContent className="p-8">
              <h2 className="mb-6 text-center text-2xl font-bold">Ready to Start the AI Readiness Sprint?</h2>

              <div className="mb-8 space-y-4 text-center">
                <p className="text-gray-400">Limited to 5 AI Readiness Sprints per month to protect delivery quality.</p>
                <p className="text-2xl font-bold">
                  Investment: <span className="text-green-400">$2,500</span>
                </p>
                <p className="text-lg text-gray-300">Delivered in 48 hours with a $200K+ value guarantee.</p>
              </div>

              <Link href="/contact?product=ai-sprint&intent=purchase">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-lg hover:from-purple-700 hover:to-blue-700"
                >
                  Book Your AI Readiness Sprint
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <div className="mt-6 space-y-2 text-center text-sm text-gray-500">
                <p>✓ Instant confirmation</p>
                <p>✓ Secure payment via Stripe</p>
                <p>✓ Kickoff in 48 hours</p>
                <p>✓ $200K+ value guarantee</p>
              </div>

              <div className="mt-8 border-t border-gray-800 pt-8">
                <p className="mb-4 text-center text-gray-400">Prefer to discuss first?</p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Schedule a 15-Minute Call
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Common Questions</h2>

          <div className="space-y-6">
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">What if we do not have technical staff?</h3>
                <p className="text-gray-400">
                  No problem. The AI Readiness Sprint deliverables are written for operators and executives, with clear implementation guides your internal team or external partners can follow.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Is our data secure?</h3>
                <p className="text-gray-400">
                  Yes. We work under NDA and enterprise-grade security practices. The AI Readiness Sprint can be completed with anonymized or sample data when needed.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">What happens after the AI Readiness Sprint?</h3>
                <p className="text-gray-400">
                  You can implement with your current team, hand off to vendors, or continue with Sprinter for deployment support. The roadmap and prototype are designed for immediate execution.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8 text-center backdrop-blur">
          <h2 className="mb-4 text-2xl font-bold">Stop Guessing. Start Shipping.</h2>
          <p className="mb-6 text-gray-300">
            In 48 hours, the AI Readiness Sprint gives your team a clear map and a working starting point.
          </p>
          <Link href="#book-sprint">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200"
            >
              Claim Your AI Readiness Sprint Spot
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
