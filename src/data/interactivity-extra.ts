import type { CSSProperty } from "../types";

export const interactivityExtra: CSSProperty[] = [
  {
    n: "scroll-snap-stop",
    c: "Interactivity",
    d: "Controls whether the scroll container can pass over snap positions — always forces snapping at this point.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "scroll-snap-stop: normal | always",
    m: "scroll-snap-stop",
    demo: `<div style="padding:10px"><div style="display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;width:180px;border-radius:6px;border:2px solid #6366f1">${[1, 2, 3].map((n) => `<div style="flex:0 0 180px;height:56px;background:${n === 2 ? "#6366f1" : "#818cf8"};scroll-snap-align:start;scroll-snap-stop:${n === 2 ? "always" : "normal"};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${n === 2 ? "stop:always" : "stop:normal"}</div>`).join("")}</div></div>`,
  },

  {
    n: "scrollbar-width",
    c: "Interactivity",
    d: "Controls the width of scrollbars — auto, thin, or none to hide.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "ltd",
    x: "scrollbar-width: auto | thin | none",
    m: "scrollbar-width",
    demo: `<div style="padding:10px;display:flex;gap:8px"><div style="width:80px;height:60px;overflow:scroll;scrollbar-width:auto;border:2px solid #6366f1;border-radius:4px;padding:6px"><p style="font-size:9px;font-weight:700;color:#4338ca;line-height:2;width:150px">Auto scrollbar width with overflow content here</p></div><div style="width:80px;height:60px;overflow:scroll;scrollbar-width:thin;border:2px solid #8b5cf6;border-radius:4px;padding:6px"><p style="font-size:9px;font-weight:700;color:#7c3aed;line-height:2;width:150px">Thin scrollbar width with overflow content here</p></div></div>`,
  },

  {
    n: "scrollbar-gutter",
    c: "Interactivity",
    d: "Reserves space for scrollbars to prevent layout shift when content overflows.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "ltd",
    x: "scrollbar-gutter: auto | stable | stable both-edges",
    m: "scrollbar-gutter",
    demo: `<div style="padding:10px;display:flex;gap:8px"><div style="width:100px;height:50px;overflow:auto;scrollbar-gutter:stable;border:2px solid #6366f1;border-radius:4px;padding:6px"><p style="font-size:9px;font-weight:700;color:#4338ca;margin:0">stable gutter</p></div><div style="width:100px;height:50px;overflow:auto;scrollbar-gutter:auto;border:2px solid #8b5cf6;border-radius:4px;padding:6px"><p style="font-size:9px;font-weight:700;color:#7c3aed;margin:0">auto gutter</p></div></div>`,
  },
];
