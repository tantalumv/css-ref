export interface StyleObject {
  [key: string]: string | number | undefined | null;
}

export interface FlexContainerOptions {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  gap?: string;
  padding?: string;
  alignItems?: string;
  justifyContent?: string;
  flexWrap?: string;
  width?: string;
  height?: string;
  background?: string;
  border?: string;
  borderRadius?: string;
}

export interface BoxOptions {
  background?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  cursor?: string;
  width?: string;
  height?: string;
  textAlign?: string;
  display?: string;
  [key: string]: string | number | undefined | null;
}

export interface GridContainerOptions {
  columns?: string;
  gap?: string;
  padding?: string;
  width?: string;
  background?: string;
}

export interface LabeledDemoOptions {
  labelPosition?: "top" | "bottom" | "left" | "right";
  labelColor?: string;
  gap?: string;
}

/**
 * Convert camelCase to kebab-case for CSS properties
 */
function toKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

/**
 * Build style attribute value from object
 */
export function buildStyle(styles: StyleObject): string {
  return Object.entries(styles)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${toKebabCase(key)}: ${value}`)
    .join("; ");
}

/**
 * Create a styled box element
 */
export function styledBox(content: string, options: BoxOptions = {}): string {
  const styles: StyleObject = {
    background: options.background || "#6366f1",
    color: options.color || "#fff",
    padding: options.padding || "8px",
    borderRadius: options.borderRadius || "4px",
    fontSize: options.fontSize,
    fontWeight: options.fontWeight || "700",
    cursor: options.cursor,
    width: options.width,
    height: options.height,
    textAlign: options.textAlign,
    border: options.border,
    display: options.display,
  };

  // Add any additional custom properties
  for (const [key, value] of Object.entries(options)) {
    if (!(key in styles) && value !== undefined && value !== null && value !== "") {
      styles[key] = value;
    }
  }

  return `<div style="${buildStyle(styles)}">${content}</div>`;
}

/**
 * Create a flex container with children
 */
export function flexContainer(
  children: string | string[],
  options: FlexContainerOptions = {},
): string {
  const styles: StyleObject = {
    display: "flex",
    flexDirection: options.direction || "row",
    gap: options.gap || "10px",
    padding: options.padding || "10px",
    alignItems: options.alignItems || "center",
    justifyContent: options.justifyContent,
    flexWrap: options.flexWrap,
    width: options.width,
    height: options.height,
    background: options.background,
    border: options.border,
    borderRadius: options.borderRadius,
  };

  const content = Array.isArray(children) ? children.join("") : children;
  return `<div style="${buildStyle(styles)}">${content}</div>`;
}

/**
 * Create a comparison demo with two states side-by-side
 */
export function comparisonDemo(
  leftContent: string,
  rightContent: string,
  leftStyles: BoxOptions,
  rightStyles: BoxOptions,
  containerOptions?: FlexContainerOptions,
): string {
  return flexContainer(
    [styledBox(leftContent, leftStyles), styledBox(rightContent, rightStyles)],
    containerOptions,
  );
}

/**
 * Create a grid container
 */
export function gridContainer(
  children: string | string[],
  options: GridContainerOptions = {},
): string {
  const styles: StyleObject = {
    display: "grid",
    gridTemplateColumns: options.columns || "repeat(auto-fit, minmax(100px, 1fr))",
    gap: options.gap || "10px",
    padding: options.padding || "10px",
    width: options.width || "100%",
    background: options.background,
  };

  const content = Array.isArray(children) ? children.join("") : children;
  return `<div style="${buildStyle(styles)}">${content}</div>`;
}

/**
 * Create a labeled demo item
 */
export function labeledDemo(
  label: string,
  demoContent: string,
  options: LabeledDemoOptions = {},
): string {
  const { labelPosition = "bottom", labelColor = "#888", gap = "4px" } = options;

  if (labelPosition === "top") {
    return `<div style="display:flex;flex-direction:column;gap:${gap}"><span style="font-size:9px;color:${labelColor};font-weight:700">${label}</span>${demoContent}</div>`;
  }

  if (labelPosition === "left") {
    return `<div style="display:flex;gap:8px;align-items:center"><span style="font-size:9px;color:${labelColor};font-weight:700">${label}</span>${demoContent}</div>`;
  }

  if (labelPosition === "right") {
    return `<div style="display:flex;gap:8px;align-items:center">${demoContent}<span style="font-size:9px;color:${labelColor};font-weight:700">${label}</span></div>`;
  }

  // bottom (default)
  return `<div style="display:flex;flex-direction:column;gap:${gap}">${demoContent}<span style="font-size:9px;color:${labelColor};font-weight:700">${label}</span></div>`;
}
