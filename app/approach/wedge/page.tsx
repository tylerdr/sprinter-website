import { Metadata } from "next";
import { WedgeFinderTool } from "@/components/approach/wedge-finder-tool";

export const metadata: Metadata = {
  title: "Find Your Perfect AI Wedge | Sprinter AI",
  description: "Take our 5-minute assessment to identify the perfect starting point for AI in your organization. Get personalized recommendations based on your documents, processes, and goals.",
  openGraph: {
    title: "Find Your Perfect AI Wedge | Sprinter AI",
    description: "Identify your ideal AI starting point with our free assessment tool.",
    images: ["/images/og/wedge-finder.jpg"],
  },
};

export default function WedgePage() {
  return (
    <div className="min-h-screen bg-background">
      <WedgeFinderTool />
    </div>
  );
}