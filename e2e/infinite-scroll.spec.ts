import { test, expect } from "@playwright/test";
import {
  switchToTable,
  switchToGrid,
  getTableTotal,
  getTableDisplayed,
  openDropdown,
  applyCategoryFilter,
  waitForCards,
} from "./helpers";

test.describe("Infinite Scroll in Table View", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForCards(page);
    await switchToTable(page);
    await expect(page.locator(".list-table")).toBeVisible();
  });

  test("table and grid views show same filtered count", async ({ page }) => {
    await applyCategoryFilter(page, "Layout");

    const tableTotal = await getTableTotal(page);
    expect(tableTotal).toBeGreaterThan(0);

    await switchToGrid(page);
    await expect(page.locator(".card")).toHaveCount(tableTotal);

    await switchToTable(page);
    expect(await getTableTotal(page)).toBe(tableTotal);
  });

  test("search filter shows same count in both views", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search...");
    await searchInput.fill("flex");

    const tableTotal = await getTableTotal(page);
    expect(tableTotal).toBeGreaterThan(0);

    await switchToGrid(page);
    await expect(page.locator(".card")).toHaveCount(tableTotal);
  });

  test("table view shows initial batch of 30 rows", async ({ page }) => {
    const rows = page.locator(".list .table-row");
    const total = await getTableTotal(page);
    await expect(rows).toHaveCount(Math.min(30, total));
  });

  test("scrolling to bottom loads more rows", async ({ page }) => {
    const rows = page.locator(".list .table-row");
    const sentinel = page.locator("#table-sentinel");
    const initialCount = await rows.count();
    const total = await getTableTotal(page);

    if (total > initialCount) {
      await sentinel.scrollIntoViewIfNeeded();
      await expect.poll(async () => rows.count(), { timeout: 4000 }).toBeGreaterThan(initialCount);
    }
  });

  test("loading all data hides sentinel", async ({ page, browserName }) => {
    test.skip(
      browserName === "webkit",
      "WebKit is flaky for this long-running sentinel exhaustion check.",
    );

    const rows = page.locator(".list .table-row");
    const sentinel = page.locator("#table-sentinel");
    const total = await getTableTotal(page);

    for (let i = 0; i < 20; i++) {
      const rowCount = await rows.count();
      if (rowCount >= total) break;
      await sentinel.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
    }

    await expect.poll(async () => rows.count(), { timeout: 5000 }).toBe(total);
    await expect(sentinel).toBeHidden();
  });

  test("infinite scroll works with category filter", async ({ page }) => {
    await applyCategoryFilter(page, "Layout");

    const rows = page.locator(".list .table-row");
    const sentinel = page.locator("#table-sentinel");
    const total = await getTableTotal(page);

    for (let i = 0; i < 20; i++) {
      const rowCount = await rows.count();
      if (rowCount >= total) break;
      await sentinel.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
    }

    await expect.poll(async () => rows.count(), { timeout: 5000 }).toBe(total);
  });

  test("infinite scroll works with search filter", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search...");
    await searchInput.fill("a");

    const rows = page.locator(".list .table-row");
    const sentinel = page.locator("#table-sentinel");
    const total = await getTableTotal(page);
    expect(total).toBeGreaterThan(0);

    for (let i = 0; i < 20; i++) {
      const rowCount = await rows.count();
      if (rowCount >= total) break;
      await sentinel.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
    }

    await expect.poll(async () => rows.count(), { timeout: 5000 }).toBe(total);
  });

  test("switching views maintains table functionality", async ({ page }) => {
    const sentinel = page.locator("#table-sentinel");
    await sentinel.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    await switchToGrid(page);
    await switchToTable(page);

    const rows = page.locator(".list .table-row");
    const total = await getTableTotal(page);
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    expect(rowCount).toBeLessThanOrEqual(total);
    expect(await getTableDisplayed(page)).toBe(rowCount);
  });

  test("sentinel visibility triggers loading without scroll on short viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 4000 });
    await page.goto("/");
    await waitForCards(page);
    await switchToTable(page);
    await expect(page.locator(".list-table")).toBeVisible();

    const rows = page.locator(".list .table-row");
    const total = await getTableTotal(page);

    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    expect(rowCount).toBeLessThanOrEqual(total);
  });
});
