"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { NAVIGATION } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandLogo } from "@/components/logo/BrandLogo";
import { NavigationAuth } from "./navigation-auth";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type NavigationItem = (typeof NAVIGATION.main)[number] & {
  sections?: {
    title: string;
    items: { href: string; label: string; description?: string }[];
  }[];
  items?: { href: string; label: string; description?: string }[];
  dropdown?: { href: string; label: string }[];
  type?: string;
};

const NAV_ITEMS = NAVIGATION.main as NavigationItem[];

export function NavigationEnhanced() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav
      id="navigation"
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border"
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
          <div className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
            {NAV_ITEMS.map((item) => {
                  if (item.type === "mega") {
                    return (
                      <NavigationMenuItem key={item.href}>
                        <NavigationMenuTrigger className="bg-transparent">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[900px] p-6">
                            <div className="grid grid-cols-3 gap-6">
                              {item.sections?.map((section) => (
                                <div key={section.title}>
                                  <h3 className="mb-3 text-sm font-semibold text-foreground">
                                    {section.title}
                                  </h3>
                                  <ul className="space-y-2">
                                    {section.items.map((subItem) => (
                                      <li key={subItem.href}>
                                        <Link
                                          href={subItem.href}
                                          className="block group"
                                        >
                                          <div className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                                            {subItem.label}
                                          </div>
                                          {subItem.description && (
                                            <div className="text-xs text-muted-foreground">
                                              {subItem.description}
                                            </div>
                                          )}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  } else if (item.type === "dropdown") {
                    return (
                      <NavigationMenuItem key={item.href}>
                        <NavigationMenuTrigger className="bg-transparent">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="w-[400px] p-4 space-y-1">
                            {item.items?.map((subItem) => (
                              <li key={subItem.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.href}
                                    className="block p-3 hover:bg-accent rounded-lg transition-colors"
                                  >
                                    <div className="font-medium text-sm">
                                      {subItem.label}
                                    </div>
                                    {subItem.description && (
                                      <div className="text-xs text-muted-foreground mt-1">
                                        {subItem.description}
                                      </div>
                                    )}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  } else {
                    return (
                      <NavigationMenuItem key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "bg-transparent",
                              pathname === item.href && "text-foreground"
                            )}
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  }
                })}
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center gap-4">
              <NavigationAuth />
              <ThemeToggle />
              <Button asChild className="bg-brand-gradient hover:opacity-90">
                <Link href="/ai-assessment">Get Free Assessment</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-card/30 transition-colors touch-manipulation"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
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
            className="lg:hidden absolute top-16 left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  if (item.type === "mega" || item.type === "dropdown") {
                    return (
                      <div key={item.href}>
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === item.label ? null : item.label
                            )
                          }
                          className="flex items-center justify-between w-full py-3 px-4 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-card/40 rounded-lg"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform",
                              activeDropdown === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 space-y-1">
                                {item.sections?.map((section) => (
                                  <div key={section.title} className="py-2">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                                      {section.title}
                                    </div>
                                    {section.items.map((subItem) => (
                                      <Link
                                        key={subItem.href}
                                        href={subItem.href}
                                        onClick={() => {
                                          setMobileMenuOpen(false);
                                          setActiveDropdown(null);
                                        }}
                                        className="block py-2 px-3 text-sm hover:bg-card/30 rounded-lg"
                                      >
                                        {subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                                {item.items?.map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setActiveDropdown(null);
                                    }}
                                    className="block py-2 px-3 text-sm hover:bg-card/30 rounded-lg"
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  } else {
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block py-3 px-4 text-base font-medium transition-colors hover:text-foreground hover:bg-card/40 rounded-lg",
                          pathname === item.href
                            ? "text-foreground bg-card/30"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  }
                })}
                
                <div className="pt-4 mt-4 border-t border-border/30">
                  <div className="px-4 space-y-3">
                    <NavigationAuth />
                    <Button asChild className="w-full bg-brand-gradient hover:opacity-90">
                      <Link href="/ai-assessment">Get Free Assessment</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
