"use client";

import { useTranslation } from "react-i18next";
import styles from "./EntryFigure.module.scss";

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
};

export function EntryFigure() {
  const { t } = useTranslation();
  const rows = [
    { label: t("byHand.fiatIn"), debit: 124, credit: 0 },
    { label: t("byHand.cryptoOut"), debit: 0, credit: 108 },
    { label: t("byHand.fee"), debit: 0, credit: 16 },
  ];
  return (
    <svg className={styles.figure} viewBox="0 0 460 200" aria-hidden="true" data-entry-figure>
      <text x="0" y="8" className={styles.label}>{t("byHand.entry")}</text>
      <rect x="0" y="20" width="460" height="150" {...STROKE} />
      <text x="160" y="44" className={styles.label}>{t("byHand.debit")}</text>
      <text x="320" y="44" className={styles.label}>{t("byHand.credit")}</text>
      <line x1="16" y1="52" x2="444" y2="52" {...STROKE} className={styles.rule} />
      {rows.map((row, i) => (
        <g key={row.label} transform={`translate(0 ${72 + i * 28})`}>
          <text x="16" y="4" className={styles.label}>{row.label}</text>
          {row.debit > 0 && <rect x="160" y="-6" width={row.debit} height="12" fill="currentColor" stroke="none" opacity="0.25" />}
          {row.credit > 0 && <rect x="320" y="-6" width={row.credit} height="12" fill="currentColor" stroke="none" opacity="0.25" />}
          <line x1="16" y1="12" x2="444" y2="12" {...STROKE} className={styles.rule} />
        </g>
      ))}
      <text x="16" y="156" className={styles.label}>{t("byHand.balanced")}</text>
      <rect x="160" y="146" width="124" height="12" fill="currentColor" stroke="none" opacity="0.25" />
      <rect x="320" y="146" width="124" height="12" fill="currentColor" stroke="none" opacity="0.25" />
      <text x="0" y="192" className={styles.mono}>{t("byHand.entryCaption")}</text>
    </svg>
  );
}
