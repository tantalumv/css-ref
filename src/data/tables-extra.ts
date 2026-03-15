import type { CSSPropertyFull } from "../types";

export const tablesExtra: CSSPropertyFull[] = [
  {
    name: "caption-side",
    category: "Tables",
    description: "Sets the position of a table caption — top (default) or bottom of the table.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "caption-side: top | bottom",
    mdnPath: "caption-side",
    demo: `<div style="padding:10px;display:flex;gap:10px"><table style="border-collapse:collapse;font-size:9px"><caption style="caption-side:top;font-weight:700;color:#6366f1;padding:4px">Top Caption</caption><tr><td style="border:2px solid #6366f1;padding:6px">Cell</td></tr></table><table style="border-collapse:collapse;font-size:9px"><caption style="caption-side:bottom;font-weight:700;color:#8b5cf6;padding:4px">Bottom Caption</caption><tr><td style="border:2px solid #8b5cf6;padding:6px">Cell</td></tr></table></div>`,
  },

  {
    name: "empty-cells",
    category: "Tables",
    description: "Controls whether empty table cells show their borders and background — show or hide.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "empty-cells: show | hide",
    mdnPath: "empty-cells",
    demo: `<div style="padding:10px;display:flex;gap:10px"><table style="border-collapse:separate;empty-cells:show;font-size:9px;border-spacing:4px"><tr><td style="border:2px solid #6366f1;padding:6px;background:#eef2ff;font-weight:700;color:#4338ca">A</td><td style="border:2px solid #6366f1;padding:6px;background:#eef2ff"></td></tr></table><table style="border-collapse:separate;empty-cells:hide;font-size:9px;border-spacing:4px"><tr><td style="border:2px solid #8b5cf6;padding:6px;background:#f5f3ff;font-weight:700;color:#7c3aed">A</td><td style="border:2px solid #8b5cf6;padding:6px;background:#f5f3ff"></td></tr></table></div>`,
  },
];
