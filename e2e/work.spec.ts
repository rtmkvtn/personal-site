import { test, expect, type Page } from "@playwright/test";
import { readdirSync, readFileSync } from "fs";
import path from "path";

const CONTENT = path.resolve(__dirname, "../public/content/projects");

/** The projects as the Work surface orders them: newest first, by the loader's sort date. */
const PROJECTS = readdirSync(CONTENT)
  .map((slug) => {
    const json = JSON.parse(readFileSync(path.join(CONTENT, slug, "project.json"), "utf-8"));
    return {
      slug,
      name: json.name.en as string,
      type: (json.type as string).toUpperCase(),
      stack: (json.stack as string[]).join(", ").toUpperCase(),
      highlight: (json.highlight.en as string).toUpperCase(),
      sortDate: (json.endDate ?? "9999-99") as string,
    };
  })
  .sort((a, b) => b.sortDate.localeCompare(a.sortDate));

/**
 * The rows scroll continuously, so take the copy of this project that is fully on screen, approach
 * it in steps as a hand would, and retry: the row may drift out from under the pointer mid-move.
 * Settled when the panel offers that project's own DETAILS link, never merely when a panel shows.
 */
async function hoverProject(page: Page, index: number) {
  const { slug } = PROJECTS[index];
  await expect(async () => {
    for (const row of await page.locator(`[data-project-index='${index}']`).all()) {
      const box = await row.locator("h2").boundingBox();
      if (!box || box.y < 0 || box.y + box.height > 900) continue;
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      await page.mouse.move(cx, cy - 140);
      await page.mouse.move(cx, cy, { steps: 8 });
      await expect(page.getByRole("link", { name: "DETAILS" })).toHaveAttribute(
        "href",
        `/work/${slug}`,
        { timeout: 2000 },
      );
      return;
    }
    throw new Error(`no on-screen copy of project ${index}`);
  }).toPass({ timeout: 20000 });
}

test.describe("Work Page", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/work");
    await page.waitForTimeout(500);
  });

  test("renders every real project, newest first", async ({ page }) => {
    expect(PROJECTS.map((p) => p.slug)).toEqual([
      "currency-exchange",
      "m-invest",
      "ziphycare",
      "wizmart",
      "ed-tech-platform",
      "crypto-marketplace",
    ]);

    for (const { name } of PROJECTS) {
      await expect(page.getByText(name).first()).toBeAttached();
    }
    // The index column counts down to the newest, which the scroller numbers 06 through 01.
    await expect(page.getByText("01", { exact: true }).first()).toBeAttached();
    await expect(
      page.getByText(String(PROJECTS.length).padStart(2, "0"), { exact: true }).first(),
    ).toBeAttached();
  });

  test("keeps none of the placeholder project names", async ({ page }) => {
    for (const gone of ["KINETIC.OS", "STUDIO MONOLITH", "QUANTUM.FLOW", "AETHER.DB"]) {
      await expect(page.getByText(gone)).toHaveCount(0);
    }
  });

  test("exposes each project once to assistive technology, as a link to its page", async ({ page }) => {
    const links = page.getByRole("list", { name: "WORK" }).getByRole("link");
    await expect(links).toHaveText(PROJECTS.map((p) => p.name));
    for (const [i, { slug }] of PROJECTS.entries()) {
      await expect(links.nth(i)).toHaveAttribute("href", `/work/${slug}`);
    }

    // The scroller repeats the projects to fake an endless list; none of its copies is announced.
    const rows = page.locator("[data-project-index]");
    expect(await rows.count()).toBeGreaterThan(PROJECTS.length);
    await expect(page.getByRole("heading", { level: 2 })).toHaveCount(0);
  });

  test("focusing a project link shows that project in the panel", async ({ page }) => {
    await page.getByRole("list", { name: "WORK" }).getByRole("link").nth(1).focus();

    await expect(page.getByText(PROJECTS[1].stack, { exact: true })).toBeVisible();
  });

  test("hovering a project shows its type, stack and highlight", async ({ page }) => {
    const minvest = PROJECTS[1];
    expect(minvest.slug).toBe("m-invest");

    await hoverProject(page, 1);

    await expect(page.getByText("TYPE", { exact: true })).toBeVisible();
    await expect(page.getByText(minvest.type, { exact: true }).first()).toBeVisible();
    await expect(page.getByText(minvest.stack, { exact: true })).toBeVisible();
    await expect(page.getByText(minvest.highlight, { exact: true })).toBeVisible();
  });

  test("hovering a different project replaces the panel's contents", async ({ page }) => {
    await hoverProject(page, 1);
    await expect(page.getByText(PROJECTS[1].stack, { exact: true })).toBeVisible();

    await hoverProject(page, 3);
    await expect(page.getByText(PROJECTS[3].stack, { exact: true })).toBeVisible();
    await expect(page.getByText(PROJECTS[1].stack, { exact: true })).toHaveCount(0);
  });

  test("DETAILS links to the project's own page", async ({ page }) => {
    await hoverProject(page, 0);

    const details = page.getByRole("link", { name: "DETAILS" });
    await expect(details).toHaveAttribute("href", "/work/currency-exchange");
    await details.click();
    await expect(page).toHaveURL("/work/currency-exchange");
  });
});

test.describe("server-rendered HTML", () => {
  test("carries the page content before any script runs", async ({ request }) => {
    const html = await (await request.get("/work/m-invest")).text();

    expect(html).toContain("<h1");
    expect(html).toContain("M-INVEST");
  });

  test("follows the locale cookie, then Accept-Language", async ({ request }) => {
    const byCookie = await request.get("/", {
      headers: { cookie: "locale=ru", "accept-language": "zh-CN" },
    });
    expect(await byCookie.text()).toContain('<html lang="ru"');

    const byHeader = await request.get("/", {
      headers: { "accept-language": "fr-FR, zh-CN;q=0.9, en;q=0.8" },
    });
    expect(await byHeader.text()).toContain('<html lang="zh"');
  });
});

test.describe("/work/[slug] route", () => {
  for (const { slug, name } of PROJECTS) {
    test(`renders ${slug} by its name`, async ({ page }) => {
      await page.goto(`/work/${slug}`);
      await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
    });
  }

  test("answers 404 with the not-found page for a slug no project has", async ({ page }) => {
    const response = await page.goto("/work/nonexistent-project");

    expect(response?.status()).toBe(404);
    await expect(page.getByText("This page could not be found.")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: /CURRENCY|INVEST|ZIPHY/ })).toHaveCount(0);
  });
});
