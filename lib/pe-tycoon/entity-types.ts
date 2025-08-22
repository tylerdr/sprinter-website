// PE Tycoon Entity Type Definitions
// Uses AI Sprinter's entity-based architecture

export const PE_TYCOON_ENTITY_TYPES = {
  // Game Room Entity Type
  GAME_ROOM: {
    slug: 'pe_tycoon_room',
    name: 'PE Tycoon Game Room',
    json_schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        season_id: { type: 'string' },
        seed: { type: 'string' },
        status: { 
          type: 'string', 
          enum: ['lobby', 'running', 'paused', 'ended'] 
        },
        tick_ms: { type: 'number', default: 15000 },
        max_players: { type: 'number', default: 8 },
        current_tick: { type: 'number', default: 0 },
        macro_regime: { 
          type: 'string',
          enum: ['easy_credit', 'neutral', 'tight_credit'],
          default: 'neutral'
        },
        settings: {
          type: 'object',
          properties: {
            event_volatility: { type: 'string', enum: ['low', 'medium', 'high'] },
            starting_capital: { type: 'number' },
            victory_condition: { type: 'string' }
          }
        }
      },
      required: ['name', 'seed', 'status']
    }
  },

  // Fund Entity Type (Player's PE Fund)
  FUND: {
    slug: 'pe_tycoon_fund',
    name: 'Private Equity Fund',
    json_schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        room_id: { type: 'string' },
        player_id: { type: 'string' },
        
        // Capital metrics
        committed_capital: { type: 'number' },
        cash: { type: 'number' },
        dry_powder: { type: 'number' },
        paid_in: { type: 'number' },
        distributed: { type: 'number' },
        nav: { type: 'number' },
        
        // Fund terms
        management_fee: { type: 'number', default: 0.02 },
        carry: { type: 'number', default: 0.20 },
        hurdle_rate: { type: 'number', default: 0.08 },
        
        // Game mechanics
        focus_points: { type: 'number', default: 3 },
        max_focus_points: { type: 'number', default: 12 },
        tension_score: { type: 'number', default: 0 },
        month: { type: 'number', default: 0 },
        
        // Performance metrics
        irr: { type: 'number', default: 0 },
        tvpi: { type: 'number', default: 0 },
        dpi: { type: 'number', default: 0 },
        
        // Achievements & rewards
        jackpot_tokens: { type: 'number', default: 0 },
        streak_count: { type: 'number', default: 0 },
        achievements: { type: 'array', items: { type: 'string' } }
      },
      required: ['name', 'room_id', 'player_id', 'committed_capital']
    }
  },

  // Company Entity Type (Portfolio or Available)
  COMPANY: {
    slug: 'pe_tycoon_company',
    name: 'Company',
    json_schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        sector: { 
          type: 'string',
          enum: ['industrials', 'saas', 'healthcare', 'construction', 
                 'logistics', 'consumer', 'business_services']
        },
        
        // Financial metrics
        revenue: { type: 'number' },
        ebitda_margin: { type: 'number' },
        growth_rate: { type: 'number' },
        gross_margin: { type: 'number' },
        working_capital_pct: { type: 'number' },
        capex_pct: { type: 'number' },
        
        // Quality factors
        quality_score: { type: 'number', minimum: 0, maximum: 1 },
        customer_concentration: { type: 'number', minimum: 0, maximum: 1 },
        cyclicality: { type: 'number', minimum: 0, maximum: 1 },
        compliance_risk: { type: 'number', minimum: 0, maximum: 1 },
        
        // Market info
        asking_price: { type: 'number' },
        available_until: { type: 'number' }, // tick when it leaves market
        bidders: { type: 'array', items: { type: 'string' } }
      },
      required: ['name', 'sector', 'revenue', 'ebitda_margin']
    }
  },

  // Position Entity Type (Fund's ownership of a Company)
  POSITION: {
    slug: 'pe_tycoon_position',
    name: 'Portfolio Position',
    json_schema: {
      type: 'object',
      properties: {
        fund_id: { type: 'string' },
        company_id: { type: 'string' },
        
        // Deal terms
        entry_multiple: { type: 'number' },
        equity_invested: { type: 'number' },
        ownership_pct: { type: 'number' },
        
        // Current state
        current_revenue: { type: 'number' },
        current_ebitda_margin: { type: 'number' },
        current_growth_rate: { type: 'number' },
        ltm_ebitda: { type: 'number' },
        
        // Debt structure
        debt_facilities: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['senior', 'unitranche', 'mezz', 'pik'] },
              principal: { type: 'number' },
              rate: { type: 'number' },
              amortization_pct: { type: 'number' },
              cash_sweep_pct: { type: 'number' },
              covenant_nde: { type: 'number' },
              covenant_ic: { type: 'number' }
            }
          }
        },
        
        // Value creation
        ops_programs: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              type: { type: 'string' },
              start_month: { type: 'number' },
              impact_month: { type: 'number' },
              ebitda_impact: { type: 'number' },
              growth_impact: { type: 'number' },
              capex_required: { type: 'number' }
            }
          }
        },
        
        // Risk metrics
        covenant_headroom: { type: 'number' },
        breach_status: { type: 'boolean', default: false },
        months_in_breach: { type: 'number', default: 0 },
        
        // Timing
        acquired_month: { type: 'number' },
        hold_months: { type: 'number' },
        preemptive_offer: {
          type: 'object',
          properties: {
            multiple_premium: { type: 'number' },
            expires_month: { type: 'number' }
          }
        }
      },
      required: ['fund_id', 'company_id', 'entry_multiple', 'equity_invested']
    }
  },

  // Action Entity Type (Queued player actions)
  ACTION: {
    slug: 'pe_tycoon_action',
    name: 'Game Action',
    json_schema: {
      type: 'object',
      properties: {
        fund_id: { type: 'string' },
        action_type: { 
          type: 'string',
          enum: ['source_deals', 'submit_bid', 'structure_debt', 'close_deal',
                 'launch_ops', 'hire_executive', 'refinance', 'dividend_recap',
                 'partial_exit', 'full_exit', 'crisis_cure', 'use_jackpot']
        },
        payload: { type: 'object' },
        fp_cost: { type: 'number' },
        eta_tick: { type: 'number' },
        status: { 
          type: 'string',
          enum: ['queued', 'executing', 'completed', 'failed'],
          default: 'queued'
        },
        priority: { type: 'number', default: 0 }
      },
      required: ['fund_id', 'action_type', 'fp_cost', 'eta_tick']
    }
  },

  // Event Entity Type (Random events)
  EVENT: {
    slug: 'pe_tycoon_event',
    name: 'Game Event',
    json_schema: {
      type: 'object',
      properties: {
        room_id: { type: 'string' },
        event_type: { 
          type: 'string',
          enum: ['market', 'company', 'regulatory', 'opportunity', 'crisis']
        },
        severity: { 
          type: 'string',
          enum: ['good', 'neutral', 'bad']
        },
        title: { type: 'string' },
        description: { type: 'string' },
        
        // Event targeting
        affected_funds: { type: 'array', items: { type: 'string' } },
        affected_positions: { type: 'array', items: { type: 'string' } },
        affected_sectors: { type: 'array', items: { type: 'string' } },
        
        // Event impact
        impact: {
          type: 'object',
          properties: {
            revenue_delta: { type: 'number' },
            margin_delta: { type: 'number' },
            multiple_delta: { type: 'number' },
            covenant_tightening: { type: 'number' },
            fp_bonus: { type: 'number' }
          }
        },
        
        // Timing
        triggered_tick: { type: 'number' },
        expires_tick: { type: 'number' },
        
        // Player choices
        choices: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: { type: 'string' },
              fp_cost: { type: 'number' },
              outcome: { type: 'object' }
            }
          }
        }
      },
      required: ['room_id', 'event_type', 'severity', 'title', 'triggered_tick']
    }
  },

  // Exit Card Entity Type (Shareable achievement)
  EXIT_CARD: {
    slug: 'pe_tycoon_exit_card',
    name: 'Exit Card',
    json_schema: {
      type: 'object',
      properties: {
        fund_id: { type: 'string' },
        position_id: { type: 'string' },
        
        // Exit metrics
        company_name: { type: 'string' },
        sector: { type: 'string' },
        moic: { type: 'number' },
        irr: { type: 'number' },
        hold_months: { type: 'number' },
        
        // Value bridge
        value_bridge: {
          type: 'object',
          properties: {
            entry_ebitda: { type: 'number' },
            exit_ebitda: { type: 'number' },
            ebitda_growth: { type: 'number' },
            entry_multiple: { type: 'number' },
            exit_multiple: { type: 'number' },
            multiple_expansion: { type: 'number' },
            entry_ev: { type: 'number' },
            exit_ev: { type: 'number' },
            net_debt_paydown: { type: 'number' },
            equity_value: { type: 'number' }
          }
        },
        
        // Context
        macro_regime: { type: 'string' },
        ops_programs_used: { type: 'array', items: { type: 'string' } },
        challenges_overcome: { type: 'array', items: { type: 'string' } },
        
        // Sharing
        image_url: { type: 'string' },
        share_url: { type: 'string' },
        share_caption: { type: 'string' },
        clicks: { type: 'number', default: 0 }
      },
      required: ['fund_id', 'position_id', 'moic', 'irr']
    }
  },

  // Leaderboard Entry Entity Type
  LEADERBOARD_ENTRY: {
    slug: 'pe_tycoon_leaderboard',
    name: 'Leaderboard Entry',
    json_schema: {
      type: 'object',
      properties: {
        season_id: { type: 'string' },
        room_id: { type: 'string' },
        fund_id: { type: 'string' },
        player_name: { type: 'string' },
        
        // Core metrics
        composite_score: { type: 'number' },
        irr: { type: 'number' },
        tvpi: { type: 'number' },
        dpi: { type: 'number' },
        
        // Component scores
        irr_z_score: { type: 'number' },
        dpi_z_score: { type: 'number' },
        consistency_score: { type: 'number' },
        resilience_score: { type: 'number' },
        
        // Stats
        total_exits: { type: 'number' },
        avg_moic: { type: 'number' },
        best_moic: { type: 'number' },
        total_breaches: { type: 'number' },
        achievements_earned: { type: 'number' },
        
        // Ranking
        global_rank: { type: 'number' },
        room_rank: { type: 'number' },
        percentile: { type: 'number' }
      },
      required: ['fund_id', 'composite_score']
    }
  },

  // Daily Quest Entity Type
  QUEST: {
    slug: 'pe_tycoon_quest',
    name: 'Daily Quest',
    json_schema: {
      type: 'object',
      properties: {
        player_id: { type: 'string' },
        quest_type: { 
          type: 'string',
          enum: ['deal_discipline', 'ops_excellence', 'debt_master', 
                 'timing_genius', 'risk_manager']
        },
        title: { type: 'string' },
        description: { type: 'string' },
        
        // Requirements
        requirements: {
          type: 'object',
          properties: {
            metric: { type: 'string' },
            operator: { type: 'string', enum: ['>', '<', '>=', '<=', '=='] },
            target: { type: 'number' },
            within_ticks: { type: 'number' }
          }
        },
        
        // Rewards
        reward: {
          type: 'object',
          properties: {
            jackpot_tokens: { type: 'number' },
            fp_bonus: { type: 'number' },
            achievement: { type: 'string' }
          }
        },
        
        // Progress
        progress: { type: 'number', default: 0 },
        completed: { type: 'boolean', default: false },
        expires_tick: { type: 'number' }
      },
      required: ['player_id', 'quest_type', 'title', 'requirements']
    }
  }
};

