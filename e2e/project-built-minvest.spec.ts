import { test, expect } from "@playwright/test";

test.describe("How it was built block on M-INVEST", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("shows the four steps, the 15 min anchor and the note", async ({ page }) => {
    await page.goto("/work/m-invest");

    const block = page.getByRole("region", { name: "How it was built" });
    await expect(block).toBeVisible();

    const steps = block.getByRole("listitem");
    await expect(steps).toHaveCount(4);
    for (const [i, name] of ["Specify", "Implement", "Verify", "Review"].entries()) {
      await expect(steps.nth(i).getByText(name, { exact: true })).toBeVisible();
    }
    await expect(steps.nth(0)).toContainText("team of three");
    await expect(steps.nth(1)).toContainText("Claude Code and Codex as each became available");
    await expect(steps.nth(2)).toContainText("GitLab CI for three environments");
    await expect(steps.nth(3)).toContainText("Mandatory code review on every PR");

    await expect(block.getByText("15 min", { exact: true })).toBeVisible();
    await expect(block.getByText(/Feature release time, down from several hours/)).toBeVisible();
    await expect(block.getByText(/The tooling matured during the project/)).toBeVisible();
  });

  test("achievements are unchanged", async ({ page }) => {
    await page.goto("/work/m-invest");
    const achievements = page.getByRole("main").getByRole("list").first().getByRole("listitem");
    await expect(achievements).toHaveCount(4);
  });
});
