import { test, expect } from "@playwright/test";

test.describe("Collection Visual Meta-Themes", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Grid collection renders blueprint toggle and layout", async ({ page }) => {
    await page.goto("/#!grid");
    await page.waitForTimeout(3000);
    
    // Check meta-class
    const container = page.locator(".collection-page");
    await expect(container).toHaveClass(/layout-grid/);

    // Check toggle
    const toggle = page.locator(".grid-visualizer-toggle");
    await expect(toggle).toBeVisible();
    await toggle.click();
    
    // Give Datastar a moment to update classes
    await expect(container).toHaveClass(/show-grid-overlay/);
    
    // Check annotations - I added a 3rd one in the enrichment phase
    await expect(page.locator(".annotation-marker")).toHaveCount(3);
  });

  test("Box Model collection renders visual wrappers", async ({ page }) => {
    await page.goto("/#!box-model");
    await page.waitForTimeout(2000);
    
    await expect(page.locator(".collection-page")).toHaveClass(/layout-box-model/);
    await expect(page.locator(".box-model-visualizer-wrap").first()).toBeVisible();
    await expect(page.locator(".box-margin-label").first()).toHaveText("margin");
    await expect(page.locator(".box-padding-label").first()).toHaveText("padding");
  });

  test("Typography collection renders magazine style", async ({ page }) => {
    await page.goto("/#!typography");
    await page.waitForTimeout(2000);
    
    await expect(page.locator(".collection-page")).toHaveClass(/layout-typography/);
    
    // Check drop cap
    const intro = page.locator(".intro-text");
    await expect(intro).toHaveClass(/drop-cap/);
    const dropCapStyles = await intro.evaluate((el) => {
      const firstLetter = window.getComputedStyle(el, "::first-letter");
      return {
        fontSize: firstLetter.fontSize,
        float: firstLetter.float
      };
    });
    expect(parseFloat(dropCapStyles.fontSize)).toBeGreaterThan(40);
    expect(dropCapStyles.float).toBe("left");
    
    // Check multi-column reference list
    const propList = page.locator(".properties-list");
    const columnCount = await propList.evaluate((el) => window.getComputedStyle(el).columnCount);
    expect(parseInt(columnCount)).toBeGreaterThan(1);
  });

  test("Animation collection renders play/pause toggle", async ({ page }) => {
    await page.goto("/#!animation");
    await page.waitForTimeout(3000);
    
    const container = page.locator(".collection-page");
    await expect(container).toHaveClass(/layout-animation/);

    const toggle = page.locator(".animation-play-pause-toggle");
    await expect(toggle).toBeVisible();
    await toggle.click();
    
    // Give Datastar a moment
    await expect(container).toHaveClass(/global-animation-paused/);
  });

  test("Color collection renders contrast badges", async ({ page }) => {
    await page.goto("/#!color");
    await page.waitForTimeout(2000);
    
    await expect(page.locator(".collection-page")).toHaveClass(/layout-color/);
    await expect(page.locator(".contrast-badge").first()).toBeVisible();
    await expect(page.locator(".badge-label").first()).toHaveText("WCAG AAA");
  });

  test("Interactivity collection renders sticky layers", async ({ page }) => {
    // The collection with interactivity theme is 'layout'
    await page.goto("/#!layout");
    await page.waitForTimeout(2000);
    
    await expect(page.locator(".collection-page")).toHaveClass(/layout-layout/);
    const layer = page.locator(".interactivity-layer").first();
    await expect(layer).toBeVisible();
    const stickyStyles = await layer.evaluate((el) => window.getComputedStyle(el).position);
    expect(stickyStyles).toBe("sticky");
  });

  test("Flexbox collection renders stretch and flow theme", async ({ page }) => {
    await page.goto("/#!flexbox");
    await page.waitForTimeout(2000);
    
    await expect(page.locator(".collection-page")).toHaveClass(/layout-flexbox/);
    const canvas = page.locator(".demo-canvas-area");
    await expect(canvas).toBeVisible();
    
    // Check for the theme-specific background gradient
    const bgImage = await canvas.evaluate((el) => window.getComputedStyle(el).backgroundImage);
    expect(bgImage).toContain("repeating-linear-gradient");
    
    // Check for dynamic indicators (the ↔ symbol)
    const indicator = page.locator(".demo-item-box").first();
    const content = await indicator.evaluate((el) => {
      return window.getComputedStyle(el, "::after").content;
    });
    expect(content).toContain("↔");
  });
});
