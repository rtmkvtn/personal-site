"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/shared/config";

interface ProjectDetailPanelProps {
  project: Project | null;
}

export function ProjectDetailPanel({ project }: ProjectDetailPanelProps) {
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState(0);
  // stage 0: hidden, 1: image, 2: type, 3: stack, 4: highlight, 5: button

  useEffect(() => {
    if (project) {
      setVisible(true);
      setStage(0);
      const timers: ReturnType<typeof setTimeout>[] = [];
      timers.push(setTimeout(() => setStage(1), 50));
      timers.push(setTimeout(() => setStage(2), 200));
      timers.push(setTimeout(() => setStage(3), 300));
      timers.push(setTimeout(() => setStage(4), 400));
      timers.push(setTimeout(() => setStage(5), 500));
      return () => timers.forEach(clearTimeout);
    } else {
      setStage(0);
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [project]);

  if (!visible && !project) return null;

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
      {project?.image && (
        <div className={`absolute inset-0 ${fadeIn(1)}`}>
          <Image
            src={project.image}
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
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-outline mb-2">
            TYPE
          </span>
          <p className="text-[0.875rem] font-normal tracking-[0.05em] text-on-surface">
            {project?.type?.toUpperCase() ?? ""}
          </p>
        </div>

        {/* STACK */}
        <div className={fadeIn(3)}>
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-outline mb-2">
            STACK
          </span>
          <p className="text-[0.875rem] font-normal tracking-[0.05em] text-on-surface">
            {project?.stack?.join(", ").toUpperCase() ?? ""}
          </p>
        </div>

        {/* HIGHLIGHT */}
        <div className={fadeIn(4)}>
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-outline mb-2">
            HIGHLIGHT
          </span>
          <p className="text-[0.875rem] font-normal tracking-[0.05em] text-on-surface">
            {project?.highlight?.toUpperCase() ?? ""}
          </p>
        </div>

        {/* DETAILS button */}
        <div className={fadeIn(5)}>
          {project && (
            <Link
              href={`/work/${project.slug}`}
              className="inline-block border border-primary px-6 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-primary transition-colors duration-300 hover:bg-primary hover:text-on-primary"
            >
              DETAILS
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
