import type { CSSPropertyFull } from "../types";

export const visualBorders: CSSPropertyFull[] = [
  {
    name: "border-color",
    category: "Visual",
    description: "Sets the color of all four borders — can specify 1-4 values for top/right/bottom/left.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-color: #6366f1 #ec4899 #f97316 #10b981",
    mdnPath: "border-color",
    demo: `<div style="padding:10px;display:flex;gap:8px;align-items:center"><div style="width:60px;height:60px;border:6px solid;border-color:#6366f1 #ec4899 #f97316 #10b981;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#374151;background:#f9fafb">4 colors</div></div>`,
  },

  {
    name: "border-style",
    category: "Visual",
    description: "Sets the line style of all four borders — solid, dashed, dotted, double, groove, ridge, inset, outset, none, hidden.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-style: solid dashed dotted double",
    mdnPath: "border-style",
    demo: `<div style="padding:10px;display:flex;gap:8px;align-items:center"><div style="width:60px;height:60px;border:4px #6366f1;border-style:solid dashed dotted double;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#374151;background:#f9fafb">4 styles</div></div>`,
  },

  {
    name: "border-width",
    category: "Visual",
    description: "Sets the width of all four borders — can specify 1-4 values for top/right/bottom/left.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-width: 1px 2px 3px 4px",
    mdnPath: "border-width",
    demo: `<div style="padding:10px;display:flex;gap:8px;align-items:center"><div style="width:60px;height:60px;border:solid #6366f1;border-width:2px 4px 6px 8px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#374151;background:#f9fafb">4 widths</div></div>`,
  },

  {
    name: "border-top",
    category: "Visual",
    description: "Shorthand for border-top-width, border-top-style, and border-top-color.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-top: 2px solid #6366f1",
    mdnPath: "border-top",
    demo: `<div style="padding:10px"><div style="width:100px;height:50px;border-top:4px solid #6366f1;background:#eef2ff;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#4338ca">border-top</div></div>`,
  },

  {
    name: "border-right",
    category: "Visual",
    description: "Shorthand for border-right-width, border-right-style, and border-right-color.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-right: 2px dashed #ec4899",
    mdnPath: "border-right",
    demo: `<div style="padding:10px"><div style="width:100px;height:50px;border-right:4px dashed #ec4899;background:#fdf2f8;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#be185d">border-right</div></div>`,
  },

  {
    name: "border-bottom",
    category: "Visual",
    description: "Shorthand for border-bottom-width, border-bottom-style, and border-bottom-color.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-bottom: 2px dotted #f97316",
    mdnPath: "border-bottom",
    demo: `<div style="padding:10px"><div style="width:100px;height:50px;border-bottom:4px dotted #f97316;background:#fff7ed;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#c2410c">border-bottom</div></div>`,
  },

  {
    name: "border-left",
    category: "Visual",
    description: "Shorthand for border-left-width, border-left-style, and border-left-color.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-left: 2px solid #10b981",
    mdnPath: "border-left",
    demo: `<div style="padding:10px"><div style="width:100px;height:50px;border-left:4px solid #10b981;background:#f0fdf4;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#15803d">border-left</div></div>`,
  },
];
