import type {
  Project,
  ResolvedProject,
  LocalizedString,
  LocalizedStringArray,
  ByHandRowJson,
  ByHandRow,
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

function resolveByHandRow(row: ByHandRowJson, locale: Locale): ByHandRow {
  return {
    what: resolveString(row.what, locale),
    before: resolveString(row.before, locale),
    now: resolveString(row.now, locale),
  };
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
    arc: project.arc
      ? { steps: resolveStringArray(project.arc.steps, locale) }
      : undefined,
    journey: project.journey
      ? {
          stages: project.journey.stages.map((stage) => ({
            name: resolveString(stage.name, locale),
            fact: resolveString(stage.fact, locale),
            built: resolveString(stage.built, locale),
          })),
        }
      : undefined,
    handoff: project.handoff
      ? {
          stages: project.handoff.stages.map((stage) => ({
            actor: stage.actor,
            name: resolveString(stage.name, locale),
            fact: resolveString(stage.fact, locale),
            built: resolveString(stage.built, locale),
          })),
        }
      : undefined,
    interpreter: project.interpreter
      ? {
          rows: project.interpreter.rows.map((row) => ({
            direction: row.direction,
            wire: resolveString(row.wire, locale),
            screen: resolveString(row.screen, locale),
            built: resolveString(row.built, locale),
          })),
        }
      : undefined,
    timeline: project.timeline
      ? {
          events: project.timeline.events.map((event) => ({
            when: event.when,
            name: resolveString(event.name, locale),
            detail: resolveString(event.detail, locale),
          })),
        }
      : undefined,
    byHand: project.byHand
      ? {
          operators: project.byHand.operators.map((row) => resolveByHandRow(row, locale)),
          team: project.byHand.team.map((row) => resolveByHandRow(row, locale)),
        }
      : undefined,
    displayDate: getDisplayDate(project.startDate, project.endDate, locale),
  };
}
