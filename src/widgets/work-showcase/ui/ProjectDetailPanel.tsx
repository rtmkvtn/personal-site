"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { ResolvedProject } from "@/shared/config";
import { useStagedReveal } from "@/shared/lib/use-staged-reveal";
import styles from "./ProjectDetailPanel.module.scss";

interface ProjectDetailPanelProps {
  project: ResolvedProject | null;
}

const STAGE_DELAYS = [50, 200, 300, 400, 500];

export function ProjectDetailPanel({ project }: ProjectDetailPanelProps) {
  const { displayed: displayedProject, reached } = useStagedReveal(project, STAGE_DELAYS);

  if (!displayedProject) return null;

  const fadeIn = (minStage: number) =>
    clsx(styles.fadeIn, reached(minStage) && styles.fadeInVisible);

  return (
    <div
      className={clsx(
        styles.panel,
        project ? styles.panelVisible : styles.panelHidden,
      )}
    >
      {displayedProject?.image && (
        <div className={clsx(styles.imageWrapper, reached(1) && styles.imageWrapperVisible)}>
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
