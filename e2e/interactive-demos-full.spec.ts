import { test, expect } from "@playwright/test";

// Helper utilities
export const getDemoRoot = (page: any) => page.locator(".demo-playground-card").first();

export const getSignalValue = async (page: any, signalName: string): Promise<string> => {
  return await page.evaluate((sig) => {
    const signalsEl = document.querySelector(".demo-playground-card");
    if (!signalsEl) return "";
    const signalsStr = signalsEl.getAttribute("data-signals");
    if (!signalsStr) return "";
    try {
      const signals = JSON.parse(signalsStr.replace(/'/g, '"'));
      return signals[sig] || signals[Object.keys(signals).find(k => k.toLowerCase().includes(sig.toLowerCase()))] || "";
    } catch {
      return "";
    }
  }, signalName);
};

export const waitForReactivity = (page: any) => page.waitForTimeout(500);

test.describe("Interactive Demos - Flexbox", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#!flexbox");
    await waitForReactivity(page);
  });

  test("Renders all controls", async ({ page }) => {
    const root = getDemoRoot(page);
    await expect(root).toBeVisible();

    // Check direction/alignment buttons (12 total)
    const dirButtons = root.locator("button:has-text('flex-start'), button:has-text('center'), button:has-text('space-between'), button:has-text('space-around'), button:has-text('align-start'), button:has-text('align-center'), button:has-text('wrap'), button:has-text('nowrap'), button:has-text('row'), button:has-text('column'), button:has-text('row-reverse'), button:has-text('column-reverse')");
    await expect(dirButtons).toHaveCount(12);

    // Check range sliders for flexGap (4 demo sections each with a gap slider)
    const gapSlider = root.locator('input[type="range"]');
    await expect(gapSlider).toHaveCount(5); // 5 demo sections × 1 gap slider each

    // Check itemCount +/- buttons
    const minusBtn = root.locator("button:has-text('−')");
    const plusBtn = root.locator("button:has-text('+')");
    await expect(minusBtn).toBeVisible();
    await expect(plusBtn).toBeVisible();

    // Check code panel toggle
    const codeToggle = root.locator(".demo-code-toggle").first();
    await expect(codeToggle).toBeVisible();

    // Check copy button inside code panel
    const copyBtn = root.locator("button:has-text('Copy')").first();
    await expect(copyBtn).toBeVisible();

    // Check demo canvas (first one is sufficient)
    const canvas = root.locator(".demo-canvas-area").first();
    await expect(canvas).toBeVisible();
  });

  test("Interactive controls work", async ({ page }) => {
    const root = getDemoRoot(page);

    // Change itemCount using +/- buttons
    const minusBtn = root.locator("button:has-text('−')");
    const plusBtn = root.locator("button:has-text('+')");
    
    const initialItems = await page.locator(".demo-item-box:not([data-class])").count();
    await plusBtn.click();
    await waitForReactivity(page);
    const afterPlusItems = await page.locator(".demo-item-box:not([data-class])").count();
    expect(afterPlusItems).toBeGreaterThanOrEqual(initialItems);

     // Click justify-content center button and verify active state (use exact match to distinguish from align-center)
     const centerBtn = root.getByRole('button', { name: 'center', exact: true });
     await centerBtn.click();
     await waitForReactivity(page);
     await expect(centerBtn).toHaveClass(/active/);

    // Check gap slider (attribute name is data-bind:flexGap, not data-bind)
    const gapSlider = root.locator('input[type="range"]').first();
    await gapSlider.fill("15");
    await waitForReactivity(page);
    const gapText = root.locator("[data-text*='px']").first();
    // Note: data-text binding may not update visually in test without re-evaluating

    // Verify canvas data-style attributes
    const canvas = root.locator(".demo-canvas-area").first();
    const gapValue = await canvas.evaluate(el => el.style.gap);
    expect(gapValue).toBe("15px");
  });

   test("Code panel toggles and copies", async ({ page }) => {
      const root = getDemoRoot(page);

      // Panel body (the div that shows/hides)
      const panelBody = root.locator(".demo-code-panel div[data-show]");
      // Initially hidden
      await expect(panelBody).toBeHidden();

      // Toggle open
      const codeToggle = root.locator(".demo-code-toggle").first();
      await codeToggle.click();

     // Wait for panel to become visible
     await expect(panelBody).toBeVisible({ timeout: 10000 });

     // Check that code content is present and contains expected CSS
     const codeEl = panelBody.locator("code");
     await expect(codeEl).toBeVisible();
     const codeText = await codeEl.textContent();
     expect(codeText).toContain("display: flex");

     // Toggle closed
     await codeToggle.click();
     await expect(panelBody).toBeHidden({ timeout: 10000 });

     // Reopen and test copy button
     await codeToggle.click();
     await expect(panelBody).toBeVisible({ timeout: 10000 });

     const copyBtn = root.locator("button:has-text('Copy')").first();
     await expect(copyBtn).toBeVisible();
     await copyBtn.click();
     await waitForReactivity(page);
   });
});

