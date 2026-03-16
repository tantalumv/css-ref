import { describe, it, expect } from "vitest";
import { P, COLLECTIONS, COLLECTIONS_LIST, CATEGORIES } from "./data";
import type { CSSProperty } from "./types";

describe("Collections", () => {
  describe("COLLECTIONS", () => {
    it("should have 9 collections defined", () => {
      expect(COLLECTIONS_LIST.length).toBe(9);
    });

    it("should have Flexbox collection", () => {
      expect(COLLECTIONS).toHaveProperty("Flexbox");
      expect(COLLECTIONS.Flexbox.name).toBe("Flexbox");
      expect(COLLECTIONS.Flexbox.slug).toBe("flexbox");
    });

    it("should have Grid collection", () => {
      expect(COLLECTIONS).toHaveProperty("Grid");
      expect(COLLECTIONS.Grid.name).toBe("Grid");
      expect(COLLECTIONS.Grid.slug).toBe("grid");
    });

    it("should have Typography collection", () => {
      expect(COLLECTIONS).toHaveProperty("Typography");
      expect(COLLECTIONS.Typography.name).toBe("Typography");
    });

    it("should have Animation collection", () => {
      expect(COLLECTIONS).toHaveProperty("Animation");
      expect(COLLECTIONS.Animation.name).toBe("Animation");
    });

    it("should have Color collection", () => {
      expect(COLLECTIONS).toHaveProperty("Color");
      expect(COLLECTIONS.Color.name).toBe("Color");
    });

    it("should have Layout collection", () => {
      expect(COLLECTIONS).toHaveProperty("Layout");
      expect(COLLECTIONS.Layout.name).toBe("Layout");
    });

    // New collections
    it("should have Backgrounds collection", () => {
      expect(COLLECTIONS).toHaveProperty("Backgrounds");
      expect(COLLECTIONS.Backgrounds.name).toBe("Backgrounds");
      expect(COLLECTIONS.Backgrounds.slug).toBe("backgrounds");
    });

    it("should have BoxModel collection", () => {
      expect(COLLECTIONS).toHaveProperty("BoxModel");
      expect(COLLECTIONS.BoxModel.name).toBe("Box Model");
      expect(COLLECTIONS.BoxModel.slug).toBe("box-model");
    });

    it("should have Transitions collection", () => {
      expect(COLLECTIONS).toHaveProperty("Transitions");
      expect(COLLECTIONS.Transitions.name).toBe("Transitions");
      expect(COLLECTIONS.Transitions.slug).toBe("transitions");
    });
  });

  describe("Collection Structure", () => {
    it("each collection should have required fields", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        expect(collection.id).toBeDefined();
        expect(collection.name).toBeDefined();
        expect(collection.slug).toBeDefined();
        expect(collection.description).toBeDefined();
        expect(collection.icon).toBeDefined();
        expect(collection.color).toBeDefined();
        expect(collection.intro).toBeDefined();
        expect(collection.useCases).toBeDefined();
        expect(collection.useCases.length).toBeGreaterThan(0);
        expect(collection.concepts).toBeDefined();
        expect(collection.concepts.length).toBeGreaterThan(0);
        expect(collection.examples).toBeDefined();
        expect(collection.examples.length).toBeGreaterThan(0);
        expect(collection.related).toBeDefined();
        expect(collection.related.length).toBeGreaterThan(0);
      });
    });

    it("each collection should have useCases with descriptions", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        collection.useCases.forEach((useCase) => {
          expect(typeof useCase).toBe("string");
          expect(useCase.length).toBeGreaterThan(10);
        });
      });
    });

    it("each collection should have concepts with descriptions", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        collection.concepts.forEach((concept) => {
          expect(typeof concept).toBe("string");
          expect(concept.length).toBeGreaterThan(10);
        });
      });
    });

    it("each collection should have examples with code", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        collection.examples.forEach((example) => {
          expect(example.title).toBeDefined();
          expect(example.description).toBeDefined();
          expect(example.code).toBeDefined();
          expect(example.code.length).toBeGreaterThan(10);
        });
      });
    });
  });

  describe("Interactive Demos", () => {
    it("each collection should have interactiveDemo", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        expect(collection.interactiveDemo).toBeDefined();
        expect(typeof collection.interactiveDemo).toBe("string");
        expect((collection.interactiveDemo as string).length).toBeGreaterThan(50);
      });
    });

    it("interactive demos should contain HTML elements", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        const demo = collection.interactiveDemo || "";
        expect(demo).toContain("<div");
        expect(demo).toContain("</div>");
      });
    });

    it("interactive demos should have interactive elements", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        const demo = collection.interactiveDemo || "";
        // Most demos should have buttons or inputs
        expect(
          demo.includes("<button") ||
            demo.includes("<input") ||
            demo.includes("onclick") ||
            demo.includes("onchange"),
        ).toBe(true);
      });
    });
  });

  describe("Collection Colors", () => {
    it("each collection should have a valid hex color", () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      COLLECTIONS_LIST.forEach((collection) => {
        expect(hexColorRegex.test(collection.color)).toBe(true);
      });
    });

    it("collection colors should be distinct", () => {
      const colors = COLLECTIONS_LIST.map((c) => c.color);
      const uniqueColors = new Set(colors);
      expect(uniqueColors.size).toBe(colors.length);
    });
  });

  describe("Collection Category Mapping", () => {
    it("Flexbox collection should map to Flexbox category properties", () => {
      const flexboxProps = P.filter((p) => p.c === "Flexbox");
      expect(flexboxProps.length).toBeGreaterThan(0);
    });

    it("Grid collection should map to Grid category properties", () => {
      const gridProps = P.filter((p) => p.c === "Grid");
      expect(gridProps.length).toBeGreaterThan(0);
    });

    it("Animation collection should map to Animation category properties", () => {
      const animationProps = P.filter((p) => p.c === "Animation");
      expect(animationProps.length).toBeGreaterThan(0);
    });
  });

  describe("Related Collections", () => {
    it("each collection's related should reference existing collections or categories", () => {
      const allCollectionIds = Object.values(COLLECTIONS).map((c) => c.id);
      const allCategoryIds = Object.keys(CATEGORIES);
      const validIds = [...new Set([...allCollectionIds, ...allCategoryIds])];

      COLLECTIONS_LIST.forEach((collection) => {
        collection.related.forEach((relatedName) => {
          const isValid = validIds.some((id) => id.toLowerCase() === relatedName.toLowerCase());
          expect(isValid).toBe(true);
        });
      });
    });
  });
});

