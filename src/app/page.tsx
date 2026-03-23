import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-1 overflow-hidden">
      {/* Background numeral */}
      <span
        className="pointer-events-none absolute right-[-2rem] top-1/2 -translate-y-1/2 select-none text-[clamp(15rem,30vw,25rem)] font-extralight leading-none text-primary/[0.03]"
        aria-hidden="true"
      >
        01
      </span>

      {/* Architectural hairline */}
      <div
        className="absolute left-[7rem] top-0 h-full w-px bg-outline-variant/20"
        aria-hidden="true"
      />

      {/* Content — anchored left, vertically centered */}
      <div className="relative z-10 flex flex-col justify-center pl-[8.5rem] pr-16">
        <p className="mb-6 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-on-surface/40">
          Fullstack Engineer
        </p>

        <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-thin leading-[0.9] tracking-[-0.02em] text-primary">
          STUDIO
          <br />
          MONOLITH
        </h1>

        <p className="mt-8 max-w-md text-[0.875rem] font-normal leading-relaxed tracking-[0.05em] text-on-surface">
          Engineering Scalable Digital Infrastructure
        </p>

        <Link
          href="/work"
          className="group mt-12 inline-flex items-center gap-2 border-b border-primary/40 pb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-primary transition-all duration-300 hover:border-primary"
        >
          View Work
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>
    </main>
  );
}
