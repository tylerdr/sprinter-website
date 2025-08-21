import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  RocketLaunchIcon, 
  CurrencyDollarIcon, 
  ClockIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  SparklesIcon,
  CheckIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline"

export const metadata: Metadata = {
  title: "AI Opportunity Sprint - 5 Days to Your First AI Win | Sprinter AI",
  description: "Get a custom AI strategy and working prototype in just 5 days. Fixed price $2,500. 100% money-back guarantee if we don't deliver 10x value.",
  openGraph: {
    title: "AI Opportunity Sprint - From Strategy to Prototype in 5 Days",
    description: "Get a custom AI strategy and working prototype for your PE firm. Fixed $2,500 investment with 100% money-back guarantee.",
    type: "website",
  },
}

const sprintTimeline = [
  { day: "Day 1", task: "Kickoff & Discovery", description: "Deep dive into your specific use case and data" },
  { day: "Day 3", task: "Solution Design", description: "Present AI architecture and implementation plan" },
  { day: "Day 5", task: "Delivery", description: "Receive your AI Blueprint + working prototype or dataset" },
]

const deliverables = [
  "Custom AI Opportunity Blueprint (20+ page strategic document)",
  "Working prototype or proof-of-concept for your #1 use case",
  "ROI calculation and implementation roadmap",
  "Technical architecture and tool recommendations",
  "60-minute strategy session with our AI experts",
  "30 days of follow-up support via email",
  "All code, prompts, and configurations (if applicable)",
  "Recording of all sessions for your team",
]

const useCases = [
  {
    title: "Deal Flow Accelerator",
    description: "AI-powered deal sourcing that finds hidden opportunities",
    outcome: "Get a list of 50+ qualified targets matching your criteria",
  },
  {
    title: "Due Diligence Automation",
    description: "AI that analyzes documents and surfaces key insights",
    outcome: "Cut DD time by 80% with automated document summaries",
  },
  {
    title: "Portfolio Optimization",
    description: "AI tools for portfolio company operations",
    outcome: "Identify $100K+ in immediate cost savings opportunities",
  },
]

