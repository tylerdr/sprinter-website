// pe-tycoon-engine.ts
// Minimal, seedable simulation core for PE portfolio management game

export type ID = string;

// Seedable RNG (Mulberry32)
const rand = (seed = 42) => {
  let t = seed >>> 0;
  return () => ((t += 0x6D2B79F5), (t = Math.imul(t ^ (t >>> 15), t | 1)), ((t ^= t + Math.imul(t ^ (t >>> 7), t | 61)) ^ t >>> 14) >>> 0) / 4294967296;
};

export type MacroRegime = "easy_credit" | "neutral" | "tight_credit";

export interface FundParams {
  name: string;
  committed: number;
  aum: number; // Assets under management in millions
  mgmtFee: number;
  managementFee: number; // Alias for compatibility
  carry: number;
  carryPct: number; // Alias for compatibility
  hurdle: number;
  preferredReturn: number; // Alias for compatibility
  termMonths: number;
  maxFocusPoints: number;
}

export interface DebtFacility {
  type?: "senior" | "unitranche" | "mezz";
  rate: number;
  amortPct?: number;
  principal: number;
  cashSweepPct?: number;
  covenantNdE?: number; // Net Debt/EBITDA
  covenantMaxLeverage?: number; // Max leverage covenant
  maturityMonths?: number;
  covenantIC?: number; // Interest Coverage
}

export interface OpsProgram {
  name: string;
  opexDeltaPct?: number;
  gmDeltaPct?: number;
  growthDeltaPct?: number;
  capex: number;
  monthsToImpact: number;
}

export interface Company {
  id: ID;
  name: string;
  industry: string;
  revenue: number;
  ebitdaMargin: number;
  ebitda: number; // EBITDA value
  price: number; // Acquisition price
  growthPct: number;
  grossMargin: number;
  wcPct: number; // working capital % of revenue
  capexPct: number;
  quality: number; // 0..1
  hasScandal?: boolean;
}

export interface Deal {
  id: ID;
  company: Company;
  entryMultiple: number;
  equity: number;
  debt: DebtFacility[];
  fees: {
    txn: number;
    monitoring: number;
    financing: number;
  };
  closeMonth: number;
}

export interface Position {
  deal: Deal;
  company: Company; // Direct reference to company for convenience
  // dynamic state
  debt: DebtFacility[];
  leverage: number; // Current leverage ratio
  equityBook: number;
  revenue: number;
  ebitdaMargin: number;
  grossMargin: number;
  growthPct: number;
  wcPct: number;
  capexPct: number;
  opsPrograms: Array<{ prog: OpsProgram; startMonth: number } | string>; // Support both formats
  last12Ebitda: number;
  preemptiveOffer?: { multiple: number; expiresMonth: number };
  id?: string; // Position ID
  name?: string; // Company name alias
  industry?: string; // Industry alias
  ebitda?: number; // Current EBITDA
  entryMultiple?: number; // Entry multiple paid
}

export interface RandomEvent {
  id: string;
  name: string;
  description: string;
  impact: string;
  type: "good" | "bad" | "neutral";
}

export interface FundState {
  month: number;
  macro: MacroRegime;
  macroRegime: MacroRegime; // Alias for compatibility
  cash: number;
  paidIn: number;
  distributed: number;
  nav: number;
  positions: Position[];
  portfolio: Position[]; // Alias for compatibility
  feesYTD: number;
  rng: () => number;
  seed: number;
  params: FundParams;
  fundName: string; // Fund name for display
  aum: number; // Assets under management in billions
  dryPowder: number; // Available capital in billions
  irr: number; // Internal rate of return percentage
  focusPoints: number;
  maxFocusPoints: number;
  events: RandomEvent[];
  availableCompanies: Company[]; // Companies available to acquire
}

export interface ActionResult {
  success: boolean;
  message: string;
  error?: string; // Error message if failed
  focusCost: number;
  event?: RandomEvent;
}

const pct = (x: number) => x / 100;
const clamp = (x: number, min: number, max: number) => Math.max(min, Math.min(max, x));

