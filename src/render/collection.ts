// Collection page rendering for CSS Ref

import { CC } from "../constants";
import { escapeHTML } from "../lib/utils";
import type { CSSProperty } from "../types";
import type { CollectionMeta } from "../data";

interface CollectionExample {
  title: string;
  description: string;
  code: string;
  result?: string;
}

/**
 * Render a single property section for collection page
 */
export function renderPropertySection(p: CSSProperty, categoryColor: string): string {
  const color = CC[p.c] || categoryColor;
  const anchorId = p.n.replace(/\./g, "-");

  const valuesHTML = p.v
    ? p.v
        .map(
          (v: any) => `
    <div class="property-value-item">
      <code class="property-value-code">${v.value}</code>
      <span class="property-value-label">${v.label}</span>
      <p class="property-value-desc">${v.description}</p>
      ${v.demo ? `<div class="property-value-demo">${v.demo}</div>` : ""}
    </div>
  `,
        )
        .join("")
    : "";

  return `
    <div class="property-section" id="${anchorId}">
      <div class="property-header">
        <h4 class="property-name">
          <a href="#${anchorId}" class="property-anchor">#</a>
          ${p.n}
        </h4>
        <a class="property-mdn-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/${p.m}" target="_blank" rel="noopener">MDN</a>
      </div>

      <p class="property-description">${p.d}</p>

      ${
        p.default
          ? `
      <div class="property-default">
        <span class="property-default-label">Default:</span>
        <code class="property-default-value">${p.default}</code>
      </div>
      `
          : ""
      }

      <div class="property-demo-box">
        <div class="property-demo-stage">${p.demo}</div>
      </div>

      ${
        valuesHTML
          ? `
      <div class="property-values">
        <h5 class="property-values-title">Values</h5>
        <div class="property-values-grid">
          ${valuesHTML}
        </div>
      </div>
      `
          : ""
      }

      <div class="property-syntax">
        <code>${p.x}</code>
      </div>
    </div>
  `;
}

/**
 * Render collection page HTML
 */
