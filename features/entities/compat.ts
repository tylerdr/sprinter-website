/**
 * Entity System Compatibility Layer
 * Provides backward compatibility while migrating to dot-slug architecture
 */

// ============================================
// SLUG NORMALIZATION
// ============================================

/**
 * Map of legacy slugs to dot-slug format
 */
const SLUG_MAPPINGS: Record<string, string> = {
  // Legacy to dot-slug mappings
  'loan_scenario': 'loan.scenario',
  'lead': 'lead.contact',
  'lead_activity': 'lead.activity',
  'eligibility_report': 'analysis.eligibility_report',
  'lender_result': 'analysis.lender_result',
  'pricing_sheet': 'analysis.pricing_sheet',
  'document_analysis': 'analysis.document',
  'bank_statement': 'analysis.bank_statement',
  'credit_report': 'analysis.credit_report',
  'income_verification': 'analysis.income_verification',
  'prequalification_letter': 'analysis.prequalification_letter',
  'refinance_analysis': 'analysis.refinance_analysis',
  'scenario_comparison': 'analysis.scenario_comparison',
  'rate_tracking': 'analysis.rate_tracking',

  // Already dot-slug (no change needed)
  'loan.scenario': 'loan.scenario',
  'lead.contact': 'lead.contact',
  'analysis.eligibility_report': 'analysis.eligibility_report',
  'analysis.lender_result': 'analysis.lender_result',
  'analysis.pricing_sheet': 'analysis.pricing_sheet',
  'analysis.document': 'analysis.document',
  'workspace': 'workspace',
};

/**
 * Normalize entity type slug to dot-notation
 */
export function normalizeTypeSlug(slug: string): string {
  if (!slug) return slug;

  // Check if we have a direct mapping
  if (SLUG_MAPPINGS[slug]) {
    return SLUG_MAPPINGS[slug];
  }

  // If it already has a dot, assume it's already normalized
  if (slug.includes('.')) {
    return slug;
  }

  // If it has underscores, try to infer namespace
  if (slug.includes('_')) {
    // Common patterns
    if (slug.startsWith('loan_')) {
      return slug.replace('loan_', 'loan.');
    }
    if (slug.startsWith('lead_')) {
      return slug.replace('lead_', 'lead.');
    }
    if (slug.endsWith('_report') || slug.endsWith('_analysis') || slug.endsWith('_sheet')) {
      return `analysis.${slug}`;
    }
  }

  // Default: return as-is (might be a simple slug like 'workspace')
  return slug;
}

/**
 * Convert dot-slug back to legacy format (for backward compatibility)
 */
export function denormalizeTypeSlug(slug: string): string {
  if (!slug) return slug;

  // Find reverse mapping
  for (const [legacy, dotSlug] of Object.entries(SLUG_MAPPINGS)) {
    if (dotSlug === slug && !legacy.includes('.')) {
      return legacy;
    }
  }

  // If no mapping found, convert dots to underscores
  return slug.replace(/\./g, '_');
}

/**
 * Extract namespace from a slug
 */
export function extractNamespace(slug: string): string | null {
  const normalized = normalizeTypeSlug(slug);

  if (normalized.includes('.')) {
    return normalized.split('.')[0];
  }

  return null;
}

/**
 * Extract base name from a slug (without namespace)
 */
export function extractBaseName(slug: string): string {
  const normalized = normalizeTypeSlug(slug);

  if (normalized.includes('.')) {
    return normalized.split('.').slice(1).join('.');
  }

  return normalized;
}

// ============================================
// ARTIFACT COMPATIBILITY
// ============================================

/**
 * Map artifact kinds to entity types
 */
const ARTIFACT_TO_ENTITY_MAPPINGS: Record<string, string> = {
  'eligibility_report': 'analysis.eligibility_report',
  'lender_result': 'analysis.lender_result',
  'pricing_sheet': 'analysis.pricing_sheet',
  'document': 'analysis.document',
  'bank_statement': 'analysis.bank_statement',
  'credit_report': 'analysis.credit_report',
  'income_verification': 'analysis.income_verification',
  'prequalification_letter': 'analysis.prequalification_letter',
  'refinance_analysis': 'analysis.refinance_analysis',
  'scenario_comparison': 'analysis.scenario_comparison',
  'rate_tracking': 'analysis.rate_tracking',
};

