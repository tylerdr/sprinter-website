"use client";

import { useState, useEffect } from "react";
import { 
  BuildingOfficeIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

interface GameState {
  room: any;
  fund: any;
  positions: any[];
  availableCompanies: any[];
  events: any[];
  leaderboard: any[];
  actions: any[];
}

// Helper functions to generate demo data
function generateDemoCompanies() {
  const companies = [
    { id: 'c1', content: { name: 'TechCorp Solutions', sector: 'Software', asking_price: 450000000, revenue: 120000000, ebitda_margin: 0.35, growth_rate: 0.25, quality_score: 0.85 }},
    { id: 'c2', content: { name: 'HealthVital Inc', sector: 'Healthcare', asking_price: 320000000, revenue: 85000000, ebitda_margin: 0.42, growth_rate: 0.18, quality_score: 0.78 }},
    { id: 'c3', content: { name: 'RetailMax', sector: 'Consumer', asking_price: 280000000, revenue: 95000000, ebitda_margin: 0.28, growth_rate: 0.15, quality_score: 0.72 }},
  ];
  return companies;
}

function generateDemoPositions() {
  return [
    {
      id: 'p1',
      content: {
        company_name: 'DataFlow Systems',
        sector: 'Software',
        current_revenue: 75000000,
        ltm_ebitda: 22500000,
        entry_multiple: 12.5,
        hold_months: 24,
        covenant_headroom: 0.45,
        breach_status: false,
        ops_programs: [{ name: 'Process Optimization' }, { name: 'Sales Enablement' }]
      }
    },
    {
      id: 'p2', 
      content: {
        company_name: 'MedDevice Pro',
        sector: 'Healthcare',
        current_revenue: 45000000,
        ltm_ebitda: 13500000,
        entry_multiple: 9.8,
        hold_months: 18,
        covenant_headroom: 0.65,
        breach_status: false,
        ops_programs: [{ name: 'R&D Acceleration' }]
      }
    }
  ];
}

function generateDemoEvents() {
  return [
    { content: { title: 'Market Rally', description: 'Tech multiples up 15% this quarter', severity: 'good' }},
    { content: { title: 'Interest Rate Hold', description: 'Fed maintains current rate', severity: 'neutral' }},
    { content: { title: 'Sector Rotation', description: 'Healthcare seeing increased interest', severity: 'good' }}
  ];
}

function generateDemoLeaderboard() {
  return [
    { id: 'l1', content: { fund_id: 'other1', player_name: 'Goldman Sachs PE', composite_score: 125.8, irr: 18.5, tvpi: 1.62 }},
    { id: 'l2', content: { fund_id: 'demo-fund', player_name: 'Apex Capital Partners', composite_score: 118.2, irr: 15.2, tvpi: 1.45 }},
    { id: 'l3', content: { fund_id: 'other2', player_name: 'Silver Lake', composite_score: 112.4, irr: 14.1, tvpi: 1.38 }}
  ];
}

export default function PETycoonClient() {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<GameState | null>(null);

  // Initialize game with demo data
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setGameState({
        room: { id: 'demo-room', content: { tick: 1, seed: 12345, macro_regime: 'bull_market' } },
        fund: { 
          id: 'demo-fund', 
          content: { 
            name: "Apex Capital Partners",
            cash: 1800000000, // $1.8B
            irr: 15.2,
            tvpi: 1.45,
            focus_points: 8,
            max_focus_points: 10,
            jackpot_tokens: 2,
            month: 18,
            tension_score: 0.3
          } 
        },
        positions: generateDemoPositions(),
        availableCompanies: generateDemoCompanies(),
        events: generateDemoEvents(),
        leaderboard: generateDemoLeaderboard(),
        actions: []
      });
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
                  <BoltIcon className="w-4 h-4 text-yellow-400" />
                  <span className="text-white/80">FP: {fund.focus_points}/{fund.max_focus_points}</span>
                </div>
                
                <div className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                  Month {fund.month} | {room.macro_regime.replace('_', ' ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Portfolio Companies ({gameState.positions.length})</h2>
            {gameState.positions.map((position: any) => (
              <div key={position.id} className="p-4 rounded-xl bg-black/40 border border-white/10">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-white">{position.content.company_name}</h3>
                    <p className="text-sm text-white/60">{position.content.sector}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-white/60">Revenue</span>
                    <div className="text-green-400 font-medium">
                      ${(position.content.current_revenue / 1e6).toFixed(1)}M
                    </div>
                  </div>
                  <div>
                    <span className="text-white/60">EBITDA</span>
                    <div className="text-blue-400 font-medium">
                      ${(position.content.ltm_ebitda / 1e6).toFixed(1)}M
                    </div>
                  </div>
                  <div>
                    <span className="text-white/60">Entry</span>
                    <div className="text-purple-400 font-medium">
                      {position.content.entry_multiple.toFixed(1)}x
                    </div>
                  </div>
                  <div>
                    <span className="text-white/60">Hold</span>
                    <div className="text-white/80 font-medium">
                      {position.content.hold_months}m
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Market */}
            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <h3 className="font-bold text-white mb-4">Available Deals</h3>
              <div className="space-y-2">
                {gameState.availableCompanies.map((company: any) => (
                  <div key={company.id} className="p-2 rounded-lg bg-blue-500/10 border border-white/10">
                    <div className="font-medium text-white text-sm">{company.content.name}</div>
                    <div className="text-xs text-white/60">{company.content.sector}</div>
                    <div className="text-green-400 font-medium text-sm">
                      ${(company.content.asking_price / 1e6).toFixed(0)}M
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Events */}
            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <h3 className="font-bold text-white mb-4">Recent Events</h3>
              <div className="space-y-2">
                {gameState.events.map((event: any, idx: number) => (
                  <div key={idx} className="p-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 text-xs">
                    <div className="font-medium">{event.content.title}</div>
                    <div className="opacity-80">{event.content.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}