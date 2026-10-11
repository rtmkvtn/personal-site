"use client";

import { useTranslation } from "react-i18next";
import styles from "./BalanceFigure.module.scss";

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
};

export function BalanceFigure() {
  const { t } = useTranslation();
  return (
    <svg className={styles.figure} viewBox="0 0 800 200" aria-hidden="true" data-balance-figure>
      <rect x="0" y="0" width="800" height="200" {...STROKE} />
      <text x="24" y="30" className={styles.label}>{t("crypto.tradeAddress")}</text>
      <text x="24" y="56" className={styles.address}>bc1q · · · · · · · · · · · · · · · · · · · · ·</text>
      <text x="24" y="74" className={styles.mono}>{t("crypto.generated")}</text>
      <text x="24" y="118" className={styles.label}>{t("crypto.confirmations")}</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={24 + i * 34} y="128" width="24" height="24" {...STROKE} />
          {i < 2 && <path d={`M${30 + i * 34} 140 l6 6 l12 -12`} {...STROKE} />}
        </g>
      ))}
      <text x="140" y="146" className={styles.mono}>2 / 3</text>
      <text x="440" y="118" className={styles.label}>{t("crypto.balance")}</text>
      <rect x="440" y="128" width="336" height="24" {...STROKE} />
      <rect x="440" y="128" width="210" height="24" fill="currentColor" stroke="none" opacity="0.25" />
      <line x1="650" y1="124" x2="650" y2="156" {...STROKE} />
      <text x="440" y="172" className={styles.mono}>{t("crypto.held")}</text>
      <text x="776" y="172" textAnchor="end" className={styles.mono}>{t("crypto.released")}</text>
    </svg>
  );
}
