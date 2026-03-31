"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { SkillBubble } from "@/shared/utils/skillsAggregator";
import styles from "./SkillDetail.module.scss";

interface SkillDetailProps {
  skill: SkillBubble | null;
  totalSkills: number;
  totalProjects: number;
  totalYears: number;
}

function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  if (years === 0) return `${remaining}mo`;
  if (remaining === 0) return `${years}y`;
  return `${years}y ${remaining}mo`;
}

export function SkillDetail({
  skill,
  totalSkills,
  totalProjects,
  totalYears,
}: SkillDetailProps) {
  const { t } = useTranslation();
  const [displayed, setDisplayed] = useState<SkillBubble | null>(null);
  const [prev, setPrev] = useState<SkillBubble | null>(null);
  const [stage, setStage] = useState(0);

  if (skill !== prev) {
    setPrev(skill);
    setStage(0);
    if (skill) setDisplayed(skill);
  }

  useEffect(() => {
    if (skill) {
      const timers = [
        setTimeout(() => setStage(1), 50),
        setTimeout(() => setStage(2), 200),
        setTimeout(() => setStage(3), 300),
        setTimeout(() => setStage(4), 400),
      ];
      return () => timers.forEach(clearTimeout);
    } else {
      const timer = setTimeout(() => setDisplayed(null), 200);
      return () => clearTimeout(timer);
    }
  }, [skill]);

  const fadeIn = (minStage: number) =>
    clsx(styles.fadeIn, stage >= minStage && styles.fadeInVisible);

  if (displayed) {
    return (
      <div
        className={clsx(
          styles.panel,
          skill ? styles.panelVisible : styles.panelHidden,
        )}
      >
        <div className={fadeIn(1)}>
          <h2 className={styles.skillName}>{displayed.skill}</h2>
        </div>

        <div className={fadeIn(2)}>
          <span className={styles.fieldLabel}>{t("skills.duration")}</span>
          <p className={styles.fieldValue}>
            {formatDuration(displayed.totalMonths)}
          </p>
        </div>

        <div className={fadeIn(3)}>
          <span className={styles.fieldLabel}>
            {t("skills.projects")} ({displayed.count})
          </span>
          <ul className={styles.projectList}>
            {displayed.projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className={styles.projectLink}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.defaultState}>
        <span className={styles.watermark}>03</span>
        <p className={styles.pageLabel}>{t("skills.label")}</p>
        <h1 className={styles.title}>{t("skills.title")}</h1>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{totalSkills}</span>
            <span className={styles.statLabel}>{t("skills.totalSkills")}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{totalYears}+</span>
            <span className={styles.statLabel}>{t("skills.totalYears")}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{totalProjects}</span>
            <span className={styles.statLabel}>
              {t("skills.totalProjects")}
            </span>
          </div>
        </div>

        <p className={styles.hint}>{t("skills.hoverHint")}</p>
      </div>
    </div>
  );
}
