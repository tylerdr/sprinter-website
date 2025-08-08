import type { Metadata } from "next";
import { Code } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import ComponentStudio from "@/components/labs/ComponentStudio";

export const metadata: Metadata = createSEOMetadata({
  title: "Component Studio - AI React Component Generator | Sprinter AI",
  description:
    "Generate React components instantly with AI. Describe your component and watch it come to life with real-time code generation and live preview.",
  keywords:
    "AI component generator, React components, UI generation, code generator, component builder, AI frontend development",
  canonical: `${SEO.siteUrl}/labs/component-studio`,
  ogTitle: "AI Component Studio - Generate React Components Instantly",
  ogDescription:
    "Transform component descriptions into production-ready React code with live preview and syntax highlighting.",
});

export default function ComponentStudioPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-10 border border-accent-30 mb-6">
            <Code className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">
              AI Code Generation
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Component <span className="gradient-text">Studio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate production-ready React components with AI. Just describe what you need
            and watch it build in real-time.
          </p>
        </div>

        <ComponentStudio />
      </div>
    </div>
  );
}