import { z } from "zod";
import type { ToolSpec } from "../../../types";

// ARM Caps schema
const armCapsSchema = z.object({
  initial: z.number().min(0).describe("Initial adjustment cap (%)"),
  periodic: z.number().min(0).describe("Periodic adjustment cap (%)"),
  lifetime: z.number().min(0).describe("Lifetime cap (%)")
});

// ARM configuration schema
const armConfigSchema = z.object({
  indexName: z.string().optional().describe("Index name (e.g., SOFR, CMT)"),
  marginPct: z.number().min(0).describe("Margin percentage"),
  initialRatePct: z.number().min(0).optional().describe("Initial/teaser rate"),
  caps: armCapsSchema.describe("Rate adjustment caps"),
  resetFreqMonths: z
    .number()
    .min(1)
    .default(12)
    .describe("Reset frequency in months"),
  initialFixedMonths: z
    .number()
    .min(0)
    .default(60)
    .describe("Initial fixed period in months"),
  indexCurve: z
    .array(z.number())
    .optional()
    .describe("Static index values for testing")
});

// Escrows schema
const escrowsSchema = z.object({
  taxAnnual: z.number().min(0).default(0).describe("Annual property taxes"),
  insuranceAnnual: z.number().min(0).default(0).describe("Annual insurance"),
  hoaMonthly: z.number().min(0).default(0).describe("Monthly HOA fees"),
  pmiMonthly: z.number().min(0).default(0).describe("Monthly PMI")
});

export const inputSchema = z.object({
  // Property and loan details
  purchasePrice: z.number().positive().optional().describe("Purchase price"),
  loanAmount: z.number().positive().optional().describe("Loan amount"),
  downPaymentAmount: z.number().min(0).optional().describe("Down payment amount in dollars"),
  downPaymentPercent: z.number().min(0).max(100).optional().describe("Down payment as percentage"),
  ratePct: z.number().min(0).max(100).describe("Interest rate percentage"),
  termMonths: z
    .number()
    .positive()
    .default(360)
    .describe("Loan term in months"),
  ioMonths: z
    .number()
    .min(0)
    .default(0)
    .describe("Interest-only period in months"),
  escrows: escrowsSchema.optional().describe("Escrow components"),
  arm: armConfigSchema.optional().describe("ARM configuration")
}).refine(
  (data) => {
    // Need either loan amount directly, or purchase price with down payment info
    return data.loanAmount || (data.purchasePrice && (data.downPaymentAmount !== undefined || data.downPaymentPercent !== undefined));
  },
  {
    message: "Please provide either loan amount or purchase price with down payment information"
  }
);

export const outputSchema = z.object({
  principalAndInterest: z.number().describe("P&I payment"),
  piti: z.number().describe("Principal + Interest + Taxes + Insurance"),
  pitia: z.number().describe("PITI + HOA"),
  totalMonthly: z.number().describe("Total monthly payment including PMI"),

  breakdown: z
    .object({
      principal: z.number(),
      interest: z.number(),
      taxes: z.number(),
      insurance: z.number(),
      hoa: z.number(),
      pmi: z.number()
    })
    .describe("Payment breakdown"),

  ioPayment: z
    .number()
    .optional()
    .describe("Interest-only payment if applicable"),

  armSchedule: z
    .array(
      z.object({
        periodStart: z.number().describe("Month when period starts"),
        periodEnd: z.number().describe("Month when period ends"),
        rate: z.number().describe("Interest rate for period"),
        payment: z.number().describe("Payment for period"),
        type: z.enum(["fixed", "io", "adjustable"]).describe("Period type")
      })
    )
    .optional()
    .describe("ARM payment schedule"),

  amortization: z
    .array(
      z.object({
        month: z.number(),
        payment: z.number(),
        principal: z.number(),
        interest: z.number(),
        balance: z.number(),
        rate: z.number().optional()
      })
    )
    .describe("First 12 months amortization"),

  totals: z
    .object({
      totalPayments: z.number(),
      totalInterest: z.number(),
      effectiveRate: z.number()
    })
    .describe("Loan totals")
});

const calculatePayment = (
  loanAmount: number,
  ratePct: number,
  termMonths: number,
  ioMonths: number = 0,
  currentMonth: number = 1
): number => {
  const monthlyRate = ratePct / 100 / 12;

  if (currentMonth <= ioMonths) {
    // Interest-only payment
    return Math.round(loanAmount * monthlyRate * 100) / 100;
  } else {
    // Fully amortizing payment
    const remainingMonths = termMonths - ioMonths;
    if (monthlyRate === 0) {
      return Math.round((loanAmount / remainingMonths) * 100) / 100;
    }
    const payment =
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, remainingMonths))) /
      (Math.pow(1 + monthlyRate, remainingMonths) - 1);
    return Math.round(payment * 100) / 100;
  }
};

