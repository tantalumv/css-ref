// Detail view rendering for CSS Ref

import { CC, IL } from "../constants";
import { bIcon } from "../lib/utils";
import { findRelatedProps } from "../lib/filters";
import type { CSSProperty, BrowserSupport } from "../types";

/**
 * Render browser support icons
 */
export function renderBrowserSupport(s: BrowserSupport): string {
  const bN: Record<string, string> = { ch: "Chrome", ff: "Firefox", sf: "Safari", ed: "Edge" };
  const bS: Record<number | string, string> = { 1: "Supported", 0: "Not supported", p: "Partial" };

  return (["ch", "ff", "sf", "ed"] as const)
    .map((b) => {
      const v = s[b];
      const cls = v === 1 ? "y" : v === 0 ? "n" : "p";
      return `<div class="detail-b"><div class="detail-b-icon ${cls}">${bIcon(v, b)}</div><div class="detail-b-name">${bN[b]}</div><div class="detail-b-status ${cls}">${bS[v]}</div></div>`;
    })
    .join("");
}

/**
 * Create property map for fast lookup
 */
export function createPropertyMap(props: CSSProperty[]): Map<string, CSSProperty> {
  return new Map<string, CSSProperty>(props.map((p) => [p.n, p]));
}

/**
 * Render detail view for a CSS property
 */
export function renderDetail(
  selectedProp: string,
  propMap: Map<string, CSSProperty>,
  allProps: CSSProperty[],
): string {
  if (!selectedProp) {
    return "";
  }

  const p = propMap.get(selectedProp);
  if (!p) {
    return "";
  }

  const color = CC[p.c] || "#6366f1";

  const valueExplanations = (p as any).v
    ? (p as any).v
        .map(
          (v: any) => `
  <div class="value-explanation">
    <code class="value-code">${v.value}</code>
    <span class="value-label">${v.label}</span>
    <p class="value-desc">${v.description}</p>
  </div>
`,
        )
        .join("")
    : "";

  const related = findRelatedProps(p, allProps, 4);
  const relatedHTML =
    related.length === 0
      ? ""
      : `
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

  return `
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
      ${
        valueExplanations
          ? `
      <div class="detail-section">
        <div class="detail-lbl">Values</div>
        <div class="values-grid">${valueExplanations}</div>
      </div>
      `
          : ""
      }
      <div class="detail-section">
        <div class="detail-lbl">Syntax</div>
        <pre class="syntax-block">${p.x}<button class="copy-btn" onclick="navigator.clipboard.writeText('${p.x.replace(/'/g, "\\'")}').then(()=>{const btn=this;btn.innerHTML='<svg class="icon" aria-hidden="true"><use href="#ri-check-line"/></svg>';;setTimeout(()=>btn.innerHTML='<svg class="icon" aria-hidden="true"><use href="#ri-clipboard-line"/></svg>',1500)})" style="position:absolute;top:8px;right:8px;padding:6px 10px;font-size:14px;background:${color};color:#fff;border:none;border-radius:4px;cursor:pointer"><svg class="icon" aria-hidden="true"><use href="#ri-clipboard-line"/></svg></button></pre>
      </div>
      <div class="detail-section">
        <div class="detail-lbl">Browser Support</div>
        <div class="detail-browsers">${renderBrowserSupport(p.s)}</div>
      </div>
      <div class="detail-links">
        ${p.caniuse ? `<a class="caniuse-link" href="https://caniuse.com/${p.caniuse}" target="_blank" rel="noopener">Can I Use →</a>` : ""}
        <a class="mdn-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/${p.m}" target="_blank" rel="noopener">
          View on MDN →
        </a>
      </div>
      ${relatedHTML}
    </div>
  `;
}

/**
 * Show detail view in DOM
 */
export function showDetailView(propName: string, propMap: Map<string, CSSProperty>, allProps: CSSProperty[]): void {
  const view = document.getElementById("detail-view");
  if (!view) return;

  const html = renderDetail(propName, propMap, allProps);
  if (html) {
    view.innerHTML = html;
    view.classList.add("open");
    view.setAttribute("data-show", "true");
  } else {
    view.innerHTML = "";
    view.classList.remove("open");
    view.setAttribute("data-show", "false");
  }
}

/**
 * Hide detail view
 */
export function hideDetailView(): void {
  const view = document.getElementById("detail-view");
  if (view) {
    view.innerHTML = "";
    view.classList.remove("open");
    view.setAttribute("data-show", "false");
  }
}
