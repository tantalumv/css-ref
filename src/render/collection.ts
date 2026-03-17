import { escapeHTML } from "../lib/utils";
import type { CSSProperty } from "../types";
import type { CollectionMeta } from "../data/collections";

interface CollectionExample {
  title: string;
  description: string;
  code: string;
  result?: string;
}

/**
 * Render a single property section for collection page
 */
export function renderPropertySection(p: CSSProperty): string {
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
  const relatedProps = allProps.filter((p: CSSProperty) => p.c === collection.id);

  const annotationsHTML = collection.annotations
    ? `
    <div class="demo-annotations">
      ${collection.annotations
        .map(
          (a) => `
        <div class="annotation-marker marker-${a.type}" style="left: ${a.x}%; top: ${a.y}%;">
          <div class="annotation-dot"></div>
          <div class="annotation-popover">${a.text}</div>
        </div>
      `,
        )
        .join("")}
    </div>
  `
    : "";

  const strengthsWeaknessesHTML = 
    (collection.strengths?.length || collection.weaknesses?.length)
    ? `
    <section class="section-strengths-weaknesses">
      ${collection.strengths?.length ? `
      <div class="strengths-box">
        <h3>Strengths</h3>
        <ul class="strengths-list">
          ${collection.strengths.map((s) => `<li><svg class="icon strength-icon"><use href="#ri-checkbox-circle-line"/></svg>${s}</li>`).join("")}
        </ul>
      </div>` : ""}
      ${collection.weaknesses?.length ? `
      <div class="weaknesses-box">
        <h3>Weaknesses</h3>
        <ul class="weaknesses-list">
          ${collection.weaknesses.map((w) => `<li><svg class="icon weakness-icon"><use href="#ri-error-warning-line"/></svg>${w}</li>`).join("")}
        </ul>
      </div>` : ""}
    </section>
  ` : "";

  const antiExamplesHTML = collection.antiExamples?.length
    ? `
    <section class="section-anti-examples">
      <h3>Do & Don't</h3>
      <div class="anti-examples-grid">
        ${collection.antiExamples
          .map(
            (ex) => `
          <div class="anti-example-card">
            <div class="anti-example-header">
              <span class="bad-label">Don't</span>
              <span class="good-label">Do</span>
            </div>
            <div class="anti-example-content">
              <pre class="bad-code"><code>${escapeHTML(ex.badCode)}</code></pre>
              <pre class="good-code"><code>${escapeHTML(ex.goodCode)}</code></pre>
            </div>
            <p class="anti-example-explanation">${ex.explanation}</p>
          </div>
        `,
          )
          .join("")}
      </div>
    </section>
  `
    : "";

  const isTypography = collection.slug === "typography";
  const isGrid = collection.slug === "grid";
  const isBoxModel = collection.slug === "box-model";
  const isAnimation = collection.slug === "animation" || collection.slug === "transitions";
  const isColor = collection.slug === "color" || collection.slug === "backgrounds";
  const isInteractivity = collection.slug === "interactivity" || collection.slug === "layout";

  // Mouse tracking script for Interactivity meta-theme
  const interactivityScript = isInteractivity ? `
    <script>
      (function() {
        const page = document.querySelector('.layout-${collection.slug}');
        if (!page) return;
        page.addEventListener('mousemove', (e) => {
          const rect = page.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          page.style.setProperty('--mouse-x', x + '%');
          page.style.setProperty('--mouse-y', y + '%');
        });
      })();
    </script>
  ` : "";

  const introText = isTypography
    ? `<p class="intro-text drop-cap">${collection.intro}</p>`
    : `<p class="intro-text">${collection.intro}</p>`;

  const gridToggleHTML = isGrid
    ? `
    <button class="grid-visualizer-toggle" disabled>
      <svg class="icon"><use href="#ri-layout-grid-line"/></svg>
      <span>Blueprint (Disabled)</span>
    </button>
  `
    : "";

  const playPauseToggleHTML = isAnimation
    ? `
    <button class="animation-play-pause-toggle" 
            data-on:click="$isPaused = !$isPaused"
            data-class:active="$isPaused">
      <svg class="icon"><use href="#ri-movie-line"/></svg>
      <span data-text="$isPaused ? 'Resume Animations' : 'Pause All Animations'"></span>
    </button>
  `
    : "";

  let sectionCount = 0;
  const renderSection = (content: string, className: string = "") => {
    sectionCount++;
    let wrappedContent = content;

    if (isBoxModel && className.startsWith("section-")) {
      wrappedContent = `
        <div class="box-model-visualizer-wrap">
          <div class="box-margin-label">margin</div>
          <div class="box-border-visual">
            <div class="box-border-label">border</div>
            <div class="box-padding-visual">
              <div class="box-padding-label">padding</div>
              <div class="box-content-visual">
                ${content}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (isColor && className.startsWith("section-")) {
      wrappedContent = `
        <div class="color-section-wrap">
          <div class="contrast-badge">
            <span class="badge-label">WCAG AAA</span>
            <span class="badge-ratio">21:1</span>
          </div>
          ${content}
        </div>
      `;
    }

    if (isInteractivity && className.startsWith("section-")) {
      wrappedContent = `
        <div class="interactivity-layer" style="--layer-index: ${sectionCount}">
          ${content}
        </div>
      `;
    }

    if (isAnimation && className.startsWith("section-")) {
      wrappedContent = `
        <div class="animated-section" style="--anim-delay: ${sectionCount * 0.1}s">
          ${content}
        </div>
      `;
    }

    return wrappedContent;
  };

  return `
    <div class="collection-page layout-${collection.slug}" 
         style="--category-color: ${collection.color}"
         data-class:show-grid-overlay="$showGridOverlay"
         data-class:global-animation-paused="$isPaused">
      
      <nav class="collection-nav">
        <div class="nav-left">
          <button class="back-btn" onclick="location.hash=''">
            <svg class="icon" aria-hidden="true"><use href="#ri-arrow-left-line"/></svg>
            Back to all
          </button>
          <div class="hero-header-info">
            <h1 class="category-title">${collection.name}</h1>
            <div class="category-badge" style="background: ${collection.color}22; color: ${collection.color}">
              <svg class="icon" aria-hidden="true"><use href="#${collection.icon}"/></svg>
              ${collection.name}
            </div>
            <p class="category-desc">${collection.description}</p>
          </div>
        </div>
        <div class="meta-controls">
          ${gridToggleHTML}
          ${playPauseToggleHTML}
        </div>
      </nav>

      <!-- Section 1: Hero Demo Only -->
      <header class="collection-hero">
        ${
          collection.interactiveDemo
            ? `
        <div class="interactive-demo-hero">
          <div class="interactive-demo-container">
            ${collection.interactiveDemo}
            ${annotationsHTML}
          </div>
        </div>
        `
            : ""
        }
      </header>

      <hr class="section-divider">

      <!-- Section 2: Core Concepts & Practical Guide -->
      <div class="collection-content-grid">
        <section class="section-intro">
          ${introText}
          ${renderSection(strengthsWeaknessesHTML, "section-sw")}
          ${renderSection(antiExamplesHTML, "section-anti")}

          ${
            collection.concepts && collection.concepts.length > 0
              ? renderSection(`
          <div class="key-concepts">
            <h3>Key Concepts</h3>
            <div class="concepts-pills">
              ${collection.concepts.map((c) => `<span class="concept-pill">${c}</span>`).join("")}
            </div>
          </div>
          `, "section-concepts")
              : ""
          }
        </section>

        <section class="collection-sidebar">
          ${
            collection.learningObjectives && collection.learningObjectives.length > 0
              ? renderSection(`
          <div class="sidebar-block learning-goals">
            <h3>Learning Goals</h3>
            <ul>${collection.learningObjectives.map((o) => `<li>${o}</li>`).join("")}</ul>
          </div>
          `, "section-goals")
              : ""
          }
          ${
            collection.useCases && collection.useCases.length > 0
              ? renderSection(`
          <div class="sidebar-block use-cases">
            <h3>Best For</h3>
            <ul>${collection.useCases.map((u) => `<li>${u}</li>`).join("")}</ul>
          </div>
          `, "section-usecases")
              : ""
          }
          ${
            collection.examples && collection.examples.length > 0
              ? renderSection(`
          <div class="sidebar-block quick-examples">
            <h3>Quick Examples</h3>
            ${collection.examples
              .map(
                (ex) => `
              <details class="example-detail">
                <summary>${ex.title}</summary>
                <p>${ex.description}</p>
                <pre><code>${escapeHTML(ex.code)}</code></pre>
              </details>
            `,
              )
              .join("")}
          </div>
          `, "section-examples")
              : ""
          }
        </section>
      </div>

      <hr class="section-divider">

      <!-- Section 3: Properties Reference -->
      <section class="section-properties-reference">
        <div class="collection-properties">
          <h3 class="reference-title">Properties in ${collection.name}</h3>
          <div class="properties-list">
            ${relatedProps.map((p: CSSProperty) => renderSection(renderPropertySection(p), "section-prop")).join("")}
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

  console.log('Collection lookup for slug:', collectionSlug, 'Found:', !!collection);

  if (collection) {
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
