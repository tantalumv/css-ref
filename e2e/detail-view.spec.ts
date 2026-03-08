import { test, expect } from "@playwright/test";

test.describe("Detail View", () => {
  test("detail view shows content when clicking a card", async ({ page }) => {
    await page.goto("/");

    // Wait for Datastar to initialize and render cards
    await page.waitForSelector(".card", { timeout: 5000 });

    // Click the first card
    const firstCard = page.locator(".card").first();
    const propertyName = await firstCard.locator(".card-name .name-text").first().textContent();
    await firstCard.click();

    // Wait for detail view to be visible
    await expect(page.locator("#detail-view")).toBeVisible({ timeout: 3000 });

    // Check that detail-wrap is rendered with actual content
    await expect(page.locator(".detail-wrap")).toBeVisible();
    await expect(page.locator(".detail-hero")).toBeVisible();
    await expect(page.locator(".detail-name")).toHaveText(propertyName?.trim() || "");
    await expect(page.locator(".detail-demo-stage")).toBeVisible();
    const sections = page.locator(".detail-section");
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThanOrEqual(3); // At least 3 sections: Description, Syntax, Browser Support (Values and Related may be present)
    await expect(page.locator(".back-btn")).toBeVisible();
    await expect(page.locator(".mdn-link")).toBeVisible();

    // Verify the detail view has actual content (not empty)
    const content = await page.locator("#detail-view").innerHTML();
    expect(content.length).toBeGreaterThan(500);
  });

  test("back button returns to grid view", async ({ page }) => {
    await page.goto("/");

    // Navigate to detail view
    await page.waitForSelector(".card", { timeout: 5000 });
    await page.locator(".card").first().click();
    await expect(page.locator("#detail-view")).toBeVisible({ timeout: 3000 });

    // Click back button
    await page.click(".back-btn");

    // Wait for grid view to be visible again
    await expect(page.locator("#grid-view")).toBeVisible({ timeout: 3000 });
    await expect(page.locator("header")).toBeVisible();

    // Verify we're back at the main page (hash may be empty string)
    const url = page.url();
    expect(url.endsWith("/") || url.endsWith("/#") || !url.includes("#")).toBe(true);
  });

  test("direct navigation via hash opens detail view", async ({ page }) => {
    // Navigate directly to a specific property
    await page.goto("/#display");

    // Wait for detail view to render
    await expect(page.locator("#detail-view")).toBeVisible({ timeout: 5000 });

    // Verify the correct property is displayed
    await expect(page.locator(".detail-name")).toHaveText("display");
    await expect(page.locator(".detail-wrap")).toBeVisible();
    await expect(page.locator(".detail-demo-stage")).toBeVisible();
  });

  test("navigating between different properties works", async ({ page }) => {
    await page.goto("/#display");

    // Wait for first property
    await expect(page.locator(".detail-name")).toHaveText("display", { timeout: 5000 });

    // Navigate to second property via hash change
    await page.goto("/#flex");

    // Verify second property renders (this was broken before the fix)
    await expect(page.locator(".detail-name")).toHaveText("flex", { timeout: 3000 });
    await expect(page.locator(".detail-demo-stage")).toBeVisible();

    // Verify content is different
    const content = await page.locator("#detail-view").innerHTML();
    expect(content).toContain("flex");
  });

  test("detail view has proper styling and background", async ({ page }) => {
    await page.goto("/#display");

    await expect(page.locator("#detail-view")).toBeVisible({ timeout: 5000 });

    // Check computed styles to ensure visibility
    const detailView = page.locator("#detail-view");
    const display = await detailView.evaluate((el) => getComputedStyle(el).display);
    expect(display).not.toBe("none");

    // Check background color is set (not transparent/blank)
    const background = await detailView.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(background).not.toBe("rgba(0, 0, 0, 0)");
    expect(background).not.toBe("transparent");

    // Check min-height is set
    const minHeight = await detailView.evaluate((el) => getComputedStyle(el).minHeight);
    expect(parseInt(minHeight)).toBeGreaterThan(0);
  });

  test("navigating to same property twice re-renders correctly", async ({ page }) => {
    // This test verifies the fix for the caching issue where data-effect wouldn't re-trigger
    await page.goto("/#display");
    await expect(page.locator(".detail-name")).toHaveText("display", { timeout: 5000 });

    // Go back
    await page.goto("/");
    await expect(page.locator("#grid-view")).toBeVisible({ timeout: 3000 });

    // Navigate to same property again
    await page.goto("/#display");

    // Should still render correctly (was broken before due to effect caching)
    await expect(page.locator(".detail-name")).toHaveText("display", { timeout: 3000 });
    await expect(page.locator(".detail-wrap")).toBeVisible();
    await expect(page.locator(".detail-demo-stage")).toBeVisible();
  });

  test("invalid property hash shows empty but visible detail view", async ({ page }) => {
    await page.goto("/#invalid-property-name");

    // Detail view should be visible even for invalid property
    await expect(page.locator("#detail-view")).toBeVisible({ timeout: 5000 });

    // But content should be empty (no detail-wrap rendered)
    const detailWrap = page.locator(".detail-wrap");
    await expect(detailWrap).not.toBeVisible();
  });

  test("escape key closes detail view", async ({ page }) => {
    await page.goto("/#display");
    await expect(page.locator("#detail-view")).toBeVisible({ timeout: 5000 });

    // Press escape
    await page.keyboard.press("Escape");

    // Wait for grid view
    await expect(page.locator("#grid-view")).toBeVisible({ timeout: 3000 });
    await expect(page.locator("header")).toBeVisible();
  });

  test("detail view shows all expected sections", async ({ page }) => {
    await page.goto("/#display");
    await expect(page.locator("#detail-view")).toBeVisible({ timeout: 5000 });

    // Check all sections are rendered
    await expect(page.locator(".back-btn")).toBeVisible();
    await expect(page.locator(".detail-hero")).toBeVisible();
    await expect(page.locator(".detail-name")).toHaveText("display");
    await expect(page.locator(".detail-badges")).toBeVisible();
    await expect(page.locator(".cat-badge")).toBeVisible();
    await expect(page.locator(".availability-badge")).toBeVisible();
    await expect(page.locator(".detail-demo-box")).toBeVisible();
    await expect(page.locator(".detail-demo-stage")).toBeVisible();
    await expect(page.locator(".detail-demo-label")).toBeVisible();

    // Get all section labels - sections may be in different order depending on property data
    const sectionLabels = page.locator(".detail-section .detail-lbl");
    const labelTexts = await sectionLabels.allTextContents();
    
    // Verify expected sections exist (may have additional sections like Values, Related Properties)
    expect(labelTexts).toContain("Description");
    expect(labelTexts).toContain("Syntax");
    expect(labelTexts).toContain("Browser Support");
    
    // Check Description section content
    await expect(page.locator(".detail-desc")).toBeVisible();
    
    // Check Syntax section content  
    await expect(page.locator(".syntax-block")).toBeVisible();
    
    // Check Browser Support section content
    await expect(page.locator(".detail-browsers")).toBeVisible();
    await expect(page.locator(".detail-b")).toHaveCount(4); // Chrome, Firefox, Safari, Edge

    // MDN link
    await expect(page.locator(".mdn-link")).toBeVisible();
    await expect(page.locator(".mdn-link")).toHaveAttribute("href", /developer.mozilla.org/);
  });

  test("table view navigation to detail works", async ({ page }) => {
    await page.goto("/");

    // Switch to table view by clicking the view-switch label (checkbox is hidden)
    const viewToggleLabel = page.locator('label.view-switch[title="Toggle view mode"]').first();
    await viewToggleLabel.waitFor({ timeout: 5000 });
    await viewToggleLabel.click();

    await expect(page.locator("#table-view")).toBeVisible({ timeout: 3000 });

    // Wait for table rows
    await page.waitForSelector(".table-row", { timeout: 5000 });

    // Click first table row
    await page.locator(".table-row").first().click();

    // Detail view should open
    await expect(page.locator("#detail-view")).toBeVisible({ timeout: 3000 });
    await expect(page.locator(".detail-wrap")).toBeVisible();
    await expect(page.locator(".back-btn")).toBeVisible();
  });
});
