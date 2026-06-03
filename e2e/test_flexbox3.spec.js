import { test, expect } from '@playwright/test';
test('check datastar connectivity', async ({ page }) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('/#!flexbox');
  await page.waitForTimeout(2000);
  
  // Check if Datastar is available
  const hasDatastar = await page.evaluate(() => typeof window.Datastar !== 'undefined');
  console.log('Datastar available:', hasDatastar);
  
  // Check if signals were initialized
  const signalsInitialized = await page.evaluate(() => {
    const card = document.querySelector('.demo-playground-card');
    if (!card) return false;
    const signalsStr = card.getAttribute('data-signals');
    console.log('Signals attribute:', signalsStr);
    try {
      const signals = JSON.parse(signalsStr.replace(/'/g, '"'));
      return !!signals;
    } catch (e) {
      return false;
    }
  });
  console.log('Signals initialized:', signalsInitialized);
  
  // Check the center button
  const btn = page.locator('.demo-playground-card').first().getByRole('button', { name: 'center', exact: true });
  await btn.click();
  await page.waitForTimeout(1000);
  
  // Check signal after click
  const signalAfterClick = await page.evaluate(() => {
    const card = document.querySelector('.demo-playground-card');
    const signalsStr = card.getAttribute('data-signals');
    try {
      return JSON.parse(signalsStr.replace(/'/g, '"')).justifyContent;
    } catch (e) {
      return null;
    }
  });
  console.log('Signal justifyContent after click:', signalAfterClick);
  
  // Check classes
  const classAfter = await btn.evaluate(el => el.className);
  console.log('Button class after click:', classAfter);
});
