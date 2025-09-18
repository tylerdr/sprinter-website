"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, TrendingUp, AlertCircle, Download, Building } from "lucide-react";
import Link from "next/link";

export default function DSCRCalculatorPage() {
  const [monthlyRentalIncome, setMonthlyRentalIncome] = useState(5000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [loanAmount, setLoanAmount] = useState(400000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [annualPropertyTax, setAnnualPropertyTax] = useState(6000);
  const [annualInsurance, setAnnualInsurance] = useState(1500);
  const [annualHOA, setAnnualHOA] = useState(0);
  const [annualMaintenance, setAnnualMaintenance] = useState(2000);

  // Calculate monthly P&I payment
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTermYears * 12;
  const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                    (Math.pow(1 + monthlyRate, numPayments) - 1);

  // Calculate NOI (Net Operating Income)
  const annualNOI = (monthlyRentalIncome + otherIncome) * 12;

  // Calculate total debt service
  const annualDebtService = monthlyPI * 12 + annualPropertyTax + annualInsurance + annualHOA;

  // Calculate DSCR
  const dscr = annualNOI / annualDebtService;

  // Determine loan viability
  const isViable = dscr >= 1.25;
  const viabilityColor = dscr >= 1.25 ? "text-green-500" : dscr >= 1.0 ? "text-yellow-500" : "text-red-500";

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

        <div className="relative container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              Financial Calculator
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DSCR Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate Debt Service Coverage Ratio for investment property loans
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Property Income
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="rental">Monthly Rental Income ($)</Label>
                    <Input
                      id="rental"
                      type="number"
                      value={monthlyRentalIncome}
                      onChange={(e) => setMonthlyRentalIncome(Number(e.target.value))}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="other">Other Monthly Income ($)</Label>
                    <Input
                      id="other"
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(Number(e.target.value))}
                      min="0"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loan Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Loan Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rate">Interest Rate (%)</Label>
                    <Input
                      id="rate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      min="0"
                      max="30"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="term">Loan Term (Years)</Label>
                    <Input
                      id="term"
                      type="number"
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      min="1"
                      max="40"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Annual Expenses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="tax">Property Tax ($)</Label>
                    <Input
                      id="tax"
                      type="number"
                      value={annualPropertyTax}
                      onChange={(e) => setAnnualPropertyTax(Number(e.target.value))}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="insurance">Insurance ($)</Label>
                    <Input
                      id="insurance"
                      type="number"
                      value={annualInsurance}
                      onChange={(e) => setAnnualInsurance(Number(e.target.value))}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hoa">HOA Fees ($)</Label>
                    <Input
                      id="hoa"
                      type="number"
                      value={annualHOA}
                      onChange={(e) => setAnnualHOA(Number(e.target.value))}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maintenance">Maintenance ($)</Label>
                    <Input
                      id="maintenance"
                      type="number"
                      value={annualMaintenance}
                      onChange={(e) => setAnnualMaintenance(Number(e.target.value))}
                      min="0"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">DSCR Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
                    <div className={`text-5xl font-bold mb-2 ${viabilityColor}`}>
                      {dscr.toFixed(2)}
                    </div>
                    <p className="text-muted-foreground">Debt Service Coverage Ratio</p>
                  </div>

                  {isViable ? (
                    <Alert className="border-green-500/50 bg-green-500/10">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <AlertDescription className="text-green-900 dark:text-green-100">
                        <strong>Loan Viable!</strong> DSCR above 1.25 threshold
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="border-red-500/50 bg-red-500/10">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-900 dark:text-red-100">
                        <strong>Below Threshold</strong> Most lenders require DSCR ≥ 1.25
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-semibold">Breakdown</h4>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Net Operating Income</span>
                        <span className="font-medium">${annualNOI.toLocaleString()}/year</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly P&I Payment</span>
                        <span>${monthlyPI.toFixed(0)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Debt Service</span>
                        <span className="font-medium">${annualDebtService.toLocaleString()}/year</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-semibold">Lender Requirements</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Conventional Lenders</span>
                        <span className={dscr >= 1.25 ? "text-green-500" : "text-muted-foreground"}>
                          DSCR ≥ 1.25 {dscr >= 1.25 && "✓"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Alternative Lenders</span>
                        <span className={dscr >= 1.0 ? "text-green-500" : "text-muted-foreground"}>
                          DSCR ≥ 1.00 {dscr >= 1.0 && "✓"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-semibold">Tips to Improve DSCR</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {dscr < 1.25 && (
                        <>
                          <li>• Increase rental income by ${Math.ceil((1.25 * annualDebtService - annualNOI) / 12)}/month</li>
                          <li>• Reduce loan amount by ${Math.ceil((annualNOI / 1.25 - annualDebtService) * -10).toLocaleString()}</li>
                          <li>• Consider longer loan term to reduce payments</li>
                        </>
                      )}
                      <li>• Add additional income sources</li>
                      <li>• Negotiate lower insurance premiums</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-3">
                <Button className="w-full gap-2" size="lg">
                  <Download className="w-4 h-4" />
                  Download Analysis Report
                </Button>

                <Link href="/contact" className="w-full">
                  <Button variant="outline" className="w-full" size="lg">
                    Get Lending Consultation
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