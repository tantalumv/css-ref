# Test Plan: Untested Feature Gaps

## Priority 1 — Critical UX Features (Must Test)

### 1. Table Column Sorting
**What:** Clickable column headers in property table (name, category, browser support)
**Why:** Core navigation; users need to sort properties
**How to test:**
- [ ] Click "Property" column header → verify sort indicator appears (asc/desc)
- [ ] Click again → reverses order
- [ ] Verify sorted order matches actual alphabetical order
- [ ] Test with filters active (sort respects current filter)
- [ ] Test "Category" and "Support" columns similarly
**Files involved:** `src/render/table.ts:97-119`, `index.html` table header
**Estimated effort:** 2-3 tests, ~2 hours

### 2. Theme Toggle (Dark/Light Mode)
**What:** Button that switches site color scheme
**Why:** User preference; must verify theme persists or resets correctly
**How to test:**
- [ ] Locate theme toggle button (`.view-switch` with theme icon?)
- [ ] Click → documentElement gets `data-theme="dark"` or class change
- [ ] Verify CSS custom properties change (e.g., `--bg-primary`)
- [ ] Refresh page → theme persists (if localStorage used)
- [ ] Toggle back to light → verifies reversible
**Files involved:** `index.html:757-770`, CSS theme variables
**Estimated effort:** 1-2 tests, ~1 hour

