"use client";

import { motion } from "framer-motion";

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
          <p className="text-[color:var(--spr-text)]">Sprinter Consulting LLC</p>
          <p>Orange County, CA</p>
          <a href="mailto:tyler@sprinterconsulting.com" className="spr-link">
            tyler@sprinterconsulting.com
          </a>
        </div>

        <div className="space-y-3 lg:text-right">
          <div className="flex gap-4 lg:justify-end">
            <a
              href="https://linkedin.com/in/tyler-dreher"
              target="_blank"
              rel="noopener noreferrer"
              className="spr-link"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/tylerdr"
              target="_blank"
              rel="noopener noreferrer"
              className="spr-link"
            >
              GitHub
            </a>
          </div>
          <p>© 2026 Sprinter Consulting. Move fast.</p>
        </div>
      </div>
    </motion.footer>
  );
}
