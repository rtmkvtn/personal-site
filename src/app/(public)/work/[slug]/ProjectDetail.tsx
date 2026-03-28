"use client";

import { useLocalizedProject } from "@/shared/lib/i18n";
import type { Project } from "@/shared/config";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import styles from "./page.module.scss";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project: rawProject }: ProjectDetailProps) {
  const project = useLocalizedProject(rawProject);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{project.name}</h1>
      {project.description && (
        <p className={styles.description}>{project.description}</p>
      )}
      {project.achievements.length > 0 && (
        <ul className={styles.achievements}>
          {project.achievements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      )}
      {project.video && <ProjectVideo src={project.video} />}
      <ProjectGallery images={project.gallery} />
    </main>
  );
}
