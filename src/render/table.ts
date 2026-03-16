import { IL, INTEROP_SORT_RANK, TABLE_CONFIG, TIMEOUTS } from "../constants";
import { bIcon } from "../lib/browser-icons";
import { sortProperties } from "../lib/filters";
import type { CSSProperty } from "../types";
import type { SortField, SortOrder } from "../lib/filters";

const TABLE_BATCH_SIZE = TABLE_CONFIG.BATCH_SIZE;

// Table state
let listInstance: any = null;
let tableFullData: CSSProperty[] = [];
let tableDisplayedCount: number = 0;
let tableInitTimeout: number | null = null;
let isLoadingMore = false;
let currentSortField: SortField | null = null;
let currentSortOrder: SortOrder = "asc";

const SORTABLE_FIELDS = new Set<SortField>(["prop-name", "prop-category", "prop-support-sort"]);

/**
 * Generate HTML for a table row
 */
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

/**
 * Update sort indicator classes on table headers
 */
function updateSortIndicators(table: Element): void {
  const headers = table.querySelectorAll("th.sort[data-sort]");
  headers.forEach((header) => {
    header.classList.remove("asc", "desc");
    const field = (header as HTMLElement).dataset.sort as SortField | undefined;
    if (field && field === currentSortField) {
      header.classList.add(currentSortOrder);
    }
  });
}

/**
 * Sort full table data in place
 */
function sortFullTableData(): void {
  if (!currentSortField) return;
  tableFullData = sortProperties(tableFullData, currentSortField, currentSortOrder);
}

/**
 * Apply current sort to visible table rows
 */
function applyCurrentSort(table: Element, onRowClick?: (prop: CSSProperty) => void): void {
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
      attachRowClickListeners(tbody, tableFullData, onRowClick);
      if (listInstance && typeof listInstance.reindex === "function") {
        listInstance.reindex();
      }
      updateSentinelVisibility();
    }
  }

  updateSortIndicators(table);
}

/**
 * Attach sort handlers to table headers
 */
function attachSortHandlers(table: Element): void {
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

/**
 * Attach click listeners to table rows
 */
function attachRowClickListeners(
  tbody: Element,
  data: CSSProperty[],
  onRowClick?: (prop: CSSProperty) => void,
): void {
  // Use event delegation for more reliable click handling
  if ((tbody as any)._hasRowClickListener) return;
  (tbody as any)._hasRowClickListener = true;

  tbody.addEventListener("click", (evt: Event) => {
    const target = evt.target as HTMLElement;
    const row = target.closest(".table-row") as HTMLElement;
    if (!row || !row.parentElement) return;

    const idx = parseInt(row.dataset?.idx || "0");
    if (data[idx]) {
      if (onRowClick) {
        onRowClick(data[idx]);
      } else {
        const propName = data[idx].n;
        const propHash = encodeURIComponent(propName);
        location.hash = propHash;
      }
    }
  });

  tbody.querySelectorAll(".table-row").forEach((row: Element) => {
    (row as HTMLElement).style.cursor = "pointer";
  });
}

/**
 * Update sentinel visibility based on current state
 */
function updateSentinelVisibility(): void {
  const sentinel = document.getElementById("table-sentinel");
  if (sentinel) {
    const shouldShow = tableDisplayedCount < tableFullData.length;
    sentinel.style.display = shouldShow ? "block" : "none";
  }
}

/**
 * Initialize or reinitialize the table when filtered data changes
 */
export function initListTable(
  data: CSSProperty[],
  onRowClick?: (prop: CSSProperty) => void,
): void {
  const table = document.querySelector("#table-container");
  if (!table) return;

  tableFullData = [...data];
  tableDisplayedCount = 0;

  if (tableInitTimeout) {
    clearTimeout(tableInitTimeout);
    tableInitTimeout = null;
  }

  isLoadingMore = false;

  if (listInstance) {
    listInstance.destroy?.();
    listInstance = null;
  }

  const tbody = table.querySelector(".list");
  if (!tbody) return;

  if (currentSortField) {
    sortFullTableData();
  }

  const initialData = tableFullData.slice(0, TABLE_BATCH_SIZE);
  tableDisplayedCount = initialData.length;

  const html = initialData.length > 0
    ? initialData.map((p, idx) => renderRowHTML(p, idx)).join("")
    : '<tr><td colspan="4" style="text-align:center;padding:2rem;color:#666;">No properties found</td></tr>';
  tbody.innerHTML = html;

  // Initialize List.js for sorting (only if we have data)
  if (initialData.length > 0) {
    const options = {
      valueNames: ["prop-name", "prop-category", "prop-support-sort", { data: ["idx"] }],
      listClass: "list",
      // Disable List.js default click binding; we manage bidirectional sort explicitly.
      sortClass: "sort-disabled",
    };

    listInstance = new (window as any).List("table-container", options);
    attachSortHandlers(table);
    applyCurrentSort(table, onRowClick);

    const listElement = table.querySelector(".list");
    if (listElement) {
      attachRowClickListeners(listElement, tableFullData, onRowClick);
    }
  }

  updateSentinelVisibility();

  // Trigger initial load if sentinel is already visible (for large viewports)
  tableInitTimeout = window.setTimeout(() => {
    const sentinel = document.getElementById("table-sentinel");
    if (sentinel) {
      const rect = sentinel.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight + 400;
      if (inViewport && tableDisplayedCount < tableFullData.length) {
        loadMoreTableRows();
      }
    }
    tableInitTimeout = null;
  }, TIMEOUTS.TABLE_INIT);
}

/**
 * Load more table rows for infinite scroll
 */
export function loadMoreTableRows(): void {
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

  let startIdx = tableDisplayedCount;
  tableDisplayedCount += nextBatch.length;

  nextBatch.forEach((p) => {
    const rowHTML = renderRowHTML(p, startIdx++);
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
  }, TIMEOUTS.LOAD_UNLOCK);
}

/**
 * Get current table row count
 */
export function getTableDisplayedCount(): number {
  return tableDisplayedCount;
}

/**
 * Get total table data count
 */
export function getTableTotalCount(): number {
  return tableFullData.length;
}

/**
 * Destroy table instance and clean up
 */
export function destroyTable(): void {
  if (listInstance) {
    listInstance.destroy?.();
    listInstance = null;
  }
  tableFullData = [];
  tableDisplayedCount = 0;
  currentSortField = null;
  currentSortOrder = "asc";
  if (tableInitTimeout) {
    clearTimeout(tableInitTimeout);
    tableInitTimeout = null;
  }
}
