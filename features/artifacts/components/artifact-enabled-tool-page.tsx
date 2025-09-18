"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ToolClientRunner from "@/features/tools/components/tool-client-runner";
import { ToolPreloadProvider } from "@/features/tools/components/tool-preload-provider";
import ArtifactDock, { ArtifactData } from "./artifact-dock";
import { getArtifactAction } from "@/features/entities/server/actions";

interface ArtifactEnabledToolPageProps {
  tool: {
    slug: string;
    name: string;
    description?: string;
    executionMode?: "server" | "client" | "interactive" | "hybrid";
  };
  entityId: string;
  run: (values: unknown) => Promise<{ ok: boolean; data?: unknown; error?: string }>;
  inputSchemaJSON?: Record<string, any> | null;
}

export default function ArtifactEnabledToolPage({
  tool,
  entityId,
  run,
  inputSchemaJSON
}: ArtifactEnabledToolPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactData | null>(null);
  const [artifactDockOpen, setArtifactDockOpen] = useState(false);

  // Check if there's an artifact in the URL
  const artifactId = searchParams.get("artifact");

  const handleArtifactsCreated = useCallback(() => {
    // Refresh the page to reload the artifacts sidebar
    router.refresh();
  }, [router]);

  const handleArtifactOpen = useCallback(async (artifactId: string) => {
    try {
      const artifact = await getArtifactAction(artifactId);
      if (artifact && 'id' in artifact) {
        const typedArtifact = artifact as any;
        setSelectedArtifact({
          id: typedArtifact.id,
          kind: typedArtifact.kind,
          title: typedArtifact.title,
          data: typedArtifact.data_json,
          meta: typedArtifact.meta_json,
          created_at: typedArtifact.created_at
        });
        setArtifactDockOpen(true);

        // Update URL with artifact ID
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("artifact", artifactId);
        router.push(`?${newParams.toString()}`);
      }
    } catch (error) {
      console.error("Failed to load artifact:", error);
    }
  }, [router, searchParams]);

  const handleArtifactClose = useCallback(() => {
    setArtifactDockOpen(false);
    setSelectedArtifact(null);

    // Remove artifact from URL
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("artifact");
    router.push(`?${newParams.toString()}`);
  }, [router, searchParams]);

  // Load artifact from URL on mount/change
  useCallback(() => {
    if (artifactId && !selectedArtifact) {
      handleArtifactOpen(artifactId);
    }
  }, [artifactId, selectedArtifact, handleArtifactOpen]);

  return (
    <>
      <ToolPreloadProvider renderMode="page">
        <ToolClientRunner
          slug={tool.slug}
          executionMode={tool.executionMode ?? "server"}
          run={run}
          inputSchemaJSON={inputSchemaJSON}
          showEdit
          entityId={entityId}
          onArtifactsCreated={handleArtifactsCreated}
        />
      </ToolPreloadProvider>

      {/* Artifact Dock */}
      <ArtifactDock
        open={artifactDockOpen}
        onClose={handleArtifactClose}
        artifact={selectedArtifact}
      />
    </>
  );
}