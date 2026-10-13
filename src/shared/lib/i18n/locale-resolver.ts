import type {
  Project,
  ResolvedProject,
  LocalizedString,
  LocalizedStringArray,
  AiFirstJson,
  ResolvedAiFirst,
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

function resolveAiFirst(
  value: AiFirstJson | undefined,
  locale: Locale,
): ResolvedAiFirst | undefined {
  if (!value) return undefined;
  return {
    steps: {
      specify: resolveString(value.steps.specify, locale),
      implement: resolveString(value.steps.implement, locale),
      verify: resolveString(value.steps.verify, locale),
      review: resolveString(value.steps.review, locale),
    },
    anchor: {
      value: resolveString(value.anchor.value, locale),
      label: resolveString(value.anchor.label, locale),
      mark: value.anchor.mark,
    },
    note: value.note ? resolveString(value.note, locale) : undefined,
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
    aiFirst: resolveAiFirst(project.aiFirst, locale),
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
    displayDate: getDisplayDate(project.startDate, project.endDate, locale),
  };
}
