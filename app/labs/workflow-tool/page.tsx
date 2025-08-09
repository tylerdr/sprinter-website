import type { Metadata } from "next";
import { Workflow } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import WorkflowTool from "@/components/labs/WorkflowTool";

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
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-10 border border-accent-30 mb-6">
            <Workflow className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">
              AI Process Mapping
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Workflow <span className="gradient-text">Designer</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Map your business process and discover where AI can transform your
            operations
          </p>
        </div>

        <WorkflowTool />

        <div className="mt-8 p-6 rounded-xl bg-card/20 border border-border/30">
          <h3 className="text-lg font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground">
            Map out your business workflow step by step, and our AI will analyze
            each stage to identify opportunities for automation and
            augmentation. We&apos;ll show you exactly where AI agents can
            streamline operations, reduce errors, and accelerate your processes.
          </p>
        </div>
      </div>
    </div>
  );
}
