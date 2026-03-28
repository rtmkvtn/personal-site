"use client";

import { useMemo } from "react";
import type { Project, ResolvedProject } from "@/shared/config/projects";
import { useLocale } from "./provider";
import { resolveProjectLocale } from "./locale-resolver";

export function useLocalizedProject(project: Project): ResolvedProject {
  const locale = useLocale();
  return useMemo(
    () => resolveProjectLocale(project, locale),
    [project, locale],
  );
}

export function useLocalizedProjects(projects: Project[]): ResolvedProject[] {
  const locale = useLocale();
  return useMemo(
    () => projects.map((p) => resolveProjectLocale(p, locale)),
    [projects, locale],
  );
}
