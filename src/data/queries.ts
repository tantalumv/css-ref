import type { CSSProperty } from "../types";

export const queries: CSSProperty[] = [
  {
    n: "@media",
    c: "Queries",
    d: "Applies styles conditionally based on media features like viewport width, orientation, or color scheme.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "@media (min-width: 48rem) { .grid { columns: 2 } }\n@media (prefers-color-scheme: dark) { ... }",
    m: "@media",
    demo: `<style>.q-media{display:grid;grid-template-columns:1fr;gap:4px}.q-media .cell{background:#c084fc;height:24px;border-radius:3px}@media (min-width: 720px){.q-media{grid-template-columns:repeat(3,1fr)}.q-media .cell{background:#a855f7}}</style><div style="padding:8px"><div class="q-media"><div class="cell"></div><div class="cell"></div><div class="cell"></div></div><div style="font-size:9px;color:#888;font-weight:700;text-align:center;margin-top:4px">Resize viewport to trigger @media</div></div>`,
  },

  {
    n: "@container",
    c: "Queries",
    d: "Applies styles based on the size of a named container element — the key to truly modular components.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2023",
    x: "@container card (min-width: 30em) { .title { font-size: 2rem } }",
    m: "@container",
    demo: `<style>.q-card-wrap{container-type:inline-size;container-name:card}.q-card{display:flex;flex-direction:column;gap:4px}.q-card .piece{background:#c084fc;color:#fff;padding:5px;border-radius:3px;font-size:9px;font-weight:700;text-align:center}@container card (min-width: 180px){.q-card{flex-direction:row}.q-card .piece{background:#a855f7}}</style><div class="q-card-wrap" style="width:190px;border:2px solid #a855f7;border-radius:6px;padding:8px;background:#faf5ff"><div class="q-card"><div class="piece">responsive</div><div class="piece">container</div></div></div>`,
  },

  {
    n: "@layer",
    c: "Queries",
    d: "Declares a cascade layer, giving explicit control over specificity order.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2022",
    x: "@layer utilities { .flex { display: flex } }\n@layer base, theme, utilities",
    m: "@layer",
    demo: `<style>@layer q-base, q-theme; @layer q-base {.q-layer-tag{background:#e9d5ff;color:#6d28d9}} @layer q-theme {.q-layer-tag{background:#8b5cf6;color:#fff}}</style><div style="padding:8px"><div class="q-layer-tag" style="padding:6px 10px;border-radius:3px;font-size:10px;font-weight:700;font-family:monospace">@layer q-theme overrides q-base</div></div>`,
  },

  {
    n: "@supports",
    c: "Queries",
    d: "Applies styles conditionally when the browser supports a given CSS feature.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "@supports (display: grid) { .layout { display: grid } }",
    m: "@supports",
    demo: `<style>.q-support-box{padding:6px;border-radius:4px;font-size:10px;font-weight:700;font-family:monospace}@supports (display:grid){.q-support-ok{background:#dcfce7;border:2px solid #16a34a;color:#15803d}}@supports not (display:grid){.q-support-ok{background:#fee2e2;border:2px solid #dc2626;color:#b91c1c}}</style><div style="padding:10px"><div class="q-support-box q-support-ok">@supports (display:grid)</div></div>`,
  },

  {
    n: ":has()",
    c: "Queries",
    d: "A parent selector — styles an element based on whether it contains a specific descendant or state.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2023",
    x: "form:has(:invalid) { border-color: red; }\nli:has(+ li) { margin-bottom: 1rem; }",
    m: ":has",
    demo: `<style>.q-has{border:2px solid #94a3b8;border-radius:5px;padding:6px;background:#f8fafc}.q-has:has(input:checked){border-color:#16a34a;background:#f0fdf4}.q-has:has(input:not(:checked)){border-color:#dc2626;background:#fff0f0}</style><div style="padding:10px;display:flex;flex-direction:column;gap:6px"><label class="q-has" style="display:flex;align-items:center;gap:6px"><input type="checkbox" checked><span style="font-size:10px;font-weight:700">checked parent</span></label><label class="q-has" style="display:flex;align-items:center;gap:6px"><input type="checkbox"><span style="font-size:10px;font-weight:700">unchecked parent</span></label></div>`,
  },

  {
    n: ":is()",
    c: "Queries",
    d: "Matches any element matching at least one of the given selectors. Adopts the highest specificity in the list.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: ":is(h1, h2, h3) { margin-block: 1.5rem }",
    m: ":is",
    demo: `<style>.q-is :is(h1,h2,h3){margin:0;color:#a855f7}.q-is h1{font-size:14px}.q-is h2{font-size:12px}.q-is h3{font-size:11px}</style><div class="q-is" style="padding:10px;display:flex;flex-direction:column;gap:4px"><h1>h1 via :is()</h1><h2>h2 via :is()</h2><h3>h3 via :is()</h3></div>`,
  },

  {
    n: ":where()",
    c: "Queries",
    d: "Like :is() but with zero specificity — ideal for low-priority defaults that are easy to override.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: ":where(header, footer) a { color: inherit }",
    m: ":where",
    demo: `<style>.q-where :where(.chip){color:#6366f1;background:#eef2ff}.q-where .chip.override{color:#fff;background:#8b5cf6}</style><div class="q-where" style="padding:10px;display:flex;gap:6px"><div class="chip" style="padding:5px 8px;border-radius:4px;font-size:10px;font-weight:700">default via :where</div><div class="chip override" style="padding:5px 8px;border-radius:4px;font-size:10px;font-weight:700">easy override</div></div>`,
  },

  {
    n: ":not()",
    c: "Queries",
    d: "Selects elements that do NOT match any of the provided selectors.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "li:not(:last-child) { margin-bottom: 0.5rem }\nbutton:not([disabled]) { ... }",
    m: ":not",
    demo: `<style>.q-not .item{padding:5px 10px;border-radius:3px;font-size:10px;font-weight:700;background:#e9d5ff;color:#6b21a8}.q-not .item:not(:last-child){background:#a855f7;color:#fff}</style><div class="q-not" style="display:flex;flex-direction:column;gap:4px;padding:8px;width:100%"><div class="item">first</div><div class="item">second</div><div class="item">last</div></div>`,
  },

  {
    n: "@scope",
    c: "Queries",
    d: "Creates scoped styles that only apply within a specific DOM subtree — limits selector reach. Chrome 118+, Safari TP.",
    s: { ch: 1, ff: 0, sf: 0, ed: 1 },
    i: "ltd",
    x: "@scope (.card) { .title { color: blue } }",
    m: "@scope",
    demo: `<style>@scope (.q-scope-card){.q-title{color:#15803d;font-weight:800}}</style><div style="padding:10px;display:flex;flex-direction:column;gap:6px"><div class="q-scope-card" style="padding:8px;border:2px solid #16a34a;border-radius:6px"><p class="q-title" style="margin:0;font-size:10px">scoped title</p></div><div style="padding:8px;border:2px solid #cbd5e1;border-radius:6px"><p class="q-title" style="margin:0;font-size:10px;color:#64748b">outside scope</p></div></div>`,
  },

  {
    n: "@starting-style",
    c: "Queries",
    d: "Defines styles for the starting state of elements entering the DOM — essential for entry animations. Chrome 117+.",
    s: { ch: 1, ff: 0, sf: 1, ed: 1 },
    i: "b2024",
    x: "@starting-style { dialog { opacity: 0; transform: scale(0) } }",
    m: "@starting-style",
    demo: `<style>.q-start{opacity:1;transform:scale(1);transition:opacity .35s ease,transform .35s ease}@starting-style{.q-start{opacity:0;transform:scale(.9)}}</style><div style="padding:10px"><div class="q-start" style="background:#fef3c7;border:2px solid #eab308;border-radius:6px;padding:8px;font-size:10px;font-weight:700;color:#a16207">Entry transition with @starting-style</div></div>`,
  },
];
