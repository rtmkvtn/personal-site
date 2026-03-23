const categories = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Web APIs"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    name: "Infrastructure",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
  },
];

export default function SkillsPage() {
  return (
    <main className="relative flex flex-1 overflow-hidden">
      <span className="pointer-events-none absolute right-[-2rem] top-1/2 -translate-y-1/2 select-none text-[clamp(15rem,30vw,25rem)] font-extralight leading-none text-primary/[0.03]">
        03
      </span>

      <div className="absolute left-[7rem] top-0 h-full w-px bg-outline-variant/20" />

      <div className="relative z-10 flex flex-col justify-center pl-[8.5rem] pr-16">
        <p className="mb-6 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-on-surface/40">
          Technical Capabilities
        </p>

        <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-thin leading-[0.9] tracking-[-0.02em] text-primary">
          SKILLS
        </h1>

        <div className="mt-12 flex flex-col gap-[2.75rem]">
          {categories.map((category) => (
            <div key={category.name}>
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-primary">
                {category.name}
              </h2>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[0.875rem] font-normal tracking-[0.05em] text-on-surface"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
