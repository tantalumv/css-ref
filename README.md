# CSS Ref

[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=flat&logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Datastar](https://img.shields.io/badge/datastar-%23FF4F00.svg?style=flat&logo=data-star.dev&logoColor=white)](https://data-star.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33.svg?style=flat&logo=playwright&logoColor=white)](https://playwright.dev)

A visual browser for CSS properties with live demos, filtering, and browser support information.

Built with [Datastar](https://data-star.dev/) + TypeScript as a static site — no backend required.

## Quick Start

```bash
bun install
bun run build
bun run serve
```

Open [http://localhost:2005](http://localhost:2005).

## Features

### View Modes
- **Grid View** — Visual card grid with live CSS demos, color-coded by category
- **Table View** — Sortable with infinite scroll (30 properties at a time)
- **Detail View** — Full property page with syntax, description, browser support matrix, and MDN links

### Filtering & Search
- **Search** — Real-time search across property names, descriptions (debounced 150ms)
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

| | | | | |
|---|---|---|---|---|
| Layout | Flexbox | Grid | Typography | Color |
| Sizing | Visual | Animation | Transform | Spacing |
| Interactivity | CSS Variables | Queries | Selectors | UI Components |
| Tables | Lists | Breaks | Misc | |

## Tech Stack

- **Datastar** — Reactive UI framework (CDN)
- **TypeScript** — Client-side rendering and data
- **List.js** — Table sorting and search (CDN)
- **Open Props** — CSS custom properties (CDN)
- **RemixIcon** — Icons (CDN)

## Architecture

```
index.html          Datastar attributes (signals, events, effects)
src/main.ts         Exposes data & functions on window
src/data/           240 CSS property definitions across 19 categories
src/constants.ts    Category colors, interop labels/colors
src/utils.ts        Browser support helper
src/types.ts        TypeScript interfaces
src/styles/         CSS modules
```

## Why Hybrid Datastar?

Datastar's ideal architecture is backend-driven with SSE streaming. This project uses a hybrid approach because:

1. **No `data-for` directive** — Datastar lacks list rendering, requiring JavaScript loops
2. **Static site goal** — Single `index.html` deployable anywhere
3. **All data is static** — No database, instant filtering in the browser

## Scripts

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `bun run build`     | Production build                                 |
| `bun run dev`       | Watch mode with sourcemaps                       |
| `bun run serve`     | Serve on localhost:2005                          |
| `bun test`          | Unit tests (vitest)                              |
| `bun test:e2e`      | E2E tests (Playwright)                           |
| `bun run typecheck` | TypeScript type check                            |
| `bun run lint`      | Lint with oxlint                                 |

## License

MIT License — see [LICENSE](LICENSE) file.
