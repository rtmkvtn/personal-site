"use client";

import clsx from "clsx";
import { useTranslation } from "react-i18next";
import styles from "./JourneyMap.module.scss";

interface JourneyMapProps {
  stages: string[];
  active: number;
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
}

const EXTERNAL = [
  { stage: 1, label: "Wildberries API" },
  { stage: 4, label: "YooMoney" },
  { stage: 5, label: "OFD" },
];

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
};

export function JourneyMap({ stages, active, onHover, onSelect }: JourneyMapProps) {
  const { t } = useTranslation();
  const step = 600 / Math.max(stages.length - 1, 1);
  const x = (i: number) => 170 + i * step;

  return (
    <svg className={styles.map} viewBox="0 0 960 112" aria-hidden="true" style={{ pointerEvents: "none" }}>
      <text x="20" y="38" className={styles.label}>{t("journey.seller")}</text>
      <text x="950" y="38" textAnchor="end" className={styles.label}>{t("journey.manufacturer")}</text>
      <line x1="70" y1="34" x2="890" y2="34" {...STROKE} className={styles.line} />
      <rect x="130" y="12" width="680" height="44" {...STROKE} className={styles.seam} />
      <text x="470" y="6" textAnchor="middle" className={styles.label}>{t("journey.platform")}</text>
      {stages.map((name, i) => (
        <g
          key={name}
          className={clsx(styles.node, styles.nodeStage, active === i && styles.nodeActive)}
          data-map-node={i}
          onPointerEnter={() => onHover(i)}
          onPointerLeave={() => onHover(null)}
          onClick={() => onSelect(i)}
        >
          <circle cx={x(i)} cy="34" r="12" fill="transparent" stroke="none" />
          <circle cx={x(i)} cy="34" r="5" {...STROKE} />
          <text x={x(i)} y="52" textAnchor="middle" className={styles.label}>{name}</text>
        </g>
      ))}
      {EXTERNAL.map((e) => (
        <g
          key={e.label}
          className={clsx(styles.node, styles.nodeStage, active === e.stage && styles.nodeActive)}
          onPointerEnter={() => onHover(e.stage)}
          onPointerLeave={() => onHover(null)}
          onClick={() => onSelect(e.stage)}
        >
          <line x1={x(e.stage)} y1="56" x2={x(e.stage)} y2="78" {...STROKE} strokeDasharray="2 4" />
          <circle cx={x(e.stage)} cy="84" r="4" {...STROKE} />
          <text x={x(e.stage)} y="102" textAnchor="middle" className={styles.label}>{e.label}</text>
        </g>
      ))}
    </svg>
  );
}
