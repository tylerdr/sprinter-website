"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { List, LayoutGrid, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolsViewControlsProps {
  initialView?: string;
}

export function ToolsViewControls({
  initialView = "grouped"
}: ToolsViewControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-1 border rounded-lg p-1">
      {/* <Button
        variant={initialView === "showcase" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => updateSearchParam("view", "showcase")}
        className="gap-2"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Showcase</span>
      </Button> */}
      <Button
        variant={initialView === "grouped" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => updateSearchParam("view", "grouped")}
        className="gap-2"
      >
        <Layers className="h-4 w-4" />
        <span className="hidden sm:inline">Grouped</span>
      </Button>
      <Button
        variant={initialView === "table" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => updateSearchParam("view", "table")}
        className="gap-2"
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">Table</span>
      </Button>
    </div>
  );
}

export default ToolsViewControls;
