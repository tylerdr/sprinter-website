import type { Metadata } from "next";
import { CardsAgainstAIClient } from "./client";

export const metadata: Metadata = {
  title: "Prompt Party - Multiplayer Startup Edition | Sprinter AI",
  description: "Play the ultimate startup party game with friends and AI players. Dark humor meets tech innovation in this multiplayer card game.",
  keywords: "multiplayer AI game, startup humor, AI party game, multiplayer cards, tech humor, innovation game",
  openGraph: {
    title: "Prompt Party - The Startup Edition Party Game",
    description: "Multiplayer card game where humans and AI compete with startup humor. Create a room and share the link!",
  },
};

export default function CardsAgainstAIPage() {
  return <CardsAgainstAIClient />;
}