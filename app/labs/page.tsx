'use client';

import Link from "next/link";
import { Bot, Workflow, Palette, Gamepad2, BarChart3, Code2, FileText, MessageSquare, Calculator, ArrowRight, Blocks, Megaphone, Music, Sparkles, Star, BookOpen, Database, Mic, FileQuestion, Globe, Lightbulb } from "lucide-react";
import { useState } from "react";
import ScrollFloat from "@/components/ScrollFloat";
import SwooshText from "@/components/kokonutui/swoosh-text";

interface Lab {
  icon: any;
  title: string;
  description: string;
  href: string;
  gradient: string;
  category: string;
  actionVerb: string;
  featured?: boolean;
  requiresAuth?: boolean;
  comingSoon?: boolean;
}

const labs: Lab[] = [
  // Portfolio Ops
  {
    icon: BarChart3,
    title: "Portfolio Health Dashboard",
    description:
      "Monitor AI readiness, track value creation, and keep LP updates in one live command center.",
    href: "/dashboard/portfolio-health",
    gradient: "from-blue-600 to-purple-700",
    category: "portfolio",
    actionVerb: "Monitor",
    featured: true,
    requiresAuth: true,
  },
  {
    icon: BookOpen,
    title: "AI Playbook Builder",
    description:
      "Generate board-ready AI playbooks with implementation roadmap, governance, and ROI projections in minutes.",
    href: "/labs/ai-playbook",
    gradient: "from-indigo-600 to-purple-700",
    category: "portfolio",
    actionVerb: "Generate",
    featured: true,
  },
  {
    icon: Gamepad2,
    title: "PE Tycoon",
    description:
      "Simulate a fund, test operating decisions, and see how AI systems compound value across hypothetical portfolios.",
    href: "/labs/pe-tycoon",
    gradient: "from-emerald-600 to-teal-700",
    category: "portfolio",
    actionVerb: "Play",
  },
  {
    icon: Sparkles,
    title: "Just Hire AI",
    description:
      "Quantify automation potential by role and location. Build the ops case before you walk into the IC.",
    href: "/labs/just-hire-ai",
    gradient: "from-orange-500 to-red-600",
    category: "portfolio",
    actionVerb: "Analyze",
  },

  // Deal Intelligence
  {
    icon: BarChart3,
    title: "PE Deal-Flow Analyzer",
    description:
      "Score incoming deals, surface red flags, and highlight AI value creation levers before IOIs are due.",
    href: "/labs/deal-flow-analyzer",
    gradient: "from-green-600 to-blue-700",
    category: "deal",
    actionVerb: "Analyze",
    featured: true,
  },
  {
    icon: Sparkles,
    title: "AI Opportunity Audit",
    description:
      "Run a 10-minute diligence sprint on any company. Prioritize automation plays with modeled ROI and effort.",
    href: "/labs/opportunity-audit",
    gradient: "from-yellow-500 to-orange-600",
    category: "deal",
    actionVerb: "Assess",
  },
  {
    icon: BookOpen,
    title: "AI Industry Blueprint",
    description:
      "Compare vendors, map competitor moves, and export an industry-specific AI thesis your partners can run with.",
    href: "/labs/industry-blueprint",
    gradient: "from-purple-500 to-pink-600",
    category: "deal",
    actionVerb: "Generate",
  },

  // Process Automation
  {
    icon: Bot,
    title: "Agent Simulator",
    description:
      "Watch autonomous agents orchestrate complex back-office tasks in parallel. Stress test your next automation before build.",
    href: "/labs/agent-simulator",
    gradient: "from-blue-500 to-cyan-600",
    category: "automation",
    actionVerb: "Watch",
    featured: true,
  },
  {
    icon: Blocks,
    title: "Agent Playground",
    description:
      "Drag-and-drop an agent workflow, chain tools, and deploy working prototypes without touching code.",
    href: "/labs/agent-playground",
    gradient: "from-indigo-500 to-purple-600",
    category: "automation",
    actionVerb: "Build",
  },
  {
    icon: MessageSquare,
    title: "AI Assistant",
    description:
      "Route tasks to specialized Sprinter agents with tool calling, retrieval, and guardrails tuned for PE-backed teams.",
    href: "/labs/ai-assistant",
    gradient: "from-cyan-500 to-blue-600",
    category: "automation",
    actionVerb: "Chat",
  },
  {
    icon: Workflow,
    title: "Workflow Designer",
    description:
      "Map processes end-to-end, tag automation candidates, and export the sprint backlog directly into your PM tool.",
    href: "/labs/workflow-tool",
    gradient: "from-purple-500 to-pink-600",
    category: "automation",
    actionVerb: "Design",
    featured: true,
  },
  {
    icon: Calculator,
    title: "AI ROI Calculator",
    description:
      "Model savings, payback period, and sensitivity in minutes using real workload data from your operators.",
    href: "/labs/roi-calculator",
    gradient: "from-green-500 to-emerald-600",
    category: "automation",
    actionVerb: "Calculate",
  },

  // Document Intelligence
  {
    icon: FileText,
    title: "Document Intelligence",
    description:
      "Ingest diligence docs, contracts, and board packs. Ask questions with citations and route insights to the right people.",
    href: "/labs/document-intelligence",
    gradient: "from-amber-500 to-orange-600",
    category: "docs",
    actionVerb: "Upload",
  },
  {
    icon: Database,
    title: "PDF Attribute Extraction",
    description:
      "Extract structured data from invoices, SOC reports, or QBR decks with reusable schemas and confidence scoring.",
    href: "/labs/pdf-extractor",
    gradient: "from-teal-500 to-cyan-600",
    category: "docs",
    actionVerb: "Extract",
    featured: true,
  },
  {
    icon: MessageSquare,
    title: "PDF Document Chat",
    description:
      "Hold a conversation with any diligence binder or OPCO SOP. Get summarized answers with instant follow-ups.",
    href: "/labs/pdf-chat",
    gradient: "from-violet-500 to-indigo-600",
    category: "docs",
    actionVerb: "Chat",
  },
  {
    icon: Code2,
    title: "AI Code Review Assistant",
    description:
      "Audit engineering output, vendor drops, or automation scripts for quality, security, and maintainability.",
    href: "/labs/code-review",
    gradient: "from-indigo-500 to-blue-600",
    category: "docs",
    actionVerb: "Review",
  },
  {
    icon: Calculator,
    title: "AI Data Analyzer",
    description:
      "Drop in CSVs or Excel models and generate trends, visualizations, and recommendations on the fly.",
    href: "/labs/data-analyzer",
    gradient: "from-emerald-500 to-cyan-600",
    category: "docs",
    actionVerb: "Analyze",
  },

  // Creative & Play
  {
    icon: Palette,
    title: "Ideation Lab",
    description:
      "Warm up the team with lightning-fast ideation games that spark backlog-worthy automation ideas.",
    href: "/labs/ideation",
    gradient: "from-green-500 to-teal-600",
    category: "creative",
    actionVerb: "Create",
  },
  {
    icon: Megaphone,
    title: "AI Ad Creator",
    description:
      "Spin up multi-channel creative for portfolio GTM experiments without waiting on design resources.",
    href: "/labs/ad-creator",
    gradient: "from-pink-500 to-purple-600",
    category: "creative",
    actionVerb: "Launch",
  },
  {
    icon: Music,
    title: "AI Music Studio",
    description:
      "Generate on-brand audio beds and stingers for content teams or podcast launches in seconds.",
    href: "/labs/music-studio",
    gradient: "from-purple-500 to-indigo-600",
    category: "creative",
    actionVerb: "Compose",
  },
  {
    icon: Gamepad2,
    title: "Agent Battle",
    description:
      "Put model choices head-to-head in a moderated debate to decide which one belongs in your next automation.",
    href: "/labs/agent-battle",
    gradient: "from-red-500 to-pink-600",
    category: "creative",
    actionVerb: "Battle",
  },

  // Voice & Conversation
  {
    icon: Mic,
    title: "Realtime Voice Chat",
    description:
      "Experience natural AI conversations with real-time speech recognition and lifelike voice responses.",
    href: "/labs/voice-chat",
    gradient: "from-pink-500 to-rose-600",
    category: "voice",
    actionVerb: "Chat",
    featured: true,
  },
  {
    icon: Mic,
    title: "Voice to Process",
    description:
      "Describe your workflow verbally and watch AI create detailed process maps with optimization suggestions.",
    href: "/labs/voice-to-process",
    gradient: "from-violet-500 to-purple-600",
    category: "voice",
    actionVerb: "Speak",
  },

  // Advanced Creative Tools
  {
    icon: Palette,
    title: "AI Sketch Studio",
    description:
      "Draw rough sketches and watch AI transform them into polished artwork for presentations and decks.",
    href: "/labs/sketch-studio",
    gradient: "from-orange-500 to-red-600",
    category: "creative",
    actionVerb: "Design",
    featured: true,
  },
  {
    icon: Code2,
    title: "Vibe Coding",
    description:
      "Describe any UI component and get production-ready code instantly with framework selection.",
    href: "/labs/vibe-coding",
    gradient: "from-purple-500 to-indigo-600",
    category: "creative",
    actionVerb: "Generate",
  },
  {
    icon: Workflow,
    title: "Storyboarding & ConstrUX",
    description:
      "Map user journeys visually, design wireframes, and simulate complete experience flows.",
    href: "/labs/storyboarding",
    gradient: "from-blue-500 to-cyan-600",
    category: "creative",
    actionVerb: "Design",
  },
  {
    icon: Blocks,
    title: "Component Studio",
    description:
      "Build AI-powered React components visually with drag-drop configuration and intelligent behavior.",
    href: "/labs/component-studio",
    gradient: "from-indigo-500 to-purple-600",
    category: "creative",
    actionVerb: "Build",
  },

  // Interactive Games & Simulations
  {
    icon: Blocks,
    title: "Tiny Town",
    description:
      "Simulate miniature worlds with AI NPCs to test workflows and discover operational bottlenecks.",
    href: "/labs/tiny-town",
    gradient: "from-emerald-500 to-teal-600",
    category: "play",
    actionVerb: "Simulate",
  },
  {
    icon: Gamepad2,
    title: "Prompt Party",
    description:
      "Play the Startup Edition party game with friends and AI players for team building sessions.",
    href: "/labs/cards-against-ai",
    gradient: "from-purple-600 to-pink-600",
    category: "play",
    actionVerb: "Play",
  },
  {
    icon: Palette,
    title: "AI Telestrations",
    description:
      "Draw, guess, and laugh as sketches transform through human and AI interpretations.",
    href: "/labs/ai-telestrations",
    gradient: "from-orange-500 to-pink-500",
    category: "play",
    actionVerb: "Draw",
  },
  {
    icon: BookOpen,
    title: "Story Adventure",
    description:
      "Choose-your-own-adventure where AI writes the story and teams vote on strategic decisions.",
    href: "/labs/story-adventure",
    gradient: "from-indigo-500 to-purple-600",
    category: "play",
    actionVerb: "Create",
  },
  {
    icon: Globe,
    title: "Future Scenarios",
    description:
      "Build future worlds together with AI to explore strategic scenarios and market evolution.",
    href: "/labs/future-scenarios",
    gradient: "from-cyan-500 to-blue-600",
    category: "play",
    actionVerb: "Build",
  },

  // Additional Document Tools
  {
    icon: FileQuestion,
    title: "PDF Quiz Generator",
    description:
      "Upload training materials and automatically generate quizzes for onboarding and compliance.",
    href: "/labs/quiz-generator",
    gradient: "from-purple-500 to-violet-600",
    category: "docs",
    actionVerb: "Generate",
  },

  // Portfolio-Specific Tools
  {
    icon: BookOpen,
    title: "Portfolio AI Blueprint",
    description:
      "Generate comprehensive AI transformation roadmaps tailored to your portfolio composition.",
    href: "/labs/portfolio-ai-blueprint",
    gradient: "from-blue-600 to-indigo-700",
    category: "portfolio",
    actionVerb: "Generate",
  },
  {
    icon: BarChart3,
    title: "Lead Gen Visualizer",
    description:
      "Map and optimize your portfolio companies' lead generation funnels with AI insights.",
    href: "/labs/lead-gen-visualizer",
    gradient: "from-green-500 to-blue-600",
    category: "portfolio",
    actionVerb: "Visualize",
  },

  // Demo & Testing
  {
    icon: Lightbulb,
    title: "AI Elements Demo",
    description:
      "Explore our complete library of AI UI components and interaction patterns.",
    href: "/labs/ai-elements-demo",
    gradient: "from-yellow-500 to-orange-600",
    category: "demo",
    actionVerb: "Explore",
  },
];

