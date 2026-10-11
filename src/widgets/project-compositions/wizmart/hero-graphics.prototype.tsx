"use client";

// PROTOTYPE: three hero figures for the void under the Wizmart deck, switchable via
// ?variant=A|B|C on /work/wizmart in development. Throwaway.

import styles from "./hero-graphics.prototype.module.scss";

export type HeroVariant = "A" | "B" | "C";

export const HERO_VARIANTS = [
  { key: "A", name: "Two roles, one platform" },
  { key: "B", name: "The catalog, matched" },
  { key: "C", name: "The label" },
];

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };

export function TwoRoles() {
  const left = ["Connect account", "Match goods", "Watch orders", "Pay"];
  const right = ["List positions", "Take task", "Produce", "Print label"];
  return (
    <svg className={styles.figure} viewBox="0 0 560 320" aria-hidden="true">
      <text x="0" y="12" className={styles.label}>SELLER</text>
      <text x="560" y="12" textAnchor="end" className={styles.label}>MANUFACTURER</text>
      <rect x="200" y="0" width="160" height="320" {...S} className={styles.seam} />
      <text x="280" y="12" textAnchor="middle" className={styles.label}>PLATFORM</text>
      {left.map((t, i) => (
        <g key={t}>
          <text x="0" y={62 + i * 64} className={styles.body}>{t}</text>
          <line x1="150" y1={58 + i * 64} x2="200" y2={58 + i * 64} {...S} className={styles.line} />
        </g>
      ))}
      {right.map((t, i) => (
        <g key={t}>
          <text x="560" y={62 + i * 64} textAnchor="end" className={styles.body}>{t}</text>
          <line x1="360" y1={58 + i * 64} x2="410" y2={58 + i * 64} {...S} className={styles.line} />
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="280" cy={58 + i * 64} r="4" {...S} />
          {i < 3 && <line x1="280" y1={62 + i * 64} x2="280" y2={54 + (i + 1) * 64} {...S} strokeDasharray="2 4" />}
        </g>
      ))}
      <text x="280" y="310" textAnchor="middle" className={styles.mono}>catalog · orders · payments · receipts</text>
    </svg>
  );
}

export function CatalogMatched() {
  const cols = 10;
  const rows = 5;
  const matched = new Set([3, 7, 12, 18, 25, 31, 36, 44]);
  const goods = [60, 180, 300, 420];
  const targets = [3, 18, 31, 44];
  const cell = (i: number) => ({ x: 20 + (i % cols) * 52, y: 120 + Math.floor(i / cols) * 38 });
  return (
    <svg className={styles.figure} viewBox="0 0 560 320" aria-hidden="true">
      <text x="20" y="12" className={styles.label}>SELLER'S GOODS</text>
      {goods.map((x, i) => (
        <g key={x}>
          <rect x={x} y="28" width="40" height="28" {...S} />
          <line x1={x + 20} y1="56" x2={cell(targets[i]).x + 20} y2={cell(targets[i]).y} {...S} className={styles.line} />
        </g>
      ))}
      <text x="20" y="104" className={styles.label}>MANUFACTURERS' POSITIONS</text>
      {Array.from({ length: cols * rows }, (_, i) => {
        const { x, y } = cell(i);
        return <rect key={i} x={x} y={y} width="40" height="26" {...S} className={matched.has(i) ? styles.matched : undefined} />;
      })}
      <text x="20" y="312" className={styles.mono}>x 10 · y 5 · matched 8</text>
    </svg>
  );
}

export function TheLabel() {
  const bars = [2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 2, 1, 3, 1, 2];
  let x = 40;
  return (
    <svg className={styles.figure} viewBox="0 0 560 320" aria-hidden="true">
      <rect x="20" y="10" width="520" height="300" {...S} />
      <text x="40" y="44" className={styles.label}>ORDER</text>
      <line x1="40" y1="56" x2="300" y2="56" {...S} className={styles.line} />
      <text x="40" y="82" className={styles.label}>PRODUCT</text>
      <line x1="40" y1="94" x2="300" y2="94" {...S} className={styles.line} />
      <text x="40" y="120" className={styles.label}>MANUFACTURER</text>
      <line x1="40" y1="132" x2="300" y2="132" {...S} className={styles.line} />
      <g>
        {bars.map((w, i) => {
          const bar = <rect key={i} x={x} y="200" width={w * 3} height="64" fill="currentColor" stroke="none" />;
          x += w * 3 + 4;
          return bar;
        })}
      </g>
      <text x="40" y="288" className={styles.mono}>4 600 000 000 000</text>
      <g transform="translate(380 40)">
        <rect x="0" y="0" width="140" height="140" {...S} />
        {[[0, 0], [100, 0], [0, 100]].map(([ox, oy]) => (
          <g key={`${ox}${oy}`}>
            <rect x={ox + 8} y={oy + 8} width="24" height="24" {...S} />
            <rect x={ox + 15} y={oy + 15} width="10" height="10" fill="currentColor" stroke="none" />
          </g>
        ))}
        {[[48, 12], [60, 12], [84, 12], [48, 36], [72, 36], [96, 48], [12, 48], [36, 60], [60, 60], [120, 60], [12, 72], [48, 84], [84, 84], [108, 96], [48, 108], [72, 120], [120, 120], [96, 108]].map(([px, py]) => (
          <rect key={`${px}${py}`} x={px} y={py} width="8" height="8" fill="currentColor" stroke="none" />
        ))}
      </g>
      <text x="380" y="210" className={styles.label}>WILDBERRIES</text>
      <text x="380" y="232" className={styles.mono}>print-ready · 58 × 40</text>
    </svg>
  );
}
