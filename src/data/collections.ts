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
    interactiveDemo: `<div data-signals:justifycontent="'center'" data-signals:alignitems="'center'" data-signals:flexwrap="'nowrap'" style="font-family: system-ui, sans-serif; padding: 20px; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 12px; min-height: 280px;">
  <h4 style="color: #c4b5fd; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Flex Playground</h4>
  <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
    <button data-on:click="$justifycontent = 'flex-start'" data-class:active="$justifycontent === 'flex-start'" style="padding: 6px 12px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">flex-start</button>
    <button data-on:click="$justifycontent = 'center'" data-class:active="$justifycontent === 'center'" style="padding: 6px 12px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">center</button>
    <button data-on:click="$justifycontent = 'space-between'" data-class:active="$justifycontent === 'space-between'" style="padding: 6px 12px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">space-between</button>
    <button data-on:click="$justifycontent = 'space-around'" data-class:active="$justifycontent === 'space-around'" style="padding: 6px 12px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">space-around</button>
    <button data-on:click="$alignitems = 'flex-start'" data-class:active="$alignitems === 'flex-start'" style="padding: 6px 12px; background: #7c3aed; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">align-start</button>
    <button data-on:click="$alignitems = 'center'" data-class:active="$alignitems === 'center'" style="padding: 6px 12px; background: #7c3aed; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">align-center</button>
    <button data-on:click="$flexwrap = 'wrap'" data-class:active="$flexwrap === 'wrap'" style="padding: 6px 12px; background: #9333ea; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">wrap</button>
    <button data-on:click="$flexwrap = 'nowrap'" data-class:active="$flexwrap === 'nowrap'" style="padding: 6px 12px; background: #9333ea; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">nowrap</button>
  </div>
  <div id="flexDemo" style="display: flex; height: 140px; background: rgba(255,255,255,0.1); border-radius: 8px; border: 2px dashed #6366f1;" data-style:justify-content="$justifycontent)" data-style:align-items="$alignitems)" data-style:flex-wrap="$flexwrap)">
    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #818cf8, #6366f1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; box-shadow: 0 4px 12px rgba(99,102,241,0.4);">1</div>
    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #a78bfa, #8b5cf6); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; box-shadow: 0 4px 12px rgba(139,92,246,0.4);">2</div>
    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #c4b5fd, #a78bfa); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; box-shadow: 0 4px 12px rgba(167,139,250,0.4);">3</div>
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
    estimatedTime: "2-3 hours",
    prerequisites: ["Basic CSS", "Understanding of block vs inline elements"],
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
    interactiveDemo: `<div data-signals:_layoutType="'classic'" data-signals:_highlightedArea="''" style="font-family: system-ui, sans-serif; padding: 20px; background: linear-gradient(135deg, #831843 0%, #be185d 100%); border-radius: 12px; min-height: 280px;">
  <h4 style="color: #f9a8d4; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Landing Page Builder</h4>
  <div style="display: flex; gap: 8px; margin-bottom: 16px;">
    <button data-on:click="$_layoutType = 'classic'" data-class:active="$_layoutType === 'classic'" style="padding: 6px 12px; background: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Classic</button>
    <button data-on:click="$_layoutType = 'hero'" data-class:active="$_layoutType === 'hero'" style="padding: 6px 12px; background: #db2777; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Hero Focus</button>
    <button data-on:click="$_layoutType = 'dashboard'" data-class:active="$_layoutType === 'dashboard'" style="padding: 6px 12px; background: #be185d; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Dashboard</button>
  </div>
  <div class="grid-demo" data-class:layout-class="$_layoutType)">
    <div data-on:click="$ _highlightedArea = 'header'; setTimeout(() => $ _highlightedArea = '', 200)" data-class:highlighted="$ _highlightedArea === 'header'" class="grid-item item-header">Header</div>
    <div data-on:click="$ _highlightedArea = 'sidebar'; setTimeout(() => $ _highlightedArea = '', 200)" data-class:highlighted="$ _highlightedArea === 'sidebar'" class="grid-item item-sidebar">Sidebar</div>
    <div data-on:click="$ _highlightedArea = 'main'; setTimeout(() => $ _highlightedArea = '', 200)" data-class:highlighted="$ _highlightedArea === 'main'" class="grid-item item-main">Main Content</div>
    <div data-on:click="$ _highlightedArea = 'footer'; setTimeout(() => $ _highlightedArea = '', 200)" data-class:highlighted="$ _highlightedArea === 'footer'" class="grid-item item-footer">Footer</div>
  </div>
  <style>
    .grid-demo { display: grid; height: 160px; gap: 8px; border-radius: 8px; overflow: hidden; }
    .grid-demo.layout-class-classic { grid-template-columns: 200px 1fr; grid-template-rows: 50px 1fr 50px; }
    .grid-demo.layout-class-hero { grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; }
    .grid-demo.layout-class-dashboard { grid-template-columns: repeat(3, 1fr); grid-template-rows: 1fr 1fr; }
    .item-header { grid-area: header; }
    .item-sidebar { grid-area: sidebar; }
    .item-main { grid-area: main; }
    .item-footer { grid-area: footer; }
    .layout-class-classic .item-header { grid-area: 1 / 1 / 2 / 3; }
    .layout-class-classic .item-sidebar { grid-area: 2 / 1 / 3 / 2; }
    .layout-class-classic .item-main { grid-area: 2 / 2 / 3 / 3; }
    .layout-class-classic .item-footer { grid-area: 3 / 1 / 4 / 3; }
    .layout-class-hero .item-header { grid-area: 1 / 1 / 2 / 2; }
    .layout-class-hero .item-sidebar { display: none; }
    .layout-class-hero .item-main { grid-area: 2 / 1 / 3 / 2; }
    .layout-class-hero .item-footer { grid-area: 3 / 1 / 4 / 2; }
    .layout-class-dashboard .item-header { grid-area: 1 / 2 / 2 / 4; }
    .layout-class-dashboard .item-sidebar { grid-area: 1 / 1 / 3 / 2; }
    .layout-class-dashboard .item-main { grid-area: 2 / 2 / 3 / 4; }
    .layout-class-dashboard .item-footer { display: none; }
    .grid-item { display: flex; align-items: center; padding: 0 16px; cursor: pointer; transition: transform 0.2s; }
    .item-header { background: linear-gradient(135deg, #f472b6, #ec4899); color: white; font-weight: 600; font-size: 14px; }
    .item-sidebar { background: linear-gradient(135deg, #fbcfe8, #f9a8d4); color: #831843; font-weight: 500; font-size: 13px; }
    .item-main { background: linear-gradient(135deg, #fdf2f8, #fbcfe8); color: #be185d; font-weight: 500; font-size: 13px; justify-content: center; }
    .item-footer { background: linear-gradient(135deg, #f9a8d4, #f472b6); color: white; font-weight: 500; font-size: 13px; }
    .highlighted { transform: scale(1.02); }
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
    estimatedTime: "2-3 hours",
    prerequisites: ["Basic CSS", "Understanding of the box model"],
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
    interactiveDemo: `<div data-signals:fontsize="'24px'" data-signals:lineheight="'1.6'" data-signals:letterspacing="'0px'" style="font-family: system-ui, sans-serif; padding: 20px; background: linear-gradient(135deg, #134e4a 0%, #0f766e 100%); border-radius: 12px; min-height: 280px;">
  <h4 style="color: #5eead4; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Text Lab</h4>
  <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
    <button data-on:click="$fontsize = '16px'" data-class:active="$fontsize === '16px'" style="padding: 6px 10px; background: #0d9488; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Small</button>
    <button data-on:click="$fontsize = '24px'" data-class:active="$fontsize === '24px'" style="padding: 6px 10px; background: #0d9488; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Medium</button>
    <button data-on:click="$fontsize = '36px'" data-class:active="$fontsize === '36px'" style="padding: 6px 10px; background: #0d9488; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Large</button>
    <button data-on:click="$lineheight = '1.2'" data-class:active="$lineheight === '1.2'" style="padding: 6px 10px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Tight</button>
    <button data-on:click="$lineheight = '1.8'" data-class:active="$lineheight === '1.8'" style="padding: 6px 10px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Loose</button>
    <button data-on:click="$letterspacing = '0px'" data-class:active="$letterspacing === '0px'" style="padding: 6px 10px; background: #2dd4bf; color: #134e4a; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Normal</button>
    <button data-on:click="$letterspacing = '4px'" data-class:active="$letterspacing === '4px'" style="padding: 6px 10px; background: #2dd4bf; color: #134e4a; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Wide</button>
  </div>
  <div contenteditable="true" id="textSample" style="background: rgba(255,255,255,0.95); padding: 20px; border-radius: 8px; color: #134e4a; outline: none; min-height: 80px; font-family: Georgia, serif;" data-style:font-size="$fontsize)" data-style:line-height="$lineheight)" data-style:letter-spacing="$letterspacing)">
    Click to edit this text
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
    estimatedTime: "1-2 hours",
    prerequisites: ["Basic HTML", "Basic CSS selectors"],
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
    interactiveDemo: `<div data-signals:_animKey="0" style="font-family: system-ui, sans-serif; padding: 20px; background: linear-gradient(135deg, #881337 0%, #e11d48 100%); border-radius: 12px; min-height: 280px;">
  <h4 style="color: #fda4af; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Animation Playground</h4>
  <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
    <button data-on:click="$_animKey = $_animKey + 1; setTimeout(() => { const el = document.getElementById('animBox'); el.style.animation = 'bounce 0.6s ease'; }, 10)" style="padding: 6px 12px; background: #fb7185; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Bounce</button>
    <button data-on:click="$_animKey = $_animKey + 1; setTimeout(() => { const el = document.getElementById('animBox'); el.style.animation = 'pulse 0.8s ease'; }, 10)" style="padding: 6px 12px; background: #f43f5e; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Pulse</button>
    <button data-on:click="$_animKey = $_animKey + 1; setTimeout(() => { const el = document.getElementById('animBox'); el.style.animation = 'shake 0.5s ease'; }, 10)" style="padding: 6px 12px; background: #e11d48; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Shake</button>
    <button data-on:click="$_animKey = $_animKey + 1; setTimeout(() => { const el = document.getElementById('animBox'); el.style.animation = 'spin 1s linear'; }, 10)" style="padding: 6px 12px; background: #be123c; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Spin</button>
  </div>
  <style>
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
    @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  </style>
  <div style="display: flex; justify-content: center; align-items: center; gap: 20px; height: 140px; background: rgba(255,255,255,0.1); border-radius: 8px;">
    <div id="animBox" data-key="$_animKey" style="width: 60px; height: 60px; background: linear-gradient(135deg, #fb7185, #f43f5e); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; cursor: pointer; box-shadow: 0 4px 15px rgba(244,63,94,0.5);">PLAY</div>
    <div style="color: white; font-size: 12px; opacity: 0.8;">Click buttons to trigger animations</div>
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
    interactiveDemo: `<div data-signals:themebg="'#ffffff'" data-signals:themetext="'#1f2937'" data-signals:themeborder="'#d1d5db'" style="font-family: system-ui, sans-serif; padding: 20px; background: linear-gradient(135deg, #78350f 0%, #d97706 100%); border-radius: 12px; min-height: 280px;">
  <h4 style="color: #fde68a; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Theme Builder</h4>
  <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; align-items: center;">
    <label style="color: #fef3c7; font-size: 11px;">BG:</label>
    <input type="color" data-bind:themebg style="width: 32px; height: 28px; border: none; border-radius: 4px; cursor: pointer;">
    <label style="color: #fef3c7; font-size: 11px;">Text:</label>
    <input type="color" data-bind:themetext style="width: 32px; height: 28px; border: none; border-radius: 4px; cursor: pointer;">
    <label style="color: #fef3c7; font-size: 11px;">Border:</label>
    <input type="color" data-bind:themeborder style="width: 32px; height: 28px; border: none; border-radius: 4px; cursor: pointer;">
    <button data-on:click="$themebg = '#ffffff'; $themetext = '#1f2937'; $themeborder = '#d1d5db'" style="padding: 6px 12px; background: #92400e; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Reset</button>
  </div>
  <div id="themeCard" style="padding: 24px; border-radius: 12px; border: 2px solid; transition: all 0.3s ease;" data-style:background="$themebg)" data-style:color="$themetext)" data-style:border-color="$themeborder)">
    <h5 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Card Title</h5>
    <p style="margin: 0; font-size: 13px; opacity: 0.8; line-height: 1.5;">This card adapts to your color choices. Click the color pickers above to customize!</p>
    <button style="margin-top: 12px; padding: 8px 16px; background: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500;">Action</button>
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
    interactiveDemo: `<div data-signals:position="'absolute'" data-signals:hasOffset="false" data-effect="$position === 'static' ? $hasOffset = false : null" style="font-family: system-ui, sans-serif; padding: 20px; background: linear-gradient(135deg, #3730a3 0%, #6366f1 100%); border-radius: 12px; min-height: 280px;">
  <h4 style="color: #c7d2fe; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Position Demo</h4>
  <div style="display: flex; gap: 8px; margin-bottom: 16px;">
    <button data-on:click="$position = 'static'; $hasOffset = false" data-class:active="$position === 'static'" style="padding: 6px 12px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Static</button>
    <button data-on:click="$position = 'relative'" data-class:active="$position === 'relative'" style="padding: 6px 12px; background: #4338ca; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Relative</button>
    <button data-on:click="$position = 'absolute'" data-class:active="$position === 'absolute'" style="padding: 6px 12px; background: #3730a3; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Absolute</button>
    <button data-on:click="$position = 'fixed'" data-class:active="$position === 'fixed'" style="padding: 6px 12px; background: #312e81; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Fixed</button>
  </div>
  <div style="position: relative; height: 140px; background: rgba(255,255,255,0.15); border-radius: 8px; overflow: hidden;">
    <div style="position: absolute; top: 10px; left: 10px; color: rgba(255,255,255,0.4); font-size: 11px;">Container</div>
    <div data-on:click="($position === 'relative' || $position === 'absolute') && ($hasOffset = !$hasOffset)" style="position: absolute; top: 40px; left: 40px; width: 80px; height: 60px; background: linear-gradient(135deg, #818cf8, #6366f1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 12px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(99,102,241,0.4);" data-style:position="$position)" data-style:top="($hasOffset && ($position === 'relative' || $position === 'absolute') ? '10px' : '40px'), $hasOffset && ($position === 'relative' || $position === 'absolute') ? '10px' : '40px')" data-style:left="($hasOffset && ($position === 'relative' || $position === 'absolute') ? '100px' : '40px'), $hasOffset && ($position === 'relative' || $position === 'absolute') ? '100px' : '40px')">
      Click me
    </div>
  </div>
  <div style="margin-top: 12px; color: #c7d2fe; font-size: 12px; text-align: center;" data-text="'position: ' + $position + (($position === 'relative' || $position === 'absolute') ? ' (click box to offset)' : '')"></div>
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
    interactiveDemo: `<div data-signals:heroindex="0" style="font-family: system-ui, sans-serif; padding: 20px; background: linear-gradient(135deg, #14532d 0%, #22c55e 100%); border-radius: 12px; min-height: 280px;">
  <h4 style="color: #86efac; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Hero Gallery</h4>
  <div style="display: flex; gap: 8px; margin-bottom: 16px;">
    <button data-on:click="$heroindex = 0" data-class:active="$heroindex === 0" style="padding: 6px 12px; background: #16a34a; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Gradient</button>
    <button data-on:click="$heroindex = 1" data-class:active="$heroindex === 1" style="padding: 6px 12px; background: #15803d; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Solid</button>
    <button data-on:click="$heroindex = 2" data-class:active="$heroindex === 2" style="padding: 6px 12px; background: #166534; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Image</button>
    <button data-on:click="$heroindex = 3" data-class:active="$heroindex === 3" style="padding: 6px 12px; background: #14532d; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Pattern</button>
  </div>
  <div data-on:click="$heroindex = ($heroindex + 1) % 4" style="height: 140px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; transition: all 0.5s ease; cursor: pointer;" data-style:background="($heroindex === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : $heroindex === 1 ? '#1e3a5f' : $heroindex === 2 ? 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(https://picsum.photos/400/200?random=1)' : 'repeating-linear-gradient(45deg, #22c55e 0px, #22c55e 10px, #16a34a 10px, #16a34a 20px)'), $heroindex === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : $heroindex === 1 ? '#1e3a5f' : $heroindex === 2 ? 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(https://picsum.photos/400/200?random=1)' : 'repeating-linear-gradient(45deg, #22c55e 0px, #22c55e 10px, #16a34a 10px, #16a34a 20px)')">
    <h3 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Welcome Home</h3>
    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.9);">Click to cycle backgrounds</p>
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
    estimatedTime: "1-2 hours",
    prerequisites: ["Basic CSS"],
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
    interactiveDemo: `<div data-signals:boxmargin="'20px'" data-signals:boxpadding="'30px'" data-signals:boxborder="'8px'" style="font-family: system-ui, sans-serif; padding: 20px; background: linear-gradient(135deg, #7c2d12 0%, #ea580c 100%); border-radius: 12px; min-height: 280px;">
  <h4 style="color: #fed7aa; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Box Visualizer</h4>
  <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
    <button data-on:click="$boxmargin = '0px'" data-class:active="$boxmargin === '0px'" style="padding: 5px 10px; background: #c2410c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">0px</button>
    <button data-on:click="$boxmargin = '20px'" data-class:active="$boxmargin === '20px'" style="padding: 5px 10px; background: #c2410c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">20px</button>
    <button data-on:click="$boxmargin = '40px'" data-class:active="$boxmargin === '40px'" style="padding: 5px 10px; background: #c2410c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">40px</button>
    <button data-on:click="$boxpadding = '10px'" data-class:active="$boxpadding === '10px'" style="padding: 5px 10px; background: #ea580c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">10px</button>
    <button data-on:click="$boxpadding = '30px'" data-class:active="$boxpadding === '30px'" style="padding: 5px 10px; background: #ea580c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">30px</button>
    <button data-on:click="$boxpadding = '50px'" data-class:active="$boxpadding === '50px'" style="padding: 5px 10px; background: #ea580c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">50px</button>
    <button data-on:click="$boxborder = '0px'" data-class:active="$boxborder === '0px'" style="padding: 5px 10px; background: #f97316; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">0px</button>
    <button data-on:click="$boxborder = '8px'" data-class:active="$boxborder === '8px'" style="padding: 5px 10px; background: #f97316; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">8px</button>
    <button data-on:click="$boxborder = '16px'" data-class:active="$boxborder === '16px'" style="padding: 5px 10px; background: #f97316; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">16px</button>
  </div>
  <div style="display: flex; justify-content: center; align-items: center; height: 140px; background: rgba(255,255,255,0.1); border-radius: 8px; position: relative;">
    <div style="position: absolute; top: 8px; left: 8px; color: rgba(255,255,255,0.5); font-size: 10px;">margin</div>
    <div style="background: rgba(252, 211, 77, 0.3); padding: 20px; border-radius: 4px; transition: all 0.3s ease;" data-style:padding="$boxmargin)">
      <div style="position: absolute; top: 50px; left: 8px; color: rgba(255,255,255,0.5); font-size: 10px;">border</div>
      <div style="background: rgba(251, 146, 60, 0.5); padding: 8px; border-radius: 4px; transition: all 0.3s ease;" data-style:padding="$boxborder)">
        <div style="position: absolute; top: 90px; left: 8px; color: rgba(255,255,255,0.5); font-size: 10px;">padding</div>
        <div style="background: white; padding: 30px; border-radius: 4px; color: #7c2d12; font-weight: 600; font-size: 14px; text-align: center; transition: all 0.3s ease;" data-style:padding="$boxpadding)">
          Content
        </div>
      </div>
    </div>
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
    estimatedTime: "1-2 hours",
    prerequisites: ["Basic HTML", "Basic CSS"],
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
    interactiveDemo: `<div data-signals:timing="'ease'" data-signals:_hover1="false" data-signals:_hover2="false" data-signals:_clicked="false" data-signals:_focused="false" style="font-family: system-ui, sans-serif; padding: 20px; background: linear-gradient(135deg, #581c87 0%, #a855f7 100%); border-radius: 12px; min-height: 280px;">
  <h4 style="color: #e9d5ff; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Micro-interaction Lab</h4>
  <div style="display: flex; gap: 8px; margin-bottom: 16px;">
    <button data-on:click="$timing = 'ease'" data-class:active="$timing === 'ease'" style="padding: 6px 10px; background: #7c3aed; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Ease</button>
    <button data-on:click="$timing = 'linear'" data-class:active="$timing === 'linear'" style="padding: 6px 10px; background: #6d28d9; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Linear</button>
    <button data-on:click="$timing = 'ease-in'" data-class:active="$timing === 'ease-in'" style="padding: 6px 10px; background: #5b21b6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Ease-in</button>
    <button data-on:click="$timing = 'ease-out'" data-class:active="$timing === 'ease-out'" style="padding: 6px 10px; background: #4c1d95; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Ease-out</button>
    <button data-on:click="$timing = 'ease-in-out'" data-class:active="$timing === 'ease-in-out'" style="padding: 6px 10px; background: #3b0764; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 11px;">Ease-in-out</button>
  </div>
  <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; height: 140px; background: rgba(255,255,255,0.1); border-radius: 8px; padding: 20px; align-items: center;">
    <div data-on:mouseenter="$_hover1 = true" data-on:mouseleave="$_hover1 = false" data-style:transform="($_hover1 ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'), $_hover1 ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)')" data-style:background="$_hover1 ? '#7c3aed' : '#c084fc')" data-style:transition="$timing === 'ease' ? 'all 0.5s ease' : 'all 0.5s ' + $timing)" style="padding: 12px 20px; background: #c084fc; color: white; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 500; border: none;">Hover Me</div>
    <div data-on:mouseenter="$_hover2 = true" data-on:mouseleave="$_hover2 = false" data-style:transform="($_hover2 ? 'scale(1.2)' : 'scale(1)'), $_hover2 ? 'scale(1.2)' : 'scale(1)')" data-style:transition="$timing === 'ease' ? 'all 0.5s ease' : 'all 0.5s ' + $timing)" style="width: 50px; height: 50px; background: #a855f7; border-radius: 12px; cursor: pointer;"></div>
    <div data-on:click="$_clicked = !$_clicked" data-style:transform="($_clicked ? 'scale(0.95)' : 'scale(1)'), $_clicked ? 'scale(0.95)' : 'scale(1)')" data-style:background="$_clicked ? '#ec4899' : '#9333ea')" data-style:transition="$timing === 'ease' ? 'all 0.5s ease' : 'all 0.5s ' + $timing)" style="padding: 10px 16px; background: #9333ea; color: white; border-radius: 6px; cursor: pointer; font-size: 12px;">Click Toggle</div>
    <input type="text" placeholder="Focus me" data-on:focus="$_focused = true" data-on:blur="$_focused = false" data-style:border-color="$_focused ? '#a855f7' : 'transparent')" data-style:width="$_focused ? '140px' : '100px')" data-style:transition="$timing === 'ease' ? 'all 0.5s ease' : 'all 0.5s ' + $timing)" style="padding: 10px 14px; border-radius: 6px; border: 2px solid transparent; outline: none; font-size: 12px; width: 100px;">
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
    estimatedTime: "1-2 hours",
    prerequisites: ["Basic CSS selectors"],
  },
};

export const COLLECTIONS_LIST = Object.values(COLLECTIONS);
