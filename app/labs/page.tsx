import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Workflow, Palette, Gamepad2, BarChart3, Mic, Code2, FileText, MessageSquare, Calculator, ArrowRight, Blocks, FileQuestion, Megaphone, Music } from "lucide-react";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("labs");

const labs = [
  {
    icon: MessageSquare,
    title: "AI Assistant",
    description:
      "Experience our sophisticated AI assistant with specialized agents, tool calling capabilities, and intelligent reasoning. Choose your agent and see Sprinter's AI in action.",
    href: "/labs/ai-assistant",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Bot,
    title: "Agent Simulator",
    description:
      "Watch multiple AI agents collaborate in parallel to solve complex tasks. See how agentic workflows handle real-world scenarios.",
    href: "/labs/agent-simulator",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Workflow,
    title: "Workflow Designer",
    description:
      "Map your business processes and discover where AI can augment or automate steps. Get a personalized AI transformation roadmap.",
    href: "/labs/workflow-tool",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Gamepad2,
    title: "Ideation Lab",
    description:
      "Play creative AI games: brainstorm ideas, race concepts, and compete in startup Scattergories. Fun meets innovation.",
    href: "/labs/ideation",
    gradient: "from-green-500 to-teal-600",
  },
  {
    icon: Palette,
    title: "AI Sketch Studio",
    description:
      "Draw rough sketches and watch AI transform them into polished artwork. Experience the magic of AI-enhanced creativity.",
    href: "/labs/sketch-studio",
    gradient: "from-orange-500 to-red-600",
  },
  {
    icon: Music,
    title: "AI Music Studio",
    description:
      "Create original music tracks with AI. Describe your desired genre, mood, and instruments to generate custom compositions in seconds.",
    href: "/labs/music-studio",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    icon: Megaphone,
    title: "AI Ad Creator",
    description:
      "Generate professional social media ads for all platforms instantly. Create Instagram, Facebook, Twitter, LinkedIn content with AI-powered design.",
    href: "/labs/ad-creator",
    gradient: "from-pink-500 to-purple-600",
  },
  {
    icon: BarChart3,
    title: "AI Data Analyzer",
    description:
      "Upload CSV or Excel files and get instant insights, visualizations, and predictions. Turn raw data into actionable intelligence.",
    href: "/labs/data-analyzer",
    gradient: "from-emerald-500 to-cyan-600",
  },
  {
    icon: Mic,
    title: "Voice to Process",
    description:
      "Describe your business workflow verbally and watch AI create a detailed process map with optimization suggestions.",
    href: "/labs/voice-to-process",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Code2,
    title: "AI Code Review Assistant",
    description:
      "Paste your code and get AI-powered suggestions for improvements, security fixes, and best practice recommendations.",
    href: "/labs/code-review",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    description:
      "Upload PDFs, reports, or documents and extract key insights, summaries, and answer specific questions about the content.",
    href: "/labs/document-intelligence",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: FileQuestion,
    title: "PDF Quiz Generator",
    description:
      "Upload any PDF and automatically generate customized quizzes with multiple choice, true/false, and short answer questions.",
    href: "/labs/quiz-generator",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    icon: Calculator,
    title: "AI ROI Calculator",
    description:
      "Calculate your potential savings from AI automation. See breakeven timeline, productivity gains, and annual cost savings for your team.",
    href: "/labs/roi-calculator",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Blocks,
    title: "Agent Playground",
    description:
      "Build AI agent workflows visually by snapping together blocks for reading, processing, deciding, and outputting. See how agents work together.",
    href: "/labs/agent-playground",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: Mic,
    title: "Realtime Voice Chat",
    description:
      "Experience natural AI conversations with real-time speech recognition, interruption handling, and lifelike voice responses. The future of voice AI.",
    href: "/labs/voice-chat",
    gradient: "from-pink-500 to-rose-600",
  },
];

export default function LabsPage() {
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

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto"
          role="list"
        >
          {labs.map((lab) => (
            <div key={lab.title} className="w-full" role="listitem">
              <Link
                href={lab.href}
                className="group block h-full p-6 sm:p-8 rounded-2xl bg-card/5 border border-border/10 backdrop-blur-sm hover:bg-card/10 transition-all hover:scale-105 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background"
                aria-label={`Try ${lab.title} - ${lab.description}`}
              >
                <div
                  className={`inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br ${lab.gradient} mb-4 sm:mb-6`}
                  aria-hidden="true"
                >
                  <lab.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:gradient-text transition-all">
                  {lab.title}
                </h2>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
                  {lab.description}
                </p>
                <div className="flex items-center gap-2 text-brand font-medium group-hover:opacity-90 text-sm sm:text-base">
                  Try it now
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl border border-brand-30 bg-brand-10 max-w-4xl mx-auto">
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