function monthlyMgmtFee(state: FundState) {
  const annual = state.params.mgmtFee * state.params.committed;
  const m = annual / 12;
  state.cash -= m;
  state.paidIn += Math.max(0, -Math.min(0, state.cash)); // naive capital call if negative
  state.feesYTD += m;
}

function macroShock(regime: MacroRegime, rng: () => number) {
  const z = () => (rng() - 0.5) * 2;
  switch (regime) {
    case "easy_credit":
      return { growth: 0.002 + Math.abs(z()) * 0.004, rate: -0.002, mult: 0.05 + Math.abs(z()) * 0.05 };
    case "tight_credit":
      return { growth: -0.003 - Math.abs(z()) * 0.004, rate: 0.004, mult: -0.08 - Math.abs(z()) * 0.06 };
    default:
      return { growth: z() * 0.002, rate: z() * 0.001, mult: z() * 0.02 };
  }
}

export function randomEvent(pos: Position, rng: () => number): RandomEvent | null {
  const r = rng();
  
  if (r < 0.02) {
    pos.growthPct -= 0.1;
    pos.ebitdaMargin = clamp(pos.ebitdaMargin - 0.05, 0.03, 0.4);
    return {
      id: "scandal",
      name: "Management Scandal",
      description: `${pos.deal.company.name}: CEO misconduct forces resignation`,
      impact: "Margin -5pts, growth -10%",
      type: "bad"
    };
  }
  
  if (r < 0.04) {
    pos.revenue *= 0.8;
    return {
      id: "customer_loss",
      name: "Major Customer Loss",
      description: `${pos.deal.company.name}: Lost 20% revenue from key account`,
      impact: "-20% revenue",
      type: "bad"
    };
  }
  
  if (r < 0.06) {
    pos.revenue *= 1.15;
    return {
      id: "contract_win",
      name: "Surprise Contract Win",
      description: `${pos.deal.company.name}: Landed unexpected enterprise deal`,
      impact: "+15% revenue",
      type: "good"
    };
  }
  
  if (r < 0.08) {
    pos.grossMargin = clamp(pos.grossMargin - 0.03, 0.2, 0.7);
    pos.ebitdaMargin = clamp(pos.ebitdaMargin - 0.02, 0.03, 0.4);
    return {
      id: "cost_shock",
      name: "Input Cost Shock",
      description: `${pos.deal.company.name}: Supply chain disruption hits margins`,
      impact: "GM -3pts, EBITDA -2pts",
      type: "bad"
    };
  }
  
  if (r < 0.10) {
    pos.preemptiveOffer = { multiple: 1.5, expiresMonth: 6 };
    return {
      id: "preemptive",
      name: "Preemptive Offer Received",
      description: `${pos.deal.company.name}: Strategic buyer offers premium (expires in 6 months)`,
      impact: "+1.5x exit multiple if accepted",
      type: "good"
    };
  }
  
  if (r < 0.11) {
    return {
      id: "competitor_bankrupt",
      name: "Competitor Bankruptcy",
      description: `${pos.deal.company.name}: Major competitor files Chapter 11`,
      impact: "Market share opportunity",
      type: "good"
    };
  }
  
  if (r < 0.12) {
    return {
      id: "regulatory",
      name: "Regulatory Investigation",
      description: `${pos.deal.company.name}: OSHA/EPA investigation launched`,
      impact: "Potential fines pending",
      type: "bad"
    };
  }
  
  return null;
}

function applyOpsPrograms(pos: Position, month: number) {
  for (const { prog, startMonth } of pos.opsPrograms) {
    const t = month - startMonth;
    if (t >= prog.monthsToImpact) {
      if (prog.opexDeltaPct) {
        pos.ebitdaMargin = clamp(pos.ebitdaMargin + prog.opexDeltaPct, 0.03, 0.5);
      }
      if (prog.gmDeltaPct) {
        pos.grossMargin = clamp(pos.grossMargin + prog.gmDeltaPct, 0.2, 0.8);
      }
      if (prog.growthDeltaPct) {
        pos.growthPct += prog.growthDeltaPct;
      }
    }
  }
}

