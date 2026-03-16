import { describe, it, expect } from "vitest";
import { filterProperties, hasActiveFilters } from "./lib/filters";
import type { CSSProperty } from "./types";

const mockData: CSSProperty[] = [
  {
    n: "display",
    c: "Layout",
    d: "Sets the display behavior",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "display: block | inline | flex",
    m: "display",
    demo: "",
  },
  {
    n: "color",
    c: "Color",
    d: "Sets the text color",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "color: <color>",
    m: "color",
    demo: "",
  },
  {
    n: "grid-template-columns",
    c: "Grid",
    d: "Defines column tracks",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "grid-template-columns: <track-list>",
    m: "grid-template-columns",
    demo: "",
  },
  {
    n: "flex-direction",
    c: "Flexbox",
    d: "Sets the flex direction",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2024",
    x: "flex-direction: row | column",
    m: "flex-direction",
    demo: "",
  },
  {
    n: "margin",
    c: "Spacing",
    d: "Sets the margin on all sides",
    s: { ch: 1, ff: 1, sf: 1, ed: 0 },
    i: "wide",
    x: "margin: <length>",
    m: "margin",
    demo: "",
  },
];

describe("filterProperties", () => {
  it("should return all items with no filters", () => {
    const result = filterProperties(mockData, "", [], []);
    expect(result).toHaveLength(5);
  });

  it("should filter by category", () => {
    const result = filterProperties(mockData, "", ["Layout"], []);
    expect(result).toHaveLength(1);
    expect(result[0].n).toBe("display");
  });

  it("should filter by multiple categories", () => {
    const result = filterProperties(mockData, "", ["Layout", "Color"], []);
    expect(result).toHaveLength(2);
  });

  it("should filter by query", () => {
    const result = filterProperties(mockData, "color", [], []);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.some(p => p.n === "color")).toBe(true);
  });

  it("should filter by query in description", () => {
    const result = filterProperties(mockData, "text", [], []);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it("should filter by query in category", () => {
    const result = filterProperties(mockData, "layout", [], []);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it("should filter by interop status", () => {
    const result = filterProperties(mockData, "", [], ["b2024"]);
    expect(result).toHaveLength(1);
    expect(result[0].n).toBe("flex-direction");
  });

  it("should filter by browser support", () => {
    const result = filterProperties(mockData, "", [], [], ["ch", "ff", "sf"]);
    // All properties have ch, ff, sf = 1, so all should match
    expect(result).toHaveLength(5);
  });

  it("should filter by browser support requiring all browsers", () => {
    const result = filterProperties(mockData, "", [], [], ["ch", "ff", "sf", "ed"]);
    // Only properties with all browsers = 1
    expect(result).toHaveLength(4);
  });

  it("should combine category and query filters", () => {
    const result = filterProperties(mockData, "display", ["Layout", "Grid"], []);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.some(p => p.n === "display")).toBe(true);
  });

  it("should combine all filter types", () => {
    const result = filterProperties(mockData, "", ["Layout", "Color", "Grid"], ["wide"], ["ch", "ff", "sf", "ed"]);
    expect(result).toHaveLength(3);
  });

  it("should handle case-insensitive query", () => {
    const result1 = filterProperties(mockData, "DISPLAY", [], []);
    const result2 = filterProperties(mockData, "display", [], []);
    expect(result1.length).toBeGreaterThanOrEqual(1);
    expect(result2.length).toBeGreaterThanOrEqual(1);
    expect(result1.some(p => p.n === "display")).toBe(true);
    expect(result2.some(p => p.n === "display")).toBe(true);
  });

  it("should handle fuzzy matching (typo tolerance)", () => {
    // Fuzzysort should match "displ" to "display" even with incomplete query
    const result = filterProperties(mockData, "displ", [], []);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.some(p => p.n === "display")).toBe(true);
  });

  it("should return empty array when no matches", () => {
    const result = filterProperties(mockData, "", ["NonExistent"], []);
    expect(result).toHaveLength(0);
  });

  it("should handle empty query string", () => {
    const result = filterProperties(mockData, "", [], []);
    expect(result).toHaveLength(5);
  });
});

describe("hasActiveFilters", () => {
  it("should return false with no filters", () => {
    expect(hasActiveFilters()).toBe(false);
  });

  it("should return true with query", () => {
    expect(hasActiveFilters({ query: "test" })).toBe(true);
  });

  it("should return true with categories", () => {
    expect(hasActiveFilters({ categories: ["Layout"] })).toBe(true);
  });

  it("should return true with interops", () => {
    expect(hasActiveFilters({ interops: ["wide"] })).toBe(true);
  });

  it("should return true with browsers", () => {
    expect(hasActiveFilters({ browsers: ["ch"] })).toBe(true);
  });

  it("should return true with multiple filter types", () => {
    expect(hasActiveFilters({ query: "test", categories: ["Layout"] })).toBe(true);
  });

  it("should return false with empty arrays and empty query", () => {
    expect(hasActiveFilters({ query: "", categories: [], interops: [], browsers: [] })).toBe(false);
  });
});
