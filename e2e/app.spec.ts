import { test, expect } from "@playwright/test";
import {
  waitForCards,
  openDropdown,
  switchToTable,
} from "./helpers";

test.describe("CSS Ref App", () => {
  test("homepage has title and search", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/CSS Ref/);
    await expect(page.getByPlaceholder("Search...")).toBeVisible();
  });

  test("can filter by category", async ({ page }) => {
    await page.goto("/");
    await waitForCards(page);

    const { menu, trigger } = await openDropdown(page, 0);
    await menu.locator('button.search-option:has-text("Layout")').click();
    await page.waitForTimeout(500);
    await expect(trigger).toBeVisible();
  });

  test("can switch to table view", async ({ page }) => {
    await page.goto("/");
    await waitForCards(page);
    await switchToTable(page);
    await expect(page.locator("#table-view")).toBeVisible();
  });

  test("can search for properties", async ({ page }) => {
    await page.goto("/");
    await waitForCards(page);

    const searchInput = page.getByPlaceholder("Search...");
    await searchInput.fill("flexbox");
    await page.waitForTimeout(300);

    await expect(page.locator(".card").first()).toContainText("flex");
  });

  test("can open detail view", async ({ page }) => {
    await page.goto("/");
    await waitForCards(page);
    await page.locator(".card").first().click();
    await expect(page.locator("#detail-view")).toBeVisible({ timeout: 10000 });
  });

  test("can go back from detail view", async ({ page }) => {
    await page.goto("/");
    await waitForCards(page);
    await page.locator(".card").first().click();
    await expect(page.locator("#detail-view")).toBeVisible({ timeout: 10000 });

    await page.keyboard.press("Escape");
    await expect(page.locator("#grid-view")).toBeVisible({ timeout: 10000 });
  });
});
