import type { Metadata } from "next";
import { ToolsDirectory } from "@/components/tools/tools-directory";
import { ToolsPlatformHero } from "@/components/tools/platform-hero";

export const metadata: Metadata = {
  title: "AI Tools Platform | Sprinter AI",
  description: "Access powerful AI tools for business automation. From financial calculators to workflow builders, get instant value with our AI-powered platform.",
  keywords: "AI tools, business automation, financial calculators, workflow tools, AI platform"
};

export default function ToolsPage() {
  return (
    <>
      <ToolsPlatformHero />
      <ToolsDirectory />
    </>
  );
}