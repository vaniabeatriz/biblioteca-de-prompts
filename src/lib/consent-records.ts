import { db } from "@/lib/db";
import { normalizeEmail } from "@/lib/routing";
import type { ConsentPurpose } from "@/types/prompt-library";

export interface ConsentRecordCreateInput {
  email: string;
  purpose: ConsentPurpose;
  accepted: boolean;
  consentTextVersion: string;
  acceptedAt: Date;
  context: string;
}

export interface ConsentRecordOptions {
  email: string;
  gdprDataProcessingConfirmed: boolean;
  marketingConsent?: boolean;
  consentTextVersion: string;
  context?: string;
}

export function buildConsentRecords(
  input: ConsentRecordOptions
): ConsentRecordCreateInput[] {
  const email = normalizeEmail(input.email);
  const acceptedAt = new Date();
  const context = input.context ?? "registration_form";

  if (!input.gdprDataProcessingConfirmed) {
    return [];
  }

  const records: ConsentRecordCreateInput[] = [
    {
      email,
      purpose: "registration_data_processing",
      accepted: true,
      consentTextVersion: input.consentTextVersion,
      acceptedAt,
      context
    }
  ];

  if (input.marketingConsent) {
    records.push({
      email,
      purpose: "marketing_communications",
      accepted: true,
      consentTextVersion: input.consentTextVersion,
      acceptedAt,
      context
    });
  }

  return records;
}

export async function createConsentRecords(input: ConsentRecordOptions) {
  const records = buildConsentRecords(input);

  await Promise.all(
    records.map((record) =>
      db.consentRecord.create({
        data: record
      })
    )
  );

  return records;
}
