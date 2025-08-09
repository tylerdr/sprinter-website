import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TrustedBy } from "@/components/home/trusted-by";
import { LabsPreview } from "@/components/home/labs-preview";
import { Products } from "@/components/home/products";
import { ServicesPreview } from "@/components/home/services-preview";
import { RecentWins } from "@/components/home/recent-wins";
import { TestimonialCarousel } from "@/components/shared/testimonial-carousel";
import { InteractiveDemo } from "@/components/home/interactive-demo";
import { WhoWeWorkWith } from "@/components/home/who-we-work-with";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("home");

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <LabsPreview />
      <Products />
      <WhoWeWorkWith />
      <RecentWins />
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from teams who shipped AI that matters
            </p>
          </div>
          <TestimonialCarousel autoPlay showMetrics />
        </div>
      </section>
      <ServicesPreview />
      <InteractiveDemo />
    </>
  );
}
