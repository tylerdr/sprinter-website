"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BuildingOfficeIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";

interface PortfolioCompany {
  id: string;
  name: string;
  industry: string;
  revenue: number;
  revenueGrowth: number;
  ebitda: number;
  ebitdaMargin: number;
  aiReadiness: number;
  aiOpportunities: string[];
  riskScore: number;
  healthScore: number;
}

// Mock data for demonstration
const mockPortfolio: PortfolioCompany[] = [
  {
    id: "1",
    name: "TechCo Solutions",
    industry: "Software",
    revenue: 45000000,
    revenueGrowth: 25,
    ebitda: 11250000,
    ebitdaMargin: 25,
    aiReadiness: 72,
    aiOpportunities: ["Sales automation", "Customer service AI", "Predictive analytics"],
    riskScore: 25,
    healthScore: 85,
  },
  {
    id: "2",
    name: "HealthTech Inc",
    industry: "Healthcare",
    revenue: 80000000,
    revenueGrowth: 15,
    ebitda: 12000000,
    ebitdaMargin: 15,
    aiReadiness: 45,
    aiOpportunities: ["Clinical AI", "Operations automation", "Patient engagement"],
    riskScore: 40,
    healthScore: 68,
  },
  {
    id: "3",
    name: "LogiServe",
    industry: "Logistics",
    revenue: 120000000,
    revenueGrowth: 8,
    ebitda: 13200000,
    ebitdaMargin: 11,
    aiReadiness: 35,
    aiOpportunities: ["Route optimization", "Warehouse automation", "Demand forecasting"],
    riskScore: 55,
    healthScore: 52,
  },
  {
    id: "4",
    name: "RetailMax",
    industry: "Retail",
    revenue: 200000000,
    revenueGrowth: -5,
    ebitda: 10000000,
    ebitdaMargin: 5,
    aiReadiness: 28,
    aiOpportunities: ["Inventory AI", "Personalization", "Dynamic pricing"],
    riskScore: 70,
    healthScore: 35,
  },
];

