import { describe, it, expect } from "vitest";
import { bIcon } from "./lib/browser-icons";
import { buildStyle, styledBox, flexContainer, comparisonDemo, gridContainer, labeledDemo } from "./demo-helpers";

describe("bIcon", () => {
  it("should return Chrome icon for supported", () => {
    const result = bIcon(1, "ch");
    expect(result).toContain("chrome");
    expect(result).toContain("Chrome");
    expect(result).toContain("y");
  });

  it("should return Firefox icon", () => {
    const result = bIcon(1, "ff");
    expect(result).toContain("firefox");
    expect(result).toContain("Firefox");
  });

  it("should return Safari icon", () => {
    const result = bIcon(1, "sf");
    expect(result).toContain("safari");
    expect(result).toContain("Safari");
  });

  it("should return Edge icon", () => {
    const result = bIcon(1, "ed");
    expect(result).toContain("edge");
    expect(result).toContain("Edge");
  });

  it("should return 'n' class for not supported", () => {
    const result = bIcon(0, "ch");
    expect(result).toContain("n");
  });

  it("should return 'p' class for partial support", () => {
    const result = bIcon("p" as any, "ch");
    expect(result).toContain("p");
  });
});

describe("buildStyle", () => {
  it("should convert camelCase to kebab-case", () => {
    const result = buildStyle({ backgroundColor: "red", fontSize: "12px" });
    expect(result).toContain("background-color: red");
    expect(result).toContain("font-size: 12px");
  });

  it("should filter undefined values", () => {
    const result = buildStyle({ color: "red", padding: undefined });
    expect(result).not.toContain("padding");
    expect(result).toContain("color: red");
  });

  it("should filter null values", () => {
    const result = buildStyle({ color: "red", padding: null });
    expect(result).not.toContain("padding");
    expect(result).toContain("color: red");
  });

  it("should filter empty string values", () => {
    const result = buildStyle({ color: "red", padding: "" });
    expect(result).not.toContain("padding");
    expect(result).toContain("color: red");
  });

  it("should handle multiple properties", () => {
    const result = buildStyle({
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "5px",
    });
    expect(result).toContain("display: flex");
    expect(result).toContain("flex-direction: column");
    expect(result).toContain("gap: 10px");
    expect(result).toContain("padding: 5px");
  });

  it("should return empty string for empty object", () => {
    const result = buildStyle({});
    expect(result).toBe("");
  });
});

describe("styledBox", () => {
  it("should create box with default styles", () => {
    const result = styledBox("content");
    expect(result).toContain("background: #6366f1");
    expect(result).toContain("color: #fff");
    expect(result).toContain("content");
  });

  it("should apply custom styles", () => {
    const result = styledBox("content", { background: "red", color: "white" });
    expect(result).toContain("background: red");
    expect(result).toContain("color: white");
  });

  it("should include custom properties", () => {
    const result = styledBox("content", {
      pointerEvents: "none",
      userSelect: "text",
    });
    expect(result).toContain("pointer-events: none");
    expect(result).toContain("user-select: text");
  });

  it("should handle border property", () => {
    const result = styledBox("content", { border: "2px solid #ef4444" });
    expect(result).toContain("border: 2px solid #ef4444");
  });

  it("should handle cursor property", () => {
    const result = styledBox("content", { cursor: "pointer" });
    expect(result).toContain("cursor: pointer");
  });
});

describe("flexContainer", () => {
  it("should create flex container with children", () => {
    const result = flexContainer("<div>child</div>");
    expect(result).toContain("display: flex");
    expect(result).toContain("<div>child</div>");
  });

  it("should apply custom gap and padding", () => {
    const result = flexContainer("", { gap: "20px", padding: "15px" });
    expect(result).toContain("gap: 20px");
    expect(result).toContain("padding: 15px");
  });

  it("should handle multiple children array", () => {
    const result = flexContainer(["<div>1</div>", "<div>2</div>"]);
    expect(result).toContain("<div>1</div>");
    expect(result).toContain("<div>2</div>");
  });

  it("should apply direction", () => {
    const result = flexContainer("", { direction: "column" });
    expect(result).toContain("flex-direction: column");
  });

  it("should apply justify-content", () => {
    const result = flexContainer("", { justifyContent: "space-between" });
    expect(result).toContain("justify-content: space-between");
  });

  it("should apply align-items", () => {
    const result = flexContainer("", { alignItems: "flex-start" });
    expect(result).toContain("align-items: flex-start");
  });

  it("should apply flex-wrap", () => {
    const result = flexContainer("", { flexWrap: "wrap" });
    expect(result).toContain("flex-wrap: wrap");
  });
});

describe("comparisonDemo", () => {
  it("should create comparison with two boxes", () => {
    const result = comparisonDemo("left", "right", {}, {});
    expect(result).toContain("display: flex");
    expect(result).toContain("left");
    expect(result).toContain("right");
  });

  it("should apply different styles to each box", () => {
    const result = comparisonDemo(
      "auto",
      "none",
      { background: "green", color: "white" },
      { background: "red", color: "black" },
    );
    expect(result).toContain("background: green");
    expect(result).toContain("color: white");
    expect(result).toContain("background: red");
    expect(result).toContain("color: black");
  });
});

describe("gridContainer", () => {
  it("should create grid container", () => {
    const result = gridContainer("<div>item</div>");
    expect(result).toContain("display: grid");
    expect(result).toContain("grid-template-columns: repeat(auto-fit, minmax(100px, 1fr))");
    expect(result).toContain("<div>item</div>");
  });

  it("should apply custom columns", () => {
    const result = gridContainer("", { columns: "repeat(3, 1fr)" });
    expect(result).toContain("grid-template-columns: repeat(3, 1fr)");
  });

  it("should apply custom gap", () => {
    const result = gridContainer("", { gap: "20px" });
    expect(result).toContain("gap: 20px");
  });
});

describe("labeledDemo", () => {
  it("should create labeled demo with label at bottom", () => {
    const result = labeledDemo("label", "<div>demo</div>");
    expect(result).toContain("flex-direction:column");
    expect(result).toContain("<div>demo</div>");
    expect(result).toContain("label");
  });

  it("should position label at top", () => {
    const result = labeledDemo("label", "<div>demo</div>", { labelPosition: "top" });
    expect(result).toContain("flex-direction:column");
    expect(result).toMatch(/label.*demo/);
  });

  it("should position label at left", () => {
    const result = labeledDemo("label", "<div>demo</div>", { labelPosition: "left" });
    expect(result).toContain("align-items:center");
    expect(result).toMatch(/label.*demo/);
  });

  it("should position label at right", () => {
    const result = labeledDemo("label", "<div>demo</div>", { labelPosition: "right" });
    expect(result).toContain("align-items:center");
    expect(result).toMatch(/demo.*label/);
  });

  it("should apply custom label color", () => {
    const result = labeledDemo("label", "<div>demo</div>", { labelColor: "#ff0000" });
    expect(result).toContain("color:#ff0000");
  });
});
