/**
 * Unit tests for Entity System Compatibility Layer
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeLegacySlug,
  isDotSlug,
  convertToDotSlug,
  convertFromDotSlug,
  isCompatibleSlug
} from '../compat';

describe('Entity Compatibility Layer', () => {
  describe('normalizeLegacySlug', () => {
    it('should convert kebab-case to dot-slug', () => {
      expect(normalizeLegacySlug('loan-scenario')).toBe('loan.scenario');
      expect(normalizeLegacySlug('analysis-report')).toBe('analysis.report');
      expect(normalizeLegacySlug('pricing-sheet')).toBe('pricing.sheet');
    });

    it('should preserve existing dot-slug format', () => {
      expect(normalizeLegacySlug('loan.scenario')).toBe('loan.scenario');
      expect(normalizeLegacySlug('analysis.eligibility_report')).toBe('analysis.eligibility_report');
    });

    it('should handle underscores in slug', () => {
      expect(normalizeLegacySlug('eligibility_report')).toBe('eligibility.report');
      expect(normalizeLegacySlug('loan_application')).toBe('loan.application');
    });

    it('should handle mixed separators', () => {
      expect(normalizeLegacySlug('loan-scenario_v2')).toBe('loan.scenario.v2');
      expect(normalizeLegacySlug('analysis_report-final')).toBe('analysis.report.final');
    });

    it('should handle single word slugs', () => {
      expect(normalizeLegacySlug('workspace')).toBe('workspace');
      expect(normalizeLegacySlug('document')).toBe('document');
    });
  });

  describe('isDotSlug', () => {
    it('should identify valid dot-slugs', () => {
      expect(isDotSlug('loan.scenario')).toBe(true);
      expect(isDotSlug('analysis.eligibility_report')).toBe(true);
      expect(isDotSlug('a.b.c.d')).toBe(true);
    });

    it('should reject non-dot-slugs', () => {
      expect(isDotSlug('loan-scenario')).toBe(false);
      expect(isDotSlug('loan_scenario')).toBe(false);
      expect(isDotSlug('workspace')).toBe(false);
      expect(isDotSlug('')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isDotSlug('.loan')).toBe(false);
      expect(isDotSlug('loan.')).toBe(false);
      expect(isDotSlug('loan..scenario')).toBe(false);
    });
  });

  describe('convertToDotSlug', () => {
    it('should convert various formats to dot-slug', () => {
      expect(convertToDotSlug('loan-scenario')).toBe('loan.scenario');
      expect(convertToDotSlug('loan_scenario')).toBe('loan.scenario');
      expect(convertToDotSlug('loan scenario')).toBe('loan.scenario');
      expect(convertToDotSlug('LOAN-SCENARIO')).toBe('loan.scenario');
    });

    it('should preserve existing dot-slugs', () => {
      expect(convertToDotSlug('loan.scenario')).toBe('loan.scenario');
      expect(convertToDotSlug('analysis.report')).toBe('analysis.report');
    });

    it('should handle complex cases', () => {
      expect(convertToDotSlug('loan-scenario-v2')).toBe('loan.scenario.v2');
      expect(convertToDotSlug('analysis_eligibility_report')).toBe('analysis.eligibility.report');
      expect(convertToDotSlug('Loan Scenario V2')).toBe('loan.scenario.v2');
    });

    it('should clean up special characters', () => {
      expect(convertToDotSlug('loan#scenario')).toBe('loan.scenario');
      expect(convertToDotSlug('loan@scenario!')).toBe('loan.scenario');
      expect(convertToDotSlug('loan--scenario')).toBe('loan.scenario');
    });

    it('should handle empty and single word inputs', () => {
      expect(convertToDotSlug('')).toBe('');
      expect(convertToDotSlug('workspace')).toBe('workspace');
      expect(convertToDotSlug('WORKSPACE')).toBe('workspace');
    });
  });

  describe('convertFromDotSlug', () => {
    it('should convert dot-slug to kebab-case', () => {
      expect(convertFromDotSlug('loan.scenario')).toBe('loan-scenario');
      expect(convertFromDotSlug('analysis.report')).toBe('analysis-report');
      expect(convertFromDotSlug('pricing.sheet')).toBe('pricing-sheet');
    });

    it('should handle underscores in original', () => {
      expect(convertFromDotSlug('analysis.eligibility_report')).toBe('analysis-eligibility_report');
      expect(convertFromDotSlug('loan.application_v2')).toBe('loan-application_v2');
    });

    it('should handle multi-level dot-slugs', () => {
      expect(convertFromDotSlug('loan.scenario.v2')).toBe('loan-scenario-v2');
      expect(convertFromDotSlug('analysis.report.final')).toBe('analysis-report-final');
    });

    it('should handle single word slugs', () => {
      expect(convertFromDotSlug('workspace')).toBe('workspace');
      expect(convertFromDotSlug('document')).toBe('document');
    });

    it('should preserve non-dot-slugs', () => {
      expect(convertFromDotSlug('loan-scenario')).toBe('loan-scenario');
      expect(convertFromDotSlug('loan_scenario')).toBe('loan_scenario');
    });
  });

  describe('isCompatibleSlug', () => {
    it('should match compatible slug variations', () => {
      expect(isCompatibleSlug('loan.scenario', 'loan-scenario')).toBe(true);
      expect(isCompatibleSlug('loan-scenario', 'loan.scenario')).toBe(true);
      expect(isCompatibleSlug('loan_scenario', 'loan.scenario')).toBe(true);
      expect(isCompatibleSlug('loan.scenario', 'loan_scenario')).toBe(true);
    });

    it('should match identical slugs', () => {
      expect(isCompatibleSlug('loan.scenario', 'loan.scenario')).toBe(true);
      expect(isCompatibleSlug('loan-scenario', 'loan-scenario')).toBe(true);
    });

    it('should reject incompatible slugs', () => {
      expect(isCompatibleSlug('loan.scenario', 'property.details')).toBe(false);
      expect(isCompatibleSlug('analysis.report', 'loan.scenario')).toBe(false);
      expect(isCompatibleSlug('workspace', 'document')).toBe(false);
    });

    it('should handle complex variations', () => {
      expect(isCompatibleSlug('loan-scenario-v2', 'loan.scenario.v2')).toBe(true);
      expect(isCompatibleSlug('analysis_eligibility_report', 'analysis.eligibility.report')).toBe(true);
      expect(isCompatibleSlug('Loan Scenario', 'loan.scenario')).toBe(true);
    });

    it('should handle empty and null cases', () => {
      expect(isCompatibleSlug('', '')).toBe(true);
      expect(isCompatibleSlug('loan.scenario', '')).toBe(false);
      expect(isCompatibleSlug('', 'loan.scenario')).toBe(false);
    });
  });

  describe('Integration scenarios', () => {
    it('should handle roundtrip conversion', () => {
      const original = 'loan-scenario';
      const dotSlug = convertToDotSlug(original);
      const backToKebab = convertFromDotSlug(dotSlug);

      expect(dotSlug).toBe('loan.scenario');
      expect(backToKebab).toBe('loan-scenario');
      expect(isCompatibleSlug(original, dotSlug)).toBe(true);
    });

    it('should handle legacy tool slug compatibility', () => {
      const legacyToolSlug = 'marketplace-search';
      const modernEntitySlug = 'loan.scenario';
      const legacyEntitySlug = 'loan-scenario';

      const normalizedLegacy = normalizeLegacySlug(legacyEntitySlug);
      expect(normalizedLegacy).toBe(modernEntitySlug);
      expect(isCompatibleSlug(legacyEntitySlug, modernEntitySlug)).toBe(true);
    });

    it('should handle mixed format compatibility', () => {
      const variations = [
        'loan-scenario',
        'loan_scenario',
        'loan.scenario',
        'LOAN-SCENARIO',
        'Loan Scenario'
      ];

      const normalized = variations.map(v => convertToDotSlug(v));
      const allEqual = normalized.every(n => n === 'loan.scenario');

      expect(allEqual).toBe(true);
    });
  });
});