import { describe, it, expect, vi, beforeEach } from "vitest";

const mockUpload = vi.fn();
const mockRemove = vi.fn();
const mockGetPublicUrl = vi.fn();

vi.mock("./supabase/server", () => ({
  createSupabaseServerClient: () => ({
    storage: {
      from: () => ({
        upload: mockUpload,
        remove: mockRemove,
        getPublicUrl: mockGetPublicUrl,
      }),
    },
  }),
}));

describe("storage service", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("getStoragePath builds correct path", async () => {
    const { getStoragePath } = await import("./storage.ts");
    expect(getStoragePath("abc123", "avatar", "photo.png")).toBe(
      "abc123/avatar/photo.png",
    );
    expect(getStoragePath("xyz", "gallery", "img.jpg")).toBe(
      "xyz/gallery/img.jpg",
    );
  });

  it("uploadFile uploads and returns public URL", async () => {
    mockUpload.mockResolvedValue({ error: null });
    mockGetPublicUrl.mockReturnValue({
      data: { publicUrl: "https://storage.example.com/file.png" },
    });

    const { uploadFile } = await import("./storage.ts");
    const url = await uploadFile(
      "test/path.png",
      Buffer.from("data"),
      "image/png",
    );

    expect(mockUpload).toHaveBeenCalledWith("test/path.png", expect.any(Buffer), {
      contentType: "image/png",
      upsert: true,
    });
    expect(url).toBe("https://storage.example.com/file.png");
  });

  it("uploadFile throws on error", async () => {
    mockUpload.mockResolvedValue({
      error: { message: "bucket not found" },
    });

    const { uploadFile } = await import("./storage.ts");
    await expect(
      uploadFile("test/path.png", Buffer.from("data"), "image/png"),
    ).rejects.toThrow("Upload failed: bucket not found");
  });

  it("deleteFile removes file from storage", async () => {
    mockRemove.mockResolvedValue({ error: null });

    const { deleteFile } = await import("./storage.ts");
    await deleteFile("test/path.png");

    expect(mockRemove).toHaveBeenCalledWith(["test/path.png"]);
  });
});
