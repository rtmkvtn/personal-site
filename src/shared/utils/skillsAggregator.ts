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

export function aggregateSkills(projects: Project[]): SkillBubble[] {
  const map = new Map<
    string,
    { count: number; intervals: Interval[]; projects: SkillProject[] }
  >();

  for (const project of projects) {
    if (!project.startDate) continue;
    const now = new Date();
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

  return entries
    .map((e) => ({
      ...e,
      weight: e.count * 0.4 + (e.totalMonths / maxDuration) * 0.6,
    }))
    .sort((a, b) => b.weight - a.weight);
}
