import { NextRequest, NextResponse } from "next/server";
import { loadTool } from "@/features/tools/registry";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toolSlug, input } = body;

    if (!toolSlug) {
      return NextResponse.json(
        { error: "Tool slug is required" },
        { status: 400 }
      );
    }

    // Load the tool
    const tool = await loadTool(toolSlug);

    if (!tool) {
      return NextResponse.json(
        { error: `Tool not found: ${toolSlug}` },
        { status: 404 }
      );
    }

    // Validate input
    const validatedInput = tool.inputSchema.parse(input);

    // Execute the tool
    const result = await tool.execute(validatedInput);

    // Validate output
    const validatedOutput = tool.outputSchema.parse(result);

    return NextResponse.json({
      success: true,
      result: validatedOutput,
      tool: {
        slug: tool.slug,
        name: tool.name,
        description: tool.description
      }
    });

  } catch (error) {
    logger.error("Tool execution failed", {
      error: error instanceof Error ? error.message : String(error)
    });

    if (error instanceof Error && error.message.includes("parse")) {
      return NextResponse.json(
        { error: "Invalid input format", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Tool execution failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}