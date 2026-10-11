import { test, expect } from "@playwright/test";

const STEPS = ["Seller ratings", "Payment flows", "The admin panel", "The mobile retrofit", "Owned end to end"];

test.describe("Crypto Marketplace composition", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("five steps ascend in type size, in growth order, with both paragraphs", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/crypto-marketplace");

    await expect(page.getByRole("heading", { level: 1, name: "CRYPTO MARKETPLACE" })).toBeVisible();
    await expect(page.locator("[data-balance-figure]")).toBeVisible();

    const steps = page.locator("[data-composition='growth-curve'] > li");
    await expect(steps).toHaveCount(5);
    for (const [i, title] of STEPS.entries()) {
      await expect(steps.nth(i).getByRole("heading", { level: 2 })).toHaveText(title);
    }

    const sizes = await steps.locator("h2").evaluateAll((els) =>
      els.map((el) => parseFloat(getComputedStyle(el).fontSize)),
    );
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]).toBeGreaterThan(sizes[i - 1]);
    }

    await expect(page.getByText(/A peer-to-peer marketplace for physical goods/)).toBeVisible();
    await expect(page.getByText(/This was my first engineering job/)).toBeVisible();
    await expect(steps.nth(4)).toContainText("Grew from isolated tasks");
  });

  test("hovering a step dims the others", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/crypto-marketplace");
    const steps = page.locator("[data-composition='growth-curve'] > li");
    await steps.nth(2).hover();
    await expect
      .poll(async () => steps.nth(0).evaluate((el) => getComputedStyle(el).opacity))
      .toBe("0.3");
    await expect
      .poll(async () => steps.nth(2).evaluate((el) => getComputedStyle(el).opacity))
      .toBe("1");
  });

  test("step titles are translated in ru and zh", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/crypto-marketplace");

    await page.getByRole("button", { name: "RU" }).click();
    await expect(page.getByRole("heading", { level: 2, name: "Фичи от и до" })).toBeVisible();

    await page.getByRole("button", { name: "ZH" }).click();
    await expect(page.getByRole("heading", { level: 2, name: "端到端负责" })).toBeVisible();
  });

  test("phone layout keeps the five steps in one column", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/crypto-marketplace");
    const steps = page.locator("[data-composition='growth-curve'] > li");
    await expect(steps).toHaveCount(5);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
  });
});