const calculateARMSchedule = (
  loanAmount: number,
  arm: z.infer<typeof armConfigSchema>,
  termMonths: number,
  ioMonths: number = 0
) => {
  const schedule: any[] = [];
  let currentRate =
    arm.initialRatePct || (arm.indexCurve?.[0] || 5.0) + arm.marginPct;
  const baseRate = currentRate;

  // Initial fixed period
  if (arm.initialFixedMonths > 0) {
    const payment = calculatePayment(
      loanAmount,
      currentRate,
      termMonths,
      ioMonths,
      1
    );
    schedule.push({
      periodStart: 1,
      periodEnd: arm.initialFixedMonths,
      rate: currentRate,
      payment,
      type: ioMonths > 0 && ioMonths >= arm.initialFixedMonths ? "io" : "fixed"
    });
  }

  // ARM reset periods
  let month = arm.initialFixedMonths + 1;
  let resetCount = 0;

  while (month <= termMonths) {
    resetCount++;

    // Calculate new rate based on index + margin with caps
    let newRate: number;
    if (arm.indexCurve && resetCount < arm.indexCurve.length) {
      newRate = arm.indexCurve[resetCount] + arm.marginPct;
    } else {
      // Use a conservative estimate based on historical patterns
      // Typically rates adjust gradually, not randomly
      const yearsElapsed = month / 12;
      let indexEstimate = 5.0; // Base index rate

      // Simulate gradual rate changes based on economic cycles
      if (yearsElapsed < 3) {
        indexEstimate = 5.0 + (yearsElapsed * 0.25); // Gradual increase early
      } else if (yearsElapsed < 7) {
        indexEstimate = 5.75 + ((yearsElapsed - 3) * 0.15); // Slower increase mid-term
      } else if (yearsElapsed < 10) {
        indexEstimate = 6.35 - ((yearsElapsed - 7) * 0.1); // Stabilization
      } else {
        indexEstimate = 6.05 + Math.sin(yearsElapsed / 4) * 0.5; // Cyclical pattern
      }

      newRate = indexEstimate + arm.marginPct;
    }

    // Apply caps
    const maxIncrease = resetCount === 1 ? arm.caps.initial : arm.caps.periodic;
    const maxDecrease = resetCount === 1 ? arm.caps.initial : arm.caps.periodic;

    if (newRate > currentRate + maxIncrease) {
      newRate = currentRate + maxIncrease;
    } else if (newRate < currentRate - maxDecrease) {
      newRate = currentRate - maxDecrease;
    }

    // Apply lifetime cap
    if (newRate > baseRate + arm.caps.lifetime) {
      newRate = baseRate + arm.caps.lifetime;
    }

    currentRate = Math.round(newRate * 1000) / 1000;

    // Calculate payment for this period
    const remainingBalance = loanAmount; // Simplified - should track actual balance
    const payment = calculatePayment(
      remainingBalance,
      currentRate,
      termMonths - month + 1,
      Math.max(0, ioMonths - month + 1),
      1
    );

    const periodEnd = Math.min(month + arm.resetFreqMonths - 1, termMonths);

    schedule.push({
      periodStart: month,
      periodEnd,
      rate: currentRate,
      payment,
      type: "adjustable"
    });

    month = periodEnd + 1;
  }

  return schedule;
};

const calculateAmortization = (
  loanAmount: number,
  ratePct: number,
  termMonths: number,
  ioMonths: number = 0,
  armSchedule?: any[],
  months: number = 12
) => {
  const schedule = [];
  let balance = loanAmount;

  for (let month = 1; month <= Math.min(months, termMonths); month++) {
    // Get rate for this month (ARM or fixed)
    let currentRate = ratePct;
    if (armSchedule) {
      const period = armSchedule.find(
        p => month >= p.periodStart && month <= p.periodEnd
      );
      if (period) {
        currentRate = period.rate;
      }
    }

    const monthlyRate = currentRate / 100 / 12;
    const payment = calculatePayment(
      balance,
      currentRate,
      termMonths - month + 1,
      Math.max(0, ioMonths - month + 1),
      1
    );

    const interest = Math.round(balance * monthlyRate * 100) / 100;
    const principal =
      month <= ioMonths ? 0 : Math.round((payment - interest) * 100) / 100;

    balance = Math.round((balance - principal) * 100) / 100;

    schedule.push({
      month,
      payment,
      principal,
      interest,
      balance,
      rate: currentRate
    });
  }

  return schedule;
};

