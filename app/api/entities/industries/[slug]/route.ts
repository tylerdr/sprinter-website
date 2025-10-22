import { NextRequest, NextResponse } from "next/server";
import { migrateIndustries } from "@/lib/data-migration/industries-migration";
import { migrateUseCases } from "@/lib/data-migration/use-cases-migration";
import { generateCompleteIndustrySchema } from "@/lib/structured-data/industry-schema";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

// GET /api/entities/industries/[slug] - Get specific industry
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;

    // Get migrated data (in production, this would come from database)
    const industries = migrateIndustries();
    const useCases = migrateUseCases();

    const industry = industries.find(ind => ind.slug === slug);

    if (!industry) {
      return NextResponse.json(
        { error: "Industry not found" },
        { status: 404 }
      );
    }

    // Get related use cases for this industry
    const relatedUseCases = useCases.filter(uc =>
      uc.industries.some(ind => ind.replace(/-/g, '') === industry.slug.replace(/-/g, ''))
    );

    // Get related industries (same category or similar maturity)
    const relatedIndustries = industries
      .filter(ind =>
        ind.slug !== slug &&
        (ind.category === industry.category || ind.aiMaturity === industry.aiMaturity)
      )
      .slice(0, 3);

    // Generate structured data
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sprinter.ai";
    const structuredData = generateCompleteIndustrySchema(industry as any, baseUrl);

    // Calculate industry insights
    const insights = {
      totalUseCases: relatedUseCases.length,
      avgImplementationTime: calculateAvgImplementationTime(relatedUseCases),
      topBenefits: calculateTopBenefits(relatedUseCases),
      difficultyDistribution: calculateDifficultyDistribution(relatedUseCases),
      roiRange: extractROIRange(relatedUseCases)
    };

    return NextResponse.json({
      data: industry,
      relatedUseCases: relatedUseCases.slice(0, 6), // Limit to 6 for performance
      relatedIndustries,
      structuredData,
      insights,
      meta: {
        canonical: `${baseUrl}/industries/${slug}`,
        ogImage: `${baseUrl}/api/og/industry?slug=${slug}`,
        lastModified: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("Error fetching industry:", error);
    return NextResponse.json(
      { error: "Failed to fetch industry" },
      { status: 500 }
    );
  }
}

// Helper functions for insights calculation
function calculateAvgImplementationTime(useCases: any[]) {
  if (useCases.length === 0) return "3-6 months";

  const times = useCases.map(uc => {
    const phases = uc.implementationPhases || [];
    return phases.length * 4; // Rough weeks estimate
  });

  const avgWeeks = times.reduce((sum, weeks) => sum + weeks, 0) / times.length;

  if (avgWeeks <= 4) return "2-4 weeks";
  if (avgWeeks <= 8) return "1-2 months";
  if (avgWeeks <= 16) return "2-4 months";
  return "3-6 months";
}

function calculateTopBenefits(useCases: any[]) {
  const benefitCounts: Record<string, number> = {};

  useCases.forEach(uc => {
    uc.benefits?.forEach((benefit: any) => {
      const metric = benefit.metric;
      benefitCounts[metric] = (benefitCounts[metric] || 0) + 1;
    });
  });

  return Object.entries(benefitCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([benefit, count]) => ({ benefit, count }));
}

function calculateDifficultyDistribution(useCases: any[]) {
  const distribution = { Easy: 0, Medium: 0, Advanced: 0 };

  useCases.forEach(uc => {
    if (uc.difficulty in distribution) {
      distribution[uc.difficulty as keyof typeof distribution]++;
    }
  });

  const total = useCases.length;
  return {
    Easy: total > 0 ? Math.round((distribution.Easy / total) * 100) : 0,
    Medium: total > 0 ? Math.round((distribution.Medium / total) * 100) : 0,
    Advanced: total > 0 ? Math.round((distribution.Advanced / total) * 100) : 0
  };
}

function extractROIRange(useCases: any[]) {
  if (useCases.length === 0) return "100-300% typical ROI";

  // Extract ROI percentages from use cases
  const roiValues: number[] = [];

  useCases.forEach(uc => {
    const roiStr = uc.roiRange || "";
    const matches = roiStr.match(/(\d+)-?(\d+)?%/);
    if (matches) {
      roiValues.push(parseInt(matches[1]));
      if (matches[2]) {
        roiValues.push(parseInt(matches[2]));
      }
    }
  });

  if (roiValues.length === 0) return "100-300% typical ROI";

  const min = Math.min(...roiValues);
  const max = Math.max(...roiValues);

  return `${min}-${max}% typical ROI`;
}

// PUT /api/entities/industries/[slug] - Update industry (for admin use)
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // In production, validate with schema and update in database
    // For now, return success
    return NextResponse.json({
      success: true,
      message: "Industry updated successfully",
      data: { ...body, slug, updatedAt: new Date().toISOString() }
    });
  } catch (error) {
    console.error("Error updating industry:", error);
    return NextResponse.json(
      { error: "Failed to update industry" },
      { status: 500 }
    );
  }
}

// DELETE /api/entities/industries/[slug] - Delete industry (for admin use)
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;

    // In production, soft delete in database
    // For now, return success
    return NextResponse.json({
      success: true,
      message: "Industry deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting industry:", error);
    return NextResponse.json(
      { error: "Failed to delete industry" },
      { status: 500 }
    );
  }
}