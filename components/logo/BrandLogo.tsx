"use client";

import Image from "next/image";
import * as React from "react";

type Props = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority }: Props) {
  return (
    <div className={className}>
      {/* Icon for small screens */}
      <div className="md:hidden inline-flex items-center">
        <Image
          src="/logo-icon.png"
          alt="Sprinter Consulting logo"
          width={32}
          height={32}
          priority={priority}
        />
      </div>
      {/* Full lockup for md+ */}
      <div className="hidden md:inline-flex items-center">
        <Image
          src="/logo-no-background.png"
          alt="Sprinter Consulting logo"
          width={200}
          height={44}
          priority={priority}
        />
      </div>
    </div>
  );
}
