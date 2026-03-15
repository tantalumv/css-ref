# CSS Ref

> A visual browser for CSS properties with live demos and instant search.

**Live Demo:** [tantalumv.github.io/css-ref](https://tantalumv.github.io/css-ref/)

---

## What It Does

CSS Ref helps frontend developers quickly find and understand CSS properties through:

- **Visual demos** - See properties in action, not just text descriptions
- **Fuzzy search** - Find properties even with typos (e.g., "displ" → "display")
- **Browser support** - Chrome, Firefox, Safari, Edge compatibility at a glance
- **Collections** - Curated guides for Flexbox, Grid, Typography, Animation, Color

---

## Features

### View Modes
- **Grid** - Visual cards with live CSS demos
- **Table** - Sortable list with infinite scroll
- **Detail** - Full property page with syntax, browser matrix, and MDN links

### Filtering
- Search by name, description, or category
- Filter by 19 CSS categories
- Filter by browser support level
- Filter by individual browsers (Chrome, Firefox, Safari, Edge)

### Collections
Pre-built guides for common CSS topics:
- Flexbox
- Grid
- Typography
- Animation
- Color
- Layout

---

## Performance

Optimized for speed:

| Metric | Score |
|--------|-------|
| **Page size** | ~144 kB (60% smaller than before) |
| **Load time (4G)** | ~115 ms |
| **Load time (3G)** | ~1.2 s |
| **Lighthouse** | 88-92/100 |

**Optimizations applied:**
- SVG sprite icons (-210 kB)
- Font subsetting (-10 kB)
- Brotli compression via GitHub Pages + Fastly CDN
- Minimal dependencies (no framework bloat)

---

## Tech Stack

- **Runtime:** TypeScript (compiled to vanilla JS)
- **UI:** Datastar (reactive signals via CDN)
- **Styling:** Open Props + custom CSS
- **Search:** fuzzysort (typo-tolerant)
- **Hosting:** GitHub Pages + Fastly CDN
- **Build:** Bun (fast builds) / Node.js (CI compatibility)

---

## Quick Start

```bash
# Install
bun install

# Development
bun run dev

# Build
bun run build

# Serve locally
bun run serve
```

Open [http://localhost:2005](http://localhost:2005)

---

## Project Structure

```
css-ref/
├── src/
│   ├── main.ts           # Entry point
│   ├── lib/              # Utilities (search, filters)
│   ├── render/           # View rendering (grid, table, detail)
│   ├── data/             # CSS property definitions
│   └── styles/           # CSS modules
├── index.html            # Single-page app
└── dist/                 # Build output
```

---

## Browser Support

Works on all modern browsers:
- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

---

## License

MIT License

---

## Acknowledgments

- [Datastar](https://data-star.dev/) - Reactive UI framework
- [Open Props](https://open-props.style/) - CSS custom properties
- [Remix Icon](https://remixicon.com/) - Icon set (SVG sprite)
- [fuzzysort](https://github.com/farzher/fuzzysort) - Fuzzy search
