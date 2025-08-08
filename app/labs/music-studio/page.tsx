import type { Metadata } from "next";
import { Music } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import MusicStudio from "@/components/labs/MusicStudio";

export const metadata: Metadata = createSEOMetadata({
  title: "AI Music Studio - Generate Music with AI | Sprinter AI",
  description:
    "Create original music tracks with AI. Describe your desired genre, mood, and instruments to generate custom music compositions in seconds.",
  keywords:
    "AI music generation, AI composer, music creation, AI audio, generative music, custom soundtracks, AI music producer, digital audio workstation",
  canonical: `${SEO.siteUrl}/labs/music-studio`,
  ogTitle: "AI Music Studio - Create Music with AI",
  ogDescription:
    "Interactive AI music generator: Describe your musical vision and create custom tracks with artificial intelligence.",
});

export default function MusicStudioPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning-10 border border-warning-30 mb-6">
            <Music className="w-5 h-5 text-warning" />
            <span className="text-sm font-medium text-warning">
              AI Music Generation
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Music <span className="gradient-text">Studio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Describe your musical vision and watch AI compose original tracks
            tailored to your needs
          </p>
        </div>

        <MusicStudio />

        <div className="mt-12 p-6 rounded-xl bg-card/5 border border-border/10">
          <h3 className="text-lg font-semibold mb-3">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-10 h-10 rounded-lg bg-warning-10 border border-warning-30 flex items-center justify-center mb-3">
                <span className="text-lg font-bold">1</span>
              </div>
              <h4 className="font-medium mb-2">Describe Your Vision</h4>
              <p className="text-sm text-muted-foreground">
                Tell the AI about your desired genre, mood, instruments, and
                style. Or choose from preset styles for quick generation.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-warning-10 border border-warning-30 flex items-center justify-center mb-3">
                <span className="text-lg font-bold">2</span>
              </div>
              <h4 className="font-medium mb-2">Set Parameters</h4>
              <p className="text-sm text-muted-foreground">
                Choose your track duration and any specific requirements.
                The AI will optimize the composition for your needs.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-warning-10 border border-warning-30 flex items-center justify-center mb-3">
                <span className="text-lg font-bold">3</span>
              </div>
              <h4 className="font-medium mb-2">Generate & Export</h4>
              <p className="text-sm text-muted-foreground">
                Listen to your AI-generated track with real-time waveform
                visualization and download when you're satisfied.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}