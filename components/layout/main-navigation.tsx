"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/logo/BrandLogo";
import { ThemeMenu } from "@/components/theme-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const servicesItems = [
  {
    title: "AI Services",
    href: "/services",
    description: "AI consulting, development, and transformation services",
  },
  {
    title: "Use Cases",
    href: "/use-cases",
    description: "Industry-specific AI applications and solutions",
  },
];

const labItems = [
  {
    title: "⭐ AI Opportunity Audit",
    href: "/labs/opportunity-audit",
    description: "Get your personalized AI roadmap in 10 minutes",
    featured: true,
  },
  {
    title: "Agent Simulator",
    href: "/labs/agent-simulator",
    description: "Test AI agent workflows in real-time",
  },
  {
    title: "Workflow Designer",
    href: "/labs/workflow-tool",
    description: "Build and visualize AI automation workflows",
  },
  {
    title: "Ideation Lab",
    href: "/labs/ideation",
    description: "Generate and explore AI-powered ideas",
  },
  {
    title: "Agent Battle",
    href: "/labs/agent-battle",
    description: "Watch AI agents debate head-to-head",
  },
  {
    title: "Tiny Town",
    href: "/labs/tiny-town",
    description: "Simulate a world with AI NPCs",
  },
  {
    title: "Vibe Coding",
    href: "/labs/vibe-coding",
    description: "Generate UI components instantly",
  },
  {
    title: "Storyboarding",
    href: "/labs/storyboarding",
    description: "Map user journeys visually",
  },
  {
    title: "Document Intelligence",
    href: "/labs/document-intelligence",
    description: "Extract insights from any document",
  },
  {
    title: "ROI Calculator",
    href: "/labs/roi-calculator",
    description: "Calculate your AI automation savings",
  },
  {
    title: "View All Labs →",
    href: "/labs",
    description: "Explore all AI demos and tools",
    isViewAll: true,
  },
];

const companyItems = [
  {
    title: "About Us",
    href: "/about",
    description: "Our story, team, and mission",
  },
  {
    title: "Insights",
    href: "/blog",
    description: "Latest thinking on AI and automation",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch with our team",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function MainNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav
      id="navigation"
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-3 min-w-0"
            aria-label="Sprinter AI Home"
          >
            <BrandLogo className="h-8" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {servicesItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/case-studies" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Case Studies
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>AI Labs</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {labItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                          className={cn(
                            item.featured && "bg-yellow-500/10 border border-yellow-500/20",
                            item.isViewAll && "col-span-2 bg-brand/5 border border-brand/20"
                          )}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {companyItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <ThemeMenu />

            <Button asChild variant="gradient" size="sm">
              <Link href="/contact" className="group">
                Start a 10-Day Sprint
                <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeMenu />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-card/30 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <div className="space-y-4">
                {/* Services Section */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Services
                  </h3>
                  <div className="space-y-1">
                    {servicesItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-card/30",
                          pathname === item.href
                            ? "text-foreground bg-card/30"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Case Studies Link */}
                <div>
                  <Link
                    href="/case-studies"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-card/30",
                      pathname === "/case-studies"
                        ? "text-foreground bg-card/30"
                        : "text-muted-foreground"
                    )}
                  >
                    Case Studies
                  </Link>
                </div>

                {/* AI Labs Section */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    AI Labs
                  </h3>
                  <div className="space-y-1">
                    {labItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-card/30",
                          pathname === item.href
                            ? "text-foreground bg-card/30"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Company Section */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Company
                  </h3>
                  <div className="space-y-1">
                    {companyItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-card/30",
                          pathname === item.href
                            ? "text-foreground bg-card/30"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button asChild variant="gradient" className="w-full">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Start a 10-Day Sprint
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}