describe("Can I Use Integration", () => {
  describe("caniuse field", () => {
    it("CSSProperty interface should support caniuse field", () => {
      const prop: CSSProperty = {
        n: "test",
        c: "Layout",
        d: "Test property",
        s: { ch: 1, ff: 1, sf: 1, ed: 1 },
        i: "wide",
        x: "test: value",
        m: "test",
        demo: "<div>test</div>",
        caniuse: "css-grid",
      };
      expect(prop.caniuse).toBe("css-grid");
    });

    it("should have caniuse field on flexbox properties", () => {
      const flexProps = P.filter((p) => p.c === "Flexbox");
      const propsWithCanIUse = flexProps.filter((p) => p.caniuse);
      expect(propsWithCanIUse.length).toBeGreaterThan(0);
    });

    it("should have caniuse field on grid properties", () => {
      const gridProps = P.filter((p) => p.c === "Grid");
      const propsWithCanIUse = gridProps.filter((p) => p.caniuse);
      expect(propsWithCanIUse.length).toBeGreaterThan(0);
    });

    it("should have caniuse field on animation properties", () => {
      const animProps = P.filter((p) => p.c === "Animation");
      const propsWithCanIUse = animProps.filter((p) => p.caniuse);
      expect(propsWithCanIUse.length).toBeGreaterThan(0);
    });

    it("caniuse values should be valid caniuse feature IDs", () => {
      const propsWithCanIUse = P.filter((p) => p.caniuse);
      const validCanIUseIds = [
        "flexbox",
        "css-grid",
        "css-animation",
        "css-transitions",
        "will-change",
        "view-transitions",
        "css-motion-paths",
      ];

      propsWithCanIUse.forEach((prop) => {
        expect(validCanIUseIds).toContain(prop.caniuse);
      });
    });
  });

  describe("Can I Use URLs", () => {
    it("should generate valid caniuse URLs", () => {
      const flexProp = P.find((p) => p.caniuse === "flexbox");
      expect(flexProp).toBeDefined();

      const expectedUrl = `https://caniuse.com/${flexProp!.caniuse}`;
      expect(expectedUrl).toBe("https://caniuse.com/flexbox");
    });

    it("should generate valid caniuse URLs for grid", () => {
      const gridProp = P.find((p) => p.caniuse === "css-grid");
      expect(gridProp).toBeDefined();

      const expectedUrl = `https://caniuse.com/${gridProp!.caniuse}`;
      expect(expectedUrl).toBe("https://caniuse.com/css-grid");
    });
  });
});

