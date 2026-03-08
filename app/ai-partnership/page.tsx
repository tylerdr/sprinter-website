import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  RocketLaunchIcon,
  ChartBarIcon,
  CpuChipIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "AI Partnership Program - Your Dedicated AI Team | Sprinter AI",
  description: "Get an entire AI Center of Excellence for less than one data scientist. Continuous AI innovation for your PE firm and portfolio. Starting at $5K/month.",
  openGraph: {
    title: "AI Partnership Program for Private Equity",
    description: "Continuous AI innovation and implementation for your firm. Your dedicated AI team without the overhead.",
    type: "website",
  },
}

const programTiers = [
  {
    name: "Advisory",
    price: "$35,000",
    period: "/month",
    description: "Strategic AI advisory for selective deployments",
    features: [
      "Quarterly AI implementation",
      "Monthly portfolio opportunity analysis",
      "Weekly office hours with AI experts",
      "Access to proprietary AI tools",
      "Quarterly board presentations",
      "Portfolio company assessments",
    ],
    cta: "Start Advisory",
    popular: false,
  },
  {
    name: "Transformation",
    price: "$85,000",
    period: "/month",
    description: "Full-scale AI transformation across your portfolio",
    features: [
      "Monthly AI implementations (up to 3)",
      "Dedicated AI team (3 specialists)",
      "Weekly portfolio monitoring",
      "Custom AI platform development",
      "Unlimited advisory calls",
      "Due diligence automation suite",
      "Deal sourcing AI tools",
      "LP reporting support",
    ],
    cta: "Transform Portfolio",
    popular: true,
  },
  {
    name: "Operating Partner",
    price: "$200,000+",
    period: "/month",
    description: "Virtual AI operating partner for your fund",
    features: [
      "Unlimited AI implementations",
      "Dedicated team (5+ AI specialists)",
      "Board seat or observer rights",
      "Custom AI venture studio",
      "White-label AI products",
      "Co-investment opportunities",
      "Revenue share on AI exits",
      "Proprietary deal flow network",
    ],
    cta: "Engage Partner",
    popular: false,
  },
]

const capabilities = [
  {
    icon: ChartBarIcon,
    title: "Deal Sourcing AI",
    description: "Automated market scanning and target identification. Find deals others miss.",
  },
  {
    icon: CpuChipIcon,
    title: "Due Diligence Automation",
    description: "AI-powered document analysis and risk assessment. Complete DD in hours, not weeks.",
  },
  {
    icon: ArrowTrendingUpIcon,
    title: "Portfolio Value Creation",
    description: "Deploy AI across portfolio companies for operational improvements and growth.",
  },
  {
    icon: UserGroupIcon,
    title: "AI Advisory on Demand",
    description: "Your team gets instant access to AI expertise via our platform and experts.",
  },
]

const results = [
  { metric: "80%", description: "Reduction in due diligence time" },
  { metric: "47", description: "Hidden deals found via AI in one sprint" },
  { metric: "$2.3M", description: "Average annual savings per portfolio company" },
  { metric: "5x", description: "ROI within first 6 months" },
]

