# CSS Ref

A visual browser of CSS properties with filtering, search, and detail views.

Built with [Datastar](https://data-star.dev/) + TypeScript as a static site — no backend required.

## Quick Start

```bash
bun install
bun run build
bun run serve
```

Open [http://localhost:2005](http://localhost:2005).

## Features

- **Grid / List view** toggle
- **Search** by property name, description, or category (debounced 150ms)
- **Category chips** — filter by 13 CSS categories
- **Interop chips** — filter by browser support status
- **Detail view** — syntax, live demo, browser support, MDN link
- **Escape key** closes popover / returns to list
- **Click outside** closes filter popover

## Architecture

```
index.html          Datastar attributes (signals, events, effects)
src/main.ts         Exposes data & functions on window for Datastar
src/data/           83 CSS property definitions across 13 categories
src/constants.ts    Category colors, interop labels/colors
src/utils.ts        bIcon() browser support helper
src/types.ts        TypeScript interfaces
src/style.css       Styles (Open Props)
src/state.ts        State module (unit tests)
src/filters.ts      Filter logic (unit tests)
```

### Datastar handles

- **Reactive state** — `data-signals` on `<body>` defines `query`, `activeCats`, `activeInterops`, `viewMode`, `popoverOpen`
- **Event handling** — `data-on:click`, `data-on:input__debounce`, `data-on:keydown__window`, `data-on:click__outside`
- **Dynamic classes** — `data-class:active`, `data-class:open`, `data-class:has-active`
- **Conditional visibility** — `data-show` for the filter active dot
- **Reactive rendering** — `data-effect` triggers `renderGrid()` / `renderChips()` whenever signals change
- **Two-way binding** — `data-bind:query` on the search input

### TypeScript bundle handles

- **Static data** — 83 CSS properties, category/interop metadata
- **DOM rendering** — `renderGrid()`, `renderChips()`, `showDetail()` build HTML imperatively
- **Filter logic** — `filtered()` computes the visible property list

All functions and data are exposed on `window` so Datastar expressions can call them directly.

## Why not full Datastar with SSE?

Datastar's ideal architecture is **backend-driven**: a server streams HTML fragments via SSE (Server-Sent Events) using `@get()` / `@post()` actions, and Datastar patches them into the DOM. This eliminates client-side rendering entirely.

We don't use that approach here because:

1. **No client-side iteration** — Datastar has no `data-for` or `data-each` directive. Rendering a list of 83 property cards requires looping, which can only happen in JavaScript or on a server.

2. **Static site goal** — CSS Ref is a single `index.html` that can be served from any static host (GitHub Pages, Netlify, S3). Adding SSE would require a persistent backend server (Go, Node, Python, etc.), adding deployment complexity for what is essentially a reference page.

3. **All data is static** — The 83 CSS properties never change at runtime. There's no database, no user-generated content, no reason for a server round-trip. Filtering and rendering happen instantly in the browser.

The current hybrid gives us the best of both: Datastar's declarative reactivity for state and events, and a small TypeScript bundle (~62kb) for data and rendering — all deployable as a static site.

## Scripts

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `bun run build`     | Production build (bun bundler + esbuild for CSS) |
| `bun run dev`       | Watch mode with sourcemaps                       |
| `bun run serve`     | Serve on localhost:2005                          |
| `bun test`          | Unit tests (vitest, watch)                       |
| `bun run test:run`  | Unit tests (single run)                          |
| `bun run test:e2e`  | E2E tests (Playwright)                           |
| `bun run typecheck` | TypeScript type check                            |
| `bun run lint`      | Lint with oxlint                                 |
