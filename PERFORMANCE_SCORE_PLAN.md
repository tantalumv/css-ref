# Performance Score Improvement Plan

## Current Lighthouse Scores

| Metric | Score | Issue |
|--------|-------|-------|
| **Performance** | 83 | Good but can improve |
| **Accessibility** | 96 | Good |
| **Best Practices** | 100 | Excellent |
| **SEO** | 100 | Excellent |
| **CLS** | 0.004 | Excellent |
| **TBT** | ~920ms | High - needs reduction |
| **LCP** | ~2.9s | Slow - external scripts |
| **FCP** | ~2.0s | Slow - external scripts |

---

## Issues & Solutions

### 1. Cache TTL (Est savings: 95 KiB) ✅ ALREADY DONE
- Current: JS=10m, CSS=10m, Fonts=1d
- The cache headers (10m) are already good
- No action needed - GitHub Pages handles this

---

### 2. Forced Reflow (Total: ~200ms)

**Culprit:** 
```
/bundle.js:801:171 → 7ms
/bundle.js:800:261 → 7ms  
[unattributed] → 180ms
```

**Solution:**
- Check `src/main.ts` line ~130 - the mousemove listener
- Already throttled, but check for other geometric property reads

---

### 3. Minimize Main-Thread Work (2.3s)

**Breakdown:**
| Category | Time |
|----------|------|
| Style & Layout | 1,047ms |
| Other | 508ms |
| Rendering | 371ms |
| Script Evaluation | 195ms |
| Parse HTML & CSS | 136ms |
| Script Parsing | 33ms |

**Solution:**
- Reduce bundle size by code splitting
- Defer non-critical JS
- Lazy load collection-only code

---

### 4. Unused CSS (Est savings: 10.3 KiB)

**Current:** bundle.css = 15.9 KiB with ~10 KiB unused

**Solution:**
- Identify unused rules in `bundle.2022f922.css`
- Common culprits: table.css, animations.css, print styles

---

### 5. LCP/FCP Optimization (~2.0-2.9s)

**Current bottlenecks:**
| Resource | Load Time |
|----------|----------|
| Datastar (CDN) | ~250ms |
| Main JS | ~100ms |
| Bundle CSS | ~150ms |
| Google Fonts | ~150ms |

**Solutions:**
1. ✅ System fonts in critical CSS - **DONE**
2. Preload all critical assets - check line 51-52
3. Consider inlining Datastar locally
4. Font display already swap

---

## Implementation Order (Priority)

| Priority | Issue | Expected Impact |
|----------|-------|----------------|
| **1** | Check forced reflows | TBT -100ms |
| **2** | Fix unused CSS | Bundle -10 KiB |
| **3** | Inline critical JS | LCP/FCP -0.3s |
| **4** | Code split | Bundle -20 KiB |

---

## Files to Verify

### Check Forced Reflow
```bash
# In src/main.ts - mousemove throttling already done
# Check src/render/table.ts for getBoundingClientRect
```

### Check Unused CSS
```bash
# Run with Chrome DevTools Coverage
# Purge unused CSS with build tool
```

---

## Completed Optimizations

- [x] CLS: 0.534 → 0.004 (fixed min-height)
- [x] SEO: 50 → 100 (JSON-LD schema)
- [x] FCP spinner: Added fixed overlay
- [x] System fonts: In critical CSS
- [x] DNS prefetch: Added for CDNs

---

## Next Steps

1. Run Lighthouse to get baseline scores
2. Audit bundle.js for dead code
3. Consider inlining Datastar
4. Split bundle by route (grid vs collection)

---

*Last Updated: April 2026*