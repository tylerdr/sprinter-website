"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Clock, DollarSign, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function QuoteEstimatorPage() {
  const [rfpsPerMonth, setRfpsPerMonth] = useState(50);
  const [avgLineItems, setAvgLineItems] = useState(25);
  const [avgQuoteTime, setAvgQuoteTime] = useState(4);
  const [winRate, setWinRate] = useState(20);
  const [avgDealSize, setAvgDealSize] = useState(50000);

  const currentCapacity = rfpsPerMonth;
  const currentRevenue = (rfpsPerMonth * (winRate / 100) * avgDealSize);
  const hoursSpent = rfpsPerMonth * avgQuoteTime;
  
  const automatedQuoteTime = avgQuoteTime * 0.58;
  const automatedCapacity = Math.floor((hoursSpent / automatedQuoteTime));
  const automatedWinRate = winRate * 1.18;
  const automatedRevenue = (automatedCapacity * (automatedWinRate / 100) * avgDealSize);
  
  const additionalRFPs = automatedCapacity - currentCapacity;
  const revenueIncrease = automatedRevenue - currentRevenue;
  const timesSaved = hoursSpent - (rfpsPerMonth * automatedQuoteTime);
  const winRateLift = automatedWinRate - winRate;

  return (
    <div className="spr-theme spr-page min-h-screen">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-start/5 via-transparent to-brand-end/5" />
        
        <div className="relative container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-start/10 text-brand-start text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              Throughput Calculator
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
              Quote Throughput Estimator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate how many more RFPs you could handle with Quote Intelligence
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Your Current Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="rfps">RFPs per Month</Label>
                    <Input
                      id="rfps"
                      type="number"
                      value={rfpsPerMonth}
                      onChange={(e) => setRfpsPerMonth(Number(e.target.value))}
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="line-items">Average Line Items per RFP</Label>
                    <Input
                      id="line-items"
                      type="number"
                      value={avgLineItems}
                      onChange={(e) => setAvgLineItems(Number(e.target.value))}
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="quote-time">Average Quote Time (hours)</Label>
                    <Input
                      id="quote-time"
                      type="number"
                      value={avgQuoteTime}
                      onChange={(e) => setAvgQuoteTime(Number(e.target.value))}
                      min="0.5"
                      step="0.5"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="win-rate">Current Win Rate (%)</Label>
                    <Input
                      id="win-rate"
                      type="number"
                      value={winRate}
                      onChange={(e) => setWinRate(Number(e.target.value))}
                      min="0"
                      max="100"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="deal-size">Average Deal Size (USD)</Label>
                    <Input
                      id="deal-size"
                      type="number"
                      value={avgDealSize}
                      onChange={(e) => setAvgDealSize(Number(e.target.value))}
                      min="1"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>With Quote Intelligence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quote Time</span>
                    <span className="font-semibold">{automatedQuoteTime.toFixed(1)} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Reduction</span>
                    <span className="font-semibold text-green-500">42%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Win Rate Lift</span>
                    <span className="font-semibold text-green-500">+18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Implementation</span>
                    <span className="font-semibold">30-45 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Your Growth Potential</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-brand-start/10 rounded-lg">
                    <div className="text-4xl font-bold text-green-500 mb-2">
                      +{additionalRFPs}
                    </div>
                    <p className="text-muted-foreground">Additional RFPs/Month</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Handle {((automatedCapacity / currentCapacity - 1) * 100).toFixed(0)}% more RFPs
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <DollarSign className="w-6 h-6 text-brand-start mx-auto mb-2" />
                      <div className="text-lg font-semibold">
                        ${(revenueIncrease / 1000000).toFixed(1)}M
                      </div>
                      <p className="text-xs text-muted-foreground">Annual Revenue Lift</p>
                    </div>
                    
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <Clock className="w-6 h-6 text-brand-start mx-auto mb-2" />
                      <div className="text-lg font-semibold">
                        {timesSaved.toFixed(0)}
                      </div>
                      <p className="text-xs text-muted-foreground">Hours Saved/Month</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Revenue</span>
                      <span>${(currentRevenue / 1000000).toFixed(1)}M/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Potential Revenue</span>
                      <span className="text-green-500">${(automatedRevenue / 1000000).toFixed(1)}M/year</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Revenue Growth</span>
                      <span className="text-green-500">
                        +{((revenueIncrease / currentRevenue) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Impact Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Faster Response Times</p>
                      <p className="text-sm text-muted-foreground">Respond to RFPs 42% faster</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Higher Win Rates</p>
                      <p className="text-sm text-muted-foreground">From {winRate}% to {automatedWinRate.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Improved Accuracy</p>
                      <p className="text-sm text-muted-foreground">Fewer pricing errors and revisions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Team Scalability</p>
                      <p className="text-sm text-muted-foreground">Handle growth without adding headcount</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-3">
                <Button className="w-full gap-2" size="lg">
                  <Download className="w-4 h-4" />
                  Download Analysis Report
                </Button>
                
                <Link href="/contact" className="w-full">
                  <Button variant="outline" className="w-full gap-2" size="lg">
                    See Quote Intelligence Demo
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}