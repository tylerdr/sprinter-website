// PE Tycoon Entity-Based Game Engine
// Deterministic simulation using AI Sprinter's entity system

import { createClient } from '@/lib/supabase/client';
import { PE_TYCOON_ENTITY_TYPES } from './entity-types';

// Seedable RNG using xxhash-like algorithm
export class DeterministicRNG {
  private state: bigint;

  constructor(seed: string) {
    // Convert string seed to number-based state
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    this.state = BigInt(Math.abs(hash));
  }

  next(): number {
    // splitmix64 algorithm adapted
    const a = BigInt('0x9e3779b97f4a7c15');
    const b = BigInt('0xbf58476d1ce4e5b9');
    const c = BigInt('0x94d049bb133111eb');
    
    let z = (this.state += a);
    z = (z ^ (z >> BigInt(30))) * b;
    z = (z ^ (z >> BigInt(27))) * c;
    z = z ^ (z >> BigInt(31));
    return Number((z & ((BigInt(1) << BigInt(53)) - BigInt(1)))) / 2 ** 53;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  pickWeighted<T>(items: { item: T; weight: number }[]): T {
    const total = items.reduce((a, b) => a + b.weight, 0);
    let r = this.next() * total;
    for (const { item, weight } of items) {
      if ((r -= weight) <= 0) return item;
    }
    return items[items.length - 1].item;
  }
}

// Entity manager for game operations
export class PETycoonEntityManager {
  private supabase = createClient();
  private tenant_id: string;

  constructor(tenantId: string) {
    this.tenant_id = tenantId;
  }

