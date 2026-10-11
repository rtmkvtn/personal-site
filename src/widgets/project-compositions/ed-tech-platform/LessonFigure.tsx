"use client";

import { useTranslation } from "react-i18next";
import styles from "./LessonFigure.module.scss";

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
};

const LINES = [220, 190, 140];

function Lesson({ x, dashed, label }: { x: number; dashed?: boolean; label: string }) {
  return (
    <g transform={`translate(${x} 20)`}>
      <rect x="0" y="0" width="260" height="200" {...STROKE} strokeDasharray={dashed ? "3 5" : undefined} />
      <text x="20" y="30" className={styles.label}>{label}</text>
      <line x1="20" y1="40" x2="240" y2="40" {...STROKE} className={styles.rule} />
      <rect x="20" y="56" width="220" height="88" {...STROKE} className={styles.rule} />
      <line x1="20" y1="56" x2="240" y2="144" {...STROKE} className={styles.rule} />
      <line x1="240" y1="56" x2="20" y2="144" {...STROKE} className={styles.rule} />
      {LINES.map((length, i) => (
        <line key={length} x1="20" y1={164 + i * 14} x2={20 + length} y2={164 + i * 14} {...STROKE} className={styles.rule} />
      ))}
    </g>
  );
}

export function LessonFigure() {
  const { t } = useTranslation();
  return (
    <svg className={styles.figure} viewBox="0 0 640 250" aria-hidden="true" data-lesson-figure>
      <text x="0" y="8" className={styles.label}>{t("handoff.submitted")}</text>
      <text x="380" y="8" className={styles.label}>{t("handoff.published")}</text>
      <Lesson x={0} dashed label={t("handoff.lesson")} />
      <Lesson x={380} label={t("handoff.lesson")} />
      <line x1="260" y1="120" x2="380" y2="120" {...STROKE} />
      <line x1="320" y1="114.5" x2="320" y2="125.5" {...STROKE} />
      <text x="320" y="108" textAnchor="middle" className={styles.label}>{t("handoff.review")}</text>
      <text x="0" y="246" className={styles.mono}>{t("handoff.hidden")}</text>
      <text x="380" y="246" className={styles.mono}>{t("handoff.visible")}</text>
    </svg>
  );
}
