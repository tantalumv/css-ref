import { test, expect } from '@playwright/test';
test('check flexbox button', async ({ page }) => {
  await page.goto('/#!flexbox');
  await page.waitForTimeout(1000);
  
  const btn = page.locator('.demo-playground-card').first().getByRole('button', { name: 'center', exact: true });
  console.log('Before click - class:', await btn.getAttribute('class'));
  
  await btn.click();
  await page.waitForTimeout(1000);
  
  console.log('After click - class:', await btn.getAttribute('class'));
  
  const card = page.locator('.demo-playground-card').first();
  const signals = await card.getAttribute('data-signals');
  console.log('Card data-signals:', signals);
});
