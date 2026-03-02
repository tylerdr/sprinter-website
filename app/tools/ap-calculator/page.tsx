"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, Clock, TrendingUp, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function APCalculatorPage() {
  const [invoicesPerMonth, setInvoicesPerMonth] = useState(500);
  const [avgProcessingTime, setAvgProcessingTime] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [errorRate, setErrorRate] = useState(5);

  const currentMonthlyCost = (invoicesPerMonth * avgProcessingTime * hourlyRate) / 60;
  const errorCost = currentMonthlyCost * (errorRate / 100) * 2;
  const totalCurrentCost = currentMonthlyCost + errorCost;
  
  const automatedProcessingTime = avgProcessingTime * 0.2;
  const automatedMonthlyCost = (invoicesPerMonth * automatedProcessingTime * hourlyRate) / 60;
  const automatedErrorRate = 1;
  const automatedErrorCost = automatedMonthlyCost * (automatedErrorRate / 100) * 2;
  const totalAutomatedCost = automatedMonthlyCost + automatedErrorCost;
  
  const monthlySavings = totalCurrentCost - totalAutomatedCost;
  const annualSavings = monthlySavings * 12;
  const hoursFreed = ((invoicesPerMonth * (avgProcessingTime - automatedProcessingTime)) / 60) * 12;

  return (
    <div className="spr-theme spr-page min-h-screen">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-start/5 via-transparent to-brand-end/5" />
        
        <div className="relative container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-start/10 text-brand-start text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              ROI Calculator
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
              AP Automation Savings Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate your potential savings with AI-powered accounts payable automation
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
                    <Label htmlFor="invoices">Invoices per Month</Label>
                    <Input
                      id="invoices"
                      type="number"
                      value={invoicesPerMonth}
                      onChange={(e) => setInvoicesPerMonth(Number(e.target.value))}
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="processing-time">Average Processing Time (minutes per invoice)</Label>
                    <Input
                      id="processing-time"
                      type="number"
                      value={avgProcessingTime}
                      onChange={(e) => setAvgProcessingTime(Number(e.target.value))}
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="hourly-rate">Hourly Rate (USD)</Label>
                    <Input
                      id="hourly-rate"
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="error-rate">Error Rate (%)</Label>
                    <Input
                      id="error-rate"
                      type="number"
                      value={errorRate}
                      onChange={(e) => setErrorRate(Number(e.target.value))}
                      min="0"
                      max="100"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>With AP Automation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Time</span>
                    <span className="font-semibold">{automatedProcessingTime.toFixed(1)} min/invoice</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Error Rate</span>
                    <span className="font-semibold">{automatedErrorRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Touchless Processing</span>
                    <span className="font-semibold">60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Implementation Time</span>
                    <span className="font-semibold">30-45 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Your Savings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-brand-start/10 rounded-lg">
                    <div className="text-4xl font-bold text-green-500 mb-2">
                      ${annualSavings.toLocaleString()}
                    </div>
                    <p className="text-muted-foreground">Annual Savings</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <DollarSign className="w-6 h-6 text-brand-start mx-auto mb-2" />
                      <div className="text-xl font-semibold">
                        ${monthlySavings.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">Monthly Savings</p>
                    </div>
                    
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <Clock className="w-6 h-6 text-brand-start mx-auto mb-2" />
                      <div className="text-xl font-semibold">
                        {hoursFreed.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">Hours Freed/Year</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Monthly Cost</span>
                      <span>${totalCurrentCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Automated Monthly Cost</span>
                      <span>${totalAutomatedCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Efficiency Gain</span>
                      <span className="text-green-500">
                        {((monthlySavings / totalCurrentCost) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Additional Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Improved Accuracy</p>
                      <p className="text-sm text-muted-foreground">Reduce errors from {errorRate}% to 1%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Better Compliance</p>
                      <p className="text-sm text-muted-foreground">Complete audit trail and controls</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Employee Satisfaction</p>
                      <p className="text-sm text-muted-foreground">Focus on strategic work, not data entry</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-3">
                <Button className="w-full gap-2" size="lg">
                  <Download className="w-4 h-4" />
                  Download ROI Report
                </Button>
                
                <Link href="/contact" className="w-full">
                  <Button variant="outline" className="w-full gap-2" size="lg">
                    Schedule Demo
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