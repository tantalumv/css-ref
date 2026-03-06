import type { CSSProperty } from "../types";

export const tables: CSSProperty[] = [
  {
    n: "table-layout",
    c: "Tables",
    d: "Defines the algorithm used to lay out table columns: auto measures content, fixed uses first row and explicit widths.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "table-layout: auto | fixed",
    m: "table-layout",
    demo: `<div style="padding:10px;display:flex;gap:8px"><table style="table-layout:auto;width:92px;border-collapse:collapse;font-size:8px"><tr><th style="border:1px solid #cbd5e1;padding:2px">auto</th><th style="border:1px solid #cbd5e1;padding:2px">long content</th></tr><tr><td style="border:1px solid #cbd5e1;padding:2px">A</td><td style="border:1px solid #cbd5e1;padding:2px">very long text</td></tr></table><table style="table-layout:fixed;width:92px;border-collapse:collapse;font-size:8px"><tr><th style="border:1px solid #cbd5e1;padding:2px">fixed</th><th style="border:1px solid #cbd5e1;padding:2px">col</th></tr><tr><td style="border:1px solid #cbd5e1;padding:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">A</td><td style="border:1px solid #cbd5e1;padding:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">very long text</td></tr></table></div>`,
  },

  {
    n: "border-collapse",
    c: "Tables",
    d: "Determines whether table borders are collapsed into a single border or rendered separately.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "border-collapse: collapse | separate",
    m: "border-collapse",
    demo: `<div style="padding:10px;display:flex;gap:10px"><table style="border-collapse:collapse;font-size:8px"><tr><td style="border:2px solid #6366f1;padding:4px">collapse</td><td style="border:2px solid #6366f1;padding:4px">collapse</td></tr></table><table style="border-collapse:separate;border-spacing:4px;font-size:8px"><tr><td style="border:2px solid #ec4899;padding:4px">separate</td><td style="border:2px solid #ec4899;padding:4px">separate</td></tr></table></div>`,
  },

  {
    n: "border-spacing",
    c: "Tables",
    d: "Sets the distance between table cell borders when border-collapse is separate.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "border-spacing: 0 | 8px 4px",
    m: "border-spacing",
    demo: `<div style="padding:10px"><table style="border-collapse:separate;border-spacing:8px 4px;font-size:8px"><tr><td style="border:2px solid #0ea5e9;padding:4px">1</td><td style="border:2px solid #0ea5e9;padding:4px">2</td></tr><tr><td style="border:2px solid #0ea5e9;padding:4px">3</td><td style="border:2px solid #0ea5e9;padding:4px">4</td></tr></table></div>`,
  },
];
