"use client";

// PROTOTYPE for wayfinder ticket #72. Adds AI tooling entries to the two 2025
// projects and renders the chart in three variants. Throwaway.

import { Suspense, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { Project } from "@/shared/config";
import { aggregateSkills } from "@/shared/utils/skillsAggregator";
import { PrototypeSwitcher } from "@/shared/ui/PrototypeSwitcher/PrototypeSwitcher";
import { BubbleChartPrototype, type ChartVariant } from "./BubbleChart.prototype";
import { SkillDetail } from "./SkillDetail";
import styles from "./SkillsOverview.module.scss";

const AI_ENTRIES = ["Claude Code", "Codex", "AI Agents"];
const AI_PROJECTS = new Set(["currency-exchange", "m-invest"]);
const AI_SET = new Set(AI_ENTRIES);

const VARIANTS = [
  { key: "A", name: "Unmarked, same as any stack entry" },
  { key: "B", name: "Hollow ring" },
  { key: "C", name: "Separate cluster with caption" },
];

function Inner({ projects }: { projects: Project[] }) {
  const params = useSearchParams();
  const variant = (params.get("variant") ?? "A") as ChartVariant;
  const settle = params.get("static") === "1";
  const augmented = useMemo(
    () =>
      projects.map((p) =>
        AI_PROJECTS.has(p.slug) ? { ...p, stack: [...p.stack, ...AI_ENTRIES] } : p,
      ),
    [projects],
  );
  const skills = useMemo(() => aggregateSkills(augmented), [augmented]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const hoveredData = useMemo(
    () => skills.find((s) => s.skill === hoveredSkill) ?? null,
    [skills, hoveredSkill],
  );
  const handleHover = useCallback((s: string | null) => setHoveredSkill(s), []);
  const handleTap = useCallback(() => {}, []);

  return (
    <main className={styles.main}>
      <div className={styles.hairline} />
      <div className={styles.detailPanel}>
        <SkillDetail
          skill={hoveredData}
          totalSkills={skills.length}
          totalProjects={projects.length}
          totalYears={6}
        />
      </div>
      <div className={styles.chartPanel}>
        <BubbleChartPrototype
          skills={skills}
          hoveredSkill={hoveredSkill}
          onHover={handleHover}
          onTap={handleTap}
          variant={variant}
          aiSkills={AI_SET}
          caption="AI tooling"
          settle={settle}
        />
      </div>
      <PrototypeSwitcher variants={VARIANTS} current={variant} />
    </main>
  );
}

export function SkillsOverviewPrototype({ projects }: { projects: Project[] }) {
  return (
    <Suspense>
      <Inner projects={projects} />
    </Suspense>
  );
}
