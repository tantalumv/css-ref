import type { CSSProperty } from "../types";

export const spacingSides: CSSProperty[] = [
  {
    n: "margin-top",
    c: "Spacing",
    d: "Sets the top margin of an element — part of the margin-* shorthand properties.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "margin-top: 1rem | auto",
    m: "margin-top",
    demo: `<div style="padding:10px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px"><div style="margin-top:20px;background:#84cc16;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">margin-top: 20px</div></div>`,
  },

  {
    n: "margin-right",
    c: "Spacing",
    d: "Sets the right margin of an element — part of the margin-* shorthand properties.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "margin-right: 1rem | auto",
    m: "margin-right",
    demo: `<div style="padding:10px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px"><div style="margin-right:30px;background:#84cc16;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">margin-right: 30px</div></div>`,
  },

  {
    n: "margin-bottom",
    c: "Spacing",
    d: "Sets the bottom margin of an element — part of the margin-* shorthand properties.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "margin-bottom: 1rem | auto",
    m: "margin-bottom",
    demo: `<div style="padding:10px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px"><div style="margin-bottom:20px;background:#84cc16;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">margin-bottom: 20px</div></div>`,
  },

  {
    n: "margin-left",
    c: "Spacing",
    d: "Sets the left margin of an element — part of the margin-* shorthand properties.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "margin-left: 1rem | auto",
    m: "margin-left",
    demo: `<div style="padding:10px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px"><div style="margin-left:30px;background:#84cc16;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">margin-left: 30px</div></div>`,
  },

  {
    n: "margin-trim",
    c: "Spacing",
    d: "Trims margins of child elements at container edges — removes unwanted outer spacing.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "ltd",
    x: "margin-trim: block | inline | all",
    m: "margin-trim",
    demo: `<div style="padding:10px"><div style="margin-trim:block;background:#f7fee7;border:2px solid #84cc16;border-radius:6px;padding:0 10px"><p style="margin-block:16px 0;background:#84cc16;color:#fff;padding:4px;border-radius:3px;font-size:9px;font-weight:700">First item</p><p style="margin-block:16px;background:#84cc16;color:#fff;padding:4px;border-radius:3px;font-size:9px;font-weight:700">Second item</p></div><p style="font-size:8px;color:#888;margin-top:4px">Top margin of first item is trimmed</p></div>`,
  },

  {
    n: "padding-top",
    c: "Spacing",
    d: "Sets the top padding of an element — part of the padding-* shorthand properties.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "padding-top: 1rem",
    m: "padding-top",
    demo: `<div style="padding:10px;background:#f7fee7;border:3px solid #84cc16;border-radius:6px"><div style="padding-top:24px;background:#84cc16;color:#fff;border-radius:3px;font-size:9px;font-weight:700;text-align:center">padding-top: 24px</div></div>`,
  },

  {
    n: "padding-right",
    c: "Spacing",
    d: "Sets the right padding of an element — part of the padding-* shorthand properties.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "padding-right: 1rem",
    m: "padding-right",
    demo: `<div style="padding:10px;background:#f7fee7;border:3px solid #84cc16;border-radius:6px"><div style="padding-right:30px;background:#84cc16;color:#fff;border-radius:3px;font-size:9px;font-weight:700;text-align:center">padding-right</div></div>`,
  },

  {
    n: "padding-bottom",
    c: "Spacing",
    d: "Sets the bottom padding of an element — part of the padding-* shorthand properties.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "padding-bottom: 1rem",
    m: "padding-bottom",
    demo: `<div style="padding:10px;background:#f7fee7;border:3px solid #84cc16;border-radius:6px"><div style="padding-bottom:24px;background:#84cc16;color:#fff;border-radius:3px;font-size:9px;font-weight:700;text-align:center">padding-bottom</div></div>`,
  },

  {
    n: "padding-left",
    c: "Spacing",
    d: "Sets the left padding of an element — part of the padding-* shorthand properties.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "padding-left: 1rem",
    m: "padding-left",
    demo: `<div style="padding:10px;background:#f7fee7;border:3px solid #84cc16;border-radius:6px"><div style="padding-left:30px;background:#84cc16;color:#fff;border-radius:3px;font-size:9px;font-weight:700;text-align:center">padding-left</div></div>`,
  },
];
