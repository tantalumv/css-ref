import type { InteropStatus } from "./types";

export const CC: Record<string, string> = {
  Layout: "#6366f1",
  Flexbox: "#8b5cf6",
  Grid: "#7c3aed",
  Typography: "#ec4899",
  Color: "#f97316",
  Sizing: "#06b6d4",
  Visual: "#10b981",
  Animation: "#f59e0b",
  Transform: "#14b8a6",
  Spacing: "#84cc16",
  Interactivity: "#ef4444",
  "CSS Variables": "#3b82f6",
  Queries: "#a855f7",
  Selectors: "#0891b2",
  "UI Components": "#0ea5e9",
  Tables: "#0f766e",
  Lists: "#4f46e5",
  Breaks: "#9a3412",
  Misc: "#475569",
};

export const IL: Record<InteropStatus, string> = {
  wide: "Available",
  b2024: "Baseline 2024",
  b2023: "Baseline 2023",
  b2022: "Baseline 2022",
  ltd: "Limited",
  exp: "Experimental",
};

export const IC: Record<InteropStatus, string> = {
  wide: "#15803d",
  b2024: "#1d4ed8",
  b2023: "#4338ca",
  b2022: "#6d28d9",
  ltd: "#b45309",
  exp: "#b91c1c",
};

export const bx = (c: string, t: string, r = "4px"): string =>
  `<div style="background:${c};color:#fff;border-radius:${r};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;font-family:system-ui">${t}</div>`;
