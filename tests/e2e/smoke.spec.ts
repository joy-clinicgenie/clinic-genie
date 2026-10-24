import { expect, test } from "@playwright/test";
import {
  KEY_ROUTES,
  expectNoBrowserErrors,
  expectNoHorizontalOverflow,
  openPage,
  trackBrowserErrors,
} from "./support";

for (const route of KEY_ROUTES) {
  test(`${route.path} loads, stays within the viewport, and stays quiet`, async ({
    page,
  }, testInfo) => {
    const errors = trackBrowserErrors(page);
    await openPage(page, route.path);
    await expect(page).toHaveTitle(route.title);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expectNoHorizontalOverflow(
      page,
      `${route.path} (${testInfo.project.name})`
    );
    expectNoBrowserErrors(errors, `${route.path} (${testInfo.project.name})`);
  });
}

test("desktop navigation, dropdown, and primary action work", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "The full navigation bar is shown from 1024px."
  );

  const errors = trackBrowserErrors(page);
  await openPage(page, "/");
  const header = page.locator("#site-header");

  await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
  await expect(
    header.getByRole("link", { name: "Make Your First Wish" })
  ).toBeVisible();

  await header.getByRole("link", { name: "About Us", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page).toHaveTitle(/About Us/);

  await header.getByRole("link", { name: "Our Works", exact: true }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await expect(page).toHaveTitle(/Our Works/);

  const services = header.getByRole("link", { name: "Services", exact: true });
  await services.hover();
  await header.getByRole("link", { name: "Healthcare SEO" }).click();
  await expect(page).toHaveURL(/\/services\/core-pillars\/healthcare-seo$/);
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

  await header.getByRole("link", { name: "Make Your First Wish" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page).toHaveTitle(/Contact \| Clinic Genie/);

  expectNoBrowserErrors(errors, "desktop navigation");
});

test("a portfolio case study link opens its page", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Checked once at desktop width.");

  const errors = trackBrowserErrors(page);
  await openPage(page, "/portfolio");
  const caseStudy = page.locator('main a[href^="/portfolio/"]').first();
  await expect(caseStudy, "Portfolio should list a case study link").toBeVisible();
  const href = await caseStudy.getAttribute("href");
  expect(href, "Case study link is missing an href").toBeTruthy();
  await caseStudy.click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  await expectNoHorizontalOverflow(page, "portfolio case study");
  expectNoBrowserErrors(errors, "portfolio case study");
});

test("header and footer links respond", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "The same header and footer links are checked once."
  );
  test.setTimeout(180_000);

  await openPage(page, "/");
  const hrefs = await page
    .locator('header a[href^="/"], footer a[href^="/"]')
    .evaluateAll((anchors) => {
      const paths = new Set<string>();
      for (const anchor of anchors) {
        const raw = anchor.getAttribute("href");
        if (!raw) continue;
        const url = new URL(raw, window.location.origin);
        if (url.origin !== window.location.origin) continue;
        if (!url.pathname || url.pathname.startsWith("/_next")) continue;
        paths.add(url.pathname);
      }
      return [...paths].sort();
    });

  expect(hrefs.length, "Expected internal links in the header and footer").toBeGreaterThan(5);

  const failures: string[] = [];
  for (const path of hrefs) {
    const response = await page.request.get(path);
    if (response.status() >= 400) {
      failures.push(`${path} returned HTTP ${response.status()}`);
    }
  }

  expect(
    failures,
    `Broken header or footer links:\n${failures.join("\n")}`
  ).toEqual([]);
});

test("compact menu buttons open, reveal services, and navigate", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "desktop",
    "The menu button is for widths below 1024px."
  );

  const errors = trackBrowserErrors(page);
  await openPage(page, "/");

  const openMenu = page.getByRole("button", { name: "Open menu" });
  await expect(openMenu).toBeVisible();
  await openMenu.click();

  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Close menu" }).click();
  await expect(dialog).toBeHidden();

  await openMenu.click();
  await dialog.getByRole("button", { name: "Show services" }).click();
  await dialog.getByRole("link", { name: "Healthcare SEO" }).click();
  await expect(page).toHaveURL(/\/services\/core-pillars\/healthcare-seo$/);
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

  await page.goto("/");
  await openMenu.click();
  await dialog.getByRole("link", { name: "Make Your First Wish" }).click();
  await expect(page).toHaveURL(/\/contact$/);

  await expectNoHorizontalOverflow(page, `${testInfo.project.name} contact`);
  expectNoBrowserErrors(errors, `${testInfo.project.name} menu`);
});
