"use client";

import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { SparklesCore } from "@/components/ui/sparkles";
import { useMotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ContactEffects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLengths = [
    useTransform(scrollYProgress, [0, 0.8], [0, 1.2]),
    useTransform(scrollYProgress, [0.1, 0.9], [0, 1.2]),
    useTransform(scrollYProgress, [0.2, 1], [0, 1.2]),
    useTransform(scrollYProgress, [0.3, 1], [0, 1.2]),
    useTransform(scrollYProgress, [0.4, 1], [0, 1.2]),
  ];

  return (
    <div ref={ref} className="absolute inset-0 -z-10">
      <GoogleGeminiEffect
        pathLengths={pathLengths}
        title="Ready to Start?"
        description="Let's build something amazing together"
      />
    </div>
  );
}

export function ContactHeading() {
  return <TextHoverEffect text="GET IN TOUCH" />;
}