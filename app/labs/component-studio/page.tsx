import type { Metadata } from "next";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import { ComponentStudioClient } from "./client";

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
  return <ComponentStudioClient />;
}