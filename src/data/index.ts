import type { CSSProperty, InteropStatus } from "../types";
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

export const P: CSSProperty[] = [
  ...layout,
  ...flexbox,
  ...grid,
  ...typography,
  ...color,
  ...sizing,
  ...visual,
  ...animation,
  ...transform,
  ...spacing,
  ...interactivity,
  ...cssVariables,
  ...queries,
  ...selectors,
  ...uiComponents,
  ...tables,
  ...lists,
  ...misc,
  ...breaks,
  ...spacingSides,
  ...transform3d,
  ...visualBorders,
  ...typographyExtra,
  ...tablesExtra,
  ...interactivityExtra,
];

export const CATS = [...new Set(P.map((p) => p.c))];
export const INTEROPS: InteropStatus[] = ["wide", "b2024", "b2023", "b2022", "ltd", "exp"];
