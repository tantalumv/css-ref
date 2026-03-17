import { CSS_PROPERTIES, COLLECTIONS } from "./src/data";

console.log("CSS_PROPERTIES count:", CSS_PROPERTIES.length);
console.log("COLLECTIONS count:", Object.keys(COLLECTIONS).length);
console.log("COLLECTIONS slugs:", Object.values(COLLECTIONS).map(c => c.slug));

const grid = Object.values(COLLECTIONS).find(c => c.slug === "grid");
console.log("Grid collection found:", !!grid);
if (grid) {
  console.log("Grid id:", grid.id);
  const gridProps = CSS_PROPERTIES.filter(p => p.c === grid.id);
  console.log("Grid properties count:", gridProps.length);
}
