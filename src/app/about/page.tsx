export default function AboutPage() {
  return (
    <main className="relative flex flex-1 overflow-hidden">
      <span className="pointer-events-none absolute right-[-2rem] top-1/2 -translate-y-1/2 select-none text-[clamp(15rem,30vw,25rem)] font-extralight leading-none text-primary/[0.03]">
        04
      </span>

      <div className="absolute left-4 top-0 hidden h-full w-px bg-outline-variant/20 sm:left-[7rem] sm:block" />

      <div className="relative z-10 flex flex-col justify-center px-6 sm:pl-[8.5rem] sm:pr-16">
        <p className="mb-6 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-on-surface/40">
          Background
        </p>

        <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-thin leading-[0.9] tracking-[-0.02em] text-primary">
          ABOUT
        </h1>

        <div className="mt-12 max-w-lg">
          <p className="text-[0.875rem] font-normal leading-relaxed tracking-[0.05em] text-on-surface">
            A fullstack engineer focused on building scalable digital
            infrastructure. With a background spanning distributed systems,
            frontend architecture, and cloud-native platforms, I approach
            every project as an exercise in intentional design.
          </p>

          <p className="mt-8 text-[0.875rem] font-normal leading-relaxed tracking-[0.05em] text-on-surface">
            My work is guided by a belief that great engineering is
            indistinguishable from great design — both demand clarity,
            restraint, and an obsessive attention to the details that most
            people never notice.
          </p>
        </div>

        <div className="mt-[2.75rem]">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-primary">
            Approach
          </h2>
          <p className="mt-3 max-w-lg text-[0.875rem] font-normal leading-relaxed tracking-[0.05em] text-on-surface">
            Systems thinking over feature stacking. Every architectural
            decision is made with long-term maintainability and operational
            excellence in mind. I build infrastructure that scales silently.
          </p>
        </div>
      </div>
    </main>
  );
}
