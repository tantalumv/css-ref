import { test, expect } from "@playwright/test";

test("CSS Ref renders cards", async ({ page }) => {
  // Capture console logs
  const consoleLogs: string[] = [];
  page.on("console", (msg) => consoleLogs.push(msg.text()));

  // Capture errors
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  // Serve the app
  await page.goto("http://localhost:2005");

  // Wait a bit for JS to run
  await page.waitForTimeout(1000);

  // Log console output
  console.log("Console logs:", consoleLogs);
  console.log("Page errors:", errors);

  // Take a screenshot
  await page.screenshot({ path: "test-results/screenshot.png" });

  // Check if grid has children
  const grid = page.locator("#grid");
  const cardCount = await grid.locator(".card").count();
  console.log("Card count:", cardCount);

  // Compare against source data count exposed on window
  const totalDataCount = await page.evaluate(() => (window as any).P.length);
  console.log("Total data count:", totalDataCount);

  // Get grid HTML
  const gridHTML = await grid.innerHTML();
  console.log("Grid HTML (first 500):", gridHTML.substring(0, 500));

  // Expect cards to be rendered
  expect(cardCount).toBeGreaterThan(0);
  expect(cardCount).toBe(totalDataCount);
});
