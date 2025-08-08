import type { Metadata } from "next"
import Link from "next/link"
import { Rocket, Brain, Users, Target, ArrowRight, Zap } from "lucide-react"
import { METRICS } from "@/lib/constants"
import { getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("about")

const values = [
  {
    icon: Rocket,
    title: "Move at the Pace of AI",
    description: "First prototype in 10 days. We ship AI solutions at the speed of innovation, not bureaucracy.",
  },
  {
    icon: Brain,
    title: "Human-Centered Design",
    description: "We build AI that augments human capability, not replaces it. Technology should enable people to do work they love.",
  },
  {
    icon: Users,
    title: "Create Abundance",
    description: "AI doesn't destroy jobs—it creates opportunities. We've helped create 50+ new roles by automating the mundane.",
  },
  {
    icon: Target,
    title: "Purposeful Innovation",
    description: "Every AI system we build frees humans from repetitive tasks so they can pursue meaningful, creative work.",
  },
]

const timeline = [
  { year: "2018", event: "Started in a garage with one mission: make AI practical for real businesses" },
  { year: "2019", event: "Deployed first production AI agent - automated 70% of loan processing for a regional bank" },
  { year: "2020", event: "Pivoted to healthcare during COVID - built triage systems handling 10K+ patients daily" },
  { year: "2021", event: "Launched venture model - became technical co-founders instead of just vendors" },
  { year: "2022", event: "Our AI systems generated $5M+ in new revenue for clients" },
  { year: "2023", event: "Fortune 500 breakthrough - deployed enterprise AI handling millions in transactions" },
  { year: "2024", event: "Now powering 50+ production AI systems generating $10M+ annually" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Our Story</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AI That Helps People, <span className="gradient-text">Not Replace Them</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe human time is precious. AI should handle the tasks people hate, 
            so they can focus on work that brings purpose and joy.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="p-8 rounded-2xl bg-card/5 border border-border/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6">A Note from Our Founder</h2>
            <p className="text-lg text-foreground/80 mb-4 italic">
              &quot;In 2018, I was watching companies spend millions on AI consultants who delivered PowerPoints instead of products. 
              I knew there had to be a better way.&quot;
            </p>
            <p className="text-lg text-foreground/80 mb-4">
              After building AI systems at scale for enterprises, I founded Sprinter AI with a deeper purpose: 
              to create technology that enables human flourishing. Yes, we deliver ROI. But more importantly, 
              we free people from soul-crushing repetitive work so they can contribute their unique human talents.
            </p>
            <p className="text-lg text-foreground/80 mb-4">
              Six years and 50+ deployments later, we&apos;ve proven this model works. We&apos;ve automated mortgage underwriting, 
              built AI agents that manage patient care, and created systems that generate millions in new revenue. 
              Not in theory. In production. With real users and real results.
            </p>
            <p className="text-lg text-foreground/80">
              <strong className="text-foreground">Our philosophy: Build technology that helps people.</strong> 
              {" "}Every AI system we deploy doesn&apos;t just drive ROI—it gives people back their time, 
              their creativity, and their opportunity to do meaningful work. That&apos;s the real value we create.
            </p>
            <div className="mt-8 pt-6 border-t border-border/10">
              <p className="text-base font-semibold text-foreground">— Alex Chen</p>
              <p className="text-sm text-muted-foreground">Founder & CEO, Sprinter AI</p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-xl bg-card/5 border border-border/10 hover:bg-card/10 transition-all"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 w-fit mb-4">
                  <value.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600" />
            {timeline.map((item) => (
              <div
                key={item.year}
                className="flex gap-6 mb-8 relative"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-sm font-bold">{item.year}</span>
                </div>
                <div className="flex-1 p-4 rounded-lg bg-card/5 border border-border/10">
                  <p className="text-foreground/80">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">{METRICS.revenueGenerated}</div>
            <p className="text-sm text-muted-foreground">Client Revenue Generated</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">50+</div>
            <p className="text-sm text-muted-foreground">AI Products Deployed</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">{METRICS.clientSatisfaction}</div>
            <p className="text-sm text-muted-foreground">Client Satisfaction</p>
          </div>
        </div>

        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-border/10">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Build AI That <span className="gradient-text">Empowers People</span>?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the companies creating abundance through human-centered AI. 
            Let&apos;s build technology that helps people thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-8 py-3 bg-card/10 text-foreground font-medium rounded-lg hover:bg-card/20 transition-colors"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}