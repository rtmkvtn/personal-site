import { NextRequest } from "next/server";
import { uploadFile, getStoragePath } from "@/shared/lib/storage";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const projectId = formData.get("projectId") as string | null;
  const type = formData.get("type") as
    | "avatar"
    | "gallery"
    | "video"
    | "readme"
    | null;

  if (!file || !projectId || !type) {
    return Response.json(
      { error: "Missing file, projectId, or type" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const path = getStoragePath(projectId, type, file.name);
  const url = await uploadFile(path, buffer, file.type);

  return Response.json({ url, path });
}
