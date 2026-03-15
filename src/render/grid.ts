// Grid view rendering for CSS Ref

import { CC, IL } from "../constants";
import { bIcon } from "../lib/utils";
import type { CSSProperty } from "../types";

/**
 * Render grid of CSS property cards
 */
export function renderGrid(
  items: CSSProperty[],
  selectedProp: string,
  onCardClick?: (prop: CSSProperty) => void,
): void {
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
      if (onCardClick) {
        onCardClick(p);
      } else {
        // Default behavior
        const propHash = encodeURIComponent(p.n);
        location.hash = propHash;
      }
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
}
