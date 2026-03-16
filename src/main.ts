import { CC, IL, IC } from "./constants";
import { CSS_PROPERTIES, CATS, INTEROPS, CATEGORIES, COLLECTIONS, COLLECTIONS_LIST } from "./data";
import { bIcon, renderBrowserSupport } from "./lib/browser-icons";
import { filterProperties, toggleInArray, findRelatedProps } from "./lib/filters";
import { fuzzySearchProperties } from "./lib/search";
import { showDetailView, createPropertyMap } from "./render/detail";
import { showCollectionView } from "./render/collection";
import { renderGrid } from "./render/grid";
import { initListTable, loadMoreTableRows, getTableDisplayedCount, getTableTotalCount } from "./render/table";
import type { CSSProperty, BrowserSupport } from "./types";
import type { CollectionMeta } from "./data/collections";

// Create property map for fast lookup
const propMap = createPropertyMap(CSS_PROPERTIES);

function handleHashChange(): void {
  const hash = location.hash.slice(1);
  
  window.dispatchEvent(new CustomEvent("app:hashchange", { detail: { hash } }));
}

// Listen for hashchange events
if (typeof window !== "undefined") {
  window.addEventListener("hashchange", handleHashChange);
  // Also handle initial hash on page load
  window.addEventListener("load", () => {
    if (location.hash) {
      handleHashChange();
    }
  });
}

function closeAllPopovers(): void {
  window.dispatchEvent(new CustomEvent("close-all-popovers"));
}

// Export to window for Datastar to call
if (typeof window !== "undefined") {
  (window as any).closeAllPopovers = closeAllPopovers;
}

(window as any).CSS_PROPERTIES = CSS_PROPERTIES;
(window as any).P = CSS_PROPERTIES; // Alias for backwards compatibility with tests
(window as any).CATS = CATS;
(window as any).INTEROPS = INTEROPS;
(window as any).CC = CC;
(window as any).IL = IL;
(window as any).IC = IC;
(window as any).bIcon = bIcon;
(window as any).CATEGORIES = CATEGORIES;
(window as any).COLLECTIONS = COLLECTIONS;
(window as any).COLLECTIONS_LIST = COLLECTIONS_LIST;

(window as any).filtered = function (
  q: string,
  activeCats: string[],
  activeInterops: string[],
  activeBrowsers: string[] = [],
): CSSProperty[] {
  return filterProperties(CSS_PROPERTIES, q, activeCats, activeInterops, activeBrowsers);
};

(window as any).fuzzySearch = function (query: string): CSSProperty[] {
  return fuzzySearchProperties(CSS_PROPERTIES, query);
};

(window as any).toggleInArray = toggleInArray;

(window as any).renderBrowserSupport = renderBrowserSupport;

(window as any).getProp = function (name: string): CSSProperty | undefined {
  return propMap.get(name);
};

(window as any).renderDetail = function (selectedProp: string): void {
  showDetailView(selectedProp, propMap, CSS_PROPERTIES);
};

(window as any).renderCollectionPage = function (collectionSlug: string): void {
  showCollectionView(collectionSlug, CSS_PROPERTIES, COLLECTIONS as Record<string, CollectionMeta>);
};

// Get properties for a specific category
(window as any).getCategoryProps = function (categoryId: string): CSSProperty[] {
  return CSS_PROPERTIES.filter((p) => p.c === categoryId);
};

(window as any).renderGrid = function (items: CSSProperty[], selectedProp: string) {
  renderGrid(items, selectedProp, (p: CSSProperty) => {
    const propHash = encodeURIComponent(p.n);
    location.hash = propHash;
    // Show detail view directly - use setTimeout to let Datastar process first
    setTimeout(() => {
      showDetailView(p.n, propMap, CSS_PROPERTIES);
    }, 100);
  });
};

(window as any).initListTable = function (data: CSSProperty[]) {
  initListTable(data, (p: CSSProperty) => {
    const propHash = encodeURIComponent(p.n);
    location.hash = propHash;
    // Show detail view directly
    setTimeout(() => {
      showDetailView(p.n, propMap, CSS_PROPERTIES);
    }, 100);
  });
};

(window as any).tableRowCount = getTableDisplayedCount;
(window as any).tableTotalCount = getTableTotalCount;
(window as any).loadMoreTableRows = loadMoreTableRows;

(window as any).findRelatedProps = function (
  currentProp: CSSProperty,
  count: number = 4,
): CSSProperty[] {
  return findRelatedProps(currentProp, CSS_PROPERTIES, count);
};

// Re-export types
export type { CSSProperty, InteropStatus, BrowserSupport } from "./types";

// Handle initial hash on module load (after all functions are defined)
if (typeof window !== "undefined" && location.hash && location.hash !== "#") {
  // Use setTimeout to ensure DOM is fully ready and Datastar has initialized
  setTimeout(handleHashChange, 50);
}
