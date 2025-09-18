"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { TOOL_UI_IMPORTS } from "../ui-registry";
import { logger } from "@/lib/logger";

interface ToolViewProps {
  slug: string;
}

export function ToolView({ slug }: ToolViewProps) {
  const [ToolUI, setToolUI] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUI() {
      try {
        const importer = TOOL_UI_IMPORTS[slug];
        if (!importer) {
          throw new Error(`No UI registered for tool: ${slug}`);
        }

        const module = await importer();
        const Component = module.default || module.ToolUI || module;

        setToolUI(() => Component);
        setError(null);
      } catch (err) {
        logger.error("Failed to load tool UI", {
          tool: slug,
          error: err instanceof Error ? err.message : String(err)
        });
        setError(err instanceof Error ? err.message : "Failed to load tool");
      } finally {
        setLoading(false);
      }
    }

    loadUI();
  }, [slug]);

  // Format slug for display
  const toolName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !ToolUI) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Tool Not Available</h1>
            <p className="text-muted-foreground mb-6">
              {error || "This tool is not currently available."}
            </p>
            <Button asChild>
              <Link href="/tools">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Tools
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/tools">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Tools
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-2">{toolName}</h1>
          <p className="text-muted-foreground">
            Powered by the AI Sprinter Platform
          </p>
        </div>

        {/* Tool UI */}
        <div className="max-w-6xl mx-auto">
          <ToolUI />
        </div>
      </div>
    </div>
  );
}