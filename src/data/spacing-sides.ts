import type { CSSPropertyFull } from "../types";

export const spacingSides: CSSPropertyFull[] = [
  {
    name: "margin-top",
    category: "Spacing",
    description: "Sets the top margin of an element — part of the margin-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "margin-top: 1rem | auto",
    mdnPath: "margin-top",
    demo: `<div style="padding:10px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px"><div style="margin-top:20px;background:#84cc16;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">margin-top: 20px</div></div>`,
  },

  {
    name: "margin-right",
    category: "Spacing",
    description: "Sets the right margin of an element — part of the margin-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "margin-right: 1rem | auto",
    mdnPath: "margin-right",
    demo: `<div style="padding:10px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px"><div style="margin-right:30px;background:#84cc16;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">margin-right: 30px</div></div>`,
  },

  {
    name: "margin-bottom",
    category: "Spacing",
    description: "Sets the bottom margin of an element — part of the margin-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "margin-bottom: 1rem | auto",
    mdnPath: "margin-bottom",
    demo: `<div style="padding:10px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px"><div style="margin-bottom:20px;background:#84cc16;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">margin-bottom: 20px</div></div>`,
  },

  {
    name: "margin-left",
    category: "Spacing",
    description: "Sets the left margin of an element — part of the margin-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "margin-left: 1rem | auto",
    mdnPath: "margin-left",
    demo: `<div style="padding:10px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px"><div style="margin-left:30px;background:#84cc16;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">margin-left: 30px</div></div>`,
  },

  {
    name: "margin-trim",
    category: "Spacing",
    description: "Trims margins of child elements at container edges — removes unwanted outer spacing.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: "margin-trim: block | inline | all",
    mdnPath: "margin-trim",
    demo: `<div style="padding:10px"><div style="margin-trim:block;background:#f7fee7;border:2px solid #84cc16;border-radius:6px;padding:0 10px"><p style="margin-block:16px 0;background:#84cc16;color:#fff;padding:4px;border-radius:3px;font-size:9px;font-weight:700">First item</p><p style="margin-block:16px;background:#84cc16;color:#fff;padding:4px;border-radius:3px;font-size:9px;font-weight:700">Second item</p></div><p style="font-size:8px;color:#888;margin-top:4px">Top margin of first item is trimmed</p></div>`,
  },

  {
    name: "padding-top",
    category: "Spacing",
    description: "Sets the top padding of an element — part of the padding-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "padding-top: 1rem",
    mdnPath: "padding-top",
    demo: `<div style="padding:10px;background:#f7fee7;border:3px solid #84cc16;border-radius:6px"><div style="padding-top:24px;background:#84cc16;color:#fff;border-radius:3px;font-size:9px;font-weight:700;text-align:center">padding-top: 24px</div></div>`,
  },

  {
    name: "padding-right",
    category: "Spacing",
    description: "Sets the right padding of an element — part of the padding-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "padding-right: 1rem",
    mdnPath: "padding-right",
    demo: `<div style="padding:10px;background:#f7fee7;border:3px solid #84cc16;border-radius:6px"><div style="padding-right:30px;background:#84cc16;color:#fff;border-radius:3px;font-size:9px;font-weight:700;text-align:center">padding-right</div></div>`,
  },

  {
    name: "padding-bottom",
    category: "Spacing",
    description: "Sets the bottom padding of an element — part of the padding-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "padding-bottom: 1rem",
    mdnPath: "padding-bottom",
    demo: `<div style="padding:10px;background:#f7fee7;border:3px solid #84cc16;border-radius:6px"><div style="padding-bottom:24px;background:#84cc16;color:#fff;border-radius:3px;font-size:9px;font-weight:700;text-align:center">padding-bottom</div></div>`,
  },

  {
    name: "padding-left",
    category: "Spacing",
    description: "Sets the left padding of an element — part of the padding-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "padding-left: 1rem",
    mdnPath: "padding-left",
    demo: `<div style="padding:10px;background:#f7fee7;border:3px solid #84cc16;border-radius:6px"><div style="padding-left:30px;background:#84cc16;color:#fff;border-radius:3px;font-size:9px;font-weight:700;text-align:center">padding-left</div></div>`,
  },
];
