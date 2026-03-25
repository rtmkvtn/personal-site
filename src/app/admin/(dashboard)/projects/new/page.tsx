import { ProjectForm } from "@/widgets/admin";
import styles from "../page.module.scss";

export default function NewProjectPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NEW PROJECT</h1>
      <ProjectForm />
    </div>
  );
}
