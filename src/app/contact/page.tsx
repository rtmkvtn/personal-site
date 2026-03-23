export default function ContactPage() {
  return (
    <main className="relative flex flex-1 overflow-hidden">
      <span className="pointer-events-none absolute right-[-2rem] top-1/2 -translate-y-1/2 select-none text-[clamp(15rem,30vw,25rem)] font-extralight leading-none text-primary/[0.03]">
        05
      </span>

      <div className="absolute left-4 top-0 hidden h-full w-px bg-outline-variant/20 sm:left-[7rem] sm:block" />

      <div className="relative z-10 flex flex-col justify-center px-6 sm:pl-[8.5rem] sm:pr-16">
        <p className="mb-6 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-on-surface/40">
          Get in Touch
        </p>

        <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-thin leading-[0.9] tracking-[-0.02em] text-primary">
          CONTACT
        </h1>

        <div className="mt-12 max-w-lg">
          <p className="text-[0.875rem] font-normal leading-relaxed tracking-[0.05em] text-on-surface">
            Available for select projects and collaborations. Reach out to
            discuss how we can build something exceptional together.
          </p>
        </div>

        <div className="mt-[2.75rem] flex flex-col gap-[2.75rem]">
          <div>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-primary">
              Email
            </h2>
            <a
              href="mailto:hello@studiomonolith.dev"
              className="mt-3 inline-block text-[0.875rem] font-normal tracking-[0.05em] text-on-surface transition-colors duration-300 hover:text-primary"
            >
              hello@studiomonolith.dev
            </a>
          </div>

          <div>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-primary">
              Location
            </h2>
            <p className="mt-3 text-[0.875rem] font-normal tracking-[0.05em] text-on-surface">
              Remote — Available Worldwide
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
