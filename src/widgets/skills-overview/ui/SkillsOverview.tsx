"use client";

import { useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { Project } from "@/shared/config";
import { aggregateSkills, type SkillBubble } from "@/shared/utils/skillsAggregator";
import { BubbleChart } from "./BubbleChart";
import { SkillDetail } from "./SkillDetail";
import styles from "./SkillsOverview.module.scss";

interface SkillsOverviewProps {
  projects: Project[];
}

export function SkillsOverview({ projects }: SkillsOverviewProps) {
  const { t } = useTranslation();
  const skills = useMemo(() => aggregateSkills(projects), [projects]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [modalSkill, setModalSkill] = useState<SkillBubble | null>(null);

  const hoveredData = useMemo(
    () => skills.find((s) => s.skill === hoveredSkill) ?? null,
    [skills, hoveredSkill],
  );

  const totalYears = useMemo(() => {
    const earliest = projects.reduce((min, p) => {
      if (!p.startDate) return min;
      return p.startDate < min ? p.startDate : min;
    }, "9999-99");
    if (earliest === "9999-99") return 0;
    const [y, m] = earliest.split("-").map(Number);
    const now = new Date();
    return Math.floor(
      (now.getFullYear() - y) + (now.getMonth() + 1 - m) / 12,
    );
  }, [projects]);

  const handleHover = useCallback((skill: string | null) => {
    setHoveredSkill(skill);
  }, []);

  const handleTap = useCallback(
    (skill: string) => {
      const data = skills.find((s) => s.skill === skill) ?? null;
      setModalSkill(data);
    },
    [skills],
  );

  const closeModal = useCallback(() => {
    setModalSkill(null);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.hairline} />

      <div className={styles.detailPanel}>
        <SkillDetail
          skill={hoveredData}
          totalSkills={skills.length}
          totalProjects={projects.length}
          totalYears={totalYears}
        />
      </div>

      <div className={styles.chartPanel}>
        <BubbleChart
          skills={skills}
          hoveredSkill={hoveredSkill}
          onHover={handleHover}
          onTap={handleTap}
        />
      </div>

      {/* Mobile modal */}
      {modalSkill && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>{modalSkill.skill}</h2>

            <div className={styles.modalField}>
              <span className={styles.modalLabel}>{t("skills.duration")}</span>
              <p className={styles.modalValue}>
                {(() => {
                  const y = Math.floor(modalSkill.totalMonths / 12);
                  const m = modalSkill.totalMonths % 12;
                  if (y === 0) return `${m}mo`;
                  if (m === 0) return `${y}y`;
                  return `${y}y ${m}mo`;
                })()}
              </p>
            </div>

            <div className={styles.modalField}>
              <span className={styles.modalLabel}>
                {t("skills.projects")} ({modalSkill.count})
              </span>
              <ul className={styles.modalProjectList}>
                {modalSkill.projects.map((p) => (
                  <li key={p.slug}>
                    <a href={`/work/${p.slug}`} className={styles.modalProjectLink}>
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <button className={styles.modalClose} onClick={closeModal}>
              {t("skills.close")}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
