import { db } from "@/lib/db";
import { encodeRegisterPath, normalizeEmail, registrationNextPath } from "@/lib/routing";
import type { LeadCaptureStatus } from "@/types/prompt-library";

export interface LeadCaptureResult {
  email: string;
  status: LeadCaptureStatus;
  nextPath: string;
}

export async function createOrContinueLeadCapture(input: {
  email: string;
  source?: string;
}): Promise<LeadCaptureResult> {
  const email = normalizeEmail(input.email);

  const registration = await db.registration.findUnique({
    where: { email }
  });

  if (registration) {
    return {
      email,
      status: "registration_completed",
      nextPath: registrationNextPath({
        intendedDestination: registration.intendedDestination,
        primaryUseCaseSlug: registration.primaryUseCaseSlug
      })
    };
  }

  const existing = await db.leadCapture.findUnique({
    where: { email }
  });

  if (existing) {
    await db.leadCapture.update({
      where: { email },
      data: { status: "duplicate_detected" }
    });
    return {
      email,
      status: "duplicate_detected",
      nextPath: encodeRegisterPath(email)
    };
  }

  await db.leadCapture.create({
    data: {
      email,
      source: input.source ?? "landing_page",
      status: "email_captured"
    }
  });

  return {
    email,
    status: "email_captured",
    nextPath: encodeRegisterPath(email)
  };
}
