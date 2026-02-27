"use client";

import { usePathname } from "next/navigation";
import { EnhancedNavigation } from "@/components/layout/enhanced-navigation";
import { Footer } from "@/components/layout/footer";
import { ErrorBoundary } from "@/components/error-boundary";

const minimalistRoutes = new Set([
  "/",
  "/sprint",
  "/edge",
  "/fractional-ai-cofounder",
  "/accelerate",
  "/ai-sprint",
]);

interface SiteChromeProps {
  children: React.ReactNode;
}

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isMinimalRoute = minimalistRoutes.has(pathname);

  return (
    <>
      {!isMinimalRoute ? <EnhancedNavigation /> : null}
      <main id="main-content" className={`flex-1 ${isMinimalRoute ? "" : "pt-16"}`}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      {!isMinimalRoute ? <Footer /> : null}
    </>
  );
}
