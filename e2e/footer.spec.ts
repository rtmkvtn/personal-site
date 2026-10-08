import { test, expect } from "@playwright/test";

test.describe("Footer", () => {
  test("shows the copyright and the one social link there is", async ({ page }) => {
    await page.goto("/");

    const year = new Date().getFullYear().toString();
    await expect(page.getByText(new RegExp(`${year} rtmkvtn`))).toBeVisible();

    await expect(page.getByRole("link", { name: "LINKEDIN" })).toBeVisible();
    for (const gone of ["INSTAGRAM", "TWITTER", "GITHUB"]) {
      await expect(page.getByRole("link", { name: gone })).toHaveCount(0);
    }
  });

  test("the link label is translated in ru and zh", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "RU" }).click();
    await expect(page.getByRole("link", { name: "LINKEDIN" })).toBeVisible();

    await page.getByRole("button", { name: "ZH" }).click();
    await expect(page.getByRole("link", { name: "LINKEDIN" })).toBeVisible();
  });
});
