"use client";

import { useState, useRef, useCallback } from "react";
import type { Project } from "@/shared/config";
import { useLocalizedProjects } from "@/shared/lib/i18n";
import { ProjectScroller } from "./ProjectScroller";
import { ProjectDetailPanel } from "./ProjectDetailPanel";
import { ProjectIndexWatermark } from "./ProjectIndexWatermark";
import styles from "./WorkShowcase.module.scss";

const DISMISS_DELAY = 2000;

interface WorkShowcaseProps {
  projects: Project[];
}

export function WorkShowcase({ projects: rawProjects }: WorkShowcaseProps) {
  const projects = useLocalizedProjects(rawProjects);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverZoneRef = useRef(false);
  const panelZoneRef = useRef(false);

  const cancelDismiss = useCallback(() => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
  }, []);

  const tryDismiss = useCallback(() => {
    cancelDismiss();
    dismissTimer.current = setTimeout(() => {
      if (!hoverZoneRef.current && !panelZoneRef.current) {
        setActiveIndex(null);
      }
    }, DISMISS_DELAY);
  }, [cancelDismiss]);

  const handleProjectHover = useCallback(
    (index: number | null) => {
      if (index !== null) {
        cancelDismiss();
        hoverZoneRef.current = true;
        setActiveIndex(index);
      } else {
        hoverZoneRef.current = false;
        if (!panelZoneRef.current) {
          tryDismiss();
        }
      }
    },
    [cancelDismiss, tryDismiss],
  );

  const handlePanelEnter = useCallback(() => {
    panelZoneRef.current = true;
    cancelDismiss();
  }, [cancelDismiss]);

  const handlePanelLeave = useCallback(() => {
    panelZoneRef.current = false;
    if (!hoverZoneRef.current) {
      tryDismiss();
    }
  }, [tryDismiss]);

  const activeProject =
    activeIndex !== null ? projects[activeIndex] ?? null : null;

  return (
    <main className={styles.main}>
      <ProjectScroller
        projects={projects}
        activeIndex={activeIndex}
        onHover={handleProjectHover}
      />

      <div
        className={styles.detailWrapper}
        onMouseEnter={handlePanelEnter}
        onMouseLeave={handlePanelLeave}
      >
        <ProjectDetailPanel project={activeProject} />
      </div>

      <ProjectIndexWatermark index={activeIndex || activeIndex === 0 ? projects.length - activeIndex : null} />
    </main>
  );
}
