# Tools Module TODO

Based on the 7-stage release plan for the AI Sprinter architecture.

## Stage 1: Foundation (Fannie Tool) ✅ Partially Complete
- [x] Fannie tool copied to features/tools/guidelines/fannie-mae-web-search
- [ ] Create proper registry.ts with lazy loading
  - [x] Basic registry exists
  - [ ] Add all tool imports
  - [ ] Implement lazy loading pattern
- [ ] Create loader.ts for AI SDK integration
  - [ ] buildToolsetForAgent function
  - [ ] Tool key sanitization
  - [ ] Dynamic tool loading
- [ ] Create integration.ts
  - [ ] Tool builder utilities
  - [ ] Context injection
- [ ] API endpoint for tool execution
  - [ ] Create app/api/tool/execute/route.ts
  - [ ] Input validation
  - [ ] Error handling
- [ ] Tool page implementation
  - [ ] Create app/(app)/tool/[slug]/page.tsx
  - [ ] Feature flag gate (MQ_AI_V1_ENABLED)
  - [ ] Tool UI rendering

## Stage 3: Citation Support
- [ ] Update Fannie tool for citations
  - [ ] Return source URLs in output
  - [ ] Format citations in response
- [ ] Integration with citation system
  - [ ] Use lib/ai/citations/normalize.ts
  - [ ] Format inline [n] markers

## Stage 5: Additional Tools ✅ Partially Complete
- [x] Web search tool copied to features/tools/search/web-search
- [x] DSCR calculator copied to features/tools/calculators/dscr-calculator
- [ ] Complete tool implementations
  - [ ] Web search execute function
  - [ ] DSCR calculation logic
  - [ ] UI components for both
- [ ] Add to registry
  - [ ] Import statements
  - [ ] Lazy loading entries

## Stage 6: Database Integration
- [ ] Tool migration to database
  - [ ] Create migration endpoint
  - [ ] Sync tools to DB
  - [ ] Store schemas in JSONB
- [ ] Dynamic tool loading from DB
  - [ ] Query tools table
  - [ ] Compile schemas at runtime
  - [ ] Cache tool configs

## Stage 7: Remaining Tools Migration
- [ ] Calculators (from lib/agents/tools/calculators)
  - [ ] ltv-calculator
  - [ ] dti-calculator
  - [ ] payment-calculator
  - [ ] refinance-calculator
  - [ ] affordability-calculator
- [ ] Guidelines (from lib/agents/tools/guidelines)
  - [ ] fha-guide-search
  - [ ] va-guide-search
  - [ ] usda-guide-search
- [ ] Search tools (from lib/agents/tools/search)
  - [ ] lender-search
  - [ ] program-search
  - [ ] marketplace-search
- [ ] Content tools (from lib/agents/tools/content)
  - [ ] blog-generator
  - [ ] social-post-generator
- [ ] Analysis tools
  - [ ] bank-statement-analyzer
- [ ] Utility tools
  - [ ] scenario-share
  - [ ] contact-capture
  - [ ] delegate-agent
- [ ] Remove old lib/agents/tools directory

## Current Tool Status
```
✅ Copied to features/:
- fannie-mae-web-search
- web-search
- dscr-calculator

⏳ Need migration:
- 15+ tools from lib/agents/tools/
```

## Testing Requirements
- [ ] Unit tests for each tool
  - [ ] Input validation
  - [ ] Execute function
  - [ ] Output formatting
- [ ] UI component tests
  - [ ] Result rendering
  - [ ] Input forms
  - [ ] Error states
- [ ] Integration tests
  - [ ] API endpoint
  - [ ] Tool execution flow
- [ ] E2E tests
  - [ ] Tool page usage
  - [ ] Chat tool integration

## Verification Commands
```bash
# Stage 1
test -f features/tools/guidelines/fannie-mae-web-search/tool.ts
test -f app/api/tool/execute/route.ts

# Stage 5
grep "web-search\|dscr-calculator" features/tools/registry.ts

# Stage 7
find features/tools -maxdepth 1 -type d | wc -l
! test -d lib/agents/tools
```

## Migration Helper Script
```bash
# Move tool preserving structure
move_tool() {
  tool_name=$1
  old_path=$2
  
  mkdir -p features/tools/$tool_name
  cp -r $old_path/* features/tools/$tool_name/
  
  # Update imports
  find features/tools/$tool_name -type f -name "*.ts" -o -name "*.tsx" | \
    xargs sed -i 's|@/lib/agents/tools|@/features/tools|g'
}
```

## Current Implementation Notes
- Registry exists but needs completion
- Some tools copied but not fully integrated
- Need to maintain compatibility with existing lib/agents/tools until Stage 7
- Citation system remains in lib/ai/citations (not moved)