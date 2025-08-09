"use client";

import type { Metadata } from "next";
import { Bot, Rocket, FileText, MessageSquare } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import AgentSimulator from "@/components/labs/AgentSimulator";
import { DeviceFrame } from "@/components/ui/device-frame";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ShareMenu } from "@/components/labs/share-menu";
import { useState } from "react";

export const metadata: Metadata = createSEOMetadata({
  title: "Agent Simulator - Interactive AI Demo | Sprinter AI",
  description:
    "Watch multiple AI agents collaborate in parallel to solve complex tasks. Interactive demo showcasing autonomous agent workflows and coordination.",
  keywords:
    "AI agents, autonomous agents, agentic workflows, AI simulation, multi-agent systems, collaborative AI, AI demo",
  canonical: `${SEO.siteUrl}/labs/agent-simulator`,
  ogTitle: "AI Agent Simulator - See Agents Work Together",
  ogDescription:
    "Interactive demo: Watch specialized AI agents collaborate in real-time to solve complex business tasks.",
});

export default function AgentSimulatorPage() {
  const [simulatorState, setSimulatorState] = useState({});

  const handleFullscreen = () => {
    document.documentElement.requestFullscreen();
  };

  const exampleScenarios = [
    { label: "Plan a one-day conference", prompt: "Organize a 200-person AI conference in San Francisco" },
    { label: "Summarize AI trends", prompt: "Analyze top AI research papers from last month" },
    { label: "Create marketing campaign", prompt: "Launch a B2B SaaS product targeting enterprises" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 sm:px-8 py-10 md:py-14">
      <article className="space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Agent Simulator</h1>
          <p className="text-muted-foreground">
            Watch multiple AI agents work together in parallel to solve complex tasks.
          </p>
        </header>

        <DeviceFrame 
          title="Agent Simulator" 
          onShare={() => {}} 
          onEmbed={() => {}} 
          onFullscreen={handleFullscreen}
        >
          <AgentSimulator onStateChange={setSimulatorState} />
        </DeviceFrame>

        {/* Quick action buttons */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground mr-2">Try an example:</span>
          {exampleScenarios.map((scenario) => (
            <Button
              key={scenario.label}
              variant="outline"
              size="sm"
              onClick={() => {
                // Trigger scenario in simulator
                console.log("Load scenario:", scenario.prompt);
              }}
            >
              {scenario.label}
            </Button>
          ))}
        </div>

        {/* Everything else goes BELOW the app */}
        <section className="space-y-8">
          <Tabs defaultValue="docs" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="docs">How it works</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="tech">Architecture</TabsTrigger>
              <TabsTrigger value="share">Share</TabsTrigger>
            </TabsList>

            <TabsContent value="docs" className="prose dark:prose-invert max-w-none mt-6">
              <h3>How Agent Simulation Works</h3>
              <p>
                This simulation demonstrates how multiple specialized AI agents
                collaborate to solve complex tasks. Each agent has specific
                capabilities and they work in parallel, sharing information and
                coordinating to achieve the goal efficiently.
              </p>
              <p>
                In real-world applications, Sprinter AI's agentic workflows can
                orchestrate dozens of agents, each handling specific subtasks,
                calling APIs, processing data, and making decisions autonomously.
              </p>
              <h4>Key Features</h4>
              <ul>
                <li>Parallel execution across multiple agents</li>
                <li>Dynamic task allocation based on agent capabilities</li>
                <li>Real-time progress tracking and coordination</li>
                <li>Error handling and recovery mechanisms</li>
              </ul>
            </TabsContent>

            <TabsContent value="examples" className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Real-World Applications</h3>
              <div className="grid gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Document Processing Pipeline</h4>
                  <p className="text-sm text-muted-foreground">
                    Extract → Validate → Transform → Store data from thousands of PDFs
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Customer Service Automation</h4>
                  <p className="text-sm text-muted-foreground">
                    Triage → Research → Draft → Review → Send personalized responses
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Market Research</h4>
                  <p className="text-sm text-muted-foreground">
                    Scrape → Analyze → Synthesize → Report on competitor activity
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tech" className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Technical Architecture</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <code className="text-sm">Agent Orchestrator → Task Queue → Agent Pool → Result Aggregator</code>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Built with LangChain and OpenAI GPT-4</li>
                  <li>• Redis for distributed task queue</li>
                  <li>• WebSocket for real-time updates</li>
                  <li>• Average latency: 200-500ms per agent action</li>
                  <li>• Cost: ~$0.02 per complex task completion</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="share" className="mt-6">
              <ShareMenu slug="agent-simulator" state={simulatorState} />
              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  Share this demo with your team or embed it in your documentation.
                  The current state will be preserved in the shared link.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <div className="mt-12 p-6 rounded-xl bg-brand-10 border border-brand-30 text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to build your own agent system?</h3>
            <p className="text-muted-foreground mb-4">
              Get a 30-day implementation plan based on your use case
            </p>
            <Button asChild variant="gradient">
              <a href="/contact">Book a 30-min Strategy Call</a>
            </Button>
          </div>
        </section>
      </article>
    </main>
  );
}