function serviceDebt(pos: Position, state: FundState) {
  const ebitda = pos.revenue * pos.ebitdaMargin;
  let interest = 0, amort = 0, sweep = 0;
  
  for (const d of pos.debt) {
    interest += d.principal * d.rate / 12;
    amort += d.principal * d.amortPct / 12;
  }
  
  // cash sweep on FCF
  const capex = pos.revenue * pos.capexPct;
  const wc = pos.revenue * pos.wcPct;
  const fcf = Math.max(0, ebitda - interest - capex - wc);
  
  for (const d of pos.debt) {
    sweep += fcf * d.cashSweepPct;
  }

  const debtSvc = interest + amort + sweep;
  
  // check covenants
  const netDebt = pos.debt.reduce((s, d) => s + d.principal, 0);
  const nde = netDebt / Math.max(1e-6, ebitda);
  const ic = ebitda / Math.max(1e-6, interest);
  
  const breach = pos.debt.some(d => 
    (d.covenantNdE && nde > d.covenantNdE!) || 
    (d.covenantIC && ic < d.covenantIC!)
  );
  
  if (breach) {
    pos.growthPct -= 0.05;
    pos.ebitdaMargin = clamp(pos.ebitdaMargin - 0.01, 0.03, 0.5);
  }

  // pay from fund cash
  state.cash -= debtSvc;
  
  // reduce principal
  for (const d of pos.debt) {
    const paid = (d.principal * d.amortPct / 12) + (sweep * (d.cashSweepPct || 0));
    d.principal = Math.max(0, d.principal - paid);
  }
}

export function monthTick(state: FundState) {
  state.month += 1;
  state.focusPoints = state.maxFocusPoints; // refresh focus points
  state.events = []; // clear events
  
  // fees
  monthlyMgmtFee(state);

  // macro regime shift (10% chance)
  if (state.rng() < 0.1) {
    const regimes: MacroRegime[] = ["easy_credit", "neutral", "tight_credit"];
    state.macro = regimes[Math.floor(state.rng() * regimes.length)];
    state.macroRegime = state.macro; // Keep alias in sync
  }

  const { growth, rate, mult } = macroShock(state.macro, state.rng);

  for (const pos of state.positions) {
    // macro drift
    pos.growthPct += growth;
    for (const d of pos.debt) {
      d.rate = Math.max(0, d.rate + rate);
    }

    // ops programs
    applyOpsPrograms(pos, state.month);

    // stochastic micro drift
    const micro = (state.rng() - 0.5) * 0.02; // ±2% revenue noise
    pos.revenue = Math.max(1e3, pos.revenue * (1 + pos.growthPct + micro));

    // random events
    const evt = randomEvent(pos, state.rng);
    if (evt) state.events.push(evt);

    // service debt
    serviceDebt(pos, state);

    // update LTM EBITDA
    pos.last12Ebitda = pos.revenue * pos.ebitdaMargin;

    // expire preemptive offers
    if (pos.preemptiveOffer && state.month > pos.preemptiveOffer.expiresMonth) {
      delete pos.preemptiveOffer;
    }
  }

  // update NAV
  const baseMultiple = 7.5 + mult * 10;
  state.nav = state.positions.reduce((s, p) => {
    const exitMult = baseMultiple * (0.8 + p.deal.company.quality * 0.6);
    const ev = p.last12Ebitda * exitMult;
    const netDebt = p.debt.reduce((dSum, d) => dSum + d.principal, 0);
    return s + Math.max(0, ev - netDebt);
  }, 0);
  
  // Update display metrics
  state.dryPowder = state.cash / 1000; // Update dry powder in billions
  const years = state.month / 12;
  const tvpi = state.paidIn > 0 ? (state.nav + state.cash + state.distributed) / state.paidIn : 1;
  state.irr = years > 0 ? (Math.pow(tvpi, 1 / years) - 1) * 100 : 0; // IRR as percentage
  
  // Keep portfolio alias in sync
  state.portfolio = state.positions;
}

