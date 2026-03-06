import { test as base, expect, Page, Locator } from "@playwright/test";

export const test = base;

export async function switchToTable(page: Page): Promise<void> {
  const tableView = page.locator("#table-view");
  if (await tableView.isVisible()) return;
  const viewToggleLabel = page.locator('label.view-switch[title="Toggle view mode"]').first();
  await viewToggleLabel.click();
  await expect(tableView).toBeVisible();
}

export async function switchToGrid(page: Page): Promise<void> {
  const gridView = page.locator("#grid-view");
  if (await gridView.isVisible()) return;
  const viewToggleLabel = page.locator('label.view-switch[title="Toggle view mode"]').first();
  await viewToggleLabel.click();
  await expect(gridView).toBeVisible();
}

export async function openDropdown(
  page: Page,
  dropdownIndex: number,
): Promise<{ trigger: Locator; menu: Locator }> {
  const dropdown = page.locator(".search-dropdown").nth(dropdownIndex);
  const trigger = dropdown.locator(".search-dropdown-trigger");
  const menu = dropdown.locator(".search-dropdown-menu");
  await trigger.click();
  await expect(menu).toBeVisible();
  return { trigger, menu };
}

export async function closeDropdown(page: Page): Promise<void> {
  await page.keyboard.press("Escape");
}

export async function waitForCards(page: Page, minCount = 1): Promise<Locator> {
  const cards = page.locator(".card");
  await expect(cards.first()).toBeVisible({ timeout: 10000 });
  return cards;
}

export async function getTableTotal(page: Page): Promise<number> {
  return page.evaluate(() => (window as any).tableTotalCount());
}

export async function getTableDisplayed(page: Page): Promise<number> {
  return page.evaluate(() => (window as any).tableRowCount());
}

export async function applyCategoryFilter(page: Page, category: string): Promise<void> {
  const { menu } = await openDropdown(page, 0);
  await menu.locator(`button.search-option:has-text("${category}")`).click();
  await page.waitForTimeout(500);
}

export function filterConsoleErrors(errors: string[]): string[] {
  return errors.filter(
    (err) =>
      !err.includes("sourcemap") &&
      !err.includes("[datastar]") &&
      !err.includes("effect expression evaluated"),
  );
}