/**
 * Convert artifact kind to entity type slug
 */
export function artifactKindToEntityType(kind: string): string {
  return ARTIFACT_TO_ENTITY_MAPPINGS[kind] || `artifact.${kind}`;
}

/**
 * Convert entity type to artifact kind
 */
export function entityTypeToArtifactKind(typeSlug: string): string {
  // Find reverse mapping
  for (const [kind, entityType] of Object.entries(ARTIFACT_TO_ENTITY_MAPPINGS)) {
    if (entityType === typeSlug) {
      return kind;
    }
  }

  // Default: remove namespace
  return extractBaseName(typeSlug);
}

// ============================================
// FIELD MAPPING COMPATIBILITY
// ============================================

/**
 * Map legacy field names to new structure
 */
const FIELD_MAPPINGS: Record<string, Record<string, string>> = {
  'loan.scenario': {
    // Legacy field -> New field path
    'fico_score': 'borrower.fico',
    'credit_score': 'borrower.fico',
    'debt_to_income': 'borrower.dti',
    'dti_ratio': 'borrower.dti',
    'monthly_income': 'borrower.income.gross_monthly',
    'gross_income': 'borrower.income.gross_monthly',
    'property_type': 'property.type',
    'property_state': 'property.state',
    'purchase_price': 'property.value',
    'loan_amount': 'loan.amount',
    'loan_purpose': 'loan.purpose',
    'loan_type': 'loan.loanType',
    'loan_term': 'loan.term',
    'down_payment': 'loan.downPayment',
    'interest_rate': 'loan.requestedRate',
  },
};

/**
 * Map legacy fields to new structure
 */
export function mapLegacyFields(
  typeSlug: string,
  data: Record<string, any>
): Record<string, any> {
  const normalizedSlug = normalizeTypeSlug(typeSlug);
  const mappings = FIELD_MAPPINGS[normalizedSlug];

  if (!mappings) return data;

  const result = { ...data };

  // Apply field mappings
  for (const [oldField, newPath] of Object.entries(mappings)) {
    if (oldField in data) {
      // Set nested field value
      setNestedValue(result, newPath, data[oldField]);
      // Remove old field
      delete result[oldField];
    }
  }

  return result;
}

/**
 * Set a nested field value using dot notation
 */
function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

/**
 * Get a nested field value using dot notation
 */
export function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current?.[key] === undefined) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}

// ============================================
// WORKSPACE COMPATIBILITY
// ============================================

/**
 * Check if an entity type should be a workspace
 */
export function isWorkspaceType(typeSlug: string): boolean {
  const normalized = normalizeTypeSlug(typeSlug);

  const workspaceTypes = [
    'workspace',
    'loan.scenario',
    'lead.pipeline',
    'analysis.project',
  ];

  return workspaceTypes.includes(normalized);
}

/**
 * Get default workspace type for a context
 */
export function getDefaultWorkspaceType(context?: {
  tenantType?: string;
  toolSlug?: string;
  agentSlug?: string;
}): string {
  if (!context) return 'workspace';

  // Based on tenant type
  if (context.tenantType === 'lender' || context.tenantType === 'broker') {
    return 'loan.scenario';
  }

  // Based on tool
  if (context.toolSlug) {
    if (context.toolSlug.includes('lead') || context.toolSlug.includes('crm')) {
      return 'lead.pipeline';
    }
    if (context.toolSlug.includes('loan') || context.toolSlug.includes('mortgage')) {
      return 'loan.scenario';
    }
  }

  // Based on agent
  if (context.agentSlug) {
    if (context.agentSlug.includes('loan') || context.agentSlug.includes('mortgage')) {
      return 'loan.scenario';
    }
  }

  return 'workspace';
}

// ============================================
// MIGRATION UTILITIES
// ============================================

/**
 * Migrate entity data to new structure
 */
export function migrateEntityData(
  typeSlug: string,
  data: any,
  version?: number
): any {
  const normalized = normalizeTypeSlug(typeSlug);

  // Apply field mappings
  let migrated = mapLegacyFields(normalized, data);

  // Add version info
  if (version !== undefined) {
    migrated._migrationVersion = version;
    migrated._migratedAt = new Date().toISOString();
  }

  return migrated;
}

/**
 * Check if entity needs migration
 */
