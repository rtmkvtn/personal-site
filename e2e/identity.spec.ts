import { test, expect } from "@playwright/test";

test.describe("Identity", () => {
  test("home shows the AI-first role line and the tab title follows it", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("AI-First Fullstack Engineer", { exact: true })).toBeVisible();
    await expect(page).toHaveTitle("rtmkvtn | AI-First Fullstack Engineer");
  });

  test("role line is translated in ru and zh with AI-First kept in Latin script", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "RU" }).click();
    await expect(page.getByText("AI-First Fullstack-инженер", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "ZH" }).click();
    await expect(page.getByText("AI-First 全栈工程师", { exact: true })).toBeVisible();
  });
});
