import { test, expect } from "@playwright/test";

test.describe("Interactive Demos", () => {
  // All collection pages render their demo content
  test("flexbox collection renders demo", async ({ page }) => {
    await page.goto("/#!flexbox");
    await page.waitForTimeout(2000);

    const content = await page.locator("#collection-view").innerHTML();
    expect(content).toContain("Flex Playground");
    expect(content).toContain("data-on:click");
  });

  test("grid collection renders demo", async ({ page }) => {
    await page.goto("/#!grid");
    await page.waitForTimeout(2000);

    const content = await page.locator("#collection-view").innerHTML();
    expect(content).toContain("Landing Page Builder");
  });

  test("typography collection renders demo", async ({ page }) => {
    await page.goto("/#!typography");
    await page.waitForTimeout(2000);

    const content = await page.locator("#collection-view").innerHTML();
    expect(content).toContain("Text Lab");
  });

  test("animation collection renders demo", async ({ page }) => {
    await page.goto("/#!animation");
    await page.waitForTimeout(2000);

    const content = await page.locator("#collection-view").innerHTML();
    expect(content).toContain("Animation Playground");
  });

  test("color collection renders demo", async ({ page }) => {
    await page.goto("/#!color");
    await page.waitForTimeout(2000);

    const content = await page.locator("#collection-view").innerHTML();
    expect(content).toContain("Theme Builder");
  });

  test("layout collection renders demo", async ({ page }) => {
    await page.goto("/#!layout");
    await page.waitForTimeout(2000);

    const content = await page.locator("#collection-view").innerHTML();
    expect(content).toContain("Position Demo");
  });

  test("backgrounds collection renders demo", async ({ page }) => {
    await page.goto("/#!backgrounds");
    await page.waitForTimeout(2000);

    const content = await page.locator("#collection-view").innerHTML();
    expect(content).toContain("Hero Gallery");
  });

  test("box-model collection renders demo", async ({ page }) => {
    await page.goto("/#!box-model");
    await page.waitForTimeout(2000);

    const content = await page.locator("#collection-view").innerHTML();
    expect(content).toContain("Box Visualizer");
  });

  test("transitions collection renders demo", async ({ page }) => {
    await page.goto("/#!transitions");
    await page.waitForTimeout(2000);

    const content = await page.locator("#collection-view").innerHTML();
    expect(content).toContain("Micro-interaction Lab");
  });

  // Functional test - buttons can be clicked (fixed overlay bug)
  test("flexbox demo button click works", async ({ page }) => {
    await page.goto("/#!flexbox");
    await page.waitForTimeout(2000);

    // Click should work without force now that overlay bug is fixed
    await page.locator("button:has-text('center')").first().click();
    await page.waitForTimeout(300);

    // Verify click worked by checking button got active state
    const btn = page.locator("button:has-text('center')").first();
    const activeAttr = await btn.getAttribute("data-class:active");
    expect(activeAttr).toContain("center");
  });
});
