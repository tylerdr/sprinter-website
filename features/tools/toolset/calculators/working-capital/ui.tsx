"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart3, TrendingUp, TrendingDown, AlertCircle, Download, DollarSign, Clock } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { WorkingCapitalInput, WorkingCapitalOutput } from "./tool";

interface WorkingCapitalUIProps {
  onCalculate: (input: WorkingCapitalInput) => Promise<WorkingCapitalOutput>;
}

export function WorkingCapitalUI({ onCalculate }: WorkingCapitalUIProps) {
  // Current metrics
  const [annualRevenue, setAnnualRevenue] = useState(5000000);
  const [averageReceivableDays, setAverageReceivableDays] = useState(45);
  const [averagePayableDays, setAveragePayableDays] = useState(30);
  const [inventoryTurnoverDays, setInventoryTurnoverDays] = useState(60);
  const [currentCashReserve, setCurrentCashReserve] = useState(250000);

  // Target improvements
  const [targetReceivableDays, setTargetReceivableDays] = useState(30);
  const [targetPayableDays, setTargetPayableDays] = useState(45);
  const [targetInventoryDays, setTargetInventoryDays] = useState(45);

  const [result, setResult] = useState<WorkingCapitalOutput | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      const input: WorkingCapitalInput = {
        annualRevenue,
        averageReceivableDays,
        averagePayableDays,
        inventoryTurnoverDays,
        currentCashReserve,
        targetReceivableDays,
        targetPayableDays,
        targetInventoryDays
      };
      const output = await onCalculate(input);
      setResult(output);
    } catch (error) {
      console.error("Calculation failed:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

        <div className="relative container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
              <BarChart3 className="w-4 h-4" />
              Financial Optimizer
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Working Capital Optimizer
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Optimize cash flow and unlock trapped capital with AI-powered recommendations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="revenue">Annual Revenue ($)</Label>
                    <Input
                      id="revenue"
                      type="number"
                      value={annualRevenue}
                      onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="receivables">Avg. Receivable Days</Label>
                    <Input
                      id="receivables"
                      type="number"
                      value={averageReceivableDays}
                      onChange={(e) => setAverageReceivableDays(Number(e.target.value))}
                      min="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Days to collect payment</p>
                  </div>

                  <div>
                    <Label htmlFor="payables">Avg. Payable Days</Label>
                    <Input
                      id="payables"
                      type="number"
                      value={averagePayableDays}
                      onChange={(e) => setAveragePayableDays(Number(e.target.value))}
                      min="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Days to pay suppliers</p>
                  </div>

                  <div>
                    <Label htmlFor="inventory">Inventory Turnover Days</Label>
                    <Input
                      id="inventory"
                      type="number"
                      value={inventoryTurnoverDays}
                      onChange={(e) => setInventoryTurnoverDays(Number(e.target.value))}
                      min="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Days inventory held</p>
                  </div>

                  <div>
                    <Label htmlFor="cash">Current Cash Reserve ($)</Label>
                    <Input
                      id="cash"
                      type="number"
                      value={currentCashReserve}
                      onChange={(e) => setCurrentCashReserve(Number(e.target.value))}
                      min="0"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Optimization Targets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="target-receivables">Target Receivable Days</Label>
                    <Input
                      id="target-receivables"
                      type="number"
                      value={targetReceivableDays}
                      onChange={(e) => setTargetReceivableDays(Number(e.target.value))}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="target-payables">Target Payable Days</Label>
                    <Input
                      id="target-payables"
                      type="number"
                      value={targetPayableDays}
                      onChange={(e) => setTargetPayableDays(Number(e.target.value))}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="target-inventory">Target Inventory Days</Label>
                    <Input
                      id="target-inventory"
                      type="number"
                      value={targetInventoryDays}
                      onChange={(e) => setTargetInventoryDays(Number(e.target.value))}
                      min="0"
                    />
                  </div>

                  <Button
                    onClick={handleCalculate}
                    className="w-full"
                    disabled={isCalculating}
                  >
                    {isCalculating ? "Calculating..." : "Calculate Optimization"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {result ? (
                <>
                  {/* Key Metrics */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-green-500/20 bg-green-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Cash Flow Improvement</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                              ${result.workingCapitalImprovement.toLocaleString()}
                            </p>
                            <p className="text-sm text-green-600 mt-1">
                              {result.improvementPercentage.toFixed(1)}% reduction
                            </p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-500/20 bg-blue-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Cash Conversion Cycle</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">
                              {result.cccImprovement} days
                            </p>
                            <p className="text-sm text-blue-600 mt-1">
                              Faster cash generation
                            </p>
                          </div>
                          <Clock className="w-8 h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* AI Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle>AI-Powered Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.recommendations.map((rec, index) => (
                        <Alert key={index} className="border-blue-500/20 bg-blue-500/5">
                          <DollarSign className="h-4 w-4 text-blue-500" />
                          <AlertDescription>
                            <strong>Recommendation {index + 1}:</strong> {rec}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Quick Wins */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Wins</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.quickWins.map((win, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-sm">{win}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Risk Factors */}
                  {result.riskFactors.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Risk Factors</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.riskFactors.map((risk, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* CTA */}
                  <Card className="border-2 border-purple-500/20">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-3">
                        <Button className="w-full gap-2" size="lg">
                          <Download className="w-4 h-4" />
                          Download Optimization Report
                        </Button>
                        <Link href="/ai-sprint" className="w-full">
                          <Button variant="outline" className="w-full" size="lg">
                            Start Working Capital Sprint
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Ready to Optimize</p>
                    <p className="text-muted-foreground">
                      Enter your current metrics and targets to see optimization recommendations
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}