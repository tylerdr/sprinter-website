"use server";

import { createClient } from "@/lib/supabase/client";
import { PETycoonEntityManager, DeterministicRNG } from "@/lib/pe-tycoon/entity-engine";
import { PE_TYCOON_ENTITY_TYPES } from "@/lib/pe-tycoon/entity-types";

// Initialize entity types in database if not exists
export async function initializeEntityTypes() {
  const supabase = createClient();
  
  for (const [key, entityType] of Object.entries(PE_TYCOON_ENTITY_TYPES)) {
    const { data: existing } = await supabase
      .from('entity_types')
      .select('id')
      .eq('slug', entityType.slug)
      .single();
    
    if (!existing) {
      await supabase
        .from('entity_types')
        .insert({
          slug: entityType.slug,
          name: entityType.name,
          json_schema: entityType.json_schema,
          visibility: 'public'
        });
    }
  }
}

// Create a new game room
export async function createGameRoom(params: {
  playerName: string;
  roomName: string;
  fundSize: number;
  tickSpeed?: number;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Authentication required");
  
  const tenantId = user.id;
  const manager = new PETycoonEntityManager(tenantId);
  
  // Create room
  const room = await manager.createRoom({
    name: params.roomName,
    tickMs: params.tickSpeed || 15000,
    settings: {
      event_volatility: 'medium',
      starting_capital: params.fundSize,
      victory_condition: 'highest_irr'
    }
  });
  
  // Create player's fund
  const fund = await manager.createFund({
    roomId: room.id,
    playerId: user.id,
    name: params.playerName,
    committedCapital: params.fundSize
  });
  
  // Generate initial market
  const rng = new DeterministicRNG(room.content.seed);
  await manager.generateCompanies(room.id, rng, 20);
  
  return { room, fund };
}

// Join existing room
export async function joinGameRoom(roomId: string, fundName: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Authentication required");
  
  const tenantId = user.id;
  const manager = new PETycoonEntityManager(tenantId);
  
  // Get room details
  const { data: room } = await supabase
    .from('entities')
    .select('*')
    .eq('id', roomId)
    .single();
  
  if (!room) throw new Error("Room not found");
  if (room.content.status !== 'lobby') throw new Error("Room already started");
  
  // Create player's fund
  const fund = await manager.createFund({
    roomId: roomId,
    playerId: user.id,
    name: fundName,
    committedCapital: room.content.settings.starting_capital
  });
  
  return { room, fund };
}

// Process game tick
export async function processGameTick(roomId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Authentication required");
  
  const manager = new PETycoonEntityManager(user.id);
  const newTick = await manager.processTick(roomId);
  
  return { tick: newTick };
}

// Submit deal bid
export async function submitDealBid(params: {
  fundId: string;
  companyId: string;
  bidPrice: number;
  leverage: number;
  debtStructure: any;
}) {
  const supabase = createClient();
  
  // Create bid action entity
  const { data, error } = await supabase
    .from('entities')
    .insert({
      entity_type_id: await getEntityTypeId('pe_tycoon_action'),
      slug: `bid-${Date.now()}`,
      content: {
        fund_id: params.fundId,
        action_type: 'submit_bid',
        payload: {
          company_id: params.companyId,
          bid_price: params.bidPrice,
          leverage: params.leverage,
          debt_structure: params.debtStructure
        },
        fp_cost: 2,
        eta_tick: 1,
        status: 'queued'
      }
    });
  
  if (error) throw error;
  return data;
}

// Launch operations program
export async function launchOpsProgram(params: {
  fundId: string;
  positionId: string;
  programType: string;
  capex: number;
}) {
  const supabase = createClient();
  
  const programConfig = getOpsProgramConfig(params.programType);
  
  const { data, error } = await supabase
    .from('entities')
    .insert({
      entity_type_id: await getEntityTypeId('pe_tycoon_action'),
      slug: `ops-${Date.now()}`,
      content: {
        fund_id: params.fundId,
        action_type: 'launch_ops',
        payload: {
          position_id: params.positionId,
          program: {
            name: programConfig.name,
            type: params.programType,
            ...programConfig,
            capex: params.capex
          }
        },
        fp_cost: 3,
        eta_tick: 2,
        status: 'queued'
      }
    });
  
  if (error) throw error;
  return data;
}

// Exit position
export async function exitPosition(params: {
  fundId: string;
  positionId: string;
  acceptPreemptive: boolean;
}) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('entities')
    .insert({
      entity_type_id: await getEntityTypeId('pe_tycoon_action'),
      slug: `exit-${Date.now()}`,
      content: {
        fund_id: params.fundId,
        action_type: 'full_exit',
        payload: {
          position_id: params.positionId,
          accept_preemptive: params.acceptPreemptive
        },
        fp_cost: 3,
        eta_tick: 1,
        status: 'queued'
      }
    });
  
  if (error) throw error;
  
  // Generate exit card
  await generateExitCard(params.positionId);
  
  return data;
}

