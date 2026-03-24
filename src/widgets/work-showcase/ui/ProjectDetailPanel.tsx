"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/shared/config";

interface ProjectDetailPanelProps {
  project: Project | null;
}

export function ProjectDetailPanel({ project }: ProjectDetailPanelProps) {
  const [displayedProject, setDisplayedProject] = useState<Project | null>(null);
  const [prevProject, setPrevProject] = useState<Project | null>(null);
  const [stage, setStage] = useState(0);
  // stage 0: hidden, 1: image, 2: type, 3: stack, 4: highlight, 5: button

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
    `transition-all duration-200 ${
      stage >= minStage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
    }`;

  return (
    <div
      className={`relative w-full max-w-sm transition-opacity duration-200 ${
        project ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background image */}
      {displayedProject?.image && (
        <div className={`h-[50vh] absolute ${fadeIn(1)} left-0 right-0 top-[-20%] -translate-x-[70%]`}>
          <div className="absolute inset-0 bg-radial from-gray/5 to-surface" />
          <Image
            src={displayedProject.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 0px"
            loading="eager"
            className="object-cover opacity-30"
          />
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col justify-center gap-8 p-8">
        {/* TYPE */}
        <div className={fadeIn(2)}>
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-widest text-outline mb-2">
            TYPE
          </span>
          <p className="text-[0.875rem] font-normal tracking-[0.05em] text-on-surface">
            {displayedProject?.type?.toUpperCase() ?? ""}
          </p>
        </div>

        {/* STACK */}
        <div className={fadeIn(3)}>
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-widest text-outline mb-2">
            STACK
          </span>
          <p className="text-[0.875rem] font-normal tracking-[0.05em] text-on-surface">
            {displayedProject?.stack?.join(", ").toUpperCase() ?? ""}
          </p>
        </div>

        {/* HIGHLIGHT */}
        <div className={fadeIn(4)}>
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-widest text-outline mb-2">
            HIGHLIGHT
          </span>
          <p className="text-[0.875rem] font-normal tracking-[0.05em] text-on-surface">
            {displayedProject?.highlight?.toUpperCase() ?? ""}
          </p>
        </div>

        {/* DETAILS button */}
        <div className={fadeIn(5)}>
          {displayedProject && (
            <Link
              href={`/work/${displayedProject.slug}`}
              className="inline-block border border-primary px-6 py-3 text-[0.6875rem] font-semibold uppercase tracking-widest text-primary transition-colors duration-300 hover:bg-primary hover:text-on-primary"
            >
              DETAILS
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
