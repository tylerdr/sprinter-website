import type { Metadata } from "next";
import { StoryAdventureClient } from "./client";

export const metadata: Metadata = {
  title: "AI Story Adventure - Multiplayer Choose Your Own Adventure | Sprinter AI",
  description: "Create epic stories together! A multiplayer choose-your-own-adventure where AI crafts the narrative and players vote on choices or write their own.",
  keywords: "AI storytelling, choose your own adventure, multiplayer story, interactive fiction, collaborative storytelling, AI narrative",
  openGraph: {
    title: "AI Story Adventure - Your Choices Shape the Story",
    description: "Multiplayer storytelling where every choice matters. AI writes, you decide, the story evolves!",
  },
};

export default function StoryAdventurePage() {
  return <StoryAdventureClient />;
}