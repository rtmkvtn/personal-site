"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Project } from "@/shared/config";

const SCROLL_SPEED = 0.5;
const VIRTUAL_REPEAT = 100;
const ROW_HEIGHT_EST = 66;

interface ProjectScrollerProps {
  projects: Project[];
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
  const [activeVirtualIndex, setActiveVirtualIndex] = useState<number | null>(
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
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  useEffect(() => {
    if (activeIndex === null) {
      setActiveVirtualIndex(null);
      pausedRef.current = false;
    }
  }, [activeIndex]);

  return (
    <div className="overflow-hidden flex-1">
      <div
        ref={scrollElementRef}
        className="h-dvh overflow-y-auto scrollbar-none"
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
              data-project-index={project.index}
              aria-hidden={isClone || undefined}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${vRow.start}px)`,
              }}
              className="group flex items-baseline gap-8 cursor-pointer py-1"
              onMouseEnter={() => {
                pausedRef.current = true;
                setActiveVirtualIndex(vRow.index);
                onHover(project.index);
              }}
              onMouseLeave={() => {
                pausedRef.current = false;
                setActiveVirtualIndex(null);
                onHover(null);
              }}
            >
              <span
                className={`text-[0.6875rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
                  isActive
                    ? "text-primary"
                    : isDimmed
                      ? "text-outline-variant/40"
                      : "text-outline-variant"
                }`}
              >
                {String(project.index).padStart(2, "0")}
              </span>
              <h2
                className={`text-[3.5rem] font-extralight tracking-[-0.02em] leading-[1.1] transition-all duration-300 ${
                  isActive
                    ? "text-primary"
                    : isDimmed
                      ? "text-on-surface/30"
                      : "text-on-surface"
                }`}
              >
                {project.name}
              </h2>
              <span
                className={`ml-auto text-[0.6875rem] font-semibold uppercase tracking-[0.1em] transition-opacity duration-500 ${
                  isActive
                    ? "opacity-100 text-primary/60"
                    : "opacity-0"
                }`}
              >
                {project.stack.join(" / ")}
              </span>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
