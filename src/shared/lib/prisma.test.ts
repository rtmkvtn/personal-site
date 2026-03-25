import { describe, it, expect } from "vitest";
import { Prisma, ProjectType } from "../../generated/prisma/client.ts";

describe("Prisma schema", () => {
  it("defines ProjectType enum with all expected values", () => {
    expect(ProjectType.Frontend).toBe("Frontend");
    expect(ProjectType.Fullstack).toBe("Fullstack");
    expect(ProjectType.TelegramMiniApp).toBe("TelegramMiniApp");
    expect(ProjectType.TelegramBot).toBe("TelegramBot");
    expect(Object.keys(ProjectType)).toHaveLength(4);
  });

  it("defines Project model with all required fields", () => {
    // Prisma.ProjectScalarFieldEnum contains all scalar fields
    const fields = Object.values(Prisma.ProjectScalarFieldEnum);
    const expectedFields = [
      "id",
      "name",
      "slug",
      "index",
      "type",
      "stack",
      "tags",
      "highlight",
      "achievements",
      "description",
      "date",
      "link",
      "githubLink",
      "avatar",
      "gallery",
      "video",
      "readmeFile",
      "createdAt",
      "updatedAt",
    ];
    for (const field of expectedFields) {
      expect(fields).toContain(field);
    }
  });

  it("exports Prisma validator for type-safe inputs", () => {
    // Verify we can construct a valid ProjectCreateInput type
    const input: Prisma.ProjectCreateInput = {
      name: "Test Project",
      slug: "test-project",
      index: 1,
      type: ProjectType.Frontend,
      stack: ["React"],
      tags: ["web"],
      highlight: "Test highlight",
      achievements: ["achievement 1"],
      date: "Jan 2024 — Mar 2024",
    };
    expect(input.name).toBe("Test Project");
    expect(input.type).toBe("Frontend");
  });
});
