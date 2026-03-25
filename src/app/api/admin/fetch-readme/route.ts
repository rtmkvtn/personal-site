import { NextRequest } from "next/server";
import { uploadFile, getStoragePath } from "@/shared/lib/storage";

export async function POST(request: NextRequest) {
  const { githubUrl, projectId } = await request.json();

  if (!githubUrl || !projectId) {
    return Response.json(
      { error: "Missing githubUrl or projectId" },
      { status: 400 },
    );
  }

  // Extract owner/repo from GitHub URL
  const match = githubUrl.match(
    /github\.com\/([^/]+)\/([^/]+)/,
  );

  if (!match) {
    return Response.json({ error: "Invalid GitHub URL" }, { status: 400 });
  }

  const [, owner, repo] = match;
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo.replace(/\.git$/, "")}/HEAD/README.md`;

  const res = await fetch(rawUrl);

  if (!res.ok) {
    return Response.json(
      { error: "Could not fetch README from repository" },
      { status: 404 },
    );
  }

  const markdown = await res.text();
  const buffer = Buffer.from(markdown, "utf-8");
  const path = getStoragePath(projectId, "readme", "README.md");
  const url = await uploadFile(path, buffer, "text/markdown");

  return Response.json({ url });
}
