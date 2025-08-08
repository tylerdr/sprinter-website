import type { Metadata } from "next";
import { Gamepad2 } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import IdeationLab from "@/components/labs/IdeationLab";

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
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-10 border border-success-30 mb-6">
            <Gamepad2 className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-success">
              Creative AI Games
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ideation <span className="gradient-text">Lab</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Play creative AI games to spark innovation and test your
            entrepreneurial thinking
          </p>
        </div>

        <IdeationLab />
      </div>
    </div>
  );
}
