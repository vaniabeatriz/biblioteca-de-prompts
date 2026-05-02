import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildConsentRecords } from "@/lib/consent-records";
import { registrationSchema } from "@/lib/validation";

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

const input = {
  email: "Member@Example.com",
  fullName: "Member Example",
  roleOrOccupation: "Product manager",
  primaryUseCaseSlug: "product",
  gdprDataProcessingConfirmed: true,
  marketingConsent: false,
  consentTextVersion: "2026-05-02"
} as const;

describe("registration flow", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockDb.leadCapture.updateMany.mockResolvedValue({ count: 1 });
    mockDb.consentRecord.create.mockResolvedValue({});
  });

  it("normalizes fields and completes a new registration", async () => {
    mockDb.registration.findUnique.mockResolvedValue(null);
    mockDb.registration.create.mockResolvedValue({});

    const { completeRegistration } = await import("@/lib/registrations");
    const parsed = registrationSchema.parse(input);
    const result = await completeRegistration(parsed);

    expect(result).toEqual({
      email: "member@example.com",
      status: "completed",
      nextPath: "/use-cases/product"
    });
    expect(mockDb.registration.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: "member@example.com",
          primaryUseCaseSlug: "product"
        })
      })
    );
    expect(mockDb.consentRecord.create).toHaveBeenCalledTimes(1);
  });

  it("creates separate marketing consent only when opted in", () => {
    const records = buildConsentRecords({
      email: "member@example.com",
      gdprDataProcessingConfirmed: true,
      marketingConsent: true,
      consentTextVersion: "2026-05-02"
    });

    expect(records.map((record) => record.purpose)).toEqual([
      "registration_data_processing",
      "marketing_communications"
    ]);
  });

  it("updates an existing registration and preserves a valid intended destination", async () => {
    mockDb.registration.findUnique.mockResolvedValue({
      email: "member@example.com"
    });
    mockDb.registration.update.mockResolvedValue({});

    const { completeRegistration } = await import("@/lib/registrations");
    const result = await completeRegistration({
      ...registrationSchema.parse(input),
      intendedDestination: "/use-cases/web-designer",
      marketingConsent: true
    });

    expect(result.status).toBe("updated");
    expect(result.nextPath).toBe("/use-cases/web-designer");
    expect(mockDb.registration.update).toHaveBeenCalled();
    expect(mockDb.consentRecord.create).toHaveBeenCalledTimes(2);
  });
});
