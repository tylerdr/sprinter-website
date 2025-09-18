"use server";

import { createClient } from "@/utils/supabase/server";
import {
  getEntityAction,
  applyEntityPatchAction,
  createArtifactAction
} from "@/features/entities/server/actions";
import { getUserProfileWithCurrentTenant } from "@/lib/profiles";

type LenderResult = {
  lenderId: string;
  lenderName: string;
  eligible: boolean;
  reasons?: string[];
  programs?: Array<{
    programId: string;
    programName: string;
    rate?: number;
    apr?: number;
    points?: number;
    fees?: number;
    notes?: string;
  }>;
  notes?: string;
  searchTime?: number;
};

export async function runLenderSearchAction({
  entityId,
  lenderIds,
  searchCriteria,
}: {
  entityId: string;
  lenderIds?: string[];
  searchCriteria?: any;
}) {
  const startTime = Date.now();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const userProfile = await getUserProfileWithCurrentTenant();
  const ent = await getEntityAction(entityId);

  // Merge entity state with search criteria
  const entityState = (ent.state_json && typeof ent.state_json === 'object' && !Array.isArray(ent.state_json))
    ? ent.state_json as Record<string, any>
    : {};
  const baseSearchCriteria = {
    ...entityState,
    ...(searchCriteria ?? {})
  };

  // If no lenders specified, search all active lenders for the tenant
  let lendersToSearch = lenderIds;
  if (!lendersToSearch || lendersToSearch.length === 0) {
    const { data: lenders } = await supabase
      .from("lenders")
      .select("id, name, config")
      .eq("tenant_id", userProfile?.current_tenant?.id ?? ent.tenant_id ?? 0)
      .eq("is_active", true)
      .order("name");

    lendersToSearch = lenders?.map(l => String(l.id)) ?? [];
  }

  // Fetch lender details
  const { data: lenders } = await supabase
    .from("lenders")
    .select("id, name, config")
    .in("id", lendersToSearch.map(id => Number(id)));

  if (!lenders || lenders.length === 0) {
    throw new Error("No lenders found to search");
  }

  // Run parallel lender searches
  const searchTasks = lenders.map(async (lender) => {
    const searchStartTime = Date.now();

    try {
      // Search for matching programs for this lender
      const { data: programs } = await supabase
        .from("programs")
        .select(`
          id,
          name,
          details,
          qualifiers:lender_qualifiers(
            qualifier:qualifiers(
              field,
              operator,
              value,
              value_type
            )
          )
        `)
        .eq("lender_id", lender.id)
        .eq("is_active", true);

      // Evaluate eligibility for each program
      const eligiblePrograms: any[] = [];
      const failureReasons = new Set<string>();

      for (const program of programs ?? []) {
        const { eligible, reasons } = evaluateProgramEligibility(
          program,
          baseSearchCriteria
        );

        if (eligible) {
          // Get pricing for eligible programs
          const pricing = calculatePricing(program, baseSearchCriteria);
          eligiblePrograms.push({
            programId: String(program.id),
            programName: program.name,
            rate: pricing.rate,
            apr: pricing.apr,
            points: pricing.points,
            fees: pricing.fees,
            notes: program.details || null,
          });
        } else {
          reasons.forEach(r => failureReasons.add(r));
        }
      }

      const searchTime = Date.now() - searchStartTime;

      return {
        lenderId: String(lender.id),
        lenderName: lender.name,
        eligible: eligiblePrograms.length > 0,
        programs: eligiblePrograms,
        reasons: eligiblePrograms.length === 0 ? Array.from(failureReasons) : undefined,
        notes: (lender.config && typeof lender.config === 'object' && 'notes' in lender.config) ? lender.config.notes : null,
        searchTime,
      } as LenderResult;
    } catch (error) {
      console.error(`Error searching lender ${lender.name}:`, error);
      return {
        lenderId: String(lender.id),
        lenderName: lender.name,
        eligible: false,
        reasons: ["Error during search: " + (error as Error).message],
        searchTime: Date.now() - searchStartTime,
      } as LenderResult;
    }
  });

  const results = await Promise.all(searchTasks);

  // Separate eligible and missed lenders
  const eligible = results
    .filter(r => r.eligible)
    .map(r => ({
      lender_id: r.lenderId,
      lender_name: r.lenderName,
      programs: r.programs,
      notes: r.notes ?? "",
    }));

  const missed = results
    .filter(r => !r.eligible)
    .map(r => ({
      lender_id: r.lenderId,
      lender_name: r.lenderName,
      reasons: r.reasons ?? ["Did not meet criteria"],
    }));

  // Update entity state with results
  const searchHistory = (entityState.search_history && Array.isArray(entityState.search_history))
    ? entityState.search_history as any[]
    : [];
  searchHistory.push({
    timestamp: new Date().toISOString(),
    search_type: "multi_lender",
    lenders_searched: results.length,
    programs_found: eligible.reduce((sum, e) => sum + (e.programs?.length ?? 0), 0),
    duration_ms: Date.now() - startTime,
  });

  const patch = {
    eligible_lenders: eligible,
    missed_lenders: missed,
    search_history: searchHistory.slice(-10), // Keep last 10 searches
    last_search: {
      timestamp: new Date().toISOString(),
      criteria: baseSearchCriteria,
    },
  };

  const applied = await applyEntityPatchAction({
    entityId: ent.id,
    expectedVersion: ent.state_version,
    patch,
  });

  // Create eligibility report artifact
  const summary = `Eligible: ${eligible.length} lenders with ${eligible.reduce((sum, e) => sum + (e.programs?.length ?? 0), 0)} programs • Missed: ${missed.length} lenders`;

  await createArtifactAction({
    entityId: ent.id,
    kind: "eligibility_report",
    title: `Eligibility Report - ${new Date().toLocaleDateString()}`,
    data: { eligible, missed },
    meta: {
      summary,
      lenders: lendersToSearch,
      run_at: new Date().toISOString(),
      search_duration_ms: Date.now() - startTime,
      criteria_used: baseSearchCriteria,
    }
  });

  // If there are eligible programs with pricing, create a pricing sheet
  const programsWithPricing = eligible.flatMap(e =>
    (e.programs ?? []).map(p => ({
      lender: e.lender_name,
      ...p
    }))
  ).filter(p => p.rate);

  if (programsWithPricing.length > 0) {
    const bestRate = Math.min(...programsWithPricing.map(p => p.rate!));
    const averageRate = programsWithPricing.reduce((sum, p) => sum + (p.rate ?? 0), 0) / programsWithPricing.length;

    await createArtifactAction({
      entityId: ent.id,
      kind: "pricing_sheet",
      title: `Pricing Sheet - ${new Date().toLocaleDateString()}`,
      data: {
        programs: programsWithPricing,
        summary: {
          bestRate,
          averageRate,
          totalPrograms: programsWithPricing.length,
          totalLenders: eligible.length,
        }
      },
      meta: {
        generated_at: new Date().toISOString(),
        loan_amount: baseSearchCriteria.loan?.amount,
      }
    });
  }

  return {
    ok: true as const,
    results,
    summary: {
      eligible: eligible.length,
      missed: missed.length,
      totalPrograms: eligible.reduce((sum, e) => sum + (e.programs?.length ?? 0), 0),
      searchDuration: Date.now() - startTime,
    },
    entity: {
      id: ent.id,
      version: applied.newVersion
    }
  };
}

