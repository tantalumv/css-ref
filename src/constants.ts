// Browser information
export const BROWSER_KEYS = ["ch", "ff", "sf", "ed"] as const;
export type BrowserKey = typeof BROWSER_KEYS[number];

export const BROWSER_INFO: Record<BrowserKey, { name: string; class: string }> = {
  ch: { name: "Chrome", class: "chrome" },
  ff: { name: "Firefox", class: "firefox" },
  sf: { name: "Safari", class: "safari" },
  ed: { name: "Edge", class: "edge" },
};

export const BROWSER_SUPPORT_STATUS: Record<number | string, string> = {
  1: "Supported",
  0: "Not supported",
  p: "Partial",
};

export const SUPPORT_CLASS: Record<number | string, string> = {
  1: "y",
  0: "n",
  p: "p",
};

// Configuration
export const TABLE_CONFIG = {
  BATCH_SIZE: 30,
  INITIAL_BATCH: 30,
  SENTINEL_THRESHOLD: 400,
} as const;

export const TIMEOUTS = {
  TABLE_INIT: 500,
  LOAD_UNLOCK: 50,
  DEBOUNCE: 300,
  ANIMATION: 250,
} as const;

export const DEFAULT_CATEGORY_COLOR = "#6366f1";

// Category color mapping
export const CC: Record<string, string> = {
  Layout: "#6366f1",
  Flexbox: "#8b5cf6",
  Grid: "#7c3aed",
  Typography: "#14b8a6",
  Color: "#f59e0b",
  Sizing: "#06b6d4",
  Visual: "#84cc16",
  Animation: "#f43f5e",
  Transform: "#10b981",
  Spacing: "#f97316",
  Interactivity: "#0ea5e9",
  "CSS Variables": "#a855f7",
  Queries: "#e11d48",
  Selectors: "#7c3aed",
  "UI Components": "#0891b2",
  Tables: "#65a30d",
  Lists: "#d97706",
  Misc: "#6b7280",
  Breaks: "#db2777",
};

// Interop labels
export const IL: Record<string, string> = {
  wide: "Available",
  b2024: "Baseline 2024",
  b2023: "Baseline 2023",
  b2022: "Baseline 2022",
  ltd: "Limited",
  exp: "Experimental",
};

// Interop colors
export const IC: Record<string, string> = {
  wide: "#15803d",
  b2024: "#166534",
  b2023: "#14532d",
  b2022: "#15803d",
  ltd: "#a16207",
  exp: "#b91c1c",
};

// Interop sort rank
export const INTEROP_SORT_RANK: Record<string, number> = {
  wide: 1,
  b2024: 2,
  b2023: 3,
  b2022: 4,
  ltd: 5,
  exp: 6,
};
