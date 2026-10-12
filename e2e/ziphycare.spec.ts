import { test, expect } from "@playwright/test";

test.describe("ZiphyCare composition", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("six rows, the reversed row swaps sides, the loud row carries the numeral", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/ziphycare");

    await expect(page.getByRole("heading", { level: 1, name: "ZIPHYCARE" })).toBeVisible();
    await expect(page.locator("[data-exam-room-figure]")).toBeVisible();

    const rows = page.locator("[data-composition='interpreter'] > li");
    await expect(rows).toHaveCount(6);
    await expect(rows.nth(2)).toHaveAttribute("data-direction", "out");

    const left = async (i: number, sel: string) =>
      rows.nth(i).locator(sel).evaluate((el) => el.getBoundingClientRect().left);
    expect(await left(0, "h2")).toBeGreaterThan(await left(0, "p:first-of-type"));
    expect(await left(2, "h2")).toBeLessThan(await left(2, "p:first-of-type"));

    const figure = rows.nth(3).locator("[class*='figure']");
    await expect(figure).toHaveText("4");
    const figureSize = await figure.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    const screenSize = await rows.nth(3).locator("h2").evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(figureSize).toBeGreaterThan(screenSize);

    await expect(page.getByText(/Two apps for at-home medical exams\./)).toBeVisible();
    await expect(page.getByText(/I joined as a frontend engineer/)).toBeVisible();
    await expect(page.getByRole("link", { name: /ziphycare\.com/ })).toHaveAttribute("href", "https://ziphycare.com/");
  });

  test("the active row follows the scroll and the hover", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/ziphycare");
    const rows = page.locator("[data-composition='interpreter'] > li");
    const opacity = (i: number) => rows.nth(i).locator("h2").evaluate((el) => getComputedStyle(el).opacity);

    await expect.poll(() => opacity(0)).toBe("1");
    await expect.poll(() => opacity(1)).toBe("0.3");

    const box = (await rows.nth(4).boundingBox())!;
    await page.evaluate((y) => window.scrollTo(0, y - 360), box.y);
    await expect(page.locator("[data-composition='interpreter']")).toHaveAttribute("data-active", "4");
    await expect.poll(() => opacity(4)).toBe("1");
    await expect.poll(() => opacity(0)).toBe("0.3");

    await rows.nth(2).hover();
    await expect.poll(() => opacity(2)).toBe("1");
    await expect.poll(() => opacity(4)).toBe("0.3");
  });

  test("labels and rows are translated in ru and zh", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/ziphycare");

    await page.getByRole("button", { name: "RU" }).click();
    await expect(page.getByRole("heading", { level: 2, name: "Карта пациента." })).toBeVisible();
    await expect(page.getByText("Бэкенд → Экран").first()).toBeVisible();

    await page.getByRole("button", { name: "ZH" }).click();
    await expect(page.getByRole("heading", { level: 2, name: "患者的病历。" })).toBeVisible();
    await expect(page.locator("[data-composition='interpreter'] > li").nth(3).locator("[class*='figure']")).toHaveText("四");
  });

  test("phone layout keeps one column without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/ziphycare");
    await expect(page.locator("[data-composition='interpreter'] > li")).toHaveCount(6);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
    await expect(page.locator("[data-exam-room-figure]")).toBeHidden();
  });
});
