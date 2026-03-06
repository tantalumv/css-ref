import type { CSSProperty } from "../types";

export const transform3d: CSSProperty[] = [
  {
    n: "backface-visibility",
    c: "Transform",
    d: "Controls whether the back face of a 3D-transformed element is visible when facing away.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "backface-visibility: visible | hidden",
    m: "backface-visibility",
    demo: `<div style="padding:10px;display:flex;gap:12px;align-items:center"><div style="perspective:200px"><div style="transform-style:preserve-3d;transform:rotateY(180deg);backface-visibility:visible;width:50px;height:50px;background:#6366f1;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">visible</div></div><div style="perspective:200px"><div style="transform-style:preserve-3d;transform:rotateY(180deg);backface-visibility:hidden;width:50px;height:50px;background:#6366f1;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">hidden</div></div></div>`,
  },

  {
    n: "perspective",
    c: "Transform",
    d: "Defines the distance between the z=0 plane and the viewer — creates 3D depth for child elements.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "perspective: 600px | none",
    m: "perspective",
    demo: `<div style="padding:10px;display:flex;gap:12px;align-items:center"><div style="perspective:100px;border:2px dashed #6366f1;border-radius:5px;padding:10px"><div style="transform:rotateY(45deg);width:40px;height:40px;background:#6366f1;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">100px</div></div><div style="perspective:400px;border:2px dashed #8b5cf6;border-radius:5px;padding:10px"><div style="transform:rotateY(45deg);width:40px;height:40px;background:#8b5cf6;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">400px</div></div></div>`,
  },

  {
    n: "perspective-origin",
    c: "Transform",
    d: "Sets the origin point for the perspective property — changes the 3D vanishing point.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "perspective-origin: center | left top | 50% 100%",
    m: "perspective-origin",
    demo: `<div style="padding:10px;display:flex;gap:12px;align-items:center"><div style="perspective:200px;perspective-origin:left top;border:2px dashed #6366f1;border-radius:5px;padding:10px"><div style="transform:rotateY(45deg);width:40px;height:40px;background:#6366f1;border-radius:4px"></div></div><div style="perspective:200px;perspective-origin:right bottom;border:2px dashed #8b5cf6;border-radius:5px;padding:10px"><div style="transform:rotateY(45deg);width:40px;height:40px;background:#8b5cf6;border-radius:4px"></div></div></div>`,
  },
];
