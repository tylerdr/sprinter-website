"use client";

import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { SparklesCore } from "@/components/ui/sparkles";

export function ContactEffects() {
  return (
    <div className="absolute inset-0 -z-10">
      <GoogleGeminiEffect />
    </div>
  );
}

export function ContactHeading() {
  return <TextHoverEffect text="GET IN TOUCH" />;
}