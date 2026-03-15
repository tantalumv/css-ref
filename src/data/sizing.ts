import type { CSSPropertyFull } from "../types";

export const sizing: CSSPropertyFull[] = [
  {
    name: "width / height",
    category: "Sizing",
    description: "Sets element dimensions. Supports fixed lengths, percentages, and intrinsic size keywords.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "width: auto | 100% | 300px | min-content | max-content | fit-content",
    mdnPath: "width",
    demo: `<div style="display:flex;flex-direction:column;gap:5px;padding:8px;width:100%"><div style="width:40%;height:18px;background:#06b6d4;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: 40%</div><div style="width:fit-content;height:18px;background:#0891b2;border-radius:3px;padding:0 8px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">fit-content</div><div style="width:100%;height:18px;background:#0e7490;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: 100%</div></div>`,
  },

  {
    name: "aspect-ratio",
    category: "Sizing",
    description: "Sets a preferred aspect ratio so the element automatically scales proportionally.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "aspect-ratio: auto | 16/9 | 1 | 4/3",
    mdnPath: "aspect-ratio",
    demo: `<div style="display:flex;gap:10px;align-items:flex-end;padding:8px"><div style="aspect-ratio:1;width:52px;background:#06b6d4;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">1:1</div><div style="aspect-ratio:16/9;height:40px;background:#0891b2;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">16:9</div><div style="aspect-ratio:4/3;height:44px;background:#0e7490;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">4:3</div></div>`,
  },

  {
    name: "min / max sizing",
    category: "Sizing",
    description: "min-width, max-width, min-height, max-height put hard constraints on element dimensions.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "max-width: 65ch;\nmin-height: 100svh;\nmax-inline-size: 80rem",
    mdnPath: "max-width",
    demo: `<div style="padding:8px;width:100%"><div style="max-width:160px;min-height:30px;background:#06b6d4;border-radius:5px;padding:6px;font-size:10px;font-weight:700;color:#fff;text-align:center">max-width: 160px<br>min-height: 30px</div></div>`,
  },

  {
    name: "box-sizing",
    category: "Sizing",
    description: "Controls whether padding and border are included in the element's stated width and height.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "box-sizing: content-box | border-box",
    mdnPath: "box-sizing",
    demo: `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:80px;box-sizing:content-box;background:#bae6fd;border:6px solid #06b6d4;border-radius:3px;padding:6px;font-size:9px;font-weight:700;color:#0e7490;text-align:center">content-box<br>+padding+border</div><div style="width:80px;box-sizing:border-box;background:#e0f2fe;border:6px solid #0891b2;border-radius:3px;padding:6px;font-size:9px;font-weight:700;color:#0e7490;text-align:center">border-box<br>all included</div></div>`,
  },

  {
    name: "inline-size",
    category: "Sizing",
    description: "Logical equivalent of width — adapts to writing direction. In vertical writing modes, this becomes height.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "inline-size: 100% | 300px | auto",
    mdnPath: "inline-size",
    demo: `<div style="padding:8px;width:100%"><div style="inline-size:60%;height:30px;background:#06b6d4;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">inline-size: 60%</div></div>`,
  },

  {
    name: "block-size",
    category: "Sizing",
    description: "Logical equivalent of height — adapts to writing direction. In vertical writing modes, this becomes width.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "block-size: auto | 200px | 100%",
    mdnPath: "block-size",
    demo: `<div style="padding:8px;width:100%"><div style="width:100%;block-size:50px;background:#0891b2;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">block-size: 50px</div></div>`,
  },

  {
    name: "min-inline-size",
    category: "Sizing",
    description: "Logical equivalent of min-width — adapts to writing direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "min-inline-size: 0 | 200px | 100%",
    mdnPath: "min-inline-size",
    demo: `<div style="padding:8px;width:100%"><div style="min-inline-size:120px;height:30px;background:#0e7490;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">min-inline-size: 120px</div></div>`,
  },

  {
    name: "min-block-size",
    category: "Sizing",
    description: "Logical equivalent of min-height — adapts to writing direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "min-block-size: auto | 100px | 100%",
    mdnPath: "min-block-size",
    demo: `<div style="padding:8px;width:100%"><div style="width:100%;min-block-size:40px;background:#06b6d4;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">min-block-size: 40px</div></div>`,
  },

  {
    name: "max-inline-size",
    category: "Sizing",
    description: "Logical equivalent of max-width — adapts to writing direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "max-inline-size: 80ch | none | 100%",
    mdnPath: "max-inline-size",
    demo: `<div style="padding:8px;width:100%"><div style="max-inline-size:140px;height:30px;background:#0891b2;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;padding:0 8px">max-inline-size: 140px</div></div>`,
  },

  {
    name: "max-block-size",
    category: "Sizing",
    description: "Logical equivalent of max-height — adapts to writing direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "max-block-size: 100svh | none",
    mdnPath: "max-block-size",
    demo: `<div style="padding:8px;width:100%"><div style="width:100%;max-block-size:60px;background:#0e7490;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;height:80px">max-block-size: 60px</div></div>`,
  },

  {
    name: "calc()",
    category: "Sizing",
    description: "Performs math on CSS values so you can combine units dynamically at runtime.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "width: calc(100% - 2rem)",
    mdnPath: "calc",
    demo: `<div style="padding:8px;width:100%;background:#ecfeff;border:2px dashed #06b6d4;border-radius:6px"><div style="width:calc(100% - 24px);height:26px;background:#06b6d4;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: calc(100% - 24px)</div></div>`,
  },

  {
    name: "min()",
    category: "Sizing",
    description: "Chooses the smallest value from a list of expressions.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "width: min(80vw, 320px)",
    mdnPath: "min",
    demo: `<div style="padding:8px;width:100%"><div style="width:min(80vw,160px);height:26px;background:#0891b2;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: min(80vw, 160px)</div></div>`,
  },

  {
    name: "max()",
    category: "Sizing",
    description: "Chooses the largest value from a list of expressions.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "width: max(12rem, 40%)",
    mdnPath: "max",
    demo: `<div style="padding:8px;width:100%"><div style="width:max(120px,40%);height:26px;background:#0e7490;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: max(120px, 40%)</div></div>`,
  },
];
