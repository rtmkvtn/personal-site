import { describe, it, expect, beforeAll } from "vitest";
import path from "path";
import fs from "fs/promises";
import { getProjects, getProjectBySlug } from "../content-loader";

const FIXTURES_DIR = path.resolve(__dirname, "fixtures/projects");

async function writeFixture(slug: string, json: object, files?: Record<string, string[]>) {
  const dir = path.join(FIXTURES_DIR, slug);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "project.json"), JSON.stringify(json));

  if (files?.images) {
    for (const img of files.images) {
      // 1x1 pixel PNG
      await fs.writeFile(path.join(dir, img), Buffer.from("89504e470d0a1a0a0000000d49484452", "hex"));
    }
  }
  if (files?.gallery) {
    const galleryDir = path.join(dir, "gallery");
    await fs.mkdir(galleryDir, { recursive: true });
    for (const img of files.gallery) {
      await fs.writeFile(path.join(galleryDir, img), Buffer.from("89504e470d0a1a0a0000000d49484452", "hex"));
    }
  }
  if (files?.videos) {
    for (const vid of files.videos) {
      await fs.writeFile(path.join(dir, vid), Buffer.from("000000"));
    }
  }
}

const BASE_PROJECT = {
  name: { en: "Test Project" },
  type: "Frontend",
  stack: ["React"],
  highlight: { en: "A test" },
  achievements: { en: ["Did something"] },
  description: { en: "Test description" },
};

beforeAll(async () => {
  await fs.rm(FIXTURES_DIR, { recursive: true, force: true });

  // Project with both dates, some media
  await writeFixture("project-alpha", {
    ...BASE_PROJECT,
    name: { en: "Alpha" },
    startDate: "2023-06",
    endDate: "2024-01",
  }, {
    images: ["avatar.png"],
    gallery: ["01.png", "02.png"],
    videos: ["demo.mp4"],
  });

  // Project with later end date
  await writeFixture("project-beta", {
    ...BASE_PROJECT,
    name: { en: "Beta" },
    startDate: "2024-03",
    endDate: "2024-09",
  }, {
    images: ["cover.png", "banner.jpg"],
  });

  // Project with only one date (treated as endDate)
  await writeFixture("project-gamma", {
    ...BASE_PROJECT,
    name: { en: "Gamma" },
    endDate: "2024-05",
  });

  // Project with only startDate
  await writeFixture("project-delta", {
    ...BASE_PROJECT,
    name: { en: "Delta" },
    startDate: "2023-01",
  });

  // Project with no media
  await writeFixture("project-epsilon", {
    ...BASE_PROJECT,
    name: { en: "Epsilon" },
    endDate: "2022-12",
  });
});

describe("getProjects", () => {
  it("returns all projects sorted by endDate descending", async () => {
    const projects = await getProjects(FIXTURES_DIR);
    const names = projects.map((p) => p.name.en);
    // Beta (2024-09) > Gamma (2024-05) > Alpha (2024-01) > Delta (2023-01) > Epsilon (2022-12)
    expect(names).toEqual(["Beta", "Gamma", "Alpha", "Delta", "Epsilon"]);
  });

  it("derives slug from folder name", async () => {
    const projects = await getProjects(FIXTURES_DIR);
    expect(projects[0].slug).toBe("project-beta");
  });
});

describe("getProjectBySlug", () => {
  it("returns a project by slug", async () => {
    const project = await getProjectBySlug("project-alpha", FIXTURES_DIR);
    expect(project).not.toBeNull();
    expect(project!.name.en).toBe("Alpha");
  });

  it("returns null for unknown slug", async () => {
    const project = await getProjectBySlug("nonexistent", FIXTURES_DIR);
    expect(project).toBeNull();
  });
});

describe("media discovery", () => {
  it("picks first image alphabetically as avatar", async () => {
    const project = await getProjectBySlug("project-beta", FIXTURES_DIR);
    // banner.jpg comes before cover.png alphabetically
    expect(project!.avatar).toMatch(/banner\.jpg$/);
  });

  it("discovers gallery images sorted by filename", async () => {
    const project = await getProjectBySlug("project-alpha", FIXTURES_DIR);
    expect(project!.gallery).toHaveLength(2);
    expect(project!.gallery[0]).toMatch(/01\.png$/);
    expect(project!.gallery[1]).toMatch(/02\.png$/);
  });

  it("discovers video files", async () => {
    const project = await getProjectBySlug("project-alpha", FIXTURES_DIR);
    expect(project!.video).toMatch(/demo\.mp4$/);
  });

  it("returns null avatar and empty gallery when no media exists", async () => {
    const project = await getProjectBySlug("project-epsilon", FIXTURES_DIR);
    expect(project!.avatar).toBeNull();
    expect(project!.gallery).toEqual([]);
    expect(project!.video).toBeNull();
  });
});

describe("date display", () => {
  it("formats two dates as range", async () => {
    const project = await getProjectBySlug("project-alpha", FIXTURES_DIR);
    expect(project!.displayDate).toBe("Jun 2023 — Jan 2024");
  });

  it("formats single endDate", async () => {
    const project = await getProjectBySlug("project-gamma", FIXTURES_DIR);
    expect(project!.displayDate).toBe("May 2024");
  });

  it("formats single startDate", async () => {
    const project = await getProjectBySlug("project-delta", FIXTURES_DIR);
    expect(project!.displayDate).toBe("Jan 2023");
  });
});
