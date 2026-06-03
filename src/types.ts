import type { CategoryMeta } from "./data/categories";
import type { CollectionMeta } from "./data/collections";

export interface BrowserSupport {
  ch: number;
  ff: number;
  sf: number;
  ed: number;
}

export interface CSSValue {
  value: string;
  label: string;
  description: string;
  demo?: string;
}

// Short keys - used for runtime (backward compatible)
export interface CSSProperty {
  n: string;
  c: string;
  d: string;
  s: BrowserSupport;
  i: InteropStatus;
  x: string;
  m: string;
  demo: string;
  v?: CSSValue[];
  caniuse?: string;
  default?: string;
}

// Full keys - used in data files (more readable)
export interface CSSPropertyFull {
  name: string;
  category: string;
  description: string;
  support: BrowserSupport;
  interop: InteropStatus;
  example: string;
  mdnPath: string;
  demo: string;
  values?: CSSValue[];
  caniuse?: string;
  default?: string;
}

export type InteropStatus = "wide" | "b2024" | "b2023" | "b2022" | "ltd" | "exp";

declare global {
  interface Window {
    // Data exports
    P: CSSProperty[];
    CATS: string[];
    INTEROPS: InteropStatus[];
    CC: Record<string, string>;
    IL: Record<string, string>;
    IC: Record<string, string>;

    // Utilities
    bIcon: (val: number, lbl: string) => string;
    toggleInArray: (arr: readonly string[], item: string) => string[];
    renderBrowserSupport: (s: BrowserSupport) => string;

    // Data access
    CATEGORIES: Record<string, CategoryMeta>;
    COLLECTIONS: Record<string, CollectionMeta>;
    COLLECTIONS_LIST: CollectionMeta[];
    filtered: (
      q: string,
      activeCats: string[],
      activeInterops: string[],
      activeBrowsers?: string[],
    ) => CSSProperty[];
    getProp: (name: string) => CSSProperty | undefined;

    // Rendering
    renderDetail: (selectedProp: string) => void;
    renderCollectionPage: (collectionSlug: string) => void;
    renderGrid: (items: CSSProperty[], selectedProp: string) => void;

    // List table
    initListTable: (data: CSSProperty[]) => void;
    loadMoreTableRows: () => void;
    tableRowCount: () => number;
    tableTotalCount: () => number;

    // Utilities
    findRelatedProps: (currentProp: CSSProperty, count?: number) => CSSProperty[];
    getCategoryProps: (categoryId: string) => CSSProperty[];

    // Framework
    Datastar?: { connect: () => void };
    List?: new (container: string, options: any) => any;
  }
}
