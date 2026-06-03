import { test, expect } from '@playwright/test';
test('check datastar load', async ({ page }) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('response', response => {
    if (response.url().includes('datastar')) {
      console.log('Datastar response:', response.status(), response.url());
    }
  });
  
  await page.goto('/#!flexbox');
  await page.waitForTimeout(3000);
  
  // Check if Datastar script loaded successfully
  const datastarLoaded = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script'));
    const datastarScript = scripts.find(s => 
      s.src && s.src.includes('datastar')
    );
    if (!datastarScript) return { loaded: false, reason: 'no script element' };
    return {
      loaded: true,
      src: datastarScript.src,
      readyState: datastarScript.readyState,
    };
  });
  console.log('Datastar script:', datastarLoaded);
  
  // Check for any errors
  const errors = await page.evaluate(() => {
    return window.__errors || [];
  });
  console.log('Errors:', errors);
});
