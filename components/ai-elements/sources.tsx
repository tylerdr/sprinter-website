"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

/**
 * Container for sources with collapsible functionality
 */
export interface SourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Sources({
  className,
  children,
  open,
  onOpenChange,
  ...props
}: SourcesProps) {
  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </Collapsible>
  );
}

/**
 * Trigger button for expanding/collapsing sources
 */
export interface SourcesTriggerProps extends React.ComponentPropsWithoutRef<typeof CollapsibleTrigger> {
  children?: React.ReactNode;
}

export function SourcesTrigger({
  className,
  children,
  ...props
}: SourcesTriggerProps) {
  return (
    <CollapsibleTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "flex items-center gap-2 text-muted-foreground hover:text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </CollapsibleTrigger>
  );
}

/**
 * Content area for sources list
 */
export interface SourcesContentProps extends React.ComponentPropsWithoutRef<typeof CollapsibleContent> {
  children?: React.ReactNode;
}

export function SourcesContent({
  className,
  children,
  ...props
}: SourcesContentProps) {
  return (
    <CollapsibleContent
      className={cn("mt-2", className)}
      {...props}
    >
      {children}
    </CollapsibleContent>
  );
}