describe("Property Details Enhancement", () => {
  it("properties should have MDN link", () => {
    P.forEach((prop) => {
      expect(prop.m).toBeDefined();
      expect(typeof prop.m).toBe("string");
      expect(prop.m.length).toBeGreaterThan(0);
    });
  });

  it("properties should have syntax definition", () => {
    P.forEach((prop) => {
      expect(prop.x).toBeDefined();
      expect(typeof prop.x).toBe("string");
      expect(prop.x.length).toBeGreaterThan(0);
    });
  });

  it("properties should have demo HTML", () => {
    P.forEach((prop) => {
      expect(prop.demo).toBeDefined();
      expect(typeof prop.demo).toBe("string");
      expect(prop.demo.length).toBeGreaterThan(0);
    });
  });
});

describe("CSSProperty Default Values", () => {
  it("CSSProperty interface should support default field", () => {
    const prop: CSSProperty = {
      n: "test",
      c: "Layout",
      d: "Test property",
      s: { ch: 1, ff: 1, sf: 1, ed: 1 },
      i: "wide",
      x: "test: value",
      m: "test",
      demo: "<div>test</div>",
      default: "auto",
    };
    expect(prop.default).toBe("auto");
  });

  it("flexbox properties should have default values", () => {
    const flexProps = P.filter((p) => p.c === "Flexbox");
    const propsWithDefaults = flexProps.filter((p) => p.default);
    expect(propsWithDefaults.length).toBeGreaterThan(0);
  });

  it("grid properties should have default values", () => {
    const gridProps = P.filter((p) => p.c === "Grid");
    const propsWithDefaults = gridProps.filter((p) => p.default);
    expect(propsWithDefaults.length).toBeGreaterThan(0);
  });

  it("layout properties should have default values", () => {
    const layoutProps = P.filter((p) => p.c === "Layout");
    const propsWithDefaults = layoutProps.filter((p) => p.default);
    expect(propsWithDefaults.length).toBeGreaterThan(0);
  });

  it("animation properties should have default values", () => {
    const animProps = P.filter((p) => p.c === "Animation");
    const propsWithDefaults = animProps.filter((p) => p.default);
    expect(propsWithDefaults.length).toBeGreaterThan(0);
  });

  it("default values should be non-empty strings", () => {
    const propsWithDefaults = P.filter((p) => p.default);
    propsWithDefaults.forEach((prop) => {
      expect(typeof prop.default).toBe("string");
      expect((prop.default as string).length).toBeGreaterThan(0);
    });
  });
});

describe("CSSValue Per-Value Demos", () => {
  it("CSSValue interface should support demo field", () => {
    const value = {
      value: "flex",
      label: "Flex",
      description: "Flexible box",
      demo: "<div style='display:flex'>demo</div>",
    };
    expect(value.demo).toBeDefined();
  });
});

