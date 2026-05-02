import { RESPONSIBLE_USE_MESSAGE, USE_CASES } from "@/data/use-cases";
import type { PromptCollectionSeed, PromptSeed } from "@/types/prompt-library";

function readableTask(name: string) {
  return name.toLowerCase().replace("/", " and ");
}

function collectionId(slug: string) {
  return `${slug}-workflow`;
}

export const PROMPT_COLLECTIONS: PromptCollectionSeed[] = USE_CASES.map((useCase) => ({
  id: collectionId(useCase.slug),
  useCaseSlug: useCase.slug,
  title: "Everyday workflow prompts",
  description: `Reusable prompts for common ${readableTask(useCase.displayName)} tasks.`,
  sortOrder: 1,
  status: "active",
  prompts: []
}));

export const PROMPTS: PromptSeed[] = USE_CASES.flatMap((useCase) => {
  const baseId = collectionId(useCase.slug);
  const responsibleUseNote = useCase.responsibleUseRequired ? RESPONSIBLE_USE_MESSAGE : undefined;
  const audience = useCase.displayName;
  return [
    {
      id: `${useCase.slug}-task-planner`,
      useCaseSlug: useCase.slug,
      collectionId: baseId,
      title: `${audience} task planner`,
      intendedOutcome: "Turn a loose objective into a prioritized action plan.",
      promptText:
        `Act as a practical planning assistant for ${audience}. Ask up to three clarifying questions if needed, then create a concise plan with priorities, dependencies, risks, and next actions for this objective: [describe objective].`,
      suggestedInputs: "Objective, audience, deadline, constraints, available resources.",
      usageNote: "Replace bracketed text with the real context before using the prompt.",
      responsibleUseNote,
      tags: ["planning", "workflow"],
      status: "active",
      sortOrder: 1
    },
    {
      id: `${useCase.slug}-communication-draft`,
      useCaseSlug: useCase.slug,
      collectionId: baseId,
      title: `${audience} communication draft`,
      intendedOutcome: "Draft clear communication tailored to the use case.",
      promptText:
        `Help me draft a clear, concise message for ${audience}. Goal: [goal]. Recipient: [recipient]. Tone: [tone]. Key facts to include: [facts]. Provide one polished version and one shorter alternative.`,
      suggestedInputs: "Goal, recipient, tone, facts, desired length.",
      usageNote: "Review for accuracy, privacy, and context before sending.",
      responsibleUseNote,
      tags: ["communication", "drafting"],
      status: "active",
      sortOrder: 2
    }
  ];
});

export const SEEDED_PROMPT_COLLECTIONS: PromptCollectionSeed[] = PROMPT_COLLECTIONS.map(
  (collection) => ({
    ...collection,
    prompts: PROMPTS.filter((prompt) => prompt.collectionId === collection.id)
  })
);
