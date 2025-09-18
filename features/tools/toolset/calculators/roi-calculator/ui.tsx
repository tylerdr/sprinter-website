"use client";

import React, { useState, useEffect } from "react";
import type { ToolUI } from "../../../types";
import { inputSchema as Input, outputSchema as Output } from "./tool";
import { Button } from "@/components/ui/button";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, DollarSign, Percent, Calculator, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const formatCurrency = (value: string | number): string => {
  const num = typeof value === 'string' ? value.replace(/[^0-9]/g, '') : value.toString();
  if (!num) return '';
  return parseInt(num).toLocaleString('en-US');
};

const parseCurrency = (value: string): number => {
  return parseInt(value.replace(/[^0-9]/g, '') || '0');
};

const UI: ToolUI<typeof Input, typeof Output> = {
  Result: ({ data }) => (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-xl shadow-lg border overflow-hidden">
        <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Monthly Payment</h3>
              <span className="text-4xl font-bold text-primary">
                ${data.totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total over loan term</div>
              <div className="text-lg font-semibold text-foreground">
                ${(data.totals?.totalPayments || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-card border-t">
          <h4 className="font-bold text-foreground mb-4">Payment Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Principal & Interest</span>
              <span className="font-semibold text-foreground">${data.breakdown.principal.toFixed(2)}</span>
            </div>
            {data.breakdown.taxes > 0 && (
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Property Tax</span>
                <span className="font-semibold text-foreground">${data.breakdown.taxes.toFixed(2)}</span>
              </div>
            )}
            {data.breakdown.insurance > 0 && (
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Home Insurance</span>
                <span className="font-semibold text-foreground">${data.breakdown.insurance.toFixed(2)}</span>
              </div>
            )}
            {data.breakdown.hoa > 0 && (
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">HOA Fees</span>
                <span className="font-semibold text-foreground">${data.breakdown.hoa.toFixed(2)}</span>
              </div>
            )}
            {data.breakdown.pmi > 0 && (
              <div className="flex justify-between items-center py-2 text-yellow-600 dark:text-yellow-400">
                <span className="flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  PMI (LTV &gt; 80%)
                </span>
                <span className="font-semibold">${data.breakdown.pmi.toFixed(2)}</span>
              </div>
            )}
            <div className="pt-3 mt-3 border-t">
              <div className="flex justify-between items-center">
                <span className="text-foreground font-semibold">Total Monthly</span>
                <span className="text-xl font-bold text-primary">${data.totalMonthly.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-muted/50 border-t">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-muted-foreground">Total Interest Paid</div>
              <div className="text-lg font-bold text-foreground">
                ${(data.totals?.totalInterest || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Effective Rate</div>
              <div className="text-lg font-bold text-foreground">
                {(data.totals?.effectiveRate || 0).toFixed(3)}%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {data.amortization && data.amortization.length > 0 && (
        <details className="mt-4 bg-card rounded-lg shadow-sm border overflow-hidden">
          <summary className="cursor-pointer font-medium p-4 hover:bg-accent">View First Year Amortization</summary>
          <div className="p-4 border-t">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-muted-foreground">Month</th>
                    <th className="text-right py-2 text-muted-foreground">Payment</th>
                    <th className="text-right py-2 text-muted-foreground">Principal</th>
                    <th className="text-right py-2 text-muted-foreground">Interest</th>
                    <th className="text-right py-2 text-muted-foreground">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {data.amortization.map((row) => (
                    <tr key={row.month} className="border-b">
                      <td className="py-2">{row.month}</td>
                      <td className="text-right">${row.payment.toFixed(2)}</td>
                      <td className="text-right">${row.principal.toFixed(2)}</td>
                      <td className="text-right">${row.interest.toFixed(2)}</td>
                      <td className="text-right">${row.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </details>
      )}
    </div>
  ),
  
  Loading: ({ progressPct, note }) => (
    <div className="animate-pulse space-y-4">
      <div className="h-24 bg-muted rounded-lg"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
      </div>
      {note && <div className="text-sm text-muted-foreground">{note}</div>}
    </div>
  ),
  
  Error: ({ message }) => (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  ),
  
  InputForm: ({ onSubmit }) => {
    const [loanInputType, setLoanInputType] = useState<"loanAmount" | "purchasePrice">("purchasePrice");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [downPaymentType, setDownPaymentType] = useState<"percent" | "amount">("percent");
    const [downPaymentPercent, setDownPaymentPercent] = useState("20");
    const [downPaymentAmount, setDownPaymentAmount] = useState("");
    const [interestRate, setInterestRate] = useState("6.5");
    const [loanTerm, setLoanTerm] = useState("30");
    const [includeEscrows, setIncludeEscrows] = useState(true);
    const [propertyTax, setPropertyTax] = useState("");
    const [homeInsurance, setHomeInsurance] = useState("");
    const [hoaFees, setHoaFees] = useState("");
    const [ioMonths, setIoMonths] = useState("0");

    // Auto-calculate loan amount when down payment changes
    useEffect(() => {
      if (loanInputType === "purchasePrice" && purchasePrice) {
        const propValue = parseCurrency(purchasePrice);
        if (downPaymentType === "percent" && downPaymentPercent) {
          const percent = parseFloat(downPaymentPercent) || 0;
          const downAmount = Math.round((propValue * percent) / 100);
          const loan = propValue - downAmount;
          setLoanAmount(loan > 0 ? formatCurrency(loan) : "");
        } else if (downPaymentType === "amount" && downPaymentAmount) {
          const downAmount = parseCurrency(downPaymentAmount);
          const loan = propValue - downAmount;
          setLoanAmount(loan > 0 ? formatCurrency(loan) : "");
        }
      }
    }, [purchasePrice, downPaymentType, downPaymentAmount, downPaymentPercent, loanInputType]);

    // Auto-calculate property tax and insurance if not set
    useEffect(() => {
      if (includeEscrows && purchasePrice) {
        const propValue = parseCurrency(purchasePrice);
        if (!propertyTax) {
          // Estimate 1.2% annual property tax
          const annualTax = propValue * 0.012;
          setPropertyTax(formatCurrency(Math.round(annualTax)));
        }
        if (!homeInsurance) {
          // Estimate 0.4% annual insurance
          const annualInsurance = propValue * 0.004;
          setHomeInsurance(formatCurrency(Math.round(annualInsurance)));
        }
      }
    }, [purchasePrice, includeEscrows, propertyTax, homeInsurance]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      const data: any = {
        ratePct: parseFloat(interestRate) || 0,
        termMonths: parseInt(loanTerm) * 12,
        ioMonths: parseInt(ioMonths) || 0
      };

      if (loanInputType === "loanAmount") {
        data.loanAmount = parseCurrency(loanAmount);
      } else {
        data.purchasePrice = parseCurrency(purchasePrice);
        if (downPaymentType === "percent") {
          data.downPaymentPercent = parseFloat(downPaymentPercent) || 0;
        } else {
          data.downPaymentAmount = parseCurrency(downPaymentAmount);
        }
      }

      if (includeEscrows) {
        data.escrows = {
          taxAnnual: parseCurrency(propertyTax),
          insuranceAnnual: parseCurrency(homeInsurance),
          hoaMonthly: parseCurrency(hoaFees),
          pmiMonthly: 0 // Will be auto-calculated based on LTV
        };
      }
      
      onSubmit(data);
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>Loan Input Method</Label>
          <Tabs value={loanInputType} onValueChange={(v: any) => setLoanInputType(v)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="purchasePrice">Purchase Price</TabsTrigger>
              <TabsTrigger value="loanAmount">Loan Amount Only</TabsTrigger>
            </TabsList>
            
            <TabsContent value="purchasePrice" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <ShadcnInput
                    type="text"
                    id="purchasePrice"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(formatCurrency(e.target.value))}
                    placeholder="650,000"
                    className="pl-8"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Down Payment</Label>
                <Tabs value={downPaymentType} onValueChange={(v: any) => setDownPaymentType(v)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="percent">Percentage</TabsTrigger>
                    <TabsTrigger value="amount">Dollar Amount</TabsTrigger>
                  </TabsList>
                  <TabsContent value="percent" className="space-y-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <ShadcnInput
                          type="number"
                          value={downPaymentPercent}
                          onChange={(e) => setDownPaymentPercent(e.target.value)}
                          placeholder="20"
                          min="0"
                          max="100"
                          step="0.5"
                          className="w-24"
                        />
                        <span className="text-muted-foreground">%</span>
                        <Slider
                          value={[parseFloat(downPaymentPercent) || 0]}
                          onValueChange={(v) => setDownPaymentPercent(v[0].toString())}
                          min={0}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex gap-2">
                        {[3, 5, 10, 20].map(pct => (
                          <Button
                            key={pct}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setDownPaymentPercent(pct.toString())}
                          >
                            {pct}%
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="amount" className="space-y-2">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <ShadcnInput
                        type="text"
                        value={downPaymentAmount}
                        onChange={(e) => setDownPaymentAmount(formatCurrency(e.target.value))}
                        placeholder="130,000"
                        className="pl-8"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="calculatedLoan">Loan Amount (calculated)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <ShadcnInput
                    type="text"
                    id="calculatedLoan"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(formatCurrency(e.target.value))}
                    placeholder="520,000"
                    className="pl-8 bg-muted"
                    readOnly={loanInputType === "purchasePrice"}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="loanAmount" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="directLoanAmount">Loan Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <ShadcnInput
                    type="text"
                    id="directLoanAmount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(formatCurrency(e.target.value))}
                    placeholder="500,000"
                    className="pl-8"
                    required
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <ShadcnInput
              type="number"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              min="0"
              max="100"
              step="0.125"
              placeholder="6.5"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="loanTerm">Loan Term</Label>
            <Select value={loanTerm} onValueChange={setLoanTerm}>
              <SelectTrigger id="loanTerm">
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 Years</SelectItem>
                <SelectItem value="20">20 Years</SelectItem>
                <SelectItem value="30">30 Years</SelectItem>
                <SelectItem value="40">40 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ioMonths">Interest-Only Period (months)</Label>
          <div className="flex items-center gap-4">
            <ShadcnInput
              type="number"
              id="ioMonths"
              value={ioMonths}
              onChange={(e) => setIoMonths(e.target.value)}
              min="0"
              max="120"
              step="12"
              placeholder="0"
              className="w-24"
            />
            <div className="flex gap-2">
              {[0, 12, 24, 60, 120].map(months => (
                <Button
                  key={months}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIoMonths(months.toString())}
                >
                  {months === 0 ? "None" : `${months/12}yr`}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="includeEscrows" className="cursor-pointer">
              Include Taxes & Insurance (Escrows)
            </Label>
            <Switch
              id="includeEscrows"
              checked={includeEscrows}
              onCheckedChange={setIncludeEscrows}
            />
          </div>

          {includeEscrows && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyTax">Annual Property Tax</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <ShadcnInput
                      type="text"
                      id="propertyTax"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(formatCurrency(e.target.value))}
                      placeholder="7,800"
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="homeInsurance">Annual Insurance</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <ShadcnInput
                      type="text"
                      id="homeInsurance"
                      value={homeInsurance}
                      onChange={(e) => setHomeInsurance(formatCurrency(e.target.value))}
                      placeholder="2,600"
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoaFees">Monthly HOA Fees (optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <ShadcnInput
                    type="text"
                    id="hoaFees"
                    value={hoaFees}
                    onChange={(e) => setHoaFees(formatCurrency(e.target.value))}
                    placeholder="200"
                    className="pl-8"
                  />
                </div>
              </div>

              {loanInputType === "purchasePrice" && purchasePrice && (
                <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    PMI will be automatically calculated if your down payment is less than 20%
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
        
        <Button type="submit" className="w-full">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Payment
        </Button>
      </form>
    );
  },
};

export default UI;