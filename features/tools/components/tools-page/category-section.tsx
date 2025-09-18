"use client";

import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategorySectionProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function CategorySection({
  title,
  count,
  icon,
  children,
  defaultExpanded = true
}: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setIsExpanded(!isExpanded)}>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        {icon}
        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">{title}</h2>
        <span className="text-muted-foreground">{count} {count === 1 ? "tool" : "tools"}</span>
      </div>
      {isExpanded && <div className="pl-8">{children}</div>}
    </div>
  );
}

export default CategorySection;

