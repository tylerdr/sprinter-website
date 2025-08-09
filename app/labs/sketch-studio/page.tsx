import type { Metadata } from "next";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import { SketchStudioClient } from "./client";

export const metadata: Metadata = createSEOMetadata({
  title: "AI Sketch Studio - Transform Drawings with AI | Sprinter AI",
  description:
    "Draw rough sketches and watch AI transform them into polished artwork. Experience the magic of AI-enhanced creativity and digital art generation.",
  keywords:
    "AI art generation, sketch to art, AI drawing, digital art creation, AI sketch enhancement, creative AI tools, AI artwork",
  canonical: `${SEO.siteUrl}/labs/sketch-studio`,
  ogTitle: "AI Sketch Studio - Turn Sketches into Art",
  ogDescription:
    "Interactive AI art tool: Transform your rough sketches into polished digital artwork with AI enhancement.",
});

export default function SketchStudioPage() {
  return <SketchStudioClient />;
}
