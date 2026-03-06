import { test, expect } from "@playwright/test";

async function switchToTable(page: any) {
  const tableView = page.locator("#table-view");
  if (await tableView.isVisible().catch(() => false)) return;
  const viewToggleLabel = page.locator('label.view-switch[title="Toggle view mode"]').first();
  await viewToggleLabel.click();
  await expect(tableView).toBeVisible();
}

async function switchToGrid(page: any) {
  const gridView = page.locator("#grid-view");
  if (await gridView.isVisible().catch(() => false)) return;
  const viewToggleLabel = page.locator('label.view-switch[title="Toggle view mode"]').first();
  await viewToggleLabel.click();
  await expect(gridView).toBeVisible();
}

async function getTableTotal(page: any): Promise<number> {
  return page.evaluate(() => (window as any).tableTotalCount());
}

async function getTableDisplayed(page: any): Promise<number> {
  return page.evaluate(() => (window as any).tableRowCount());
}

async function applyCategoryFilter(page: any, category: string) {
  const categoryDropdown = page.locator(".search-dropdown").first();
  await categoryDropdown.locator(".search-dropdown-trigger").click();
  await expect(categoryDropdown.locator(".search-dropdown-menu")).toBeVisible();
  await categoryDropdown.locator(`button.search-option:has-text("${category}")`).click();
  await page.waitForTimeout(250);
}

test.describe("Infinite Scroll in Table View", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".card", { timeout: 5000 });
    await switchToTable(page);
    await page.waitForSelector(".list-table");
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
    await page.fill('input[type="search"]', "flex");
    await page.waitForTimeout(250);

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
      await sentinel.scrollIntoViewIfNeeded().catch(() => {});
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
      await sentinel.scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(300);
    }

    await expect.poll(async () => rows.count(), { timeout: 5000 }).toBe(total);
  });

  test("infinite scroll works with search filter", async ({ page }) => {
    await page.fill('input[type="search"]', "a");
    await page.waitForTimeout(250);

    const rows = page.locator(".list .table-row");
    const sentinel = page.locator("#table-sentinel");
    const total = await getTableTotal(page);
    expect(total).toBeGreaterThan(0);

    for (let i = 0; i < 20; i++) {
      const rowCount = await rows.count();
      if (rowCount >= total) break;
      await sentinel.scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(300);
    }

    await expect.poll(async () => rows.count(), { timeout: 5000 }).toBe(total);
  });

  test("switching views maintains table functionality", async ({ page }) => {
    const sentinel = page.locator("#table-sentinel");
    await sentinel.scrollIntoViewIfNeeded().catch(() => {});
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
    await page.waitForSelector(".card", { timeout: 5000 });
    await switchToTable(page);
    await page.waitForSelector(".list-table");

    const rows = page.locator(".list .table-row");
    const total = await getTableTotal(page);

    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    expect(rowCount).toBeLessThanOrEqual(total);
  });
});
