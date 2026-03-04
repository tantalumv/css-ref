import type { CSSProperty, InteropStatus } from '../types';
import { layout } from './layout';
import { flexbox } from './flexbox';
import { grid } from './grid';
import { typography } from './typography';
import { color } from './color';
import { sizing } from './sizing';
import { visual } from './visual';
import { animation } from './animation';
import { transform } from './transform';
import { spacing } from './spacing';
import { interactivity } from './interactivity';
import { cssVariables } from './css-variables';
import { queries } from './queries';
import { selectors } from './selectors';
import { uiComponents } from './ui-components';

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
];

export const CATS = [...new Set(P.map(p => p.c))];
export const INTEROPS: InteropStatus[] = ['wide', 'b2024', 'b2023', 'b2022', 'ltd', 'exp'];