### 3. Detail View Copy Button
**What:** "Copy" button in property detail syntax section
**Why:** Core utility feature; must work alongside interactive demos
**How to test:**
- [ ] Navigate to property detail (e.g., /#display)
- [ ] Locate copy button in `.syntax-block` or `.copy-btn`
- [ ] Click → verify clipboard write attempted (mock navigator.clipboard)
- [ ] Verify visual feedback (icon changes to checkmark, if any)
- [ ] Verify fallback (textarea method) if clipboard fails
**Files involved:** `src/render/detail.ts:102`, `.copy-btn` selector
**Estimated effort:** 1 test, ~1 hour

---

## Priority 2 — Robustness & Edge Cases (Should Test)

### 4. Clipboard Fallback Mechanism
**What:** `copyDemoCSS` fallback to textarea+execCommand when clipboard API fails
**Why:** Must gracefully degrade in older browsers or restricted contexts
**How to test:**
- [ ] Mock `navigator.clipboard.writeText` to throw
- [ ] Call copy function
- [ ] Verify textarea created, selected, execCommand('copy') called
- [ ] Verify textarea removed after
**Files involved:** `src/main.ts:40-51`
**Estimated effort:** 1 unit test, ~1 hour

### 5. Invalid Collection Hash Handling
**What:** Navigating to /#!nonexistent-collection
**Why:** Should show empty collection view or redirect home, not crash
**How to test:**
- [ ] goto("/#!nonexistent")
- [ ] Verify collection view shows "not found" or empty state
- [ ] Verify no console errors
- [ ] Verify user can recover (back to home via brand click)
**Files involved:** `src/render/collection.ts:311-314`
**Estimated effort:** 1 e2e test, ~1 hour

### 6. Service Worker Offline Functionality
**What:** SW caches assets; site works offline
**Why:** PWA requirement; offline access is key feature
**How to test:**
- [ ] Visit site → SW registers
- [ ] Go offline (page.context.setOffline(true))
- [ ] Refresh → site still loads
- [ ] Navigate between pages → works
- [ ] Verify cached assets served (network tab mocked)
**Files involved:** `dist/sw.js`, `index.html:1233-1238`
**Estimated effort:** 2-3 e2e tests, ~3 hours (flaky)

### 7. List.js Initialization Error Handling
**What:** What if List.js library fails to load?
**Why:** Table sorting depends on it; need graceful degradation
**How to test:**
- [ ] Mock List.js as undefined
- [ ] Load table view
- [ ] Verify table still renders (maybe without sorting)
- [ ] No uncaught exceptions
**Files involved:** `src/render/table.ts:207-223`
**Estimated effort:** 1 unit + 1 e2e, ~2 hours

---

## Priority 3 — Content Rendering (Should Verify)

### 8. Collection Content Sections
**What:** Learning objectives, strengths/weaknesses, anti-examples, when to use, common mistakes, prerequisites
**Why:** Educational content must render correctly; these are core to each collection
**How to test:**
- [ ] Visit each collection page
- [ ] Verify `.learning-goals` exists and has >1 item
- [ ] Verify `.strengths-box` and `.weaknesses-box` present
- [ ] Verify `.anti-examples-grid` has do/don't cards
- [ ] Verify `.when-to-use` and `.common-mistakes` sections
- [ ] Verify `.prerequisites` list
**Files involved:** `src/render/collection.ts:103-149, 230-269`
**Estimated effort:** 1 e2e per collection, ~9 tests, ~4 hours

### 9. Property MDN Links
**What:** Each property has "View on MDN" link
**Why:** Critical reference; links must be correct
**How to test:**
- [ ] Click property card in grid/table
- [ ] In detail view, find MDN link (`.mdn-link`)
- [ ] Verify href contains "developer.mozilla.org"
- [ ] Verify link opens in new tab (target="_blank")
**Files involved:** `src/render/detail.ts:111`, `src/render/collection.ts:33`
**Estimated effort:** 1 e2e, ~1 hour

### 10. Can I Use Links
**What:** Link to caniuse.com for browser support
**Why:** Important for compatibility checking
**How to test:**
- [ ] Navigate to property detail
- [ ] Find "More on Can I Use" link (`.caniuse-link`)
- [ ] Verify href is valid caniuse URL
**Files involved:** `src/render/detail.ts:110`
**Estimated effort:** 0.5 hour (could be combined with #9)

---

## Priority 4 — Visual Effects & Polish (Nice to Have)

### 11. Card Enter Animations
**What:** Staggered fade-in of property cards on page load
**Why:** Enhances UX; verifies CSS var delays work
**How to test:**
- [ ] Visit home page
- [ ] Reload → watch cards animate in (use `page.waitForTimeout(1000)`)
- [ ] Verify each card has `.enter-fade` class initially
- [ ] Verify animation completed (no `animation-*` styles)
- [ ] Check `--ca` and `--delay` CSS vars applied per card
**Files involved:** `src/render/grid.ts:35, 70-79`
**Estimated effort:** 1 e2e, ~1.5 hours (timing-sensitive)

### 12. Scroll-Triggerred Reveals
**What:** Elements animate when scrolled into view (IntersectionObserver)
**Why:** Modern UX polish
**How to test:**
- [ ] Scroll page down
- [ ] Verify target element gets `visible` class or animation triggers
- [ ] Check before/after state (opacity, transform)
**Files involved:** CSS `@keyframes` + JS observers
**Estimated effort:** 2 tests, ~2 hours

### 13. Drop Cap Verification
**What:** Typography collection first-letter styling
**Why:** Visual detail; already partially tested (column-count)
**How to test:**
- [ ] Visit Typography collection
- [ ] Get `.intro-text::first-letter` computed style
- [ ] Verify `font-size` > 40px
- [ ] Verify `float: left`
- [ ] Verify line-height and margin
**Files involved:** Test exists but could be stricter
**Estimated effort:** 1 test enhancement, ~0.5 hour

### 14. Grid Blueprint Overlay
**What:** Toggle shows grid lines overlay on Grid demo
**Why:** Educational visual aid
**How to test:**
- [ ] Visit Grid collection
- [ ] Click `.grid-visualizer-toggle`
- [ ] Verify `.show-grid-overlay` added to container
- [ ] Verify grid overlay lines visible (semi-transparent)
- [ ] Click again → overlay removed
**Files involved:** `src/data/collections.ts:410-411`, `.grid-visualizer-toggle`
**Estimated effort:** 1 test, ~1 hour

---

## Priority 5 — Content Accuracy (Low Priority)

### 15. Property Counter Display
**What:** "Showing X of Y properties" text
**Why:** User feedback on filtered results count
**How to test:**
- [ ] Apply filter (category or search)
- [ ] Verify `.property-counter` shows correct counts
- [ ] Test edge: 0 results, all results
**Files involved:** `index.html:1213-1217`
**Estimated effort:** 1-2 tests, ~1 hour

### 16-20. Collection Meta Data Rendering
Learning objectives, difficulty, time estimate, prerequisites, concepts pills, use cases, etc.
**Why:** Content integrity
**How:** Simple presence checks; text content matches data
**Estimated effort:** 5 tests (~3 hours)

---

## Priority 6 — Infrastructure & SEO (Low Priority)

### 21. JSON-LD Structured Data
**What:** `<script type="application/ld+json">` in `<head>`
**Why:** SEO, rich snippets
**How to test:**
- [ ] Visit home page
- [ ] Extract JSON-LD script
- [ ] Parse and verify required fields (name, description, @type)
**Files involved:** `index.html:23-43`
**Estimated effort:** 1 test, ~0.5 hour

### 22. Open Graph / Twitter Cards
**What:** og:title, og:description, twitter:card meta tags
**Why:** Social sharing preview
**How to test:**
- [ ] Check `<meta property="og:title">` etc present
- [ ] Verify content matches page title/desc
**Files involved:** `index.html:13-20`
**Estimated effort:** 1 test, ~0.5 hour

### 23. CSP Header
**What:** Content-Security-Policy meta tag
**Why:** Security; must not block legitimate resources
**How to test:**
- [ ] Check CSP meta present
- [ ] Verify it allows: scripts (local), styles (inline + local), fonts (Google Fonts)
- [ ] No violations in console (already tested in dropdown tests)
**Files involved:** `index.html:46`
**Estimated effort:** 0.5 hour

### 24. Preload / Prefetch / Preconnect
**What:** Resource hints for performance
**Why:** FCP optimization
**How to test:**
- [ ] Check `<link rel="preconnect">` to fonts.googleapis.com
- [ ] Check `<link rel="preload">` for critical CSS/JS
- [ ] Verify DNS prefetch
**Files involved:** `index.html:51-67`
**Estimated effort:** 0.5 hour

### 25. Service Worker Caching Strategy
**What:** Which assets cached, network vs cache fallback
**Why:** Offline UX
**How to test:**
- [ ] After SW registered, go offline
- [ ] Check cache storage contents (via page.evaluate)
- [ ] Verify expected assets cached (CSS, JS, fonts)
- [ ] Verify network requests intercepted
**Files involved:** `dist/sw.js`
**Estimated effort:** 2-3 tests, ~3 hours

---

## Priority 7 — Accessibility (High Value, Medium Effort)

### 26. ARIA Labels Audit
**What:** All interactive elements have proper aria-label/aria-expanded
**Why:** Screen reader accessibility
**How to test:**
- [ ] Check search input has `aria-label`
- [ ] Check all dropdown toggles have `aria-haspopup`, `aria-expanded`
- [ ] Check demo buttons have accessible names
**Files involved:** `index.html` various
**Estimated effort:** 1 e2e + axe-core, ~2 hours

### 27. Focus Visible States
**What:** :focus-visible styles on all interactive elements
**Why:** Keyboard navigation
**How to test:**
- [ ] Tab through page with keyboard
- [ ] Verify visible focus ring on each focusable element
- [ ] No focus trap (except modals)
**Estimated effort:** Manual + e2e Tab key tests, ~2 hours

### 28. Skip Link / Keyboard Nav
**What:** "Skip to content" link at top
**Why:** Screen reader users
**How to test:**
- [ ] Press Tab on page load → skip link appears
- [ ] Activate → focus jumps to main content
**Files involved:** None found → feature may not exist
**Estimated effort:** 0 (not implemented) or 1 if adding

### 29. High Contrast Mode
**What:** Supports `prefers-contrast: more`
**Why:** Accessibility for low-vision users
**How to test:**
- [ ] Emulate CSS media `prefers-contrast: more`
- [ ] Verify text remains readable, borders visible
**Files involved:** CSS
**Estimated effort:** 1 test, ~1 hour

### 30. Reduced Motion
**What:** Respects `prefers-reduced-motion`
**Why:** Motion sensitivity
**How to test:**
- [ ] Emulate `prefers-reduced-motion: reduce`
- [ ] Verify animations disabled or simplified
**Files involved:** CSS animations
**Estimated effort:** 1 test, ~1 hour

---

## Summary Table

| Priority | # Gaps | Total Est. Hours | Tests to Add |
|----------|--------|-----------------|--------------|
| P1 — Critical UX | 3 | ~6 hours | 5-7 |
| P2 — Robustness | 5 | ~9 hours | 8-10 |
| P3 — Content | 6 | ~12 hours | 15-20 |
| P4 — Polish | 4 | ~6 hours | 4-5 |
| P5 — Infrastructure | 5 | ~6 hours | 5-6 |
| P6 — Accessibility | 5 | ~8 hours | 6-8 |
| **Total** | **28** | **~47 hours** | **~50 tests** |

---

## Quick Wins (Low Effort, High Value)

These can be done in <1 hour each:
- ✅ Theme toggle test
- ✅ Detail view copy button
- ✅ Clipboard fallback unit test
- ✅ Invalid collection hash
- ✅ Property counter
- ✅ MDN link presence
- ✅ JSON-LD presence
- ✅ CSP meta presence

These provide immediate coverage boost from 66.9% → 80%+ with minimal work.

---

## Suggested Implementation Order

1. **Week 1:** P1-3 quick wins (8-10 tests) → bring coverage to ~75%
2. **Week 2:** P2 robustness (8 tests) → ~80%
3. **Week 3:** P4-P5 polish (9 tests) → ~85%
4. **Week 4:** P6 accessibility (6 tests) → ~87%
5. **Month 2:** P3 content (15 tests) → ~90%+
6. **Remaining:** Low-priority infrastructure as time permits

---

## Notes

- Total estimated **50 new tests** to add
- Current test count: ~170 E2E tests
- Target: ~220 E2E tests
- Some features (skip link, certain animations) may not exist; mark as "not applicable" rather than missing
- Focus on **real user flows**: search → filter → open detail → copy CSS → back
