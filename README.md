# CSS Ref

[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=flat&logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Datastar](https://img.shields.io/badge/datastar-%23FF4F00.svg?style=flat&logo=data-star.dev&logoColor=white)](https://data-star.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33.svg?style=flat&logo=playwright&logoColor=white)](https://playwright.dev)

A visual browser for CSS properties with live demos, filtering, and browser support information.

Built with [Datastar](https://data-star.dev/) + TypeScript as a static site — no backend required.

## Quick Start

### Using Bun (Recommended)

```bash
bun install
bun run build        # Build with automatic compression
bun run serve
```

### Using Node.js

```bash
npm install
npm run build:node   # Build with automatic compression
npm run serve:node
```

Open [http://localhost:2005](http://localhost:2005).

---

## Development

This project supports both **Bun** (recommended for speed) and **Node.js** (for CI/CD compatibility).

| Task | Bun | Node.js |
|------|-----|---------|
| Cold install | ~5s | ~15s |
| Dev server start | ~1s | ~2s |
| Production build | ~2s | ~4s |

**Builds include automatic compression:**
- Every build produces `.gz` (gzip) and `.br` (Brotli) files
- GitHub Pages automatically serves compressed versions
- Users download **81% less data**

---

## Verification

### Check Local Build

```bash
# Build the project
npm run build

# Check file sizes
ls -lh dist/
```

### Verify GitHub Pages Deployment

After pushing to `main`, GitHub Pages will deploy automatically. To verify:

```bash
# Wait 30-60 seconds for propagation, then run:
./scripts/verify-deployment.sh

# Or manually check with curl:
curl -I -H "Accept-Encoding: br" https://tantalumv.github.io/css-ref/
```

**Expected headers:**
```
content-encoding: br          # Brotli compression
x-served-by: cache-XXX-XXX    # Fastly CDN
server: GitHub.com            # GitHub Pages
```

### GitHub Actions Verification

A verification workflow automatically runs after each deployment:
- Checks Brotli/gzip compression
- Verifies Fastly CDN headers
- Confirms icon optimization working
- Generates deployment report

View status: https://github.com/tantalumv/css-ref/actions

## Features

### View Modes

- **Grid View** — Visual card grid with live CSS demos, color-coded by category
- **Table View** — Sortable with infinite scroll (30 properties at a time)
- **Detail View** — Full property page with syntax, description, browser support matrix, and MDN links

### Filtering & Search

- **Fuzzy Search** — Typo-tolerant search powered by [fuzzysort](https://github.com/farzher/fuzzysort)
  - Matches property names, descriptions, and categories
  - Handles partial queries (e.g., "displ" → "display")
  - Case-insensitive matching
  - Real-time results (debounced 150ms)
- **Category Filter** — 19 CSS categories (Layout, Flexbox, Grid, Typography, Color, etc.)
- **Browser Filter** — Chrome, Firefox, Safari, Edge
- **Collections** — Quick links to Flexbox, Grid, Typography, Animation, Color, Layout

### Browser Support

- **Interop Status** — Filter by browser support level:
  - **Available** — Widely supported
  - **Baseline 2024/2023/2022** — Modern cross-browser standard
  - **Limited** — Partial support or caveats
  - **Experimental** — Cutting-edge, limited support
- **Browser Icons** — Chrome, Firefox, Safari, Edge support for each property

### UX Features

- **Dark/Light Theme** — Toggle between themes
- **Copy to Clipboard** — One-click copy for property syntax
- **Related Properties** — Shows up to 4 related properties in detail view
- **Hash Routing** — Shareable URLs for any property
- **Property Counter** — Sticky counter showing filtered/total count
- **Keyboard Navigation** — Escape to close detail view or popovers

### Mobile

- **Responsive Design** — Works on all screen sizes
- **Sidebar Menu** — Hamburger menu with view/theme toggles
- **Command Palette** — Mobile search with all filters

## CSS Categories (19)

|               |               |           |            |               |
| ------------- | ------------- | --------- | ---------- | ------------- |
| Layout        | Flexbox       | Grid      | Typography | Color         |
| Sizing        | Visual        | Animation | Transform  | Spacing       |
| Interactivity | CSS Variables | Queries   | Selectors  | UI Components |
| Tables        | Lists         | Breaks    | Misc       |               |

## Tech Stack

- **Datastar** — Reactive UI framework (CDN)
- **TypeScript** — Client-side rendering and data
- **fuzzysort** — Fast fuzzy search with typo tolerance
- **List.js** — Table sorting and search (CDN)
- **Open Props** — CSS custom properties (CDN)
- **RemixIcon** — Icons (SVG sprite, 23 icons inline)

## Architecture

```
src/
├── main.ts              # Entry point, exposes data & functions on window
├── lib/
│   ├── search.ts        # Fuzzysort integration for typo-tolerant search
│   ├── filters.ts       # Filter/sort logic (pure functions)
│   └── utils.ts         # Browser icons, DOM helpers
├── render/
│   ├── detail.ts        # Detail view rendering
│   ├── collection.ts    # Collection page rendering
│   ├── grid.ts          # Grid card rendering
│   └── table.ts         # Table rendering + infinite scroll
├── data/                # 240 CSS property definitions across 19 categories
├── constants.ts         # Category colors, interop labels/colors
├── types.ts             # TypeScript interfaces
└── styles/              # CSS modules
```

## Testing

### Unit Tests (Vitest)

```bash
bun test:run
```

- 150+ tests covering filter logic, search, utilities, and helpers
- Tests for fuzzy matching, typo tolerance, and edge cases

### E2E Tests (Playwright)

```bash
bun test:e2e --project=chromium
```

- 75+ tests covering search, filtering, view switching, and detail views
- Mobile command palette tests
- Fuzzy search and typo-tolerance tests

## Why Hybrid Datastar?

Datastar's ideal architecture is backend-driven with SSE streaming. This project uses a hybrid approach because:

1. **No `data-for` directive** — Datastar lacks list rendering, requiring JavaScript loops
2. **Static site goal** — Single `index.html` deployable anywhere
3. **All data is static** — No database, instant filtering in the browser

## Scripts

### Development

| Command | Description |
|---------|-------------|
| `bun run dev` | Watch mode with sourcemaps (Bun) |
| `npm run dev:node` | Watch mode with sourcemaps (Node.js) |
| `bun run build` | Production build (Bun) |
| `npm run build:node` | Production build (Node.js) |
| `bun run serve` | Serve on localhost:2005 (Bun) |
| `npm run serve:node` | Serve on localhost:2005 (Node.js) |
| `npm run build:compress` | Build + gzip/brotli compression |

### Testing & Quality

| Command | Description |
|---------|-------------|
| `bun test` | Unit tests (vitest) |
| `bun test:e2e` | E2E tests (Playwright) |
| `bun run typecheck` | TypeScript type check |
| `bun run lint` | Lint with oxlint |

## License

MIT License — see [LICENSE](LICENSE) file.
