import { prisma } from "./prisma";

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { index: "asc" },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  });
}
