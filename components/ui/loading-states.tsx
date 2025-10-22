"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Brain, Zap, ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ai" | "minimal" | "skeleton";
  text?: string;
  subtext?: string;
}

export function LoadingSpinner({
  className = "",
  size = "md",
  variant = "default",
  text,
  subtext
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const Icon = variant === "ai" ? Brain : Loader2;

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={cn(
          "text-brand-start",
          sizeClasses[size]
        )}
      >
        <Icon className="w-full h-full" />
      </motion.div>
      {text && (
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">{text}</p>
          {subtext && (
            <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
          )}
        </div>
      )}
    </div>
  );
}

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
  animated?: boolean;
  variant?: "default" | "gradient" | "pulse";
}

export function ProgressBar({
  progress,
  className = "",
  size = "md",
  showPercentage = true,
  animated = true,
  variant = "default"
}: ProgressBarProps) {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  };

  const backgroundClass = variant === "gradient"
    ? "bg-brand-gradient"
    : variant === "pulse"
    ? "bg-brand-start"
    : "bg-brand-start";

  return (
    <div className={cn("w-full", className)}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            Progress
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className={cn(
        "bg-muted rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <motion.div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            backgroundClass,
            variant === "pulse" && "animate-pulse"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          transition={{
            duration: animated ? 0.5 : 0,
            ease: "easeOut"
          }}
        />
      </div>
    </div>
  );
}

interface AIProcessingStepsProps {
  steps: Array<{
    id: string;
    title: string;
    description?: string;
    status: "pending" | "processing" | "completed" | "error";
  }>;
  className?: string;
}

export function AIProcessingSteps({ steps, className = "" }: AIProcessingStepsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3"
        >
          <div className="flex-shrink-0 mt-1">
            {step.status === "completed" ? (
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <ChevronRight className="w-3 h-3 text-white rotate-90" />
              </div>
            ) : step.status === "processing" ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 rounded-full bg-brand-start flex items-center justify-center"
              >
                <Sparkles className="w-3 h-3 text-white" />
              </motion.div>
            ) : step.status === "error" ? (
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-border" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={cn(
              "text-sm font-medium",
              step.status === "completed" ? "text-green-600 dark:text-green-400" :
              step.status === "processing" ? "text-brand-start" :
              step.status === "error" ? "text-red-600 dark:text-red-400" :
              "text-muted-foreground"
            )}>
              {step.title}
            </h4>
            {step.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {step.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "circle" | "button";
  lines?: number;
}

export function Skeleton({
  className = "",
  variant = "text",
  lines = 1
}: SkeletonProps) {
  const baseClass = "animate-pulse bg-muted rounded";

  if (variant === "text") {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClass,
              "h-4",
              i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
            )}
          />
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={cn("space-y-3", className)}>
        <div className={cn(baseClass, "h-32 w-full")} />
        <div className="space-y-2">
          <div className={cn(baseClass, "h-4 w-3/4")} />
          <div className={cn(baseClass, "h-4 w-1/2")} />
        </div>
      </div>
    );
  }

  if (variant === "circle") {
    return (
      <div className={cn(baseClass, "w-12 h-12 rounded-full", className)} />
    );
  }

  if (variant === "button") {
    return (
      <div className={cn(baseClass, "h-10 w-24", className)} />
    );
  }

  return <div className={cn(baseClass, "h-4", className)} />;
}

interface PulsingDotsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  count?: number;
}

export function PulsingDots({
  className = "",
  size = "md",
  count = 3
}: PulsingDotsProps) {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3"
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "bg-brand-start rounded-full",
            sizeClasses[size]
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: ReactNode;
  loadingContent?: ReactNode;
  className?: string;
  variant?: "overlay" | "replace" | "blur";
}

export function LoadingOverlay({
  isLoading,
  children,
  loadingContent,
  className = "",
  variant = "overlay"
}: LoadingOverlayProps) {
  if (variant === "replace") {
    return (
      <div className={className}>
        {isLoading ? (
          loadingContent || (
            <LoadingSpinner
              text="Loading..."
              variant="ai"
              size="lg"
            />
          )
        ) : (
          children
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "transition-all duration-300",
        isLoading && variant === "blur" && "blur-sm opacity-50"
      )}>
        {children}
      </div>

      {isLoading && variant === "overlay" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10"
        >
          {loadingContent || (
            <LoadingSpinner
              text="Processing..."
              variant="ai"
              size="lg"
            />
          )}
        </motion.div>
      )}
    </div>
  );
}

// Hook for managing loading states
export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);
  const [error, setError] = useState<string | null>(null);

  const startLoading = () => {
    setIsLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const setLoadingError = (errorMessage: string) => {
    setIsLoading(false);
    setError(errorMessage);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
    clearError
  };
}