// Generate shareable exit card
export async function generateExitCard(positionId: string) {
  const supabase = createClient();
  
  // Get position details
  const { data: position } = await supabase
    .from('entities')
    .select('*')
    .eq('id', positionId)
    .single();
  
  if (!position) throw new Error("Position not found");
  
  const pos = position.content;
  const holdMonths = pos.current_month - pos.acquired_month;
  const exitEbitda = pos.ltm_ebitda;
  const entryEbitda = pos.entry_ebitda;
  const exitMultiple = pos.exit_multiple || 8;
  const entryMultiple = pos.entry_multiple;
  
  const exitEV = exitEbitda * exitMultiple;
  const entryEV = entryEbitda * entryMultiple;
  const netDebt = pos.debt_facilities?.reduce((sum: number, d: any) => sum + d.principal, 0) || 0;
  const equityValue = exitEV - netDebt;
  const moic = equityValue / pos.equity_invested;
  const irr = calculateIRR(pos.equity_invested, equityValue, holdMonths);
  
  // Create exit card entity
  const exitCard = {
    fund_id: pos.fund_id,
    position_id: positionId,
    company_name: pos.company_name,
    sector: pos.sector,
    moic,
    irr,
    hold_months: holdMonths,
    value_bridge: {
      entry_ebitda: entryEbitda,
      exit_ebitda: exitEbitda,
      ebitda_growth: (exitEbitda - entryEbitda) / entryEbitda,
      entry_multiple: entryMultiple,
      exit_multiple: exitMultiple,
      multiple_expansion: exitMultiple - entryMultiple,
      entry_ev: entryEV,
      exit_ev: exitEV,
      net_debt_paydown: pos.initial_debt - netDebt,
      equity_value: equityValue
    },
    macro_regime: pos.macro_regime,
    ops_programs_used: pos.ops_programs?.map((p: any) => p.name) || [],
    challenges_overcome: pos.events_survived || [],
    share_caption: `Turned ${pos.company_name} into a ${moic.toFixed(1)}x return (${irr.toFixed(0)}% IRR) in ${holdMonths} months through operational excellence. #PETycoon`
  };
  
  const { data, error } = await supabase
    .from('entities')
    .insert({
      entity_type_id: await getEntityTypeId('pe_tycoon_exit_card'),
      slug: `exit-card-${Date.now()}`,
      title: `${pos.company_name} Exit`,
      content: exitCard
    });
  
  if (error) throw error;
  return data;
}

// Use jackpot token
export async function useJackpotToken(fundId: string) {
  const supabase = createClient();
  
  // Get fund
  const { data: fund } = await supabase
    .from('entities')
    .select('*')
    .eq('id', fundId)
    .single();
  
  if (!fund || fund.content.jackpot_tokens < 1) {
    throw new Error("No jackpot tokens available");
  }
  
  // Roll jackpot
  const rng = new DeterministicRNG(Date.now().toString());
  const outcome = rollJackpot(rng);
  
  // Apply outcome
  let effect = null;
  switch (outcome) {
    case 'banker_whisper':
      effect = { type: 'pipeline_boost', deals: 2 };
      break;
    case 'spread_nudge':
      effect = { type: 'rate_reduction', bps: 25 };
      break;
    case 'strategic_preempt':
      effect = { type: 'multiple_boost', amount: 0.6, duration: 6 };
      break;
    case 'white_knight':
      effect = { type: 'covenant_grace', duration: 2 };
      break;
  }
  
  // Update fund
  await supabase
    .from('entities')
    .update({
      content: {
        ...fund.content,
        jackpot_tokens: fund.content.jackpot_tokens - 1,
        active_effects: [...(fund.content.active_effects || []), effect].filter(Boolean)
      }
    })
    .eq('id', fundId);
  
  return { outcome, effect };
}

// Helper functions
async function getEntityTypeId(slug: string): Promise<string> {
  const supabase = createClient();
  const { data } = await supabase
    .from('entity_types')
    .select('id')
    .eq('slug', slug)
    .single();
  return data?.id || '';
}

function getOpsProgramConfig(type: string) {
  const programs: any = {
    automation: {
      name: 'AI Automation Suite',
      ebitda_impact: 0.03,
      growth_impact: 0.02,
      impact_month: 6
    },
    sales_acceleration: {
      name: 'Sales Acceleration',
      growth_impact: 0.05,
      impact_month: 3
    },
    procurement: {
      name: 'Procurement Optimization',
      ebitda_impact: 0.02,
      impact_month: 4
    },
    digital_transformation: {
      name: 'Digital Transformation',
      ebitda_impact: 0.02,
      growth_impact: 0.03,
      impact_month: 9
    },
    lean_six_sigma: {
      name: 'Lean Six Sigma',
      ebitda_impact: 0.015,
      impact_month: 6
    }
  };
  
  return programs[type] || programs.automation;
}

function calculateIRR(initialInvestment: number, finalValue: number, months: number): number {
  const years = months / 12;
  if (years <= 0) return 0;
  
  const moic = finalValue / initialInvestment;
  return (Math.pow(moic, 1 / years) - 1) * 100;
}

function rollJackpot(rng: DeterministicRNG): string {
  const table = [
    { outcome: 'none', odds: 0.55 },
    { outcome: 'banker_whisper', odds: 0.30 },
    { outcome: 'spread_nudge', odds: 0.10 },
    { outcome: 'strategic_preempt', odds: 0.04 },
    { outcome: 'white_knight', odds: 0.01 }
  ];
  
  let r = rng.next();
  for (const row of table) {
    if ((r -= row.odds) <= 0) return row.outcome;
  }
  return 'none';
}