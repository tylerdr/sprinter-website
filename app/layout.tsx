import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RouteAwareChatWidget } from "@/components/chat/RouteAwareChatWidget";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalyticsWrapper } from "@/components/analytics/google-analytics-wrapper";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { Toaster } from "sonner";
import { SiteChrome } from "@/components/layout/site-chrome";
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getStructuredDataScript(organizationData)}
        />
        {/* TODO(retargeting): Google Ads remarketing tag placeholder
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-XXXXXXXXXX');
        </script>
        */}
        {/* TODO(retargeting): Meta Pixel placeholder
        <script>
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '000000000000000');
          fbq('track', 'PageView');
        </script>
        */}
        {/* TODO(retargeting): LinkedIn Insight Tag placeholder
        <script type="text/javascript">
          _linkedin_partner_id = "0000000";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        </script>
        <script type="text/javascript">
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        </script>
        */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
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

          <AnalyticsProvider>
            <SiteChrome>{children}</SiteChrome>
          </AnalyticsProvider>
          <RouteAwareChatWidget />
          <Toaster position="bottom-right" />
          <GoogleAnalyticsWrapper />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
