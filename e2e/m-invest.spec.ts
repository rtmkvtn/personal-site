import { test, expect } from "@playwright/test";

const EVENTS = ["Start", "MVP", "Two join", "Agents", "Pipelines", "Hand-off"];

test.describe("M-INVEST composition", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("six events on a six-month axis, Two join as the loud event, no How It Was Built block", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/m-invest");

    await expect(page.getByRole("heading", { level: 1, name: "M-INVEST" })).toBeVisible();
    await expect(page.locator("[data-pipeline-figure]")).toBeVisible();
    await expect(page.getByRole("region", { name: "How it was built" })).toHaveCount(0);

    const events = page.locator("[data-composition='six-months'] > li");
    await expect(events).toHaveCount(6);
    for (const [i, name] of EVENTS.entries()) {
      await expect(events.nth(i).getByRole("heading", { level: 2 })).toHaveText(name);
    }
    await expect(page.locator("[data-tick]")).toHaveCount(6);
    await expect(page.locator("[data-tick]").first()).toContainText("Jan");

    const sizes = await events.locator("h2").evaluateAll((els) =>
      els.map((el) => parseFloat(getComputedStyle(el).fontSize)),
    );
    expect(sizes[2]).toBeGreaterThan(sizes[1]);
    expect(sizes[2]).toBeGreaterThan(sizes[3]);

    await expect(page.getByText(/A closed peer-to-peer market/)).toBeVisible();
    await expect(page.getByText(/I was that developer/)).toBeVisible();
  });

  test("events sit at their months in order and the axis gains lines at the turn", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/m-invest");
    const track = page.locator("[data-timeline]");
    await expect(track).toHaveAttribute("data-measured", "true");

    const events = page.locator("[data-composition='six-months'] > li");
    const tops = await events.evaluateAll((els) => els.map((el) => (el as HTMLElement).offsetTop));
    for (let i = 1; i < tops.length; i++) expect(tops[i]).toBeGreaterThan(tops[i - 1]);

    const ticks = await page.locator("[data-tick]").evaluateAll((els) => els.map((el) => (el as HTMLElement).offsetTop));
    expect(Math.abs(tops[0] - ticks[0])).toBeLessThan(2);
    expect(Math.abs(tops[1] - ticks[2])).toBeLessThan(2);
    expect(Math.abs(tops[2] - ticks[3])).toBeLessThan(2);
    expect(tops[3]).toBeGreaterThan(tops[2]);

    await expect(page.locator("[data-axis-line]")).toHaveCount(5);
    const lineTops = await page.locator("[data-axis-line]").evaluateAll((els) => els.map((el) => (el as HTMLElement).offsetTop));
    expect(lineTops[0]).toBe(0);
    expect(lineTops[1]).toBeGreaterThan(ticks[2]);
    expect(lineTops[4]).toBeGreaterThan(lineTops[1]);

    const monthHeights = ticks.slice(1).map((t, i) => t - ticks[i]);
    const base = monthHeights[0];
    for (const h of monthHeights) expect(h).toBeGreaterThanOrEqual(base - 1);
  });

  test("the active event follows the scroll and the hover", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/m-invest");
    const events = page.locator("[data-composition='six-months'] > li");
    const opacity = (i: number) => events.nth(i).locator("h2").evaluate((el) => getComputedStyle(el).opacity);

    await expect.poll(() => opacity(0)).toBe("1");
    await expect.poll(() => opacity(1)).toBe("0.3");
    await expect.poll(() => opacity(2)).toBe("0.6");

    const box = (await events.nth(4).boundingBox())!;
    await page.evaluate((y) => window.scrollTo(0, y - 360), box.y);
    await expect(page.locator("[data-composition='six-months']")).toHaveAttribute("data-active", "4");
    await expect.poll(() => opacity(4)).toBe("1");

    await events.nth(1).hover();
    await expect.poll(() => opacity(1)).toBe("1");
  });

  test("events and months are translated in ru and zh", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/m-invest");

    await page.getByRole("button", { name: "RU" }).click();
    await expect(page.getByRole("heading", { level: 2, name: "Плюс двое" })).toBeVisible();
    await expect(page.locator("[data-tick]").first()).toContainText("янв");

    await page.getByRole("button", { name: "ZH" }).click();
    await expect(page.getByRole("heading", { level: 2, name: "两人加入" })).toBeVisible();
    await expect(page.locator("[data-tick]").first()).toContainText("一月");
  });

  test("phone layout keeps one column without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/m-invest");
    await expect(page.locator("[data-composition='six-months'] > li")).toHaveCount(6);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
    await expect(page.locator("[data-pipeline-figure]")).toBeHidden();
  });
});
