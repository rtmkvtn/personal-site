import type { Project } from "@/shared/config";

export interface SkillProject {
  name: string;
  slug: string;
  startDate?: string;
  endDate?: string;
}

export interface SkillBubble {
  skill: string;
  count: number;
  totalMonths: number;
  weight: number;
  projects: SkillProject[];
}

export interface SkillsSummary {
  skills: SkillBubble[];
  totalYears: number;
}

interface Interval {
  start: number;
  end: number;
}

function toMonthEpoch(date: string): number {
  const [y, m] = date.split("-").map(Number);
  return y * 12 + m;
}

function mergeIntervals(intervals: Interval[]): Interval[] {
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a.start - b.start);
  const merged: Interval[] = [{ ...intervals[0] }];
  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    if (intervals[i].start <= prev.end + 1) {
      prev.end = Math.max(prev.end, intervals[i].end);
    } else {
      merged.push({ ...intervals[i] });
    }
  }
  return merged;
}

function computeTotalMonths(intervals: Interval[]): number {
  const merged = mergeIntervals(intervals);
  return merged.reduce((sum, iv) => sum + (iv.end - iv.start + 1), 0);
}

function computeTotalYears(projects: Project[], now: Date): number {
  const earliest = projects.reduce((min, p) => {
    if (!p.startDate) return min;
    return p.startDate < min ? p.startDate : min;
  }, "9999-99");
  if (earliest === "9999-99") return 0;
  const [y, m] = earliest.split("-").map(Number);
  return Math.floor(now.getFullYear() - y + (now.getMonth() + 1 - m) / 12);
}

/**
 * Every figure the Hard Skills surface shows: one bubble per skill, weighted by how many projects
 * used it and for how long with overlapping engagements counted once, and the years since the
 * earliest project began. `now` is injected so the figures are testable.
 */
export function aggregateSkills(projects: Project[], now: Date = new Date()): SkillsSummary {
  const map = new Map<
    string,
    { count: number; intervals: Interval[]; projects: SkillProject[] }
  >();

  for (const project of projects) {
    if (!project.startDate) continue;
    const start = toMonthEpoch(project.startDate);
    const end = project.endDate
      ? toMonthEpoch(project.endDate)
      : now.getFullYear() * 12 + (now.getMonth() + 1);
    const interval: Interval = { start, end };

    for (const skill of project.stack) {
      const existing = map.get(skill);
      const sp: SkillProject = {
        name: project.name.en,
        slug: project.slug,
        startDate: project.startDate,
        endDate: project.endDate,
      };
      if (existing) {
        existing.count++;
        existing.intervals.push(interval);
        existing.projects.push(sp);
      } else {
        map.set(skill, { count: 1, intervals: [interval], projects: [sp] });
      }
    }
  }

  const entries = Array.from(map.entries()).map(([skill, data]) => ({
    skill,
    count: data.count,
    totalMonths: computeTotalMonths(data.intervals),
    projects: data.projects,
  }));
  const maxDuration = Math.max(...entries.map((e) => e.totalMonths), 1);

  const skills = entries
    .map((e) => ({
      ...e,
      weight: e.count * 0.4 + (e.totalMonths / maxDuration) * 0.6,
    }))
    .sort((a, b) => b.weight - a.weight);

  return { skills, totalYears: computeTotalYears(projects, now) };
}
