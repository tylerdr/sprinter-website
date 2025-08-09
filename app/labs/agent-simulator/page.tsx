import type { Metadata } from "next";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import { AgentSimulatorClient } from "./client";

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
  return <AgentSimulatorClient />;
}