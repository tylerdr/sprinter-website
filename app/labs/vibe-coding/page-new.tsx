"use client";

import { Badge } from "@/components/ui/badge";
import { LabLayout } from "@/components/labs/LabLayout";
import { V0Generator } from "@/components/ai/v0-generator";
import { Code2 } from "lucide-react";

export default function VibeCodingPage() {
  return (
    <LabLayout
      title="Vibe Coding"
      description="Generate UI components with natural language"
      category="creative"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            <Code2 className="w-3 h-3 mr-1" />
            AI-Powered UI Generation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vibe <span className="gradient-text">Coding</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Describe the UI you want, and watch AI generate production-ready 
            components instantly. Powered by v0 and live-editable with Sandpack.
          </p>
        </div>

        {/* V0 Generator Component */}
        <V0Generator />
      </div>
    </LabLayout>
  );
}