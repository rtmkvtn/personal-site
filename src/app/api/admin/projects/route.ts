import { NextRequest } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { index: "asc" },
  });
  return Response.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const project = await prisma.project.create({ data: body });
  return Response.json(project, { status: 201 });
}
