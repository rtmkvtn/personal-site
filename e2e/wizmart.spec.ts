import { test, expect } from "@playwright/test";

const STAGES = ["Matched", "Pulled", "Routed", "Labelled", "Paid", "Receipted"];

test.describe("Wizmart composition", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("six stages in order, the Pulled stage as the event, both paragraphs", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/wizmart");

    await expect(page.getByRole("heading", { level: 1, name: "WIZMART" })).toBeVisible();
    await expect(page.locator("[data-label-figure]")).toBeVisible();

    const stages = page.locator("[data-composition='order-journey'] > li");
    await expect(stages).toHaveCount(6);
    for (const [i, name] of STAGES.entries()) {
      await expect(stages.nth(i).getByRole("heading", { level: 2 })).toHaveText(name);
    }

    const sizes = await stages.locator("h2").evaluateAll((els) =>
      els.map((el) => parseFloat(getComputedStyle(el).fontSize)),
    );
    expect(sizes[1]).toBeGreaterThan(sizes[0]);
    expect(sizes[1]).toBeGreaterThan(sizes[2]);
    expect(sizes[0]).toBe(sizes[5]);

    await expect(stages.nth(1)).toContainText("mock server");
    await expect(page.getByText(/One app, two roles\./)).toBeVisible();
    await expect(page.getByText(/I was the sole developer/)).toBeVisible();
  });

  test("the journey map pins under the header and tracks the stage in view", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/wizmart");

    const map = page.locator("[data-journey-map]");
    await expect(map).toBeVisible();
    await expect(map.locator("[data-map-node]")).toHaveCount(6);
    await expect(map.locator("[data-map-node='0']")).toHaveClass(/nodeActive/);

    const stages = page.locator("[data-composition='order-journey'] > li");
    const box = (await stages.nth(3).boundingBox())!;
    await page.evaluate((y) => window.scrollTo(0, y - 360), box.y);
    await expect(map.locator("[data-map-node='3']")).toHaveClass(/nodeActive/);
    await expect(map.locator("[data-map-node='0']")).not.toHaveClass(/nodeActive/);
    await expect(stages.nth(3)).toHaveAttribute("aria-current", "step");
    await expect
      .poll(async () => stages.nth(2).evaluate((el) => getComputedStyle(el).opacity))
      .toBe("0.3");

    const top = await map.evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBe(64);
  });

  test("clicking a stage or a node scrolls that stage into the active position", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/wizmart");
    const stages = page.locator("[data-composition='order-journey'] > li");
    const map = page.locator("[data-journey-map]");

    await stages.nth(4).click();
    await expect(stages.nth(4)).toHaveAttribute("aria-current", "step");
    await expect(map.locator("[data-map-node='4']")).toHaveClass(/nodeActive/);
    const top = await stages.nth(4).evaluate((el) => el.getBoundingClientRect().top);
    expect(Math.abs(top - 360)).toBeLessThan(4);

    await map.locator("[data-map-node='1']").dispatchEvent("click");
    await expect(stages.nth(1)).toHaveAttribute("aria-current", "step");
    await expect(map.locator("[data-map-node='1']")).toHaveClass(/nodeActive/);
  });

  test("hovering a stage dims the others", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/wizmart");
    const stages = page.locator("[data-composition='order-journey'] > li");
    await stages.nth(3).hover();
    await expect
      .poll(async () => stages.nth(0).evaluate((el) => getComputedStyle(el).opacity))
      .toBe("0.3");
    await expect
      .poll(async () => stages.nth(3).evaluate((el) => getComputedStyle(el).opacity))
      .toBe("1");
  });

  test("stage names are translated in ru and zh", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/wizmart");

    await page.getByRole("button", { name: "RU" }).click();
    await expect(page.getByRole("heading", { level: 2, name: "Пробит чек" })).toBeVisible();

    await page.getByRole("button", { name: "ZH" }).click();
    await expect(page.getByRole("heading", { level: 2, name: "开票" })).toBeVisible();
  });

  test("phone layout keeps one column without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/wizmart");
    await expect(page.locator("[data-composition='order-journey'] > li")).toHaveCount(6);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
    await expect(page.locator("[data-journey-map]")).toBeHidden();
  });
});