export function needsMigration(entity: any): boolean {
  // Check if using old slug format
  if (entity.type_slug && !entity.type_slug.includes('.')) {
    // Skip simple slugs like 'workspace'
    if (entity.type_slug !== 'workspace') {
      return true;
    }
  }

  // Check if missing full_slug
  if (!entity.full_slug && entity.type_slug) {
    return true;
  }

  // Check if has legacy fields
  const legacyFields = [
    'fico_score',
    'credit_score',
    'debt_to_income',
    'monthly_income',
    'property_type',
    'loan_amount',
  ];

  if (entity.state_json) {
    for (const field of legacyFields) {
      if (field in entity.state_json) {
        return true;
      }
    }
  }

  return false;
}

// ============================================
// BACKWARD COMPATIBILITY WRAPPERS
// ============================================

/**
 * Wrap entity for backward compatibility
 */
export function wrapEntityForCompat(entity: any): any {
  if (!entity) return entity;

  return {
    ...entity,
    // Provide both formats
    type_slug: entity.type_slug,
    typeSlug: normalizeTypeSlug(entity.type_slug),
    full_slug: entity.full_slug || normalizeTypeSlug(entity.type_slug),

    // Legacy field access
    get state() {
      return entity.state_json;
    },
    get data() {
      return entity.state_json;
    },
  };
}

/**
 * Unwrap entity from compatibility wrapper
 */
export function unwrapEntityFromCompat(wrapped: any): any {
  if (!wrapped) return wrapped;

  const { state, data, typeSlug, ...entity } = wrapped;
  return entity;
}

// ============================================
// ADDITIONAL COMPATIBILITY FUNCTIONS FOR TESTS
// ============================================

/**
 * Alias for normalizeTypeSlug with enhanced kebab-case handling
 */
export function normalizeLegacySlug(slug: string): string {
  if (!slug) return slug;

  // Convert kebab-case to dot notation
  if (slug.includes('-') && !slug.includes('.')) {
    return slug.replace(/-/g, '.');
  }

  // Use the standard normalization
  return normalizeTypeSlug(slug);
}

/**
 * Check if a slug is in dot notation
 */
export function isDotSlug(slug: string): boolean {
  if (!slug || slug.length === 0) return false;
  if (slug.startsWith('.') || slug.endsWith('.')) return false;
  if (slug.includes('..')) return false;
  return slug.includes('.');
}

/**
 * Convert any format to dot-slug
 */
export function convertToDotSlug(slug: string): string {
  if (!slug) return '';

  // If already in dot notation, return as is
  if (isDotSlug(slug) && !slug.includes('-') && !slug.includes('_')) {
    return slug.toLowerCase();
  }

  // Convert to lowercase and replace separators
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '.') // Replace special chars with dots
    .replace(/[-_]/g, '.')          // Replace dashes and underscores
    .replace(/\.+/g, '.')           // Collapse multiple dots
    .replace(/^\.|\.$/g, '');       // Remove leading/trailing dots
}

/**
 * Convert dot-slug back to kebab-case
 */
export function convertFromDotSlug(slug: string): string {
  if (!slug) return slug;

  // Only convert if it's actually a dot-slug
  if (!isDotSlug(slug)) {
    return slug;
  }

  // Replace dots with dashes, but preserve underscores
  return slug.replace(/\./g, '-');
}

/**
 * Check if two slugs are compatible (same after normalization)
 */
export function isCompatibleSlug(slug1: string, slug2: string): boolean {
  const normalized1 = convertToDotSlug(slug1);
  const normalized2 = convertToDotSlug(slug2);
  return normalized1 === normalized2;
}

// ============================================
// EXPORTS
// ============================================

export default {
  normalizeTypeSlug,
  denormalizeTypeSlug,
  extractNamespace,
  extractBaseName,
  artifactKindToEntityType,
  entityTypeToArtifactKind,
  mapLegacyFields,
  getNestedValue,
  isWorkspaceType,
  getDefaultWorkspaceType,
  migrateEntityData,
  needsMigration,
  wrapEntityForCompat,
  unwrapEntityFromCompat,
  // Additional exports for tests
  normalizeLegacySlug,
  isDotSlug,
  convertToDotSlug,
  convertFromDotSlug,
  isCompatibleSlug,
};