export default function PortfolioHealthDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [portfolio] = useState<PortfolioCompany[]>(mockPortfolio);
  const [selectedCompany, setSelectedCompany] = useState<PortfolioCompany | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/signin?redirect=/dashboard/portfolio-health");
      } else {
        setUser(user);
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 70) return "text-green-400 bg-green-400/10 border-green-400/30";
    if (score >= 50) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    return "text-red-400 bg-red-400/10 border-red-400/30";
  };

  const getHealthLabel = (score: number) => {
    if (score >= 70) return "Healthy";
    if (score >= 50) return "At Risk";
    return "Critical";
  };

  const portfolioMetrics = {
    totalRevenue: portfolio.reduce((sum, c) => sum + c.revenue, 0),
    avgGrowth: portfolio.reduce((sum, c) => sum + c.revenueGrowth, 0) / portfolio.length,
    avgEbitdaMargin: portfolio.reduce((sum, c) => sum + c.ebitdaMargin, 0) / portfolio.length,
    avgAiReadiness: portfolio.reduce((sum, c) => sum + c.aiReadiness, 0) / portfolio.length,
    healthyCompanies: portfolio.filter(c => c.healthScore >= 70).length,
    atRiskCompanies: portfolio.filter(c => c.healthScore >= 50 && c.healthScore < 70).length,
    criticalCompanies: portfolio.filter(c => c.healthScore < 50).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <LockClosedIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">
            Please sign in to access your portfolio health dashboard.
          </p>
          <button
            onClick={() => router.push("/auth/signin?redirect=/dashboard/portfolio-health")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Portfolio <span className="gradient-text">Health Dashboard</span>
              </h1>
              <p className="text-muted-foreground">
                Real-time health monitoring and AI opportunities across your portfolio
              </p>
            </div>
            <button
              onClick={() => router.push("/labs/portfolio-ai-blueprint")}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <SparklesIcon className="w-5 h-5" />
              Generate AI Playbook
            </button>
          </div>

          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur-xl border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Revenue</span>
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold">
                ${(portfolioMetrics.totalRevenue / 1000000).toFixed(0)}M
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Across {portfolio.length} companies
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card/50 backdrop-blur-xl border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Avg Growth</span>
                {portfolioMetrics.avgGrowth > 0 ? (
                  <ArrowUpIcon className="w-4 h-4 text-green-400" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 text-red-400" />
                )}
              </div>
              <div className="text-2xl font-bold">
                {portfolioMetrics.avgGrowth.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                YoY revenue growth
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card/50 backdrop-blur-xl border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Avg EBITDA</span>
                <ChartBarIcon className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold">
                {portfolioMetrics.avgEbitdaMargin.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Portfolio margin
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card/50 backdrop-blur-xl border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">AI Readiness</span>
                <SparklesIcon className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold">
                {portfolioMetrics.avgAiReadiness.toFixed(0)}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Average score
              </div>
            </div>
          </div>

          {/* Health Overview */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-3xl font-bold text-green-400">
                    {portfolioMetrics.healthyCompanies}
                  </div>
                  <div className="text-sm text-green-400/80">Healthy</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-center gap-3">
                <ExclamationTriangleIcon className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="text-3xl font-bold text-yellow-400">
                    {portfolioMetrics.atRiskCompanies}
                  </div>
                  <div className="text-sm text-yellow-400/80">At Risk</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-center gap-3">
                <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
                <div>
                  <div className="text-3xl font-bold text-red-400">
                    {portfolioMetrics.criticalCompanies}
                  </div>
                  <div className="text-sm text-red-400/80">Critical</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Companies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {portfolio.map((company) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/50 backdrop-blur-xl rounded-xl border border-border/50 p-6 hover:border-blue-400/50 transition-all cursor-pointer"
              onClick={() => setSelectedCompany(company)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">{company.industry}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(company.healthScore)}`}>
                  {company.healthScore}% {getHealthLabel(company.healthScore)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                  <p className="font-semibold">${(company.revenue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs">
                    {company.revenueGrowth > 0 ? (
                      <span className="text-green-400">+{company.revenueGrowth}% YoY</span>
                    ) : (
                      <span className="text-red-400">{company.revenueGrowth}% YoY</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">EBITDA Margin</p>
                  <p className="font-semibold">{company.ebitdaMargin}%</p>
                  <p className="text-xs text-muted-foreground">
                    ${(company.ebitda / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">AI Readiness: {company.aiReadiness}%</span>
                </div>
                <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  View Details
                  <ArrowRightIcon className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Detail Modal */}
        <AnimatePresence>
          {selectedCompany && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCompany(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background rounded-2xl border border-border max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{selectedCompany.name}</h2>
                      <p className="text-muted-foreground">{selectedCompany.industry}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCompany(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Health Score */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Health Score Analysis</h3>
                      <div className="relative h-8 bg-black/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedCompany.healthScore}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${
                            selectedCompany.healthScore >= 70 ? "bg-green-400" :
                            selectedCompany.healthScore >= 50 ? "bg-yellow-400" :
                            "bg-red-400"
                          }`}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>0%</span>
                        <span className="font-bold">{selectedCompany.healthScore}%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* AI Opportunities */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">AI Value Creation Opportunities</h3>
                      <div className="space-y-2">
                        {selectedCompany.aiOpportunities.map((opp, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                            <SparklesIcon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                            <span className="text-sm">{opp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risk Analysis */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Risk Score</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="relative h-8 bg-black/20 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${selectedCompany.riskScore}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={`h-full ${
                                selectedCompany.riskScore <= 30 ? "bg-green-400" :
                                selectedCompany.riskScore <= 60 ? "bg-yellow-400" :
                                "bg-red-400"
                              }`}
                            />
                          </div>
                        </div>
                        <span className="font-bold">{selectedCompany.riskScore}%</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-border/30">
                      <button
                        onClick={() => router.push(`/labs/portfolio-ai-blueprint?company=${selectedCompany.name}`)}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
                      >
                        Generate AI Playbook
                      </button>
                      <button
                        onClick={() => setSelectedCompany(null)}
                        className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}