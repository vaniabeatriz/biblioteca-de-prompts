export const USE_CASE_SLUGS = [
  "high-school-students",
  "university-students",
  "entry-level-developers",
  "data-analysts",
  "small-medium-business",
  "social-media",
  "marketing",
  "designer",
  "web-designer",
  "product",
  "personal-assistant",
  "agencies",
  "doctors",
  "nutritionists",
  "psychologists",
  "dentists",
  "hair-salon",
  "nail-salon"
] as const;

export type UseCaseSlug = (typeof USE_CASE_SLUGS)[number];

export type UseCaseStatus = "active" | "empty";
export type PromptStatus = "draft" | "active" | "archived";
export type LeadCaptureStatus =
  | "email_captured"
  | "registration_completed"
  | "duplicate_detected";
export type RegistrationStatus = "started" | "completed" | "updated";
export type ConsentPurpose =
  | "registration_data_processing"
  | "marketing_communications";

export interface UseCaseSummary {
  slug: UseCaseSlug;
  displayName: string;
  description: string;
  routePath: string;
  sortOrder: number;
  responsibleUseRequired: boolean;
  status: UseCaseStatus;
}

export interface PromptCollectionSeed {
  id: string;
  useCaseSlug: UseCaseSlug;
  title: string;
  description: string;
  sortOrder: number;
  status: UseCaseStatus;
  prompts: PromptSeed[];
}

export interface PromptSeed {
  id: string;
  useCaseSlug: UseCaseSlug;
  collectionId: string;
  title: string;
  intendedOutcome: string;
  promptText: string;
  suggestedInputs: string;
  usageNote: string;
  responsibleUseNote?: string;
  tags: string[];
  status: PromptStatus;
  sortOrder: number;
}

export interface UseCaseDetail extends UseCaseSummary {
  promptCollections: PromptCollectionSeed[];
  responsibleUseMessage?: string;
}

export interface RegistrationInput {
  email: string;
  fullName: string;
  roleOrOccupation: string;
  organizationName?: string;
  primaryUseCaseSlug?: UseCaseSlug;
  intendedDestination?: string;
  gdprDataProcessingConfirmed: boolean;
  marketingConsent?: boolean;
  consentTextVersion: string;
}
