import type { CSSProperty } from "../types";

export const sizing: CSSProperty[] = [
  {
    n: "width / height",
    c: "Sizing",
    d: "Sets element dimensions. Supports fixed lengths, percentages, and intrinsic size keywords.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "width: auto | 100% | 300px | min-content | max-content | fit-content",
    m: "width",
    demo: `<div style="display:flex;flex-direction:column;gap:5px;padding:8px;width:100%"><div style="width:40%;height:18px;background:#06b6d4;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: 40%</div><div style="width:fit-content;height:18px;background:#0891b2;border-radius:3px;padding:0 8px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">fit-content</div><div style="width:100%;height:18px;background:#0e7490;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: 100%</div></div>`,
  },

  {
    n: "aspect-ratio",
    c: "Sizing",
    d: "Sets a preferred aspect ratio so the element automatically scales proportionally.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "aspect-ratio: auto | 16/9 | 1 | 4/3",
    m: "aspect-ratio",
    demo: `<div style="display:flex;gap:10px;align-items:flex-end;padding:8px"><div style="aspect-ratio:1;width:52px;background:#06b6d4;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">1:1</div><div style="aspect-ratio:16/9;height:40px;background:#0891b2;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">16:9</div><div style="aspect-ratio:4/3;height:44px;background:#0e7490;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">4:3</div></div>`,
  },

  {
    n: "min / max sizing",
    c: "Sizing",
    d: "min-width, max-width, min-height, max-height put hard constraints on element dimensions.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "max-width: 65ch;\nmin-height: 100svh;\nmax-inline-size: 80rem",
    m: "max-width",
    demo: `<div style="padding:8px;width:100%"><div style="max-width:160px;min-height:30px;background:#06b6d4;border-radius:5px;padding:6px;font-size:10px;font-weight:700;color:#fff;text-align:center">max-width: 160px<br>min-height: 30px</div></div>`,
  },

  {
    n: "box-sizing",
    c: "Sizing",
    d: "Controls whether padding and border are included in the element's stated width and height.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "box-sizing: content-box | border-box",
    m: "box-sizing",
    demo: `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:80px;box-sizing:content-box;background:#bae6fd;border:6px solid #06b6d4;border-radius:3px;padding:6px;font-size:9px;font-weight:700;color:#0e7490;text-align:center">content-box<br>+padding+border</div><div style="width:80px;box-sizing:border-box;background:#e0f2fe;border:6px solid #0891b2;border-radius:3px;padding:6px;font-size:9px;font-weight:700;color:#0e7490;text-align:center">border-box<br>all included</div></div>`,
  },

  {
    n: "inline-size",
    c: "Sizing",
    d: "Logical equivalent of width — adapts to writing direction. In vertical writing modes, this becomes height.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "inline-size: 100% | 300px | auto",
    m: "inline-size",
    demo: `<div style="padding:8px;width:100%"><div style="inline-size:60%;height:30px;background:#06b6d4;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">inline-size: 60%</div></div>`,
  },

  {
    n: "block-size",
    c: "Sizing",
    d: "Logical equivalent of height — adapts to writing direction. In vertical writing modes, this becomes width.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "block-size: auto | 200px | 100%",
    m: "block-size",
    demo: `<div style="padding:8px;width:100%"><div style="width:100%;block-size:50px;background:#0891b2;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">block-size: 50px</div></div>`,
  },

  {
    n: "min-inline-size",
    c: "Sizing",
    d: "Logical equivalent of min-width — adapts to writing direction.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "min-inline-size: 0 | 200px | 100%",
    m: "min-inline-size",
    demo: `<div style="padding:8px;width:100%"><div style="min-inline-size:120px;height:30px;background:#0e7490;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">min-inline-size: 120px</div></div>`,
  },

  {
    n: "min-block-size",
    c: "Sizing",
    d: "Logical equivalent of min-height — adapts to writing direction.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "min-block-size: auto | 100px | 100%",
    m: "min-block-size",
    demo: `<div style="padding:8px;width:100%"><div style="width:100%;min-block-size:40px;background:#06b6d4;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">min-block-size: 40px</div></div>`,
  },

  {
    n: "max-inline-size",
    c: "Sizing",
    d: "Logical equivalent of max-width — adapts to writing direction.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "max-inline-size: 80ch | none | 100%",
    m: "max-inline-size",
    demo: `<div style="padding:8px;width:100%"><div style="max-inline-size:140px;height:30px;background:#0891b2;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;padding:0 8px">max-inline-size: 140px</div></div>`,
  },

  {
    n: "max-block-size",
    c: "Sizing",
    d: "Logical equivalent of max-height — adapts to writing direction.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "max-block-size: 100svh | none",
    m: "max-block-size",
    demo: `<div style="padding:8px;width:100%"><div style="width:100%;max-block-size:60px;background:#0e7490;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;height:80px">max-block-size: 60px</div></div>`,
  },

  {
    n: "calc()",
    c: "Sizing",
    d: "Performs math on CSS values so you can combine units dynamically at runtime.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "width: calc(100% - 2rem)",
    m: "calc",
    demo: `<div style="padding:8px;width:100%;background:#ecfeff;border:2px dashed #06b6d4;border-radius:6px"><div style="width:calc(100% - 24px);height:26px;background:#06b6d4;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: calc(100% - 24px)</div></div>`,
  },

  {
    n: "min()",
    c: "Sizing",
    d: "Chooses the smallest value from a list of expressions.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "width: min(80vw, 320px)",
    m: "min",
    demo: `<div style="padding:8px;width:100%"><div style="width:min(80vw,160px);height:26px;background:#0891b2;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: min(80vw, 160px)</div></div>`,
  },

  {
    n: "max()",
    c: "Sizing",
    d: "Chooses the largest value from a list of expressions.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "width: max(12rem, 40%)",
    m: "max",
    demo: `<div style="padding:8px;width:100%"><div style="width:max(120px,40%);height:26px;background:#0e7490;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: max(120px, 40%)</div></div>`,
  },
];
