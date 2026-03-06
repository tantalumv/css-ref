// CSS Ref - Pure Datastar Implementation
// All rendering logic flows from HTML via data-* attributes
// This file only exposes data and utility functions on window

import { CC, IL, IC } from "./constants";
import { P, CATS, INTEROPS } from "./data";
import { bIcon } from "./utils";
import type { CSSProperty, BrowserSupport } from "./types";

// ── Expose static data on window ──
(window as any).P = P;
(window as any).CATS = CATS;
(window as any).INTEROPS = INTEROPS;
(window as any).CC = CC;
(window as any).IL = IL;
(window as any).IC = IC;
(window as any).bIcon = bIcon;

// ── Filter logic ──
(window as any).filtered = function (
  q: string,
  activeCats: string[],
  activeInterops: string[],
  activeBrowsers: string[] = [],
): CSSProperty[] {
  const query = q.toLowerCase();
  return P.filter(
    (p) =>
      (!activeCats.length || activeCats.includes(p.c)) &&
      (!activeInterops.length || activeInterops.includes(p.i)) &&
      (!activeBrowsers.length ||
        activeBrowsers.every((b) => p.s[b as keyof BrowserSupport] === 1)) &&
      (!query ||
        p.n.toLowerCase().includes(query) ||
        p.d.toLowerCase().includes(query) ||
        p.c.toLowerCase().includes(query)),
  );
};

// ── Array helper ──
(window as any).toggleInArray = function (arr: string[], item: string): string[] {
  const idx = arr.indexOf(item);
  if (idx > -1) {
    const copy = [...arr];
    copy.splice(idx, 1);
    return copy;
  }
  return [...arr, item];
};

// ── Browser support renderer ──
(window as any).renderBrowserSupport = function (s: BrowserSupport): string {
  const bN: Record<string, string> = { ch: "Chrome", ff: "Firefox", sf: "Safari", ed: "Edge" };
  const bS: Record<number | string, string> = { 1: "Supported", 0: "Not supported", p: "Partial" };

  return (["ch", "ff", "sf", "ed"] as const)
    .map((b) => {
      const v = s[b];
      const cls = v === 1 ? "y" : v === 0 ? "n" : "p";
      return `<div class="detail-b"><div class="detail-b-icon ${cls}">${bIcon(v, b)}</div><div class="detail-b-name">${bN[b]}</div><div class="detail-b-status ${cls}">${bS[v]}</div></div>`;
    })
    .join("");
};

// ── Property lookup by name ──
const propMap = new Map<string, CSSProperty>(P.map((p) => [p.n, p]));
(window as any).getProp = function (name: string): CSSProperty | undefined {
  return propMap.get(name);
};

