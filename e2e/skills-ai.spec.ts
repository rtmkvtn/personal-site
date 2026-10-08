import { test, expect } from "@playwright/test";

test.describe("Hard Skills chart, AI tooling", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("AI tooling bubbles render as rings, untruncated, and link to both 2025 projects", async ({ page }) => {
    await page.goto("/skills");

    const bubbles = page.locator("svg g[data-skill]");
    await expect(bubbles).toHaveCount(29);

    const ai = page.locator("svg g[data-ai-tooling='true']");
    await expect(ai).toHaveCount(3);
    for (const name of ["Claude Code", "Codex", "AI Agents"]) {
      await expect(page.locator(`svg g[data-skill='${name}']`)).toHaveAttribute("data-ai-tooling", "true");
    }
    await expect(page.locator("svg g[data-skill='React']")).not.toHaveAttribute("data-ai-tooling", "true");

    const claude = page.locator("svg g[data-skill='Claude Code']");
    await expect(claude.locator("text")).toHaveText("Claude Code");

    const ringFill = await claude.locator("circle").evaluate((el) => getComputedStyle(el).fill);
    const reactFill = await page.locator("svg g[data-skill='React'] circle").evaluate((el) => getComputedStyle(el).fill);
    expect(ringFill).not.toBe(reactFill);

    // Bubbles keep drifting while the force simulation settles; move the pointer in steps,
    // as a hand would, and retry until the panel shows.
    await expect(async () => {
      const box = (await claude.boundingBox())!;
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      await page.mouse.move(cx - 150, cy - 150);
      await page.mouse.move(cx, cy, { steps: 8 });
      await expect(page.getByRole("link", { name: "CURRENCY EXCHANGE" })).toBeVisible({ timeout: 1500 });
      await expect(page.getByRole("link", { name: "M-INVEST" })).toBeVisible({ timeout: 1500 });
    }).toPass({ timeout: 15000 });
  });
});
