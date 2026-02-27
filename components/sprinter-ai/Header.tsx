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
      id="navigation"
      className="sticky top-0 z-50 border-b [border-color:var(--spr-border)] bg-[color:rgba(5,10,22,0.82)] backdrop-blur-xl"
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="spr-container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-[color:var(--spr-text)]">
          <span className="bg-gradient-to-r from-[#cbe1ff] via-[#f2f7ff] to-[#9cc4ff] bg-clip-text text-transparent">
            sprinter.ai
          </span>
        </Link>

        <nav className="hidden items-center gap-3 lg:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/sprint" && pathname === "/sprint") ||
              (item.href === "/edge" && pathname === "/edge");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-[color:rgba(59,130,246,0.14)] text-[color:var(--spr-text)]"
                    : "spr-link text-[color:var(--spr-text-muted)] hover:bg-[color:rgba(18,32,66,0.68)]"
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
            className="spr-button spr-button-primary"
          >
            Book a Strategy Call
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-[12px] border [border-color:var(--spr-border)] bg-[color:rgba(12,20,40,0.8)] px-3 py-2 text-sm text-[color:var(--spr-text)] transition hover:border-[color:var(--spr-border-strong)] lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            className="border-t [border-color:var(--spr-border)] px-4 py-3 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="spr-container flex flex-col gap-2 pb-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-[color:var(--spr-text-muted)] transition hover:bg-[color:rgba(18,32,66,0.6)] hover:text-[color:var(--spr-primary)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://cal.com/tyler-dreher"
                target="_blank"
                rel="noopener noreferrer"
                className="spr-button spr-button-primary mt-2 w-fit"
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
