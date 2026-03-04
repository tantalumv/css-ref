// CSS Ref - Main Entry Point (Datastar Migration)
// Exposes all data/functions on window for Datastar expressions

import { CC, IL, IC } from './constants';
import { P, CATS, INTEROPS } from './data';
import { bIcon } from './utils';
import type { CSSProperty } from './types';

// ── Expose static data on window ──
(window as any).P = P;
(window as any).CATS = CATS;
(window as any).INTEROPS = INTEROPS;
(window as any).CC = CC;
(window as any).IL = IL;
(window as any).IC = IC;
(window as any).bIcon = bIcon;

// ── Filter logic (takes signal values as args from Datastar expressions) ──
(window as any).filtered = function (q: string, activeCats: string[], activeInterops: string[]): CSSProperty[] {
  return P.filter(p =>
    (!activeCats.length || activeCats.includes(p.c)) &&
    (!activeInterops.length || activeInterops.includes(p.i)) &&
    (!q || p.n.toLowerCase().includes(q.toLowerCase()) || p.d.toLowerCase().includes(q.toLowerCase()) || p.c.toLowerCase().includes(q.toLowerCase()))
  );
};

(window as any).hasFilters = function (activeCats: string[], activeInterops: string[]): boolean {
  return activeCats.length > 0 || activeInterops.length > 0;
};

// ── Render functions ──
(window as any).updateFilterBtn = function (activeCats: string[], activeInterops: string[]) {
  const b = document.getElementById('filterBtn');
  if (b) b.classList.toggle('has-active', (window as any).hasFilters(activeCats, activeInterops));
};

(window as any).renderChips = function (activeCats: string[], activeInterops: string[]) {
  const cg = document.getElementById('catChips');
  if (cg) {
    cg.innerHTML = '';
    CATS.forEach(cat => {
      const b = document.createElement('button');
      b.className = 'chip' + (activeCats.includes(cat) ? ' active' : '');
      b.textContent = cat;
      b.dataset.cat = cat;
      b.style.setProperty('--cc', CC[cat] || '#6366f1');
      cg.appendChild(b);
    });
  }

  const ig = document.getElementById('interopChips');
  if (ig) {
    ig.innerHTML = '';
    INTEROPS.forEach(k => {
      const b = document.createElement('button');
      b.className = 'chip' + (activeInterops.includes(k) ? ' active' : '');
      b.textContent = IL[k].replace(/^[^ ]+ /, '');
      b.dataset.status = k;
      b.style.setProperty('--cc', IC[k]);
      ig.appendChild(b);
    });
  }
};

(window as any).renderGrid = function (items: CSSProperty[]) {
  const grid = document.getElementById('grid');
  const count = document.getElementById('count');

  if (count) count.textContent = `${items.length} / ${P.length}`;
  if (!grid) return;

  grid.className = 'is-grid';
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
    
    const animationClass = ' enter-fade';
    el.className = `card${animationClass}`;
    el.innerHTML = `<div class="demo-stage" style="position:relative;overflow:visible"><div style="width:100%;height:100%;overflow:hidden">${p.demo}</div><span class="cat-badge" style="position:absolute;bottom:0;left:1em;transform:translateY(50%);z-index:10">${p.c}</span></div><div class="card-bottom"><div class="card-meta"><div class="card-name-wrap"><h2 class="card-name" data-name="${p.n}"><span class="name-text">${p.n}</span><span class="name-text" aria-hidden="true">${p.n}</span></h2></div></div><div class="card-support"><div class="browser-badges">${(['ch', 'ff', 'sf', 'ed'] as const).map(b => bIcon(p.s[b], b)).join('')}</div><span class="availability-badge ${p.i}">${IL[p.i]}</span></div></div>`;

    el.onclick = () => (window as any).showDetail(p);
    grid.appendChild(el);
  });

  // Detect overflowing property names and add scroll animation
  requestAnimationFrame(() => {
    grid.querySelectorAll('.card-name').forEach(nameEl => {
      const textEl = nameEl.querySelector('.name-text');
      if (textEl && textEl.scrollWidth > nameEl.clientWidth) {
        nameEl.classList.add('overflows');
      }
    });
  });
};

