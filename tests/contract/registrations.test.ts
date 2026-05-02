import { beforeEach, describe, expect, it, vi } from "vitest";

const mockDb = vi.hoisted(() => ({
  registration: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
  },
  leadCapture: {
    updateMany: vi.fn()
  },
  consentRecord: {
    create: vi.fn()
  }
}));

vi.mock("@/lib/db", () => ({ db: mockDb }));

const validBody = {
  email: "Person@Example.com",
  fullName: "Person Example",
  roleOrOccupation: "Data analyst",
  organizationName: "Example Co",
  primaryUseCaseSlug: "data-analysts",
  gdprDataProcessingConfirmed: true,
  marketingConsent: true,
  consentTextVersion: "2026-05-02"
};

describe("POST /api/registrations", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockDb.leadCapture.updateMany.mockResolvedValue({ count: 1 });
    mockDb.consentRecord.create.mockResolvedValue({});
  });

  it("creates a valid registration and returns a selected use-case path", async () => {
    mockDb.registration.findUnique.mockResolvedValue(null);
    mockDb.registration.create.mockResolvedValue({});

    const { POST } = await import("@/app/api/registrations/route");
    const response = await POST(
      new Request("http://test.local/api/registrations", {
        method: "POST",
        body: JSON.stringify(validBody)
      })
    );

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toMatchObject({
      email: "person@example.com",
      status: "completed",
      nextPath: "/use-cases/data-analysts"
    });
    expect(mockDb.consentRecord.create).toHaveBeenCalledTimes(2);
  });

  it("returns 422 when GDPR confirmation is missing", async () => {
    const { POST } = await import("@/app/api/registrations/route");
    const response = await POST(
      new Request("http://test.local/api/registrations", {
        method: "POST",
        body: JSON.stringify({
          ...validBody,
          gdprDataProcessingConfirmed: false
        })
      })
    );

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({
      code: "gdpr_confirmation_required"
    });
  });

  it("returns 400 for invalid required fields", async () => {
    const { POST } = await import("@/app/api/registrations/route");
    const response = await POST(
      new Request("http://test.local/api/registrations", {
        method: "POST",
        body: JSON.stringify({
          ...validBody,
          email: "not-an-email",
          fullName: ""
        })
      })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      code: "invalid_registration"
    });
  });

  it("updates duplicate registrations without blocking continuation", async () => {
    mockDb.registration.findUnique.mockResolvedValue({
      email: "person@example.com"
    });
    mockDb.registration.update.mockResolvedValue({});

    const { POST } = await import("@/app/api/registrations/route");
    const response = await POST(
      new Request("http://test.local/api/registrations", {
        method: "POST",
        body: JSON.stringify({
          ...validBody,
          intendedDestination: "/use-cases/marketing"
        })
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      status: "updated",
      nextPath: "/use-cases/marketing"
    });
    expect(mockDb.registration.update).toHaveBeenCalled();
  });
});
