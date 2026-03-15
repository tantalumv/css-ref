import type { CSSPropertyFull } from "../types";

export const flexbox: CSSPropertyFull[] = [
  {
    name: "flex",
    category: "Flexbox",
    description: "Shorthand for flex-grow, flex-shrink, and flex-basis — how items grow, shrink, and size.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "flex: 1 | 0 1 auto | none | 2 1 300px",
    mdnPath: "flex",
    caniuse: "flexbox",
    default: "0 1 auto",
    demo: `<div style="display:flex;gap:6px;padding:10px;width:100%"><div style="flex:1;background:#8b5cf6;color:#fff;padding:10px 4px;border-radius:5px;font-size:10px;font-weight:700;text-align:center">flex: 1</div><div style="flex:2;background:#6366f1;color:#fff;padding:10px 4px;border-radius:5px;font-size:10px;font-weight:700;text-align:center">flex: 2</div><div style="flex:1;background:#8b5cf6;color:#fff;padding:10px 4px;border-radius:5px;font-size:10px;font-weight:700;text-align:center">flex: 1</div></div>`,
  },

  {
    name: "flex-direction",
    category: "Flexbox",
    description: "Sets the main axis direction of a flex container — row (horizontal) or column (vertical).",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "flex-direction: row | row-reverse | column | column-reverse",
    mdnPath: "flex-direction",
    caniuse: "flexbox",
    default: "row",
    values: [
      {
        value: "row",
        label: "Row",
        description:
          "Items are laid out in the same direction as the text (left to right in LTR languages). This is the default.",
      },
      {
        value: "row-reverse",
        label: "Row Reverse",
        description:
          "Items are laid out in the opposite direction to the text (right to left in LTR).",
      },
      {
        value: "column",
        label: "Column",
        description: "Items are laid out from top to bottom, forming a vertical stack.",
      },
      {
        value: "column-reverse",
        label: "Column Reverse",
        description: "Items are laid out from bottom to top, forming an inverted vertical stack.",
      },
    ],
    demo: `<div style="display:flex;gap:12px"><div style="display:flex;flex-direction:row;gap:4px;align-items:center"><div style="background:#8b5cf6;color:#fff;width:30px;height:24px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">1</div><div style="background:#8b5cf6;color:#fff;width:30px;height:24px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">2</div><div style="background:#8b5cf6;color:#fff;width:30px;height:24px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">3</div></div><div style="display:flex;flex-direction:column;gap:4px"><div style="background:#6366f1;color:#fff;width:30px;height:18px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">1</div><div style="background:#6366f1;color:#fff;width:30px;height:18px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">2</div><div style="background:#6366f1;color:#fff;width:30px;height:18px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">3</div></div></div>`,
  },

  {
    name: "flex-wrap",
    category: "Flexbox",
    description: "Controls whether flex items wrap onto multiple lines when they overflow the container.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "flex-wrap: nowrap | wrap | wrap-reverse",
    mdnPath: "flex-wrap",
    caniuse: "flexbox",
    default: "nowrap",
    values: [
      {
        value: "nowrap",
        label: "No Wrap",
        description:
          "Items are forced onto a single line and will shrink to fit if necessary. This is the default.",
      },
      {
        value: "wrap",
        label: "Wrap",
        description:
          "Items wrap onto multiple lines from top to bottom if they don't fit on one line.",
      },
      {
        value: "wrap-reverse",
        label: "Wrap Reverse",
        description:
          "Items wrap onto multiple lines from bottom to top, reversing the visual order of lines.",
      },
    ],
    demo: `<div style="display:flex;flex-wrap:wrap;gap:5px;padding:8px;width:180px;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:6px">${[1, 2, 3, 4, 5].map((i) => `<div style="background:#8b5cf6;color:#fff;width:46px;padding:6px 0;border-radius:3px;font-size:10px;font-weight:700;text-align:center">${i}</div>`).join("")}</div>`,
  },

  {
    name: "justify-content",
    category: "Flexbox",
    description: "Aligns flex/grid items along the main axis with distribution control.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "justify-content: flex-start | center | space-between | space-around | space-evenly",
    mdnPath: "justify-content",
    caniuse: "flexbox",
    default: "flex-start",
    values: [
      {
        value: "flex-start",
        label: "Flex Start",
        description:
          "Items are packed toward the start of the main axis. In a row layout, they align to the left.",
      },
      {
        value: "flex-end",
        label: "Flex End",
        description:
          "Items are packed toward the end of the main axis. In a row layout, they align to the right.",
      },
      {
        value: "center",
        label: "Center",
        description: "Items are centered along the main axis with equal space on both sides.",
      },
      {
        value: "space-between",
        label: "Space Between",
        description:
          "Items are distributed with the first item at the start and last item at the end. Remaining space is distributed evenly between items.",
      },
      {
        value: "space-around",
        label: "Space Around",
        description:
          "Items are distributed with equal space around each item. This means the first and last items have half the spacing of the space between adjacent items.",
      },
      {
        value: "space-evenly",
        label: "Space Evenly",
        description:
          "Items are distributed so that the spacing between any two adjacent items (and the edges) is exactly the same.",
      },
    ],
    demo: `<div style="display:flex;flex-direction:column;gap:5px;padding:8px;width:100%"><div style="display:flex;justify-content:space-between;background:#f5f3ff;border-radius:4px;padding:4px">${[1, 2, 3].map(() => `<div style="background:#8b5cf6;width:28px;height:20px;border-radius:3px"></div>`).join("")}</div><div style="display:flex;justify-content:center;gap:6px;background:#f5f3ff;border-radius:4px;padding:4px">${[1, 2, 3].map(() => `<div style="background:#6366f1;width:28px;height:20px;border-radius:3px"></div>`).join("")}</div><div style="font-size:9px;color:#888;font-weight:700;text-align:center">space-between · center</div></div>`,
  },

  {
    name: "align-items",
    category: "Flexbox",
    description: "Aligns flex/grid items along the cross axis of their container.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "align-items: stretch | flex-start | flex-end | center | baseline",
    mdnPath: "align-items",
    caniuse: "flexbox",
    default: "stretch",
    values: [
      {
        value: "stretch",
        label: "Stretch",
        description:
          "Items are stretched to fill the container along the cross axis. This is the default value.",
      },
      {
        value: "flex-start",
        label: "Flex Start",
        description:
          "Items are aligned at the start of the cross axis. In a row layout, they align to the top.",
      },
      {
        value: "flex-end",
        label: "Flex End",
        description:
          "Items are aligned at the end of the cross axis. In a row layout, they align to the bottom.",
      },
      {
        value: "center",
        label: "Center",
        description: "Items are centered along the cross axis, with equal space above and below.",
      },
      {
        value: "baseline",
        label: "Baseline",
        description:
          "Items are aligned so their baselines align. The baseline is the invisible line where text sits.",
      },
    ],
    demo: `<div style="display:flex;gap:8px;align-items:flex-end;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:6px;padding:8px;height:72px"><div style="background:#8b5cf6;width:28px;height:50px;border-radius:3px"></div><div style="background:#6366f1;width:28px;height:30px;border-radius:3px"></div><div style="background:#a78bfa;width:28px;height:40px;border-radius:3px"></div><div style="font-size:9px;color:#8b5cf6;font-weight:700;align-self:flex-end">align-items:<br>flex-end</div></div>`,
  },

  {
    name: "align-self",
    category: "Flexbox",
    description: "Overrides the container's align-items for a specific flex/grid item.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "align-self: auto | stretch | flex-start | flex-end | center",
    mdnPath: "align-self",
    caniuse: "flexbox",
    values: [
      {
        value: "auto",
        label: "Auto",
        description:
          "The item inherits the align-items value from the container. This is the default.",
      },
      {
        value: "stretch",
        label: "Stretch",
        description: "The item stretches to fill the container along the cross axis.",
      },
      {
        value: "flex-start",
        label: "Flex Start",
        description:
          "The item is aligned at the start of the cross axis, overriding the container's align-items.",
      },
      {
        value: "flex-end",
        label: "Flex End",
        description:
          "The item is aligned at the end of the cross axis, overriding the container's align-items.",
      },
      {
        value: "center",
        label: "Center",
        description:
          "The item is centered along the cross axis, overriding the container's align-items.",
      },
      {
        value: "baseline",
        label: "Baseline",
        description:
          "The item is aligned to the text baseline, overriding the container's align-items.",
      },
    ],
    demo: `<div style="display:flex;align-items:flex-start;gap:6px;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:6px;padding:8px;height:72px"><div style="background:#e0e7ff;width:28px;height:28px;border-radius:3px"></div><div style="background:#8b5cf6;width:28px;height:28px;border-radius:3px;align-self:center;outline:2px dashed #f97316;outline-offset:2px"></div><div style="background:#e0e7ff;width:28px;height:28px;border-radius:3px"></div><div style="font-size:9px;color:#f97316;font-weight:700;align-self:center">← center</div></div>`,
  },

  {
    name: "gap",
    category: "Flexbox",
    description: "Sets the gap between flex and grid items — shorthand for row-gap and column-gap.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "gap: 1rem | 0.5rem 1.5rem",
    mdnPath: "gap",
    caniuse: "flexbox",
    demo: `<div style="display:flex;gap:16px;align-items:center">${[1, 2, 3, 4].map(() => `<div style="background:#8b5cf6;width:28px;height:36px;border-radius:4px;position:relative"></div>`).join('<div style="width:1px;height:24px;background:#8b5cf6;opacity:.3;border:1px dashed #8b5cf6"></div>')}</div>`,
  },

  {
    name: "order",
    category: "Flexbox",
    description: "Controls the visual order in which a flex/grid item appears inside its container.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "order: 0 | -1 | 3",
    mdnPath: "order",
    caniuse: "flexbox",
    values: [
      {
        value: "0",
        label: "Default (0)",
        description:
          "Items appear in their source order. The default order is 0, meaning items with order: 0 appear before items with positive order and after items with negative order.",
      },
      {
        value: "positive",
        label: "Positive Number",
        description:
          "Items with positive order values appear after items with order: 0. Higher numbers appear further toward the end.",
      },
      {
        value: "negative",
        label: "Negative Number",
        description:
          "Items with negative order values appear before items with order: 0. More negative values appear further toward the start.",
      },
    ],
    demo: `<div style="display:flex;gap:6px"><div style="background:#a78bfa;color:#fff;width:36px;height:40px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:9px;font-weight:700"><span>3rd</span><span style="opacity:.6">ord:3</span></div><div style="background:#6366f1;color:#fff;width:36px;height:40px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:9px;font-weight:700;outline:2px solid #f97316;outline-offset:2px"><span>1st</span><span style="opacity:.6">ord:-1</span></div><div style="background:#8b5cf6;color:#fff;width:36px;height:40px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:9px;font-weight:700"><span>2nd</span><span style="opacity:.6">ord:0</span></div></div>`,
  },

  {
    name: "flex-basis",
    category: "Flexbox",
    description: "Sets the initial main size of a flex item — the size before free space is distributed.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "flex-basis: auto | 200px | 30%",
    mdnPath: "flex-basis",
    caniuse: "flexbox",
    values: [
      {
        value: "auto",
        label: "Auto",
        description:
          "The item's size is based on its content or explicit width/height. This is the default.",
      },
      {
        value: "0",
        label: "Zero",
        description:
          "The item has zero size before growing/shrinking calculations. All available space goes to growth/shrink.",
      },
      {
        value: "px/rem/%",
        label: "Fixed Size",
        description:
          "The item starts at the specified size before growth/shrink calculations are applied.",
      },
    ],
    demo: `<div style="display:flex;gap:4px;padding:10px"><div style="flex-basis:40px;background:#8b5cf6;color:#fff;padding:6px;border-radius:4px;font-size:9px;font-weight:700">40px</div><div style="flex-basis:80px;background:#6366f1;color:#fff;padding:6px;border-radius:4px;font-size:9px;font-weight:700">80px</div></div>`,
  },

  {
    name: "flex-grow",
    category: "Flexbox",
    description: "Controls how much a flex item grows relative to others when positive space is distributed.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "flex-grow: 0 | 1 | 2",
    mdnPath: "flex-grow",
    caniuse: "flexbox",
    values: [
      {
        value: "0",
        label: "No Growth (0)",
        description:
          "The item will not grow even when there's available space. It only takes up its natural size.",
      },
      {
        value: "1",
        label: "Grow Factor 1",
        description:
          "The item will grow to fill any available space. When all items have flex-grow: 1, they share space equally.",
      },
      {
        value: "2+",
        label: "Proportional Growth",
        description:
          "The growth is relative to other items. If one item has flex-grow: 2 and another has flex-grow: 1, the first gets twice as much of the available space.",
      },
    ],
    demo: `<div style="display:flex;gap:4px;padding:10px"><div style="flex-grow:1;background:#8b5cf6;color:#fff;padding:6px;border-radius:4px;font-size:9px;font-weight:700">1</div><div style="flex-grow:2;background:#6366f1;color:#fff;padding:6px;border-radius:4px;font-size:9px;font-weight:700">2</div></div>`,
  },

  {
    name: "flex-shrink",
    category: "Flexbox",
    description: "Controls how much a flex item shrinks relative to others when negative space is distributed.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "flex-shrink: 0 | 1 | 2",
    mdnPath: "flex-shrink",
    caniuse: "flexbox",
    values: [
      {
        value: "1",
        label: "Shrink (1)",
        description:
          "The item will shrink when needed to fit in the container. This is the default behavior.",
      },
      {
        value: "0",
        label: "No Shrink",
        description:
          "The item will not shrink below its flex-basis value, even if it causes overflow. Use this to preserve an item's minimum size.",
      },
      {
        value: "2+",
        label: "Proportional Shrink",
        description:
          "Higher values mean the item shrinks more relative to siblings with lower values.",
      },
    ],
    demo: `<div style="display:flex;gap:4px;width:140px;padding:10px"><div style="flex-shrink:0;width:70px;background:#8b5cf6;color:#fff;padding:6px;border-radius:4px;font-size:9px;font-weight:700">no shrink</div><div style="flex-shrink:1;width:90px;background:#6366f1;color:#fff;padding:6px;border-radius:4px;font-size:9px;font-weight:700">shrink</div></div>`,
  },

  {
    name: "justify-items",
    category: "Flexbox",
    description: "Aligns items on the inline axis within their grid area — applies to grid containers.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "justify-items: start | center | end | stretch",
    mdnPath: "justify-items",
    caniuse: "flexbox",
    demo: `<div style="display:grid;justify-items:center;grid-template-columns:repeat(3,1fr);gap:4px;padding:10px"><div style="width:24px;background:#7c3aed;height:18px;border-radius:3px"></div><div style="width:24px;background:#6366f1;height:18px;border-radius:3px"></div><div style="width:24px;background:#8b5cf6;height:18px;border-radius:3px"></div></div>`,
  },

  {
    name: "justify-self",
    category: "Flexbox",
    description: "Aligns a single item on the inline axis within its grid area — overrides justify-items.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "justify-self: auto | start | center | end",
    mdnPath: "justify-self",
    caniuse: "flexbox",
    demo: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:10px"><div style="justify-self:start;background:#7c3aed;color:#fff;padding:6px;border-radius:3px;font-size:8px">start</div><div style="justify-self:center;background:#6366f1;color:#fff;padding:6px;border-radius:3px;font-size:8px">center</div><div style="justify-self:end;background:#8b5cf6;color:#fff;padding:6px;border-radius:3px;font-size:8px">end</div></div>`,
  },
];
