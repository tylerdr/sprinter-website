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
      {/* Mobile logo */}
      <Image
        src="/logo-icon.png"
        alt="Sprinter AI"
        width={32}
        height={32}
        priority={priority}
        className="md:hidden"
      />
      {/* Desktop logo */}
      <Image
        src="/logo-no-background.png"
        alt="Sprinter AI"
        width={200}
        height={44}
        priority={priority}
        className="hidden md:block"
      />
    </div>
  );
}
