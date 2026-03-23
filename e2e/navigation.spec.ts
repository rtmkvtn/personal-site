import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("renders brand logo and all nav links", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "STUDIO MONOLITH" })).toBeVisible();
    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: "WORK" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "SKILLS" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "ABOUT" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "CONTACT" })).toBeVisible();
  });

  test("nav links navigate to correct pages", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("navigation").getByRole("link", { name: "WORK" }).click();
    await expect(page).toHaveURL("/work");

    await page.getByRole("navigation").getByRole("link", { name: "SKILLS" }).click();
    await expect(page).toHaveURL("/skills");

    await page.getByRole("navigation").getByRole("link", { name: "ABOUT" }).click();
    await expect(page).toHaveURL("/about");

    await page.getByRole("navigation").getByRole("link", { name: "CONTACT" }).click();
    await expect(page).toHaveURL("/contact");
  });
});
