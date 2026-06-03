# Test Coverage Documentation

This directory contains two complementary test coverage documents:

## 1. test_coverage.md — Interactive Demos Only

**Scope:** 9 collection interactive demos (Flexbox, Grid, Typography, Animation, Color, Layout, Box Model, Backgrounds, Transitions)

**Metrics:**
- 27 tests (3 per collection)
- 52 interactive features tested
- Coverage: 100% of interactive demo functionality

**Format:** Single large table with columns:
Collection | Feature | Controls/Values | Test Name | What Test Verifies | Status | Notes

**Use case:** Quick reference to verify every slider, button, and interactive control in the demos is tested.

---

## 2. test_coverage_full.md — Entire Site Features

**Scope:** All features across the entire CSS Reference application (navigation, search, collections, detail view, table, accessibility, PWA, etc.)

**Metrics:**
- 236 total features identified
- 158 tested in E2E
- 78 not tested
- Overall coverage: **66.9%**

**Format:** Organized by feature category with tables:
1. Navigation & Routing (13 features)
2. Search & Discovery (32 features)
3. Collection Pages (many subsections)
4. Detail View (24 features)
5. Footer / Reference Table (25 features)
6. Visual Effects & Animations (12 features)
7. Interactive Demos (35 features)
8. Clipboard & Utilities (10 features)
9. Accessibility & UX (22 features)
10. Error Handling & Edge Cases (13 features)
11. Service Worker & PWA (8 features)
12. Miscellaneous (11 features)

**Use case:** Complete audit of what is and isn't tested site-wide; identify gaps for future test development.

---

## Key Findings

### Well-Covered Areas (≥90%)
- Interactive demo controls (all 9 collections) ✅
- Fuzzy search functionality ✅
- Dropdown filtering (category, interop, browser) ✅
- Detail view navigation ✅
- Infinite scroll in table view ✅
- Meta-theme visual effects ✅

### Major Gaps (Not Tested)
- Table column sorting (by name, category, support)
- Theme toggle (dark/light mode switch)
- Clipboard fallback mechanism (textarea+execCommand)
- Service Worker offline functionality
- Error handling for invalid collection hashes
- List.js initialization failure scenarios
- Collection content sections rendering (learning objectives, strengths, etc.)
- Accessibility audit (ARIA labels, focus styles, screen reader)
- Responsive breakpoints (tablet, mobile)
- SEO meta tags (Open Graph, JSON-LD)
- Performance optimizations (preload, FCP)

---

## Running the Tests

```bash
# Install deps
bun install

# Run all e2e tests
bun x playwright test --workers=1 --reporter=list

# Run specific suite
bun x playwright test e2e/interactive-demos-full.spec.ts -g "Flexbox"
```

See individual coverage docs for detailed per-feature breakdowns.