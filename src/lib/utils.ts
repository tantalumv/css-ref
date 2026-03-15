// Utility functions for CSS Ref

/**
 * Generate browser support icon HTML
 */
export function bIcon(val: number, lbl: string): string {
  const browserClass =
    lbl === "ch" ? "chrome" : lbl === "ff" ? "firefox" : lbl === "sf" ? "safari" : "edge";
  const name =
    lbl === "ch" ? "Chrome" : lbl === "ff" ? "Firefox" : lbl === "sf" ? "Safari" : "Edge";
  const statusClass = val === 1 ? "y" : val === 0 ? "n" : "p";
  return `<div class="browser-icon ${browserClass} ${statusClass}" title="${name}"></div>`;
}

/**
 * Get element by ID or throw error
 */
export function getElementOrError(id: string, context = ""): HTMLElement {
  const el = document.getElementById(id);
  if (!el) {
    console.error(`[DOM] Element #${id} not found${context ? ` (${context})` : ""}`);
    throw new Error(`Element #${id} not found`);
  }
  return el;
}

/**
 * Query selector or throw error
 */
export function querySelectorOrError<T extends HTMLElement>(selector: string, context = ""): T {
  const el = document.querySelector<T>(selector);
  if (!el) {
    console.error(`[DOM] Selector "${selector}" not found${context ? ` (${context})` : ""}`);
    throw new Error(`Selector "${selector}" not found`);
  }
  return el;
}

/**
 * Escape HTML special characters
 */
export function escapeHTML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