describe("New CollectionMeta Fields", () => {
  describe("Learning Objectives", () => {
    it("each collection should have learningObjectives", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        expect(collection.learningObjectives).toBeDefined();
        expect(Array.isArray(collection.learningObjectives)).toBe(true);
        expect((collection.learningObjectives as string[]).length).toBeGreaterThan(0);
      });
    });

    it("learning objectives should have meaningful content", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        (collection.learningObjectives as string[]).forEach((obj) => {
          expect(typeof obj).toBe("string");
          expect(obj.length).toBeGreaterThan(10);
        });
      });
    });

    it("each collection should have 4 learning objectives", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        expect((collection.learningObjectives as string[]).length).toBe(4);
      });
    });
  });

  describe("Common Mistakes", () => {
    it("each collection should have commonMistakes", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        expect(collection.commonMistakes).toBeDefined();
        expect(Array.isArray(collection.commonMistakes)).toBe(true);
        expect((collection.commonMistakes as string[]).length).toBeGreaterThan(0);
      });
    });

    it("common mistakes should have meaningful content", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        (collection.commonMistakes as string[]).forEach((mistake) => {
          expect(typeof mistake).toBe("string");
          expect(mistake.length).toBeGreaterThan(10);
        });
      });
    });

    it("each collection should have 4 common mistakes", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        expect((collection.commonMistakes as string[]).length).toBe(4);
      });
    });
  });

  describe("When To Use", () => {
    it("each collection should have whenToUse", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        expect(collection.whenToUse).toBeDefined();
        expect(Array.isArray(collection.whenToUse)).toBe(true);
        expect((collection.whenToUse as string[]).length).toBeGreaterThan(0);
      });
    });

    it("when to use scenarios should have meaningful content", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        (collection.whenToUse as string[]).forEach((scenario) => {
          expect(typeof scenario).toBe("string");
          expect(scenario.length).toBeGreaterThan(10);
        });
      });
    });

    it("each collection should have 4 when to use scenarios", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        expect((collection.whenToUse as string[]).length).toBe(4);
      });
    });
  });

  describe("Difficulty Rating", () => {
    it("each collection should have difficulty", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        expect(collection.difficulty).toBeDefined();
      });
    });

    it("difficulty should be valid value", () => {
      const validDifficulties = ["beginner", "intermediate", "advanced"];
      COLLECTIONS_LIST.forEach((collection) => {
        expect(validDifficulties).toContain(collection.difficulty);
      });
    });

    it("difficulty should match expected pattern", () => {
      // Typography, Color, BoxModel, Transitions should be beginner
      expect(COLLECTIONS.Typography.difficulty).toBe("beginner");
      expect(COLLECTIONS.Color.difficulty).toBe("beginner");
      expect(COLLECTIONS.BoxModel.difficulty).toBe("beginner");
      expect(COLLECTIONS.Transitions.difficulty).toBe("beginner");

      // Flexbox, Grid, Animation, Layout should be intermediate
      expect(COLLECTIONS.Flexbox.difficulty).toBe("intermediate");
      expect(COLLECTIONS.Grid.difficulty).toBe("intermediate");
      expect(COLLECTIONS.Animation.difficulty).toBe("intermediate");
      expect(COLLECTIONS.Layout.difficulty).toBe("intermediate");
    });
  });

  describe("Estimated Time", () => {
    it("each collection should have estimatedTime", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        expect(collection.estimatedTime).toBeDefined();
        expect(typeof collection.estimatedTime).toBe("string");
        expect((collection.estimatedTime as string).length).toBeGreaterThan(0);
      });
    });

    it("estimated time should contain hours or hour", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        const time = collection.estimatedTime as string;
        expect(
          time.includes("hour") || time.includes("hours"),
        ).toBe(true);
      });
    });
  });

  describe("Prerequisites", () => {
    it("each collection should have prerequisites", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        expect(collection.prerequisites).toBeDefined();
        expect(Array.isArray(collection.prerequisites)).toBe(true);
        expect((collection.prerequisites as string[]).length).toBeGreaterThan(0);
      });
    });

    it("prerequisites should have meaningful content", () => {
      COLLECTIONS_LIST.forEach((collection) => {
        (collection.prerequisites as string[]).forEach((prereq) => {
          expect(typeof prereq).toBe("string");
          expect(prereq.length).toBeGreaterThan(5);
        });
      });
    });
  });
});
