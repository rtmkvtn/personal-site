import { test, expect, type Page } from "@playwright/test";

async function hoverProject(page: Page, index: number) {
  // Elements scroll continuously via translateY, so pick a copy that's on-screen
  const rows = await page.locator(`[data-project-index='${index}']`).all();
  for (const row of rows) {
    const box = await row.boundingBox();
    if (box && box.y >= 0 && box.y + box.height <= 900) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      return;
    }
  }
  throw new Error(`No visible copy of project ${index} found`);
}

test.describe("Work Page", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/work");
    // Wait for scroll to start
    await page.waitForTimeout(500);
  });

  test("renders all project names", async ({ page }) => {
    const projectNames = [
      "KINETIC.OS",
      "NEURAL.LX",
      "QUANTUM.FLOW",
      "VOID.ARCH",
      "PRISM.DEPLOY",
      "MONO.STACK",
      "FLUX.SYSTEM",
      "VECTOR.GRID",
      "AETHER.DB",
    ];

    for (const name of projectNames) {
      await expect(page.getByText(name).first()).toBeAttached();
    }
  });

  test("duplicate list has aria-hidden for accessibility", async ({ page }) => {
    const hiddenLists = page.locator("[aria-hidden='true']");
    await expect(hiddenLists.first()).toBeAttached();
  });

  test("hovering a project shows detail panel with correct data", async ({
    page,
  }) => {
    await hoverProject(page, 2);

    await expect(page.getByText("FULLSTACK").first()).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByText("GO, KUBERNETES, REDIS, GRPC").first(),
    ).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByText("REAL-TIME DATA PIPELINE @ 1M REQ/S").first(),
    ).toBeVisible({ timeout: 5000 });
  });

  test("hovering a different project updates the panel", async ({ page }) => {
    await hoverProject(page, 1);
    await expect(page.getByText("NEXT.JS, RUST").first()).toBeVisible({ timeout: 5000 });

    // Switch to VOID.ARCH
    await hoverProject(page, 4);
    await expect(
      page.getByText("TYPESCRIPT, REACT, THREE.JS").first(),
    ).toBeVisible({ timeout: 5000 });
  });

  test("DETAILS button links to correct /work/[slug] URL", async ({
    page,
  }) => {
    await hoverProject(page, 1);

    const detailsLink = page.getByRole("link", { name: "DETAILS" });
    await expect(detailsLink).toBeVisible({ timeout: 5000 });
    await expect(detailsLink).toHaveAttribute("href", "/work/kinetic-os");
  });
});

test.describe("/work/[slug] route", () => {
  test("renders project name for valid slug", async ({ page }) => {
    await page.goto("/work/kinetic-os");
    await expect(page.getByText("KINETIC.OS")).toBeVisible();
  });

  test("returns 404 for invalid slug", async ({ page }) => {
    const response = await page.goto("/work/nonexistent-project");
    expect(response?.status()).toBe(404);
  });
});
