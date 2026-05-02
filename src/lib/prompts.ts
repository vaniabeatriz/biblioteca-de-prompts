import { RESPONSIBLE_USE_MESSAGE } from "@/data/use-cases";
import { SEEDED_PROMPT_COLLECTIONS } from "@/data/prompt-seed";
import { getUseCaseBySlug } from "@/lib/use-cases";
import type {
  PromptCollectionSeed,
  PromptSeed,
  UseCaseDetail,
  UseCaseSlug
} from "@/types/prompt-library";

function clonePrompt(prompt: PromptSeed): PromptSeed {
  return {
    ...prompt,
    tags: [...prompt.tags]
  };
}

function cloneCollection(collection: PromptCollectionSeed): PromptCollectionSeed {
  return {
    ...collection,
    prompts: collection.prompts
      .map(clonePrompt)
      .sort((a, b) => a.sortOrder - b.sortOrder)
  };
}

export function getPromptCollectionsByUseCase(
  slug: UseCaseSlug
): PromptCollectionSeed[] {
  return SEEDED_PROMPT_COLLECTIONS.filter(
    (collection) => collection.useCaseSlug === slug
  )
    .map(cloneCollection)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getUseCaseDetail(slug: string): UseCaseDetail | undefined {
  const useCase = getUseCaseBySlug(slug);

  if (!useCase) {
    return undefined;
  }

  return {
    ...useCase,
    promptCollections: getPromptCollectionsByUseCase(useCase.slug),
    responsibleUseMessage: useCase.responsibleUseRequired
      ? RESPONSIBLE_USE_MESSAGE
      : undefined
  };
}

export function toPublicUseCaseDetail(detail: UseCaseDetail) {
  return {
    slug: detail.slug,
    displayName: detail.displayName,
    description: detail.description,
    routePath: detail.routePath,
    responsibleUseRequired: detail.responsibleUseRequired,
    responsibleUseMessage: detail.responsibleUseMessage,
    promptCollections: detail.promptCollections.map((collection) => ({
      id: collection.id,
      title: collection.title,
      description: collection.description,
      prompts: collection.prompts.map((prompt) => ({
        id: prompt.id,
        title: prompt.title,
        intendedOutcome: prompt.intendedOutcome,
        promptText: prompt.promptText,
        suggestedInputs: prompt.suggestedInputs,
        usageNote: prompt.usageNote,
        responsibleUseNote: prompt.responsibleUseNote,
        tags: prompt.tags
      }))
    }))
  };
}
