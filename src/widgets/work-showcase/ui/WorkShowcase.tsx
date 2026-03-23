"use client";

import { useState } from "react";
import { PROJECTS } from "@/shared/config";

export function WorkShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main className="relative flex flex-1 overflow-hidden">
      <div className="relative z-10 flex flex-col justify-center px-6 sm:pl-12 sm:pr-16">
        <div className="flex flex-col gap-2">
          {PROJECTS.map((project) => {
            const isActive = activeIndex === project.index;
            const isDimmed = activeIndex !== null && !isActive;

            return (
              <div
                key={project.slug}
                className="group flex items-baseline gap-8 cursor-pointer"
                onMouseEnter={() => setActiveIndex(project.index)}
                onMouseLeave={() => setActiveIndex(null)}
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
                  className={`text-[3.5rem] font-extralight tracking-[-0.02em] transition-all duration-300 ${
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
      </div>
    </main>
  );
}
