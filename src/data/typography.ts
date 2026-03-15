import type { CSSPropertyFull } from "../types";

export const typography: CSSPropertyFull[] = [
  {
    name: "font-size",
    category: "Typography",
    description: "Sets the font size — supports px, rem, em, %, and fluid functions like clamp().",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "font-size: 1rem | clamp(1rem, 0.5rem + 2vw, 2rem)",
    mdnPath: "font-size",
    demo: `<div style="display:flex;align-items:baseline;gap:10px;padding:8px"><span style="font-size:10px;font-weight:700;color:#ec4899">sm</span><span style="font-size:16px;font-weight:700;color:#ec4899">md</span><span style="font-size:24px;font-weight:700;color:#ec4899">lg</span><span style="font-size:34px;font-weight:900;color:#ec4899">xl</span></div>`,
    values: [
      {
        value: "px",
        label: "Pixels",
        description:
          "Absolute size in pixels. Precise but not responsive to user preferences or viewport.",
      },
      {
        value: "rem",
        label: "Root EM",
        description:
          "Relative to the root element's font-size. 1rem equals the user's default font size (usually 16px). Better for accessibility.",
      },
      {
        value: "em",
        label: "EM",
        description:
          "Relative to parent element's font-size. Can compound when nested, so use with caution.",
      },
      {
        value: "clamp()",
        label: "Clamp Function",
        description:
          "Creates fluid typography that scales with viewport. clamp(min, preferred, max) constrains between min and max.",
      },
    ],
  },

  {
    name: "font-family",
    category: "Typography",
    description: "Specifies the typeface or ordered font stack to use.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: 'font-family: "Inter", system-ui, sans-serif',
    mdnPath: "font-family",
    demo: `<div style="display:flex;flex-direction:column;gap:5px;padding:8px"><p style="font-family:system-ui;font-size:16px;font-weight:700;color:#ec4899">Aa — system-ui sans-serif</p><p style="font-family:Georgia,serif;font-size:16px;font-weight:700;color:#db2777">Aa — Georgia, serif</p><p style="font-family:ui-monospace,monospace;font-size:14px;font-weight:700;color:#be185d">Aa — monospace</p></div>`,
  },

  {
    name: "font-weight",
    category: "Typography",
    description: "Sets the weight (boldness) of the font, from 100 (thin) to 900 (black).",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "font-weight: normal | bold | 400 | 700",
    mdnPath: "font-weight",
    demo: `<div style="display:flex;align-items:baseline;gap:8px;padding:8px">${[100, 300, 400, 700, 900].map((w) => `<span style="font-weight:${w};font-size:${10 + w / 110}px;color:#ec4899">${w}</span>`).join("")}</div>`,
    values: [
      {
        value: "100",
        label: "Thin",
        description: "Extra light or thin appearance. Not available in all fonts.",
      },
      {
        value: "300",
        label: "Light",
        description: "Light or thin weight. Good for large display text.",
      },
      {
        value: "400",
        label: "Normal",
        description: "Regular or normal weight. The default for most text.",
      },
      { value: "500", label: "Medium", description: "Medium weight. Slightly bolder than normal." },
      {
        value: "700",
        label: "Bold",
        description: "Bold weight. The most common weight for emphasized text.",
      },
      {
        value: "900",
        label: "Black",
        description: "Black or extra bold. The heaviest available weight.",
      },
    ],
  },

  {
    name: "line-height",
    category: "Typography",
    description: "Sets the height of a line box, controlling vertical spacing between lines of text.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "line-height: normal | 1.5 | 1.6 | 24px",
    mdnPath: "line-height",
    demo: `<div style="display:flex;gap:12px;padding:6px"><div style="width:90px"><p style="line-height:1;font-size:10px;font-weight:700;color:#ec4899;background:#fdf2f8;padding:4px;border-radius:3px">Tight line height 1.0 makes text very compact</p></div><div style="width:90px"><p style="line-height:1.8;font-size:10px;font-weight:700;color:#db2777;background:#fdf2f8;padding:4px;border-radius:3px">Loose 1.8 gives breathing room</p></div></div>`,
    values: [
      {
        value: "normal",
        label: "Normal",
        description: "Browser default, typically around 1.2-1.5 depending on the font.",
      },
      {
        value: "number",
        label: "Unitless Number",
        description:
          "Multiplies the font size. line-height: 1.5 means text is 1.5x the font size tall. Recommended approach.",
      },
      {
        value: "px",
        label: "Pixels",
        description: "Fixed line height in pixels. Less flexible than unitless values.",
      },
      {
        value: "%",
        label: "Percentage",
        description: "Percentage of the font size. 150% equals unitless 1.5.",
      },
    ],
  },

  {
    name: "letter-spacing",
    category: "Typography",
    description: "Sets horizontal spacing (tracking) between characters.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "letter-spacing: normal | 0.05em | -0.02em",
    mdnPath: "letter-spacing",
    demo: `<div style="display:flex;flex-direction:column;gap:5px;padding:10px"><p style="letter-spacing:-.04em;font-size:15px;font-weight:800;color:#ec4899">Tight tracking</p><p style="letter-spacing:.08em;font-size:13px;font-weight:700;color:#db2777;text-transform:uppercase">Wide spacing</p></div>`,
  },

  {
    name: "text-wrap",
    category: "Typography",
    description: "Controls text wrapping — balance distributes evenly, pretty avoids orphans at paragraph ends.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2024",
    example: "text-wrap: wrap | nowrap | balance | pretty | stable",
    mdnPath: "text-wrap",
    demo: `<div style="display:flex;gap:10px;padding:8px;align-items:start"><div style="width:90px"><p style="text-wrap:balance;font-size:10px;line-height:1.4;color:#ec4899;font-weight:700;background:#fdf2f8;padding:4px;border-radius:3px">text-wrap: balance keeps lines even</p></div><div style="width:90px"><p style="font-size:10px;line-height:1.4;color:#888;background:#f5f5f5;padding:4px;border-radius:3px">Normal wrap can leave short orphans at the end</p></div></div>`,
    values: [
      {
        value: "wrap",
        label: "Wrap",
        description:
          "Default wrapping behavior. May leave short lines at paragraph ends (orphans).",
      },
      {
        value: "nowrap",
        label: "No Wrap",
        description: "Prevents all wrapping. Text continues on a single line.",
      },
      {
        value: "balance",
        label: "Balance",
        description:
          "Distributes line lengths more evenly within a heading or short paragraph. Best for short texts.",
      },
      {
        value: "pretty",
        label: "Pretty",
        description:
          "Adjusts line breaks to avoid orphans at the end of paragraphs. Better for longer text blocks.",
      },
    ],
  },

  {
    name: "text-decoration",
    category: "Typography",
    description: "Adds decorative lines to text — underline, overline, line-through, with style and colour control.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-decoration: underline | overline dashed red | line-through",
    mdnPath: "text-decoration",
    demo: `<div style="display:flex;flex-direction:column;gap:6px;padding:10px"><p style="text-decoration:underline;text-decoration-color:#6366f1;text-decoration-thickness:2px;font-size:13px;font-weight:700;color:#111">Underline</p><p style="text-decoration:line-through;text-decoration-color:#ec4899;font-size:13px;font-weight:700;color:#111">Line-through</p><p style="text-decoration:overline wavy #f97316;font-size:13px;font-weight:700;color:#111">Wavy overline</p></div>`,
    values: [
      {
        value: "underline",
        label: "Underline",
        description: "Adds a line below the text. Often used for links.",
      },
      {
        value: "overline",
        label: "Overline",
        description: "Adds a line above the text. Rarely used but available.",
      },
      {
        value: "line-through",
        label: "Line Through",
        description: "Adds a line through the middle of text. Used to indicate deleted content.",
      },
      {
        value: "wavy",
        label: "Wavy",
        description: "Style modifier that makes the line wavy instead of solid.",
      },
      {
        value: "dashed",
        label: "Dashed",
        description: "Style modifier that makes the line dashed instead of solid.",
      },
    ],
  },

  {
    name: "clamp()",
    category: "Typography",
    description: "Math function that constrains a value between a min and max with a fluid preferred value.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "font-size: clamp(1rem, 0.5rem + 2vw, 1.5rem)",
    mdnPath: "clamp",
    demo: `<div style="padding:10px;text-align:center"><p style="font-size:clamp(12px,3vw,28px);font-weight:900;color:#ec4899;line-height:1.2">Fluid<br>Typography</p><p style="font-size:10px;color:#888;margin-top:4px;font-weight:700">clamp(12px, 3vw, 28px)</p></div>`,
  },

  {
    name: "font-optical-sizing",
    category: "Typography",
    description: "Allows font glyphs to be adjusted optically for different font sizes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "font-optical-sizing: auto | none",
    mdnPath: "font-optical-sizing",
    demo: `<div style="display:flex;align-items:baseline;gap:12px;padding:10px"><span style="font-optical-sizing:auto;font-size:32px;font-weight:900;color:#ec4899">Aa</span><span style="font-optical-sizing:none;font-size:32px;font-weight:900;color:#db2777">Aa</span><div style="font-size:9px;color:#888;font-weight:700">auto · none</div></div>`,
  },

  {
    name: "text-align",
    category: "Typography",
    description: "Sets the horizontal alignment of inline content — left, right, center, justify, or match-parent.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-align: left | right | center | justify | start | end",
    mdnPath: "text-align",
    demo: `<div style="display:flex;flex-direction:column;gap:4px;padding:8px;width:180px"><p style="text-align:left;font-size:10px;font-weight:700;color:#ec4899;background:#fdf2f8;padding:4px;border-radius:3px;margin:0">← Left aligned text</p><p style="text-align:center;font-size:10px;font-weight:700;color:#db2777;background:#fdf2f8;padding:4px;border-radius:3px;margin:0">Center →</p><p style="text-align:right;font-size:10px;font-weight:700;color:#be185d;background:#fdf2f8;padding:4px;border-radius:3px;margin:0">Right aligned →</p></div>`,
    values: [
      {
        value: "left",
        label: "Left",
        description: "Aligns text to the left edge. Default for LTR languages.",
      },
      {
        value: "right",
        label: "Right",
        description: "Aligns text to the right edge. Default for RTL languages.",
      },
      {
        value: "center",
        label: "Center",
        description: "Centers text horizontally within its container.",
      },
      {
        value: "justify",
        label: "Justify",
        description:
          "Aligns text to both left and right edges by adjusting word spacing. Creates clean edges on both sides.",
      },
      {
        value: "start",
        label: "Start",
        description: "Same as left in LTR, right in RTL. Adapts to text direction.",
      },
      {
        value: "end",
        label: "End",
        description: "Same as right in LTR, left in RTL. Adapts to text direction.",
      },
    ],
  },

  {
    name: "white-space",
    category: "Typography",
    description: "Controls how white space is handled and whether text wraps — nowrap, pre, pre-wrap, pre-line, break-spaces.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "white-space: normal | nowrap | pre | pre-wrap | pre-line",
    mdnPath: "white-space",
    demo: `<div style="display:flex;flex-direction:column;gap:4px;padding:8px"><div style="width:140px;background:#e0e7ff;border:2px solid #6366f1;border-radius:4px;padding:6px"><p style="white-space:nowrap;font-size:9px;font-weight:700;color:#6366f1;margin:0;overflow:hidden">nowrap: text won't wrap</p></div><div style="width:140px;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:4px;padding:6px"><p style="white-space:pre-wrap;font-size:9px;font-weight:700;color:#8b5cf6;margin:0">pre-wrap:  respects   spaces</p></div></div>`,
    values: [
      {
        value: "normal",
        label: "Normal",
        description: "Whitespace is collapsed and text wraps. Default behavior.",
      },
      {
        value: "nowrap",
        label: "No Wrap",
        description: "Prevents text from wrapping. All text appears on one line.",
      },
      {
        value: "pre",
        label: "Preserve",
        description:
          "Preserves whitespace and line breaks exactly as in the source. Like <pre> tag.",
      },
      {
        value: "pre-wrap",
        label: "Preserve & Wrap",
        description: "Preserves whitespace but wraps text when needed.",
      },
      {
        value: "pre-line",
        label: "Preserve Lines",
        description: "Collapses whitespace but preserves line breaks from source.",
      },
    ],
  },

  {
    name: "text-overflow",
    category: "Typography",
    description: "Controls how overflowed text is signaled — ellipsis, clip, or custom string (Firefox).",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: 'text-overflow: clip | ellipsis | "…"',
    mdnPath: "text-overflow",
    demo: `<div style="display:flex;flex-direction:column;gap:6px;padding:8px"><div style="width:140px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;background:#e0e7ff;border:2px solid #6366f1;border-radius:4px;padding:6px"><span style="font-size:10px;font-weight:700;color:#6366f1">Long text with ellipsis truncation...</span></div><div style="width:140px;overflow:hidden;white-space:nowrap;text-overflow:clip;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:4px;padding:6px"><span style="font-size:10px;font-weight:700;color:#8b5cf6">Long text with clip truncat</span></div></div>`,
  },

  {
    name: "text-shadow",
    category: "Typography",
    description: "Adds shadow effects to text — accepts offset-x, offset-y, blur-radius, and color.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-shadow: 2px 2px 4px rgba(0,0,0,0.5)",
    mdnPath: "text-shadow",
    demo: `<div style="display:flex;flex-direction:column;gap:6px;padding:10px"><p style="font-size:18px;font-weight:900;color:#fff;text-shadow:2px 2px 4px rgba(0,0,0,0.5);margin:0">Soft Shadow</p><p style="font-size:18px;font-weight:900;color:#ec4899;text-shadow:3px 3px 0 #be185d;margin:0">Hard Shadow</p><p style="font-size:16px;font-weight:900;color:#fff;text-shadow:0 0 8px #ec4899;margin:0">Glow Effect</p></div>`,
  },
];
