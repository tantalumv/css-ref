#!/usr/bin/env bun
/**
 * Datastar Manifest Generator
 *
 * Scans src/main.ts for window exports and generates/updates
 * datastar-manifest.json for linting and validation.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";

interface ManifestExport {
  type: string;
  signature?: string;
  description: string;
}

interface ManifestSignal {
  type: string;
  default: unknown;
  description: string;
}

interface Manifest {
  $schema: string;
  version: string;
  description: string;
  generated: string;
  sources: string[];
  exports: Record<string, Record<string, ManifestExport>>;
  signals: Record<string, ManifestSignal>;
  allowedDatastarAttributes: string[];
}

const DEFAULT_MANIFEST: Manifest = {
  $schema: "./schemas/datastar-manifest.schema.json",
  version: "1.0.0",
  description: "Datastar window exports manifest for css-ref project",
  generated: new Date().toISOString().split("T")[0],
  sources: ["src/main.ts"],
  exports: {},
  signals: {
    query: { type: "string", default: "", description: "Search query" },
    activeCats: { type: "string[]", default: [], description: "Active category filters" },
    activeInterops: { type: "string[]", default: [], description: "Active interop filters" },
    viewMode: { type: "'grid' | 'table'", default: "'grid'", description: "Current view mode" },
    popoverOpen: { type: "boolean", default: false, description: "Filter popover state" },
    theme: { type: "'dark' | 'light'", default: "'dark'", description: "Current theme" },
  },
  allowedDatastarAttributes: [
    "data-signals",
    "data-bind:*",
    "data-on:*",
    "data-on:*__*",
    "data-show",
    "data-class:*",
    "data-text",
    "data-effect",
    "data-init",
    "data-computed",
  ],
};

// Known export categories based on naming conventions
const EXPORT_CATEGORIES: Record<string, string> = {
  P: "data",
  CATS: "data",
  INTEROPS: "data",
  CC: "data",
  IL: "data",
  IC: "data",
  bIcon: "utilities",
  filtered: "filters",
  hasFilters: "filters",
  updateFilterBtn: "ui",
  renderChips: "ui",
  renderGrid: "ui",
  showDetail: "ui",
  showList: "ui",
  toggleInArray: "helpers",
  initGrid: "table",
  loadMoreTableRows: "table",
  checkSentinelVisible: "table",
  startTablePolling: "table",
  stopTablePolling: "table",
};

// Known descriptions for exports
const EXPORT_DESCRIPTIONS: Record<string, string> = {
  P: "All CSS properties data",
  CATS: "Available categories",
  INTEROPS: "Interop status keys",
  CC: "Category colors map",
  IL: "Interop labels map",
  IC: "Interop colors map",
  bIcon: "Generate browser icon HTML",
  filtered: "Filter properties by query, categories, and interop status",
  hasFilters: "Check if any filters are active",
  updateFilterBtn: "Update filter button visual state",
  renderChips: "Render category and interop chips",
  renderGrid: "Render grid view with property cards",
  showDetail: "Show property detail view",
  showList: "Return to list view from detail",
  toggleInArray: "Toggle item in array (returns new array)",
  initGrid: "Initialize Grid.js table view",
  loadMoreTableRows: "Load next batch of table rows (infinite scroll)",
  checkSentinelVisible: "Check if sentinel is visible and load more if needed",
  startTablePolling: "Start manual polling for infinite scroll",
  stopTablePolling: "Stop manual polling for infinite scroll",
};

function extractWindowExports(content: string): Array<{ name: string; type: string }> {
  const exports: Array<{ name: string; type: string }> = [];

  // Pattern: (window as any).X = ...
  const windowExportPattern = /\(window as any\)\.([A-Za-z_][A-Za-z0-9_]*)\s*=/g;

  // Pattern: (window as any).X = function(...)
  const functionPattern = /\(window as any\)\.([A-Za-z_][A-Za-z0-9_]*)\s*=\s*function\s*\(/g;

  // Pattern: (window as any).X = (args) => ...
  const arrowPattern = /\(window as any\)\.([A-Za-z_][A-Za-z0-9_]*)\s*=\s*\([^)]*\)\s*=>/g;

  const seen = new Set<string>();

  let match;
  while ((match = windowExportPattern.exec(content)) !== null) {
    const name = match[1];
    if (seen.has(name)) continue;
    seen.add(name);

    // Check if it's a function
    const isFunction =
      functionPattern.test(content.slice(match.index, match.index + 100)) ||
      arrowPattern.test(content.slice(match.index, match.index + 100));

    exports.push({
      name,
      type: isFunction ? "function" : "value",
    });
  }

  return exports;
}

function extractFunctionSignatures(content: string, exportName: string): string | undefined {
  // Try to extract function signature from the code
  const patterns = [
    new RegExp(`\\(window as any\\)\\.${exportName}\\s*=\\s*function\\s*\\(([^)]*)\\)`, "i"),
    new RegExp(`\\(window as any\\)\\.${exportName}\\s*=\\s*\\(([^)]*)\\)\\s*=>`, "i"),
    new RegExp(
      `\\(window as any\\)\\.${exportName}\\s*=\\s*function\\s*([A-Za-z_][A-Za-z0-9_]*)\\s*\\(([^)]*)\\)`,
      "i",
    ),
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      const params = match[1] || match[2] || "";
      return `(${params}) => void`;
    }
  }

  return undefined;
}

function generateManifest(): Manifest {
  const mainTsPath = join(process.cwd(), "src", "main.ts");

  if (!existsSync(mainTsPath)) {
    console.error(`Error: ${mainTsPath} not found`);
    process.exit(1);
  }

  const content = readFileSync(mainTsPath, "utf-8");
  const exports = extractWindowExports(content);

  const manifest: Manifest = {
    ...DEFAULT_MANIFEST,
    generated: new Date().toISOString().split("T")[0],
  };

  // Build exports by category
  for (const exp of exports) {
    const category = EXPORT_CATEGORIES[exp.name] || "misc";
    const description = EXPORT_DESCRIPTIONS[exp.name] || `${exp.name} export`;

    if (!manifest.exports[category]) {
      manifest.exports[category] = {};
    }

    const exportData: ManifestExport = {
      type: exp.type,
      description,
    };

    if (exp.type === "function") {
      exportData.signature = extractFunctionSignatures(content, exp.name) || "() => void";
    }

    manifest.exports[category][exp.name] = exportData;
  }

  return manifest;
}

function main() {
  const args = process.argv.slice(2);
  const checkMode = args.includes("--check");
  const outputPath = join(process.cwd(), "datastar-manifest.json");

  const manifest = generateManifest();
  const manifestJson = JSON.stringify(manifest, null, 2);

  if (checkMode) {
    // Check if manifest is up to date
    if (!existsSync(outputPath)) {
      console.error("Error: datastar-manifest.json does not exist");
      console.error("Run: bun scripts/generate-manifest.ts");
      process.exit(1);
    }

    const existing = readFileSync(outputPath, "utf-8");
    if (existing !== manifestJson) {
      console.error("Error: datastar-manifest.json is out of date");
      console.error("Run: bun scripts/generate-manifest.ts");
      process.exit(1);
    }

    console.log("✓ datastar-manifest.json is up to date");
    return;
  }

  // Write manifest
  writeFileSync(outputPath, manifestJson);
  console.log(
    `✓ Generated datastar-manifest.json (${Object.keys(manifest.exports).length} categories, ${Object.values(manifest.exports).reduce((sum, cat) => sum + Object.keys(cat).length, 0)} exports)`,
  );

  // Also print summary
  console.log("\nExports by category:");
  for (const [category, exports] of Object.entries(manifest.exports)) {
    console.log(`  ${category}: ${Object.keys(exports).length}`);
  }
}

main();
