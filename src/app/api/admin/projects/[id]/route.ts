import { NextRequest } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json(project);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const project = await prisma.project.update({
    where: { id },
    data: body,
  });
  return Response.json(project);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return Response.json({ success: true });
}