export function renderCollectionPageHTML(collection: CollectionMeta, allProps: CSSProperty[]): string {
  // Get all CSS properties that belong to this collection's category
  const relatedProps = allProps.filter((p: CSSProperty) => p.c === collection.id);

  return `
    <div class="collection-page">
      <button class="back-btn" onclick="location.hash=''">
        <svg class="icon" aria-hidden="true"><use href="#ri-arrow-left-line"/></svg>
        All properties
      </button>

      <!-- Section 1: Overview -->
      <section class="section-overview">
        <div class="category-hero" style="--cat-color: ${collection.color}">
          <div class="category-icon-wrap">
            <svg class="icon" aria-hidden="true"><use href="#${collection.icon}"/></svg>
          </div>
          <div class="category-info">
            <h1 class="category-title">${collection.name}</h1>
            <p class="category-desc">${collection.description}</p>
          </div>
        </div>

        <div class="overview-content">
          <div class="category-intro">
            <p>${collection.intro}</p>
          </div>

          ${
            collection.difficulty || collection.estimatedTime || collection.prerequisites
              ? `
          <div class="collection-meta">
            ${collection.difficulty ? `<span class="difficulty-badge difficulty-${collection.difficulty}">${collection.difficulty}</span>` : ""}
            ${collection.estimatedTime ? `<span class="estimated-time"><svg class="icon" aria-hidden="true"><use href="#ri-time-line"/></svg> ${collection.estimatedTime}</span>` : ""}
          </div>
          ${
            collection.prerequisites && collection.prerequisites.length > 0
              ? `
          <div class="prerequisites-section">
            <h4>Prerequisites</h4>
            <ul class="prerequisites-list">
              ${collection.prerequisites.map((prereq: string) => `<li>${prereq}</li>`).join("")}
            </ul>
          </div>
          `
              : ""
          }
          `
              : ""
          }
        </div>
      </section>

      <!-- Section 2: Learning Goals -->
      ${
        (collection.learningObjectives && collection.learningObjectives.length > 0) ||
        (collection.concepts && collection.concepts.length > 0)
          ? `
      <section class="section-learning-goals">
        ${
          collection.learningObjectives && collection.learningObjectives.length > 0
            ? `
        <div class="learning-objectives">
          <h3>Learning Objectives</h3>
          <ul class="learning-objectives-list">
            ${collection.learningObjectives.map((obj: string) => `<li>${obj}</li>`).join("")}
          </ul>
        </div>
        `
            : ""
        }
        ${
          collection.concepts && collection.concepts.length > 0
            ? `
        <div class="category-concepts">
          <h3>Key Concepts</h3>
          <ul class="concepts-list">
            ${collection.concepts.map((c: string) => `<li>${c}</li>`).join("")}
          </ul>
        </div>
        `
            : ""
        }
      </section>
      `
          : ""
      }

      <!-- Section 3: Practical Guide -->
      <section class="section-practical-guide">
        ${
          collection.useCases && collection.useCases.length > 0
            ? `
        <div class="collection-use-cases">
          <h3>Use Cases</h3>
          <ul class="use-cases-list">
            ${collection.useCases.map((uc: string) => `<li>${uc}</li>`).join("")}
          </ul>
        </div>
        `
            : ""
        }
        ${
          collection.whenToUse && collection.whenToUse.length > 0
            ? `
        <div class="when-to-use">
          <h3>When to Use</h3>
          <ul class="when-to-use-list">
            ${collection.whenToUse.map((scenario: string) => `<li>${scenario}</li>`).join("")}
          </ul>
        </div>
        `
            : ""
        }
      </section>

      <!-- Section 4: Examples -->
      <section class="section-examples">
        <div class="collection-examples">
          <h3>Examples</h3>
          <div class="examples-grid">
            ${collection.examples
              .map(
                (ex: CollectionExample) => `
              <div class="example-card">
                <h4>${ex.title}</h4>
                <p>${ex.description}</p>
                <pre class="example-code"><code>${escapeHTML(ex.code)}</code></pre>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        ${
          collection.interactiveDemo
            ? `
        <div class="interactive-demo-section">
          <h3>Interactive Demo</h3>
          <p class="interactive-demo-hint">Click the buttons below to see ${collection.name} in action!</p>
          <div class="interactive-demo-container">
            ${collection.interactiveDemo}
          </div>
        </div>
        `
            : ""
        }
      </section>

      <!-- Section 5: Common Mistakes -->
      ${
        collection.commonMistakes && collection.commonMistakes.length > 0
          ? `
      <section class="section-common-mistakes">
        <div class="common-mistakes">
          <h3>Common Mistakes to Avoid</h3>
          <ul class="mistakes-list">
            ${collection.commonMistakes.map((mistake: string) => `<li>${mistake}</li>`).join("")}
          </ul>
        </div>
      </section>
      `
          : ""
      }

      <!-- Section 6: Properties Reference -->
      <section class="section-properties-reference">
        <div class="collection-properties">
          <h3>Properties in ${collection.name}</h3>
          <div class="properties-list">
            ${relatedProps.map((p: CSSProperty) => renderPropertySection(p, collection.color)).join("")}
          </div>
        </div>

        <div class="related-props">
          <h3>Quick Reference (${relatedProps.length} properties)</h3>
          <div class="related-grid">
            ${relatedProps
              .map(
                (p: CSSProperty) => `
              <div class="related-card" onclick="location.hash='${encodeURIComponent(p.n)}'" style="cursor:pointer">
                <div class="related-prop-name">${p.n}</div>
                <div class="related-prop-desc">${p.d}</div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>
    </div>
  `;
}

/**
 * Show collection view in DOM
 */
export function showCollectionView(collectionSlug: string, allProps: CSSProperty[], collections: Record<string, CollectionMeta>): void {
  const view = document.getElementById("collection-view");
  if (!view) return;

  // Guard: only process valid, non-empty slugs that exist in COLLECTIONS
  if (!collectionSlug || typeof collectionSlug !== "string") {
    view.innerHTML = "";
    return;
  }

  // Only look for curated collections - do NOT fall back to categories
  const collection = Object.values(collections).find(
    (c: CollectionMeta) => c.slug === collectionSlug,
  );

  if (collection) {
    // Render Collection page with pedagogical content
    view.innerHTML = renderCollectionPageHTML(collection, allProps);

    // Initialize Datastar on the newly injected interactive demo content
    if (typeof (window as any).Datastar !== "undefined") {
      (window as any).Datastar.connect();
    }
  } else {
    // No matching curated collection found - clear the view
    view.innerHTML = "";
  }
}

/**
 * Hide collection view
 */
export function hideCollectionView(): void {
  const view = document.getElementById("collection-view");
  if (view) {
    view.innerHTML = "";
    view.setAttribute("data-show", "false");
  }
}