(window as any).showDetail = function (p: CSSProperty) {
  const color = CC[p.c] || '#6366f1';
  const bN: Record<string, string> = { ch: 'Chrome', ff: 'Firefox', sf: 'Safari', ed: 'Edge' };
  // Inline SVG data URIs for browser icons
  const bSvg: Record<string, string> = {
    ch: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='m0 0H512V512H0' fill='%23fff'/%3E%3Ccircle cx='256' cy='256' r='192' fill='%23fcc11d'/%3E%3Cpath d='m94 153a192 192 90 00162 295l82-142' fill='%23289b48'/%3E%3Cpath d='m89.72 160a192 192 90 01332.56 0H256l-82 146' fill='%23e0392c'/%3E%3Ccircle cx='256' cy='256' r='86' fill='%231a73e8' stroke='%23fff' stroke-width='20'/%3E%3C/svg%3E",
    ff: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='m0 0H512V512H0' fill='%23fff'/%3E%3ClinearGradient id='a' x1='.7' x2='.3' y2='.8'%3E%3Cstop offset='.3' stop-color='%23fd5'/%3E%3Cstop offset='.6' stop-color='%23f85'/%3E%3Cstop offset='1' stop-color='%23d06'/%3E%3C/linearGradient%3E%3CradialGradient id='b' cx='.4' cy='.7'%3E%3Cstop offset='.4' stop-color='%2374d'/%3E%3Cstop offset='1' stop-color='%23a2d'/%3E%3C/radialGradient%3E%3ClinearGradient id='c' x1='.8' y1='.2' x2='.4' y2='.8'%3E%3Cstop offset='.2' stop-color='%23fd5'/%3E%3Cstop offset='1' stop-color='%23f33'/%3E%3C/linearGradient%3E%3Cg transform='scale(4)'%3E%3Cpath d='M64 53S56 27 80 14c6 12 23 28 26 37 0-6-5-15-5-15A51 48 0 1114 68S38 35 47 33c-2 7 1 16 1 16' fill='url(%23a)'/%3E%3Ccircle cx='64' cy='67' r='26' fill='url(%23b)'/%3E%3Cpath d='M21 45l43 12c-6 11-16 3-23 14a22 22 0 1034-20s33 3 17 42H28m36 25h1' fill='url(%23a)'/%3E%3Cpath d='M35 43c16 0 12 7 29 14-18 6-23-9-38 0 5 9 12 8 12 8 1 43 72 29 67-17A50 46.6 47 0117 81c-9-18-1-40 16-51' fill='url(%23c)'/%3E%3C/g%3E%3C/svg%3E",
    sf: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='m0 0H512V512H0' fill='%23fff'/%3E%3CradialGradient id='a'%3E%3Cstop stop-color='%230bd' offset='0'/%3E%3Cstop offset='1' stop-color='%2317d'/%3E%3C/radialGradient%3E%3Cg transform='matrix(4 0 0 4 256 256)'%3E%3Cg stroke='%23eee' fill='none'%3E%3Ccircle r='52.5' fill='url(%23a)' stroke-width='5'/%3E%3Ccircle r='45' stroke-dasharray='1.25 8.175' stroke-dashoffset='.5' stroke-width='5.5'/%3E%3Ccircle r='42.5' stroke-dasharray='1.25 7.65' stroke-dashoffset='5' stroke-width='10'/%3E%3C/g%3E%3Cpath d='M-35 33-6-6 6 6' fill='%23eee'/%3E%3Cpath d='M35-34-6-6 6 6' fill='%23f55'/%3E%3Cpath opacity='.3' d='M-35 33l7-5-3 5L6 6l28-35-4 2 4-6'/%3E%3C/g%3E%3C/svg%3E",
    ed: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='m0 0H512V512H0' fill='%23fff'/%3E%3CradialGradient id='a'%3E%3Cstop offset='.8' stop-color='%23159'/%3E%3Cstop offset='1' stop-color='%23148'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cy='.7' r='.7'%3E%3Cstop offset='.8' stop-color='%2318d'/%3E%3Cstop offset='1' stop-color='%2307a'/%3E%3C/radialGradient%3E%3CradialGradient id='c' cx='.1' cy='.2' r='1'%3E%3Cstop offset='.4' stop-color='%233ce'/%3E%3Cstop offset='1' stop-color='%233c5'/%3E%3C/radialGradient%3E%3CradialGradient id='d' cx='.9'%3E%3Cstop offset='0' stop-color='%236e7'/%3E%3Cstop offset='1' stop-color='%236e7' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cpath d='m233 214s-25 12-25 42a133 112 0 00202 94 6 6 0 019 7C316 514 90 454 187 237' fill='url(%23a)'/%3E%3Cpath d='m300 153H94a192 192 0 00220 286 116 120.3-2 01-74-228 48 49 0 0164 41' fill='url(%23b)'/%3E%3Cpath d='M64 253c4-110 186-138 233-31 26 70-34 65 3 88 71 30 159-7 147-102C400 3 75 16 64 253' fill='url(%23c)'/%3E%3Cpath d='m242 58c251 14 262 290 86 248' fill='url(%23d)'/%3E%3C/svg%3E"
  };
  const bS: Record<number | string, string> = { 1: 'Supported', 0: 'Not supported', 'p': 'Partial' };

  const detailContent = document.getElementById('detail-content');

  if (detailContent) {
    detailContent.innerHTML = `
      <div class="detail-hero"><div class="detail-name" style="color:${color}">${p.n}</div>
      <div class="detail-badges"><span class="cat-badge" style="background:${color};padding:4px 12px;font-size:var(--step--1)">${p.c}</span><span class="interop ${p.i}" style="font-size:var(--step--1);padding:4px 12px">${IL[p.i]}</span></div></div>
      <div class="detail-demo-box">
        <div class="detail-demo-stage">${p.demo}</div>
        <div class="detail-demo-label">${p.x.split('\n')[0]}</div>
      </div>
      <div class="detail-section"><div class="detail-lbl">Description</div><p class="detail-desc">${p.d}</p></div>
      <div class="detail-section"><div class="detail-lbl">Syntax</div><pre class="syntax-block">${p.x}</pre></div>
      <div class="detail-section"><div class="detail-lbl">Browser Support</div>
      <div class="detail-browsers">${(['ch', 'ff', 'sf', 'ed'] as const).map(b => {
        const v = p.s[b];
        const cls = v === 1 ? 'y' : v === 0 ? 'n' : 'p';
        return `<div class="detail-b"><div class="detail-b-icon ${cls}" style="background-image:url('${bSvg[b]}')"></div><div class="detail-b-name">${bN[b]}</div><div class="detail-b-status ${cls}">${bS[v]}</div></div>`;
      }).join('')}</div></div>
      <a class="mdn-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/${p.m}" target="_blank" rel="noopener">View on MDN →</a>`;
  }

  // Show detail view by manipulating DOM directly
  const detailView = document.getElementById('detail-view');
  const gridView = document.getElementById('grid-view');
  const tableView = document.getElementById('table-view');

  if (detailView) {
    detailView.style.display = 'block';
    detailView.classList.add('open');
  }
  if (gridView) gridView.style.display = 'none';
  if (tableView) tableView.style.display = 'none';

  window.scrollTo(0, 0);
};

