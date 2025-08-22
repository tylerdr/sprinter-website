"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BuildingOfficeIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  BoltIcon,
  SparklesIcon,
  FireIcon,
  TrophyIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  PlayIcon,
  PauseIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon
} from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";
import { PETycoonEntityManager, DeterministicRNG, FocusPointsManager, JackpotSystem } from "@/lib/pe-tycoon/entity-engine";

interface GameState {
  room: any;
  fund: any;
  positions: any[];
  availableCompanies: any[];
  events: any[];
  leaderboard: any[];
  actions: any[];
}

export default function PETycoonClient() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<'portfolio' | 'market' | 'leaderboard'>('portfolio');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [tickSpeed, setTickSpeed] = useState(15000); // 15 seconds default
  const [showActionDrawer, setShowActionDrawer] = useState(false);
  const tickInterval = useRef<NodeJS.Timeout | null>(null);
  
  const supabase = createClient();
  const entityManager = useRef<PETycoonEntityManager | null>(null);

  // Initialize game
  useEffect(() => {
    initializeGame();
    
    return () => {
      if (tickInterval.current) {
        clearInterval(tickInterval.current);
      }
    };
  }, []);

  // Auto-advance game ticks
  useEffect(() => {
    if (autoAdvance && gameState?.room) {
      tickInterval.current = setInterval(async () => {
        await processTick();
      }, tickSpeed);
    } else {
      if (tickInterval.current) {
        clearInterval(tickInterval.current);
        tickInterval.current = null;
      }
    }

    return () => {
      if (tickInterval.current) {
        clearInterval(tickInterval.current);
      }
    };
  }, [autoAdvance, tickSpeed, gameState]);

  const initializeGame = async () => {
    setLoading(true);
    
    // Get or create tenant
    const { data: { user } } = await supabase.auth.getUser();
    const tenantId = user?.id || 'demo-tenant';
    
    entityManager.current = new PETycoonEntityManager(tenantId);
    
    // Create or join room
    const room = await entityManager.current.createRoom({
      name: "PE Tycoon Demo Room",
      maxPlayers: 8,
      tickMs: tickSpeed,
      settings: {
        event_volatility: 'medium',
        starting_capital: 2000000000, // $2B
        victory_condition: 'highest_irr'
      }
    });
    
    // Create fund for player
    const fund = await entityManager.current.createFund({
      roomId: room.id,
      playerId: user?.id || 'demo-player',
      name: "Apex Capital Partners",
      committedCapital: 2000000000 // $2B
    });
    
    // Generate initial companies
    const rng = new DeterministicRNG(room.content.seed);
    const companies = await entityManager.current.generateCompanies(room.id, rng, 20);
    
    // Set initial state
    setGameState({
      room,
      fund,
      positions: [],
      availableCompanies: companies,
      events: [],
      leaderboard: [],
      actions: []
    });
    
    setLoading(false);
    
    // Subscribe to real-time updates
    subscribeToUpdates(room.id, fund.id);
  };

  const subscribeToUpdates = (roomId: string, fundId: string) => {
    // Subscribe to room updates
    const roomChannel = supabase
      .channel(`room-${roomId}`)
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'entities', filter: `id=eq.${roomId}` },
        (payload) => {
          setGameState(prev => prev ? { ...prev, room: payload.new } : null);
        }
      )
      .subscribe();
    
    // Subscribe to fund updates
    const fundChannel = supabase
      .channel(`fund-${fundId}`)
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'entities', filter: `id=eq.${fundId}` },
        (payload) => {
          setGameState(prev => prev ? { ...prev, fund: payload.new } : null);
        }
      )
      .subscribe();
    
    // Subscribe to events
    const eventsChannel = supabase
      .channel(`events-${roomId}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'entities', filter: `metadata->>room_id=eq.${roomId}` },
        (payload) => {
          if (payload.new.content.event_type) {
            setGameState(prev => prev ? { 
              ...prev, 
              events: [...prev.events, payload.new].slice(-10) // Keep last 10 events
            } : null);
          }
        }
      )
      .subscribe();
  };

  const processTick = async () => {
    if (!entityManager.current || !gameState?.room) return;
    
    await entityManager.current.processTick(gameState.room.id);
    
    // Refresh game state
    await refreshGameState();
  };

  const refreshGameState = async () => {
    if (!gameState) return;
    
    const { data: updatedRoom } = await supabase
      .from('entities')
      .select('*')
      .eq('id', gameState.room.id)
      .single();
    
    const { data: updatedFund } = await supabase
      .from('entities')
      .select('*')
      .eq('id', gameState.fund.id)
      .single();
    
    const { data: positions } = await supabase
      .from('entities')
      .select('*')
      .eq('content->fund_id', gameState.fund.id);
    
    const { data: companies } = await supabase
      .from('entities')
      .select('*')
      .eq('metadata->room_id', gameState.room.id)
      .eq('metadata->is_available', true);
    
    const { data: leaderboard } = await supabase
      .from('entities')
      .select('*')
      .eq('content->room_id', gameState.room.id)
      .order('content->composite_score', { ascending: false });
    
    setGameState({
      ...gameState,
      room: updatedRoom,
      fund: updatedFund,
      positions: positions || [],
      availableCompanies: companies || [],
      leaderboard: leaderboard || []
    });
  };

  const queueAction = async (actionType: string, payload: any, fpCost: number) => {
    if (!gameState?.fund || !FocusPointsManager.canAfford(gameState.fund.content.focus_points, fpCost)) {
      alert("Not enough Focus Points!");
      return;
    }
    
    const action = {
      fund_id: gameState.fund.id,
      action_type: actionType,
      payload,
      fp_cost: fpCost,
      eta_tick: gameState.room.content.current_tick + 1,
      status: 'queued'
    };
    
    await supabase
      .from('entities')
      .insert({
        tenant_id: gameState.fund.tenant_id,
        entity_type_id: 'pe_tycoon_action', // Would need to look this up
        slug: `action-${Date.now()}`,
        content: action
      });
    
    // Deduct FP immediately
    const newFP = FocusPointsManager.deduct(gameState.fund.content.focus_points, fpCost);
    setGameState({
      ...gameState,
      fund: {
        ...gameState.fund,
        content: {
          ...gameState.fund.content,
          focus_points: newFP
        }
      }
    });
  };

  const useJackpotToken = async () => {
    if (!gameState?.fund || gameState.fund.content.jackpot_tokens < 1) {
      alert("No Jackpot Tokens available!");
      return;
    }
    
    const rng = new DeterministicRNG(Date.now().toString());
    const outcome = JackpotSystem.roll(rng);
    
    let message = "";
    switch (outcome) {
      case 'banker_whisper':
        message = "🎰 Banker Whisper! +2 proprietary deals next tick!";
        break;
      case 'spread_nudge':
        message = "🎰 Spread Nudge! -25bps on next facility!";
        break;
      case 'strategic_preempt':
        message = "🎰 Strategic Preempt! +0.6x multiple if exiting within 6 ticks!";
        break;
      case 'white_knight':
        message = "🎰 WHITE KNIGHT! Covenant grace for 2 ticks!";
        break;
      default:
        message = "🎰 No bonus this time, but you earned a badge!";
    }
    
    alert(message);
    
    // Deduct token
    setGameState({
      ...gameState,
      fund: {
        ...gameState.fund,
        content: {
          ...gameState.fund.content,
          jackpot_tokens: gameState.fund.content.jackpot_tokens - 1
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="text-center">
          <div className="text-3xl font-bold animate-pulse mb-4">Loading PE Tycoon...</div>
          <div className="text-sm text-white/60">Initializing market simulation</div>
        </div>
      </div>
    );
  }

  if (!gameState) {
    return <div>Error loading game</div>;
  }

  const fund = gameState.fund.content;
  const room = gameState.room.content;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header with key metrics */}
      <div className="border-b border-white/10 backdrop-blur-xl bg-black/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {fund.name}
              </h1>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CurrencyDollarIcon className="w-4 h-4 text-green-400" />
                  <span className="text-white/80">Cash: ${(fund.cash / 1e9).toFixed(2)}B</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <ChartBarIcon className="w-4 h-4 text-blue-400" />
                  <span className="text-white/80">IRR: {fund.irr.toFixed(1)}%</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-purple-400" />
                  <span className="text-white/80">TVPI: {fund.tvpi.toFixed(2)}x</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <BoltIcon className="w-4 h-4 text-yellow-400" />
                  <span className="text-white/80">FP: {fund.focus_points}/{fund.max_focus_points}</span>
                </div>
                
                {fund.jackpot_tokens > 0 && (
                  <button 
                    onClick={useJackpotToken}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 hover:border-yellow-400/50 transition-all"
                  >
                    <SparklesIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-bold">{fund.jackpot_tokens}</span>
                  </button>
                )}
                
                <div className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                  Month {fund.month} | {room.macro_regime.replace('_', ' ')}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoAdvance(!autoAdvance)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all ${
                  autoAdvance 
                    ? "bg-green-500/20 text-green-400 border border-green-500/50" 
                    : "bg-white/10 text-white/60 hover:bg-white/20 border border-white/20"
                }`}
              >
                {autoAdvance ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                {autoAdvance ? "Pause" : "Auto"}
              </button>
              
              <button
                onClick={() => setShowActionDrawer(true)}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Actions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tension/Drama indicator */}
      {fund.tension_score > 0.5 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-y border-red-500/30"
        >
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-sm text-red-300">
                High Tension ({(fund.tension_score * 100).toFixed(0)}%) - Relief events more likely
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* View selector */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedView('portfolio')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedView === 'portfolio'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Portfolio ({gameState.positions.length})
          </button>
          <button
            onClick={() => setSelectedView('market')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedView === 'market'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Market ({gameState.availableCompanies.length})
          </button>
          <button
            onClick={() => setSelectedView('leaderboard')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedView === 'leaderboard'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Leaderboard
          </button>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            {selectedView === 'portfolio' && <PortfolioView positions={gameState.positions} />}
            {selectedView === 'market' && <MarketView companies={gameState.availableCompanies} onSelectCompany={setSelectedCompany} />}
            {selectedView === 'leaderboard' && <LeaderboardView entries={gameState.leaderboard} currentFundId={gameState.fund.id} />}
          </div>
          
          <div className="lg:col-span-1">
            {/* Events feed */}
            <EventsFeed events={gameState.events} />
          </div>
        </div>
      </div>

      {/* Action drawer */}
      <AnimatePresence>
        {showActionDrawer && (
          <ActionDrawer
            fund={fund}
            selectedCompany={selectedCompany}
            onClose={() => setShowActionDrawer(false)}
            onQueueAction={queueAction}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Portfolio view component
function PortfolioView({ positions }: { positions: any[] }) {
  if (positions.length === 0) {
    return (
      <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-8">
        <div className="text-center">
          <BuildingOfficeIcon className="w-16 h-16 mx-auto text-white/20 mb-4" />
          <h3 className="text-xl font-bold text-white/60 mb-2">No Portfolio Companies</h3>
          <p className="text-sm text-white/40">Start by acquiring companies from the market</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {positions.map(position => (
        <PositionCard key={position.id} position={position.content} />
      ))}
    </div>
  );
}

// Position card component
function PositionCard({ position }: { position: any }) {
  const hasBreachRisk = position.covenant_headroom < 0.2;
  const isBreached = position.breach_status;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 rounded-xl border backdrop-blur-xl ${
        isBreached 
          ? 'bg-red-500/10 border-red-500/30'
          : hasBreachRisk
          ? 'bg-orange-500/10 border-orange-500/30'
          : 'bg-black/40 border-white/10'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg text-white">{position.company_name}</h3>
          <p className="text-sm text-white/60">{position.sector}</p>
        </div>
        {isBreached && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/20">
            <ExclamationTriangleIcon className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-xs text-red-400">BREACH</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3 text-sm">
        <div>
          <span className="text-white/60">Revenue</span>
          <div className="text-green-400 font-medium">
            ${(position.current_revenue / 1e6).toFixed(1)}M
          </div>
        </div>
        <div>
          <span className="text-white/60">EBITDA</span>
          <div className="text-blue-400 font-medium">
            ${(position.ltm_ebitda / 1e6).toFixed(1)}M
          </div>
        </div>
        <div>
          <span className="text-white/60">Entry</span>
          <div className="text-purple-400 font-medium">
            {position.entry_multiple.toFixed(1)}x
          </div>
        </div>
        <div>
          <span className="text-white/60">Hold</span>
          <div className="text-white/80 font-medium">
            {position.hold_months}m
          </div>
        </div>
      </div>

      {position.ops_programs?.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex flex-wrap gap-1">
            {position.ops_programs.map((prog: any, idx: number) => (
              <span key={idx} className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                {prog.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {position.preemptive_offer && (
        <div className="mt-3 p-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-yellow-400">
              Strategic offer: +{position.preemptive_offer.multiple_premium}x expires in {position.preemptive_offer.expires_month - position.month} months
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Market view component
function MarketView({ companies, onSelectCompany }: { companies: any[]; onSelectCompany: (c: any) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {companies.map(company => (
        <motion.div
          key={company.id}
          whileHover={{ scale: 1.02 }}
          onClick={() => onSelectCompany(company)}
          className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 hover:border-purple-400/50 cursor-pointer transition-all"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-white">{company.content.name}</h4>
              <p className="text-xs text-white/60">{company.content.sector}</p>
            </div>
            <div className="text-right">
              <div className="text-green-400 font-medium text-sm">
                ${(company.content.asking_price / 1e6).toFixed(0)}M
              </div>
              <div className="text-xs text-white/40">
                {(company.content.asking_price / (company.content.revenue * company.content.ebitda_margin)).toFixed(1)}x
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs">
            <span className="text-white/60">
              Margin: {(company.content.ebitda_margin * 100).toFixed(0)}%
            </span>
            <span className="text-white/60">
              Growth: {(company.content.growth_rate * 100).toFixed(0)}%
            </span>
            <span className="text-white/60">
              Quality: {(company.content.quality_score * 100).toFixed(0)}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Leaderboard view component
function LeaderboardView({ entries, currentFundId }: { entries: any[]; currentFundId: string }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-bold flex items-center gap-2">
          <TrophyIcon className="w-5 h-5 text-yellow-400" />
          Room Leaderboard
        </h3>
      </div>
      
      <div className="divide-y divide-white/10">
        {entries.map((entry, idx) => (
          <div
            key={entry.id}
            className={`p-3 flex items-center justify-between ${
              entry.content.fund_id === currentFundId ? 'bg-blue-500/10' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`text-lg font-bold ${
                idx === 0 ? 'text-yellow-400' :
                idx === 1 ? 'text-gray-300' :
                idx === 2 ? 'text-orange-400' : 'text-white/60'
              }`}>
                #{idx + 1}
              </div>
              <div>
                <div className="font-medium text-white">{entry.content.player_name}</div>
                <div className="text-xs text-white/60">Score: {entry.content.composite_score.toFixed(1)}</div>
              </div>
            </div>
            
            <div className="text-right text-sm">
              <div className="text-blue-400">{entry.content.irr.toFixed(1)}% IRR</div>
              <div className="text-white/60 text-xs">{entry.content.tvpi.toFixed(2)}x TVPI</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Events feed component
function EventsFeed({ events }: { events: any[] }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-bold flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-purple-400" />
          Recent Events
        </h3>
      </div>
      
      <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
        {events.length === 0 ? (
          <p className="text-sm text-white/40">No events yet</p>
        ) : (
          events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-2 rounded-lg text-xs ${
                event.content.severity === 'good'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : event.content.severity === 'bad'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-white/10 text-white/60 border border-white/10'
              }`}
            >
              <div className="font-medium">{event.content.title}</div>
              <div className="opacity-80">{event.content.description}</div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// Action drawer component
function ActionDrawer({ fund, selectedCompany, onClose, onQueueAction }: any) {
  const actions = [
    { 
      type: 'source_deals', 
      label: 'Source Deal Pipeline', 
      fpCost: 2, 
      icon: FireIcon,
      description: 'Add 3-6 new companies to market'
    },
    { 
      type: 'submit_bid', 
      label: 'Submit Bid', 
      fpCost: 2, 
      icon: CurrencyDollarIcon,
      description: 'Bid on selected company',
      requiresSelection: true
    },
    { 
      type: 'launch_ops', 
      label: 'Launch Ops Program', 
      fpCost: 3, 
      icon: BoltIcon,
      description: 'Improve portfolio company operations'
    },
    { 
      type: 'refinance', 
      label: 'Refinance Debt', 
      fpCost: 3, 
      icon: ChartBarIcon,
      description: 'Refinance at current market rates'
    },
    { 
      type: 'full_exit', 
      label: 'Full Exit', 
      fpCost: 3, 
      icon: ShareIcon,
      description: 'Exit portfolio position'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="absolute right-0 top-0 h-full w-96 bg-slate-900 border-l border-white/10 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Actions</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-300">Focus Points</span>
            <span className="text-lg font-bold text-blue-400">
              {fund.focus_points} / {fund.max_focus_points}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {actions.map(action => {
            const canAfford = fund.focus_points >= action.fpCost;
            const needsSelection = action.requiresSelection && !selectedCompany;
            const disabled = !canAfford || needsSelection;

            return (
              <button
                key={action.type}
                onClick={() => {
                  if (!disabled) {
                    onQueueAction(action.type, { companyId: selectedCompany?.id }, action.fpCost);
                    onClose();
                  }
                }}
                disabled={disabled}
                className={`w-full p-3 rounded-lg border transition-all ${
                  disabled
                    ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                    : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <action.icon className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-white">{action.label}</div>
                    <div className="text-xs text-white/60 mt-1">{action.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">{action.fpCost} FP</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}