"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Sparkles, Trophy, Rocket, ArrowRight } from "lucide-react";
import { useState } from "react";
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
          <div className="hidden md:flex items-center gap-3">
            <NavigationMenu>
              <NavigationMenuList>
                {NAVIGATION.main.map((item) => {
                  const hasDropdown = "dropdown" in item && item.dropdown;
                  const dropdownItems = "items" in item && item.items ? item.items :
                                       "dropdown" in item && item.dropdown ? item.dropdown : [];

                  return (
                    <NavigationMenuItem key={item.href}>
                      {hasDropdown ? (
                        <>
                          <NavigationMenuTrigger
                            className={cn(
                              "h-10 px-4 py-2 text-sm font-medium transition-all duration-200",
                              "hover:text-foreground",
                              pathname.startsWith(item.href)
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className={cn(
                              "grid gap-2 p-4",
                              item.label === "Solutions" ? "w-[650px] md:grid-cols-2" : "w-[550px] md:grid-cols-2"
                            )}>
                              {dropdownItems?.map((subItem) => {
                                const IconComponent =
                                  "icon" in subItem && subItem.icon === "rocket" ? Rocket :
                                  "icon" in subItem && subItem.icon === "trophy" ? Trophy : null;
                                const isFeatured = "featured" in subItem && subItem.featured === true;

                                return (
                                  <li key={subItem.href} className={cn(
                                    isFeatured ? "md:col-span-2" : ""
                                  )}>
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={subItem.href}
                                        className={cn(
                                          "group block select-none space-y-1.5 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200",
                                          "hover:bg-accent/60 hover:shadow-sm",
                                          "focus:bg-accent focus:text-accent-foreground focus:shadow-sm",
                                          pathname === subItem.href && "bg-accent/40",
                                          isFeatured ? "border border-border/50 bg-gradient-to-br from-accent/20 to-transparent" : ""
                                        )}
                                      >
                                        <div className="flex items-center gap-2">
                                          {IconComponent && (
                                            <IconComponent className={cn(
                                              "h-4 w-4 transition-colors",
                                              isFeatured ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                                            )} />
                                          )}
                                          <div className="text-sm font-semibold leading-none group-hover:text-foreground">
                                            {subItem.label}
                                          </div>
                                          {isFeatured && (
                                            <span className="ml-auto text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                              Popular
                                            </span>
                                          )}
                                        </div>
                                        {"description" in subItem && subItem.description ? (
                                          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90">
                                            {String(subItem.description)}
                                          </p>
                                        ) : null}
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                );
                              })}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link href={item.href} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "h-10 px-4 py-2 text-sm font-medium",
                              pathname === item.href
                                ? "text-foreground bg-accent/50"
                                : "text-muted-foreground hover:text-foreground"
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

            <div className="flex items-center gap-2 ml-4">
              <NavigationAuth />
              <ThemeToggle />
              {NAVIGATION.ctas && NAVIGATION.ctas.map((cta) => {
                const IconComponent = "icon" in cta && cta.icon === "sparkles" ? Sparkles : ArrowRight;
                return (
                  <Link
                    key={cta.href}
                    href={cta.href}
                  >
                    <Button
                      variant={cta.variant}
                      size="default"
                      className={cn(
                        "group relative overflow-hidden transition-all duration-300",
                        cta.variant === "default" && [
                          "bg-gradient-to-r from-primary to-primary/90",
                          "hover:from-primary/90 hover:to-primary",
                          "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
                          "border-0"
                        ]
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {cta.label}
                        <IconComponent className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      {cta.variant === "default" && (
                        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-primary/10 blur-2xl" />
                      )}
                    </Button>
                  </Link>
                );
              })}
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
                            {(("items" in item && item.items ? item.items :
                              "dropdown" in item && item.dropdown ? item.dropdown : [])).map((dropdownItem) => (
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
                    className="flex flex-col gap-3 pt-4 mt-4 border-t border-border"
                  >
                    <NavigationAuth />
                    {NAVIGATION.ctas.map((cta) => {
                      const IconComponent = "icon" in cta && cta.icon === "sparkles" ? Sparkles : ArrowRight;
                      return (
                        <Link
                          key={cta.href}
                          href={cta.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-center gap-2 py-3 px-4 text-base font-medium rounded-lg text-center transition-all duration-200 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background",
                            "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-lg"
                          )}
                        >
                          {cta.label}
                          <IconComponent className="h-4 w-4" />
                        </Link>
                      );
                    })}
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
