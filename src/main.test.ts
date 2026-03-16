import { describe, it, expect } from "vitest";
import { CC, IL, IC } from "./constants";
import { P, CATS, INTEROPS } from "./data";
import { filterProperties, hasActiveFilters } from "./lib/filters";
import { bIcon } from "./lib/browser-icons";

describe("CSS Ref App", () => {
  describe("Constants", () => {
    it("should have category colors defined", () => {
      expect(CC.Layout).toBe("#6366f1");
      expect(CC.Flexbox).toBe("#8b5cf6");
      expect(CC.Grid).toBe("#7c3aed");
    });

    it("should have interop labels defined", () => {
      expect(IL.wide).toBe("Available");
      expect(IL.b2024).toContain("Baseline 2024");
      expect(IL.exp).toContain("Experimental");
    });

    it("should have interop colors defined", () => {
      expect(IC.wide).toBe("#15803d");
      expect(IC.exp).toBe("#b91c1c");
    });
  });

  describe("Data", () => {
    it("should have CSS properties loaded", () => {
      expect(P.length).toBeGreaterThan(0);
      expect(P[0]).toHaveProperty("n"); // name
      expect(P[0]).toHaveProperty("c"); // category
      expect(P[0]).toHaveProperty("d"); // description
      expect(P[0]).toHaveProperty("s"); // browser support
      expect(P[0]).toHaveProperty("i"); // interop status
    });

    it("should have unique categories", () => {
      const categories = [...new Set(P.map((p) => p.c))];
      expect(CATS.length).toBe(categories.length);
      expect(CATS).toContain("Layout");
      expect(CATS).toContain("Flexbox");
      expect(CATS).toContain("Grid");
    });

    it("should have valid interop statuses", () => {
      const statuses = new Set(P.map((p) => p.i));
      statuses.forEach((status) => {
        expect(INTEROPS).toContain(status);
      });
    });
  });

  describe("Filter Logic", () => {
    it("should return all items when no filters active", () => {
      const result = filterProperties(P, "", [], []);
      expect(result.length).toBe(P.length);
    });

    it("should filter by category", () => {
      const result = filterProperties(P, "", ["Layout"], []);
      expect(result.every((p) => p.c === "Layout")).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThan(P.length);
    });

    it("should filter by multiple categories", () => {
      const result = filterProperties(P, "", ["Layout", "Flexbox"], []);
      expect(result.every((p) => p.c === "Layout" || p.c === "Flexbox")).toBe(true);
    });

    it("should filter by interop status", () => {
      const result = filterProperties(P, "", [], ["wide"]);
      expect(result.every((p) => p.i === "wide")).toBe(true);
    });

    it("should filter by search query", () => {
      const result = filterProperties(P, "flex", [], []);
      expect(result.length).toBeGreaterThan(0);
      // Fuzzy search should find flex-related properties
      expect(result.some(p => p.n.toLowerCase().includes("flex") || p.c === "Flexbox")).toBe(true);
    });

    it("should combine category and search filters", () => {
      const result = filterProperties(P, "position", ["Layout"], []);
      expect(result.every((p) => p.c === "Layout")).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it("should return empty array when no matches", () => {
      const result = filterProperties(P, "xyznonexistent", [], []);
      expect(result).toEqual([]);
    });
  });

  describe("hasActiveFilters", () => {
    it("should return false when no filters active", () => {
      expect(hasActiveFilters()).toBe(false);
    });

    it("should return true when category filter active", () => {
      expect(hasActiveFilters({ categories: ["Layout"] })).toBe(true);
    });

    it("should return true when interop filter active", () => {
      expect(hasActiveFilters({ interops: ["wide"] })).toBe(true);
    });

    it("should return true when query filter active", () => {
      expect(hasActiveFilters({ query: "test" })).toBe(true);
    });
  });

  describe("bIcon", () => {
    it("should return supported icon for value 1", () => {
      const result = bIcon(1, "ch");
      expect(result).toContain("y"); // class for supported
      expect(result).toContain("C"); // Chrome abbr
      expect(result).toContain("Chrome");
    });

    it("should return unsupported icon for value 0", () => {
      const result = bIcon(0, "ff");
      expect(result).toContain("n"); // class for not supported
      expect(result).toContain("F"); // Firefox abbr
      expect(result).toContain("Firefox");
    });

    it("should return partial icon for other values", () => {
      const result = bIcon(0.5, "sf");
      expect(result).toContain("p"); // class for partial
      expect(result).toContain("S"); // Safari abbr
      expect(result).toContain("Safari");
    });
  });
});
