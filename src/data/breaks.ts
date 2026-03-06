import type { CSSProperty } from "../types";

export const breaks: CSSProperty[] = [
  {
    n: "orphans",
    c: "Breaks",
    d: "Sets the minimum number of lines that must be left at the bottom of a page when a paragraph breaks across pages.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "orphans: 2",
    m: "orphans",
    demo: `<div style="padding:10px"><div style="columns:2;column-gap:10px;width:200px;font-size:9px;line-height:1.4;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="orphans:3;margin:0;font-weight:700;color:#92400e">This paragraph needs at least 3 lines at the bottom of a column. Extra text to demonstrate.</p><p style="margin:6px 0 0;font-weight:700;color:#92400e">More content here.</p></div></div>`,
  },

  {
    n: "page-break-after",
    c: "Breaks",
    d: "Forces or prevents a page break after the element — use avoid to keep content together.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "page-break-after: always | auto | avoid",
    m: "page-break-after",
    demo: `<div style="padding:10px"><div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#92400e;text-align:center">Section 1</div><div style="page-break-after:always;margin:4px 0;font-size:8px;color:#f59e0b;text-align:center">↓ page-break-after:always ↓</div><div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#92400e;text-align:center">Section 2 (new page)</div></div>`,
  },

  {
    n: "page-break-before",
    c: "Breaks",
    d: "Forces or prevents a page break before the element — useful for chapter headings.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "page-break-before: always | auto | avoid",
    m: "page-break-before",
    demo: `<div style="padding:10px"><div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#92400e;text-align:center">Chapter 1</div><div style="page-break-before:always;margin:4px 0;font-size:8px;color:#f59e0b;text-align:center">↓ page-break-before:always ↓</div><div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#92400e;text-align:center">Chapter 2 (new page)</div></div>`,
  },

  {
    n: "page-break-inside",
    c: "Breaks",
    d: "Prevents page breaks inside an element — critical for tables and figures that must stay intact.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "page-break-inside: avoid | auto",
    m: "page-break-inside",
    demo: `<div style="padding:10px"><div style="page-break-inside:avoid;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="margin:0;font-size:9px;font-weight:700;color:#92400e">Important Table</p><table style="width:100%;font-size:8px;margin-top:4px;border-collapse:collapse"><tr><td style="border:1px solid #f59e0b;padding:2px">Row 1</td></tr><tr><td style="border:1px solid #f59e0b;padding:2px">Row 2</td></tr></table></div></div>`,
  },

  {
    n: "widows",
    c: "Breaks",
    d: "Sets the minimum number of lines that must appear at the top of a new page/column when text breaks.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "widows: 2",
    m: "widows",
    demo: `<div style="padding:10px"><div style="columns:2;column-gap:10px;width:200px;font-size:9px;line-height:1.4;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="widows:3;margin:0;font-weight:700;color:#92400e">This paragraph requires at least 3 lines at the top of the next column if it breaks across columns.</p></div></div>`,
  },
];
