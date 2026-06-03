export interface CollectionAnnotation {
  x: number; // percentage from left
  y: number; // percentage from top
  text: string;
  type: "strength" | "weakness" | "info";
}

export interface AntiExample {
  badCode: string;
  goodCode: string;
  explanation: string;
}

export interface CollectionMeta {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  intro: string;
  useCases: string[];
  concepts: string[];
  examples: CollectionExample[];
  related: string[];
  interactiveDemo?: string;
  learningObjectives?: string[];
  commonMistakes?: string[];
  whenToUse?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";
  estimatedTime?: string;
  prerequisites?: string[];
  strengths?: string[];
  weaknesses?: string[];
  annotations?: CollectionAnnotation[];
  antiExamples?: AntiExample[];
}

export interface CollectionExample {
  title: string;
  description: string;
  code: string;
  result?: string;
}

export const COLLECTIONS: Record<string, CollectionMeta> = {
  Flexbox: {
    id: "Flexbox",
    name: "Flexbox",
    slug: "flexbox",
    description: "A one-dimensional layout method for arranging items in rows or columns",
    icon: "ri-layout-row-line",
    color: "#8b5cf6",
    intro:
      "Flexbox (Flexible Box Layout) is a CSS layout module designed for one-dimensional layouts. It excels at distributing space along a single axis and aligning items within a container. Flexbox is perfect for navigation menus, card layouts, and centering content.",
    useCases: [
      "Navigation menus and toolbars",
      "Card grids with equal-height items",
      "Centering content both vertically and horizontally",
      "Form layouts with labels and inputs",
      "Media objects (image + text side by side)",
    ],
    concepts: [
      "Main axis: The primary direction items are laid out (horizontal by default)",
      "Cross axis: Perpendicular to the main axis (vertical by default)",
      "Flex container: The parent element with display: flex",
      "Flex item: Child elements that participate in flex layout",
      "Free space: Remaining space after items have their natural size",
    ],
    examples: [
      {
        title: "Perfect Centering",
        description:
          "The most common use case - centering an element both horizontally and vertically within its container.",
        code: `.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`,
      },
      {
        title: "Navigation Bar",
        description: "A responsive navigation bar with logo on left and links on right.",
        code: `.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}`,
      },
      {
        title: "Card Layout",
        description: "Equal-height cards that stretch to fill the container.",
        code: `.cards {
  display: flex;
  gap: 1rem;
}

.card {
  flex: 1;
  padding: 1.5rem;
}`,
      },
      {
        title: "Responsive Wrapping",
        description: "Items that wrap to multiple lines on smaller screens.",
        code: `.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.item {
  flex: 1 1 300px;
}`,
      },
    ],
    related: ["Grid", "Layout", "Spacing"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'nowrap', flexDirection: 'row', flexGap: 10, itemCount: 3, showCode: false }" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #c4b5fd; margin: 0; font-size: 14px; font-weight: 800;">Flexbox Playground</h4>
    <div style="display: flex; gap: 4px; align-items: center;">
      <button class="demo-control-btn demo-item-btn" data-on:click="$itemCount = Math.max(1, $itemCount - 1)" style="width: 28px; height: 28px; padding: 0; font-size: 16px;">−</button>
      <span style="color: #a78bfa; font-size: 12px; font-weight: 700; min-width: 50px; text-align: center;">$itemCount items</span>
      <button class="demo-control-btn demo-item-btn" data-on:click="$itemCount = Math.min(8, $itemCount + 1)" style="width: 28px; height: 28px; padding: 0; font-size: 16px;">+</button>
    </div>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$justifyContent = 'flex-start'" data-class:active="$justifyContent === 'flex-start'">flex-start</button>
    <button class="demo-control-btn" data-on:click="$justifyContent = 'center'" data-class:active="$justifyContent === 'center'">center</button>
    <button class="demo-control-btn" data-on:click="$justifyContent = 'space-between'" data-class:active="$justifyContent === 'space-between'">space-between</button>
    <button class="demo-control-btn" data-on:click="$justifyContent = 'space-around'" data-class:active="$justifyContent === 'space-around'">space-around</button>
    <button class="demo-control-btn" data-on:click="$alignItems = 'flex-start'" data-class:active="$alignItems === 'flex-start'" style="background: #7c3aed33">align-start</button>
    <button class="demo-control-btn" data-on:click="$alignItems = 'center'" data-class:active="$alignItems === 'center'" style="background: #7c3aed33">align-center</button>
    <button class="demo-control-btn" data-on:click="$flexWrap = 'wrap'" data-class:active="$flexWrap === 'wrap'" style="background: #9333ea33">wrap</button>
    <button class="demo-control-btn" data-on:click="$flexWrap = 'nowrap'" data-class:active="$flexWrap === 'nowrap'" style="background: #9333ea33">nowrap</button>
    <button class="demo-control-btn" data-on:click="$flexDirection = 'row'" data-class:active="$flexDirection === 'row'" style="background: #a855f733">row</button>
    <button class="demo-control-btn" data-on:click="$flexDirection = 'column'" data-class:active="$flexDirection === 'column'" style="background: #a855f733">column</button>
    <button class="demo-control-btn" data-on:click="$flexDirection = 'row-reverse'" data-class:active="$flexDirection === 'row-reverse'" style="background: #a855f733">row-reverse</button>
    <button class="demo-control-btn" data-on:click="$flexDirection = 'column-reverse'" data-class:active="$flexDirection === 'column-reverse'" style="background: #a855f733">column-reverse</button>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #c4b5fd; font-size: 12px; font-weight: 700;">Gap:</label>
    <input type="range" min="0" max="30" step="1" data-bind:flexGap style="width: 80px;">
  </div>
  <div class="demo-canvas-area" style="display: flex; height: 160px; border-color: #6366f1; border-width: 2px; border-style: dashed; border-radius: 12px;" data-style:justify-content="$justifyContent" data-style:align-items="$alignItems" data-style:flex-wrap="$flexWrap" data-style:flex-direction="$flexDirection" data-style:gap="$flexGap + 'px'">
    <div class="demo-item-box" data-class:hidden="$itemCount < 1" style="background: linear-gradient(135deg, #818cf8, #6366f1); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">1</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 2" style="background: linear-gradient(135deg, #a78bfa, #8b5cf6); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">2</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 3" style="background: linear-gradient(135deg, #c4b5fd, #a78bfa); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">3</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 4" style="background: linear-gradient(135deg, #e9d5ff, #c4b5fd); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">4</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 5" style="background: linear-gradient(135deg, #f472b6, #e879f9); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">5</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 6" style="background: linear-gradient(135deg, #fb7185, #f43f5e); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">6</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 7" style="background: linear-gradient(135deg, #67e8f9, #06b6d4); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">7</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 8" style="background: linear-gradient(135deg, #34d399, #10b981); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">8</div>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #c4b5fd; font-size: 12px; font-weight: 700;">Gap:</label>
    <input type="range" min="0" max="30" step="1" data-bind:flexGap style="width: 80px;">
  </div>
  <div class="demo-canvas-area" style="display: flex; height: 160px; border-color: #6366f1; border-width: 2px; border-style: dashed; border-radius: 12px;" data-style:justify-content="$justifyContent" data-style:align-items="$alignItems" data-style:flex-wrap="$flexWrap" data-style:flex-direction="$flexDirection" data-style:gap="$flexGap + 'px'">
    <div class="demo-item-box" data-class:hidden="$itemCount < 1" style="background: linear-gradient(135deg, #818cf8, #6366f1); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">1</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 2" style="background: linear-gradient(135deg, #a78bfa, #8b5cf6); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">2</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 3" style="background: linear-gradient(135deg, #c4b5fd, #a78bfa); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">3</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 4" style="background: linear-gradient(135deg, #e9d5ff, #c4b5fd); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">4</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 5" style="background: linear-gradient(135deg, #f472b6, #e879f9); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">5</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 6" style="background: linear-gradient(135deg, #fb7185, #f43f5e); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">6</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 7" style="background: linear-gradient(135deg, #67e8f9, #06b6d4); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">7</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 8" style="background: linear-gradient(135deg, #34d399, #10b981); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">8</div>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #c4b5fd; font-size: 12px; font-weight: 700;">Gap:</label>
    <input type="range" min="0" max="30" step="1" data-bind:flexGap style="width: 80px;">
    <span data-text="$flexGap + 'px'" style="color: #c4b5fd; font-size: 12px; font-weight: 700;"></span>
  </div>
  <div class="demo-canvas-area" style="display: flex; height: 160px; border-color: #6366f1; border-width: 2px; border-style: dashed; border-radius: 12px;" data-style:justify-content="$justifyContent" data-style:align-items="$alignItems" data-style:flex-wrap="$flexWrap" data-style:flex-direction="$flexDirection" data-style:gap="$flexGap + 'px'">
    <div class="demo-item-box" data-class:hidden="$itemCount < 1" style="background: linear-gradient(135deg, #818cf8, #6366f1); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">1</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 2" style="background: linear-gradient(135deg, #a78bfa, #8b5cf6); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">2</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 3" style="background: linear-gradient(135deg, #c4b5fd, #a78bfa); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">3</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 4" style="background: linear-gradient(135deg, #e9d5ff, #c4b5fd); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">4</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 5" style="background: linear-gradient(135deg, #f472b6, #e879f9); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">5</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 6" style="background: linear-gradient(135deg, #fb7185, #f43f5e); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">6</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 7" style="background: linear-gradient(135deg, #67e8f9, #06b6d4); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">7</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 8" style="background: linear-gradient(135deg, #34d399, #10b981); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">8</div>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #c4b5fd; font-size: 12px; font-weight: 700;">Gap:</label>
    <input type="range" min="0" max="30" step="1" data-bind:flexGap style="width: 80px;">
    <span data-text="$flexGap + 'px'" style="color: #c4b5fd; font-size: 12px; font-weight: 700; min-width: 50px; text-align: center;"></span>
  </div>
  <div class="demo-canvas-area" style="display: flex; height: 160px; border-color: #6366f1; border-width: 2px; border-style: dashed; border-radius: 12px;" data-style:justify-content="$justifyContent" data-style:align-items="$alignItems" data-style:flex-wrap="$flexWrap" data-style:flex-direction="$flexDirection" data-style:gap="$flexGap + 'px'">
    <div class="demo-item-box" data-class:hidden="$itemCount < 1" style="background: linear-gradient(135deg, #818cf8, #6366f1); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">1</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 2" style="background: linear-gradient(135deg, #a78bfa, #8b5cf6); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">2</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 3" style="background: linear-gradient(135deg, #c4b5fd, #a78bfa); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">3</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 4" style="background: linear-gradient(135deg, #e9d5ff, #c4b5fd); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">4</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 5" style="background: linear-gradient(135deg, #f472b6, #e879f9); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">5</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 6" style="background: linear-gradient(135deg, #fb7185, #f43f5e); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">6</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 7" style="background: linear-gradient(135deg, #67e8f9, #06b6d4); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">7</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 8" style="background: linear-gradient(135deg, #34d399, #10b981); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">8</div>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #c4b5fd; font-size: 12px; font-weight: 700;">Gap:</label>
    <input type="range" min="0" max="30" step="1" data-bind:flexGap style="width: 80px;">
    <span data-text="$flexGap + 'px'" style="color: #c4b5fd; font-size: 12px; font-weight: 700; min-width: 50px; text-align: center;"></span>
    </div>
    <div class="demo-code-panel" data-show="$showCode">
      <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
      <div>
        <pre><code data-text="window.flexboxCSS($flexDirection, $flexGap, $justifyContent, $alignItems, $flexWrap)"></code></pre>
        <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.flexboxCSS($flexDirection, $flexGap, $justifyContent, $alignItems, $flexWrap))">Copy</button>
      </div>
    </div>
  </div>
  </div>
</div>`,
    learningObjectives: [
      "Understand the difference between main axis and cross axis",
      "Learn how flex container and flex items work together",
      "Master alignment properties for precise positioning",
      "Control flex item sizing with flex-grow, flex-shrink, and flex-basis",
    ],
    commonMistakes: [
      "Forgetting that flex-direction defaults to 'row', not column",
      "Using justify-content for vertical alignment (use align-items instead)",
      "Not setting flex-wrap and getting unexpected overflow",
      "Confusing flex-basis with width — flex-basis can be overridden by width",
    ],
    whenToUse: [
      "Building navigation menus that space items evenly",
      "Creating card layouts where all cards should have equal height",
      "Centering content both horizontally and vertically",
      "Creating responsive layouts that adapt to different screen sizes",
    ],
    difficulty: "intermediate",
    estimatedTime: "1.5 hours",
    prerequisites: ["Basic CSS", "Understanding of block vs inline elements"],
    strengths: [
      "Intuitive 1D alignment (horizontal or vertical)",
      "Dynamic space distribution",
      "Perfect centering with minimal code",
      "Source order independence (with order property)",
    ],
    weaknesses: [
      "Limited 2D layout capabilities",
      "Can lead to nested 'div-soup' for complex layouts",
      "Items don't align across multiple rows easily",
    ],
    annotations: [],
    antiExamples: [
        {
        badCode: ".container { display: flex; }\n.item { margin-left: 50%; }",
        goodCode: ".container { display: flex; justify-content: center; }",
        explanation: "Use alignment properties instead of manual margins for layout.",
      },
    ],
  },
  Grid: {
    id: "Grid",
    name: "Grid",
    slug: "grid",
    description: "A two-dimensional layout system for creating complex web layouts",
    icon: "ri-layout-column-line",
    color: "#ec4899",
    intro:
      "CSS Grid Layout is a powerful two-dimensional layout system. Unlike Flexbox which works along a single axis, Grid lets you define both rows and columns simultaneously. It's perfect for page-level layouts, dashboards, and complex component designs.",
    useCases: [
      "Page layouts (header, sidebar, main content, footer)",
      "Photo galleries and image grids",
      "Dashboard layouts with multiple panels",
      "Complex form layouts",
      "Magazine-style layouts",
    ],
    concepts: [
      "Grid container: Parent element with display: grid",
      "Grid tracks: The rows and columns that define the layout structure",
      "Grid line: The dividing lines between adjacent tracks",
      "Grid cell: The intersection of a row and column track",
      "Grid area: A rectangular region defined by start and end grid lines",
    ],
    examples: [
      {
        title: "Page Layout",
        description: "Classic page structure with header, sidebar, main content, and footer.",
        code: `.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }`,
      },
      {
        title: "Photo Gallery",
        description: "A responsive image gallery that adapts to screen size.",
        code: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}`,
      },
      {
        title: "Holy Grail Layout",
        description: "The classic three-column layout with sticky footer.",
        code: `.container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
}`,
      },
      {
        title: "Dashboard Grid",
        description: "Dashboard with spanning cards of different sizes.",
        code: `.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 150px;
  gap: 1rem;
}

.card-wide { grid-column: span 2; }
.card-tall { grid-row: span 2; }
.card-large { grid-column: span 2; grid-row: span 2; }`,
      },
    ],
    related: ["Flexbox", "Layout", "Spacing"],
    interactiveDemo: `<div class="demo-playground-card" data-signals='{"gridItemCount":2,"layoutType":"classic","gridGap":8,"showCode":false}' style="background: linear-gradient(135deg, #831843 0%, #be185d 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #f9a8d4; margin: 0; font-size: 14px; font-weight: 800;">Grid Layout Builder</h4>
    <div style="display: flex; gap: 4px; align-items: center;">
      <button class="demo-control-btn demo-item-btn" data-on:click="$gridItemCount = Math.max(2, $gridItemCount - 1)" style="width: 28px; height: 28px; padding: 0; font-size: 16px;">−</button>
      <span style="color: #f9a8d4; font-size: 12px; font-weight: 700; min-width: 50px; text-align: center;">$gridItemCount × $gridItemCount</span>
      <button class="demo-control-btn demo-item-btn" data-on:click="$gridItemCount = Math.min(6, $gridItemCount + 1)" style="width: 28px; height: 28px; padding: 0; font-size: 16px;">+</button>
    </div>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$layoutType = 'classic'" data-class:active="$layoutType === 'classic'">Classic</button>
    <button class="demo-control-btn" data-on:click="$layoutType = 'hero'" data-class:active="$layoutType === 'hero'">Hero</button>
    <button class="demo-control-btn" data-on:click="$layoutType = 'dashboard'" data-class:active="$layoutType === 'dashboard'">Dashboard</button>
    <button class="demo-control-btn" data-on:click="$layoutType = 'gallery'" data-class:active="$layoutType === 'gallery'">Gallery</button>
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
  </div>
  <div class="demo-controls-row">
    <label style="color: #f9a8d4; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 8px;">Gap: <input type="range" min="0" max="24" step="2" data-bind:gridGap style="accent-color: #ec4899; width: 120px;"> <span data-text="$gridGap + 'px'"></span></label>
  </div>
  <div class="grid-demo demo-canvas-area" style="border-color: #ec4899; padding: 12px; border-radius: 12px; border-width: 2px; border-style: dashed;" data-attr:class="'grid-demo demo-canvas-area layout-class-' + $layoutType" data-style:gap="$gridGap + 'px'">
    <div class="grid-item item-header" data-class:hidden="$layoutType === 'gallery'">Header</div>
    <div class="grid-item item-sidebar" data-class:hidden="$layoutType === 'gallery' || $layoutType === 'hero'">Sidebar</div>
    <div class="grid-item item-main" data-class:hidden="$layoutType === 'gallery'">Main Content</div>
    <div class="grid-item item-footer" data-class:hidden="$layoutType === 'gallery'">Footer</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 1 || $layoutType !== 'gallery'" style="--i: 1;">1</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 2 || $layoutType !== 'gallery'" style="--i: 2;">2</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 3 || $layoutType !== 'gallery'" style="--i: 3;">3</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 4 || $layoutType !== 'gallery'" style="--i: 4;">4</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 5 || $layoutType !== 'gallery'" style="--i: 5;">5</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 6 || $layoutType !== 'gallery'" style="--i: 6;">6</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 7 || $layoutType !== 'gallery'" style="--i: 7;">7</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 8 || $layoutType !== 'gallery'" style="--i: 8;">8</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 9 || $layoutType !== 'gallery'" style="--i: 9;">9</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 10 || $layoutType !== 'gallery'" style="--i: 10;">10</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 11 || $layoutType !== 'gallery'" style="--i: 11;">11</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 12 || $layoutType !== 'gallery'" style="--i: 12;">12</div>
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <pre><code data-text="window.gridCSS($layoutType, $gridGap)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.gridCSS($layoutType, $gridGap))">Copy</button>
  </div>
  <style>
    .grid-demo { display: grid; height: 160px; border-radius: 8px; overflow: hidden; border: none; }
    .grid-demo.layout-class-classic { grid-template-columns: 200px 1fr; grid-template-rows: 50px 1fr 50px; }
    .grid-demo.layout-class-hero { grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; }
    .grid-demo.layout-class-dashboard { grid-template-columns: repeat(3, 1fr); grid-template-rows: 1fr 1fr; }
    .grid-demo.layout-class-gallery { grid-template-columns: repeat(auto-fill, minmax(50px, 1fr)); grid-auto-rows: 50px; }
    .item-header { grid-area: 1 / 1 / 2 / 3; }
    .item-sidebar { grid-area: 2 / 1 / 3 / 2; }
    .item-main { grid-area: 2 / 2 / 3 / 3; }
    .item-footer { grid-area: 3 / 1 / 4 / 3; }
    .layout-class-hero .item-sidebar { display: none; }
    .layout-class-hero .item-main { grid-area: 2 / 1 / 3 / 2; }
    .layout-class-hero .item-footer { grid-area: 3 / 1 / 4 / 2; }
    .layout-class-dashboard .item-header { grid-area: 1 / 2 / 2 / 4; }
    .layout-class-dashboard .item-sidebar { grid-area: 1 / 1 / 3 / 2; }
    .layout-class-dashboard .item-main { grid-area: 2 / 2 / 3 / 4; }
    .layout-class-dashboard .item-footer { display: none; }
    .grid-item { display: flex; align-items: center; padding: 0 16px; font-weight: 800; font-size: 12px; text-transform: uppercase; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .item-header { background: linear-gradient(135deg, #f472b6, #ec4899); color: white; border-radius: 6px; }
    .item-sidebar { background: linear-gradient(135deg, #fbcfe8, #f9a8d4); color: #831843; border-radius: 6px; }
    .item-main { background: linear-gradient(135deg, #fdf2f8, #fce7f3); color: #be185d; justify-content: center; border-radius: 6px; }
    .item-footer { background: linear-gradient(135deg, #f9a8d4, #f472b6); color: white; border-radius: 6px; }
    .grid-gallery-item { display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: white; background: linear-gradient(135deg, hsl(calc(360 / 12 * var(--i)), hsl(calc(360 / 12 * var(--i) - 30deg))); border-radius: 8px; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .grid-gallery-item:hover { transform: scale(1.05); box-shadow: 0 8px 20px rgba(0,0,0,0.25); }
  </style>
</div>`,
    learningObjectives: [
      "Understand the difference between explicit and implicit grids",
      "Learn to use grid-template-columns and grid-template-rows effectively",
      "Master grid-area and grid-template-areas for complex layouts",
      "Control grid placement with line-based positioning",
    ],
    commonMistakes: [
      "Forgetting to set grid-template-columns, resulting in a single column",
      "Confusing grid gap with margin — gaps only apply between grid cells",
      "Not using fr units and relying on fixed widths that don't adapt",
      "Creating rigid grids that break on smaller screens",
    ],
    whenToUse: [
      "Building complex page layouts with headers, sidebars, and footers",
      "Creating photo galleries or card grids",
      "Designing dashboard layouts with multiple panels",
      "When you need precise control over both rows and columns",
    ],
    difficulty: "intermediate",
    estimatedTime: "2 hours",
    prerequisites: ["Basic CSS", "Understanding of the box model"],
    strengths: [
      "Full 2D control (rows and columns simultaneously)",
      "Area-based layouts are extremely readable",
      "Eliminates need for nested wrapper divs",
      "Precise alignment across multiple elements",
    ],
    weaknesses: [
      "Higher learning curve than Flexbox",
      "Overkill for simple 1D alignment",
      "Older browser support required polyfills (historically)",
    ],
    annotations: [],
  },
  Typography: {
    id: "Typography",
    name: "Typography",
    slug: "typography",
    description: "Properties for controlling text appearance, fonts, and readability",
    icon: "ri-font-size",
    color: "#14b8a6",
    intro:
      "Typography in CSS encompasses everything about how text is displayed. Good typography is crucial for readability, accessibility, and visual hierarchy. CSS provides extensive control over font selection, sizing, spacing, and text effects.",
    useCases: [
      "Setting up a design system's type scale",
      "Creating readable body text with optimal line length",
      "Implementing custom fonts from Google Fonts or custom sources",
      "Styling headings with consistent hierarchy",
      "Text effects like shadows and decoration",
    ],
    concepts: [
      "Font family: The typeface or list of typefaces to use",
      "Font size: The visual size of text, affecting readability",
      "Line height: The vertical space between lines of text",
      "Text alignment: How text is positioned horizontally",
      "Web fonts: Custom fonts loaded via @font-face",
    ],
    examples: [
      {
        title: "Readable Body Text",
        description: "Optimal line length and line height for comfortable reading.",
        code: `.article {
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 65ch;
}`,
      },
      {
        title: "Type Scale",
        description: "A harmonious scale for headings using CSS custom properties.",
        code: `:root {
  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: 1.563rem;
  --step-3: 1.953rem;
}

h1 { font-size: var(--step-3); }
h2 { font-size: var(--step-2); }
h3 { font-size: var(--step-1); }
body { font-size: var(--step-0); }`,
      },
      {
        title: "Google Fonts",
        description: "Importing and applying a custom font.",
        code: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

h1, h2, h3 {
  font-weight: 700;
}`,
      },
      {
        title: "Text Effects",
        description: "Text shadows and styling for visual impact.",
        code: `.title {
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}`,
      },
    ],
    related: ["Color", "Visual", "Spacing"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ fontFamily: "'Georgia', serif", fontSize: '24px', lineHeight: '1.6', letterSpacing: '0px', fontWeight: '400', textAlign: 'left', showCode: false }" style="background: linear-gradient(135deg, #134e4a 0%, #0f766e 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #5eead4; margin: 0; font-size: 14px; font-weight: 800;">Type Lab</h4>
    <div style="display: flex; gap: 4px; align-items: center;">
      <button class="demo-control-btn" data-on:click="$fontFamily = 'Georgia, serif'" data-class:active="$fontFamily === 'Georgia, serif'">Serif</button>
      <button class="demo-control-btn" data-on:click="$fontFamily = 'Inter, sans-serif'" data-class:active="$fontFamily === 'Inter, sans-serif'">Sans</button>
      <button class="demo-control-btn" data-on:click="$fontFamily = 'monospace'" data-class:active="$fontFamily === 'monospace'">Mono</button>
    </div>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$fontSize = '16px'" data-class:active="$fontSize === '16px'">Small</button>
    <button class="demo-control-btn" data-on:click="$fontSize = '24px'" data-class:active="$fontSize === '24px'">Medium</button>
    <button class="demo-control-btn" data-on:click="$fontSize = '36px'" data-class:active="$fontSize === '36px'">Large</button>
    <button class="demo-control-btn" data-on:click="$lineHeight = '1.2'" data-class:active="$lineHeight === '1.2'" style="background: #14b8a633">Tight</button>
    <button class="demo-control-btn" data-on:click="$lineHeight = '1.8'" data-class:active="$lineHeight === '1.8'" style="background: #14b8a633">Loose</button>
    <button class="demo-control-btn" data-on:click="$fontWeight = '400'" data-class:active="$fontWeight === '400'" style="background: #2dd4bf33; color: #134e4a">Regular</button>
    <button class="demo-control-btn" data-on:click="$fontWeight = '700'" data-class:active="$fontWeight === '700'" style="background: #2dd4bf33; color: #134e4a">Bold</button>
    <button class="demo-control-btn" data-on:click="$textAlign = 'left'" data-class:active="$textAlign === 'left'" style="background: #5eead433">Left</button>
    <button class="demo-control-btn" data-on:click="$textAlign = 'center'" data-class:active="$textAlign === 'center'" style="background: #5eead433">Center</button>
    <button class="demo-control-btn" data-on:click="$textAlign = 'right'" data-class:active="$textAlign === 'right'" style="background: #5eead433">Right</button>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #5eead4; font-size: 12px; font-weight: 700;">Letter Spacing:</label>
    <input type="range" min="-2" max="10" step="0.5" data-bind:letterSpacing style="width: 80px;">
  </div>
  <div contenteditable="true" class="demo-canvas-area" style="background: rgba(255,255,255,0.95); padding: 20px; color: #134e4a; outline: none; border-color: #5eead4; border-width: 2px; border-style: dashed; border-radius: 12px; transition: all 0.3s ease;" data-style:font-size="$fontSize" data-style:line-height="$lineHeight" data-style:font-family="$fontFamily" data-style:font-weight="$fontWeight" data-style:text-align="$textAlign" data-style:letter-spacing="$letterSpacing + 'px'">
    Good typography is invisible. You only notice it when it's bad.
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
    <div>
      <pre><code data-text="window.typographyCSS($fontFamily, $fontSize, $lineHeight, $letterSpacing, $fontWeight, $textAlign)"></code></pre>
      <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.typographyCSS($fontFamily, $fontSize, $lineHeight, $letterSpacing, $fontWeight, $textAlign))">Copy</button>
    </div>
  </div>
</div>`,
    learningObjectives: [
      "Understand font selection and font-weight properties",
      "Learn to create readable text with proper line-height and max-width",
      "Master text alignment and text-decoration properties",
      "Implement custom web fonts using @import or @font-face",
    ],
    commonMistakes: [
      "Setting font-size in pixels without considering accessibility",
      "Using line-height without units, causing unexpected scaling",
      "Not setting a fallback font family, leading to layout shifts",
      "Overusing text-transform for styling instead of semantic HTML",
    ],
    whenToUse: [
      "Setting up typography systems for design consistency",
      "Creating readable article layouts with optimal line lengths",
      "Implementing custom fonts for brand identity",
      "Styling headings and body text for visual hierarchy",
    ],
    difficulty: "beginner",
    estimatedTime: "1.5 hours",
    prerequisites: ["Basic HTML", "Basic CSS selectors"],
    strengths: [
      "Crucial for readability and accessibility",
      "Establishes brand identity and visual tone",
      "Responsive type scales improve UX across devices",
    ],
    weaknesses: [
      "Poor font choices can break layout consistency",
      "FOUT/FOIT (Flash of Unstyled Text) during loading",
    ],
    annotations: [],
  },
  Animation: {
    id: "Animation",
    name: "Animation",
    slug: "animation",
    description: "Properties for creating transitions and keyframe-based animations",
    icon: "ri-movie-line",
    color: "#f43f5e",
    intro:
      "Animation properties bring interfaces to life through motion and transitions. CSS animations range from simple hover effects to complex multi-step sequences. They enhance user experience by providing visual feedback and guiding attention.",
    useCases: [
      "Button hover and focus states",
      "Page transitions and route changes",
      "Loading spinners and progress indicators",
      "Revealing content on scroll",
      "Interactive UI feedback",
    ],
    concepts: [
      "transition: Animates property changes over a specified duration",
      "animation: Applies keyframe animations with timing control",
      "Keyframes: Define the start, end, and intermediate states",
      "Timing functions: Control acceleration/deceleration",
      "Animation properties: duration, delay, iteration-count, direction",
    ],
    examples: [
      {
        title: "Button Hover",
        description: "Smooth color and transform transition on button hover.",
        code: `.btn {
  padding: 0.75rem 1.5rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  transition: transform 0.2s, background 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  background: #4f46e5;
}`,
      },
      {
        title: "Fade In Animation",
        description: "Keyframe animation to fade in an element.",
        code: `@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}`,
      },
      {
        title: "Loading Spinner",
        description: "A rotating spinner for loading states.",
        code: `@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}`,
      },
      {
        title: "Staggered Animation",
        description: "Delay animations for a staggered reveal effect.",
        code: `.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 100ms; }
.item:nth-child(3) { animation-delay: 200ms; }
.item:nth-child(4) { animation-delay: 300ms; }

.item {
  animation: slideIn 0.3s ease-out forwards;
  opacity: 0;
}`,
      },
    ],
    related: ["Transform", "Visual", "Interactivity"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ animName: 'bounce', animDuration: 0.6, animTiming: 'ease', animIterations: '1', animKey: 0, showCode: false }" style="background: linear-gradient(135deg, #881337 0%, #e11d48 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #fda4af; margin: 0; font-size: 14px; font-weight: 800;">Animation Playground</h4>
    <span style="color: #fda4af; font-size: 11px; font-weight: 600; text-transform: uppercase;">$animName</span>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$animName = 'bounce'; $animKey = $animKey + 1" data-class:active="$animName === 'bounce'">Bounce</button>
    <button class="demo-control-btn" data-on:click="$animName = 'pulse'; $animKey = $animKey + 1" data-class:active="$animName === 'pulse'">Pulse</button>
    <button class="demo-control-btn" data-on:click="$animName = 'shake'; $animKey = $animKey + 1" data-class:active="$animName === 'shake'">Shake</button>
    <button class="demo-control-btn" data-on:click="$animName = 'spin'; $animKey = $animKey + 1" data-class:active="$animName === 'spin'">Spin</button>
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #fda4af; font-size: 12px; font-weight: 700;">Duration:</label>
    <input type="range" min="0.1" max="3" step="0.1" data-bind:animDuration style="width: 80px;">
    <span data-text="$animDuration + 's'" style="color: #fda4af; font-size: 12px; font-weight: 700;"></span>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$animTiming = 'ease'" data-class:active="$animTiming === 'ease'">Ease</button>
    <button class="demo-control-btn" data-on:click="$animTiming = 'linear'" data-class:active="$animTiming === 'linear'">Linear</button>
    <button class="demo-control-btn" data-on:click="$animTiming = 'ease-in'" data-class:active="$animTiming === 'ease-in'">Ease In</button>
    <button class="demo-control-btn" data-on:click="$animTiming = 'ease-out'" data-class:active="$animTiming === 'ease-out'">Ease Out</button>
    <button class="demo-control-btn" data-on:click="$animTiming = 'ease-in-out'" data-class:active="$animTiming === 'ease-in-out'">Ease In Out</button>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$animIterations = '1'" data-class:active="$animIterations === '1'">1x</button>
    <button class="demo-control-btn" data-on:click="$animIterations = '3'" data-class:active="$animIterations === '3'">3x</button>
    <button class="demo-control-btn" data-on:click="$animIterations = 'infinite'" data-class:active="$animIterations === 'infinite'">Infinite</button>
  </div>
  <div class="demo-canvas-area" style="display: flex; justify-content: center; align-items: center; height: 160px; border-color: #fb7185; border-width: 2px; border-style: dashed; border-radius: 12px;">
    <div class="demo-item-box" data-key="$animKey" data-style:animation="$animName + ' ' + $animDuration + 's ' + $animTiming + ' ' + $animIterations" style="width: 60px; height: 60px; background: linear-gradient(135deg, #fb7185, #f43f5e); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: white;">ANIMATE</div>
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <pre><code data-text="window.animationCSS($animName, $animDuration + 's', $animTiming, $animIterations)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.animationCSS($animName, $animDuration + 's', $animTiming, $animIterations))">Copy</button>
  </div>
</div>`,
    learningObjectives: [
      "Understand the difference between transitions and keyframe animations",
      "Learn to create smooth hover effects with transition",
      "Master keyframe animations with multiple steps",
      "Control animation timing with easing functions",
    ],
    commonMistakes: [
      "Not specifying animation-fill-mode, losing the final state",
      "Using transitions on properties that don't support interpolation",
      "Setting animation duration too fast or too slow",
      "Forgetting to add animation-direction for alternating animations",
    ],
    whenToUse: [
      "Adding hover effects to buttons and interactive elements",
      "Creating loading spinners and progress indicators",
      "Building page load animations and reveals",
      "Implementing subtle motion feedback for user interactions",
    ],
    difficulty: "intermediate",
    estimatedTime: "2 hours",
    prerequisites: ["Basic CSS", "Understanding of CSS selectors"],
    strengths: [
      "Smooth state changes without JavaScript",
      "GPU-accelerated performance for transforms/opacity",
      "Enhances user feedback and perceived speed",
    ],
    weaknesses: [
      "Hard to coordinate complex multi-step sequences",
      "Can't animate all properties (e.g., display)",
    ],
    annotations: [],
  },
  Color: {
    id: "Color",
    name: "Color",
    slug: "color",
    description: "Properties for applying colors, transparency, and opacity to elements",
    icon: "ri-palette-line",
    color: "#f59e0b",
    intro:
      "Color properties determine the visual appearance of elements through foreground and background colors. CSS supports multiple color formats including hex, RGB, HSL, and named colors. Understanding color is fundamental to creating visually appealing and accessible designs.",
    useCases: [
      "Theming and dark mode support",
      "Creating color palettes with CSS variables",
      "Adding transparency and overlays",
      "Semantic colors for states (success, error, warning)",
      "Background gradients and effects",
    ],
    concepts: [
      "color property: Sets the foreground color of text",
      "background-color: Sets the background color behind content",
      "Color formats: hex, rgb(), rgba(), hsl(), hsla()",
      "Opacity vs transparency: How each affects visibility",
      "currentColor: Inherits the element's color property",
    ],
    examples: [
      {
        title: "CSS Variables Theme",
        description: "Define a color palette using CSS custom properties.",
        code: `:root {
  --primary: #6366f1;
  --primary-light: #818cf8;
  --success: #22c55e;
  --error: #ef4444;
  --background: #ffffff;
  --text: #1f2937;
}

.dark-mode {
  --background: #1f2937;
  --text: #f9fafb;
}`,
      },
      {
        title: "RGBA Transparency",
        description: "Add transparency to backgrounds and overlays.",
        code: `.overlay {
  background: rgba(0, 0, 0, 0.5);
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}`,
      },
      {
        title: "HSL Color",
        description: "Use HSL for easy color manipulation.",
        code: `.primary { color: hsl(239, 84%, 67%); }
.secondary { color: hsl(239, 84%, 57%); }
.complementary { color: hsl(59, 84%, 67%); }

.hover:hover { color: hsl(239, 84%, 72%); }`,
      },
      {
        title: "Semantic States",
        description: "Color coding for different UI states.",
        code: `.success { color: #22c55e; background: #dcfce7; }
.warning { color: #f59e0b; background: #fef3c7; }
.error { color: #ef4444; background: #fee2e2; }
.info { color: #3b82f6; background: #dbeafe; }`,
      },
    ],
    related: ["Typography", "Visual", "CSS Variables"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ themeBg: '#ffffff', themeText: '#1f2937', themeBorder: '#d1d5db', themeOpacity: 1, showCode: false }" style="background: linear-gradient(135deg, #78350f 0%, #d97706 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #fde68a; margin: 0; font-size: 14px; font-weight: 800;">Theme Builder</h4>
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode" style="background: #92400e;">⟨/⟩ Code</button>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <button class="demo-control-btn" data-on:click="$themeBg = '#ffffff'; $themeText = '#1f2937'; $themeBorder = '#d1d5db'; $themeOpacity = 1">Light</button>
    <button class="demo-control-btn" data-on:click="$themeBg = '#1f2937'; $themeText = '#f9fafb'; $themeBorder = '#4b5563'; $themeOpacity = 1">Dark</button>
    <button class="demo-control-btn" data-on:click="$themeBg = '#eef2ff'; $themeText = '#3730a3'; $themeBorder = '#6366f1'; $themeOpacity = 1">Brand</button>
    <label style="color: #fef3c7; font-size: 11px; font-weight: 800;">Opacity:</label>
    <input type="range" min="0" max="1" step="0.05" data-bind:themeOpacity style="width: 60px;">
    <span data-text="$themeOpacity" style="color: #fef3c7; font-size: 11px; font-weight: 800;"></span>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #fef3c7; font-size: 11px; font-weight: 800;">BG:</label>
    <input type="color" aria-label="Background color picker" data-bind:themeBg style="width: 28px; height: 24px; border: none; border-radius: 4px; cursor: pointer; padding: 0;">
    <label style="color: #fef3c7; font-size: 11px; font-weight: 800;">TXT:</label>
    <input type="color" aria-label="Text color picker" data-bind:themeText style="width: 28px; height: 24px; border: none; border-radius: 4px; cursor: pointer; padding: 0;">
    <label style="color: #fef3c7; font-size: 11px; font-weight: 800;">BD:</label>
    <input type="color" aria-label="Border color picker" data-bind:themeBorder style="width: 28px; height: 24px; border: none; border-radius: 4px; cursor: pointer; padding: 0;">
  </div>
  <div class="demo-canvas-area" style="padding: 24px; border: none; display: flex; align-items: center; justify-content: center; border-radius: 12px; border: 2px dashed #fbbf24;">
    <div style="padding: 24px; border-radius: 12px; border: 3px solid; transition: all 0.3s ease; width: 100%; max-width: 300px;" data-style:background="$themeBg" data-style:color="$themeText" data-style:border-color="$themeBorder" data-style:opacity="$themeOpacity">
      <h5 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 800;">Live Preview</h5>
      <p style="margin: 0; font-size: 13px; opacity: 0.8; line-height: 1.5; font-weight: 500;">Colors define the mood and accessibility of your interface.</p>
    </div>
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <pre><code data-text="window.colorCSS($themeBg, $themeText, $themeBorder, $themeOpacity)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.colorCSS($themeBg, $themeText, $themeBorder, $themeOpacity))">Copy</button>
  </div>
</div>`,
    learningObjectives: [
      "Understand different color formats (hex, RGB, HSL)",
      "Learn to use CSS custom properties for theming",
      "Master alpha channels for transparency effects",
      "Create accessible color combinations",
    ],
    commonMistakes: [
      "Using hardcoded colors instead of CSS variables",
      "Not considering color contrast for accessibility",
      "Confusing opacity with rgba alpha channel",
      "Using named colors that may render differently across browsers",
    ],
    whenToUse: [
      "Creating theme systems with light/dark mode support",
      "Adding semi-transparent backgrounds and overlays",
      "Setting semantic colors for UI states (success, error, warning)",
      "Building color palettes with consistent hue variations",
    ],
    difficulty: "beginner",
    estimatedTime: "1 hour",
    prerequisites: ["Basic CSS"],
    strengths: [
      "Vast selection of color spaces (sRGB, P3, OKLCH)",
      "Dynamic theming with CSS variables",
      "Consistent semantic mapping for UI states",
    ],
    weaknesses: [
      "Color shifts across different screen technologies",
      "Contrast compliance requires manual verification",
    ],
    annotations: [],
  },
  Layout: {
    id: "Layout",
    name: "Layout",
    slug: "layout",
    description: "Core CSS properties for controlling element positioning and document flow",
    icon: "ri-layout-grid-line",
    color: "#6366f1",
    intro:
      "Layout properties form the foundation of CSS design by controlling how elements are positioned and sized. These properties determine whether elements stack vertically, sit inline with text, or break out of the normal flow. Mastering layout is essential for building responsive web pages.",
    useCases: [
      "Basic page structure and stacking",
      "Element positioning (relative, absolute, fixed)",
      "Creating layered interfaces with z-index",
      "Sticky headers and sidebars",
      "Controlling element visibility",
    ],
    concepts: [
      "Normal flow: Default browser layout (block vs inline)",
      "display property: Controls how elements generate boxes",
      "position property: Places elements relative to containing block",
      "Stacking context: Determines Z-axis order of overlapping elements",
      "Containing block: The ancestor used for sizing and positioning",
    ],
    examples: [
      {
        title: "Sticky Header",
        description: "Keep a header fixed at the top while scrolling.",
        code: `.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
}`,
      },
      {
        title: "Modal Overlay",
        description: "Center a modal on top of page content.",
        code: `.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
}`,
      },
      {
        title: "Absolute Positioning",
        description: "Position an element relative to its parent.",
        code: `.card {
  position: relative;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: red;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
}`,
      },
      {
        title: "Stacking Contexts",
        description: "Control layering with z-index.",
        code: `.layer-low { position: relative; z-index: 1; }
.layer-mid { position: relative; z-index: 10; }
.layer-high { position: relative; z-index: 100; }

.modal { position: fixed; z-index: 1000; }`,
      },
    ],
    related: ["Flexbox", "Grid", "Spacing"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ position: 'static', posTop: 40, posLeft: 40, showCode: false }" style="background: linear-gradient(135deg, #3730a3 0%, #6366f1 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #c7d2fe; margin: 0; font-size: 14px; font-weight: 800;">Position Lab</h4>
    <span style="color: #a5b4fc; font-size: 11px; font-weight: 600;">$position</span>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$position = 'static'" data-class:active="$position === 'static'">Static</button>
    <button class="demo-control-btn" data-on:click="$position = 'relative'" data-class:active="$position === 'relative'">Relative</button>
    <button class="demo-control-btn" data-on:click="$position = 'absolute'" data-class:active="$position === 'absolute'">Absolute</button>
    <button class="demo-control-btn" data-on:click="$position = 'fixed'" data-class:active="$position === 'fixed'">Fixed</button>
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
  </div>
  <div class="demo-controls-row" data-show="$position !== 'static'">
    <label style="color: #a5b4fc; margin-right: var(--space-xs);">Top:</label>
    <input type="range" min="0" max="100" step="5" data-bind:posTop>
    <span style="color: #a5b4fc; margin-left: var(--space-xs);" data-text="$posTop + 'px'"></span>
  </div>
  <div class="demo-controls-row" data-show="$position !== 'static'">
    <label style="color: #a5b4fc; margin-right: var(--space-xs);">Left:</label>
    <input type="range" min="0" max="150" step="5" data-bind:posLeft>
    <span style="color: #a5b4fc; margin-left: var(--space-xs);" data-text="$posLeft + 'px'"></span>
  </div>
  <div class="demo-canvas-area" style="border-color: #818cf8; border-width: 2px; border-style: dashed; border-radius: 12px; position: relative; min-height: 160px;">
    <div style="position: absolute; top: 10px; left: 10px; color: rgba(255,255,255,0.4); font-size: 10px; font-weight: 800; text-transform: uppercase;">Container Boundary</div>
    <div class="demo-item-box" style="position: absolute; top: 40px; left: 40px; width: 80px; height: 60px; background: linear-gradient(135deg, #818cf8, #6366f1); transition: all 0.4s var(--ease-spring-2); border-radius: 12px;" data-style:position="$position" data-style:top="$posTop + 'px'" data-style:left="$posLeft + 'px'">
      MOVE ME
    </div>
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <pre><code data-text="window.layoutCSS($position, $posTop, $posLeft)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.layoutCSS($position, $posTop, $posLeft))">Copy</button>
  </div>
</div>`,
    learningObjectives: [
      "Understand the position property values (static, relative, absolute, fixed, sticky)",
      "Learn how containing blocks work with absolute positioning",
      "Master z-index and stacking contexts",
      "Create overlays and modal dialogs",
    ],
    commonMistakes: [
      "Not setting a positioned parent, causing absolute elements to escape",
      "Overusing z-index without understanding stacking contexts",
      "Using fixed positioning without considering mobile viewports",
      "Forgetting that absolute positioning removes from normal flow",
    ],
    whenToUse: [
      "Creating sticky headers that stay in view while scrolling",
      "Building modal dialogs and overlays",
      "Positioning badges and tooltips relative to their parent",
      "Creating multi-layered interfaces with precise z-ordering",
    ],
    difficulty: "intermediate",
    estimatedTime: "2 hours",
    prerequisites: ["Basic CSS", "Understanding of the box model"],
    strengths: [
      "Granular control over element placement",
      "Enables layered UI (modals, dropdowns, tooltips)",
      "Sticky positioning improves navigation UX",
    ],
    weaknesses: [
      "Easy to lose elements outside the viewport",
      "Complex stacking contexts can be hard to debug",
    ],
    annotations: [],
  },
  Backgrounds: {
    id: "Backgrounds",
    name: "Backgrounds",
    slug: "backgrounds",
    description: "Properties for controlling element backgrounds, colors, and images",
    icon: "ri-paint-brush-line",
    color: "#22c55e",
    intro:
      "Background properties control what appears behind an element's content. This includes solid colors, gradient images, and the positioning/sizing of background images. Understanding backgrounds is essential for creating visually rich interfaces, from simple colored sections to complex textured backgrounds.",
    useCases: [
      "Hero sections with full-width background images",
      "Card components with subtle colored backgrounds",
      "Creating gradient effects and overlays",
      "Parallax scrolling backgrounds",
      "Text with background color highlighting",
    ],
    concepts: [
      "background-color: Sets a solid color behind all other background layers",
      "background-image: Adds one or more images or gradients as backgrounds",
      "background-position: Controls where the background image is placed",
      "background-size: Defines the dimensions of background images",
      "background-repeat: Determines if/how background images tile",
    ],
    examples: [
      {
        title: "Gradient Background",
        description: "A smooth gradient from one color to another for visual interest.",
        code: `.hero {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 100%
  );
  color: white;
  padding: 4rem 2rem;
}`,
      },
      {
        title: "Cover Background Image",
        description: "An image that covers the entire element while maintaining aspect ratio.",
        code: `.banner {
  background-image: url('hero.jpg');
  background-size: cover;
  background-position: center;
  height: 400px;
}`,
      },
      {
        title: "Multiple Backgrounds",
        description: "Stack multiple background images with different positions.",
        code: `.card {
  background-color: white;
  background-image:
    linear-gradient(to right, #f0f0f0 1px, transparent 1px),
    linear-gradient(to bottom, #f0f0f0 1px, transparent 1px);
  background-size: 20px 20px;
}`,
      },
      {
        title: "Fixed Background",
        description: "A background that stays in place when scrolling.",
        code: `.landing {
  background-image: url('texture.png');
  background-attachment: fixed;
  background-size: cover;
}`,
      },
    ],
    related: ["Color", "Visual", "Typography"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ bgMode: 'gradient', bgSize: 'cover', bgPosition: 'center', bgRepeat: 'no-repeat', showCode: false }" style="background: linear-gradient(135deg, #14532d 0%, #22c55e 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #86efac; margin: 0; font-size: 14px; font-weight: 800;">Backgrounds Explorer</h4>
    <span style="color: #86efac; font-size: 11px; font-weight: 600; text-transform: uppercase;">$bgMode</span>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$bgMode = 'gradient'" data-class:active="$bgMode === 'gradient'">Gradient</button>
    <button class="demo-control-btn" data-on:click="$bgMode = 'solid'" data-class:active="$bgMode === 'solid'">Solid</button>
    <button class="demo-control-btn" data-on:click="$bgMode = 'image'" data-class:active="$bgMode === 'image'">Image</button>
    <button class="demo-control-btn" data-on:click="$bgMode = 'pattern'" data-class:active="$bgMode === 'pattern'">Pattern</button>
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$bgSize = 'cover'" data-class:active="$bgSize === 'cover'">Cover</button>
    <button class="demo-control-btn" data-on:click="$bgSize = 'contain'" data-class:active="$bgSize === 'contain'">Contain</button>
    <button class="demo-control-btn" data-on:click="$bgSize = 'auto'" data-class:active="$bgSize === 'auto'">Auto</button>
    <button class="demo-control-btn" data-on:click="$bgSize = '50%'" data-class:active="$bgSize === '50%'">50%</button>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$bgPosition = 'center'" data-class:active="$bgPosition === 'center'">Center</button>
    <button class="demo-control-btn" data-on:click="$bgPosition = 'top'" data-class:active="$bgPosition === 'top'">Top</button>
    <button class="demo-control-btn" data-on:click="$bgPosition = 'bottom'" data-class:active="$bgPosition === 'bottom'">Bottom</button>
    <button class="demo-control-btn" data-on:click="$bgPosition = 'left'" data-class:active="$bgPosition === 'left'">Left</button>
    <button class="demo-control-btn" data-on:click="$bgPosition = 'right'" data-class:active="$bgPosition === 'right'">Right</button>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$bgRepeat = 'no-repeat'" data-class:active="$bgRepeat === 'no-repeat'">No-repeat</button>
    <button class="demo-control-btn" data-on:click="$bgRepeat = 'repeat'" data-class:active="$bgRepeat === 'repeat'">Repeat</button>
    <button class="demo-control-btn" data-on:click="$bgRepeat = 'repeat-x'" data-class:active="$bgRepeat === 'repeat-x'">Repeat-X</button>
    <button class="demo-control-btn" data-on:click="$bgRepeat = 'repeat-y'" data-class:active="$bgRepeat === 'repeat-y'">Repeat-Y</button>
  </div>
  <div class="demo-canvas-area" style="display: flex; justify-content: center; align-items: center; height: 200px; border-radius: 12px; border: 2px dashed #4ade80; overflow: hidden;" data-style:background="window.bgValue($bgMode)" data-style:background-size="$bgSize" data-style:background-position="$bgPosition" data-style:background-repeat="$bgRepeat" data-on:click="$bgMode = ['gradient','solid','image','pattern'][(['gradient','solid','image','pattern'].indexOf($bgMode) + 1) % 4]">
    <div style="text-align: center; color: white; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
      <div style="font-size: 24px; margin-bottom: 8px;">Visual Impact</div>
      <div style="font-size: 12px; opacity: 0.8;">Click to cycle modes</div>
    </div>
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <pre><code data-text="window.backgroundsCSS($bgMode, $bgSize, $bgPosition, $bgRepeat)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.backgroundsCSS($bgMode, $bgSize, $bgPosition, $bgRepeat))">Copy</button>
  </div>
</div>`,
    learningObjectives: [
      "Understand background-image with gradients and URLs",
      "Learn background-position and background-size for image control",
      "Master background-repeat and background-attachment",
      "Create complex layered backgrounds",
    ],
    commonMistakes: [
      "Forgetting that background-image doesn't include background-color",
      "Not setting background-size for responsiveUsing fixed images",
      " backgrounds that cause issues on mobile",
      "Overloading with multiple large background images",
    ],
    whenToUse: [
      "Creating hero sections with full-width background images",
      "Adding gradient overlays for text readability",
      "Building textured backgrounds with patterns",
      "Implementing parallax scrolling effects",
    ],
    difficulty: "beginner",
    estimatedTime: "1 hour",
    prerequisites: ["Basic CSS"],
    strengths: [
      "Supports multiple layers of images and gradients",
      "Powerful sizing control with 'cover' and 'contain'",
      "Enable visual depth with gradients and patterns",
    ],
    weaknesses: [
      "Large background images impact page load performance",
      "Fixed attachments can cause jittery scrolling on mobile",
    ],
    annotations: [],
  },
  BoxModel: {
    id: "BoxModel",
    name: "Box Model",
    slug: "box-model",
    description: "Core properties controlling element sizing, spacing, and borders",
    icon: "ri-layout-box-line",
    color: "#f97316",
    intro:
      "The CSS Box Model is the foundation of all layout in CSS. Every element in CSS is a rectangular box, and the box model describes how the size and spacing of that box is calculated. Understanding margin, padding, border, and how box-sizing works is critical for precise layout control.",
    useCases: [
      "Creating consistent spacing between elements",
      "Adding borders to define component edges",
      "Controlling content overflow behavior",
      "Creating spacing systems for layouts",
      "Debugging layout issues",
    ],
    concepts: [
      "Content: The actual content (text, images) inside the element",
      "Padding: Space between content and border",
      "Border: The edge around padding (or content if no padding)",
      "Margin: Space outside the border, between elements",
      "box-sizing: Controls whether width/height include padding/border",
    ],
    examples: [
      {
        title: "Box Model Visualization",
        description: "Understanding the layers of the box model.",
        code: `.box {
  margin: 20px;
  border: 5px solid #333;
  padding: 20px;
  width: 200px;
  box-sizing: content-box;
}`,
      },
      {
        title: "Border Box Sizing",
        description: "Use border-box to include padding and border in width.",
        code: `*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 300px;
  padding: 20px;
  border: 2px solid #333;
}`,
      },
      {
        title: "Collapsing Margins",
        description: "Vertical margins between elements collapse to the larger value.",
        code: `.section {
  margin-bottom: 2rem;
}

.article {
  margin-top: 1rem;
  /* Actual space = max(2rem, 1rem) = 2rem */
}`,
      },
      {
        title: "Overflow Handling",
        description: "Control what happens when content overflows its container.",
        code: `.dropdown {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
}`,
      },
    ],
    related: ["Layout", "Spacing", "Sizing"],
    interactiveDemo: `<div class="demo-playground-card" data-signals='{"boxMargin":20,"boxPadding":30,"boxBorder":8,"showCode":false}' style="background: linear-gradient(135deg, #7c2d12 0%, #ea580c 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #fed7aa; margin: 0; font-size: 14px; font-weight: 800;">Box Visualizer</h4>
    <div style="display: flex; gap: 8px;">
      <button class="demo-control-btn" data-on:click="$boxMargin = 20; $boxPadding = 30; $boxBorder = 8" style="background: #92400e;">Reset</button>
      <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
    </div>
  </div>
  <div class="demo-controls-row" style="display: flex; flex-direction: column; gap: 12px; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 8px;">
      <div style="display: flex; align-items: center; gap: 12px; color: #fed7aa; font-size: 13px;">
        <label style="min-width: 70px;">Margin:</label>
        <input type="range" min="0" max="50" step="5" data-bind:boxMargin style="flex: 1; accent-color: #fbbf24;">
        <span data-text="$boxMargin + 'px'" style="min-width: 45px; text-align: right; font-weight: 800;">20px</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px; color: #fed7aa; font-size: 13px;">
        <label style="min-width: 70px;">Padding:</label>
        <input type="range" min="0" max="40" step="5" data-bind:boxPadding style="flex: 1; accent-color: #fb923c;">
        <span data-text="$boxPadding + 'px'" style="min-width: 45px; text-align: right; font-weight: 800;">30px</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px; color: #fed7aa; font-size: 13px;">
        <label style="min-width: 70px;">Border:</label>
        <input type="range" min="0" max="20" step="2" data-bind:boxBorder style="flex: 1; accent-color: #f97316;">
        <span data-text="$boxBorder + 'px'" style="min-width: 45px; text-align: right; font-weight: 800;">8px</span>
      </div>
  </div>
  <div class="demo-canvas-area" style="display: flex; justify-content: center; align-items: center; height: 140px; border: none; border-radius: 12px; margin-top: 12px;">
    <div style="background: rgba(252, 211, 77, 0.4); border-radius: 4px; transition: all 0.3s var(--ease-spring-2); border: 1px dashed rgba(255,255,255,0.4);" data-style:padding="$boxMargin + 'px'">
      <div style="background: rgba(251, 146, 60, 0.6); border-radius: 4px; transition: all 0.3s var(--ease-spring-2); border: 2px solid #b45309;" data-style:padding="$boxBorder + 'px'">
        <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 2px; color: #7c2d12; font-weight: 800; font-size: 12px; text-transform: uppercase; text-align: center; transition: all 0.3s var(--ease-spring-2);" data-style:padding="$boxPadding + 'px'">
          Content
        </div>
      </div>
    </div>
  </div>
  <div class="demo-code-panel" data-show="$showCode" style="background: #1e1e1e; border-radius: 8px; padding: 12px; margin-top: 12px;">
    <pre style="margin: 0;"><code data-text="window.boxModelCSS($boxMargin, $boxPadding, $boxBorder)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.boxModelCSS($boxMargin, $boxPadding, $boxBorder))" style="margin-top: 8px; padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">Copy</button>
    <p style="font-size:10px;opacity:0.7;margin-top:8px;margin-bottom:0;">Note: This visualizer uses nested layers to illustrate the box model concept. The CSS shown is the standard way to apply these properties.</p>
  </div>
</div>`,
    learningObjectives: [
      "Understand the four layers of the box model (content, padding, border, margin)",
      "Learn how box-sizing affects element dimensions",
      "Master margin collapsing behavior",
      "Control overflow and visibility",
    ],
    commonMistakes: [
      "Forgetting box-sizing: border-box and getting unexpected widths",
      "Confusing margin with padding — margin is outside, padding is inside",
      "Not accounting for borders in total element width",
      "Not understanding margin collapsing between adjacent elements",
    ],
    whenToUse: [
      "Creating consistent spacing systems for layouts",
      "Adding borders to define component boundaries",
      "Controlling overflow in dropdowns and scrollable areas",
      "Debugging layout issues by understanding element dimensions",
    ],
    difficulty: "beginner",
    estimatedTime: "1 hour",
    prerequisites: ["Basic HTML", "Basic CSS"],
    strengths: [
      "Fundamental to all web layout and spacing",
      "Border-box makes sizing predictable",
      "Clear separation of internal and external space",
    ],
    weaknesses: [
      "Margin collapsing can be confusing for beginners",
      "Default content-box sizing often leads to overflow",
    ],
    annotations: [],
  },
  Transitions: {
    id: "Transitions",
    name: "Transitions",
    slug: "transitions",
    description: "Properties for creating smooth animated transitions between property values",
    icon: "ri-loader-line",
    color: "#a855f7",
    intro:
      "Transitions allow you to animate changes to CSS property values over a specified duration. Instead of values changing instantly, transitions interpolate smoothly between old and new values. This creates polished, interactive user experiences with minimal code.",
    useCases: [
      "Button hover and focus state animations",
      "Menu open/close animations",
      "Modal fade in/out effects",
      "Color changes on user interaction",
      "Transform changes (scale, rotate, translate)",
    ],
    concepts: [
      "transition-property: The specific property to animate",
      "transition-duration: How long the transition takes",
      "transition-timing-function: The acceleration curve (ease, linear, etc.)",
      "transition-delay: How long to wait before starting",
      "Shorthand: All properties can be combined in one declaration",
    ],
    examples: [
      {
        title: "Simple Button Transition",
        description: "Smooth color and transform change on hover.",
        code: `.btn {
  background: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.btn:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}`,
      },
      {
        title: "Delayed Transition",
        description: "Start the transition after a brief delay.",
        code: `.tooltip {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease 0.2s,
              transform 0.3s ease 0.2s;
}

.tooltip.show {
  opacity: 1;
  transform: translateY(0);
}`,
      },
      {
        title: "Multiple Properties",
        description: "Animate different properties with different timings.",
        code: `.card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}`,
      },
      {
        title: "Timing Functions",
        description: "Different easing curves for different effects.",
        code: `.bounce:hover { transform: scale(1.1); transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.linear:hover { transform: translateX(50px); transition-timing-function: linear; }
.smooth:hover { transform: translateX(50px); transition-timing-function: ease-in-out; }`,
      },
    ],
    related: ["Animation", "Transform", "Visual"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ timing: 'ease', duration: '0.6', transitionProp: 'all', showCode: false }" style="background: linear-gradient(135deg, #581c87 0%, #a855f7 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #e9d5ff; margin: 0; font-size: 14px; font-weight: 800;">Micro-interaction Lab</h4>
    <span style="color: #e9d5ff; font-size: 11px; font-weight: 600; text-transform: uppercase;">$timing</span>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$transitionProp = 'all'" data-class:active="$transitionProp === 'all'">all</button>
    <button class="demo-control-btn" data-on:click="$transitionProp = 'transform'" data-class:active="$transitionProp === 'transform'">transform</button>
    <button class="demo-control-btn" data-on:click="$transitionProp = 'background'" data-class:active="$transitionProp === 'background'">background</button>
    <button class="demo-control-btn" data-on:click="$timing = 'ease'" data-class:active="$timing === 'ease'">Ease</button>
    <button class="demo-control-btn" data-on:click="$timing = 'ease-in'" data-class:active="$timing === 'ease-in'">Ease In</button>
    <button class="demo-control-btn" data-on:click="$timing = 'ease-out'" data-class:active="$timing === 'ease-out'">Ease Out</button>
    <button class="demo-control-btn" data-on:click="$timing = 'linear'" data-class:active="$timing === 'linear'">Linear</button>
    <button class="demo-control-btn" data-on:click="$timing = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'" data-class:active="$timing.includes('cubic')" style="background: #c084fc;">Bounce</button>
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #e9d5ff; font-size: 12px; font-weight: 700;">Duration:</label>
    <input type="range" min="0.1" max="2.0" step="0.1" data-bind:duration style="width: 80px;">
    <span data-text="$duration + 's'" style="color: #e9d5ff; font-size: 12px; font-weight: 700; font-weight: 700;"></span>
  </div>
  <div class="demo-canvas-area" style="display: flex; justify-content: center; gap: 24px; padding: 20px; align-items: center; border-color: #c084fc; border-width: 2px; border-style: dashed; border-radius: 12px;">
    <div data-on:mouseenter="$_hover1 = true" data-on:mouseleave="$_hover1 = false" class="demo-item-box" data-style:transform="$_hover1 ? 'scale(1.15) rotate(8deg)' : 'scale(1) rotate(0deg)'" data-style:background="$_hover1 ? '#9333ea' : '#c084fc'" data-style:transition="'$transitionProp + ' + $duration + 's ' + $timing'" style="padding: 12px 20px; width: auto; height: auto; cursor: pointer; font-size: 14px; border-radius: 8px;">HOVER</div>
    <div data-on:click="$_clicked = !$_clicked" class="demo-item-box" data-style:transform="$_clicked ? 'translateX(20px)' : 'translateX(0)'" data-style:background="$_clicked ? '#ec4899' : '#a855f7'" data-style:transition="'$transitionProp + ' + $duration + 's ' + $timing'" style="width: 50px; height: 50px; cursor: pointer; border-radius: 50%;"></div>
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <pre><code data-text="window.transitionsCSS($transitionProp, $duration, $timing)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.transitionsCSS($transitionProp, $duration, $timing))">Copy</button>
  </div>
</div>`,
    learningObjectives: [
      "Understand the transition shorthand property",
      "Learn different timing functions (ease, linear, cubic-bezier)",
      "Master transition-delay for staggered effects",
      "Animate multiple properties with different timings",
    ],
    commonMistakes: [
      "Using 'all' for transitions, which can impact performance",
      "Setting duration too fast (under 0.1s) making changes imperceptible",
      "Not considering which properties can be animated",
      "Forgetting that transitions need a trigger (hover, focus, JS class)",
    ],
    whenToUse: [
      "Adding smooth hover effects to buttons and links",
      "Creating menu open/close animations",
      "Implementing focus states for better accessibility",
      "Building modal fade in/out transitions",
    ],
    difficulty: "beginner",
    estimatedTime: "1 hour",
    prerequisites: ["Basic CSS selectors"],
    strengths: [
      "Declarative animation of property values",
      "Minimal code for polished interactions",
      "Built-in easing functions for natural motion",
    ],
    weaknesses: [
      "Requires a trigger (hover, focus, class change)",
      "Can't animate auto dimensions easily",
    ],
    annotations: [],
  },
};

export const COLLECTIONS_LIST = Object.values(COLLECTIONS);
