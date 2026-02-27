"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 text-sm text-[#A1A1AA] sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="space-y-2">
          <p className="text-[#FAFAFA]">Sprinter Consulting LLC</p>
          <p>Orange County, CA</p>
          <a href="mailto:tyler@sprinterconsulting.com" className="transition hover:text-[#3B82F6]">
            tyler@sprinterconsulting.com
          </a>
        </div>

        <div className="space-y-3 lg:text-right">
          <div className="flex gap-4 lg:justify-end">
            <a
              href="https://linkedin.com/in/tyler-dreher"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[#3B82F6]"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/tylerdr"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[#3B82F6]"
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