  // Create a new game room entity
  async createRoom(params: {
    name: string;
    seasonId?: string;
    maxPlayers?: number;
    tickMs?: number;
    settings?: any;
  }) {
    const seed = Date.now().toString(36) + Math.random().toString(36);
    
    const { data, error } = await this.supabase
      .from('entities')
      .insert({
        tenant_id: this.tenant_id,
        entity_type_id: await this.getEntityTypeId('pe_tycoon_room'),
        slug: `room-${seed}`,
        title: params.name,
        content: {
          name: params.name,
          season_id: params.seasonId || null,
          seed,
          status: 'lobby',
          tick_ms: params.tickMs || 15000,
          max_players: params.maxPlayers || 8,
          current_tick: 0,
          macro_regime: 'neutral',
          settings: params.settings || {}
        }
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Create a fund entity for a player
  async createFund(params: {
    roomId: string;
    playerId: string;
    name: string;
    committedCapital: number;
  }) {
    const { data, error } = await this.supabase
      .from('entities')
      .insert({
        tenant_id: this.tenant_id,
        entity_type_id: await this.getEntityTypeId('pe_tycoon_fund'),
        slug: `fund-${params.playerId}-${Date.now()}`,
        title: params.name,
        owner_id: params.playerId,
        content: {
          name: params.name,
          room_id: params.roomId,
          player_id: params.playerId,
          committed_capital: params.committedCapital,
          cash: params.committedCapital * 0.25, // Start with 25% dry powder
          dry_powder: params.committedCapital * 0.25,
          paid_in: 0,
          distributed: 0,
          nav: 0,
          management_fee: 0.02,
          carry: 0.20,
          hurdle_rate: 0.08,
          focus_points: 3,
          max_focus_points: 12,
          tension_score: 0,
          month: 0,
          irr: 0,
          tvpi: 0,
          dpi: 0,
          jackpot_tokens: 0,
          streak_count: 0,
          achievements: []
        }
      })
      .select()
      .single();

    if (error) throw error;

    // Create relationship to room
    await this.createRelation(data.id, params.roomId, 'belongs_to');

    return data;
  }

  // Generate companies for the market
  async generateCompanies(roomId: string, rng: DeterministicRNG, count: number = 20) {
    const sectors = ['industrials', 'saas', 'healthcare', 'construction', 'logistics', 'consumer'];
    const companies = [];

    for (let i = 0; i < count; i++) {
      const sector = sectors[rng.nextInt(0, sectors.length - 1)];
      const quality = rng.next();
      const revenue = rng.nextInt(10, 200) * 1_000_000; // $10M - $200M
      
      const sectorParams = this.getSectorParams(sector, rng);
      const ebitdaMargin = sectorParams.marginRange[0] + 
        rng.next() * (sectorParams.marginRange[1] - sectorParams.marginRange[0]);
      
      const company = {
        name: this.generateCompanyName(sector, rng),
        sector,
        revenue,
        ebitda_margin: ebitdaMargin,
        growth_rate: sectorParams.growthRange[0] + 
          rng.next() * (sectorParams.growthRange[1] - sectorParams.growthRange[0]),
        gross_margin: sectorParams.gmRange[0] + 
          rng.next() * (sectorParams.gmRange[1] - sectorParams.gmRange[0]),
        working_capital_pct: sectorParams.wcRange[0] + 
          rng.next() * (sectorParams.wcRange[1] - sectorParams.wcRange[0]),
        capex_pct: sectorParams.capexRange[0] + 
          rng.next() * (sectorParams.capexRange[1] - sectorParams.capexRange[0]),
        quality_score: quality,
        customer_concentration: rng.next() * 0.5,
        cyclicality: sectorParams.cyclicality,
        compliance_risk: rng.next() * 0.3,
        asking_price: revenue * ebitdaMargin * (6 + quality * 6), // 6-12x EBITDA
        available_until: rng.nextInt(10, 30), // Available for 10-30 ticks
        bidders: []
      };

      const { data, error } = await this.supabase
        .from('entities')
        .insert({
          tenant_id: this.tenant_id,
          entity_type_id: await this.getEntityTypeId('pe_tycoon_company'),
          slug: `company-${roomId}-${i}`,
          title: company.name,
          content: company,
          metadata: { room_id: roomId, is_available: true }
        })
        .select()
        .single();

      if (!error) companies.push(data);
    }

    return companies;
  }

  // Process game tick
  async processTick(roomId: string) {
    const room = await this.getRoom(roomId);
    if (!room || room.content.status !== 'running') return;

    const rng = new DeterministicRNG(room.content.seed + ':' + room.content.current_tick);
    const newTick = room.content.current_tick + 1;

    // Update room tick
    await this.updateEntity(room.id, {
      ...room.content,
      current_tick: newTick
    });

    // Get all funds in room
    const funds = await this.getFundsInRoom(roomId);

    for (const fund of funds) {
      // Process each fund
      await this.processFundTick(fund, room, rng);
    }

    // Process market events
    await this.processMarketEvents(room, rng);

    // Update leaderboards
    await this.updateLeaderboards(roomId);

    return newTick;
  }

  // Process a fund's tick
  private async processFundTick(fund: any, room: any, rng: DeterministicRNG) {
    const fundContent = fund.content;
    
    // Refresh focus points
    const baseFP = 3;
    const positionBonus = Math.floor(await this.getPositionCount(fund.id) / 3);
    fundContent.focus_points = Math.min(
      fundContent.max_focus_points,
      baseFP + positionBonus
    );

    // Advance month
    fundContent.month += 1;

    // Charge management fees
    const mgmtFee = (fundContent.committed_capital * fundContent.management_fee) / 12;
    fundContent.cash -= mgmtFee;

    // Process positions
    const positions = await this.getFundPositions(fund.id);
    for (const position of positions) {
      await this.processPosition(position, fundContent, room, rng);
    }

    // Calculate NAV
    fundContent.nav = await this.calculateNAV(fund.id, room.content.macro_regime);

    // Calculate performance metrics
    const totalValue = fundContent.nav + fundContent.cash + fundContent.distributed;
    fundContent.tvpi = fundContent.paid_in > 0 ? totalValue / fundContent.paid_in : 0;
    fundContent.dpi = fundContent.paid_in > 0 ? fundContent.distributed / fundContent.paid_in : 0;
    
    const years = fundContent.month / 12;
    fundContent.irr = years > 0 ? (Math.pow(fundContent.tvpi, 1 / years) - 1) * 100 : 0;

    // Calculate tension score (Drama Director)
    fundContent.tension_score = this.calculateTension(fundContent, positions);

    // Update fund entity
    await this.updateEntity(fund.id, fundContent);

    // Process queued actions
    await this.processQueuedActions(fund.id, room.content.current_tick);
  }

  // Process a portfolio position
  private async processPosition(position: any, fundContent: any, room: any, rng: DeterministicRNG) {
    const pos = position.content;
    const macroImpact = this.getMacroImpact(room.content.macro_regime, rng);

    // Apply macro drift
    pos.current_growth_rate += macroImpact.growth;
    pos.current_ebitda_margin = Math.max(0.03, Math.min(0.4, 
      pos.current_ebitda_margin + macroImpact.margin));

    // Apply ops programs
    for (const program of pos.ops_programs || []) {
      const monthsActive = fundContent.month - program.start_month;
      if (monthsActive >= program.impact_month) {
        pos.current_ebitda_margin += program.ebitda_impact || 0;
        pos.current_growth_rate += program.growth_impact || 0;
      }
    }

    // Apply revenue growth
    const noise = (rng.next() - 0.5) * 0.02; // ±2% random
    pos.current_revenue *= (1 + pos.current_growth_rate + noise);

    // Update LTM EBITDA
    pos.ltm_ebitda = pos.current_revenue * pos.current_ebitda_margin;

    // Service debt
    await this.serviceDebt(position, fundContent);

    // Check covenants
    await this.checkCovenants(position);

    // Random events (using Drama Director tension)
    if (rng.next() < 0.1 + fundContent.tension_score * 0.1) {
      await this.triggerRandomEvent(position, room, rng);
    }

    // Update position
    await this.updateEntity(position.id, pos);
  }

  // Calculate tension score for Drama Director
  private calculateTension(fund: any, positions: any[]): number {
    let tension = 0;
    
    // Cash runway risk
    const cashRunwayMonths = fund.cash / (fund.committed_capital * fund.management_fee / 12);
    if (cashRunwayMonths < 6) tension += 0.25;
    
    // Covenant breach risk
    const breachedPositions = positions.filter(p => p.content.breach_status);
    tension += (breachedPositions.length / Math.max(1, positions.length)) * 0.35;
    
    // Performance pressure
    if (fund.irr < 10) tension += 0.2;
    
    // Pipeline dryness
    if (positions.length < 3) tension += 0.2;
    
    return Math.min(1, tension);
  }

  // Helper functions
  private async getEntityTypeId(slug: string): Promise<string> {
    const { data } = await this.supabase
      .from('entity_types')
      .select('id')
      .eq('slug', slug)
      .single();
    return data?.id;
  }

  private async createRelation(fromId: string, toId: string, type: string) {
    await this.supabase
      .from('entity_relations')
      .insert({
        tenant_id: this.tenant_id,
        from_entity_id: fromId,
        to_entity_id: toId,
        relationship_type: type
      });
  }

  private async updateEntity(id: string, content: any) {
    await this.supabase
      .from('entities')
      .update({ content, updated_at: new Date() })
      .eq('id', id);
  }

  private async getRoom(roomId: string) {
    const { data } = await this.supabase
      .from('entities')
      .select('*')
      .eq('id', roomId)
      .single();
    return data;
  }

  private async getFundsInRoom(roomId: string) {
    const { data } = await this.supabase
      .from('entities')
      .select('*')
      .eq('content->room_id', roomId);
    return data || [];
  }

  private async getFundPositions(fundId: string) {
    const { data } = await this.supabase
      .from('entities')
      .select('*')
      .eq('content->fund_id', fundId);
    return data || [];
  }

  private async getPositionCount(fundId: string): Promise<number> {
    const { count } = await this.supabase
      .from('entities')
      .select('*', { count: 'exact', head: true })
      .eq('content->fund_id', fundId);
    return count || 0;
  }

  private async calculateNAV(fundId: string, macroRegime: string): Promise<number> {
    const positions = await this.getFundPositions(fundId);
    const baseMultiple = macroRegime === 'easy_credit' ? 8.5 : 
                        macroRegime === 'tight_credit' ? 6.5 : 7.5;
    
    let nav = 0;
    for (const pos of positions) {
      const exitMultiple = baseMultiple * (0.8 + pos.content.quality_score * 0.6);
      const ev = pos.content.ltm_ebitda * exitMultiple;
      const netDebt = pos.content.debt_facilities?.reduce(
        (sum: number, d: any) => sum + d.principal, 0) || 0;
      nav += Math.max(0, ev - netDebt);
    }
    
    return nav;
  }

  private getSectorParams(sector: string, rng: DeterministicRNG) {
    const params: Record<string, any> = {
      industrials: {
        marginRange: [0.10, 0.18],
        growthRange: [0, 0.06],
        gmRange: [0.25, 0.35],
        wcRange: [0.08, 0.12],
        capexRange: [0.03, 0.06],
        cyclicality: 0.7
      },
      saas: {
        marginRange: [0.15, 0.30],
        growthRange: [0.06, 0.18],
        gmRange: [0.70, 0.85],
        wcRange: [-0.03, 0.02],
        capexRange: [0.01, 0.04],
        cyclicality: 0.3
      },
      healthcare: {
        marginRange: [0.12, 0.22],
        growthRange: [0.02, 0.08],
        gmRange: [0.45, 0.65],
        wcRange: [0.04, 0.08],
        capexRange: [0.02, 0.05],
        cyclicality: 0.4
      },
      construction: {
        marginRange: [0.08, 0.15],
        growthRange: [-0.02, 0.06],
        gmRange: [0.20, 0.30],
        wcRange: [0.08, 0.15],
        capexRange: [0.03, 0.06],
        cyclicality: 0.8
      },
      logistics: {
        marginRange: [0.10, 0.18],
        growthRange: [0, 0.08],
        gmRange: [0.30, 0.40],
        wcRange: [0.05, 0.10],
        capexRange: [0.04, 0.07],
        cyclicality: 0.6
      },
      consumer: {
        marginRange: [0.08, 0.18],
        growthRange: [-0.02, 0.10],
        gmRange: [0.35, 0.50],
        wcRange: [0.06, 0.12],
        capexRange: [0.02, 0.05],
        cyclicality: 0.7
      }
    };
    
    return params[sector] || params.industrials;
  }

  private generateCompanyName(sector: string, rng: DeterministicRNG): string {
    const prefixes: Record<string, string[]> = {
      industrials: ['Apex', 'Summit', 'Pioneer', 'Atlas', 'Titan'],
      saas: ['Cloud', 'Data', 'Tech', 'Digital', 'Smart'],
      healthcare: ['Med', 'Health', 'Care', 'Bio', 'Life'],
      construction: ['Build', 'Construct', 'Infra', 'Steel', 'Stone'],
      logistics: ['Speed', 'Express', 'Global', 'Swift', 'Prime'],
      consumer: ['Pure', 'Fresh', 'Choice', 'Best', 'Top']
    };
    
    const suffixes: Record<string, string[]> = {
      industrials: ['Industries', 'Manufacturing', 'Corp', 'Systems', 'Works'],
      saas: ['Solutions', 'Software', 'Analytics', 'Platform', 'Tech'],
      healthcare: ['Health', 'Medical', 'Care', 'Sciences', 'Therapeutics'],
      construction: ['Builders', 'Construction', 'Development', 'Engineering', 'Group'],
      logistics: ['Logistics', 'Transport', 'Delivery', 'Supply', 'Distribution'],
      consumer: ['Brands', 'Products', 'Goods', 'Retail', 'Direct']
    };
    
    const sectorPrefixes = prefixes[sector] || prefixes.industrials;
    const sectorSuffixes = suffixes[sector] || suffixes.industrials;
    const prefix = sectorPrefixes[rng.nextInt(0, 4)];
    const suffix = sectorSuffixes[rng.nextInt(0, 4)];
    
    return `${prefix} ${suffix}`;
  }

  private getMacroImpact(regime: string, rng: DeterministicRNG) {
    const z = () => (rng.next() - 0.5) * 2;
    
    switch (regime) {
      case 'easy_credit':
        return {
          growth: 0.002 + Math.abs(z()) * 0.004,
          margin: 0.001 + Math.abs(z()) * 0.002,
          rate: -0.002
        };
      case 'tight_credit':
        return {
          growth: -0.003 - Math.abs(z()) * 0.004,
          margin: -0.002 - Math.abs(z()) * 0.003,
          rate: 0.004
        };
      default:
        return {
          growth: z() * 0.002,
          margin: z() * 0.001,
          rate: z() * 0.001
        };
    }
  }

  private async serviceDebt(position: any, fund: any) {
    const pos = position.content;
    let totalInterest = 0;
    let totalAmort = 0;
    
    for (const facility of pos.debt_facilities || []) {
      const monthlyInterest = facility.principal * facility.rate / 12;
      const monthlyAmort = facility.principal * (facility.amortization_pct || 0) / 12;
      
      totalInterest += monthlyInterest;
      totalAmort += monthlyAmort;
      
      // Reduce principal
      facility.principal = Math.max(0, facility.principal - monthlyAmort);
    }
    
    // Deduct from fund cash
    fund.cash -= (totalInterest + totalAmort);
  }

  private async checkCovenants(position: any) {
    const pos = position.content;
    const netDebt = pos.debt_facilities?.reduce(
      (sum: number, d: any) => sum + d.principal, 0) || 0;
    
    const nde = netDebt / Math.max(0.001, pos.ltm_ebitda);
    const ic = pos.ltm_ebitda / Math.max(0.001, 
      pos.debt_facilities?.reduce((sum: number, d: any) => 
        sum + d.principal * d.rate / 12, 0) || 0.001);
    
    // Check for breaches
    let breached = false;
    for (const facility of pos.debt_facilities || []) {
      if (facility.covenant_nde && nde > facility.covenant_nde) breached = true;
      if (facility.covenant_ic && ic < facility.covenant_ic) breached = true;
    }
    
    if (breached && !pos.breach_status) {
      pos.breach_status = true;
      pos.months_in_breach = 1;
    } else if (breached) {
      pos.months_in_breach += 1;
    } else {
      pos.breach_status = false;
      pos.months_in_breach = 0;
    }
    
    // Calculate covenant headroom
    let minHeadroom = 1;
    for (const facility of pos.debt_facilities || []) {
      if (facility.covenant_nde) {
        minHeadroom = Math.min(minHeadroom, (facility.covenant_nde - nde) / facility.covenant_nde);
      }
      if (facility.covenant_ic) {
        minHeadroom = Math.min(minHeadroom, (ic - facility.covenant_ic) / facility.covenant_ic);
      }
    }
    pos.covenant_headroom = minHeadroom;
  }

  private async triggerRandomEvent(position: any, room: any, rng: DeterministicRNG) {
    const events = this.getRandomEvents(position.content.sector, room.content.macro_regime);
    const event = events.length > 0 ? events[rng.nextInt(0, events.length - 1)] : null;
    
    if (event) {
      await this.createEvent({
        room_id: room.id,
        event_type: event.type,
        severity: event.severity,
        title: event.title,
        description: event.description.replace('{company}', position.content.company_name),
        affected_positions: [position.id],
        impact: event.impact,
        triggered_tick: room.content.current_tick
      });
      
      // Apply immediate impact
      if (event.impact.revenue_delta) {
        position.content.current_revenue *= (1 + event.impact.revenue_delta);
      }
      if (event.impact.margin_delta) {
        position.content.current_ebitda_margin += event.impact.margin_delta;
      }
    }
  }

  private getRandomEvents(sector: string, macroRegime: string) {
    const baseEvents: any[] = [
      {
        type: 'company',
        severity: 'bad',
        title: 'Customer Loss',
        description: '{company} lost major customer',
        impact: { revenue_delta: -0.2, margin_delta: -0.02 },
        weight: macroRegime === 'tight_credit' ? 3 : 2
      },
      {
        type: 'company',
        severity: 'good',
        title: 'Contract Win',
        description: '{company} won major contract',
        impact: { revenue_delta: 0.15, margin_delta: 0.01 },
        weight: macroRegime === 'easy_credit' ? 3 : 2
      },
      {
        type: 'market',
        severity: 'neutral',
        title: 'Regulatory Change',
        description: 'New regulations affect {company}',
        impact: { revenue_delta: 0, margin_delta: -0.01, covenant_tightening: 0.1 },
        weight: 2
      },
      {
        type: 'opportunity',
        severity: 'good',
        title: 'Strategic Interest',
        description: 'Strategic buyer interested in {company}',
        impact: { revenue_delta: 0, margin_delta: 0, multiple_delta: 1.5 },
        weight: 1
      }
    ];
    
    return baseEvents;
  }

  private async createEvent(eventData: any) {
    await this.supabase
      .from('entities')
      .insert({
        tenant_id: this.tenant_id,
        entity_type_id: await this.getEntityTypeId('pe_tycoon_event'),
        slug: `event-${Date.now()}`,
        title: eventData.title,
        content: eventData
      });
  }

  private async processQueuedActions(fundId: string, currentTick: number) {
    const { data: actions } = await this.supabase
      .from('entities')
      .select('*')
      .eq('content->fund_id', fundId)
      .eq('content->status', 'queued')
      .lte('content->eta_tick', currentTick);
    
    for (const action of actions || []) {
      await this.executeAction(action);
    }
  }

  private async executeAction(action: any) {
    // Execute action based on type
    const actionType = action.content.action_type;
    
    switch (actionType) {
      case 'source_deals':
        await this.sourceDealsPipeline(action.content.fund_id);
        break;
      case 'submit_bid':
        await this.submitBid(action.content);
        break;
      case 'launch_ops':
        await this.launchOpsProgram(action.content);
        break;
      // Add more action types...
    }
    
    // Update action status
    await this.updateEntity(action.id, {
      ...action.content,
      status: 'completed'
    });
  }

  private async sourceDealsPipeline(fundId: string) {
    // Implementation for sourcing deals
  }

  private async submitBid(actionContent: any) {
    // Implementation for submitting bid
  }

  private async launchOpsProgram(actionContent: any) {
    // Implementation for launching ops program
  }

  private async processMarketEvents(room: any, rng: DeterministicRNG) {
    // Process market-wide events
    
    // Macro regime changes
    if (rng.next() < 0.1) {
      const regimes = ['easy_credit', 'neutral', 'tight_credit'];
      const newRegime = regimes[rng.nextInt(0, 2)];
      
      if (newRegime !== room.content.macro_regime) {
        room.content.macro_regime = newRegime;
        
        await this.createEvent({
          room_id: room.id,
          event_type: 'market',
          severity: 'neutral',
          title: `Market Shift to ${newRegime.replace('_', ' ').toUpperCase()}`,
          description: 'Credit conditions have changed',
          triggered_tick: room.content.current_tick
        });
      }
    }
  }

  private async updateLeaderboards(roomId: string) {
    const funds = await this.getFundsInRoom(roomId);
    
    // Calculate scores for each fund
    const entries = [];
    for (const fund of funds) {
      const score = this.calculateCompositeScore(fund.content);
      
      entries.push({
        fund_id: fund.id,
        player_name: fund.content.name,
        composite_score: score,
        irr: fund.content.irr,
        tvpi: fund.content.tvpi,
        dpi: fund.content.dpi
      });
    }
    
    // Sort and rank
    entries.sort((a, b) => b.composite_score - a.composite_score);
    
    // Update leaderboard entities
    for (let i = 0; i < entries.length; i++) {
      const entry: any = entries[i];
      entry.room_rank = i + 1;
      
      await this.supabase
        .from('entities')
        .upsert({
          tenant_id: this.tenant_id,
          entity_type_id: await this.getEntityTypeId('pe_tycoon_leaderboard'),
          slug: `leaderboard-${roomId}-${entry.fund_id}`,
          content: entry
        });
    }
  }

  private calculateCompositeScore(fund: any): number {
    // Weighted scoring formula
    const irrScore = Math.max(0, Math.min(100, fund.irr * 2)); // 0-100
    const dpiScore = Math.max(0, Math.min(100, fund.dpi * 100)); // 0-100
    const consistencyScore = 100 - (fund.tension_score * 100); // 0-100
    
    return (irrScore * 0.4) + (dpiScore * 0.3) + (consistencyScore * 0.3);
  }
}

// Beat Director for ensuring engagement
export class BeatDirector {
  private lastBeatTick = 0;
  private maxGap = 3;

  maybeScheduleBeat(currentTick: number, eligibleBeats: any[]) {
    const needBeat = currentTick - this.lastBeatTick >= this.maxGap;
    
    if (needBeat && eligibleBeats.length > 0) {
      const beat = eligibleBeats[0];
      beat.execute();
      this.lastBeatTick = currentTick;
      return beat;
    }
    
    return null;
  }
}

// Focus Points manager
export class FocusPointsManager {
  static calculateNext(current: number, positions: number, justExitedOrCured: boolean): number {
    const base = 3 + Math.floor(positions / 3);
    const bonus = justExitedOrCured ? 1 : 0;
    const cap = 12;
    return Math.min(cap, current + Math.min(base + bonus, cap - current));
  }
  
  static canAfford(current: number, cost: number): boolean {
    return current >= cost;
  }
  
  static deduct(current: number, cost: number): number {
    return Math.max(0, current - cost);
  }
}

// Jackpot system for variable ratio rewards
export class JackpotSystem {
  private static readonly JACKPOT_TABLE = [
    { outcome: 'none', odds: 0.55 },
    { outcome: 'banker_whisper', odds: 0.30 },
    { outcome: 'spread_nudge', odds: 0.10 },
    { outcome: 'strategic_preempt', odds: 0.04 },
    { outcome: 'white_knight', odds: 0.01 }
  ];
  
  static roll(rng: DeterministicRNG): string {
    let r = rng.next();
    for (const row of this.JACKPOT_TABLE) {
      if ((r -= row.odds) <= 0) return row.outcome;
    }
    return 'none';
  }
  
  static getOdds(): typeof JackpotSystem.JACKPOT_TABLE {
    return this.JACKPOT_TABLE;
  }
}