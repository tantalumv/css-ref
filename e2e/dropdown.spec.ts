import { test, expect } from "@playwright/test";

// Test suite for dropdown and popover functionality
test.describe("Dropdown and Popover Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for cards to render (indicates Datastar is initialized)
    await page.waitForSelector(".card", { timeout: 5000 });
  });

  // Helper: Get dropdown by index (0=category, 1=interop, 2=browser)
  function getDropdown(page: any, index: number) {
    return page.locator(".search-dropdown").nth(index);
  }

  // Helper: Open a dropdown and verify it opens
  async function openDropdown(page: any, index: number, name: string) {
    const dropdown = getDropdown(page, index);
    const trigger = dropdown.locator(".search-dropdown-trigger");
    const menu = dropdown.locator(".search-dropdown-menu");

    // Click trigger to open
    await trigger.click();

    // Verify menu is visible
    await expect(menu, `${name} dropdown menu should be visible after click`).toBeVisible();

    return { dropdown, trigger, menu };
  }

  // Helper: Close a dropdown by clicking outside
  async function closeDropdownByClickingOutside(page: any, index: number, name: string) {
    const dropdown = getDropdown(page, index);
    const menu = dropdown.locator(".search-dropdown-menu");

    // Press Escape key to close dropdown
    await page.keyboard.press('Escape');

    // Verify menu is hidden
    await expect(menu, `${name} dropdown menu should be hidden after pressing Escape`).not.toBeVisible();
  }

  test("category dropdown opens and closes correctly", async ({ page }) => {
    await openDropdown(page, 0, "Category");
    await closeDropdownByClickingOutside(page, 0, "Category");
  });

  test("interop dropdown opens and closes correctly", async ({ page }) => {
    await openDropdown(page, 1, "Interop");
    await closeDropdownByClickingOutside(page, 1, "Interop");
  });

  test("browser dropdown opens and closes correctly", async ({ page }) => {
    await openDropdown(page, 2, "Browser");
    await closeDropdownByClickingOutside(page, 2, "Browser");
  });

  test("opening one dropdown closes others", async ({ page }) => {
    // Open category dropdown
    const categoryDropdown = await openDropdown(page, 0, "Category");

    // Open interop dropdown (should close category)
    const interopDropdown = await openDropdown(page, 1, "Interop");

    // Verify category is now closed
    await expect(categoryDropdown.menu, "Category dropdown should be closed when Interop opens").not.toBeVisible();

    // Verify interop is open
    await expect(interopDropdown.menu, "Interop dropdown should be visible").toBeVisible();

    // Open browser dropdown (should close interop)
    const browserDropdown = await openDropdown(page, 2, "Browser");

    // Verify interop is now closed
    await expect(interopDropdown.menu, "Interop dropdown should be closed when Browser opens").not.toBeVisible();

    // Verify browser is open
    await expect(browserDropdown.menu, "Browser dropdown should be visible").toBeVisible();
  });

  test("can select category from dropdown", async ({ page }) => {
    const { dropdown, menu } = await openDropdown(page, 0, "Category");

    // Select "Layout" option
    const layoutOption = menu.locator('button.search-option:has-text("Layout")');
    await layoutOption.click();

    // Verify dropdown closes
    await expect(menu, "Dropdown should close after selection").not.toBeVisible();

    // Verify trigger shows selected value
    const triggerText = await dropdown.locator(".search-dropdown-trigger span").textContent();
    expect(triggerText).toBe("Layout");
  });

  test("can select interop from dropdown", async ({ page }) => {
    const { dropdown, menu } = await openDropdown(page, 1, "Interop");

    // Select "Available" option
    const availableOption = menu.locator('button.search-option:has-text("Available")');
    await availableOption.click();

    // Verify dropdown closes
    await expect(menu, "Dropdown should close after selection").not.toBeVisible();

    // Verify trigger shows selected value (should show "available" in lowercase per the UI)
    const triggerText = await dropdown.locator(".search-dropdown-trigger span").textContent();
    expect(triggerText).toBe("available");
  });

  test("can select browser from dropdown", async ({ page }) => {
    const { dropdown, menu } = await openDropdown(page, 2, "Browser");

    // Select "Chrome" option
    const chromeOption = menu.locator('button.search-option:has-text("Chrome")');
    await chromeOption.click();

    // Verify dropdown closes
    await expect(menu, "Dropdown should close after selection").not.toBeVisible();

    // Verify trigger shows selected value
    const triggerText = await dropdown.locator(".search-dropdown-trigger span").textContent();
    expect(triggerText).toBe("Chrome");
  });

  test("dropdown aria-expanded attribute updates correctly", async ({ page }) => {
    const { dropdown, trigger } = await openDropdown(page, 0, "Category");

    // Verify aria-expanded is true when open
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Press Escape to close
    await page.keyboard.press('Escape');

    // Verify aria-expanded is false when closed
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("clicking same dropdown trigger twice toggles it", async ({ page }) => {
    const dropdown = getDropdown(page, 0);
    const trigger = dropdown.locator(".search-dropdown-trigger");
    const menu = dropdown.locator(".search-dropdown-menu");

    // Open dropdown
    await trigger.click();
    await expect(menu).toBeVisible();

    // Click trigger again to close
    await trigger.click();
    await expect(menu, "Dropdown should close when clicking trigger again").not.toBeVisible();

    // Click trigger again to reopen
    await trigger.click();
    await expect(menu, "Dropdown should reopen when clicking trigger again").toBeVisible();
  });
});

