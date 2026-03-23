"use client";

import { useState } from "react";
import { PROJECTS } from "@/shared/config";
import { ProjectScroller } from "./ProjectScroller";

export function WorkShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main className="relative flex flex-1 overflow-hidden px-6 sm:pl-12 sm:pr-16">
      <ProjectScroller
        projects={PROJECTS}
        activeIndex={activeIndex}
        onHover={setActiveIndex}
      />
    </main>
  );
}
