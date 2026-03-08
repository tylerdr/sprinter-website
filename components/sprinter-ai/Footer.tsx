"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <motion.footer
      className="border-t [border-color:var(--spr-border)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="spr-container flex flex-col gap-8 py-10 text-sm text-[color:var(--spr-text-muted)] lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-[color:var(--spr-text)]">sprinter.ai</p>
          <p>Orange County, CA</p>
          <a href="mailto:hello@sprinter.ai" className="spr-link">
            hello@sprinter.ai
          </a>
        </div>

        <div className="space-y-3 lg:text-right">
          <div className="flex flex-wrap gap-4 lg:justify-end">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="spr-link">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-4 lg:justify-end">
            <a
              href="https://linkedin.com/company/sprinterconsulting"
              target="_blank"
              rel="noopener noreferrer"
              className="spr-link"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/SprinterHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="spr-link"
            >
              GitHub
            </a>
          </div>
          <p>© 2026 sprinter.ai. Move fast.</p>
        </div>
      </div>
    </motion.footer>
  );
}
