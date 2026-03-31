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

function computeMonths(startDate?: string, endDate?: string): number {
  if (!startDate) return 0;
  const [sy, sm] = startDate.split("-").map(Number);
  const now = new Date();
  const [ey, em] = endDate
    ? endDate.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  return (ey - sy) * 12 + (em - sm) + 1;
}

export function aggregateSkills(projects: Project[]): SkillBubble[] {
  const map = new Map<
    string,
    { count: number; totalMonths: number; projects: SkillProject[] }
  >();

  for (const project of projects) {
    const months = computeMonths(project.startDate, project.endDate);
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
        existing.totalMonths += months;
        existing.projects.push(sp);
      } else {
        map.set(skill, { count: 1, totalMonths: months, projects: [sp] });
      }
    }
  }

  const entries = Array.from(map.entries());
  const maxDuration = Math.max(...entries.map(([, v]) => v.totalMonths), 1);

  return entries
    .map(([skill, data]) => ({
      skill,
      count: data.count,
      totalMonths: data.totalMonths,
      weight: data.count * 0.4 + (data.totalMonths / maxDuration) * 0.6,
      projects: data.projects,
    }))
    .sort((a, b) => b.weight - a.weight);
}
