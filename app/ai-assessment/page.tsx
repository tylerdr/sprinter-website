import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ChartBarIcon, DocumentTextIcon, ClockIcon, ShieldCheckIcon, SparklesIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Free AI Readiness Assessment for Private Equity | Sprinter AI",
  description: "Discover where AI can add millions to your portfolio value. Get a personalized AI opportunity report in 24 hours. No cost, no risk.",
  openGraph: {
    title: "Free AI Readiness Assessment for Private Equity",
    description: "Discover where AI can add millions to your portfolio value. Get a personalized AI opportunity report in 24 hours.",
    type: "website",
  },
}

const benefits = [
  {
    icon: ChartBarIcon,
    title: "AI Readiness Score",
    description: "Know exactly where you stand vs. competitors (40% of PE firms already have AI strategies)",
  },
  {
    icon: DocumentTextIcon,
    title: "3 Quick-Win Opportunities",
    description: "Specific AI implementations that could save $100K+ or accelerate deals by 80%",
  },
  {
    icon: ClockIcon,
    title: "24-Hour Turnaround",
    description: "Fill out 10 questions, get your custom report within one business day",
  },
  {
    icon: ShieldCheckIcon,
    title: "Zero Risk, Zero Cost",
    description: "Completely free assessment with no obligation or hidden fees",
  },
]

const testimonials = [
  {
    quote: "Our team left the workshop feeling inspired and ready to tackle our AI strategy",
    author: "Collin",
    company: "Rock Hill Capital",
  },
  {
    quote: "Removed human error and redundant tasks, allowing us to focus on strategic decisions that maximize investors' returns",
    author: "Executive",
    company: "Vero Capital",
  },
]

