import type {
  Project,
  ResolvedProject,
  LocalizedString,
  LocalizedStringArray,
} from "@/shared/config/projects";
import { getDisplayDate } from "../date-format";
import type { Locale } from "./detect";

function resolveString(value: LocalizedString, locale: Locale): string {
  return (value[locale] ?? value.en) as string;
}

function resolveStringArray(
  value: LocalizedStringArray,
  locale: Locale,
): string[] {
  return (value[locale] ?? value.en) as string[];
}

export function resolveProjectLocale(
  project: Project,
  locale: Locale,
): ResolvedProject {
  return {
    ...project,
    name: resolveString(project.name, locale),
    highlight: resolveString(project.highlight, locale),
    description: resolveString(project.description, locale),
    achievements: resolveStringArray(project.achievements, locale),
    displayDate: getDisplayDate(project.startDate, project.endDate, locale),
  };
}
