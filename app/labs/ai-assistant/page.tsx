import type { Metadata } from "next";
import AiAssistant from "@/components/labs/AiAssistant";

export const metadata: Metadata = {
  title: "AI Assistant - Sprinter Labs",
  description:
    "Experience our sophisticated AI assistant with specialized agents, tool calling capabilities, and intelligent reasoning. See how Sprinter's AI technology can transform your workflows.",
  openGraph: {
    title: "AI Assistant - Sprinter Labs",
    description:
      "Experience our sophisticated AI assistant with specialized agents, tool calling capabilities, and intelligent reasoning.",
  },
};

export default function AiAssistantPage() {
  return (
    <div className="spr-theme spr-page min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            AI <span className="gradient-text">Assistant</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
            Experience our sophisticated AI assistant with specialized agents,
            tool calling capabilities, and intelligent reasoning. Choose your
            agent and see Sprinter&apos;s AI in action.
          </p>
        </div>

        <AiAssistant />
      </div>
    </div>
  );
}