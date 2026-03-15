// Fuzzy search for CSS Ref using fuzzysort

import fuzzysort from 'fuzzysort';
import type { CSSProperty } from '../types';

// Fuzzy search options - tuned for CSS property search
const FUZZY_OPTIONS = {
  threshold: -10000, // Return all results, let caller filter
  limit: 1000, // High limit to get all matches
} as const;

/**
 * Fuzzy search CSS properties by name, description, or category
 * Returns properties sorted by relevance
 */
export function fuzzySearchProperties(
  props: CSSProperty[],
  query: string,
): CSSProperty[] {
  if (!query || query.trim() === '') {
    return props;
  }

  const trimmedQuery = query.trim();

  // Search across name, description, and category fields
  const results = fuzzysort.go(trimmedQuery, props, {
    keys: ['n', 'd', 'c'],
    ...FUZZY_OPTIONS,
  });

  return results.map((result) => result.obj);
}

/**
 * Check if a query would match a property using fuzzy search
 * Used for filtering with multiple criteria
 */
export function fuzzyMatch(
  prop: CSSProperty,
  query: string,
): boolean {
  if (!query || query.trim() === '') {
    return true;
  }

  const trimmedQuery = query.trim();
  
  // First try case-insensitive substring match (faster, covers most cases)
  const queryLower = trimmedQuery.toLowerCase();
  if (prop.n.toLowerCase().includes(queryLower) ||
      prop.d.toLowerCase().includes(queryLower) ||
      prop.c.toLowerCase().includes(queryLower)) {
    return true;
  }
  
  // Fall back to fuzzy search for typo tolerance
  // Note: fuzzysort is case-sensitive, so we already handled exact matches above
  const results = fuzzysort.single(trimmedQuery, [prop.n, prop.d, prop.c]);
  
  return results !== null;
}

/**
 * Get highlighted HTML for a property match
 * Returns the property name with matched characters wrapped in <em> tags
 */
export function getHighlightedName(
  prop: CSSProperty,
  query: string,
): string {
  if (!query || query.trim() === '') {
    return prop.n;
  }

  const trimmedQuery = query.trim();
  const result = fuzzysort.single(trimmedQuery, prop.n);

  if (result) {
    return result.highlight('<em>', '</em>');
  }

  return prop.n;
}
