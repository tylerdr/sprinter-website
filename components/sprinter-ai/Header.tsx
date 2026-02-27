"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/#problem", label: "Problem" },
  { href: "/#solution", label: "Solution" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#results", label: "Results" },
  { href: "/#industries", label: "Industries" },
  { href: "/sprint", label: "Sprint" },
  { href: "/edge", label: "Edge" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur"
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-[#FAFAFA]">
          sprinter.ai
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/sprint" && pathname === "/sprint") ||
              (item.href === "/edge" && pathname === "/edge");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive ? "text-[#FAFAFA]" : "text-[#A1A1AA] hover:text-[#3B82F6]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="https://cal.com/tyler-dreher"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#F97316] px-4 py-2 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#fb923c]"
          >
            Book a Strategy Call
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-md border border-white/20 px-3 py-2 text-sm text-[#FAFAFA] lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            className="border-t border-white/10 px-4 py-3 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[#A1A1AA] transition hover:text-[#3B82F6]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://cal.com/tyler-dreher"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit rounded-full bg-[#F97316] px-4 py-2 text-sm font-semibold text-[#0A0A0A]"
              >
                Book a Strategy Call
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
