"use client";

import { useState, useMemo } from "react";
import { Calculator, Users, Clock, DollarSign, TrendingUp, Target, Zap, Award } from "lucide-react";

interface CalculationResults {
  currentAnnualCost: number;
  timeSavedPerWeek: number;
  annualSavings: number;
  roiPercentage: number;
  breakEvenDays: number;
  productivityGain: number;
}

export default function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [implementationCost, setImplementationCost] = useState(30000);
  const [automationEfficiency, setAutomationEfficiency] = useState(80);

  const results: CalculationResults = useMemo(() => {
    const currentAnnualCost = teamSize * hourlyRate * hoursPerWeek * 52;
    const timeSavedPerWeek = hoursPerWeek * (automationEfficiency / 100);
    const annualSavings = teamSize * hourlyRate * timeSavedPerWeek * 52;
    const netBenefit = annualSavings - implementationCost;
    const roiPercentage = (netBenefit / implementationCost) * 100;
    const breakEvenDays = (implementationCost / (annualSavings / 365));
    const productivityGain = (timeSavedPerWeek / hoursPerWeek) * 100;

    return {
      currentAnnualCost,
      timeSavedPerWeek,
      annualSavings,
      roiPercentage,
      breakEvenDays: Math.max(0, breakEvenDays),
      productivityGain,
    };
  }, [teamSize, hourlyRate, hoursPerWeek, implementationCost, automationEfficiency]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="bg-card/20 border border-border/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-brand" />
            <h3 className="text-xl font-bold">Input Parameters</h3>
          </div>

          <div className="space-y-6">
            {/* Team Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand" />
                  Team Size
                </label>
                <span className="text-lg font-bold text-brand">{teamSize}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-card/30 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 person</span>
                <span>100 people</span>
              </div>
            </div>

            {/* Hourly Rate */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-brand" />
                  Average Hourly Rate
                </label>
                <span className="text-lg font-bold text-brand">${hourlyRate}</span>
              </div>
              <input
                type="range"
                min="25"
                max="200"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-card/30 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$25/hr</span>
                <span>$200/hr</span>
              </div>
            </div>

            {/* Hours on Repetitive Tasks */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand" />
                  Hrs/Week on Repetitive Tasks
                </label>
                <span className="text-lg font-bold text-brand">{hoursPerWeek}</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-card/30 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 hr</span>
                <span>40 hrs</span>
              </div>
            </div>

            {/* Implementation Cost */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium flex items-center gap-2">
                  <Target className="w-4 h-4 text-brand" />
                  Implementation Cost
                </label>
                <span className="text-lg font-bold text-brand">{formatCurrency(implementationCost)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={implementationCost}
                onChange={(e) => setImplementationCost(Number(e.target.value))}
                className="w-full h-2 bg-card/30 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$10K</span>
                <span>$100K</span>
              </div>
            </div>

            {/* Automation Efficiency */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand" />
                  AI Automation Efficiency
                </label>
                <span className="text-lg font-bold text-brand">{automationEfficiency}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={automationEfficiency}
                onChange={(e) => setAutomationEfficiency(Number(e.target.value))}
                className="w-full h-2 bg-card/30 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>50%</span>
                <span>95%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Annual Savings</span>
              </div>
              <div className="text-2xl font-bold text-green-500">
                {formatCurrency(results.annualSavings)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand/10 to-purple-600/10 border border-brand/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-brand" />
                <span className="text-sm font-medium">ROI</span>
              </div>
              <div className="text-2xl font-bold text-brand">
                {formatNumber(results.roiPercentage)}%
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-card/20 border border-border/30 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="font-bold text-lg mb-4">Cost-Benefit Analysis</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Current Annual Cost</span>
                <span className="font-semibold">{formatCurrency(results.currentAnnualCost)}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Time Saved Per Week</span>
                <span className="font-semibold">{formatNumber(results.timeSavedPerWeek)} hours</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Implementation Cost</span>
                <span className="font-semibold text-red-500">-{formatCurrency(implementationCost)}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Annual Savings</span>
                <span className="font-semibold text-green-500">+{formatCurrency(results.annualSavings)}</span>
              </div>
              
              <div className="flex justify-between py-2 font-bold text-lg">
                <span>Net Benefit (Year 1)</span>
                <span className={results.roiPercentage > 0 ? "text-green-500" : "text-red-500"}>
                  {formatCurrency(results.annualSavings - implementationCost)}
                </span>
              </div>
            </div>
          </div>

          {/* Breakeven Timeline */}
          <div className="bg-card/20 border border-border/30 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="font-bold text-lg mb-4">Breakeven Analysis</h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Breakeven Timeline</span>
                  <span className="text-sm font-medium">
                    {Math.round(results.breakEvenDays)} days
                  </span>
                </div>
                <div className="w-full bg-card/30 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-brand to-purple-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((365 - results.breakEvenDays) / 365 * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Start</span>
                  <span>1 Year</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand mb-1">
                    {Math.round(results.breakEvenDays)}
                  </div>
                  <div className="text-xs text-muted-foreground">Days to Break Even</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500 mb-1">
                    {formatNumber(results.productivityGain)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Productivity Gain</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="bg-gradient-to-br from-brand/10 to-purple-600/10 border border-brand/20 rounded-xl p-6">
            <h4 className="font-bold mb-3">Ready to Transform Your Business?</h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Based on your inputs, AI automation could save your team {formatNumber(results.timeSavedPerWeek)} hours per week 
              and generate {formatCurrency(results.annualSavings)} in annual savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 px-4 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity text-sm">
                Start Your Project
              </button>
              <button className="flex-1 px-4 py-3 border border-brand/30 rounded-lg hover:bg-brand/5 transition-colors text-sm">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}