"use client";

import { useTranslation } from "react-i18next";
import styles from "./PipelineFigure.module.scss";

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
};

const ENVS = ["prod", "stage", "demo"];

export function PipelineFigure() {
  const { t } = useTranslation();
  const stages = [t("timeline.pr"), t("timeline.review"), t("timeline.pipeline")];
  return (
    <svg className={styles.figure} viewBox="0 0 500 160" aria-hidden="true" data-pipeline-figure>
      {stages.map((label, i) => (
        <g key={label} transform={`translate(${i * 130} 60)`}>
          <rect x="0" y="0" width="104" height="40" {...STROKE} />
          <text x="12" y="24" className={styles.label}>{label}</text>
          {i < 2 && <line x1="104" y1="20" x2="130" y2="20" {...STROKE} className={styles.rule} />}
        </g>
      ))}
      <line x1="364" y1="80" x2="384" y2="80" {...STROKE} className={styles.rule} />
      <line x1="384" y1="40" x2="384" y2="120" {...STROKE} className={styles.rule} />
      {ENVS.map((env, i) => (
        <g key={env} transform={`translate(404 ${28 + i * 40})`}>
          <line x1="-20" y1="12" x2="0" y2="12" {...STROKE} className={styles.rule} />
          <rect x="0" y="0" width="92" height="24" {...STROKE} />
          <text x="10" y="16" className={styles.label}>{env}</text>
        </g>
      ))}
      <text x="0" y="150" className={styles.mono}>{t("timeline.ci")}</text>
    </svg>
  );
}
