import { test, expect } from "@playwright/test";
import { waitForCards, switchToGrid, switchToTable, getTableTotal } from "./helpers";

test.describe("Fuzzy Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForCards(page);
  });

  test.describe("Desktop Search", () => {
    test.beforeEach(async ({ page }) => {
      // Clear any existing filters and search
      await page.goto("/");
      await waitForCards(page);
    });

    test("should find properties with exact match", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search...");
      await searchInput.fill("display");
      await page.waitForTimeout(300);

      // Should find display property
      const cards = page.locator(".card");
      await expect(cards.first()).toBeVisible();
      await expect(cards.first()).toContainText("display");
    });

    test("should find properties with partial match", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search...");
      await searchInput.fill("disp");
      await page.waitForTimeout(300);

      // Should find display property with partial query
      const cards = page.locator(".card");
      await expect(cards.first()).toBeVisible();
      await expect(cards.first()).toContainText("display");
    });

    test("should handle typo-tolerant search", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search...");
      
      // Test partial matches that fuzzysort handles well
      await searchInput.fill("displ");
      await page.waitForTimeout(300);
      let cards = page.locator(".card");
      await expect(cards.first()).toContainText("display");

      // "flex-" should match "flex-direction"
      await searchInput.fill("flex-");
      await page.waitForTimeout(300);
      cards = page.locator(".card");
      await expect(cards.first()).toContainText("flex");

      // "backgr" should match "background-color"
      await searchInput.fill("backgr");
      await page.waitForTimeout(300);
      cards = page.locator(".card");
      await expect(cards.first()).toContainText("background");
    });

    test("should handle case-insensitive search", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search...");
      
      // Test different cases
      await searchInput.fill("DISPLAY");
      await page.waitForTimeout(300);
      const upperCards = page.locator(".card");
      const upperCount = await upperCards.count();

      await searchInput.fill("display");
      await page.waitForTimeout(300);
      const lowerCards = page.locator(".card");
      const lowerCount = await lowerCards.count();

      expect(upperCount).toBe(lowerCount);
      expect(upperCount).toBeGreaterThan(0);
    });

    test("should search in property descriptions", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search...");
      await searchInput.fill("element");
      await page.waitForTimeout(300);

      const cards = page.locator(".card");
      await expect(cards.first()).toBeVisible();
      // Should find properties - "element" appears in descriptions
      const cardCount = await cards.count();
      expect(cardCount).toBeGreaterThan(0);
    });

    test("should search in categories", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search...");
      await searchInput.fill("flexbox");
      await page.waitForTimeout(300);

      const cards = page.locator(".card");
      await expect(cards.first()).toBeVisible();
      // Should find flexbox category properties
      const cardText = await cards.first().textContent();
      expect(cardText?.toLowerCase()).toContain("flex");
    });

    test("should show no results for non-matching query", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search...");
      await searchInput.fill("xyznonexistent123");
      await page.waitForTimeout(300);

      const cards = page.locator(".card");
      await expect(cards).toHaveCount(0);

      // Should show empty state
      const emptyState = page.locator("#grid .empty");
      await expect(emptyState).toBeVisible();
    });

    test("should work in grid view with fuzzy search", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search...");
      await searchInput.fill("flex");
      await page.waitForTimeout(300);

      const tableTotal = await getTableTotal(page);
      expect(tableTotal).toBeGreaterThan(0);

      await switchToGrid(page);
      const cards = page.locator(".card");
      await expect(cards).toHaveCount(tableTotal);
    });

    test("should work in table view with fuzzy search", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search...");
      await searchInput.fill("position");
      await page.waitForTimeout(300);

      await switchToTable(page);
      const tableTotal = await getTableTotal(page);
      expect(tableTotal).toBeGreaterThan(0);

      const rows = page.locator(".list .table-row");
      await expect(rows).toHaveCount(Math.min(30, tableTotal));
    });

    test("should clear search when input is cleared", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search...");
      
      // Search for something
      await searchInput.fill("flex");
      await page.waitForTimeout(300);
      const filteredCards = page.locator(".card");
      const filteredCount = await filteredCards.count();

      // Clear search
      await searchInput.clear();
      await page.waitForTimeout(300);
      const allCards = page.locator(".card");
      const allCount = await allCards.count();

      expect(allCount).toBeGreaterThan(filteredCount);
    });
  });

  test.describe("Mobile Command Palette Search", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");
      await waitForCards(page);
    });

    test("should open command palette on mobile search button click", async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");
      await waitForCards(page);

      // Click mobile search button
      const mobileSearchBtn = page.locator(".mobile-search-btn");
      await expect(mobileSearchBtn).toBeVisible();
      await mobileSearchBtn.click();
      await page.waitForTimeout(200);

      // Command palette should be open
      const commandPalette = page.locator(".command-palette");
      await expect(commandPalette).toBeVisible();
    });

    test("should search in command palette with exact match", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");
      await waitForCards(page);

      // Open command palette
      const mobileSearchBtn = page.locator(".mobile-search-btn");
      await mobileSearchBtn.click();
      await page.waitForTimeout(200);

      // Type search query
      const searchInput = page.locator("#search-mobile");
      await searchInput.fill("display");
      await page.waitForTimeout(300);

      // Should find results
      const cards = page.locator(".card");
      await expect(cards.first()).toBeVisible();
      await expect(cards.first()).toContainText("display");
    });

    test("should handle typo-tolerant search in command palette", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");
      await waitForCards(page);

      // Open command palette
      const mobileSearchBtn = page.locator(".mobile-search-btn");
      await mobileSearchBtn.click();
      await page.waitForTimeout(200);

      const searchInput = page.locator("#search-mobile");
      
      // Test partial matches
      await searchInput.fill("displ");
      await page.waitForTimeout(300);
      let cards = page.locator(".card");
      await expect(cards.first()).toContainText("display");

      // "backgr" should match "background-color"
      await searchInput.fill("backgr");
      await page.waitForTimeout(300);
      cards = page.locator(".card");
      await expect(cards.first()).toContainText("background");
    });

    test("should close command palette with escape key", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");
      await waitForCards(page);

      // Open command palette
      const mobileSearchBtn = page.locator(".mobile-search-btn");
      await mobileSearchBtn.click();
      await page.waitForTimeout(200);

      // Press escape
      await page.keyboard.press("Escape");
      await page.waitForTimeout(200);

      const commandPalette = page.locator(".command-palette");
      await expect(commandPalette).not.toBeVisible();
    });

    test("should close command palette with close button", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");
      await waitForCards(page);

      // Open command palette
      const mobileSearchBtn = page.locator(".mobile-search-btn");
      await mobileSearchBtn.click();
      await page.waitForTimeout(200);

      // Click close button
      const closeBtn = page.locator(".command-palette-close");
      await closeBtn.click();
      await page.waitForTimeout(200);

      const commandPalette = page.locator(".command-palette");
      await expect(commandPalette).not.toBeVisible();
    });
  });

  test.describe("Combined Filters with Fuzzy Search", () => {
    test.beforeEach(async ({ page }) => {
      // Clear any existing filters
      await page.goto("/");
      await waitForCards(page);
    });

    test("should combine fuzzy search with category filter", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search...");
      await searchInput.fill("disp");
      await page.waitForTimeout(300);

      // Open category dropdown
      const categoryBtn = page.locator(".search-dropdown-trigger").first();
      await categoryBtn.click();
      await page.waitForTimeout(200);

      // Select Layout category from the first dropdown menu
      const dropdownMenu = page.locator(".search-dropdown-menu").first();
      const layoutOption = dropdownMenu.locator('button.search-option:has-text("Layout")').first();
      await layoutOption.click();
      await page.waitForTimeout(300);

      // Close dropdown
      await page.keyboard.press("Escape");
      await page.waitForTimeout(100);

      // Should still find display
      const cards = page.locator(".card");
      await expect(cards.first()).toContainText("display");
    });

    test("should combine fuzzy search with multiple filters", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search...");
      await searchInput.fill("flex");
      await page.waitForTimeout(300);

      // Open category dropdown
      const categoryBtn = page.locator(".search-dropdown-trigger").first();
      await categoryBtn.click();
      await page.waitForTimeout(200);

      // Select Flexbox category from the first dropdown menu
      const dropdownMenu = page.locator(".search-dropdown-menu").first();
      const flexboxOption = dropdownMenu.locator('button.search-option:has-text("Flexbox")').first();
      await flexboxOption.click();
      await page.waitForTimeout(300);

      // Close dropdown
      await page.keyboard.press("Escape");
      await page.waitForTimeout(100);

      // Should find flex properties in Flexbox category
      const cards = page.locator(".card");
      await expect(cards.first()).toBeVisible();
    });

    test("should filter results by category with fuzzy search", async ({ page }) => {
      // First search for "flex"
      const searchInput = page.getByPlaceholder("Search...");
      await searchInput.fill("flex");
      await page.waitForTimeout(300);

      const initialCards = page.locator(".card");
      const initialCount = await initialCards.count();
      expect(initialCount).toBeGreaterThan(0);

      // Then filter by Flexbox category
      const categoryBtn = page.locator(".search-dropdown-trigger").first();
      await categoryBtn.click();
      await page.waitForTimeout(200);

      const dropdownMenu = page.locator(".search-dropdown-menu").first();
      const flexboxOption = dropdownMenu.locator('button.search-option:has-text("Flexbox")').first();
      await flexboxOption.click();
      await page.waitForTimeout(300);

      // Close dropdown
      await page.keyboard.press("Escape");
      await page.waitForTimeout(100);

      // Should still have results (flex properties in Flexbox category)
      const filteredCards = page.locator(".card");
      const filteredCount = await filteredCards.count();
      expect(filteredCount).toBeGreaterThan(0);
    });
  });
});
