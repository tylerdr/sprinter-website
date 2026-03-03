import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowRightIcon, 
  ChartBarIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  RocketLaunchIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline"

export const metadata: Metadata = {
  title: "Private Equity AI Success Stories | Sprinter AI",
  description: "See how PE firms are using AI to find more deals, accelerate due diligence, and create portfolio value. Real results from real firms.",
  openGraph: {
    title: "PE Firms Winning with AI - Case Studies",
    description: "How private equity firms achieve 80% faster DD and 3x more deals with AI",
    type: "website",
  },
}

const caseStudies = [
  {
    id: "vero-capital",
    company: "Vero Capital",
    logo: "VC",
    type: "Mid-Market PE",
    aum: "$2.5B AUM",
    challenge: "Manual due diligence processes were taking 6-8 weeks per deal, causing missed opportunities",
    solution: "Implemented AI-powered document analysis and automated financial modeling",
    results: [
      { metric: "80%", description: "Reduction in DD time" },
      { metric: "3x", description: "More deals evaluated" },
      { metric: "$1.2M", description: "Annual cost savings" },
      { metric: "2", description: "Successful exits accelerated" },
    ],
    quote: "Sprinter removed human error and redundant tasks, allowing us to focus on strategic decisions that maximize investors' returns.",
    timeline: "5 days to prototype, 3 weeks to full deployment",
    technologies: ["GPT-4", "Document OCR", "Financial Modeling AI"],
  },
  {
    id: "rock-hill-capital",
    company: "Rock Hill Capital",
    logo: "RH",
    type: "Growth Equity",
    aum: "$800M AUM",
    challenge: "Missing off-market opportunities due to limited deal sourcing capabilities",
    solution: "Built AI-powered deal sourcing engine that scans multiple data sources",
    results: [
      { metric: "47", description: "Hidden deals found" },
      { metric: "5", description: "New investments made" },
      { metric: "2.3x", description: "Deal flow increase" },
      { metric: "$450K", description: "Sourcing cost reduction" },
    ],
    quote: "Our team left the workshop feeling inspired and ready to tackle our AI strategy. The results exceeded expectations.",
    timeline: "1-week sprint to build initial system",
    technologies: ["Web Scraping AI", "NLP Analysis", "Pattern Recognition"],
  },
  {
    id: "apex-partners",
    company: "Apex Partners",
    logo: "AP",
    type: "Upper Mid-Market",
    aum: "$5.0B AUM",
    challenge: "Portfolio companies struggling with operational efficiency and margin pressure",
    solution: "Deployed AI automation across 8 portfolio companies for operations optimization",
    results: [
      { metric: "$18M", description: "Total value created" },
      { metric: "22%", description: "Average margin improvement" },
      { metric: "6", description: "AI implementations deployed" },
      { metric: "4 months", description: "Average payback period" },
    ],
    quote: "The AI Partnership Program gave us capabilities we couldn't build internally. It's like having a dedicated AI team for each portfolio company.",
    timeline: "Ongoing partnership, new AI every month",
    technologies: ["Process Automation", "Predictive Analytics", "Custom AI Agents"],
  },
]

const commonUseCases = [
  {
    icon: ChartBarIcon,
    title: "Deal Sourcing & Origination",
    description: "AI agents continuously scan markets for opportunities matching your criteria",
    impact: "3-5x more qualified deals",
  },
  {
    icon: ClockIcon,
    title: "Due Diligence Automation",
    description: "Analyze documents, financials, and data rooms in hours instead of weeks",
    impact: "80% time reduction",
  },
  {
    icon: ArrowTrendingUpIcon,
    title: "Portfolio Value Creation",
    description: "Deploy AI across portfolio companies for operational improvements",
    impact: "$1-5M per company",
  },
  {
    icon: RocketLaunchIcon,
    title: "Exit Optimization",
    description: "AI-driven market timing and buyer identification",
    impact: "15-20% higher multiples",
  },
]

export default function PECaseStudiesPage() {
  return (
    <div className="spr-theme spr-page min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-green-600/20 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-6xl">
            PE Firms <span className="gradient-text">Winning with AI</span>
          </h1>
          <p className="text-xl text-gray-300">
            Real results from real firms. See how AI is transforming private equity.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">$47M+</div>
              <div className="mt-2 text-sm text-gray-400">Total value created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">127</div>
              <div className="mt-2 text-sm text-gray-400">AI implementations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">23</div>
              <div className="mt-2 text-sm text-gray-400">PE firms served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">5.2x</div>
              <div className="mt-2 text-sm text-gray-400">Average ROI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Success Stories</h2>
          
          <div className="space-y-12">
            {caseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-2xl font-bold text-white">
                        {study.logo}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{study.company}</CardTitle>
                        <p className="text-sm text-gray-400">
                          {study.type} • {study.aum}
                        </p>
                      </div>
                    </div>
                    <BuildingOfficeIcon className="h-8 w-8 text-gray-600" />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Challenge & Solution */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-semibold text-red-400">Challenge</h4>
                      <p className="text-gray-400">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold text-green-400">Solution</h4>
                      <p className="text-gray-400">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="mb-4 font-semibold">Results</h4>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="rounded-lg bg-gray-800/50 p-4 text-center">
                          <div className="text-2xl font-bold text-blue-400">
                            {result.metric}
                          </div>
                          <div className="mt-1 text-xs text-gray-400">
                            {result.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300">
                    "{study.quote}"
                  </blockquote>

                  {/* Details */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-400">Timeline: {study.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RocketLaunchIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-400">
                        Tech: {study.technologies.join(", ")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Most Popular AI Applications for PE
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            {commonUseCases.map((useCase) => (
              <Card key={useCase.title} className="border-gray-800 bg-gray-900/50 backdrop-blur">
                <CardContent className="flex gap-4 p-6">
                  <useCase.icon className="h-10 w-10 flex-shrink-0 text-blue-400" />
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">{useCase.title}</h3>
                    <p className="mb-2 text-gray-400">{useCase.description}</p>
                    <p className="text-sm font-semibold text-green-400">
                      Typical Impact: {useCase.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Teaser */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden border-gray-800 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur">
            <CardContent className="p-8 text-center">
              <CurrencyDollarIcon className="mx-auto mb-4 h-16 w-16 text-green-400" />
              <h3 className="mb-4 text-2xl font-bold">Calculate Your AI ROI</h3>
              <p className="mb-6 text-gray-300">
                Based on these case studies, a typical $1B PE fund could see:
              </p>
              
              <div className="mb-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-800/50 p-4">
                  <div className="text-xl font-bold text-green-400">$3-5M</div>
                  <div className="text-sm text-gray-400">Annual savings</div>
                </div>
                <div className="rounded-lg bg-gray-800/50 p-4">
                  <div className="text-xl font-bold text-blue-400">200+</div>
                  <div className="text-sm text-gray-400">Hours saved/month</div>
                </div>
                <div className="rounded-lg bg-gray-800/50 p-4">
                  <div className="text-xl font-bold text-purple-400">2-3x</div>
                  <div className="text-sm text-gray-400">More deals</div>
                </div>
              </div>
              
              <Link href="/ai-assessment">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Your Custom AI Assessment
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Ready to Join These Success Stories?
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Start with a free assessment or jump straight into implementation
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/ai-assessment">
              <Button size="lg" variant="outline">
                Free AI Assessment
              </Button>
            </Link>
            <Link href="/ai-sprint">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Book 5-Day Sprint
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}