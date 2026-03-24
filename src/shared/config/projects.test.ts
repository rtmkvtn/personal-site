import { describe, expect, it } from "vitest";
import { PROJECTS, type Project } from "./projects";

describe("PROJECTS data layer", () => {
  it("is a non-empty array", () => {
    expect(PROJECTS.length).toBeGreaterThan(0);
  });

  it("every project has all required fields populated", () => {
    for (const p of PROJECTS) {
      expect(p.name).toBeTruthy();
      expect(p.slug).toBeTruthy();
      expect(p.index).toBeGreaterThan(0);
      expect(p.type).toBeTruthy();
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.highlight).toBeTruthy();
    }
  });

  it("every project has a unique slug", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every project has a unique index", () => {
    const indices = PROJECTS.map((p) => p.index);
    expect(new Set(indices).size).toBe(indices.length);
  });

  it("slugs are URL-safe (lowercase, hyphenated)", () => {
    for (const p of PROJECTS) {
      expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("type field is constrained to Frontend or Fullstack", () => {
    for (const p of PROJECTS) {
      expect(["Frontend", "Fullstack"]).toContain(p.type);
    }
  });
});
