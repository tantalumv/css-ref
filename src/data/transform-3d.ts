import type { CSSPropertyFull } from "../types";

export const transform3d: CSSPropertyFull[] = [
  {
    name: "backface-visibility",
    category: "Transform",
    description: "Controls whether the back face of a 3D-transformed element is visible when facing away.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "backface-visibility: visible | hidden",
    mdnPath: "backface-visibility",
    demo: `<div style="padding:10px;display:flex;gap:12px;align-items:center"><div style="perspective:200px"><div style="transform-style:preserve-3d;transform:rotateY(180deg);backface-visibility:visible;width:50px;height:50px;background:#6366f1;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">visible</div></div><div style="perspective:200px"><div style="transform-style:preserve-3d;transform:rotateY(180deg);backface-visibility:hidden;width:50px;height:50px;background:#6366f1;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">hidden</div></div></div>`,
  },

  {
    name: "perspective",
    category: "Transform",
    description: "Defines the distance between the z=0 plane and the viewer — creates 3D depth for child elements.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "perspective: 600px | none",
    mdnPath: "perspective",
    demo: `<div style="padding:10px;display:flex;gap:12px;align-items:center"><div style="perspective:100px;border:2px dashed #6366f1;border-radius:5px;padding:10px"><div style="transform:rotateY(45deg);width:40px;height:40px;background:#6366f1;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">100px</div></div><div style="perspective:400px;border:2px dashed #8b5cf6;border-radius:5px;padding:10px"><div style="transform:rotateY(45deg);width:40px;height:40px;background:#8b5cf6;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">400px</div></div></div>`,
  },

  {
    name: "perspective-origin",
    category: "Transform",
    description: "Sets the origin point for the perspective property — changes the 3D vanishing point.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "perspective-origin: center | left top | 50% 100%",
    mdnPath: "perspective-origin",
    demo: `<div style="padding:10px;display:flex;gap:12px;align-items:center"><div style="perspective:200px;perspective-origin:left top;border:2px dashed #6366f1;border-radius:5px;padding:10px"><div style="transform:rotateY(45deg);width:40px;height:40px;background:#6366f1;border-radius:4px"></div></div><div style="perspective:200px;perspective-origin:right bottom;border:2px dashed #8b5cf6;border-radius:5px;padding:10px"><div style="transform:rotateY(45deg);width:40px;height:40px;background:#8b5cf6;border-radius:4px"></div></div></div>`,
  },
];
