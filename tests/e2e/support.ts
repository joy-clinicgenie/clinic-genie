import { expect, type Page } from "@playwright/test";

/** Dev-server noise that is not a product failure. */
const BENIGN_CONSOLE =
  /favicon\.ico|Download the React DevTools|\[HMR\]|webpack-hmr|Fast Refresh/i;

export const KEY_ROUTES = [
  { path: "/", title: /Clinic Genie/ },
  { path: "/about", title: /About Us/ },
  { path: "/services", title: /Services \| Clinic Genie/ },
  { path: "/portfolio", title: /Our Works/ },
  { path: "/clinic-specialties", title: /Clinic Specialties/ },
  { path: "/genie-tips", title: /Genie Tips/ },
  { path: "/contact", title: /Contact \| Clinic Genie/ },
] as const;

export function trackBrowserErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on("pageerror", (error) => {
    errors.push(`pageerror: ${error.message}`);
  });

  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    if (BENIGN_CONSOLE.test(text)) return;
    const url = message.location().url;
    errors.push(url ? `console: ${text} (${url})` : `console: ${text}`);
  });

  return errors;
}

export function expectNoBrowserErrors(errors: string[], label: string): void {
  expect(
    errors,
    `${label} reported browser errors:\n${errors.join("\n")}`
  ).toEqual([]);
}

export async function expectNoHorizontalOverflow(
  page: Page,
  label: string
): Promise<void> {
  await page.evaluate(() => document.fonts.ready);

  const measurement = await page.evaluate(() => {
    const root = document.documentElement;
    const body = document.body;
    const rootOverflow = root.scrollWidth - root.clientWidth;
    const bodyOverflow = body.scrollWidth - body.clientWidth;
    return {
      overflow: Math.max(rootOverflow, bodyOverflow),
      viewport: window.innerWidth,
    };
  });

  expect(
    measurement.overflow,
    `${label} has ${measurement.overflow}px of horizontal overflow at ${measurement.viewport}px wide`
  ).toBeLessThanOrEqual(1);
}

export async function openPage(page: Page, path: string): Promise<void> {
  const response = await page.goto(path, { waitUntil: "load" });
  expect(response, `${path} did not return a document response`).not.toBeNull();
  expect(
    response!.ok() || response!.status() < 400,
    `${path} returned HTTP ${response?.status()}`
  ).toBeTruthy();
  await expect(page.locator("main#main")).toBeVisible();
}
