import { beforeEach, describe, expect, it, vi } from "vitest";

const mockDb = vi.hoisted(() => ({
  registration: {
    findUnique: vi.fn()
  },
  leadCapture: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
  }
}));

vi.mock("@/lib/db", () => ({ db: mockDb }));

describe("POST /api/lead-captures", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("captures a new valid email", async () => {
    mockDb.registration.findUnique.mockResolvedValue(null);
    mockDb.leadCapture.findUnique.mockResolvedValue(null);
    mockDb.leadCapture.create.mockResolvedValue({
      email: "user@example.com",
      status: "email_captured"
    });

    const { POST } = await import("@/app/api/lead-captures/route");
    const response = await POST(
      new Request("http://test.local/api/lead-captures", {
        method: "POST",
        body: JSON.stringify({ email: "User@Example.com" })
      })
    );

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toMatchObject({
      email: "user@example.com",
      status: "email_captured",
      nextPath: "/register?email=user%40example.com"
    });
  });

  it("rejects invalid email payloads", async () => {
    const { POST } = await import("@/app/api/lead-captures/route");
    const response = await POST(
      new Request("http://test.local/api/lead-captures", {
        method: "POST",
        body: JSON.stringify({ email: "invalid" })
      })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      code: "invalid_lead_capture"
    });
  });

  it("returns a duplicate continuation path for known emails", async () => {
    mockDb.registration.findUnique.mockResolvedValue(null);
    mockDb.leadCapture.findUnique.mockResolvedValue({
      email: "known@example.com"
    });
    mockDb.leadCapture.update.mockResolvedValue({
      email: "known@example.com",
      status: "duplicate_detected"
    });

    const { POST } = await import("@/app/api/lead-captures/route");
    const response = await POST(
      new Request("http://test.local/api/lead-captures", {
        method: "POST",
        body: JSON.stringify({ email: "known@example.com" })
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      status: "duplicate_detected",
      nextPath: "/register?email=known%40example.com"
    });
  });
});
