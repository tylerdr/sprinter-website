import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNavigation } from "@/components/layout/main-navigation";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeCustomizer } from "@/components/theme-controls/ThemeCustomizer";
import {
  generateMetadata as createSEOMetadata,
  generateOrganizationStructuredData,
  getStructuredDataScript,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = createSEOMetadata({
  title: "Sprinter AI - Build at the pace of AI",
  description:
    "AI consulting and venture studio building technology that helps people. We enable humans to pursue purposeful work while AI handles repetitive tasks.",
  keywords:
    "AI consulting, human-centered AI, autonomous agents, purposeful work, AI development, venture studio, AI products",
  ogTitle: "Sprinter AI - Build at the pace of AI",
  canonical: "https://sprinter.ai",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = generateOrganizationStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getStructuredDataScript(organizationData)}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip Navigation Links */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-brand-gradient text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2"
          >
            Skip to main content
          </a>
          <a
            href="#navigation"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-36 focus:z-50 bg-brand-gradient text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2"
          >
            Skip to navigation
          </a>

          <MainNavigation />
          <main id="main-content" className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
          <ThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  );
}
