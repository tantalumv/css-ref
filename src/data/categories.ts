export interface CategoryMeta {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  intro: string;
  concepts: string[];
  related: string[];
}

export const CATEGORIES: Record<string, CategoryMeta> = {
  Layout: {
    id: "Layout",
    name: "Layout",
    slug: "layout",
    description: "Core CSS properties for controlling element positioning and document flow",
    icon: "ri-layout-grid-line",
    color: "#6366f1",
    intro: "Layout properties form the foundation of CSS design by controlling how elements are positioned and sized within the document. These properties determine whether elements stack vertically, sit inline with text, or break out of the normal flow entirely. Mastering layout is essential for building responsive, well-structured web pages.",
    concepts: [
      "Normal flow: The default way browsers lay out elements (block-level stack, inline flow)",
      "display property: Controls how an element generates boxes in the layout tree",
      "position property: Places elements relative to their containing block or viewport",
      "Stacking context: Determines the Z-axis order of overlapping elements",
      "Containing block: The ancestor used as reference for sizing and positioning"
    ],
    related: ["Flexbox", "Grid", "Spacing"]
  },
  Flexbox: {
    id: "Flexbox",
    name: "Flexbox",
    slug: "flexbox",
    description: "A one-dimensional layout method for arranging items in rows or columns",
    icon: "ri-layout-row-line",
    color: "#8b5cf6",
    intro: "Flexbox (Flexible Box Layout) is a CSS layout module designed for one-dimensional layouts — either as a row or a column. It excels at distributing space along a single axis and aligning items within a container. Unlike traditional block/inline layouts, flexbox gives you precise control over how items grow, shrink, and align.",
    concepts: [
      "Main axis: The primary direction items are laid out (horizontal by default)",
      "Cross axis: Perpendicular to the main axis (vertical by default)",
      "Flex container: The parent element with display: flex",
      "Flex item: Child elements that participate in flex layout",
      "Free space: Remaining space after items have their natural size"
    ],
    related: ["Grid", "Spacing", "Layout"]
  },
  Grid: {
    id: "Grid",
    name: "Grid",
    slug: "grid",
    description: "A two-dimensional layout system for creating complex web layouts",
    icon: "ri-layout-column-line",
    color: "#ec4899",
    intro: "CSS Grid Layout is a powerful two-dimensional layout system that revolutionizes how we build web interfaces. Unlike Flexbox which works along a single axis, Grid lets you define both rows and columns simultaneously, making it perfect for page-level layouts and complex component designs. It treats the layout as a whole rather than individual items.",
    concepts: [
      "Grid container: Parent element with display: grid",
      "Grid tracks: The rows and columns that define the layout structure",
      "Grid line: The dividing lines between adjacent tracks (horizontal or vertical)",
      "Grid cell: The intersection of a row and column track",
      "Grid area: A rectangular region defined by start and end grid lines"
    ],
    related: ["Flexbox", "Layout", "Spacing"]
  },
  Typography: {
    id: "Typography",
    name: "Typography",
    slug: "typography",
    description: "Properties for controlling text appearance, fonts, and readability",
    icon: "ri-font-size",
    color: "#14b8a6",
    intro: "Typography in CSS encompasses everything about how text is displayed — from font selection and sizing to line height and text decoration. Good typography is crucial for readability, accessibility, and visual hierarchy. CSS provides extensive control over every aspect of text rendering.",
    concepts: [
      "Font family: The typeface or list of typefaces to use for text",
      "Font size: The visual size of text, affecting readability and hierarchy",
      "Line height: The vertical space between lines of text",
      "Text alignment: How text is positioned horizontally within its container",
      "Web fonts: Custom fonts loaded via @font-face or font services"
    ],
    related: ["Color", "Visual", "Spacing"]
  },
  Color: {
    id: "Color",
    name: "Color",
    slug: "color",
    description: "Properties for applying colors, transparency, and opacity to elements",
    icon: "ri-palette-line",
    color: "#f59e0b",
    intro: "Color properties determine the visual appearance of elements through their foreground (text) and background colors. CSS supports multiple color formats including hex codes, RGB, HSL, and named colors. Understanding color is fundamental to creating visually appealing and accessible designs.",
    concepts: [
      "color property: Sets the foreground color of text content",
      "background-color: Sets the background color behind an element's content",
      "Color formats: hex, rgb(), rgba(), hsl(), hsla(), and named colors",
      "Opacity vs transparency: How each affects element visibility",
      "currentColor: A keyword that inherits the element's color property"
    ],
    related: ["Typography", "Visual", "CSS Variables"]
  },
  Sizing: {
    id: "Sizing",
    name: "Sizing",
    slug: "sizing",
    description: "Properties for controlling element dimensions and viewport-based sizing",
    icon: "ri-expand-width-horizontal-line",
    color: "#06b6d4",
    intro: "Sizing properties define how big or small elements appear on the page. This includes fixed sizes, responsive percentages, and viewport-relative units. Proper sizing is essential for creating layouts that work across different screen sizes and maintain consistent proportions.",
    concepts: [
      "width and height: Set the intrinsic dimensions of an element",
      "min/max-width/height: Constrain element dimensions within a range",
      "Viewport units: vw, vh, vmin, vmax relative to the browser viewport",
      "box-sizing: Controls how padding/border affect element's total dimensions",
      "Intrinsic vs extrinsic sizing: Natural content size vs specified size"
    ],
    related: ["Layout", "Spacing", "Grid"]
  },
  Visual: {
    id: "Visual",
    name: "Visual",
    slug: "visual",
    description: "Properties for styling borders, backgrounds, shadows, and visual effects",
    icon: "ri-eye-line",
    color: "#84cc16",
    intro: "Visual properties give elements their distinctive appearance through borders, backgrounds, shadows, and effects. These properties transform plain HTML elements into polished UI components. They are essential for creating depth, hierarchy, and visual interest in your designs.",
    concepts: [
      "background: Shorthand for background-color, image, position, and more",
      "border: Sets width, style, and color of an element's border",
      "box-shadow: Creates drop shadows or inner shadows around elements",
      "border-radius: Rounds the corners of an element's outer border edge",
      "opacity: Controls the transparency of an element and its children"
    ],
    related: ["Color", "Animation", "Transform"]
  },
  Animation: {
    id: "Animation",
    name: "Animation",
    slug: "animation",
    description: "Properties for creating transitions and keyframe-based animations",
    icon: "ri-movie-line",
    color: "#f43f5e",
    intro: "Animation properties bring interfaces to life through motion and transitions. CSS animations can range from simple hover effects to complex multi-step sequences. They enhance user experience by providing visual feedback, guiding attention, and making interactions feel polished.",
    concepts: [
      "transition: Animates property changes over a specified duration",
      "animation: Applies keyframe animations with timing and iteration control",
      "Keyframes: Define the start, end, and intermediate states of an animation",
      "Timing functions: Control acceleration/deceleration (ease, linear, cubic-bezier)",
      "Animation properties: duration, delay, iteration-count, direction, fill-mode"
    ],
    related: ["Transform", "Visual", "Interactivity"]
  },
  Transform: {
    id: "Transform",
    name: "Transform",
    slug: "transform",
    description: "Properties for rotating, scaling, skewing, and translating elements",
    icon: "ri-drag-move-line",
    color: "#10b981",
    intro: "Transform properties modify an element's appearance by rotating, scaling, skewing, or moving it without affecting document flow. Transforms are hardware-accelerated in most browsers, making them performant for animations. They work in both 2D and 3D space.",
    concepts: [
      "translate: Moves an element along X, Y (and Z in 3D) axes",
      "rotate: Rotates an element around a point or axis",
      "scale: Enlarges or shrinks an element proportionally",
      "skew: Slants an element along X or Y axis",
      "transform-origin: Sets the point around which transformations occur"
    ],
    related: ["Animation", "Visual", "Transform"]
  },
  Spacing: {
    id: "Spacing",
    name: "Spacing",
    slug: "spacing",
    description: "Properties for controlling margin, padding, and gap between elements",
    icon: "ri-spacing",
    color: "#f97316",
    intro: "Spacing properties manage the distance between elements and their content. Proper spacing improves readability, creates visual hierarchy, and establishes consistent rhythm throughout a design. CSS offers multiple ways to control spacing, each with specific use cases.",
    concepts: [
      "margin: Space outside an element's border (pushes other elements away)",
      "padding: Space inside an element's border (between border and content)",
      "gap: Space between flex/grid items (shorthand for row-gap and column-gap)",
      "Margin collapse: Vertical margins of adjacent elements may combine",
      "Negative margins: Can pull elements closer together than their natural position"
    ],
    related: ["Layout", "Flexbox", "Grid"]
  },
  Interactivity: {
    id: "Interactivity",
    name: "Interactivity",
    slug: "interactivity",
    description: "Properties for cursor, selection, scrolling, and user interaction states",
    icon: "ri-mouse-line",
    color: "#0ea5e9",
    intro: "Interactivity properties control how users interact with elements through the cursor, text selection, scrolling behavior, and focus states. These properties enhance usability and provide visual feedback that guides users through your interface.",
    concepts: [
      "cursor: Specifies the mouse cursor displayed when hovering over an element",
      "user-select: Controls whether text can be selected by the user",
      "overflow: Controls content that overflows an element's box",
      "scroll-behavior: Defines smooth scrolling behavior for scrollable elements",
      "pointer-events: Controls whether an element can respond to pointer events"
    ],
    related: ["Animation", "Visual", "UI Components"]
  },
  "CSS Variables": {
    id: "CSS Variables",
    name: "CSS Variables",
    slug: "css-variables",
    description: "Custom properties for creating reusable values throughout stylesheets",
    icon: "ri-code-box-line",
    color: "#a855f7",
    intro: "CSS Variables (officially called custom properties) allow you to define reusable values that can be used throughout your stylesheet. They enable dynamic theming, easier maintenance, and more powerful design systems by centralizing values that might change across your design.",
    concepts: [
      "--variable-name: Custom property syntax using double dashes prefix",
      "var(): Function to reference a custom property value",
      "Inheritance: Custom properties inherit down to child elements",
      "Fallback values: Provide alternate values when a variable isn't defined",
      "Runtime modification: Variables can be changed via JavaScript for dynamic theming"
    ],
    related: ["Color", "Sizing", "Typography"]
  },
  Queries: {
    id: "Queries",
    name: "Queries",
    slug: "queries",
    description: "Media queries, container queries, and feature detection for responsive design",
    icon: "ri-responsive-line",
    color: "#e11d48",
    intro: "Query properties enable responsive and adaptive design by applying styles based on device characteristics, viewport size, or container dimensions. They are essential for building designs that work across the vast range of devices and screen sizes.",
    concepts: [
      "Media queries: Apply styles based on viewport size, device type, or orientation",
      "@media rules: The at-rule syntax for conditional CSS",
      "Container queries: Style elements based on their parent container's size",
      "Feature queries: Apply styles based on browser support (@supports)",
      "Breakpoints: Viewport widths where layout adapts to different screen sizes"
    ],
    related: ["Layout", "Grid", "Flexbox"]
  },
  Selectors: {
    id: "Selectors",
    name: "Selectors",
    slug: "selectors",
    description: "CSS selector syntax for targeting HTML elements with precision",
    icon: "ri-checkbox-multiple-blank-line",
    color: "#7c3aed",
    intro: "Selectors are the foundation of CSS — they define which elements your styles apply to. CSS offers an incredibly powerful selector system ranging from simple element names to complex patterns that can target elements based on attributes, states, position, and more.",
    concepts: [
      "Type selectors: Target elements by their tag name (div, p, span)",
      "Class and ID selectors: Target elements with specific class or id attributes",
      "Attribute selectors: Target elements based on their attributes ([type=text])",
      "Pseudo-classes: Target elements in specific states (:hover, :first-child)",
      "Pseudo-elements: Style parts of elements (::before, ::after, ::first-line)"
    ],
    related: ["Interactivity", "UI Components", "Misc"]
  },
  "UI Components": {
    id: "UI Components",
    name: "UI Components",
    slug: "ui-components",
    description: "Properties for styling form controls and UI elements",
    icon: "ri-apps-line",
    color: "#0891b2",
    intro: "UI Component properties style the interactive elements that users interact with — forms, buttons, inputs, and other interface controls. These properties define how user interface elements appear and behave, creating the bridge between functional forms and visually appealing interfaces.",
    concepts: [
      "Form elements: input, button, select, textarea styling capabilities",
      "Focus states: Visual feedback when an element receives focus",
      "Placeholder styling: Customizing input placeholder text appearance",
      "Form validation: Styling based on valid/invalid input states",
      "Button variants: Different visual styles for different button types"
    ],
    related: ["Interactivity", "Typography", "Visual"]
  },
  Tables: {
    id: "Tables",
    name: "Tables",
    slug: "tables",
    description: "Properties specifically for styling table layouts and data",
    icon: "ri-table-line",
    color: "#65a30d",
    intro: "Table properties control the layout and appearance of tabular data. While tables use HTML structure, CSS properties determine how the data is presented — from border styles and cell padding to entire table layout algorithms that affect how columns size themselves.",
    concepts: [
      "table-layout: Controls how column widths are calculated (fixed vs auto)",
      "border-collapse: Merges or separates borders between table cells",
      "border-spacing: Sets the space between adjacent cell borders",
      "caption-side: Positions the table caption (top or bottom)",
      "empty-cells: Controls visibility of cells with no content"
    ],
    related: ["Layout", "Visual", "Typography"]
  },
  Lists: {
    id: "Lists",
    name: "Lists",
    slug: "lists",
    description: "Properties for styling ordered, unordered, and custom list markers",
    icon: "ri-list-unordered",
    color: "#d97706",
    intro: "List properties control the presentation of list items — ordered and unordered lists, their markers, and positioning. CSS provides extensive control over how list markers appear, from traditional bullets and numbers to completely custom images.",
    concepts: [
      "list-style: Shorthand for type, position, and image",
      "list-style-type: Sets the marker character (disc, circle, square, decimal, etc.)",
      "list-style-position: Places markers inside or outside the list item box",
      "list-style-image: Uses a custom image as the list marker",
      "marker pseudo-element: Styles the actual marker bullet/number"
    ],
    related: ["Typography", "Visual", "UI Components"]
  },
  Misc: {
    id: "Misc",
    name: "Misc",
    slug: "misc",
    description: "Miscellaneous properties that don't fit other categories",
    icon: "ri-more-fill",
    color: "#6b7280",
    intro: "Miscellaneous properties cover useful CSS features that don't belong in other categories. This includes properties for content generation, quotes, text direction, and other specialized behaviors that enhance your designs in specific ways.",
    concepts: [
      "content: Generates content (often used with ::before and ::after)",
      "quotes: Defines quotation marks for embedded quotations",
      "direction: Sets text direction (ltr or rtl) for internationalization",
      "unicode-bidi: Controls bidirectional text formatting",
      "visibility: Shows/hides elements while preserving their space in layout"
    ],
    related: ["Typography", "Visual", "Selectors"]
  },
  Breaks: {
    id: "Breaks",
    name: "Breaks",
    slug: "breaks",
    description: "Properties for controlling page, column, and region breaks",
    icon: "ri-page-separator-line",
    color: "#db2777",
    intro: "Break properties control how content flows across pages in paged media, columns in multi-column layouts, and regions in CSS regions. They determine where content should be split and how it should behave at those break points.",
    concepts: [
      "page-break-before/after: Controls page breaks before/after an element",
      "break-before/after: More general property for page, column, or region breaks",
      "break-inside: Prevents breaks from occurring inside an element",
      "orphans and widows: Controls minimum lines at top/bottom of pages",
      "column-break: Controls column breaks in multi-column layouts"
    ],
    related: ["Layout", "Typography", "Visual"]
  }
};
