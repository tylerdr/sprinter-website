import type { Metadata } from "next";
import { AITelestrationsClient } from "./client";

export const metadata: Metadata = {
  title: "AI Telestrations - Multiplayer Drawing Chain Game | Sprinter AI",
  description: "Play Telestrations with AI! Draw, guess, and watch as your sketches transform through a hilarious chain of human and AI interpretations.",
  keywords: "telestrations AI, drawing game, multiplayer sketch, AI art game, pictionary chain, collaborative drawing",
  openGraph: {
    title: "AI Telestrations - Draw, Guess, Laugh, Repeat",
    description: "The telephone game meets Pictionary with AI players. Watch your drawings hilariously transform!",
  },
};

export default function AITelestrationsPage() {
  return <AITelestrationsClient />;
}