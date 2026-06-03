import { test, expect } from '@playwright/test';
test('check window object', async ({ page }) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('/#!flexbox');
  await page.waitForTimeout(2000);
  
  // Check what's available on window object
  const windowKeys = await page.evaluate(() => {
    return Object.keys(window).filter(k => 
      k.includes('Data') || k.includes('datastar') || k.includes('Star') || k.includes('STAR')
    );
  });
  console.log('Window keys (Datastar related):', windowKeys);
  
  // Check for any Datastar-like objects
  const allKeys = await page.evaluate(() => {
    return Object.keys(window).filter(k => k.toLowerCase().includes('data') || k.toLowerCase().includes('star'));
  });
  console.log('All keys with data/star:', allKeys);
  
  // Check if we can access Datastar from the script
  const datastarCheck = await page.evaluate(() => {
    // Check CDN script
    const scripts = Array.from(document.querySelectorAll('script'));
    const datastarScript = scripts.find(s => 
      s.src && s.src.includes('datastar')
    );
    console.log('Datastar script:', datastarScript?.src);
    
    // Try to access globalThis
    return {
      hasGlobalDatastar: typeof globalThis.Datastar !== 'undefined',
      hasWindowDatastar: typeof window.Datastar !== 'undefined',
      hasSelfDatastar: typeof self.Datastar !== 'undefined',
    };
  });
  console.log('Datastar check:', datastarCheck);
});
