"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { SparklesCore } from "@/components/ui/sparkles";

export function AboutHeroEffects() {
  return (
    <>
      {/* Sparkles Background */}
      <div className="absolute inset-0 h-full w-full -z-10">
        <SparklesCore
          id="about-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Text Effect for main heading */}
      <div className="text-center mb-6">
        <TextGenerateEffect
          words="Build an Unfair Advantage with Agentic AI"
          className="text-5xl md:text-6xl font-bold"
        />
      </div>
    </>
  );
}