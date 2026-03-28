import { describe, it, expect } from "vitest";
import { resolveProjectLocale } from "../i18n/locale-resolver";
import type { Project } from "@/shared/config/projects";

const makeProject = (overrides: Partial<Project> = {}): Project => ({
  name: { en: "English Name", ru: "Русское Имя", zh: "中文名称" },
  type: "Frontend",
  stack: ["React"],
  highlight: { en: "English highlight", ru: "Русский хайлайт", zh: "中文亮点" },
  achievements: {
    en: ["Achievement 1"],
    ru: ["Достижение 1"],
    zh: ["成就 1"],
  },
  description: { en: "English desc", ru: "Русское описание", zh: "中文描述" },
  startDate: "2024-01",
  endDate: "2024-06",
  slug: "test-project",
  avatar: null,
  gallery: [],
  video: null,
  displayDate: "Jan 2024 — Jun 2024",
  ...overrides,
} as Project);

describe("resolveProjectLocale", () => {
  it("resolves all fields for the requested locale", () => {
    const project = makeProject();
    const resolved = resolveProjectLocale(project, "ru");

    expect(resolved.name).toBe("Русское Имя");
    expect(resolved.highlight).toBe("Русский хайлайт");
    expect(resolved.description).toBe("Русское описание");
    expect(resolved.achievements).toEqual(["Достижение 1"]);
  });

  it("returns en values when requested locale is en", () => {
    const project = makeProject();
    const resolved = resolveProjectLocale(project, "en");

    expect(resolved.name).toBe("English Name");
    expect(resolved.highlight).toBe("English highlight");
  });

  it("falls back to en when requested locale is missing", () => {
    const project = makeProject({
      name: { en: "Only English" } as Project["name"],
      highlight: { en: "Only English highlight" } as Project["highlight"],
      description: { en: "Only English desc" } as Project["description"],
      achievements: { en: ["Only English achievement"] } as Project["achievements"],
    });
    const resolved = resolveProjectLocale(project, "ru");

    expect(resolved.name).toBe("Only English");
    expect(resolved.highlight).toBe("Only English highlight");
    expect(resolved.description).toBe("Only English desc");
    expect(resolved.achievements).toEqual(["Only English achievement"]);
  });

  it("handles mixed translations (some fields translated, some not)", () => {
    const project = makeProject({
      name: { en: "English", ru: "Русский" } as Project["name"],
      highlight: { en: "Only English highlight" } as Project["highlight"],
    });
    const resolved = resolveProjectLocale(project, "ru");

    expect(resolved.name).toBe("Русский");
    expect(resolved.highlight).toBe("Only English highlight");
  });

  it("preserves non-translatable fields as-is", () => {
    const project = makeProject();
    const resolved = resolveProjectLocale(project, "zh");

    expect(resolved.type).toBe("Frontend");
    expect(resolved.stack).toEqual(["React"]);
    expect(resolved.slug).toBe("test-project");
    expect(resolved.displayDate).toBe("Jan 2024 — Jun 2024");
    expect(resolved.avatar).toBeNull();
    expect(resolved.gallery).toEqual([]);
  });
});
