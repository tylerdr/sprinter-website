"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { NAVIGATION } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandLogo } from "@/components/logo/BrandLogo";
import { NavigationAuth } from "./navigation-auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState<Set<string>>(new Set());

  const toggleMobileItem = (href: string) => {
    const newExpanded = new Set(expandedMobileItems);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedMobileItems(newExpanded);
  };

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
          <div className="hidden md:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                {NAVIGATION.main.map((item) => {
                  const hasDropdown = "dropdown" in item && item.dropdown;
                  const dropdownItems = "items" in item ? item.items : item.dropdown;

                  return (
                    <NavigationMenuItem key={item.href}>
                      {hasDropdown ? (
                        <>
                          <NavigationMenuTrigger
                            className={cn(
                              "h-9 px-3 py-2 text-sm font-medium",
                              pathname.startsWith(item.href)
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                              {dropdownItems?.map((subItem) => (
                                <li key={subItem.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={subItem.href}
                                      className={cn(
                                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                        pathname === subItem.href && "bg-accent/50"
                                      )}
                                    >
                                      <div className="text-sm font-medium leading-none">
                                        {subItem.label}
                                      </div>
                                      {"description" in subItem && subItem.description && (
                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                          {subItem.description}
                                        </p>
                                      )}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link href={item.href} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "h-9 px-3 py-2 text-sm font-medium",
                              pathname === item.href
                                ? "text-foreground bg-accent/50"
                                : "text-muted-foreground"
                            )}
                          >
                            {item.label}
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-2 ml-2">
              {NAVIGATION.ctas && NAVIGATION.ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background",
                    cta.variant === "outline"
                      ? "border border-border hover:bg-accent hover:text-accent-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {cta.label}
                </Link>
              ))}
              <NavigationAuth />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
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
              <div className="space-y-1" role="list">
                {NAVIGATION.main.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    role="listitem"
                  >
                    {"dropdown" in item && item.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleMobileItem(item.href)}
                          className={cn(
                            "flex items-center justify-between w-full py-3 px-4 text-base font-medium transition-colors hover:text-foreground hover:bg-card/40 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background",
                            pathname.startsWith(item.href)
                              ? "text-foreground bg-card/30"
                              : "text-muted-foreground"
                          )}
                          aria-expanded={expandedMobileItems.has(item.href)}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform",
                              expandedMobileItems.has(item.href) && "rotate-180"
                            )}
                          />
                        </button>
                        {expandedMobileItems.has(item.href) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-1"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.href}
                                href={dropdownItem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "block py-2 px-4 text-sm transition-colors hover:text-foreground hover:bg-card/40 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background",
                                  pathname === dropdownItem.href
                                    ? "text-foreground bg-card/30"
                                    : "text-muted-foreground"
                                )}
                                aria-current={pathname === dropdownItem.href ? "page" : undefined}
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block py-3 px-4 text-base font-medium transition-colors hover:text-foreground hover:bg-card/40 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background",
                          pathname === item.href
                            ? "text-foreground bg-card/30"
                            : "text-muted-foreground"
                        )}
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                {NAVIGATION.ctas && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: NAVIGATION.main.length * 0.05 }}
                    className="flex flex-col gap-2 pt-4 border-t border-border"
                  >
                    {NAVIGATION.ctas.map((cta) => (
                      <Link
                        key={cta.href}
                        href={cta.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block py-3 px-4 text-base font-medium rounded-lg text-center transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background",
                          cta.variant === "outline"
                            ? "border border-border hover:bg-accent hover:text-accent-foreground"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                      >
                        {cta.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
