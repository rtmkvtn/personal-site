import { test, expect } from "@playwright/test";

test.describe("How it was built block", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("Currency Exchange shows the four steps, anchor and note", async ({ page }) => {
    await page.goto("/work/currency-exchange");

    const block = page.getByRole("region", { name: "How it was built" });
    await expect(block).toBeVisible();
    await expect(block.getByText("How it was built", { exact: true })).toBeVisible();

    const steps = block.getByRole("listitem");
    await expect(steps).toHaveCount(4);
    const expected = [
      ["Me", "Specify", "Architecture, specs, tickets, service contracts"],
      ["Agents", "Implement", "Claude Code & Codex, custom skills and agents"],
      ["Agents", "Verify", "Tests, CI, documentation"],
      ["Me", "Review", "Every agent-written PR against one checklist"],
    ];
    for (const [i, [owner, name, detail]] of expected.entries()) {
      const step = steps.nth(i);
      await expect(step.getByText(owner, { exact: true })).toBeVisible();
      await expect(step.getByText(name, { exact: true })).toBeVisible();
      await expect(step.getByText(detail)).toBeVisible();
    }

    await expect(block.getByText("2 mo", { exact: true })).toBeVisible();
    await expect(
      block.getByText("Bookkeeping module, first shareholder conversation to production MVP"),
    ).toBeVisible();
    await expect(block.getByText(/Started solo\. When two developers joined/)).toBeVisible();
  });

  test("a pre-2025 project shows no block", async ({ page }) => {
    await page.goto("/work/ziphycare");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("region", { name: "How it was built" })).toHaveCount(0);
    await expect(page.getByText("How it was built")).toHaveCount(0);
  });
});
