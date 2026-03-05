import { test, expect } from '@playwright/test';

test.describe('Infinite Scroll in Table View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Switch to table view
    await page.click('#btnTable');
    await expect(page.locator('#table-view')).toBeVisible();
    // Wait for table to render
    await page.waitForSelector('.list-table');
  });

  test('table and grid views show same filtered count', async ({ page }) => {
    // Apply a filter first
    await page.click('#filterBtn');
    await page.click('button.chip[data-cat="Layout"]');
    await page.waitForTimeout(300);
    
    // Get table view count from the count span
    const countSpan = page.locator('#count');
    const tableCountText = await countSpan.textContent();
    expect(tableCountText).toBeTruthy();
    
    // Extract the numbers (format is "displayed / total")
    const tableMatch = tableCountText?.match(/(\d+)\s*\/\s*(\d+)/);
    expect(tableMatch).toBeTruthy();
    const tableTotal = parseInt(tableMatch![2]);
    
    // Switch to grid view
    await page.click('#btnGrid');
    await expect(page.locator('#grid-view')).toBeVisible();
    await page.waitForTimeout(300);
    
    // Get grid view count
    const gridCountText = await countSpan.textContent();
    expect(gridCountText).toBeTruthy();
    
    const gridMatch = gridCountText?.match(/(\d+)\s*\/\s*(\d+)/);
    expect(gridMatch).toBeTruthy();
    const gridTotal = parseInt(gridMatch![2]);
    
    // Both views should show the same total count
    expect(gridTotal).toBe(tableTotal);
    
    // Switch back to table and verify count is preserved
    await page.click('#btnTable');
    await expect(page.locator('#table-view')).toBeVisible();
    await page.waitForTimeout(300);
    
    const tableCountAgain = await countSpan.textContent();
    const tableAgainMatch = tableCountAgain?.match(/(\d+)\s*\/\s*(\d+)/);
    expect(parseInt(tableAgainMatch![2])).toBe(tableTotal);
  });

  test('search filter shows same count in both views', async ({ page }) => {
    // Search for "flex"
    await page.fill('input[type="search"]', 'flex');
    await page.waitForTimeout(300);
    
    // Get table view count
    const countSpan = page.locator('#count');
    const tableCountText = await countSpan.textContent();
    const tableMatch = tableCountText?.match(/(\d+)\s*\/\s*(\d+)/);
    expect(tableMatch).toBeTruthy();
    const tableTotal = parseInt(tableMatch![2]);
    
    // Should have some results
    expect(tableTotal).toBeGreaterThan(0);
    
    // Switch to grid view
    await page.click('#btnGrid');
    await page.waitForTimeout(300);
    
    // Get grid view count
    const gridCountText = await countSpan.textContent();
    const gridMatch = gridCountText?.match(/(\d+)\s*\/\s*(\d+)/);
    expect(gridMatch).toBeTruthy();
    const gridTotal = parseInt(gridMatch![2]);
    
    // Both should have same count
    expect(gridTotal).toBe(tableTotal);
  });

  test('table view shows initial batch of 30 rows', async ({ page }) => {
    const rows = page.locator('.list .table-row');
    // Should have exactly 30 rows initially (TABLE_BATCH_SIZE)
    await expect(rows).toHaveCount(30);
  });

  test('scrolling to bottom loads more rows', async ({ page }) => {
    const rows = page.locator('.list .table-row');
    const countSpan = page.locator('#count');
    
    // Verify initial count
    await expect(rows).toHaveCount(30);
    
    // Get total available
    const countText = await countSpan.textContent();
    const match = countText?.match(/(\d+)\s*\/\s*(\d+)/);
    expect(match).toBeTruthy();
    const total = parseInt(match![2]);
    
    // If there's more data than initially shown, scrolling should load it
    if (total > 30) {
      // Scroll sentinel into view to trigger loading
      const sentinel = page.locator('#table-sentinel');
      await sentinel.scrollIntoViewIfNeeded();
      
      // Wait for more rows to load (up to 3 seconds)
      await expect.poll(async () => {
        return await rows.count();
      }, {
        timeout: 3000,
        message: 'Expected more rows to load after scrolling'
      }).toBeGreaterThan(30);
      
      // Verify we actually loaded more than the initial 30
      const finalCount = await rows.count();
      expect(finalCount).toBeGreaterThan(30);
    }
  });

  test('loading all data hides sentinel', async ({ page }) => {
    const sentinel = page.locator('#table-sentinel');
    const rows = page.locator('.list .table-row');
    const countSpan = page.locator('#count');
    
    // Get total count
    const countText = await countSpan.textContent();
    const match = countText?.match(/(\d+)\s*\/\s*(\d+)/);
    expect(match).toBeTruthy();
    const total = parseInt(match![2]);
    
    // Keep scrolling and loading until all data is loaded or max attempts reached
    let previousCount = 0;
    let attempts = 0;
    const maxAttempts = Math.ceil(total / 30) + 2; // Enough attempts to load all batches
    
    while (attempts < maxAttempts) {
      // Scroll to trigger loading
      await sentinel.scrollIntoViewIfNeeded().catch(() => {
        // If sentinel is not visible, scroll to bottom of page
        return page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      });
      
      // Wait a bit for potential loading
      await page.waitForTimeout(600);
      
      // Check if all data loaded
      const currentCount = await rows.count();
      const isHidden = await sentinel.evaluate(el => el.style.display === 'none').catch(() => true);
      
      if (isHidden || currentCount === total) {
        break;
      }
      
      // If no new rows were loaded, try again
      if (currentCount === previousCount) {
        attempts++;
      } else {
        previousCount = currentCount;
        attempts = 0; // Reset attempts if progress was made
      }
    }
    
    // Verify sentinel is hidden (all data loaded)
    await expect(sentinel).toBeHidden();
    
    // Verify all rows are displayed
    const finalCount = await rows.count();
    expect(finalCount).toBe(total);
  });

  test('infinite scroll works with category filter', async ({ page }) => {
    // Open filter popover
    await page.click('#filterBtn');
    await expect(page.locator('#filterPopover')).toBeVisible();
    
    // Click on Layout category
    await page.click('button.chip[data-cat="Layout"]');
    
    // Wait for table to update with filtered data
    await page.waitForTimeout(300);
    
    const rows = page.locator('.list .table-row');
    const countSpan = page.locator('#count');
    const initialCount = await rows.count();
    
    // Get filtered total
    const countText = await countSpan.textContent();
    const match = countText?.match(/(\d+)\s*\/\s*(\d+)/);
    expect(match).toBeTruthy();
    const total = parseInt(match![2]);
    
    // If there's more data to load
    if (initialCount < total) {
      const sentinel = page.locator('#table-sentinel');
      
      // Scroll to load more
      let attempts = 0;
      while (attempts < 10) {
        await sentinel.scrollIntoViewIfNeeded().catch(() => {
          return page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        });
        
        await page.waitForTimeout(400);
        
        const isHidden = await sentinel.evaluate(el => el.style.display === 'none').catch(() => true);
        if (isHidden) break;
        
        attempts++;
      }
      
      await expect(sentinel).toBeHidden();
      
      // Verify all filtered rows are loaded
      const finalCount = await rows.count();
      expect(finalCount).toBe(total);
    }
  });

  test('infinite scroll works with search filter', async ({ page }) => {
    const rows = page.locator('.list .table-row');
    const countSpan = page.locator('#count');
    const sentinel = page.locator('#table-sentinel');
    
    // Search for "flex" which should return multiple results
    // Use evaluate to set value directly to avoid rapid re-renders from keystrokes
    await page.evaluate(() => {
      const input = document.querySelector('input[type="search"]') as HTMLInputElement;
      if (input) {
        input.value = 'flex';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await page.waitForTimeout(500);
    
    const filteredCount = await rows.count();
    // Layout category has fewer items
    expect(filteredCount).toBeLessThanOrEqual(30);
    
    // Clear filters by clicking the active Layout chip again
    await page.click('#filterBtn');
    await page.waitForTimeout(100);
    
    // Find and click the active Layout chip to toggle it off
    const layoutChip = page.locator('button.chip[data-cat="Layout"].active');
    if (await layoutChip.isVisible().catch(() => false)) {
      await layoutChip.click();
    } else {
      // Try clicking clear all button
      const clearBtn = page.locator('#clearFilters');
      if (await clearBtn.isVisible().catch(() => false)) {
        await clearBtn.click();
      }
    }
    await page.waitForTimeout(300);
    
    // Should be back to showing more than filtered count
    const newCount = await rows.count();
    expect(newCount).toBeGreaterThanOrEqual(filteredCount);
  });

  test('switching views maintains table functionality', async ({ page }) => {
    const rows = page.locator('.list .table-row');
    
    // Load more rows by scrolling
    const sentinel = page.locator('#table-sentinel');
    await sentinel.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(600);
    
    // Switch to grid view
    await page.click('#btnGrid');
    await expect(page.locator('#grid-view')).toBeVisible();
    
    // Switch back to table view
    await page.click('#btnTable');
    await expect(page.locator('#table-view')).toBeVisible();
    
    // Table should be re-initialized with initial batch
    // Check quickly before auto-load timeout (500ms) fires
    await page.waitForSelector('.list-table');
    const count = await rows.count();
    // Should have at least 30 rows (might have more if auto-load already fired)
    expect(count).toBeGreaterThanOrEqual(30);
  });
  
  test('sentinel visibility triggers loading without scroll on short viewport', async ({ page }) => {
    // Set a large viewport so table doesn't fill it (30 rows * ~120px = ~3600px)
    await page.setViewportSize({ width: 1280, height: 4000 });
    
    // Reload to apply new viewport
    await page.goto('/');
    await page.click('#btnTable');
    await page.waitForSelector('.list-table');
    
    const rows = page.locator('.list .table-row');
    const countSpan = page.locator('#count');
    
    // Get total
    const countText = await countSpan.textContent();
    const match = countText?.match(/(\d+)\s*\/\s*(\d+)/);
    expect(match).toBeTruthy();
    const total = parseInt(match![2]);
    
    // If total is more than 30, sentinel should trigger loading automatically
    // because the table won't be tall enough to push it out of viewport
    if (total > 30) {
      // Wait for automatic loading to occur (sentinel stays visible)
      await expect.poll(async () => {
        return await rows.count();
      }, {
        timeout: 5000,
        message: 'Expected automatic loading when sentinel stays visible'
      }).toBeGreaterThan(30);
    }
  });
});
