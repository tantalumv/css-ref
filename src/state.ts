import type { InteropStatus, ViewMode } from "./types";

// Application state
export const activeCats = new Set<string>();
export const activeInterops = new Set<InteropStatus>();
export let q = "";
export let viewMode: ViewMode = "grid";
export let catPopoverOpen = false;
export let interopPopoverOpen = false;

// State setters for testing
export function setQuery(newQ: string): void {
  q = newQ.toLowerCase().trim();
}

export function setViewMode(mode: ViewMode): void {
  viewMode = mode;
}

export function setCatPopoverOpen(open: boolean): void {
  catPopoverOpen = open;
}

export function setInteropPopoverOpen(open: boolean): void {
  interopPopoverOpen = open;
}

export function resetFilters(): void {
  activeCats.clear();
  activeInterops.clear();
  q = "";
}

// Category chips toggle
export function toggleCat(cat: string): void {
  if (activeCats.has(cat)) {
    activeCats.delete(cat);
  } else {
    activeCats.add(cat);
  }
}

export function toggleInterop(status: InteropStatus): void {
  if (activeInterops.has(status)) {
    activeInterops.delete(status);
  } else {
    activeInterops.add(status);
  }
}