export function createFund(params: FundParams, seed = 42): FundState {
  const initialCash = params.aum * 0.25;
  
  // Initialize companies with calculated fields
  const availableCompanies = companyTemplates.map(c => ({
    ...c,
    ebitda: c.revenue * c.ebitdaMargin,
    price: c.revenue * c.ebitdaMargin * (8 + c.quality * 4) // 8-12x multiple based on quality
  }));
  
  const state: FundState = {
    month: 0,
    macro: "neutral",
    macroRegime: "neutral",
    cash: initialCash,
    paidIn: 0,
    distributed: 0,
    nav: params.aum,
    positions: [],
    portfolio: [], // Will be linked to positions
    feesYTD: 0,
    rng: rand(seed),
    seed,
    params,
    fundName: params.name,
    aum: params.aum / 1000, // Convert to billions for display
    dryPowder: initialCash / 1000, // Convert to billions
    irr: 0,
    focusPoints: params.maxFocusPoints || 10,
    maxFocusPoints: params.maxFocusPoints || 10,
    events: [],
    availableCompanies
  };
  
  // Link portfolio to positions
  state.portfolio = state.positions;
  
  return state;
}

export function acquire(state: FundState, c: Company, entryMultiple: number, leverage: number): ActionResult {
  if (state.focusPoints < 3) {
    return { success: false, message: "Not enough focus points (need 3)", focusCost: 0 };
  }

  const ebitda = c.revenue * c.ebitdaMargin;
  const ev = ebitda * entryMultiple;
  const debtAmt = ev * leverage;
  const equity = ev - debtAmt;
  
  const debt: DebtFacility[] = [{
    type: "senior",
    rate: 0.08,
    amortPct: 0.05,
    principal: debtAmt,
    cashSweepPct: 0.3,
    covenantNdE: 5.5,
    covenantIC: 1.8
  }];
  
  const deal: Deal = {
    id: `${Date.now()}-${Math.random()}`,
    company: c,
    entryMultiple,
    equity,
    debt,
    fees: {
      txn: ev * 0.02,
      monitoring: 200000,
      financing: ev * 0.01
    },
    closeMonth: state.month
  };
  
  state.cash -= equity + deal.fees.txn + deal.fees.financing;
  state.paidIn += Math.max(0, -Math.min(0, state.cash));
  
  const pos: Position = {
    deal,
    company: c, // Direct reference
    debt: [...debt],
    leverage: leverage,
    equityBook: equity,
    revenue: c.revenue,
    ebitdaMargin: c.ebitdaMargin,
    grossMargin: c.grossMargin,
    growthPct: c.growthPct,
    wcPct: c.wcPct,
    capexPct: c.capexPct,
    opsPrograms: [],
    last12Ebitda: ebitda,
    // Aliases for convenience
    id: deal.id,
    name: c.name,
    industry: c.industry,
    ebitda: ebitda,
    entryMultiple: entryMultiple
  };
  
  state.positions.push(pos);
  state.focusPoints -= 3;
  
  return {
    success: true,
    message: `Acquired ${c.name} for ${(ev / 1e6).toFixed(1)}M (${entryMultiple}x EBITDA)`,
    focusCost: 3
  };
}

export function addOpsProgram(state: FundState, posId: ID, prog: OpsProgram): ActionResult {
  if (state.focusPoints < 2) {
    return { success: false, message: "Not enough focus points (need 2)", focusCost: 0 };
  }

  const p = state.positions.find(p => p.deal.id === posId);
  if (!p) {
    return { success: false, message: "Position not found", focusCost: 0 };
  }

  p.opsPrograms.push({ prog, startMonth: state.month });
  state.cash -= prog.capex;
  state.focusPoints -= 2;

  return {
    success: true,
    message: `Launched ${prog.name} at ${p.deal.company.name}`,
    focusCost: 2
  };
}

