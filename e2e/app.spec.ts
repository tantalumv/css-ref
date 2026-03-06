import { test, expect } from "@playwright/test";

async function switchToTable(page: any) {
  const tableView = page.locator("#table-view");
  if (await tableView.isVisible().catch(() => false)) return;
  const viewToggleLabel = page.locator('label.view-switch[title="Toggle view mode"]').first();
  await viewToggleLabel.click();
  await expect(tableView).toBeVisible();
}

async function openCategoryDropdown(page: any) {
  const categoryTrigger = page
    .locator(".search-dropdown")
    .first()
    .locator(".search-dropdown-trigger");
  await categoryTrigger.click();
  await expect(
    page.locator(".search-dropdown").first().locator(".search-dropdown-menu"),
  ).toBeVisible();
}

test.describe("CSS Ref App", () => {
  test("homepage has title and search", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/CSS Ref/);
    await expect(page.locator('#search-desktop')).toBeVisible();
  });

  test("can filter by category", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".card", { timeout: 5000 });
    await openCategoryDropdown(page);
    await page
      .locator(".search-dropdown")
      .first()
      .locator('button.search-option:has-text("Layout")')
      .click();
    await page.waitForTimeout(250);
    await expect(page.locator(".card").first()).toContainText("display");
  });

  test("can switch to table view", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".card", { timeout: 5000 });
    await switchToTable(page);
    await expect(page.locator("#table-view")).toBeVisible();
  });

  test("can search for properties", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".card", { timeout: 5000 });
    // Use fill to trigger data-bind properly
    await page.fill('input[type="search"]', "flexbox");
    await page.waitForTimeout(300);
    const expectedFilteredCount = await page.evaluate(
      () => (window as any).filtered("flexbox", [], []).length,
    );
    await expect(page.locator(".card")).toHaveCount(expectedFilteredCount);
  });

  test("can open detail view", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".card", { timeout: 5000 });
    await page.locator(".card").first().click();
    await expect(page.locator("#detail-view")).toBeVisible({ timeout: 3000 });
    await expect(page.locator(".back-btn")).toBeVisible();
  });

  test("can go back from detail view", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".card", { timeout: 5000 });
    await page.locator(".card").first().click();
    await expect(page.locator("#detail-view")).toBeVisible({ timeout: 3000 });

    await page.click(".back-btn");
    await page.waitForTimeout(300);
    await expect(page.locator("#grid-view")).toBeVisible();
  });
});