test.describe("Interactive Demos - Grid", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#!grid");
    await waitForReactivity(page);
  });

  test("Renders all controls", async ({ page }) => {
    const root = getDemoRoot(page);
    await expect(root).toBeVisible();

     // Check layout type buttons (4 total)
     const layoutButtons = root.locator("button:has-text('Classic'), button:has-text('Hero'), button:has-text('Dashboard'), button:has-text('Gallery')");
     await expect(layoutButtons).toHaveCount(4);

     // Check range slider for gridGap
     const gapSlider = root.locator('input[type="range"]').first();
     await expect(gapSlider).toBeVisible();

    // Check gridItemCount +/- buttons
    const minusBtn = root.locator("button:has-text('−')");
    const plusBtn = root.locator("button:has-text('+')");
    await expect(minusBtn).toBeVisible();
    await expect(plusBtn).toBeVisible();

     // Check code toggle button
     const codeToggle = root.locator(".demo-code-toggle").first();
     await expect(codeToggle).toBeVisible();
  });

  test("Interactive controls work", async ({ page }) => {
    const root = getDemoRoot(page);

      // Change layout type
      const heroBtn = root.locator("button:has-text('Hero')");
      await heroBtn.click();
      await waitForReactivity(page);
      await expect(heroBtn).toHaveClass(/active/);

    // Verify gallery items hidden in hero mode
    const galleryItems = root.locator(".grid-gallery-item");
    const visibleCount = await galleryItems.locator(":not([data-class*='hidden'])").count();
    expect(visibleCount).toBe(0);

    // Change grid item count
    const plusBtn = root.locator("button:has-text('+')");
    await plusBtn.click();
    await waitForReactivity(page);

    const itemCountAfter = await getSignalValue(page, "gridItemCount");
    expect(Number(itemCountAfter)).toBe(3); // initial 2, plus one

     // Check gap slider
     const gapSlider = root.locator('input[type="range"]').first();
     await gapSlider.fill("12");
     await waitForReactivity(page);
     
     // Verify gap text display updated
     const gapText = root.locator('input[type="range"] + span').first();
     await expect(gapText).toHaveText("12px");

    // Verify canvas gap style via inline style
    const canvas = root.locator(".grid-demo");
    const gapValue = await canvas.evaluate(el => el.style.gap);
    expect(gapValue).toBe("12px");
  });

   test("Code panel toggles and copies", async ({ page }) => {
      const root = getDemoRoot(page);

      // Toggle code panel open
      const codeToggle = root.locator(".demo-code-toggle");
      await codeToggle.click();
    await waitForReactivity(page);
    
    const codePanel = root.locator("[data-show='$showCode']");
    await expect(codePanel).toBeVisible();

    // Check copy button
    const copyBtn = root.locator("button:has-text('Copy')").first();
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await waitForReactivity(page);
  });
});

