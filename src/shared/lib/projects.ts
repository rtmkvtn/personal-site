import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

export const getProjects = unstable_cache(
  async () => {
    return prisma.project.findMany({
      orderBy: { index: "asc" },
    });
  },
  ["projects-list"],
  { tags: ["projects"], revalidate: 3600 },
);

export const getProjectBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.project.findUnique({
      where: { slug },
    });
  },
  ["project-by-slug"],
  { tags: ["projects"], revalidate: 3600 },
);
