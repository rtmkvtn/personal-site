"use client";

import { useTranslation } from "react-i18next";
import styles from "./ExamRoomFigure.module.scss";

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
};

const NOTES = [124, 101, 115, 86, 108];
const PREVIEWS = [0, 118, 236, 354];
const ACTIVE_PREVIEW = 1;

export function ExamRoomFigure() {
  const { t } = useTranslation();
  return (
    <svg className={styles.figure} viewBox="0 0 460 245" aria-hidden="true" data-exam-room-figure>
      <text x="0" y="8" className={styles.label}>{t("interpreter.examRoom")}</text>
      <rect x="0" y="14" width="460" height="173" {...STROKE} />
      <rect x="14" y="29" width="288" height="144" {...STROKE} className={styles.rule} />
      <line x1="14" y1="29" x2="302" y2="173" {...STROKE} className={styles.rule} />
      <line x1="302" y1="29" x2="14" y2="173" {...STROKE} className={styles.rule} />
      <text x="23" y="48" className={styles.label}>{t("interpreter.patient")}</text>
      {NOTES.map((length, i) => (
        <line key={length} x1="322" y1={46 + i * 12} x2={322 + length} y2={46 + i * 12} {...STROKE} className={styles.rule} />
      ))}
      <rect x="322" y="115" width="124" height="58" {...STROKE} className={styles.rule} />
      {PREVIEWS.map((x, i) => (
        <g key={x}>
          <rect x={x} y="199" width="106" height="32" {...STROKE} />
          {i === ACTIVE_PREVIEW && (
            <rect x={x} y="199" width="106" height="32" fill="currentColor" stroke="none" opacity="0.25" />
          )}
        </g>
      ))}
      <text x="0" y="243" className={styles.mono}>{t("interpreter.previews")}</text>
    </svg>
  );
}
