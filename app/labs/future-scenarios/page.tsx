import type { Metadata } from "next";
import { FutureScenariosClient } from "./client";

export const metadata: Metadata = {
  title: "Future Scenarios - Collaborative AI Worldbuilding | Sprinter AI",
  description: "Build future worlds together with AI. Collaborate on scenarios, explore consequences, and envision humanity's AI-driven future through interactive storytelling.",
  keywords: "future scenarios, AI worldbuilding, collaborative storytelling, future prediction, AI brainstorming, scenario planning",
  openGraph: {
    title: "Future Scenarios - Build Tomorrow's World with AI",
    description: "Collaborative worldbuilding where humans and AI create and explore future scenarios together.",
  },
};

export default function FutureScenariosPage() {
  return <FutureScenariosClient />;
}