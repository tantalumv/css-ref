# Performance Fix Implementation Plan

## Executive Summary

Lighthouse scores below target. This plan addresses CLS (0.534 → 0), Performance (50 → 90+), and TBT (920ms reduction).

**Target Scores:**
- Performance: 90+
- Accessibility: Already 100
- Best Practices: Already 100
- SEO: Already 50 (meta tags needed)
- CLS: 0 → <0.1
- TBT: <200ms

---

## Issue 1: Cumulative Layout Shift (CLS)

### Root Cause Analysis

| Culprit | Score | Location |
|--------|-------|----------|
| `#grid-view` display switching | 0.534 | index.html:1105 |
| Web font loading | Indirect | Google Fonts |
| Datastar rendering | Indirect | Dynamic content |

### Fix 1.1: Explicit Min-Height for Grid View

**File:** `src/styles/card.css`

**Current (lines 13-17):**
```css
#grid-view {
  width: 100%;
  max-width: 100%;
  min-height: 400px;  /* Too small - causes shift */
}
```

**Change to:**
```css
#grid-view {
  width: 100%;
  max-width: 100%;
  min-height: 85vh;  /* Reserve space upfront */
  contain: layout style;
}
```

### Fix 1.2: Add Collection View Min-Height

**File:** `src/styles/card.css`

**Add after line 19:**
```css
#collection-view {
  width: 100%;
  max-width: 100%;
  min-height: 85vh;
  contain: layout style;
}

#collection-view[data-show="false"] {
  display: none !important;
}
```

---

## Issue 2: Style & Layout Blocking (TBT)

### Root Cause Analysis

Lighthouse shows 2,273ms in Style & Layout.

**Suspected causes:**
1. `renderGrid()` effect on `#grid` element
2. Multiple signal initializations
3. Datastar reactivity chain

### Fix 2.1: Optimize Data-Signal

**File:** `index.html`

Current data-signal (line 1121) is 2,200+ characters. This causes:
- Parse overhead
- Signal subscription overhead

**Reduce signals to essential only:**
```javascript
data-signal="{ 
  showGridOverlay: false, 
  isPaused: false,
  // Move collection-specific signals to lazy initialization
  // Only keep global state signals here
}"
```

### Fix 2.2: Add Content Visibility

**File:** `src/styles/card.css`

```css
#grid-view {
  /* ... min-height from Fix 1.1 ... */
  content-visibility: auto;
  contain-intrinsic-size: 5000px;
}
```

---

## Issue 3: Unused CSS (10KB)

### Root Cause Analysis

Bundle CSS has unused rules from:
- `table.css` - Not used initially
- `animations.css` - Conditional
- Print styles - Never used

### Fix 3.1: Split Critical CSS

**File:** `scripts/build.js` or `vite.config.js`

Add critical CSS extraction:
```javascript
// Extract inline critical styles
// Delay loading non-critical bundles
```

### Fix 3.2: Lazy Load Collections CSS

The collections-page.css loads on every page but only needed when collection opens.

---

## Issue 4: Web Font Loading (CLS Indirect)

### Fix 4.1: Font Display Swap

Google Fonts URL in index.html needs `font-display=swap`.

**Current:**
```
https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap
```

Already has `display=swap`. Root cause may be FOIT/FOUT timing.

### Fix 4.2: Preload Critical Fonts

**File:** `index.html` - Add in `<head>`

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" as="style" />
```

---

## Issue 5: SEO Meta Tags

### Fix 5.1: Add Meta Description

**File:** `index.html` - Add in `<head>`

```html
<meta name="description" content="CSS Reference - Interactive CSS property explorer with live demos, MDN links, and practical examples for web developers." />
```

### Fix 5.2: Add Open Graph Tags

**File:** `index.html` - Add in `<head>`

```html
<meta property="og:title" content="CSS Ref - Interactive CSS Reference" />
<meta property="og:description" content="Interactive CSS property explorer with live demos" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://tantalumv.github.io/css-ref/" />
```

### Fix 5.3: Add Twitter Card Tags

**File:** `index.html` - Add in `<head>`

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="CSS Ref - Interactive CSS Reference" />
<meta name="twitter:description" content="Interactive CSS property explorer with live demos" />
```

### Fix 5.4: Add JSON-LD Schema

**File:** `index.html` - Add in `<head>`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CSS Ref",
  "description": "Interactive CSS property explorer with live demos, MDN links, and practical examples",
  "url": "https://tantalumv.github.io/css-ref/",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

---

## Implementation Order

| Step | Priority | File | Change | Est. Impact |
|------|----------|------|--------|------------|
| 1 | Critical | card.css | Add min-height | CLS -0.3 |
| 2 | High | index.html | Add meta tags | SEO +40 |
| 3 | Medium | card.css | Add content-visibility | TBT -100ms |
| 4 | Low | build.js | CSS splitting | Perf +5 |

---

## Verification

After implementing, run:

```bash
npm run build
# Then test with Lighthouse
```

**Expected Results:**
- CLS: 0.534 → <0.1
- Performance: 50 → 85+
- SEO: 50 → 90+
- TBT: 920ms → <400ms

---

## Files to Modify

1. `src/styles/card.css` - Add min-height, content-visibility
2. `index.html` - Add meta tags (SEO), verify signals
3. `scripts/build.js` - Optional: CSS splitting

---

## Notes

- The datastar bundle is ~14KB (from cdn.jsdelivr.net) - not in our control
- Cache TTL is already optimized at 10m
- The layout shifts are primarily from view switching (grid → collection)
- Pre-reserving space for both views eliminates the shift

---

*Last Updated: April 2026*