export default function AIPartnershipPage() {
  return (
    <div className="spr-theme spr-page min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-green-600/20 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-5xl">
          {/* Founding Member Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm">
              <SparklesIcon className="h-4 w-4 text-green-400" />
              <span className="text-green-400">Founding Partner Pricing Available</span>
            </div>
          </div>

          <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            Your AI Center of Excellence
          </h1>
          
          <p className="mt-6 text-center text-xl leading-8 text-gray-300">
            Without Building One
          </p>
          
          <p className="mt-4 text-center text-lg text-gray-400">
            Get continuous AI innovation for your PE firm and entire portfolio. 
            Like having a dedicated AI team for less than the cost of one data scientist.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
            <Link href="#pricing">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg hover:from-blue-700 hover:to-purple-700"
              >
                See Partnership Options
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg"
              >
                Schedule Executive Briefing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Results Bar */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {results.map((result) => (
              <div key={result.description} className="text-center">
                <div className="text-3xl font-bold text-green-400">{result.metric}</div>
                <div className="mt-2 text-sm text-gray-400">{result.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">AI Capabilities at Your Fingertips</h2>
          <p className="mb-12 text-center text-gray-400">
            Deploy cutting-edge AI across your entire operation
          </p>
          
          <div className="grid gap-8 md:grid-cols-2">
            {capabilities.map((capability) => (
              <Card key={capability.title} className="border-gray-800 bg-gray-900/50 backdrop-blur">
                <CardContent className="flex gap-4 p-6">
                  <capability.icon className="h-10 w-10 flex-shrink-0 text-purple-400" />
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">{capability.title}</h3>
                    <p className="text-gray-400">{capability.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">How the Partnership Works</h2>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                1
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">Onboarding & Discovery</h3>
                <p className="text-gray-400">
                  We learn your firm's strategy, portfolio, and immediate opportunities. 
                  Set up secure access and establish success metrics.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
                2
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">Continuous Delivery</h3>
                <p className="text-gray-400">
                  Each month, we implement new AI solutions based on your priorities. 
                  From deal sourcing to portfolio optimization, we handle it all.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white">
                3
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">Measure & Scale</h3>
                <p className="text-gray-400">
                  Track ROI, iterate on solutions, and scale successful implementations 
                  across your portfolio. Your AI advantage compounds over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">Partnership Tiers</h2>
          <p className="mb-12 text-center text-gray-400">
            Month-to-month. Cancel anytime. Scale up as you grow.
          </p>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {programTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`relative border-gray-800 bg-gray-900/50 backdrop-blur ${
                  tier.popular ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-purple-500 px-3 py-1 text-sm font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-gray-400">{tier.period}</span>
                  </div>
                  <p className="mt-2 text-gray-400">{tier.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                        : ''
                    }`}
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              All plans include: NDA protection • Enterprise security • 
              Platform access • Quarterly business reviews
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden border-gray-800 bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur">
            <CardContent className="p-8">
              <h3 className="mb-6 text-2xl font-bold">Your Potential ROI</h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-4 font-semibold text-green-400">With AI Partnership:</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Find 10+ hidden deals per year</li>
                    <li>• Cut DD time by 80% (save 500+ hours)</li>
                    <li>• $100K+ savings per portfolio company</li>
                    <li>• 24/7 AI working on your opportunities</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="mb-4 font-semibold text-red-400">Without AI Partnership:</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Miss deals competitors find with AI</li>
                    <li>• Analysts spending weeks on manual work</li>
                    <li>• Portfolio companies falling behind</li>
                    <li>• $200K+ to hire one data scientist</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 rounded-lg bg-white/5 p-4 text-center">
                <p className="text-2xl font-bold text-green-400">
                  Typical ROI: 5-10x in first year
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Based on actual client results
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Partnership vs. Alternatives</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="pb-4 text-left font-semibold"></th>
                  <th className="pb-4 text-center font-semibold text-purple-400">AI Partnership</th>
                  <th className="pb-4 text-center font-semibold">In-House Team</th>
                  <th className="pb-4 text-center font-semibold">Consultants</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800/50">
                  <td className="py-3">Cost</td>
                  <td className="py-3 text-center text-green-400">$5-10K/mo</td>
                  <td className="py-3 text-center">$500K+/yr</td>
                  <td className="py-3 text-center">$50K+ per project</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3">Time to Value</td>
                  <td className="py-3 text-center text-green-400">Days</td>
                  <td className="py-3 text-center">6-12 months</td>
                  <td className="py-3 text-center">2-3 months</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3">Ongoing Innovation</td>
                  <td className="py-3 text-center text-green-400">✓ Continuous</td>
                  <td className="py-3 text-center">Limited</td>
                  <td className="py-3 text-center">Per project</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3">Scalability</td>
                  <td className="py-3 text-center text-green-400">✓ Instant</td>
                  <td className="py-3 text-center">Slow hiring</td>
                  <td className="py-3 text-center">New contracts</td>
                </tr>
                <tr>
                  <td className="py-3">Risk</td>
                  <td className="py-3 text-center text-green-400">Month-to-month</td>
                  <td className="py-3 text-center">High commitment</td>
                  <td className="py-3 text-center">Per project risk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardContent className="p-8">
              <div className="mb-6 flex items-center gap-2">
                <BuildingOfficeIcon className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="font-semibold">Global PE Firm</p>
                  <p className="text-sm text-gray-500">$5B+ AUM, 20+ Portfolio Companies</p>
                </div>
              </div>
              
              <p className="mb-6 text-lg italic text-gray-300">
                "The AI Partnership transformed how we operate. In 6 months, we've automated 70% of our 
                due diligence process, identified 3 successful acquisitions through AI-powered sourcing, 
                and deployed efficiency tools across 8 portfolio companies. The ROI is undeniable - 
                we're getting enterprise AI capabilities for a fraction of the cost."
              </p>
              
              <p className="text-sm text-gray-500">
                Operating Partner, 8 months into partnership
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Guarantees */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-3xl font-bold">Our Partnership Promise</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <ShieldCheckIcon className="mx-auto mb-4 h-12 w-12 text-green-400" />
              <h3 className="mb-2 font-semibold">5× ROI Guarantee</h3>
              <p className="text-sm text-gray-400">
                5× return within 12 months or we work free until achieved
              </p>
            </div>
            
            <div>
              <ClockIcon className="mx-auto mb-4 h-12 w-12 text-blue-400" />
              <h3 className="mb-2 font-semibold">No Lock-In</h3>
              <p className="text-sm text-gray-400">
                Month-to-month commitment. Cancel anytime with 30 days notice
              </p>
            </div>
            
            <div>
              <CurrencyDollarIcon className="mx-auto mb-4 h-12 w-12 text-purple-400" />
              <h3 className="mb-2 font-semibold">Sprint Credit</h3>
              <p className="text-sm text-gray-400">
                Already did our AI Sprint? Apply the $2,500 to your first month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 text-center backdrop-blur">
          <h2 className="mb-4 text-3xl font-bold">Ready to Lead with AI?</h2>
          <p className="mb-8 text-lg text-gray-300">
            Join the PE firms already gaining an unfair advantage with AI
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Schedule Executive Briefing
              </Button>
            </Link>
            <Link href="/ai-assessment">
              <Button size="lg" variant="outline">
                Start with Free Assessment
              </Button>
            </Link>
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            Limited founding partner spots available at special rates
          </p>
        </div>
      </section>
    </div>
  )
}