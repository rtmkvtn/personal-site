"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { Project } from "@/shared/config";
import styles from "./ProjectDetailPanel.module.scss";

interface ProjectDetailPanelProps {
  project: Project | null;
}

export function ProjectDetailPanel({ project }: ProjectDetailPanelProps) {
  const [displayedProject, setDisplayedProject] = useState<Project | null>(null);
  const [prevProject, setPrevProject] = useState<Project | null>(null);
  const [stage, setStage] = useState(0);

  if (project !== prevProject) {
    setPrevProject(project);
    setStage(0);
    if (project) setDisplayedProject(project);
  }

  useEffect(() => {
    if (project) {
      const timers = [
        setTimeout(() => setStage(1), 50),
        setTimeout(() => setStage(2), 200),
        setTimeout(() => setStage(3), 300),
        setTimeout(() => setStage(4), 400),
        setTimeout(() => setStage(5), 500),
      ];
      return () => timers.forEach(clearTimeout);
    } else {
      const timer = setTimeout(() => setDisplayedProject(null), 200);
      return () => clearTimeout(timer);
    }
  }, [project]);

  if (!displayedProject) return null;

  const fadeIn = (minStage: number) =>
    clsx(styles.fadeIn, stage >= minStage && styles.fadeInVisible);

  return (
    <div
      className={clsx(
        styles.panel,
        project ? styles.panelVisible : styles.panelHidden,
      )}
    >
      {displayedProject?.image && (
        <div className={clsx(styles.imageWrapper, fadeIn(1))}>
          <div className={styles.imageOverlay} />
          <Image
            src={displayedProject.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 0px"
            loading="eager"
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.inner}>
        <div className={fadeIn(2)}>
          <span className={styles.fieldLabel}>TYPE</span>
          <p className={styles.fieldValue}>
            {displayedProject?.type?.toUpperCase() ?? ""}
          </p>
        </div>

        <div className={fadeIn(3)}>
          <span className={styles.fieldLabel}>STACK</span>
          <p className={styles.fieldValue}>
            {displayedProject?.stack?.join(", ").toUpperCase() ?? ""}
          </p>
        </div>

        <div className={fadeIn(4)}>
          <span className={styles.fieldLabel}>HIGHLIGHT</span>
          <p className={styles.fieldValue}>
            {displayedProject?.highlight?.toUpperCase() ?? ""}
          </p>
        </div>

        <div className={fadeIn(5)}>
          {displayedProject && (
            <Link
              href={`/work/${displayedProject.slug}`}
              className={styles.detailsButton}
            >
              DETAILS
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