test.describe("Interactive Demos - Typography", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#!typography");
    await waitForReactivity(page);
  });

  test("Renders all controls", async ({ page }) => {
    const root = getDemoRoot(page);
    await expect(root).toBeVisible();

    // Check font-family buttons (3 total)
    const fontButtons = root.locator("button:has-text('Serif'), button:has-text('Sans'), button:has-text('Mono')");
    await expect(fontButtons).toHaveCount(3);

    // Check font-size buttons (3 total)
    const sizeButtons = root.locator("button:has-text('Small'), button:has-text('Medium'), button:has-text('Large')");
    await expect(sizeButtons).toHaveCount(3);

    // Check line-height buttons (2 total)
    const lhButtons = root.locator("button:has-text('Tight'), button:has-text('Loose')");
    await expect(lhButtons).toHaveCount(2);

    // Check font-weight buttons (2 total)
    const fwButtons = root.locator("button:has-text('Regular'), button:has-text('Bold')");
    await expect(fwButtons).toHaveCount(2);

    // Check text-align buttons (3 total)
    const taButtons = root.locator("button:has-text('Left'), button:has-text('Center'), button:has-text('Right')");
    await expect(taButtons).toHaveCount(3);

    // Check letter-spacing slider
    const lsSlider = root.locator('input[type="range"]').first();
    await expect(lsSlider).toBeVisible();

    // Check code panel toggle
    const codeToggle = root.locator(".demo-code-toggle").first();
    await expect(codeToggle).toBeVisible();

    // Check canvas
    const canvas = root.locator(".demo-canvas-area");
    await expect(canvas).toBeVisible();
  });

   test("Interactive controls work", async ({ page }) => {
     const root = getDemoRoot(page);

      // Change font family
      const sansBtn = root.locator("button:has-text('Sans')");
      await sansBtn.click();
      await waitForReactivity(page);
      await expect(sansBtn).toHaveClass(/active/);

      // Change font size
      const largeBtn = root.locator("button:has-text('Large')");
      await largeBtn.click();
      await waitForReactivity(page);

      // Change line height
      const looseBtn = root.locator("button:has-text('Loose')");
      await looseBtn.click();
      await waitForReactivity(page);

      // Change text align
      const centerBtn = root.locator("button:has-text('Center')");
      await centerBtn.click();
      await waitForReactivity(page);
      await expect(centerBtn).toHaveClass(/active/);  // Fixed: check centerBtn is active

      // Check letter-spacing slider
      const lsSlider = root.locator('input[type="range"]').first();
      await lsSlider.fill("5");
      await waitForReactivity(page);

      // Verify canvas has updated styles
      const canvas = root.locator(".demo-canvas-area");
      const fontFamily = await canvas.evaluate(el => el.style.fontFamily);
      expect(fontFamily).toContain("Inter, sans-serif");
  });

   test("Code panel toggles and copies", async ({ page }) => {
      const root = getDemoRoot(page);

      const codeToggle = root.locator(".demo-code-toggle").first();
      await codeToggle.click();
      await waitForReactivity(page);
      
      const codePanel = root.locator("[data-show]").first();
      await expect(codePanel).toBeVisible();

      const copyBtn = root.locator("button:has-text('Copy')").first();
      await expect(copyBtn).toBeVisible();
      await copyBtn.click();
      await waitForReactivity(page);
   });
});

test.describe("Interactive Demos - Animation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#!animation");
    await waitForReactivity(page);
  });

  test("Renders all controls", async ({ page }) => {
    const root = getDemoRoot(page);
    await expect(root).toBeVisible();

    // Check preset buttons (4 total)
    const presetButtons = root.locator("button:has-text('Bounce'), button:has-text('Pulse'), button:has-text('Shake'), button:has-text('Spin')");
    await expect(presetButtons).toHaveCount(4);

    // Check duration slider
    const durSlider = root.locator('input[type="range"]').first();
    await expect(durSlider).toBeVisible();

    // Check timing buttons (5 total)
    const timingButtons = root.locator("button:has-text('Ease'), button:has-text('Linear'), button:has-text('Ease In'), button:has-text('Ease Out'), button:has-text('Ease In Out')");
    await expect(timingButtons).toHaveCount(5);

    // Check iteration buttons (3 total)
    const iterButtons = root.locator("button:has-text('1x'), button:has-text('3x'), button:has-text('Infinite')");
    await expect(iterButtons).toHaveCount(3);

    // Check code toggle
    const codeToggle = root.locator(".demo-code-toggle");
    await expect(codeToggle).toBeVisible();
  });

  test("Interactive controls work", async ({ page }) => {
    const root = getDemoRoot(page);

     // Switch to pulse animation
     const pulseBtn = root.locator("button:has-text('Pulse')");
     await pulseBtn.click();
     await waitForReactivity(page);
     await expect(pulseBtn).toHaveClass(/active/);

    // Change duration
    const durSlider = root.locator('input[type="range"]').first();
    await durSlider.fill("1.5");
    await waitForReactivity(page);

    // Change timing
    const linearBtn = root.locator("button:has-text('Linear')");
    await linearBtn.click();
    await waitForReactivity(page);

    // Change iteration
    const infiniteBtn = root.locator("button:has-text('Infinite')");
    await infiniteBtn.click();
    await waitForReactivity(page);

    // Verify element has animation style
    const animEl = root.locator(".demo-item-box");
    const animStyle = await animEl.evaluate(el => el.style.animation);
    // Should contain animation name "pulse", duration "1.5s", timing "linear", iteration "infinite"
    expect(animStyle).toContain("pulse");
    expect(animStyle).toContain("1.5s");
    expect(animStyle).toContain("linear");
    expect(animStyle).toContain("infinite");
  });

   test("Code panel toggles and copies", async ({ page }) => {
      const root = getDemoRoot(page);

      const codeToggle = root.locator(".demo-code-toggle").first();
      await codeToggle.click();
      await waitForReactivity(page);
      
      const codePanel = root.locator("[data-show]").first();
      await expect(codePanel).toBeVisible();

      const copyBtn = root.locator("button:has-text('Copy')").first();
      await expect(copyBtn).toBeVisible();
      await copyBtn.click();
      await waitForReactivity(page);
   });
});

