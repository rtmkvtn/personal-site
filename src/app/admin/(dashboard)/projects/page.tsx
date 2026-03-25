"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./page.module.scss";

interface Project {
  id: string;
  name: string;
  slug: string;
  index: number;
  type: string;
  date: string;
}

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  }

  async function handleMoveUp(project: Project) {
    const idx = projects.findIndex((p) => p.id === project.id);
    if (idx <= 0) return;
    const prev = projects[idx - 1];
    await Promise.all([
      fetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: prev.index }),
      }),
      fetch(`/api/admin/projects/${prev.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: project.index }),
      }),
    ]);
    fetchProjects();
  }

  async function handleMoveDown(project: Project) {
    const idx = projects.findIndex((p) => p.id === project.id);
    if (idx >= projects.length - 1) return;
    const next = projects[idx + 1];
    await Promise.all([
      fetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: next.index }),
      }),
      fetch(`/api/admin/projects/${next.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: project.index }),
      }),
    ]);
    fetchProjects();
  }

  if (loading) return <div className={styles.loading}>LOADING...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>PROJECTS</h1>
        <Link href="/admin/projects/new" className={styles.createButton}>
          NEW PROJECT
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className={styles.empty}>No projects yet.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>#</th>
              <th className={styles.th}>NAME</th>
              <th className={styles.th}>TYPE</th>
              <th className={styles.th}>DATE</th>
              <th className={styles.th}>ORDER</th>
              <th className={styles.th}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className={styles.row}>
                <td className={styles.td}>{project.index}</td>
                <td className={styles.td}>
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className={styles.link}
                  >
                    {project.name}
                  </Link>
                </td>
                <td className={styles.td}>{project.type}</td>
                <td className={styles.td}>{project.date}</td>
                <td className={styles.td}>
                  <button
                    onClick={() => handleMoveUp(project)}
                    className={styles.orderButton}
                  >
                    UP
                  </button>
                  <button
                    onClick={() => handleMoveDown(project)}
                    className={styles.orderButton}
                  >
                    DN
                  </button>
                </td>
                <td className={styles.td}>
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className={styles.actionLink}
                  >
                    EDIT
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className={styles.deleteButton}
                  >
                    DEL
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
