const projects = [
  {
    title: "Infrastructure Platform",
    description:
      "Distributed systems architecture for high-throughput data pipelines. Built with event-driven microservices handling millions of daily transactions.",
    tags: ["Distributed Systems", "Event-Driven", "Cloud"],
  },
  {
    title: "Design System Engine",
    description:
      "Token-based design system powering a multi-product ecosystem. Automated visual regression testing and cross-platform component delivery.",
    tags: ["React", "TypeScript", "CI/CD"],
  },
  {
    title: "Real-Time Analytics",
    description:
      "Stream processing platform for behavioral analytics. Sub-second query latency across terabytes of time-series data.",
    tags: ["Data Engineering", "Streaming", "Visualization"],
  },
];

export default function WorkPage() {
  return (
    <main className="relative flex flex-1 overflow-hidden">
      <span className="pointer-events-none absolute right-[-2rem] top-1/2 -translate-y-1/2 select-none text-[clamp(15rem,30vw,25rem)] font-extralight leading-none text-primary/[0.03]">
        02
      </span>

      <div className="absolute left-4 top-0 hidden h-full w-px bg-outline-variant/20 sm:left-[7rem] sm:block" />

      <div className="relative z-10 flex flex-col justify-center px-6 sm:pl-[8.5rem] sm:pr-16">
        <p className="mb-6 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-on-surface/40">
          Selected Projects
        </p>

        <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-thin leading-[0.9] tracking-[-0.02em] text-primary">
          WORK
        </h1>

        <div className="mt-12 flex flex-col gap-[2.75rem]">
          {projects.map((project) => (
            <article key={project.title} className="max-w-lg">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-primary">
                {project.title}
              </h2>
              <p className="mt-3 text-[0.875rem] font-normal leading-relaxed tracking-[0.05em] text-on-surface">
                {project.description}
              </p>
              <div className="mt-3 flex gap-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.6875rem] font-normal tracking-[0.05em] text-on-surface/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