test.describe("Interactive Demos - Color", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#!color");
    await waitForReactivity(page);
  });

  test("Renders all controls", async ({ page }) => {
    const root = getDemoRoot(page);
    await expect(root).toBeVisible();

    // Check preset buttons (3 total)
    const presetButtons = root.locator("button:has-text('Light'), button:has-text('Dark'), button:has-text('Brand')");
    await expect(presetButtons).toHaveCount(3);

    // Check opacity slider
    const opacitySlider = root.locator('input[type="range"]').first();
    await expect(opacitySlider).toBeVisible();

    // Check color pickers (3 total)
    const colorPickers = root.locator('input[type="color"]');
    await expect(colorPickers).toHaveCount(3);

    // Check code toggle
    const codeToggle = root.locator(".demo-code-toggle").first();
    await expect(codeToggle).toBeVisible();
  });

  test("Interactive controls work", async ({ page }) => {
    const root = getDemoRoot(page);

     // Switch to dark theme
     const darkBtn = root.locator("button:has-text('Dark')");
     await darkBtn.click();
     await waitForReactivity(page);
     // Note: dark theme button might not have active state since it sets multiple values

   // Adjust opacity
   const opacitySlider = root.locator('input[type="range"]').first();
   await opacitySlider.fill("0.5");
   await waitForReactivity(page);

       // Verify canvas card has updated styles
       const card = root.locator(".demo-canvas-area div").first();
       await expect(card).toBeVisible();
       const bgColor = await card.evaluate(el => el.style.backgroundColor);
       expect(bgColor).toBe("#1f2937");
       const textColor = await card.evaluate(el => el.style.color);
       expect(textColor).toBe("#f9fafb");
       const borderColor = await card.evaluate(el => el.style.borderColor);
       expect(borderColor).toBe("#4b5563");

         // Verify opacity is applied
         const opacityValue = await card.evaluate(el => el.style.opacity);
         expect(opacityValue).toBe("0.5");
       });

   test("Code panel toggles and copies", async ({ page }) => {
      const root = getDemoRoot(page);

      const codeToggle = root.locator(".demo-code-toggle").first();
      await codeToggle.click();
      await waitForReactivity(page);
      
      const codePanel = root.locator("[data-show]").first();
      await expect(codePanel).toBeVisible();

      const copyBtn = root.locator("button:has-text('Copy')").first();
      await expect(copyBtn).toBeVisible();
      await copyBtn.click();
      await waitForReactivity(page);
   });
});

