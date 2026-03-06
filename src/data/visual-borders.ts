import type { CSSProperty } from "../types";

export const visualBorders: CSSProperty[] = [
  {
    n: "border-color",
    c: "Visual",
    d: "Sets the color of all four borders — can specify 1-4 values for top/right/bottom/left.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "border-color: #6366f1 #ec4899 #f97316 #10b981",
    m: "border-color",
    demo: `<div style="padding:10px;display:flex;gap:8px;align-items:center"><div style="width:60px;height:60px;border:6px solid;border-color:#6366f1 #ec4899 #f97316 #10b981;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#374151;background:#f9fafb">4 colors</div></div>`,
  },

  {
    n: "border-style",
    c: "Visual",
    d: "Sets the line style of all four borders — solid, dashed, dotted, double, groove, ridge, inset, outset, none, hidden.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "border-style: solid dashed dotted double",
    m: "border-style",
    demo: `<div style="padding:10px;display:flex;gap:8px;align-items:center"><div style="width:60px;height:60px;border:4px #6366f1;border-style:solid dashed dotted double;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#374151;background:#f9fafb">4 styles</div></div>`,
  },

  {
    n: "border-width",
    c: "Visual",
    d: "Sets the width of all four borders — can specify 1-4 values for top/right/bottom/left.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "border-width: 1px 2px 3px 4px",
    m: "border-width",
    demo: `<div style="padding:10px;display:flex;gap:8px;align-items:center"><div style="width:60px;height:60px;border:solid #6366f1;border-width:2px 4px 6px 8px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#374151;background:#f9fafb">4 widths</div></div>`,
  },

  {
    n: "border-top",
    c: "Visual",
    d: "Shorthand for border-top-width, border-top-style, and border-top-color.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "border-top: 2px solid #6366f1",
    m: "border-top",
    demo: `<div style="padding:10px"><div style="width:100px;height:50px;border-top:4px solid #6366f1;background:#eef2ff;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#4338ca">border-top</div></div>`,
  },

  {
    n: "border-right",
    c: "Visual",
    d: "Shorthand for border-right-width, border-right-style, and border-right-color.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "border-right: 2px dashed #ec4899",
    m: "border-right",
    demo: `<div style="padding:10px"><div style="width:100px;height:50px;border-right:4px dashed #ec4899;background:#fdf2f8;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#be185d">border-right</div></div>`,
  },

  {
    n: "border-bottom",
    c: "Visual",
    d: "Shorthand for border-bottom-width, border-bottom-style, and border-bottom-color.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "border-bottom: 2px dotted #f97316",
    m: "border-bottom",
    demo: `<div style="padding:10px"><div style="width:100px;height:50px;border-bottom:4px dotted #f97316;background:#fff7ed;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#c2410c">border-bottom</div></div>`,
  },

  {
    n: "border-left",
    c: "Visual",
    d: "Shorthand for border-left-width, border-left-style, and border-left-color.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "border-left: 2px solid #10b981",
    m: "border-left",
    demo: `<div style="padding:10px"><div style="width:100px;height:50px;border-left:4px solid #10b981;background:#f0fdf4;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#15803d">border-left</div></div>`,
  },
];
