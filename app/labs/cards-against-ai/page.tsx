import type { Metadata } from "next";
import { CardsAgainstAIClient } from "./client";

export const metadata: Metadata = {
  title: "Cards Against AI - Multiplayer Startup Edition | Sprinter AI",
  description: "Play Cards Against Humanity: AI Revolution Edition with friends and AI players. Dark humor meets tech startups in this multiplayer party game.",
  keywords: "multiplayer AI game, cards against humanity, startup humor, AI party game, multiplayer cards, tech humor",
  openGraph: {
    title: "Cards Against AI - The Startup Edition Party Game",
    description: "Multiplayer card game where humans and AI compete with dark startup humor. Create a room and share the link!",
  },
};

export default function CardsAgainstAIPage() {
  return <CardsAgainstAIClient />;
}