"use client";

import { useLocalizedProject } from "@/shared/lib/i18n";
import type { Project } from "@/shared/config";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import { HowItWasBuilt } from "@/widgets/how-it-was-built";
import { PROJECT_COMPOSITIONS } from "@/widgets/project-compositions";
import styles from "./page.module.scss";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project: rawProject }: ProjectDetailProps) {
  const project = useLocalizedProject(rawProject);
  const Composition = PROJECT_COMPOSITIONS[project.slug];

  if (Composition) {
    return <Composition project={project} />;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{project.name}</h1>
      {project.description
        .split(/\n{2,}/)
        .filter(Boolean)
        .map((paragraph) => (
          <p key={paragraph} className={styles.description}>
            {paragraph}
          </p>
        ))}
      {project.achievements.length > 0 && (
        <ul className={styles.achievements}>
          {project.achievements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      )}
      {project.aiFirst && <HowItWasBuilt data={project.aiFirst} />}
      {project.video && <ProjectVideo src={project.video} />}
      <ProjectGallery images={project.gallery} />
    </main>
  );
}
