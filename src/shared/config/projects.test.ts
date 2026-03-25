import { describe, expect, it } from "vitest";
import { PROJECT_IMAGES, getProjectImage } from "./projects";

describe("Project config", () => {
  it("PROJECT_IMAGES contains image paths", () => {
    expect(PROJECT_IMAGES.length).toBeGreaterThan(0);
    for (const img of PROJECT_IMAGES) {
      expect(img).toMatch(/^\/images\/projects\/.+\.png$/);
    }
  });

  it("getProjectImage returns an image for any index", () => {
    expect(getProjectImage(0)).toBe(PROJECT_IMAGES[0]);
    expect(getProjectImage(9)).toBe(PROJECT_IMAGES[0]);
    expect(getProjectImage(3)).toBe(PROJECT_IMAGES[3]);
  });

  it("getProjectImage wraps around for large indices", () => {
    const img = getProjectImage(100);
    expect(PROJECT_IMAGES).toContain(img);
  });
});
