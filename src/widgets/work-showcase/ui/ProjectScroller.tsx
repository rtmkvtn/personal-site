"use client";

import { useRef, useEffect, useCallback } from "react";
import type { Project } from "@/shared/config";

const SCROLL_SPEED = 0.5; // pixels per frame at 60fps (~30px/s)

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const animRef = useRef<number>(0);
  const pausedRef = useRef(false);

  const animate = useCallback(() => {
    if (!pausedRef.current && scrollRef.current) {
      offsetRef.current += SCROLL_SPEED;
      const listHeight = scrollRef.current.scrollHeight / 2;
      if (listHeight > 0 && offsetRef.current >= listHeight) {
        offsetRef.current -= listHeight;
      }
      scrollRef.current.style.transform = `translateY(-${offsetRef.current}px)`;
    }
    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  useEffect(() => {
    pausedRef.current = activeIndex !== null;
  }, [activeIndex]);

  const renderList = (ariaHidden?: boolean) => (
    <div aria-hidden={ariaHidden || undefined}>
      {projects.map((project) => {
        const isActive = activeIndex === project.index;
        const isDimmed = activeIndex !== null && !isActive;

        return (
          <div
            key={`${ariaHidden ? "clone-" : ""}${project.slug}`}
            className="group flex items-baseline gap-8 cursor-pointer py-1"
            onMouseEnter={() => onHover(project.index)}
            onMouseLeave={() => onHover(null)}
            data-project-index={project.index}
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
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="overflow-hidden flex-1">
      <div ref={scrollRef} className="will-change-transform">
        {renderList()}
        {renderList(true)}
      </div>
    </div>
  );
}
