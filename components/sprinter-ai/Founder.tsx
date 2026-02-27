"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

export default function Founder() {
  return (
    <AnimatedSection
      id="founder"
      className="mx-auto w-full max-w-6xl border-y border-white/10 px-4 py-20 sm:px-6 lg:px-8"
      delay={0.05}
    >
      <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#3B82F6]/25 via-[#0A0A0A] to-[#F97316]/20 p-6">
          <div className="flex h-72 items-end rounded-xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_48%),radial-gradient(circle_at_80%_10%,rgba(249,115,22,0.22),transparent_40%),#101010] p-5">
            <p className="text-sm text-[#A1A1AA]">Tyler Dreher — Founder, Sprinter Consulting</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl">Built by an engineer who ships.</h2>
          <blockquote className="mt-6 space-y-5 text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
            <p>
              I'm Tyler Dreher. I've spent 8 years building software for companies across manufacturing, construction, fintech, and healthcare. I don't theorize about AI — I deploy it. Every day.
            </p>
            <p>
              When OpenAI drops a new model on Tuesday, I'm building with it by Wednesday. When a client calls with a problem, they have a working solution by Friday.
            </p>
            <p>
              Sprinter exists because I believe every business deserves the AI advantage that only tech giants had yesterday. The tools exist. The gap is closing. The question is whether you'll be the one closing it — or the one it closes on.
            </p>
            <p className="font-medium text-[#FAFAFA]">— Tyler Dreher, Founder</p>
          </blockquote>
        </div>
      </div>
    </AnimatedSection>
  );
}
