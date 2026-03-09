import { test, expect } from "@playwright/test";

test("check overlay state", async ({ page }) => {
  await page.goto("/#!flexbox");
  await page.waitForTimeout(3000);
  
  // Check detail-view state
  const detailView = page.locator("#detail-view");
  const detailClass = await detailView.getAttribute("class");
  console.log("Detail view class:", detailClass);
  
  // Check if there's an overlay covering the page
  const overlay = page.locator(".sidebar-overlay.open, .command-palette-overlay.open");
  const overlayCount = await overlay.count();
  console.log("Open overlays:", overlayCount);
});