export default function AIAssessmentPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-4xl">
          {/* Trust Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm">
              <SparklesIcon className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400">Trusted by Leading PE Firms</span>
            </div>
          </div>

          <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            Is Your PE Firm Ready for AI?
          </h1>
          
          <p className="mt-6 text-center text-xl leading-8 text-gray-300">
            Get a Free AI Opportunity Report in 24 Hours
          </p>
          
          <p className="mt-4 text-center text-lg text-gray-400">
            Discover where AI could add $1M+ to your portfolio value. Tasks that took weeks in due diligence now take minutes with the right AI tools.
          </p>
          
          <div className="mt-10 flex justify-center">
            <a href="#assessment-form" className="group">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg hover:from-blue-700 hover:to-purple-700"
              >
                Get My Free AI Assessment
                <ChevronRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">What You'll Get</h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-gray-800 bg-gray-900/50 backdrop-blur">
                <CardContent className="flex gap-4 p-6">
                  <benefit.icon className="h-8 w-8 flex-shrink-0 text-blue-400" />
                  <div>
                    <h3 className="mb-2 font-semibold text-white">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FOMO Section */}
      <section className="bg-gradient-to-b from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">Don't Get Left Behind</h2>
          <div className="space-y-4 text-lg text-gray-400">
            <p>
              <span className="font-semibold text-blue-400">40% of PE general partners</span> already have an AI strategy in place
            </p>
            <p>
              <span className="font-semibold text-purple-400">70% of financial organizations</span> are using advanced analytics or piloting AI
            </p>
            <p>
              Firms using AI for deal sourcing can <span className="font-semibold text-green-400">evaluate targets in hours instead of days</span>
            </p>
          </div>
        </div>
      </section>

      {/* Assessment Form */}
      <section id="assessment-form" className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardContent className="p-8">
              <h2 className="mb-6 text-center text-2xl font-bold">Start Your Free AI Assessment</h2>
              <p className="mb-8 text-center text-gray-400">
                Takes less than 5 minutes. Get your report within 24 hours.
              </p>
              
              <form className="space-y-6" action="/api/ai-assessment" method="POST">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Your Information</h3>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" name="firstName" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" name="lastName" required className="mt-1" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Business Email *</Label>
                    <Input id="email" name="email" type="email" required className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">PE Firm Name *</Label>
                    <Input id="company" name="company" required className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="role">Your Role *</Label>
                    <Input id="role" name="role" placeholder="e.g., Managing Partner, Operating Partner" required className="mt-1" />
                  </div>
                </div>

                {/* Assessment Questions */}
                <div className="space-y-6 border-t border-gray-800 pt-6">
                  <h3 className="font-semibold">Quick Assessment Questions</h3>
                  
                  {/* Question 1 */}
                  <div>
                    <Label>1. What is your firm's AUM range?</Label>
                    <RadioGroup name="aum" className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="<500M" id="aum1" />
                        <Label htmlFor="aum1">Less than $500M</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="500M-1B" id="aum2" />
                        <Label htmlFor="aum2">$500M - $1B</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1B-5B" id="aum3" />
                        <Label htmlFor="aum3">$1B - $5B</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value=">5B" id="aum4" />
                        <Label htmlFor="aum4">More than $5B</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Question 2 */}
                  <div>
                    <Label>2. How many portfolio companies do you currently manage?</Label>
                    <RadioGroup name="portfolio_size" className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1-5" id="ps1" />
                        <Label htmlFor="ps1">1-5 companies</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="6-15" id="ps2" />
                        <Label htmlFor="ps2">6-15 companies</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="16-30" id="ps3" />
                        <Label htmlFor="ps3">16-30 companies</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value=">30" id="ps4" />
                        <Label htmlFor="ps4">More than 30 companies</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Question 3 */}
                  <div>
                    <Label>3. What's your current AI adoption level?</Label>
                    <RadioGroup name="ai_adoption" className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="ai1" />
                        <Label htmlFor="ai1">No AI initiatives yet</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="exploring" id="ai2" />
                        <Label htmlFor="ai2">Exploring opportunities</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="piloting" id="ai3" />
                        <Label htmlFor="ai3">Running pilots</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="implementing" id="ai4" />
                        <Label htmlFor="ai4">Actively implementing</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Question 4 */}
                  <div>
                    <Label htmlFor="biggest_challenge">
                      4. What's your biggest operational challenge that takes the most time?
                    </Label>
                    <Textarea 
                      id="biggest_challenge" 
                      name="biggest_challenge"
                      placeholder="e.g., Deal sourcing, due diligence, portfolio reporting, value creation..."
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  {/* Question 5 */}
                  <div>
                    <Label htmlFor="primary_interest">
                      5. Which AI use case interests you most?
                    </Label>
                    <RadioGroup name="primary_interest" className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="deal_sourcing" id="pi1" />
                        <Label htmlFor="pi1">AI-powered deal sourcing & market mapping</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="due_diligence" id="pi2" />
                        <Label htmlFor="pi2">Automated due diligence & document analysis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="portfolio_ops" id="pi3" />
                        <Label htmlFor="pi3">Portfolio company operations & efficiency</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="value_creation" id="pi4" />
                        <Label htmlFor="pi4">AI-driven value creation strategies</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg hover:from-blue-700 hover:to-purple-700"
                  >
                    Get My Free AI Opportunity Report
                  </Button>
                  <p className="mt-4 text-center text-sm text-gray-500">
                    100% free. No credit card required. Results in 24 hours.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">What PE Leaders Say</h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="border-gray-800 bg-gray-900/50 backdrop-blur">
                <CardContent className="p-6">
                  <p className="mb-4 italic text-gray-300">"{testimonial.quote}"</p>
                  <div className="text-sm">
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-t from-gray-900/50 to-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to See Your AI Opportunities?</h2>
          <p className="mb-8 text-lg text-gray-400">
            Join the 40% of PE firms already leveraging AI for competitive advantage
          </p>
          <a href="#assessment-form">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg hover:from-blue-700 hover:to-purple-700"
            >
              Start Free Assessment Now
            </Button>
          </a>
        </div>
      </section>
    </div>
  )
}