"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const clients = [
  "Wells Fargo",
  "Accenture",
  "Rock Hill Capital",
  "Broadlume",
  "Vero Capital",
  "Beckway",
  "KKR",
  "Blackstone",
  "Apollo",
  "Carlyle",
  "Vista Equity",
  "Thoma Bravo",
];

export function Clients3D() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <TextHoverEffect text="TRUSTED BY LEADERS" />
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
            From Fortune 500 to growth-stage innovators
          </p>
        </div>

        <ThreeDMarquee
          images={clients}
          className="h-[400px]"
        />
      </div>
    </section>
  );
}