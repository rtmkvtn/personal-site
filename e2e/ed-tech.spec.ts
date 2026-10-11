import { test, expect } from "@playwright/test";

const STAGES = ["Written", "Submitted", "Published", "Unlocked", "Completed", "Rated"];

test.describe("Ed-Tech Platform composition", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("six stages in order, Published as the event, both paragraphs", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/ed-tech-platform");

    await expect(page.getByRole("heading", { level: 1, name: "ED-TECH PLATFORM" })).toBeVisible();
    await expect(page.locator("[data-lesson-figure]")).toBeVisible();

    const stages = page.locator("[data-composition='hand-off'] > li");
    await expect(stages).toHaveCount(6);
    for (const [i, name] of STAGES.entries()) {
      await expect(stages.nth(i).getByRole("heading", { level: 2 })).toHaveText(name);
    }

    const sizes = await stages.locator("h2").evaluateAll((els) =>
      els.map((el) => parseFloat(getComputedStyle(el).fontSize)),
    );
    expect(sizes[2]).toBeGreaterThan(sizes[1]);
    expect(sizes[2]).toBeGreaterThan(sizes[3]);
    expect(sizes[0]).toBe(sizes[5]);

    await expect(page.getByText(/Three roles in one app\./)).toBeVisible();
    await expect(page.getByText(/I was the only developer/)).toBeVisible();
  });

  test("the guide steps right at each change of role", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/ed-tech-platform");
    const verbs = page.locator("[data-composition='hand-off'] > li h2");
    const lefts = await verbs.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().left));
    expect(lefts[0]).toBe(lefts[1]);
    expect(lefts[2]).toBeGreaterThan(lefts[1]);
    expect(lefts[3]).toBeGreaterThan(lefts[2]);
    expect(lefts[3]).toBe(lefts[5]);

    const actors = page.locator("[data-composition='hand-off'] > li [class*='actor']");
    await expect(actors).toHaveText(["Author", "Admin", "Student"]);
  });

  test("the lit role follows the scroll and the hover, whole run at a time", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/ed-tech-platform");
    const stages = page.locator("[data-composition='hand-off'] > li");
    const verbOpacity = (i: number) =>
      stages.nth(i).locator("h2").evaluate((el) => getComputedStyle(el).opacity);

    await expect.poll(() => verbOpacity(0)).toBe("1");
    await expect.poll(() => verbOpacity(1)).toBe("1");
    await expect.poll(() => verbOpacity(2)).toBe("0.3");

    const box = (await stages.nth(4).boundingBox())!;
    await page.evaluate((y) => window.scrollTo(0, y - 360), box.y);
    await expect.poll(() => verbOpacity(3)).toBe("1");
    await expect.poll(() => verbOpacity(5)).toBe("1");
    await expect.poll(() => verbOpacity(0)).toBe("0.3");
    await expect(page.locator("[data-composition='hand-off']")).toHaveAttribute("data-lit", "student");

    await stages.nth(2).hover();
    await expect.poll(() => verbOpacity(2)).toBe("1");
    await expect.poll(() => verbOpacity(3)).toBe("0.3");
    const crossing = stages.nth(2).locator("[class*='cross']");
    await expect
      .poll(async () => crossing.evaluate((el) => getComputedStyle(el).opacity))
      .toBe("1");
  });

  test("stage names and roles are translated in ru and zh", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/ed-tech-platform");

    await page.getByRole("button", { name: "RU" }).click();
    await expect(page.getByRole("heading", { level: 2, name: "Опубликован" })).toBeVisible();
    await expect(page.getByText("Студент", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "ZH" }).click();
    await expect(page.getByRole("heading", { level: 2, name: "发布" })).toBeVisible();
  });

  test("phone layout keeps one column without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/ed-tech-platform");
    await expect(page.locator("[data-composition='hand-off'] > li")).toHaveCount(6);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
    await expect(page.locator("[data-lesson-figure]")).toBeHidden();
  });
});
