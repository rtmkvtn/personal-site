import { test, expect } from "@playwright/test";

const OPERATORS = ["Payment details", "Funds confirmation", "The crypto leg", "The books", "New providers"];
const TEAM = ["Tickets", "Tooling", "Implementation", "Review", "QA"];

test.describe("Currency Exchange composition", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("two ledgers of five rows, the two figures, no How It Was Built block", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/currency-exchange");

    await expect(page.getByRole("heading", { level: 1, name: "CURRENCY EXCHANGE" })).toBeVisible();
    await expect(page.locator("[data-entry-figure]")).toBeVisible();
    await expect(page.getByRole("region", { name: "How it was built" })).toHaveCount(0);

    const operators = page.locator("[data-ledger='Operators'] > li");
    const team = page.locator("[data-ledger='Team'] > li");
    await expect(operators).toHaveCount(5);
    await expect(team).toHaveCount(5);
    for (const [i, name] of OPERATORS.entries()) {
      await expect(operators.nth(i).getByRole("heading", { level: 3 })).toHaveText(name);
    }
    for (const [i, name] of TEAM.entries()) {
      await expect(team.nth(i).getByRole("heading", { level: 3 })).toHaveText(name);
    }

    const figures = page.locator("[data-figures] p");
    await expect(figures).toHaveCount(2);
    await expect(figures.nth(0)).toContainText("2,000");
    await expect(figures.nth(1)).toContainText("½");
    const figureSize = await figures.nth(0).locator("span").first().evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(figureSize).toBeGreaterThan(48);

    await expect(page.locator("[data-handoff]")).toContainText("team-agents");
    await expect(page.getByText(/The back office of a fiat-to-crypto exchange\./)).toBeVisible();
    await expect(page.getByText(/I started alone in June 2025/)).toBeVisible();
  });

  test("before sits dimmer than now, and the active row follows the scroll and the hover", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/currency-exchange");
    const operators = page.locator("[data-ledger='Operators'] > li");
    const team = page.locator("[data-ledger='Team'] > li");
    const opacity = (row: ReturnType<typeof operators.nth>, sel: string) =>
      row.locator(sel).evaluate((el) => getComputedStyle(el).opacity);

    await expect.poll(() => opacity(operators.nth(0), "p:last-of-type")).toBe("1");
    await expect.poll(() => opacity(operators.nth(0), "p:first-of-type")).toBe("0.4");
    await expect.poll(() => opacity(operators.nth(1), "p:last-of-type")).toBe("0.3");

    const box = (await team.nth(1).boundingBox())!;
    await page.evaluate((y) => window.scrollTo(0, y - 360), box.y);
    await expect(page.locator("[data-composition='taken-off-hands']")).toHaveAttribute("data-active", "6");
    await expect.poll(() => opacity(team.nth(1), "p:last-of-type")).toBe("1");

    await operators.nth(3).hover();
    await expect.poll(() => opacity(operators.nth(3), "p:last-of-type")).toBe("1");
    await expect.poll(() => opacity(team.nth(1), "p:last-of-type")).toBe("0.3");
  });

  test("ledgers and labels are translated in ru and zh", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/currency-exchange");

    await page.getByRole("button", { name: "RU" }).click();
    await expect(page.getByRole("heading", { level: 3, name: "Реквизиты" })).toBeVisible();
    await expect(page.locator("[data-figures] p").nth(0)).toContainText("2 000");

    await page.getByRole("button", { name: "ZH" }).click();
    await expect(page.getByRole("heading", { level: 3, name: "收款要素" })).toBeVisible();
    await expect(page.locator("[data-figures] p").nth(0)).toContainText("二千");
    await expect(page.locator("[data-figures] p").nth(1)).toContainText("一半");
  });

  test("phone layout stacks each row without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/currency-exchange");
    await expect(page.locator("[data-ledger='Operators'] > li")).toHaveCount(5);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
    await expect(page.locator("[data-entry-figure]")).toBeHidden();
    await expect(page.locator("[data-ledger='Operators'] > li").first().getByText("Before", { exact: true })).toBeVisible();
  });
});
