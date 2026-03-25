"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProjectForm } from "@/widgets/admin";
import styles from "../page.module.scss";

export default function EditProjectPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/projects/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className={styles.loading}>LOADING...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>EDIT PROJECT</h1>
      <ProjectForm initialData={project ?? undefined} />
    </div>
  );
}
