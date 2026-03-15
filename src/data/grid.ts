import type { CSSPropertyFull } from "../types";

export const grid: CSSPropertyFull[] = [
  {
    name: "grid-template-columns",
    category: "Grid",
    description: "Defines the column track sizes of a grid, supporting fixed, flexible, and repeat() patterns.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-template-columns: repeat(3, 1fr) | 200px 1fr | minmax(0, 1fr)",
    mdnPath: "grid-template-columns",
    caniuse: "css-grid",
    default: "none",
    demo: `<div style="display:grid;grid-template-columns:1fr 2fr 1fr;gap:5px;padding:10px;width:100%">${[1, 2, 3].map((n, i) => `<div style="background:${["#7c3aed", "#6366f1", "#7c3aed"][i]};color:#fff;padding:8px 4px;border-radius:4px;font-size:10px;font-weight:700;text-align:center">${["1fr", "2fr", "1fr"][i]}</div>`).join("")}</div>`,
    values: [
      {
        value: "fr",
        label: "Fractional Unit (fr)",
        description:
          "Represents a fraction of available space. 1fr 2fr means the second column gets twice as much space as the first.",
      },
      {
        value: "px",
        label: "Pixels",
        description: "Fixed width columns in pixels. Use for precise control over column sizes.",
      },
      {
        value: "auto",
        label: "Auto",
        description:
          "Columns size based on content. Takes up remaining space after fixed sizes are allocated.",
      },
      {
        value: "repeat()",
        label: "Repeat Function",
        description:
          "Shorthand to repeat track patterns. repeat(3, 1fr) creates three equal columns.",
      },
      {
        value: "minmax()",
        label: "MinMax Function",
        description:
          "Creates tracks with minimum and maximum sizes. minmax(100px, 1fr) won't shrink below 100px but can grow.",
      },
    ],
  },

  {
    name: "grid-template-rows",
    category: "Grid",
    description: "Defines the row track sizes of a grid container.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-template-rows: auto | 100px 1fr | repeat(4, minmax(0, auto))",
    mdnPath: "grid-template-rows",
    caniuse: "css-grid",
    default: "none",
    demo: `<div style="display:grid;grid-template-rows:24px 40px 16px;gap:4px;padding:8px;width:100%"><div style="background:#7c3aed;color:#fff;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">24px</div><div style="background:#6366f1;color:#fff;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">40px (tall)</div><div style="background:#a78bfa;color:#fff;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">16px</div></div>`,
    values: [
      {
        value: "auto",
        label: "Auto",
        description: "Rows size based on content. Takes up remaining space after explicit sizes.",
      },
      {
        value: "px",
        label: "Pixels",
        description: "Fixed height rows in pixels. Use when you need precise row heights.",
      },
      {
        value: "fr",
        label: "Fractional Unit",
        description: "Rows size as fraction of available space.",
      },
      {
        value: "repeat()",
        label: "Repeat Function",
        description: "Repeats row patterns. Useful for creating consistent row heights.",
      },
      {
        value: "minmax()",
        label: "MinMax Function",
        description: "Creates rows with min/max constraints for responsive behavior.",
      },
    ],
  },

  {
    name: "grid-template-areas",
    category: "Grid",
    description: "Defines named grid areas using an ASCII-art string — a powerful visual layout technique.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: 'grid-template-areas:\n  "header header"\n  "sidebar main"\n  "footer footer"',
    mdnPath: "grid-template-areas",
    caniuse: "css-grid",
    demo: `<div style="display:grid;grid-template-columns:60px 1fr;grid-template-rows:22px 36px 18px;gap:3px;padding:8px;width:100%;grid-template-areas:'h h' 's m' 'f f'"><div style="grid-area:h;background:#7c3aed;color:#fff;border-radius:3px;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">header</div><div style="grid-area:s;background:#8b5cf6;color:#fff;border-radius:3px;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">sidebar</div><div style="grid-area:m;background:#6366f1;color:#fff;border-radius:3px;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">main</div><div style="grid-area:f;background:#a78bfa;color:#fff;border-radius:3px;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">footer</div></div>`,
    values: [
      {
        value: '"name"',
        label: "Named Area",
        description: "Define a named area that can be assigned to any grid item using grid-area.",
      },
      {
        value: '"a a"',
        label: "Spanning",
        description: "Use the same name twice to make an item span multiple cells.",
      },
      {
        value: '". ."',
        label: "Empty Cell",
        description: "Use a dot (.) to create empty cells in the grid.",
      },
    ],
  },

  {
    name: "grid-column",
    category: "Grid",
    description: "Shorthand for grid-column-start and grid-column-end — places an item across columns.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-column: 1 / 3 | span 2 | 1 / -1",
    mdnPath: "grid-column",
    caniuse: "css-grid",
    demo: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:8px;width:100%"><div style="grid-column:1/-1;background:#7c3aed;color:#fff;padding:6px;border-radius:3px;font-size:10px;font-weight:700;text-align:center">1 / -1 (full width)</div><div style="background:#a78bfa;color:#fff;padding:6px;border-radius:3px;font-size:10px;font-weight:700;text-align:center">1</div><div style="grid-column:span 2;background:#6366f1;color:#fff;padding:6px;border-radius:3px;font-size:10px;font-weight:700;text-align:center">span 2</div></div>`,
    values: [
      {
        value: "1",
        label: "Line Number",
        description: "Places item at specific line. grid-column: 1 places it at the first line.",
      },
      {
        value: "1 / 3",
        label: "Span Lines",
        description: "Start at line 1 and end at line 3. Creates an item spanning multiple tracks.",
      },
      {
        value: "span 2",
        label: "Span Keyword",
        description: "Span 2 means the item takes up 2 tracks. Works with both column and row.",
      },
      {
        value: "-1",
        label: "Negative Line",
        description:
          "References the last line. -1 always points to the end regardless of track count.",
      },
    ],
  },

  {
    name: "grid-row",
    category: "Grid",
    description: "Shorthand for grid-row-start and grid-row-end — places an item across rows.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-row: 1 / 3 | span 2",
    mdnPath: "grid-row",
    caniuse: "css-grid",
    demo: `<div style="display:grid;grid-template-columns:60px 1fr;grid-template-rows:repeat(2,30px);gap:4px;padding:8px;width:100%"><div style="grid-row:span 2;background:#7c3aed;color:#fff;border-radius:3px;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">span 2</div><div style="background:#a78bfa;color:#fff;border-radius:3px;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">row 1</div><div style="background:#6366f1;color:#fff;border-radius:3px;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">row 2</div></div>`,
    values: [
      {
        value: "1",
        label: "Line Number",
        description: "Places item at specific line. grid-column: 1 places it at the first line.",
      },
      {
        value: "1 / 3",
        label: "Span Lines",
        description: "Start at line 1 and end at line 3. Creates an item spanning multiple tracks.",
      },
      {
        value: "span 2",
        label: "Span Keyword",
        description: "Span 2 means the item takes up 2 tracks. Works with both column and row.",
      },
      {
        value: "-1",
        label: "Negative Line",
        description:
          "References the last line. -1 always points to the end regardless of track count.",
      },
    ],
  },

  {
    name: "grid-auto-flow",
    category: "Grid",
    description: "Controls how the browser places auto-placed grid items — row-first, column-first, or dense packing.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-auto-flow: row | column | dense | row dense",
    mdnPath: "grid-auto-flow",
    caniuse: "css-grid",
    demo: `<div style="display:grid;grid-template-columns:repeat(3,1fr);grid-auto-flow:dense;gap:4px;padding:8px;width:100%"><div style="grid-column:span 2;background:#7c3aed;color:#fff;border-radius:3px;padding:6px;font-size:9px;font-weight:700;text-align:center">span 2</div><div style="background:#a78bfa;color:#fff;border-radius:3px;padding:6px;font-size:9px;font-weight:700;text-align:center">auto</div><div style="background:#6366f1;color:#fff;border-radius:3px;padding:6px;font-size:9px;font-weight:700;text-align:center">auto</div><div style="background:#a78bfa;color:#fff;border-radius:3px;padding:6px;font-size:9px;font-weight:700;text-align:center">auto</div></div>`,
    values: [
      {
        value: "row",
        label: "Row",
        description:
          "Items fill row by row, moving to a new row when the current row is full. This is the default.",
      },
      {
        value: "column",
        label: "Column",
        description:
          "Items fill column by column, moving to a new column when the current column is full.",
      },
      {
        value: "dense",
        label: "Dense",
        description:
          "Attempts to fill holes in the grid by placing smaller items in available gaps. May change visual order.",
      },
    ],
  },

  {
    name: "subgrid",
    category: "Grid",
    description: "Lets a nested grid inherit its parent's track sizing — eliminates the need for hacky workarounds.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2023",
    example: "grid-template-columns: subgrid\ngrid-template-rows: subgrid",
    mdnPath: "CSS_grid_layout/Subgrid",
    caniuse: "css-grid",
    demo: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:8px;width:100%"><div style="grid-column:1/-1;display:grid;grid-template-columns:subgrid;gap:4px;background:#f5f3ff;border:2px dashed #7c3aed;border-radius:4px;padding:4px"><div style="background:#7c3aed;color:#fff;border-radius:3px;padding:6px;font-size:9px;font-weight:700;text-align:center">inherits</div><div style="background:#6366f1;color:#fff;border-radius:3px;padding:6px;font-size:9px;font-weight:700;text-align:center">parent</div><div style="background:#8b5cf6;color:#fff;border-radius:3px;padding:6px;font-size:9px;font-weight:700;text-align:center">tracks</div></div></div>`,
    values: [
      {
        value: "subgrid",
        label: "Subgrid",
        description:
          "Inherits the track sizing from the parent grid. Children can align with grandparent items.",
      },
    ],
  },

  {
    name: "minmax()",
    category: "Grid",
    description: "Defines a grid track size with a minimum and maximum constraint.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-template-columns: minmax(80px, 1fr) 2fr",
    mdnPath: "minmax",
    caniuse: "css-grid",
    demo: `<div style="display:grid;grid-template-columns:minmax(70px,1fr) minmax(100px,2fr);gap:4px;padding:8px;width:100%"><div style="background:#7c3aed;color:#fff;border-radius:3px;padding:7px;font-size:9px;font-weight:700;text-align:center">minmax(70px,1fr)</div><div style="background:#6366f1;color:#fff;border-radius:3px;padding:7px;font-size:9px;font-weight:700;text-align:center">minmax(100px,2fr)</div></div>`,
  },

  {
    name: "repeat()",
    category: "Grid",
    description: "Repeats track definitions to build concise, scalable grid templates.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-template-columns: repeat(4, 1fr)",
    mdnPath: "repeat",
    caniuse: "css-grid",
    demo: `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:8px;width:100%">${[1, 2, 3, 4].map((n) => `<div style="background:#8b5cf6;color:#fff;border-radius:3px;padding:6px;font-size:9px;font-weight:700;text-align:center">${n}</div>`).join("")}</div>`,
  },

  {
    name: "grid-area",
    category: "Grid",
    description: "Shorthand for grid-row-start, grid-column-start, grid-row-end, grid-column-end — places items by area name or line numbers.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-area: header | 1 / 2 / 3 / 4",
    mdnPath: "grid-area",
    caniuse: "css-grid",
    demo: `<div style="padding:10px"><div style="display:grid;grid-template-columns:1fr 1fr;grid-template-areas:'a b' 'c c';gap:4px;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px"><div style="grid-area:a;background:#6366f1;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">area a</div><div style="grid-area:b;background:#8b5cf6;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">area b</div><div style="grid-area:c;background:#a78bfa;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">area c</div></div></div>`,
  },

  {
    name: "grid-auto-columns",
    category: "Grid",
    description: "Specifies the size of implicitly-created grid columns — for items placed outside defined tracks.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-auto-columns: 120px | minmax(100px,1fr)",
    mdnPath: "grid-auto-columns",
    caniuse: "css-grid",
    demo: `<div style="padding:10px"><div style="display:grid;grid-auto-flow:column;grid-auto-columns:60px;gap:4px;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px"><div style="background:#6366f1;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">1</div><div style="background:#8b5cf6;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">2</div><div style="background:#a78bfa;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">3</div></div></div>`,
  },

  {
    name: "grid-auto-rows",
    category: "Grid",
    description: "Specifies the size of implicitly-created grid rows — for items placed outside defined tracks.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-auto-rows: 80px | minmax(60px,auto)",
    mdnPath: "grid-auto-rows",
    caniuse: "css-grid",
    demo: `<div style="padding:10px"><div style="display:grid;grid-auto-rows:30px;gap:4px;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px"><div style="background:#6366f1;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">1</div><div style="background:#8b5cf6;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">2</div></div></div>`,
  },
];
