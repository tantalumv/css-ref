
import { CC, IL } from "../constants";
import { renderBrowserSupport } from "../lib/browser-icons";
import { findRelatedProps } from "../lib/filters";
import type { CSSProperty } from "../types";

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

  const valueExplanations = p.v
    ? p.v
        .map(
          (v) => `
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
        <svg class="icon" aria-hidden="true"><use href="#ri-arrow-left-line"/></svg>
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
        <div class="syntax-wrapper">
          <pre class="syntax-block">${p.x}<button class="copy-btn" onclick="navigator.clipboard.writeText(&#39;${p.x.replace(/'/g, "\\'")}&#39;).then(()=>{const btn=this;btn.innerHTML='<svg class=&quot;icon&quot; aria-hidden=&quot;true&quot;><use href=&quot;#ri-check-line&quot;/></svg>';setTimeout(()=>btn.innerHTML='<svg class=&quot;icon&quot; aria-hidden=&quot;true&quot;><use href=&quot;#ri-clipboard-line&quot;/></svg>',1500)})"><svg class="icon" aria-hidden="true"><use href="#ri-clipboard-line"/></svg></button></pre>
        </div>
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
