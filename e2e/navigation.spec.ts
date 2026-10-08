import { test, expect } from "@playwright/test";

// The nav labels are the locale's, not the route's: `/skills` is labelled HARD SKILLS.
const LINKS = [
  { label: "WORK", url: "/work" },
  { label: "HARD SKILLS", url: "/skills" },
  { label: "ABOUT", url: "/about" },
  { label: "CONTACT", url: "/contact" },
];

test.describe("Navigation", () => {
  test("renders the wordmark and every nav link", async ({ page }) => {
    await page.goto("/");

    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: "rtmkvtn" })).toBeVisible();
    for (const { label } of LINKS) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("each nav link reaches its surface", async ({ page }) => {
    await page.goto("/");

    for (const { label, url } of LINKS) {
      await page.getByRole("navigation").getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(url);
    }
  });

  test("the wordmark returns home from a surface", async ({ page }) => {
    await page.goto("/about");

    await page.getByRole("navigation").getByRole("link", { name: "rtmkvtn" }).click();
    await expect(page).toHaveURL("/");
  });

  test("labels are translated in ru and zh", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation");

    await page.getByRole("button", { name: "RU" }).click();
    await expect(nav.getByRole("link", { name: "ПРОЕКТЫ" })).toBeVisible();

    await page.getByRole("button", { name: "ZH" }).click();
    await expect(nav.getByRole("link", { name: "项目" })).toBeVisible();
  });
});
