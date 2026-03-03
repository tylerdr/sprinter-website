"use client";

import { EnhancedNavigation } from "@/components/layout/enhanced-navigation";
import { Footer } from "@/components/layout/footer";
import { ErrorBoundary } from "@/components/error-boundary";

interface SiteChromeProps {
  children: React.ReactNode;
}

export function SiteChrome({ children }: SiteChromeProps) {
  return (
    <>
      <EnhancedNavigation />
      <main id="main-content" className="flex-1 pt-16">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
