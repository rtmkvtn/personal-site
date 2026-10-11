import styles from "./LabelFigure.module.scss";

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
};

const BAR_WIDTHS = [2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 2, 1, 3, 1, 2];
const BARS = BAR_WIDTHS.reduce<{ x: number; width: number }[]>((bars, w) => {
  const x = bars.length ? bars[bars.length - 1].x + bars[bars.length - 1].width + 4 : 40;
  bars.push({ x, width: w * 3 });
  return bars;
}, []);
const FINDERS = [
  [0, 0],
  [100, 0],
  [0, 100],
];
const MODULES = [
  [48, 12], [60, 12], [84, 12], [48, 36], [72, 36], [96, 48], [12, 48], [36, 60], [60, 60],
  [120, 60], [12, 72], [48, 84], [84, 84], [108, 96], [48, 108], [72, 120], [120, 120], [96, 108],
];

export function LabelFigure() {
  return (
    <svg className={styles.figure} viewBox="0 0 560 320" aria-hidden="true" data-label-figure>
      <rect x="20" y="10" width="520" height="300" {...STROKE} />
      {["Order", "Product", "Manufacturer"].map((field, i) => (
        <g key={field}>
          <text x="40" y={44 + i * 38} className={styles.label}>{field}</text>
          <line x1="40" y1={56 + i * 38} x2="300" y2={56 + i * 38} {...STROKE} className={styles.rule} />
        </g>
      ))}
      <g>
        {BARS.map((bar) => (
          <rect key={bar.x} x={bar.x} y="200" width={bar.width} height="64" fill="currentColor" stroke="none" />
        ))}
      </g>
      <text x="40" y="288" className={styles.mono}>EAN-13</text>
      <g transform="translate(380 40)">
        <rect x="0" y="0" width="140" height="140" {...STROKE} />
        {FINDERS.map(([ox, oy]) => (
          <g key={`${ox}-${oy}`}>
            <rect x={ox + 8} y={oy + 8} width="24" height="24" {...STROKE} />
            <rect x={ox + 15} y={oy + 15} width="10" height="10" fill="currentColor" stroke="none" />
          </g>
        ))}
        {MODULES.map(([px, py]) => (
          <rect key={`${px}-${py}`} x={px} y={py} width="8" height="8" fill="currentColor" stroke="none" />
        ))}
      </g>
      <text x="380" y="210" className={styles.label}>Wildberries</text>
      <text x="380" y="232" className={styles.mono}>print-ready · 58 × 40</text>
    </svg>
  );
}
