import type { CSSPropertyFull } from "../types";

function createBorderRadiusDemo() {
  return `<div style="display:flex;gap:8px;align-items:center;padding:10px">${[
    ["0px", "0px"],
    ["4px", "4px"],
    ["10px", "10px"],
    ["50%", "50%"],
  ]
    .map(
      ([r, l]) =>
        `<div style="width:36px;height:36px;background:#10b981;border-radius:${r};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">${l}</div>`,
    )
    .join("")}</div>`;
}

function createBoxShadowDemo() {
  return `<div style="display:flex;gap:14px;padding:16px 10px;align-items:center">${[
    [`0 1px 3px rgba(0,0,0,.12)`, `sm`],
    [`0 4px 12px rgba(0,0,0,.15)`, `md`],
    [`0 10px 30px rgba(0,0,0,.2)`, `lg`],
  ]
    .map(
      ([s, l]) =>
        `<div style="width:36px;height:36px;background:#fff;border-radius:5px;box-shadow:${s};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#10b981">${l}</div>`,
    )
    .join("")}</div>`;
}

function createBackdropFilterDemo() {
  return `<div style="position:relative;width:200px;height:72px;background:linear-gradient(135deg,#6366f1,#ec4899,#f97316);border-radius:6px;overflow:hidden"><div style="position:absolute;inset:12px 20px;backdrop-filter:blur(8px) brightness(1.2);background:rgba(255,255,255,.15);border-radius:4px;border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">backdrop-filter: blur</div></div>`;
}

function createFilterDemo() {
  return `<div style="display:flex;gap:6px;padding:8px">${[
    ["none", "no filter"],
    ["grayscale(1)", "grayscale"],
    ["hue-rotate(180deg)", "hue"],
    ["brightness(1.5)", "bright"],
  ]
    .map(
      ([f, l]) =>
        `<div style="text-align:center"><div style="width:34px;height:34px;background:linear-gradient(135deg,#6366f1,#ec4899);border-radius:4px;filter:${f}"></div><p style="font-size:8px;color:#888;font-weight:700;margin-top:2px">${l}</p></div>`,
    )
    .join("")}</div>`;
}

function createClipPathDemo() {
  return `<div style="display:flex;gap:10px;padding:10px;align-items:center">${[
    ["circle(50%)", ""],
    ["polygon(50% 0,100% 100%,0 100%)", ""],
    ["polygon(0 0,100% 0,100% 75%,50% 100%,0 75%)", ""],
  ]
    .map(
      ([c]) =>
        `<div style="width:44px;height:44px;background:linear-gradient(135deg,#10b981,#06b6d4);clip-path:${c}"></div>`,
    )
    .join("")}</div>`;
}

function createMaskDemo() {
  return `<div style="padding:10px"><div style="width:180px;height:60px;background:linear-gradient(135deg,#6366f1,#ec4899,#f97316);border-radius:5px;mask:linear-gradient(to right,black 60%,transparent);-webkit-mask:linear-gradient(to right,black 60%,transparent);display:flex;align-items:center;padding-left:10px;font-size:11px;font-weight:700;color:#fff">Fading out →</div></div>`;
}

function createMixBlendModeDemo() {
  return `<div style="padding:10px;position:relative"><div style="width:80px;height:60px;background:#6366f1;border-radius:4px;position:relative;overflow:visible"><div style="position:absolute;left:25px;top:8px;width:60px;height:44px;background:#f97316;border-radius:4px;mix-blend-mode:multiply"></div></div><p style="font-size:9px;font-weight:700;color:#888;margin-top:4px">mix-blend-mode: multiply</p></div>`;
}

function createBorderDemo() {
  return `<div style="display:flex;gap:10px;padding:10px;align-items:center">${[
    [`2px solid #10b981`, `solid`],
    [`3px dashed #6366f1`, `dashed`],
    [`4px dotted #ec4899`, `dotted`],
  ]
    .map(
      ([b, l]) =>
        `<div style="width:50px;height:50px;border:${b};border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#374151;background:#f9fafb">${l}</div>`,
    )
    .join("")}</div>`;
}

function createOutlineDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:60px;height:50px;background:#f0fdf4;border-radius:4px;outline:2px solid #10b981;outline-offset:2px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#15803d">focus</div><div style="width:60px;height:50px;background:#eff6ff;border-radius:4px;outline:3px dashed #3b82f6;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#1d4ed8">dashed</div></div>`;
}

function createOutlineOffsetDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:50px;height:50px;background:#fef3c7;border:2px solid #f59e0b;border-radius:4px;outline:2px solid #f97316;outline-offset:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#92400e">+4px</div><div style="width:50px;height:50px;background:#fce7f3;border:2px solid #ec4899;border-radius:4px;outline:2px solid #db2777;outline-offset:-4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#9d174d">-4px</div></div>`;
}

function createBorderInlineDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:70px;height:50px;background:#f0fdf4;border-inline:4px solid #10b981;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#15803d">inline</div><div style="font-size:9px;color:#888;font-weight:700">left & right<br>(in LTR)</div></div>`;
}

function createBorderBlockDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:70px;height:50px;background:#fdf2f8;border-block:4px dashed #ec4899;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#be185d">block</div><div style="font-size:9px;color:#888;font-weight:700">top & bottom</div></div>`;
}

function createBorderInlineStartDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:70px;height:50px;background:#eef2ff;border-inline-start:4px solid #6366f1;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#4338ca">start</div><div style="font-size:9px;color:#888;font-weight:700">← left in LTR</div></div>`;
}

function createBorderInlineEndDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:70px;height:50px;background:#f5f3ff;border-inline-end:4px solid #8b5cf6;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#7c3aed">end</div><div style="font-size:9px;color:#888;font-weight:700">right in LTR →</div></div>`;
}

function createBorderBlockStartDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:70px;height:50px;background:#fefbeb;border-block-start:4px solid #f59e0b;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#b45309">start</div><div style="font-size:9px;color:#888;font-weight:700">top ↑</div></div>`;
}

function createBorderBlockEndDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:70px;height:50px;background:#fff7ed;border-block-end:4px solid #f97316;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#c2410c">end</div><div style="font-size:9px;color:#888;font-weight:700">bottom ↓</div></div>`;
}

function createBorderStartStartRadiusDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:60px;height:50px;background:#e0e7ff;border:2px solid #6366f1;border-start-start-radius:12px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#4338ca">start-start</div><div style="font-size:9px;color:#888;font-weight:700">top-left<br>in LTR</div></div>`;
}

function createBorderStartEndRadiusDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:60px;height:50px;background:#f5f3ff;border:2px solid #8b5cf6;border-start-end-radius:12px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#7c3aed">start-end</div><div style="font-size:9px;color:#888;font-weight:700">top-right<br>in LTR</div></div>`;
}

function createBorderEndStartRadiusDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:60px;height:50px;background:#fdf2f8;border:2px solid #ec4899;border-end-start-radius:12px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#be185d">end-start</div><div style="font-size:9px;color:#888;font-weight:700">bottom-left<br>in LTR</div></div>`;
}

function createBorderEndEndRadiusDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:60px;height:50px;background:#fff7ed;border:2px solid #f97316;border-end-end-radius:12px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#c2410c">end-end</div><div style="font-size:9px;color:#888;font-weight:700">bottom-right<br>in LTR</div></div>`;
}

function createBorderImageDemo() {
  return `<div style="padding:10px"><div style="border:6px solid transparent;border-image:linear-gradient(45deg,#6366f1,#ec4899) 1;background:#eef2ff;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">border-image</div></div>`;
}

