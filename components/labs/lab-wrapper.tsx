"use client";

import { DeviceFrame } from "@/components/ui/device-frame";
import { ShareMenu } from "@/components/labs/share-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface LabWrapperProps {
  title: string;
  description: string;
  slug: string;
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
  children,
  howItWorks,
  examples,
  techDetails,
  ctaText = "Get a 30-day implementation plan"
}: LabWrapperProps) {
  return (
    <main className="max-w-7xl mx-auto px-6 sm:px-8 py-10 md:py-14">
      <article className="space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </header>

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
          <div className="mt-12 p-6 rounded-xl bg-brand-10 border border-brand-30 text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to implement this?</h3>
            <p className="text-muted-foreground mb-4">{ctaText}</p>
            <Button asChild variant="gradient">
              <a href="/contact">Book a 30-min Strategy Call</a>
            </Button>
          </div>
        </section>
      </article>
    </main>
  );
}