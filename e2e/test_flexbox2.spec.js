import { test, expect } from '@playwright/test';
test('check flexbox button click', async ({ page }) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('/#!flexbox');
  await page.waitForTimeout(1000);
  
  const btn = page.locator('.demo-playground-card').first().getByRole('button', { name: 'center', exact: true });
  
  // Check if the click actually triggers an action
  await btn.click();
  await page.waitForTimeout(500);
  
  // Try to evaluate if the signal was updated by checking page state
  const card = page.locator('.demo-playground-card').first();
  const hasDataSignals = await card.evaluate(el => el.hasAttribute('data-signals'));
  console.log('Has data-signals:', hasDataSignals);
  
  // Check if button has Datastar attributes
  const hasDataOn = await btn.evaluate(el => el.hasAttribute('data-on:click'));
  console.log('Has data-on:click:', hasDataOn);
  const hasDataClass = await btn.evaluate(el => el.hasAttribute('data-class:active'));
  console.log('Has data-class:active:', hasDataClass);
});