export const visual: CSSPropertyFull[] = [
  {
    name: "border-radius",
    category: "Visual",
    description: "Rounds element corners. Supports per-corner values and elliptical radii.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-radius: 8px | 50% | 1rem 2rem / 0.5rem 1rem",
    mdnPath: "border-radius",
    default: "0",
    demo: createBorderRadiusDemo(),
  },

  {
    name: "box-shadow",
    category: "Visual",
    description: "Adds one or more drop shadows behind an element.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.06)",
    mdnPath: "box-shadow",
    default: "none",
    demo: createBoxShadowDemo(),
  },

  {
    name: "backdrop-filter",
    category: "Visual",
    description: "Applies graphical effects (blur, brightness, etc.) to the content behind an element.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: "backdrop-filter: blur(10px) saturate(1.5)",
    mdnPath: "backdrop-filter",
    demo: createBackdropFilterDemo(),
  },

  {
    name: "filter",
    category: "Visual",
    description: "Applies visual effects — blur, brightness, contrast, grayscale, drop-shadow — to an element.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "filter: blur(4px) | brightness(1.2) | drop-shadow(0 4px 6px #0003)",
    mdnPath: "filter",
    demo: createFilterDemo(),
  },

  {
    name: "clip-path",
    category: "Visual",
    description: "Clips the visible region of an element to a specified shape — circle, polygon, or SVG path.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "clip-path: circle(50%) | polygon(0 0, 100% 0, 50% 100%)",
    mdnPath: "clip-path",
    demo: createClipPathDemo(),
  },

  {
    name: "mask",
    category: "Visual",
    description: "Hides parts of an element using an image, gradient, or SVG as a masking layer.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2023",
    example: "mask: linear-gradient(to bottom, black, transparent)",
    mdnPath: "mask",
    demo: createMaskDemo(),
  },

  {
    name: "mix-blend-mode",
    category: "Visual",
    description: "Sets how an element's content blends with its background and the layers behind it.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "mix-blend-mode: normal | multiply | screen | overlay | luminosity",
    mdnPath: "mix-blend-mode",
    demo: createMixBlendModeDemo(),
  },

  {
    name: "border",
    category: "Visual",
    description: "Shorthand for border-width, border-style, and border-color. Individual sides: border-top, border-right, border-bottom, border-left.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border: 2px solid #6366f1 | 1px dashed red",
    mdnPath: "border",
    demo: createBorderDemo(),
  },

  {
    name: "outline",
    category: "Visual",
    description: "Draws a line around elements, outside the border. Key for accessibility — focus indicators.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "outline: 2px solid #6366f1 | 3px dashed red",
    mdnPath: "outline",
    demo: createOutlineDemo(),
  },

  {
    name: "outline-offset",
    category: "Visual",
    description: "Sets the space between an outline and the element's border. Negative values pull it inside.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "outline-offset: 2px | -2px",
    mdnPath: "outline-offset",
    demo: createOutlineOffsetDemo(),
  },

  {
    name: "border-inline",
    category: "Visual",
    description: "Logical shorthand for border-left and border-right (in LTR). Adapts to writing direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-inline: 2px solid #6366f1",
    mdnPath: "border-inline",
    demo: createBorderInlineDemo(),
  },

  {
    name: "border-block",
    category: "Visual",
    description: "Logical shorthand for border-top and border-bottom. Adapts to writing direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-block: 2px dashed #ec4899",
    mdnPath: "border-block",
    demo: createBorderBlockDemo(),
  },

  {
    name: "border-inline-start",
    category: "Visual",
    description: "Logical border at the start of the inline axis — left in LTR, right in RTL.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-inline-start: 3px solid #6366f1",
    mdnPath: "border-inline-start",
    demo: createBorderInlineStartDemo(),
  },

  {
    name: "border-inline-end",
    category: "Visual",
    description: "Logical border at the end of the inline axis — right in LTR, left in RTL.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-inline-end: 3px solid #8b5cf6",
    mdnPath: "border-inline-end",
    demo: createBorderInlineEndDemo(),
  },

  {
    name: "border-block-start",
    category: "Visual",
    description: "Logical border at the start of the block axis — top in horizontal writing modes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-block-start: 3px solid #f59e0b",
    mdnPath: "border-block-start",
    demo: createBorderBlockStartDemo(),
  },

  {
    name: "border-block-end",
    category: "Visual",
    description: "Logical border at the end of the block axis — bottom in horizontal writing modes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-block-end: 3px solid #f97316",
    mdnPath: "border-block-end",
    demo: createBorderBlockEndDemo(),
  },

  {
    name: "border-start-start-radius",
    category: "Visual",
    description: "Logical corner radius for start-start — top-left in LTR horizontal writing modes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-start-start-radius: 8px",
    mdnPath: "border-start-start-radius",
    demo: createBorderStartStartRadiusDemo(),
  },

  {
    name: "border-start-end-radius",
    category: "Visual",
    description: "Logical corner radius for start-end — top-right in LTR horizontal writing modes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-start-end-radius: 8px",
    mdnPath: "border-start-end-radius",
    demo: createBorderStartEndRadiusDemo(),
  },

  {
    name: "border-end-start-radius",
    category: "Visual",
    description: "Logical corner radius for end-start — bottom-left in LTR horizontal writing modes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-end-start-radius: 8px",
    mdnPath: "border-end-start-radius",
    demo: createBorderEndStartRadiusDemo(),
  },

  {
    name: "border-end-end-radius",
    category: "Visual",
    description: "Logical corner radius for end-end — bottom-right in LTR horizontal writing modes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-end-end-radius: 8px",
    mdnPath: "border-end-end-radius",
    demo: createBorderEndEndRadiusDemo(),
  },

  {
    name: "border-image",
    category: "Visual",
    description: "Replaces the element border with an image or gradient — use border-image-source, slice, width, and repeat.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-image: linear-gradient(45deg,#6366f1,#ec4899) 1",
    mdnPath: "border-image",
    demo: createBorderImageDemo(),
  },
];
