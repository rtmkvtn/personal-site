"use client";

// PROTOTYPE: three hero figures for the void above the Crypto Marketplace title,
// switchable via ?variant=A|B|C on /work/crypto-marketplace in development. Throwaway.

import styles from "./hero-graphics.prototype.module.scss";

export type HeroVariant = "A" | "B" | "C";

export const HERO_VARIANTS = [
  { key: "A", name: "The escrow states" },
  { key: "B", name: "The held balance" },
  { key: "C", name: "The retrofit" },
];

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };

export function EscrowStates() {
  const states = ["BUY", "CONFIRM", "PAY", "HOLD", "RELEASE"];
  const x = (i: number) => 60 + i * 170;
  return (
    <svg className={styles.figure} viewBox="0 0 800 200" aria-hidden="true">
      <text x="0" y="12" className={styles.label}>BUYER</text>
      <text x="800" y="12" textAnchor="end" className={styles.label}>SELLER</text>
      <line x1="60" y1="70" x2="740" y2="70" {...S} className={styles.line} />
      {states.map((name, i) => (
        <g key={name}>
          <circle cx={x(i)} cy="70" r="5" {...S} />
          <text x={x(i)} y="94" textAnchor="middle" className={styles.label}>{name}</text>
        </g>
      ))}
      <rect x={x(2) - 30} y="40" width={x(3) - x(2) + 60} height="60" {...S} className={styles.seam} />
      <text x={(x(2) + x(3)) / 2} y="32" textAnchor="middle" className={styles.label}>HELD ON THE INTERNAL BALANCE</text>
      <line x1={x(3)} y1="76" x2={x(3)} y2="140" {...S} strokeDasharray="2 4" />
      <circle cx={x(3)} cy="146" r="4" {...S} />
      <text x={x(3)} y="170" textAnchor="middle" className={styles.label}>DISPUTE · FROZEN</text>
      <text x={x(3)} y="190" textAnchor="middle" className={styles.mono}>admin releases or refunds</text>
      <text x="400" y="128" textAnchor="middle" className={styles.mono}>chat open for the whole trade</text>
    </svg>
  );
}

export function HeldBalance() {
  return (
    <svg className={styles.figure} viewBox="0 0 800 200" aria-hidden="true">
      <rect x="0" y="0" width="800" height="200" {...S} />
      <text x="24" y="30" className={styles.label}>TRADE ADDRESS</text>
      <text x="24" y="56" className={styles.monoLarge}>bc1q · · · · · · · · · · · · · · · · · · · · ·</text>
      <text x="24" y="74" className={styles.mono}>generated per trade · one use</text>
      <text x="24" y="118" className={styles.label}>CONFIRMATIONS</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={24 + i * 34} y="128" width="24" height="24" {...S} />
          {i < 2 && <path d={`M${30 + i * 34} 140 l6 6 l12 -12`} {...S} />}
        </g>
      ))}
      <text x="140" y="146" className={styles.mono}>2 / 3</text>
      <text x="440" y="118" className={styles.label}>BALANCE</text>
      <rect x="440" y="128" width="336" height="24" {...S} />
      <rect x="440" y="128" width="210" height="24" fill="currentColor" stroke="none" opacity="0.25" />
      <text x="440" y="172" className={styles.mono}>held until both confirm</text>
      <text x="776" y="172" textAnchor="end" className={styles.mono}>released</text>
      <line x1="650" y1="124" x2="650" y2="156" {...S} />
    </svg>
  );
}

export function Retrofit() {
  const blocks = (ox: number, oy: number, w: number, rows: number) =>
    Array.from({ length: rows }, (_, r) => <rect key={`${ox}-${r}`} x={ox} y={oy + r * 22} width={w} height="14" {...S} className={styles.seam} />);
  return (
    <svg className={styles.figure} viewBox="0 0 800 200" aria-hidden="true">
      <rect x="0" y="10" width="520" height="180" {...S} />
      <line x1="0" y1="34" x2="520" y2="34" {...S} className={styles.line} />
      <rect x="16" y="48" width="140" height="130" {...S} className={styles.seam} />
      {blocks(176, 48, 320, 3)}
      {blocks(176, 118, 150, 2)}
      {blocks(346, 118, 150, 2)}
      <text x="0" y="0" className={styles.mono} dy="-2">desktop · 1440</text>
      <rect x="640" y="10" width="110" height="180" {...S} />
      <line x1="640" y1="30" x2="750" y2="30" {...S} className={styles.line} />
      <rect x="652" y="40" width="86" height="50" {...S} className={styles.seam} />
      {blocks(652, 100, 86, 4)}
      <text x="640" y="0" className={styles.mono} dy="-2">phone · 390</text>
      <path d="M540 100 h80" {...S} strokeDasharray="2 4" />
      <path d="M612 94 l8 6 -8 6" {...S} />
      <text x="580" y="124" textAnchor="middle" className={styles.mono}>screen by screen</text>
    </svg>
  );
}
