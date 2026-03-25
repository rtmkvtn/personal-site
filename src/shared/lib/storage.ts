import { createSupabaseServerClient } from "./supabase/server";

const BUCKET = "project-media";

export async function uploadFile(
  path: string,
  file: Buffer,
  contentType: string,
): Promise<string> {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType, upsert: true });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return publicUrl;
}

export async function deleteFile(path: string): Promise<void> {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw new Error(`Delete failed: ${error.message}`);
}

export function getStoragePath(
  projectId: string,
  type: "avatar" | "gallery" | "video" | "readme",
  filename: string,
): string {
  return `${projectId}/${type}/${filename}`;
}
