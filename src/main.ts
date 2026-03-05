// CSS Ref - Pure Datastar Implementation
// All rendering logic flows from HTML via data-* attributes
// This file only exposes data and utility functions on window

import { CC, IL, IC } from './constants';
import { P, CATS, INTEROPS } from './data';
import { bIcon } from './utils';
import type { CSSProperty, BrowserSupport } from './types';

// ── Expose static data on window ──
(window as any).P = P;
(window as any).CATS = CATS;
(window as any).INTEROPS = INTEROPS;
(window as any).CC = CC;
(window as any).IL = IL;
(window as any).IC = IC;
(window as any).bIcon = bIcon;

// ── Filter logic ──
(window as any).filtered = function (q: string, activeCats: string[], activeInterops: string[]): CSSProperty[] {
  const query = q.toLowerCase();
  return P.filter(p =>
    (!activeCats.length || activeCats.includes(p.c)) &&
    (!activeInterops.length || activeInterops.includes(p.i)) &&
    (!query || p.n.toLowerCase().includes(query) || p.d.toLowerCase().includes(query) || p.c.toLowerCase().includes(query))
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
  const bN: Record<string, string> = { ch: 'Chrome', ff: 'Firefox', sf: 'Safari', ed: 'Edge' };
  const bS: Record<number | string, string> = { 1: 'Supported', 0: 'Not supported', 'p': 'Partial' };

  return (['ch', 'ff', 'sf', 'ed'] as const).map(b => {
    const v = s[b];
    const cls = v === 1 ? 'y' : v === 0 ? 'n' : 'p';
    return `<div class="detail-b"><div class="detail-b-icon ${cls}">${bIcon(v, b)}</div><div class="detail-b-name">${bN[b]}</div><div class="detail-b-status ${cls}">${bS[v]}</div></div>`;
  }).join('');
};

// ── Grid Rendering ──
(window as any).renderGrid = function (items: CSSProperty[], selectedProp: CSSProperty | null) {
  const grid = document.getElementById('grid');
  if (!grid) return;

  if (selectedProp) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = '';

  if (!items.length) {
    grid.innerHTML = '<div class="empty">No properties match</div>';
    return;
  }

  items.forEach((p: CSSProperty, i: number) => {
    const color = CC[p.c] || '#6366f1';
    const el = document.createElement('div');
    const delay = Math.min(i * 15, 250);

    el.style.setProperty('--ca', color);
    el.style.setProperty('--delay', `${delay}ms`);
    el.className = 'card enter-fade';
    el.innerHTML = `
      <div class="demo-stage" style="position:relative;overflow:visible">
        <div style="width:100%;height:100%;overflow:hidden">${p.demo}</div>
        <span class="cat-badge" style="position:absolute;bottom:0;left:1em;transform:translateY(50%);z-index:10">${p.c}</span>
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
          <div class="browser-badges">${(['ch', 'ff', 'sf', 'ed'] as const).map(b => bIcon(p.s[b], b)).join('')}</div>
          <span class="availability-badge ${p.i}">${IL[p.i]}</span>
        </div>
      </div>
    `;

    (el as HTMLElement).onclick = () => {
      const body = document.body as any;
      // Try to set signal - use polling if needed
      const trySetSignal = () => {
        if (body._ds?.signals?.set) {
          body._ds.signals.set('selectedProp', p);
          return true;
        }
        return false;
      };
      if (!trySetSignal()) {
        // Retry a few times if not ready
        let attempts = 0;
        const interval = setInterval(() => {
          if (trySetSignal() || ++attempts > 10) {
            clearInterval(interval);
          }
        }, 50);
      }
    };

    grid.appendChild(el);
  });

  requestAnimationFrame(() => {
    grid.querySelectorAll('.card-name').forEach(nameEl => {
      const textEl = nameEl.querySelector('.name-text');
      if (textEl && textEl.scrollWidth > (nameEl as HTMLElement).clientWidth) {
        nameEl.classList.add('overflows');
      }
    });
  });
};

// ── Table View (List.js) ──
declare const List: any;

const TABLE_BATCH_SIZE = 30;

let listInstance: any = null;
let lastTableData: string = '';
let tableFullData: CSSProperty[] = [];
let tableDisplayedCount: number = 0;
let tableInitTimeout: number | null = null;
let isLoadingMore = false;

// Generate HTML for a table row
function renderRowHTML(p: CSSProperty, idx: number): string {
  const supportIcons = bIcon(p.s.ch, 'ch') + bIcon(p.s.ff, 'ff') + bIcon(p.s.sf, 'sf') + bIcon(p.s.ed, 'ed');
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
        <div class="support-icons">${supportIcons}</div>
        <span class="support-label">${IL[p.i]}</span>
      </td>
    </tr>
  `;
}

function attachRowClickListeners(tbody: Element, data: CSSProperty[]) {
  tbody.querySelectorAll('.table-row').forEach((row: Element) => {
    if (!row.hasAttribute('data-listener')) {
      row.setAttribute('data-listener', 'true');
      row.addEventListener('click', () => {
        const idx = parseInt((row as HTMLElement).dataset?.idx || '0');
        if (data[idx]) {
          const body = document.body as any;
          const trySetSignal = () => {
            if (body._ds?.signals?.set) {
              body._ds.signals.set('selectedProp', data[idx]);
              return true;
            }
            return false;
          };
          if (!trySetSignal()) {
            let attempts = 0;
            const interval = setInterval(() => {
              if (trySetSignal() || ++attempts > 10) {
                clearInterval(interval);
              }
            }, 50);
          }
        }
      });
      (row as HTMLElement).style.cursor = 'pointer';
    }
  });
}

// Initialize or reinitialize the table when filtered data changes
(window as any).initListTable = function (data: CSSProperty[]) {
  const tbody = document.querySelector('#table-container .list');
  if (!tbody) return;

  const dataKey = JSON.stringify(data.map(p => p.n));

  // Always update tracking variables
  tableFullData = data;
  lastTableData = dataKey;
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
    listInstance = null;
  }

  // Render initial batch
  const initialData = data.slice(0, TABLE_BATCH_SIZE);
  tableDisplayedCount = initialData.length;

  const html = initialData.map((p, idx) => renderRowHTML(p, idx)).join('');
  tbody.innerHTML = html;

  // Initialize List.js after DOM is populated so it can read the existing rows
  // We skip this for now since we're managing the table manually
  // and List.js can cause issues with dynamic row insertion
  listInstance = null;

  // Add click listeners
  attachRowClickListeners(tbody, tableFullData);

  // Update sentinel visibility after initialization
  updateSentinelVisibility();

  // Trigger initial load if sentinel is already visible (for large viewports)
  // Use a longer delay to avoid loading when user switches views
  tableInitTimeout = window.setTimeout(() => {
    const sentinel = document.getElementById('table-sentinel');
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
  const sentinel = document.getElementById('table-sentinel');
  if (sentinel) {
    const shouldShow = tableDisplayedCount < tableFullData.length;
    sentinel.style.display = shouldShow ? 'block' : 'none';
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

  const tbody = document.querySelector('#table-container .list');
  if (!tbody) {
    isLoadingMore = false;
    return;
  }

  // Count actual rows in DOM to sync state (in case of race conditions)
  const actualRowCount = tbody.querySelectorAll('.table-row').length;
  if (actualRowCount !== tableDisplayedCount) {
    // Sync state with actual DOM
    tableDisplayedCount = actualRowCount;
  }
  
  if (tableDisplayedCount >= tableFullData.length) {
    isLoadingMore = false;
    return;
  }

  const nextBatch = tableFullData.slice(tableDisplayedCount, tableDisplayedCount + TABLE_BATCH_SIZE);
  if (nextBatch.length === 0) {
    isLoadingMore = false;
    return;
  }

  const startIdx = tableDisplayedCount;
  tableDisplayedCount += nextBatch.length;

  // Add new rows to the table
  nextBatch.forEach((p, i) => {
    const rowHTML = renderRowHTML(p, startIdx + i);
    tbody.insertAdjacentHTML('beforeend', rowHTML);
  });



  // Reindex List.js to pick up new rows (if method exists)
  if (listInstance && typeof listInstance.reindex === 'function') {
    listInstance.reindex();
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



// Re-export types
export type { CSSProperty, InteropStatus, BrowserSupport } from './types';
