"use client";

interface ProjectIndexWatermarkProps {
  index: number | null;
}

export function ProjectIndexWatermark({ index }: ProjectIndexWatermarkProps) {
  const display = index !== null ? String(index).padStart(2, "0") : "";

  return (
    <div
      className={`pointer-events-none absolute select-none text-[clamp(12rem,20vw,18rem)] font-black leading-none tracking-tighter transition-all duration-500 ease-out ${
        index !== null
          ? "bottom-8 left-1/2 -translate-x-1/2 text-primary/[0.04]"
          : "bottom-1/4 right-12 text-primary/[0.03]"
      }`}
    >
      {display}
    </div>
  );
}
