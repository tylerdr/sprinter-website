import { notFound } from "next/navigation";
import { ToolView } from "@/features/tools/components/tool-view";
import { getAvailableTools } from "@/features/tools/registry";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Format slug for display
  const toolName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${toolName} | AI Tools Platform`,
    description: `Use our ${toolName} tool powered by AI. Part of the Sprinter AI platform.`
  };
}

export async function generateStaticParams() {
  const tools = getAvailableTools();
  return tools.map(slug => ({ slug }));
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const availableTools = getAvailableTools();

  if (!availableTools.includes(slug)) {
    notFound();
  }

  return <ToolView slug={slug} />;
}