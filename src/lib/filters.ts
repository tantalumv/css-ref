// Filter and sort logic for CSS Ref

import type { CSSProperty, BrowserSupport, InteropStatus } from "../types";
import { INTEROP_SORT_RANK, IL } from "../constants";
import { fuzzyMatch } from "./search";

export type SortField = "prop-name" | "prop-category" | "prop-support-sort";
export type SortOrder = "asc" | "desc";

export interface FilterOptions {
  query?: string;
  categories?: string[];
  interops?: string[];
  browsers?: string[];
}

/**
 * Filter CSS properties by query, categories, interop status, and browser support
 * Uses fuzzysort for typo-tolerant search
 */
export function filterProperties(
  props: CSSProperty[],
  query: string,
  activeCats: string[],
  activeInterops: string[],
  activeBrowsers: string[] = [],
): CSSProperty[] {
  return props.filter(
    (p) =>
      (!activeCats.length || activeCats.includes(p.c)) &&
      (!activeInterops.length || activeInterops.includes(p.i)) &&
      (!activeBrowsers.length ||
        activeBrowsers.every((b) => p.s[b as keyof BrowserSupport] === 1)) &&
      fuzzyMatch(p, query),
  );
}

/**
 * Filter using options object (for tests)
 */
export function filterPropertiesWithOptions(
  data: CSSProperty[],
  options: FilterOptions = {},
): CSSProperty[] {
  const { query = "", categories = [], interops = [], browsers = [] } = options;
  return filterProperties(data, query, categories, interops, browsers);
}

/**
 * Check if any filters are currently active (pure function with options)
 */
export function hasActiveFilters(options: FilterOptions = {}): boolean {
  const { query = "", categories = [], interops = [], browsers = [] } = options;
  return query.length > 0 || categories.length > 0 || interops.length > 0 || browsers.length > 0;
}

/**
 * Check if current application state has active filters (for backwards compatibility)
 */
export function hasFilters(): boolean {
  return false; // No global state in modular version
}

/**
 * Filter using global state (for backwards compatibility with tests)
 * This is a stub - the actual implementation uses window.filtered
 */
export function filtered(): CSSProperty[] {
  return [];
}

/**
 * Toggle item in array (immutable)
 */
export function toggleInArray<T>(arr: readonly T[], item: T): T[] {
  const idx = arr.indexOf(item);
  if (idx > -1) {
    const copy = [...arr];
    copy.splice(idx, 1);
    return copy;
  }
  return [...arr, item];
}

/**
 * Compare two properties by sort field
 */
export function compareBySortField(a: CSSProperty, b: CSSProperty, field: SortField): number {
  if (field === "prop-name") {
    return a.n.localeCompare(b.n, undefined, { sensitivity: "base" });
  }

  if (field === "prop-category") {
    return a.c.localeCompare(b.c, undefined, { sensitivity: "base" });
  }

  const rankDiff = INTEROP_SORT_RANK[a.i] - INTEROP_SORT_RANK[b.i];
  if (rankDiff !== 0) return rankDiff;
  return IL[a.i].localeCompare(IL[b.i], undefined, { sensitivity: "base" });
}

/**
 * Sort array of properties by field and order
 */
export function sortProperties(
  props: CSSProperty[],
  field: SortField,
  order: SortOrder = "asc",
): CSSProperty[] {
  return [...props].sort((a, b) => {
    const result = compareBySortField(a, b, field);
    return order === "asc" ? result : -result;
  });
}

/**
 * Find related properties (same category, similar prefix)
 */
export function findRelatedProps(
  currentProp: CSSProperty,
  allProps: CSSProperty[],
  count: number = 4,
): CSSProperty[] {
  // Find related props by category, excluding current prop
  const sameCategory = allProps.filter((p) => p.c === currentProp.c && p.n !== currentProp.n);

  // Sort by name similarity (common prefix)
  const prefix = currentProp.n.split("-")[0];
  const withPrefix = sameCategory.filter((p) => p.n.startsWith(prefix));
  const withoutPrefix = sameCategory.filter((p) => !p.n.startsWith(prefix));

  // Combine: prefix matches first, then others from same category
  const related = [...withPrefix, ...withoutPrefix].slice(0, count);

  // If not enough in same category, add from other categories
  if (related.length < count) {
    const others = allProps
      .filter((p) => p.c !== currentProp.c && p.n !== currentProp.n)
      .slice(0, count - related.length);
    related.push(...others);
  }

  return related;
}
