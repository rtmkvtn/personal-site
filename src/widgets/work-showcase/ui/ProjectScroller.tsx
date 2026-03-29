"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import type { ResolvedProject } from "@/shared/config";
import { GlitchText } from "@/shared/ui";
import styles from "./ProjectScroller.module.scss";

const SCROLL_SPEED = 0.5;
const VIRTUAL_REPEAT = 100;
const ROW_HEIGHT_EST = 106;

const GLITCH_INTERVAL = 2000;
const GLITCH_DURATION = 500;

interface ProjectScrollerProps {
  projects: ResolvedProject[];
  activeIndex: number | null;
  onHover: (index: number | null) => void;
}

export function ProjectScroller({
  projects,
  activeIndex,
  onHover,
}: ProjectScrollerProps) {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const activeVirtualIndexRef = useRef<number | null>(null);
  const glitchIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeVirtualIndex, setActiveVirtualIndex] = useState<number | null>(
    null,
  );
  const [glitchVirtualIndex, setGlitchVirtualIndex] = useState<number | null>(
    null,
  );

  const count = projects.length * VIRTUAL_REPEAT;

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => ROW_HEIGHT_EST,
    overscan: 5,
  });

  const animate = useCallback(() => {
    const el = scrollElementRef.current;
    if (!pausedRef.current && el) {
      el.scrollTop += SCROLL_SPEED;
      const cycleHeight = ROW_HEIGHT_EST * projects.length;
      if (el.scrollTop > cycleHeight * (VIRTUAL_REPEAT / 2)) {
        el.scrollTop -= cycleHeight;
      }
    }
    animRef.current = requestAnimationFrame(animate);
  }, [projects.length]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

  useEffect(() => {
    if (activeIndex === null) {
      activeVirtualIndexRef.current = null;
      setActiveVirtualIndex(null);
      pausedRef.current = false;
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex !== null) {
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
        glitchIntervalRef.current = null;
      }
      return;
    }

    const tick = () => {
      const el = scrollElementRef.current;
      if (!el) return;
      const scrollTop = el.scrollTop;
      const viewH = el.clientHeight;
      // Account for the 15% mask fade on top and bottom
      const visibleTop = scrollTop + viewH * 0.15;
      const visibleBottom = scrollTop + viewH * 0.85;
      const inView = virtualizer.getVirtualItems().filter(
        (item) => item.end > visibleTop && item.start < visibleBottom,
      );
      if (inView.length === 0) return;
      const pick = inView[Math.floor(Math.random() * inView.length)];
      setGlitchVirtualIndex(pick.index);
      setTimeout(() => setGlitchVirtualIndex(null), GLITCH_DURATION);
    };

    glitchIntervalRef.current = setInterval(tick, GLITCH_INTERVAL);

    return () => {
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
        glitchIntervalRef.current = null;
      }
    };
  }, [activeIndex, virtualizer]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const title = (e.target as HTMLElement).closest(
        "[data-project-title]",
      ) as HTMLElement | null;
      if (title) {
        const row = title.closest("[data-project-index]") as HTMLElement | null;
        if (row) {
          const virtualIndex = Number(row.getAttribute("data-index"));
          if (virtualIndex !== activeVirtualIndexRef.current) {
            const projectIndex = Number(
              row.getAttribute("data-project-index"),
            );
            pausedRef.current = true;
            activeVirtualIndexRef.current = virtualIndex;
            setActiveVirtualIndex(virtualIndex);
            onHover(projectIndex);
          }
        }
        return;
      }
      if (pausedRef.current) {
        pausedRef.current = false;
        activeVirtualIndexRef.current = null;
        setActiveVirtualIndex(null);
        onHover(null);
      }
    },
    [onHover],
  );

  const handleMouseLeave = useCallback(() => {
    if (pausedRef.current) {
      pausedRef.current = false;
      activeVirtualIndexRef.current = null;
      setActiveVirtualIndex(null);
      onHover(null);
    }
  }, [onHover]);

  return (
    <div
      className={styles.mask}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <div
        ref={scrollElementRef}
        className={styles.scrollContainer}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            position: "relative",
            width: "100%",
          }}
        >
          {virtualizer.getVirtualItems().map((vRow) => {
          const projectIndex = vRow.index % projects.length;
          const project = projects[projectIndex];
          const isClone = vRow.index >= projects.length;
          const isActive = activeVirtualIndex === vRow.index;
          const isDimmed = activeVirtualIndex !== null && !isActive;

          return (
            <div
              key={vRow.key}
              ref={virtualizer.measureElement}
              data-index={vRow.index}
              data-project-index={projectIndex}
              aria-hidden={isClone || undefined}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${vRow.start}px)`,
              }}
              className={styles.row}
            >
              <div className={styles.separator} />
              <span
                className={clsx(
                  styles.index,
                  isActive && styles.indexActive,
                  isDimmed && styles.indexDimmed,
                )}
              >
                {String(projects.length - projectIndex).padStart(2, "0")}
              </span>
              <h2
                data-project-title
                className={clsx(
                  styles.name,
                  isActive && styles.nameActive,
                  isDimmed && styles.nameDimmed,
                )}
              >
                <GlitchText active={vRow.index === glitchVirtualIndex}>
                  {project.name}
                </GlitchText>
              </h2>
              <span
                className={clsx(
                  styles.date,
                  isActive && styles.dateVisible,
                )}
              >
                {project.displayDate}
              </span>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
