import { describe, it, expect } from "vitest";
import type { Project } from "@/shared/config";
import { aggregateSkills } from "./skillsAggregator";

const NOW = new Date(2026, 0, 15);

function project(partial: Partial<Project> & { slug: string; stack: string[] }): Project {
  return {
    name: { en: partial.slug },
    type: "Fullstack",
    highlight: { en: "" },
    achievements: { en: [] },
    description: { en: "" },
    avatar: null,
    gallery: [],
    video: null,
    displayDate: "",
    ...partial,
  } as Project;
}

describe("aggregateSkills", () => {
  it("counts a skill once per project that uses it", () => {
    const { skills } = aggregateSkills(
      [
        project({ slug: "a", stack: ["React"], startDate: "2024-01", endDate: "2024-06" }),
        project({ slug: "b", stack: ["React", "Node"], startDate: "2024-01", endDate: "2024-06" }),
      ],
      NOW,
    );
    expect(skills.find((s) => s.skill === "React")?.count).toBe(2);
    expect(skills.find((s) => s.skill === "Node")?.count).toBe(1);
  });

  it("counts an inclusive range of months", () => {
    const { skills } = aggregateSkills(
      [project({ slug: "a", stack: ["React"], startDate: "2024-01", endDate: "2024-06" })],
      NOW,
    );
    expect(skills[0].totalMonths).toBe(6);
  });

  it("counts overlapping engagements only once", () => {
    const { skills } = aggregateSkills(
      [
        project({ slug: "a", stack: ["React"], startDate: "2024-01", endDate: "2024-06" }),
        project({ slug: "b", stack: ["React"], startDate: "2024-04", endDate: "2024-09" }),
      ],
      NOW,
    );
    expect(skills[0].totalMonths).toBe(9);
  });

  it("merges ranges that touch across a gap of one month", () => {
    const { skills } = aggregateSkills(
      [
        project({ slug: "a", stack: ["React"], startDate: "2024-01", endDate: "2024-03" }),
        project({ slug: "b", stack: ["React"], startDate: "2024-04", endDate: "2024-06" }),
      ],
      NOW,
    );
    expect(skills[0].totalMonths).toBe(6);
  });

  it("keeps separate ranges separate", () => {
    const { skills } = aggregateSkills(
      [
        project({ slug: "a", stack: ["React"], startDate: "2024-01", endDate: "2024-02" }),
        project({ slug: "b", stack: ["React"], startDate: "2024-10", endDate: "2024-11" }),
      ],
      NOW,
    );
    expect(skills[0].totalMonths).toBe(4);
  });

  it("runs an open-ended project up to now", () => {
    const { skills } = aggregateSkills(
      [project({ slug: "a", stack: ["React"], startDate: "2025-11" })],
      NOW,
    );
    expect(skills[0].totalMonths).toBe(3);
  });

  it("skips a project with no start date", () => {
    const { skills } = aggregateSkills([project({ slug: "a", stack: ["React"] })], NOW);
    expect(skills).toEqual([]);
  });

  it("sorts by weight, so the longest-running skill leads", () => {
    const { skills } = aggregateSkills(
      [
        project({ slug: "a", stack: ["React", "Rust"], startDate: "2020-01", endDate: "2024-01" }),
        project({ slug: "b", stack: ["Rust"], startDate: "2024-02", endDate: "2024-03" }),
      ],
      NOW,
    );
    expect(skills[0].skill).toBe("Rust");
    expect(skills[0].weight).toBeGreaterThan(skills[1].weight);
  });

  it("lists the projects behind each skill", () => {
    const { skills } = aggregateSkills(
      [project({ slug: "a", stack: ["React"], startDate: "2024-01", endDate: "2024-06" })],
      NOW,
    );
    expect(skills[0].projects).toEqual([
      { name: "a", slug: "a", startDate: "2024-01", endDate: "2024-06" },
    ]);
  });

  it("measures totalYears from the earliest start date", () => {
    const { totalYears } = aggregateSkills(
      [
        project({ slug: "a", stack: ["React"], startDate: "2022-01", endDate: "2023-01" }),
        project({ slug: "b", stack: ["Node"], startDate: "2020-01", endDate: "2021-01" }),
      ],
      NOW,
    );
    expect(totalYears).toBe(6);
  });

  it("reports no years when nothing has a start date", () => {
    expect(aggregateSkills([project({ slug: "a", stack: ["React"] })], NOW).totalYears).toBe(0);
  });

  it("reports no skills and no years for no projects", () => {
    expect(aggregateSkills([], NOW)).toEqual({ skills: [], totalYears: 0 });
  });
});
