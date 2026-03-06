import type { CSSProperty } from "./types";
import { P } from "./data";
import { activeCats, activeInterops, q } from "./state";

export function filtered(): CSSProperty[] {
  return P.filter(
    (p) =>
      (!activeCats.size || activeCats.has(p.c)) &&
      (!activeInterops.size || activeInterops.has(p.i)) &&
      (!q ||
        p.n.toLowerCase().includes(q) ||
        p.d.toLowerCase().includes(q) ||
        p.c.toLowerCase().includes(q)),
  );
}

export function hasFilters(): boolean {
  return activeCats.size > 0 || activeInterops.size > 0;
}
