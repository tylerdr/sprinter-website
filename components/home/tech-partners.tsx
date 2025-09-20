"use client";

import { LogoLoop } from "@/components/LogoLoop";
import ScrollFloat from "@/components/ScrollFloat";
import {
  SiOpenai,
  SiAmazon,
  SiMicrosoft,
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
  SiDocker
} from 'react-icons/si';
import { Brain, Sparkles, Cpu, Database, Cloud, Layers } from 'lucide-react';

// AI Provider logos with actual icons
const aiProviders = [
  { name: "OpenAI", icon: SiOpenai },
  { name: "Anthropic", icon: Brain },
  { name: "Google AI", icon: Sparkles },
  { name: "Mistral", icon: Cpu },
  { name: "Cohere", icon: Brain },
  { name: "Hugging Face", icon: SiHuggingface },
  { name: "Stability AI", icon: Sparkles },
  { name: "Meta AI", icon: SiMeta },
];

const techStack = [
  { name: "AWS", icon: SiAmazon },
  { name: "Azure", icon: SiMicrosoft },
  { name: "Google Cloud", icon: SiGoogle },
  { name: "Vercel", icon: SiVercel },
  { name: "Supabase", icon: SiSupabase },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Python", icon: SiPython },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Redis", icon: SiRedis },
  { name: "Docker", icon: SiDocker },
];

export function TechPartners() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollFloat className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Powered by Best-in-Class AI
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            We work with leading AI providers and infrastructure partners to deliver production-ready solutions.
          </p>
        </ScrollFloat>

        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-semibold text-center mb-8 text-muted-foreground">
              AI Providers
            </h3>
            <LogoLoop
              items={aiProviders.map(p => ({
                id: p.name,
                content: (
                  <div className="flex items-center gap-3 px-6 py-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/30 hover:border-primary/50 transition-all hover:bg-primary/5 group">
                    <p.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {p.name}
                    </span>
                  </div>
                )
              }))}
              speed={30}
              gap={24}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-center mb-8 text-muted-foreground">
              Technology Stack
            </h3>
            <LogoLoop
              items={techStack.map(t => ({
                id: t.name,
                content: (
                  <div className="flex items-center gap-3 px-6 py-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/30 hover:border-primary/50 transition-all hover:bg-primary/5 group">
                    <t.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {t.name}
                    </span>
                  </div>
                )
              }))}
              speed={35}
              gap={24}
              reverse
            />
          </div>
        </div>
      </div>
    </section>
  );
}