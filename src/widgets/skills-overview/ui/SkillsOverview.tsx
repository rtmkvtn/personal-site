import styles from "./SkillsOverview.module.scss";

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

export function SkillsOverview() {
  return (
    <main className={styles.main}>
      <span className={styles.watermark}>03</span>

      <div className={styles.hairline} />

      <div className={styles.content}>
        <p className={styles.label}>Technical Capabilities</p>

        <h1 className={styles.title}>SKILLS</h1>

        <div className={styles.categories}>
          {categories.map((category) => (
            <div key={category.name}>
              <h2 className={styles.categoryTitle}>{category.name}</h2>
              <div className={styles.skills}>
                {category.skills.map((skill) => (
                  <span key={skill} className={styles.skill}>
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
