"use client";

import clsx from "clsx";
import styles from "./ProjectIndexWatermark.module.scss";

interface ProjectIndexWatermarkProps {
  index: number | null;
}

export function ProjectIndexWatermark({ index }: ProjectIndexWatermarkProps) {
  const display = index !== null ? String(index).padStart(2, "0") : "";

  return (
    <div
      className={clsx(
        styles.watermark,
        index !== null ? styles.active : styles.inactive,
      )}
    >
      {display}
    </div>
  );
}
