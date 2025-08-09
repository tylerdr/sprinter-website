import type { Metadata } from "next";
import { Palette } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import AdCreator from "@/components/labs/AdCreator";

export const metadata: Metadata = createSEOMetadata({
  title: "AI Ad Creator - Generate Marketing Content | Sprinter AI",
  description:
    "Create professional ads for social media platforms instantly. Generate Instagram, Facebook, Twitter, LinkedIn ads with AI-powered design tools.",
  keywords:
    "AI ad creator, social media ads, Instagram ads, Facebook ads, Twitter ads, LinkedIn ads, marketing content, AI design, advertisement generator",
  canonical: `${SEO.siteUrl}/labs/ad-creator`,
  ogTitle: "AI Ad Creator - Professional Social Media Ads in Seconds",
  ogDescription:
    "Generate stunning ads for all social media platforms with AI-powered design. Create Instagram, Facebook, Twitter, and LinkedIn content instantly.",
});

export default function AdCreatorPage() {
  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-brand-10 border border-brand-30 mb-4 sm:mb-6">
            <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
            <span className="text-xs sm:text-sm font-medium text-brand">
              Interactive Demo
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            AI Ad <span className="gradient-text">Creator</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            Generate professional social media ads for all platforms in seconds
          </p>
        </div>

        <AdCreator />

        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl bg-card/5 border border-border/10">
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            How it works
          </h3>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
            Enter your product information, choose a style and color scheme, then watch as AI generates
            professional ads optimized for each social media platform. The system creates designs 
            tailored to each platform&apos;s dimensions and best practices.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Sprinter AI&apos;s creative platform integrates with your brand guidelines,
            generates thousands of ad variations for A/B testing, and automatically optimizes content
            based on performance data across all marketing channels.
          </p>
        </div>
      </div>
    </div>
  );
}