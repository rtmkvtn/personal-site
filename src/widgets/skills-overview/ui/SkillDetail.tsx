"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { SkillBubble } from "@/shared/utils/skillsAggregator";
import { toLocaleNumeral } from "@/shared/lib/chinese-numerals";
import { useLocale } from "@/shared/lib/i18n";
import { useSkillDuration } from "../lib/use-skill-duration";
import styles from "./SkillDetail.module.scss";

interface SkillDetailProps {
  skill: SkillBubble | null;
  totalSkills: number;
  totalProjects: number;
  totalYears: number;
}

export function SkillDetail({
  skill,
  totalSkills,
  totalProjects,
  totalYears,
}: SkillDetailProps) {
  const { t } = useTranslation();
  const locale = useLocale();
  const skillDuration = useSkillDuration();
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
            {skillDuration(displayed.totalMonths)}
          </p>
        </div>

        <div className={fadeIn(3)}>
          <span className={styles.fieldLabel}>
            {t("skills.projects")} ({toLocaleNumeral(displayed.count, locale)})
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
        <span className={styles.watermark}>{toLocaleNumeral(3, locale, { pad: 2 })}</span>
        <p className={styles.pageLabel}>{t("skills.label")}</p>
        <h1 className={styles.title}>{t("skills.title")}</h1>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{toLocaleNumeral(totalSkills, locale)}</span>
            <span className={styles.statLabel}>{t("skills.totalSkills")}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{toLocaleNumeral(totalYears, locale)}+</span>
            <span className={styles.statLabel}>{t("skills.totalYears")}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{toLocaleNumeral(totalProjects, locale)}</span>
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
