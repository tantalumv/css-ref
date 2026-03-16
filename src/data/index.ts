import type { CSSProperty, CSSPropertyFull, InteropStatus } from "../types";
import type { CategoryMeta } from "./categories";
import type { CollectionMeta } from "./collections";
import { layout } from "./layout";
import { flexbox } from "./flexbox";
import { grid } from "./grid";
import { typography } from "./typography";
import { color } from "./color";
import { sizing } from "./sizing";
import { visual } from "./visual";
import { animation } from "./animation";
import { transform } from "./transform";
import { spacing } from "./spacing";
import { interactivity } from "./interactivity";
import { cssVariables } from "./css-variables";
import { queries } from "./queries";
import { selectors } from "./selectors";
import { uiComponents } from "./ui-components";
import { tables } from "./tables";
import { lists } from "./lists";
import { misc } from "./misc";
import { breaks } from "./breaks";
import { spacingSides } from "./spacing-sides";
import { transform3d } from "./transform-3d";
import { visualBorders } from "./visual-borders";
import { typographyExtra } from "./typography-extra";
import { tablesExtra } from "./tables-extra";
import { interactivityExtra } from "./interactivity-extra";
import { CATEGORIES } from "./categories";
import { COLLECTIONS, COLLECTIONS_LIST } from "./collections";

// Convert full keys to short keys for backward compatibility
function toShortKeys(prop: CSSPropertyFull): CSSProperty {
  return {
    n: prop.name,
    c: prop.category,
    d: prop.description,
    s: prop.support,
    i: prop.interop,
    x: prop.example,
    m: prop.mdnPath,
    demo: prop.demo,
    v: prop.values,
    caniuse: prop.caniuse,
    default: prop.default,
  };
}

// CSS_PROPERTIES - renamed from P to avoid minification conflicts
// Apply toShortKeys conversion to convert full keys to short keys
export const CSS_PROPERTIES: CSSProperty[] = [
  ...layout.map(toShortKeys),
  ...flexbox.map(toShortKeys),
  ...grid.map(toShortKeys),
  ...typography.map(toShortKeys),
  ...color.map(toShortKeys),
  ...sizing.map(toShortKeys),
  ...visual.map(toShortKeys),
  ...animation.map(toShortKeys),
  ...transform.map(toShortKeys),
  ...spacing.map(toShortKeys),
  ...interactivity.map(toShortKeys),
  ...cssVariables.map(toShortKeys),
  ...queries.map(toShortKeys),
  ...selectors.map(toShortKeys),
  ...uiComponents.map(toShortKeys),
  ...tables.map(toShortKeys),
  ...lists.map(toShortKeys),
  ...misc.map(toShortKeys),
  ...breaks.map(toShortKeys),
  ...spacingSides.map(toShortKeys),
  ...transform3d.map(toShortKeys),
  ...visualBorders.map(toShortKeys),
  ...typographyExtra.map(toShortKeys),
  ...tablesExtra.map(toShortKeys),
  ...interactivityExtra.map(toShortKeys),
];

// Backwards-compatible alias for tests
export const P = CSS_PROPERTIES;

export const CATS = [...new Set(CSS_PROPERTIES.map((p) => p.c))];
export const INTEROPS: InteropStatus[] = ["wide", "b2024", "b2023", "b2022", "ltd", "exp"];
export { CATEGORIES, type CategoryMeta } from "./categories";
export { COLLECTIONS, COLLECTIONS_LIST, type CollectionMeta } from "./collections";
