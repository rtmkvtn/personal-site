import { test, expect } from "@playwright/test";

// The role line and the tab title are identity.spec.ts's; this covers the rest of the hero.
test.describe("Home Page", () => {
  test("introduces the name and offers the work link", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Hi!", { exact: true })).toBeVisible();
    await expect(page.getByText("My name is")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: "ARTEM" })).toBeVisible();

    const cta = page.getByRole("link", { name: /View Work/ });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/work");
  });

  test("the call to action reaches the work surface", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /View Work/ }).click();
    await expect(page).toHaveURL("/work");
  });

  test("keeps none of the placeholder studio copy", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText(/STUDIO\s+MONOLITH/)).toHaveCount(0);
    await expect(page.getByText(/Engineering Scalable Digital Infrastructure/)).toHaveCount(0);
  });
});