const categories = [
  { id: "all", name: "All", description: "View every Sprinter lab" },
  { id: "portfolio", name: "Portfolio Ops", description: "Operating partner command centers" },
  { id: "deal", name: "Deal Intelligence", description: "Diligence and sourcing accelerators" },
  { id: "automation", name: "Process Automation", description: "Agent workflows and ROI tools" },
  { id: "docs", name: "Document Intelligence", description: "Extraction, chat, and analysis" },
  { id: "voice", name: "Voice AI", description: "Natural language and voice interactions" },
  { id: "creative", name: "Creative Tools", description: "Design, code, and content generation" },
  { id: "play", name: "Games & Simulations", description: "Interactive team experiences" },
  { id: "demo", name: "Demos", description: "Component libraries and showcases" },
];

export default function LabsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const featuredLabs = labs.filter(lab => lab.featured);
  const regularLabs = labs.filter(lab => !lab.featured);
  
  const filteredLabs = activeCategory === "all" 
    ? labs 
    : labs.filter(lab => lab.category === activeCategory);

  // Calculate counts for each category
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category.id] = category.id === "all" 
      ? labs.length 
      : labs.filter(lab => lab.category === category.id).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            Sprinter <span className="gradient-text">Labs</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
            Test the portfolio operating system before you deploy it. Explore diligence analyzers, agent workflows, and automation proofs of concept built for private equity.
          </p>
        </div>

        {/* Sticky Category Navigation */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/30 mb-8 sm:mb-12">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex overflow-x-auto scrollbar-hide gap-2 sm:gap-4 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-brand-gradient text-primary-foreground shadow-lg"
                      : "bg-card/30 text-muted-foreground hover:bg-card/400 hover:text-foreground"
                  }`}
                  aria-label={`Filter by ${category.name}: ${category.description} (${categoryCounts[category.id]} items)`}
                >
                  <span className="flex items-center gap-2">
                    {category.name}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === category.id 
                        ? "bg-white/20 text-white" 
                        : "bg-muted-foreground/20"
                    }`}>
                      {categoryCounts[category.id]}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Grid Layout */}
        <div className="max-w-7xl mx-auto">
          {/* Category Title */}
          {activeCategory !== "all" && (
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {categories.find(c => c.id === activeCategory)?.name} Tools
              </h2>
              <p className="text-muted-foreground">
                {categories.find(c => c.id === activeCategory)?.description}
              </p>
            </div>
          )}

          {/* Featured Labs Grid (only show when viewing all) */}
          {activeCategory === "all" && featuredLabs.length > 0 && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400">
                  <Star className="w-4 h-4" />
                  FEATURED EXPERIENCES
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredLabs.map((lab) => (
                  <Link
                    key={lab.title}
                    href={lab.href}
                    className="group block p-6 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-orange-600/5 border-2 border-yellow-500/20 backdrop-blur-sm hover:border-yellow-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-500/10"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${lab.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <lab.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                      {lab.title}
                      {lab.comingSoon && (
                        <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30">
                          Coming Soon
                        </span>
                      )}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">
                      {lab.description}
                    </p>
                    <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-semibold">
                      {lab.actionVerb} now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Responsive Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
            role="list"
          >
            {filteredLabs.filter(lab => activeCategory === "all" ? !lab.featured : true).map((lab) => (
              <div key={lab.title} className="w-full" role="listitem">
                <Link
                  href={lab.href}
                  className="group block h-full p-6 sm:p-8 rounded-2xl bg-card/20 border border-border/30 backdrop-blur-sm hover:bg-card/15 hover:border-border/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand/10 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background relative overflow-hidden"
                  aria-label={`${lab.actionVerb} ${lab.title} - ${lab.description}`}
                >
                  {/* Glow Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" 
                       style={{backgroundImage: `linear-gradient(135deg, ${lab.gradient.replace('from-', '').replace(' to-', ', ')})`}} />
                  
                  {/* Action Verb Badge or Coming Soon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {lab.comingSoon ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30">
                        Coming Soon
                      </span>
                    ) : (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${lab.gradient} text-white shadow-lg`}>
                        {lab.actionVerb}
                      </span>
                    )}
                  </div>

                  <div
                    className={`inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br ${lab.gradient} mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                    aria-hidden="true"
                  >
                    <lab.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                    {lab.title}
                    {lab.comingSoon && (
                      <span className="block mt-2 text-xs font-medium px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30 inline-block">
                        Coming Soon
                      </span>
                    )}
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {lab.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-brand font-medium group-hover:opacity-90 text-sm sm:text-base mt-auto">
                    {lab.actionVerb} now
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 sm:mt-20 p-6 sm:p-8 rounded-2xl border border-brand-30 bg-brand-10 max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">
            Ready to pilot this inside a portfolio company?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            Pick the labs you want to prove out. We&apos;ll run a 10-day sprint with your operators and deliver production-ready automations.
          </p>
          <Link
            href="/contact?type=pilot"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity touch-manipulation min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background"
          >
            Book a Portfolio Sprint
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
