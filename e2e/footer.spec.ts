import { test, expect } from "@playwright/test";

test.describe("Footer", () => {
  test("renders copyright text and social links", async ({ page }) => {
    await page.goto("/");

    const year = new Date().getFullYear().toString();
    await expect(page.getByText(new RegExp(`${year} STUDIO MONOLITH`))).toBeVisible();

    await expect(page.getByRole("link", { name: "INSTAGRAM" })).toBeVisible();
    await expect(page.getByRole("link", { name: "LINKEDIN" })).toBeVisible();
    await expect(page.getByRole("link", { name: "TWITTER" })).toBeVisible();
  });
});
