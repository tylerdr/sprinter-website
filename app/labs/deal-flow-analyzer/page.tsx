"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChartBarIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { analyzeDeal } from "./actions";

interface DealAnalysis {
  score: number;
  recommendation: "strong-buy" | "buy" | "hold" | "pass";
  strengths: string[];
  risks: string[];
  valuation: {
    suggested: string;
    multiple: string;
    rationale: string;
  };
  aiOpportunities: string[];
  exitScenarios: Array<{
    timeline: string;
    multiple: string;
    irr: string;
  }>;
  comparables: string[];
}

export default function DealFlowAnalyzerPage() {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [revenue, setRevenue] = useState("");
  const [ebitda, setEbitda] = useState("");
  const [growth, setGrowth] = useState("");
  const [askingPrice, setAskingPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DealAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!companyName || !industry || !revenue || !ebitda) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeDeal({
        companyName,
        industry,
        revenue: parseFloat(revenue),
        ebitda: parseFloat(ebitda),
        growth: parseFloat(growth || "0"),
        askingPrice: parseFloat(askingPrice || "0"),
        description,
      });
      setAnalysis(result);
    } catch (error) {
      console.error("Error analyzing deal:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400 border-green-400";
    if (score >= 60) return "text-blue-400 border-blue-400";
    if (score >= 40) return "text-yellow-400 border-yellow-400";
    return "text-red-400 border-red-400";
  };

  const getRecommendationBadge = (rec: string) => {
    const badges = {
      "strong-buy": { color: "bg-green-500/20 text-green-400 border-green-500/30", label: "STRONG BUY" },
      "buy": { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", label: "BUY" },
      "hold": { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", label: "HOLD" },
      "pass": { color: "bg-red-500/20 text-red-400 border-red-500/30", label: "PASS" },
    };
    return badges[rec as keyof typeof badges] || badges.hold;
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 mb-6"
          >
            <ChartBarIcon className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">AI-Powered Deal Analysis</span>
          </motion.div>

          <h1 className="text-5xl font-bold mb-4">
            PE Deal-Flow <span className="gradient-text">Analyzer</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Instantly analyze potential acquisitions with AI. Get investment scores,
            valuation guidance, and exit scenario modeling in seconds.
          </p>
        </div>

        {/* Input Form */}
        {!analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="TechCo Inc."
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-green-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Software, Healthcare, etc."
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-green-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Revenue */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Annual Revenue (M)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <input
                      type="number"
                      value={revenue}
                      onChange={(e) => setRevenue(e.target.value)}
                      placeholder="50"
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-background/50 border border-border focus:border-green-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* EBITDA */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    EBITDA (M)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <input
                      type="number"
                      value={ebitda}
                      onChange={(e) => setEbitda(e.target.value)}
                      placeholder="10"
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-background/50 border border-border focus:border-green-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Growth Rate */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    YoY Growth Rate (%)
                  </label>
                  <input
                    type="number"
                    value={growth}
                    onChange={(e) => setGrowth(e.target.value)}
                    placeholder="25"
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-green-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Asking Price */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Asking Price (M) - Optional
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <input
                      type="number"
                      value={askingPrice}
                      onChange={(e) => setAskingPrice(e.target.value)}
                      placeholder="100"
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-background/50 border border-border focus:border-green-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
                  Business Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the business, competitive advantages, market position..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-green-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Quick Metrics */}
              {revenue && ebitda && (
                <div className="mt-6 p-4 rounded-xl bg-black/20 border border-white/10">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">EBITDA Margin:</span>
                      <span className="ml-2 font-semibold text-green-400">
                        {((parseFloat(ebitda) / parseFloat(revenue)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    {askingPrice && (
                      <div>
                        <span className="text-muted-foreground">Asking Multiple:</span>
                        <span className="ml-2 font-semibold text-blue-400">
                          {(parseFloat(askingPrice) / parseFloat(ebitda)).toFixed(1)}x
                        </span>
                      </div>
                    )}
                    {growth && (
                      <div>
                        <span className="text-muted-foreground">Growth Rate:</span>
                        <span className="ml-2 font-semibold text-purple-400">
                          {growth}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!companyName || !industry || !revenue || !ebitda || isAnalyzing}
                className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Deal...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5" />
                    Analyze Deal
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Analysis Results */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              {/* Score and Recommendation */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl border border-green-500/20 p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{companyName}</h2>
                    <p className="text-muted-foreground">{industry} · ${revenue}M Revenue · ${ebitda}M EBITDA</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getScoreColor(analysis.score)}`}>
                      {analysis.score}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Investment Score</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className={`px-4 py-2 rounded-full border font-semibold ${getRecommendationBadge(analysis.recommendation).color}`}>
                    {getRecommendationBadge(analysis.recommendation).label}
                  </span>
                  <div className="flex-1 h-2 bg-black/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${analysis.score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${
                        analysis.score >= 80 ? "from-green-400 to-green-500" :
                        analysis.score >= 60 ? "from-blue-400 to-blue-500" :
                        analysis.score >= 40 ? "from-yellow-400 to-yellow-500" :
                        "from-red-400 to-red-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Valuation */}
                <div className="bg-black/20 rounded-xl p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <ScaleIcon className="w-5 h-5 text-blue-400" />
                    Suggested Valuation
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Enterprise Value</p>
                      <p className="text-2xl font-bold text-green-400">{analysis.valuation.suggested}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">EBITDA Multiple</p>
                      <p className="text-2xl font-bold text-blue-400">{analysis.valuation.multiple}</p>
                    </div>
                    <div className="col-span-3 md:col-span-1">
                      <p className="text-sm text-muted-foreground">Rationale</p>
                      <p className="text-sm mt-1">{analysis.valuation.rationale}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Strengths */}
                <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-border/50 p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-400" />
                    Investment Strengths
                  </h3>
                  <ul className="space-y-3">
                    {analysis.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <ArrowTrendingUpIcon className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risks */}
                <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-border/50 p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />
                    Key Risks
                  </h3>
                  <ul className="space-y-3">
                    {analysis.risks.map((risk, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <XCircleIcon className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Opportunities */}
                <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-purple-400" />
                    AI Value Creation Opportunities
                  </h3>
                  <ul className="space-y-3">
                    {analysis.aiOpportunities.map((opp, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{opp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exit Scenarios */}
                <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-border/50 p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ChartBarIcon className="w-5 h-5 text-blue-400" />
                    Exit Scenarios
                  </h3>
                  <div className="space-y-3">
                    {analysis.exitScenarios.map((scenario, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-black/20 border border-white/10">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Timeline:</span>
                            <span className="ml-2 font-semibold">{scenario.timeline}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Multiple:</span>
                            <span className="ml-2 font-semibold text-blue-400">{scenario.multiple}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">IRR:</span>
                            <span className="ml-2 font-semibold text-green-400">{scenario.irr}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comparables */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 p-6 mb-8">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <BuildingOfficeIcon className="w-5 h-5 text-blue-400" />
                  Comparable Transactions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.comparables.map((comp, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground">
                      • {comp}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setAnalysis(null)}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Analyze Another Deal
                </button>
                <button
                  onClick={() => {
                    // In production, this would generate a PDF report
                    alert("PDF export coming soon!");
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <DocumentTextIcon className="w-5 h-5" />
                  Export Report
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}