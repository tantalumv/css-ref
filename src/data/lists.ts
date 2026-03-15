import type { CSSPropertyFull } from "../types";

export const lists: CSSPropertyFull[] = [
  {
    name: "list-style",
    category: "Lists",
    description: "Shorthand for list-style-type, list-style-position, and list-style-image.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "list-style: square inside",
    mdnPath: "list-style",
    demo: `<div style="padding:10px"><ul style="list-style:square inside;margin:0;padding:0;display:flex;flex-direction:column;gap:3px;font-size:10px;font-weight:700;color:#374151"><li>First item</li><li>Second item</li><li>Third item</li></ul></div>`,
  },

  {
    name: "list-style-type",
    category: "Lists",
    description: "Sets the marker type for list items: disc, circle, square, decimal, and many language-specific counters.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "list-style-type: disc | circle | square | decimal",
    mdnPath: "list-style-type",
    demo: `<div style="padding:10px;display:flex;gap:10px"><ul style="list-style-type:disc;margin:0;padding-left:14px;font-size:9px;font-weight:700"><li>disc</li><li>disc</li></ul><ul style="list-style-type:square;margin:0;padding-left:14px;font-size:9px;font-weight:700"><li>square</li><li>square</li></ul><ol style="list-style-type:decimal;margin:0;padding-left:14px;font-size:9px;font-weight:700"><li>decimal</li><li>decimal</li></ol></div>`,
  },

  {
    name: "list-style-position",
    category: "Lists",
    description: "Controls whether list markers are inside or outside the content flow of list items.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "list-style-position: inside | outside",
    mdnPath: "list-style-position",
    demo: `<div style="padding:10px;display:flex;gap:10px"><ul style="list-style-position:inside;list-style-type:disc;margin:0;padding:0;width:84px;font-size:9px;font-weight:700;background:#eef2ff;border-radius:4px"><li>inside marker wraps with text</li></ul><ul style="list-style-position:outside;list-style-type:disc;margin:0;padding-left:14px;width:84px;font-size:9px;font-weight:700;background:#f5f3ff;border-radius:4px"><li>outside marker wraps with text</li></ul></div>`,
  },

  {
    name: "list-style-image",
    category: "Lists",
    description: "Replaces the list marker with a custom image — use URL or gradient for unique bullets.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "list-style-image: url(marker.svg)",
    mdnPath: "list-style-image",
    demo: `<div style="padding:10px"><ul style="list-style-image:url(data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%228%22%20height=%228%22%3E%3Ccircle%20cx=%224%22%20cy=%224%22%20r=%223%22%20fill=%22%236366f1%22/%3E%3C/svg%3E);padding-left:18px;margin:0;font-size:10px;font-weight:700"><li>custom marker</li><li>custom marker</li></ul></div>`,
  },
];
