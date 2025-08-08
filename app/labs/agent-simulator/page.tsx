import type { Metadata } from "next";
import { Bot } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import AgentSimulator from "@/components/labs/AgentSimulator";

export const metadata: Metadata = createSEOMetadata({
  title: "Agent Simulator - Interactive AI Demo | SprinterHQ",
  description: "Watch multiple AI agents collaborate in parallel to solve complex tasks. Interactive demo showcasing autonomous agent workflows and coordination.",
  keywords: "AI agents, autonomous agents, agentic workflows, AI simulation, multi-agent systems, collaborative AI, AI demo",
  canonical: `${SEO.siteUrl}/labs/agent-simulator`,
  ogTitle: "AI Agent Simulator - See Agents Work Together",
  ogDescription: "Interactive demo: Watch specialized AI agents collaborate in real-time to solve complex business tasks.",
});

export default function AgentSimulatorPage() {

  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4 sm:mb-6">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-blue-400">
              Interactive Demo
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Agent <span className="gradient-text">Simulator</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            Watch multiple AI agents work together in parallel to solve complex
            tasks
          </p>
        </div>

        <AgentSimulator />

        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl bg-card/5 border border-border/10">
          <h3 className="text-base sm:text-lg font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
            This simulation demonstrates how multiple specialized AI agents
            collaborate to solve complex tasks. Each agent has specific
            capabilities and they work in parallel, sharing information and
            coordinating to achieve the goal efficiently.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            In real-world applications, SprinterHQ&apos;s agentic workflows can
            orchestrate dozens of agents, each handling specific subtasks,
            calling APIs, processing data, and making decisions autonomously.
          </p>
        </div>
      </div>
    </div>
  );
}
