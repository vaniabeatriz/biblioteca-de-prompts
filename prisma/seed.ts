import { PrismaClient } from "@prisma/client";
import { USE_CASES } from "../src/data/use-cases";
import { PROMPT_COLLECTIONS, PROMPTS } from "../src/data/prompt-seed";

const prisma = new PrismaClient();

async function main() {
  for (const useCase of USE_CASES) {
    await prisma.useCase.upsert({
      where: { slug: useCase.slug },
      update: useCase,
      create: useCase
    });
  }

  for (const collection of PROMPT_COLLECTIONS) {
    await prisma.promptCollection.upsert({
      where: { id: collection.id },
      update: {
        useCaseSlug: collection.useCaseSlug,
        title: collection.title,
        description: collection.description,
        sortOrder: collection.sortOrder,
        status: collection.status
      },
      create: {
        id: collection.id,
        useCaseSlug: collection.useCaseSlug,
        title: collection.title,
        description: collection.description,
        sortOrder: collection.sortOrder,
        status: collection.status
      }
    });
  }

  for (const prompt of PROMPTS) {
    await prisma.prompt.upsert({
      where: { id: prompt.id },
      update: {
        useCaseSlug: prompt.useCaseSlug,
        collectionId: prompt.collectionId,
        title: prompt.title,
        intendedOutcome: prompt.intendedOutcome,
        promptText: prompt.promptText,
        suggestedInputs: prompt.suggestedInputs,
        usageNote: prompt.usageNote,
        responsibleUseNote: prompt.responsibleUseNote,
        tags: prompt.tags.join(","),
        status: prompt.status,
        sortOrder: prompt.sortOrder
      },
      create: {
        id: prompt.id,
        useCaseSlug: prompt.useCaseSlug,
        collectionId: prompt.collectionId,
        title: prompt.title,
        intendedOutcome: prompt.intendedOutcome,
        promptText: prompt.promptText,
        suggestedInputs: prompt.suggestedInputs,
        usageNote: prompt.usageNote,
        responsibleUseNote: prompt.responsibleUseNote,
        tags: prompt.tags.join(","),
        status: prompt.status,
        sortOrder: prompt.sortOrder
      }
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
