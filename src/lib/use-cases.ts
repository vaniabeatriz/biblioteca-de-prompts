import { USE_CASES } from "@/data/use-cases";
import { isSupportedUseCaseSlug } from "@/lib/routing";
import type { UseCaseSlug, UseCaseSummary } from "@/types/prompt-library";

export function listUseCases(): UseCaseSummary[] {
  return [...USE_CASES].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getUseCaseBySlug(slug: string): UseCaseSummary | undefined {
  if (!isSupportedUseCaseSlug(slug)) {
    return undefined;
  }

  return listUseCases().find((useCase) => useCase.slug === slug);
}

export function getUseCasePathBySlug(slug: UseCaseSlug) {
  return listUseCases().find((useCase) => useCase.slug === slug)?.routePath;
}

export function toPublicUseCaseSummary(useCase: UseCaseSummary) {
  return {
    slug: useCase.slug,
    displayName: useCase.displayName,
    description: useCase.description,
    routePath: useCase.routePath,
    responsibleUseRequired: useCase.responsibleUseRequired
  };
}
