import type { CSSPropertyFull } from "../types";

export const misc: CSSPropertyFull[] = [
  {
    name: "all",
    category: "Misc",
    description: "Resets all CSS properties to their initial, inherited, or unset values — useful for component isolation.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "all: unset | revert | initial",
    mdnPath: "all",
    demo: `<div style="padding:10px"><div style="all:unset;background:#6366f1;color:#fff;padding:8px;border-radius:5px;font-size:9px;font-weight:700;border:2px solid #4338ca">all: unset — resets styles</div></div>`,
  },

  {
    name: "counter-increment",
    category: "Misc",
    description: "Increases a CSS counter value by a specified amount — used with counter-reset and content.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "counter-increment: section",
    mdnPath: "counter-increment",
    demo: `<div style="padding:10px"><div style="counter-reset:item"><div style="counter-increment:item;padding:4px 8px;background:#6366f1;color:#fff;border-radius:3px;font-size:9px;font-weight:700;margin-bottom:4px"><span style="color:#c7d2fe">Item </span><span style="background:#4338ca;padding:2px 6px;border-radius:2px">1</span></div><div style="counter-increment:item;padding:4px 8px;background:#6366f1;color:#fff;border-radius:3px;font-size:9px;font-weight:700"><span style="color:#c7d2fe">Item </span><span style="background:#4338ca;padding:2px 6px;border-radius:2px">2</span></div></div></div>`,
  },

  {
    name: "counter-reset",
    category: "Misc",
    description: "Creates or resets a CSS counter to a specific value — use with counter-increment and content.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "counter-reset: section 0",
    mdnPath: "counter-reset",
    demo: `<div style="padding:10px"><div style="counter-reset:section 5"><div style="padding:4px 8px;background:#6366f1;color:#fff;border-radius:3px;font-size:9px;font-weight:700"><span style="color:#c7d2fe">Counter starts at: </span><span style="background:#4338ca;padding:2px 6px;border-radius:2px">5</span></div></div></div>`,
  },

  {
    name: "counter-set",
    category: "Misc",
    description: "Sets a CSS counter to a specific value without creating a new scope — newer alternative to counter-reset.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "counter-set: section 3",
    mdnPath: "counter-set",
    demo: `<div style="padding:10px"><div style="counter-reset:count"><div style="counter-set:count 10;padding:4px 8px;background:#6366f1;color:#fff;border-radius:3px;font-size:9px;font-weight:700"><span style="color:#c7d2fe">counter-set to: </span><span style="background:#4338ca;padding:2px 6px;border-radius:2px">10</span></div></div></div>`,
  },

  {
    name: "direction",
    category: "Misc",
    description: "Sets the text direction — ltr (left-to-right) or rtl (right-to-left) — affects layout and text flow.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "direction: ltr | rtl",
    mdnPath: "direction",
    demo: `<div style="padding:10px;display:flex;flex-direction:column;gap:6px"><div style="direction:ltr;background:#6366f1;color:#fff;padding:8px;border-radius:5px;font-size:9px;font-weight:700;text-align:start">← direction: ltr</div><div style="direction:rtl;background:#8b5cf6;color:#fff;padding:8px;border-radius:5px;font-size:9px;font-weight:700;text-align:start">direction: rtl →</div></div>`,
  },

  {
    name: "quotes",
    category: "Misc",
    description: "Sets the quotation marks used for embedded quotations — customisable for different languages.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: 'quotes: "\\201C" "\\201D" "\\2018" "\\2019"',
    mdnPath: "quotes",
    demo: `<div style="padding:10px"><div style="quotes:'«' '»' '‹' '›';background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:10px;font-weight:700;color:#92400e"><q>Outer <q>nested</q> quote</q></div></div>`,
  },

  {
    name: "text-orientation",
    category: "Misc",
    description: "Controls the orientation of characters in vertical writing modes — mixed, upright, or sideways.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-orientation: mixed | upright",
    mdnPath: "text-orientation",
    demo: `<div style="padding:10px;display:flex;gap:10px"><div style="writing-mode:vertical-rl;text-orientation:mixed;background:#6366f1;color:#fff;padding:8px;border-radius:5px;font-size:10px;font-weight:700;height:80px">mixed 123</div><div style="writing-mode:vertical-rl;text-orientation:upright;background:#8b5cf6;color:#fff;padding:8px;border-radius:5px;font-size:10px;font-weight:700;height:80px">upright 123</div></div>`,
  },

  {
    name: "unicode-bidi",
    category: "Misc",
    description: "Controls how bidirectional text is handled — use with direction for complex multilingual layouts.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "unicode-bidi: normal | bidi-override | isolate",
    mdnPath: "unicode-bidi",
    demo: `<div style="padding:10px"><div style="unicode-bidi:bidi-override;direction:rtl;background:#6366f1;color:#fff;padding:8px;border-radius:5px;font-size:9px;font-weight:700">Hello World → dlroW olleH</div></div>`,
  },

  {
    name: "writing-mode",
    category: "Misc",
    description: "Sets whether text flows horizontally or vertically — affects the entire layout direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "writing-mode: horizontal-tb | vertical-rl",
    mdnPath: "writing-mode",
    demo: `<div style="padding:10px;display:flex;gap:10px"><div style="writing-mode:horizontal-tb;background:#6366f1;color:#fff;padding:8px;border-radius:5px;font-size:10px;font-weight:700">horizontal-tb</div><div style="writing-mode:vertical-rl;background:#8b5cf6;color:#fff;padding:8px;border-radius:5px;font-size:10px;font-weight:700;height:80px">vertical-rl</div></div>`,
  },
];
