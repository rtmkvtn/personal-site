import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({ from: vi.fn() })),
}));

describe("createSupabaseServerClient", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("throws when NEXT_PUBLIC_SUPABASE_URL is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-key");

    // Re-import to pick up env changes
    const { createSupabaseServerClient } = await import("./server.ts");
    expect(() => createSupabaseServerClient()).toThrow(
      "Missing Supabase environment variables",
    );
  });

  it("throws when SUPABASE_SERVICE_ROLE_KEY is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");

    const { createSupabaseServerClient } = await import("./server.ts");
    expect(() => createSupabaseServerClient()).toThrow(
      "Missing Supabase environment variables",
    );
  });

  it("creates a client when env vars are set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-service-key");

    const { createClient } = await import("@supabase/supabase-js");
    const { createSupabaseServerClient } = await import("./server.ts");
    const client = createSupabaseServerClient();

    expect(createClient).toHaveBeenCalledWith(
      "https://test.supabase.co",
      "test-service-key",
    );
    expect(client).toBeDefined();
  });
});
