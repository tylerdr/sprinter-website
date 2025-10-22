import { NextRequest, NextResponse } from "next/server";
import { migrateUseCases } from "@/lib/data-migration/use-cases-migration";
import { generateCompleteUseCaseSchema } from "@/lib/structured-data/use-case-schema";

// GET /api/entities/use-cases - List all use cases with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get migrated use cases (in production, this would come from database)
    const useCases = migrateUseCases();

    // Apply filters
    const filters = {
      category: searchParams.get("category"),
      industry: searchParams.get("industry"),
      role: searchParams.get("role"),
      difficulty: searchParams.get("difficulty"),
      search: searchParams.get("search"),
      featured: searchParams.get("featured") === "true",
      limit: parseInt(searchParams.get("limit") || "50"),
      offset: parseInt(searchParams.get("offset") || "0")
    };

    let filteredUseCases = useCases;

    // Apply category filter
    if (filters.category) {
      filteredUseCases = filteredUseCases.filter(uc => uc.category === filters.category);
    }

    // Apply industry filter
    if (filters.industry) {
      filteredUseCases = filteredUseCases.filter(uc =>
        uc.industries.includes(filters.industry as any)
      );
    }

    // Apply role filter
    if (filters.role) {
      filteredUseCases = filteredUseCases.filter(uc =>
        uc.roles.includes(filters.role as any)
      );
    }

    // Apply difficulty filter
    if (filters.difficulty) {
      filteredUseCases = filteredUseCases.filter(uc => uc.difficulty === filters.difficulty);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUseCases = filteredUseCases.filter(uc =>
        uc.title.toLowerCase().includes(searchLower) ||
        uc.description.toLowerCase().includes(searchLower) ||
        uc.businessValue.toLowerCase().includes(searchLower)
      );
    }

    // Apply featured filter
    if (filters.featured) {
      filteredUseCases = filteredUseCases.filter(uc => uc.featured);
    }

    // Apply pagination
    const total = filteredUseCases.length;
    const paginatedUseCases = filteredUseCases.slice(
      filters.offset,
      filters.offset + filters.limit
    );

    return NextResponse.json({
      data: paginatedUseCases,
      meta: {
        total,
        count: paginatedUseCases.length,
        offset: filters.offset,
        limit: filters.limit,
        hasMore: filters.offset + filters.limit < total
      },
      filters: {
        applied: Object.entries(filters).filter(([_, value]) =>
          value !== null && value !== "" && value !== false && value !== 0
        ),
        available: {
          categories: [...new Set(useCases.map(uc => uc.category))],
          industries: [...new Set(useCases.flatMap(uc => uc.industries))],
          roles: [...new Set(useCases.flatMap(uc => uc.roles))],
          difficulties: [...new Set(useCases.map(uc => uc.difficulty))]
        }
      }
    });
  } catch (error) {
    console.error("Error fetching use cases:", error);
    return NextResponse.json(
      { error: "Failed to fetch use cases" },
      { status: 500 }
    );
  }
}

// POST /api/entities/use-cases - Create new use case (for admin use)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, validate with schema and save to database
    // For now, return success
    return NextResponse.json({
      success: true,
      message: "Use case created successfully",
      data: { ...body, id: `uc_${Date.now()}` }
    });
  } catch (error) {
    console.error("Error creating use case:", error);
    return NextResponse.json(
      { error: "Failed to create use case" },
      { status: 500 }
    );
  }
}