function evaluateProgramEligibility(
  program: any,
  criteria: any
): { eligible: boolean; reasons: string[] } {
  const reasons: string[] = [];
  let eligible = true;

  // Evaluate each qualifier
  for (const lq of program.qualifiers ?? []) {
    const qualifier = lq.qualifier;
    if (!qualifier) continue;

    const fieldValue = getNestedValue(criteria, qualifier.field);
    const qualifierValue = parseValue(qualifier.value, qualifier.value_type);

    let qualifierMet = false;
    switch (qualifier.operator) {
      case "equals":
        qualifierMet = fieldValue == qualifierValue;
        break;
      case "not_equals":
        qualifierMet = fieldValue != qualifierValue;
        break;
      case "greater_than":
        qualifierMet = fieldValue > qualifierValue;
        break;
      case "greater_than_or_equals":
        qualifierMet = fieldValue >= qualifierValue;
        break;
      case "less_than":
        qualifierMet = fieldValue < qualifierValue;
        break;
      case "less_than_or_equals":
        qualifierMet = fieldValue <= qualifierValue;
        break;
      case "contains":
        qualifierMet = Array.isArray(fieldValue)
          ? fieldValue.includes(qualifierValue)
          : String(fieldValue).includes(String(qualifierValue));
        break;
      case "not_contains":
        qualifierMet = Array.isArray(fieldValue)
          ? !fieldValue.includes(qualifierValue)
          : !String(fieldValue).includes(String(qualifierValue));
        break;
      case "in":
        qualifierMet = Array.isArray(qualifierValue)
          ? qualifierValue.includes(fieldValue)
          : false;
        break;
      case "not_in":
        qualifierMet = Array.isArray(qualifierValue)
          ? !qualifierValue.includes(fieldValue)
          : true;
        break;
    }

    if (!qualifierMet) {
      eligible = false;
      reasons.push(
        `${qualifier.field.replace(/_/g, " ")} ${qualifier.operator.replace(/_/g, " ")} ${qualifier.value} (actual: ${fieldValue})`
      );
    }
  }

  return { eligible, reasons };
}

function calculatePricing(program: any, criteria: any) {
  // Base rate from program config
  let rate = program.config?.base_rate ?? 5.0;
  let points = program.config?.base_points ?? 0;
  let fees = program.config?.base_fees ?? 0;

  // Apply adjustments based on criteria
  const fico = criteria.borrower?.fico;
  const ltv = criteria.borrower?.ltv;
  const loanAmount = criteria.loan?.amount;

  // FICO adjustments
  if (fico) {
    if (fico >= 780) rate -= 0.25;
    else if (fico >= 740) rate -= 0.125;
    else if (fico < 680) rate += 0.25;
    else if (fico < 640) rate += 0.5;
  }

  // LTV adjustments
  if (ltv) {
    if (ltv <= 60) rate -= 0.125;
    else if (ltv > 80) rate += 0.25;
    else if (ltv > 90) rate += 0.5;
  }

  // Loan amount adjustments
  if (loanAmount) {
    if (loanAmount < 100000) fees += 500;
    else if (loanAmount > 1000000) rate += 0.125;
  }

  const apr = rate + (points * 0.125) + (fees / loanAmount * 100);

  return {
    rate: Math.max(rate, 0),
    apr: Math.max(apr, 0),
    points: Math.max(points, 0),
    fees: Math.max(fees, 0),
  };
}

function getNestedValue(obj: any, path: string): any {
  const keys = path.split(".");
  let value = obj;

  for (const key of keys) {
    if (value == null) return undefined;
    value = value[key];
  }

  return value;
}

function parseValue(value: any, type: string): any {
  switch (type) {
    case "number":
      return Number(value);
    case "boolean":
      return value === "true" || value === true;
    case "array":
      return Array.isArray(value) ? value : JSON.parse(value);
    default:
      return value;
  }
}