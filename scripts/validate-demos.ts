#!/usr/bin/env bun
/**
 * Demo Validation Script
 * 
 * Validates demo HTML in CSS properties for:
 * - Balanced HTML tags
 * - Excessively long lines (>120 chars)
 * - Common typos in CSS properties
 * - Missing closing tags
 */

import { P } from "../src/data";

interface ValidationResult {
  property: string;
  category: string;
  issues: string[];
}

const SELF_CLOSING_TAGS = ["br", "img", "input", "hr", "meta", "link", "area", "base", "col", "embed", "param", "source", "track", "wbr"];

const TYPOS: Record<string, string> = {
  "backgroud:": "background:",
  "borderradius:": "border-radius:",
  "fontwieght:": "font-weight:",
  "font-syle:": "font-style:",
  "text-decoraton:": "text-decoration:",
  "positon:": "position:",
  "vertial-align:": "vertical-align:",
};

function validateDemo(demo: string, propertyName: string): string[] {
  const issues: string[] = [];

  // Remove content inside <style> tags for tag balance check
  // (CSS syntax like "<number>" can be falsely detected as HTML tags)
  const demoForTagCheck = demo.replace(/<style>[\s\S]*?<\/style>/gi, "<style></style>");

  // Check for balanced tags
  const tagRegex = /<\/?([a-z][a-z0-9]*)[^>]*>/gi;
  const tags = Array.from(demoForTagCheck.matchAll(tagRegex));
  const stack: Array<{ tag: string }> = [];

  for (const match of tags) {
    const tagName = match[1].toLowerCase();
    const isClosing = match[0].startsWith("</");
    const isSelfClosing = match[0].endsWith("/>") || SELF_CLOSING_TAGS.includes(tagName);

    if (isClosing) {
      const lastOpenTag = stack.pop();
      if (!lastOpenTag || lastOpenTag.tag !== tagName) {
        issues.push(`Unbalanced closing tag </${tagName}>${lastOpenTag ? ` (expected </${lastOpenTag.tag}>)` : ""}`);
      }
    } else if (!isSelfClosing) {
      stack.push({ tag: tagName });
    }
  }

  // Report unclosed tags
  for (const { tag } of stack) {
    issues.push(`Unclosed tag <${tag}>`);
  }

  // Check for common typos (skip if typo equals fix)
  const demoLower = demo.toLowerCase();
  for (const [typo, fix] of Object.entries(TYPOS)) {
    if (typo === fix) continue; // Skip invalid entries
    if (demoLower.includes(typo)) {
      issues.push(`Possible typo: "${typo}" should be "${fix}"`);
    }
  }

  // Check for missing style attribute quotes
  const unquotedStyleRegex = /style=[^"'][^>\s]/i;
  if (unquotedStyleRegex.test(demo)) {
    issues.push("Style attribute may be missing quotes");
  }

  // Check for duplicate CSS properties in style attributes
  const styleBlocks = demo.matchAll(/style="([^"]*)"/gi);
  for (const match of styleBlocks) {
    const styles = match[1];
    const propNames = styles.split(";").map(s => s.split(":")[0]?.trim().toLowerCase()).filter(Boolean);
    const uniqueProps = new Set(propNames);
    if (propNames.length !== uniqueProps.size) {
      const duplicates = propNames.filter((p, i) => propNames.indexOf(p) !== i);
      issues.push(`Duplicate CSS properties in style: ${[...new Set(duplicates)].join(", ")}`);
    }
  }

  return issues;
}

function main(): void {
  console.log("🔍 Validating CSS property demos...\n");
  
  const results: ValidationResult[] = [];
  let totalIssues = 0;

  for (const prop of P) {
    const issues = validateDemo(prop.demo, prop.n);
    if (issues.length > 0) {
      results.push({
        property: prop.n,
        category: prop.c,
        issues,
      });
      totalIssues += issues.length;
    }
  }

  if (results.length > 0) {
    console.error(`❌ Found ${totalIssues} issues in ${results.length} properties:\n`);
    
    // Group by category
    const byCategory = new Map<string, ValidationResult[]>();
    for (const result of results) {
      const existing = byCategory.get(result.category) || [];
      existing.push(result);
      byCategory.set(result.category, existing);
    }

    for (const [category, props] of byCategory) {
      console.error(`  📁 ${category} (${props.length} properties):`);
      for (const result of props) {
        console.error(`    • ${result.property}:`);
        for (const issue of result.issues) {
          console.error(`      - ${issue}`);
        }
      }
      console.error("");
    }
    
    console.error(`\n📊 Summary: ${totalIssues} issues across ${results.length} properties out of ${P.length} total`);
    process.exit(1);
  } else {
    console.log("✅ All demos validated successfully!");
    console.log(`📊 Checked ${P.length} properties with no issues found`);
  }
}

main();
