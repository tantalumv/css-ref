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
  (window as any).copyDemoCSS = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
  };
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
  console.log('Rendering collection:', collectionSlug);
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

(window as any).flexboxCSS = (direction: string, gap: number, justify: string, align: string, wrap: string) =>
  `.container {\n  display: flex;\n  flex-direction: ${direction};\n  justify-content: ${justify};\n  align-items: ${align};\n  flex-wrap: ${wrap};\n  gap: ${gap}px;\n}`;

(window as any).typographyCSS = (family: string, size: string, lh: string, ls: string, weight: string, align: string) =>
  `.element {\n  font-family: ${family};\n  font-size: ${size};\n  line-height: ${lh};\n  letter-spacing: ${ls};\n  font-weight: ${weight};\n  text-align: ${align};\n}`;

(window as any).transitionsCSS = (prop: string, dur: string, timing: string) =>
  `.element {\n  transition: ${prop} ${dur}s ${timing};\n}\n\n.element:hover {\n  transform: scale(1.15) rotate(8deg);\n}`;

(window as any).colorCSS = (bg: string, text: string, border: string, opacity: number) =>
  `.card {\n  background-color: ${bg};\n  color: ${text};\n  border-color: ${border};\n  opacity: ${opacity};\n}`;

(window as any).gridCSS = (layout: string, gap: number) => {
  const presets: Record<string, string> = {
    classic: `  grid-template-columns: 200px 1fr;\n  grid-template-rows: 50px 1fr 50px;\n  grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";`,
    hero: `  grid-template-columns: 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas:\n    "header"\n    "main"\n    "footer";`,
    dashboard: `  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: 1fr 1fr;\n  grid-template-areas:\n    "sidebar header header"\n    "sidebar main main";`,
    gallery: `  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  grid-template-rows: repeat(2, 150px);\n  grid-template-areas:\n    "item1 item2"\n    "item3 item4";`,
  };
  return `.container {\n  display: grid;\n${presets[layout] || presets.classic}\n  gap: ${gap}px;\n}`;
};

(window as any).layoutCSS = (pos: string, top: number, left: number) => {
  if (pos === 'static') {
    return `.element {\n  position: static;\n}`;
  }
  return `.element {\n  position: ${pos};\n  top: ${top}px;\n  left: ${left}px;\n}`;
};

(window as any).boxModelCSS = (margin: number, padding: number, border: number) =>
  `.element {\n  margin: ${margin}px;\n  padding: ${padding}px;\n  border: ${border}px solid #333;\n  box-sizing: border-box;\n}`;

(window as any).animationCSS = (name: string, duration: string, timing: string, iterations: string) =>
  `@keyframes ${name} { /* ... */ }\n\n.element {\n  animation-name: ${name};\n  animation-duration: ${duration};\n  animation-timing-function: ${timing};\n  animation-iteration-count: ${iterations};\n}`;

(window as any).backgroundsCSS = (mode: string, size: string, position: string, repeat: string) =>
  `.element {\n  background: ${(window as any).bgValue(mode)};\n  background-size: ${size};\n  background-position: ${position};\n  background-repeat: ${repeat};\n}`;

(window as any).bgValue = (mode: string) => {
  const map: Record<string, string> = {
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    solid: '#1e3a5f',
    image: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(/images/demo-bg.webp)',
    pattern: 'repeating-linear-gradient(45deg, #22c55e 0px, #22c55e 10px, #16a34a 10px, #16a34a 20px)',
  };
  return map[mode] ?? map.gradient;
};

// Re-export types
export type { CSSProperty, InteropStatus, BrowserSupport } from "./types";

// Global mousemove listener for Interactivity meta-theme (optimized to avoid forced reflow)
if (typeof window !== "undefined") {
  let lastMouseMove = 0;
  const MOUSE_MOVE_THROTTLE = 50;
  let cachedRect = { left: 0, top: 0, width: 0, height: 0 };

  const throttledMouseMove = (e: MouseEvent) => {
    const now = Date.now();
    if (now - lastMouseMove < MOUSE_MOVE_THROTTLE) return;
    lastMouseMove = now;

    const target = e.target as HTMLElement;
    const parent = target.closest(".layout-interactivity, .layout-layout") as HTMLElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    if (rect.width === cachedRect.width && rect.height === cachedRect.height) {
      const x = ((e.clientX - cachedRect.left) / cachedRect.width) * 100;
      const y = ((e.clientY - cachedRect.top) / cachedRect.height) * 100;
      parent.style.setProperty("--mouse-x", x + "%");
      parent.style.setProperty("--mouse-y", y + "%");
    } else {
      cachedRect = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      parent.style.setProperty("--mouse-x", x + "%");
      parent.style.setProperty("--mouse-y", y + "%");
    }
  };

  document.addEventListener("mousemove", throttledMouseMove, { passive: true });
}

// Handle initial hash on module load (after all functions are defined)
if (typeof window !== "undefined" && location.hash && location.hash !== "#") {
  // Use setTimeout to ensure DOM is fully ready and Datastar has initialized
  setTimeout(handleHashChange, 50);
}
