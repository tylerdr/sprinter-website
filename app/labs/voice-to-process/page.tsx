import type { Metadata } from "next";
import { Mic } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import VoiceToProcess from "@/components/labs/VoiceToProcess";

export const metadata: Metadata = createSEOMetadata({
  title: "Voice to Process - AI Workflow Mapping | Sprinter AI",
  description:
    "Describe your business workflow verbally and watch AI create a detailed process map with optimization suggestions and automation opportunities.",
  keywords:
    "voice to workflow, process mapping, business process automation, workflow optimization, AI process design, verbal workflow",
  canonical: `${SEO.siteUrl}/labs/voice-to-process`,
  ogTitle: "Voice to Process - Speak Your Workflow, See the Map",
  ogDescription:
    "Transform verbal descriptions into visual process maps with AI-powered optimization suggestions.",
});

export default function VoiceToProcessPage() {
  return (
    <div className="spr-theme spr-page min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-brand-10 border border-brand-30 mb-4 sm:mb-6">
            <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
            <span className="text-xs sm:text-sm font-medium text-brand">
              Interactive Demo
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Voice to <span className="gradient-text">Process</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            Describe your workflow verbally and watch AI create a detailed process
            map with optimization suggestions
          </p>
        </div>

        <VoiceToProcess />

        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl bg-card/20 border border-border/30">
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            How it works
          </h3>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
            Simply describe your business process or workflow in natural language,
            and our AI will parse your description to create a visual process map.
            The AI identifies steps, decision points, stakeholders, and potential
            bottlenecks, then suggests optimizations and automation opportunities.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Sprinter AI&apos;s process intelligence can map complex enterprise
            workflows, integrate with existing systems, and continuously optimize
            processes based on real-time performance data and changing business needs.
          </p>
        </div>
      </div>
    </div>
  );
}