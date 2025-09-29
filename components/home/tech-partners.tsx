"use client";

import { LogoLoop } from "@/components/LogoLoop";
import ScrollFloat from "@/components/ScrollFloat";
import { Cloud } from "lucide-react";
import {
  SiOpenai,
  SiAmazon,
  SiGoogle,
  SiVercel,
  SiSupabase,
  SiMeta,
  SiHuggingface,
  SiPython,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiMongodb,
  SiKubernetes,
  SiTerraform,
  SiGithub
} from 'react-icons/si';

// Combined AI & Tech partners
const allPartners = [
  // AI Providers
  { name: "OpenAI", icon: SiOpenai, category: "ai" },
  { name: "Anthropic", icon: SiGoogle, category: "ai" },  // Using Google icon as placeholder
  { name: "Google AI", icon: SiGoogle, category: "ai" },
  { name: "Meta AI", icon: SiMeta, category: "ai" },
  { name: "Hugging Face", icon: SiHuggingface, category: "ai" },
  { name: "Microsoft Azure", icon: Cloud, category: "ai" },
  // Infrastructure
  { name: "AWS", icon: SiAmazon, category: "infra" },
  { name: "Vercel", icon: SiVercel, category: "infra" },
  { name: "Supabase", icon: SiSupabase, category: "infra" },
  { name: "Docker", icon: SiDocker, category: "infra" },
  { name: "Kubernetes", icon: SiKubernetes, category: "infra" },
  // Development
  { name: "Python", icon: SiPython, category: "dev" },
  { name: "TypeScript", icon: SiTypescript, category: "dev" },
  { name: "React", icon: SiReact, category: "dev" },
  { name: "Next.js", icon: SiNextdotjs, category: "dev" },
  // Data
  { name: "PostgreSQL", icon: SiPostgresql, category: "data" },
  { name: "MongoDB", icon: SiMongodb, category: "data" },
  { name: "Redis", icon: SiRedis, category: "data" },
];

export function TechPartners() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollFloat className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            AI & Technology <span className="gradient-text">Partners</span> We Work With
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Leveraging best-in-class AI models and enterprise infrastructure to deliver production-ready solutions
          </p>
        </ScrollFloat>

        <div className="max-w-6xl mx-auto">
          <LogoLoop
            items={allPartners.map(p => ({
              id: p.name,
              content: (
                <div className="flex items-center gap-3 px-5 py-3 bg-card/60 backdrop-blur-sm rounded-xl border border-border/40 hover:border-primary/40 transition-all hover:bg-primary/5 hover:shadow-md group">
                  <p.icon className="w-7 h-7 text-muted-foreground/70 group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium text-muted-foreground/80 group-hover:text-foreground transition-colors whitespace-nowrap">
                    {p.name}
                  </span>
                </div>
              )
            }))}
            speed={30}
            gap={20}
          />
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Vendor-neutral approach • We recommend, not resell • Your success drives our choices
          </p>
        </div>
      </div>
    </section>
  );
}