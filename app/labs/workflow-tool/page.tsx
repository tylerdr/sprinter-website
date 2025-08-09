import type { Metadata } from "next";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import { WorkflowToolClient } from "./client";

export const metadata: Metadata = createSEOMetadata({
  title: "Workflow Designer - AI Process Mapping Tool | Sprinter AI",
  description:
    "Map your business processes and discover where AI can augment or automate steps. Get a personalized AI transformation roadmap.",
  keywords:
    "workflow automation, process mapping, AI transformation, business process optimization, workflow designer, AI integration",
  canonical: `${SEO.siteUrl}/labs/workflow-tool`,
  ogTitle: "AI Workflow Designer - Map Your Process Automation",
  ogDescription:
    "Interactive tool to map business processes and identify AI automation opportunities.",
});

export default function WorkflowToolPage() {
  return <WorkflowToolClient />;
}
