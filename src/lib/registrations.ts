import { createConsentRecords } from "@/lib/consent-records";
import { db } from "@/lib/db";
import { normalizeEmail, registrationNextPath } from "@/lib/routing";
import type { RegistrationInput, RegistrationStatus } from "@/types/prompt-library";

export interface RegistrationResult {
  email: string;
  status: Exclude<RegistrationStatus, "started">;
  nextPath: string;
}

export async function completeRegistration(
  input: RegistrationInput
): Promise<RegistrationResult> {
  const email = normalizeEmail(input.email);
  const existing = await db.registration.findUnique({
    where: { email }
  });

  const status: RegistrationResult["status"] = existing ? "updated" : "completed";
  const registrationData = {
    fullName: input.fullName,
    roleOrOccupation: input.roleOrOccupation,
    organizationName: input.organizationName || null,
    primaryUseCaseSlug: input.primaryUseCaseSlug || null,
    intendedDestination: input.intendedDestination || null,
    status
  };

  if (existing) {
    await db.registration.update({
      where: { email },
      data: registrationData
    });
  } else {
    await db.registration.create({
      data: {
        email,
        ...registrationData
      }
    });
  }

  await db.leadCapture.updateMany({
    where: { email },
    data: { status: "registration_completed" }
  });

  await createConsentRecords({
    email,
    gdprDataProcessingConfirmed: input.gdprDataProcessingConfirmed,
    marketingConsent: input.marketingConsent,
    consentTextVersion: input.consentTextVersion,
    context: "registration_form"
  });

  return {
    email,
    status,
    nextPath: registrationNextPath({
      intendedDestination: input.intendedDestination,
      primaryUseCaseSlug: input.primaryUseCaseSlug
    })
  };
}
