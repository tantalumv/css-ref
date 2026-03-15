import type { CSSPropertyFull } from "../types";

export const typographyExtra: CSSPropertyFull[] = [
  {
    name: "hanging-punctuation",
    category: "Typography",
    description: "Controls whether punctuation marks hang outside the line box at the start/end of lines.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: "hanging-punctuation: none | first | last | allow-end",
    mdnPath: "hanging-punctuation",
    demo: `<div style="padding:10px"><div style="width:140px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="hanging-punctuation:first last;margin:0;font-size:10px;font-weight:700;color:#92400e">"Hanging quotes appear outside the margin"</p></div></div>`,
  },

  {
    name: "hyphenate-character",
    category: "Typography",
    description: "Specifies the character used for hyphenation at the end of lines.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: 'hyphenate-character: "-" | "•"',
    mdnPath: "hyphenate-character",
    demo: `<div style="padding:10px"><div style="width:80px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;hyphens:auto;hyphenate-character:'•'"><p style="margin:0;font-size:10px;font-weight:700;color:#92400e">Extraordinarily long word</p></div></div>`,
  },

  {
    name: "hyphens",
    category: "Typography",
    description: "Controls how words are hyphenated when breaking across lines — manual, auto, or none.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "hyphens: none | manual | auto",
    mdnPath: "hyphens",
    demo: `<div style="padding:10px;display:flex;gap:8px"><div style="width:70px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:6px"><p style="hyphens:none;margin:0;font-size:9px;font-weight:700;color:#92400e">Extraordinarily</p></div><div style="width:70px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:6px"><p style="hyphens:auto;margin:0;font-size:9px;font-weight:700;color:#92400e">Extraordinarily</p></div></div>`,
  },

  {
    name: "overflow-wrap",
    category: "Typography",
    description: "Controls how words break when they overflow their container — break-word allows mid-word breaks.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "overflow-wrap: normal | break-word | anywhere",
    mdnPath: "overflow-wrap",
    demo: `<div style="padding:10px;display:flex;gap:8px"><div style="width:80px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:6px;overflow-wrap:normal"><p style="margin:0;font-size:9px;font-weight:700;color:#92400e">Supercalifragilistic</p></div><div style="width:80px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:6px;overflow-wrap:break-word"><p style="margin:0;font-size:9px;font-weight:700;color:#92400e">Supercalifragilistic</p></div></div>`,
  },

  {
    name: "tab-size",
    category: "Typography",
    description: "Sets the width of tab characters (U+0009) — number of spaces or length value.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "tab-size: 2 | 4 | 8",
    mdnPath: "tab-size",
    demo: `<div style="padding:10px;display:flex;gap:8px"><div style="background:#e0e7ff;border:2px solid #6366f1;border-radius:5px;padding:6px;tab-size:4;font-family:monospace;font-size:10px;color:#4338ca;font-weight:700">tab:4<span style="display:inline-block;width:4ch;background:#c7d2fe;height:8px;margin-left:2px"></span></div><div style="background:#f5f3ff;border:2px solid #8b5cf6;border-radius:5px;padding:6px;tab-size:8;font-family:monospace;font-size:10px;color:#7c3aed;font-weight:700">tab:8<span style="display:inline-block;width:8ch;background:#ddd6fe;height:8px;margin-left:2px"></span></div></div>`,
  },

  {
    name: "text-align-last",
    category: "Typography",
    description: "Controls alignment of the last line of text — useful for justified paragraphs.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-align-last: auto | left | right | center | justify",
    mdnPath: "text-align-last",
    demo: `<div style="padding:10px"><div style="width:160px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="text-align:justify;text-align-last:center;margin:0;font-size:9px;font-weight:700;color:#92400e">This paragraph is justified with the last line centered in the block.</p></div></div>`,
  },

  {
    name: "text-autospace",
    category: "Typography",
    description: "Controls automatic spacing between ideographic and non-ideographic text.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: "text-autospace: normal | ideograph-alpha",
    mdnPath: "text-autospace",
    demo: `<div style="padding:10px"><div style="text-autospace:ideograph-alpha;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:10px;font-weight:700;color:#92400e">中文English混排</div></div>`,
  },

  {
    name: "text-indent",
    category: "Typography",
    description: "Indents the first line of a block-level element — negative values create hanging indents.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-indent: 2em | 1rem | -1em",
    mdnPath: "text-indent",
    demo: `<div style="padding:10px"><div style="width:160px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="text-indent:2em;margin:0;font-size:9px;font-weight:700;color:#92400e">This paragraph has its first line indented by 2em, like traditional paragraphs.</p></div></div>`,
  },

  {
    name: "text-justify",
    category: "Typography",
    description: "Controls the justification algorithm when text-align: justify is set.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-justify: auto | inter-word | inter-character",
    mdnPath: "text-justify",
    demo: `<div style="padding:10px"><div style="width:160px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="text-align:justify;text-justify:inter-word;margin:0;font-size:9px;font-weight:700;color:#92400e">Text is justified with spacing distributed between words only.</p></div></div>`,
  },

  {
    name: "text-rendering",
    category: "Typography",
    description: "Hints to the browser about trade-offs in rendering text — speed vs legibility vs geometric precision.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-rendering: auto | optimizeSpeed | optimizeLegibility | geometricPrecision",
    mdnPath: "text-rendering",
    demo: `<div style="padding:10px;display:flex;flex-direction:column;gap:4px"><div style="text-rendering:optimizeLegibility;background:#e0e7ff;border:2px solid #6366f1;border-radius:4px;padding:6px;font-size:10px;font-weight:700;color:#4338ca">optimizeLegibility — better kerning</div><div style="text-rendering:optimizeSpeed;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:4px;padding:6px;font-size:10px;font-weight:700;color:#7c3aed">optimizeSpeed — faster</div></div>`,
  },

  {
    name: "text-spacing-trim",
    category: "Typography",
    description: "Controls spacing around punctuation characters in CJK text.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: "text-spacing-trim: normal | space-all | trim-start",
    mdnPath: "text-spacing-trim",
    demo: `<div style="padding:10px"><div style="text-spacing-trim:trim-start;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:12px;font-weight:700;color:#92400e">「 trimming 」</div></div>`,
  },

  {
    name: "text-transform",
    category: "Typography",
    description: "Controls text case transformation — uppercase, lowercase, capitalize, or none.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-transform: none | uppercase | lowercase | capitalize",
    mdnPath: "text-transform",
    demo: `<div style="padding:10px;display:flex;flex-direction:column;gap:4px"><div style="text-transform:uppercase;background:#e0e7ff;border:2px solid #6366f1;border-radius:4px;padding:6px;font-size:10px;font-weight:700;color:#4338ca">uppercase text</div><div style="text-transform:capitalize;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:4px;padding:6px;font-size:10px;font-weight:700;color:#7c3aed">capitalize each word</div></div>`,
  },

  {
    name: "word-break",
    category: "Typography",
    description: "Controls how words break at the end of lines — break-all allows breaks within words.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "word-break: normal | break-all | keep-all",
    mdnPath: "word-break",
    demo: `<div style="padding:10px;display:flex;gap:8px"><div style="width:70px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:6px;word-break:normal"><p style="margin:0;font-size:9px;font-weight:700;color:#92400e">SuperLongWord</p></div><div style="width:70px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:6px;word-break:break-all"><p style="margin:0;font-size:9px;font-weight:700;color:#92400e">SuperLongWord</p></div></div>`,
  },
];