// Entity relationship definitions
export const PE_TYCOON_RELATIONSHIPS = [
  {
    from: 'pe_tycoon_fund',
    to: 'pe_tycoon_room',
    type: 'belongs_to',
    cardinality: 'many_to_one'
  },
  {
    from: 'pe_tycoon_position',
    to: 'pe_tycoon_fund',
    type: 'owned_by',
    cardinality: 'many_to_one'
  },
  {
    from: 'pe_tycoon_position',
    to: 'pe_tycoon_company',
    type: 'investment_in',
    cardinality: 'many_to_one'
  },
  {
    from: 'pe_tycoon_action',
    to: 'pe_tycoon_fund',
    type: 'queued_by',
    cardinality: 'many_to_one'
  },
  {
    from: 'pe_tycoon_event',
    to: 'pe_tycoon_room',
    type: 'occurs_in',
    cardinality: 'many_to_one'
  },
  {
    from: 'pe_tycoon_exit_card',
    to: 'pe_tycoon_position',
    type: 'celebrates',
    cardinality: 'one_to_one'
  },
  {
    from: 'pe_tycoon_leaderboard',
    to: 'pe_tycoon_fund',
    type: 'scores',
    cardinality: 'one_to_one'
  },
  {
    from: 'pe_tycoon_quest',
    to: 'pe_tycoon_fund',
    type: 'assigned_to',
    cardinality: 'many_to_one'
  }
];