(window as any).showList = function () {
  // Hide detail view and restore grid/table
  const detailView = document.getElementById('detail-view');
  const gridView = document.getElementById('grid-view');
  const tableView = document.getElementById('table-view');

  if (detailView) {
    detailView.style.display = 'none';
    detailView.classList.remove('open');
  }

  // Restore grid/table based on current viewMode signal
  // We need to check the signal value
  const body = document.body as any;
  const viewMode = body._ds?.signals?.get?.('viewMode') || 'grid';

  if (gridView) gridView.style.display = viewMode === 'grid' ? 'block' : 'none';
  if (tableView) tableView.style.display = viewMode === 'table' ? 'block' : 'none';
};

// ── Chip toggle helpers (called from Datastar expressions, return new array) ──
(window as any).toggleInArray = function (arr: string[], item: string): string[] {
  const copy = [...arr];
  const idx = copy.indexOf(item);
  if (idx > -1) copy.splice(idx, 1);
  else copy.push(item);
  return copy;
};

declare const gridjs: any;

let gridInstance: any = null;
let lastGridData: string = '';
let tableFullData: CSSProperty[] = [];
let tableDisplayedCount: number = 0;
const TABLE_BATCH_SIZE = 30;

(window as any).initGrid = function (data: CSSProperty[]) {
  const container = document.getElementById('table-container');
  const sentinel = document.getElementById('table-sentinel');
  if (!container) return;
  
  const dataKey = JSON.stringify(data.map(p => p.n + p.c));
  if (dataKey === lastGridData && gridInstance) return;
  lastGridData = dataKey;
  
  tableFullData = data;
  tableDisplayedCount = 0;
  
  // Properly destroy old Grid.js instance
  if (gridInstance) {
    gridInstance.destroy();
    gridInstance = null;
  }
  
  container.innerHTML = '';
  
  const isMobile = window.innerWidth <= 600;
  const initialData = data.slice(0, TABLE_BATCH_SIZE);
  tableDisplayedCount = initialData.length;
  
  const tableData = initialData.map((p, idx) => [
    { data: idx, name: p.n },
    p.c,
    { demo: p.demo, desc: p.d },
    { 
      data: idx, 
      icons: bIcon(p.s.ch, 'ch') + bIcon(p.s.ff, 'ff') + bIcon(p.s.sf, 'sf') + bIcon(p.s.ed, 'ed'),
      interop: p.i,
      interopLabel: IL[p.i]
    }
  ]);

  gridInstance = new gridjs.Grid({
    data: tableData,
    columns: [
      {
        name: 'Property',
        sort: true,
        width: '100px',
        formatter: (cell: any) => gridjs.html(`<span style="font-family:var(--font-mono);font-weight:700;font-size:14px;padding:0 4px">${cell.name}</span>`)
      },
      {
        name: 'Category',
        sort: true,
        width: '90px',
        formatter: (cell: any) => gridjs.html(`<span style="font-size:13px;font-weight:600;color:var(--primary);padding:0 4px">${cell}</span>`)
      },
      {
        name: 'Preview',
        sort: false,
        width: '320px',
        formatter: (cell: any) => gridjs.html(`
          <div class="table-preview" style="position:relative;width:100%;height:120px;overflow:hidden;background:var(--muted);display:flex;align-items:center;justify-content:center">
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center">${cell.demo}</div>
            <div class="table-desc" style="position:absolute;inset:0;background:rgba(0,0,0,0.9);color:#fff;padding:12px;font-size:13px;line-height:1.5;opacity:0;transition:opacity 0.2s;display:flex;align-items:center;justify-content:center;text-align:center">${cell.desc}</div>
          </div>
        `)
      },
      {
        name: 'Support',
        sort: true,
        width: '100px',
        formatter: (cell: any) => gridjs.html(`
          <div style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:4px">
            <div style="display:flex;gap:3px;transform:scale(0.9)">${cell.icons}</div>
            <span style="font-size:11px;font-weight:600;color:var(--muted-foreground);text-transform:uppercase;letter-spacing:0.02em;text-align:center;line-height:1.2">${cell.interopLabel}</span>
          </div>
        `)
      }
    ],
    sort: {
      enabled: true,
      multiColumn: false,
      server: undefined
    },
    pagination: isMobile ? { limit: 25 } : false,
    search: false,
    style: {
      table: {
        'font-size': '14px',
        'width': '100%'
      },
      th: {
        'background': 'var(--muted)',
        'color': 'var(--foreground)',
        'font-weight': '600',
        'text-transform': 'uppercase',
        'font-size': '11px',
        'letter-spacing': '0.05em',
        'padding': '8px 4px'
      },
      td: {
        'color': 'var(--foreground)',
        'padding': '0'
      },
      tr: {
        'background': 'var(--card)'
      }
    }
  });
  
  gridInstance.render(container);
  
  if (sentinel) {
    sentinel.classList.toggle('hidden', tableDisplayedCount >= tableFullData.length);
  }
  
  setTimeout(() => {
    attachRowListeners(container, initialData);
  }, 100);
};

