import type { Metadata } from "next";
import VoiceChat from "@/components/labs/VoiceChat";

export const metadata: Metadata = {
  title: "Realtime Voice Chat - Sprinter Labs",
  description:
    "Experience real-time AI voice conversations with natural speech recognition, interruption handling, and lifelike responses. See the future of voice AI technology.",
  openGraph: {
    title: "Realtime Voice Chat - Sprinter Labs",
    description:
      "Experience real-time AI voice conversations with natural speech recognition, interruption handling, and lifelike responses.",
  },
};

export default function VoiceChatPage() {
  return (
    <div className="spr-theme spr-page min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Realtime Voice <span className="gradient-text">Chat</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
            Experience natural AI conversations with real-time speech recognition,
            interruption handling, and lifelike responses. The future of voice AI
            is here.
          </p>
        </div>

        <VoiceChat />
      </div>
    </div>
  );
}