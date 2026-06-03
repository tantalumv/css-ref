import type { CSSPropertyFull } from "../types";

function createTransformDemo() {
  return `<div style="display:flex;gap:12px;align-items:center;padding:10px">
    <div style="background:#14b8a6;width:36px;height:36px;border-radius:4px;transform:rotate(20deg);color:#fff;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">rotate</div>
    <div style="background:#10b981;width:36px;height:36px;border-radius:4px;transform:scale(1.25);color:#fff;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">scale</div>
    <div style="background:#14b8a6;width:36px;height:36px;border-radius:4px;transform:skewX(-12deg);color:#fff;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">skew</div>
  </div>`;
}

function createTranslateDemo() {
  return `<div style="position:relative;height:72px;width:100%">
    <div style="position:absolute;left:20px;top:10px;background:#e0fdf4;border:2px dashed #14b8a6;width:36px;height:36px;border-radius:4px"></div>
    <div style="position:absolute;left:20px;top:10px;background:#14b8a6;width:36px;height:36px;border-radius:4px;translate:40px 16px;color:#fff;font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center">40px 16px</div>
  </div>`;
}

function createRotateDemo() {
  const items: [number, number][] = [
    [0, 0.4],
    [30, 0.55],
    [60, 0.7],
    [90, 0.85],
    [135, 1],
  ];

  const boxes = items
    .map(([degrees, opacity]) =>
      `<div style="width:28px;height:28px;background:#14b8a6;border-radius:3px;rotate:${degrees}deg;opacity:${opacity}"></div>`,
    )
    .join("");

  return `<div style="display:flex;gap:10px;align-items:center;padding:10px">${boxes}</div>`;
}

function createScaleDemo() {
  const items: [string, string][] = [
    [".5", ".5x"],
    ["1", "1x"],
    ["1.3", "1.3x"],
    ["1.6", "1.6x"],
  ];

  const boxes = items
    .map(([scale, label]) =>
      `<div style="width:28px;height:28px;background:#14b8a6;border-radius:3px;scale:${scale};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">${label}</div>`,
    )
    .join("");

  return `<div style="display:flex;gap:12px;align-items:center;padding:14px">${boxes}</div>`;
}

function createTransformStyleDemo() {
  return `<div style="perspective:200px;padding:10px;display:flex;align-items:center;gap:12px">
    <div style="transform-style:preserve-3d;transform:rotateY(30deg) rotateX(10deg);width:48px;height:48px;position:relative">
      <div style="position:absolute;inset:0;background:#14b8a6;border-radius:4px;opacity:.9"></div>
      <div style="position:absolute;inset:6px;background:#0d9488;border-radius:3px;transform:translateZ(8px)"></div>
    </div>
    <p style="font-size:9px;font-weight:700;color:#888">preserve-3d<br>3D children</p>
  </div>`;
}

export const transform: CSSPropertyFull[] = [
  {
    name: "transform",
    category: "Transform",
    description: "Applies 2D or 3D transformations — rotate, scale, translate, skew, and matrix.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "transform: rotate(45deg) scale(1.2) translateX(20px)",
    mdnPath: "transform",
    demo: createTransformDemo(),
  },

  {
    name: "translate",
    category: "Transform",
    description: "Individual transform property for moving an element, composable with rotate and scale.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: "translate: 50px 100px | 50% | none",
    mdnPath: "translate",
    demo: createTranslateDemo(),
  },

  {
    name: "rotate",
    category: "Transform",
    description: "Individual transform property for rotating an element without affecting other transforms.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: "rotate: 45deg | 1 0 0 45deg | none",
    mdnPath: "rotate",
    demo: createRotateDemo(),
  },

  {
    name: "scale",
    category: "Transform",
    description: "Individual transform property for scaling an element along X, Y, and Z axes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: "scale: 1.5 | 0.5 2 | none",
    mdnPath: "scale",
    demo: createScaleDemo(),
  },

  {
    name: "transform-style",
    category: "Transform",
    description: "Sets whether children of a transformed element are positioned in 3D or flattened 2D space.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "transform-style: flat | preserve-3d",
    mdnPath: "transform-style",
    demo: createTransformStyleDemo(),
  },
];