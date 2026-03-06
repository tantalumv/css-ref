import type { CSSProperty } from "../types";

export const color: CSSProperty[] = [
  {
    n: "color",
    c: "Color",
    d: "Sets the foreground (text) color. Supports named colors, hex, rgb, hsl, oklch, and more.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "color: #111 | oklch(70% 0.2 220) | transparent",
    m: "color",
    demo: `<div style="padding:10px;display:flex;flex-direction:column;gap:4px"><p style="color:#6366f1;font-weight:800;font-size:13px">color: #6366f1</p><p style="color:oklch(65% .25 10);font-weight:800;font-size:13px">color: oklch(65% .25 10)</p><p style="color:hsl(200 90% 45%);font-weight:800;font-size:13px">color: hsl(200 90% 45%)</p></div>`,
    v: [
      { value: "named", label: "Named Colors (e.g., red, blue)", description: "CSS supports 140+ named colors like 'red', 'blue', 'coral', 'teal'. Easy to remember but limited palette." },
      { value: "hex", label: "Hexadecimal (#RRGGBB)", description: "Six-digit hex codes like #FF5733. #000 is black, #FFF is white. Most common for precise colors." },
      { value: "rgb()", label: "RGB (rgb(r, g, b))", description: "Three values from 0-255 for red, green, blue. rgb(255, 0, 0) is pure red. Supports alpha via rgba()." },
      { value: "hsl()", label: "HSL (hsl(h, s%, l%))", description: "Hue (0-360), Saturation (0-100%), Lightness (0-100%). Easier to adjust colors programmatically." },
      { value: "oklch()", label: "OKLCH (perceptually uniform)", description: "Modern color space with consistent perceived brightness. Supports wide gamuts for vivid colors. The future of CSS colors." },
      { value: "transparent", label: "Transparent", description: "Fully transparent. Same as rgba(0,0,0,0). Useful for layered effects." },
      { value: "currentColor", label: "CurrentColor", description: "Inherits the color from the element's color property. Useful for icons and borders that should match text." }
    ],
  },

  {
    n: "background",
    c: "Color",
    d: "Shorthand for all background properties — color, image, position, size, and repeat.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "background: #fff url(bg.png) no-repeat center/cover",
    m: "background",
    demo: `<div style="display:flex;gap:6px;padding:8px"><div style="flex:1;height:60px;background:linear-gradient(135deg,#6366f1,#ec4899);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;font-weight:700">linear</div><div style="flex:1;height:60px;background:radial-gradient(circle,#f97316,#ec4899);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;font-weight:700">radial</div><div style="flex:1;height:60px;background:conic-gradient(#6366f1,#ec4899,#f97316,#6366f1);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;font-weight:700">conic</div></div>`,
    v: [
      { value: "color", label: "Background Color Only", description: "background: red or background: #FF5733. The simplest form—just sets a solid color." },
      { value: "image", label: "Background Image", description: "background: url(image.png) or background: linear-gradient(). Adds an image or gradient as background." },
      { value: "repeat", label: "Repeat Pattern", description: "background: repeat-x, repeat-y, or no-repeat. Controls how the image tiles across the element." },
      { value: "position", label: "Position", description: "background: center, top left, 50% 25%. Positions the image within the element." },
      { value: "size", label: "Size", description: "background: cover or contain, or specific sizes like 100px 200px. Controls image dimensions." },
      { value: "shorthand", label: "Full Shorthand", description: "background: url(img.jpg) no-repeat center / cover. Position and size are separated by a slash." }
    ],
  },

  {
    n: "opacity",
    c: "Color",
    d: "Sets the transparency of an element and all its descendants.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "opacity: 1 | 0.5 | 0",
    m: "opacity",
    demo: `<div style="display:flex;gap:8px;align-items:flex-end;padding:10px">${[1, 0.7, 0.4, 0.15].map((o) => `<div style="background:#f97316;width:34px;height:${14 + o * 50}px;border-radius:4px;opacity:${o};display:flex;align-items:flex-end;justify-content:center;padding-bottom:2px"><span style="font-size:9px;font-weight:700;color:#fff">${o}</span></div>`).join("")}</div>`,
    v: [
      { value: "1", label: "Full Opacity (1)", description: "Fully opaque. The element is completely visible. This is the default." },
      { value: "0-1", label: "Partial (0.1 - 0.9)", description: "The element is semi-transparent. Lower values make it more see-through." },
      { value: "0", label: "Fully Transparent (0)", description: "Completely invisible. The element still occupies space but can't be seen." }
    ],
  },

  {
    n: "color-scheme",
    c: "Color",
    d: "Declares which color schemes an element renders in, enabling automatic dark mode adaptation.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2022",
    x: "color-scheme: normal | light | dark | light dark | only light",
    m: "color-scheme",
    demo: `<div style="display:flex;gap:8px;padding:10px"><div style="color-scheme:light;background:#fff;border:2px solid #e5e7eb;border-radius:6px;padding:8px;width:90px"><input type="checkbox" checked style="accent-color:#f97316;width:14px;height:14px"><p style="font-size:9px;font-weight:700;color:#111;margin-top:4px">light scheme</p></div><div style="color-scheme:dark;background:#1e1e2e;border:2px solid #444;border-radius:6px;padding:8px;width:90px"><input type="checkbox" checked style="accent-color:#f97316;width:14px;height:14px"><p style="font-size:9px;font-weight:700;color:#cdd6f4;margin-top:4px">dark scheme</p></div></div>`,
    v: [
      { value: "normal", label: "Normal", description: "Uses the default color scheme of the browser. No special handling." },
      { value: "light", label: "Light", description: "Forces light mode rendering. Form controls and scrollbars use light colors theme." },
      { value: "dark", label: "Dark", description: "Forces dark mode rendering. Form controls and scrollbars use dark theme colors." },
      { value: "light dark", label: "Light Dark", description: "Allows both light and dark depending on user preference. Browser will automatically adapt." }
    ],
  },

  {
    n: "accent-color",
    c: "Color",
    d: "Sets the accent color for native browser UI controls like checkboxes, radios, and range inputs.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2022",
    x: "accent-color: auto | #6366f1",
    m: "accent-color",
    demo: `<div style="padding:10px;display:flex;flex-direction:column;gap:8px"><div style="display:flex;align-items:center;gap:8px;accent-color:#6366f1"><input type="checkbox" checked><input type="range" value="60" style="width:80px"><span style="font-size:10px;font-weight:700;color:#6366f1">#6366f1</span></div><div style="display:flex;align-items:center;gap:8px;accent-color:#f97316"><input type="checkbox" checked><input type="range" value="40" style="width:80px"><span style="font-size:10px;font-weight:700;color:#f97316">#f97316</span></div></div>`,
  },

  {
    n: "color-mix()",
    c: "Color",
    d: "Mixes two colors together in a specified color space at a given ratio.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2023",
    x: "color: color-mix(in oklch, hotpink 60%, white)",
    m: "color_value/color-mix",
    demo: `<div style="display:flex;align-items:center;gap:6px;padding:10px"><div style="width:40px;height:40px;background:#6366f1;border-radius:50%"></div><div style="font-size:14px;font-weight:700;color:#888">+</div><div style="width:40px;height:40px;background:#ec4899;border-radius:50%"></div><div style="font-size:14px;font-weight:700;color:#888">=</div><div style="width:40px;height:40px;background:color-mix(in oklch,#6366f1 50%,#ec4899);border-radius:50%"></div><div style="font-size:9px;color:#888;font-weight:700">50% / 50%</div></div>`,
  },

  {
    n: "oklch()",
    c: "Color",
    d: "Defines a color in the perceptually uniform OKLch color space — consistent chroma across hues.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2023",
    x: "color: oklch(70% 0.2 220 / 0.8)",
    m: "color_value/oklch",
    demo: `<div style="display:flex;gap:4px;padding:10px">${[0, 40, 80, 120, 160, 200, 240, 280, 320, 360].map((h) => `<div style="flex:1;height:52px;background:oklch(65% .2 ${h});border-radius:3px"></div>`).join("")}</div>`,
  },

  {
    n: "light-dark()",
    c: "Color",
    d: "Returns one of two values depending on whether the current color scheme is light or dark.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2024",
    x: "color: light-dark(#111, #eee)",
    m: "color_value/light-dark",
    demo: `<div style="display:flex;gap:8px;padding:10px"><div style="background:#fff;border:2px solid #e5e7eb;border-radius:6px;padding:8px;flex:1;text-align:center"><p style="font-size:10px;font-weight:700;color:light-dark(#111,#eee)">light-dark()</p><p style="font-size:9px;color:#888;font-weight:700">light mode</p></div><div style="background:#1e1e2e;border:2px solid #444;border-radius:6px;padding:8px;flex:1;text-align:center;color-scheme:dark"><p style="font-size:10px;font-weight:700;color:light-dark(#111,#cdd6f4)">light-dark()</p><p style="font-size:9px;color:#888;font-weight:700">dark mode</p></div></div>`,
  },

  {
    n: "linear-gradient()",
    c: "Color",
    d: "Creates a linear color transition image, commonly used in backgrounds and masks.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "background: linear-gradient(135deg, #6366f1, #ec4899)",
    m: "gradient/linear-gradient",
    demo: `<div style="padding:10px"><div style="height:56px;border-radius:6px;background:linear-gradient(135deg,#6366f1,#ec4899,#f97316)"></div></div>`,
  },

  {
    n: "radial-gradient()",
    c: "Color",
    d: "Creates a radial (circular or elliptical) color transition image from a central point.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "background: radial-gradient(circle at center, #f97316, #7c3aed)",
    m: "gradient/radial-gradient",
    demo: `<div style="padding:10px"><div style="height:56px;border-radius:6px;background:radial-gradient(circle at center,#f97316,#7c3aed)"></div></div>`,
  },

  {
    n: "conic-gradient()",
    c: "Color",
    d: "Creates a conic color transition around a center point, useful for color wheels and progress visuals.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "background: conic-gradient(from 0deg, #6366f1, #ec4899, #f97316, #6366f1)",
    m: "gradient/conic-gradient",
    demo: `<div style="padding:10px;display:flex;justify-content:center"><div style="width:64px;height:64px;border-radius:50%;background:conic-gradient(from 0deg,#6366f1,#ec4899,#f97316,#6366f1)"></div></div>`,
  },
];
