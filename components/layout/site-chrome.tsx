"use client";

import Header from "@/components/sprinter-ai/Header";
import Footer from "@/components/sprinter-ai/Footer";
import { ErrorBoundary } from "@/components/error-boundary";

interface SiteChromeProps {
  children: React.ReactNode;
}

export function SiteChrome({ children }: SiteChromeProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
