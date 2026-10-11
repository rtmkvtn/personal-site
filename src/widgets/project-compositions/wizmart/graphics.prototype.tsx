"use client";

// PROTOTYPE: three graphic treatments for the Wizmart page, switchable via
// ?variant=A|B|C on /work/wizmart in development. Throwaway.

import clsx from "clsx";
import styles from "./graphics.prototype.module.scss";

export type GraphicsVariant = "A" | "B" | "C";

export const GRAPHICS_VARIANTS = [
  { key: "A", name: "Journey map in the first viewport" },
  { key: "B", name: "A drafted figure per stage" },
  { key: "C", name: "The transcript at the event" },
];

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };

/* A: the journey as one schematic */
export function JourneyMap({ active }: { active: number | null }) {
  const nodes = [
    { x: 170, y: 34, label: "MATCHED" },
    { x: 290, y: 34, label: "PULLED" },
    { x: 410, y: 34, label: "ROUTED" },
    { x: 530, y: 34, label: "LABELLED" },
    { x: 650, y: 34, label: "PAID" },
    { x: 770, y: 34, label: "RECEIPTED" },
  ];
  const ext = [
    { x: 290, y: 84, label: "WILDBERRIES API" },
    { x: 650, y: 84, label: "YOOMONEY" },
    { x: 770, y: 84, label: "OFD" },
  ];
  return (
    <svg className={styles.map} viewBox="0 0 900 112" aria-hidden="true">
      <text x="20" y="38" className={styles.mapLabel}>SELLER</text>
      <text x="880" y="38" textAnchor="end" className={styles.mapLabel}>MANUFACTURER</text>
      <line x1="70" y1="34" x2="830" y2="34" {...S} className={styles.mapLine} />
      <rect x="130" y="12" width="680" height="44" {...S} className={styles.mapSeam} />
      <text x="470" y="6" textAnchor="middle" className={styles.mapLabel}>THE PLATFORM</text>
      {nodes.map((n, i) => (
        <g key={n.label} className={clsx(styles.node, active === i && styles.nodeActive)}>
          <circle cx={n.x} cy={n.y} r="5" {...S} />
          <text x={n.x} y={n.y + 18} textAnchor="middle" className={styles.mapLabel}>{n.label}</text>
        </g>
      ))}
      {ext.map((e, i) => (
        <g key={e.label} className={clsx(styles.ext, active !== null && [1, 4, 5][i] === active && styles.nodeActive)}>
          <line x1={e.x} y1="56" x2={e.x} y2={e.y - 6} {...S} strokeDasharray="2 4" />
          <circle cx={e.x} cy={e.y} r="4" {...S} />
          <text x={e.x} y={e.y + 18} textAnchor="middle" className={styles.mapLabel}>{e.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* B: one drafted figure per stage */
export function StageFigure({ index }: { index: number }) {
  const figures = [
    <g key="catalog">{[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={6 + c * 18} y={6 + r * 18} width="12" height="12" {...S} />))}<circle cx="48" cy="48" r="4" {...S} /></g>,
    <g key="poll"><circle cx="32" cy="32" r="24" {...S} /><line x1="32" y1="32" x2="32" y2="14" {...S} /><line x1="32" y1="32" x2="44" y2="38" {...S} /><path d="M52 12 l6 6 -6 6" {...S} /></g>,
    <g key="route"><line x1="8" y1="32" x2="30" y2="32" {...S} /><path d="M30 32 C44 32 44 14 58 14" {...S} /><path d="M30 32 C44 32 44 50 58 50" {...S} /><circle cx="58" cy="14" r="3" {...S} /><circle cx="58" cy="50" r="3" {...S} /></g>,
    <g key="label"><rect x="8" y="12" width="48" height="40" {...S} />{[14, 18, 24, 28, 34, 38, 44, 48].map((x, i) => <line key={x} x1={x} y1="20" x2={x} y2={i % 3 === 0 ? 40 : 36} {...S} />)}<line x1="14" y1="46" x2="48" y2="46" {...S} /></g>,
    <g key="pay"><line x1="8" y1="32" x2="52" y2="32" {...S} /><path d="M46 24 l8 8 -8 8" {...S} /><circle cx="20" cy="32" r="8" {...S} /></g>,
    <g key="receipt"><path d="M14 8 h36 v46 l-6 -4 -6 4 -6 -4 -6 4 -6 -4 -6 4 z" {...S} />{[18, 26, 34].map((y) => <line key={y} x1="20" y1={y} x2="44" y2={y} {...S} />)}</g>,
  ];
  return (
    <svg className={styles.figure} viewBox="0 0 64 64" aria-hidden="true">
      {figures[index]}
    </svg>
  );
}

/* C: documented shape vs recorded response, the drift marked */
export function Transcript() {
  const doc = [120, 80, 160, 60, 100];
  const rec = [120, 80, 0, 60, 140, 70];
  return (
    <figure className={styles.transcript} aria-hidden="true">
      <svg viewBox="0 0 520 170">
        <text x="0" y="12" className={styles.mono}>DOCUMENTED SHAPE</text>
        <text x="280" y="12" className={styles.mono}>RECORDED RESPONSE</text>
        {doc.map((w, i) => <rect key={`d${i}`} x="0" y={28 + i * 22} width={w} height="10" {...S} />)}
        {rec.map((w, i) => w === 0
          ? <line key={`r${i}`} x1="280" y1={33 + i * 22} x2="400" y2={33 + i * 22} {...S} strokeDasharray="2 4" />
          : <rect key={`r${i}`} x="280" y={28 + i * 22} width={w} height="10" {...S} className={i >= 4 ? styles.drift : undefined} />)}
        <text x="410" y="38" className={styles.mono}>missing</text>
        <text x="430" y="126" className={styles.mono}>undocumented</text>
        <text x="360" y="148" className={styles.mono}>undocumented</text>
        <line x1="250" y1="24" x2="250" y2="160" {...S} className={styles.mapLine} />
      </svg>
      <figcaption className={styles.caption}>Shapes are schematic, not the real payloads.</figcaption>
    </figure>
  );
}
