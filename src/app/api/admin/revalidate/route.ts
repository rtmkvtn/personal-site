import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("projects", "max");
  return Response.json({ revalidated: true });
}
