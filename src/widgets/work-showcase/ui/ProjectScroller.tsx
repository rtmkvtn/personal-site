"use client";

import { useRef, useEffect, useCallback, useState } from "react";
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
  const [activeUid, setActiveUid] = useState<number | null>(null);

  const items = [
    ...projects.map((p) => ({ ...p, uid: p.index, isClone: false })),
    ...projects.map((p) => ({
      ...p,
      uid: p.index + projects.length,
      isClone: true,
    })),
  ];

  const originals = items.filter((i) => !i.isClone);
  const clones = items.filter((i) => i.isClone);

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
    pausedRef.current = activeUid !== null;
  }, [activeUid]);

  useEffect(() => {
    if (activeIndex === null) setActiveUid(null);
  }, [activeIndex]);

  const renderList = (
    subset: typeof items,
    ariaHidden?: boolean,
  ) => (
    <div aria-hidden={ariaHidden || undefined}>
      {subset.map((item) => {
        const isActive = activeUid === item.uid;
        const isDimmed = activeUid !== null && !isActive;

        return (
          <div
            key={`${item.isClone ? "clone-" : ""}${item.slug}`}
            className="group flex items-baseline gap-8 cursor-pointer py-1"
            onMouseEnter={() => {
              setActiveUid(item.uid);
              onHover(item.index);
            }}
            onMouseLeave={() => {
              setActiveUid(null);
              onHover(null);
            }}
            data-project-index={item.index}
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
              {String(item.index).padStart(2, "0")}
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
              {item.name}
            </h2>
            <span
              className={`ml-auto text-[0.6875rem] font-semibold uppercase tracking-[0.1em] transition-opacity duration-500 ${
                isActive
                  ? "opacity-100 text-primary/60"
                  : "opacity-0"
              }`}
            >
              {item.stack.join(" / ")}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="overflow-hidden flex-1">
      <div ref={scrollRef} className="will-change-transform">
        {renderList(originals)}
        {renderList(clones, true)}
      </div>
    </div>
  );
}
