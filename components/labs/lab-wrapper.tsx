"use client";

import { DeviceFrame } from "@/components/ui/device-frame";
import { ShareMenu } from "@/components/labs/share-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface LabWrapperProps {
  title: string;
  description: string;
  slug: string;
  badge?: string;
  badgeIcon?: ReactNode;
  gradientWord?: string;
  children: ReactNode;
  howItWorks?: ReactNode;
  examples?: ReactNode;
  techDetails?: ReactNode;
  ctaText?: string;
}

export function LabWrapper({
  title,
  description,
  slug,
  badge = "AI Experience",
  badgeIcon = <Sparkles className="w-4 h-4" />,
  gradientWord,
  children,
  howItWorks,
  examples,
  techDetails,
  ctaText = "Get a 30-day implementation plan"
}: LabWrapperProps) {
  // Parse title to apply gradient to a specific word if not provided
  const renderTitle = () => {
    if (gradientWord && title.includes(gradientWord)) {
      const parts = title.split(gradientWord);
      return (
        <>
          {parts[0]}
          <span className="gradient-text">{gradientWord}</span>
          {parts[1]}
        </>
      );
    }
    // Default: make last word gradient
    const words = title.split(" ");
    const lastWord = words.pop();
    return (
      <>
        {words.join(" ")} <span className="gradient-text">{lastWord}</span>
      </>
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-6 sm:px-8 py-10 md:py-14">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/labs" className="hover:text-foreground transition-colors">
          AI Labs
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">{title}</span>
      </nav>

      <article className="space-y-10">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/20 border border-border/30 backdrop-blur-sm"
          >
            {badgeIcon}
            <span className="text-sm font-medium">{badge}</span>
          </motion.div>
          
          {/* Title with gradient */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            {renderTitle()}
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground"
          >
            {description}
          </motion.p>
        </motion.header>

        <DeviceFrame 
          title={title}
          onShare={() => {
            const url = `${window.location.origin}/labs/${slug}`;
            navigator.clipboard.writeText(url);
          }}
          onEmbed={() => {
            const embedCode = `<iframe src="${window.location.origin}/labs/${slug}?embed=1" width="100%" height="600" style="border:0;border-radius:12px;"></iframe>`;
            navigator.clipboard.writeText(embedCode);
          }}
        >
          {children}
        </DeviceFrame>

        {/* Documentation tabs */}
        <section className="space-y-8">
          <Tabs defaultValue="how" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="how">How it works</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="tech">Technical</TabsTrigger>
              <TabsTrigger value="share">Share</TabsTrigger>
            </TabsList>

            <TabsContent value="how" className="prose dark:prose-invert max-w-none mt-6">
              {howItWorks || (
                <div>
                  <h3>How This Works</h3>
                  <p>This interactive demo showcases our AI capabilities in action. Try different inputs and see real-time results.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="examples" className="mt-6 space-y-4">
              {examples || (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Example Use Cases</h3>
                  <p className="text-muted-foreground">Explore various ways this technology can be applied to your business.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tech" className="mt-6">
              {techDetails || (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Built with Next.js and React</li>
                    <li>• Powered by OpenAI GPT-4</li>
                    <li>• Real-time processing</li>
                    <li>• Secure and scalable</li>
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="share" className="mt-6">
              <ShareMenu slug={slug} state={{}} />
              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  Share this demo with your team or embed it in your documentation.
                  Copy the link or embed code above.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <div className="mt-12 p-8 rounded-xl bg-card/30 border border-border/50 text-center backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-3">Ready to Build This for Real?</h3>
            <p className="text-muted-foreground mb-6">{ctaText}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="gradient">
                <Link href="/labs/opportunity-audit">Get AI Opportunity Audit</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Book Strategy Call</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Back to Labs link */}
        <div className="mt-8 pt-8 border-t border-border/30">
          <Link 
            href="/labs" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to AI Labs
          </Link>
        </div>
      </article>
    </main>
  );
}