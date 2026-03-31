import { getProjects } from "@/shared/lib/content-loader";
import { SkillsOverview } from "@/widgets/skills-overview";

export default async function SkillsPage() {
  const projects = await getProjects();
  return <SkillsOverview projects={projects} />;
}
