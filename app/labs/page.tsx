'use client';

import Link from "next/link";
import { Bot, Workflow, Palette, Gamepad2, BarChart3, Mic, Code2, FileText, MessageSquare, Calculator, ArrowRight, Blocks, FileQuestion, Megaphone, Music, Sparkles, Star, Globe, BookOpen, Database, MessagesSquare, Building2 } from "lucide-react";
import { useState } from "react";

const peCategories = [
  { id: "portfolio", name: "Portfolio Operations", icon: Building2 },
  { id: "deals", name: "Deal Intelligence", icon: BarChart3 },
  { id: "strategy", name: "AI Strategy", icon: Sparkles },
  { id: "automation", name: "Process Automation", icon: Bot },
  { id: "docs", name: "Document Analysis", icon: FileText },
  { id: "creative", name: "Creative Tools", icon: Palette },
];

const labs = [
  // Portfolio Operations - For managing portfolio companies
  {
    icon: BarChart3,
    title: "Portfolio Health Dashboard",
    description:
      "Monitor AI readiness and opportunities across your entire portfolio. Track implementation progress and value creation in real-time.",
    href: "/dashboard/portfolio-health",
    gradient: "from-blue-600 to-purple-700",
    category: "portfolio",
    actionVerb: "Monitor",
    featured: true,
    requiresAuth: true,
    comingSoon: true,
  },
  {
    icon: BookOpen,
    title: "AI Playbook Builder",
    description:
      "Generate comprehensive, board-ready AI strategies for any portfolio company. Get implementation roadmaps, ROI projections, and resource plans.",
    href: "/labs/ai-playbook",
    gradient: "from-purple-600 to-indigo-700",
    category: "portfolio",
    actionVerb: "Generate",
    featured: true,
    requiresAuth: true,
  },
  {
    icon: Gamepad2,
    title: "PE Tycoon Game",
    description:
      "Run a virtual PE fund with AI assistance. Practice deal-making, portfolio operations, and exit strategies in a risk-free environment.",
    href: "/labs/pe-tycoon",
    gradient: "from-emerald-600 to-teal-700",
    category: "portfolio",
    actionVerb: "Play",
    featured: true,
  },
  // Deal Intelligence - For sourcing and diligence
  {
    icon: BarChart3,
    title: "PE Deal-Flow Analyzer",
    description:
      "Instantly analyze potential acquisitions with AI. Get investment scores, valuation guidance, and AI value creation opportunities.",
    href: "/labs/deal-flow-analyzer",
    gradient: "from-green-600 to-blue-700",
    category: "deals",
    actionVerb: "Analyze",
    featured: true,
  },
  {
    icon: Sparkles,
    title: "AI Opportunity Audit",
    description:
      "Assess any company's AI potential in 10 minutes. Get prioritized opportunities, ROI projections, and implementation roadmap.",
    href: "/labs/opportunity-audit",
    gradient: "from-yellow-600 to-orange-700",
    category: "deals",
    actionVerb: "Assess",
    featured: true,
  },
  // AI Strategy - For planning transformations
  {
    icon: Sparkles,
    title: "AI Industry Blueprint",
    description:
      "Generate industry-specific AI transformation strategies. Get use cases, vendor analysis, and competitive benchmarking.",
    href: "/labs/industry-blueprint",
    gradient: "from-purple-600 to-pink-700",
    category: "strategy",
    actionVerb: "Generate",
    featured: true,
  },
  {
    icon: Bot,
    title: "Just Hire AI",
    description:
      "Analyze workforce automation potential. See which roles AI can augment or replace with cost-benefit analysis.",
    href: "/labs/just-hire-ai",
    gradient: "from-orange-600 to-red-700",
    category: "strategy",
    actionVerb: "Analyze",
  },
  // Process Automation - For operational efficiency
  {
    icon: Bot,
    title: "Agent Simulator",
    description:
      "Watch multiple AI agents collaborate in parallel to solve complex tasks. See how agentic workflows handle real-world scenarios.",
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
      "Build AI agent workflows visually by snapping together blocks for reading, processing, deciding, and outputting. See how agents work together.",
    href: "/labs/agent-playground",
    gradient: "from-indigo-500 to-purple-600",
    category: "automation",
    actionVerb: "Build",
    comingSoon: true,
  },
  {
    icon: MessageSquare,
    title: "AI Assistant",
    description:
      "Experience our sophisticated AI assistant with specialized agents, tool calling capabilities, and intelligent reasoning. Choose your agent and see Sprinter's AI in action.",
    href: "/labs/ai-assistant",
    gradient: "from-cyan-500 to-blue-600",
    category: "automation",
    actionVerb: "Chat",
    comingSoon: true,
  },
  {
    icon: Workflow,
    title: "Workflow Designer",
    description:
      "Map your business processes and discover where AI can augment or automate steps. Get a personalized AI transformation roadmap.",
    href: "/labs/workflow-tool",
    gradient: "from-purple-500 to-pink-600",
    category: "automation",
    actionVerb: "Build",
    featured: true,
    comingSoon: true,
  },
  
  // Document Analysis - For due diligence and operations
  {
    icon: FileText,
    title: "Document Intelligence",
    description:
      "Upload PDFs, reports, or documents and extract key insights, summaries, and answer specific questions about the content.",
    href: "/labs/document-intelligence",
    gradient: "from-amber-500 to-orange-600",
    category: "docs",
    actionVerb: "Upload",
  },
  {
    icon: FileQuestion,
    title: "PDF Quiz Generator",
    description:
      "Upload any PDF and automatically generate customized quizzes with multiple choice, true/false, and short answer questions.",
    href: "/labs/quiz-generator",
    gradient: "from-purple-500 to-violet-600",
    category: "docs",
    actionVerb: "Upload",
  },
  {
    icon: Code2,
    title: "AI Code Review Assistant",
    description:
      "Paste your code and get AI-powered suggestions for improvements, security fixes, and best practice recommendations.",
    href: "/labs/code-review",
    gradient: "from-indigo-500 to-blue-600",
    category: "docs",
    actionVerb: "Upload",
  },
  {
    icon: Database,
    title: "PDF Attribute Extraction",
    description:
      "Define attributes, upload PDFs, and watch AI extract structured data in parallel. Perfect for invoices, contracts, and reports.",
    href: "/labs/pdf-extractor",
    gradient: "from-teal-500 to-cyan-600",
    category: "docs",
    actionVerb: "Extract",
    featured: true,
  },
  {
    icon: MessagesSquare,
    title: "PDF Document Chat",
    description:
      "Upload PDFs and have intelligent conversations about their content. Ask questions, get summaries, and explore documents interactively.",
    href: "/labs/pdf-chat",
    gradient: "from-violet-500 to-indigo-600",
    category: "docs",
    actionVerb: "Chat",
  },
  
  // Data Category
  {
    icon: BarChart3,
    title: "AI Data Analyzer",
    description:
      "Upload CSV or Excel files and get instant insights, visualizations, and predictions. Turn raw data into actionable intelligence.",
    href: "/labs/data-analyzer",
    gradient: "from-emerald-500 to-cyan-600",
    category: "data",
    actionVerb: "Analyze",
  },
  {
    icon: Calculator,
    title: "AI ROI Calculator",
    description:
      "Calculate your potential savings from AI automation. See breakeven timeline, productivity gains, and annual cost savings for your team.",
    href: "/labs/roi-calculator",
    gradient: "from-green-500 to-emerald-600",
    category: "data",
    actionVerb: "Calculate",
  },
  
  // Voice Category
  {
    icon: Mic,
    title: "Voice to Process",
    description:
      "Describe your business workflow verbally and watch AI create a detailed process map with optimization suggestions.",
    href: "/labs/voice-to-process",
    gradient: "from-violet-500 to-purple-600",
    category: "voice",
    actionVerb: "Chat",
    comingSoon: true,
  },
  {
    icon: Mic,
    title: "Realtime Voice Chat",
    description:
      "Experience natural AI conversations with real-time speech recognition, interruption handling, and lifelike voice responses. The future of voice AI.",
    href: "/labs/voice-chat",
    gradient: "from-pink-500 to-rose-600",
    category: "voice",
    actionVerb: "Chat",
  },
  
  // Creative Category
  {
    icon: Gamepad2,
    title: "Ideation Lab",
    description:
      "Play creative AI games: brainstorm ideas, race concepts, and compete in startup Scattergories. Fun meets innovation.",
    href: "/labs/ideation",
    gradient: "from-green-500 to-teal-600",
    category: "creative",
    actionVerb: "Create",
  },
  {
    icon: Palette,
    title: "AI Sketch Studio",
    description:
      "Draw rough sketches and watch AI transform them into polished artwork. Experience the magic of AI-enhanced creativity.",
    href: "/labs/sketch-studio",
    gradient: "from-orange-500 to-red-600",
    category: "creative",
    actionVerb: "Design",
  },
  {
    icon: Music,
    title: "AI Music Studio",
    description:
      "Create original music tracks with AI. Describe your desired genre, mood, and instruments to generate custom compositions in seconds.",
    href: "/labs/music-studio",
    gradient: "from-purple-500 to-indigo-600",
    category: "creative",
    actionVerb: "Create",
  },
  {
    icon: Megaphone,
    title: "AI Ad Creator",
    description:
      "Generate professional social media ads for all platforms instantly. Create Instagram, Facebook, Twitter, LinkedIn content with AI-powered design.",
    href: "/labs/ad-creator",
    gradient: "from-pink-500 to-purple-600",
    category: "creative",
    actionVerb: "Create",
  },
  
  // Play Category - Fun & Interactive Experiences
  {
    icon: Gamepad2,
    title: "Agent Battle",
    description:
      "Two AI agents debate head-to-head on any topic. Watch GPT-4 vs Claude compete while an AI judge scores each round. Export transcripts and insights.",
    href: "/labs/agent-battle",
    gradient: "from-red-500 to-pink-600",
    category: "play",
    actionVerb: "Battle",
    featured: false,
  },
  {
    icon: Blocks,
    title: "Tiny Town",
    description:
      "Simulate a miniature world with AI-powered NPCs. Watch agents interact, optimize workflows, and discover bottlenecks in real-time operations.",
    href: "/labs/tiny-town",
    gradient: "from-emerald-500 to-teal-600",
    category: "play",
    actionVerb: "Simulate",
    featured: false,
  },
  
  // Multiplayer Category - New Collaborative AI Games
  {
    icon: Gamepad2,
    title: "Prompt Party",
    description:
      "Play the Startup Edition party game with friends and AI players. Dark humor meets tech innovation in this multiplayer experience.",
    href: "/labs/cards-against-ai",
    gradient: "from-purple-600 to-pink-600",
    category: "multiplayer",
    actionVerb: "Play",
    featured: false,
  },
  {
    icon: Palette,
    title: "AI Telestrations",
    description:
      "Draw, guess, and laugh as your sketches transform through a hilarious chain of human and AI interpretations.",
    href: "/labs/ai-telestrations",
    gradient: "from-orange-500 to-pink-500",
    category: "multiplayer",
    actionVerb: "Draw",
    featured: false,
  },
  {
    icon: BookOpen,
    title: "Story Adventure",
    description:
      "Choose your own adventure where AI writes the story and players vote on choices. Every decision shapes the narrative!",
    href: "/labs/story-adventure",
    gradient: "from-indigo-500 to-purple-600",
    category: "multiplayer",
    actionVerb: "Create",
    featured: false,
  },
  {
    icon: Globe,
    title: "Future Scenarios",
    description:
      "Build future worlds together with AI. Collaborate on scenarios and explore humanity's AI-driven future through worldbuilding.",
    href: "/labs/future-scenarios",
    gradient: "from-cyan-500 to-blue-600",
    category: "multiplayer",
    actionVerb: "Build",
    featured: false,
  },
  {
    icon: Palette,
    title: "Vibe Coding",
    description:
      "Describe any UI component and watch AI generate production-ready code instantly. Choose framework, style, and export to your project.",
    href: "/labs/vibe-coding",
    gradient: "from-purple-500 to-indigo-600",
    category: "creative",
    actionVerb: "Generate",
    featured: false,
  },
  {
    icon: Workflow,
    title: "Storyboarding & ConstrUX",
    description:
      "Map user journeys visually with React Flow, design wireframes for each screen, and simulate the complete experience flow with AI assistance.",
    href: "/labs/storyboarding",
    gradient: "from-blue-500 to-cyan-600",
    category: "creative",
    actionVerb: "Design",
    featured: false,
  },
  {
    icon: Blocks,
    title: "Component Studio",
    description:
      "Build AI-powered React components visually. Drag, drop, and configure to create custom UI elements with intelligent behavior.",
    href: "/labs/component-studio",
    gradient: "from-indigo-500 to-purple-600",
    category: "creative",
    actionVerb: "Build",
  },
  
];

const categories = [
  { id: "all", name: "All", description: "View all AI demos" },
  { id: "advisory", name: "Advisory", description: "Strategic AI assessments and planning" },
  { id: "agents", name: "Agents", description: "AI agent workflows and automation" },
  { id: "docs", name: "Docs", description: "Document processing and analysis" },
  { id: "data", name: "Data", description: "Data analysis and calculations" },
  { id: "voice", name: "Voice", description: "Voice AI and conversation" },
  { id: "creative", name: "Creative", description: "Creative AI tools and games" },
  { id: "play", name: "Play", description: "Fun AI games and challenges" },
  { id: "multiplayer", name: "Multiplayer", description: "Collaborative AI games with friends" },
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
            AI <span className="gradient-text">Labs</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
            Interactive demonstrations of our AI capabilities. Experience the
            future of intelligent automation through hands-on tools and games.
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
            Ready to build something amazing?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            These demos showcase just a fraction of what we can build together.
            Let&apos;s discuss your AI vision.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity touch-manipulation min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background"
          >
            Start a Project
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
