import { describe, it, expect } from "vitest";
import { fuzzySearchProperties, fuzzyMatch, getHighlightedName } from "./search";
import type { CSSProperty } from "../types";

const mockProperties: CSSProperty[] = [
  {
    n: "display",
    c: "Layout",
    d: "Sets the display behavior of an element",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "display: block | inline | flex | grid",
    m: "display",
    demo: "<div style='display:block'>test</div>",
  },
  {
    n: "flex",
    c: "Flexbox",
    d: "Sets the flex container behavior",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "flex: <number>",
    m: "flex",
    demo: "<div style='flex:1'>test</div>",
  },
  {
    n: "flex-direction",
    c: "Flexbox",
    d: "Defines the direction of flex items",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "flex-direction: row | column",
    m: "flex-direction",
    demo: "<div style='flex-direction:row'>test</div>",
  },
  {
    n: "grid",
    c: "Grid",
    d: "Sets the grid container behavior",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "grid: <grid-template>",
    m: "grid",
    demo: "<div style='grid:1fr'>test</div>",
  },
  {
    n: "color",
    c: "Color",
    d: "Sets the text color of an element",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "color: red | #fff | rgb()",
    m: "color",
    demo: "<span style='color:red'>text</span>",
  },
  {
    n: "background-color",
    c: "Color",
    d: "Sets the background color",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "background-color: blue",
    m: "background-color",
    demo: "<div style='background:blue'>test</div>",
  },
  {
    n: "position",
    c: "Layout",
    d: "Sets the positioning method",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "position: relative | absolute",
    m: "position",
    demo: "<div style='position:relative'>test</div>",
  },
];

describe("fuzzySearchProperties", () => {
  it("should return all properties when query is empty", () => {
    const result = fuzzySearchProperties(mockProperties, "");
    expect(result).toHaveLength(mockProperties.length);
  });

  it("should return all properties when query is whitespace", () => {
    const result = fuzzySearchProperties(mockProperties, "   ");
    expect(result).toHaveLength(mockProperties.length);
  });

  it("should find exact property name matches", () => {
    const result = fuzzySearchProperties(mockProperties, "display");
    expect(result.length).toBeGreaterThan(0);
    expect(result.some((p) => p.n === "display")).toBe(true);
  });

  it("should find partial name matches", () => {
    const result = fuzzySearchProperties(mockProperties, "flex");
    expect(result.length).toBeGreaterThan(0);
    // Should find flex, flex-direction
    expect(result.some((p) => p.n === "flex")).toBe(true);
    expect(result.some((p) => p.n === "flex-direction")).toBe(true);
  });

  it("should find matches in description", () => {
    const result = fuzzySearchProperties(mockProperties, "color");
    expect(result.length).toBeGreaterThan(0);
    // Should find properties with "color" in description
    expect(result.some((p) => p.d.toLowerCase().includes("color"))).toBe(true);
  });

  it("should find matches in category", () => {
    const result = fuzzySearchProperties(mockProperties, "flexbox");
    expect(result.length).toBeGreaterThan(0);
    // Should find properties in Flexbox category
    expect(result.some((p) => p.c === "Flexbox")).toBe(true);
  });

  it("should handle case-insensitive search", () => {
    const lowerResult = fuzzySearchProperties(mockProperties, "display");
    const upperResult = fuzzySearchProperties(mockProperties, "DISPLAY");
    const mixedResult = fuzzySearchProperties(mockProperties, "DiSpLaY");

    expect(lowerResult.length).toBeGreaterThan(0);
    expect(lowerResult.length).toBe(upperResult.length);
    expect(lowerResult.length).toBe(mixedResult.length);
  });

  it("should handle fuzzy matching with typos", () => {
    // "displ" should match "display" (missing last char)
    const result = fuzzySearchProperties(mockProperties, "displ");
    expect(result.length).toBeGreaterThan(0);
    expect(result.some((p) => p.n === "display")).toBe(true);

    // "flex-" should match "flex-direction" (partial with separator)
    const flexResult = fuzzySearchProperties(mockProperties, "flex-");
    expect(flexResult.length).toBeGreaterThan(0);
    expect(flexResult.some((p) => p.n === "flex-direction")).toBe(true);
  });

  it("should handle incomplete queries", () => {
    // "pos" should match "position"
    const result = fuzzySearchProperties(mockProperties, "pos");
    expect(result.length).toBeGreaterThan(0);
    expect(result.some((p) => p.n === "position")).toBe(true);
  });

  it("should return empty array for no matches", () => {
    const result = fuzzySearchProperties(mockProperties, "xyznonexistent");
    expect(result).toHaveLength(0);
  });

  it("should rank results by relevance", () => {
    const result = fuzzySearchProperties(mockProperties, "flex");
    expect(result.length).toBeGreaterThan(1);
    // "flex" should be ranked higher than "flex-direction"
    expect(result[0].n).toBe("flex");
  });

  it("should handle special characters in query", () => {
    const result = fuzzySearchProperties(mockProperties, "background");
    expect(result.length).toBeGreaterThan(0);
    expect(result.some((p) => p.n === "background-color")).toBe(true);
  });
});

describe("fuzzyMatch", () => {
  const testProp: CSSProperty = mockProperties[0]; // display

  it("should return true for empty query", () => {
    expect(fuzzyMatch(testProp, "")).toBe(true);
  });

  it("should return true for whitespace query", () => {
    expect(fuzzyMatch(testProp, "   ")).toBe(true);
  });

  it("should match exact property name", () => {
    expect(fuzzyMatch(testProp, "display")).toBe(true);
  });

  it("should match case-insensitively", () => {
    expect(fuzzyMatch(testProp, "DISPLAY")).toBe(true);
    expect(fuzzyMatch(testProp, "DiSpLaY")).toBe(true);
  });

  it("should match partial name", () => {
    expect(fuzzyMatch(testProp, "disp")).toBe(true);
    expect(fuzzyMatch(testProp, "displ")).toBe(true);
  });

  it("should match in description", () => {
    expect(fuzzyMatch(testProp, "display behavior")).toBe(true);
    expect(fuzzyMatch(testProp, "element")).toBe(true);
  });

  it("should match in category", () => {
    expect(fuzzyMatch(testProp, "layout")).toBe(true);
  });

  it("should return false for no match", () => {
    expect(fuzzyMatch(testProp, "xyznonexistent")).toBe(false);
  });

  it("should handle fuzzy matching with typos", () => {
    // "displ" should match "display" (missing last char)
    expect(fuzzyMatch(testProp, "displ")).toBe(true);
    
    // "backgr" should match "background-color"
    const bgProp = mockProperties.find(p => p.n === "background-color")!;
    expect(fuzzyMatch(bgProp, "backgr")).toBe(true);
  });
});

describe("getHighlightedName", () => {
  const testProp = mockProperties.find((p) => p.n === "display")!;

  it("should return original name for empty query", () => {
    expect(getHighlightedName(testProp, "")).toBe("display");
  });

  it("should return original name when no match", () => {
    expect(getHighlightedName(testProp, "xyz")).toBe("display");
  });

  it("should highlight matched characters", () => {
    const result = getHighlightedName(testProp, "display");
    // fuzzysort wraps matched characters in <em> tags
    expect(result).toContain("<em>");
    expect(result).toContain("</em>");
  });

  it("should handle partial matches", () => {
    const result = getHighlightedName(testProp, "disp");
    expect(result).toContain("<em>");
  });
});
