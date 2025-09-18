"use client";

import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface AgentAvatarProps {
  imageUrl?: string | null;
  icon?: string | React.ReactNode;
  name?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10"
};

const iconSizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5"
};

export function AgentAvatar({
  imageUrl,
  icon,
  name,
  className,
  size = "md"
}: AgentAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = imageUrl && !imageError;

  const containerClass = cn(
    sizeClasses[size],
    "rounded-full flex items-center justify-center flex-shrink-0",
    showImage
      ? ""
      : "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary ring-1 ring-primary/20 dark:ring-primary/30",
    className
  );

  if (showImage) {
    return (
      <div className={containerClass}>
        <Image
          src={imageUrl}
          alt={name || "Agent"}
          width={size === "sm" ? 24 : size === "md" ? 32 : 40}
          height={size === "sm" ? 24 : size === "md" ? 32 : 40}
          className="w-full h-full rounded-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Fallback to icon or Bot component
  const iconElement =
    typeof icon === "string" ? (
      <span className="text-sm">{icon}</span>
    ) : icon ? (
      icon
    ) : (
      <Bot className={iconSizeClasses[size]} />
    );

  return <div className={containerClass}>{iconElement}</div>;
}