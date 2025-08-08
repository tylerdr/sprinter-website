import type { Metadata } from "next";
import { Gamepad2 } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import AgentPlayground from "@/components/labs/AgentPlayground";

export const metadata: Metadata = createSEOMetadata({
  title: "Agent Playground - Build AI Workflows Visually | Sprinter AI",
  description:
    "Interactive visual builder for AI agent workflows. Snap together blocks for reading, processing, deciding, and outputting to create custom AI automations.",
  keywords:
    "AI workflow builder, visual AI programming, agent workflow design, drag and drop AI, AI automation builder, visual programming, AI agent designer",
  canonical: `${SEO.siteUrl}/labs/agent-playground`,
  ogTitle: "Agent Playground - Visual AI Workflow Builder",
  ogDescription:
    "Build AI agent workflows visually by snapping together blocks. See how AI agents process data through interactive simulations.",
});

export default function AgentPlaygroundPage() {
  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-brand-10 border border-brand-30 mb-4 sm:mb-6">
            <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
            <span className="text-xs sm:text-sm font-medium text-brand">
              Interactive Builder
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Agent <span className="gradient-text">Playground</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
            Build AI agent workflows visually by snapping together action blocks. 
            Experience how agents read, transform, decide, and update data.
          </p>
        </div>

        <AgentPlayground />

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 sm:p-6 rounded-xl bg-card/5 border border-border/10">
            <h3 className="text-base sm:text-lg font-semibold mb-3">
              How Agent Workflows Work
            </h3>
            <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <p>
                <strong className="text-blue-400">Input Blocks</strong> gather data from APIs, databases, and files
              </p>
              <p>
                <strong className="text-purple-400">Processing Blocks</strong> transform and analyze the data using AI
              </p>
              <p>
                <strong className="text-green-400">Decision Blocks</strong> apply logic and routing based on conditions
              </p>
              <p>
                <strong className="text-orange-400">Output Blocks</strong> take actions like sending emails or saving results
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-xl bg-card/5 border border-border/10">
            <h3 className="text-base sm:text-lg font-semibold mb-3">
              Real-World Applications
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>• Customer support automation</li>
              <li>• Content moderation pipelines</li>
              <li>• Data processing workflows</li>
              <li>• Quality assurance systems</li>
              <li>• Business process automation</li>
              <li>• Intelligent routing and notifications</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            Getting Started Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-2">Building Workflows:</p>
              <ul className="space-y-1">
                <li>• Drag blocks from the library to the canvas</li>
                <li>• Connect blocks in logical sequence</li>
                <li>• Click blocks to see detailed information</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Running Simulations:</p>
              <ul className="space-y-1">
                <li>• Use the &ldquo;Example&rdquo; button for a quick start</li>
                <li>• Run simulations to see mock data flow</li>
                <li>• Watch results appear in real-time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}