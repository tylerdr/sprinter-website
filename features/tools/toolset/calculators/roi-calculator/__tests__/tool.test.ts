import { describe, it, expect } from "vitest";
import tool from "../tool";

describe("Payment Calculator with IO and ARM", () => {
  const baseContext = {
    userId: "test-user",
    tenantId: "test-tenant",
    preloaded: { fieldOptions: {}, datasets: {} },
    getOptions: () => [],
    getDataset: () => []
  };

  describe("Standard Amortizing Loans", () => {
    it("should calculate standard 30-year fixed payment", async () => {
      const result = await tool.execute({
        loanAmount: 400000,
        ratePct: 7.5,
        termMonths: 360,
        ioMonths: 0
      }, baseContext);

      expect(result.principalAndInterest).toBeCloseTo(2796.86, 1);
      expect(result.piti).toBe(result.principalAndInterest); // No escrows
      expect(result.totals.totalInterest).toBeGreaterThan(600000);
    });

    it("should calculate PITIA with escrows", async () => {
      const result = await tool.execute({
        loanAmount: 350000,
        ratePct: 7.0,
        termMonths: 360,
        ioMonths: 0,
        escrows: {
          taxAnnual: 4800,
          insuranceAnnual: 1000,
          hoaMonthly: 250,
          pmiMonthly: 150
        }
      }, baseContext);

      const expectedPI = 2328.56;
      const expectedTaxes = 400;
      const expectedInsurance = 83.33;
      
      expect(result.principalAndInterest).toBeCloseTo(expectedPI, 1);
      expect(result.breakdown.taxes).toBeCloseTo(expectedTaxes, 1);
      expect(result.breakdown.insurance).toBeCloseTo(expectedInsurance, 1);
      expect(result.breakdown.hoa).toBe(250);
      expect(result.breakdown.pmi).toBe(150);
      
      expect(result.piti).toBeCloseTo(expectedPI + expectedTaxes + expectedInsurance, 1);
      expect(result.pitia).toBeCloseTo(result.piti + 250, 1);
      expect(result.totalMonthly).toBeCloseTo(result.pitia + 150, 1);
    });

    it("should handle zero interest rate", async () => {
      const result = await tool.execute({
        loanAmount: 120000,
        ratePct: 0,
        termMonths: 120,
        ioMonths: 0
      }, baseContext);

      expect(result.principalAndInterest).toBe(1000); // 120000 / 120
      expect(result.totals.totalInterest).toBe(0);
      expect(result.amortization[0].interest).toBe(0);
      expect(result.amortization[0].principal).toBe(1000);
    });
  });

  describe("Interest-Only Loans", () => {
    it("should calculate IO payment for first 60 months", async () => {
      const result = await tool.execute({
        loanAmount: 500000,
        ratePct: 8.0,
        termMonths: 360,
        ioMonths: 60
      }, baseContext);

      const expectedIOPayment = 3333.33; // 500000 * 0.08 / 12
      
      expect(result.ioPayment).toBeCloseTo(expectedIOPayment, 1);
      expect(result.amortization[0].payment).toBeCloseTo(expectedIOPayment, 1);
      expect(result.amortization[0].principal).toBe(0);
      expect(result.amortization[0].interest).toBeCloseTo(expectedIOPayment, 1);
      expect(result.amortization[0].balance).toBe(500000); // No principal reduction
    });

    it("should calculate correct payment after IO period", async () => {
      const result = await tool.execute({
        loanAmount: 400000,
        ratePct: 7.5,
        termMonths: 360,
        ioMonths: 60
      }, baseContext);

      // IO payment
      const expectedIOPayment = 2500; // 400000 * 0.075 / 12
      expect(result.ioPayment).toBeCloseTo(expectedIOPayment, 1);
      
      // After IO, 300 months remaining to amortize full balance
      // Payment should be higher than standard 30-year
      expect(result.principalAndInterest).toBeGreaterThan(2796); // Standard 30-year payment
    });

    it("should handle IO with escrows", async () => {
      const result = await tool.execute({
        loanAmount: 450000,
        ratePct: 8.0,
        termMonths: 360,
        ioMonths: 120,
        escrows: {
          taxAnnual: 6000,
          insuranceAnnual: 1200,
          hoaMonthly: 100,
          pmiMonthly: 0
        }
      }, baseContext);

      const ioPayment = 3000; // 450000 * 0.08 / 12
      const monthlyTaxes = 500;
      const monthlyInsurance = 100;
      
      expect(result.ioPayment).toBeCloseTo(ioPayment, 1);
      expect(result.piti).toBeCloseTo(ioPayment + monthlyTaxes + monthlyInsurance, 1);
      expect(result.pitia).toBeCloseTo(result.piti + 100, 1);
    });
  });

  describe("ARM Loans", () => {
    it("should calculate 5/1 ARM with initial rate", async () => {
      const result = await tool.execute({
        loanAmount: 400000,
        ratePct: 6.5,
        termMonths: 360,
        ioMonths: 0,
        arm: {
          marginPct: 2.75,
          initialRatePct: 6.5,
          caps: {
            initial: 2,
            periodic: 2,
            lifetime: 5
          },
          resetFreqMonths: 12,
          initialFixedMonths: 60,
          indexCurve: [5.0, 5.5, 6.0, 5.75, 5.25] // Test with static curve
        }
      }, baseContext);

      expect(result.armSchedule).toBeDefined();
      expect(result.armSchedule!.length).toBeGreaterThan(0);
      
      // First period should be fixed at initial rate
      const firstPeriod = result.armSchedule![0];
      expect(firstPeriod.periodStart).toBe(1);
      expect(firstPeriod.periodEnd).toBe(60);
      expect(firstPeriod.rate).toBe(6.5);
      expect(firstPeriod.type).toBe("fixed");
      
      // Second period should be adjustable
      if (result.armSchedule!.length > 1) {
        const secondPeriod = result.armSchedule![1];
        expect(secondPeriod.type).toBe("adjustable");
        // Rate = index + margin, subject to caps
        const expectedRate = Math.min(6.5 + 2, 5.5 + 2.75); // Initial cap of 2%
        expect(secondPeriod.rate).toBeCloseTo(expectedRate, 1);
      }
    });

    it("should respect ARM caps", async () => {
      const result = await tool.execute({
        loanAmount: 500000,
        ratePct: 5.0,
        termMonths: 360,
        ioMonths: 0,
        arm: {
          marginPct: 2.5,
          initialRatePct: 5.0,
          caps: {
            initial: 2,
            periodic: 1,
            lifetime: 5
          },
          resetFreqMonths: 12,
          initialFixedMonths: 60,
          indexCurve: [4.0, 7.0, 8.0, 3.0] // Big jumps to test caps
        }
      }, baseContext);

      const schedule = result.armSchedule!;
      
      // First reset: index 7.0 + margin 2.5 = 9.5, but capped at 5.0 + 2 = 7.0
      if (schedule.length > 1) {
        expect(schedule[1].rate).toBeLessThanOrEqual(7.0);
      }
      
      // Lifetime cap: 5.0 + 5 = 10.0 max
      for (const period of schedule) {
        expect(period.rate).toBeLessThanOrEqual(10.0);
      }
    });

    it("should handle ARM with IO period", async () => {
      const result = await tool.execute({
        loanAmount: 600000,
        ratePct: 7.0,
        termMonths: 360,
        ioMonths: 60,
        arm: {
          marginPct: 3.0,
          initialRatePct: 7.0,
          caps: {
            initial: 2,
            periodic: 2,
            lifetime: 6
          },
          resetFreqMonths: 12,
          initialFixedMonths: 60
        }
      }, baseContext);

      expect(result.ioPayment).toBeDefined();
      expect(result.armSchedule).toBeDefined();
      
      // First period should be IO
      const firstPeriod = result.armSchedule![0];
      expect(firstPeriod.type).toBe("io");
      
      // Amortization should show IO for first 60 months
      expect(result.amortization[0].principal).toBe(0);
      expect(result.amortization[0].balance).toBe(600000);
    });
  });

  describe("Amortization Schedule", () => {
    it("should generate correct amortization for first 12 months", async () => {
      const result = await tool.execute({
        loanAmount: 300000,
        ratePct: 6.5,
        termMonths: 360,
        ioMonths: 0
      }, baseContext);

      expect(result.amortization).toHaveLength(12);
      
      // Check first month
      const month1 = result.amortization[0];
      expect(month1.month).toBe(1);
      expect(month1.interest).toBeCloseTo(1625, 1); // 300000 * 0.065 / 12
      expect(month1.principal).toBeGreaterThan(0);
      expect(month1.payment).toBe(month1.principal + month1.interest);
      
      // Check balance decreases
      expect(result.amortization[11].balance).toBeLessThan(300000);
      
      // Each month principal should increase, interest should decrease
      for (let i = 1; i < 12; i++) {
        expect(result.amortization[i].principal).toBeGreaterThan(result.amortization[i-1].principal);
        expect(result.amortization[i].interest).toBeLessThan(result.amortization[i-1].interest);
      }
    });

    it("should show rate changes in ARM amortization", async () => {
      const result = await tool.execute({
        loanAmount: 400000,
        ratePct: 6.0,
        termMonths: 360,
        ioMonths: 0,
        arm: {
          marginPct: 2.5,
          initialRatePct: 6.0,
          caps: {
            initial: 2,
            periodic: 2,
            lifetime: 5
          },
          resetFreqMonths: 6, // Reset every 6 months for testing
          initialFixedMonths: 6,
          indexCurve: [5.0, 5.5]
        }
      }, baseContext);

      // First 6 months at initial rate
      for (let i = 0; i < 6; i++) {
        expect(result.amortization[i].rate).toBe(6.0);
      }
      
      // After month 6, rate may change
      if (result.amortization.length > 6) {
        // New rate would be 5.5 + 2.5 = 8.0, but capped at 6.0 + 2 = 8.0
        expect(result.amortization[6].rate).toBeLessThanOrEqual(8.0);
      }
    });
  });

  describe("Edge Cases", () => {
    it("should handle very short loan term", async () => {
      const result = await tool.execute({
        loanAmount: 10000,
        ratePct: 5.0,
        termMonths: 12,
        ioMonths: 0
      }, baseContext);

      expect(result.amortization).toHaveLength(12);
      expect(result.amortization[11].balance).toBeCloseTo(0, 1);
    });

    it("should handle IO period equal to loan term", async () => {
      const result = await tool.execute({
        loanAmount: 100000,
        ratePct: 6.0,
        termMonths: 60,
        ioMonths: 60
      }, baseContext);

      // All payments should be interest-only
      expect(result.ioPayment).toBeCloseTo(500, 1); // 100000 * 0.06 / 12
      
      for (const month of result.amortization) {
        expect(month.principal).toBe(0);
        expect(month.balance).toBe(100000);
      }
    });

    it("should handle high interest rate", async () => {
      const result = await tool.execute({
        loanAmount: 50000,
        ratePct: 25.0,
        termMonths: 60,
        ioMonths: 0
      }, baseContext);

      expect(result.principalAndInterest).toBeGreaterThan(1000);
      expect(result.totals.totalInterest).toBeGreaterThan(25000);
    });
  });

  describe("Totals Calculation", () => {
    it("should calculate correct totals for standard loan", async () => {
      const result = await tool.execute({
        loanAmount: 200000,
        ratePct: 6.0,
        termMonths: 360,
        ioMonths: 0
      }, baseContext);

      expect(result.totals.totalPayments).toBeCloseTo(
        result.principalAndInterest * 360, 
        1
      );
      expect(result.totals.totalInterest).toBe(
        result.totals.totalPayments - 200000
      );
      expect(result.totals.effectiveRate).toBeGreaterThan(0);
    });

    it("should calculate correct totals for IO loan", async () => {
      const result = await tool.execute({
        loanAmount: 300000,
        ratePct: 7.0,
        termMonths: 360,
        ioMonths: 60
      }, baseContext);

      const ioTotal = result.ioPayment! * 60;
      const amortizingTotal = result.principalAndInterest * 300; // Approximate
      
      expect(result.totals.totalInterest).toBeGreaterThan(300000); // More than principal
      // Effective rate should be reasonable but not necessarily higher than nominal
      expect(result.totals.effectiveRate).toBeGreaterThan(0);
    });
  });
});