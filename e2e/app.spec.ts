import { test, expect } from '@playwright/test';

test.describe('CSS Ref App', () => {
  test('homepage has title and search', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/CSS Ref/);
    await expect(page.locator('input[type="search"]')).toBeVisible();
  });

  test('can filter by category', async ({ page }) => {
    await page.goto('/');
    await page.click('#filterBtn');
    await page.click('button.chip:has-text("Layout")');
    await expect(page.locator('.card').first()).toContainText('display');
  });

  test('can switch to list view', async ({ page }) => {
    await page.goto('/');
    await page.click('#btnList');
    await expect(page.locator('#grid')).toHaveClass(/is-list/);
  });

  test('can search for properties', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[type="search"]', 'flex');
    await page.waitForTimeout(300);
    await expect(page.locator('.card').first()).toContainText('flex');
  });

  test('can open detail view', async ({ page }) => {
    await page.goto('/');
    await page.click('.card:first-child');
    await expect(page.locator('.detail-name')).toBeVisible();
    await expect(page.locator('.back-btn')).toBeVisible();
  });

  test('can go back from detail view', async ({ page }) => {
    await page.goto('/');
    await page.click('.card:first-child');
    await expect(page.locator('.detail-name')).toBeVisible();
    
    await page.click('.back-btn');
    await expect(page.locator('#list-view')).toBeVisible();
  });
});