const tool: ToolSpec<typeof inputSchema, typeof outputSchema> = {
  slug: "payment-calculator",
  name: "Payment Calculator",
  description:
    "Calculate mortgage payments with P&I/PITIA, IO periods, and ARM support",
  category: "calculator",
  executionMode: "server",
  version: "2.0.0",
  permissions: [],
  inputSchema,
  outputSchema,
  async execute(input, context) {
    let { loanAmount, purchasePrice, downPaymentAmount, downPaymentPercent, ratePct, termMonths, ioMonths, escrows, arm } = input;
    
    // Calculate loan amount if not provided directly
    if (!loanAmount && purchasePrice) {
      if (downPaymentPercent !== undefined) {
        downPaymentAmount = (purchasePrice * downPaymentPercent) / 100;
        loanAmount = purchasePrice - downPaymentAmount;
      } else if (downPaymentAmount !== undefined) {
        loanAmount = purchasePrice - downPaymentAmount;
        downPaymentPercent = (downPaymentAmount / purchasePrice) * 100;
      } else {
        // Default to 20% down if no down payment specified
        downPaymentAmount = purchasePrice * 0.2;
        loanAmount = purchasePrice - downPaymentAmount;
        downPaymentPercent = 20;
      }
    }
    
    // Ensure we have a valid loan amount
    loanAmount = loanAmount || 0;
    
    // Auto-calculate PMI if LTV > 80% and not already provided
    if (purchasePrice && !escrows?.pmiMonthly) {
      const ltv = loanAmount / purchasePrice;
      if (ltv > 0.80) {
        const annualPMIRate = ltv > 0.95 ? 0.0085 : ltv > 0.90 ? 0.0062 : 0.0045;
        const calculatedPMI = Math.round((loanAmount * annualPMIRate) / 12);
        escrows = {
          taxAnnual: escrows?.taxAnnual ?? 0,
          insuranceAnnual: escrows?.insuranceAnnual ?? 0,
          hoaMonthly: escrows?.hoaMonthly ?? 0,
          pmiMonthly: calculatedPMI
        };
      }
    }

    // Calculate base payment (P&I or IO)
    let effectiveRate = ratePct;
    let armSchedule: any[] | undefined;

    if (arm) {
      armSchedule = calculateARMSchedule(loanAmount, arm, termMonths, ioMonths);
      // Use first period rate for initial calculations
      effectiveRate = armSchedule[0]?.rate || ratePct;
    }

    // For display, show the current payment (IO if in IO period, amortizing otherwise)
    // But also calculate the amortizing payment that will kick in after IO
    const currentPayment = calculatePayment(
      loanAmount,
      effectiveRate,
      termMonths,
      ioMonths,
      1 // First month
    );

    // Calculate the amortizing payment (after IO period ends)
    const amortizingPayment =
      ioMonths > 0
        ? calculatePayment(
            loanAmount,
            effectiveRate,
            termMonths - ioMonths,
            0,
            1
          )
        : currentPayment;

    // Use the amortizing payment as the principalAndInterest for consistency
    const principalAndInterest = amortizingPayment;

    // Calculate IO payment if applicable
    const ioPayment =
      ioMonths > 0
        ? Math.round(((loanAmount * effectiveRate) / 100 / 12) * 100) / 100
        : undefined;

    // Calculate escrows
    const monthlyTaxes = escrows?.taxAnnual
      ? Math.round((escrows.taxAnnual / 12) * 100) / 100
      : 0;
    const monthlyInsurance = escrows?.insuranceAnnual
      ? Math.round((escrows.insuranceAnnual / 12) * 100) / 100
      : 0;
    const hoaMonthly = escrows?.hoaMonthly || 0;
    const pmiMonthly = escrows?.pmiMonthly || 0;

    // Calculate PITI and PITIA using current payment (IO or amortizing)
    const effectivePayment =
      ioMonths > 0 ? ioPayment || currentPayment : principalAndInterest;
    const piti =
      Math.round((effectivePayment + monthlyTaxes + monthlyInsurance) * 100) /
      100;
    const pitia = Math.round((piti + hoaMonthly) * 100) / 100;
    const totalMonthly = Math.round((pitia + pmiMonthly) * 100) / 100;

    // Generate amortization schedule
    const amortization = calculateAmortization(
      loanAmount,
      effectiveRate,
      termMonths,
      ioMonths,
      armSchedule,
      12
    );

    // Calculate totals
    let totalPayments = 0;
    let totalInterest = 0;

    // Simplified total calculation (would need full amortization for accuracy)
    if (ioMonths > 0) {
      const ioInterest = ioMonths * ((loanAmount * effectiveRate) / 100 / 12);
      const remainingMonths = termMonths - ioMonths;
      const amortizingPayment = calculatePayment(
        loanAmount,
        effectiveRate,
        remainingMonths,
        0,
        1
      );
      totalPayments = ioInterest + amortizingPayment * remainingMonths;
      totalInterest = totalPayments - loanAmount;
    } else {
      totalPayments = principalAndInterest * termMonths;
      totalInterest = totalPayments - loanAmount;
    }

    const effectiveRateCalc =
      Math.round(
        (totalInterest / loanAmount / (termMonths / 12)) * 100 * 1000
      ) / 1000;

    return {
      principalAndInterest,
      piti,
      pitia,
      totalMonthly,
      breakdown: {
        principal: principalAndInterest,
        interest: amortization[0]?.interest || 0,
        taxes: monthlyTaxes,
        insurance: monthlyInsurance,
        hoa: hoaMonthly,
        pmi: pmiMonthly
      },
      ioPayment,
      armSchedule,
      amortization,
      totals: {
        totalPayments: Math.round(totalPayments * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        effectiveRate: effectiveRateCalc
      }
    };
  }
};

export default tool;
