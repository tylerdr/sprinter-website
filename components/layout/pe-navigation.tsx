"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { BrandLogo } from "@/components/logo/BrandLogo";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavigationAuth } from "./navigation-auth";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowTrendingUpIcon as TrendingUpIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  BoltIcon,
  RocketLaunchIcon,
  BeakerIcon,
  DocumentMagnifyingGlassIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CommandLineIcon,
  PuzzlePieceIcon,
  ClipboardDocumentCheckIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  PlayIcon,
  NewspaperIcon,
  ChartPieIcon,
  ScaleIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";

const solutions = [
  {
    title: "Portfolio AI Assessment",
    href: "/ai-assessment",
    description: "Comprehensive AI audit across your entire portfolio with ROI projections",
    icon: DocumentMagnifyingGlassIcon,
    badge: "Free",
    badgeColor: "bg-green-500/10 text-green-500"
  },
  {
    title: "5-Day AI Sprint",
    href: "/ai-sprint",
    description: "From prototype to production in one week with guaranteed results",
    icon: RocketLaunchIcon,
    badge: "Popular",
    badgeColor: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "AI Partnership",
    href: "/ai-partnership",
    description: "Embedded AI team for portfolio-wide transformation",
    icon: UserGroupIcon,
  },
  {
    title: "Deal Flow Analyzer",
    href: "/labs/deal-flow-analyzer",
    description: "AI-powered deal screening and due diligence automation",
    icon: ChartPieIcon,
    badge: "New",
    badgeColor: "bg-purple-500/10 text-purple-500"
  },
];

const peTools = [
  {
    title: "PE Tycoon",
    href: "/labs/pe-tycoon",
    description: "Private equity simulation game",
    icon: TrendingUpIcon,
  },
  {
    title: "Deal Flow Analyzer",
    href: "/labs/deal-flow-analyzer",
    description: "Screen and score potential deals",
    icon: ChartBarIcon,
  },
  {
    title: "Portfolio Health Check",
    href: "/dashboard/portfolio-health",
    description: "Real-time portfolio monitoring",
    icon: ShieldCheckIcon,
  },
  {
    title: "Opportunity Audit",
    href: "/labs/opportunity-audit",
    description: "Find AI opportunities in your portfolio",
    icon: LightBulbIcon,
  },
  {
    title: "Industry Blueprint",
    href: "/labs/industry-blueprint",
    description: "AI playbooks by industry vertical",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    title: "PDF Extractor",
    href: "/labs/pdf-extractor",
    description: "Extract data from documents instantly",
    icon: DocumentMagnifyingGlassIcon,
  }
];

const aiLabs = [
  {
    title: "Agent Battle Arena",
    href: "/labs/agent-battle",
    description: "Watch AI agents compete in real-time",
    icon: PlayIcon,
  },
  {
    title: "Document Intelligence",
    href: "/labs/document-intelligence",
    description: "Extract insights from any document",
    icon: DocumentMagnifyingGlassIcon,
  },
  {
    title: "AI Playbook Generator",
    href: "/labs/ai-playbook",
    description: "Generate custom AI implementation plans",
    icon: BeakerIcon,
  },
  {
    title: "Storyboarding Studio",
    href: "/labs/storyboarding",
    description: "Visual AI workflow builder",
    icon: PuzzlePieceIcon,
  },
  {
    title: "All Labs →",
    href: "/labs",
    description: "Explore 30+ AI experiments",
    icon: BeakerIcon,
    className: "border-t mt-2 pt-2"
  }
];

const resources = [
  {
    title: "Case Studies",
    href: "/case-studies",
    description: "Success stories from PE/VC partners",
    icon: BriefcaseIcon,
  },
  {
    title: "Use Cases",
    href: "/use-cases",
    description: "AI applications by industry",
    icon: BuildingOfficeIcon,
  },
  {
    title: "Insights",
    href: "/insights",
    description: "PE/VC AI trends and analysis",
    icon: NewspaperIcon,
  },
  {
    title: "About",
    href: "/about",
    description: "Our team and philosophy",
    icon: UserGroupIcon,
  }
];

export function PENavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 min-w-0"
            aria-label="Sprinter AI Home"
          >
            <BrandLogo className="h-8" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Solutions Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                      {solutions.map((item) => (
                        <ListItem
                          key={item.href}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                          badge={item.badge}
                          badgeColor={item.badgeColor}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                    <div className="p-4 pt-0">
                      <Link href="/pricing">
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 hover:from-blue-500/20 hover:to-purple-500/20 transition-all">
                          <div>
                            <p className="font-medium">Compare All Solutions</p>
                            <p className="text-sm text-muted-foreground">Find the right AI approach for your firm</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-blue-500" />
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* PE Tools Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>PE Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                      {peTools.map((item) => (
                        <ListItem
                          key={item.href}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* AI Labs Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>AI Labs</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                      {aiLabs.map((item) => (
                        <ListItem
                          key={item.href}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                          className={item.className}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      {resources.map((item) => (
                        <ListItem
                          key={item.href}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Direct Links */}
                <NavigationMenuItem>
                  <Link href="/partnership" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Partnership
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right side actions */}
            <div className="flex items-center gap-3 ml-4">
              <NavigationAuth />
              <ThemeToggle />
              <Link href="/ai-assessment">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Free Assessment
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-card/30 transition-colors relative z-50"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="lg:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border z-50"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Mobile Solutions */}
              <div>
                <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Solutions</h3>
                <div className="space-y-2">
                  {solutions.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-card/50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{item.title}</p>
                          {item.badge && (
                            <span className={cn("text-xs px-2 py-0.5 rounded-full", item.badgeColor)}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile PE Tools */}
              <div>
                <h3 className="font-semibold mb-2 text-sm text-muted-foreground">PE Tools</h3>
                <div className="grid grid-cols-2 gap-2">
                  {peTools.slice(0, 4).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="p-3 rounded-lg hover:bg-card/50 transition-colors text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs font-medium">{item.title}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Quick Links */}
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Link
                  href="/labs"
                  className="px-3 py-2 text-sm font-medium hover:text-foreground text-muted-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI Labs
                </Link>
                <Link
                  href="/case-studies"
                  className="px-3 py-2 text-sm font-medium hover:text-foreground text-muted-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Case Studies
                </Link>
                <Link
                  href="/partnership"
                  className="px-3 py-2 text-sm font-medium hover:text-foreground text-muted-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Partnership
                </Link>
                <Link
                  href="/pricing"
                  className="px-3 py-2 text-sm font-medium hover:text-foreground text-muted-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className="px-3 py-2 text-sm font-medium hover:text-foreground text-muted-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Mobile CTA */}
              <Link href="/ai-assessment" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Free Assessment
                </Button>
              </Link>

              <NavigationAuth />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    icon?: React.ElementType;
    badge?: string;
    badgeColor?: string;
  }
>(({ className, title, children, icon: Icon, badge, badgeColor, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
            className
          )}
          {...props}
        >
          <div className="flex items-start gap-3">
            {Icon && <Icon className="h-5 w-5 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors" />}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium leading-none">{title}</div>
                {badge && (
                  <span className={cn("text-xs px-2 py-0.5 rounded-full", badgeColor)}>
                    {badge}
                  </span>
                )}
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";