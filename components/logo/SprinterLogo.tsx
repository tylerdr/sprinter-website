"use client";

import * as React from "react";

type Props = {
  className?: string;
};

export function SprinterLogo({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 500 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sprinter Consulting logo"
    >
      {/* Stylized S mark (approximation) */}
      <defs>
        <linearGradient id="sprinterGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand-start)" />
          <stop offset="100%" stopColor="var(--brand-end)" />
        </linearGradient>
      </defs>

      <g>
        <path
          d="M55 18h120c6 0 11 5 11 11v15H105c-8 0-15 5-18 12l-5 12h-81l9-22C17 31 35 18 55 18Z"
          fill="url(#sprinterGradient)"
        />
        <path
          d="M11 94l9-22h180c8 0 15-5 18-12l5-12h81l-9 22c-7 18-25 31-45 31H22c-6 0-11-5-11-11Z"
          fill="url(#sprinterGradient)"
        />
      </g>

      {/* Wordmark (text) */}
      <g transform="translate(210, 18)" fill="url(#sprinterGradient)">
        <text
          x="0"
          y="40"
          fontFamily="var(--font-geist-sans, ui-sans-serif)"
          fontWeight="700"
          fontSize="48"
        >
          SPRINTER
        </text>
        <text
          x="0"
          y="85"
          fontFamily="var(--font-geist-sans, ui-sans-serif)"
          fontWeight="600"
          fontSize="32"
          opacity="0.8"
        >
          CONSULTING
        </text>
      </g>
    </svg>
  );
}
