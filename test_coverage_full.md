# CSS Reference - Complete Test Coverage Report

Generated: 2026-04-24

## Summary

| Metric | Count |
|--------|-------|
| Total Features Identified | 236 |
| Features Tested in E2E | 158 |
| Features Tested (Unit Only) | 0 |
| Features Not Tested | 78 |
| Coverage Percentage | 66.9% |

---

## 1. Navigation & Routing

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Hash-based navigation (/#!flexbox) | index.html:101, src/main.ts:16-20 | e2e/detail-view.spec.ts | "direct navigation via hash opens detail view" | ✅ Tested | Collection routing |
| Hash-based navigation (/#display) | index.html:101, src/main.ts:16-20 | e2e/detail-view.spec.ts | "direct navigation via hash opens detail view" | ✅ Tested | Property detail routing |
| Back/forward browser support | index.html:99-101 | e2e/app.spec.ts | "can go back from detail view" | ✅ Tested | Escape key and back button |
| Brand/logo click goes home | index.html:202 | None | N/A | ❌ Not Tested | `location.hash = ''` on brand click |
| Collection routing (/#!collection) | index.html:1195-1196, src/main.ts:16-20 | e2e/dropdown.spec.ts | "can select option from sidebar collections dropdown" | ✅ Tested | Via sidebar dropdown |
| Invalid hash handling | src/render/detail.ts:27-29 | e2e/detail-view.spec.ts | "invalid property hash shows empty but visible detail view" | ✅ Tested | Returns empty detail view |
| Hash change event propagation | src/main.ts:16-20 | None | N/A | ❌ Not Tested | Custom event `app:hashchange` |
| Initial hash on page load | src/main.ts:26-30, index.html:1189-1190 | None | N/A | ❌ Not Tested | Data-init for initial hash |
| Same hash re-render | src/render/detail.ts:17-30 | e2e/detail-view.spec.ts | "navigating to same property twice re-renders correctly" | ✅ Tested | Fixed caching issue |

---

## 2. Search & Discovery

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Desktop search input | index.html:315-324 | e2e/app.spec.ts | "can search for properties" | ✅ Tested | Basic search |
| Desktop fuzzy search - exact match | src/lib/search.ts | e2e/fuzzy-search.spec.ts | "should find properties with exact match" | ✅ Tested | "display" finds display |
| Desktop fuzzy search - partial match | src/lib/search.ts | e2e/fuzzy-search.spec.ts | "should find properties with partial match" | ✅ Tested | "disp" finds display |
| Desktop fuzzy search - typo tolerant | src/lib/search.ts | e2e/fuzzy-search.spec.ts | "should handle typo-tolerant search" | ✅ Tested | "displ", "flex-", "backgr" |
| Desktop fuzzy search - case insensitive | src/lib/search.ts | e2e/fuzzy-search.spec.ts | "should handle case-insensitive search" | ✅ Tested | "DISPLAY" vs "display" |
| Search in property descriptions | src/lib/search.ts | e2e/fuzzy-search.spec.ts | "should search in property descriptions" | ✅ Tested | "element" in descriptions |
| Search in categories | src/lib/search.ts | e2e/fuzzy-search.spec.ts | "should search in categories" | ✅ Tested | "flexbox" category |
| Empty search results | index.html:24, src/render/grid.ts:23-24 | e2e/fuzzy-search.spec.ts | "should show no results for non-matching query" | ✅ Tested | Shows empty state |
| Clear search input | index.html:315-324 | e2e/fuzzy-search.spec.ts | "should clear search when input is cleared" | ✅ Tested | |
| Mobile command palette opens | index.html:898-903 | e2e/dropdown.spec.ts | "mobile search button opens command palette" | ✅ Tested | Via mobile search btn |
| Mobile command palette closes (Escape) | index.html:902 | e2e/fuzzy-search.spec.ts | "should close command palette with escape key" | ✅ Tested | |
| Mobile command palette closes (button) | index.html:905 | e2e/fuzzy-search.spec.ts | "should close command palette with close button" | ✅ Tested | |
| Mobile command palette search | index.html:920-930 | e2e/fuzzy-search.spec.ts | "should search in command palette with exact match" | ✅ Tested | Uses #search-mobile |
| Mobile command palette fuzzy search | src/lib/search.ts | e2e/fuzzy-search.spec.ts | "should handle typo-tolerant search in command palette" | ✅ Tested | |
| Category filter dropdown (desktop) | index.html:339-571 | e2e/dropdown.spec.ts | "category dropdown opens and closes correctly" | ✅ Tested | |
| Category filter - select option | index.html:339-571 | e2e/dropdown.spec.ts | "can select category from dropdown" | ✅ Tested | Layout selected |
| Interop filter dropdown (desktop) | index.html:573-664 | e2e/dropdown.spec.ts | "interop dropdown opens and closes correctly" | ✅ Tested | |
| Interop filter - select option | index.html:573-664 | e2e/dropdown.spec.ts | "can select interop from dropdown" | ✅ Tested | Available selected |
| Browser filter dropdown (desktop) | index.html:666-735 | e2e/dropdown.spec.ts | "browser dropdown opens and closes correctly" | ✅ Tested | |
| Browser filter - select option | index.html:666-735 | e2e/dropdown.spec.ts | "can select browser from dropdown" | ✅ Tested | Chrome selected |
| Dropdown aria-expanded updates | index.html:344, 578, 672 | e2e/dropdown.spec.ts | "dropdown aria-expanded attribute updates correctly" | ✅ Tested | |
| Opening one dropdown closes others | index.html:343, 577, 670 | e2e/dropdown.spec.ts | "opening one dropdown closes others" | ✅ Tested | |
| Click trigger twice toggles | index.html:227, 340, 574 | e2e/dropdown.spec.ts | "clicking same dropdown trigger twice toggles it" | ✅ Tested | |
| Mobile category filter in palette | index.html:937-1009 | e2e/dropdown.spec.ts | "mobile command palette can filter by category" | ✅ Tested | |
| Clear all filters button | index.html:326-332, 1086-1099 | e2e/fuzzy-search.spec.ts | "should clear search when input is cleared" | ✅ Tested | Clears activeCats, activeInterops |
| Combined filters with search | src/lib/filters.ts | e2e/fuzzy-search.spec.ts | "should combine fuzzy search with category filter" | ✅ Tested | |
| Grid view search consistency | src/render/grid.ts | e2e/fuzzy-search.spec.ts | "should work in grid view with fuzzy search" | ✅ Tested | |
| Table view search consistency | src/render/table.ts | e2e/fuzzy-search.spec.ts | "should work in table view with fuzzy search" | ✅ Tested | |
| Search placeholder text | index.html:321 | None | N/A | ❌ Not Tested | "Search..." placeholder |
| Search aria-label | index.html:321 | None | N/A | ❌ Not Tested | aria-label="Search CSS properties" |
| Search autocomplete off | index.html:322 | None | N/A | ❌ Not Tested | autocomplete="off" |
| Search spellcheck off | index.html:323 | None | N/A | ❌ Not Tested | spellcheck="false" |

---

## 3. Collection Pages (9 collections)

### 3.1 Collection Header

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Collection title rendering | src/render/collection.ts:176 | e2e/collections-visual.spec.ts | All collection tests | ✅ Tested | h1.category-title |
| Collection icon rendering | src/render/collection.ts:178 | None | N/A | ❌ Not Tested | SVG icon in header |
| Collection description | src/render/collection.ts:181 | None | N/A | ❌ Not Tested | p.category-desc |
| Collection color theming | src/render/collection.ts:165 | e2e/collections-visual.spec.ts | Multiple tests | ✅ Tested | --category-color CSS var |
| Back to all button | src/render/collection.ts:171 | None | N/A | ❌ Not Tested | onclick="location.hash=''" |

### 3.2 Meta Themes (Visual Effects)

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Flexbox stretch/flow theme | src/data/collections.ts:125-219 | e2e/collections-visual.spec.ts | "Flexbox collection renders stretch and flow theme" | ✅ Tested | layout-flexbox class, gradient bg |
| Grid blueprint toggle | src/data/collections.ts:345-411 | e2e/collections-visual.spec.ts | "Grid collection renders blueprint toggle and layout" | ✅ Tested | show-grid-overlay class |
| Grid annotations (3 markers) | src/render/collection.ts:86-101 | e2e/collections-visual.spec.ts | "Grid collection renders blueprint toggle and layout" | ✅ Tested | .annotation-marker count |
| Typography drop cap style | src/data/collections.ts:446-588 | e2e/collections-visual.spec.ts | "Typography collection renders magazine style" | ✅ Tested | ::first-letter styling |
| Typography multi-column list | src/data/collections.ts:446-588 | e2e/collections-visual.spec.ts | "Typography collection renders magazine style" | ✅ Tested | column-count > 1 |
| Animation play/pause toggle | src/data/collections.ts:589-741 | e2e/collections-visual.spec.ts | "Animation collection renders play/pause toggle" | ✅ Tested | global-animation-paused class |
| Color contrast badges | src/data/collections.ts:742-877 | e2e/collections-visual.spec.ts | "Color collection renders contrast badges" | ✅ Tested | .contrast-badge, WCAG AAA |
| Interactivity mouse-follow effect | src/main.ts:186-218 | e2e/collections-visual.spec.ts | "Interactivity collection renders sticky layers" | ✅ Tested | layout-layout class, --mouse-x/y |
| Layout sketch/hand-drawn effects | src/data/collections.ts:878-1023 | e2e/collections-visual.spec.ts | "Interactivity collection renders sticky layers" | ✅ Tested | interactivity-layer sticky |
| Box Model visualizer | src/data/collections.ts:1167-1310 | e2e/collections-visual.spec.ts | "Box Model collection renders visual wrappers" | ✅ Tested | .box-model-visualizer-wrap |
| Box Model margin/padding labels | src/render/collection.ts | e2e/collections-visual.spec.ts | "Box Model collection renders visual wrappers" | ✅ Tested | .box-margin-label |

### 3.3 Collection Content Sections

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Intro text (drop cap for Typography) | src/render/collection.ts:154 | e2e/collections-visual.spec.ts | "Typography collection renders magazine style" | ✅ Tested | .intro-text class |
| Learning objectives list | src/render/collection.ts:230-237 | None | N/A | ❌ Not Tested | .learning-goals section |
| Key concepts pills | src/render/collection.ts:216-226 | None | N/A | ❌ Not Tested | .concepts-pills |
| Strengths/weaknesses cards | src/render/collection.ts:103-122 | None | N/A | ❌ Not Tested | .strengths-box, .weaknesses-box |
| Anti-examples (Do & Don't) | src/render/collection.ts:124-149 | None | N/A | ❌ Not Tested | .anti-examples-grid |
| When to use section | src/data/collections.ts | None | N/A | ❌ Not Tested | useCases data field |
| Common mistakes section | src/data/collections.ts | None | N/A | ❌ Not Tested | commonMistakes data field |
| Difficulty indicator | src/data/collections.ts | None | N/A | ❌ Not Tested | difficulty field |
| Estimated time | src/data/collections.ts | None | N/A | ❌ Not Tested | estimatedTime field |
| Prerequisites | src/data/collections.ts | None | N/A | ❌ Not Tested | prerequisites field |
| Quick examples (collapsible) | src/render/collection.ts:250-269 | None | N/A | ❌ Not Tested | .quick-examples details |
| Related collections sidebar | src/render/collection.ts:229-271 | None | N/A | ❌ Not Tested | .collection-sidebar |
| Properties reference section | src/render/collection.ts:276-299 | None | N/A | ❌ Not Tested | .properties-list |
| Individual property sections | src/render/collection.ts:8-71 | None | N/A | ❌ Not Tested | .property-section |
| Property default values | src/render/collection.ts:39-47 | None | N/A | ❌ Not Tested | .property-default |
| Property syntax display | src/render/collection.ts:66-68 | None | N/A | ❌ Not Tested | .property-syntax |
| Property values list | src/render/collection.ts:53-64 | None | N/A | ❌ Not Tested | .property-values |
| Property MDN links | src/render/collection.ts:33 | None | N/A | ❌ Not Tested | .property-mdn-link |

---

## 4. Detail View (Individual Property Pages)

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Detail view renders on click | src/render/detail.ts:123-137 | e2e/detail-view.spec.ts | "detail view shows content when clicking a card" | ✅ Tested | #detail-view visible |
| Detail view - property name | src/render/detail.ts:75 | e2e/detail-view.spec.ts | Multiple tests | ✅ Tested | .detail-name |
| Detail view - category badge | src/render/detail.ts:77 | e2e/detail-view.spec.ts | "detail view shows all expected sections" | ✅ Tested | .cat-badge |
| Detail view - availability badge | src/render/detail.ts:78 | e2e/detail-view.spec.ts | "detail view shows all expected sections" | ✅ Tested | .availability-badge |
| Detail view - description | src/render/detail.ts:86-88 | e2e/detail-view.spec.ts | "detail view shows all expected sections" | ✅ Tested | .detail-desc |
| Detail view - syntax section | src/render/detail.ts:100-104 | e2e/detail-view.spec.ts | "detail view shows all expected sections" | ✅ Tested | .syntax-block |
| Detail view - browser support | src/render/detail.ts:105-108 | e2e/detail-view.spec.ts | "detail view shows all expected sections" | ✅ Tested | .detail-browsers |
| Detail view - browser icons (4) | src/render/detail.ts:107 | e2e/detail-view.spec.ts | "detail view shows all expected sections" | ✅ Tested | .detail-b count = 4 |
| Detail view - MDN link | src/render/detail.ts:111 | e2e/detail-view.spec.ts | "detail view shows all expected sections" | ✅ Tested | .mdn-link href |
| Detail view - Can I Use link | src/render/detail.ts:110 | None | N/A | ❌ Not Tested | .caniuse-link |
| Detail view - related properties | src/render/detail.ts:47-66 | e2e/detail-view.spec.ts | "detail view shows all expected sections" | ✅ Tested | .related-props |
| Detail view - values section | src/render/detail.ts:33-45, 89-98 | e2e/detail-view.spec.ts | "detail view shows all expected sections" | ✅ Tested | .values-grid |
| Detail view - back button | src/render/detail.ts:70-73 | e2e/detail-view.spec.ts | Multiple tests | ✅ Tested | .back-btn |
| Detail view - demo stage | src/render/detail.ts:81-84 | e2e/detail-view.spec.ts | Multiple tests | ✅ Tested | .detail-demo-stage |
| Detail view - demo label | src/render/detail.ts:83 | e2e/detail-view.spec.ts | "detail view shows all expected sections" | ✅ Tested | .detail-demo-label |
| Detail view - styling/background | src/render/detail.ts | e2e/detail-view.spec.ts | "detail view has proper styling and background" | ✅ Tested | Computed styles |
| Detail view - min-height | src/render/detail.ts | e2e/detail-view.spec.ts | "detail view has proper styling and background" | ✅ Tested | min-height > 0 |
| Copy CSS button (syntax) | src/render/detail.ts:102 | None | N/A | ❌ Not Tested | .copy-btn in syntax |
| Copy CSS toast/feedback | src/render/detail.ts:102 | None | N/A | ❌ Not Tested | Checkmark icon change |
| Navigation between properties | src/render/detail.ts | e2e/detail-view.spec.ts | "navigating between different properties works" | ✅ Tested | Hash change |
| Escape closes detail view | src/render/detail.ts | e2e/detail-view.spec.ts, e2e/app.spec.ts | Multiple tests | ✅ Tested | |
| Invalid property handling | src/render/detail.ts:27-29 | e2e/detail-view.spec.ts | "invalid property hash shows empty but visible detail view" | ✅ Tested | Empty detail-wrap |
| Table row click opens detail | src/render/table.ts:133-148 | e2e/detail-view.spec.ts | "table view navigation to detail works" | ✅ Tested | |
| Card click opens detail | src/render/grid.ts:57-65 | e2e/app.spec.ts | "can open detail view" | ✅ Tested | |

---

## 5. Footer / Reference Table (Home Page)

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Property table rendering | src/render/table.ts:169-239 | e2e/render.spec.ts | "CSS Ref renders cards" (table) | ✅ Tested | #table-view |
| Table initial batch (30 rows) | src/render/table.ts:198 | e2e/infinite-scroll.spec.ts | "table view shows initial batch of 30 rows" | ✅ Tested | |
| Infinite scroll - sentinel | src/render/table.ts:244-307 | e2e/infinite-scroll.spec.ts | "scrolling to bottom loads more rows" | ✅ Tested | #table-sentinel |
| Infinite scroll - load more | src/render/table.ts:244-307 | e2e/infinite-scroll.spec.ts | "scrolling to bottom loads more rows" | ✅ Tested | |
| Infinite scroll - all data loaded | src/render/table.ts:244-307 | e2e/infinite-scroll.spec.ts | "loading all data hides sentinel" | ✅ Tested | Sentinel hidden |
| Table sorting - property name | src/render/table.ts:97-119 | None | N/A | ❌ Not Tested | data-sort="prop-name" |
| Table sorting - category | src/render/table.ts:97-119 | None | N/A | ❌ Not Tested | data-sort="prop-category" |
| Table sorting - support | src/render/table.ts:97-119 | None | N/A | ❌ Not Tested | data-sort="prop-support-sort" |
| Table sort indicators (asc/desc) | src/render/table.ts:49-58 | None | N/A | ❌ Not Tested | .asc, .desc classes |
| Table view/card view toggle | index.html:743-755 | e2e/app.spec.ts | "can switch to table view" | ✅ Tested | .view-switch |
| Table filtered count consistency | src/render/table.ts | e2e/infinite-scroll.spec.ts | "table and grid views show same filtered count" | ✅ Tested | |
| Table with category filter | src/render/table.ts | e2e/infinite-scroll.spec.ts | "infinite scroll works with category filter" | ✅ Tested | |
| Table with search filter | src/render/table.ts | e2e/infinite-scroll.spec.ts | "infinite scroll works with search filter" | ✅ Tested | |
| Switch views maintains state | src/render/table.ts, src/render/grid.ts | e2e/infinite-scroll.spec.ts | "switching views maintains table functionality" | ✅ Tested | |
| Sentinel auto-load (short viewport) | src/render/table.ts:228-238 | e2e/infinite-scroll.spec.ts | "sentinel visibility triggers loading without scroll on short viewport" | ✅ Tested | |
| Property counter | index.html:1213-1217 | None | N/A | ❌ Not Tested | .property-counter |
| Card grid view rendering | src/render/grid.ts | e2e/render.spec.ts | "CSS Ref renders cards" | ✅ Tested | .card elements |
| Card grid - enter animation | src/render/grid.ts:35, 70-79 | None | N/A | ❌ Not Tested | .enter-fade class |
| Card grid - category badge | src/render/grid.ts:39 | None | N/A | ❌ Not Tested | .cat-badge on card |
| Card grid - browser badges | src/render/grid.ts:51 | None | N/A | ❌ Not Tested | .browser-badges |
| Card grid - availability badge | src/render/grid.ts:52 | None | N/A | ❌ Not Tested | .availability-badge |
| Card name overflow handling | src/render/grid.ts:72-78 | None | N/A | ❌ Not Tested | .overflow class |
| Grid empty state | src/render/grid.ts:24 | e2e/fuzzy-search.spec.ts | "should show no results for non-matching query" | ✅ Tested | .empty class |
| Sticky header | index.html:173 | None | N/A | ❌ Not Tested | position:sticky |
| FCP spinner | index.html:1112-1117 | None | N/A | ❌ Not Tested | #fcp-spinner |

---

## 6. Visual Effects & Animations

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Meta-theme CSS classes | src/render/collection.ts:164 | e2e/collections-visual.spec.ts | All collection visual tests | ✅ Tested | layout-{slug} |
| Interactivity mouse-follow | src/main.ts:186-218 | e2e/collections-visual.spec.ts | "Interactivity collection renders sticky layers" | ✅ Tested | --mouse-x, --mouse-y |
| Typography drop cap | src/data/collections.ts | e2e/collections-visual.spec.ts | "Typography collection renders magazine style" | ✅ Tested | ::first-letter |
| Grid blueprint overlay | src/data/collections.ts | e2e/collections-visual.spec.ts | "Grid collection renders blueprint toggle and layout" | ✅ Tested | .grid-visualizer-toggle |
| Animation play/pause | src/data/collections.ts | e2e/collections-visual.spec.ts | "Animation collection renders play/pause toggle" | ✅ Tested | .animation-play-pause-toggle |
| Color contrast badges | src/data/collections.ts | e2e/collections-visual.spec.ts | "Color collection renders contrast badges" | ✅ Tested | .contrast-badge |
| Box Model visualizer wrappers | src/data/collections.ts | e2e/collections-visual.spec.ts | "Box Model collection renders visual wrappers" | ✅ Tested | .box-*-label |
| Flexbox gradient background | src/data/collections.ts:125 | e2e/collections-visual.spec.ts | "Flexbox collection renders stretch and flow theme" | ✅ Tested | background-image gradient |
| Flexbox dynamic indicators | src/data/collections.ts:125 | e2e/collections-visual.spec.ts | "Flexbox collection renders stretch and flow theme" | ✅ Tested | ::after content "↔" |
| Card enter animations | src/render/grid.ts:35 | None | N/A | ❌ Not Tested | --ca, --delay CSS vars |
| Scroll-triggered reveals | None (CSS only) | None | N/A | ❌ Not Tested | CSS animations |
| Animated transitions (general) | index.html (CSS) | None | N/A | ❌ Not Tested | Various transitions |
| Demo stage animations | Various interactive demos | e2e/interactive-demos-full.spec.ts | "Interactive controls work" | ✅ Tested | hover effects |

---

## 7. Interactive Demos (Collection Pages)

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Flexbox demo renders | src/data/collections.ts:125-219 | e2e/interactive-demos.spec.ts | "flexbox collection renders demo" | ✅ Tested | "Flex Playground" |
| Grid demo renders | src/data/collections.ts:345-411 | e2e/interactive-demos.spec.ts | "grid collection renders demo" | ✅ Tested | "Landing Page Builder" |
| Typography demo renders | src/data/collections.ts:446-588 | e2e/interactive-demos.spec.ts | "typography collection renders demo" | ✅ Tested | "Text Lab" |
| Animation demo renders | src/data/collections.ts:589-741 | e2e/interactive-demos.spec.ts | "animation collection renders demo" | ✅ Tested | "Animation Playground" |
| Color demo renders | src/data/collections.ts:742-877 | e2e/interactive-demos.spec.ts | "color collection renders demo" | ✅ Tested | "Theme Builder" |
| Layout demo renders | src/data/collections.ts:878-1023 | e2e/interactive-demos.spec.ts | "layout collection renders demo" | ✅ Tested | "Position Demo" |
| Backgrounds demo renders | src/data/collections.ts:1024-1134 | e2e/interactive-demos.spec.ts | "backgrounds collection renders demo" | ✅ Tested | "Hero Gallery" |
| Box Model demo renders | src/data/collections.ts:1167-1277 | e2e/interactive-demos.spec.ts | "box-model collection renders demo" | ✅ Tested | "Box Visualizer" |
| Transitions demo renders | src/data/collections.ts:1310-1420 | e2e/interactive-demos.spec.ts | "transitions collection renders demo" | ✅ Tested | "Micro-interaction Lab" |
| Flexbox controls render (12 buttons) | src/data/collections.ts:125-219 | e2e/interactive-demos-full.spec.ts | "Flexbox: Renders all controls" | ✅ Tested | Direction, alignment, wrap buttons |
| Flexbox gap sliders (5) | src/data/collections.ts:125-219 | e2e/interactive-demos-full.spec.ts | "Flexbox: Renders all controls" | ✅ Tested | input[type="range"] |
| Flexbox item count +/- | src/data/collections.ts:125-219 | e2e/interactive-demos-full.spec.ts | "Flexbox: Renders all controls" | ✅ Tested | − and + buttons |
| Flexbox code toggle | src/data/collections.ts:125-219 | e2e/interactive-demos-full.spec.ts | "Flexbox: Renders all controls" | ✅ Tested | .demo-code-toggle |
| Flexbox copy button | src/data/collections.ts:125-219 | e2e/interactive-demos-full.spec.ts | "Flexbox: Renders all controls" | ✅ Tested | .demo-copy-btn |
| Flexbox interactive controls work | src/data/collections.ts:125-219 | e2e/interactive-demos-full.spec.ts | "Flexbox: Interactive controls work" | ✅ Tested | Click, slider, gap |
| Flexbox code panel toggle | src/data/collections.ts:125-219 | e2e/interactive-demos-full.spec.ts | "Flexbox: Code panel toggles and copies" | ✅ Tested | $showCode toggle |
| Flexbox copy CSS works | src/data/collections.ts:125-219 | e2e/interactive-demos-full.spec.ts | "Flexbox: Code panel toggles and copies" | ✅ Tested | copyDemoCSS called |
| Grid controls render (4 buttons) | src/data/collections.ts:345-411 | e2e/interactive-demos-full.spec.ts | "Grid: Renders all controls" | ✅ Tested | Layout type buttons |
| Grid interactive controls work | src/data/collections.ts:345-411 | e2e/interactive-demos-full.spec.ts | "Grid: Interactive controls work" | ✅ Tested | Hero, gap, items |
| Typography controls render | src/data/collections.ts:446-588 | e2e/interactive-demos-full.spec.ts | "Typography: Renders all controls" | ✅ Tested | Font, size, line-height, weight, align |
| Typography interactive controls | src/data/collections.ts:446-588 | e2e/interactive-demos-full.spec.ts | "Typography: Interactive controls work" | ✅ Tested | All controls |
| Animation controls render | src/data/collections.ts:589-741 | e2e/interactive-demos-full.spec.ts | "Animation: Renders all controls" | ✅ Tested | Presets, duration, timing, iterations |
| Animation interactive controls | src/data/collections.ts:589-741 | e2e/interactive-demos-full.spec.ts | "Animation: Interactive controls work" | ✅ Tested | All animation props |
| Color controls render | src/data/collections.ts:742-877 | e2e/interactive-demos-full.spec.ts | "Color: Renders all controls" | ✅ Tested | Presets, opacity, color pickers |
| Color interactive controls | src/data/collections.ts:742-877 | e2e/interactive-demos-full.spec.ts | "Color: Interactive controls work" | ✅ Tested | All color props |
| Color reset button | src/data/collections.ts:742-877 | e2e/interactive-demos-full.spec.ts | "Color: Interactive controls work" | ✅ Tested | Reset button |
| Layout controls render | src/data/collections.ts:878-1023 | e2e/interactive-demos-full.spec.ts | "Layout: Renders all controls" | ✅ Tested | Position, top, left sliders |
| Layout interactive controls | src/data/collections.ts:878-1023 | e2e/interactive-demos-full.spec.ts | "Layout: Interactive controls work" | ✅ Tested | Position change |
| Backgrounds controls render | src/data/collections.ts:1024-1134 | e2e/interactive-demos-full.spec.ts | "Backgrounds: Renders all controls" | ✅ Tested | Mode, size, position, repeat |
| Backgrounds interactive controls | src/data/collections.ts:1024-1134 | e2e/interactive-demos-full.spec.ts | "Backgrounds: Interactive controls work" | ✅ Tested | All bg props |
| Box Model controls render | src/data/collections.ts:1167-1277 | e2e/interactive-demos-full.spec.ts | "Box Model: Renders all controls" | ✅ Tested | Margin, padding, border sliders |
| Box Model interactive controls | src/data/collections.ts:1167-1277 | e2e/interactive-demos-full.spec.ts | "Box Model: Interactive controls work" | ✅ Tested | All box props |
| Box Model reset button | src/data/collections.ts:1167-1277 | e2e/interactive-demos-full.spec.ts | "Box Model: Interactive controls work" | ✅ Tested | Reset button |
| Transitions controls render | src/data/collections.ts:1310-1420 | e2e/interactive-demos-full.spec.ts | "Transitions: Renders all controls" | ✅ Tested | Property, duration, timing |
| Transitions interactive controls | src/data/collections.ts:1310-1420 | e2e/interactive-demos-full.spec.ts | "Transitions: Interactive controls work" | ✅ Tested | Hover effect |
| Demo button click (overlay bug fix) | src/data/collections.ts | e2e/interactive-demos.spec.ts | "flexbox demo button click works" | ✅ Tested | No force click needed |
| window.copyDemoCSS function | src/main.ts:40-51 | e2e/interactive-demos-full.spec.ts | All "Code panel toggles and copies" | ✅ Tested | Clipboard API |

---

## 8. Clipboard & Utilities

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Copy Demo CSS (interactive demos) | src/main.ts:40-51 | e2e/interactive-demos-full.spec.ts | "Code panel toggles and copies" | ✅ Tested | window.copyDemoCSS |
| Copy syntax (detail view) | src/render/detail.ts:102 | None | N/A | ❌ Not Tested | .copy-btn in detail |
| Clipboard API with fallback | src/main.ts:40-51 | None | N/A | ❌ Not Tested | textarea execCommand fallback |
| window.flexboxCSS function | src/main.ts:134-135 | e2e/interactive-demos-full.spec.ts | "Flexbox: Code panel toggles and copies" | ✅ Tested | |
| window.typographyCSS function | src/main.ts:137-138 | e2e/interactive-demos-full.spec.ts | "Typography: Code panel toggles and copies" | ✅ Tested | |
| window.transitionsCSS function | src/main.ts:140-141 | e2e/interactive-demos-full.spec.ts | "Transitions: Code panel toggles and copies" | ✅ Tested | |
| window.colorCSS function | src/main.ts:143-144 | e2e/interactive-demos-full.spec.ts | "Color: Code panel toggles and copies" | ✅ Tested | |
| window.gridCSS function | src/main.ts:146-154 | e2e/interactive-demos-full.spec.ts | "Grid: Code panel toggles and copies" | ✅ Tested | |
| window.layoutCSS function | src/main.ts:156-161 | e2e/interactive-demos-full.spec.ts | "Layout: Code panel toggles and copies" | ✅ Tested | |
| window.boxModelCSS function | src/main.ts:163-164 | e2e/interactive-demos-full.spec.ts | "Box Model: Code panel toggles and copies" | ✅ Tested | |
| window.animationCSS function | src/main.ts:166-167 | e2e/interactive-demos-full.spec.ts | "Animation: Code panel toggles and copies" | ✅ Tested | |
| window.backgroundsCSS function | src/main.ts:169-170 | e2e/interactive-demos-full.spec.ts | "Backgrounds: Code panel toggles and copies" | ✅ Tested | |
| window.bgValue helper | src/main.ts:172-180 | e2e/interactive-demos-full.spec.ts | "Backgrounds: Interactive controls work" | ✅ Tested | Mode mapping |
| Copy button toast/feedback | src/render/detail.ts:102 | None | N/A | ❌ Not Tested | Icon changes to checkmark |

---

## 9. Accessibility & UX

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Escape key closes popups | index.html:99, 1205 | e2e/app.spec.ts, e2e/detail-view.spec.ts | Multiple tests | ✅ Tested | Global Escape handler |
| Escape key closes detail | index.html:1205 | e2e/detail-view.spec.ts | "escape key closes detail view" | ✅ Tested | |
| View mode toggle (grid/table) | index.html:743-755 | e2e/app.spec.ts | "can switch to table view" | ✅ Tested | .view-switch |
| Theme toggle (dark/light) | index.html:757-770 | None | N/A | ❌ Not Tested | .view-switch for theme |
| Mobile sidebar toggle | index.html:779-892 | e2e/dropdown.spec.ts | "hamburger menu toggles sidebar" | ✅ Tested | .hamburger click |
| Mobile sidebar overlay close | index.html:779 | e2e/dropdown.spec.ts | "clicking overlay closes mobile sidebar" | ✅ Tested | .sidebar-overlay click |
| Mobile sidebar close button | index.html:786 | e2e/dropdown.spec.ts | "close button closes mobile sidebar" | ✅ Tested | .sidebar-close click |
| Sidebar collections dropdown | index.html:832-887 | e2e/dropdown.spec.ts | "Sidebar Collections Dropdown" tests | ✅ Tested | |
| Aria-expanded on dropdowns | index.html:344, 578, 672 | e2e/dropdown.spec.ts | "dropdown aria-expanded attribute updates correctly" | ✅ Tested | |
| Aria-haspopup on dropdowns | index.html:229, 345, 579 | None | N/A | ❌ Not Tested | role="listbox" |
| Aria-label on search | index.html:321 | None | N/A | ❌ Not Tested | aria-label="Search CSS properties" |
| Aria-label on buttons | index.html:179, 190 | None | N/A | ❌ Not Tested | aria-label attributes |
| Focus styles | CSS (various) | None | N/A | ❌ Not Tested | :focus styles |
| Responsive design (mobile) | CSS (media queries) | e2e/fuzzy-search.spec.ts | Mobile tests | ✅ Tested | viewport 375x667 |
| Desktop search hidden on mobile | index.html:219-738 | None | N/A | ❌ Not Tested | .desktop-search vs mobile |
| Mobile command palette | index.html:898-1105 | e2e/dropdown.spec.ts | Mobile command palette tests | ✅ Tested | |
| Skip to content/keyboard nav | None | None | N/A | ❌ Not Tested | No skip link found |
| High contrast mode support | CSS | None | N/A | ❌ Not Tested | No prefers-contrast |
| Reduced motion support | CSS | None | N/A | ❌ Not Tested | No prefers-reduced-motion |

---

## 10. Error Handling & Edge Cases

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Empty search results | src/render/grid.ts:23-24 | e2e/fuzzy-search.spec.ts | "should show no results for non-matching query" | ✅ Tested | .empty div |
| Invalid property hash | src/render/detail.ts:27-29 | e2e/detail-view.spec.ts | "invalid property hash shows empty but visible detail view" | ✅ Tested | Empty detail-wrap |
| Invalid collection hash | src/render/collection.ts:311-314 | None | N/A | ❌ Not Tested | Clears view |
| Network failures (offline) | Service Worker | None | N/A | ❌ Not Tested | sw.js registered |
| Console error monitoring | None | e2e/dropdown.spec.ts | "no console errors when interacting with dropdowns" | ✅ Tested | Checks console.errors |
| List.js initialization | src/render/table.ts:207-223 | None | N/A | ❌ Not Tested | Error handling |
| Table empty state | src/render/table.ts:203 | e2e/fuzzy-search.spec.ts | "should show no results for non-matching query" | ✅ Tested | "No properties found" |
| Concurrent load protection | src/render/table.ts:245-307 | None | N/A | ❌ Not Tested | isLoadingMore flag |
| Hash without #! prefix | src/main.ts:17-20 | e2e/detail-view.spec.ts | "direct navigation via hash opens detail view" | ✅ Tested | /#display |
| Hash with #! prefix | src/main.ts:17-20 | e2e/dropdown.spec.ts | Collection routing | ✅ Tested | /#!flexbox |
| Empty collections data | src/render/collection.ts:311-314 | None | N/A | ❌ Not Tested | Guard clauses |
| Missing interactive demo | src/render/collection.ts:192-203 | None | N/A | ❌ Not Tested | interactiveDemo optional |

---

## 11. Service Worker & PWA Features

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Service Worker registration | index.html:1233-1238 | None | N/A | ❌ Not Tested | navigator.serviceWorker.register |
| Offline caching | dist/sw.js | None | N/A | ❌ Not Tested | Cache strategies |
| App shell architecture | index.html | None | N/A | ❌ Not Tested | Static shell |
| Preload critical assets | index.html:51-52 | None | N/A | ❌ Not Tested | <link rel="preload"> |
| DNS prefetch | index.html:60-61 | None | N/A | ❌ Not Tested | <link rel="dns-prefetch"> |
| Preconnect to origins | index.html:58-59 | None | N/A | ❌ Not Tested | <link rel="preconnect"> |
| Google Fonts async | index.html:63-67 | None | N/A | ❌ Not Tested | media="print" onload |

---

## 12. Miscellaneous Features

| Feature | Component | Tested In | Test Name | Status | Notes |
|---------|-----------|-----------|-----------|--------|-------|
| Datastar integration | index.html (data-* attributes) | e2e/*.spec.ts | All tests | ✅ Tested | Implicitly tested |
| List.js for table sorting | src/render/table.ts | e2e/infinite-scroll.spec.ts | Table tests | ✅ Tested | Implicitly tested |
| FCP optimization (critical CSS) | index.html:55 | None | N/A | ❌ Not Tested | Inlined CSS |
| Security CSP header | index.html:46 | None | N/A | ❌ Not Tested | Content-Security-Policy |
| JSON-LD structured data | index.html:23-43 | None | N/A | ❌ Not Tested | WebApplication schema |
| Open Graph meta tags | index.html:13-20 | None | N/A | ❌ Not Tested | og:* and twitter:* |
| Canonical URL | index.html:10 | None | N/A | ❌ Not Tested | rel="canonical" |
| Robots meta tag | index.html:9 | None | N/A | ❌ Not Tested | index, follow |
| SVG icon sprites | index.html:117-167 | None | N/A | ❌ Not Tested | Inline SVG symbols |
| Viewport meta tag | index.html:5 | None | N/A | ❌ Not Tested | width=device-width |

---

## Major Gaps Uncovered

### Critical Gaps (Should be tested):
1. **Table sorting** - No tests for clicking column headers to sort by name, category, or support
2. **Theme toggle** - Dark/light mode toggle not tested
3. **Copy buttons** - Detail view copy CSS button not tested
4. **Clipboard fallback** - textarea execCommand fallback not tested
5. **Service Worker** - Offline functionality not tested
6. **Invalid collection hash** - Navigating to non-existent collection
7. **Keyboard navigation** - Tab order, focus management
8. **Accessibility** - Aria labels, focus styles, screen reader support
9. **List.js error handling** - What happens when List.js fails to load
10. **Responsive design** - Tablet breakpoint (900px), various viewports

### Moderate Gaps (Nice to have):
1. **Property counter** - $filteredCount / $totalCount display
2. **Card animations** - Enter fade animation on grid cards
3. **Scroll-triggered reveals** - Any CSS scroll animations
4. **Skip links** - Keyboard accessibility
5. **High contrast/reduced motion** - prefers-contrast, prefers-reduced-motion
6. **SEO elements** - JSON-LD, Open Graph, canonical URL
7. **Security** - CSP header effectiveness
8. **FCP optimization** - Critical CSS inlining
9. **Preload/prefetch** - Resource hints working
10. **Collection content sections** - Learning objectives, strengths/weaknesses, anti-examples not verified in E2E

---

## Files Examined

### Source Files:
- index.html (1242 lines)
- src/main.ts (224 lines)
- src/render/collection.ts (335 lines)
- src/render/detail.ts (137 lines)
- src/render/table.ts (321 lines)
- src/render/grid.ts (80 lines)
- src/data/collections.ts (1454 lines)

### Test Files:
- e2e/app.spec.ts (55 lines)
- e2e/fuzzy-search.spec.ts (356 lines)
- e2e/detail-view.spec.ts (209 lines)
- e2e/dropdown.spec.ts (481 lines)
- e2e/infinite-scroll.spec.ts (151 lines)
- e2e/render.spec.ts (14 lines)
- e2e/interactive-demos.spec.ts (92 lines)
- e2e/interactive-demos-full.spec.ts (771 lines)
- e2e/collections-visual.spec.ts (118 lines)
- e2e/debug-demo.spec.ts (16 lines)

---

## Recommendations

1. **Add table sorting tests** - Test clicking each column header and verify sort indicators
2. **Add theme toggle test** - Click theme toggle and verify dark/light class on documentElement
3. **Add clipboard tests** - Mock clipboard API and verify copy buttons work
4. **Add keyboard navigation tests** - Tab through UI, verify focus states
5. **Add accessibility audit** - Use Playwright's accessibility testing or axe-core
6. **Add service worker tests** - Test offline functionality
7. **Add responsive tests** - Test at tablet (768px) and mobile (375px) breakpoints
8. **Add error handling tests** - Test invalid URLs, network failures
9. **Add collection content tests** - Verify learning objectives, strengths/weaknesses render
10. **Set up visual regression** - Consider Percy or Playwright screenshot comparisons
