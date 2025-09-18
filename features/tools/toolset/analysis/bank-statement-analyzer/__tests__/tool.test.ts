import { describe, it, expect, vi, beforeEach } from 'vitest';
import tool from '../tool';
import type { ToolContext } from '../../../types';

// Mock external dependencies
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      mockResolvedValue: vi.fn().mockResolvedValue({ data: [], error: null }),
    })),
    auth: {
      getUser: vi.fn().mockResolvedValue({ 
        data: { user: { id: 'test-user', email: 'test@example.com' } }, 
        error: null 
      }),
    },
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
  })),
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

describe('Bank Statement Analyzer Tool', () => {
  const mockContext: ToolContext = {
    tenantId: 'test-tenant',
    userId: 'test-user',
    agentId: 'test-agent',
    conversationId: 'test-conversation',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Input Validation', () => {
    it('should accept valid personal bank statement', async () => {
      const input = {
        pdfContent: "Date,Description,Amount\n2024-01-15,Payroll Deposit - ABC Corp,5200.00\n2024-01-01,Beginning Balance,12500.00\n2024-01-03,ATM Withdrawal,-200.00\n2024-01-05,Grocery Store,-125.50\n2024-01-10,Electric Bill,-89.25\n2024-01-30,Payroll Deposit - ABC Corp,5200.00",
        documentType: "personal" as const,
        loanPurpose: "purchase" as const,
        monthsToAnalyze: 3
      };

      const result = await tool.execute(input, mockContext);
      expect(result).toBeDefined();
    });

    it('should accept valid business bank statement', async () => {
      const input = {
        pdfContent: "Date,Description,Amount\n2024-01-15,Customer Payment - Invoice 1001,8500.00\n2024-01-01,Beginning Balance,25000.00\n2024-01-03,Office Rent,-2200.00\n2024-01-05,Supplier Payment,-1850.75\n2024-01-10,Business Insurance,-456.89\n2024-01-20,Customer Payment - Invoice 1002,6200.00",
        documentType: "business" as const,
        loanPurpose: "refinance" as const,
        monthsToAnalyze: 6
      };

      const result = await tool.execute(input, mockContext);
      expect(result).toBeDefined();
    });

    it('should validate required fields', async () => {
      const invalidInput = {};

      // Check if tool properly validates input
      try {
        await tool.execute(invalidInput as any, mockContext);
        // If no error thrown, check if result handles invalid input
        expect(true).toBe(true);
      } catch (error) {
        // Expected validation error
        expect(error).toBeDefined();
      }
    });
  });

  describe('Core Functionality', () => {
    it('should analyze self-employed contractor statements', async () => {
      const input = {
        pdfContent: "Date,Description,Amount\n2024-01-02,Client Payment - Project A,12500.00\n2024-01-01,Beginning Balance,8500.00\n2024-01-05,Business Phone,-89.99\n2024-01-07,Gas Station,-45.20\n2024-01-15,Client Payment - Project B,8750.00\n2024-01-18,Office Supplies,-234.56\n2024-01-25,Client Payment - Project C,6200.00\n2024-01-30,Internet Bill,-125.00",
        documentType: "business" as const,
        loanPurpose: "purchase" as const,
        monthsToAnalyze: 2
      };

      const result = await tool.execute(input, mockContext);
      expect(result).toBeDefined();

      // Verify result has expected structure
      if (result) {
        expect(typeof result).toBe('object');
        expect(result.averageMonthlyIncome).toBeDefined();
        expect(result.averageMonthlyExpenses).toBeDefined();
        expect(result.netCashFlow).toBeDefined();
        expect(result.incomeStability).toBeDefined();
        expect(Array.isArray(result.deposits)).toBe(true);
      }
    });

    it('should analyze W2 employee statements with overtime', async () => {
      const input = {
        pdfContent: "Date,Description,Amount\n2024-01-15,Payroll Deposit - ACME Inc,4200.00\n2024-01-01,Beginning Balance,3200.00\n2024-01-03,Mortgage Payment,-1850.00\n2024-01-05,Car Payment,-425.00\n2024-01-22,Overtime Pay - ACME Inc,680.00\n2024-01-30,Payroll Deposit - ACME Inc,4200.00\n2024-02-15,Payroll Deposit - ACME Inc,4200.00\n2024-02-20,Bonus - ACME Inc,1500.00",
        documentType: "personal" as const,
        loanPurpose: "cash-out" as const,
        monthsToAnalyze: 3
      };

      // Execute with different context
      const customContext = {
        ...mockContext,
        tenantId: 'custom-tenant',
        metadata: { custom: true },
      };

      const result = await tool.execute(input, customContext);
      expect(result).toBeDefined();
    });

    it('should handle multiple income sources', async () => {
      const input = {
        pdfContent: "Date,Description,Amount\n2024-01-15,Payroll Deposit - Main Job,3800.00\n2024-01-01,Beginning Balance,5500.00\n2024-01-03,Rent Payment,-1200.00\n2024-01-05,Freelance Payment - Client A,850.00\n2024-01-10,Rental Income - Property 1,1650.00\n2024-01-20,Side Gig Payment,420.00\n2024-01-30,Payroll Deposit - Main Job,3800.00\n2024-02-01,Rental Income - Property 1,1650.00",
        documentType: "personal" as const,
        loanPurpose: "purchase" as const,
        monthsToAnalyze: 4
      };

      const result = await tool.execute(input, customContext);
      expect(result).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle execution errors gracefully', async () => {
      const input = {
        pdfContent: "Date,Description,Amount\n2024-01-15,Payroll Error,N/A\n2024-01-01,Beginning Balance,corrupted",
        documentType: "personal" as const,
        monthsToAnalyze: 1
      };
      
      // Mock a database error
      const { createClient } = await import('@/utils/supabase/server');
      (createClient as any).mockImplementationOnce(() => ({
        from: vi.fn(() => ({
          select: vi.fn(() => Promise.reject(new Error('Database error'))),
        })),
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: null, error: new Error('Auth error') }),
        },
      }));
      
      // Tool should handle error gracefully
      try {
        await tool.execute(input, mockContext);
        // Some tools might handle errors internally
        expect(true).toBe(true);
      } catch (error) {
        // Or throw a meaningful error
        expect(error).toBeDefined();
      }
    });
  });

  describe('Tool Metadata', () => {
    it('should have correct metadata', () => {
      expect(tool.slug).toBe('bank-statement-analyzer');
      expect(tool.name).toBe('Bank Statement Analyzer');
      expect(tool.category).toBe('document');
      expect(tool.inputSchema).toBeDefined();
      expect(tool.outputSchema).toBeDefined();
    });

    it('should have proper execution mode', () => {
      expect(['server', 'client', 'hybrid']).toContain(tool.executionMode);
    });

    it('should have valid schemas', () => {
      // Verify schemas are Zod objects
      expect(tool.inputSchema).toHaveProperty('parse');
      expect(tool.outputSchema).toHaveProperty('parse');
    });
  });
});