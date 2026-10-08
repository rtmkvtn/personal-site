import { test, expect } from "@playwright/test";

const EN = {
  bio1:
    "A fullstack engineer building financial back-office systems, working AI-first since 2025. I specify and review; agents implement, test, and refactor. Every line is reviewed, and nothing ships that I can't explain.",
  bio2:
    "The method changed what one person can carry. In 2025 I built the foundation of a currency exchange back office alone, taking its bookkeeping module from the first shareholder conversation to production in about two months. When two developers joined, I moved the team onto one shared workflow: repo-level agent rules, shared skills and agents, spec-driven tickets, a single review checklist for agent-written code.",
  approachBody:
    "Systems thinking over feature stacking. Architecture, service contracts, and specs are mine; implementation is delegated and verified. The result is a codebase any member of the team can maintain, because the documentation and the tickets are written the same way every time.",
};

test.describe("About", () => {
  test("shows the AI-first copy and drops the design sentence", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByText("Background", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: "ABOUT" })).toBeVisible();
    await expect(page.getByText(EN.bio1, { exact: true })).toBeVisible();
    await expect(page.getByText(EN.bio2, { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Approach" })).toBeVisible();
    await expect(page.getByText(EN.approachBody, { exact: true })).toBeVisible();

    await expect(page.getByText(/indistinguishable from great design/)).toHaveCount(0);
    await expect(page.getByText(/scalable digital infrastructure/)).toHaveCount(0);
  });

  test("first paragraph is translated in ru and zh", async ({ page }) => {
    await page.goto("/about");

    await page.getByRole("button", { name: "RU" }).click();
    await expect(page.getByText("работает AI-first с 2025 года")).toBeVisible();

    await page.getByRole("button", { name: "ZH" }).click();
    await expect(page.getByText("自 2025 年起以 AI-first 方式工作")).toBeVisible();
  });
});
