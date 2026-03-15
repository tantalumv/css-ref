import type { CSSProperty } from "../types";
import { flexContainer, styledBox, comparisonDemo } from "../demo-helpers";

export const interactivity: CSSProperty[] = [
  {
    n: "cursor",
    c: "Interactivity",
    d: "Sets the mouse cursor icon when hovering over an element.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "cursor: auto | pointer | text | grab | grabbing | not-allowed",
    m: "cursor",
    demo: flexContainer(
      [
        ["pointer", "🖱️"],
        ["text", "I"],
        ["grab", "✋"],
        ["not-allowed", "🚫"],
      ].map(([c, i]) =>
        styledBox(`${i} ${c}`, {
          cursor: c as string,
          background: "#fee2e2",
          border: "2px solid #ef4444",
          borderRadius: "4px",
          padding: "4px 8px",
          fontSize: "10px",
          fontWeight: "700",
          color: "#b91c1c",
        }),
      ),
      { flexWrap: "wrap", gap: "5px", padding: "8px" },
    ),
  },

  {
    n: "pointer-events",
    c: "Interactivity",
    d: "Controls whether an element can be the target of mouse and touch events.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "pointer-events: auto | none",
    m: "pointer-events",
    demo: comparisonDemo(
      "auto ✓",
      "none ✗",
      {
        pointerEvents: "auto",
        background: "#dcfce7",
        border: "2px solid #ef4444",
        borderRadius: "5px",
        padding: "8px",
        fontSize: "10px",
        fontWeight: "700",
        color: "#15803d",
        cursor: "pointer",
      },
      {
        pointerEvents: "none",
        background: "#fee2e2",
        border: "2px dashed #ef4444",
        borderRadius: "5px",
        padding: "8px",
        fontSize: "10px",
        fontWeight: "700",
        color: "#b91c1c",
        cursor: "not-allowed",
      },
      { gap: "10px", padding: "10px" },
    ),
  },

  {
    n: "user-select",
    c: "Interactivity",
    d: "Controls whether and how the user can select text inside an element.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "user-select: auto | text | none | all | contain",
    m: "user-select",
    demo: flexContainer(
      [
        styledBox("user-select: text — select me!", {
          userSelect: "text",
          fontSize: "11px",
          fontWeight: "700",
          color: "#111",
          background: "#dcfce7",
          padding: "4px 8px",
          borderRadius: "3px",
        }),
        styledBox("user-select: none — can't select", {
          userSelect: "none",
          fontSize: "11px",
          fontWeight: "700",
          color: "#888",
          background: "#fee2e2",
          padding: "4px 8px",
          borderRadius: "3px",
        }),
      ],
      { direction: "column", gap: "6px", padding: "10px" },
    ),
  },

  {
    n: "scroll-snap-type",
    c: "Interactivity",
    d: "Enables scroll snapping on a container — mandatory or proximity snapping along an axis.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "scroll-snap-type: x mandatory | y proximity | both mandatory",
    m: "scroll-snap-type",
    demo: `<div style="display:flex;gap:0;overflow-x:scroll;scroll-snap-type:x mandatory;width:180px;border-radius:6px;scroll-behavior:smooth">${["#6366f1", "#ec4899", "#f97316", "#10b981"]
      .map((c, i) => `<div style="flex-shrink:0;width:180px;height:68px;background:${c};scroll-snap-align:start;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700">Slide ${i + 1}</div>`)
      .join("")}</div>`,
  },

  {
    n: "overscroll-behavior",
    c: "Interactivity",
    d: "Controls scroll chaining — prevents overflow scroll propagating to parent elements.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2022",
    x: "overscroll-behavior: auto | contain | none",
    m: "overscroll-behavior",
    demo: flexContainer(
      styledBox(
        '<p style="font-size:9px;line-height:1.8;font-weight:700;color:#b91c1c">overscroll-behavior: contain — scroll doesn\'t chain to parent. Extra content here to enable scroll. More text.</p>',
        {
          overscrollBehavior: "contain",
          height: "60px",
          overflowY: "scroll",
          width: "140px",
          background: "#fff0f0",
          border: "2px solid #ef4444",
          borderRadius: "5px",
          padding: "6px",
        },
      ),
      { padding: "10px", gap: "10px" },
    ),
  },

  {
    n: "touch-action",
    c: "Interactivity",
    d: "Specifies which touch gestures are handled by the browser on a region.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "touch-action: auto | none | pan-x | pan-y | manipulation",
    m: "touch-action",
    demo: flexContainer(
      [
        styledBox("pan-x only →", {
          touchAction: "pan-x",
          background: "#fee2e2",
          border: "2px solid #ef4444",
          borderRadius: "5px",
          padding: "8px",
          fontSize: "10px",
          fontWeight: "700",
          color: "#b91c1c",
        }),
        styledBox("manipulation", {
          touchAction: "manipulation",
          background: "#fef3c7",
          border: "2px solid #f59e0b",
          borderRadius: "5px",
          padding: "8px",
          fontSize: "10px",
          fontWeight: "700",
          color: "#b45309",
        }),
      ],
      { gap: "8px", padding: "10px" },
    ),
  },

  {
    n: "scroll-behavior",
    c: "Interactivity",
    d: "Controls scrolling behavior — smooth enables animated scrolling, auto jumps instantly.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "scroll-behavior: auto | smooth",
    m: "scroll-behavior",
    demo: flexContainer(
      styledBox(
        `<p style="font-size:9px;font-weight:700;color:#b91c1c">scroll-behavior: smooth — animated scrolling</p><p style="font-size:9px;font-weight:700;color:#ef4444;margin-top:40px">target element ↓</p>`,
        {
          scrollBehavior: "smooth",
          overflowY: "scroll",
          height: "60px",
          background: "#fee2e2",
          border: "2px solid #ef4444",
          borderRadius: "5px",
          padding: "6px",
        },
      ),
      { padding: "10px", direction: "column", gap: "6px" },
    ),
  },

  {
    n: "scroll-margin",
    c: "Interactivity",
    d: "Adds an offset around an element for scroll snapping and programmatic scroll positioning.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "scroll-margin-top: 1rem",
    m: "scroll-margin",
    demo: `<div style="padding:10px"><div style="display:flex;gap:0;overflow-x:auto;scroll-snap-type:x mandatory;width:180px;border-radius:6px;border:2px solid #f97316">${[1, 2, 3].map((n) => `<div style="flex:0 0 180px;height:52px;background:${n === 2 ? "#fb923c" : "#fdba74"};scroll-snap-align:start;scroll-margin-inline:16px;display:flex;align-items:center;justify-content:center;color:#7c2d12;font-size:10px;font-weight:700">slide ${n}</div>`).join("")}</div><p style="font-size:9px;color:#888;font-weight:700;margin-top:4px">each slide has scroll-margin-inline: 16px</p></div>`,
  },

  {
    n: "scroll-padding",
    c: "Interactivity",
    d: "Defines the snapport inset of a scrolling container for scroll snapping and anchor jumps.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "scroll-padding-inline: 1rem",
    m: "scroll-padding",
    demo: `<div style="padding:10px"><div style="display:flex;gap:0;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:18px;width:180px;border-radius:6px;border:2px solid #0ea5e9">${[1, 2, 3].map((n) => `<div style="flex:0 0 160px;margin-right:8px;height:52px;background:${n === 2 ? "#0ea5e9" : "#7dd3fc"};scroll-snap-align:start;display:flex;align-items:center;justify-content:center;color:#082f49;font-size:10px;font-weight:700">card ${n}</div>`).join("")}</div><p style="font-size:9px;color:#888;font-weight:700;margin-top:4px">container uses scroll-padding-inline: 18px</p></div>`,
  },

  {
    n: "scroll-snap-align",
    c: "Interactivity",
    d: "Sets each element's snap position inside a scroll container.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "scroll-snap-align: start | center | end",
    m: "scroll-snap-align",
    demo: `<div style="padding:10px"><div style="display:flex;overflow-x:auto;scroll-snap-type:x mandatory;width:180px;border-radius:6px;border:2px solid #8b5cf6">${[
      ["start", "#ddd6fe"],
      ["center", "#c4b5fd"],
      ["end", "#a78bfa"],
    ]
      .map(
        ([a, c]) =>
          `<div style="flex:0 0 180px;height:56px;background:${c};scroll-snap-align:${a};display:flex;align-items:center;justify-content:center;color:#5b21b6;font-size:10px;font-weight:700">${a}</div>`,
      )
      .join("")}</div></div>`,
  },
];
