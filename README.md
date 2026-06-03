# CSS Ref

> Interactive CSS property reference with live demos, fuzzy search, and browser support matrices.

**Live Demo:** [tantalumv.github.io/css-ref](https://tantalumv.github.io/css-ref/)

---

## Overview

CSS Ref is a fast, lightweight web application for exploring CSS properties. Each property includes an interactive visual demo, detailed syntax documentation, browser compatibility information, and links to MDN. Built with performance in mind — the entire app is ~144 kB with only **1 runtime dependency**.

---

## Features

### Property Explorer
- **100+ CSS properties** documented across **19 categories**
- **Live visual demos** for every property (not static images)
- **Fuzzy search** with typo tolerance — find properties even with misspellings
- **Browser support matrix** showing Chrome, Firefox, Safari, Edge compatibility at a glance
- **Interoperability status** — wide adoption, baseline years, limited, experimental
- **Related properties** algorithmically suggested based on category and prefix

### Multiple View Modes
- **Grid View** — Responsive card layout with live demo previews, 4 columns on desktop
- **Table View** — Sortable list with infinite scroll (30 rows per batch), sort by name, category, support
- **Detail View** — Full property page with syntax, values, browser matrix, MDN & Can I Use links
- **Collection View** — Curated learning paths with interactive playgrounds

### Collections (Interactive Learning Guides)
9 guided learning paths with built-in interactive demos:

| Collection | Focus | Interactive Playground |
|------------|-------|----------------------|
| Flexbox | 1D layout, alignment, distribution | Flexbox Playground — live controls for justify-content, align-items, flex-wrap, direction, gap, item count |
| Grid | 2D layout, rows & columns | Grid Layout Builder — switch between classic, hero, dashboard, gallery layouts |
| Typography | Fonts, sizing, spacing, readability | Type Lab — live font family, size, line-height, letter-spacing, alignment |
| Animation | Transitions, keyframes, timing | Animation Playground — bounce, pulse, shake, spin with duration & timing controls |
| Color | Colors, transparency, theming | Theme Builder — light/dark/brand themes with opacity & color pickers |
| Layout | Positioning, flow, display | Core layout concepts and patterns |
| Backgrounds | Backgrounds, gradients, images | Interactive playground included |
| Box Model | Margin, padding, border, box-sizing | Interactive playground included |
| Transitions | Smooth state changes | Interactive playground included |

All playgrounds generate copyable CSS code in real time.

---

## Tech Stack

### Runtime
- **Vanilla TypeScript** → compiled to ES2020+ JavaScript
- **1 runtime dependency**: `fuzzysort` (^3.1.0) for typo-tolerant search

### UI & Styling
- **Datastar** (via CDN, ~14 KB) — reactive signals system for UI state without framework overhead
- **Open Props** — CSS custom properties design system (bundled, not CDN)
- **Custom CSS** with Utopia-based fluid typography and spacing scale
- Responsive mobile-first design with command palette on small screens

### Build & Tooling
- **Bun** (primary) / Node.js (CI compatible) — JavaScript runtime
- **esbuild** — Bundling and minification (fast, no configuration)
- **concurrently** — Parallel dev processes (JS watch + CSS watch)
- **oxlint** — Linting and type checking
- **TypeScript** 5.9.3 — Static type checking

### Testing
- **Vitest** 4.0.18 — Unit tests
- **@playwright/test** 1.58.2 — E2E tests across Chromium, Firefox, WebKit
- **happy-dom** 20.8.3 — DOM mock environment for tests

### Hosting & Performance
- **GitHub Pages** + **Fastly CDN** — Static hosting with Brotli compression
- Content-hashed asset filenames for long-term caching (10-minute TTL)
- Service Worker for offline support (optional)
- Critical CSS inlined, fonts preloaded, DNS prefetch configured

---

## Project Structure

```
css-ref/
├── src/
│   ├── main.ts                      # Entry point (224 lines)
│   ├── types.ts                     # TypeScript interfaces
│   ├── constants.ts                 # Theme colors, interop labels, config
│   │
│   ├── data/                        # CSS property definitions
│   │   ├── index.ts                 # Aggregates all properties
│   │   ├── categories.ts            # 19 category meta (icons, colors, intros)
│   │   ├── collections.ts           # 9 collection learning guides
│   │   ├── flexbox.ts               # Flexbox properties demo data
│   │   ├── grid.ts                  # Grid properties demo data
│   │   ├── typography.ts            # Typography properties
│   │   ├── color.ts                 # Color properties
│   │   ├── sizing.ts                # Sizing properties
│   │   ├── visual.ts                # Borders, backgrounds, shadows
│   │   ├── animation.ts             # Animation properties
│   │   ├── transform.ts             # Transform properties
│   │   ├── spacing.ts               # Margin, padding, gap
│   │   ├── interactivity.ts         # Cursor, overflow, user-select
│   │   ├── css-variables.ts         # Custom properties
│   │   ├── queries.ts               # Media/container queries
│   │   ├── selectors.ts             # Selector reference
│   │   ├── ui-components.ts         # Form elements, buttons
│   │   ├── tables.ts                # Table properties
│   │   ├── lists.ts                 # List-style properties
│   │   ├── misc.ts                  # Miscellaneous properties
│   │   ├── breaks.ts                # Page/column breaks
│   │   └── layout.ts                # Display, position, float, etc.
│   │
│   ├── render/                      # View renderers
│   │   ├── grid.ts                  # Grid card view
│   │   ├── table.ts                 # Table view with infinite scroll
│   │   ├── detail.ts                # Single property detail page
│   │   └── collection.ts            # Collection/guide page
│   │
│   ├── lib/                         # Utilities
│   │   ├── search.ts                # Fuzzy search orchestration
│   │   ├── filters.ts               # Category/browser/interop filtering & sorting
│   │   └── browser-icons.ts         # SVG browser support icons
│   │
│   ├── styles/                      # CSS modules
│   │   ├── index.css                # Entry (imports all partials)
│   │   ├── variables.css            # Theme vars, Utopia fluid system
│   │   ├── base.css                 # Reset, typography, base styles
│   │   ├── card.css                 # Grid card layout
│   │   ├── list.css                 # Table view styles
│   │   ├── detail.css               # Property detail page
│   │   ├── table.css                # Table component styles
│   │   ├── collections-page.css     # Collection view styles
│   │   ├── animations.css           # Keyframe animations
│   │   └── header.css               # Header/search bar
│   │
│   └── demo-helpers.ts              # Helper functions to generate demo HTML
│
├── public/                          # Static assets (icons, favicon)
├── dist/                            # Build output (hashed bundles)
├── scripts/                         # Build & utility scripts
│   ├── build.js                     # Production build (esbuild, hashing, manifest)
│   ├── generate-manifest.ts         # Asset hash manifest for SW updates
│   ├── validate-demos.ts            # Validates all demo snippets
│   ├── compress.js                  # Compression/minification
│   │   └── serve.js                 # Development server
│
├── e2e/                             # Playwright E2E tests
│   ├── fuzzy-search.spec.ts
│   ├── collections-visual.spec.ts
│   ├── interactive-demos.spec.ts
│   └── ... (10 test files total)
│
├── index.html                       # Single-page app shell (1242 lines)
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript configuration
├── PERFORMANCE_FIX_PLAN.md          # Performance optimization tracking
├── PERFORMANCE_SCORE_PLAN.md        # Lighthouse score improvement plan
└── README.md                        # This file
```

---

## Data Model

Each CSS property is defined with a consistent schema:

```typescript
interface CSSProperty {
  n: string;              // name (e.g., "display")
  c: string;              // category (e.g., "Flexbox")
  d: string;              // description
  s: BrowserSupport;      // { ch: 0-2, ff: 0-2, sf: 0-2, ed: 0-2 }
  i: InteropStatus;       // "wide" | "b2024" | "b2023" | "b2022" | "ltd" | "exp"
  x: string;              // example value
  m: string;              // MDN path
  demo: string;           // HTML demo markup (self-contained)
  v?: CSSValue[];         // optional: accepted values with descriptions
  caniuse?: string;       // optional: caniuse.com feature ID
  default?: string;       // optional: default value
}
```

**Browser support encoding:** `2` = Fully supported, `1` = Partial support, `0` = Not supported

**Interop levels:**
- `wide` — Widely available across all modern browsers
- `b2024` / `b2023` / `b2022` — Baseline year (stable support)
- `ltd` — Limited support or partial implementation
- `exp` — Experimental, behind flags, or not standardized

---

## Getting Started

### Prerequisites
- **Bun** (recommended, fastest) or **Node.js** 18+ with npm

### Installation

```bash
# Clone the repository
git clone https://github.com/tantalumv/css-ref.git
cd css-ref

# Install dependencies
bun install
# or
npm install
```

### Development

```bash
# Start dev server with hot reload (Bun)
bun run dev

# Or with Node.js
npm run dev:node

# Opens at http://localhost:2005
```

Development runs:
- `esbuild` in watch mode for JS (bundles TypeScript)
- `esbuild` in watch mode for CSS (bundles CSS modules)
- `concurrently` manages both processes
- Source maps enabled for debugging

### Production Build

```bash
# Build for production (minified, hashed)
bun run build

# Output: dist/bundle.[hash].js, dist/bundle.[hash].css
# index.html updated with hashed filenames
```

Build process:
1. Clean previous bundles
2. Bundle JavaScript with esbuild (`--minify`, `target=es2020`, `format=esm`)
3. Bundle CSS with esbuild (`--minify`)
4. Generate SHA256 content hash
5. Rename files with hash (cache busting)
6. Update `index.html` with hashed paths
7. Update service worker (`dist/sw.js`) with hashed paths
8. Copy `_headers` for CDN configuration
9. Generate `manifest.json` for asset tracking

### Preview Production Build

```bash
# Build and serve locally
bun run serve

# Opens at http://localhost:2005
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `dev` / `dev:bun` | Start development server (Bun) |
| `dev:node` | Start development server (Node.js) |
| `build` | Production build (minified, hashed) |
| `serve` | Build then serve on port 2005 |
| `test` | Run Vitest unit tests (watch mode) |
| `test:run` | Run Vitest once (CI) |
| `test:coverage` | Run with coverage report |
| `test:e2e` | Run Playwright E2E tests (all browsers) |
| `test:e2e:ui` | Playwright test runner UI |
| `lint` | Lint with oxlint |
| `lint:fix` | Lint and auto-fix |
| `typecheck` | TypeScript type checking (oxlint + tsc) |
| `manifest:generate` | Generate/verify asset hash manifest |
| `manifest:check` | Verify manifest without generating |
| `analyze` | Generate esbuild metafile for bundle analysis |
| `validate:demos` | Validate all demo snippets render correctly |

---

## Performance

### Lighthouse Scores (Current)

| Metric | Score | Status |
|--------|-------|--------|
| **Performance** | 83+ | Good |
| **Accessibility** | 96 | Excellent |
| **Best Practices** | 100 | Excellent |
| **SEO** | 100 | Excellent |
| **CLS** | 0.004 | Excellent |
| **TBT** | ~920ms | Ongoing optimization |
| **LCP** | ~2.9s | External scripts impact |

### Bundle Size & Optimizations

| Metric | Value |
|--------|-------|
| **Total JS bundle** | ~144 kB (minified) |
| **CSS bundle** | ~16 kB (minified) |
| **Runtime dependencies** | 1 package (`fuzzysort`) |
| **Dev dependencies** | 8 packages |

**Optimizations applied:**
- SVG sprite icons (no icon font) — saved ~210 kB
- Font subsetting (Inter) — saved ~10 kB
- Brotli compression on CDN (Fastly)
- Content-visibility: auto on grid container
- Min-height reservations prevent CLS
- Critical CSS inlined in `<head>`
- System font fallback for instant text
- DNS prefetch for CDN domains
- Content-hashed assets (10-minute cache TTL)

**Performance improvement plan** documented in `PERFORMANCE_FIX_PLAN.md` with specific targets:
- TBT reduction by ~800ms
- Unused CSS purging (~10 KB)
- Code splitting for collection routes

---

## Browser Support

The application supports all modern browsers:

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 15+ |
| Edge | 90+ |

CSS property support data is sourced from MDN and updated regularly. Each property displays its own browser matrix with version numbers.

---

## Configuration

**TypeScript** (`tsconfig.json`):
- Target: ES2022
- Module: ESNext (bundler resolution)
- Strict mode enabled
- Root: `./src`, Output: `./dist`

**ESBuild** (via `scripts/build.js`):
- JS: `--minify`, `--target=es2020`, `--format=esm`
- CSS: `--minify`
- Content hash: SHA256 (first 8 characters)
- Source maps in development

**oxlint** (`.oxlintrc.json`, `.oxlintrc.typecheck.json`):
- JavaScript/TypeScript linting
- Type-aware checking via separate config

---

## Testing Strategy

### Unit Tests (Vitest)
- Search algorithm correctness
- Filter and sort logic
- Utility functions
- Type safety (in conjunction with TypeScript)

Run: `npm run test`

### End-to-End Tests (Playwright)
- **Fuzzy search** across all properties (verify results match)
- **Filter combinations** (category + browser + interop)
- **View mode switching** (grid ↔ table)
- **Collection interactions** (playground controls, code generation)
- **Infinite scroll** in table view
- **Detail view navigation** and related properties

Tested across 3 browsers: Chromium, Firefox, WebKit.

Run: `npm run test:e2e`

### Demo Validation
A custom script (`scripts/validate-demos.ts`) ensures every property's `demo` field renders valid HTML and doesn't throw errors.

Run: `npm run validate:demos`

---

## Architecture Highlights

### Single-Page Application (Hash-Based Routing)
- No server-side routing needed
- URL hash determines view: `#grid`, `#property/display`, `#collection/flexbox`
- Back/forward button works natively
- Deep linking to any property or collection

### Reactive State with Datastar
All application state lives in a single `data-signal` object on `<body>`:

```javascript
data-signal="{
  query: '',
  activeCats: [],
  activeInterops: [],
  activeBrowsers: [],
  viewMode: 'grid',
  selectedProp: null,
  activeCollection: null,
  tableDisplayedCount: 30,
  tableTotalCount: 0,
  filteredCount: 0,
  totalCount: 0
}"
```

Datastar automatically updates the UI when signals change — no manual DOM manipulation, no virtual DOM.

### Fuzzy Search Implementation
The `fuzzysort` library searches across 3 fields simultaneously:
1. Property name (exact match prioritized)
2. Description (substring match)
3. Category name (exact match)

Results are sorted by:
- Exact name match (highest)
- Name substring
- Description/category match
- Fuzzy score (typo tolerance)

Search is **debounced** at 150ms to prevent excessive computation.

### Infinite Scroll Table
The table view loads 30 rows at a time using a **sentinel element** at the bottom. As the user scrolls, new batches are appended. The `List.js` library provides client-side sorting without framework overhead.

### Demo Generation
Each property's demo is an HTML string stored in the data files. Helper functions (e.g., `createFlexDirectionDemo()`) construct these strings programmatically to avoid duplication. Demos are self-contained with inline styles and no external CSS/JS dependencies.

---

## Adding New Properties

1. **Choose a category** — existing categories in `src/data/categories.ts`
2. **Edit the category file** — e.g., `src/data/flexbox.ts`
3. **Add property object** following the `CSSPropertyFull` interface:

```typescript
{
  name: "gap",
  category: "Flexbox",
  description: "Controls the space between flex items",
  support: { ch: 84, ff: 63, sf: 14.1, ed: 79 },
  interop: "wide",
  example: "gap: 1rem;",
  mdnPath: "https://developer.mozilla.org/en-US/docs/Web/CSS/gap",
  demo: "<div style='display:flex;gap:1rem'>…</div>",
  values: [
    { value: "length", description: "Fixed space (px, rem, em)" },
    { value: "percentage", description: "Relative to container size" },
  ],
  default: "normal",
}
```

4. **Run validation**: `npm run validate:demos`
5. **Rebuild**: `npm run build`

---

## Code Quality

- **TypeScript strict mode** — no `any`, comprehensive type coverage
- **oxlint** — catches common issues, enforces conventions
- **Pre-commit hooks** (if configured) run typecheck + lint
- **E2E tests** guard against regressions in search, filtering, navigation
- **Bundle analysis** available via `npm run analyze` (generates `dist/meta.json`)

---

## Deployment

The site deploys automatically via GitHub Pages when changes are pushed to `main`. The workflow:

1. Push to GitHub repository
2. GitHub Actions runs:
   - `npm ci` — install dependencies
   - `npm run typecheck` — verify types
   - `npm run lint` — lint code
   - `npm run test:run` — unit tests
   - `npm run build` — production build
   - `npm run test:e2e` — E2E tests against built site
3. If all pass, GitHub Pages publishes from `dist/`

Fastly CDN caches content globally with Brotli compression.

To deploy manually:
```bash
npm run build
# Then push dist/ to gh-pages branch or configure GitHub Pages from /dist folder
```

---

## Performance Optimization Work

The `PERFORMANCE_FIX_PLAN.md` and `PERFORMANCE_SCORE_PLAN.md` track ongoing optimizations:

- ✅ CLS reduced from 0.534 → 0.004 (min-height reservations)
- ✅ SEO increased from 50 → 100 (JSON-LD schema, meta tags)
- ✅ System fonts in critical CSS
- ✅ DNS prefetch for CDNs
- 🔄 TBT reduction target: 920ms → <200ms (in progress)
- 🔄 Unused CSS purging (~10 KB)
- 🔄 Code splitting by route (grid vs collection)

See the performance plan files for detailed metrics and implementation steps.

---

## License

MIT License — see LICENSE file (if present) or repository for details.

---

## Acknowledgments

- **[Datastar](https://data-star.dev/)** — Reactive UI signals framework (no build step, minimal overhead)
- **[Open Props](https://open-props.style/)** — Modern CSS custom properties and design tokens
- **[Remix Icon](https://remixicon.com/)** — Icon set converted to SVG sprite (no font requests)
- **[fuzzysort](https://github.com/farzher/fuzzysort)** — Typo-tolerant fuzzy search algorithm
- **[esbuild](https://esbuild.github.io/)** — Lightning-fast JavaScript bundler
- **[Bun](https://bun.sh/)** — All-in-one JavaScript runtime & toolkit

---

## Contributing

Contributions are welcome! Feel free to:
- Add missing CSS properties (follow existing data schema)
- Improve demo visuals or add new interactive playgrounds
- Fix bugs or optimize performance
- Enhance tests

Please open an issue or pull request on GitHub.

---

## Related Links

- **Live site**: [tantalumv.github.io/css-ref](https://tantalumv.github.io/css-ref/)
- **Repository**: [github.com/tantalumv/css-ref](https://github.com/tantalumv/css-ref)
- **MDN CSS Reference**: [developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **Can I Use**: [caniuse.com](https://caniuse.com/)

---

*Built with TypeScript, esbuild, and a commitment to performance and accessibility. No framework bloat — just fast, focused tooling for developers.*