function attachRowListeners(container: Element, data: CSSProperty[]) {
  container.querySelectorAll('.gridjs-tr').forEach((row: Element) => {
    if (!row.hasAttribute('data-listener')) {
      row.setAttribute('data-listener', 'true');
      row.addEventListener('click', () => {
        const firstCell = row.querySelector('.gridjs-td:first-child');
        const idx = firstCell ? parseInt((firstCell as HTMLElement).dataset?.data || '0') : 0;
        if (data[idx]) {
          (window as any).showDetail(data[idx]);
        }
      });
      (row as HTMLElement).style.cursor = 'pointer';
    }
  });
}

// Track loading state to prevent duplicate loads
let isLoadingMore = false;

(window as any).loadMoreTableRows = function () {
  if (isLoadingMore || !gridInstance || tableDisplayedCount >= tableFullData.length) return;

  isLoadingMore = true;
  const sentinel = document.getElementById('table-sentinel');

  const nextBatch = tableFullData.slice(tableDisplayedCount, tableDisplayedCount + TABLE_BATCH_SIZE);
  const startIdx = tableDisplayedCount;
  tableDisplayedCount += nextBatch.length;

  const newRows = nextBatch.map((p, i) => [
    { data: startIdx + i, name: p.n },
    p.c,
    { demo: p.demo, desc: p.d },
    {
      data: startIdx + i,
      icons: bIcon(p.s.ch, 'ch') + bIcon(p.s.ff, 'ff') + bIcon(p.s.sf, 'sf') + bIcon(p.s.ed, 'ed'),
      interop: p.i,
      interopLabel: IL[p.i]
    }
  ]);

  // Use Grid.js updateConfig without re-rendering, then force update
  const currentData = gridInstance.config.data;
  const updatedData = [...currentData, ...newRows];

  gridInstance.config.data = updatedData;
  gridInstance.forceRender();

  if (sentinel) {
    sentinel.classList.toggle('hidden', tableDisplayedCount >= tableFullData.length);
  }

  setTimeout(() => {
    const container = document.getElementById('table-container');
    if (container) attachRowListeners(container, tableFullData);
    isLoadingMore = false;
  }, 100);
};

// Re-export types for build compatibility
export type { CSSProperty, InteropStatus } from './types';
