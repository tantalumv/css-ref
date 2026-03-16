import type { BrowserSupport } from "../types";

export type BrowserKey = "ch" | "ff" | "sf" | "ed";

export const BROWSER_KEYS: readonly BrowserKey[] = ["ch", "ff", "sf", "ed"] as const;

export const BROWSER_NAMES: Record<BrowserKey, string> = {
  ch: "Chrome",
  ff: "Firefox",
  sf: "Safari",
  ed: "Edge",
};

export const BROWSER_CLASSES: Record<BrowserKey, string> = {
  ch: "chrome",
  ff: "firefox",
  sf: "safari",
  ed: "edge",
};

export const SUPPORT_STATUS: Record<number | string, string> = {
  1: "Supported",
  0: "Not supported",
  p: "Partial",
};

export const SUPPORT_CLASS: Record<number | string, string> = {
  1: "y",
  0: "n",
  p: "p",
};

/**
 * Generate browser support icon HTML
 */
export function bIcon(val: number, lbl: BrowserKey): string {
  const browserClass = BROWSER_CLASSES[lbl];
  const name = BROWSER_NAMES[lbl];
  const statusClass = SUPPORT_CLASS[val] ?? "p";
  return `<div class="browser-icon ${browserClass} ${statusClass}" title="${name}"></div>`;
}

/**
 * Render full browser support section for detail view
 */
export function renderBrowserSupport(s: BrowserSupport): string {
  return (BROWSER_KEYS as readonly BrowserKey[])
    .map((b) => {
      const v = s[b];
      const cls = SUPPORT_CLASS[v];
      return `<div class="detail-b"><div class="detail-b-icon ${cls}">${bIcon(v, b)}</div><div class="detail-b-name">${BROWSER_NAMES[b]}</div><div class="detail-b-status ${cls}">${SUPPORT_STATUS[v]}</div></div>`;
    })
    .join("");
}
