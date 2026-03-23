"use client";

import { useState, useRef, useCallback } from "react";
import { PROJECTS } from "@/shared/config";
import { ProjectScroller } from "./ProjectScroller";
import { ProjectDetailPanel } from "./ProjectDetailPanel";
import { ProjectIndexWatermark } from "./ProjectIndexWatermark";

const DISMISS_DELAY = 1000;

export function WorkShowcase() {
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
    activeIndex !== null
      ? PROJECTS.find((p) => p.index === activeIndex) ?? null
      : null;

  return (
    <main className="relative flex flex-1 overflow-hidden px-6 sm:pl-12 sm:pr-16">
      <ProjectScroller
        projects={PROJECTS}
        activeIndex={activeIndex}
        onHover={handleProjectHover}
      />

      {/* Detail panel — right side */}
      <div
        className="hidden lg:flex items-center justify-center w-[40%] flex-shrink-0"
        onMouseEnter={handlePanelEnter}
        onMouseLeave={handlePanelLeave}
      >
        <ProjectDetailPanel project={activeProject} />
      </div>

      <ProjectIndexWatermark index={activeIndex} />
    </main>
  );
}
