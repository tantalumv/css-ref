import { test, expect } from "@playwright/test";

test("CSS Ref renders cards", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".card").first()).toBeVisible();

  const grid = page.locator("#grid");
  const cardCount = await grid.locator(".card").count();
  expect(cardCount).toBeGreaterThan(0);

  const totalDataCount = await page.evaluate(() => (window as any).P.length);
  expect(cardCount).toBe(totalDataCount);
});
