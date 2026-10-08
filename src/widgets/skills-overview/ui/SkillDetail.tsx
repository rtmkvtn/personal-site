"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { SkillBubble } from "@/shared/utils/skillsAggregator";
import { toChineseNumeral } from "@/shared/lib/chinese-numerals";
import styles from "./SkillDetail.module.scss";

interface SkillDetailProps {
  skill: SkillBubble | null;
  totalSkills: number;
  totalProjects: number;
  totalYears: number;
}

function formatDuration(
  months: number,
  t: (key: string) => string,
  num: (n: number) => string,
): string {
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  const yUnit = t("skills.durationYear");
  const mUnit = t("skills.durationMonth");
  if (years === 0) return `${num(remaining)}${mUnit}`;
  if (remaining === 0) return `${num(years)}${yUnit}`;
  return `${num(years)}${yUnit} ${num(remaining)}${mUnit}`;
}

export function SkillDetail({
  skill,
  totalSkills,
  totalProjects,
  totalYears,
}: SkillDetailProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const num = (n: number) => locale === "zh" ? toChineseNumeral(n, "value") : String(n);
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
            {formatDuration(displayed.totalMonths, t, num)}
          </p>
        </div>

        <div className={fadeIn(3)}>
          <span className={styles.fieldLabel}>
            {t("skills.projects")} ({num(displayed.count)})
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
        <span className={styles.watermark}>{locale === "zh" ? "三" : "03"}</span>
        <p className={styles.pageLabel}>{t("skills.label")}</p>
        <h1 className={styles.title}>{t("skills.title")}</h1>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{num(totalSkills)}</span>
            <span className={styles.statLabel}>{t("skills.totalSkills")}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{num(totalYears)}+</span>
            <span className={styles.statLabel}>{t("skills.totalYears")}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{num(totalProjects)}</span>
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
