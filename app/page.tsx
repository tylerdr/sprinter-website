import type { Metadata } from "next";
import { PEHero } from "@/components/home/pe-hero";
import { LabsPreview } from "@/components/home/labs-preview";
import { Products } from "@/components/home/products";
import { ServicesPreview } from "@/components/home/services-preview";
import { ClientSuccessSection } from "@/components/home/client-success-section";
import { InteractiveDemo } from "@/components/home/interactive-demo";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("home");

export default function Home() {
  return (
    <>
      <PEHero />
      <ClientSuccessSection />
      <ServicesPreview />
      <LabsPreview />
      <Products />
      <InteractiveDemo />
    </>
  );
}
