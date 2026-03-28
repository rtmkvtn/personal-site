"use client";

import { useTranslation } from "react-i18next";
import styles from "./SkillsOverview.module.scss";

const categories = [
  {
    nameKey: "skills.frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Web APIs"],
  },
  {
    nameKey: "skills.backend",
    skills: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    nameKey: "skills.infrastructure",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
  },
];

export function SkillsOverview() {
  const { t } = useTranslation();

  return (
    <main className={styles.main}>
      <span className={styles.watermark}>03</span>

      <div className={styles.hairline} />

      <div className={styles.content}>
        <p className={styles.label}>{t("skills.label")}</p>

        <h1 className={styles.title}>{t("skills.title")}</h1>

        <div className={styles.categories}>
          {categories.map((category) => (
            <div key={category.nameKey}>
              <h2 className={styles.categoryTitle}>{t(category.nameKey)}</h2>
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
