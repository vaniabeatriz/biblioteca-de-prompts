import { USE_CASES } from "@/data/use-cases";
import type { UseCaseSlug } from "@/types/prompt-library";

const SUPPORTED_SLUGS = new Set(USE_CASES.map((useCase) => useCase.slug));

export function getUseCaseRoutePath(slug: UseCaseSlug) {
  return `/use-cases/${slug}`;
}

export function isSupportedUseCaseSlug(slug: string): slug is UseCaseSlug {
  return SUPPORTED_SLUGS.has(slug as UseCaseSlug);
}

export function isSupportedUseCasePath(path: string): path is `/use-cases/${UseCaseSlug}` {
  const match = path.match(/^\/use-cases\/([a-z0-9-]+)$/);
  return Boolean(match && isSupportedUseCaseSlug(match[1]));
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function encodeRegisterPath(email: string, intendedDestination?: string) {
  const params = new URLSearchParams({ email: normalizeEmail(email) });
  if (intendedDestination && isSupportedUseCasePath(intendedDestination)) {
    params.set("next", intendedDestination);
  }
  return `/register?${params.toString()}`;
}

export function registrationNextPath(options: {
  intendedDestination?: string | null;
  primaryUseCaseSlug?: string | null;
}) {
  if (options.intendedDestination && isSupportedUseCasePath(options.intendedDestination)) {
    return options.intendedDestination;
  }

  if (
    options.primaryUseCaseSlug &&
    isSupportedUseCaseSlug(options.primaryUseCaseSlug)
  ) {
    return getUseCaseRoutePath(options.primaryUseCaseSlug);
  }

  return "/use-cases";
}