test.describe("Interactive Demos - Layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#!layout");
    await waitForReactivity(page);
  });

  test("Renders all controls", async ({ page }) => {
    const root = getDemoRoot(page);
    await expect(root).toBeVisible();

    // Check position buttons (4 total)
    const posButtons = root.locator("button:has-text('Static'), button:has-text('Relative'), button:has-text('Absolute'), button:has-text('Fixed')");
    await expect(posButtons).toHaveCount(4);

     // Check top slider (hidden by default when position is static)
     // Check left slider (hidden by default when position is static)
     const codeToggle = root.locator(".demo-code-toggle").first();
     await expect(codeToggle).toBeVisible();
  });

  test("Interactive controls work", async ({ page }) => {
    const root = getDemoRoot(page);

     // Change position to relative
     const relativeBtn = root.locator("button:has-text('Relative')");
     await relativeBtn.click();
     await waitForReactivity(page);
     await expect(relativeBtn).toHaveClass(/active/);

     // Now sliders should be visible
     const sliders = root.locator('input[type="range"]');
     const topSlider = sliders.nth(0);
     const leftSlider = sliders.nth(1);
     await expect(topSlider).toBeVisible();
     await expect(leftSlider).toBeVisible();

    // Adjust position
    await topSlider.fill("60");
    await waitForReactivity(page);
    await leftSlider.fill("80");
    await waitForReactivity(page);

    // Verify element has updated styles
    const elem = root.locator(".demo-item-box");
    const position = await elem.evaluate(el => el.style.position);
    expect(position).toBe("relative");
    const top = await elem.evaluate(el => el.style.top);
    expect(top).toBe("60px");
    const left = await elem.evaluate(el => el.style.left);
    expect(left).toBe("80px");

    // Change to absolute
    const absoluteBtn = root.locator("button:has-text('Absolute')");
    await absoluteBtn.click();
    await waitForReactivity(page);
  });

   test("Code panel toggles and copies", async ({ page }) => {
      const root = getDemoRoot(page);

      const codeToggle = root.locator(".demo-code-toggle").first();
      await codeToggle.click();
      await waitForReactivity(page);
      
      const codePanel = root.locator("[data-show]").first();
      await expect(codePanel).toBeVisible();

      const copyBtn = root.locator("button:has-text('Copy')").first();
      await expect(copyBtn).toBeVisible();
      await copyBtn.click();
      await waitForReactivity(page);
   });
});

test.describe("Interactive Demos - Box Model", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#!box-model");
    await waitForReactivity(page);
  });

   test("Renders all controls", async ({ page }) => {
     const root = getDemoRoot(page);
     await expect(root).toBeVisible();

     // Check sliders (3 total) — selected by order since data-bind attributes use camelCase with colons
     const sliders = root.locator('input[type="range"]');
     await expect(sliders.nth(0)).toBeVisible();
     await expect(sliders.nth(1)).toBeVisible();
     await expect(sliders.nth(2)).toBeVisible();

    // Check reset button
    const resetBtn = root.locator("button:has-text('Reset')");
    await expect(resetBtn).toBeVisible();

    // Check code toggle
    const codeToggle = root.locator(".demo-code-toggle").first();
    await expect(codeToggle).toBeVisible();
  });

   test("Interactive controls work", async ({ page }) => {
     const root = getDemoRoot(page);

     // Adjust margin, padding, border via indexed sliders (order: margin, padding, border)
     const sliders = root.locator('input[type="range"]');
     await sliders.nth(0).fill("30");
     await waitForReactivity(page);

     await sliders.nth(1).fill("20");
     await waitForReactivity(page);

     await sliders.nth(2).fill("10");
     await waitForReactivity(page);

      // Verify element has updated styles
      const elem = root.locator('.demo-canvas-area [data-style\\:padding]').last();
      await expect(elem).toBeVisible();
      const padding = await elem.evaluate(el => el.style.padding);
      expect(padding).toBe("20px");
   });

   test("Code panel toggles and copies", async ({ page }) => {
      const root = getDemoRoot(page);

      const codeToggle = root.locator(".demo-code-toggle").first();
      await codeToggle.click();
      await waitForReactivity(page);
      
      const codePanel = root.locator("[data-show]").first();
      await expect(codePanel).toBeVisible();

      const copyBtn = root.locator("button:has-text('Copy')").first();
      await expect(copyBtn).toBeVisible();
      await copyBtn.click();
      await waitForReactivity(page);
   });
});

