import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on("console", (msg) => {
    console.log(`BROWSER [${msg.type()}]: ${msg.text()}`);
  });

  page.on("pageerror", (err) => {
    console.log(`BROWSER ERROR: ${err.message}`);
  });

  page.on("requestfailed", (request) => {
    console.log(`BROWSER REQUEST FAILED: ${request.url()} - ${request.failure()?.errorText}`);
  });

  page.on("response", (response) => {
    if (response.status() >= 400) {
      console.log(`BROWSER ERROR RESPONSE: ${response.url()} - Status ${response.status()}`);
    }
  });

  console.log("Navigating to http://localhost:2005/#!grid");
  await page.goto("http://localhost:2005/#!grid");

  console.log("Waiting for .collection-page...");
  try {
    await page.waitForSelector(".collection-page", { timeout: 10000 });
    console.log("SUCCESS: .collection-page found");
    const title = await page.locator(".category-title").textContent();
    console.log("Collection Title:", title);
  } catch (e) {
    console.log("FAILURE: .collection-page not found");
    const body = await page.innerHTML("body");
    // console.log("BODY CONTENT:", body.slice(0, 500));
  }

  await browser.close();
})();