// Mobile-specific tests
test.describe("Mobile Functionality", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".card", { timeout: 5000 });
  });

  test("mobile search button opens command palette", async ({ page }) => {
    const searchBtn = page.locator(".mobile-search-btn");
    const palette = page.locator(".command-palette");
    const overlay = page.locator(".command-palette-overlay");

    // Verify initially closed
    await expect(palette).not.toBeVisible();

    // Click search button
    await searchBtn.click();

    // Verify command palette is open
    await expect(palette, "Command palette should be visible after clicking search button").toBeVisible();
    await expect(overlay, "Command palette overlay should be visible").toBeVisible();
  });

  test("hamburger menu toggles sidebar", async ({ page }) => {
    const hamburger = page.locator(".hamburger");
    const sidebar = page.locator(".sidebar");
    const overlay = page.locator(".sidebar-overlay");

    // Verify initially closed
    await expect(sidebar).not.toHaveClass(/open/);

    // Click hamburger to open
    await hamburger.click();

    // Verify sidebar is open
    await expect(sidebar, "Sidebar should have 'open' class after clicking hamburger").toHaveClass(/open/);
    await expect(overlay, "Sidebar overlay should have 'open' class").toHaveClass(/open/);
  });

  test("clicking overlay closes mobile sidebar", async ({ page }) => {
    const hamburger = page.locator(".hamburger");
    const sidebar = page.locator(".sidebar");
    const overlay = page.locator(".sidebar-overlay");

    // Open sidebar
    await hamburger.click();
    await expect(sidebar).toHaveClass(/open/);

    // Click overlay to close
    await overlay.click();

    // Verify sidebar is closed
    await expect(sidebar, "Sidebar should close after clicking overlay").not.toHaveClass(/open/);
  });

  test("mobile command palette can filter by category", async ({ page }) => {
    // Open command palette
    await page.locator(".mobile-search-btn").click();
    await expect(page.locator(".command-palette")).toBeVisible();

    // Find and click the category dropdown in the palette
    const paletteDropdowns = page.locator(".command-palette .search-dropdown");
    const catDropdown = paletteDropdowns.first();
    const trigger = catDropdown.locator(".search-dropdown-trigger");
    const menu = catDropdown.locator(".search-dropdown-menu");

    await trigger.click();
    await expect(menu, "Mobile category dropdown should open").toBeVisible();

    // Select Layout
    await menu.locator('button:has-text("Layout")').click();

    // Verify dropdown closes
    await expect(menu, "Dropdown should close after selection").not.toBeVisible();
  });

  test("close button closes mobile command palette", async ({ page }) => {
    // Open command palette
    await page.locator(".mobile-search-btn").click();
    const palette = page.locator(".command-palette");
    await expect(palette).toBeVisible();

    // Click close button
    await page.locator(".command-palette-close").click();

    // Verify palette is closed
    await expect(palette, "Command palette should close after clicking close button").not.toBeVisible();
  });

  test("close button closes mobile sidebar", async ({ page }) => {
    // Open sidebar
    await page.locator(".hamburger").click();
    const sidebar = page.locator(".sidebar");
    await expect(sidebar).toHaveClass(/open/);

    // Click close button
    await page.locator(".sidebar-close").click();

    // Verify sidebar is closed
    await expect(sidebar, "Sidebar should close after clicking close button").not.toHaveClass(/open/);
  });
});

// Console error monitoring test
test.describe("Error Monitoring", () => {
  test("no console errors when interacting with dropdowns", async ({ page }) => {
    const consoleErrors: string[] = [];
    const consoleLogs: string[] = [];

    page.on("console", (msg) => {
      const text = msg.text();
      consoleLogs.push(text);
      if (msg.type() === "error") {
        consoleErrors.push(text);
      }
    });

    page.on("pageerror", (err) => {
      consoleErrors.push(err.message);
    });

    await page.goto("/");
    await page.waitForSelector(".card", { timeout: 5000 });

    // Interact with all dropdowns
    const dropdowns = page.locator(".search-dropdown");
    const count = await dropdowns.count();

    for (let i = 0; i < Math.min(count, 3); i++) {
      const dropdown = dropdowns.nth(i);
      const trigger = dropdown.locator(".search-dropdown-trigger");

      // Open
      await trigger.click();
      await page.waitForTimeout(100);

      // Close by pressing Escape
      await page.keyboard.press('Escape');
      await page.waitForTimeout(100);
    }

    // Filter out sourcemap warnings and Datastar "effect expression evaluated" messages
    const filteredErrors = consoleErrors.filter(err => 
      !err.includes("sourcemap") && 
      !err.includes("[datastar]") &&
      !err.includes("effect expression evaluated")
    );

    if (filteredErrors.length > 0) {
      console.log("Console logs:", consoleLogs);
      console.log("All console errors:", consoleErrors);
    }

    expect(filteredErrors, `Unexpected console errors: ${filteredErrors.join(", ")}`).toHaveLength(0);
  });
});
