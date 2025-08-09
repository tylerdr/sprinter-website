import type { Metadata } from "next";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import { IdeationLabClient } from "./client";

export const metadata: Metadata = createSEOMetadata({
  title: "Ideation Lab - AI Creative Games | Sprinter AI",
  description:
    "Play creative AI games: brainstorm ideas, race concepts, and compete in startup Scattergories. Fun meets innovation with AI-powered creativity.",
  keywords:
    "AI ideation, creative AI games, brainstorming, startup ideas, AI creativity, innovation games, AI-powered brainstorming",
  canonical: `${SEO.siteUrl}/labs/ideation`,
  ogTitle: "AI Ideation Lab - Creative Games for Innovation",
  ogDescription:
    "Interactive creative games powered by AI. Brainstorm ideas, compete in concept races, and innovate with AI assistance.",
});

export default function IdeationLabPage() {
  return <IdeationLabClient />;
}