export function exitPosition(state: FundState, posId: ID, acceptPreemptive = false): ActionResult {
  if (state.focusPoints < 3) {
    return { success: false, message: "Not enough focus points (need 3)", focusCost: 0 };
  }

  const idx = state.positions.findIndex(p => p.deal.id === posId);
  if (idx < 0) {
    return { success: false, message: "Position not found", focusCost: 0 };
  }

  const p = state.positions[idx];
  const ebitda = p.last12Ebitda;
  const netDebt = p.debt.reduce((s, d) => s + d.principal, 0);
  
  let exitMultiple = 7.5;
  if (acceptPreemptive && p.preemptiveOffer) {
    exitMultiple += p.preemptiveOffer.multiple;
  }
  
  const ev = ebitda * exitMultiple;
  const equityValue = Math.max(0, ev - netDebt);
  
  state.cash += equityValue;
  state.distributed += Math.max(0, equityValue * 0.8);
  state.positions.splice(idx, 1);
  state.focusPoints -= 3;

  const moic = equityValue / p.equityBook;
  
  return {
    success: true,
    message: `Exited ${p.deal.company.name} at ${moic.toFixed(2)}x MOIC`,
    focusCost: 3
  };
}

export function refinanceDebt(state: FundState, posId: ID, newRate: number): ActionResult {
  if (state.focusPoints < 2) {
    return { success: false, message: "Not enough focus points (need 2)", focusCost: 0 };
  }

  const p = state.positions.find(p => p.deal.id === posId);
  if (!p) {
    return { success: false, message: "Position not found", focusCost: 0 };
  }

  // Simple refinance - adjust rate on all facilities
  const oldRate = p.debt[0]?.rate || 0;
  for (const d of p.debt) {
    d.rate = newRate;
  }
  
  state.focusPoints -= 2;

  return {
    success: true,
    message: `Refinanced ${p.deal.company.name} debt from ${(oldRate * 100).toFixed(1)}% to ${(newRate * 100).toFixed(1)}%`,
    focusCost: 2
  };
}

export function calculateMetrics(state: FundState) {
  const totalInvested = state.paidIn;
  const totalValue = state.nav + state.cash + state.distributed;
  const tvpi = totalInvested > 0 ? totalValue / totalInvested : 0;
  const dpi = totalInvested > 0 ? state.distributed / totalInvested : 0;
  
  // Simplified IRR calculation
  const years = state.month / 12;
  const irr = years > 0 ? Math.pow(tvpi, 1 / years) - 1 : 0;
  
  return {
    tvpi: tvpi.toFixed(2),
    dpi: dpi.toFixed(2),
    irr: (irr * 100).toFixed(1) + "%",
    nav: state.nav,
    cash: state.cash,
    distributed: state.distributed,
    paidIn: state.paidIn
  };
}

// Available company templates
export const companyTemplates: Company[] = [
  {
    id: "1",
    name: "TechServe Inc",
    industry: "Software",
    revenue: 25_000_000,
    ebitdaMargin: 0.18,
    ebitda: 0, // Will be calculated
    price: 0, // Will be calculated
    growthPct: 0.15,
    grossMargin: 0.75,
    wcPct: 0.02,
    capexPct: 0.01,
    quality: 0.8
  },
  {
    id: "2",
    name: "Industrial Supply Co",
    industry: "Distribution",
    revenue: 60_000_000,
    ebitdaMargin: 0.12,
    ebitda: 0, // Will be calculated
    price: 0, // Will be calculated
    growthPct: 0.05,
    grossMargin: 0.35,
    wcPct: 0.08,
    capexPct: 0.03,
    quality: 0.6
  },
  {
    id: "3",
    name: "HealthTech Systems",
    industry: "Healthcare",
    revenue: 40_000_000,
    ebitdaMargin: 0.15,
    ebitda: 0, // Will be calculated
    price: 0, // Will be calculated
    growthPct: 0.08,
    grossMargin: 0.55,
    wcPct: 0.05,
    capexPct: 0.02,
    quality: 0.7
  },
  {
    id: "4",
    name: "Patriot Construction",
    industry: "Construction",
    revenue: 45_000_000,
    ebitdaMargin: 0.10,
    ebitda: 0, // Will be calculated
    price: 0, // Will be calculated
    growthPct: 0.03,
    grossMargin: 0.28,
    wcPct: 0.10,
    capexPct: 0.04,
    quality: 0.5
  },
  {
    id: "5",
    name: "DataPro Analytics",
    industry: "Data Services",
    revenue: 15_000_000,
    ebitdaMargin: 0.22,
    ebitda: 0, // Will be calculated
    price: 0, // Will be calculated
    growthPct: 0.25,
    grossMargin: 0.80,
    wcPct: 0.01,
    capexPct: 0.005,
    quality: 0.85
  }
];

