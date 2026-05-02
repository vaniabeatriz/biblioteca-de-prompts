import { z } from "zod";
import { USE_CASE_SLUGS } from "@/types/prompt-library";
import { isSupportedUseCasePath, normalizeEmail } from "@/lib/routing";

export const useCaseSlugSchema = z.enum(USE_CASE_SLUGS);

export const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .transform(normalizeEmail);

export const leadCaptureSchema = z.object({
  email: emailSchema,
  source: z.string().trim().min(1).default("landing_page")
});

export const registrationSchema = z.object({
  email: emailSchema,
  fullName: z.string().trim().min(1, "Enter your full name."),
  roleOrOccupation: z.string().trim().min(1, "Enter your role or occupation."),
  organizationName: z.string().trim().optional(),
  primaryUseCaseSlug: useCaseSlugSchema.optional(),
  intendedDestination: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || isSupportedUseCasePath(value), {
      message: "Choose a supported use-case destination."
    }),
  gdprDataProcessingConfirmed: z.literal(true, {
    errorMap: () => ({ message: "GDPR data-processing confirmation is required." })
  }),
  marketingConsent: z.boolean().optional().default(false),
  consentTextVersion: z.string().trim().min(1)
});

export function formDataValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

export function fieldErrorsFromZod(error: z.ZodError) {
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
      key,
      value?.[0] ?? "Invalid value."
    ])
  );
}
