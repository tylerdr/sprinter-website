import { NextRequest, NextResponse } from "next/server";
import { migrateIndustries } from "@/lib/data-migration/industries-migration";
import { generateIndustryCollectionSchema } from "@/lib/structured-data/industry-schema";

// GET /api/entities/industries - List all industries with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get migrated industries (in production, this would come from database)
    const industries = migrateIndustries();

    // Apply filters
    const filters = {
      category: searchParams.get("category"),
      aiMaturity: searchParams.get("aiMaturity"),
      regulatoryComplexity: searchParams.get("regulatoryComplexity"),
      search: searchParams.get("search"),
      featured: searchParams.get("featured") === "true",
      limit: parseInt(searchParams.get("limit") || "50"),
      offset: parseInt(searchParams.get("offset") || "0")
    };

    let filteredIndustries = industries;

    // Apply category filter
    if (filters.category) {
      filteredIndustries = filteredIndustries.filter(ind => ind.category === filters.category);
    }

    // Apply AI maturity filter
    if (filters.aiMaturity) {
      filteredIndustries = filteredIndustries.filter(ind => ind.aiMaturity === filters.aiMaturity);
    }

    // Apply regulatory complexity filter
    if (filters.regulatoryComplexity) {
      filteredIndustries = filteredIndustries.filter(ind =>
        ind.regulatoryComplexity === filters.regulatoryComplexity
      );
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredIndustries = filteredIndustries.filter(ind =>
        ind.name.toLowerCase().includes(searchLower) ||
        ind.description.toLowerCase().includes(searchLower) ||
        ind.challengeCategories.some(cat =>
          cat.challenges.some(challenge =>
            challenge.toLowerCase().includes(searchLower)
          )
        )
      );
    }

    // Apply featured filter
    if (filters.featured) {
      filteredIndustries = filteredIndustries.filter(ind => ind.featured);
    }

    // Apply pagination
    const total = filteredIndustries.length;
    const paginatedIndustries = filteredIndustries.slice(
      filters.offset,
      filters.offset + filters.limit
    );

    // Generate collection structured data
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sprinter.ai";
    const structuredData = generateIndustryCollectionSchema(industries as any, baseUrl);

    return NextResponse.json({
      data: paginatedIndustries,
      meta: {
        total,
        count: paginatedIndustries.length,
        offset: filters.offset,
        limit: filters.limit,
        hasMore: filters.offset + filters.limit < total
      },
      filters: {
        applied: Object.entries(filters).filter(([_, value]) =>
          value !== null && value !== "" && value !== false && value !== 0
        ),
        available: {
          categories: [...new Set(industries.map(ind => ind.category))],
          aiMaturities: [...new Set(industries.map(ind => ind.aiMaturity))],
          regulatoryComplexities: [...new Set(industries.map(ind => ind.regulatoryComplexity))]
        }
      },
      structuredData
    });
  } catch (error) {
    console.error("Error fetching industries:", error);
    return NextResponse.json(
      { error: "Failed to fetch industries" },
      { status: 500 }
    );
  }
}

// POST /api/entities/industries - Create new industry (for admin use)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, validate with schema and save to database
    // For now, return success
    return NextResponse.json({
      success: true,
      message: "Industry created successfully",
      data: { ...body, id: `ind_${Date.now()}` }
    });
  } catch (error) {
    console.error("Error creating industry:", error);
    return NextResponse.json(
      { error: "Failed to create industry" },
      { status: 500 }
    );
  }
}