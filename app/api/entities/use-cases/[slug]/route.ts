import { NextRequest, NextResponse } from "next/server";
import { migrateUseCases } from "@/lib/data-migration/use-cases-migration";
import { generateCompleteUseCaseSchema } from "@/lib/structured-data/use-case-schema";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

// GET /api/entities/use-cases/[slug] - Get specific use case
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;

    // Get migrated use cases (in production, this would come from database)
    const useCases = migrateUseCases();
    const useCase = useCases.find(uc => uc.slug === slug);

    if (!useCase) {
      return NextResponse.json(
        { error: "Use case not found" },
        { status: 404 }
      );
    }

    // Generate structured data
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sprinter.ai";
    const structuredData = generateCompleteUseCaseSchema(useCase as any, baseUrl);

    // Get related use cases
    const relatedUseCases = useCases
      .filter(uc =>
        uc.slug !== slug &&
        (uc.industries.some(ind => useCase.industries.includes(ind)) ||
         uc.category === useCase.category)
      )
      .slice(0, 3);

    return NextResponse.json({
      data: useCase,
      structuredData,
      related: relatedUseCases,
      meta: {
        canonical: `${baseUrl}/use-cases/${slug}`,
        ogImage: `${baseUrl}/api/og/use-case?slug=${slug}`,
        lastModified: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("Error fetching use case:", error);
    return NextResponse.json(
      { error: "Failed to fetch use case" },
      { status: 500 }
    );
  }
}

// PUT /api/entities/use-cases/[slug] - Update use case (for admin use)
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // In production, validate with schema and update in database
    // For now, return success
    return NextResponse.json({
      success: true,
      message: "Use case updated successfully",
      data: { ...body, slug, updatedAt: new Date().toISOString() }
    });
  } catch (error) {
    console.error("Error updating use case:", error);
    return NextResponse.json(
      { error: "Failed to update use case" },
      { status: 500 }
    );
  }
}

// DELETE /api/entities/use-cases/[slug] - Delete use case (for admin use)
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;

    // In production, soft delete in database
    // For now, return success
    return NextResponse.json({
      success: true,
      message: "Use case deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting use case:", error);
    return NextResponse.json(
      { error: "Failed to delete use case" },
      { status: 500 }
    );
  }
}