// ── Detail Rendering ──
(window as any).renderDetail = function (selectedProp: string) {
  const view = document.getElementById("detail-view");
  if (!view) return;

  if (!selectedProp) {
    view.innerHTML = "";
    return;
  }

  const p = propMap.get(selectedProp);
  if (!p) {
    view.innerHTML = "";
    return;
  }

  const color = CC[p.c] || "#6366f1";
  view.innerHTML = `
    <div class="detail-wrap">
      <button class="back-btn" onclick="location.hash=''">
        <svg class="icon" aria-hidden="true"><use href="#icon-arrow-left"/></svg>
        All properties
      </button>
      <div class="detail-hero">
        <div class="detail-name" style="color:${color}">${p.n}</div>
        <div class="detail-badges">
          <span class="cat-badge" style="background:${color}">${p.c}</span>
          <span class="availability-badge ${p.i}">${IL[p.i]}</span>
        </div>
      </div>
      <div class="detail-demo-box">
        <div class="detail-demo-stage">${p.demo}</div>
        <div class="detail-demo-label">${p.x ? p.x.split("\n")[0] : ""}</div>
      </div>
      <div class="detail-section">
        <div class="detail-lbl">Description</div>
        <p class="detail-desc">${p.d}</p>
      </div>
      <div class="detail-section">
        <div class="detail-lbl">Syntax</div>
        <pre class="syntax-block">${p.x}<button class="copy-btn" onclick="navigator.clipboard.writeText('${p.x.replace(/'/g, "\\'")}').then(()=>{this.innerHTML='<i class=\\'ri-check-line\\'></i>';setTimeout(()=>this.innerHTML='<i class=\\'ri-clipboard-line\\'></i>',1500)})" style="position:absolute;top:8px;right:8px;padding:6px 10px;font-size:14px;background:${color};color:#fff;border:none;border-radius:4px;cursor:pointer"><i class="ri-clipboard-line"></i></button></pre>
      </div>
      <div class="detail-section">
        <div class="detail-lbl">Browser Support</div>
        <div class="detail-browsers">${(window as any).renderBrowserSupport(p.s)}</div>
      </div>
      <a class="mdn-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/${p.m}" target="_blank" rel="noopener">
        View on MDN →
      </a>
      ${(() => {
        const related = (window as any).findRelatedProps(p, 4);
        if (related.length === 0) return "";
        return `
      <div class="detail-section related-props">
        <div class="detail-lbl">Related Properties</div>
        <div class="related-grid">
          ${related
            .map(
              (r: CSSProperty) => `
            <div class="related-card" onclick="location.hash='${encodeURIComponent(r.n)}'" style="cursor:pointer;border:1px solid ${CC[r.c] || "#6366f1"};border-radius:6px;padding:10px;background:rgba(255,255,255,0.05)">
              <div style="font-size:13px;font-weight:700;color:${CC[r.c] || "#6366f1"};margin-bottom:4px">${r.n}</div>
              <div style="font-size:11px;color:#888;line-height:1.3">${r.d.slice(0, 60)}${r.d.length > 60 ? "..." : ""}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>`;
      })()}
    </div>
  `;
};

// ── Grid Rendering ──
(window as any).renderGrid = function (items: CSSProperty[], selectedProp: string) {
  const grid = document.getElementById("grid");
  if (!grid) return;

  if (selectedProp) {
    grid.innerHTML = "";
    return;
  }

  grid.innerHTML = "";

  if (!items.length) {
    grid.innerHTML = '<div class="empty">No properties match</div>';
    return;
  }

  items.forEach((p: CSSProperty, i: number) => {
    const color = CC[p.c] || "#6366f1";
    const el = document.createElement("div");
    const delay = Math.min(i * 15, 250);

    el.style.setProperty("--ca", color);
    el.style.setProperty("--delay", `${delay}ms`);
    el.className = "card enter-fade";
    el.innerHTML = `
      <div class="demo-stage" style="position:relative;overflow:visible">
        <div style="width:100%;height:100%;overflow:hidden">${p.demo}</div>
        <span class="cat-badge">${p.c}</span>
      </div>
      <div class="card-bottom">
        <div class="card-meta">
          <div class="card-name-wrap">
            <h2 class="card-name" data-name="${p.n}">
              <span class="name-text">${p.n}</span>
              <span class="name-text" aria-hidden="true">${p.n}</span>
            </h2>
          </div>
        </div>
        <div class="card-support">
          <div class="browser-badges">${(["ch", "ff", "sf", "ed"] as const).map((b) => bIcon(p.s[b], b)).join("")}</div>
          <span class="availability-badge ${p.i}">${IL[p.i]}</span>
        </div>
      </div>
    `;

    el.addEventListener("click", () => {
      location.hash = encodeURIComponent(p.n);
    });

    grid.appendChild(el);
  });

  requestAnimationFrame(() => {
    grid.querySelectorAll(".card-name").forEach((nameEl) => {
      const textEl = nameEl.querySelector(".name-text");
      if (textEl && textEl.scrollWidth > (nameEl as HTMLElement).clientWidth) {
        nameEl.classList.add("overflows");
      }
    });
  });
};

const TABLE_BATCH_SIZE = 30;

let listInstance: any = null;
let tableFullData: CSSProperty[] = [];
let tableDisplayedCount: number = 0;
let tableInitTimeout: number | null = null;
let isLoadingMore = false;
type SortField = "prop-name" | "prop-category" | "prop-support-sort";
type SortOrder = "asc" | "desc";
let currentSortField: SortField | null = null;
let currentSortOrder: SortOrder = "asc";
const SORTABLE_FIELDS = new Set<SortField>(["prop-name", "prop-category", "prop-support-sort"]);
const INTEROP_SORT_RANK: Record<CSSProperty["i"], number> = {
  wide: 1,
  b2024: 2,
  b2023: 3,
  b2022: 4,
  ltd: 5,
  exp: 6,
};

function updateSortIndicators(table: Element) {
  const headers = table.querySelectorAll("th.sort[data-sort]");
  headers.forEach((header) => {
    header.classList.remove("asc", "desc");
    const field = (header as HTMLElement).dataset.sort as SortField | undefined;
    if (field && field === currentSortField) {
      header.classList.add(currentSortOrder);
    }
  });
}

function compareBySortField(a: CSSProperty, b: CSSProperty, field: SortField): number {
  if (field === "prop-name") {
    return a.n.localeCompare(b.n, undefined, { sensitivity: "base" });
  }

  if (field === "prop-category") {
    return a.c.localeCompare(b.c, undefined, { sensitivity: "base" });
  }

  const rankDiff = INTEROP_SORT_RANK[a.i] - INTEROP_SORT_RANK[b.i];
  if (rankDiff !== 0) return rankDiff;
  return IL[a.i].localeCompare(IL[b.i], undefined, { sensitivity: "base" });
}

function sortFullTableData() {
  if (!currentSortField) return;

  tableFullData.sort((a, b) => {
    const result = compareBySortField(a, b, currentSortField as SortField);
    return currentSortOrder === "asc" ? result : -result;
  });
}

function applyCurrentSort(table: Element) {
  if (currentSortField) {
    const currentlyVisibleCount = Math.min(tableDisplayedCount, tableFullData.length);
    sortFullTableData();
    const tbody = table.querySelector(".list");
    if (tbody) {
      const html = tableFullData
        .slice(0, currentlyVisibleCount)
        .map((p, idx) => renderRowHTML(p, idx))
        .join("");
      tbody.innerHTML = html;
      tableDisplayedCount = currentlyVisibleCount;
      attachRowClickListeners(tbody, tableFullData);
      if (listInstance && typeof listInstance.reindex === "function") {
        listInstance.reindex();
      }
      updateSentinelVisibility();
    }
  }

  updateSortIndicators(table);
}

function attachSortHandlers(table: Element) {
  const headers = table.querySelectorAll("th.sort[data-sort]");
  headers.forEach((header) => {
    const el = header as HTMLElement;
    if (el.dataset.sortBound === "true") return;
    el.dataset.sortBound = "true";

    el.addEventListener("click", (evt) => {
      evt.preventDefault();
      const field = el.dataset.sort as SortField | undefined;
      if (!field || !SORTABLE_FIELDS.has(field)) return;

      if (currentSortField === field) {
        currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
      } else {
        currentSortField = field;
        currentSortOrder = "asc";
      }

      applyCurrentSort(table);
    });
  });
}

// Generate HTML for a table row
function renderRowHTML(p: CSSProperty, idx: number): string {
  const supportIcons =
    bIcon(p.s.ch, "ch") + bIcon(p.s.ff, "ff") + bIcon(p.s.sf, "sf") + bIcon(p.s.ed, "ed");
  const supportSortKey = `${String(INTEROP_SORT_RANK[p.i]).padStart(2, "0")}-${IL[p.i]}`;
  return `
    <tr class="table-row" data-idx="${idx}">
      <td class="prop-name">${p.n}</td>
      <td class="prop-category">${p.c}</td>
      <td class="prop-preview">
        <div class="preview-box">
          ${p.demo}
          <div class="preview-desc">${p.d}</div>
        </div>
      </td>
      <td class="prop-support">
        <span class="prop-support-sort">${supportSortKey}</span>
        <div class="support-icons">${supportIcons}</div>
        <span class="support-label">${IL[p.i]}</span>
      </td>
    </tr>
  `;
}

function attachRowClickListeners(tbody: Element, data: CSSProperty[]) {
  tbody.querySelectorAll(".table-row").forEach((row: Element) => {
    if (!row.hasAttribute("data-listener")) {
      row.setAttribute("data-listener", "true");
      const idx = parseInt((row as HTMLElement).dataset?.idx || "0");
      row.addEventListener("click", () => {
        if (data[idx]) {
          location.hash = encodeURIComponent(data[idx].n);
        }
      });
      (row as HTMLElement).style.cursor = "pointer";
    }
  });
}

// Initialize or reinitialize the table when filtered data changes
(window as any).initListTable = function (data: CSSProperty[]) {
  const table = document.querySelector("#table-container");
  if (!table) return;

  // Always update tracking variables
  tableFullData = [...data];
  tableDisplayedCount = 0;

  // Clear any pending initialization timeout
  if (tableInitTimeout) {
    clearTimeout(tableInitTimeout);
    tableInitTimeout = null;
  }

  // Reset loading lock
  isLoadingMore = false;

  // Destroy existing List.js instance
  if (listInstance) {
    listInstance.destroy?.();
    listInstance = null;
  }

  // Get tbody and render initial batch
  const tbody = table.querySelector(".list");
  if (!tbody) return;

  if (currentSortField) {
    sortFullTableData();
  }

  const initialData = tableFullData.slice(0, TABLE_BATCH_SIZE);
  tableDisplayedCount = initialData.length;

  const html = initialData.map((p, idx) => renderRowHTML(p, idx)).join("");
  tbody.innerHTML = html;

  // Initialize List.js for sorting
  const options = {
    valueNames: ["prop-name", "prop-category", "prop-support-sort", { data: ["idx"] }],
    listClass: "list",
    // Disable List.js default click binding; we manage bidirectional sort explicitly.
    sortClass: "sort-disabled",
  };

  listInstance = new (window as any).List("table-container", options);
  attachSortHandlers(table);
  applyCurrentSort(table);

  // Add click listeners
  attachRowClickListeners(tbody, tableFullData);

  // Update sentinel visibility after initialization
  updateSentinelVisibility();

  // Trigger initial load if sentinel is already visible (for large viewports)
  tableInitTimeout = window.setTimeout(() => {
    const sentinel = document.getElementById("table-sentinel");
    if (sentinel) {
      const rect = sentinel.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight + 400;
      if (inViewport && tableDisplayedCount < tableFullData.length) {
        (window as any).loadMoreTableRows();
      }
    }
    tableInitTimeout = null;
  }, 500);
};

// ── Infinite Scroll ──
// Helper to update sentinel visibility based on current state
function updateSentinelVisibility() {
  const sentinel = document.getElementById("table-sentinel");
  if (sentinel) {
    const shouldShow = tableDisplayedCount < tableFullData.length;
    sentinel.style.display = shouldShow ? "block" : "none";
  }
}

(window as any).tableRowCount = function (): number {
  return tableDisplayedCount;
};

(window as any).tableTotalCount = function (): number {
  return tableFullData.length;
};

(window as any).loadMoreTableRows = function () {
  // Prevent concurrent execution
  if (isLoadingMore) return;
  isLoadingMore = true;

  if (tableDisplayedCount >= tableFullData.length) {
    isLoadingMore = false;
    return;
  }

  const tbody = document.querySelector("#table-container .list");
  if (!tbody) {
    isLoadingMore = false;
    return;
  }

  // Count actual rows in DOM to sync state (in case of race conditions)
  const actualRowCount = tbody.querySelectorAll(".table-row").length;
  if (actualRowCount !== tableDisplayedCount) {
    // Sync state with actual DOM
    tableDisplayedCount = actualRowCount;
  }

  if (tableDisplayedCount >= tableFullData.length) {
    isLoadingMore = false;
    return;
  }

  const nextBatch = tableFullData.slice(
    tableDisplayedCount,
    tableDisplayedCount + TABLE_BATCH_SIZE,
  );
  if (nextBatch.length === 0) {
    isLoadingMore = false;
    return;
  }

  const startIdx = tableDisplayedCount;
  tableDisplayedCount += nextBatch.length;

  // Add new rows to the table
  nextBatch.forEach((p, i) => {
    const rowHTML = renderRowHTML(p, startIdx + i);
    tbody.insertAdjacentHTML("beforeend", rowHTML);
  });

  // Reindex List.js to pick up new rows (if method exists)
  if (listInstance && typeof listInstance.reindex === "function") {
    listInstance.reindex();
    const table = document.querySelector("#table-container");
    if (table) {
      applyCurrentSort(table);
    }
  }

  // Add click listeners to new rows
  attachRowClickListeners(tbody, tableFullData);

  // Update sentinel visibility
  updateSentinelVisibility();

  // Release lock after a short delay
  setTimeout(() => {
    isLoadingMore = false;
  }, 50);
};

// ── Related Properties ──
(window as any).findRelatedProps = function (
  currentProp: CSSProperty,
  count: number = 4,
): CSSProperty[] {
  // Find related props by category, excluding current prop
  const sameCategory = P.filter((p) => p.c === currentProp.c && p.n !== currentProp.n);

  // Sort by name similarity (common prefix)
  const prefix = currentProp.n.split("-")[0];
  const withPrefix = sameCategory.filter((p) => p.n.startsWith(prefix));
  const withoutPrefix = sameCategory.filter((p) => !p.n.startsWith(prefix));

  // Combine: prefix matches first, then others from same category
  const related = [...withPrefix, ...withoutPrefix].slice(0, count);

  // If not enough in same category, add from other categories
  if (related.length < count) {
    const others = P.filter((p) => p.c !== currentProp.c && p.n !== currentProp.n).slice(
      0,
      count - related.length,
    );
    related.push(...others);
  }

  return related;
};

// Re-export types
export type { CSSProperty, InteropStatus, BrowserSupport } from "./types";
