import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/server
const mockRedirect = vi.fn(
  (url: URL) =>
    ({ type: "redirect", url: url.toString() }) as unknown as Response,
);
const mockNext = vi.fn(() => ({ type: "next" }) as unknown as Response);

vi.mock("next/server", () => ({
  NextResponse: {
    redirect: (url: URL) => mockRedirect(url),
    next: () => mockNext(),
  },
}));

// Mock supabase
const mockGetUser = vi.fn();
vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
    },
  }),
}));

function createMockRequest(pathname: string, accessToken?: string) {
  return {
    nextUrl: {
      pathname,
    },
    url: "http://localhost:3000" + pathname,
    cookies: {
      get: (name: string) =>
        name === "sb-access-token" && accessToken
          ? { value: accessToken }
          : undefined,
    },
  };
}

describe("proxy", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");
  });

  it("allows non-admin routes through", async () => {
    const { proxy } = await import("./proxy.ts");
    const request = createMockRequest("/work");
    await proxy(request as any);
    expect(mockNext).toHaveBeenCalled();
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("allows /admin/login through", async () => {
    const { proxy } = await import("./proxy.ts");
    const request = createMockRequest("/admin/login");
    await proxy(request as any);
    expect(mockNext).toHaveBeenCalled();
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("redirects to login when no access token", async () => {
    const { proxy } = await import("./proxy.ts");
    const request = createMockRequest("/admin");
    await proxy(request as any);
    expect(mockRedirect).toHaveBeenCalled();
    const redirectUrl = mockRedirect.mock.calls[0][0];
    expect(redirectUrl.pathname).toBe("/admin/login");
  });

  it("redirects to login when token is invalid", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });
    const { proxy } = await import("./proxy.ts");
    const request = createMockRequest("/admin", "bad-token");
    await proxy(request as any);
    expect(mockRedirect).toHaveBeenCalled();
  });

  it("allows access when token is valid", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "123", email: "test@test.com" } },
    });
    const { proxy } = await import("./proxy.ts");
    const request = createMockRequest("/admin", "valid-token");
    await proxy(request as any);
    expect(mockNext).toHaveBeenCalled();
  });
});
