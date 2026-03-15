import type { CSSPropertyFull } from "../types";

export const tables: CSSPropertyFull[] = [
  {
    name: "table-layout",
    category: "Tables",
    description: "Defines the algorithm used to lay out table columns: auto measures content, fixed uses first row and explicit widths.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "table-layout: auto | fixed",
    mdnPath: "table-layout",
    demo: `<div style="padding:10px;display:flex;gap:8px"><table style="table-layout:auto;width:92px;border-collapse:collapse;font-size:8px"><tr><th style="border:1px solid #cbd5e1;padding:2px">auto</th><th style="border:1px solid #cbd5e1;padding:2px">long content</th></tr><tr><td style="border:1px solid #cbd5e1;padding:2px">A</td><td style="border:1px solid #cbd5e1;padding:2px">very long text</td></tr></table><table style="table-layout:fixed;width:92px;border-collapse:collapse;font-size:8px"><tr><th style="border:1px solid #cbd5e1;padding:2px">fixed</th><th style="border:1px solid #cbd5e1;padding:2px">col</th></tr><tr><td style="border:1px solid #cbd5e1;padding:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">A</td><td style="border:1px solid #cbd5e1;padding:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">very long text</td></tr></table></div>`,
  },

  {
    name: "border-collapse",
    category: "Tables",
    description: "Determines whether table borders are collapsed into a single border or rendered separately.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-collapse: collapse | separate",
    mdnPath: "border-collapse",
    demo: `<div style="padding:10px;display:flex;gap:10px"><table style="border-collapse:collapse;font-size:8px"><tr><td style="border:2px solid #6366f1;padding:4px">collapse</td><td style="border:2px solid #6366f1;padding:4px">collapse</td></tr></table><table style="border-collapse:separate;border-spacing:4px;font-size:8px"><tr><td style="border:2px solid #ec4899;padding:4px">separate</td><td style="border:2px solid #ec4899;padding:4px">separate</td></tr></table></div>`,
  },

  {
    name: "border-spacing",
    category: "Tables",
    description: "Sets the distance between table cell borders when border-collapse is separate.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-spacing: 0 | 8px 4px",
    mdnPath: "border-spacing",
    demo: `<div style="padding:10px"><table style="border-collapse:separate;border-spacing:8px 4px;font-size:8px"><tr><td style="border:2px solid #0ea5e9;padding:4px">1</td><td style="border:2px solid #0ea5e9;padding:4px">2</td></tr><tr><td style="border:2px solid #0ea5e9;padding:4px">3</td><td style="border:2px solid #0ea5e9;padding:4px">4</td></tr></table></div>`,
  },
];
