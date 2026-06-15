const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3005/", { waitUntil: "networkidle" });
  // scroll through to trigger any in-view logic, then back to top
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 800) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: ".design-ref/built-full.png", fullPage: true });
  await browser.close();
  console.log("done");
})();