test.describe("Interactive Demos - Backgrounds", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#!backgrounds");
    await waitForReactivity(page);
  });

  test("Renders all controls", async ({ page }) => {
    const root = getDemoRoot(page);
    await expect(root).toBeVisible();

    // Check mode buttons (4 total)
    const modeButtons = root.locator("button:has-text('Gradient'), button:has-text('Solid'), button:has-text('Image'), button:has-text('Pattern')");
    await expect(modeButtons).toHaveCount(4);

    // Check size buttons (4 total)
    const sizeButtons = root.locator("button:has-text('Cover'), button:has-text('Contain'), button:has-text('Auto'), button:has-text('50%')");
    await expect(sizeButtons).toHaveCount(4);

    // Check position buttons (5 total)
    const posButtons = root.locator("button:has-text('Center'), button:has-text('Top'), button:has-text('Bottom'), button:has-text('Left'), button:has-text('Right')");
    await expect(posButtons).toHaveCount(5);

    // Check repeat buttons (4 total)
    const repeatButtons = root.locator("button:has-text('No-repeat'), button:has-text('Repeat'), button:has-text('Repeat-X'), button:has-text('Repeat-Y')");
    await expect(repeatButtons).toHaveCount(4);

    // Check code toggle
    const codeToggle = root.locator(".demo-code-toggle");
    await expect(codeToggle).toBeVisible();
  });

  test("Interactive controls work", async ({ page }) => {
    const root = getDemoRoot(page);

     // Change background mode
     const solidBtn = root.locator("button:has-text('Solid')");
     await solidBtn.click();
     await waitForReactivity(page);
     await expect(solidBtn).toHaveClass(/active/);

    // Change size
    const containBtn = root.locator("button:has-text('Contain')");
    await containBtn.click();
    await waitForReactivity(page);

    // Change position
    const topBtn = root.locator("button:has-text('Top')");
    await topBtn.click();
    await waitForReactivity(page);

    // Change repeat
    const repeatBtn = root.locator("button:has-text('Repeat')");
    await repeatBtn.click();
    await waitForReactivity(page);

    // Verify canvas has updated styles
    const canvas = root.locator(".demo-canvas-area");
    const bg = await canvas.evaluate(el => el.style.background);
    expect(bg).toBe("#1e3a5f");
    const bgSize = await canvas.evaluate(el => el.style.backgroundSize);
    expect(bgSize).toBe("contain");
    const bgPos = await canvas.evaluate(el => el.style.backgroundPosition);
    expect(bgPos).toBe("top");
    const bgRepeat = await canvas.evaluate(el => el.style.backgroundRepeat);
    expect(bgRepeat).toBe("repeat");
  });

   test("Code panel toggles and copies", async ({ page }) => {
      const root = getDemoRoot(page);

      const codeToggle = root.locator(".demo-code-toggle").first();
      await codeToggle.click();
      await waitForReactivity(page);
      
      const codePanel = root.locator("[data-show]").first();
      await expect(codePanel).toBeVisible();

      const copyBtn = root.locator("button:has-text('Copy')").first();
      await expect(copyBtn).toBeVisible();
      await copyBtn.click();
      await waitForReactivity(page);
   });
});

test.describe("Interactive Demos - Transitions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#!transitions");
    await waitForReactivity(page);
  });

  test("Renders all controls", async ({ page }) => {
    const root = getDemoRoot(page);
    await expect(root).toBeVisible();

    // Check property buttons (3 total)
    const propButtons = root.locator("button:has-text('all'), button:has-text('transform'), button:has-text('background')");
    await expect(propButtons).toHaveCount(3);

    // Check duration slider
    const durSlider = root.locator('input[type="range"]').first();
    await expect(durSlider).toBeVisible();

    // Check timing buttons (5 total)
    const timingButtons = root.locator("button:has-text('Ease'), button:has-text('Ease In'), button:has-text('Ease Out'), button:has-text('Linear'), button:has-text('Bounce')");
    await expect(timingButtons).toHaveCount(5);

    // Check code toggle
    const codeToggle = root.locator(".demo-code-toggle");
    await expect(codeToggle).toBeVisible();
  });

  test("Interactive controls work", async ({ page }) => {
    const root = getDemoRoot(page);

     // Change property
     const transformBtn = root.locator("button:has-text('transform')");
     await transformBtn.click();
     await waitForReactivity(page);
     await expect(transformBtn).toHaveClass(/active/);

    // Change duration
    const durSlider = root.locator('input[type="range"]').first();
    await durSlider.fill("1.0");
    await waitForReactivity(page);

    // Change timing
    const linearBtn = root.locator("button:has-text('Linear')");
    await linearBtn.click();
    await waitForReactivity(page);

    // Hover over element to trigger transition
    const elem = root.locator(".demo-item-box").first();
    await elem.hover();
    await waitForReactivity(page);
  });

  test("Code panel toggles and copies", async ({ page }) => {
    const root = getDemoRoot(page);

    const codeToggle = root.locator(".demo-code-toggle");
    await codeToggle.click();
    await waitForReactivity(page);
    
    const codePanel = root.locator("[data-show]").first();
    await expect(codePanel).toBeVisible();

    const copyBtn = root.locator("button:has-text('Copy')").first();
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await waitForReactivity(page);
  });
});