export default function AISprintPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-4xl">
          {/* Limited Availability Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm">
              <SparklesIcon className="h-4 w-4 text-red-400" />
              <span className="text-red-400">Only 5 Spots Available This Month</span>
            </div>
          </div>

          <h1 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            From AI Strategy to Working Prototype in 5 Days
          </h1>
          
          <p className="mt-6 text-center text-xl leading-8 text-gray-300">
            The AI Opportunity Sprint for Private Equity
          </p>
          
          <p className="mt-4 text-center text-lg text-gray-400">
            Stop talking about AI. Start implementing it. Get a custom solution for your firm's #1 opportunity with guaranteed ROI.
          </p>

          {/* Price and Guarantee */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
            <div className="flex items-center gap-2">
              <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
              <span className="text-2xl font-bold">$2,500 Fixed Price</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="h-6 w-6 text-blue-400" />
              <span className="text-lg">100% Money-Back Guarantee</span>
            </div>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Link href="#book-sprint">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-lg hover:from-purple-700 hover:to-blue-700"
              >
                Book Your AI Sprint Now
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">Why PE Firms Choose Our Sprint</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 text-4xl font-bold text-purple-400">5 Days</div>
              <p className="text-gray-400">Not months. We deliver real results before your next partners meeting.</p>
            </div>
            <div>
              <div className="mb-4 text-4xl font-bold text-blue-400">10x ROI</div>
              <p className="text-gray-400">Guaranteed to identify 10x value or your money back. No questions asked.</p>
            </div>
            <div>
              <div className="mb-4 text-4xl font-bold text-green-400">Zero Risk</div>
              <p className="text-gray-400">Fixed price. Clear deliverables. Apply the cost to any larger engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sprint Timeline */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Your 5-Day Journey</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 md:left-1/2" />
            
            {sprintTimeline.map((item, idx) => (
              <div key={idx} className={`relative mb-12 flex items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1" />
                <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg">
                  <span className="font-bold">{item.day}</span>
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

      {/* What's Included */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
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
                <p className="text-center text-lg font-semibold text-blue-400">
                  Total Value: $25,000+
                </p>
                <p className="mt-2 text-center text-2xl font-bold text-white">
                  Your Investment: Only $2,500
                </p>
                <p className="mt-2 text-center text-sm text-gray-400">
                  (Applied as credit toward any implementation project)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">Choose Your Focus Area</h2>
          <p className="mb-12 text-center text-gray-400">We'll customize the sprint to your highest-impact opportunity</p>
          
          <div className="grid gap-8 md:grid-cols-3">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="border-gray-800 bg-gray-900/50 backdrop-blur">
                <CardContent className="p-6">
                  <RocketLaunchIcon className="mb-4 h-10 w-10 text-purple-400" />
                  <h3 className="mb-2 text-xl font-semibold">{useCase.title}</h3>
                  <p className="mb-4 text-gray-400">{useCase.description}</p>
                  <div className="rounded bg-green-500/10 p-3">
                    <p className="text-sm font-semibold text-green-400">Deliverable:</p>
                    <p className="text-sm text-gray-300">{useCase.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden border-gray-800 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur">
            <CardContent className="p-8">
              <h3 className="mb-6 text-2xl font-bold">Recent Sprint Success</h3>
              <p className="mb-6 text-lg italic text-gray-300">
                "In just 5 days, Sprinter identified an AI-driven deal sourcing approach that found 47 off-market targets we had completely missed. 
                The ROI was immediate - we're now evaluating 3 potential acquisitions from that list. 
                The $2,500 investment paid for itself 100x over."
              </p>
              <div>
                <p className="font-semibold">Managing Partner</p>
                <p className="text-gray-500">Mid-Market PE Firm ($2B AUM)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <ShieldCheckIcon className="mx-auto mb-6 h-16 w-16 text-green-400" />
          <h2 className="mb-6 text-3xl font-bold">Our Iron-Clad Guarantee</h2>
          <p className="mb-8 text-lg text-gray-300">
            If you don't agree that our AI Sprint identified at least 10x the value of your investment 
            in potential ROI, we'll refund 100% of your money. No questions asked.
          </p>
          <p className="text-gray-400">
            We're so confident because we've done this before. Our AI expertise combined with your 
            industry knowledge creates breakthrough opportunities every time.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book-sprint" className="bg-gradient-to-t from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardContent className="p-8">
              <h2 className="mb-6 text-center text-2xl font-bold">Ready to Start Your AI Sprint?</h2>
              
              <div className="mb-8 space-y-4 text-center">
                <p className="text-gray-400">
                  Limited to 5 sprints per month to ensure quality delivery
                </p>
                <p className="text-2xl font-bold">
                  Only <span className="text-red-400">2 spots</span> remaining for December
                </p>
              </div>

              {/* Stripe Checkout Button */}
              <form action="/api/checkout/ai-sprint" method="POST">
                <input type="hidden" name="priceId" value="price_ai_sprint_2500" />
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-lg hover:from-purple-700 hover:to-blue-700"
                >
                  Book Sprint Now - $2,500
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </form>

              <div className="mt-6 space-y-2 text-center text-sm text-gray-500">
                <p>✓ Instant confirmation</p>
                <p>✓ Secure payment via Stripe</p>
                <p>✓ Start within 48 hours</p>
                <p>✓ 100% money-back guarantee</p>
              </div>

              {/* Alternative: Schedule a Call */}
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

      {/* FAQ */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Common Questions</h2>
          
          <div className="space-y-6">
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">What if we don't have technical staff?</h3>
                <p className="text-gray-400">
                  No problem. We deliver everything in business terms with clear implementation guides. 
                  Many clients use our blueprints with their existing vendors or hire us for implementation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Is our data secure?</h3>
                <p className="text-gray-400">
                  Absolutely. We sign NDAs and follow enterprise security protocols. 
                  All work can be done with anonymized or sample data if preferred.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">What happens after the sprint?</h3>
                <p className="text-gray-400">
                  You'll have everything needed to implement independently. 
                  Or, engage us for ongoing support through our AI Partnership Program. 
                  The $2,500 sprint fee is credited toward any continued engagement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8 text-center backdrop-blur">
          <h2 className="mb-4 text-2xl font-bold">Stop Watching. Start Winning.</h2>
          <p className="mb-6 text-gray-300">
            While competitors debate AI strategy, you'll have a working solution in 5 days.
          </p>
          <Link href="#book-sprint">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200"
            >
              Claim Your Sprint Spot
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}