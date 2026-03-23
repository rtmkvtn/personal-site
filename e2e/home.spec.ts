import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("displays hero title, label, tagline, and CTA", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Fullstack Engineer")).toBeVisible();
    await expect(page.getByRole("heading", { name: /STUDIO\s+MONOLITH/ })).toBeVisible();
    await expect(page.getByText("Engineering Scalable Digital Infrastructure")).toBeVisible();
    await expect(page.getByRole("link", { name: /View Work/ })).toBeVisible();
  });
});