// Available ops programs
export const opsPrograms: OpsProgram[] = [
  {
    name: "AI Automation Suite",
    opexDeltaPct: 0.03,
    gmDeltaPct: 0.01,
    growthDeltaPct: 0.02,
    capex: 1_000_000,
    monthsToImpact: 6
  },
  {
    name: "Sales Acceleration",
    growthDeltaPct: 0.05,
    capex: 500_000,
    monthsToImpact: 3
  },
  {
    name: "Procurement Optimization",
    gmDeltaPct: 0.02,
    capex: 250_000,
    monthsToImpact: 4
  },
  {
    name: "Digital Transformation",
    opexDeltaPct: 0.02,
    growthDeltaPct: 0.03,
    capex: 2_000_000,
    monthsToImpact: 9
  },
  {
    name: "Lean Six Sigma",
    opexDeltaPct: 0.01,
    gmDeltaPct: 0.01,
    capex: 300_000,
    monthsToImpact: 6
  }
];

// Game action types
export type GameAction = 
  | { type: "buy_company"; payload: { companyId: string; leverage: number } }
  | { type: "sell_company"; payload: { companyId: string } }
  | { type: "fire_ceo"; payload: { companyId: string } }
  | { type: "launch_ops_program"; payload: { companyId: string; programName: string } }
  | { type: "add_debt"; payload: { companyId: string; amount: number } }
  | { type: "month_tick" };

// Helper functions for game actions
export function initializeGame(): FundState {
  return createFund({
    name: "Apex Capital Partners",
    committed: 2000, // $2B committed capital
    aum: 2000, // $2B AUM
    mgmtFee: 0.02,
    managementFee: 0.02,
    carry: 0.20,
    carryPct: 0.20,
    hurdle: 0.08,
    preferredReturn: 0.08,
    termMonths: 120, // 10 year fund
    maxFocusPoints: 5,
  });
}

export function buyCompany(state: FundState, payload: { companyId: string; leverage: number }) {
  const company = state.availableCompanies.find(c => c.id === payload.companyId);
  if (!company) throw new Error("Company not found");
  
  const entryMultiple = company.ebitda > 0 ? company.price / company.ebitda : 10;
  const result = acquire(state, company, entryMultiple, payload.leverage);
  if (!result.success) throw new Error(result.error);
  
  // Remove from available companies
  state.availableCompanies = state.availableCompanies.filter(c => c.id !== payload.companyId);
}

export function sellCompany(state: FundState, payload: { companyId: string }) {
  const result = exitPosition(state, payload.companyId);
  if (!result.success) throw new Error(result.error);
}

export function fireCEO(state: FundState, payload: { companyId: string }) {
  const position = state.portfolio.find(p => p.company.id === payload.companyId);
  if (!position) throw new Error("Position not found");
  
  // Simulate CEO change effect
  position.company.growthPct += 0.02; // Small growth boost
  state.focusPoints -= 2;
}

export function launchOpsProgram(state: FundState, payload: { companyId: string; programName: string }) {
  const program = opsPrograms.find(p => p.name === payload.programName);
  if (!program) throw new Error("Program not found");
  
  const result = addOpsProgram(state, payload.companyId, program);
  if (!result.success) throw new Error(result.error);
}

export function addDebtFacility(state: FundState, payload: { companyId: string; amount: number }) {
  const position = state.portfolio.find(p => p.company.id === payload.companyId);
  if (!position) throw new Error("Position not found");
  
  const newFacility: DebtFacility = {
    principal: payload.amount,
    rate: 0.06 + state.macroRegime === "tight_credit" ? 0.02 : 0,
    covenantMaxLeverage: 6.0,
    maturityMonths: 60,
  };
  
  position.debt.push(newFacility);
  position.leverage = position.debt.reduce((sum, d) => sum + d.principal, 0) / position.company.ebitda;
}